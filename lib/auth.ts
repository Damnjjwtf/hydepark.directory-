import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import type { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { db } from './db';
import { users } from './schema';
import { eq } from 'drizzle-orm';

/**
 * NextAuth.js configuration
 * Supports multi-role RBAC with JWT claims
 */
export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // TODO: Implement password verification in Phase 2
        // For MVP, OAuth is primary auth method
        return null;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      // Sync user to database on OAuth signup
      if (account?.provider === 'google') {
        const existingUser = await db.query.users.findFirst({
          where: eq(users.email, user.email || ''),
        });

        if (!existingUser) {
          await db.insert(users).values({
            email: user.email || '',
            name: user.name,
            role: 'STUDENT', // Default new OAuth users to student role
          });
        }
      }

      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.email = user.email;

        // Fetch role from database
        const dbUser = await db.query.users.findFirst({
          where: eq(users.email, user.email || ''),
        });

        if (dbUser) {
          token.role = dbUser.role;
          token.userId = dbUser.id;
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string;
        session.user.id = token.userId as string;
      }

      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
};

/**
 * Server-side helper: Require authentication
 * Usage: const session = await requireAuth()
 */
export async function requireAuth() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/auth/signin');
  }

  return session;
}

/**
 * Server-side helper: Require specific role(s)
 * Usage: const session = await requireRole(['BUSINESS_OWNER', 'ADMIN'])
 */
export async function requireRole(allowedRoles: string[]) {
  const session = await requireAuth();

  if (!allowedRoles.includes(session.user?.role || '')) {
    redirect('/unauthorized');
  }

  return session;
}

/**
 * API Route helper: Protect endpoints with role-based access
 * Usage:
 * export const POST = withRole(handler, ['BUSINESS_OWNER', 'ADMIN'])
 */
export function withRole(
  handler: (req: Request, session: any) => Promise<Response>,
  allowedRoles: string[]
) {
  return async (req: Request) => {
    const session = await getServerSession(authOptions);

    if (!session || !allowedRoles.includes(session.user?.role || '')) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return handler(req, session);
  };
}

/**
 * Declare augmented types for NextAuth session
 */
declare module 'next-auth' {
  interface Session {
    user?: {
      id: string;
      email?: string | null;
      name?: string | null;
      image?: string | null;
      role: string;
    };
  }

  interface User {
    role?: string;
    id?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role?: string;
    userId?: string;
  }
}

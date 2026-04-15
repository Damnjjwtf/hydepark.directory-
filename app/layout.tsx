import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import './globals.css';
import { SITE_CONFIG } from '@/lib/constants';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: SITE_CONFIG.name,
  description: SITE_CONFIG.description,
  openGraph: {
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    images: [SITE_CONFIG.ogImage],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white text-gray-900`}>
        <div className="min-h-screen flex flex-col">
          {/* Header Navigation */}
          <header className="border-b border-gray-200 bg-white sticky top-0 z-40">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
              <div className="flex items-center gap-8">
                <Link href="/" className="text-xl font-bold text-maroon-600">
                  Hyde Park
                </Link>
                <div className="hidden md:flex gap-6 text-sm">
                  <Link href="/search" className="hover:text-maroon-600">
                    Search
                  </Link>
                  <Link href="/about" className="hover:text-maroon-600">
                    About
                  </Link>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Link
                  href="/auth/signin"
                  className="text-sm font-medium hover:text-maroon-600"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/register"
                  className="text-sm font-medium px-3 py-1.5 bg-maroon-600 text-white rounded hover:bg-maroon-700"
                >
                  Get Started
                </Link>
              </div>
            </nav>
          </header>

          {/* Main content */}
          <main className="flex-1">{children}</main>

          {/* Footer */}
          <footer className="border-t border-gray-200 bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-3 gap-8 mb-8">
                <div>
                  <h3 className="font-semibold mb-3">For Students</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>
                      <Link href="/search" className="hover:text-maroon-600">
                        Directory
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="hover:text-maroon-600">
                        Community
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">For Business</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>
                      <Link href="#" className="hover:text-maroon-600">
                        Get Listed
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="hover:text-maroon-600">
                        Featured Listings
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Company</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>
                      <Link href="#" className="hover:text-maroon-600">
                        About
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="hover:text-maroon-600">
                        Contact
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="border-t border-gray-200 pt-8 text-center text-sm text-gray-600">
                <p>&copy; 2024 Hyde Park Directory. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}

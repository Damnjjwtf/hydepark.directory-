'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

interface Business {
  id: string;
  name: string;
  category?: string;
  address?: string;
  isFeatured: boolean;
  viewCount: number;
  createdAt: string;
}

export default function AdminBusinessesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check authorization
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
    if (status === 'authenticated' && session?.user?.role !== 'ADMIN') {
      router.push('/unauthorized');
    }
  }, [status, session, router]);

  // Fetch businesses
  useEffect(() => {
    if (session?.user?.role !== 'ADMIN') return;

    const fetchBusinesses = async () => {
      try {
        const response = await fetch('/api/businesses?limit=100');
        if (!response.ok) throw new Error('Failed to fetch businesses');

        const data = await response.json();
        setBusinesses(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchBusinesses();
  }, [session]);

  if (status === 'loading' || loading) {
    return (
      <div className="container-base py-12">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  if (!session || session.user?.role !== 'ADMIN') {
    return null; // Redirecting...
  }

  return (
    <div className="container-base py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="section-title">Manage Businesses</h1>
        <Link href="/admin/businesses/new" className="btn-primary">
          Add Business
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-red-700">
          {error}
        </div>
      )}

      {businesses.length === 0 ? (
        <div className="card text-center py-12">
          <p className="text-gray-600 mb-4">No businesses yet</p>
          <Link href="/admin/businesses/new" className="btn-primary inline-block">
            Add First Business
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-lg">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">Business Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Category</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Views</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {businesses.map((business) => (
                <tr key={business.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <Link
                      href={`/business/${business.id}`}
                      className="text-maroon-600 hover:underline font-medium"
                    >
                      {business.name}
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 capitalize">
                    {business.category || '—'}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        business.isFeatured
                          ? 'bg-maroon-50 text-maroon-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {business.isFeatured ? 'Featured' : 'Basic'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{business.viewCount}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-3 text-sm">
                      <Link
                        href={`/admin/businesses/${business.id}`}
                        className="text-maroon-600 hover:underline"
                      >
                        Edit
                      </Link>
                      <button className="text-red-600 hover:underline">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

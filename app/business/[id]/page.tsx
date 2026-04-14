'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Business {
  id: string;
  name: string;
  description?: string;
  category?: string;
  address?: string;
  lat?: string;
  lng?: string;
  phone?: string;
  website?: string;
  email?: string;
  instagramHandle?: string;
  isFeatured: boolean;
  logoUrl?: string;
  images?: string[];
  viewCount: number;
}

export default function BusinessDetailPage({ params }: { params: { id: string } }) {
  const [business, setBusiness] = useState<Business | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  // Fetch business details
  useEffect(() => {
    const fetchBusiness = async () => {
      try {
        const response = await fetch(`/api/businesses/${params.id}`);
        if (!response.ok) {
          throw new Error('Business not found');
        }
        const data = await response.json();
        setBusiness(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchBusiness();
  }, [params.id]);

  // Handle contact form submission
  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.get('email'),
          name: formData.get('name'),
          message: formData.get('message'),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit inquiry');
      }

      setFormSubmitted(true);
      (e.target as HTMLFormElement).reset();

      // Reset success message after 5 seconds
      setTimeout(() => setFormSubmitted(false), 5000);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to submit inquiry');
    } finally {
      setFormLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container-base py-12">
        <p className="text-gray-600">Loading business details...</p>
      </div>
    );
  }

  if (error || !business) {
    return (
      <div className="container-base py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          {error || 'Business not found'}
        </div>
        <Link href="/search" className="btn-secondary mt-4">
          ← Back to Search
        </Link>
      </div>
    );
  }

  return (
    <div className="container-base py-12">
      {/* Back Link */}
      <Link href="/search" className="text-maroon-600 hover:underline mb-6 inline-block">
        ← Back to Search
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Logo/Hero Image */}
          {business.logoUrl ? (
            <img
              src={business.logoUrl}
              alt={business.name}
              className="w-full h-64 object-cover rounded-lg mb-6"
            />
          ) : (
            <div className="w-full h-64 bg-gray-200 rounded-lg mb-6 flex items-center justify-center">
              <span className="text-gray-400">No image available</span>
            </div>
          )}

          {/* Business Header */}
          <div className="mb-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">{business.name}</h1>
                {business.category && (
                  <p className="text-lg text-gray-600 capitalize">{business.category}</p>
                )}
              </div>
              {business.isFeatured && (
                <div className="bg-maroon-600 text-white px-4 py-2 rounded-full font-semibold">
                  Featured
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          {business.description && (
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-3">About</h2>
              <p className="text-gray-700 whitespace-pre-wrap">{business.description}</p>
            </div>
          )}

          {/* Gallery */}
          {business.images && business.images.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-3">Gallery</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {business.images.map((image, idx) => (
                  <img
                    key={idx}
                    src={image}
                    alt={`${business.name} ${idx + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          {/* Contact Info Card */}
          <div className="card mb-6 sticky top-20">
            <h2 className="text-xl font-bold mb-4">Contact Information</h2>

            <div className="space-y-4">
              {business.address && (
                <div>
                  <p className="text-sm text-gray-600 mb-1">Address</p>
                  <p className="font-medium">{business.address}</p>
                </div>
              )}

              {business.phone && (
                <div>
                  <p className="text-sm text-gray-600 mb-1">Phone</p>
                  <a href={`tel:${business.phone}`} className="font-medium text-maroon-600 hover:underline">
                    {business.phone}
                  </a>
                </div>
              )}

              {business.email && (
                <div>
                  <p className="text-sm text-gray-600 mb-1">Email</p>
                  <a href={`mailto:${business.email}`} className="font-medium text-maroon-600 hover:underline">
                    {business.email}
                  </a>
                </div>
              )}

              {business.website && (
                <div>
                  <p className="text-sm text-gray-600 mb-1">Website</p>
                  <a
                    href={business.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-maroon-600 hover:underline break-all"
                  >
                    Visit Website
                  </a>
                </div>
              )}

              {business.instagramHandle && (
                <div>
                  <p className="text-sm text-gray-600 mb-1">Instagram</p>
                  <a
                    href={`https://instagram.com/${business.instagramHandle}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-maroon-600 hover:underline"
                  >
                    @{business.instagramHandle}
                  </a>
                </div>
              )}
            </div>

            {/* View Count */}
            <div className="mt-6 pt-6 border-t border-gray-200 text-sm text-gray-600">
              {business.viewCount} people viewed this business
            </div>
          </div>

          {/* Contact Form Card */}
          <div className="card">
            <h2 className="text-xl font-bold mb-4">Get in Touch</h2>

            {formSubmitted ? (
              <div className="bg-green-50 border border-green-200 text-green-700 rounded p-4">
                ✓ Your inquiry has been sent! The business will respond soon.
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="input-field w-full"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="input-field w-full"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    className="input-field w-full resize-none"
                    placeholder="Tell us what you'd like to discuss..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={formLoading}
                  className="btn-primary w-full disabled:opacity-50"
                >
                  {formLoading ? 'Sending...' : 'Send Inquiry'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

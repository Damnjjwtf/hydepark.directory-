'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BUSINESS_CATEGORIES } from '@/lib/constants';

interface Business {
  id: string;
  name: string;
  description?: string;
  category?: string;
  address?: string;
  phone?: string;
  website?: string;
  isFeatured: boolean;
  logoUrl?: string;
  viewCount: number;
}

interface SearchResponse {
  data: Business[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export default function SearchPage() {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Search filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch businesses
  useEffect(() => {
    const fetchBusinesses = async () => {
      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams();
        if (searchQuery) params.append('q', searchQuery);
        if (selectedCategory) params.append('category', selectedCategory);
        if (showFeaturedOnly) params.append('featured', 'true');
        params.append('page', currentPage.toString());

        const response = await fetch(`/api/businesses?${params}`);

        if (!response.ok) {
          throw new Error('Failed to fetch businesses');
        }

        const data: SearchResponse = await response.json();
        setBusinesses(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchBusinesses();
  }, [searchQuery, selectedCategory, showFeaturedOnly, currentPage]);

  return (
    <div className="container-base py-12">
      <h1 className="section-title">Discover Hyde Park Businesses</h1>

      {/* Search and Filter Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
        <div className="space-y-4">
          {/* Search Input */}
          <div>
            <label htmlFor="search" className="block text-sm font-medium mb-2">
              Search by name or description
            </label>
            <input
              id="search"
              type="text"
              placeholder="e.g., 'coffee', 'pizza', 'gym'..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="input-field w-full"
            />
          </div>

          {/* Category Filter */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium mb-2">
              Category
            </label>
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setCurrentPage(1);
              }}
              className="input-field w-full"
            >
              <option value="">All Categories</option>
              {BUSINESS_CATEGORIES.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          {/* Featured Only Checkbox */}
          <div className="flex items-center">
            <input
              id="featured-only"
              type="checkbox"
              checked={showFeaturedOnly}
              onChange={(e) => {
                setShowFeaturedOnly(e.target.checked);
                setCurrentPage(1);
              }}
              className="w-4 h-4"
            />
            <label htmlFor="featured-only" className="ml-2 text-sm font-medium">
              Show Featured Listings Only
            </label>
          </div>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8 text-red-700">
          {error}
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-600">Loading businesses...</p>
        </div>
      ) : businesses.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">
            No businesses found. Try adjusting your search filters.
          </p>
        </div>
      ) : (
        <>
          {/* Results Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {businesses.map((business) => (
              <div key={business.id} className="card group">
                {/* Logo/Image */}
                {business.logoUrl ? (
                  <img
                    src={business.logoUrl}
                    alt={business.name}
                    className="w-full h-32 object-cover rounded mb-4"
                  />
                ) : (
                  <div className="w-full h-32 bg-gray-200 rounded mb-4 flex items-center justify-center">
                    <span className="text-gray-400">No image</span>
                  </div>
                )}

                {/* Featured Badge */}
                {business.isFeatured && (
                  <div className="absolute top-4 right-4 bg-maroon-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    Featured
                  </div>
                )}

                {/* Business Info */}
                <h2 className="font-bold text-lg mb-2 group-hover:text-maroon-600">
                  {business.name}
                </h2>

                {business.category && (
                  <p className="text-sm text-gray-500 mb-2 capitalize">
                    {business.category}
                  </p>
                )}

                {business.description && (
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {business.description}
                  </p>
                )}

                {/* Contact Info */}
                <div className="space-y-1 mb-4 text-sm">
                  {business.address && (
                    <p className="text-gray-600">{business.address}</p>
                  )}
                  {business.phone && (
                    <p className="text-gray-600">{business.phone}</p>
                  )}
                  {business.website && (
                    <a
                      href={business.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-maroon-600 hover:underline"
                    >
                      Visit website
                    </a>
                  )}
                </div>

                {/* View Details Link */}
                <Link
                  href={`/business/${business.id}`}
                  className="btn-primary block text-center w-full"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {/* TODO: Add pagination controls when we have multiple pages */}
        </>
      )}
    </div>
  );
}

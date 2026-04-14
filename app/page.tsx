import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="bg-maroon-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="container-base text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-maroon-600 mb-4">
            Discover Your Hyde Park Community
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Find local businesses, connect with neighbors, and belong to a neighborhood that
            remembers you.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/search" className="btn-primary text-lg px-6 py-3">
              Browse Directory
            </Link>
            <Link href="/auth/register?role=BUSINESS_OWNER" className="btn-secondary text-lg px-6 py-3">
              List Your Business
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Section Placeholder */}
      <section className="container-base py-12">
        <div>
          <h2 className="section-title">Featured Businesses</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card">
              <div className="h-48 bg-gray-200 rounded mb-4"></div>
              <h3 className="font-semibold text-lg mb-2">Coming Soon</h3>
              <p className="text-gray-600">Featured businesses will appear here</p>
            </div>
          </div>
        </div>
      </section>

      {/* Value Props Section */}
      <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="container-base">
          <h2 className="section-title text-center">Why Hyde Park Directory</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-2">
              <h3 className="font-bold text-lg">For Students</h3>
              <p className="text-gray-600">
                One place to find all the restaurants, cafés, shops, and services you need.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-lg">For Businesses</h3>
              <p className="text-gray-600">
                Reach students and residents actively looking for local businesses like yours.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-lg">For Property Managers</h3>
              <p className="text-gray-600">
                Show tenants the vibrant community around them. Reduce turnover with engagement
                tools.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container-base py-12 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Discover Hyde Park?</h2>
        <p className="text-gray-600 mb-8">
          Sign up for our newsletter to get weekly recommendations, event updates, and community
          news.
        </p>
        <form className="max-w-md mx-auto flex gap-2">
          <input
            type="email"
            placeholder="your@email.com"
            className="input-field flex-1"
            required
          />
          <button type="submit" className="btn-primary">
            Subscribe
          </button>
        </form>
      </section>
    </div>
  );
}

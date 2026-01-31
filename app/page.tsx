import { Metadata } from 'next';
import { getAllPosts, getFeaturedPosts, getAllCategories } from '@/lib/cosmic';
import HeroSection from '@/components/HeroSection';
import PostCard from '@/components/PostCard';
import CategoryFilter from '@/components/CategoryFilter';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://insightmagazine.com';

export const metadata: Metadata = {
  title: 'Insight Magazine | Ideas that inspire',
  description: 'Discover the latest articles on technology, business, and lifestyle. Read thought-provoking content that informs, educates, and inspires your next big idea.',
  openGraph: {
    title: 'Insight Magazine | Ideas that inspire',
    description: 'Discover the latest articles on technology, business, and lifestyle. Read thought-provoking content that informs, educates, and inspires.',
    url: siteUrl,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Insight Magazine | Ideas that inspire',
    description: 'Discover the latest articles on technology, business, and lifestyle.',
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default async function HomePage() {
  const [posts, featuredPosts, categories] = await Promise.all([
    getAllPosts(),
    getFeaturedPosts(),
    getAllCategories(),
  ]);

  const heroPost = featuredPosts[0] || posts[0];
  const regularPosts = posts.filter(post => post.id !== heroPost?.id);

  // Generate JSON-LD for the homepage
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Insight Magazine',
    url: siteUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <div className="bg-white dark:bg-gray-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {heroPost && <HeroSection post={heroPost} />}
      
      <section className="container-wide py-16">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 md:mb-0">
            Latest Articles
          </h2>
          <CategoryFilter categories={categories} />
        </div>
        
        {regularPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-gray-600 dark:text-gray-400 text-center py-12">
            No articles found. Check back soon!
          </p>
        )}
      </section>
    </div>
  );
}
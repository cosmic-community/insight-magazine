// app/categories/[slug]/page.tsx
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getCategoryBySlug, getPostsByCategory, getAllCategories } from '@/lib/cosmic';
import PostCard from '@/components/PostCard';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://insightmagazine.com';

export async function generateStaticParams() {
  const categories = await getAllCategories();
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  
  if (!category) {
    return { title: 'Category Not Found' };
  }

  const categoryName = category.metadata?.name || category.title;
  const description = category.metadata?.description || `Browse all ${categoryName} articles on Insight Magazine.`;
  
  return {
    title: categoryName,
    description: description,
    openGraph: {
      title: `${categoryName} | Insight Magazine`,
      description: description,
      url: `${siteUrl}/categories/${slug}`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${categoryName} | Insight Magazine`,
      description: description,
    },
    alternates: {
      canonical: `${siteUrl}/categories/${slug}`,
    },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [category, posts] = await Promise.all([
    getCategoryBySlug(slug),
    getPostsByCategory(slug),
  ]);

  if (!category) {
    notFound();
  }

  const color = category.metadata?.color || '#6B7280';
  const categoryName = category.metadata?.name || category.title;

  // JSON-LD for category page
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: categoryName,
    description: category.metadata?.description || `Browse ${categoryName} articles`,
    url: `${siteUrl}/categories/${slug}`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: posts.map((post, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Article',
          headline: post.title,
          url: `${siteUrl}/posts/${post.slug}`,
          description: post.metadata?.excerpt || '',
        },
      })),
    },
  };

  return (
    <div className="container-wide py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Header */}
      <div className="mb-12">
        <Link
          href="/categories"
          className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors mb-4 inline-flex items-center gap-1"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          All Categories
        </Link>
        
        <div className="flex items-center gap-4 mb-4">
          <div
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: color }}
          />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
            {categoryName}
          </h1>
        </div>
        
        {category.metadata?.description && (
          <p className="text-xl text-gray-600 dark:text-gray-400">
            {category.metadata.description}
          </p>
        )}
      </div>

      {/* Posts Grid */}
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            No articles in this category yet.
          </p>
          <Link
            href="/"
            className="mt-4 inline-block text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium"
          >
            View all articles
          </Link>
        </div>
      )}
    </div>
  );
}
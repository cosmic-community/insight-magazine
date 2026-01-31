import { Metadata } from 'next';
import Link from 'next/link';
import { getAllCategories, getAllPosts } from '@/lib/cosmic';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://insightmagazine.com';

export const metadata: Metadata = {
  title: 'Categories',
  description: 'Browse all article categories on Insight Magazine. Find content on technology, business, lifestyle, and more topics that interest you.',
  openGraph: {
    title: 'Categories | Insight Magazine',
    description: 'Browse all article categories on Insight Magazine. Find content on technology, business, lifestyle, and more.',
    url: `${siteUrl}/categories`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Categories | Insight Magazine',
    description: 'Browse all article categories on Insight Magazine.',
  },
  alternates: {
    canonical: `${siteUrl}/categories`,
  },
};

export default async function CategoriesPage() {
  const [categories, posts] = await Promise.all([
    getAllCategories(),
    getAllPosts(),
  ]);

  // Count posts per category
  const categoryCounts: Record<string, number> = {};
  posts.forEach((post) => {
    const postCategories = post.metadata?.categories;
    if (postCategories && Array.isArray(postCategories)) {
      postCategories.forEach((cat) => {
        categoryCounts[cat.slug] = (categoryCounts[cat.slug] || 0) + 1;
      });
    }
  });

  // JSON-LD for categories listing
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Categories',
    description: 'Browse all article categories on Insight Magazine.',
    url: `${siteUrl}/categories`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: categories.map((category, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Thing',
          name: category.metadata?.name || category.title,
          url: `${siteUrl}/categories/${category.slug}`,
          description: category.metadata?.description || '',
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
      <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">Categories</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400 mb-12">
        Browse articles by topic
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => {
          const count = categoryCounts[category.slug] || 0;
          const color = category.metadata?.color || '#6B7280';
          
          return (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="group relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg dark:hover:shadow-gray-900/50 transition-all duration-300"
            >
              <div
                className="absolute top-0 left-0 w-2 h-full"
                style={{ backgroundColor: color }}
              />
              <div className="pl-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors mb-2">
                  {category.metadata?.name || category.title}
                </h2>
                {category.metadata?.description && (
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                    {category.metadata.description}
                  </p>
                )}
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {count} {count === 1 ? 'article' : 'articles'}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
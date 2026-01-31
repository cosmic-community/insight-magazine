// app/categories/[slug]/page.tsx
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getCategoryBySlug, getPostsByCategory, getAllCategories } from '@/lib/cosmic';
import PostCard from '@/components/PostCard';

export async function generateStaticParams() {
  const categories = await getAllCategories();
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  
  if (!category) {
    return { title: 'Category Not Found' };
  }
  
  return {
    title: `${category.metadata?.name || category.title} | Insight Magazine`,
    description: category.metadata?.description || `Browse ${category.title} articles`,
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

  return (
    <div className="container-wide py-16">
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
          {/* Changed: Added dark:text-gray-100 for dark mode support */}
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
            {category.metadata?.name || category.title}
          </h1>
        </div>
        
        {/* Changed: Added dark:text-gray-400 for dark mode support */}
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
          {/* Changed: Added dark:text-gray-400 for dark mode support */}
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
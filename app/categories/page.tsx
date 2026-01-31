import Link from 'next/link';
import { getAllCategories, getAllPosts } from '@/lib/cosmic';

export const metadata = {
  title: 'Categories | Insight Magazine',
  description: 'Browse all article categories on Insight Magazine',
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

  return (
    <div className="container-wide py-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Categories</h1>
      <p className="text-xl text-gray-600 mb-12">
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
              className="group relative overflow-hidden rounded-xl bg-white border border-gray-200 p-6 hover:shadow-lg transition-all duration-300"
            >
              <div
                className="absolute top-0 left-0 w-2 h-full"
                style={{ backgroundColor: color }}
              />
              <div className="pl-4">
                <h2 className="text-xl font-semibold text-gray-900 group-hover:text-primary-600 transition-colors mb-2">
                  {category.metadata?.name || category.title}
                </h2>
                {category.metadata?.description && (
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {category.metadata.description}
                  </p>
                )}
                <p className="text-sm text-gray-500">
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
import { getAllPosts, getFeaturedPosts, getAllCategories } from '@/lib/cosmic';
import HeroSection from '@/components/HeroSection';
import PostCard from '@/components/PostCard';
import CategoryFilter from '@/components/CategoryFilter';

export default async function HomePage() {
  const [posts, featuredPosts, categories] = await Promise.all([
    getAllPosts(),
    getFeaturedPosts(),
    getAllCategories(),
  ]);

  const heroPost = featuredPosts[0] || posts[0];
  const regularPosts = posts.filter(post => post.id !== heroPost?.id);

  return (
    <div>
      {heroPost && <HeroSection post={heroPost} />}
      
      <section className="container-wide py-16">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">
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
          <p className="text-gray-600 text-center py-12">
            No articles found. Check back soon!
          </p>
        )}
      </section>
    </div>
  );
}
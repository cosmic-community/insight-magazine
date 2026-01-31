// app/authors/[slug]/page.tsx
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAuthorBySlug, getPostsByAuthor, getAllAuthors } from '@/lib/cosmic';
import PostCard from '@/components/PostCard';

export async function generateStaticParams() {
  const authors = await getAllAuthors();
  return authors.map((author) => ({
    slug: author.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const author = await getAuthorBySlug(slug);
  
  if (!author) {
    return { title: 'Author Not Found' };
  }
  
  return {
    title: `${author.metadata?.name || author.title} | Insight Magazine`,
    description: author.metadata?.bio || `Articles by ${author.title}`,
  };
}

export default async function AuthorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [author, posts] = await Promise.all([
    getAuthorBySlug(slug),
    getPostsByAuthor(slug),
  ]);

  if (!author) {
    notFound();
  }

  const avatar = author.metadata?.avatar;
  const twitter = author.metadata?.twitter;

  return (
    <div className="container-wide py-16">
      {/* Author Header */}
      <div className="mb-12">
        <Link
          href="/authors"
          className="text-sm text-gray-500 hover:text-primary-600 transition-colors mb-4 inline-flex items-center gap-1"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          All Authors
        </Link>
        
        <div className="flex flex-col md:flex-row items-start gap-8 mt-4">
          {avatar ? (
            <img
              src={`${avatar.imgix_url}?w=300&h=300&fit=crop&auto=format,compress`}
              alt={author.metadata?.name || author.title}
              className="w-40 h-40 rounded-full object-cover shadow-lg"
            />
          ) : (
            <div className="w-40 h-40 rounded-full bg-gray-200 flex items-center justify-center shadow-lg">
              <span className="text-5xl text-gray-500">
                {(author.metadata?.name || author.title).charAt(0)}
              </span>
            </div>
          )}
          
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              {author.metadata?.name || author.title}
            </h1>
            
            {author.metadata?.bio && (
              <p className="text-lg text-gray-600 mb-4 max-w-2xl">
                {author.metadata.bio}
              </p>
            )}
            
            <div className="flex items-center gap-4">
              {twitter && (
                <a
                  href={`https://twitter.com/${twitter.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  {twitter}
                </a>
              )}
              
              {author.metadata?.email && (
                <a
                  href={`mailto:${author.metadata.email}`}
                  className="inline-flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Email
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Author's Posts */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          Articles by {author.metadata?.name || author.title}
          <span className="ml-2 text-gray-500 font-normal">({posts.length})</span>
        </h2>
        
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} showAuthor={false} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-600 text-lg">
              No articles published yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
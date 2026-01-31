import { Metadata } from 'next';
import Link from 'next/link';
import { getAllAuthors, getAllPosts } from '@/lib/cosmic';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://insightmagazine.com';

export const metadata: Metadata = {
  title: 'Our Authors',
  description: 'Meet the talented writers and contributors behind Insight Magazine. Discover their expertise and read their latest articles on technology, business, and lifestyle.',
  openGraph: {
    title: 'Our Authors | Insight Magazine',
    description: 'Meet the talented writers and contributors behind Insight Magazine.',
    url: `${siteUrl}/authors`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Authors | Insight Magazine',
    description: 'Meet the talented writers and contributors behind Insight Magazine.',
  },
  alternates: {
    canonical: `${siteUrl}/authors`,
  },
};

export default async function AuthorsPage() {
  const [authors, posts] = await Promise.all([
    getAllAuthors(),
    getAllPosts(),
  ]);

  // Count posts per author
  const authorCounts: Record<string, number> = {};
  posts.forEach((post) => {
    const author = post.metadata?.author;
    if (author) {
      authorCounts[author.slug] = (authorCounts[author.slug] || 0) + 1;
    }
  });

  // JSON-LD for authors listing
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Our Authors',
    description: 'Meet the talented writers and contributors behind Insight Magazine.',
    url: `${siteUrl}/authors`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: authors.map((author, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Person',
          name: author.metadata?.name || author.title,
          url: `${siteUrl}/authors/${author.slug}`,
          description: author.metadata?.bio || '',
          image: author.metadata?.avatar?.imgix_url ? `${author.metadata.avatar.imgix_url}?w=400&h=400&fit=crop&auto=format` : undefined,
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
      <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">Our Authors</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400 mb-12">
        Meet the talented writers behind our articles
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {authors.map((author) => {
          const count = authorCounts[author.slug] || 0;
          const avatar = author.metadata?.avatar;
          
          return (
            <Link
              key={author.id}
              href={`/authors/${author.slug}`}
              className="group bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg dark:hover:shadow-gray-900/50 transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                {avatar ? (
                  <img
                    src={`${avatar.imgix_url}?w=160&h=160&fit=crop&auto=format,compress`}
                    alt={author.metadata?.name || author.title}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    <span className="text-2xl text-gray-500 dark:text-gray-400">
                      {(author.metadata?.name || author.title).charAt(0)}
                    </span>
                  </div>
                )}
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {author.metadata?.name || author.title}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {count} {count === 1 ? 'article' : 'articles'}
                  </p>
                </div>
              </div>
              
              {author.metadata?.bio && (
                <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">
                  {author.metadata.bio}
                </p>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
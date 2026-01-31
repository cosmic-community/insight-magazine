// app/posts/[slug]/page.tsx
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { getPostBySlug, getAllPosts, getRelatedPosts } from '@/lib/cosmic';
import { calculateReadingTime, formatDate } from '@/types';
import CategoryBadge from '@/components/CategoryBadge';
import AuthorCard from '@/components/AuthorCard';
import PostCard from '@/components/PostCard';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://insightmagazine.com';

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  
  if (!post) {
    return { title: 'Post Not Found' };
  }

  const description = post.metadata?.excerpt || 'Read this article on Insight Magazine';
  const featuredImage = post.metadata?.featured_image;
  const imageUrl = featuredImage?.imgix_url 
    ? `${featuredImage.imgix_url}?w=1200&h=630&fit=crop&auto=format`
    : undefined;
  const authorName = post.metadata?.author?.metadata?.name || post.metadata?.author?.title;
  const publishedDate = post.metadata?.published_date;
  
  return {
    title: post.title,
    description: description,
    authors: authorName ? [{ name: authorName }] : undefined,
    openGraph: {
      title: post.title,
      description: description,
      url: `${siteUrl}/posts/${slug}`,
      type: 'article',
      publishedTime: publishedDate || undefined,
      authors: authorName ? [authorName] : undefined,
      images: imageUrl ? [{ url: imageUrl, width: 1200, height: 630, alt: post.title }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: description,
      images: imageUrl ? [imageUrl] : undefined,
    },
    alternates: {
      canonical: `${siteUrl}/posts/${slug}`,
    },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  
  if (!post) {
    notFound();
  }
  
  const categories = post.metadata?.categories;
  const firstCategory = categories && categories.length > 0 ? categories[0] : undefined;
  const relatedPosts = await getRelatedPosts(post.id, firstCategory?.slug);
  
  const content = post.metadata?.content || '';
  const readingTime = calculateReadingTime(content);
  const publishedDate = post.metadata?.published_date;
  const author = post.metadata?.author;
  const featuredImage = post.metadata?.featured_image;

  // JSON-LD for Article
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.metadata?.excerpt || '',
    image: featuredImage?.imgix_url ? `${featuredImage.imgix_url}?w=1200&h=630&fit=crop&auto=format` : undefined,
    url: `${siteUrl}/posts/${slug}`,
    datePublished: publishedDate || undefined,
    dateModified: post.modified_at || publishedDate || undefined,
    author: author ? {
      '@type': 'Person',
      name: author.metadata?.name || author.title,
      url: `${siteUrl}/authors/${author.slug}`,
    } : undefined,
    publisher: {
      '@type': 'Organization',
      name: 'Insight Magazine',
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/og-image.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/posts/${slug}`,
    },
    wordCount: content.split(/\s+/).length,
    articleSection: categories?.map(c => c.metadata?.name || c.title).join(', '),
  };

  // BreadcrumbList JSON-LD
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteUrl,
      },
      ...(firstCategory ? [{
        '@type': 'ListItem',
        position: 2,
        name: firstCategory.metadata?.name || firstCategory.title,
        item: `${siteUrl}/categories/${firstCategory.slug}`,
      }] : []),
      {
        '@type': 'ListItem',
        position: firstCategory ? 3 : 2,
        name: post.title,
        item: `${siteUrl}/posts/${slug}`,
      },
    ],
  };

  return (
    <article className="bg-white dark:bg-gray-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {/* Hero Image */}
      {featuredImage && (
        <div className="relative h-[50vh] md:h-[60vh] w-full">
          <img
            src={`${featuredImage.imgix_url}?w=1920&h=1080&fit=crop&auto=format,compress`}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </div>
      )}
      
      {/* Content */}
      <div className="container-narrow -mt-32 relative z-10">
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl p-8 md:p-12">
          {/* Categories */}
          {categories && categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {categories.map((category) => (
                <CategoryBadge key={category.id} category={category} />
              ))}
            </div>
          )}
          
          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            {post.title}
          </h1>
          
          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
            {author && (
              <Link 
                href={`/authors/${author.slug}`}
                className="flex items-center gap-2 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                {author.metadata?.avatar && (
                  <img
                    src={`${author.metadata.avatar.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
                    alt={author.metadata?.name || author.title}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                )}
                <span className="font-medium">{author.metadata?.name || author.title}</span>
              </Link>
            )}
            
            {publishedDate && (
              <time dateTime={publishedDate}>
                {formatDate(publishedDate)}
              </time>
            )}
            
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {readingTime} min read
            </span>
          </div>
          
          {/* Article Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
          
          {/* Author Bio */}
          {author && (
            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
              <AuthorCard author={author} showBio />
            </div>
          )}
        </div>
      </div>
      
      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="container-wide py-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            Related Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedPosts.map((relatedPost) => (
              <PostCard key={relatedPost.id} post={relatedPost} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
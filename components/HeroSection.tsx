import Link from 'next/link';
import { BlogPost, formatDate, calculateReadingTime } from '@/types';
import CategoryBadge from './CategoryBadge';

interface HeroSectionProps {
  post: BlogPost;
}

export default function HeroSection({ post }: HeroSectionProps) {
  const featuredImage = post.metadata?.featured_image;
  const categories = post.metadata?.categories;
  const author = post.metadata?.author;
  const publishedDate = post.metadata?.published_date;
  const content = post.metadata?.content || '';
  const readingTime = calculateReadingTime(content);

  return (
    <section className="relative">
      {/* Background Image */}
      <div className="h-[70vh] md:h-[80vh] relative">
        {featuredImage ? (
          <img
            src={`${featuredImage.imgix_url}?w=1920&h=1080&fit=crop&auto=format,compress`}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary-600 to-primary-900" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      </div>
      
      {/* Content */}
      <div className="absolute inset-0 flex items-end">
        <div className="container-wide pb-16 md:pb-24">
          <div className="max-w-3xl">
            {/* Categories - Changed: Added variant="hero" for solid background */}
            {categories && categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {categories.map((category) => (
                  <CategoryBadge key={category.id} category={category} variant="hero" />
                ))}
              </div>
            )}
            
            {/* Title */}
            <Link href={`/posts/${post.slug}`}>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 hover:text-primary-200 transition-colors leading-tight">
                {post.title}
              </h1>
            </Link>
            
            {/* Excerpt */}
            {post.metadata?.excerpt && (
              <p className="text-lg md:text-xl text-gray-200 mb-6 line-clamp-2">
                {post.metadata.excerpt}
              </p>
            )}
            
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300">
              {author && (
                <Link 
                  href={`/authors/${author.slug}`}
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  {author.metadata?.avatar && (
                    <img
                      src={`${author.metadata.avatar.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
                      alt={author.metadata?.name || author.title}
                      className="w-8 h-8 rounded-full object-cover border-2 border-white/20"
                    />
                  )}
                  <span className="font-medium">{author.metadata?.name || author.title}</span>
                </Link>
              )}
              
              {publishedDate && (
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {formatDate(publishedDate)}
                </span>
              )}
              
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {readingTime} min read
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
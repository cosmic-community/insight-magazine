import Link from 'next/link';
import { BlogPost, formatDate, calculateReadingTime } from '@/types';
import CategoryBadge from './CategoryBadge';

interface PostCardProps {
  post: BlogPost;
  showAuthor?: boolean;
}

export default function PostCard({ post, showAuthor = true }: PostCardProps) {
  const featuredImage = post.metadata?.featured_image;
  const categories = post.metadata?.categories;
  const author = post.metadata?.author;
  const publishedDate = post.metadata?.published_date;
  const content = post.metadata?.content || '';
  const readingTime = calculateReadingTime(content);

  return (
    <article className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-gray-900/50 transition-all duration-300">
      {/* Image */}
      <Link href={`/posts/${post.slug}`} className="block relative overflow-hidden">
        {featuredImage ? (
          <img
            src={`${featuredImage.imgix_url}?w=800&h=450&fit=crop&auto=format,compress`}
            alt={post.title}
            className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full aspect-video bg-gradient-to-br from-primary-400 to-primary-600" />
        )}
      </Link>
      
      {/* Content */}
      <div className="p-6">
        {/* Categories */}
        {categories && categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {categories.slice(0, 2).map((category) => (
              <CategoryBadge key={category.id} category={category} size="sm" />
            ))}
          </div>
        )}
        
        {/* Title */}
        <Link href={`/posts/${post.slug}`}>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
            {post.title}
          </h2>
        </Link>
        
        {/* Excerpt */}
        {post.metadata?.excerpt && (
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
            {post.metadata.excerpt}
          </p>
        )}
        
        {/* Meta */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
          {showAuthor && author ? (
            <Link 
              href={`/authors/${author.slug}`}
              className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              {author.metadata?.avatar ? (
                <img
                  src={`${author.metadata.avatar.imgix_url}?w=64&h=64&fit=crop&auto=format,compress`}
                  alt={author.metadata?.name || author.title}
                  className="w-6 h-6 rounded-full object-cover"
                />
              ) : (
                <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-xs text-gray-600 dark:text-gray-300">
                  {(author.metadata?.name || author.title).charAt(0)}
                </div>
              )}
              <span>{author.metadata?.name || author.title}</span>
            </Link>
          ) : publishedDate ? (
            <span className="text-sm text-gray-500 dark:text-gray-500">
              {formatDate(publishedDate)}
            </span>
          ) : (
            <span />
          )}
          
          <span className="text-sm text-gray-500 dark:text-gray-500 flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {readingTime} min
          </span>
        </div>
      </div>
    </article>
  );
}
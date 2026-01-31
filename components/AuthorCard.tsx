import Link from 'next/link';
import { Author } from '@/types';

interface AuthorCardProps {
  author: Author;
  showBio?: boolean;
}

export default function AuthorCard({ author, showBio = false }: AuthorCardProps) {
  const avatar = author.metadata?.avatar;
  const twitter = author.metadata?.twitter;

  return (
    <div className="flex items-start gap-4">
      <Link href={`/authors/${author.slug}`}>
        {avatar ? (
          <img
            src={`${avatar.imgix_url}?w=160&h=160&fit=crop&auto=format,compress`}
            alt={author.metadata?.name || author.title}
            className="w-16 h-16 rounded-full object-cover"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            <span className="text-xl text-gray-500 dark:text-gray-400">
              {(author.metadata?.name || author.title).charAt(0)}
            </span>
          </div>
        )}
      </Link>
      
      <div className="flex-1">
        <Link 
          href={`/authors/${author.slug}`}
          className="text-lg font-semibold text-gray-900 dark:text-gray-100 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
        >
          {author.metadata?.name || author.title}
        </Link>
        
        {showBio && author.metadata?.bio && (
          <p className="mt-1 text-gray-600 dark:text-gray-400 text-sm">
            {author.metadata.bio}
          </p>
        )}
        
        {twitter && (
          <a
            href={`https://twitter.com/${twitter.replace('@', '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            {twitter}
          </a>
        )}
      </div>
    </div>
  );
}
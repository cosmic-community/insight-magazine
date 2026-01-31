export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, unknown>;
  type: string;
  created_at: string;
  modified_at: string;
  status?: string;
  published_at?: string;
  thumbnail?: string;
  bucket?: string;
}

export interface FeaturedImage {
  url: string;
  imgix_url: string;
}

export interface Category extends CosmicObject {
  type: 'categories';
  metadata: {
    name: string;
    description?: string;
    color?: string;
  };
}

export interface Author extends CosmicObject {
  type: 'authors';
  metadata: {
    name: string;
    bio?: string;
    avatar?: FeaturedImage;
    email?: string;
    twitter?: string;
  };
}

export interface BlogPost extends CosmicObject {
  type: 'blog-posts';
  metadata: {
    content: string;
    excerpt?: string;
    featured_image?: FeaturedImage;
    author?: Author;
    categories?: Category[];
    published_date?: string;
    is_featured?: boolean;
  };
}

// Changed: Added AboutPage interface for the About page content
export interface AboutPage extends CosmicObject {
  type: 'about-pages';
  metadata: {
    headline: string;
    content: string;
    featured_image?: FeaturedImage;
    mission_title?: string;
    mission_content?: string;
    team_title?: string;
    team_content?: string;
  };
}

// Changed: Added PoweredBy interface for the Powered By section
export interface PoweredBy extends CosmicObject {
  type: 'powered-by';
  metadata: {
    name: string;
    description?: string;
    logo?: FeaturedImage;
    website_url?: string;
  };
}

// Simple error helper for Cosmic SDK
export function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Helper to calculate reading time
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

// Helper to format date
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
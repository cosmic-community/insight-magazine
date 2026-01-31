import { createBucketClient } from '@cosmicjs/sdk';
import { BlogPost, Author, Category, AboutPage, PoweredBy, hasStatus } from '@/types';

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
  apiEnvironment: 'staging',
});

export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'blog-posts' })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1);
    
    const posts = response.objects as BlogPost[];
    
    // Sort by published_date (newest first)
    return posts.sort((a, b) => {
      const dateA = new Date(a.metadata?.published_date || a.created_at).getTime();
      const dateB = new Date(b.metadata?.published_date || b.created_at).getTime();
      return dateB - dateA;
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch posts');
  }
}

export async function getFeaturedPosts(): Promise<BlogPost[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'blog-posts', 'metadata.is_featured': true })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1);
    
    return response.objects as BlogPost[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch featured posts');
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'blog-posts', slug })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1);
    
    return response.object as BlogPost;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch post');
  }
}

export async function getPostsByCategory(categorySlug: string): Promise<BlogPost[]> {
  try {
    const allPosts = await getAllPosts();
    return allPosts.filter(post => {
      const categories = post.metadata?.categories;
      if (!categories || !Array.isArray(categories)) return false;
      return categories.some(cat => cat.slug === categorySlug);
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch posts by category');
  }
}

export async function getPostsByAuthor(authorSlug: string): Promise<BlogPost[]> {
  try {
    const allPosts = await getAllPosts();
    return allPosts.filter(post => {
      const author = post.metadata?.author;
      return author && author.slug === authorSlug;
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch posts by author');
  }
}

export async function getAllCategories(): Promise<Category[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'categories' })
      .props(['id', 'title', 'slug', 'metadata']);
    
    return response.objects as Category[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch categories');
  }
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'categories', slug })
      .props(['id', 'title', 'slug', 'metadata']);
    
    return response.object as Category;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch category');
  }
}

export async function getAllAuthors(): Promise<Author[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'authors' })
      .props(['id', 'title', 'slug', 'metadata']);
    
    return response.objects as Author[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch authors');
  }
}

export async function getAuthorBySlug(slug: string): Promise<Author | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'authors', slug })
      .props(['id', 'title', 'slug', 'metadata']);
    
    return response.object as Author;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch author');
  }
}

export async function getRelatedPosts(currentPostId: string, categorySlug?: string): Promise<BlogPost[]> {
  try {
    const allPosts = await getAllPosts();
    let relatedPosts = allPosts.filter(post => post.id !== currentPostId);
    
    if (categorySlug) {
      const sameCategoryPosts = relatedPosts.filter(post => {
        const categories = post.metadata?.categories;
        if (!categories || !Array.isArray(categories)) return false;
        return categories.some(cat => cat.slug === categorySlug);
      });
      
      if (sameCategoryPosts.length >= 2) {
        relatedPosts = sameCategoryPosts;
      }
    }
    
    return relatedPosts.slice(0, 3);
  } catch (error) {
    return [];
  }
}

// Changed: Added function to fetch About page content
export async function getAboutPage(): Promise<AboutPage | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'about-pages', slug: 'about' })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1);
    
    return response.object as AboutPage;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch about page');
  }
}

// Changed: Added function to fetch Powered By items
export async function getPoweredByItems(): Promise<PoweredBy[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'powered-by' })
      .props(['id', 'title', 'slug', 'metadata']);
    
    return response.objects as PoweredBy[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch powered by items');
  }
}
# Insight Magazine

![Insight Magazine](https://imgix.cosmicjs.com/d7c8bec0-fe58-11f0-a969-0bcd7c3c4c42-photo-1559136555-9303baea8ebd-1769831797494.jpg?w=1200&h=400&fit=crop&auto=format,compress)

A beautifully designed magazine-style blog platform built with Next.js 16 and powered by Cosmic. Features category filtering, author profile pages, and a sophisticated editorial design that puts your content front and center.

## Features

- 📰 **Magazine-Style Layout** - Hero section with featured articles and elegant card grids
- 🏷️ **Category Filtering** - Browse posts by category with color-coded badges
- 👤 **Author Profiles** - Dedicated pages for each writer with their bio and articles
- 📖 **Beautiful Article Pages** - Clean reading experience with markdown support
- ⏱️ **Reading Time Estimates** - Automatically calculated for each article
- 📱 **Fully Responsive** - Optimized for all screen sizes
- ⚡ **Server-Side Rendering** - Fast page loads with Next.js App Router
- 🎨 **Tailwind CSS** - Modern styling with custom design tokens

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](http://localhost:3040/projects/new?clone_bucket=697d7cab168f6301f399602f&clone_repository=697d86f5168f6301f399603e)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> No content model prompt provided - app built from existing content structure

### Code Generation Prompt

> "Blog/Magazine Website Next.js Category filtering Author pages Magazine-style editorial"

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- [Next.js 16](https://nextjs.org/) - React framework with App Router
- [Cosmic](https://www.cosmicjs.com/) - Headless CMS
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [React Markdown](https://github.com/remarkjs/react-markdown) - Markdown rendering

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account with your blog content

### Installation

1. Clone the repository
2. Install dependencies:

```bash
bun install
```

3. Set up environment variables:

```bash
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:

```bash
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## Cosmic SDK Examples

### Fetching Posts with Depth

```typescript
const { objects: posts } = await cosmic.objects
  .find({ type: 'blog-posts' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1);
```

### Fetching Single Post by Slug

```typescript
const { object: post } = await cosmic.objects
  .findOne({ type: 'blog-posts', slug: 'my-post' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1);
```

## Cosmic CMS Integration

This app uses the following content types from your Cosmic bucket:

- **Blog Posts** - Articles with content, images, authors, and categories
- **Authors** - Writer profiles with avatars and social links
- **Categories** - Content organization with custom colors

## Deployment Options

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Add your environment variables
4. Deploy!

### Netlify

1. Push your code to GitHub
2. Import on [Netlify](https://netlify.com)
3. Set build command: `bun run build`
4. Add environment variables
5. Deploy!

<!-- README_END -->
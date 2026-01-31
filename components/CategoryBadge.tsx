'use client';

import Link from 'next/link';
import { Category } from '@/types';

interface CategoryBadgeProps {
  category: Category;
  size?: 'sm' | 'md';
  variant?: 'default' | 'hero';
}

export default function CategoryBadge({ category, size = 'md', variant = 'default' }: CategoryBadgeProps) {
  const color = category.metadata?.color || '#6B7280';
  
  const sizeClasses = size === 'sm' 
    ? 'px-2 py-1 text-xs' 
    : 'px-3 py-1.5 text-sm';

  // Hero variant: solid background for visibility over images
  // Default variant: semi-transparent background
  const isHero = variant === 'hero';
  
  // For hero variant, use white/dark background with colored text
  // For default variant, use colored semi-transparent background
  const bgStyle = isHero 
    ? { backgroundColor: 'rgba(255, 255, 255, 0.95)' }
    : { backgroundColor: `${color}20`, color: color };
  
  const textColorClass = isHero ? '' : '';
  const textStyle = isHero ? { color: color } : { color: color };

  return (
    <Link
      href={`/categories/${category.slug}`}
      className={`inline-flex items-center gap-1.5 rounded-full font-medium transition-all hover:opacity-80 ${sizeClasses} ${isHero ? 'shadow-sm backdrop-blur-sm dark:bg-gray-900/90' : ''}`}
      style={bgStyle}
    >
      <span
        className="w-2 h-2 rounded-full"
        style={{ backgroundColor: color }}
      />
      <span style={textStyle}>
        {category.metadata?.name || category.title}
      </span>
    </Link>
  );
}
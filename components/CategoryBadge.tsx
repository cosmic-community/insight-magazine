'use client';

import Link from 'next/link';
import { Category } from '@/types';

interface CategoryBadgeProps {
  category: Category;
  size?: 'sm' | 'md';
}

export default function CategoryBadge({ category, size = 'md' }: CategoryBadgeProps) {
  const color = category.metadata?.color || '#6B7280';
  
  const sizeClasses = size === 'sm' 
    ? 'px-2 py-1 text-xs' 
    : 'px-3 py-1.5 text-sm';

  // Check if we're in dark mode to adjust opacity
  const isDark = typeof window !== 'undefined' && document.documentElement.classList.contains('dark');
  const bgOpacity = isDark ? '35' : '20'; // Changed: Higher opacity for dark mode visibility

  return (
    <Link
      href={`/categories/${category.slug}`}
      className={`inline-flex items-center gap-1.5 rounded-full font-medium transition-all hover:opacity-80 ${sizeClasses}`}
      style={{
        backgroundColor: `${color}${bgOpacity}`,
        color: color,
      }}
    >
      <span
        className="w-2 h-2 rounded-full"
        style={{ backgroundColor: color }}
      />
      {category.metadata?.name || category.title}
    </Link>
  );
}
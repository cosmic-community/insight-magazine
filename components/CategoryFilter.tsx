import Link from 'next/link';
import { Category } from '@/types';

interface CategoryFilterProps {
  categories: Category[];
}

export default function CategoryFilter({ categories }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => {
        const color = category.metadata?.color || '#6B7280';
        
        return (
          <Link
            key={category.id}
            href={`/categories/${category.slug}`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 text-sm font-medium text-gray-700 hover:border-gray-300 hover:bg-gray-50 transition-all"
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: color }}
            />
            {category.metadata?.name || category.title}
          </Link>
        );
      })}
    </div>
  );
}
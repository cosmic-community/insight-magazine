import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white border-t border-gray-800 dark:border-gray-800">
      <div className="container-wide py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="text-2xl font-bold">
              Insight<span className="text-primary-400">.</span>
            </Link>
            <p className="mt-4 text-gray-400 dark:text-gray-500 max-w-md">
              Ideas that inspire. Discover articles on technology, business, and lifestyle from our talented writers.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-300 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-300 transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/authors" className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-300 transition-colors">
                  Authors
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Categories */}
          <div>
            <h3 className="font-semibold text-white mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/categories/technology" className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-300 transition-colors">
                  Technology
                </Link>
              </li>
              <li>
                <Link href="/categories/business" className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-300 transition-colors">
                  Business
                </Link>
              </li>
              <li>
                <Link href="/categories/lifestyle" className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-300 transition-colors">
                  Lifestyle
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-800 dark:border-gray-800 text-center text-gray-500 dark:text-gray-600 text-sm">
          © {currentYear} Insight Magazine. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
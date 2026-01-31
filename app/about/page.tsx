import { getAboutPage, getAllAuthors } from '@/lib/cosmic';
import Link from 'next/link';

export const metadata = {
  title: 'About | Insight Magazine',
  description: 'Learn more about Insight Magazine and our mission to bring you inspiring ideas.',
};

export default async function AboutPage() {
  const [aboutPage, authors] = await Promise.all([
    getAboutPage(),
    getAllAuthors(),
  ]);

  return (
    <div className="bg-white dark:bg-gray-950">
      {/* Hero Section */}
      <section className="relative">
        {aboutPage?.metadata?.featured_image ? (
          <div className="relative h-[400px] md:h-[500px]">
            <img
              src={`${aboutPage.metadata.featured_image.imgix_url}?w=1920&h=1000&fit=crop&auto=format,compress`}
              alt={aboutPage.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white px-4">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                  {aboutPage?.metadata?.headline || 'About Us'}
                </h1>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-gradient-to-br from-primary-600 to-primary-800 dark:from-primary-700 dark:to-primary-900 py-20 md:py-32">
            <div className="container-wide text-center text-white">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                {aboutPage?.metadata?.headline || 'About Us'}
              </h1>
            </div>
          </div>
        )}
      </section>

      {/* Main Content */}
      <section className="container-wide py-16">
        <div className="max-w-3xl mx-auto">
          {aboutPage?.metadata?.content ? (
            <div 
              className="prose prose-lg dark:prose-invert prose-primary max-w-none mb-16"
              dangerouslySetInnerHTML={{ __html: aboutPage.metadata.content }}
            />
          ) : (
            <div className="prose prose-lg dark:prose-invert prose-primary max-w-none mb-16">
              <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
                Welcome to Insight Magazine, your destination for thought-provoking articles on technology, business, and lifestyle. 
                We believe in the power of ideas to inspire and transform.
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Our mission is to bring you carefully curated content that informs, educates, and entertains. 
                Whether you're looking for the latest tech trends, business insights, or lifestyle tips, 
                we've got you covered.
              </p>
            </div>
          )}

          {/* Mission Section */}
          {(aboutPage?.metadata?.mission_title || aboutPage?.metadata?.mission_content) && (
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                {aboutPage.metadata.mission_title || 'Our Mission'}
              </h2>
              {aboutPage.metadata.mission_content && (
                <div 
                  className="prose prose-lg dark:prose-invert prose-primary max-w-none"
                  dangerouslySetInnerHTML={{ __html: aboutPage.metadata.mission_content }}
                />
              )}
            </div>
          )}

          {/* Team Section */}
          {(aboutPage?.metadata?.team_title || aboutPage?.metadata?.team_content) && (
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                {aboutPage.metadata.team_title || 'Our Team'}
              </h2>
              {aboutPage.metadata.team_content && (
                <div 
                  className="prose prose-lg dark:prose-invert prose-primary max-w-none"
                  dangerouslySetInnerHTML={{ __html: aboutPage.metadata.team_content }}
                />
              )}
            </div>
          )}
        </div>
      </section>

      {/* Authors Section */}
      {authors.length > 0 && (
        <section className="bg-gray-50 dark:bg-gray-900 py-16">
          <div className="container-wide">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 text-center">
              Meet Our Writers
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-center mb-12 max-w-2xl mx-auto">
              Our talented team of writers brings diverse perspectives and expertise to every article.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {authors.slice(0, 6).map((author) => {
                const avatar = author.metadata?.avatar;
                
                return (
                  <Link
                    key={author.id}
                    href={`/authors/${author.slug}`}
                    className="group bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg dark:hover:shadow-gray-900/50 transition-all duration-300 text-center"
                  >
                    <div className="flex flex-col items-center">
                      {avatar ? (
                        <img
                          src={`${avatar.imgix_url}?w=200&h=200&fit=crop&auto=format,compress`}
                          alt={author.metadata?.name || author.title}
                          className="w-24 h-24 rounded-full object-cover mb-4"
                        />
                      ) : (
                        <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mb-4">
                          <span className="text-3xl text-gray-500 dark:text-gray-400">
                            {(author.metadata?.name || author.title).charAt(0)}
                          </span>
                        </div>
                      )}
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors mb-2">
                        {author.metadata?.name || author.title}
                      </h3>
                      {author.metadata?.bio && (
                        <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                          {author.metadata.bio}
                        </p>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>

            {authors.length > 6 && (
              <div className="text-center mt-10">
                <Link
                  href="/authors"
                  className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-colors"
                >
                  View all authors
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            )}
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="container-wide py-16">
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 dark:from-primary-700 dark:to-primary-800 rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Want to contribute?</h2>
          <p className="text-primary-100 mb-8 max-w-2xl mx-auto">
            We're always looking for talented writers to join our team. If you have a passion for sharing ideas and insights, we'd love to hear from you.
          </p>
          <Link
            href="/authors"
            className="inline-flex items-center gap-2 bg-white text-primary-700 px-6 py-3 rounded-lg font-medium hover:bg-primary-50 transition-colors"
          >
            Learn more about our authors
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
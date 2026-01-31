import type { Metadata, Viewport } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CosmicBadge from '@/components/CosmicBadge';
import ThemeProvider from '@/components/ThemeProvider';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://insightmagazine.com';
const siteName = 'Insight Magazine';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#030712' },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Insight Magazine | Ideas that inspire',
    template: '%s | Insight Magazine',
  },
  description: 'Discover thought-provoking articles on technology, business, and lifestyle. Insight Magazine brings you carefully curated content that informs, educates, and inspires.',
  keywords: ['magazine', 'articles', 'technology', 'business', 'lifestyle', 'insights', 'blog', 'ideas'],
  authors: [{ name: 'Insight Magazine Team' }],
  creator: 'Insight Magazine',
  publisher: 'Insight Magazine',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>💡</text></svg>",
    apple: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>💡</text></svg>",
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: siteName,
    title: 'Insight Magazine | Ideas that inspire',
    description: 'Discover thought-provoking articles on technology, business, and lifestyle. Insight Magazine brings you carefully curated content that informs, educates, and inspires.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Insight Magazine - Ideas that inspire',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Insight Magazine | Ideas that inspire',
    description: 'Discover thought-provoking articles on technology, business, and lifestyle.',
    images: ['/og-image.png'],
    creator: '@insightmag',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const bucketSlug = process.env.COSMIC_BUCKET_SLUG as string;
  
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script src="/dashboard-console-capture.js" />
        {/* Prevent flash of wrong theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark')
                } else {
                  document.documentElement.classList.remove('dark')
                }
              } catch (_) {}
            `,
          }}
        />
        {/* JSON-LD structured data for Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Insight Magazine',
              url: siteUrl,
              logo: `${siteUrl}/og-image.png`,
              sameAs: [
                'https://twitter.com/insightmag',
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <ThemeProvider>
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <CosmicBadge bucketSlug={bucketSlug} />
        </ThemeProvider>
      </body>
    </html>
  );
}
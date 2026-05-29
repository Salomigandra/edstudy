import './globals.css';
import SideNav from '@/components/SideNav';
import { Analytics } from '@vercel/analytics/next';

export const metadata = {
  metadataBase: new URL('https://www.pathsy.org'),
  title: {
    default: 'Pathsy — Explore Your Education Path in India',
    template: '%s — Pathsy',
  },
  description:
    'Explore Your Education Path in India — discover courses, entrance exams, salary ranges and careers after Class 10 & 12. Compare B.Tech, MBBS, Law, Commerce, Arts and more on Pathsy.',
  keywords: [
    'education after 10th India',
    'education after 12th India',
    'courses after 10th',
    'courses after 12th',
    'what to study after 12th',
    'what to do after 10th',
    'stream selection after 10th',
    'career guidance India',
    'career options for students India',
    'JEE Main preparation',
    'NEET preparation',
    'CLAT law entrance exam',
    'CAT MBA entrance',
    'UPSC preparation',
    'B.Tech courses India',
    'MBBS medical India',
    'engineering after 12th',
    'MPC stream Andhra Pradesh',
    'BiPC stream Telangana',
    'commerce stream after 10th',
    'humanities arts stream India',
    'ITI vocational courses',
    'polytechnic diploma India',
    'salary after B.Tech India',
    'entrance exams India 2025',
    'education path India',
    'after graduation courses India',
    'vocational courses India',
    'class 10 stream options India',
    'class 12 subject choice',
    'science stream after 10th',
    'MBA after graduation India',
    'law courses India',
    'design courses India',
    'nursing courses India',
    'Pathsy',
    'pathsy.org',
  ],
  openGraph: {
    title: 'Pathsy — Explore Your Education Path in India',
    description:
      'Find courses, entrance exams, salaries and careers after Class 10 & 12 in India.',
    type: 'website',
    url: 'https://www.pathsy.org',
    siteName: 'Pathsy',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pathsy — Explore Your Education Path in India',
    description:
      'Find courses, entrance exams, salaries and careers after Class 10 & 12 in India.',
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
    canonical: 'https://www.pathsy.org',
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({ children }) {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  return (
    <html lang="en">
      <head>
        {siteKey && (
          <script
            src={`https://www.google.com/recaptcha/api.js?render=${siteKey}`}
            async
            defer
          />
        )}
        <meta name="theme-color" content="#6c2ee8" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover" />
      </head>
      <body className="bg-slate-50 text-slate-800 min-h-screen antialiased">
        {/*
          Desktop: SideNav is fixed at left (w-64). Main content is offset with lg:pl-64.
          Mobile:  SideNav is hidden (lg:hidden inside SideNav). No offset needed.
        */}
        <SideNav />
        <div className="lg:pl-64">
          {children}
        </div>
        <Analytics />
      </body>
    </html>
  );
}

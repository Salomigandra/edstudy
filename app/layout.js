import './globals.css';
import SideNav from '@/components/SideNav';

export const metadata = {
  title: 'EdStudy — Find Your Education Path in India',
  description: 'Discover every education option after Class 10 & 12 in India — courses, entrance exams, salaries, and career paths.',
  keywords: 'India education, after 10th, after 12th, courses, JEE, NEET, CLAT, CAT, career guidance, EdStudy',
  openGraph: {
    title: 'EdStudy — Find Your Education Path in India',
    description: 'Every course, exam, and career after Class 10 & 12 in India.',
    type: 'website',
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
      </body>
    </html>
  );
}

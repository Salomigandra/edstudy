import './globals.css';

export const metadata = {
  title: 'India Education Pathways',
  description: 'Complete guide to all education options after Class 10 & 12 in India — courses, entrance exams, salaries, and career paths.',
  keywords: 'India education, after 10th, after 12th, courses, JEE, NEET, CLAT, CAT, career guidance, education pathways',
  openGraph: {
    title: 'India Education Pathways',
    description: 'Find the right education path after Class 10 & 12 in India.',
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
        <meta name="theme-color" content="#1e293b" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover" />
      </head>
      <body className="bg-slate-100 text-slate-800 min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}

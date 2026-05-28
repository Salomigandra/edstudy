export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/auth/', '/api/'],
      },
    ],
    sitemap: 'https://www.pathsy.org/sitemap.xml',
    host: 'https://www.pathsy.org',
  };
}

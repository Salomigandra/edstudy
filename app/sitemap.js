import { createPublicClient } from '@/lib/supabaseServer';

const BASE = 'https://www.pathsy.org';

export default async function sitemap() {
  const supabase = createPublicClient();

  const [{ data: streams }, { data: courses }] = await Promise.all([
    supabase.from('streams').select('slug'),
    supabase.from('courses').select('slug').eq('is_active', true),
  ]);

  const staticRoutes = [
    { url: BASE, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE}/explore`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/quiz`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/search`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE}/legal/terms`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE}/legal/privacy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE}/legal/disclaimer`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  ];

  const streamRoutes = (streams ?? []).map((s) => ({
    url: `${BASE}/stream/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const courseRoutes = (courses ?? []).map((c) => ({
    url: `${BASE}/path/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...streamRoutes, ...courseRoutes];
}

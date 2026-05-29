import { notFound } from 'next/navigation';
import { createCachedClient } from '@/lib/supabaseServer';

export const revalidate = 3600;
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import StreamClient from '@/components/StreamClient';

export async function generateMetadata({ params }) {
  const supabase = createCachedClient();
  const { data: stream } = await supabase
    .from('streams')
    .select('name, description')
    .eq('slug', params.id)
    .single();
  if (!stream) return {};
  return {
    title: stream.name,
    description: stream.description ?? `All education options for ${stream.name} students in India.`,
  };
}

export default async function StreamPage({ params }) {
  const supabase = createCachedClient();

  const [{ data: stream }, { data: courses }] = await Promise.all([
    supabase
      .from('streams')
      .select('id, slug, name, icon, color, color_light, color_bg, color_text, description, alt_name, stage_id')
      .eq('slug', params.id)
      .single(),
    supabase
      .from('courses')
      .select('id, slug, name, icon, duration, salary_range, exam_text, colleges, description, fit_for, sort_order')
      .order('sort_order'),
  ]);

  if (!stream) notFound();

  // Filter courses by stream after initial fetch (Supabase query filter)
  const { data: streamCourses } = await supabase
    .from('courses')
    .select('id, slug, name, icon, duration, salary_range, exam_text, colleges, description, fit_for')
    .eq('stream_id', stream.id)
    .eq('is_active', true)
    .order('sort_order');

  const { data: stageInfo } = await supabase
    .from('education_stages')
    .select('slug, label')
    .eq('id', stream.stage_id)
    .single();

  return (
    <div className="w-full max-w-lg mx-auto lg:max-w-none min-h-screen flex flex-col shadow-xl lg:shadow-none bg-slate-50">
      <Header
        backHref={`/explore?stage=${stageInfo?.slug ?? ''}`}
        title={`${stream.icon ?? ''} ${stream.name}`}
        subtitle={stream.alt_name ?? stream.description ?? ''}
      />
      <StreamClient stream={stream} courses={streamCourses ?? []} stageSlug={stageInfo?.slug} />
      <BottomNav />
    </div>
  );
}

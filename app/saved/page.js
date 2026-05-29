import { redirect } from 'next/navigation';
import { createServerClient } from '@/lib/supabaseServer';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import SavedPathsClient from '@/components/SavedPathsClient';

export const metadata = { title: 'Saved Paths' };

export default async function SavedPage() {
  const supabase = createServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/auth/login?next=/saved');

  const { data: paths } = await supabase
    .from('saved_paths')
    .select(`
      id, course_name, stream_name, notes, created_at,
      courses(slug, icon, duration, salary_range)
    `)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  return (
    <div className="w-full max-w-lg mx-auto lg:max-w-none min-h-screen flex flex-col shadow-xl lg:shadow-none bg-slate-50">
      <Header backHref="/" title="Saved Paths" subtitle="Your shortlisted options" />

      <main className="flex-1 px-4 pt-5 pb-28 lg:pb-10 space-y-4">
        <SavedPathsClient initialPaths={paths ?? []} userId={user.id} />
      </main>

      <BottomNav />
    </div>
  );
}

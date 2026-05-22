import { createServerClient } from '@/lib/supabaseServer';
import { redirect } from 'next/navigation';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import SavedPathsClient from '@/components/SavedPathsClient';
import Link from 'next/link';

export const metadata = {
  title: 'Saved Paths — India Education Pathways',
  description: 'Your saved education paths. Share with parents or review anytime.',
};

export default async function SavedPage() {
  const supabase = createServerClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    redirect('/auth/login?next=/saved');
  }

  // Fetch saved paths server-side
  const { data: paths } = await supabase
    .from('saved_paths')
    .select('*')
    .eq('user_id', session.user.id)
    .order('created_at', { ascending: false });

  const profile = session.user.user_metadata;

  return (
    <div className="max-w-lg mx-auto min-h-screen flex flex-col shadow-xl">
      <Header title="🔖 Saved Paths" subtitle="Your shortlisted education options" />

      <main className="flex-1 px-4 pt-4 pb-28 space-y-4">
        {/* User info banner */}
        <div className="bg-slate-800 text-white rounded-2xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center font-black text-lg">
            {(profile?.full_name || session.user.email || 'U')[0].toUpperCase()}
          </div>
          <div className="flex-1">
            <p className="font-black text-sm">{profile?.full_name || 'Student'}</p>
            <p className="text-xs text-slate-300 mt-0.5">{session.user.email}</p>
          </div>
          <Link
            href="/api/auth/signout"
            className="text-xs font-bold text-slate-400 border border-slate-600 rounded-xl px-3 py-2"
          >
            Log out
          </Link>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-xs text-blue-700 leading-relaxed">
          <strong>How it works:</strong> Explore any stream, open a course and tap <strong>Save this path</strong>. It saves here so you can review or share with parents.
        </div>

        <SavedPathsClient initialPaths={paths || []} userId={session.user.id} userEmail={session.user.email} />
      </main>

      <BottomNav active="saved" />
    </div>
  );
}

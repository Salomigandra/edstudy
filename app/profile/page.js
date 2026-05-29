import { redirect } from 'next/navigation';
import { createServerClient } from '@/lib/supabaseServer';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import ProfileClient from './ProfileClient';

export const metadata = { title: 'My Profile' };

export default async function ProfilePage() {
  const supabase = createServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/auth/login?next=/profile');

  const [{ data: profile }, { data: savedCount }] = await Promise.all([
    supabase.from('profiles').select('full_name, phone, class_stage').eq('id', user.id).single(),
    supabase.from('saved_paths').select('id', { count: 'exact', head: true }).eq('user_id', user.id),
  ]);

  return (
    <div className="w-full max-w-lg mx-auto lg:max-w-none min-h-screen flex flex-col shadow-xl lg:shadow-none bg-slate-50">
      <Header backHref="/" title="Profile" subtitle="Your account" />

      <main className="flex-1 px-4 lg:px-8 pt-5 pb-28 lg:pb-10 lg:max-w-3xl lg:mx-auto lg:w-full">
        <ProfileClient
          userId={user.id}
          email={user.email}
          initialProfile={profile ?? {}}
          savedCount={savedCount ?? 0}
        />
      </main>

      <BottomNav />
    </div>
  );
}

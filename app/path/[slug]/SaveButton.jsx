'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createBrowserClient } from '@/lib/supabase';

export default function SaveButton({ courseId, courseName, streamName, userId, initialSavedId }) {
  const [savedId, setSavedId] = useState(initialSavedId);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleToggle = async () => {
    if (!userId) {
      router.push(`/auth/login?next=${encodeURIComponent(window.location.pathname)}`);
      return;
    }

    setLoading(true);
    const supabase = createBrowserClient();

    if (savedId) {
      await supabase.from('saved_paths').delete().eq('id', savedId);
      setSavedId(null);
    } else {
      const { data } = await supabase
        .from('saved_paths')
        .insert({ user_id: userId, course_id: courseId, course_name: courseName, stream_name: streamName })
        .select('id')
        .single();
      setSavedId(data?.id ?? null);
    }

    setLoading(false);
  };

  const saved = !!savedId;

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      aria-label={saved ? 'Remove from saved' : 'Save this path'}
      className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors active:scale-95 ${
        saved
          ? 'bg-white/30 text-white'
          : 'bg-white/20 text-white/70 hover:bg-white/30 hover:text-white'
      } ${loading ? 'opacity-50' : ''}`}
    >
      <svg
        width="20" height="20" viewBox="0 0 24 24"
        fill={saved ? 'currentColor' : 'none'}
        stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
      >
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
      </svg>
    </button>
  );
}

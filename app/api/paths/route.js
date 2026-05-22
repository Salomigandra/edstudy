import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

// GET — fetch all saved paths for logged-in user
export async function GET() {
  const supabase = createRouteHandlerClient({ cookies });
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data, error } = await supabase
    .from('saved_paths')
    .select('*')
    .eq('user_id', session.user.id)
    .order('created_at', { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ paths: data });
}

// POST — save a new path
export async function POST(request) {
  const supabase = createRouteHandlerClient({ cookies });
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const { stream_key, stream_name, course_name, branch_name, path_text, notes } = body;

  if (!stream_key || !course_name || !path_text) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  // Check for duplicate
  const { data: existing } = await supabase
    .from('saved_paths')
    .select('id')
    .eq('user_id', session.user.id)
    .eq('path_text', path_text)
    .single();

  if (existing) {
    return NextResponse.json({ success: true, duplicate: true, path: existing });
  }

  const { data, error } = await supabase
    .from('saved_paths')
    .insert({
      user_id: session.user.id,
      stream_key,
      stream_name,
      course_name,
      branch_name: branch_name || null,
      path_text,
      notes: notes || null,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true, path: data });
}

// DELETE — remove a saved path
export async function DELETE(request) {
  const supabase = createRouteHandlerClient({ cookies });
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

  const { error } = await supabase
    .from('saved_paths')
    .delete()
    .eq('id', id)
    .eq('user_id', session.user.id); // RLS double-check

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}

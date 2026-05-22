-- ============================================================
-- India Education Pathways — Supabase Database Schema
-- Run this in: Supabase Dashboard → SQL Editor → Run
-- ============================================================

-- 1. Profiles (extends Supabase auth.users)
create table if not exists profiles (
  id          uuid primary key references auth.users on delete cascade,
  full_name   text,
  phone       text,
  class_stage text check (class_stage in ('10th', '12th', 'graduate', 'other')),
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

-- Auto-create profile row on new user signup
create or replace function handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into profiles (id, full_name, phone)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'phone'
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();

-- 2. Saved Paths
create table if not exists saved_paths (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid references profiles(id) on delete cascade not null,
  stream_key  text not null,
  stream_name text not null,
  course_name text not null,
  branch_name text,
  path_text   text not null,
  notes       text,
  created_at  timestamptz default now()
);

-- 3. Row Level Security (RLS)
alter table profiles    enable row level security;
alter table saved_paths enable row level security;

-- profiles policies
create policy "Users can view own profile"
  on profiles for select using (auth.uid() = id);

create policy "Users can update own profile"
  on profiles for update using (auth.uid() = id);

-- saved_paths policies
create policy "Users can view own saved paths"
  on saved_paths for select using (auth.uid() = user_id);

create policy "Users can insert own saved paths"
  on saved_paths for insert with check (auth.uid() = user_id);

create policy "Users can delete own saved paths"
  on saved_paths for delete using (auth.uid() = user_id);

-- 4. Indexes
create index if not exists saved_paths_user_idx on saved_paths(user_id);
create index if not exists saved_paths_stream_idx on saved_paths(stream_key);

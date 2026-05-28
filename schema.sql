-- ============================================================
-- India Education Pathways — Full Database Schema (V1)
-- 13 tables: reference data + course data + quiz + user data
-- Run in: Supabase Dashboard → SQL Editor → Run
-- ============================================================

-- ── 0. Extensions ─────────────────────────────────────────
create extension if not exists pg_trgm;

-- ── 1. Drop existing tables (clean reset) ─────────────────
-- Order matters: children before parents
drop table if exists saved_paths             cascade;
drop table if exists profiles                cascade;
drop table if exists quiz_options            cascade;
drop table if exists quiz_questions          cascade;
drop table if exists course_entrance_exams   cascade;
drop table if exists entrance_exams          cascade;
drop table if exists salary_ranges           cascade;
drop table if exists career_roles            cascade;
drop table if exists specializations         cascade;
drop table if exists courses                 cascade;
drop table if exists degree_categories       cascade;
drop table if exists streams                 cascade;
drop table if exists education_stages        cascade;

-- ── 2. education_stages ───────────────────────────────────
create table education_stages (
  id         smallserial primary key,
  slug       text        unique not null,  -- 'after_10th', 'after_12th', 'after_ug', 'vocational'
  label      text        not null,         -- 'After Class 10', 'After Class 12', ...
  sort_order smallint    not null default 0
);

-- ── 3. streams ────────────────────────────────────────────
create table streams (
  id          serial   primary key,
  slug        text     unique not null,  -- 'science', 'commerce', 'mpc', 'bipc', ...
  name        text     not null,
  alt_name    text,                      -- 'MPC / PCM' — shows both board naming conventions
  icon        text,
  color       text,
  color_light text,
  color_bg    text,
  color_text  text,
  stage_id    smallint not null references education_stages(id),
  description text,
  boards      text[],                    -- e.g. '{BIEAP,TSBIE,CBSE}' — NULL means all boards
  sort_order  smallint not null default 0
);

-- ── 4. degree_categories ──────────────────────────────────
create table degree_categories (
  id         smallserial primary key,
  name       text     not null,  -- 'Engineering', 'Medical', 'Commerce', 'Arts', ...
  sort_order smallint not null default 0
);

-- ── 5. courses ────────────────────────────────────────────
create table courses (
  id           serial   primary key,
  slug         text     unique not null,  -- 'btech-be', 'mbbs', 'bcom', 'iti-electrician'
  name         text     not null,
  icon         text,
  stream_id    int      not null references streams(id),
  category_id  smallint          references degree_categories(id),
  duration     text     not null,         -- '4 years', '3–5 years (self-paced)'
  salary_range text,                      -- '₹4 – 60+ LPA' (display string)
  exam_text    text,                      -- 'JEE Main / Advanced · BITSAT · MHT-CET' (display)
  colleges     text,                      -- 'IITs · NITs · BITS Pilani · VIT'
  description  text,
  fit_for      text,
  compare_with text[],
  pg_options   text[],
  is_active    boolean  not null default true,
  sort_order   smallint not null default 0
);

-- Full-text search column (auto-computed, never set manually)
alter table courses add column search_vector tsvector
  generated always as (
    to_tsvector('english',
      coalesce(name, '')        || ' ' ||
      coalesce(description, '') || ' ' ||
      coalesce(fit_for, '')
    )
  ) stored;

-- ── 6. specializations ────────────────────────────────────
create table specializations (
  id           serial   primary key,
  course_id    int      not null references courses(id) on delete cascade,
  name         text     not null,   -- 'Computer Science / IT / AI'
  salary_range text,                -- '₹6–60 LPA'
  sort_order   smallint not null default 0,
  unique (course_id, name)
);

-- ── 7. career_roles ───────────────────────────────────────
create table career_roles (
  id                serial   primary key,
  specialization_id int      not null references specializations(id) on delete cascade,
  name              text     not null,  -- 'Software Engineer'
  sort_order        smallint not null default 0,
  unique (specialization_id, name)
);

-- ── 8. salary_ranges ──────────────────────────────────────
create table salary_ranges (
  id         serial   primary key,
  course_id  int      not null references courses(id) on delete cascade,
  label      text     not null,  -- 'Fresher', 'Junior / 1–3 yrs', 'Mid / 3–7 yrs', 'Senior / Lead'
  range_text text     not null,  -- '₹4–8 LPA'
  sort_order smallint not null default 0,
  unique (course_id, sort_order)
);

-- ── 9. entrance_exams ─────────────────────────────────────
create table entrance_exams (
  id        smallserial primary key,
  slug      text unique not null,   -- 'jee-main', 'neet', 'clat'
  name      text not null,          -- 'JEE Main'
  full_name text,                   -- 'Joint Entrance Examination (Main)'
  level     text check (level in ('national', 'state', 'university', 'institute'))
);

-- ── 10. course_entrance_exams (junction) ──────────────────
create table course_entrance_exams (
  course_id    int      not null references courses(id)       on delete cascade,
  exam_id      smallint not null references entrance_exams(id) on delete cascade,
  is_mandatory boolean  not null default false,
  notes        text,
  primary key (course_id, exam_id)
);

-- ── 11. quiz_questions ────────────────────────────────────
create table quiz_questions (
  id         smallserial primary key,
  question   text     not null,
  sort_order smallint not null default 0
);

-- ── 12. quiz_options ──────────────────────────────────────
create table quiz_options (
  id          serial   primary key,
  question_id smallint not null references quiz_questions(id) on delete cascade,
  option_text text     not null,
  weights     jsonb    not null default '{}',  -- {"science": 3, "commerce": 1, "arts": 0, ...}
  sort_order  smallint not null default 0
);

-- ── 13. profiles (extends auth.users) ────────────────────
create table profiles (
  id          uuid        primary key references auth.users on delete cascade,
  full_name   text,
  phone       text,
  class_stage text        check (class_stage in ('10th', '12th', 'graduate', 'other')),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ── 14. saved_paths ───────────────────────────────────────
create table saved_paths (
  id                uuid        primary key default gen_random_uuid(),
  user_id           uuid        not null references profiles(id) on delete cascade,
  course_id         int                  references courses(id) on delete set null,
  specialization_id int                  references specializations(id) on delete set null,
  -- denormalized for fast list rendering without joins
  course_name       text,
  stream_name       text,
  notes             text,
  created_at        timestamptz not null default now()
);

-- ── Auto-create profile on new user signup ────────────────

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

-- ── Row Level Security ────────────────────────────────────

alter table education_stages     enable row level security;
alter table streams               enable row level security;
alter table degree_categories     enable row level security;
alter table courses               enable row level security;
alter table specializations       enable row level security;
alter table career_roles          enable row level security;
alter table salary_ranges         enable row level security;
alter table entrance_exams        enable row level security;
alter table course_entrance_exams enable row level security;
alter table quiz_questions        enable row level security;
alter table quiz_options          enable row level security;
alter table profiles              enable row level security;
alter table saved_paths           enable row level security;

-- Anyone (including anonymous) can read all content/reference tables
create policy "Public read" on education_stages     for select using (true);
create policy "Public read" on streams               for select using (true);
create policy "Public read" on degree_categories     for select using (true);
create policy "Public read" on courses               for select using (is_active = true);
create policy "Public read" on specializations       for select using (true);
create policy "Public read" on career_roles          for select using (true);
create policy "Public read" on salary_ranges         for select using (true);
create policy "Public read" on entrance_exams        for select using (true);
create policy "Public read" on course_entrance_exams for select using (true);
create policy "Public read" on quiz_questions        for select using (true);
create policy "Public read" on quiz_options          for select using (true);

-- Authenticated users can only see/edit their own profile
create policy "Users view own profile"   on profiles for select using (auth.uid() = id);
create policy "Users update own profile" on profiles for update using (auth.uid() = id);

-- Authenticated users can only manage their own saved paths
create policy "Users view own saved"   on saved_paths for select using (auth.uid() = user_id);
create policy "Users insert own saved" on saved_paths for insert with check (auth.uid() = user_id);
create policy "Users delete own saved" on saved_paths for delete using (auth.uid() = user_id);
create policy "Users update own saved" on saved_paths for update using (auth.uid() = user_id);

-- ── Indexes ───────────────────────────────────────────────

-- Full-text search on courses
create index courses_search_idx    on courses using gin(search_vector);
-- Trigram index for fast partial-name matching (e.g. "BTech" → "B.Tech")
create index courses_name_trgm_idx on courses using gin(name gin_trgm_ops);

create index courses_stream_idx   on courses(stream_id);
create index courses_active_idx   on courses(is_active) where is_active = true;
create index specs_course_idx     on specializations(course_id);
create index career_spec_idx      on career_roles(specialization_id);
create index salary_course_idx    on salary_ranges(course_id);
create index streams_stage_idx    on streams(stage_id);
create index saved_user_idx       on saved_paths(user_id);
create index saved_course_idx     on saved_paths(course_id);
create index quiz_opts_q_idx      on quiz_options(question_id);

-- ── Role Grants ───────────────────────────────────────────
-- RLS policies filter rows, but GRANT controls table access.
-- Both are required when tables are created via SQL (not the Dashboard UI).

-- Anon + authenticated can read all content/reference tables
grant select on
  education_stages, streams, degree_categories,
  courses, specializations, career_roles, salary_ranges,
  entrance_exams, course_entrance_exams,
  quiz_questions, quiz_options
to anon, authenticated;

-- Authenticated users can manage their own profile and saved paths
grant select, insert, update          on profiles    to authenticated;
grant select, insert, update, delete  on saved_paths to authenticated;

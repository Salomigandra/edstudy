-- ============================================================
-- India Education Pathways — Seed Data (Auto-generated)
-- Source: data/pathways.js
-- Run in: Supabase Dashboard → SQL Editor → Run
-- ============================================================

-- 1. Education Stages
INSERT INTO education_stages (slug, label, sort_order) VALUES
  ('after_10th', 'After Class 10',       1),
  ('after_12th', 'After Class 12',       2),
  ('after_ug',   'After Graduation',     3),
  ('vocational', 'Vocational / Skill',   4)
ON CONFLICT (slug) DO NOTHING;

-- 2. Streams (from pathways.js + after-10th intermediate streams)

INSERT INTO streams (slug, name, icon, color, color_light, color_bg, color_text, stage_id, sort_order)
SELECT 'science', 'Science', '🔬',
       '#1D4ED8', '#3B82F6', '#EFF6FF', '#1D4ED8',
       id, 1
FROM education_stages WHERE slug = 'after_12th'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO streams (slug, name, icon, color, color_light, color_bg, color_text, stage_id, sort_order)
SELECT 'commerce', 'Commerce', '💰',
       '#B45309', '#F59E0B', '#FFFBEB', '#B45309',
       id, 2
FROM education_stages WHERE slug = 'after_12th'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO streams (slug, name, icon, color, color_light, color_bg, color_text, stage_id, sort_order)
SELECT 'arts', 'Arts / Humanities', '🎨',
       '#6D28D9', '#8B5CF6', '#F5F3FF', '#6D28D9',
       id, 3
FROM education_stages WHERE slug = 'after_12th'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO streams (slug, name, icon, color, color_light, color_bg, color_text, stage_id, sort_order)
SELECT 'iti', 'ITI / Vocational', '🔧',
       '#7C3AED', '#A78BFA', '#F5F3FF', '#7C3AED',
       id, 4
FROM education_stages WHERE slug = 'after_10th'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO streams (slug, name, icon, color, color_light, color_bg, color_text, stage_id, sort_order)
SELECT 'poly', 'Polytechnic', '📐',
       '#0891B2', '#22D3EE', '#ECFEFF', '#0891B2',
       id, 5
FROM education_stages WHERE slug = 'after_10th'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO streams (slug, name, icon, color, color_light, color_bg, color_text, stage_id, sort_order)
SELECT 'defence', 'Defence / NDA', '🎖️',
       '#15803D', '#22C55E', '#F0FDF4', '#15803D',
       id, 6
FROM education_stages WHERE slug = 'after_12th'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO streams (slug, name, alt_name, icon, color, color_light, color_bg, color_text, stage_id, boards, sort_order)
SELECT 'mpc', 'MPC', 'MPC / PCM', '📐',
       '#1D4ED8', '#3B82F6', '#EFF6FF', '#1D4ED8',
       id, ARRAY['BIEAP', 'TSBIE', 'CBSE'], 7
FROM education_stages WHERE slug = 'after_10th'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO streams (slug, name, alt_name, icon, color, color_light, color_bg, color_text, stage_id, boards, sort_order)
SELECT 'bipc', 'BiPC', 'BiPC / PCB', '🧬',
       '#047857', '#10B981', '#ECFDF5', '#047857',
       id, ARRAY['BIEAP', 'TSBIE', 'CBSE'], 8
FROM education_stages WHERE slug = 'after_10th'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO streams (slug, name, alt_name, icon, color, color_light, color_bg, color_text, stage_id, boards, sort_order)
SELECT 'pcmb', 'PCMB', 'PCMB (All 4)', '⚗️',
       '#7C3AED', '#8B5CF6', '#F5F3FF', '#7C3AED',
       id, ARRAY['CBSE'], 9
FROM education_stages WHERE slug = 'after_10th'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO streams (slug, name, alt_name, icon, color, color_light, color_bg, color_text, stage_id, boards, sort_order)
SELECT 'commerce_11', 'Commerce', NULL, '💰',
       '#B45309', '#F59E0B', '#FFFBEB', '#B45309',
       id, NULL, 10
FROM education_stages WHERE slug = 'after_10th'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO streams (slug, name, alt_name, icon, color, color_light, color_bg, color_text, stage_id, boards, sort_order)
SELECT 'humanities_11', 'Humanities / Arts', NULL, '📚',
       '#6D28D9', '#8B5CF6', '#F5F3FF', '#6D28D9',
       id, NULL, 11
FROM education_stages WHERE slug = 'after_10th'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO streams (slug, name, alt_name, icon, color, color_light, color_bg, color_text, stage_id, boards, sort_order)
SELECT 'mec', 'MEC', NULL, '📊',
       '#0891B2', '#22D3EE', '#ECFEFF', '#0891B2',
       id, ARRAY['BIEAP', 'TSBIE'], 12
FROM education_stages WHERE slug = 'after_10th'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO streams (slug, name, alt_name, icon, color, color_light, color_bg, color_text, stage_id, boards, sort_order)
SELECT 'cec', 'CEC', NULL, '💼',
       '#B45309', '#F59E0B', '#FFFBEB', '#B45309',
       id, ARRAY['BIEAP', 'TSBIE'], 13
FROM education_stages WHERE slug = 'after_10th'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO streams (slug, name, alt_name, icon, color, color_light, color_bg, color_text, stage_id, boards, sort_order)
SELECT 'hec', 'HEC', NULL, '🏫',
       '#15803D', '#22C55E', '#F0FDF4', '#15803D',
       id, ARRAY['BIEAP', 'TSBIE'], 14
FROM education_stages WHERE slug = 'after_10th'
ON CONFLICT (slug) DO NOTHING;

-- 3. Courses + Salary Ranges + Specializations + Career Roles

-- Stream: Science (12thth)

INSERT INTO courses
  (slug, name, icon, stream_id, duration, salary_range, exam_text, colleges,
   description, fit_for, compare_with, pg_options, is_active, sort_order)
SELECT
  'science-b-tech-be',
  'B.Tech / BE',
  '⚙️',
  id,
  '4 years',
  '₹4 – 60+ LPA',
  'JEE Main / Advanced · BITSAT · MHT-CET · KCET · VITEEE',
  'IITs · NITs · BITS Pilani · VIT · SRM · Manipal · IIIT',
  'Most sought-after engineering degree in India. IIT placements reach ₹1–2 Cr+ LPA. Covers core and emerging tech fields.',
  'loves maths & physics, enjoys problem-solving, wants a tech or engineering career',
  ARRAY['BCA / B.Sc CS (no JEE needed)', 'B.Sc (research/science path)', 'MBBS (if PCB — medicine)'],
  ARRAY['M.Tech (GATE) → IIT/NIT', 'MBA (CAT) → IIM/XLRI', 'MS Abroad (GRE) → USA/Canada/Germany', 'MBA Tech (NMIMS/Symbiosis)', 'PhD/Research (UGC-NET/GATE)'],
  true,
  1
FROM streams WHERE slug = 'science'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO salary_ranges (course_id, label, range_text, sort_order)
SELECT c.id, v.label, v.range_text, v.sort_order
FROM courses c
CROSS JOIN (VALUES
  ('Fresher', '₹4–8 LPA', 1),
  ('Junior / 1–3 yrs', '₹10–25 LPA', 2),
  ('Mid / 3–7 yrs', '₹30–60+ LPA', 3)
) AS v(label, range_text, sort_order)
WHERE c.slug = 'science-b-tech-be'
ON CONFLICT (course_id, sort_order) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'Computer Science / IT / AI', '₹6–60 LPA', 1
FROM courses WHERE slug = 'science-b-tech-be'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Software Engineer', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-b-tech-be'
  AND sp.name = 'Computer Science / IT / AI'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Data Scientist', 2
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-b-tech-be'
  AND sp.name = 'Computer Science / IT / AI'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'AI/ML Engineer', 3
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-b-tech-be'
  AND sp.name = 'Computer Science / IT / AI'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Full Stack Developer', 4
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-b-tech-be'
  AND sp.name = 'Computer Science / IT / AI'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Product Manager', 5
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-b-tech-be'
  AND sp.name = 'Computer Science / IT / AI'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'DevOps Engineer', 6
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-b-tech-be'
  AND sp.name = 'Computer Science / IT / AI'
ON CONFLICT (specialization_id, name) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'Mechanical Engineering', '₹4–25 LPA', 2
FROM courses WHERE slug = 'science-b-tech-be'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Mechanical Design Engineer', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-b-tech-be'
  AND sp.name = 'Mechanical Engineering'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Automotive Engineer', 2
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-b-tech-be'
  AND sp.name = 'Mechanical Engineering'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'ISRO/DRDO Scientist', 3
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-b-tech-be'
  AND sp.name = 'Mechanical Engineering'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Manufacturing Manager', 4
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-b-tech-be'
  AND sp.name = 'Mechanical Engineering'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Robotics Engineer', 5
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-b-tech-be'
  AND sp.name = 'Mechanical Engineering'
ON CONFLICT (specialization_id, name) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'Civil Engineering', '₹4–20 LPA', 3
FROM courses WHERE slug = 'science-b-tech-be'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Site Engineer', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-b-tech-be'
  AND sp.name = 'Civil Engineering'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Structural Engineer', 2
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-b-tech-be'
  AND sp.name = 'Civil Engineering'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Urban Planner', 3
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-b-tech-be'
  AND sp.name = 'Civil Engineering'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'PWD/CPWD Officer', 4
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-b-tech-be'
  AND sp.name = 'Civil Engineering'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Project Manager (Infra)', 5
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-b-tech-be'
  AND sp.name = 'Civil Engineering'
ON CONFLICT (specialization_id, name) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'Electrical Engineering', '₹4–22 LPA', 4
FROM courses WHERE slug = 'science-b-tech-be'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Power Systems Engineer', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-b-tech-be'
  AND sp.name = 'Electrical Engineering'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'PGCIL/BHEL Engineer', 2
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-b-tech-be'
  AND sp.name = 'Electrical Engineering'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Electrical Design Engineer', 3
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-b-tech-be'
  AND sp.name = 'Electrical Engineering'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Energy Manager', 4
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-b-tech-be'
  AND sp.name = 'Electrical Engineering'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'UPSC IES Officer', 5
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-b-tech-be'
  AND sp.name = 'Electrical Engineering'
ON CONFLICT (specialization_id, name) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'Electronics & Communication (ECE)', '₹4–30 LPA', 5
FROM courses WHERE slug = 'science-b-tech-be'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'VLSI Engineer', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-b-tech-be'
  AND sp.name = 'Electronics & Communication (ECE)'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Embedded Systems Developer', 2
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-b-tech-be'
  AND sp.name = 'Electronics & Communication (ECE)'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Telecom Engineer', 3
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-b-tech-be'
  AND sp.name = 'Electronics & Communication (ECE)'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'IoT Developer', 4
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-b-tech-be'
  AND sp.name = 'Electronics & Communication (ECE)'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'RF Engineer', 5
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-b-tech-be'
  AND sp.name = 'Electronics & Communication (ECE)'
ON CONFLICT (specialization_id, name) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'Data Science / AI / ML', '₹8–50 LPA', 6
FROM courses WHERE slug = 'science-b-tech-be'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Data Scientist', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-b-tech-be'
  AND sp.name = 'Data Science / AI / ML'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'ML Engineer', 2
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-b-tech-be'
  AND sp.name = 'Data Science / AI / ML'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'NLP Researcher', 3
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-b-tech-be'
  AND sp.name = 'Data Science / AI / ML'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Analytics Lead', 4
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-b-tech-be'
  AND sp.name = 'Data Science / AI / ML'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'AI Product Manager', 5
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-b-tech-be'
  AND sp.name = 'Data Science / AI / ML'
ON CONFLICT (specialization_id, name) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'Cybersecurity', '₹6–35 LPA', 7
FROM courses WHERE slug = 'science-b-tech-be'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Security Analyst', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-b-tech-be'
  AND sp.name = 'Cybersecurity'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Ethical Hacker', 2
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-b-tech-be'
  AND sp.name = 'Cybersecurity'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'CISO Track', 3
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-b-tech-be'
  AND sp.name = 'Cybersecurity'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Penetration Tester', 4
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-b-tech-be'
  AND sp.name = 'Cybersecurity'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Cybersecurity Consultant', 5
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-b-tech-be'
  AND sp.name = 'Cybersecurity'
ON CONFLICT (specialization_id, name) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'Aerospace Engineering', '₹5–25 LPA', 8
FROM courses WHERE slug = 'science-b-tech-be'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'ISRO Scientist', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-b-tech-be'
  AND sp.name = 'Aerospace Engineering'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Aircraft Design Engineer', 2
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-b-tech-be'
  AND sp.name = 'Aerospace Engineering'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'HAL Engineer', 3
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-b-tech-be'
  AND sp.name = 'Aerospace Engineering'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Defence R&D Scientist', 4
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-b-tech-be'
  AND sp.name = 'Aerospace Engineering'
ON CONFLICT (specialization_id, name) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'Chemical / Petroleum', '₹5–30 LPA', 9
FROM courses WHERE slug = 'science-b-tech-be'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Process Engineer', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-b-tech-be'
  AND sp.name = 'Chemical / Petroleum'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Refinery Engineer', 2
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-b-tech-be'
  AND sp.name = 'Chemical / Petroleum'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'ONGC/HPCL Officer', 3
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-b-tech-be'
  AND sp.name = 'Chemical / Petroleum'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Chemical Plant Manager', 4
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-b-tech-be'
  AND sp.name = 'Chemical / Petroleum'
ON CONFLICT (specialization_id, name) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'Biotechnology', '₹4–20 LPA', 10
FROM courses WHERE slug = 'science-b-tech-be'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Biotech Research Scientist', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-b-tech-be'
  AND sp.name = 'Biotechnology'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Pharma R&D', 2
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-b-tech-be'
  AND sp.name = 'Biotechnology'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Bioinformatics Analyst', 3
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-b-tech-be'
  AND sp.name = 'Biotechnology'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Clinical Research Associate', 4
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-b-tech-be'
  AND sp.name = 'Biotechnology'
ON CONFLICT (specialization_id, name) DO NOTHING;

INSERT INTO courses
  (slug, name, icon, stream_id, duration, salary_range, exam_text, colleges,
   description, fit_for, compare_with, pg_options, is_active, sort_order)
SELECT
  'science-mbbs-medical',
  'MBBS / Medical',
  '🏥',
  id,
  '5.5 years + 1yr Internship',
  '₹8 – 80+ LPA',
  'NEET-UG (mandatory for all medical colleges)',
  'AIIMS · JIPMER · Government Medical Colleges · Private Medical Colleges',
  'Doctor of Medicine — one of India''s most respected careers. Government MBBS is nearly free; private costs ₹50L–1Cr+.',
  'wants to become a doctor, comfortable with a long study path, biology is the strongest subject',
  ARRAY['BDS (dentistry, same NEET)', 'B.Pharm (pharma career, shorter)', 'BPT Physiotherapy (healthcare, easier entry)', 'Allied Health Sciences'],
  ARRAY['MD / MS (NEET-PG) → Specialization', 'DNB (National Board)', 'MS Abroad (USMLE for USA)', 'MPH / MHA (Public Health)', 'Fellowship (Super-specialization)'],
  true,
  2
FROM streams WHERE slug = 'science'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO salary_ranges (course_id, label, range_text, sort_order)
SELECT c.id, v.label, v.range_text, v.sort_order
FROM courses c
CROSS JOIN (VALUES
  ('Fresher', '₹8–15 LPA', 1),
  ('Junior / 1–3 yrs', '₹18–40 LPA', 2),
  ('Mid / 3–7 yrs', '₹50–80+ LPA', 3)
) AS v(label, range_text, sort_order)
WHERE c.slug = 'science-mbbs-medical'
ON CONFLICT (course_id, sort_order) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'MBBS (General Medicine)', '₹10–80 LPA', 1
FROM courses WHERE slug = 'science-mbbs-medical'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'General Physician', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-mbbs-medical'
  AND sp.name = 'MBBS (General Medicine)'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Hospital Doctor', 2
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-mbbs-medical'
  AND sp.name = 'MBBS (General Medicine)'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Govt Medical Officer', 3
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-mbbs-medical'
  AND sp.name = 'MBBS (General Medicine)'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Clinic Owner', 4
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-mbbs-medical'
  AND sp.name = 'MBBS (General Medicine)'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Armed Forces Medical Officer', 5
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-mbbs-medical'
  AND sp.name = 'MBBS (General Medicine)'
ON CONFLICT (specialization_id, name) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'BDS (Dentistry)', '₹5–30 LPA', 2
FROM courses WHERE slug = 'science-mbbs-medical'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Dentist', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-mbbs-medical'
  AND sp.name = 'BDS (Dentistry)'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Orthodontist', 2
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-mbbs-medical'
  AND sp.name = 'BDS (Dentistry)'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Oral Surgeon', 3
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-mbbs-medical'
  AND sp.name = 'BDS (Dentistry)'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Own Dental Clinic', 4
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-mbbs-medical'
  AND sp.name = 'BDS (Dentistry)'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Defence Dental Officer', 5
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-mbbs-medical'
  AND sp.name = 'BDS (Dentistry)'
ON CONFLICT (specialization_id, name) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'BAMS (Ayurveda)', '₹4–20 LPA', 3
FROM courses WHERE slug = 'science-mbbs-medical'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Ayurvedic Doctor', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-mbbs-medical'
  AND sp.name = 'BAMS (Ayurveda)'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'CGHS/Govt BAMS Doctor', 2
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-mbbs-medical'
  AND sp.name = 'BAMS (Ayurveda)'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Wellness Centre Owner', 3
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-mbbs-medical'
  AND sp.name = 'BAMS (Ayurveda)'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Pharma Medical Advisor', 4
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-mbbs-medical'
  AND sp.name = 'BAMS (Ayurveda)'
ON CONFLICT (specialization_id, name) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'BHMS (Homeopathy)', '₹3–15 LPA', 4
FROM courses WHERE slug = 'science-mbbs-medical'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Homeopathic Physician', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-mbbs-medical'
  AND sp.name = 'BHMS (Homeopathy)'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Private Practice', 2
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-mbbs-medical'
  AND sp.name = 'BHMS (Homeopathy)'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'CGHS Doctor', 3
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-mbbs-medical'
  AND sp.name = 'BHMS (Homeopathy)'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Research in Homeopathy', 4
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-mbbs-medical'
  AND sp.name = 'BHMS (Homeopathy)'
ON CONFLICT (specialization_id, name) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'BNYS (Yoga & Naturopathy)', '₹3–12 LPA', 5
FROM courses WHERE slug = 'science-mbbs-medical'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Naturopath', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-mbbs-medical'
  AND sp.name = 'BNYS (Yoga & Naturopathy)'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Yoga Therapist', 2
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-mbbs-medical'
  AND sp.name = 'BNYS (Yoga & Naturopathy)'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Wellness Director', 3
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-mbbs-medical'
  AND sp.name = 'BNYS (Yoga & Naturopathy)'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Sports Physiologist', 4
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-mbbs-medical'
  AND sp.name = 'BNYS (Yoga & Naturopathy)'
ON CONFLICT (specialization_id, name) DO NOTHING;

INSERT INTO courses
  (slug, name, icon, stream_id, duration, salary_range, exam_text, colleges,
   description, fit_for, compare_with, pg_options, is_active, sort_order)
SELECT
  'science-b-sc-science',
  'B.Sc (Science)',
  '🔭',
  id,
  '3 years',
  '₹3 – 25 LPA',
  'CUET / JNU Entrance / State Entrance / Merit',
  'IISc · IITs · JNU · Central Universities · Miranda House DU · Presidency',
  'Pure science degree. Strong base for research (IISER/IISc), data science, pharmacy, and UPSC. IISc B.Sc Research is world-class.',
  'curious about pure science or research, wants to keep options open with a 3-year degree first',
  ARRAY['B.Tech (higher salary, competitive JEE entry)', 'BCA (IT-focused, no JEE)', 'MBBS (medicine track via NEET)'],
  ARRAY['M.Sc (CUET PG / JAM / JEST)', '5-yr BS-MS (IISER — IISER Aptitude Test)', 'M.Tech (GATE)', 'MBA (CAT)', 'PhD + JRF (UGC-NET / CSIR-NET)'],
  true,
  3
FROM streams WHERE slug = 'science'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO salary_ranges (course_id, label, range_text, sort_order)
SELECT c.id, v.label, v.range_text, v.sort_order
FROM courses c
CROSS JOIN (VALUES
  ('Fresher', '₹3–6 LPA', 1),
  ('Junior / 1–3 yrs', '₹8–18 LPA', 2),
  ('Mid / 3–7 yrs', '₹20–25 LPA', 3)
) AS v(label, range_text, sort_order)
WHERE c.slug = 'science-b-sc-science'
ON CONFLICT (course_id, sort_order) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'Physics / Chemistry / Maths', '₹4–25 LPA', 1
FROM courses WHERE slug = 'science-b-sc-science'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Research Scientist', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-b-sc-science'
  AND sp.name = 'Physics / Chemistry / Maths'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Data Analyst', 2
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-b-sc-science'
  AND sp.name = 'Physics / Chemistry / Maths'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'UPSC IFS/IAS', 3
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-b-sc-science'
  AND sp.name = 'Physics / Chemistry / Maths'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Quant Analyst', 4
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-b-sc-science'
  AND sp.name = 'Physics / Chemistry / Maths'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Science Teacher', 5
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-b-sc-science'
  AND sp.name = 'Physics / Chemistry / Maths'
ON CONFLICT (specialization_id, name) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'Biotechnology / Microbiology', '₹4–18 LPA', 2
FROM courses WHERE slug = 'science-b-sc-science'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Biotech Researcher', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-b-sc-science'
  AND sp.name = 'Biotechnology / Microbiology'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Pharma R&D', 2
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-b-sc-science'
  AND sp.name = 'Biotechnology / Microbiology'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Food Technologist', 3
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-b-sc-science'
  AND sp.name = 'Biotechnology / Microbiology'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Clinical Research', 4
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-b-sc-science'
  AND sp.name = 'Biotechnology / Microbiology'
ON CONFLICT (specialization_id, name) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'B.Sc Computer Science / IT', '₹4–25 LPA', 3
FROM courses WHERE slug = 'science-b-sc-science'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Software Developer', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-b-sc-science'
  AND sp.name = 'B.Sc Computer Science / IT'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Data Analyst', 2
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-b-sc-science'
  AND sp.name = 'B.Sc Computer Science / IT'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Web Developer', 3
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-b-sc-science'
  AND sp.name = 'B.Sc Computer Science / IT'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'MCA → IT Manager', 4
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-b-sc-science'
  AND sp.name = 'B.Sc Computer Science / IT'
ON CONFLICT (specialization_id, name) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'B.Sc Data Science / Statistics', '₹5–30 LPA', 4
FROM courses WHERE slug = 'science-b-sc-science'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Data Scientist', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-b-sc-science'
  AND sp.name = 'B.Sc Data Science / Statistics'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Statistician', 2
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-b-sc-science'
  AND sp.name = 'B.Sc Data Science / Statistics'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Business Analyst', 3
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-b-sc-science'
  AND sp.name = 'B.Sc Data Science / Statistics'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Actuary (IAI)', 4
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-b-sc-science'
  AND sp.name = 'B.Sc Data Science / Statistics'
ON CONFLICT (specialization_id, name) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'B.Sc Agriculture / Horticulture', '₹3–15 LPA', 5
FROM courses WHERE slug = 'science-b-sc-science'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Agriculture Officer', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-b-sc-science'
  AND sp.name = 'B.Sc Agriculture / Horticulture'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Agritech Founder', 2
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-b-sc-science'
  AND sp.name = 'B.Sc Agriculture / Horticulture'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Farm Management', 3
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-b-sc-science'
  AND sp.name = 'B.Sc Agriculture / Horticulture'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'ICAR Scientist', 4
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-b-sc-science'
  AND sp.name = 'B.Sc Agriculture / Horticulture'
ON CONFLICT (specialization_id, name) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'Nursing (B.Sc Nursing)', '₹3–40 LPA', 6
FROM courses WHERE slug = 'science-b-sc-science'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Staff Nurse India/Abroad', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-b-sc-science'
  AND sp.name = 'Nursing (B.Sc Nursing)'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'ICU Nurse Specialist', 2
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-b-sc-science'
  AND sp.name = 'Nursing (B.Sc Nursing)'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Nurse Educator', 3
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-b-sc-science'
  AND sp.name = 'Nursing (B.Sc Nursing)'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Travel Nurse USA/UK', 4
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-b-sc-science'
  AND sp.name = 'Nursing (B.Sc Nursing)'
ON CONFLICT (specialization_id, name) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'Forensic Science', '₹3–15 LPA', 7
FROM courses WHERE slug = 'science-b-sc-science'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Forensic Scientist (CBI/FSL)', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-b-sc-science'
  AND sp.name = 'Forensic Science'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Crime Scene Investigator', 2
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-b-sc-science'
  AND sp.name = 'Forensic Science'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Expert Witness', 3
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-b-sc-science'
  AND sp.name = 'Forensic Science'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Forensic Toxicologist', 4
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-b-sc-science'
  AND sp.name = 'Forensic Science'
ON CONFLICT (specialization_id, name) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'Environmental Science', '₹3–18 LPA', 8
FROM courses WHERE slug = 'science-b-sc-science'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Environmental Consultant', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-b-sc-science'
  AND sp.name = 'Environmental Science'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'GIS Analyst', 2
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-b-sc-science'
  AND sp.name = 'Environmental Science'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Pollution Control Officer', 3
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-b-sc-science'
  AND sp.name = 'Environmental Science'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Climate Researcher', 4
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-b-sc-science'
  AND sp.name = 'Environmental Science'
ON CONFLICT (specialization_id, name) DO NOTHING;

INSERT INTO courses
  (slug, name, icon, stream_id, duration, salary_range, exam_text, colleges,
   description, fit_for, compare_with, pg_options, is_active, sort_order)
SELECT
  'science-bca-b-sc-cs',
  'BCA / B.Sc CS',
  '💻',
  id,
  '3 years',
  '₹3 – 25 LPA',
  'CUET / IPU CET / Merit / State Entrance',
  'BITS · NIT · Symbiosis · Christ · IP University · Manipal · Amity',
  'Bachelor of Computer Applications — pure IT degree. Great launchpad into software, data, and tech without needing JEE.',
  'loves computers but doesn''t want JEE pressure, wants to enter software or data careers',
  ARRAY['B.Tech CS (IIT/NIT — JEE needed)', 'B.Sc Data Science (analytics focus)', 'B.Com + MCA (finance + tech)'],
  ARRAY['MCA (NIMCET → NIT MCA)', 'M.Sc CS (CUET PG)', 'MBA Tech (CAT)', 'M.Tech CS (GATE)', 'MS Abroad (GRE)'],
  true,
  4
FROM streams WHERE slug = 'science'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO salary_ranges (course_id, label, range_text, sort_order)
SELECT c.id, v.label, v.range_text, v.sort_order
FROM courses c
CROSS JOIN (VALUES
  ('Fresher', '₹3–6 LPA', 1),
  ('Junior / 1–3 yrs', '₹8–18 LPA', 2),
  ('Mid / 3–7 yrs', '₹20–25 LPA', 3)
) AS v(label, range_text, sort_order)
WHERE c.slug = 'science-bca-b-sc-cs'
ON CONFLICT (course_id, sort_order) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'BCA (Computer Applications)', '₹3–20 LPA', 1
FROM courses WHERE slug = 'science-bca-b-sc-cs'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Software Developer', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-bca-b-sc-cs'
  AND sp.name = 'BCA (Computer Applications)'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Web Developer', 2
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-bca-b-sc-cs'
  AND sp.name = 'BCA (Computer Applications)'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'App Developer', 3
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-bca-b-sc-cs'
  AND sp.name = 'BCA (Computer Applications)'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Database Admin', 4
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-bca-b-sc-cs'
  AND sp.name = 'BCA (Computer Applications)'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'IT Support Manager', 5
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-bca-b-sc-cs'
  AND sp.name = 'BCA (Computer Applications)'
ON CONFLICT (specialization_id, name) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'B.Sc Computer Science', '₹4–25 LPA', 2
FROM courses WHERE slug = 'science-bca-b-sc-cs'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Full Stack Developer', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-bca-b-sc-cs'
  AND sp.name = 'B.Sc Computer Science'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Data Analyst', 2
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-bca-b-sc-cs'
  AND sp.name = 'B.Sc Computer Science'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Cloud Engineer', 3
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-bca-b-sc-cs'
  AND sp.name = 'B.Sc Computer Science'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Game Developer', 4
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-bca-b-sc-cs'
  AND sp.name = 'B.Sc Computer Science'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Software Architect', 5
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-bca-b-sc-cs'
  AND sp.name = 'B.Sc Computer Science'
ON CONFLICT (specialization_id, name) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'B.Sc Data Science / AI', '₹6–35 LPA', 3
FROM courses WHERE slug = 'science-bca-b-sc-cs'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Data Scientist', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-bca-b-sc-cs'
  AND sp.name = 'B.Sc Data Science / AI'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'ML Engineer', 2
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-bca-b-sc-cs'
  AND sp.name = 'B.Sc Data Science / AI'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'AI Researcher', 3
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-bca-b-sc-cs'
  AND sp.name = 'B.Sc Data Science / AI'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Business Intelligence Analyst', 4
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-bca-b-sc-cs'
  AND sp.name = 'B.Sc Data Science / AI'
ON CONFLICT (specialization_id, name) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'B.Sc Cybersecurity', '₹5–25 LPA', 4
FROM courses WHERE slug = 'science-bca-b-sc-cs'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Security Analyst', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-bca-b-sc-cs'
  AND sp.name = 'B.Sc Cybersecurity'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Ethical Hacker', 2
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-bca-b-sc-cs'
  AND sp.name = 'B.Sc Cybersecurity'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Network Security Engineer', 3
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-bca-b-sc-cs'
  AND sp.name = 'B.Sc Cybersecurity'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'SOC Analyst', 4
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-bca-b-sc-cs'
  AND sp.name = 'B.Sc Cybersecurity'
ON CONFLICT (specialization_id, name) DO NOTHING;

INSERT INTO courses
  (slug, name, icon, stream_id, duration, salary_range, exam_text, colleges,
   description, fit_for, compare_with, pg_options, is_active, sort_order)
SELECT
  'science-b-arch-architecture',
  'B.Arch (Architecture)',
  '🏗️',
  id,
  '5 years',
  '₹4 – 40 LPA',
  'JEE Paper 2 + NATA (mandatory)',
  'IIT Kharagpur · SPA Delhi · CEPT Ahmedabad · NIT Trichy · Chandigarh College of Arch',
  '5-year professional degree regulated by Council of Architecture (COA). Strong design + engineering blend. NATA score is mandatory.',
  'creative AND technical, loves designing buildings and spaces, patient for a 5-year programme',
  ARRAY['Fine Arts / NID (pure design, shorter)', 'Civil Engineering B.Tech (more construction-focused)', 'Interior Design courses (3–4 yrs)'],
  ARRAY['M.Arch (SPA/CEPT/NIT)', 'M.Des (IIT/NID — CEED)', 'MBA Design Mgmt', 'Masters Abroad (USA/UK/Netherlands)'],
  true,
  5
FROM streams WHERE slug = 'science'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO salary_ranges (course_id, label, range_text, sort_order)
SELECT c.id, v.label, v.range_text, v.sort_order
FROM courses c
CROSS JOIN (VALUES
  ('Fresher', '₹4–7 LPA', 1),
  ('Junior / 1–3 yrs', '₹10–22 LPA', 2),
  ('Mid / 3–7 yrs', '₹25–40 LPA', 3)
) AS v(label, range_text, sort_order)
WHERE c.slug = 'science-b-arch-architecture'
ON CONFLICT (course_id, sort_order) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'Urban Design / City Planning', '₹6–30 LPA', 1
FROM courses WHERE slug = 'science-b-arch-architecture'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Urban Planner', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-b-arch-architecture'
  AND sp.name = 'Urban Design / City Planning'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Smart City Consultant', 2
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-b-arch-architecture'
  AND sp.name = 'Urban Design / City Planning'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'RERA Architect', 3
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-b-arch-architecture'
  AND sp.name = 'Urban Design / City Planning'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Govt Planning Officer', 4
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-b-arch-architecture'
  AND sp.name = 'Urban Design / City Planning'
ON CONFLICT (specialization_id, name) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'Interior / Landscape Design', '₹5–35 LPA', 2
FROM courses WHERE slug = 'science-b-arch-architecture'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Interior Designer', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-b-arch-architecture'
  AND sp.name = 'Interior / Landscape Design'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Landscape Architect', 2
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-b-arch-architecture'
  AND sp.name = 'Interior / Landscape Design'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Set Designer', 3
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-b-arch-architecture'
  AND sp.name = 'Interior / Landscape Design'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Sustainable Design Consultant', 4
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-b-arch-architecture'
  AND sp.name = 'Interior / Landscape Design'
ON CONFLICT (specialization_id, name) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'Sustainable / Green Architecture', '₹6–25 LPA', 3
FROM courses WHERE slug = 'science-b-arch-architecture'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Green Building Consultant', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-b-arch-architecture'
  AND sp.name = 'Sustainable / Green Architecture'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'LEED Certified Architect', 2
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-b-arch-architecture'
  AND sp.name = 'Sustainable / Green Architecture'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Environmental Designer', 3
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-b-arch-architecture'
  AND sp.name = 'Sustainable / Green Architecture'
ON CONFLICT (specialization_id, name) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'Construction Management', '₹5–25 LPA', 4
FROM courses WHERE slug = 'science-b-arch-architecture'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Project Manager (Infra)', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-b-arch-architecture'
  AND sp.name = 'Construction Management'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Site Architect', 2
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-b-arch-architecture'
  AND sp.name = 'Construction Management'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Real Estate Developer', 3
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-b-arch-architecture'
  AND sp.name = 'Construction Management'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'PWD/CPWD Architect', 4
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-b-arch-architecture'
  AND sp.name = 'Construction Management'
ON CONFLICT (specialization_id, name) DO NOTHING;

INSERT INTO courses
  (slug, name, icon, stream_id, duration, salary_range, exam_text, colleges,
   description, fit_for, compare_with, pg_options, is_active, sort_order)
SELECT
  'science-allied-health-sciences',
  'Allied Health Sciences',
  '💊',
  id,
  '3–4 years',
  '₹3 – 40 LPA (higher abroad)',
  'NEET / State Allied Health CET / GPAT / Merit',
  'CMC Vellore · AIIMS Paramedical · Manipal · Amrita · JIPMER',
  'Paramedical courses supporting healthcare delivery. Very high demand post-COVID. Strong abroad prospects for nursing and physiotherapy.',
  'wants a healthcare career without MBBS, interested in pharmacy, therapy, nursing, or lab work',
  ARRAY['MBBS (full doctor path, NEET)', 'B.Sc Nursing (high abroad demand)', 'BPT Physiotherapy (sports/rehab)'],
  ARRAY['M.Pharm (GPAT)', 'MPT / MOT (Master of Physio/OT)', 'MBA Hospital Mgmt (MHA)', 'MD Pharmacology', 'MS Abroad'],
  true,
  6
FROM streams WHERE slug = 'science'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO salary_ranges (course_id, label, range_text, sort_order)
SELECT c.id, v.label, v.range_text, v.sort_order
FROM courses c
CROSS JOIN (VALUES
  ('Fresher', '₹3–5 LPA', 1),
  ('Junior / 1–3 yrs', '₹8–18 LPA', 2),
  ('Mid / 3–7 yrs', '₹20–40 LPA abroad', 3)
) AS v(label, range_text, sort_order)
WHERE c.slug = 'science-allied-health-sciences'
ON CONFLICT (course_id, sort_order) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'B.Pharm (Pharmacy)', '₹3–18 LPA', 1
FROM courses WHERE slug = 'science-allied-health-sciences'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Clinical Pharmacist', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-allied-health-sciences'
  AND sp.name = 'B.Pharm (Pharmacy)'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Drug Inspector', 2
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-allied-health-sciences'
  AND sp.name = 'B.Pharm (Pharmacy)'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Pharma R&D Scientist', 3
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-allied-health-sciences'
  AND sp.name = 'B.Pharm (Pharmacy)'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Regulatory Affairs', 4
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-allied-health-sciences'
  AND sp.name = 'B.Pharm (Pharmacy)'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Medical Representative', 5
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-allied-health-sciences'
  AND sp.name = 'B.Pharm (Pharmacy)'
ON CONFLICT (specialization_id, name) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'Physiotherapy (BPT)', '₹3–40 LPA abroad', 2
FROM courses WHERE slug = 'science-allied-health-sciences'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Sports Physiotherapist', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-allied-health-sciences'
  AND sp.name = 'Physiotherapy (BPT)'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Neuro Physiotherapist', 2
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-allied-health-sciences'
  AND sp.name = 'Physiotherapy (BPT)'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Hospital PT', 3
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-allied-health-sciences'
  AND sp.name = 'Physiotherapy (BPT)'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Own Clinic Owner', 4
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-allied-health-sciences'
  AND sp.name = 'Physiotherapy (BPT)'
ON CONFLICT (specialization_id, name) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'Medical Lab Technology (BMLT)', '₹3–10 LPA', 3
FROM courses WHERE slug = 'science-allied-health-sciences'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Lab Technician', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-allied-health-sciences'
  AND sp.name = 'Medical Lab Technology (BMLT)'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Pathology Lab Manager', 2
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-allied-health-sciences'
  AND sp.name = 'Medical Lab Technology (BMLT)'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Blood Bank Technologist', 3
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-allied-health-sciences'
  AND sp.name = 'Medical Lab Technology (BMLT)'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Research Lab Analyst', 4
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-allied-health-sciences'
  AND sp.name = 'Medical Lab Technology (BMLT)'
ON CONFLICT (specialization_id, name) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'Radiology / Imaging (BMRIT)', '₹3–12 LPA', 4
FROM courses WHERE slug = 'science-allied-health-sciences'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Radiographer', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-allied-health-sciences'
  AND sp.name = 'Radiology / Imaging (BMRIT)'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'MRI/CT Scan Technologist', 2
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-allied-health-sciences'
  AND sp.name = 'Radiology / Imaging (BMRIT)'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Ultrasound Technician', 3
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-allied-health-sciences'
  AND sp.name = 'Radiology / Imaging (BMRIT)'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Nuclear Medicine Technologist', 4
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-allied-health-sciences'
  AND sp.name = 'Radiology / Imaging (BMRIT)'
ON CONFLICT (specialization_id, name) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'GNM / ANM Nursing', '₹2.5–10 LPA', 5
FROM courses WHERE slug = 'science-allied-health-sciences'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Staff Nurse', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-allied-health-sciences'
  AND sp.name = 'GNM / ANM Nursing'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'ANM (Village Health Worker)', 2
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-allied-health-sciences'
  AND sp.name = 'GNM / ANM Nursing'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'School Health Nurse', 3
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-allied-health-sciences'
  AND sp.name = 'GNM / ANM Nursing'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Travel Nurse Abroad', 4
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-allied-health-sciences'
  AND sp.name = 'GNM / ANM Nursing'
ON CONFLICT (specialization_id, name) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'Occupational Therapy (BOT)', '₹3–15 LPA', 6
FROM courses WHERE slug = 'science-allied-health-sciences'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Occupational Therapist (Hospital)', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-allied-health-sciences'
  AND sp.name = 'Occupational Therapy (BOT)'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Paediatric OT', 2
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-allied-health-sciences'
  AND sp.name = 'Occupational Therapy (BOT)'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Community Rehab Specialist', 3
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-allied-health-sciences'
  AND sp.name = 'Occupational Therapy (BOT)'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'OT Abroad (UK/Canada)', 4
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'science-allied-health-sciences'
  AND sp.name = 'Occupational Therapy (BOT)'
ON CONFLICT (specialization_id, name) DO NOTHING;

-- Stream: Commerce (12thth)

INSERT INTO courses
  (slug, name, icon, stream_id, duration, salary_range, exam_text, colleges,
   description, fit_for, compare_with, pg_options, is_active, sort_order)
SELECT
  'commerce-b-com-b-com-hons',
  'B.Com / B.Com (Hons)',
  '📒',
  id,
  '3 years',
  '₹3 – 50+ LPA',
  'CUET / DU Entrance / Merit / Christ / Symbiosis SET',
  'SRCC DU · Hindu College · LSR · Christ University · Symbiosis · St. Xavier''s · Loyola',
  'Most popular commerce undergraduate. DU''s SRCC B.Com(H) is India''s top commerce college. 8 specializations to choose from.',
  'strong in accounts and maths, planning CA or MBA Finance, wants a solid 3-year commerce foundation',
  ARRAY['BBA (management focus, less accounts)', 'CA / CMA (professional direct route)', 'Economics Hons (more quantitative)'],
  ARRAY['M.Com (CUET PG)', 'MBA (CAT/GMAT)', 'CA/CMA/CS (ICAI/ICMAI/ICSI)', 'CFA (USA) / FRM (GARP)', 'MS Finance Abroad'],
  true,
  1
FROM streams WHERE slug = 'commerce'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO salary_ranges (course_id, label, range_text, sort_order)
SELECT c.id, v.label, v.range_text, v.sort_order
FROM courses c
CROSS JOIN (VALUES
  ('Fresher', '₹3–6 LPA', 1),
  ('Junior / 1–3 yrs', '₹8–20 LPA', 2),
  ('Mid / 3–7 yrs', '₹30–50+ LPA', 3)
) AS v(label, range_text, sort_order)
WHERE c.slug = 'commerce-b-com-b-com-hons'
ON CONFLICT (course_id, sort_order) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'Accountancy (Hons) — SRCC / Hindu / DU', '₹3–50 LPA', 1
FROM courses WHERE slug = 'commerce-b-com-b-com-hons'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'CA (ICAI)', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-b-com-b-com-hons'
  AND sp.name = 'Accountancy (Hons) — SRCC / Hindu / DU'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'CMA', 2
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-b-com-b-com-hons'
  AND sp.name = 'Accountancy (Hons) — SRCC / Hindu / DU'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'M.Com → Commerce Lecturer', 3
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-b-com-b-com-hons'
  AND sp.name = 'Accountancy (Hons) — SRCC / Hindu / DU'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'MBA Finance → CFO', 4
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-b-com-b-com-hons'
  AND sp.name = 'Accountancy (Hons) — SRCC / Hindu / DU'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Big 4 Audit Assistant', 5
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-b-com-b-com-hons'
  AND sp.name = 'Accountancy (Hons) — SRCC / Hindu / DU'
ON CONFLICT (specialization_id, name) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'Finance (Hons)', '₹5–80 LPA', 2
FROM courses WHERE slug = 'commerce-b-com-b-com-hons'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'CFA / FRM Analyst', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-b-com-b-com-hons'
  AND sp.name = 'Finance (Hons)'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Investment Banker', 2
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-b-com-b-com-hons'
  AND sp.name = 'Finance (Hons)'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Portfolio Manager', 3
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-b-com-b-com-hons'
  AND sp.name = 'Finance (Hons)'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Fintech Analyst', 4
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-b-com-b-com-hons'
  AND sp.name = 'Finance (Hons)'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'MBA Finance → PE/VC', 5
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-b-com-b-com-hons'
  AND sp.name = 'Finance (Hons)'
ON CONFLICT (specialization_id, name) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'Banking & Insurance', '₹3–20 LPA', 3
FROM courses WHERE slug = 'commerce-b-com-b-com-hons'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Bank PO (IBPS/SBI)', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-b-com-b-com-hons'
  AND sp.name = 'Banking & Insurance'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'JAIIB/CAIIB → Senior Officer', 2
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-b-com-b-com-hons'
  AND sp.name = 'Banking & Insurance'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Insurance Manager (LIC)', 3
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-b-com-b-com-hons'
  AND sp.name = 'Banking & Insurance'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Credit Analyst (NBFC)', 4
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-b-com-b-com-hons'
  AND sp.name = 'Banking & Insurance'
ON CONFLICT (specialization_id, name) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'Financial Markets', '₹4–35 LPA', 4
FROM courses WHERE slug = 'commerce-b-com-b-com-hons'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'NISM Certified Stockbroker', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-b-com-b-com-hons'
  AND sp.name = 'Financial Markets'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Equity Research Analyst', 2
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-b-com-b-com-hons'
  AND sp.name = 'Financial Markets'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Fund Manager (AMC)', 3
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-b-com-b-com-hons'
  AND sp.name = 'Financial Markets'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Portfolio Manager', 4
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-b-com-b-com-hons'
  AND sp.name = 'Financial Markets'
ON CONFLICT (specialization_id, name) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'Computer Applications', '₹3–22 LPA', 5
FROM courses WHERE slug = 'commerce-b-com-b-com-hons'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'SAP/ERP Consultant', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-b-com-b-com-hons'
  AND sp.name = 'Computer Applications'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'MCA → IT Project Manager', 2
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-b-com-b-com-hons'
  AND sp.name = 'Computer Applications'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Data Analyst (BFSI)', 3
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-b-com-b-com-hons'
  AND sp.name = 'Computer Applications'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Fintech Product Analyst', 4
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-b-com-b-com-hons'
  AND sp.name = 'Computer Applications'
ON CONFLICT (specialization_id, name) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'Taxation', '₹4–60 LPA', 6
FROM courses WHERE slug = 'commerce-b-com-b-com-hons'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'GST Practitioner', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-b-com-b-com-hons'
  AND sp.name = 'Taxation'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'CA Tax Track', 2
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-b-com-b-com-hons'
  AND sp.name = 'Taxation'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Tax Consultant', 3
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-b-com-b-com-hons'
  AND sp.name = 'Taxation'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'IRS Officer (UPSC)', 4
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-b-com-b-com-hons'
  AND sp.name = 'Taxation'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Transfer Pricing Specialist', 5
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-b-com-b-com-hons'
  AND sp.name = 'Taxation'
ON CONFLICT (specialization_id, name) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'e-Commerce / Digital Business', '₹4–25 LPA', 7
FROM courses WHERE slug = 'commerce-b-com-b-com-hons'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'E-Commerce Manager (Amazon/Flipkart)', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-b-com-b-com-hons'
  AND sp.name = 'e-Commerce / Digital Business'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'D2C Brand Founder', 2
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-b-com-b-com-hons'
  AND sp.name = 'e-Commerce / Digital Business'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Category Manager', 3
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-b-com-b-com-hons'
  AND sp.name = 'e-Commerce / Digital Business'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Digital Commerce Head', 4
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-b-com-b-com-hons'
  AND sp.name = 'e-Commerce / Digital Business'
ON CONFLICT (specialization_id, name) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'Cost & Management Accounting', '₹3–40 LPA', 8
FROM courses WHERE slug = 'commerce-b-com-b-com-hons'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'CMA (ICAI/CIMA)', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-b-com-b-com-hons'
  AND sp.name = 'Cost & Management Accounting'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Cost Accountant', 2
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-b-com-b-com-hons'
  AND sp.name = 'Cost & Management Accounting'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Plant Finance Manager', 3
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-b-com-b-com-hons'
  AND sp.name = 'Cost & Management Accounting'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'CIMA UK → MNC CFO', 4
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-b-com-b-com-hons'
  AND sp.name = 'Cost & Management Accounting'
ON CONFLICT (specialization_id, name) DO NOTHING;

INSERT INTO courses
  (slug, name, icon, stream_id, duration, salary_range, exam_text, colleges,
   description, fit_for, compare_with, pg_options, is_active, sort_order)
SELECT
  'commerce-bba-bms',
  'BBA / BMS',
  '📊',
  id,
  '3 years',
  '₹3 – 50+ LPA',
  'IPU CET · NMIMS NPAT · DU JAT · Symbiosis SET · Christ Entrance',
  'Christ · Symbiosis · NMIMS · IP University · DU Shaheed Sukhdev · FLAME · Manipal',
  'Management degree with the widest range of specializations. Gateway to MBA and direct corporate roles in all sectors.',
  'interested in business and management, planning an MBA, or wants to start a business someday',
  ARRAY['B.Com (accounting/finance focus)', 'Economics Hons (policy/finance path)', 'CA (direct professional route)'],
  ARRAY['MBA (CAT/GMAT) → IIM/XLRI/FMS', 'MBA Abroad (INSEAD/HBS — GMAT)', 'PGDM (SPJIMR/MDI/IMT)', 'MA/MBA International Business (IIFT)', 'MCA (NIMCET) for IT track'],
  true,
  2
FROM streams WHERE slug = 'commerce'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO salary_ranges (course_id, label, range_text, sort_order)
SELECT c.id, v.label, v.range_text, v.sort_order
FROM courses c
CROSS JOIN (VALUES
  ('Fresher', '₹3–6 LPA', 1),
  ('Junior / 1–3 yrs', '₹8–25 LPA', 2),
  ('Mid / 3–7 yrs', '₹30–50+ LPA', 3)
) AS v(label, range_text, sort_order)
WHERE c.slug = 'commerce-bba-bms'
ON CONFLICT (course_id, sort_order) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'Finance', '₹5–80 LPA', 1
FROM courses WHERE slug = 'commerce-bba-bms'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'MBA Finance → Investment Banker', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-bba-bms'
  AND sp.name = 'Finance'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'CFA/FRM Analyst', 2
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-bba-bms'
  AND sp.name = 'Finance'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Banking (IBPS/SBI)', 3
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-bba-bms'
  AND sp.name = 'Finance'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Equity Research', 4
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-bba-bms'
  AND sp.name = 'Finance'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Treasury Analyst', 5
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-bba-bms'
  AND sp.name = 'Finance'
ON CONFLICT (specialization_id, name) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'Marketing', '₹4–50 LPA', 2
FROM courses WHERE slug = 'commerce-bba-bms'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'MBA Marketing (IIM/MICA) → Brand Manager', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-bba-bms'
  AND sp.name = 'Marketing'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'FMCG Marketing Executive', 2
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-bba-bms'
  AND sp.name = 'Marketing'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Digital Marketing Manager', 3
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-bba-bms'
  AND sp.name = 'Marketing'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Advertising Account Lead', 4
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-bba-bms'
  AND sp.name = 'Marketing'
ON CONFLICT (specialization_id, name) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'Human Resources', '₹4–40 LPA', 3
FROM courses WHERE slug = 'commerce-bba-bms'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'MBA HR (XLRI/TISS)', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-bba-bms'
  AND sp.name = 'Human Resources'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Corporate HR Business Partner', 2
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-bba-bms'
  AND sp.name = 'Human Resources'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Talent Acquisition Lead', 3
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-bba-bms'
  AND sp.name = 'Human Resources'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'HR Tech Specialist', 4
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-bba-bms'
  AND sp.name = 'Human Resources'
ON CONFLICT (specialization_id, name) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'Computer Applications / IT', '₹4–35 LPA', 4
FROM courses WHERE slug = 'commerce-bba-bms'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'MCA → IT Project Manager', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-bba-bms'
  AND sp.name = 'Computer Applications / IT'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'MBA Tech', 2
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-bba-bms'
  AND sp.name = 'Computer Applications / IT'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'ERP/SAP Consultant', 3
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-bba-bms'
  AND sp.name = 'Computer Applications / IT'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Data Analytics Lead', 4
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-bba-bms'
  AND sp.name = 'Computer Applications / IT'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Cybersecurity Manager', 5
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-bba-bms'
  AND sp.name = 'Computer Applications / IT'
ON CONFLICT (specialization_id, name) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'International Business', '₹6–50 LPA', 5
FROM courses WHERE slug = 'commerce-bba-bms'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'MBA IB (IIFT/XLRI)', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-bba-bms'
  AND sp.name = 'International Business'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Export-Import Manager', 2
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-bba-bms'
  AND sp.name = 'International Business'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'DGFT / Customs Officer', 3
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-bba-bms'
  AND sp.name = 'International Business'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'MBA Abroad (INSEAD/HBS)', 4
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-bba-bms'
  AND sp.name = 'International Business'
ON CONFLICT (specialization_id, name) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'Entrepreneurship', 'Variable', 6
FROM courses WHERE slug = 'commerce-bba-bms'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Startup Founder', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-bba-bms'
  AND sp.name = 'Entrepreneurship'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'ISB/IIM MBA → VC Backed Startup', 2
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-bba-bms'
  AND sp.name = 'Entrepreneurship'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Family Business Director', 3
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-bba-bms'
  AND sp.name = 'Entrepreneurship'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Angel Investor', 4
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-bba-bms'
  AND sp.name = 'Entrepreneurship'
ON CONFLICT (specialization_id, name) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'Logistics & Supply Chain', '₹4–35 LPA', 7
FROM courses WHERE slug = 'commerce-bba-bms'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'MBA Operations (NITIE/IIM)', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-bba-bms'
  AND sp.name = 'Logistics & Supply Chain'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Supply Chain Manager', 2
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-bba-bms'
  AND sp.name = 'Logistics & Supply Chain'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Procurement Director', 3
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-bba-bms'
  AND sp.name = 'Logistics & Supply Chain'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'E-Commerce Logistics Head', 4
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-bba-bms'
  AND sp.name = 'Logistics & Supply Chain'
ON CONFLICT (specialization_id, name) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'Digital Marketing', '₹5–45 LPA', 8
FROM courses WHERE slug = 'commerce-bba-bms'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'MBA Marketing/MICA', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-bba-bms'
  AND sp.name = 'Digital Marketing'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Digital Agency Head', 2
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-bba-bms'
  AND sp.name = 'Digital Marketing'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'CMO (Startup)', 3
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-bba-bms'
  AND sp.name = 'Digital Marketing'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Performance Marketing Lead', 4
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-bba-bms'
  AND sp.name = 'Digital Marketing'
ON CONFLICT (specialization_id, name) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'Data Science / Analytics', '₹6–50 LPA', 9
FROM courses WHERE slug = 'commerce-bba-bms'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'MBA Analytics (SPJIMR/ISB)', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-bba-bms'
  AND sp.name = 'Data Science / Analytics'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Data Analyst', 2
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-bba-bms'
  AND sp.name = 'Data Science / Analytics'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Business Intelligence Lead', 3
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-bba-bms'
  AND sp.name = 'Data Science / Analytics'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'M.Sc Data Science', 4
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-bba-bms'
  AND sp.name = 'Data Science / Analytics'
ON CONFLICT (specialization_id, name) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'AI & Technology Management', '₹8–60 LPA', 10
FROM courses WHERE slug = 'commerce-bba-bms'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'MBA Tech (IIM/IIT)', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-bba-bms'
  AND sp.name = 'AI & Technology Management'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Product Manager (Tech)', 2
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-bba-bms'
  AND sp.name = 'AI & Technology Management'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'AI Strategy Consultant', 3
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-bba-bms'
  AND sp.name = 'AI & Technology Management'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Digital Transformation Lead', 4
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-bba-bms'
  AND sp.name = 'AI & Technology Management'
ON CONFLICT (specialization_id, name) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'Aviation Management', '₹4–30 LPA', 11
FROM courses WHERE slug = 'commerce-bba-bms'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'MBA Aviation', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-bba-bms'
  AND sp.name = 'Aviation Management'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Airport Operations Manager (AAI)', 2
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-bba-bms'
  AND sp.name = 'Aviation Management'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Airline Revenue Manager', 3
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-bba-bms'
  AND sp.name = 'Aviation Management'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Cabin Crew / Ground Handling', 4
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-bba-bms'
  AND sp.name = 'Aviation Management'
ON CONFLICT (specialization_id, name) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'Healthcare / Hospital Management', '₹4–25 LPA', 12
FROM courses WHERE slug = 'commerce-bba-bms'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'MHA (TISS/IIHMR)', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-bba-bms'
  AND sp.name = 'Healthcare / Hospital Management'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Hospital Administrator', 2
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-bba-bms'
  AND sp.name = 'Healthcare / Hospital Management'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Insurance Manager', 3
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-bba-bms'
  AND sp.name = 'Healthcare / Hospital Management'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Pharma Marketing Head', 4
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-bba-bms'
  AND sp.name = 'Healthcare / Hospital Management'
ON CONFLICT (specialization_id, name) DO NOTHING;

INSERT INTO courses
  (slug, name, icon, stream_id, duration, salary_range, exam_text, colleges,
   description, fit_for, compare_with, pg_options, is_active, sort_order)
SELECT
  'commerce-ca-cma-cs',
  'CA / CMA / CS',
  '📋',
  id,
  '3–5 years (self-paced)',
  '₹8 – 1Cr+ LPA',
  'ICAI / ICMAI / ICSI Foundation → Intermediate → Final',
  'ICAI (self-study + articleship) · ICMAI · ICSI — no college needed',
  'Professional qualifications regulated by statutory bodies. CA is among the world''s toughest exams. All three open very high-paying career paths.',
  'loves numbers and finance, very disciplined and self-motivated, wants a top professional qualification',
  ARRAY['MBA Finance IIM (needs graduation first)', 'CFA/FRM (investment/risk focus)', 'B.Com + M.Com (academic route)'],
  ARRAY['CFA (USA) — 3 levels', 'FRM (GARP) — 2 levels', 'CIMA (UK) — Management Accounting', 'MBA Finance (CAT/GMAT) after CA', 'ACCA (UK) — Global accounting'],
  true,
  3
FROM streams WHERE slug = 'commerce'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO salary_ranges (course_id, label, range_text, sort_order)
SELECT c.id, v.label, v.range_text, v.sort_order
FROM courses c
CROSS JOIN (VALUES
  ('Fresher', '₹8–15 LPA', 1),
  ('Junior / 1–3 yrs', '₹20–40 LPA', 2),
  ('Mid / 3–7 yrs', '₹60–1Cr+ LPA', 3)
) AS v(label, range_text, sort_order)
WHERE c.slug = 'commerce-ca-cma-cs'
ON CONFLICT (course_id, sort_order) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'CA — Chartered Accountant (ICAI)', '₹8–1Cr+ LPA', 1
FROM courses WHERE slug = 'commerce-ca-cma-cs'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'CFO / Finance Director', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-ca-cma-cs'
  AND sp.name = 'CA — Chartered Accountant (ICAI)'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Big 4 Audit/Tax/Advisory Partner', 2
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-ca-cma-cs'
  AND sp.name = 'CA — Chartered Accountant (ICAI)'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Statutory Auditor', 3
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-ca-cma-cs'
  AND sp.name = 'CA — Chartered Accountant (ICAI)'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Tax Consultant', 4
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-ca-cma-cs'
  AND sp.name = 'CA — Chartered Accountant (ICAI)'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Investment Banker', 5
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-ca-cma-cs'
  AND sp.name = 'CA — Chartered Accountant (ICAI)'
ON CONFLICT (specialization_id, name) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'CMA — Cost & Management Accountant', '₹6–40 LPA', 2
FROM courses WHERE slug = 'commerce-ca-cma-cs'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Cost Accountant', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-ca-cma-cs'
  AND sp.name = 'CMA — Cost & Management Accountant'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Management Accountant', 2
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-ca-cma-cs'
  AND sp.name = 'CMA — Cost & Management Accountant'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Financial Controller', 3
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-ca-cma-cs'
  AND sp.name = 'CMA — Cost & Management Accountant'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'PSU Finance Officer', 4
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-ca-cma-cs'
  AND sp.name = 'CMA — Cost & Management Accountant'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Internal Auditor', 5
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-ca-cma-cs'
  AND sp.name = 'CMA — Cost & Management Accountant'
ON CONFLICT (specialization_id, name) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'CS — Company Secretary (ICSI)', '₹6–35 LPA', 3
FROM courses WHERE slug = 'commerce-ca-cma-cs'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Company Secretary (Listed Companies)', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-ca-cma-cs'
  AND sp.name = 'CS — Company Secretary (ICSI)'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Corporate Governance Officer', 2
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-ca-cma-cs'
  AND sp.name = 'CS — Company Secretary (ICSI)'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Legal/Compliance Head', 3
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-ca-cma-cs'
  AND sp.name = 'CS — Company Secretary (ICSI)'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'SEBI/MCA Officer', 4
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-ca-cma-cs'
  AND sp.name = 'CS — Company Secretary (ICSI)'
ON CONFLICT (specialization_id, name) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'Actuarial Science (IAI / IFoA)', '₹10–80 LPA', 4
FROM courses WHERE slug = 'commerce-ca-cma-cs'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Actuary (Insurance)', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-ca-cma-cs'
  AND sp.name = 'Actuarial Science (IAI / IFoA)'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Risk Analyst', 2
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-ca-cma-cs'
  AND sp.name = 'Actuarial Science (IAI / IFoA)'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Pension Fund Manager', 3
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-ca-cma-cs'
  AND sp.name = 'Actuarial Science (IAI / IFoA)'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Reinsurance Specialist', 4
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-ca-cma-cs'
  AND sp.name = 'Actuarial Science (IAI / IFoA)'
ON CONFLICT (specialization_id, name) DO NOTHING;

INSERT INTO courses
  (slug, name, icon, stream_id, duration, salary_range, exam_text, colleges,
   description, fit_for, compare_with, pg_options, is_active, sort_order)
SELECT
  'commerce-economics-hons',
  'Economics (Hons)',
  '📈',
  id,
  '3 years',
  '₹5 – 60 LPA',
  'CUET / DU / JNU / Presidency Entrance',
  'SRCC DU · LSR · JNU · Presidency Kolkata · Christ · St. Stephen''s',
  'Quantitative economics is highly valued in finance, policy, and tech. SRCC and JNU Economics are among India''s most competitive programmes.',
  'strong in maths, interested in markets or policy, thinking of banking, finance, consulting, or research',
  ARRAY['B.Com Hons (accounting/finance balance)', 'BA Statistics (data/analytics focus)', 'BBA (management route to MBA)'],
  ARRAY['M.Sc Economics (JNU/DSE/ISI)', 'MBA Finance (CAT) → IIM', 'MA Development Economics (TISS)', 'MS Abroad (LSE/Oxford/Columbia)', 'PhD Economics (UGC-NET/CSIR)'],
  true,
  4
FROM streams WHERE slug = 'commerce'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO salary_ranges (course_id, label, range_text, sort_order)
SELECT c.id, v.label, v.range_text, v.sort_order
FROM courses c
CROSS JOIN (VALUES
  ('Fresher', '₹5–8 LPA', 1),
  ('Junior / 1–3 yrs', '₹12–25 LPA', 2),
  ('Mid / 3–7 yrs', '₹35–60 LPA', 3)
) AS v(label, range_text, sort_order)
WHERE c.slug = 'commerce-economics-hons'
ON CONFLICT (course_id, sort_order) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'BA/B.Sc Economics', '₹5–60 LPA', 1
FROM courses WHERE slug = 'commerce-economics-hons'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Economist (RBI/NITI Aayog/World Bank)', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-economics-hons'
  AND sp.name = 'BA/B.Sc Economics'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Investment Analyst', 2
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-economics-hons'
  AND sp.name = 'BA/B.Sc Economics'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Policy Researcher', 3
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-economics-hons'
  AND sp.name = 'BA/B.Sc Economics'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'MBA Finance → Consultant', 4
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-economics-hons'
  AND sp.name = 'BA/B.Sc Economics'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Data Scientist (Econometrics)', 5
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-economics-hons'
  AND sp.name = 'BA/B.Sc Economics'
ON CONFLICT (specialization_id, name) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'PPE (Philosophy, Politics, Economics)', '₹5–40 LPA', 2
FROM courses WHERE slug = 'commerce-economics-hons'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Civil Services (IAS/IFS)', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-economics-hons'
  AND sp.name = 'PPE (Philosophy, Politics, Economics)'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Policy Analyst', 2
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-economics-hons'
  AND sp.name = 'PPE (Philosophy, Politics, Economics)'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Journalist', 3
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-economics-hons'
  AND sp.name = 'PPE (Philosophy, Politics, Economics)'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Diplomat', 4
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-economics-hons'
  AND sp.name = 'PPE (Philosophy, Politics, Economics)'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Think Tank Researcher', 5
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-economics-hons'
  AND sp.name = 'PPE (Philosophy, Politics, Economics)'
ON CONFLICT (specialization_id, name) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'Business Economics', '₹6–50 LPA', 3
FROM courses WHERE slug = 'commerce-economics-hons'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Corporate Economist', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-economics-hons'
  AND sp.name = 'Business Economics'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Market Research Analyst', 2
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-economics-hons'
  AND sp.name = 'Business Economics'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Investment Analyst', 3
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-economics-hons'
  AND sp.name = 'Business Economics'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Management Consultant', 4
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-economics-hons'
  AND sp.name = 'Business Economics'
ON CONFLICT (specialization_id, name) DO NOTHING;

INSERT INTO courses
  (slug, name, icon, stream_id, duration, salary_range, exam_text, colleges,
   description, fit_for, compare_with, pg_options, is_active, sort_order)
SELECT
  'commerce-law-integrated-5-yr',
  'Law (Integrated 5-yr)',
  '⚖️',
  id,
  '5 years',
  '₹6 – 1Cr+ LPA',
  'CLAT / AILET / LSAT India / MH CET Law',
  'NLU Delhi · NLSIU Bangalore · NLU Mumbai · Symbiosis Law · Jindal Law',
  'India''s premier law schools (NLUs). Top NLU graduates are placed at ₹25–100 LPA in BigLaw and corporate law firms.',
  'strong in English and argumentation, interested in corporate transactions, justice, or policy',
  ARRAY['BA LLB Arts stream (same CLAT)', 'MBA (management track)', 'Civil Services IAS/IPS (UPSC route)'],
  ARRAY['LLM Corporate / Tax Law (1–2 yrs)', 'LLM Abroad (Harvard/Oxford/LSE)', 'Bar Exam (UK — BPTC · USA — Bar)', 'PhD Law (UGC-NET)'],
  true,
  5
FROM streams WHERE slug = 'commerce'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO salary_ranges (course_id, label, range_text, sort_order)
SELECT c.id, v.label, v.range_text, v.sort_order
FROM courses c
CROSS JOIN (VALUES
  ('Fresher', '₹6–12 LPA', 1),
  ('Junior / 1–3 yrs', '₹20–50 LPA', 2),
  ('Mid / 3–7 yrs', '₹60–1Cr+ LPA', 3)
) AS v(label, range_text, sort_order)
WHERE c.slug = 'commerce-law-integrated-5-yr'
ON CONFLICT (course_id, sort_order) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'B.Com LLB (Commerce + Law)', '₹8–80 LPA', 1
FROM courses WHERE slug = 'commerce-law-integrated-5-yr'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Corporate Lawyer (M&A/PE/VC)', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-law-integrated-5-yr'
  AND sp.name = 'B.Com LLB (Commerce + Law)'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Tax Counsel', 2
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-law-integrated-5-yr'
  AND sp.name = 'B.Com LLB (Commerce + Law)'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Securities Lawyer', 3
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-law-integrated-5-yr'
  AND sp.name = 'B.Com LLB (Commerce + Law)'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Legal Director (Startup)', 4
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-law-integrated-5-yr'
  AND sp.name = 'B.Com LLB (Commerce + Law)'
ON CONFLICT (specialization_id, name) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'BBA LLB (Management + Law)', '₹8–80 LPA', 2
FROM courses WHERE slug = 'commerce-law-integrated-5-yr'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Corporate Lawyer', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-law-integrated-5-yr'
  AND sp.name = 'BBA LLB (Management + Law)'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'In-House Counsel (MNC)', 2
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-law-integrated-5-yr'
  AND sp.name = 'BBA LLB (Management + Law)'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Compliance Officer', 3
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-law-integrated-5-yr'
  AND sp.name = 'BBA LLB (Management + Law)'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'IPR Attorney', 4
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-law-integrated-5-yr'
  AND sp.name = 'BBA LLB (Management + Law)'
ON CONFLICT (specialization_id, name) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'BA LLB (Humanities + Law)', '₹6–40 LPA', 3
FROM courses WHERE slug = 'commerce-law-integrated-5-yr'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Constitutional Lawyer', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-law-integrated-5-yr'
  AND sp.name = 'BA LLB (Humanities + Law)'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Criminal Advocate', 2
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-law-integrated-5-yr'
  AND sp.name = 'BA LLB (Humanities + Law)'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Public Prosecutor', 3
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-law-integrated-5-yr'
  AND sp.name = 'BA LLB (Humanities + Law)'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Human Rights Lawyer', 4
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'commerce-law-integrated-5-yr'
  AND sp.name = 'BA LLB (Humanities + Law)'
ON CONFLICT (specialization_id, name) DO NOTHING;

-- Stream: Arts / Humanities (12thth)

INSERT INTO courses
  (slug, name, icon, stream_id, duration, salary_range, exam_text, colleges,
   description, fit_for, compare_with, pg_options, is_active, sort_order)
SELECT
  'arts-ba-honours',
  'BA (Honours)',
  '📚',
  id,
  '3 years',
  '₹3 – 40+ LPA',
  'CUET / DU / JNU / BHU / State Entrance',
  'JNU · DU (Miranda/LSR/Hindu) · Presidency · BHU · Jadavpur · Hyderabad Central University',
  'Widest range of subjects. JNU is India''s best for humanities research. DU''s top colleges have very high cutoffs for popular subjects.',
  'curious about society, literature, culture, or politics — plans to pursue UPSC, journalism, law, or research',
  ARRAY['Psychology BSc (more vocational, clinical path)', 'Journalism BMM (media career direct)', 'Law BA LLB (CLAT)'],
  ARRAY['MA (CUET PG / JNU Entrance)', 'MBA (CAT/XAT) — all streams welcome', 'LLB (3-yr) after graduation', 'M.Sc Psychology (Clinical — RCI)', 'MA Development Studies (TISS)'],
  true,
  1
FROM streams WHERE slug = 'arts'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO salary_ranges (course_id, label, range_text, sort_order)
SELECT c.id, v.label, v.range_text, v.sort_order
FROM courses c
CROSS JOIN (VALUES
  ('Fresher', '₹3–5 LPA', 1),
  ('Junior / 1–3 yrs', '₹8–18 LPA', 2),
  ('Mid / 3–7 yrs', '₹22–40+ LPA', 3)
) AS v(label, range_text, sort_order)
WHERE c.slug = 'arts-ba-honours'
ON CONFLICT (course_id, sort_order) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'History / Political Science', '₹3–30 LPA', 1
FROM courses WHERE slug = 'arts-ba-honours'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Civil Services (IAS/IPS/IFS)', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-ba-honours'
  AND sp.name = 'History / Political Science'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Journalist / Editor', 2
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-ba-honours'
  AND sp.name = 'History / Political Science'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Political Analyst', 3
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-ba-honours'
  AND sp.name = 'History / Political Science'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Academic Researcher', 4
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-ba-honours'
  AND sp.name = 'History / Political Science'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Diplomat', 5
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-ba-honours'
  AND sp.name = 'History / Political Science'
ON CONFLICT (specialization_id, name) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'Psychology', '₹4–25 LPA', 2
FROM courses WHERE slug = 'arts-ba-honours'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Clinical Psychologist (RCI)', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-ba-honours'
  AND sp.name = 'Psychology'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'HR / OB Specialist', 2
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-ba-honours'
  AND sp.name = 'Psychology'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'School Counsellor', 3
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-ba-honours'
  AND sp.name = 'Psychology'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'UX Researcher', 4
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-ba-honours'
  AND sp.name = 'Psychology'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Behavioural Analyst', 5
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-ba-honours'
  AND sp.name = 'Psychology'
ON CONFLICT (specialization_id, name) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'Sociology / Social Work', '₹3–20 LPA', 3
FROM courses WHERE slug = 'arts-ba-honours'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Social Worker (TISS)', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-ba-honours'
  AND sp.name = 'Sociology / Social Work'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'NGO Programme Manager', 2
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-ba-honours'
  AND sp.name = 'Sociology / Social Work'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'CSR Manager', 3
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-ba-honours'
  AND sp.name = 'Sociology / Social Work'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Policy Analyst', 4
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-ba-honours'
  AND sp.name = 'Sociology / Social Work'
ON CONFLICT (specialization_id, name) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'English Literature / Journalism', '₹3–25 LPA', 4
FROM courses WHERE slug = 'arts-ba-honours'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Journalist / Reporter', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-ba-honours'
  AND sp.name = 'English Literature / Journalism'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Content Strategist', 2
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-ba-honours'
  AND sp.name = 'English Literature / Journalism'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Copywriter', 3
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-ba-honours'
  AND sp.name = 'English Literature / Journalism'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Editor', 4
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-ba-honours'
  AND sp.name = 'English Literature / Journalism'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'PR Specialist', 5
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-ba-honours'
  AND sp.name = 'English Literature / Journalism'
ON CONFLICT (specialization_id, name) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'Geography / Environment', '₹3–20 LPA', 5
FROM courses WHERE slug = 'arts-ba-honours'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'GIS Analyst', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-ba-honours'
  AND sp.name = 'Geography / Environment'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Urban Planner', 2
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-ba-honours'
  AND sp.name = 'Geography / Environment'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Environmental Consultant', 3
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-ba-honours'
  AND sp.name = 'Geography / Environment'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'UPSC Geography Optional', 4
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-ba-honours'
  AND sp.name = 'Geography / Environment'
ON CONFLICT (specialization_id, name) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'Hindi / Sanskrit / Linguistics', '₹2.5–15 LPA', 6
FROM courses WHERE slug = 'arts-ba-honours'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Translator / Interpreter', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-ba-honours'
  AND sp.name = 'Hindi / Sanskrit / Linguistics'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Language Teacher', 2
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-ba-honours'
  AND sp.name = 'Hindi / Sanskrit / Linguistics'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Content Writer', 3
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-ba-honours'
  AND sp.name = 'Hindi / Sanskrit / Linguistics'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Govt Language Officer', 4
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-ba-honours'
  AND sp.name = 'Hindi / Sanskrit / Linguistics'
ON CONFLICT (specialization_id, name) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'Philosophy / Ethics', '₹3–18 LPA', 7
FROM courses WHERE slug = 'arts-ba-honours'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'UPSC Essay/Ethics Paper', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-ba-honours'
  AND sp.name = 'Philosophy / Ethics'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Academic Philosopher', 2
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-ba-honours'
  AND sp.name = 'Philosophy / Ethics'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Content Ethicist (Tech firms)', 3
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-ba-honours'
  AND sp.name = 'Philosophy / Ethics'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Policy Researcher', 4
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-ba-honours'
  AND sp.name = 'Philosophy / Ethics'
ON CONFLICT (specialization_id, name) DO NOTHING;

INSERT INTO courses
  (slug, name, icon, stream_id, duration, salary_range, exam_text, colleges,
   description, fit_for, compare_with, pg_options, is_active, sort_order)
SELECT
  'arts-ba-llb-law',
  'BA LLB / Law',
  '⚖️',
  id,
  '5 years',
  '₹6 – 1Cr+ LPA',
  'CLAT / AILET / MHCET Law / LSAT India',
  'NLSIU Bangalore · NLU Delhi · NLU Mumbai · Nalsar Hyderabad · Jindal',
  '5-year integrated law. NLU graduates enter elite litigation and corporate law. One of India''s most competitive undergraduate paths.',
  'strong in English and argumentation, wants a legal career in courts or corporate law firms',
  ARRAY['B.Com LLB (commerce + law blend)', 'LLB 3-yr after graduation (BA first)', 'MBA (management alternative)'],
  ARRAY['LLM (1–2 yrs — NLU / Symbiosis)', 'LLM Abroad (Oxford / Harvard / LSE)', 'Bar Exams (UK / USA)', 'PhD Law (UGC-NET)'],
  true,
  2
FROM streams WHERE slug = 'arts'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO salary_ranges (course_id, label, range_text, sort_order)
SELECT c.id, v.label, v.range_text, v.sort_order
FROM courses c
CROSS JOIN (VALUES
  ('Fresher', '₹6–12 LPA', 1),
  ('Junior / 1–3 yrs', '₹20–50 LPA', 2),
  ('Mid / 3–7 yrs', '₹60–1Cr LPA', 3)
) AS v(label, range_text, sort_order)
WHERE c.slug = 'arts-ba-llb-law'
ON CONFLICT (course_id, sort_order) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'Constitutional / Administrative Law', '₹6–40 LPA', 1
FROM courses WHERE slug = 'arts-ba-llb-law'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'High Court / Supreme Court Advocate', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-ba-llb-law'
  AND sp.name = 'Constitutional / Administrative Law'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Judicial Services', 2
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-ba-llb-law'
  AND sp.name = 'Constitutional / Administrative Law'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Legal Aid Lawyer', 3
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-ba-llb-law'
  AND sp.name = 'Constitutional / Administrative Law'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Constitutional Researcher', 4
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-ba-llb-law'
  AND sp.name = 'Constitutional / Administrative Law'
ON CONFLICT (specialization_id, name) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'Corporate / Commercial Law', '₹10–1Cr LPA', 2
FROM courses WHERE slug = 'arts-ba-llb-law'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'M&A Lawyer (AZB/Trilegal/Cyril)', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-ba-llb-law'
  AND sp.name = 'Corporate / Commercial Law'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Investment Banker (Legal)', 2
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-ba-llb-law'
  AND sp.name = 'Corporate / Commercial Law'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'BigLaw Partner', 3
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-ba-llb-law'
  AND sp.name = 'Corporate / Commercial Law'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'General Counsel (MNC)', 4
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-ba-llb-law'
  AND sp.name = 'Corporate / Commercial Law'
ON CONFLICT (specialization_id, name) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'Criminal Law', '₹4–30 LPA', 3
FROM courses WHERE slug = 'arts-ba-llb-law'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Criminal Advocate', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-ba-llb-law'
  AND sp.name = 'Criminal Law'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Public Prosecutor', 2
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-ba-llb-law'
  AND sp.name = 'Criminal Law'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Defence Lawyer', 3
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-ba-llb-law'
  AND sp.name = 'Criminal Law'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Legal Journalist', 4
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-ba-llb-law'
  AND sp.name = 'Criminal Law'
ON CONFLICT (specialization_id, name) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'Human Rights / International Law', '₹4–25 LPA', 4
FROM courses WHERE slug = 'arts-ba-llb-law'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'UN Agency Officer', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-ba-llb-law'
  AND sp.name = 'Human Rights / International Law'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Human Rights Advocate', 2
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-ba-llb-law'
  AND sp.name = 'Human Rights / International Law'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'International Arbitration Lawyer', 3
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-ba-llb-law'
  AND sp.name = 'Human Rights / International Law'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'NGO Legal Counsel', 4
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-ba-llb-law'
  AND sp.name = 'Human Rights / International Law'
ON CONFLICT (specialization_id, name) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'IPR / Technology Law', '₹8–60 LPA', 5
FROM courses WHERE slug = 'arts-ba-llb-law'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Patent Attorney', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-ba-llb-law'
  AND sp.name = 'IPR / Technology Law'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'IP Counsel (Tech firm)', 2
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-ba-llb-law'
  AND sp.name = 'IPR / Technology Law'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Trademark Lawyer', 3
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-ba-llb-law'
  AND sp.name = 'IPR / Technology Law'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Copyright Specialist', 4
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-ba-llb-law'
  AND sp.name = 'IPR / Technology Law'
ON CONFLICT (specialization_id, name) DO NOTHING;

INSERT INTO courses
  (slug, name, icon, stream_id, duration, salary_range, exam_text, colleges,
   description, fit_for, compare_with, pg_options, is_active, sort_order)
SELECT
  'arts-fine-arts-design',
  'Fine Arts / Design',
  '🎨',
  id,
  '4 years',
  '₹4 – 50+ LPA',
  'UCEED / NID DAT / NIFT Entrance / CEED',
  'NID Ahmedabad · NIFT Delhi · IIT IDC · Pearl Academy · MIT Institute of Design',
  'Creative career with strong demand — UX/UI design is booming. NID and IIT IDC are top institutions. Startups and MNCs hire heavily.',
  'has strong visual or spatial creativity, interested in product design, fashion, UX, or animation',
  ARRAY['B.Arch (architecture + design blend)', 'B.Sc Animation (shorter, film/game)', 'Mass Communication BMM (media + storytelling)'],
  ARRAY['M.Des (CEED → IIT/IISc)', 'NID PG (NID DAT PG)', 'NIFT PG', 'MFA Abroad (USA/UK)', 'MBA Design Management'],
  true,
  3
FROM streams WHERE slug = 'arts'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO salary_ranges (course_id, label, range_text, sort_order)
SELECT c.id, v.label, v.range_text, v.sort_order
FROM courses c
CROSS JOIN (VALUES
  ('Fresher', '₹4–7 LPA', 1),
  ('Junior / 1–3 yrs', '₹10–25 LPA', 2),
  ('Mid / 3–7 yrs', '₹30–50+ LPA', 3)
) AS v(label, range_text, sort_order)
WHERE c.slug = 'arts-fine-arts-design'
ON CONFLICT (course_id, sort_order) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'Product / Industrial Design (NID/IIT)', '₹6–35 LPA', 1
FROM courses WHERE slug = 'arts-fine-arts-design'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Product Designer', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-fine-arts-design'
  AND sp.name = 'Product / Industrial Design (NID/IIT)'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'UX/UI Designer', 2
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-fine-arts-design'
  AND sp.name = 'Product / Industrial Design (NID/IIT)'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Industrial Designer', 3
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-fine-arts-design'
  AND sp.name = 'Product / Industrial Design (NID/IIT)'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Design Director', 4
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-fine-arts-design'
  AND sp.name = 'Product / Industrial Design (NID/IIT)'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Design Strategist', 5
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-fine-arts-design'
  AND sp.name = 'Product / Industrial Design (NID/IIT)'
ON CONFLICT (specialization_id, name) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'Graphic / Communication Design', '₹4–30 LPA', 2
FROM courses WHERE slug = 'arts-fine-arts-design'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Graphic Designer', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-fine-arts-design'
  AND sp.name = 'Graphic / Communication Design'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Brand Identity Designer', 2
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-fine-arts-design'
  AND sp.name = 'Graphic / Communication Design'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Motion Designer', 3
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-fine-arts-design'
  AND sp.name = 'Graphic / Communication Design'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Creative Director', 4
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-fine-arts-design'
  AND sp.name = 'Graphic / Communication Design'
ON CONFLICT (specialization_id, name) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'Fashion Design (NIFT)', '₹4–35 LPA', 3
FROM courses WHERE slug = 'arts-fine-arts-design'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Fashion Designer', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-fine-arts-design'
  AND sp.name = 'Fashion Design (NIFT)'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Textile Designer', 2
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-fine-arts-design'
  AND sp.name = 'Fashion Design (NIFT)'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Fashion Buyer', 3
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-fine-arts-design'
  AND sp.name = 'Fashion Design (NIFT)'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Stylist', 4
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-fine-arts-design'
  AND sp.name = 'Fashion Design (NIFT)'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Own Fashion Label', 5
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-fine-arts-design'
  AND sp.name = 'Fashion Design (NIFT)'
ON CONFLICT (specialization_id, name) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'Animation / Film / Game Design', '₹4–25 LPA', 4
FROM courses WHERE slug = 'arts-fine-arts-design'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, '3D Animator', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-fine-arts-design'
  AND sp.name = 'Animation / Film / Game Design'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Game Designer', 2
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-fine-arts-design'
  AND sp.name = 'Animation / Film / Game Design'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'VFX Artist', 3
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-fine-arts-design'
  AND sp.name = 'Animation / Film / Game Design'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Film Director (FTII)', 4
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-fine-arts-design'
  AND sp.name = 'Animation / Film / Game Design'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Motion Graphics Artist', 5
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-fine-arts-design'
  AND sp.name = 'Animation / Film / Game Design'
ON CONFLICT (specialization_id, name) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'UX / Interaction Design', '₹6–40 LPA', 5
FROM courses WHERE slug = 'arts-fine-arts-design'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'UX Designer (Tech firm)', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-fine-arts-design'
  AND sp.name = 'UX / Interaction Design'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Interaction Designer', 2
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-fine-arts-design'
  AND sp.name = 'UX / Interaction Design'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Product Design Lead', 3
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-fine-arts-design'
  AND sp.name = 'UX / Interaction Design'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Design Researcher', 4
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-fine-arts-design'
  AND sp.name = 'UX / Interaction Design'
ON CONFLICT (specialization_id, name) DO NOTHING;

INSERT INTO courses
  (slug, name, icon, stream_id, duration, salary_range, exam_text, colleges,
   description, fit_for, compare_with, pg_options, is_active, sort_order)
SELECT
  'arts-journalism-mass-communication',
  'Journalism / Mass Communication',
  '📰',
  id,
  '3 years',
  '₹3 – 25 LPA',
  'IIMC Entrance · ACJ · CUET / Symbiosis / Christ',
  'IIMC Delhi · ACJ Chennai · Jamia Millia · Symbiosis · Xavier Institute (Mumbai)',
  'Covers journalism, PR, advertising, digital media, and OTT content. IIMC is India''s top mass communication school.',
  'loves writing, storytelling, or media, wants to work in journalism, PR, content, or advertising',
  ARRAY['English Hons BA (more literary)', 'Film / Media Production (FTII)', 'BA Psychology + UX research'],
  ARRAY['MA Journalism (IIMC/ACJ)', 'MBA Marketing (MICA → Brand/Advertising)', 'MA Digital Media (Abroad)', 'FTII Advanced Diploma'],
  true,
  4
FROM streams WHERE slug = 'arts'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO salary_ranges (course_id, label, range_text, sort_order)
SELECT c.id, v.label, v.range_text, v.sort_order
FROM courses c
CROSS JOIN (VALUES
  ('Fresher', '₹3–5 LPA', 1),
  ('Junior / 1–3 yrs', '₹8–15 LPA', 2),
  ('Mid / 3–7 yrs', '₹15–25 LPA', 3)
) AS v(label, range_text, sort_order)
WHERE c.slug = 'arts-journalism-mass-communication'
ON CONFLICT (course_id, sort_order) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'Print / TV / Digital Journalism', '₹3–18 LPA', 1
FROM courses WHERE slug = 'arts-journalism-mass-communication'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Reporter / News Anchor', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-journalism-mass-communication'
  AND sp.name = 'Print / TV / Digital Journalism'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Content Creator', 2
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-journalism-mass-communication'
  AND sp.name = 'Print / TV / Digital Journalism'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Investigative Journalist', 3
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-journalism-mass-communication'
  AND sp.name = 'Print / TV / Digital Journalism'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Digital Media Editor', 4
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-journalism-mass-communication'
  AND sp.name = 'Print / TV / Digital Journalism'
ON CONFLICT (specialization_id, name) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'Public Relations (PR)', '₹4–20 LPA', 2
FROM courses WHERE slug = 'arts-journalism-mass-communication'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'PR Manager', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-journalism-mass-communication'
  AND sp.name = 'Public Relations (PR)'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Corporate Communications Head', 2
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-journalism-mass-communication'
  AND sp.name = 'Public Relations (PR)'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Celebrity PR', 3
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-journalism-mass-communication'
  AND sp.name = 'Public Relations (PR)'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Brand Spokesperson', 4
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-journalism-mass-communication'
  AND sp.name = 'Public Relations (PR)'
ON CONFLICT (specialization_id, name) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'Advertising / Brand Comm', '₹4–25 LPA', 3
FROM courses WHERE slug = 'arts-journalism-mass-communication'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Copywriter', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-journalism-mass-communication'
  AND sp.name = 'Advertising / Brand Comm'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Creative Director (Ad Agency)', 2
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-journalism-mass-communication'
  AND sp.name = 'Advertising / Brand Comm'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Brand Strategist', 3
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-journalism-mass-communication'
  AND sp.name = 'Advertising / Brand Comm'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Content Marketing Head', 4
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-journalism-mass-communication'
  AND sp.name = 'Advertising / Brand Comm'
ON CONFLICT (specialization_id, name) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'Film / Documentary Making', '₹5–30 LPA', 4
FROM courses WHERE slug = 'arts-journalism-mass-communication'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Filmmaker', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-journalism-mass-communication'
  AND sp.name = 'Film / Documentary Making'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Screenwriter', 2
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-journalism-mass-communication'
  AND sp.name = 'Film / Documentary Making'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Documentary Director', 3
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-journalism-mass-communication'
  AND sp.name = 'Film / Documentary Making'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'OTT Content Producer', 4
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-journalism-mass-communication'
  AND sp.name = 'Film / Documentary Making'
ON CONFLICT (specialization_id, name) DO NOTHING;

INSERT INTO courses
  (slug, name, icon, stream_id, duration, salary_range, exam_text, colleges,
   description, fit_for, compare_with, pg_options, is_active, sort_order)
SELECT
  'arts-b-ed-b-el-ed-teaching',
  'B.Ed / B.El.Ed (Teaching)',
  '🏫',
  id,
  '2–4 years',
  '₹3 – 18 LPA',
  'State B.Ed CET / DU B.El.Ed Entrance / CUET',
  'DU · TISS · RIE (NCERT) · Jamia Millia · State DIETs · Amity',
  'Teacher training degree. CTET/State TET required for govt school jobs. DU''s B.El.Ed is a prestigious 4-year integrated programme.',
  'loves teaching children, wants a stable govt teacher job, interested in education and child development',
  ARRAY['M.Ed (higher academic + principal track)', 'B.El.Ed DU (elementary specialist, 4-yr)', 'Child Psychology M.Sc (TISS)'],
  ARRAY['M.Ed (CUET PG) → Teacher Educator / Principal', 'MA Education (TISS)', 'PhD Education (UGC-NET)'],
  true,
  5
FROM streams WHERE slug = 'arts'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO salary_ranges (course_id, label, range_text, sort_order)
SELECT c.id, v.label, v.range_text, v.sort_order
FROM courses c
CROSS JOIN (VALUES
  ('Fresher', '₹3–5 LPA', 1),
  ('Junior / 1–3 yrs', '₹6–10 LPA', 2),
  ('Mid / 3–7 yrs', '₹10–18 LPA', 3)
) AS v(label, range_text, sort_order)
WHERE c.slug = 'arts-b-ed-b-el-ed-teaching'
ON CONFLICT (course_id, sort_order) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'B.Ed (Secondary Teacher Training)', '₹3–12 LPA', 1
FROM courses WHERE slug = 'arts-b-ed-b-el-ed-teaching'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Secondary / Sr Secondary Teacher', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-b-ed-b-el-ed-teaching'
  AND sp.name = 'B.Ed (Secondary Teacher Training)'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'CTET/State TET → Govt School Teacher', 2
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-b-ed-b-el-ed-teaching'
  AND sp.name = 'B.Ed (Secondary Teacher Training)'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'School Coordinator', 3
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-b-ed-b-el-ed-teaching'
  AND sp.name = 'B.Ed (Secondary Teacher Training)'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Vice Principal', 4
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-b-ed-b-el-ed-teaching'
  AND sp.name = 'B.Ed (Secondary Teacher Training)'
ON CONFLICT (specialization_id, name) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'B.El.Ed (Elementary Education — DU)', '₹3–10 LPA', 2
FROM courses WHERE slug = 'arts-b-ed-b-el-ed-teaching'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Primary Teacher', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-b-ed-b-el-ed-teaching'
  AND sp.name = 'B.El.Ed (Elementary Education — DU)'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Upper Primary Teacher', 2
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-b-ed-b-el-ed-teaching'
  AND sp.name = 'B.El.Ed (Elementary Education — DU)'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'School Administrator', 3
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-b-ed-b-el-ed-teaching'
  AND sp.name = 'B.El.Ed (Elementary Education — DU)'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Education Researcher', 4
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-b-ed-b-el-ed-teaching'
  AND sp.name = 'B.El.Ed (Elementary Education — DU)'
ON CONFLICT (specialization_id, name) DO NOTHING;

INSERT INTO courses
  (slug, name, icon, stream_id, duration, salary_range, exam_text, colleges,
   description, fit_for, compare_with, pg_options, is_active, sort_order)
SELECT
  'arts-special-education-rci',
  'Special Education (RCI)',
  '♿',
  id,
  '2–4 years',
  '₹2.5 – 40 LPA (₹15–40 LPA abroad)',
  'RCI Recognized Institutes / Merit / State CET',
  'NIEPID Secunderabad · NIEPVD Dehradun · AYJNISHD Mumbai · AIISH Mysore · NIMH Hyderabad',
  'Regulated by Rehabilitation Council of India (RCI). High demand in schools, hospitals, NGOs, and internationally — UK SENCO, UAE, Australia, Canada.',
  'passionate about inclusion and working with children with disabilities, patient, empathetic, service-oriented',
  ARRAY['B.Ed regular (general teaching)', 'Occupational Therapy BOT (clinical rehab)', 'Social Work MA TISS (community focus)'],
  ARRAY['M.Ed Special Education (2 yrs)', 'M.Sc Audiology / SLP (AIISH/AYJNISHD)', 'MA Disability Studies', 'PhD Rehabilitation Science (UGC-NET)'],
  true,
  6
FROM streams WHERE slug = 'arts'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO salary_ranges (course_id, label, range_text, sort_order)
SELECT c.id, v.label, v.range_text, v.sort_order
FROM courses c
CROSS JOIN (VALUES
  ('Fresher', '₹2.5–5 LPA', 1),
  ('Junior / 1–3 yrs', '₹7–15 LPA', 2),
  ('Mid / 3–7 yrs', '₹20–40 LPA abroad', 3)
) AS v(label, range_text, sort_order)
WHERE c.slug = 'arts-special-education-rci'
ON CONFLICT (course_id, sort_order) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'D.Ed Spl. Ed — Visual Impairment', '₹2.5–7 LPA', 1
FROM courses WHERE slug = 'arts-special-education-rci'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Special Educator (VI)', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-special-education-rci'
  AND sp.name = 'D.Ed Spl. Ed — Visual Impairment'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Braille Transcriptionist', 2
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-special-education-rci'
  AND sp.name = 'D.Ed Spl. Ed — Visual Impairment'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Orientation & Mobility Trainer', 3
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-special-education-rci'
  AND sp.name = 'D.Ed Spl. Ed — Visual Impairment'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Resource Teacher', 4
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-special-education-rci'
  AND sp.name = 'D.Ed Spl. Ed — Visual Impairment'
ON CONFLICT (specialization_id, name) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'D.Ed Spl. Ed — Hearing Impairment', '₹2.5–7 LPA', 2
FROM courses WHERE slug = 'arts-special-education-rci'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Special Educator (HI)', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-special-education-rci'
  AND sp.name = 'D.Ed Spl. Ed — Hearing Impairment'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Sign Language Interpreter (ISL)', 2
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-special-education-rci'
  AND sp.name = 'D.Ed Spl. Ed — Hearing Impairment'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Auditory Verbal Therapist', 3
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-special-education-rci'
  AND sp.name = 'D.Ed Spl. Ed — Hearing Impairment'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Resource Teacher (HI)', 4
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-special-education-rci'
  AND sp.name = 'D.Ed Spl. Ed — Hearing Impairment'
ON CONFLICT (specialization_id, name) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'D.Ed Spl. Ed — Intellectual Disability', '₹2.5–7 LPA', 3
FROM courses WHERE slug = 'arts-special-education-rci'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Special Educator (ID)', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-special-education-rci'
  AND sp.name = 'D.Ed Spl. Ed — Intellectual Disability'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Life Skills Trainer', 2
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-special-education-rci'
  AND sp.name = 'D.Ed Spl. Ed — Intellectual Disability'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Vocational Trainer (PWD)', 3
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-special-education-rci'
  AND sp.name = 'D.Ed Spl. Ed — Intellectual Disability'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Day Care Coordinator', 4
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-special-education-rci'
  AND sp.name = 'D.Ed Spl. Ed — Intellectual Disability'
ON CONFLICT (specialization_id, name) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'D.Ed Spl. Ed — Learning Disability', '₹3–8 LPA', 4
FROM courses WHERE slug = 'arts-special-education-rci'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Dyslexia Therapist', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-special-education-rci'
  AND sp.name = 'D.Ed Spl. Ed — Learning Disability'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Remedial Teacher', 2
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-special-education-rci'
  AND sp.name = 'D.Ed Spl. Ed — Learning Disability'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'School Resource Teacher', 3
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-special-education-rci'
  AND sp.name = 'D.Ed Spl. Ed — Learning Disability'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Learning Support Specialist', 4
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-special-education-rci'
  AND sp.name = 'D.Ed Spl. Ed — Learning Disability'
ON CONFLICT (specialization_id, name) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'D.Ed Spl. Ed — Autism (ASD)', '₹3–10 LPA', 5
FROM courses WHERE slug = 'arts-special-education-rci'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'ABA Therapist', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-special-education-rci'
  AND sp.name = 'D.Ed Spl. Ed — Autism (ASD)'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Shadow Teacher', 2
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-special-education-rci'
  AND sp.name = 'D.Ed Spl. Ed — Autism (ASD)'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Inclusion Facilitator', 3
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-special-education-rci'
  AND sp.name = 'D.Ed Spl. Ed — Autism (ASD)'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Early Intervention Specialist', 4
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-special-education-rci'
  AND sp.name = 'D.Ed Spl. Ed — Autism (ASD)'
ON CONFLICT (specialization_id, name) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'B.Ed Special Education', '₹3–15 LPA', 6
FROM courses WHERE slug = 'arts-special-education-rci'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Special Educator (All Areas)', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-special-education-rci'
  AND sp.name = 'B.Ed Special Education'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'M.Ed Spl. Ed → Teacher Educator', 2
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-special-education-rci'
  AND sp.name = 'B.Ed Special Education'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Govt Institute Faculty', 3
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-special-education-rci'
  AND sp.name = 'B.Ed Special Education'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'SENCO Abroad (UK/UAE)', 4
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-special-education-rci'
  AND sp.name = 'B.Ed Special Education'
ON CONFLICT (specialization_id, name) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'BASLP — Audiology & Speech (4 yrs)', '₹3–15 LPA', 7
FROM courses WHERE slug = 'arts-special-education-rci'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Clinical Audiologist', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-special-education-rci'
  AND sp.name = 'BASLP — Audiology & Speech (4 yrs)'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Speech-Language Pathologist', 2
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-special-education-rci'
  AND sp.name = 'BASLP — Audiology & Speech (4 yrs)'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Cochlear Implant Specialist', 3
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-special-education-rci'
  AND sp.name = 'BASLP — Audiology & Speech (4 yrs)'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Hospital SLP', 4
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-special-education-rci'
  AND sp.name = 'BASLP — Audiology & Speech (4 yrs)'
ON CONFLICT (specialization_id, name) DO NOTHING;

INSERT INTO courses
  (slug, name, icon, stream_id, duration, salary_range, exam_text, colleges,
   description, fit_for, compare_with, pg_options, is_active, sort_order)
SELECT
  'arts-ba-music-performing-arts',
  'BA Music / Performing Arts',
  '🎵',
  id,
  '3–4 years',
  '₹3 – 20 LPA',
  'Audition / Merit / BHU Entrance / FTII',
  'Gandharva Mahavidyalaya · BHU · Rabindra Bharati · FTII Pune · Sangeet Natak Akademi',
  'Classical music, dance, theatre, and film arts. FTII Pune is Asia''s most prestigious film school. Niche but deeply rewarding career.',
  'deeply committed to a creative or artistic career, has trained in classical music, dance, theatre, or film',
  ARRAY['Fine Arts / NID (visual design path)', 'Mass Communication BMM (media career)', 'Film School FTII (cinema focus)'],
  ARRAY['MA Performing Arts', 'MFA (Film/Theatre)', 'FTII Advanced Diploma', 'MA Music Abroad (Royal Academy London)'],
  true,
  7
FROM streams WHERE slug = 'arts'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO salary_ranges (course_id, label, range_text, sort_order)
SELECT c.id, v.label, v.range_text, v.sort_order
FROM courses c
CROSS JOIN (VALUES
  ('Fresher', '₹3–5 LPA', 1),
  ('Junior / 1–3 yrs', '₹6–12 LPA', 2),
  ('Mid / 3–7 yrs', '₹12–20 LPA', 3)
) AS v(label, range_text, sort_order)
WHERE c.slug = 'arts-ba-music-performing-arts'
ON CONFLICT (course_id, sort_order) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'BA Music (Classical / Carnatic / Hindustani)', '₹3–20 LPA', 1
FROM courses WHERE slug = 'arts-ba-music-performing-arts'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Performing Artist', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-ba-music-performing-arts'
  AND sp.name = 'BA Music (Classical / Carnatic / Hindustani)'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Music Teacher / Faculty', 2
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-ba-music-performing-arts'
  AND sp.name = 'BA Music (Classical / Carnatic / Hindustani)'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Playback Musician', 3
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-ba-music-performing-arts'
  AND sp.name = 'BA Music (Classical / Carnatic / Hindustani)'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'YouTube Music Educator', 4
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-ba-music-performing-arts'
  AND sp.name = 'BA Music (Classical / Carnatic / Hindustani)'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'AIR / Doordarshan Artist', 5
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-ba-music-performing-arts'
  AND sp.name = 'BA Music (Classical / Carnatic / Hindustani)'
ON CONFLICT (specialization_id, name) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'BA Dance / Theatre', '₹3–15 LPA', 2
FROM courses WHERE slug = 'arts-ba-music-performing-arts'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Choreographer', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-ba-music-performing-arts'
  AND sp.name = 'BA Dance / Theatre'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Theatre Director', 2
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-ba-music-performing-arts'
  AND sp.name = 'BA Dance / Theatre'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Actor', 3
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-ba-music-performing-arts'
  AND sp.name = 'BA Dance / Theatre'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Dance Trainer', 4
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-ba-music-performing-arts'
  AND sp.name = 'BA Dance / Theatre'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Artistic Director', 5
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-ba-music-performing-arts'
  AND sp.name = 'BA Dance / Theatre'
ON CONFLICT (specialization_id, name) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'Film / Media (FTII Pune)', '₹5–50+ LPA', 3
FROM courses WHERE slug = 'arts-ba-music-performing-arts'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Film Director', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-ba-music-performing-arts'
  AND sp.name = 'Film / Media (FTII Pune)'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Cinematographer', 2
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-ba-music-performing-arts'
  AND sp.name = 'Film / Media (FTII Pune)'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Editor', 3
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-ba-music-performing-arts'
  AND sp.name = 'Film / Media (FTII Pune)'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Screenwriter', 4
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-ba-music-performing-arts'
  AND sp.name = 'Film / Media (FTII Pune)'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Documentary Filmmaker', 5
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-ba-music-performing-arts'
  AND sp.name = 'Film / Media (FTII Pune)'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'OTT Content Creator', 6
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'arts-ba-music-performing-arts'
  AND sp.name = 'Film / Media (FTII Pune)'
ON CONFLICT (specialization_id, name) DO NOTHING;

-- Stream: ITI / Vocational (10thth)

INSERT INTO courses
  (slug, name, icon, stream_id, duration, salary_range, exam_text, colleges,
   description, fit_for, compare_with, pg_options, is_active, sort_order)
SELECT
  'iti-electrician',
  'Electrician',
  '⚡',
  id,
  '2 years',
  '₹2 – 8 LPA (₹8–20 LPA abroad)',
  'ITI Entrance / NCVT / State Admission',
  'Government ITIs across India · PSU-run ITIs (ONGC, BHEL, Railways)',
  'One of the most in-demand trades. Work in factories, construction, railways, or go abroad to Middle East / Europe.',
  'good with hands and practical work, interested in electrical systems and wants a quick job',
  ARRAY['Polytechnic Electrical Diploma (more scope, 3 yrs)', 'Electronics ITI (related circuits trade)', 'B.Tech Electrical (degree path, Class 12)'],
  ARRAY['Polytechnic Lateral Entry (2nd yr)', 'Apprenticeship (NAPS)', 'NSDC Skill Upgradation', 'Abroad Work Permit (Gulf/Europe)'],
  true,
  1
FROM streams WHERE slug = 'iti'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO salary_ranges (course_id, label, range_text, sort_order)
SELECT c.id, v.label, v.range_text, v.sort_order
FROM courses c
CROSS JOIN (VALUES
  ('Fresher', '₹2–4 LPA', 1),
  ('Junior / 1–3 yrs', '₹4–7 LPA', 2),
  ('Mid / 3–7 yrs', '₹8–20 LPA abroad', 3)
) AS v(label, range_text, sort_order)
WHERE c.slug = 'iti-electrician'
ON CONFLICT (course_id, sort_order) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'Industrial Electrician', '₹3–10 LPA', 1
FROM courses WHERE slug = 'iti-electrician'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Factory Electrician', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'iti-electrician'
  AND sp.name = 'Industrial Electrician'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Power Plant Operator', 2
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'iti-electrician'
  AND sp.name = 'Industrial Electrician'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Railway Electrical Staff', 3
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'iti-electrician'
  AND sp.name = 'Industrial Electrician'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Plant Maintenance Technician', 4
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'iti-electrician'
  AND sp.name = 'Industrial Electrician'
ON CONFLICT (specialization_id, name) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'Domestic / Commercial Electrician', '₹2–8 LPA', 2
FROM courses WHERE slug = 'iti-electrician'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Own Electrical Contractor', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'iti-electrician'
  AND sp.name = 'Domestic / Commercial Electrician'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Housing Society Electrician', 2
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'iti-electrician'
  AND sp.name = 'Domestic / Commercial Electrician'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Commercial Building Electrician', 3
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'iti-electrician'
  AND sp.name = 'Domestic / Commercial Electrician'
ON CONFLICT (specialization_id, name) DO NOTHING;

INSERT INTO courses
  (slug, name, icon, stream_id, duration, salary_range, exam_text, colleges,
   description, fit_for, compare_with, pg_options, is_active, sort_order)
SELECT
  'iti-fitter-welder',
  'Fitter / Welder',
  '🔩',
  id,
  '1–2 years',
  '₹2 – 8 LPA (₹10–25 LPA abroad)',
  'ITI Entrance / NCVT',
  'Govt ITIs · PSU-run ITIs (SAIL, BHEL, TATA)',
  'Core manufacturing trades. Very high demand in defence, railways, TATA Steel, BHEL, L&T. Abroad placements in manufacturing and shipping.',
  'interested in manufacturing and heavy industry, good with hands, wants to work in PSU or go abroad',
  ARRAY['Polytechnic Mechanical Diploma (more scope)', 'Electrician ITI (related trade)', 'CNC/CAD operator courses'],
  ARRAY['Polytechnic Lateral Entry', 'Apprenticeship (BHEL/TATA/L&T)', 'Govt PSU Direct Recruitment'],
  true,
  2
FROM streams WHERE slug = 'iti'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO salary_ranges (course_id, label, range_text, sort_order)
SELECT c.id, v.label, v.range_text, v.sort_order
FROM courses c
CROSS JOIN (VALUES
  ('Fresher', '₹2–4 LPA', 1),
  ('Junior / 1–3 yrs', '₹4–8 LPA', 2),
  ('Mid / 3–7 yrs', '₹10–25 LPA abroad', 3)
) AS v(label, range_text, sort_order)
WHERE c.slug = 'iti-fitter-welder'
ON CONFLICT (course_id, sort_order) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'Fitter Trade', '₹2.5–10 LPA', 1
FROM courses WHERE slug = 'iti-fitter-welder'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Machine Fitter (PSU)', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'iti-fitter-welder'
  AND sp.name = 'Fitter Trade'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Maintenance Technician', 2
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'iti-fitter-welder'
  AND sp.name = 'Fitter Trade'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Railway Workshop Staff', 3
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'iti-fitter-welder'
  AND sp.name = 'Fitter Trade'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Defence Ordnance Fitter', 4
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'iti-fitter-welder'
  AND sp.name = 'Fitter Trade'
ON CONFLICT (specialization_id, name) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'Welder Trade', '₹2.5–12 LPA abroad', 2
FROM courses WHERE slug = 'iti-fitter-welder'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'MIG/TIG Welder', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'iti-fitter-welder'
  AND sp.name = 'Welder Trade'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Pipe Welder (Oil & Gas)', 2
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'iti-fitter-welder'
  AND sp.name = 'Welder Trade'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Shipyard Welder', 3
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'iti-fitter-welder'
  AND sp.name = 'Welder Trade'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Structural Welder Abroad', 4
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'iti-fitter-welder'
  AND sp.name = 'Welder Trade'
ON CONFLICT (specialization_id, name) DO NOTHING;

INSERT INTO courses
  (slug, name, icon, stream_id, duration, salary_range, exam_text, colleges,
   description, fit_for, compare_with, pg_options, is_active, sort_order)
SELECT
  'iti-copa-computer-operator',
  'COPA (Computer Operator)',
  '🖥️',
  id,
  '1 year',
  '₹1.5 – 6 LPA',
  'ITI Entrance / NCVT',
  'Govt ITIs',
  'Computer basics, data entry, DTP, Tally, MS Office. Entry point into office work, banks, and government data entry roles.',
  'comfortable with computers, wants a quick office job or government data entry role',
  ARRAY['BCA (full IT degree)', 'Polytechnic CS Diploma (more scope)', 'SSC CHSL exam (after 12th)'],
  ARRAY['Upgrade → BCA / Diploma CS', 'SSC CHSL / Banking Clerk Exams', 'NSDC Digital Literacy Cert'],
  true,
  3
FROM streams WHERE slug = 'iti'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO salary_ranges (course_id, label, range_text, sort_order)
SELECT c.id, v.label, v.range_text, v.sort_order
FROM courses c
CROSS JOIN (VALUES
  ('Fresher', '₹1.5–3 LPA', 1),
  ('Junior / 1–3 yrs', '₹3–5 LPA', 2),
  ('Mid / 3–7 yrs', '₹5–6 LPA', 3)
) AS v(label, range_text, sort_order)
WHERE c.slug = 'iti-copa-computer-operator'
ON CONFLICT (course_id, sort_order) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'Computer Operator & Programming', '₹1.5–6 LPA', 1
FROM courses WHERE slug = 'iti-copa-computer-operator'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Data Entry Operator', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'iti-copa-computer-operator'
  AND sp.name = 'Computer Operator & Programming'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Office Assistant', 2
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'iti-copa-computer-operator'
  AND sp.name = 'Computer Operator & Programming'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Bank Cashier Support', 3
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'iti-copa-computer-operator'
  AND sp.name = 'Computer Operator & Programming'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'BPO / KPO Entry Level', 4
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'iti-copa-computer-operator'
  AND sp.name = 'Computer Operator & Programming'
ON CONFLICT (specialization_id, name) DO NOTHING;

INSERT INTO courses
  (slug, name, icon, stream_id, duration, salary_range, exam_text, colleges,
   description, fit_for, compare_with, pg_options, is_active, sort_order)
SELECT
  'iti-mechanic-auto-diesel',
  'Mechanic (Auto / Diesel)',
  '🚗',
  id,
  '2 years',
  '₹2 – 10 LPA',
  'ITI Entrance / NCVT',
  'Govt ITIs · Automobile Company ITIs (Maruti, Hero, TATA, Ashok Leyland)',
  'Automobile and diesel engine repair. Maruti, Hero, TATA, Ashok Leyland run dedicated ITI programmes with near-guaranteed placement.',
  'passionate about vehicles and engines, wants to work in the automobile service sector',
  ARRAY['Polytechnic Automobile Engineering (more scope)', 'B.Tech Mechanical (engineering degree, Class 12)'],
  ARRAY['Polytechnic Automobile Eng Lateral', 'Apprenticeship (Maruti/Tata Motors)', 'Abroad Gulf — Vehicle Mechanic Visa'],
  true,
  4
FROM streams WHERE slug = 'iti'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO salary_ranges (course_id, label, range_text, sort_order)
SELECT c.id, v.label, v.range_text, v.sort_order
FROM courses c
CROSS JOIN (VALUES
  ('Fresher', '₹2–4 LPA', 1),
  ('Junior / 1–3 yrs', '₹4–7 LPA', 2),
  ('Mid / 3–7 yrs', '₹7–10 LPA', 3)
) AS v(label, range_text, sort_order)
WHERE c.slug = 'iti-mechanic-auto-diesel'
ON CONFLICT (course_id, sort_order) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'Motor Vehicle / Car Mechanic', '₹2.5–8 LPA', 1
FROM courses WHERE slug = 'iti-mechanic-auto-diesel'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Authorized Service Centre Technician', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'iti-mechanic-auto-diesel'
  AND sp.name = 'Motor Vehicle / Car Mechanic'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Own Auto Garage', 2
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'iti-mechanic-auto-diesel'
  AND sp.name = 'Motor Vehicle / Car Mechanic'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Fleet Maintenance Technician', 3
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'iti-mechanic-auto-diesel'
  AND sp.name = 'Motor Vehicle / Car Mechanic'
ON CONFLICT (specialization_id, name) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'Diesel Mechanic', '₹3–10 LPA', 2
FROM courses WHERE slug = 'iti-mechanic-auto-diesel'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Truck / Bus Mechanic', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'iti-mechanic-auto-diesel'
  AND sp.name = 'Diesel Mechanic'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Mining Equipment Technician', 2
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'iti-mechanic-auto-diesel'
  AND sp.name = 'Diesel Mechanic'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Generator Technician', 3
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'iti-mechanic-auto-diesel'
  AND sp.name = 'Diesel Mechanic'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Agricultural Machinery Mechanic', 4
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'iti-mechanic-auto-diesel'
  AND sp.name = 'Diesel Mechanic'
ON CONFLICT (specialization_id, name) DO NOTHING;

INSERT INTO courses
  (slug, name, icon, stream_id, duration, salary_range, exam_text, colleges,
   description, fit_for, compare_with, pg_options, is_active, sort_order)
SELECT
  'iti-plumber-carpenter-mason',
  'Plumber / Carpenter / Mason',
  '🪚',
  id,
  '1 year',
  '₹2 – 7 LPA (₹15–30 LPA abroad)',
  'ITI Entrance / NCVT',
  'Govt ITIs across India',
  'Civil construction trades. Extremely high demand in Middle East, UK, Canada under skilled worker visas.',
  'good with tools and construction work, wants to work abroad or start own contracting business',
  ARRAY['ITI Civil-related trades', 'Polytechnic Civil Diploma (more scope)', 'Construction Foreman (site experience)'],
  ARRAY['Apprenticeship (L&T/Shapoorji)', 'NSDC Construction Skill Cert', 'Gulf / UK Skilled Worker Visa'],
  true,
  5
FROM streams WHERE slug = 'iti'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO salary_ranges (course_id, label, range_text, sort_order)
SELECT c.id, v.label, v.range_text, v.sort_order
FROM courses c
CROSS JOIN (VALUES
  ('Fresher', '₹2–3 LPA', 1),
  ('Junior / 1–3 yrs', '₹4–7 LPA', 2),
  ('Mid / 3–7 yrs', '₹15–30 LPA abroad', 3)
) AS v(label, range_text, sort_order)
WHERE c.slug = 'iti-plumber-carpenter-mason'
ON CONFLICT (course_id, sort_order) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'Plumber', '₹2–15 LPA abroad', 1
FROM courses WHERE slug = 'iti-plumber-carpenter-mason'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Residential Plumber', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'iti-plumber-carpenter-mason'
  AND sp.name = 'Plumber'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Commercial Plumber', 2
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'iti-plumber-carpenter-mason'
  AND sp.name = 'Plumber'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Sanitation Engineer', 3
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'iti-plumber-carpenter-mason'
  AND sp.name = 'Plumber'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'UK/Gulf Skilled Worker', 4
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'iti-plumber-carpenter-mason'
  AND sp.name = 'Plumber'
ON CONFLICT (specialization_id, name) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'Carpenter / Furniture Maker', '₹2–12 LPA', 2
FROM courses WHERE slug = 'iti-plumber-carpenter-mason'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Furniture Craftsman', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'iti-plumber-carpenter-mason'
  AND sp.name = 'Carpenter / Furniture Maker'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Interior Fit-Out Carpenter', 2
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'iti-plumber-carpenter-mason'
  AND sp.name = 'Carpenter / Furniture Maker'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Own Carpentry Business', 3
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'iti-plumber-carpenter-mason'
  AND sp.name = 'Carpenter / Furniture Maker'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Abroad Carpenter', 4
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'iti-plumber-carpenter-mason'
  AND sp.name = 'Carpenter / Furniture Maker'
ON CONFLICT (specialization_id, name) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'Mason / Bricklayer', '₹2–10 LPA', 3
FROM courses WHERE slug = 'iti-plumber-carpenter-mason'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Construction Mason', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'iti-plumber-carpenter-mason'
  AND sp.name = 'Mason / Bricklayer'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Tile Setter', 2
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'iti-plumber-carpenter-mason'
  AND sp.name = 'Mason / Bricklayer'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Plastering Specialist', 3
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'iti-plumber-carpenter-mason'
  AND sp.name = 'Mason / Bricklayer'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Gulf Construction Worker', 4
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'iti-plumber-carpenter-mason'
  AND sp.name = 'Mason / Bricklayer'
ON CONFLICT (specialization_id, name) DO NOTHING;

INSERT INTO courses
  (slug, name, icon, stream_id, duration, salary_range, exam_text, colleges,
   description, fit_for, compare_with, pg_options, is_active, sort_order)
SELECT
  'iti-electronics-instrument-mechanic',
  'Electronics / Instrument Mechanic',
  '📡',
  id,
  '2 years',
  '₹2.5 – 8 LPA',
  'ITI Entrance / NCVT',
  'Govt ITIs across India',
  'Electronic circuit repair, instrumentation, industrial automation basics. Gateway to electronics manufacturing jobs.',
  'interested in circuits, electronics repair, or industrial automation',
  ARRAY['Polytechnic ECE Diploma (more scope)', 'Electrician ITI (related electrical trade)', 'B.Tech Electronics (engineering degree)'],
  ARRAY['Polytechnic Electronics Lateral', 'Apprenticeship (BHEL/ONGC/Refinery)', 'NSDC Automation Certification'],
  true,
  6
FROM streams WHERE slug = 'iti'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO salary_ranges (course_id, label, range_text, sort_order)
SELECT c.id, v.label, v.range_text, v.sort_order
FROM courses c
CROSS JOIN (VALUES
  ('Fresher', '₹2.5–4 LPA', 1),
  ('Junior / 1–3 yrs', '₹4–6 LPA', 2),
  ('Mid / 3–7 yrs', '₹6–10 LPA', 3)
) AS v(label, range_text, sort_order)
WHERE c.slug = 'iti-electronics-instrument-mechanic'
ON CONFLICT (course_id, sort_order) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'Electronics Mechanic', '₹2.5–8 LPA', 1
FROM courses WHERE slug = 'iti-electronics-instrument-mechanic'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Electronics Technician', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'iti-electronics-instrument-mechanic'
  AND sp.name = 'Electronics Mechanic'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'TV/AC Repair Technician', 2
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'iti-electronics-instrument-mechanic'
  AND sp.name = 'Electronics Mechanic'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Consumer Electronics Service Engineer', 3
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'iti-electronics-instrument-mechanic'
  AND sp.name = 'Electronics Mechanic'
ON CONFLICT (specialization_id, name) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'Instrument Mechanic', '₹3–10 LPA', 2
FROM courses WHERE slug = 'iti-electronics-instrument-mechanic'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Instrumentation Technician (Refinery/Plant)', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'iti-electronics-instrument-mechanic'
  AND sp.name = 'Instrument Mechanic'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Process Control Technician', 2
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'iti-electronics-instrument-mechanic'
  AND sp.name = 'Instrument Mechanic'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'SCADA/DCS Operator', 3
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'iti-electronics-instrument-mechanic'
  AND sp.name = 'Instrument Mechanic'
ON CONFLICT (specialization_id, name) DO NOTHING;

-- Stream: Polytechnic (10thth)

INSERT INTO courses
  (slug, name, icon, stream_id, duration, salary_range, exam_text, colleges,
   description, fit_for, compare_with, pg_options, is_active, sort_order)
SELECT
  'poly-diploma-engineering',
  'Diploma Engineering',
  '🏗️',
  id,
  '3 years',
  '₹2.5 – 10 LPA',
  'State Polytechnic CET / JEECUP / MSBTE / DET',
  'Government Polytechnics · Private Polytechnics across all states',
  '3-year diploma that gives Junior Engineer skills. Key advantage: Lateral Entry directly into 2nd year of B.Tech — skip 1st year.',
  'wants engineering skills quickly, plans B.Tech lateral entry later, or wants a JE government job',
  ARRAY['B.Tech full 4-yr (Class 12 JEE)', 'ITI trades (shorter, more vocational)', 'SSC JE exam after diploma'],
  ARRAY['B.Tech Lateral Entry (2nd year) via LEET/State Lateral Exam', 'Govt JE Exams (SSC JE, RRB JE, State PWD JE)', 'AMIE (Associate Member of Institution of Engineers)'],
  true,
  1
FROM streams WHERE slug = 'poly'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO salary_ranges (course_id, label, range_text, sort_order)
SELECT c.id, v.label, v.range_text, v.sort_order
FROM courses c
CROSS JOIN (VALUES
  ('Fresher', '₹2.5–4 LPA', 1),
  ('Junior / 1–3 yrs', '₹4–7 LPA', 2),
  ('Mid / 3–7 yrs', '₹7–10 LPA', 3)
) AS v(label, range_text, sort_order)
WHERE c.slug = 'poly-diploma-engineering'
ON CONFLICT (course_id, sort_order) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'Civil Engineering Diploma', '₹2.5–8 LPA', 1
FROM courses WHERE slug = 'poly-diploma-engineering'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Site Supervisor / Junior Engineer', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'poly-diploma-engineering'
  AND sp.name = 'Civil Engineering Diploma'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'PWD/NHAI/CPWD Sub-Engineer', 2
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'poly-diploma-engineering'
  AND sp.name = 'Civil Engineering Diploma'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Quantity Surveyor', 3
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'poly-diploma-engineering'
  AND sp.name = 'Civil Engineering Diploma'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Construction Foreman', 4
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'poly-diploma-engineering'
  AND sp.name = 'Civil Engineering Diploma'
ON CONFLICT (specialization_id, name) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'Mechanical Engineering Diploma', '₹2.5–8 LPA', 2
FROM courses WHERE slug = 'poly-diploma-engineering'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Production Supervisor', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'poly-diploma-engineering'
  AND sp.name = 'Mechanical Engineering Diploma'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Maintenance Engineer', 2
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'poly-diploma-engineering'
  AND sp.name = 'Mechanical Engineering Diploma'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'CAD Operator', 3
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'poly-diploma-engineering'
  AND sp.name = 'Mechanical Engineering Diploma'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'ITI Instructor', 4
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'poly-diploma-engineering'
  AND sp.name = 'Mechanical Engineering Diploma'
ON CONFLICT (specialization_id, name) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'Electrical Engineering Diploma', '₹2.5–10 LPA', 3
FROM courses WHERE slug = 'poly-diploma-engineering'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Electrical Contractor', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'poly-diploma-engineering'
  AND sp.name = 'Electrical Engineering Diploma'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Power Plant Operator', 2
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'poly-diploma-engineering'
  AND sp.name = 'Electrical Engineering Diploma'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Electrical Supervisor', 3
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'poly-diploma-engineering'
  AND sp.name = 'Electrical Engineering Diploma'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'UPPCL/MSEDCL JE', 4
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'poly-diploma-engineering'
  AND sp.name = 'Electrical Engineering Diploma'
ON CONFLICT (specialization_id, name) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'Computer Science / IT Diploma', '₹2.5–8 LPA', 4
FROM courses WHERE slug = 'poly-diploma-engineering'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Junior Software Developer', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'poly-diploma-engineering'
  AND sp.name = 'Computer Science / IT Diploma'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'IT Support Engineer', 2
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'poly-diploma-engineering'
  AND sp.name = 'Computer Science / IT Diploma'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Web Developer', 3
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'poly-diploma-engineering'
  AND sp.name = 'Computer Science / IT Diploma'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Govt Computer Operator', 4
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'poly-diploma-engineering'
  AND sp.name = 'Computer Science / IT Diploma'
ON CONFLICT (specialization_id, name) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'Electronics & Communication Diploma', '₹2.5–8 LPA', 5
FROM courses WHERE slug = 'poly-diploma-engineering'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Telecom Technician', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'poly-diploma-engineering'
  AND sp.name = 'Electronics & Communication Diploma'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'PCB Design Operator', 2
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'poly-diploma-engineering'
  AND sp.name = 'Electronics & Communication Diploma'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Electronics Supervisor', 3
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'poly-diploma-engineering'
  AND sp.name = 'Electronics & Communication Diploma'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'BSNL/MTNL Technician', 4
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'poly-diploma-engineering'
  AND sp.name = 'Electronics & Communication Diploma'
ON CONFLICT (specialization_id, name) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'Automobile Engineering Diploma', '₹2.5–8 LPA', 6
FROM courses WHERE slug = 'poly-diploma-engineering'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Automobile Service Advisor', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'poly-diploma-engineering'
  AND sp.name = 'Automobile Engineering Diploma'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Workshop Supervisor', 2
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'poly-diploma-engineering'
  AND sp.name = 'Automobile Engineering Diploma'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Maruti/TATA Service Technician', 3
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'poly-diploma-engineering'
  AND sp.name = 'Automobile Engineering Diploma'
ON CONFLICT (specialization_id, name) DO NOTHING;

-- Stream: Defence / NDA (12thth)

INSERT INTO courses
  (slug, name, icon, stream_id, duration, salary_range, exam_text, colleges,
   description, fit_for, compare_with, pg_options, is_active, sort_order)
SELECT
  'defence-nda-national-defence-academy',
  'NDA (National Defence Academy)',
  '⭐',
  id,
  '3 years NDA + 1 yr pre-commission training',
  '₹6 – 18 LPA + allowances + perks',
  'UPSC NDA Exam (twice yearly) + SSB Interview',
  'NDA Pune · INA Ezhimala · AFA Hyderabad · OTA Chennai',
  'After Class 12 (appearing candidates eligible). Most prestigious route to become a commissioned officer in Army, Navy, or Air Force.',
  'physically fit and disciplined, inspired by armed forces life, willing to serve the nation with pride',
  ARRAY['CDS/AFCAT (after graduation route)', 'CAPF (paramilitary assistant commandant)', 'Merchant Navy (maritime alternative)'],
  ARRAY['Staff College (After 10+ yrs service)', 'Deputation to UN Peacekeeping', 'Defence Management (MDU/IIM)', 'Post-retirement: PSU CMD / CISF / Consulting'],
  true,
  1
FROM streams WHERE slug = 'defence'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO salary_ranges (course_id, label, range_text, sort_order)
SELECT c.id, v.label, v.range_text, v.sort_order
FROM courses c
CROSS JOIN (VALUES
  ('Fresher', '₹6–9 LPA + perks', 1),
  ('Junior / 1–3 yrs', '₹10–14 LPA + perks', 2),
  ('Mid / 3–7 yrs', '₹15–18 LPA + perks', 3)
) AS v(label, range_text, sort_order)
WHERE c.slug = 'defence-nda-national-defence-academy'
ON CONFLICT (course_id, sort_order) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'Army Wing (NDA)', '₹7–18 LPA + perks', 1
FROM courses WHERE slug = 'defence-nda-national-defence-academy'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Infantry Officer', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'defence-nda-national-defence-academy'
  AND sp.name = 'Army Wing (NDA)'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Armoured Corps Officer', 2
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'defence-nda-national-defence-academy'
  AND sp.name = 'Army Wing (NDA)'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Artillery Officer', 3
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'defence-nda-national-defence-academy'
  AND sp.name = 'Army Wing (NDA)'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Army Service Corps', 4
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'defence-nda-national-defence-academy'
  AND sp.name = 'Army Wing (NDA)'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'EME Officer', 5
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'defence-nda-national-defence-academy'
  AND sp.name = 'Army Wing (NDA)'
ON CONFLICT (specialization_id, name) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'Naval Wing (NDA → INA)', '₹7–18 LPA + perks', 2
FROM courses WHERE slug = 'defence-nda-national-defence-academy'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Naval Officer', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'defence-nda-national-defence-academy'
  AND sp.name = 'Naval Wing (NDA → INA)'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Submarine Officer', 2
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'defence-nda-national-defence-academy'
  AND sp.name = 'Naval Wing (NDA → INA)'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Naval Aviator', 3
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'defence-nda-national-defence-academy'
  AND sp.name = 'Naval Wing (NDA → INA)'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Marine Commando (MARCOS)', 4
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'defence-nda-national-defence-academy'
  AND sp.name = 'Naval Wing (NDA → INA)'
ON CONFLICT (specialization_id, name) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'Air Force Wing (NDA → AFA)', '₹8–20 LPA + perks', 3
FROM courses WHERE slug = 'defence-nda-national-defence-academy'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Fighter Pilot', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'defence-nda-national-defence-academy'
  AND sp.name = 'Air Force Wing (NDA → AFA)'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Transport Pilot', 2
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'defence-nda-national-defence-academy'
  AND sp.name = 'Air Force Wing (NDA → AFA)'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Helicopter Pilot', 3
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'defence-nda-national-defence-academy'
  AND sp.name = 'Air Force Wing (NDA → AFA)'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'ATC Officer', 4
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'defence-nda-national-defence-academy'
  AND sp.name = 'Air Force Wing (NDA → AFA)'
ON CONFLICT (specialization_id, name) DO NOTHING;

INSERT INTO courses
  (slug, name, icon, stream_id, duration, salary_range, exam_text, colleges,
   description, fit_for, compare_with, pg_options, is_active, sort_order)
SELECT
  'defence-cds-afcat-tes',
  'CDS / AFCAT / TES',
  '🎗️',
  id,
  '1 year training after joining',
  '₹6 – 18 LPA + allowances',
  'UPSC CDS / AFCAT / TES (B.Tech Entry) + SSB',
  'OTA Chennai · IMA Dehradun · INA Ezhimala · AFA Hyderabad',
  'After graduation. CDS covers all 3 services. TES for B.Tech holders (direct Army). AFCAT for Air Force ground duty and flying.',
  'graduate who wants to join armed forces as an officer, disciplined, motivated, and physically fit',
  ARRAY['NDA (if still in Class 12)', 'CAPF AC (paramilitary — BSF/CRPF/CISF)', 'SSB coaching after any graduation'],
  ARRAY['Staff College / War College', 'MBA / MPhil Defence Management', 'UN Peacekeeping Missions', 'Post-retirement → PSU / Consulting / Politics'],
  true,
  2
FROM streams WHERE slug = 'defence'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO salary_ranges (course_id, label, range_text, sort_order)
SELECT c.id, v.label, v.range_text, v.sort_order
FROM courses c
CROSS JOIN (VALUES
  ('Fresher', '₹6–9 LPA + perks', 1),
  ('Junior / 1–3 yrs', '₹10–14 LPA + perks', 2),
  ('Mid / 3–7 yrs', '₹15–18 LPA + perks', 3)
) AS v(label, range_text, sort_order)
WHERE c.slug = 'defence-cds-afcat-tes'
ON CONFLICT (course_id, sort_order) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'CDS — Combined Defence Services', '₹7–18 LPA', 1
FROM courses WHERE slug = 'defence-cds-afcat-tes'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Army / Navy / Air Force Officer (All branches)', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'defence-cds-afcat-tes'
  AND sp.name = 'CDS — Combined Defence Services'
ON CONFLICT (specialization_id, name) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'TES — Technical Entry Scheme (B.Tech)', '₹7–18 LPA', 2
FROM courses WHERE slug = 'defence-cds-afcat-tes'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Army Technical Officer (EME / Corps of Engineers / Signals)', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'defence-cds-afcat-tes'
  AND sp.name = 'TES — Technical Entry Scheme (B.Tech)'
ON CONFLICT (specialization_id, name) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'AFCAT — Air Force', '₹8–20 LPA', 3
FROM courses WHERE slug = 'defence-cds-afcat-tes'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Flying Branch Officer', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'defence-cds-afcat-tes'
  AND sp.name = 'AFCAT — Air Force'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Technical Branch Officer', 2
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'defence-cds-afcat-tes'
  AND sp.name = 'AFCAT — Air Force'
ON CONFLICT (specialization_id, name) DO NOTHING;
INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'Ground Duty (Admin/Logistics/Education)', 3
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'defence-cds-afcat-tes'
  AND sp.name = 'AFCAT — Air Force'
ON CONFLICT (specialization_id, name) DO NOTHING;

INSERT INTO specializations (course_id, name, salary_range, sort_order)
SELECT id, 'CAPF AC — Paramilitary', '₹6–12 LPA', 4
FROM courses WHERE slug = 'defence-cds-afcat-tes'
ON CONFLICT (course_id, name) DO NOTHING;

INSERT INTO career_roles (specialization_id, name, sort_order)
SELECT sp.id, 'BSF / CRPF / CISF / ITBP / SSB Assistant Commandant', 1
FROM specializations sp
JOIN courses c ON c.id = sp.course_id
WHERE c.slug = 'defence-cds-afcat-tes'
  AND sp.name = 'CAPF AC — Paramilitary'
ON CONFLICT (specialization_id, name) DO NOTHING;

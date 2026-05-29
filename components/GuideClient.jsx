'use client';
import { useState } from 'react';
import Link from 'next/link';

const INTERESTS = [
  { icon: '💻', label: 'I like computers', key: 'computer', desc: 'Coding, apps, tech, data, internet' },
  { icon: '🏥', label: 'I like health / biology', key: 'doctor', desc: 'Medicine, body, hospitals, wellness' },
  { icon: '💰', label: 'I like money / business', key: 'money', desc: 'Finance, trade, marketing, startups' },
  { icon: '🎨', label: 'I like drawing / creative work', key: 'drawing', desc: 'Design, art, fashion, architecture' },
  { icon: '🏫', label: 'I like teaching / helping', key: 'teacher', desc: 'Education, children, mentoring' },
  { icon: '🎖️', label: 'I want defence / government service', key: 'army', desc: 'Army, Navy, Air Force, CAPF' },
  { icon: '⚖️', label: 'I like debate / justice', key: 'law', desc: 'Law, rights, courts, policy' },
];

const QUIZ = [
  { id: 'q1', q: 'What do you enjoy most in school?', opts: ['Math & Logic', 'Biology & Health', 'Business & Money', 'Art & Creativity', 'Writing & Debate', 'Physical activity / Leadership'] },
  { id: 'q2', q: 'What study style feels natural to you?', opts: ['Building & coding', 'Lab & research', 'Business & analysis', 'Creative & portfolio', 'Reading & writing', 'Physical & outdoor'] },
  { id: 'q3', q: 'How do you feel about competitive entrance exams?', opts: ['I can prepare seriously (JEE/NEET level)', 'Moderate preparation is fine', 'I prefer merit / easier entry', 'I want to skip entrance exams entirely'] },
  { id: 'q4', q: 'What is your main goal after studying?', opts: ['Tech job or startup', 'Government / stable job', 'Hospital / clinical work', 'Creative / freelance career', 'Higher studies / research', 'Business / own work'] },
  { id: 'q5', q: 'How long are you comfortable studying full-time?', opts: ['1–2 years (ITI / diploma)', '3 years (BCA / B.Sc / B.Com)', '4 years (B.Tech / BBA)', '5+ years (MBBS / Architecture / Law)', 'Long-term is fine if career is strong'] },
];

const RECS = {
  computer: [
    { path: 'BCA / B.Sc Computer Science', why: 'Best for students who like tech but want a flexible, moderate-effort entry.', badge: 'Easy–moderate entry · 3 years', href: '/stream/science' },
    { path: 'B.Tech Computer Science / CSE', why: 'Strongest engineering degree for top tech placements. Needs JEE preparation.', badge: 'Competitive (JEE) · 4 years', href: '/stream/science' },
    { path: 'Polytechnic Computer Science', why: 'Practical diploma route after Class 10. Lateral B.Tech entry possible.', badge: 'Diploma · Job-ready route', href: '/stream/vocational' },
  ],
  doctor: [
    { path: 'MBBS / BDS / BAMS', why: 'Main doctor route. NEET-UG required. Government seats are nearly free.', badge: 'NEET-UG required · 5.5 years', href: '/stream/science' },
    { path: 'B.Sc Life Sciences / Biotechnology', why: 'Biology-based degree for research, pharma and MSc. Good without NEET.', badge: 'Merit / CUET · 3 years', href: '/stream/science' },
    { path: 'Allied Health Sciences (B.Pharm, BPT, Nursing)', why: 'Healthcare careers without MBBS. Strong abroad salary too.', badge: 'State entrance / merit', href: '/stream/science' },
  ],
  money: [
    { path: 'B.Com / B.Com Hons + CA / CMA track', why: 'Best for deep finance, accounts, tax and professional qualifications.', badge: 'Merit / CUET · 3 years', href: '/stream/commerce' },
    { path: 'BBA / BMS', why: 'Management, marketing and business skills. Good for MBA + corporate roles.', badge: 'College entrance · 3 years', href: '/stream/commerce' },
    { path: 'Economics Hons / PPE', why: 'Policy, data, markets and civil services track.', badge: 'CUET · 3 years', href: '/stream/commerce' },
  ],
  drawing: [
    { path: 'B.Des / Fine Arts / NID / NIFT', why: 'Top design colleges. Covers UX, graphic, fashion, animation and more.', badge: 'Portfolio / design test', href: '/stream/arts' },
    { path: 'B.Arch (Architecture)', why: 'Buildings, spaces and urban design. 5-year professional degree.', badge: 'NATA required · 5 years', href: '/stream/science' },
    { path: 'BFA / Performing Arts / Media', why: 'For students who want film, music, theatre or creative content.', badge: 'Audition / portfolio', href: '/stream/arts' },
  ],
  teacher: [
    { path: 'BA/B.Sc/B.Com B.Ed Integrated', why: 'Best if you are sure about teaching after Class 12. Saves 1 year.', badge: 'NCET / college entrance · 4 years', href: '/stream/arts' },
    { path: 'B.Ed after graduation', why: 'Flexible: choose your subject first, then add teaching qualification.', badge: '2 years after degree', href: '/stream/arts' },
    { path: 'Special Education / BASLP', why: 'For students passionate about supporting children with disabilities.', badge: 'RCI-regulated paths', href: '/stream/arts' },
  ],
  army: [
    { path: 'NDA (Army / Navy / Air Force)', why: 'Officer route starting after Class 12. UPSC NDA + SSB selection.', badge: 'UPSC NDA · 3 years training', href: '/stream/defence' },
    { path: 'CDS / AFCAT (after graduation)', why: 'Defence officer routes open after any graduation.', badge: 'CDS / AFCAT exam', href: '/stream/defence' },
    { path: 'CAPF (BSF / CRPF / CISF)', why: 'Paramilitary officer roles. Good for uniformed public service.', badge: 'UPSC CAPF exam', href: '/stream/defence' },
  ],
  law: [
    { path: 'BA LLB / BBA LLB (5-year integrated)', why: 'Best route to become a lawyer starting right after Class 12.', badge: 'CLAT / AILET · 5 years', href: '/stream/commerce' },
    { path: 'LLB after graduation (3-year)', why: 'Do any degree first, then add law. Good for career-changers.', badge: 'State bar entrance', href: '/stream/commerce' },
    { path: 'BA Political Science / Economics + UPSC', why: 'Civil services route for policy, government and public administration.', badge: 'CUET / merit · UPSC later', href: '/stream/arts' },
  ],
};

function quizAnswersToKey(answers) {
  const all = Object.values(answers).join(' ').toLowerCase();
  if (all.includes('computer') || all.includes('coding') || all.includes('building') || all.includes('tech')) return 'computer';
  if (all.includes('biology') || all.includes('health') || all.includes('hospital') || all.includes('lab') || all.includes('clinical')) return 'doctor';
  if (all.includes('business') || all.includes('money') || all.includes('finance') || all.includes('startup')) return 'money';
  if (all.includes('art') || all.includes('creative') || all.includes('design') || all.includes('portfolio') || all.includes('fashion')) return 'drawing';
  if (all.includes('teaching') || all.includes('mentor') || all.includes('education') || all.includes('writing')) return 'teacher';
  if (all.includes('leadership') || all.includes('government') || all.includes('physical') || all.includes('outdoor') || all.includes('stable')) return 'army';
  if (all.includes('debate') || all.includes('justice') || all.includes('policy')) return 'law';
  return 'computer'; // fallback
}

export default function GuideClient() {
  const [view, setView] = useState('main'); // main | quiz | result
  const [answers, setAnswers] = useState({});
  const [resultKey, setResultKey] = useState(null);

  const pickAnswer = (qid, opt) => setAnswers((prev) => ({ ...prev, [qid]: opt }));

  const showResult = (key) => { setResultKey(key); setView('result'); };

  const quizResult = () => {
    const key = quizAnswersToKey(answers);
    showResult(key);
  };

  // ── RESULT VIEW
  if (view === 'result' && resultKey) {
    const recs = RECS[resultKey] || RECS.computer;
    const interest = INTERESTS.find((i) => i.key === resultKey);
    return (
      <div className="space-y-4">
        <FlowBar steps={['Your answers', '3 starting paths', 'Explore & decide']} active={1} />

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-sm text-amber-800">
          <strong>These are starting points only</strong> — not final recommendations. Compare, discuss with parents, and explore before deciding.
        </div>

        {interest && (
          <div className="flex items-center gap-3 bg-slate-100 rounded-2xl p-3">
            <span className="text-3xl">{interest.icon}</span>
            <div>
              <p className="font-bold text-slate-800 text-sm">{interest.label}</p>
              <p className="text-xs text-slate-500">{interest.desc}</p>
            </div>
          </div>
        )}

        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">3 paths to explore</p>

        <div className="space-y-3">
          {recs.map((rec, i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4">
              <div className="flex items-start gap-3">
                <span className="bg-indigo-100 text-indigo-700 font-black text-sm w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0">
                  {i + 1}
                </span>
                <div className="flex-1">
                  <p className="font-black text-slate-800 text-sm leading-tight">{rec.path}</p>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">{rec.why}</p>
                  <span className="inline-block mt-2 text-xs font-bold bg-slate-100 text-slate-600 rounded-full px-2.5 py-1">
                    {rec.badge}
                  </span>
                </div>
              </div>
              <Link
                href={rec.href}
                className="mt-3 block text-center text-xs font-bold text-indigo-600 border border-indigo-200 rounded-xl py-2 bg-indigo-50 active:bg-indigo-100 transition-colors"
              >
                Explore this stream →
              </Link>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => { setView('main'); setAnswers({}); setResultKey(null); }}
            className="flex-1 text-center text-xs font-bold text-slate-600 border border-slate-200 rounded-xl py-3 bg-white"
          >
            Start over
          </button>
          <button
            onClick={() => setView('quiz')}
            className="flex-1 text-center text-xs font-bold text-indigo-600 border border-indigo-200 rounded-xl py-3 bg-indigo-50"
          >
            Retake quiz
          </button>
        </div>
      </div>
    );
  }

  // ── QUIZ VIEW
  if (view === 'quiz') {
    const answered = Object.keys(answers).length;
    return (
      <div className="space-y-4">
        <FlowBar steps={['Answer 8 questions', 'See 3 paths', 'Explore']} active={0} />

        <div className="bg-slate-800 rounded-2xl p-4 text-white text-sm">
          <p className="font-black text-base mb-1">8 quick questions</p>
          <p className="text-slate-300 text-xs">No login. No final decision. Just starting points to explore.</p>
        </div>

        <div className="space-y-4">
          {QUIZ.map((q) => (
            <div key={q.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4">
              <p className="font-black text-sm text-slate-800 mb-3">{q.q}</p>
              <div className="flex flex-wrap gap-2">
                {q.opts.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => pickAnswer(q.id, opt)}
                    className={`text-xs font-bold px-3 py-2 rounded-xl border transition-colors ${
                      answers[q.id] === opt
                        ? 'bg-slate-800 text-white border-slate-800'
                        : 'bg-slate-50 text-slate-600 border-slate-200'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={quizResult}
          disabled={answered < 3}
          className="w-full bg-slate-800 disabled:opacity-50 text-white font-black text-sm py-3.5 rounded-2xl"
        >
          {answered < 3 ? `Answer at least 3 questions (${answered}/8)` : 'Show my starting paths →'}
        </button>

        <button
          onClick={() => setView('main')}
          className="w-full text-slate-500 text-xs font-semibold py-2"
        >
          ← Back to interests
        </button>
      </div>
    );
  }

  // ── MAIN VIEW
  return (
    <div className="space-y-4">
      <FlowBar steps={['Choose interest', 'See paths', 'Explore & decide']} active={0} />

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4">
        <p className="font-black text-slate-800 text-base mb-1">Not sure where to start?</p>
        <p className="text-sm text-slate-500 leading-relaxed">
          Pick what you enjoy most below — or take the 8-question quiz. This won&apos;t decide for you, it just narrows the options.
        </p>
      </div>

      <button
        onClick={() => setView('quiz')}
        className="w-full flex items-center gap-3 bg-gradient-to-r from-slate-700 to-indigo-800 text-white rounded-2xl p-4 text-left active:scale-[0.98] transition-transform"
      >
        <span className="text-3xl">✨</span>
        <div className="flex-1">
          <p className="font-black text-sm">Take the 8-question quiz</p>
          <p className="text-xs text-white/70 mt-0.5">Answer questions about your interests and goals</p>
        </div>
        <span className="text-white/50 text-xl">›</span>
      </button>

      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Or pick an interest directly</p>

      <div className="space-y-2">
        {INTERESTS.map((item) => (
          <button
            key={item.key}
            onClick={() => showResult(item.key)}
            className="w-full flex items-center gap-3 bg-white rounded-2xl border border-slate-200 shadow-sm p-3.5 text-left active:bg-slate-50 transition-colors"
          >
            <span className="text-2xl">{item.icon}</span>
            <div className="flex-1">
              <p className="font-bold text-slate-800 text-sm">{item.label}</p>
              <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
            </div>
            <span className="text-slate-300 text-xl">›</span>
          </button>
        ))}
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-700 leading-relaxed">
        <strong>Note:</strong> This guide shows starting points. The student should compare, research and discuss before making any final decision.
      </div>
    </div>
  );
}

function FlowBar({ steps, active }) {
  return (
    <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide pb-1">
      {steps.map((step, i) => (
        <div key={i} className="flex items-center gap-1 flex-shrink-0">
          <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${i === active ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-500'}`}>
            {step}
          </span>
          {i < steps.length - 1 && <span className="text-slate-300 text-sm">→</span>}
        </div>
      ))}
    </div>
  );
}

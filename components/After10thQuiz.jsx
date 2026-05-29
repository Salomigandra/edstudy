'use client';
import { useState } from 'react';

// ─── Branch 1: Stream Finder (Class 11-12) ───────────────────────────────────
// 4 clean buckets: MPC · BiPC · Commerce (MEC/CEC) · Humanities (HEC)
// Each option maps to exactly ONE bucket. No overlap. No poly/ITI here.

const STREAM_QUESTIONS = [
  {
    id: 'subject',
    emoji: '📚',
    question: 'Which subject area genuinely interests you — not just what you scored in?',
    options: [
      { label: '🔢 Maths and Physics — I love how numbers explain everything', bucket: 'mpc' },
      { label: '🧬 Biology and the human body — living things fascinate me', bucket: 'bipc' },
      { label: '💰 Economics and business — I think about money and markets', bucket: 'commerce' },
      { label: '🌏 History, politics, and society — I want to understand people and the world', bucket: 'humanities' },
    ],
  },
  {
    id: 'problem',
    emoji: '🧠',
    question: 'What kind of problems do you find yourself thinking about?',
    options: [
      { label: '⚙️ How machines, software, or structures are built and designed', bucket: 'mpc' },
      { label: '💊 Why people get sick, how the body heals, what medicines do', bucket: 'bipc' },
      { label: '📈 Why prices change, how companies grow, how money moves', bucket: 'commerce' },
      { label: '⚖️ Why some people have more than others, what makes a good law or government', bucket: 'humanities' },
    ],
  },
  {
    id: 'shadow',
    emoji: '👀',
    question: 'If you could spend a day following someone at their job, who would you pick?',
    options: [
      { label: '💻 A software engineer, architect, or data scientist', bucket: 'mpc' },
      { label: '🩺 A doctor, surgeon, or medical researcher', bucket: 'bipc' },
      { label: '🏦 A business owner, banker, or chartered accountant', bucket: 'commerce' },
      { label: '📰 A journalist, lawyer, IAS officer, or teacher', bucket: 'humanities' },
    ],
  },
  {
    id: 'mindset',
    emoji: '🪞',
    question: 'Which of these feels most like the way your mind works?',
    options: [
      { label: 'I like exact, logical answers — maths and formulas satisfy me', bucket: 'mpc' },
      { label: 'I\'m curious about living things — I notice plants, animals, and the human body', bucket: 'bipc' },
      { label: 'I\'m always thinking about opportunities, costs, and "does this make financial sense?"', bucket: 'commerce' },
      { label: 'I ask "why is the world like this?" — I care about fairness, rights, and people\'s stories', bucket: 'humanities' },
    ],
  },
  {
    id: 'future',
    emoji: '✨',
    question: 'Which future feels most natural to you — even vaguely?',
    options: [
      { label: 'Something in technology, engineering, research, or data', bucket: 'mpc' },
      { label: 'Something in healthcare — healing people, medical research, public health', bucket: 'bipc' },
      { label: 'Something in business, finance, or building something of my own', bucket: 'commerce' },
      { label: 'Something in public service, law, media, teaching, or social change', bucket: 'humanities' },
    ],
  },
];

// ─── Result cards for each bucket ────────────────────────────────────────────
const STREAM_RESULTS = {
  mpc: {
    label: 'MPC / PCM — Science (Engineering & Technology)',
    icon: '⚛️',
    streams: ['MPC (AP/Telangana)', 'PCM (CBSE)'],
    desc: 'Your answers point clearly toward logical, mathematical thinking and technology. MPC is the stream for you — it opens engineering, computer science, data science, architecture, and defence officer paths.',
    subOptions: [
      { name: 'MPC with Computer Science', note: 'Add CS as optional — strong for engineering + IT careers' },
      { name: 'PCMB (if truly undecided between MPC and BiPC)', note: 'Only if you\'re strong in both Maths and Biology' },
    ],
    color: 'bg-blue-50 border-blue-300',
    headerColor: 'bg-blue-600',
    tag: 'bg-blue-100 text-blue-800',
  },
  bipc: {
    label: 'BiPC / PCB — Science (Healthcare & Life Sciences)',
    icon: '🔬',
    streams: ['BiPC (AP/Telangana)', 'PCB (CBSE)'],
    desc: 'Your answers show genuine curiosity about living things, the human body, and healthcare. BiPC is the right stream — it\'s the only route to MBBS, dentistry, pharmacy, nursing, physiotherapy, and life sciences.',
    subOptions: [
      { name: 'BiPC with Computer Science', note: 'Some CBSE schools allow this — opens bioinformatics and health tech paths' },
      { name: 'PCMB (if engineering is also on your radar)', note: 'Only if you\'re genuinely strong in Maths too' },
    ],
    color: 'bg-green-50 border-green-300',
    headerColor: 'bg-green-600',
    tag: 'bg-green-100 text-green-800',
  },
  commerce: {
    label: 'Commerce — Business, Finance & Economics',
    icon: '📊',
    streams: ['MEC — Maths, Economics, Commerce (AP/Telangana)', 'CEC — Civics, Economics, Commerce (AP/Telangana)', 'Commerce with Maths (CBSE)', 'Commerce without Maths (CBSE)'],
    desc: 'Your answers show a business and economics mindset. Commerce is the right stream — it leads to CA, banking, finance, BBA, economics, and law paths.',
    subOptions: [
      { name: 'MEC (with Maths) — recommended', note: 'Stronger for CA, analytics, and economics. Take if you can handle Maths.' },
      { name: 'CEC (without Maths)', note: 'Better if Maths feels too stressful. Opens B.Com, BBA, law, and economics degrees.' },
    ],
    color: 'bg-purple-50 border-purple-300',
    headerColor: 'bg-purple-600',
    tag: 'bg-purple-100 text-purple-800',
  },
  humanities: {
    label: 'Humanities / Arts — Society, Law & Public Service',
    icon: '🎓',
    streams: ['HEC — History, Economics, Civics (AP/Telangana)', 'Humanities / Arts (CBSE & other boards)'],
    desc: 'Your answers show curiosity about people, society, justice, and the world. Humanities is the right stream — it leads to law, civil services, journalism, psychology, teaching, and public policy careers. IAS, IPS, judges, and top journalists very often come from Humanities.',
    subOptions: [
      { name: 'HEC (AP/Telangana) — recommended', note: 'History + Economics + Civics. The strongest foundation for UPSC and law in the region.' },
      { name: 'Humanities with Economics optional', note: 'Always add Economics if available — it adds business and analytical value.' },
    ],
    color: 'bg-rose-50 border-rose-300',
    headerColor: 'bg-rose-600',
    tag: 'bg-rose-100 text-rose-800',
  },
};

// ─── Component ────────────────────────────────────────────────────────────────
export default function After10thQuiz() {
  const [phase, setPhase] = useState('cta');       // cta | branch | stream-q | stream-result | trade
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState([]);       // array of bucket strings
  const [topResult, setTopResult] = useState(null);
  const [secondResult, setSecondResult] = useState(null);

  function startBranch() { setPhase('branch'); }

  function chooseBranch(choice) {
    if (choice === 'school') {
      setPhase('stream-q');
      setCurrentQ(0);
      setAnswers([]);
    } else {
      setPhase('trade');
    }
  }

  function handleStreamAnswer(bucket) {
    const newAnswers = [...answers, bucket];
    if (currentQ < STREAM_QUESTIONS.length - 1) {
      setAnswers(newAnswers);
      setCurrentQ(currentQ + 1);
    } else {
      // Score the 4 buckets
      const scores = { mpc: 0, bipc: 0, commerce: 0, humanities: 0 };
      newAnswers.forEach(b => { scores[b] = (scores[b] ?? 0) + 1; });
      const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
      setTopResult(sorted[0][0]);
      setSecondResult(sorted[1][1] > 0 ? sorted[1][0] : null);
      setPhase('stream-result');
    }
  }

  function reset() {
    setPhase('cta');
    setCurrentQ(0);
    setAnswers([]);
    setTopResult(null);
    setSecondResult(null);
  }

  const progress = phase === 'stream-q'
    ? Math.round((currentQ / STREAM_QUESTIONS.length) * 100)
    : phase === 'stream-result' ? 100 : 0;

  return (
    <section className="mt-2">
      <div className="flex items-center gap-2 mb-3">
        <div className="h-px flex-1 bg-slate-200" />
        <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Not Sure Where to Start?</p>
        <div className="h-px flex-1 bg-slate-200" />
      </div>

      {/* ── CTA ── */}
      {phase === 'cta' && (
        <div className="bg-gradient-to-br from-brand-600 to-brand-400 rounded-2xl px-5 py-5 text-white shadow-md">
          <p className="text-base font-black leading-tight mb-1.5">🤔 Confused about what to choose after Class 10?</p>
          <p className="text-sm text-white/85 leading-relaxed mb-4">
            Answer a few questions about who you are — and we'll point you toward the stream or path that fits best.
          </p>
          <button
            onClick={startBranch}
            className="bg-white text-brand-700 font-black text-sm rounded-xl px-5 py-2.5 active:scale-95 transition-transform"
          >
            Start →
          </button>
        </div>
      )}

      {/* ── Branch Question ── */}
      {phase === 'branch' && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm px-4 py-5">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">First — let's narrow it down</p>
          <p className="font-black text-sm text-slate-800 leading-snug mb-5">
            Are you thinking of continuing with regular schooling (Class 11–12 Intermediate), or are you considering a trade/skill path like ITI, Polytechnic, or a government job?
          </p>
          <div className="space-y-3">
            <button
              onClick={() => chooseBranch('school')}
              className="w-full text-left rounded-2xl border-2 border-brand-200 bg-brand-50 px-4 py-4 active:scale-[0.98] transition-transform"
            >
              <p className="font-black text-sm text-brand-800 mb-0.5">🏫 Regular schooling — Class 11–12 Intermediate</p>
              <p className="text-[11px] text-brand-600 leading-snug">I want to do Intermediate and then go to college. Help me pick the right stream (Science / Commerce / Humanities).</p>
            </button>
            <button
              onClick={() => chooseBranch('trade')}
              className="w-full text-left rounded-2xl border-2 border-slate-200 bg-slate-50 px-4 py-4 active:scale-[0.98] transition-transform"
            >
              <p className="font-black text-sm text-slate-800 mb-0.5">🔧 Skill / trade path — ITI, Polytechnic, Govt Job, or Vocational</p>
              <p className="text-[11px] text-slate-500 leading-snug">I'm thinking of learning a trade, going to a polytechnic, or preparing for a government job directly after Class 10.</p>
            </button>
          </div>
        </div>
      )}

      {/* ── Stream Questions ── */}
      {phase === 'stream-q' && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="h-1.5 bg-slate-100">
            <div
              className="h-full bg-brand-500 transition-all duration-500 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="px-4 py-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">{STREAM_QUESTIONS[currentQ].emoji}</span>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Question {currentQ + 1} of {STREAM_QUESTIONS.length}
              </p>
            </div>
            <p className="font-black text-sm text-slate-800 leading-snug mb-4">
              {STREAM_QUESTIONS[currentQ].question}
            </p>
            <div className="space-y-2">
              {STREAM_QUESTIONS[currentQ].options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleStreamAnswer(opt.bucket)}
                  className="w-full text-left bg-slate-50 hover:bg-brand-50 hover:border-brand-300 border border-slate-200 rounded-xl px-4 py-3 text-xs font-semibold text-slate-700 transition-colors active:scale-[0.98]"
                >
                  {opt.label}
                </button>
              ))}
            </div>
            {currentQ > 0 && (
              <button
                onClick={() => { setCurrentQ(currentQ - 1); setAnswers(answers.slice(0, -1)); }}
                className="mt-3 text-[11px] text-slate-400 underline"
              >
                ← Go back
              </button>
            )}
          </div>
        </div>
      )}

      {/* ── Stream Result ── */}
      {phase === 'stream-result' && topResult && (
        <div className="space-y-3">
          <div className={`rounded-2xl border-2 overflow-hidden ${STREAM_RESULTS[topResult].color}`}>
            {/* Header bar */}
            <div className={`${STREAM_RESULTS[topResult].headerColor} px-4 py-3 flex items-center gap-3`}>
              <span className="text-2xl">{STREAM_RESULTS[topResult].icon}</span>
              <div>
                <p className="font-black text-white text-sm leading-tight">{STREAM_RESULTS[topResult].label}</p>
                <span className="text-[10px] font-bold bg-white/25 text-white rounded-full px-2 py-0.5 mt-0.5 inline-block">
                  Your closest match
                </span>
              </div>
            </div>
            <div className="px-4 py-3">
              <p className="text-xs text-slate-700 leading-relaxed mb-3">{STREAM_RESULTS[topResult].desc}</p>

              {/* Available as */}
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Available as</p>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {STREAM_RESULTS[topResult].streams.map(s => (
                  <span key={s} className={`text-[10px] font-bold rounded-full px-2.5 py-1 ${STREAM_RESULTS[topResult].tag}`}>{s}</span>
                ))}
              </div>

              {/* Sub-options within stream */}
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Within this stream, consider</p>
              <div className="space-y-1.5">
                {STREAM_RESULTS[topResult].subOptions.map(o => (
                  <div key={o.name} className="flex items-start gap-2">
                    <span className="text-brand-500 font-black text-xs flex-shrink-0 mt-0.5">→</span>
                    <div>
                      <span className="text-[11px] font-black text-slate-800">{o.name}: </span>
                      <span className="text-[11px] text-slate-500">{o.note}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Second match */}
          {secondResult && STREAM_RESULTS[secondResult] && (
            <div className={`rounded-xl border px-4 py-3 ${STREAM_RESULTS[secondResult].color}`}>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Also worth exploring</p>
              <div className="flex items-center gap-2">
                <span className="text-lg">{STREAM_RESULTS[secondResult].icon}</span>
                <p className="font-black text-sm text-slate-800 leading-tight">{STREAM_RESULTS[secondResult].label}</p>
              </div>
              <p className="text-[11px] text-slate-600 leading-snug mt-1">{STREAM_RESULTS[secondResult].desc}</p>
            </div>
          )}

          {/* Disclaimer */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
            <p className="text-[11px] text-amber-800 leading-snug">
              <span className="font-black">This is a starting point, not a final answer.</span> A quiz can point you in a direction — only you and your family know your full situation. Talk to your parents, a teacher you trust, or your school counsellor before deciding.
            </p>
          </div>

          <button onClick={reset} className="text-[11px] text-brand-600 font-bold underline block">
            ↺ Start over
          </button>
        </div>
      )}

      {/* ── Trade / Skill path branch ── */}
      {phase === 'trade' && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm px-4 py-5">
          <p className="text-base font-black text-slate-800 mb-2">👇 Scroll down on this page</p>
          <p className="text-sm text-slate-600 leading-relaxed mb-4">
            We've got you covered. The sections below this quiz explain each trade and skill path in full detail:
          </p>
          <div className="space-y-2 mb-4">
            {[
              { icon: '🔧', label: 'ITI / Vocational', desc: 'Skilled trades — Electrician, Fitter, COPA and more. 1–2 years.' },
              { icon: '⚙️', label: 'Polytechnic Diploma', desc: 'Engineering diploma. 3 years. Junior Engineer or B.Tech entry.' },
              { icon: '🏛️', label: 'Government Jobs After 10th', desc: 'Railway, Army, Police, SSC MTS, NDA — open right after Class 10.' },
              { icon: '🛠️', label: 'Vocational / Skill India', desc: 'Short 3–12 month courses. PMKVY. Fastest path to employment.' },
            ].map(item => (
              <div key={item.label} className="flex items-start gap-3 bg-slate-50 rounded-xl px-3 py-2.5">
                <span className="text-xl flex-shrink-0">{item.icon}</span>
                <div>
                  <p className="font-black text-sm text-slate-800 leading-tight">{item.label}</p>
                  <p className="text-[11px] text-slate-500 leading-snug">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-slate-500 leading-snug mb-3">
            Use the <span className="font-black">Compare Paths</span> section above to compare options like ITI vs Polytechnic or Govt Job Prep vs Continuing Education side by side.
          </p>
          <button onClick={reset} className="text-[11px] text-brand-600 font-bold underline">
            ← Go back
          </button>
        </div>
      )}
    </section>
  );
}

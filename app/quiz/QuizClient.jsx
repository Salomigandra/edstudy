'use client';
import { useState } from 'react';
import Link from 'next/link';

// ── Stream road map data (static, stream-level journey preview) ───────────────

const STREAM_JOURNEY = {
  science: {
    nodes: [
      { icon: '🏫', label: 'Class 12', sub: 'Science stream' },
      { icon: '📝', label: 'JEE / NEET', sub: 'Entrance exam' },
      { icon: '🎓', label: 'B.Tech / MBBS / B.Sc', sub: '3–5.5 years' },
      { icon: '💼', label: 'Engineer / Doctor / Scientist', sub: 'Your career' },
    ],
  },
  bipc: {
    nodes: [
      { icon: '🏫', label: 'Class 12', sub: 'BiPC / PCB stream' },
      { icon: '📝', label: 'NEET / state CET', sub: 'Entrance exam' },
      { icon: '🎓', label: 'MBBS / BDS / BPT / BPharma', sub: '3–5.5 years' },
      { icon: '💼', label: 'Doctor / Dentist / Physio / Pharmacist', sub: 'Your career' },
    ],
  },
  commerce: {
    nodes: [
      { icon: '🏫', label: 'Class 12', sub: 'Commerce stream' },
      { icon: '📝', label: 'CUET / CA Foundation / NCHMCT', sub: 'Entrance / exam' },
      { icon: '🎓', label: 'B.Com / BBA / CA / Hotel Management', sub: '3–5 years' },
      { icon: '💼', label: 'Finance / Business / Hospitality / CA', sub: 'Your career' },
    ],
  },
  arts: {
    nodes: [
      { icon: '🏫', label: 'Class 12', sub: 'Arts / Humanities stream' },
      { icon: '📝', label: 'CUET / CLAT / state entrance', sub: 'Entrance / exam' },
      { icon: '🎓', label: 'BA / Psychology / Social Work / Journalism', sub: '3–5 years' },
      { icon: '💼', label: 'Civil Services / Law / Media / Counselling / NGO', sub: 'Your career' },
    ],
  },
  iti: {
    nodes: [
      { icon: '🏫', label: 'Class 10', sub: 'After 10th' },
      { icon: '📝', label: 'ITI Admission', sub: 'Merit-based' },
      { icon: '🎓', label: 'ITI Trade Certificate', sub: '1–2 years' },
      { icon: '💼', label: 'Electrician / Fitter / Mechanic / COPA', sub: 'Your trade' },
    ],
  },
  poly: {
    nodes: [
      { icon: '🏫', label: 'Class 10', sub: 'After 10th' },
      { icon: '📝', label: 'Polytechnic Entrance', sub: 'State CET' },
      { icon: '🎓', label: 'Diploma in Engineering', sub: '3 years' },
      { icon: '💼', label: 'Junior Engineer / Technician / B.Tech Lateral', sub: 'Your career' },
    ],
  },
  defence: {
    nodes: [
      { icon: '🏫', label: 'Class 12', sub: 'Any stream' },
      { icon: '📝', label: 'NDA / CDS / AFCAT', sub: 'Entrance exam' },
      { icon: '🎓', label: 'NDA / Officers Training', sub: '3–4 years' },
      { icon: '💼', label: 'Army / Navy / Air Force Officer', sub: 'Your career' },
    ],
  },
};

const DEFAULT_JOURNEY = {
  nodes: [
    { icon: '🏫', label: 'Class 12', sub: 'Your stream' },
    { icon: '📝', label: 'Entrance Exam', sub: 'Based on stream' },
    { icon: '🎓', label: 'Degree', sub: '3–5 years' },
    { icon: '💼', label: 'Your Career', sub: 'The destination' },
  ],
};

function StreamRoadMapPreview({ streamSlug, streamColor }) {
  const journey = STREAM_JOURNEY[streamSlug] ?? DEFAULT_JOURNEY;
  const color = streamColor ?? '#7c3aed';

  return (
    <div className="mt-4 pt-4 border-t border-white/20">
      <p className="text-xs font-black text-white/70 uppercase tracking-widest mb-3">Your Journey Preview</p>
      <div className="overflow-x-auto pb-1 -mx-1 px-1">
        <div className="flex items-start min-w-max gap-0">
          {journey.nodes.map((node, i) => (
            <div key={i} className="flex items-start">
              <div className="flex flex-col items-center w-[68px]">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-lg border border-white/30">
                  {node.icon}
                </div>
                <p className="text-[10px] font-black text-white text-center mt-1.5 leading-tight px-0.5">{node.label}</p>
                <p className="text-[9px] text-white/60 text-center leading-tight px-0.5 mt-0.5">{node.sub}</p>
              </div>
              {i < journey.nodes.length - 1 && (
                <div className="flex items-center mt-4 mx-0.5">
                  <div className="w-4 border-t-2 border-dashed border-white/30" />
                  <span className="text-white/40 text-[10px]">›</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── helpers ───────────────────────────────────────────────────────────────────

function computeScores(questions, answers) {
  const scores = {};
  questions.forEach((q) => {
    const selectedId = answers[q.id];
    if (!selectedId) return;
    const option = q.quiz_options.find((o) => o.id === selectedId);
    if (!option?.weights) return;
    Object.entries(option.weights).forEach(([slug, weight]) => {
      scores[slug] = (scores[slug] ?? 0) + weight;
    });
  });
  return scores;
}

function matchLabel(pct) {
  if (pct >= 38) return { icon: '🔥', label: 'Top match', color: '#7c3aed', bg: '#f5f3ff' };
  if (pct >= 22) return { icon: '✨', label: 'Strong fit', color: '#0284c7', bg: '#f0f9ff' };
  return { icon: '💡', label: 'Worth exploring', color: '#16a34a', bg: '#f0fdf4' };
}

// per-question big emoji context (index-based, cosmetic only)
const Q_ICONS = ['🤔', '💭', '🌟', '🎯', '⚡'];

// per-option color tints (index 0-3)
const OPT_COLORS = [
  { bg: '#f5f3ff', border: '#c4b5fd', active_bg: '#ede9fe', active_border: '#7c3aed', dot: '#7c3aed' },
  { bg: '#eff6ff', border: '#bfdbfe', active_bg: '#dbeafe', active_border: '#2563eb', dot: '#2563eb' },
  { bg: '#fff7ed', border: '#fed7aa', active_bg: '#ffedd5', active_border: '#ea580c', dot: '#ea580c' },
  { bg: '#f0fdf4', border: '#bbf7d0', active_bg: '#dcfce7', active_border: '#16a34a', dot: '#16a34a' },
];

const OPT_LABELS = ['A', 'B', 'C', 'D'];

// ── Intro ─────────────────────────────────────────────────────────────────────

function IntroScreen({ total, onStart }) {
  return (
    <div className="quiz-pop-in flex flex-col items-center text-center pt-6 pb-4 gap-6">
      <div>
        <p className="text-7xl mb-4">🗺️</p>
        <h1 className="font-black text-2xl text-slate-900 leading-tight">
          Find your path<br />in 60 seconds
        </h1>
        <p className="text-sm text-slate-500 mt-3 leading-relaxed max-w-xs mx-auto">
          Answer {total} honest questions about who you are — not what you scored. No right answers, just yours.
        </p>
      </div>

      <div className="w-full max-w-xs space-y-3 text-left">
        {[
          ['🧠', 'Personality-based', 'What genuinely interests you, not your marks'],
          ['⚡', 'Fast', `Done in under ${total} minutes`],
          ['🎯', 'Personalised', 'Top 3 stream matches just for you'],
        ].map(([icon, title, desc]) => (
          <div key={title} className="flex items-start gap-3 bg-white rounded-xl px-4 py-3 border border-slate-100 shadow-sm">
            <span className="text-xl flex-shrink-0">{icon}</span>
            <div>
              <p className="text-sm font-black text-slate-800">{title}</p>
              <p className="text-xs text-slate-400 mt-0.5">{desc}</p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={onStart}
        className="w-full max-w-xs py-4 rounded-2xl font-black text-base text-white shadow-lg active:scale-[0.97] transition-transform"
        style={{ background: 'linear-gradient(135deg, #6c2ee8, #9468ff)' }}
      >
        Let's start →
      </button>

      <p className="text-[11px] text-slate-400">Takes about 1 minute · No sign-up needed</p>
    </div>
  );
}

// ── Progress dots ─────────────────────────────────────────────────────────────

function ProgressDots({ current, total }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex gap-2 items-center">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === current ? 24 : 8,
              height: 8,
              background:
                i < current ? '#7c3aed' :
                i === current ? 'linear-gradient(90deg,#6c2ee8,#9468ff)' :
                '#e2e8f0',
            }}
          />
        ))}
      </div>
      <span className="text-xs font-bold text-slate-400">
        {current + 1} of {total}
      </span>
    </div>
  );
}

// ── Question card ─────────────────────────────────────────────────────────────

function QuestionScreen({ question, index, total, direction, onSelect, onBack }) {
  const [selected, setSelected] = useState(null);
  const animClass = direction === 'back' ? 'quiz-slide-back' : 'quiz-slide-forward';

  const pick = (optionId) => {
    if (selected) return;
    setSelected(optionId);
    setTimeout(() => onSelect(optionId), 320);
  };

  const opts = question.quiz_options;
  // 2-col grid for 4 options, single col for 2-3
  const useGrid = opts.length === 4;

  return (
    <div className={animClass}>
      <ProgressDots current={index} total={total} />

      {/* Question */}
      <div className="mb-6">
        <p className="text-5xl mb-3">{Q_ICONS[index] ?? '💬'}</p>
        <p className="text-[11px] font-black text-brand-500 uppercase tracking-widest mb-2">
          Question {index + 1}
        </p>
        <h2 className="text-lg font-black text-slate-900 leading-snug">{question.question}</h2>
      </div>

      {/* Options */}
      <div className={useGrid ? 'grid grid-cols-2 gap-3' : 'space-y-3'}>
        {opts.map((opt, i) => {
          const c = OPT_COLORS[i % OPT_COLORS.length];
          const isSelected = selected === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => pick(opt.id)}
              disabled={!!selected}
              className="relative w-full text-left rounded-2xl border-2 p-4 transition-all duration-200 active:scale-[0.97] focus:outline-none"
              style={{
                background: isSelected ? c.active_bg : c.bg,
                borderColor: isSelected ? c.active_border : c.border,
                transform: isSelected ? 'scale(0.97)' : undefined,
              }}
            >
              <div className="flex items-start gap-3">
                {/* Letter badge */}
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black flex-shrink-0 transition-all duration-200"
                  style={{
                    background: isSelected ? c.dot : 'white',
                    color: isSelected ? 'white' : c.dot,
                    border: `2px solid ${isSelected ? c.dot : c.border}`,
                  }}
                >
                  {isSelected ? '✓' : OPT_LABELS[i]}
                </div>
                <p className="text-sm font-semibold text-slate-800 leading-snug pt-0.5">
                  {opt.option_text}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Back button */}
      {index > 0 && !selected && (
        <button
          onClick={onBack}
          className="mt-5 flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors"
        >
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
          Back
        </button>
      )}
    </div>
  );
}

// ── Results ───────────────────────────────────────────────────────────────────

function ResultsScreen({ scores, streams, onRetake }) {
  const ranked = Object.entries(scores)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3);

  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0) || 1;

  const topStreams = ranked
    .map(([slug, score]) => ({
      slug,
      score,
      pct: Math.round((score / totalScore) * 100),
      stream: streams.find((s) => s.slug === slug),
    }))
    .filter((r) => r.stream);

  if (!topStreams.length) {
    return (
      <div className="text-center py-12 quiz-pop-in">
        <p className="text-4xl mb-3">🤷</p>
        <p className="font-black text-slate-700 text-lg">Couldn't find a clear match</p>
        <p className="text-sm text-slate-400 mt-2 mb-6">Try exploring all streams instead</p>
        <Link href="/explore" className="inline-block bg-brand-gradient text-white font-bold px-6 py-3 rounded-2xl text-sm">
          Explore all options →
        </Link>
      </div>
    );
  }

  const [top, ...rest] = topStreams;
  const topGradient = top.stream.color && top.stream.color_light
    ? `linear-gradient(135deg, ${top.stream.color}, ${top.stream.color_light})`
    : 'linear-gradient(135deg, #6c2ee8, #9468ff)';
  const topMatch = matchLabel(top.pct);

  return (
    <div className="quiz-pop-in space-y-5">

      {/* Celebration header */}
      <div className="text-center pt-2">
        <p className="text-6xl mb-3">🎉</p>
        <h2 className="font-black text-2xl text-slate-900">Your results are in!</h2>
        <p className="text-sm text-slate-500 mt-1">Based on your answers, here's where you shine</p>
      </div>

      {/* Top match */}
      <div>
        <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2">Your Top Match</p>
        <Link
          href={`/stream/${top.slug}`}
          className="block rounded-2xl overflow-hidden shadow-lg active:scale-[0.98] transition-transform"
        >
          <div className="p-5 text-white" style={{ background: topGradient }}>
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="text-4xl">{top.stream.icon ?? '📚'}</span>
                <div>
                  <span
                    className="inline-flex items-center gap-1 text-[10px] font-black rounded-full px-2.5 py-0.5 mb-1"
                    style={{ background: topMatch.bg, color: topMatch.color }}
                  >
                    {topMatch.icon} {topMatch.label}
                  </span>
                  <p className="font-black text-xl leading-tight">{top.stream.name}</p>
                </div>
              </div>
              <span className="text-2xl font-black text-white/80 flex-shrink-0">{top.pct}%</span>
            </div>

            {top.stream.description && (
              <p className="text-sm text-white/80 mt-3 leading-relaxed">{top.stream.description}</p>
            )}

            {/* Match bar */}
            <div className="mt-4 h-2 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-white/70 rounded-full transition-all duration-700"
                style={{ width: `${top.pct}%` }}
              />
            </div>

            <p className="text-xs text-white/70 mt-3 font-semibold">Tap to explore courses in this stream →</p>

            <StreamRoadMapPreview streamSlug={top.slug} streamColor={top.stream.color} />
          </div>
        </Link>
      </div>

      {/* Also consider */}
      {rest.length > 0 && (
        <div>
          <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2">Also Consider</p>
          <div className="space-y-2">
            {rest.map(({ slug, pct, stream }) => {
              const grad = stream.color && stream.color_light
                ? `linear-gradient(135deg, ${stream.color}, ${stream.color_light})`
                : 'linear-gradient(135deg, #6c2ee8, #9468ff)';
              const m = matchLabel(pct);
              return (
                <Link
                  key={slug}
                  href={`/stream/${slug}`}
                  className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 border border-slate-100 shadow-sm active:scale-[0.98] transition-transform"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                    style={{ background: grad }}
                  >
                    {stream.icon ?? '📚'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-black text-sm text-slate-800 leading-tight">{stream.name}</p>
                    <span
                      className="text-[10px] font-bold"
                      style={{ color: m.color }}
                    >
                      {m.icon} {m.label}
                    </span>
                  </div>
                  <span className="font-black text-sm text-slate-400 flex-shrink-0">{pct}%</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Honest note */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 flex gap-2">
        <span className="flex-shrink-0">⚠️</span>
        <p className="text-xs text-amber-800 leading-relaxed">
          This is a starting point, not a verdict. Talk to a counsellor or your parents, explore each stream, and make the choice that feels right for <strong>you</strong>.
        </p>
      </div>

      {/* CTAs */}
      <div className="flex flex-col gap-3 pb-2">
        <Link
          href="/explore"
          className="w-full py-4 rounded-2xl font-black text-sm text-white text-center active:opacity-80 transition-opacity"
          style={{ background: 'linear-gradient(135deg, #6c2ee8, #9468ff)' }}
        >
          Explore all education options →
        </Link>
        <button
          onClick={onRetake}
          className="w-full py-3.5 rounded-2xl border border-slate-200 text-slate-600 font-bold text-sm active:bg-slate-50 transition-colors"
        >
          Retake quiz
        </button>
      </div>
    </div>
  );
}

// ── Main quiz controller ──────────────────────────────────────────────────────

export default function QuizClient({ questions, streams }) {
  const [stage, setStage] = useState('intro'); // 'intro' | 'question' | 'result'
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [direction, setDirection] = useState('forward');

  const handleStart = () => {
    setStage('question');
    setCurrentIndex(0);
    setAnswers({});
    setDirection('forward');
  };

  const handleSelect = (optionId) => {
    const question = questions[currentIndex];
    const newAnswers = { ...answers, [question.id]: optionId };
    setAnswers(newAnswers);
    setDirection('forward');

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setStage('result');
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setDirection('back');
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleRetake = () => {
    setStage('intro');
    setCurrentIndex(0);
    setAnswers({});
    setDirection('forward');
  };

  if (stage === 'intro') {
    return <IntroScreen total={questions.length} onStart={handleStart} />;
  }

  if (stage === 'result') {
    const scores = computeScores(questions, answers);
    return <ResultsScreen scores={scores} streams={streams} onRetake={handleRetake} />;
  }

  return (
    <QuestionScreen
      key={currentIndex}
      question={questions[currentIndex]}
      index={currentIndex}
      total={questions.length}
      direction={direction}
      onSelect={handleSelect}
      onBack={handleBack}
    />
  );
}

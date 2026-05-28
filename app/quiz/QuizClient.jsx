'use client';
import { useState } from 'react';
import Link from 'next/link';

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

function ProgressBar({ current, total }) {
  const pct = Math.round(((current + 1) / total) * 100);
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-brand-gradient rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-xs font-bold text-slate-400 flex-shrink-0">
        {current + 1}/{total}
      </span>
    </div>
  );
}

function QuestionScreen({ question, index, total, onSelect }) {
  const [selected, setSelected] = useState(null);

  const pick = (optionId) => {
    setSelected(optionId);
    setTimeout(() => onSelect(optionId), 300);
  };

  return (
    <div className="space-y-5">
      <ProgressBar current={index} total={total} />

      <div>
        <p className="text-[11px] font-black text-brand-400 uppercase tracking-widest mb-2">
          Question {index + 1}
        </p>
        <h2 className="text-lg font-black text-slate-900 leading-snug">{question.question}</h2>
      </div>

      <div className="space-y-3">
        {question.quiz_options.map((opt) => (
          <button
            key={opt.id}
            onClick={() => pick(opt.id)}
            className={`w-full text-left rounded-2xl px-4 py-4 border-2 transition-all active:scale-[0.98] ${
              selected === opt.id
                ? 'bg-brand-50 border-brand-400 text-brand-800'
                : 'bg-white border-slate-200 text-slate-700 hover:border-brand-200'
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                  selected === opt.id ? 'bg-brand-600 border-brand-600' : 'border-slate-300'
                }`}
              >
                {selected === opt.id && (
                  <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="3" strokeLinecap="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                )}
              </div>
              <p className="text-sm font-semibold leading-snug">{opt.option_text}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function ResultsScreen({ scores, streams }) {
  const ranked = Object.entries(scores)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3);

  const topStreams = ranked.map(([slug, score]) => {
    const stream = streams.find((s) => s.slug === slug);
    return { slug, score, stream };
  }).filter((r) => r.stream);

  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0) || 1;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <p className="text-5xl mb-3">🎯</p>
        <h2 className="font-black text-2xl text-slate-900">Your Results</h2>
        <p className="text-sm text-slate-500 mt-1">Based on your answers, here are your best-fit paths</p>
      </div>

      {topStreams.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-slate-500">We couldn't determine a clear match. Explore all streams!</p>
          <Link href="/explore" className="inline-block mt-4 bg-brand-gradient text-white font-bold px-6 py-3 rounded-2xl text-sm">
            Explore all options →
          </Link>
        </div>
      ) : (
        <>
          <div className="space-y-3">
            {topStreams.map(({ slug, score, stream }, i) => {
              const pct = Math.round((score / totalScore) * 100);
              const streamGradient =
                stream.color && stream.color_light
                  ? `linear-gradient(135deg, ${stream.color}, ${stream.color_light})`
                  : 'linear-gradient(135deg, #6c2ee8, #9468ff)';

              return (
                <Link
                  key={slug}
                  href={`/stream/${slug}`}
                  className="block rounded-2xl overflow-hidden shadow-md active:scale-[0.98] transition-transform"
                >
                  <div className="p-4 text-white" style={{ background: streamGradient }}>
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{stream.icon ?? '📚'}</span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          {i === 0 && (
                            <span className="text-[10px] font-black bg-white/25 rounded-full px-2 py-0.5">
                              Best match
                            </span>
                          )}
                        </div>
                        <p className="font-black text-base leading-tight mt-0.5">{stream.name}</p>
                        {stream.description && (
                          <p className="text-[11px] text-white/75 mt-0.5 leading-tight line-clamp-1">
                            {stream.description}
                          </p>
                        )}
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="font-black text-xl">{pct}%</p>
                        <p className="text-[10px] text-white/70">match</p>
                      </div>
                    </div>
                    <div className="mt-3 h-1.5 bg-white/20 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-white/60 rounded-full"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3">
            <p className="text-xs text-amber-800 leading-snug">
              ⚠️ These are suggestions based on 5 questions — not a definitive guide. Talk to a counsellor or your parents before making decisions.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <Link
              href="/explore"
              className="w-full py-3.5 rounded-2xl bg-brand-gradient text-white font-black text-sm text-center active:opacity-80 transition-opacity"
            >
              Explore all education options →
            </Link>
            <button
              onClick={() => window.location.reload()}
              className="w-full py-3.5 rounded-2xl border border-slate-200 text-slate-600 font-bold text-sm active:bg-slate-50 transition-colors"
            >
              Retake quiz
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default function QuizClient({ questions, streams }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [done, setDone] = useState(false);

  const handleSelect = (optionId) => {
    const question = questions[currentIndex];
    const newAnswers = { ...answers, [question.id]: optionId };
    setAnswers(newAnswers);

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setDone(true);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  if (done) {
    const scores = computeScores(questions, answers);
    return <ResultsScreen scores={scores} streams={streams} />;
  }

  return (
    <div className="space-y-4">
      {currentIndex > 0 && (
        <button
          onClick={handleBack}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-500 active:text-slate-800 transition-colors"
        >
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
          Back
        </button>
      )}

      <QuestionScreen
        key={currentIndex}
        question={questions[currentIndex]}
        index={currentIndex}
        total={questions.length}
        onSelect={handleSelect}
      />
    </div>
  );
}

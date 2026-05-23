'use client';
import { useState } from 'react';
import CourseList from '@/components/CourseList';

// Breadcrumb path flow shown at top of stream page
function PathFlowBar({ stream }) {
  const stage = stream.stage === '10th' ? 'Class 10' : 'Class 12';
  const steps = [stage, stream.name + ' stream', 'Choose degree', 'Pick branch', 'Career'];
  return (
    <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-hide">
      {steps.map((step, i) => (
        <div key={i} className="flex items-center gap-1 flex-shrink-0">
          <span className={`text-[10px] font-bold px-2 py-1 rounded-lg whitespace-nowrap ${i === 2 ? 'bg-indigo-100 text-indigo-700 border border-indigo-200' : 'bg-slate-100 text-slate-500'}`}>
            {step}
          </span>
          {i < steps.length - 1 && <span className="text-slate-300 text-xs">›</span>}
        </div>
      ))}
    </div>
  );
}

export default function StreamClient({ stream }) {
  const [quickMode, setQuickMode] = useState(false);

  return (
    <main className="flex-1 px-4 pt-4 pb-28">
      {/* Stream Banner */}
      <div className="text-white rounded-2xl p-4 mb-4" style={{ background: `linear-gradient(135deg, ${stream.color}, ${stream.colorLight})` }}>
        <p className="text-3xl mb-1">{stream.icon}</p>
        <p className="font-black text-xl">{stream.name}</p>
        <p className="text-sm text-white/80 mt-0.5">{stream.courses.length} courses available</p>
        {stream.stage === '10th' && (
          <span className="inline-block mt-2 text-xs font-bold bg-white/20 rounded-full px-3 py-1">
            ✅ Starts directly after Class 10
          </span>
        )}
        {stream.stage === '12th' && (
          <span className="inline-block mt-2 text-xs font-bold bg-white/20 rounded-full px-3 py-1">
            🎓 Apply after completing Class 12
          </span>
        )}
      </div>

      {/* Path flow breadcrumb */}
      <div className="mb-4">
        <PathFlowBar stream={stream} />
      </div>

      {/* Quick / Deep toggle */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          {quickMode ? 'Quick overview' : 'Full details'}
        </p>
        <div className="flex items-center gap-1 bg-slate-100 rounded-xl p-1">
          <button
            onClick={() => setQuickMode(true)}
            className={`text-xs font-black px-3 py-1.5 rounded-lg transition-colors ${quickMode ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-400'}`}
          >
            ⚡ Quick
          </button>
          <button
            onClick={() => setQuickMode(false)}
            className={`text-xs font-black px-3 py-1.5 rounded-lg transition-colors ${!quickMode ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-400'}`}
          >
            📖 Deep
          </button>
        </div>
      </div>

      {quickMode && (
        <p className="text-[11px] text-slate-400 mb-3 bg-amber-50 border border-amber-100 rounded-xl px-3 py-2">
          💡 Quick mode shows a summary. Switch to <strong>Deep</strong> for full details, salary stages, path guidance, and save options.
        </p>
      )}

      <CourseList
        courses={stream.courses}
        accentColor={stream.colorBg}
        accentText={stream.colorText}
        accentDot={stream.color}
        streamKey={stream.id}
        streamName={stream.name}
        streamStage={stream.stage}
        quickMode={quickMode}
      />
    </main>
  );
}

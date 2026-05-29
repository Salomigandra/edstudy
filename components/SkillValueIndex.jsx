const DIRECTION_CONFIG = {
  growing: {
    label: 'Growing Demand',
    icon: '📈',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    text: 'text-emerald-800',
    badge: 'bg-emerald-100 text-emerald-700',
  },
  stable: {
    label: 'Stable Demand',
    icon: '⚖️',
    bg: 'bg-sky-50',
    border: 'border-sky-200',
    text: 'text-sky-800',
    badge: 'bg-sky-100 text-sky-700',
  },
  shifting: {
    label: 'Market Shifting',
    icon: '🔄',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    text: 'text-amber-800',
    badge: 'bg-amber-100 text-amber-700',
  },
};

export default function SkillValueIndex({ skills, marketDirection, marketNote }) {
  if (!skills?.length && !marketNote) return null;

  const config = DIRECTION_CONFIG[marketDirection] ?? DIRECTION_CONFIG.stable;

  return (
    <section>
      <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3">
        Skills You Graduate With
      </p>

      {/* Market direction banner */}
      <div className={`flex items-start gap-2.5 rounded-xl px-4 py-3 border mb-3 ${config.bg} ${config.border}`}>
        <span className="text-lg flex-shrink-0">{config.icon}</span>
        <div>
          <span className={`text-[10px] font-black uppercase tracking-widest ${config.text}`}>
            {config.label}
          </span>
          {marketNote && (
            <p className={`text-xs mt-0.5 leading-snug ${config.text}`}>{marketNote}</p>
          )}
        </div>
      </div>

      {/* Skill chips */}
      {skills?.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, i) => (
            <div key={i} className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-xl px-3 py-1.5 shadow-sm">
              <span className="text-xs">{skill.transferable ? '🔁' : '🎯'}</span>
              <span className="text-xs font-bold text-slate-700">{skill.name}</span>
            </div>
          ))}
        </div>
      )}

      {/* Legend */}
      {skills?.length > 0 && (
        <div className="flex gap-3 mt-2.5">
          <span className="text-[10px] text-slate-400">🔁 Transferable across careers</span>
          <span className="text-[10px] text-slate-400">🎯 Domain-specific</span>
        </div>
      )}
    </section>
  );
}

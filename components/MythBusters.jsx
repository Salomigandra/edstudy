export default function MythBusters({ myths }) {
  if (!myths?.length) return null;

  return (
    <section>
      <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3">
        Myth Busters
      </p>
      <div className="space-y-3">
        {myths.map((item, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden"
          >
            {/* Myth */}
            <div className="flex items-start gap-2.5 px-4 py-3 bg-rose-50 border-b border-rose-100">
              <span className="text-base mt-0.5 flex-shrink-0">💬</span>
              <div>
                <p className="text-[10px] font-black text-rose-500 uppercase tracking-widest mb-0.5">
                  Myth
                </p>
                <p className="text-sm font-semibold text-rose-900 leading-snug">{item.myth}</p>
              </div>
            </div>
            {/* Reality */}
            <div className="flex items-start gap-2.5 px-4 py-3">
              <span className="text-base mt-0.5 flex-shrink-0">✅</span>
              <div>
                <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-0.5">
                  Reality
                </p>
                <p className="text-sm text-slate-700 leading-snug">{item.reality}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

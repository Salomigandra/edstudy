'use client';
import { useState } from 'react';

const STEP_ICONS = ['🏫', '📝', '🎓', '💼', '🚀'];

export default function PathRoadMap({ nodes, streamColor }) {
  const [active, setActive] = useState(0);

  const activeNode = nodes[active];

  return (
    <div>
      {/* Scrollable node strip */}
      <div className="overflow-x-auto pb-2 -mx-1 px-1">
        <div className="flex items-start min-w-max gap-0">
          {nodes.map((node, i) => (
            <div key={i} className="flex items-start">
              {/* Node */}
              <button
                onClick={() => setActive(i)}
                className="flex flex-col items-center w-[72px] group focus:outline-none"
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-xl shadow-md border-2 transition-all duration-200"
                  style={{
                    background: active === i ? streamColor : '#f8fafc',
                    borderColor: active === i ? streamColor : '#e2e8f0',
                    transform: active === i ? 'scale(1.12)' : 'scale(1)',
                  }}
                >
                  {STEP_ICONS[i]}
                </div>
                <p
                  className="text-[10px] font-black text-center mt-1.5 leading-tight px-0.5"
                  style={{ color: active === i ? '#1e293b' : '#94a3b8' }}
                >
                  {node.label}
                </p>
                <p className="text-[9px] text-slate-400 text-center leading-tight px-0.5 mt-0.5">
                  {node.sublabel}
                </p>
              </button>

              {/* Connector */}
              {i < nodes.length - 1 && (
                <div className="flex items-center mt-5 mx-0.5">
                  <div
                    className="w-6 h-0.5 border-t-2 border-dashed"
                    style={{ borderColor: streamColor ?? '#c4b5fd' }}
                  />
                  <span className="text-[8px]" style={{ color: streamColor ?? '#c4b5fd' }}>›</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Detail panel — updates on tap */}
      {activeNode && (
        <div
          className="mt-3 rounded-2xl p-4 border transition-all duration-200"
          style={{
            background: `${streamColor}18` ?? '#f5f3ff',
            borderColor: `${streamColor}40` ?? '#ddd6fe',
          }}
        >
          <div className="flex items-start gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
              style={{ background: `${streamColor}30` }}
            >
              {STEP_ICONS[active]}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-black text-sm text-slate-800 leading-tight">{activeNode.label}</p>
              <p className="text-xs text-slate-500 mt-0.5 font-semibold">{activeNode.sublabel}</p>
              {activeNode.detail && (
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">{activeNode.detail}</p>
              )}
              {activeNode.tags?.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {activeNode.tags.map((t, ti) => (
                    <span
                      key={ti}
                      className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                      style={{ background: `${streamColor}25`, color: '#1e293b' }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Step indicators */}
          <div className="flex gap-1.5 mt-3 justify-center">
            {nodes.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className="h-1 rounded-full transition-all duration-200 focus:outline-none"
                style={{
                  width: active === i ? 20 : 6,
                  background: active === i ? streamColor : '#cbd5e1',
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

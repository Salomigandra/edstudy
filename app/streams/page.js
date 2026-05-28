import Link from 'next/link';
import { STREAMS } from '@/data/pathways';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';

export const metadata = { title: '11th & 12th Streams — India Education Pathways' };

export default function StreamsPage() {
  const streams = STREAMS.filter((s) => ['science', 'commerce', 'arts'].includes(s.id));

  return (
    <div className="w-full max-w-lg mx-auto lg:max-w-none min-h-screen flex flex-col shadow-xl lg:shadow-none">
      <Header backHref="/" title="11th & 12th Streams" subtitle="Pick a stream → see all college options after 12th" />

      <main className="flex-1 px-4 lg:px-8 pt-4 pb-28 lg:pb-10 lg:max-w-3xl lg:mx-auto lg:w-full">
        <div className="bg-slate-800 rounded-2xl p-4 text-white mb-5">
          <p className="text-2xl mb-1">📚</p>
          <p className="font-black text-lg">Choose Your Stream in 11th</p>
          <p className="text-sm text-slate-300 mt-1 leading-relaxed">
            You choose this after Class 10. Study 11th & 12th in that stream, then apply to college. Tap below to see which UG courses open up.
          </p>
        </div>

        <div className="space-y-3">
          {streams.map((stream) => (
            <Link
              key={stream.id}
              href={`/stream/${stream.id}`}
              className="flex items-center gap-4 text-white rounded-2xl p-4 active:scale-[0.98] transition-transform shadow-md"
              style={{ background: `linear-gradient(135deg, ${stream.color}, ${stream.colorLight})` }}
            >
              <span className="text-4xl">{stream.icon}</span>
              <div className="flex-1">
                <p className="font-black text-lg">{stream.name} Stream</p>
                <p className="text-sm text-white/80">{stream.sub}</p>
                <p className="text-xs text-white/60 mt-1">{stream.courses.length} undergraduate options after 12th →</p>
              </div>
              <span className="text-white/60 text-2xl">›</span>
            </Link>
          ))}
        </div>
      </main>

      <BottomNav active="home" />
    </div>
  );
}

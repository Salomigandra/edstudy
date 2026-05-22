import { notFound } from 'next/navigation';
import { getStreamById, STREAMS } from '@/data/pathways';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import CourseList from '@/components/CourseList';

export async function generateStaticParams() {
  return STREAMS.map((s) => ({ id: s.id }));
}

export async function generateMetadata({ params }) {
  const stream = getStreamById(params.id);
  if (!stream) return {};
  return {
    title: `${stream.name} — India Education Pathways`,
    description: `All undergraduate options for ${stream.name} stream students in India.`,
  };
}

export default function StreamPage({ params }) {
  const stream = getStreamById(params.id);
  if (!stream) notFound();

  return (
    <div className="max-w-lg mx-auto min-h-screen flex flex-col shadow-xl">
      <Header
        backHref={['science', 'commerce', 'arts'].includes(stream.id) ? '/streams' : '/'}
        title={`${stream.icon} ${stream.name}`}
        subtitle={stream.sub}
      />

      <main className="flex-1 px-4 pt-4 pb-28">
        {/* Stream Banner */}
        <div className="text-white rounded-2xl p-4 mb-5" style={{ background: `linear-gradient(135deg, ${stream.color}, ${stream.colorLight})` }}>
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

        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
          Tap any course to expand details
        </p>

        <CourseList courses={stream.courses} accentColor={stream.colorBg} accentText={stream.colorText} accentDot={stream.color} streamKey={stream.id} streamName={stream.name} />
      </main>

      <BottomNav active="home" />
    </div>
  );
}

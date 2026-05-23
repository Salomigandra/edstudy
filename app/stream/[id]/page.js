import { notFound } from 'next/navigation';
import { getStreamById, STREAMS } from '@/data/pathways';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import StreamClient from '@/components/StreamClient';

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
      <StreamClient stream={stream} />
      <BottomNav active="home" />
    </div>
  );
}

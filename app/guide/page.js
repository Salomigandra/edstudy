import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import GuideClient from '@/components/GuideClient';

export const metadata = {
  title: 'Confused Student Guide — India Education Pathways',
  description: 'Not sure which course to choose? Answer 5 simple questions or pick from interest areas to find your starting point.',
};

export default function GuidePage() {
  return (
    <div className="max-w-lg mx-auto min-h-screen flex flex-col shadow-xl">
      <Header title="🧭 Confused? Start Here" subtitle="Pick interests, not course names" />
      <main className="flex-1 px-4 pt-4 pb-28">
        <GuideClient />
      </main>
      <BottomNav active="guide" />
    </div>
  );
}

import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import GuideClient from '@/components/GuideClient';

export const metadata = {
  title: 'Confused Student Guide — India Education Pathways',
  description: 'Not sure which course to choose? Answer 5 simple questions or pick from interest areas to find your starting point.',
};

export default function GuidePage() {
  return (
    <div className="w-full max-w-lg mx-auto lg:max-w-none min-h-screen flex flex-col shadow-xl lg:shadow-none">
      <Header backHref="/" title="🧭 Confused? Start Here" subtitle="Pick interests, not course names" />
      <main className="flex-1 px-4 lg:px-8 pt-4 pb-28 lg:pb-10 lg:max-w-3xl lg:mx-auto lg:w-full">
        <GuideClient />
      </main>
      <BottomNav active="guide" />
    </div>
  );
}

import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import SearchClient from '@/components/SearchClient';

export const metadata = { title: 'Search — India Education Pathways' };

export default function SearchPage() {
  return (
    <div className="max-w-lg mx-auto min-h-screen flex flex-col shadow-xl">
      <Header title="Search" subtitle="Find courses, careers, exams…" />
      <main className="flex-1 px-4 pt-4 pb-28">
        <SearchClient />
      </main>
      <BottomNav active="search" />
    </div>
  );
}

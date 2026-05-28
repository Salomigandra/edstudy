import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import SearchClient from '@/components/SearchClient';

export const metadata = { title: 'Search — EdStudy' };

export default function SearchPage({ searchParams }) {
  const initialQuery = searchParams?.q ?? '';
  return (
    <div className="w-full max-w-lg mx-auto lg:max-w-none min-h-screen flex flex-col shadow-xl lg:shadow-none bg-slate-50">
      <Header title="Search" subtitle="Courses, careers, exams…" />
      <main className="flex-1 px-4 lg:px-8 pt-4 pb-28 lg:pb-10 lg:max-w-3xl lg:mx-auto lg:w-full">
        <SearchClient initialQuery={initialQuery} />
      </main>
      <BottomNav />
    </div>
  );
}

import { createPublicClient } from '@/lib/supabaseServer';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import QuizClient from './QuizClient';

export const metadata = { title: 'Career Quiz' };

export default async function QuizPage() {
  const supabase = createPublicClient();

  const [{ data: questions }, { data: streams }] = await Promise.all([
    supabase
      .from('quiz_questions')
      .select('id, question, sort_order, quiz_options(id, option_text, weights, sort_order)')
      .order('sort_order'),
    supabase
      .from('streams')
      .select('id, slug, name, icon, color, color_light, description')
      .order('sort_order'),
  ]);

  const sortedQuestions = (questions ?? []).map((q) => ({
    ...q,
    quiz_options: (q.quiz_options ?? []).sort((a, b) => a.sort_order - b.sort_order),
  }));

  return (
    <div className="w-full max-w-lg mx-auto lg:max-w-none min-h-screen flex flex-col shadow-xl lg:shadow-none bg-slate-50">
      <Header backHref="/" title="Career Quiz" subtitle="8 questions · suggested paths to explore" />
      <main className="flex-1 px-4 lg:px-8 pt-5 pb-28 lg:pb-10 lg:max-w-3xl lg:mx-auto lg:w-full">
        {sortedQuestions.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-4xl mb-3">🚧</p>
            <p className="font-black text-slate-700">Quiz not set up yet</p>
            <p className="text-sm text-slate-400 mt-1">Run quiz-seed.sql in Supabase to add questions.</p>
          </div>
        ) : (
          <QuizClient questions={sortedQuestions} streams={streams ?? []} />
        )}
      </main>
      <BottomNav />
    </div>
  );
}

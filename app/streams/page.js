import { redirect } from 'next/navigation';

export default function StreamsPage() {
  redirect('/explore?stage=after_12th');
}

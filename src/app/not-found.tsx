import type { Metadata } from 'next';
import NotFoundContent from '@/components/ui/not-found-content';

export const metadata: Metadata = {
  title: '404 — Page Not Found',
  description: 'The page you are looking for does not exist on Azzar Budiyanto\'s portfolio.',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="page-container">
      <NotFoundContent />
    </main>
  );
}

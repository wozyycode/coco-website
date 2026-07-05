import { Navbar } from '@/components/Navbar';
import { MobileTabBar } from '@/components/MobileTabBar';
import { Footer } from '@/components/Footer';
import { PageHeader } from '@/components/PageHeader';
import { LiveStatsDashboard } from '@/components/LiveStatsDashboard';

export const metadata = {
  title: 'İstatistikler — Coco',
};

export default function StatisticsPage() {
  return (
    <>
      <Navbar />
      <main className="pb-16 md:pb-0 min-h-screen">
        <PageHeader
          eyebrowKey="statistics.eyebrow"
          titleKey="statistics.title"
          subtitleKey="statistics.subtitle"
        />
        <LiveStatsDashboard />
      </main>
      <Footer />
      <MobileTabBar />
    </>
  );
}

import { Navbar } from '@/components/Navbar';
import { MobileTabBar } from '@/components/MobileTabBar';
import { Footer } from '@/components/Footer';
import { PageHeader } from '@/components/PageHeader';
import { CommandsExplorer } from '@/components/CommandsExplorer';

export const metadata = {
  title: 'Komutlar — Coco',
};

export default function CommandsPage() {
  return (
    <>
      <Navbar />
      <main className="pb-16 md:pb-0 min-h-screen">
        <PageHeader
          eyebrowKey="commands.eyebrow"
          titleKey="commands.title"
          subtitleKey="commands.subtitle"
        />
        <section className="px-6 pb-24">
          <CommandsExplorer />
        </section>
      </main>
      <Footer />
      <MobileTabBar />
    </>
  );
}

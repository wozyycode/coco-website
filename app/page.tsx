import { Navbar } from '@/components/Navbar';
import { MobileTabBar } from '@/components/MobileTabBar';
import { Hero } from '@/components/Hero';
import { Features } from '@/components/Features';
import { Footer } from '@/components/Footer';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="pb-16 md:pb-0">
        <Hero />
        <Features />
      </main>
      <Footer />
      <MobileTabBar />
    </>
  );
}

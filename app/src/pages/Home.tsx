import LenisProvider from '@/components/LenisProvider';
import HeroSection from '@/sections/HeroSection';
import PhilosophySection from '@/sections/PhilosophySection';
import CurriculumCore from '@/sections/CurriculumCore';
import TheoryHub from '@/sections/TheoryHub';
import GallerySection from '@/sections/GallerySection';
import FooterSection from '@/sections/FooterSection';

export default function Home() {
  return (
    <LenisProvider>
      <main className="relative min-h-screen bg-zen-void">
        <HeroSection />
        <PhilosophySection />
        <CurriculumCore />
        <TheoryHub />
        <GallerySection />
        <FooterSection />
      </main>
    </LenisProvider>
  );
}

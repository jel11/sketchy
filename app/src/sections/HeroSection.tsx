import ZenFluidVoid from '@/components/ZenFluidVoid';
import { ArrowDown, Pencil } from 'lucide-react';

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative w-full h-screen overflow-hidden flex items-center justify-center"
    >
      <ZenFluidVoid />

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <div className="glass-card p-8 md:p-12">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Pencil className="w-5 h-5 text-zen-glow" />
            <span className="font-mono text-xs text-zen-muted tracking-widest uppercase">
              Digital Art Course
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight">
            <span className="text-zen-text">Zero to </span>
            <span className="font-display italic text-gradient">Manga</span>
          </h1>

          <p className="text-zen-muted text-base md:text-lg leading-relaxed mb-8 max-w-xl mx-auto">
            16-недельная программа обучения цифровому рисованию. От первой линии до собственной манги.
            Оптимизировано для Samsung Galaxy S23 Ultra и Autodesk SketchBook.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#curriculum"
              className="inline-flex items-center gap-2 px-8 py-3 bg-zen-ink hover:bg-zen-glow text-white font-medium rounded-full transition-all duration-300 hover:shadow-glow hover:-translate-y-0.5"
            >
              Начать с Недели 1
              <ArrowDown className="w-4 h-4" />
            </a>
            <a
              href="#roadmap"
              className="inline-flex items-center gap-2 px-8 py-3 glass-button text-zen-text font-medium rounded-full"
            >
              Весь план
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <ArrowDown className="w-5 h-5 text-zen-muted/50" />
      </div>
    </section>
  );
}

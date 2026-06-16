import { useRef, useEffect, useState } from 'react';
import { modules } from '@/data/curriculum';
import ModulePanel from '@/components/ModulePanel';

export default function CurriculumCore() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const rawProgress = Math.max(0, Math.min(1, scrolled / sectionHeight));
      setProgress(rawProgress);
      const newIndex = Math.min(
        modules.length - 1,
        Math.floor(rawProgress * modules.length)
      );
      setActiveIndex(newIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentModule = modules[activeIndex];

  return (
    <section
      ref={sectionRef}
      id="curriculum"
      className="relative w-full"
      style={{ height: `${modules.length * 100}vh` }}
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="absolute inset-0 flex">
          {/* Left: Module text */}
          <div className="w-full lg:w-1/2 h-full flex items-center px-6 md:px-12 lg:px-16 z-10">
            <div className="w-full max-w-xl">
              {/* Module navigation dots */}
              <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
                {modules.map((m, i) => (
                  <button
                    key={m.index}
                    onClick={() => {
                      const section = sectionRef.current;
                      if (!section) return;
                      const sectionTop = section.offsetTop;
                      const sectionHeight = section.offsetHeight - window.innerHeight;
                      const targetScroll =
                        sectionTop + (sectionHeight / modules.length) * i;
                      window.scrollTo({
                        top: targetScroll,
                        behavior: 'smooth',
                      });
                    }}
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono transition-all duration-300 ${
                      i === activeIndex
                        ? 'bg-zen-ink text-white shadow-glow'
                        : 'bg-white/5 text-zen-muted hover:bg-white/10'
                    }`}
                  >
                    {m.index + 1}
                  </button>
                ))}
              </div>

              {/* Progress bar */}
              <div className="w-full h-0.5 bg-white/10 rounded-full mb-8 overflow-hidden">
                <div
                  className="h-full bg-zen-ink rounded-full transition-all duration-100"
                  style={{ width: `${progress * 100}%` }}
                />
              </div>

              {/* Module content */}
              <div className="transition-all duration-300">
                <ModulePanel module={currentModule} />
              </div>
            </div>
          </div>

          {/* Right: Visual */}
          <div className="hidden lg:flex w-1/2 h-full items-center justify-center p-8">
            <div className="relative w-full max-w-md aspect-[3/4] rounded-2xl overflow-hidden">
              {modules.map((m, i) => (
                <img
                  key={m.index}
                  src={m.image}
                  alt={m.title}
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
                    i === activeIndex
                      ? 'opacity-100 scale-100'
                      : 'opacity-0 scale-105'
                  }`}
                />
              ))}
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-zen-void/80 via-transparent to-zen-void/20" />
              {/* Module label */}
              <div className="absolute bottom-6 left-6 right-6">
                <span className="font-mono text-xs text-zen-glow tracking-wider">
                  {currentModule.label}
                </span>
                <h3 className="text-2xl font-bold text-white mt-1">
                  {currentModule.title}
                </h3>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile image */}
        <div className="lg:hidden absolute bottom-0 left-0 right-0 h-48 overflow-hidden">
          <img
            src={currentModule.image}
            alt={currentModule.title}
            className="w-full h-full object-cover object-top opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zen-void via-zen-void/50 to-transparent" />
        </div>
      </div>
    </section>
  );
}

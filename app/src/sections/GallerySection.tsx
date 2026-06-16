import { useRef, useEffect, useState } from 'react';
import WashImage from '@/components/WashImage';
import { modules } from '@/data/curriculum';
import { Star, TrendingUp } from 'lucide-react';

const galleryImages = [
  { src: '/assets/gallery-01.jpg', title: 'Экшен-сцена', subtitle: 'Speedlines + динамика' },
  { src: '/assets/module-01-lines.jpg', title: 'Линии', subtitle: 'Базовые штрихи' },
  { src: '/assets/module-05-anatomy.jpg', title: 'Анатомия', subtitle: 'Пропорции тела' },
  { src: '/assets/module-06-head.jpg', title: 'Голова', subtitle: 'Конструкция лица' },
  { src: '/assets/module-04-perspective.jpg', title: 'Перспектива', subtitle: 'Глубина сцены' },
  { src: '/assets/module-07-poses.jpg', title: 'Движение', subtitle: 'Gesture drawing' },
];

export default function GallerySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="roadmap"
      className="relative w-full py-24 md:py-32 px-6"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="font-mono text-xs text-zen-glow tracking-widest uppercase mb-4 block">
            Вдохновение
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-zen-text mb-4">
            Галерея <span className="font-display italic text-gradient">прогресса</span>
          </h2>
          <p className="text-zen-muted text-base md:text-lg max-w-xl mx-auto">
            Это то, к чему ты идёшь. Каждый мастер когда-то начинал с первой линии.
            Твой прогресс будет здесь.
          </p>
        </div>

        {/* Stats */}
        <div
          className={`grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 transition-all duration-700 delay-200 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="glass-card p-4 text-center">
            <Star className="w-5 h-5 text-zen-glow mx-auto mb-2" />
            <div className="text-2xl font-bold text-zen-text">8</div>
            <div className="text-xs text-zen-muted">Модулей</div>
          </div>
          <div className="glass-card p-4 text-center">
            <TrendingUp className="w-5 h-5 text-zen-glow mx-auto mb-2" />
            <div className="text-2xl font-bold text-zen-text">16</div>
            <div className="text-xs text-zen-muted">Недель</div>
          </div>
          <div className="glass-card p-4 text-center">
            <Star className="w-5 h-5 text-zen-glow mx-auto mb-2" />
            <div className="text-2xl font-bold text-zen-text">32+</div>
            <div className="text-xs text-zen-muted">Упражнений</div>
          </div>
          <div className="glass-card p-4 text-center">
            <TrendingUp className="w-5 h-5 text-zen-glow mx-auto mb-2" />
            <div className="text-2xl font-bold text-zen-text">∞</div>
            <div className="text-xs text-zen-muted">Возможностей</div>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {galleryImages.map((img, i) => (
            <div
              key={img.title}
              className={`transition-all duration-700 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${300 + i * 100}ms` }}
            >
              <WashImage
                src={img.src}
                alt={img.title}
                className={`${i === 0 ? 'col-span-2 md:col-span-2 aspect-[16/9]' : 'aspect-[3/4]'}`}
              />
              <div className="mt-2 px-1">
                <h4 className="text-sm font-medium text-zen-text">{img.title}</h4>
                <p className="text-xs text-zen-muted">{img.subtitle}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 16-Week Roadmap */}
        <div
          className={`mt-20 transition-all duration-700 delay-500 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h3 className="text-xl font-semibold text-zen-text mb-6 text-center">
            Полный план на 16 недель
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {modules.map((m, i) => (
              <div key={m.index} className="glass-card p-4 hover:border-zen-glow/50 transition-all duration-300 hover:-translate-y-1">
                <span className="font-mono text-[10px] text-zen-glow tracking-wider">
                  НЕДЕЛИ {i * 2 + 1}-{i * 2 + 2}
                </span>
                <h4 className="text-sm font-semibold text-zen-text mt-1">{m.title}</h4>
                <p className="text-xs text-zen-muted mt-1 line-clamp-2">
                  {m.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

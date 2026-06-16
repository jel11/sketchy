import { useRef, useEffect, useState } from 'react';
import { theoryTopics } from '@/data/curriculum';
import { BookOpen, Eye, Settings, PenTool, Users, Lightbulb } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Основы: <Users className="w-4 h-4" />,
  Теория: <BookOpen className="w-4 h-4" />,
  Инструменты: <Settings className="w-4 h-4" />,
  Техника: <PenTool className="w-4 h-4" />,
  Анатомия: <Eye className="w-4 h-4" />,
};

export default function TheoryHub() {
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
      id="theory"
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
            База знаний
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-zen-text mb-4">
            Теория и <span className="font-display italic text-gradient">советы</span>
          </h2>
          <p className="text-zen-muted text-base md:text-lg max-w-xl mx-auto">
            Короткие, конкретные правила, которые нужно запомнить. Без воды — только то,
            что реально поможет рисовать лучше.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {theoryTopics.map((topic, i) => {
            const isLarge = i === 0 || i === 3;
            return (
              <div
                key={topic.title}
                className={`glass-card overflow-hidden transition-all duration-700 ${
                  isLarge ? 'md:row-span-2' : ''
                } ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {/* Image */}
                <div
                  className={`relative overflow-hidden ${isLarge ? 'h-48 md:h-64' : 'h-40'}`}
                >
                  <img
                    src={topic.image}
                    alt={topic.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zen-void via-zen-void/30 to-transparent" />
                  {/* Tag */}
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-zen-ink/80 text-white backdrop-blur-sm">
                      {iconMap[topic.tag] || <Lightbulb className="w-3 h-3" />}
                      {topic.tag}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-zen-text mb-2">
                    {topic.title}
                  </h3>
                  <p className="text-sm text-zen-muted leading-relaxed">
                    {topic.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

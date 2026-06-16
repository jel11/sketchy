import { useRef, useEffect, useState } from 'react';
import { Sparkles, Layers, Undo2 } from 'lucide-react';

export default function PhilosophySection() {
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
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="philosophy"
      className="relative w-full py-24 md:py-32 px-6"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text */}
          <div
            className={`transition-all duration-700 ${
              visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
          >
            <span className="font-mono text-xs text-zen-glow tracking-widest uppercase mb-4 block">
              Философия
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-zen-text mb-6 leading-tight">
              Цифровые чернила{' '}
              <span className="font-display italic text-gradient">не размазываются</span>
            </h2>
            <p className="text-zen-muted text-base md:text-lg leading-relaxed mb-6">
              Ошибки — это просто Ctrl+Z. Мы начинаем с конструкторских линий, а не с
              шедевров. Каждый мастер был новичком. Каждый мастер рисовал кривые линии,
              прежде чем их выпрямил.
            </p>
            <p className="text-zen-muted text-base md:text-lg leading-relaxed mb-8">
              Рисование — это навык, а не талант. Навык тренируется. Повторение + обратная
              связь = прогресс. Твой S Pen — это твоя кисть. SketchBook — твой холст.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="glass-card p-4 text-center">
                <Sparkles className="w-5 h-5 text-zen-glow mx-auto mb-2" />
                <span className="text-sm text-zen-text font-medium">Рисуй каждый день</span>
              </div>
              <div className="glass-card p-4 text-center">
                <Layers className="w-5 h-5 text-zen-glow mx-auto mb-2" />
                <span className="text-sm text-zen-text font-medium">Строй слои</span>
              </div>
              <div className="glass-card p-4 text-center">
                <Undo2 className="w-5 h-5 text-zen-glow mx-auto mb-2" />
                <span className="text-sm text-zen-text font-medium">Не бойся ошибок</span>
              </div>
            </div>
          </div>

          {/* Animated Demo */}
          <div
            className={`flex items-center justify-center transition-all duration-700 delay-200 ${
              visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              {/* Grid background */}
              <div className="absolute inset-0 opacity-20">
                <div
                  className="w-full h-full"
                  style={{
                    backgroundImage:
                      'linear-gradient(rgba(99,102,241,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.3) 1px, transparent 1px)',
                    backgroundSize: '20px 20px',
                  }}
                />
              </div>

              {/* Animated construction: square → circle */}
              <svg
                viewBox="0 0 200 200"
                className="w-full h-full"
                fill="none"
              >
                {/* Square outline */}
                <rect
                  x="40"
                  y="40"
                  width="120"
                  height="120"
                  stroke="rgba(99,102,241,0.3)"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                >
                  <animate
                    attributeName="opacity"
                    values="1;0.3;1"
                    dur="4s"
                    repeatCount="indefinite"
                  />
                </rect>

                {/* Diagonal construction lines */}
                <line
                  x1="40"
                  y1="40"
                  x2="160"
                  y2="160"
                  stroke="rgba(99,102,241,0.2)"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                >
                  <animate
                    attributeName="opacity"
                    values="0.5;0.1;0.5"
                    dur="4s"
                    repeatCount="indefinite"
                  />
                </line>
                <line
                  x1="160"
                  y1="40"
                  x2="40"
                  y2="160"
                  stroke="rgba(99,102,241,0.2)"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                >
                  <animate
                    attributeName="opacity"
                    values="0.5;0.1;0.5"
                    dur="4s"
                    repeatCount="indefinite"
                  />
                </line>

                {/* Center cross */}
                <line
                  x1="100"
                  y1="30"
                  x2="100"
                  y2="170"
                  stroke="rgba(99,102,241,0.25)"
                  strokeWidth="1"
                />
                <line
                  x1="30"
                  y1="100"
                  x2="170"
                  y2="100"
                  stroke="rgba(99,102,241,0.25)"
                  strokeWidth="1"
                />

                {/* Circle that appears */}
                <circle
                  cx="100"
                  cy="100"
                  r="60"
                  stroke="#6366F1"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="377"
                  strokeDashoffset="377"
                  strokeLinecap="round"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    values="377;0;377"
                    dur="4s"
                    repeatCount="indefinite"
                    keyTimes="0;0.5;1"
                  />
                  <animate
                    attributeName="stroke-width"
                    values="2;3;2"
                    dur="4s"
                    repeatCount="indefinite"
                  />
                </circle>

                {/* Inner circle (head guide) */}
                <circle
                  cx="100"
                  cy="100"
                  r="42"
                  stroke="rgba(129,140,248,0.4)"
                  strokeWidth="1"
                  fill="none"
                  strokeDasharray="264"
                  strokeDashoffset="264"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    values="264;0;264"
                    dur="4s"
                    repeatCount="indefinite"
                    keyTimes="0;0.3;1"
                  />
                </circle>

                {/* Dot at center */}
                <circle cx="100" cy="100" r="3" fill="#818CF8">
                  <animate
                    attributeName="r"
                    values="2;4;2"
                    dur="4s"
                    repeatCount="indefinite"
                  />
                </circle>
              </svg>

              {/* Floating label */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 font-mono text-[10px] text-zen-muted/60 tracking-wider uppercase whitespace-nowrap">
                Circle ← Square
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

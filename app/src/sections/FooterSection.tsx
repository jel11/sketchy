import { Heart, Pencil } from 'lucide-react';

export default function FooterSection() {
  return (
    <footer className="relative w-full py-16 md:py-24 px-6 border-t border-white/5">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Pencil className="w-5 h-5 text-zen-glow" />
          <span className="font-mono text-xs text-zen-muted tracking-widest uppercase">
            SketchZero
          </span>
        </div>

        <h2 className="text-3xl md:text-5xl font-bold text-zen-text mb-4 font-display italic">
          Продолжай рисовать
        </h2>
        <p className="text-zen-muted text-base md:text-lg mb-8 max-w-md mx-auto">
          Каждая линия — это шаг вперёд. Каждый рисунок — это прогресс.
          Не останавливайся.
        </p>

        <div className="flex items-center justify-center gap-1 text-sm text-zen-muted/60">
          <span>Сделано с</span>
          <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400" />
          <span>для художников</span>
        </div>

        <div className="mt-8 pt-6 border-t border-white/5">
          <p className="font-mono text-[10px] text-zen-muted/40 tracking-wider">
            © 2026 SketchZero. Учись рисовать. Создавай мангу.
          </p>
        </div>
      </div>
    </footer>
  );
}

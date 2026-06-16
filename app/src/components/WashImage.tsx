import { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface WashImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function WashImage({ src, alt, className }: WashImageProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={wrapperRef}
      className={cn(
        'relative overflow-hidden rounded-xl',
        'transition-all duration-1000 ease-out',
        revealed ? 'opacity-100 scale-100' : 'opacity-0 scale-110',
        className
      )}
    >
      <div
        className={cn(
          'transition-all duration-1000 ease-out',
          revealed ? 'scale-100' : 'scale-90'
        )}
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div
        className={cn(
          'absolute inset-0 bg-gradient-to-t from-zen-void/60 to-transparent',
          'transition-opacity duration-700',
          revealed ? 'opacity-100' : 'opacity-0'
        )}
      />
    </div>
  );
}

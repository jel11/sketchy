import { cn } from '@/lib/utils';
import { type ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function GlassCard({ children, className, hover = true }: GlassCardProps) {
  return (
    <div
      className={cn(
        'glass-card p-6 md:p-8 transition-all duration-300',
        hover && 'hover:border-zen-glow/50 hover:-translate-y-1 hover:shadow-glow',
        className
      )}
    >
      {children}
    </div>
  );
}

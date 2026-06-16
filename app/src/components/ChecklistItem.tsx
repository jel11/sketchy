import { useState, useEffect } from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChecklistItemProps {
  moduleIndex: number;
  taskIndex: number;
  text: string;
}

function getStorageKey(moduleIndex: number, taskIndex: number) {
  return `sketchzero-checklist-${moduleIndex}-${taskIndex}`;
}

export default function ChecklistItem({ moduleIndex, taskIndex, text }: ChecklistItemProps) {
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(getStorageKey(moduleIndex, taskIndex));
    setCompleted(stored === 'true');
  }, [moduleIndex, taskIndex]);

  const toggle = () => {
    const newVal = !completed;
    setCompleted(newVal);
    localStorage.setItem(getStorageKey(moduleIndex, taskIndex), String(newVal));
  };

  return (
    <button
      onClick={toggle}
      className={cn(
        'flex items-center gap-3 w-full text-left p-3 rounded-lg transition-all duration-200',
        'hover:bg-white/5 active:scale-[0.98]',
        completed && 'opacity-50'
      )}
    >
      <div
        className={cn(
          'flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200',
          completed
            ? 'bg-zen-ink border-zen-ink'
            : 'border-zen-muted/40 hover:border-zen-glow'
        )}
      >
        {completed && <Check className="w-3 h-3 text-white" />}
      </div>
      <span
        className={cn(
          'text-sm text-zen-text transition-all duration-200',
          completed && 'line-through text-zen-muted'
        )}
      >
        {text}
      </span>
    </button>
  );
}

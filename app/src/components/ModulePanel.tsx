import ChecklistItem from './ChecklistItem';
import { Pencil, ArrowRight } from 'lucide-react';

export interface ModuleData {
  index: number;
  label: string;
  title: string;
  description: string;
  image: string;
  tasks: string[];
  sketchbookTip: string;
}

interface ModulePanelProps {
  module: ModuleData;
}

export default function ModulePanel({ module }: ModulePanelProps) {
  return (
    <div className="flex flex-col h-full justify-center max-w-lg">
      <span className="font-mono text-xs text-zen-glow tracking-widest uppercase mb-3">
        {module.label}
      </span>
      <h2 className="text-4xl md:text-5xl font-bold text-zen-text mb-4 leading-tight">
        {module.title}
      </h2>
      <p className="text-zen-muted text-base md:text-lg leading-relaxed mb-6">
        {module.description}
      </p>

      <div className="glass-card p-4 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Pencil className="w-4 h-4 text-zen-glow" />
          <span className="text-sm font-medium text-zen-text">Практика</span>
        </div>
        <div className="space-y-1">
          {module.tasks.map((task, i) => (
            <ChecklistItem
              key={i}
              moduleIndex={module.index}
              taskIndex={i}
              text={task}
            />
          ))}
        </div>
      </div>

      <div className="glass-card p-4 border-l-2 border-l-zen-ink">
        <span className="text-xs font-mono text-zen-muted uppercase tracking-wider">SketchBook</span>
        <p className="text-sm text-zen-text mt-1">{module.sketchbookTip}</p>
      </div>

      <button className="mt-6 inline-flex items-center gap-2 text-zen-glow hover:text-white transition-colors text-sm font-medium group">
        Перейти к уроку
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
}

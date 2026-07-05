import { Navigation, Timer, Route, Lightbulb, ArrowRight } from "lucide-react";

const EXAMPLES = [
  {
    text: "What's the traffic like from Silk Board to ORR at 8:45 AM?",
    icon: Navigation,
  },
  {
    text: "Should I leave Electronic City for Whitefield at 7:30 AM or 9:15 AM?",
    icon: Timer,
  },
  {
    text: "What's the route from Jayanagar to Koramangala at 9 AM?",
    icon: Route,
  },
];

const CAPABILITIES = [
  {
    icon: Route,
    title: "Route Analysis",
    desc: "Real route geometry with congestion visualization",
  },
  {
    icon: Lightbulb,
    title: "AI Reasoning",
    desc: "Knows Bengaluru's worst bottlenecks",
  },
  {
    icon: Timer,
    title: "Departure Planning",
    desc: "Compare travel times across different hours",
  },
];

export default function EmptyState({ onSend }) {
  const handleClick = (text) => {
    onSend(text);
  };

  return (
    <div className="flex flex-col items-center justify-center flex-1 mx-auto w-full max-w-[600px] px-6 text-center">
      <div className="mb-6 animate-fade-slide-up">
        <div className="relative inline-flex mb-4">
          <svg width="56" height="56" viewBox="0 0 48 48" fill="none" className="animate-glow-pulse">
            <circle cx="24" cy="24" r="3" fill="#f59e0b" />
            <path d="M18 24L22 20L26 24" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <path d="M30 24L26 28L22 24" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.4" />
            <circle cx="24" cy="24" r="18" stroke="#f59e0b" strokeWidth="1" opacity="0.1" fill="none" />
            <circle cx="24" cy="24" r="22" stroke="#f59e0b" strokeWidth="0.5" opacity="0.05" fill="none" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-neutral-100 mb-2">
          Ask about your Bengaluru commute
        </h2>
        <p className="text-sm text-neutral-500 max-w-md mx-auto leading-relaxed">
          Get real-time route analysis, congestion estimates, and departure time comparisons powered by live traffic data and AI reasoning.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-2.5 mb-8 w-full max-w-[480px]">
        {CAPABILITIES.map((cap, i) => {
          const CapIcon = cap.icon;
          return (
            <div
              key={i}
              className="animate-fade-slide-up flex-1 min-w-[130px] max-w-[160px] bg-neutral-900/50 border border-neutral-800/30 rounded-xl p-3"
              style={{ animationDelay: `${150 + i * 100}ms` }}
            >
              <div className="flex flex-col items-center gap-1.5">
                <CapIcon size={16} className="text-amber-500/70 shrink-0" />
                <span className="text-[11px] font-semibold text-neutral-300 leading-tight">{cap.title}</span>
                <span className="text-[10px] text-neutral-500 leading-tight">{cap.desc}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col gap-2 w-full max-w-[480px]">
        {EXAMPLES.map((ex, i) => {
          const Icon = ex.icon;
          return (
            <button
              key={i}
              onClick={() => handleClick(ex.text)}
              className="animate-fade-slide-up group flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl bg-neutral-900/60 border-l-2 border-amber-500/30 border border-neutral-800/40 text-sm text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/60 hover:border-neutral-700/50 hover:-translate-y-0.5 transition-all duration-150 active:scale-[0.98]"
              style={{ animationDelay: `${400 + i * 120}ms` }}
            >
              <Icon size={16} className="shrink-0 text-amber-500/60" />
              <span className="leading-snug flex-1">{ex.text}</span>
              <ArrowRight size={14} className="shrink-0 text-neutral-600 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
            </button>
          );
        })}
      </div>
    </div>
  );
}

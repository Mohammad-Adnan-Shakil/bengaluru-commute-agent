import { Navigation, Timer, Route } from "lucide-react";

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

export default function EmptyState({ onSend }) {
  const handleClick = (text) => {
    onSend(text);
  };

  return (
    <div className="flex flex-col items-center justify-center flex-1 mx-auto w-full max-w-[600px] px-6 text-center">
      <div className="mb-8">
        <svg width="64" height="64" viewBox="0 0 48 48" fill="none" className="mx-auto mb-5 opacity-70">
          <circle cx="24" cy="24" r="3" fill="#f59e0b" />
          <path d="M18 24L22 20L26 24" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <path d="M30 24L26 28L22 24" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.4" />
          <circle cx="24" cy="24" r="18" stroke="#f59e0b" strokeWidth="1" opacity="0.1" fill="none" />
          <circle cx="24" cy="24" r="22" stroke="#f59e0b" strokeWidth="0.5" opacity="0.05" fill="none" />
        </svg>
        <h2 className="text-xl font-semibold text-neutral-100 mb-2">
          Ask about your Bengaluru commute
        </h2>
        <p className="text-sm text-neutral-500 max-w-md mx-auto leading-relaxed">
          Get real-time route analysis, congestion estimates, and departure time comparisons powered by live traffic data.
        </p>
      </div>

      <div className="flex flex-col gap-2.5 w-full max-w-[480px]">
        {EXAMPLES.map((ex, i) => {
          const Icon = ex.icon;
          return (
            <button
              key={i}
              onClick={() => handleClick(ex.text)}
              className="flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl bg-neutral-900/60 border border-neutral-800/40 text-sm text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/60 hover:border-neutral-700/50 transition-all duration-150 active:scale-[0.98]"
            >
              <Icon size={16} className="shrink-0 text-amber-500/60" />
              <span className="leading-snug">{ex.text}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

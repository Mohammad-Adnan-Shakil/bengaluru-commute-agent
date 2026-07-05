import { MapPin, AlertTriangle, Clock, Check } from "lucide-react";

const TOOL_ICONS = {
  get_route: MapPin,
  check_bottleneck: AlertTriangle,
  compare_departure_times: Clock,
};

export default function LoadingIndicator({ activeTools }) {
  const tools = activeTools || ["get_route", "check_bottleneck"];
  const stepDurations = tools.map((_, i) => (i + 1) * 200);

  return (
    <div className="flex flex-col items-start gap-3 px-1 py-3" role="status" aria-label="Agent is thinking">
      <div className="text-xs font-medium text-neutral-500 tracking-wide uppercase">
        Reasoning
      </div>
      <div className="flex flex-col gap-2">
        {tools.map((tool, i) => {
          const Icon = TOOL_ICONS[tool] || MapPin;
          const isLast = i === tools.length - 1;
          return (
            <div key={i} className="flex items-start gap-2">
              <div className="flex flex-col items-center gap-0.5">
                <div
                  className="animate-fade-slide-up flex items-center justify-center w-5 h-5 rounded-full bg-neutral-800/60 border border-neutral-700/40"
                  style={{ animationDelay: `${i * 200}ms` }}
                >
                  <Icon size={10} className="text-neutral-500" />
                </div>
                {!isLast && (
                  <div className="w-px h-3 bg-neutral-800/60" />
                )}
              </div>
              <span
                className="animate-fade-slide-up inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-neutral-800/60 border border-neutral-700/40 text-xs font-mono text-neutral-400 animate-shimmer"
                style={{ animationDelay: `${i * 200}ms` }}
              >
                {tool === "get_route" && "Fetching route"}
                {tool === "check_bottleneck" && "Checking congestion"}
                {tool === "compare_departure_times" && "Comparing times"}
                {![ "get_route", "check_bottleneck", "compare_departure_times" ].includes(tool) && tool}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

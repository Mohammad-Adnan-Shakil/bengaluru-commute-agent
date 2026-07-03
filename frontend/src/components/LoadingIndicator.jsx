import { MapPin, AlertTriangle, Clock } from "lucide-react";

export default function LoadingIndicator({ activeTools }) {
  const tools = activeTools || ["get_route", "check_bottleneck"];

  return (
    <div className="flex flex-col items-start gap-2 px-1 py-2" role="status" aria-label="Agent is thinking">
      <div className="text-xs font-medium text-neutral-500 tracking-wide uppercase">
        Reasoning
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {tools.map((tool, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-neutral-800/60 border border-neutral-700/40 text-xs font-mono text-neutral-400 animate-shimmer"
            style={{ animationDelay: `${i * 200}ms` }}
          >
            {tool === "get_route" && <MapPin size={12} />}
            {tool === "check_bottleneck" && <AlertTriangle size={12} />}
            {tool === "compare_departure_times" && <Clock size={12} />}
            {tool}
          </span>
        ))}
      </div>
    </div>
  );
}

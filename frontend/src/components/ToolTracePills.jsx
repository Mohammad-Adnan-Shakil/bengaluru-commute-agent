import { MapPin, AlertTriangle, Clock, Check, X, Loader2 } from "lucide-react";

const TOOL_CONFIG = {
  get_route: { icon: MapPin, label: "Fetch route" },
  check_bottleneck: { icon: AlertTriangle, label: "Check congestion" },
  compare_departure_times: { icon: Clock, label: "Compare times" },
};

export default function ToolTracePills({ tools, status }) {
  if (!tools || tools.length === 0) return null;

  const pillStatus = status || tools.map(() => "completed");

  return (
    <div className="flex flex-wrap items-center gap-1.5 mb-3" role="list" aria-label="Tools used">
      {tools.map((tool, i) => {
        const config = TOOL_CONFIG[tool] || { icon: MapPin, label: tool };
        const Icon = config.icon;
        const st = pillStatus[i] || "completed";

        const baseClasses = "inline-flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-mono font-medium transition-all duration-300";
        const stateClasses = {
          pending: "bg-neutral-800/40 border border-neutral-700/30 text-neutral-500",
          active: "bg-amber-500/10 border border-amber-500/20 text-amber-400/90",
          completed: "bg-green-500/10 border border-green-500/20 text-green-400/90",
          error: "bg-red-500/10 border border-red-500/20 text-red-400/90",
        }[st] || "bg-amber-500/8 border border-amber-500/15 text-amber-400/90";

        return (
          <span
            key={i}
            role="listitem"
            className={`${baseClasses} ${stateClasses} animate-check-in`}
            style={{ animationDelay: `${i * 80}ms` }}
          >
            {st === "pending" && <Icon size={12} className="shrink-0" />}
            {st === "active" && <Loader2 size={12} className="shrink-0 animate-spin-slow" />}
            {st === "completed" && <Check size={12} className="shrink-0" />}
            {st === "error" && <X size={12} className="shrink-0" />}
            {st === "completed" ? null : <span>{config.label}</span>}
            {st === "completed" && <span className="text-[11px]">{config.label}</span>}
          </span>
        );
      })}
    </div>
  );
}

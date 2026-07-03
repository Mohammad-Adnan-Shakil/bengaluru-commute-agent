import { MapPin, AlertTriangle, Clock } from "lucide-react";

const TOOL_CONFIG = {
  get_route: { icon: MapPin, label: "Fetch route" },
  check_bottleneck: { icon: AlertTriangle, label: "Check congestion" },
  compare_departure_times: { icon: Clock, label: "Compare times" },
};

export default function ToolTracePills({ tools }) {
  if (!tools || tools.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-1.5 mb-3" role="list" aria-label="Tools used">
      {tools.map((tool, i) => {
        const config = TOOL_CONFIG[tool] || { icon: MapPin, label: tool };
        const Icon = config.icon;
        return (
          <span
            key={i}
            role="listitem"
            className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-amber-500/8 border border-amber-500/15 text-[11px] font-mono font-medium text-amber-400/90"
          >
            <Icon size={12} className="shrink-0" />
            <span>{config.label}</span>
          </span>
        );
      })}
    </div>
  );
}

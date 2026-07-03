import ToolTracePills from "./ToolTracePills";
import RouteMap from "./RouteMap";

function extractCongestion(text) {
  const upper = text.toUpperCase();
  if (upper.includes("HIGH")) return "high";
  if (upper.includes("MEDIUM") || upper.includes("MODERATE")) return "medium";
  if (upper.includes("LOW")) return "low";
  return null;
}

function extractCorridor(text) {
  const corridors = [
    { id: "silk_board_orr", names: ["silk board", "outer ring road", "silk board–orr", "silk board to orr"] },
    { id: "whitefield_stretch", names: ["whitefield", "marathahalli", "whitefield–marathahalli"] },
    { id: "hebbal", names: ["hebbal"] },
    { id: "electronic_city", names: ["electronic city", "hosur road", "electronic city–hosur"] },
  ];
  const lower = text.toLowerCase();
  for (const c of corridors) {
    if (c.names.some((n) => lower.includes(n))) return c.id;
  }
  return null;
}

export default function MessageBubble({ message, index }) {
  const isUser = message.role === "user";
  const isError = message.text?.startsWith("Error:") || message.text?.startsWith("Agent temporarily unavailable");

  const hasRouteData = message.routeCoordinates?.length > 1;
  const congestion = hasRouteData ? (message.congestionLevel || extractCongestion(message.text || "")) : (!isUser ? extractCongestion(message.text || "") : null);
  const corridor = hasRouteData ? "silk_board_orr" : (!isUser ? extractCorridor(message.text || "") : null);

  return (
    <div
      className={`animate-fade-slide-up ${isUser ? "flex justify-end" : "flex justify-start"}`}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {isUser ? (
        <div className="max-w-[85%] sm:max-w-md bg-amber-500/10 border border-amber-500/15 rounded-2xl px-4 py-2.5">
          <p className="text-sm text-neutral-200 leading-relaxed">{message.text}</p>
        </div>
      ) : (
        <div className="w-full max-w-full">
          <div className={`rounded-2xl border px-4 py-3 ${
            isError
              ? "bg-amber-500/5 border-amber-500/20"
              : "bg-neutral-900/70 backdrop-blur-sm border-neutral-800/50"
          }`}>
            <div className="flex items-center gap-2 mb-2">
              <svg width="16" height="16" viewBox="0 0 48 48" fill="none" className="shrink-0">
                <circle cx="24" cy="24" r="3" fill="#f59e0b" />
                <path d="M18 24L22 20L26 24" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                <circle cx="24" cy="24" r="14" stroke="#f59e0b" strokeWidth="1" opacity="0.2" />
              </svg>
              <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                Agent
              </span>
              {congestion && (
                <span className={`ml-auto text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                  congestion === "high"
                    ? "bg-red-500/10 text-red-400 border border-red-500/20"
                    : congestion === "medium"
                    ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                    : "bg-green-500/10 text-green-400 border border-green-500/20"
                }`}>
                  {congestion} congestion
                </span>
              )}
            </div>
            <ToolTracePills tools={message.tools} />
            <p className={`text-sm leading-relaxed ${
              isError ? "text-amber-300/80" : "text-neutral-200"
            }`}>
              {message.text}
            </p>
            {(corridor || hasRouteData) && !isError && (
              <RouteMap
                corridor={corridor}
                congestion={congestion}
                routeCoordinates={message.routeCoordinates}
                bottleneckIndices={message.bottleneckIndices}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

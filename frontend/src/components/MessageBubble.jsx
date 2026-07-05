import { Route, Clock, AlertTriangle } from "lucide-react";
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

function extractKeyInsight(text, congestion) {
  if (!text) return null;
  const triggerWords = ["recommend", "suggest", "consider", "delay", "should", "better", "avoid", "instead", "best"];
  const sentences = text.split(/(?<=[.!])\s+/);
  const insightSentence = sentences.find((s) =>
    triggerWords.some((w) => s.toLowerCase().includes(w))
  );
  if (insightSentence) return insightSentence.trim();
  if (sentences.length > 0) return sentences[sentences.length - 1].trim();
  return null;
}

function extractRouteStats(text) {
  const distanceMatch = text.match(/(\d+(?:\.\d+)?)\s*(?:km|kilometers)/i);
  const durationMatch = text.match(/(\d+)\s*(?:min|minutes|mins)/i);
  const delayMatch = text.match(/(\d+(?:\.\d+)?)x/i);
  return {
    distance: distanceMatch ? distanceMatch[0] : null,
    duration: durationMatch ? durationMatch[0] : null,
    delay: delayMatch ? `${delayMatch[1]}x delay` : null,
  };
}

export default function MessageBubble({ message, index }) {
  const isUser = message.role === "user";
  const isError = message.text?.startsWith("Error:") || message.text?.startsWith("Agent temporarily unavailable");

  const hasRouteData = message.routeCoordinates?.length > 1;
  const congestion = hasRouteData
    ? (message.congestionLevel || extractCongestion(message.text || ""))
    : (!isUser ? extractCongestion(message.text || "") : null);
  const corridor = hasRouteData ? "silk_board_orr" : (!isUser ? extractCorridor(message.text || "") : null);

  const insight = !isUser && message.text ? extractKeyInsight(message.text, congestion) : null;
  const stats = !isUser && hasRouteData ? extractRouteStats(message.text || "") : null;

  const congestionBorder = {
    high: "border-l-red-500/50",
    medium: "border-l-amber-500/50",
    low: "border-l-green-500/50",
  }[congestion] || "border-l-amber-500/30";

  return (
    <div
      className={`animate-fade-slide-up ${isUser ? "flex justify-end" : "flex justify-start"}`}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {isUser ? (
        <div className="max-w-[85%] sm:max-w-md bg-amber-500/10 border border-amber-500/15 rounded-2xl px-4 py-3">
          <p className="text-sm text-neutral-200 leading-relaxed">{message.text}</p>
        </div>
      ) : (
        <div className="w-full max-w-full">
          <div className={`rounded-2xl border ${
            isError
              ? "bg-amber-500/5 border-amber-500/20"
              : "bg-neutral-900/70 backdrop-blur-sm border-neutral-800/50 shadow-md shadow-black/15"
          }`}>
            <div className="px-4 pt-3">
              <div className="flex items-center gap-2 mb-2.5">
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
            </div>

            {insight && !isError && (
              <div className={`mx-4 mb-3 px-3 py-2 rounded-lg bg-neutral-800/40 border-l-2 ${congestionBorder} border border-neutral-800/30`}>
                <p className="text-xs font-medium text-neutral-300 leading-relaxed">
                  {insight}
                </p>
              </div>
            )}

            {stats && hasRouteData && !isError && (
              <div className="mx-4 mb-3 flex flex-wrap items-center gap-3">
                {stats.distance && (
                  <span className="inline-flex items-center gap-1.5 text-xs text-neutral-400 bg-neutral-800/30 px-2 py-1 rounded-md">
                    <Route size={12} className="text-amber-500/60" />
                    {stats.distance}
                  </span>
                )}
                {stats.duration && (
                  <span className="inline-flex items-center gap-1.5 text-xs text-neutral-400 bg-neutral-800/30 px-2 py-1 rounded-md">
                    <Clock size={12} className="text-amber-500/60" />
                    {stats.duration}
                  </span>
                )}
                {stats.delay && (
                  <span className="inline-flex items-center gap-1.5 text-xs text-neutral-400 bg-neutral-800/30 px-2 py-1 rounded-md">
                    <AlertTriangle size={12} className="text-amber-500/60" />
                    {stats.delay}
                  </span>
                )}
              </div>
            )}

            <div className="px-4 pb-3">
              <p className={`text-sm leading-relaxed ${
                isError ? "text-amber-300/80" : "text-neutral-200"
              }`}>
                {message.text}
              </p>
            </div>

            {(corridor || hasRouteData) && !isError && (
              <div className="px-4 pb-4">
                <RouteMap
                  corridor={corridor}
                  congestion={congestion}
                  routeCoordinates={message.routeCoordinates}
                  bottleneckIndices={message.bottleneckIndices}
                />
              </div>
            )}

            {isError && (
              <div className="px-4 pb-4">
                <button
                  onClick={() => window.location.reload()}
                  className="text-xs text-amber-400/70 hover:text-amber-300 transition-colors duration-150 underline underline-offset-2"
                >
                  Try again
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

import { ArrowUp } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";

const PLACEHOLDERS = [
  "Ask about a route...",
  "e.g. Silk Board to ORR at 8:45 AM",
  "Compare departure times...",
];

export default function ChatInput({ input, setInput, sendMessage, loading }) {
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const textareaRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % PLACEHOLDERS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const autoResize = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 104)}px`;
  }, []);

  useEffect(() => {
    autoResize();
  }, [input, autoResize]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className="sticky bottom-0 w-full bg-gradient-to-t from-neutral-950 via-neutral-950/95 to-transparent pt-6 pb-safe-or-4">
      <div className="mx-auto max-w-[750px] px-4">
        <div className="flex items-end gap-2 bg-neutral-900/80 backdrop-blur-2xl border border-neutral-800/60 rounded-2xl pl-4 pr-1.5 py-1.5 shadow-lg shadow-black/25 transition-all duration-200 focus-within:border-amber-500/40 focus-within:shadow-amber-500/5">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={PLACEHOLDERS[placeholderIndex]}
            disabled={loading}
            rows={1}
            aria-label="Ask about your commute"
            className="flex-1 bg-transparent text-sm text-neutral-100 placeholder-neutral-600 py-2 outline-none border-none disabled:opacity-40 min-w-0 resize-none leading-relaxed scrollbar-thin"
          />
          <button
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            aria-label="Send message"
            className={`flex items-center justify-center w-11 h-11 rounded-xl bg-amber-500 text-black transition-all duration-150 shrink-0 ${
              !input.trim()
                ? "opacity-0 scale-75 pointer-events-none"
                : "opacity-100 scale-100 hover:brightness-110 hover:ring-2 hover:ring-amber-500/30 active:scale-90"
            } ${loading ? "disabled:opacity-30 disabled:cursor-not-allowed" : ""}`}
          >
            <ArrowUp size={18} />
          </button>
        </div>
        <p className="text-[10px] text-neutral-700 text-center mt-2">
          AI-powered — responses may vary. Verify critical route info.
        </p>
      </div>
    </div>
  );
}

import { ArrowUp } from "lucide-react";

export default function ChatInput({ input, setInput, sendMessage, loading }) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="sticky bottom-0 w-full bg-gradient-to-t from-neutral-950 via-neutral-950/95 to-transparent pt-6 pb-safe-or-4">
      <div className="mx-auto max-w-[750px] px-4">
        <div className="flex items-center gap-2 bg-neutral-900/80 backdrop-blur-xl border border-neutral-800/60 rounded-2xl pl-4 pr-1.5 py-1.5 shadow-lg shadow-black/20 transition-all duration-200 focus-within:border-amber-500/40 focus-within:shadow-amber-500/5">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about a route, or compare departure times..."
            disabled={loading}
            aria-label="Ask about your commute"
            className="flex-1 bg-transparent text-sm text-neutral-100 placeholder-neutral-600 py-2 outline-none border-none disabled:opacity-40 min-w-0"
          />
          <button
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            aria-label="Send message"
            className="flex items-center justify-center w-10 h-10 rounded-xl bg-amber-500 text-black disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-150 hover:brightness-110 active:scale-95 shrink-0"
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

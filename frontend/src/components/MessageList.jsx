import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import MessageBubble from "./MessageBubble";
import LoadingIndicator from "./LoadingIndicator";

export default function MessageList({ messages, loading }) {
  const bottomRef = useRef(null);
  const containerRef = useRef(null);
  const [showScrollBtn, setShowScrollBtn] = useState(false);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowScrollBtn(!entry.isIntersecting);
      },
      { root: container, threshold: 0 }
    );

    if (bottomRef.current) {
      observer.observe(bottomRef.current);
    }

    return () => observer.disconnect();
  }, [messages]);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const formatDate = (date) => {
    const today = new Date();
    const msgDate = new Date(date);
    if (msgDate.toDateString() === today.toDateString()) return "Today";
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    if (msgDate.toDateString() === yesterday.toDateString()) return "Yesterday";
    return msgDate.toLocaleDateString("en-IN", { month: "short", day: "numeric" });
  };

  let lastDate = null;

  return (
    <div className="relative flex-1 mx-auto w-full max-w-[750px] px-4">
      <div
        ref={containerRef}
        role="log"
        aria-live="polite"
        aria-label="Conversation with commute agent"
        className="h-full overflow-y-auto scrollbar-thin space-y-4 pb-4 pt-4 scroll-smooth"
      >
        {messages.map((msg, i) => {
          const msgDate = new Date();
          const dateLabel = formatDate(msgDate);
          const showDate = dateLabel !== lastDate;
          lastDate = dateLabel;

          return (
            <div key={i}>
              {showDate && i > 0 && (
                <div className="flex items-center gap-3 my-4">
                  <div className="flex-1 h-px bg-neutral-800/50" />
                  <span className="text-[10px] font-medium text-neutral-600 uppercase tracking-wider">
                    {dateLabel}
                  </span>
                  <div className="flex-1 h-px bg-neutral-800/50" />
                </div>
              )}
              <MessageBubble message={msg} index={i} />
            </div>
          );
        })}
        {loading && <LoadingIndicator />}
        <div ref={bottomRef} />
      </div>

      {showScrollBtn && (
        <button
          onClick={scrollToBottom}
          aria-label="Scroll to latest message"
          className="absolute bottom-4 right-6 z-20 flex items-center justify-center w-9 h-9 rounded-full bg-neutral-800/80 backdrop-blur-md border border-neutral-700/40 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-700/80 transition-all duration-150 shadow-lg shadow-black/20"
        >
          <ChevronDown size={16} />
        </button>
      )}
    </div>
  );
}

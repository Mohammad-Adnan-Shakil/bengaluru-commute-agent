import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import LoadingIndicator from "./LoadingIndicator";

export default function MessageList({ messages, loading }) {
  const bottomRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <div
      ref={containerRef}
      role="log"
      aria-live="polite"
      aria-label="Conversation with commute agent"
      className="relative flex-1 mx-auto w-full max-w-[750px] px-4 overflow-y-auto scroll-fade space-y-4 pb-4 pt-4"
    >
      {messages.map((msg, i) => (
        <MessageBubble key={i} message={msg} index={i} />
      ))}
      {loading && <LoadingIndicator />}
      <div ref={bottomRef} />
    </div>
  );
}

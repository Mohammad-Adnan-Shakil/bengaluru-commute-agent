import { useState } from 'react';

export default function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [sessionId, setSessionId] = useState(null);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:8001/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg, session_id: sessionId })
      });
      const data = await res.json();
      setSessionId(data.session_id);
      setMessages(prev => [...prev, { role: 'agent', text: data.response, tools: data.tool_trace }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'agent', text: `Error: ${err.message}`, tools: [] }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col items-center p-6">
      <h1 className="text-2xl font-semibold mb-6">Bengaluru Commute Agent</h1>

      <div className="w-full max-w-2xl flex-1 space-y-4 mb-4">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`p-4 rounded-lg ${
              m.role === 'user'
                ? 'bg-neutral-800 ml-auto max-w-md'
                : 'bg-neutral-900 border border-neutral-700'
            }`}
          >
            {m.tools && m.tools.length > 0 && (
              <div className="text-xs text-amber-400 mb-2">
                Tools used: {m.tools.join(', ')}
              </div>
            )}
            <p>{m.text}</p>
          </div>
        ))}
        {loading && <div className="text-neutral-500 text-sm">Thinking...</div>}
      </div>

      <div className="w-full max-w-2xl flex gap-2">
        <input
          className="flex-1 bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-2 outline-none focus:border-amber-500"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
          placeholder="Ask about your commute..."
        />
        <button
          onClick={sendMessage}
          className="bg-amber-500 text-black px-4 py-2 rounded-lg font-medium hover:bg-amber-400"
        >
          Send
        </button>
      </div>
    </div>
  );
}
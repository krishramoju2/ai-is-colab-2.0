
'use client';

import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import ChatEntry from '../components/ChatEntry';
import TypingLine from '../components/TypingLine';
import Examples from '@/components/Examples';
import Example2 from '@/components/Example2';

type Bot = {
  emoji: string;
  name: string;
  thoughts: string[];
  response: string;
};

type ChatRecord = {
  prompt: string;
  bots: Bot[];
};

export default function HomePage() {
  const [input, setInput] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatRecord[]>([]);
  const [typing, setTyping] = useState(false);
  const [user, setUser] = useState<{ name: string } | null>(null);

  useEffect(() => {
    setUser({ name: 'Test User' });
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newEntry: ChatRecord = { prompt: input, bots: [] };
    setChatHistory((prev) => [...prev, newEntry]);
    setTyping(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input }),
      });

      const data = await res.json();
      const updatedEntry = { ...newEntry, bots: data.responses };

      setChatHistory((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = updatedEntry;
        return updated;
      });
    } catch (error) {
      console.error('Error fetching bot responses:', error);
    } finally {
      setTyping(false);
      setInput('');
    }
  };

  return (
    <main className="p-4 sm:p-8 max-w-5xl mx-auto text-white space-y-8">
      <Navbar user={user || { name: 'Loading...' }} />

      <h1 className="text-3xl font-bold text-center text-cyan-300">
        🧠 Multi-Career GPT Terminal
      </h1>

      <Examples />
      <Example2 />

      <section className="bg-gray-900 p-6 rounded-xl shadow-xl space-y-6">
        <h2 className="text-xl font-semibold text-yellow-300">
          ✍️ Your Prompt-Based Interactions
        </h2>

        {chatHistory.map((entry, index) => (
          <div key={index} className="bg-gray-800 p-4 rounded-lg shadow">
            <p className="text-lg font-medium text-blue-400">🔍 Prompt: {entry.prompt}</p>
            <div className="mt-3 space-y-4">
              {entry.bots.map((bot, idx) => (
                <div
                  key={idx}
                  className="pl-4 border-l-4 border-green-500 hover:bg-gray-700 transition-all duration-300 rounded-md"
                >
                  <h4 className="text-green-400 font-semibold">
                    {bot.emoji} {bot.name} Bot
                  </h4>
                  <ul className="list-disc text-sm ml-5 text-gray-300 italic">
                    {bot.thoughts.map((t, i) => (
                      <li key={i}>💭 {t}</li>
                    ))}
                  </ul>
                  <p className="mt-1 text-white">
                    ✅ <strong>Response:</strong> {bot.response}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}

        {typing && <TypingLine />}
      </section>

      <div className="flex flex-col sm:flex-row gap-2 mt-4">
        <input
          className="flex-grow p-2 bg-gray-800 rounded"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type your custom prompt here..."
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-500"
        >
          Send
        </button>
      </div>
    </main>
  );
}

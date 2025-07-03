
'use client';

import React from "react";

type Bot = {
  emoji: string;
  name: string;
  thoughts: string[];
  response: string;
};

type Props = {
  user: string;
  bots: Bot[];
};

export default function ChatEntry({ user, bots }: Props) {
  return (
    <section className="my-8 p-6 bg-gray-800 rounded-xl shadow-lg space-y-6">
      <h2 className="text-lg sm:text-xl font-semibold text-yellow-300">
        🔍 Prompt: {user}
      </h2>

      {bots.map((bot, index) => (
        <div key={index} className="pl-4 border-l-4 border-blue-500">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl sm:text-2xl">{bot.emoji}</span>
            <h3 className="text-green-400 font-bold">{bot.name} Bot</h3>
          </div>
          <ul className="list-disc ml-6 text-gray-300 italic text-sm sm:text-base">
            {bot.thoughts.map((thought, i) => (
              <li key={i}>💭 {thought}</li>
            ))}
          </ul>
          <p className="mt-2 text-white">
            ✅ <strong>Response:</strong> {bot.response}
          </p>
        </div>
      ))}
    </section>
  );
}

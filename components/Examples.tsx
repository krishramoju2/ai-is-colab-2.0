
'use client';
import React, { useState } from "react";
import clsx from 'clsx';

const exampleData = [
  {
    prompt: "Analyze vulnerabilities in a submarine's communication network during a deep‑sea mission.",
    bots: [
      {
        emoji: '🛡️',
        name: 'Cyber',
        thoughts: [
          "Submarine protocols likely use outdated encryption.",
          "Potential MITM attacks if acoustic channels aren't isolated."
        ],
        response: "Ensure end-to-end encryption over acoustic comms and isolate critical subnetworks."
      },
      {
        emoji: '🌊',
        name: 'DeepSea',
        thoughts: [
          "Saltwater interferes with certain RF signals.",
          "Physical cable damage from marine fauna is a risk."
        ],
        response: "Utilize fiber-optic tethers with reinforced casings and pressure‑regulated relay nodes."
      }
    ]
  },
  {
    prompt: "Predict market trends if a Mars mining company announces Helium-3 extraction success.",
    bots: [
      {
        emoji: '📈',
        name: 'Stock',
        thoughts: [
          "Helium-3 is hyped as future nuclear fuel.",
          "Tech sector and rare‑earth ETFs will spike."
        ],
        response: "Expect speculative growth in energy and space ETFs like ARKX, and volatility in traditional oil markets."
      },
      {
        emoji: '🚀',
        name: 'Space',
        thoughts: [
          "Mars Helium‑3 mining is years from profitability.",
          "May increase funding for lunar helium initiatives."
        ],
        response: "Short‑term market spikes; long‑term depends on transport‑cost curve improvements."
      }
    ]
  }
  // You can add more examples here as needed
];

export default function Examples() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="bg-gray-900 text-white p-6 mt-6 rounded-xl shadow-xl">
      <h2 className="text-2xl font-bold text-cyan-400 mb-4">
        🔥 Example Prompts with Bot Thoughts & Answers
      </h2>
      <div className="space-y-6">
        {exampleData.map((ex, idx) => (
          <div
            key={idx}
            onMouseEnter={() => setHovered(idx)}
            onMouseLeave={() => setHovered(null)}
            className="bg-gray-800 p-4 rounded-lg shadow transition duration-300 ease-in-out transform hover:scale-[1.01]"
          >
            <p className="text-lg font-medium text-yellow-300">🔍 Prompt: {ex.prompt}</p>
            {ex.bots.map((bot, i) => (
              <div key={i} className="mt-3 pl-3 border-l-4 border-blue-500">
                <h4 className="text-green-400 font-semibold">
                  {bot.emoji} {bot.name} Bot
                </h4>
                <ul
                  className={clsx(
                    "list-disc text-sm ml-5 text-gray-300 italic transition-all duration-500 ease-in-out",
                    hovered === idx ? "opacity-100 delay-200" : "opacity-0 h-0 overflow-hidden"
                  )}
                >
                  {bot.thoughts.map((t, k) => (
                    <li key={k} className="transition-opacity duration-700">{`💭 ${t}`}</li>
                  ))}
                </ul>
                <p
                  className={clsx(
                    "mt-1 text-white transition-all duration-700 ease-in-out",
                    hovered === idx ? "opacity-100 delay-500" : "opacity-0 h-0 overflow-hidden"
                  )}
                >
                  ✅ <strong>Response:</strong> {bot.response}
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

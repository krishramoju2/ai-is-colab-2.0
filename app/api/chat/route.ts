// app/api/chat/route.ts — FINAL SCALABLE OFFLINE VERSION (Simulates GPT-like responses for millions of prompts)

import { NextRequest } from 'next/server';

const bots = [
  {
    emoji: '🛡️',
    name: 'Cyber',
    personality: 'Strategic AI security expert focused on digital threats and encryption.'
  },
  {
    emoji: '🌊',
    name: 'DeepSea',
    personality: 'Tactician trained in sonar anomalies, underwater geology, and marine mysteries.'
  },
  {
    emoji: '🚀',
    name: 'Space',
    personality: 'Galactic analyst focused on extraterrestrial signals, satellites, and celestial behavior.'
  },
  {
    emoji: '📈',
    name: 'Stock',
    personality: 'Financial AI that analyzes markets, investor behavior, and economic volatility.'
  }
];

const keywordsByBot: Record<string, string[]> = {
  Cyber: ["cyber", "attack", "malware", "encryption", "network", "protocol", "ai hack", "firewall", "hospital", "robot", "drone", "data"],
  DeepSea: ["ocean", "underwater", "sonar", "deep", "trench", "temple", "marine", "fish", "ping", "pressure", "abyss"],
  Space: ["asteroid", "space", "orbit", "satellite", "mars", "moon", "extraterrestrial", "meteor", "lunar", "cosmic"],
  Stock: ["stock", "market", "crash", "currency", "finance", "inflation", "bank", "recession", "economy", "investment"]
};

const randomItems = (arr: string[], count: number) =>
  Array(count).fill(0).map(() => arr[Math.floor(Math.random() * arr.length)]);

function generateDynamicResponse(botName: string, prompt: string): { thoughts: string[]; response: string } {
  const topics: Record<string, string[]> = {
    Cyber: [
      "Threat detected in input data stream",
      "Encryption mismatch may cause failure",
      "Unusual access signature noted",
      "Firmware override detected",
      "Behavior suggests intelligent control"
    ],
    DeepSea: [
      "Echo detected from unexpected depth",
      "Salinity mismatch in data zone",
      "Vibration pattern suggests biological origin",
      "Currents diverging from norm",
      "Marine signal repeating at odd intervals"
    ],
    Space: [
      "Unnatural orbital decay logged",
      "Telemetry inconsistent with known satellites",
      "Astrogation data suggests anomaly",
      "Radiation spikes align with signal",
      "Lunar tremor pattern is intelligent"
    ],
    Stock: [
      "High volatility triggered by sentiment index",
      "Options pressure on critical threshold",
      "Liquidity dried up in minor exchanges",
      "Currency pairs shifted unexpectedly",
      "Investor panic flagged across sectors"
    ]
  };

  const conclusions: Record<string, string[]> = {
    Cyber: [
      "Immediate containment protocols advised.",
      "Secure sandbox execution recommended.",
      "Further analysis requires isolated system.",
      "High risk of breach escalation.",
      "Report findings to cyber-watch authority."
    ],
    DeepSea: [
      "Deploy deep-sensor drones for tracking.",
      "Possible trench collapse zone — warn coastal authorities.",
      "Document all acoustic returns and send to bioacoustic labs.",
      "Coordinate with oceanographic observatories immediately.",
      "Conduct subduction anomaly study." 
    ],
    Space: [
      "Alert orbital monitoring stations immediately.",
      "Initiate emergency satellite diagnostics.",
      "Isolate signal frequency and prepare signal archive.",
      "Simulate signal pattern using astrophysics model.",
      "Transmit findings to IAU investigation committee." 
    ],
    Stock: [
      "Implement strategic hedging immediately.",
      "Consult algorithmic triggers for stop-loss adjustment.",
      "Notify investor channels of high anomaly threshold.",
      "Redistribute asset weight across safer commodities.",
      "Recommend temporary freeze on AI-driven trades." 
    ]
  };

  return {
    thoughts: randomItems(topics[botName], 3),
    response: randomItems(conclusions[botName], 1)[0]
  };
}

function detectBots(prompt: string) {
  const detected: string[] = [];
  const promptLower = prompt.toLowerCase();

  for (const [botName, words] of Object.entries(keywordsByBot)) {
    if (words.some(word => promptLower.includes(word))) {
      detected.push(botName);
    }
  }

  if (detected.length === 0) {
    return bots.map(bot => bot.name).slice(0, 2); // fallback
  }

  return detected;
}

export async function POST(req: NextRequest) {
  const { input } = await req.json();
  const prompt = input.trim();

  const matchedBotNames = detectBots(prompt);

  const results = matchedBotNames.map(name => {
    const bot = bots.find(b => b.name === name)!;
    const res = generateDynamicResponse(name, prompt);
    return {
      emoji: bot.emoji,
      name: bot.name,
      thoughts: res.thoughts,
      response: res.response
    };
  });

  return new Response(JSON.stringify({ responses: results }), {
    headers: { 'Content-Type': 'application/json' }
  });
}

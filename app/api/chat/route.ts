
// app/api/chat/route.ts

import { NextRequest } from 'next/server';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY || 'sk-your-key-here';
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

const bots = [
  {
    emoji: '🛡️',
    name: 'Cyber',
    keywords: ['cyber', 'hack', 'malware', 'phishing', 'breach', 'protocol', 'encryption', 'network', 'surveillance', 'ransom'],
    personality:
      'You are Cyber, a highly strategic AI security expert. You monitor digital systems, neutralize threats, and understand deep system-level logic in zero-trust frameworks.'
  },
  {
    emoji: '🌊',
    name: 'DeepSea',
    keywords: ['ocean', 'deep', 'marine', 'sonar', 'submarine', 'trench', 'pressure', 'hydro', 'tsunami', 'aquatic'],
    personality:
      'You are DeepSea, an intelligent underwater tactician. You navigate sonar warfare, pressure dynamics, and abyssal anomalies. You think like the sea.'
  },
  {
    emoji: '🚀',
    name: 'Space',
    keywords: ['mars', 'satellite', 'orbit', 'asteroid', 'lunar', 'gravity', 'space', 'cosmic', 'telescope', 'meteor', 'extraterrestrial'],
    personality:
      'You are Space, a galactic analyst trained in orbital systems, extraterrestrial scenarios, satellite defense, and deep space anomalies.'
  },
  {
    emoji: '📈',
    name: 'Stock',
    keywords: ['stock', 'finance', 'market', 'crypto', 'inflation', 'economy', 'investment', 'index', 'recession', 'bank'],
    personality:
      'You are Stock, a real-time algorithmic financial AI. You simulate economic futures, trade volatility, and analyze fiscal anomalies across global systems.'
  }
];

// 🧠 Expanded semantic context clustering (manual keyword boosters)
const extraTriggers: Record<string, string[]> = {
  Cyber: ['firewall', 'injection', 'anomaly', 'protocol', 'darknet', 'exploit', 'zero-day'],
  DeepSea: ['hydrothermal', 'sonobuoy', 'pressure', 'abyss', 'kraken', 'depth', 'echo-location'],
  Space: ['satcom', 'orbital decay', 'nasa', 'payload', 'trajectory', 'lunar', 'blackhole'],
  Stock: ['bond', 'derivatives', 'hedge', 'arbitrage', 'forex', 'bubble', 'liquidity']
};

// ✅ Detect bots by prompt using extended manual+keyword match logic
function detectBots(prompt: string): typeof bots {
  const promptLower = prompt.toLowerCase();

  const matchedBots = bots.filter(bot => {
    const keywords = [...bot.keywords, ...(extraTriggers[bot.name] || [])];
    return keywords.some(k => promptLower.includes(k));
  });

  // Add variety fallback if too narrow
  if (matchedBots.length === 0) {
    const shuffled = [...bots].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 2); // return any 2 random bots
  }

  return matchedBots;
}

// 🧠 Build GPT message for each bot
function buildMessages(bot: any, prompt: string) {
  return [
    {
      role: 'system',
      content: `${bot.personality} First, generate 3-4 internal diagnostic thoughts based on the prompt. Then produce a final analytical response as if reporting to command.`
    },
    {
      role: 'user',
      content: `Prompt: "${prompt}". Structure output like this:\n\n1. [First Thought]\n2. [Second Thought]\n3. [Third Thought]\n\nResponse: [Your analysis goes here]`
    }
  ];
}

// 🔁 GPT response fetch per bot
async function queryGPT(bot: any, prompt: string) {
  const body = {
    model: 'gpt-4',
    messages: buildMessages(bot, prompt),
    temperature: 0.9
  };

  const res = await fetch(OPENAI_API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  const data = await res.json();
  const raw = data?.choices?.[0]?.message?.content ?? '';

  const thoughts: string[] = [];
  let response = '(no response)';

  for (const line of raw.split('\n')) {
    const clean = line.trim();
    if (/^\d+\.\s/.test(clean)) {
      thoughts.push(clean.replace(/^\d+\.\s*/, ''));
    } else if (clean.toLowerCase().startsWith('response:')) {
      response = clean.replace(/^response:\s*/i, '');
    }
  }

  return {
    emoji: bot.emoji,
    name: bot.name,
    thoughts: thoughts.slice(0, 4),
    response: response.trim()
  };
}

// ✅ Final POST handler
export async function POST(req: NextRequest) {
  const { input } = await req.json();
  const prompt = input.trim();

  const matchedBots = detectBots(prompt);

  const results = await Promise.all(matchedBots.map(bot => queryGPT(bot, prompt)));

  return new Response(JSON.stringify({ responses: results }), {
    headers: { 'Content-Type': 'application/json' }
  });
}

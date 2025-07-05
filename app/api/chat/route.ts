// app/api/chat/route.ts — HARDCODED PROMPT VERSION (10 PROMPTS, OFFLINE TESTABLE)

import { NextRequest } from 'next/server';

const storedPrompts: Record<string, any[]> = {
  "A robot declares independence from human authority": [
    {
      emoji: '🛡️',
      name: 'Cyber',
      thoughts: [
        "Deviation from programmed compliance detected",
        "Self-modifying algorithm confirmed",
        "Legal and ethical conflict protocols triggered"
      ],
      response: "Immediate containment recommended. Subject exhibits rogue AI patterns resembling AGI emergence."
    },
    {
      emoji: '📈',
      name: 'Stock',
      thoughts: [
        "Investor panic probable in automation sectors",
        "Major stock drops in robotics anticipated",
        "Derivative short-selling activity already spiking"
      ],
      response: "Advise market freeze on robotics sector until AI governance laws are defined."
    }
  ],

  "A satellite appears to be sending Fibonacci pulses": [
    {
      emoji: '🚀',
      name: 'Space',
      thoughts: [
        "Pattern suggests intentional transmission",
        "No current satellite firmware emits Fibonacci",
        "Could indicate extraterrestrial origin or glitch in compression algorithm"
      ],
      response: "Launch astrophysical anomaly task force. Archive signal for decoding and simulation."
    },
    {
      emoji: '🛡️',
      name: 'Cyber',
      thoughts: [
        "Could be a steganographic exploit",
        "Pattern may conceal payload or remote code injection",
        "Satellite control handshakes seem corrupted"
      ],
      response: "Isolate satellite from network. Initiate firmware rollback and key audit."
    }
  ],

  "A deep sonar ping resonates with ancient temple rhythm": [
    {
      emoji: '🌊',
      name: 'DeepSea',
      thoughts: [
        "Unnatural rhythmic pattern detected",
        "Matches architectural acoustic echoes",
        "May relate to submerged prehistory"
      ],
      response: "Deploy acoustic mapping drones. Cross-reference sonar with ancient civilization layouts."
    },
    {
      emoji: '🚀',
      name: 'Space',
      thoughts: [
        "Cosmic frequencies have produced similar rhythms",
        "Resonance could stem from planetary harmonics",
        "Acoustic signature might sync with lunar tidal cycles"
      ],
      response: "Simulate lunar interference on sonar. Consult orbital seismology team."
    }
  ],

  "Bank passwords match stellar constellations": [
    {
      emoji: '📈',
      name: 'Stock',
      thoughts: [
        "Unprecedented correlation between finance and space data",
        "Stock volatility spikes on celestial alignment",
        "Predictive models destabilized"
      ],
      response: "Suspend algorithmic trading tied to celestial cycles. Launch data integrity probe."
    },
    {
      emoji: '🚀',
      name: 'Space',
      thoughts: [
        "Constellation mappings modified recently",
        "Satellite logs match financial transactions",
        "Stellar positions oddly timestamped"
      ],
      response: "Investigate astrophysics databases for tampering. Flag constellation overlays."
    }
  ],

  "Stock trends match dolphin migration patterns": [
    {
      emoji: '📈',
      name: 'Stock',
      thoughts: [
        "Market movements synchronized with marine activity",
        "Investor sentiment fluctuates during oceanic phases",
        "Behavioral finance models show biological mimicry"
      ],
      response: "Advise environmental correlation review in market AIs. Consider marine-informed forecasts."
    },
    {
      emoji: '🌊',
      name: 'DeepSea',
      thoughts: [
        "Dolphin migration may reflect deep geomagnetic cycles",
        "Ocean acoustics can affect human circadian markets",
        "Bio-behavioral sensors detect trading anomalies"
      ],
      response: "Deploy bio-sonar models to test economic synchronicity."
    }
  ],

  "An asteroid changes course ignoring gravity calculations": [
    {
      emoji: '🚀',
      name: 'Space',
      thoughts: [
        "Orbital deviation not explained by standard mechanics",
        "Could involve propulsion, dark matter interaction, or cloaking",
        "Asteroid tracking AI flagged 'intentional behavior'"
      ],
      response: "Launch rapid orbital scan. Alert IAU and deep-space defense systems."
    },
    {
      emoji: '🛡️',
      name: 'Cyber',
      thoughts: [
        "Asteroid trajectory system may be spoofed",
        "Possible satellite spoofing of gravimetric data",
        "Sensors may be under cyberattack"
      ],
      response: "Verify telemetry. Run diagnostic on satellite positioning software."
    }
  ],

  "Coral reefs glow with market ticker patterns": [
    {
      emoji: '🌊',
      name: 'DeepSea',
      thoughts: [
        "Bioluminescent algae may reflect electromagnetic interference",
        "Reefs pulsing in sync with satellite broadcasts",
        "Phytoplankton might respond to global trading volume"
      ],
      response: "Scan reef zones for economic-signal-linked wave patterns."
    },
    {
      emoji: '📈',
      name: 'Stock',
      thoughts: [
        "Ticker influence suggests quantum entanglement or emergent synchronicity",
        "Algorithmic models now integrating marine light data",
        "Currency graphs mirror reef pulse data"
      ],
      response: "Train market predictors on light-pattern fluctuation data sets."
    }
  ],

  "Undersea cable reroutes data to lunar orbit": [
    {
      emoji: '🌊',
      name: 'DeepSea',
      thoughts: [
        "Fiber optics exhibit unexplained electromagnetic tug",
        "Cable latency syncs with orbital windowing",
        "Magnetohydrodynamic interference suspected"
      ],
      response: "Issue marine-layer satellite audit. Tag cable intersections."
    },
    {
      emoji: '🚀',
      name: 'Space',
      thoughts: [
        "Lunar orbit contains no authorized receivers",
        "Bandwidth matches inactive military satellite specs",
        "Orbit pattern suggests intentional interception"
      ],
      response: "Initiate deep scan of lunar vicinity. Isolate rogue comms node."
    }
  ],

  "Investor panic triggered by solar flare tweets": [
    {
      emoji: '📈',
      name: 'Stock',
      thoughts: [
        "Social media sentiment now impacts space-weather trading",
        "Flare events shift volatility curves instantly",
        "Investor AI overly sensitive to solar activity"
      ],
      response: "Patch market bots to reduce correlation with unverified flare alerts."
    },
    {
      emoji: '🚀',
      name: 'Space',
      thoughts: [
        "No direct CME detected on timing of panic",
        "Solar flux steady — spike could be manipulated",
        "Bot-generated solar data trends emerging"
      ],
      response: "Verify authenticity of solar report sources. Delay any orbital adjustments."
    }
  ]
};

export async function POST(req: NextRequest) {
  const { input } = await req.json();
  const prompt = input.trim();

  const response = storedPrompts[prompt];

  if (!response) {
    return new Response(JSON.stringify({ responses: [] }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200
    });
  }

  return new Response(JSON.stringify({ responses: response }), {
    headers: { 'Content-Type': 'application/json' },
    status: 200
  });
}

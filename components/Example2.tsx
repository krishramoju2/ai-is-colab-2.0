
"use client";

const promptExamples = [
  {
    prompt: "Design a cross-domain rescue system using satellite, underwater, and financial AI assistance.",
    entities: [
      {
        name: "Commander Cyber",
        avatar: "🛡️",
        role: "Cybersecurity Expert",
        thoughts: [
          "Ensure encrypted cross-network comms.",
          "Deploy intrusion detection for all mission systems.",
        ],
        response: "Implemented AI-driven VPN tunnels and anomaly detection to protect mission data exchange.",
      },
      {
        name: "Captain Nautilus",
        avatar: "🌊",
        role: "Deep Sea Analyst",
        thoughts: [
          "Terrain near the wreck site is unstable.",
          "Thermocline layers may distort sonar readings.",
        ],
        response: "Deployed adaptive sonar calibration with modular drone routing in real time.",
      },
      {
        name: "Professor Orbit",
        avatar: "🚀",
        role: "Orbital Surveillance Specialist",
        thoughts: [
          "Cloud cover over rescue zone is high.",
          "Satellite angle needs hourly recalibration.",
        ],
        response: "Reprogrammed satellite swarms to prioritize cloud-penetrating radar over site.",
      },
      {
        name: "Analyst Alpha",
        avatar: "📈",
        role: "Financial Operations Lead",
        thoughts: [
          "Rescue funding has triggered emergency fund reallocations.",
          "Insurance analytics needed for operational budgeting.",
        ],
        response: "Issued predictive expenditure models and rerouted surplus from discretionary portfolios.",
      }
    ]
  },
  {
    prompt: "How should global stock markets react to cyberattacks disrupting Mars communication relays?",
    entities: [
      {
        name: "Commander Cyber",
        avatar: "🛡️",
        role: "Cybersecurity Expert",
        thoughts: [
          "Likely attack: packet injection in Earth-based relay.",
          "Mars relay firmware not patched to latest protocols.",
        ],
        response: "Recommended shutdown of compromised node and issued QKD-secured replacement modules.",
      },
      {
        name: "Professor Orbit",
        avatar: "🚀",
        role: "Orbital Surveillance Specialist",
        thoughts: [
          "A third-party actor may be jamming orbiters from L1 point.",
          "Only emergency fallback is low-bandwidth lunar echo.",
        ],
        response: "Deployed backup via lunar reflectors and rerouted non-critical payloads.",
      },
      {
        name: "Analyst Alpha",
        avatar: "📈",
        role: "Financial Operations Lead",
        thoughts: [
          "Space tech ETFs dropped by 4% during early trading.",
          "Investors fear long-term disruption in off-world commerce.",
        ],
        response: "Predicted a 2-week decline followed by recovery driven by defense-backed contracts.",
      }
    ]
  },
  {
    prompt: "Coordinate a joint AI mission to study unexplored ocean trenches while avoiding financial overspending.",
    entities: [
      {
        name: "Captain Nautilus",
        avatar: "🌊",
        role: "Deep Sea Analyst",
        thoughts: [
          "Trench has high-pressure, low-light conditions ideal for rare species.",
          "Autonomous drones must auto-adapt navigation."
        ],
        response: "Suggested pressure-compensated hulls with light-enhanced bio-imaging modules.",
      },
      {
        name: "Analyst Alpha",
        avatar: "📈",
        role: "Financial Operations Lead",
        thoughts: [
          "Trench exploration exceeds R&D budget.",
          "GovTech grants may subsidize deep tech.",
        ],
        response: "Built funding architecture using blue-ocean investment pools and climate-linked bonds.",
      }
    ]
  }
];

const Example2 = () => {
  return (
    <section className="bg-gradient-to-br from-gray-900 to-black text-white p-6 mt-10 rounded-xl shadow-2xl border border-gray-700">
      <h2 className="text-2xl font-bold text-indigo-400 mb-6">
        🧪 Collaborative AI Examples: Multi-Entity Assistance
      </h2>
      <div className="space-y-8">
        {promptExamples.map((ex, idx) => (
          <div
            key={idx}
            className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-lg"
          >
            <p className="text-lg font-semibold text-yellow-300 mb-4">
              🔍 Prompt: {ex.prompt}
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              {ex.entities.map((entity, i) => (
                <div
                  key={i}
                  className="bg-gray-700 p-4 rounded-lg border-l-4 border-indigo-500"
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-2xl">{entity.avatar}</span>
                    <div>
                      <p className="font-semibold text-cyan-300">{entity.name}</p>
                      <p className="text-xs text-gray-400 italic">{entity.role}</p>
                    </div>
                  </div>

                  <ul className="list-disc text-sm ml-5 text-gray-300">
                    {entity.thoughts.map((t, k) => (
                      <li key={k} className="italic">💭 {t}</li>
                    ))}
                  </ul>

                  <p className="mt-3 text-white">
                    ✅ <strong>Response:</strong> {entity.response}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Example2;

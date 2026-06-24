import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] px-4 text-center">
      {/* Hero */}
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Glowing hexagon placeholder */}
        <div className="mx-auto w-24 h-24 mb-4">
          <svg viewBox="0 0 100 100" className="w-full h-full" style={{ filter: "drop-shadow(0 0 24px rgba(124,58,237,0.4))" }}>
            <polygon
              points="50,5 90,28 90,72 50,95 10,72 10,28"
              fill="none"
              stroke="#7C3AED"
              strokeWidth="3"
            />
            <polygon
              points="50,25 72,38 72,62 50,75 28,62 28,38"
              fill="#7C3AED"
              fillOpacity="0.15"
            />
          </svg>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
          <span className="bg-gradient-to-r from-violet-400 via-violet-300 to-teal-400 bg-clip-text text-transparent">
            Prove Everything.
          </span>
          <br />
          <span className="text-white">Reveal Nothing.</span>
        </h1>
        
        <p className="text-xl text-gray-400 max-w-xl mx-auto leading-relaxed">
          Zero-knowledge credentials for Stellar DeFi. Prove your credit score, 
          verify your identity, and access financial services — all without 
          revealing a single number.
        </p>
        
        <div className="flex gap-4 justify-center pt-4">
          <Link
            href="/demo"
            className="px-8 py-3 bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-violet-600/25"
          >
            Try the Demo
          </Link>
          <Link
            href="/dashboard"
            className="px-8 py-3 bg-gray-800 hover:bg-gray-700 text-gray-200 font-semibold rounded-xl border border-gray-700 transition-colors"
          >
            Dashboard
          </Link>
        </div>
      </div>

      {/* How It Works */}
      <div className="max-w-5xl mx-auto mt-32 w-full">
        <h2 className="text-3xl font-bold text-white text-center mb-16">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              step: "1",
              title: "Connect Wallet",
              desc: "Link your Freighter wallet to Zethia. Your credentials are ready — no personal data required.",
              icon: "🔌",
            },
            {
              step: "2",
              title: "Generate Proof",
              desc: "Click prove. Zethia generates a zero-knowledge proof in your browser. Your data never leaves your machine.",
              icon: "🔐",
            },
            {
              step: "3",
              title: "Verify on Stellar",
              desc: "Submit your proof to the Soroban verifier contract. On-chain verification. Instant trust.",
              icon: "✨",
            },
          ].map((item) => (
            <div
              key={item.step}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-8 text-center space-y-4 hover:border-gray-700 transition-colors"
            >
              <div className="text-4xl">{item.icon}</div>
              <div className="text-sm font-bold text-violet-400 uppercase tracking-wider">
                Step {item.step}
              </div>
              <h3 className="text-xl font-semibold text-white">{item.title}</h3>
              <p className="text-gray-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Use Cases */}
      <div className="max-w-5xl mx-auto mt-32 w-full">
        <h2 className="text-3xl font-bold text-white text-center mb-16">
          Built for Real-World Privacy
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "DeFi Lending",
              desc: "Prove your credit score is above 650. Get a loan. Your actual score stays private.",
              icon: "🏦",
            },
            {
              title: "KYC Reuse",
              desc: "Verify your identity once. Generate a reusable ZK proof. Never share your passport again.",
              icon: "🪪",
            },
            {
              title: "DAO Governance",
              desc: "Prove you hold governance tokens. Vote. Your wallet balance stays hidden.",
              icon: "🗳️",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8 text-center space-y-3"
            >
              <div className="text-4xl">{item.icon}</div>
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              <p className="text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Built On */}
      <div className="max-w-4xl mx-auto mt-32 mb-24 w-full">
        <h2 className="text-3xl font-bold text-white text-center mb-10">
          Built on Stellar
        </h2>
        <div className="flex flex-wrap justify-center gap-8 items-center">
          {["Stellar", "Soroban", "Noir", "RISC Zero", "Freighter"].map(
            (tech) => (
              <span
                key={tech}
                className="px-6 py-3 bg-gray-900 border border-gray-800 rounded-xl text-gray-300 font-mono text-sm hover:border-violet-600 transition-colors"
              >
                {tech}
              </span>
            )
          )}
        </div>
      </div>

      {/* Footer CTA */}
      <div className="max-w-2xl mx-auto mb-24 bg-gradient-to-r from-violet-600/10 to-teal-600/10 border border-violet-600/20 rounded-3xl p-12 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">
          Ready to prove without revealing?
        </h2>
        <p className="text-gray-400 mb-8">
          Zethia is fully open source. Built for Stellar Hacks ZK.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/demo"
            className="px-8 py-3 bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-xl transition-colors"
          >
            Try Demo
          </Link>
          <a
            href="https://github.com/MystiqueMide/zethia"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 bg-gray-800 hover:bg-gray-700 text-gray-200 font-semibold rounded-xl border border-gray-700 transition-colors"
          >
            View on GitHub
          </a>
        </div>
      </div>
    </div>
  );
}

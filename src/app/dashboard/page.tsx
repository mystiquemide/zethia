"use client";

import { WalletConnect } from "@/components/wallet/WalletConnect";
import { CredentialCard } from "@/components/credentials/CredentialCard";
import { MOCK_CREDENTIALS } from "@/lib/credentials";
import { Shield, Sparkles } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="pt-24 pb-16 px-4">
      <div className="mx-auto max-w-6xl space-y-10">
        {/* Header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-white tracking-tight">
              ZK Credentials
            </h1>
            <p className="text-gray-400 text-sm max-w-md">
              Prove what you need to, without revealing anything else. Your
              credentials stay private — only the proof goes on-chain.
            </p>
          </div>
          <WalletConnect />
        </div>

        {/* Stats banner */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: "Credentials", value: MOCK_CREDENTIALS.length.toString(), icon: Shield },
            { label: "All Verified", value: "100%", icon: Sparkles },
            { label: "Privacy Preserved", value: "ZK", icon: Shield },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex items-center gap-4 rounded-xl border border-gray-800 bg-gray-900/50 px-5 py-4"
            >
              <div className="flex items-center justify-center size-10 rounded-lg bg-violet-500/10 border border-violet-500/20">
                <stat.icon className="size-5 text-violet-400" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">{stat.label}</p>
                <p className="text-lg font-bold text-white font-mono">
                  {stat.value}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Credential Grid */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">
            Your Verifiable Credentials
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {MOCK_CREDENTIALS.map((cred) => (
              <CredentialCard key={cred.id} credential={cred} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

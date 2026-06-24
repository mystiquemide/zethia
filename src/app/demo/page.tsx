"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Wallet,
  FileCheck,
  CheckCircle2,
  Loader2,
  ArrowRight,
  ExternalLink,
  Shield,
  Sparkles,
  TrendingUp,
  ArrowLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  getFreighterPublicKey,
  isFreighterInstalled,
} from "@/lib/stellar";
import { generateProof } from "@/lib/noir";
import { verifyProof } from "@/lib/soroban";

type DemoStage =
  | "connect-wallet"
  | "connecting"
  | "ready"
  | "generating-proof"
  | "proof-done"
  | "submitting"
  | "approved";

export default function DemoPage() {
  const [stage, setStage] = useState<DemoStage>("connect-wallet");
  const [address, setAddress] = useState("");
  const [proofHash, setProofHash] = useState("");
  const [txHash, setTxHash] = useState("");
  const [error, setError] = useState("");
  const [confetti, setConfetti] = useState(false);
  const stageRef = useRef(stage);

  // Keep ref in sync for the confetti cleanup
  useEffect(() => {
    stageRef.current = stage;
  }, [stage]);

  const truncate = (s: string) => `${s.slice(0, 6)}...${s.slice(-4)}`;

  const handleConnect = useCallback(async () => {
    setError("");
    setStage("connecting");

    try {
      if (!isFreighterInstalled()) {
        throw new Error(
          "Freighter not detected. Please install the Freighter browser extension."
        );
      }
      const key = await getFreighterPublicKey();
      setAddress(key);
      setStage("ready");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Connection failed");
      setStage("connect-wallet");
    }
  }, []);

  const handleGenerateProof = useCallback(async () => {
    setStage("generating-proof");

    try {
      const result = await generateProof(720, 650);
      setProofHash(result.proofHash);
      setStage("proof-done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Proof generation failed");
      setStage("ready");
    }
  }, []);

  const handleSubmit = useCallback(async () => {
    setStage("submitting");

    try {
      const result = await verifyProof(proofHash, 650);
      setTxHash(result.txHash);
      setStage("approved");
      setConfetti(true);

      // Auto-dismiss confetti after 5 seconds
      setTimeout(() => {
        if (stageRef.current === "approved") {
          setConfetti(false);
        }
      }, 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Submission failed");
      setStage("proof-done");
    }
  }, [proofHash]);

  const handleReset = useCallback(() => {
    setStage("connect-wallet");
    setAddress("");
    setProofHash("");
    setTxHash("");
    setError("");
    setConfetti(false);
  }, []);

  const stages: { stage: DemoStage; label: string }[] = [
    { stage: "connect-wallet", label: "Connect Wallet" },
    { stage: "ready", label: "Generate Proof" },
    { stage: "proof-done", label: "Submit" },
    { stage: "approved", label: "Done" },
  ];

  const currentIndex = stages.findIndex((s) => {
    if (s.stage === "approved" && stage === "approved") return true;
    if (stage === "connecting") return s.stage === "connect-wallet";
    if (stage === "generating-proof") return s.stage === "ready";
    if (stage === "submitting") return s.stage === "proof-done";
    return s.stage === stage;
  });

  return (
    <>
      {/* Confetti overlay */}
      {confetti && (
        <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            {Array.from({ length: 40 }).map((_, i) => (
              <div
                key={i}
                className="absolute rounded-sm animate-confetti"
                style={{
                  width: `${6 + Math.random() * 8}px`,
                  height: `${6 + Math.random() * 8}px`,
                  backgroundColor: [
                    "#7C3AED",
                    "#06D6A0",
                    "#F59E0B",
                    "#EF4444",
                    "#3B82F6",
                    "#EC4899",
                  ][i % 6],
                  left: `${40 + Math.random() * 20}%`,
                  top: "-5%",
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${1.5 + Math.random() * 2}s`,
                }}
              />
            ))}
          </div>
        </div>
      )}

      <div className="pt-24 pb-24 px-4">
        <div className="mx-auto max-w-2xl space-y-8">
          {/* Header */}
          <div>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="size-4" />
              Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold text-white tracking-tight">
              Demo: ZK Lending
            </h1>
            <p className="text-gray-400 text-sm mt-2 max-w-md">
              End-to-end demonstration: prove your credit score without revealing
              it, then instantly get approved for a loan on Stellar.
            </p>
          </div>

          {/* Progress steps */}
          <div className="flex items-center gap-2">
            {stages.map((s, i) => {
              const isActive = i <= currentIndex;
              return (
                <div key={s.stage} className="flex items-center gap-2">
                  <div
                    className={cn(
                      "flex items-center justify-center size-8 rounded-full text-xs font-bold transition-all duration-300",
                      isActive
                        ? "bg-violet-600 text-white shadow-lg shadow-violet-500/30"
                        : "bg-gray-800 text-gray-600"
                    )}
                  >
                    {i < currentIndex || stage === "approved" ? (
                      <CheckCircle2 className="size-4" />
                    ) : (
                      i + 1
                    )}
                  </div>
                  <span
                    className={cn(
                      "text-xs font-medium hidden sm:inline",
                      isActive ? "text-gray-300" : "text-gray-600"
                    )}
                  >
                    {s.label}
                  </span>
                  {i < stages.length - 1 && (
                    <div
                      className={cn(
                        "w-8 h-px",
                        i < currentIndex ? "bg-violet-500" : "bg-gray-800"
                      )}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Main card */}
          <div className="rounded-2xl border border-gray-800 bg-gray-900/70 overflow-hidden">
            {/* Card header */}
            <div className="border-b border-gray-800 px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center size-10 rounded-lg bg-teal-500/10 border border-teal-500/20">
                  <TrendingUp className="size-5 text-teal-400" />
                </div>
                <div>
                  <h2 className="text-base font-semibold text-white">
                    Apply for Loan
                  </h2>
                  <p className="text-xs text-gray-400">
                    Required: Credit Score &gt; 650
                  </p>
                </div>
              </div>
            </div>

            {/* Card body */}
            <div className="p-6 space-y-6">
              {/* Stage: Connect Wallet */}
              {stage === "connect-wallet" && (
                <div className="space-y-4">
                  <p className="text-sm text-gray-400">
                    Connect your Stellar wallet to start the loan application.
                    Your identity stays private — only the proof goes on-chain.
                  </p>
                  <button
                    onClick={handleConnect}
                    className={cn(
                      "w-full inline-flex items-center justify-center gap-3 rounded-xl px-6 py-4",
                      "bg-gradient-to-r from-violet-600 to-violet-500 hover:from-violet-500 hover:to-violet-400",
                      "text-white font-semibold text-sm transition-all duration-300",
                      "shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40",
                      "hover:scale-[1.01] active:scale-[0.99]"
                    )}
                  >
                    <Wallet className="size-5" />
                    Connect Freighter
                  </button>
                </div>
              )}

              {/* Stage: Connecting */}
              {stage === "connecting" && (
                <div className="flex items-center gap-3 rounded-xl bg-violet-500/5 border border-violet-500/20 p-5">
                  <Loader2 className="size-5 animate-spin text-violet-400" />
                  <div>
                    <p className="text-sm font-medium text-violet-300">
                      Connecting to Freighter...
                    </p>
                    <p className="text-xs text-violet-400/70 mt-0.5">
                      Approve the connection in your wallet
                    </p>
                  </div>
                </div>
              )}

              {/* Stage: Ready */}
              {stage === "ready" && (
                <div className="space-y-4">
                  {/* Wallet connected indicator */}
                  <div className="flex items-center gap-3 rounded-xl bg-gray-800/50 px-4 py-3">
                    <div className="size-2.5 rounded-full bg-teal-400 shadow-[0_0_8px_rgba(6,214,160,0.5)]" />
                    <div>
                      <p className="text-xs text-gray-400">Wallet Connected</p>
                      <p className="text-sm text-white font-mono">
                        {truncate(address)}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-gray-400">
                    Your credit score (720) meets the threshold (650). Generate a
                    ZK proof to verify this without revealing your actual score.
                  </p>

                  <button
                    onClick={handleGenerateProof}
                    className={cn(
                      "w-full inline-flex items-center justify-center gap-3 rounded-xl px-6 py-4",
                      "bg-gradient-to-r from-violet-600 to-violet-500 hover:from-violet-500 hover:to-violet-400",
                      "text-white font-semibold text-sm transition-all duration-300",
                      "shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40",
                      "hover:scale-[1.01] active:scale-[0.99]"
                    )}
                  >
                    <FileCheck className="size-5" />
                    Generate ZK Proof
                  </button>

                  <button
                    onClick={handleReset}
                    className="w-full text-sm text-gray-500 hover:text-gray-400 transition-colors py-1"
                  >
                    Disconnect & Start Over
                  </button>
                </div>
              )}

              {/* Stage: Generating Proof */}
              {stage === "generating-proof" && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 rounded-xl bg-violet-500/5 border border-violet-500/20 p-5">
                    <Loader2 className="size-5 animate-spin text-violet-400" />
                    <div>
                      <p className="text-sm font-medium text-violet-300">
                        Generating Zero-Knowledge Proof
                      </p>
                      <p className="text-xs text-violet-400/70 mt-0.5">
                        Proving: Credit Score ≥ 650 (without revealing: 720)
                      </p>
                    </div>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-gray-800 overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-violet-500 to-teal-400 animate-pulse w-3/4" />
                  </div>
                </div>
              )}

              {/* Stage: Proof Done */}
              {stage === "proof-done" && (
                <div className="space-y-5">
                  <div className="flex items-center gap-3 rounded-xl bg-teal-500/10 border border-teal-500/20 p-5">
                    <CheckCircle2 className="size-6 text-teal-400 shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-teal-300">
                        Proof Verified ✓
                      </p>
                      <p className="text-xs text-teal-400/70 mt-0.5">
                        Credit Score ≥ 650 — proven in ~2s
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-gray-400">
                    Your proof is ready. Submit it to the lending protocol to
                    receive your loan. The protocol verifies the proof on-chain
                    via Soroban.
                  </p>

                  <button
                    onClick={handleSubmit}
                    className={cn(
                      "w-full inline-flex items-center justify-center gap-3 rounded-xl px-6 py-4",
                      "bg-teal-600 hover:bg-teal-500 text-white font-semibold text-sm",
                      "transition-all duration-200 shadow-lg shadow-teal-500/20",
                      "hover:scale-[1.01] active:scale-[0.99]"
                    )}
                  >
                    <ArrowRight className="size-5" />
                    Submit to Lending Protocol
                  </button>
                </div>
              )}

              {/* Stage: Submitting */}
              {stage === "submitting" && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 rounded-xl bg-teal-500/5 border border-teal-500/20 p-5">
                    <Loader2 className="size-5 animate-spin text-teal-400" />
                    <div>
                      <p className="text-sm font-medium text-teal-300">
                        Submitting to Stellar Soroban...
                      </p>
                      <p className="text-xs text-teal-400/70 mt-0.5">
                        Verifying ZK proof on-chain
                      </p>
                    </div>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-gray-800 overflow-hidden">
                    <div className="h-full rounded-full bg-teal-400 animate-pulse w-2/3" />
                  </div>
                </div>
              )}

              {/* Stage: Approved! */}
              {stage === "approved" && (
                <div className="space-y-6">
                  {/* Victory banner */}
                  <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-teal-500/20 via-violet-500/10 to-teal-500/20 border border-teal-500/30 p-6">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-400/10 via-transparent to-transparent" />
                    <div className="relative text-center space-y-3">
                      <div className="inline-flex items-center justify-center size-16 rounded-full bg-teal-500/20 mb-1">
                        <Sparkles className="size-8 text-teal-400" />
                      </div>
                      <h3 className="text-2xl font-bold text-white">
                        Loan Approved!
                      </h3>
                      <div className="inline-block rounded-lg bg-teal-500/10 border border-teal-500/20 px-4 py-2">
                        <span className="text-3xl font-bold text-teal-400 font-mono">
                          5,000
                        </span>
                        <span className="text-lg text-teal-300 ml-1">XLM</span>
                      </div>
                    </div>
                  </div>

                  {/* What was revealed */}
                  <div className="rounded-xl bg-gray-800/50 border border-gray-700 p-5 space-y-3">
                    <div className="flex items-start gap-3">
                      <Shield className="size-5 text-violet-400 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-white">
                          What was revealed on-chain
                        </p>
                        <p className="text-sm text-gray-300 mt-1">
                          <strong className="text-teal-400">NOTHING</strong> —
                          your credit score (720) stays private. The protocol
                          only verified that your score exceeds the threshold
                          (650).
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Tx link */}
                  {txHash && (
                    <a
                      href={`https://stellar.expert/explorer/testnet/tx/${txHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "inline-flex items-center gap-2 rounded-lg px-4 py-2.5 w-full justify-center",
                        "bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm",
                        "border border-gray-700 transition-colors"
                      )}
                    >
                      <ExternalLink className="size-4" />
                      View Transaction on Stellar Expert
                    </a>
                  )}

                  {/* Start over */}
                  <button
                    onClick={handleReset}
                    className={cn(
                      "w-full rounded-lg px-4 py-2.5 text-sm",
                      "text-gray-500 hover:text-gray-400 transition-colors"
                    )}
                  >
                    Run Another Demo
                  </button>
                </div>
              )}

              {/* Error display */}
              {error && (
                <div className="flex items-center gap-3 rounded-xl bg-red-500/10 border border-red-500/20 p-4">
                  <p className="text-sm text-red-300">{error}</p>
                </div>
              )}
            </div>
          </div>

          {/* How it works */}
          <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6">
            <h3 className="text-sm font-semibold text-white mb-4">
              How This Works
            </h3>
            <div className="space-y-3">
              {[
                {
                  step: "1",
                  title: "Connect Wallet",
                  desc: "Your Stellar wallet identifies you to the protocol.",
                },
                {
                  step: "2",
                  title: "Generate ZK Proof",
                  desc: "A zero-knowledge proof confirms your credit score meets the threshold without revealing the actual score.",
                },
                {
                  step: "3",
                  title: "On-Chain Verification",
                  desc: "The Soroban smart contract verifies the ZK proof and automatically disburses the loan.",
                },
              ].map((item) => (
                <div key={item.step} className="flex gap-3">
                  <div className="flex items-center justify-center size-6 rounded-full bg-violet-600 text-white text-xs font-bold shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{item.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

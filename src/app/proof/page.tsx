"use client";

import { useSearchParams } from "next/navigation";
import { useState, useCallback, useRef, Suspense } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ShieldCheck,
  TrendingUp,
  UserCheck,
  CheckCircle2,
  Loader2,
  Clock,
  Hash,
  ExternalLink,
  FileCheck,
  XCircle,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { getCredentialById } from "@/lib/credentials";
import { generateProof, type ProofResult } from "@/lib/noir";
import { verifyProof, type VerifyResult } from "@/lib/soroban";

const ICON_MAP: Record<string, LucideIcon> = {
  TrendingUp,
  ShieldCheck,
  UserCheck,
};

type ProofStage =
  | "idle"
  | "generating"
  | "generated"
  | "verifying"
  | "complete"
  | "error";

function ProofContent() {
  const searchParams = useSearchParams();
  const credentialId = searchParams.get("credential");

  const credential = credentialId
    ? getCredentialById(credentialId)
    : undefined;

  const [stage, setStage] = useState<ProofStage>("idle");
  const [proofData, setProofData] = useState<ProofResult | null>(null);
  const [verifyData, setVerifyData] = useState<VerifyResult | null>(null);
  const [error, setError] = useState("");
  const startTimeRef = useRef(0);

  const handleGenerateProof = useCallback(async () => {
    if (!credential) return;

    setStage("generating");
    setError("");
    startTimeRef.current = Date.now();

    try {
      const result = await generateProof(credential.value, credential.threshold);
      setProofData(result);
      setStage("generated");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Proof generation failed");
      setStage("error");
    }
  }, [credential]);

  const handleVerify = useCallback(async () => {
    if (!proofData || !credential) return;

    setStage("verifying");
    setError("");

    try {
      const result = await verifyProof(proofData.proofHash, credential.threshold);
      setVerifyData(result);
      setStage("complete");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Verification failed");
      setStage("error");
    }
  }, [proofData, credential]);

  if (!credential) {
    return (
      <div className="pt-24 pb-16 px-4">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center justify-center size-16 rounded-2xl bg-red-500/10 border border-red-500/20 mb-6">
            <XCircle className="size-8 text-red-400" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">
            Credential Not Found
          </h1>
          <p className="text-gray-400 mb-6">
            The requested credential does not exist. Please select one from your
            dashboard.
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 bg-violet-600 hover:bg-violet-500 text-white font-medium text-sm transition-colors"
          >
            <ArrowLeft className="size-4" />
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const Icon = ICON_MAP[credential.icon] || ShieldCheck;

  return (
    <div className="pt-24 pb-24 px-4">
      <div className="mx-auto max-w-2xl space-y-8">
        {/* Breadcrumb */}
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="size-4" />
          Back to Dashboard
        </Link>

        {/* Credential header */}
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center size-14 rounded-xl bg-violet-500/10 border border-violet-500/20">
            <Icon className="size-6 text-violet-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">
              Generate ZK Proof
            </h1>
            <p className="text-gray-400 text-sm mt-0.5">
              {credential.name} • Threshold: ≥ {credential.threshold}
            </p>
          </div>
        </div>

        {/* Proof Details Card */}
        <div className="rounded-xl border border-gray-800 bg-gray-900/70 p-6 space-y-6">
          <h2 className="text-base font-semibold text-white">
            Proof Details
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg bg-gray-950/80 p-4">
              <p className="text-xs text-gray-500 font-medium mb-1">
                Claim
              </p>
              <p className="text-sm text-white font-mono">
                {credential.name} ≥ {credential.threshold}
              </p>
            </div>
            <div className="rounded-lg bg-gray-950/80 p-4">
              <p className="text-xs text-gray-500 font-medium mb-1">
                Your Value
              </p>
              <p
                className={cn(
                  "text-sm font-mono",
                  credential.value >= credential.threshold
                    ? "text-teal-400"
                    : "text-red-400"
                )}
              >
                {credential.value}
              </p>
            </div>
          </div>

          {/* Action button */}
          {stage === "idle" && (
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
          )}

          {/* Generating state */}
          {stage === "generating" && (
            <div className="rounded-xl bg-violet-500/5 border border-violet-500/20 p-6 space-y-4">
              <div className="flex items-center gap-3">
                <Loader2 className="size-5 animate-spin text-violet-400" />
                <div>
                  <p className="text-sm font-medium text-violet-300">
                    Generating Zero-Knowledge Proof
                  </p>
                  <p className="text-xs text-violet-400/70 mt-0.5">
                    This takes ~2 seconds — proving knowledge without revealing data
                  </p>
                </div>
              </div>
              {/* Progress bar */}
              <div className="w-full h-1.5 rounded-full bg-gray-800 overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-violet-500 to-teal-400 animate-pulse w-2/3" />
              </div>
            </div>
          )}

          {/* Result display after generation */}
          {(stage === "generated" || stage === "verifying" || stage === "complete" || stage === "error") &&
            proofData && (
              <div className="space-y-4">
                {/* Proof hash + timing */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="rounded-lg bg-gray-950/80 p-4">
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                      <Hash className="size-3" />
                      Proof Hash
                    </div>
                    <p className="text-xs text-gray-300 font-mono break-all">
                      {proofData.proofHash.slice(0, 24)}...
                    </p>
                  </div>
                  <div className="rounded-lg bg-gray-950/80 p-4">
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                      <Clock className="size-3" />
                      Generation Time
                    </div>
                    <p className="text-sm text-white font-mono">
                      {proofData.durationMs}ms
                    </p>
                  </div>
                </div>

                {/* Verify on Stellar button */}
                {stage === "generated" && (
                  <button
                    onClick={handleVerify}
                    className={cn(
                      "w-full inline-flex items-center justify-center gap-3 rounded-xl px-6 py-4",
                      "bg-teal-600 hover:bg-teal-500 text-white font-semibold text-sm",
                      "transition-all duration-200 shadow-lg shadow-teal-500/20",
                      "hover:scale-[1.01] active:scale-[0.99]"
                    )}
                  >
                    <ExternalLink className="size-5" />
                    Verify on Stellar Soroban
                  </button>
                )}

                {/* Verifying */}
                {stage === "verifying" && (
                  <div className="flex items-center gap-3 rounded-xl bg-teal-500/5 border border-teal-500/20 p-4">
                    <Loader2 className="size-5 animate-spin text-teal-400" />
                    <div>
                      <p className="text-sm font-medium text-teal-300">
                        Submitting to Soroban...
                      </p>
                      <p className="text-xs text-teal-400/70 mt-0.5">
                        Verifying proof on-chain (~1.5s)
                      </p>
                    </div>
                  </div>
                )}

                {/* Complete */}
                {stage === "complete" && verifyData && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 rounded-xl bg-teal-500/10 border border-teal-500/20 p-5">
                      <div className="flex items-center justify-center size-10 rounded-full bg-teal-500/20">
                        <CheckCircle2 className="size-5 text-teal-400" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-teal-300">
                          Proof Verified ✓
                        </p>
                        <p className="text-xs text-teal-400/70 mt-0.5">
                          Successfully verified on Stellar testnet
                        </p>
                      </div>
                    </div>

                    {/* Transaction Link */}
                    <a
                      href={`https://stellar.expert/explorer/testnet/tx/${verifyData.txHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "inline-flex items-center gap-2 rounded-lg px-4 py-2.5",
                        "bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm",
                        "border border-gray-700 transition-colors"
                      )}
                    >
                      <ExternalLink className="size-4" />
                      View on Stellar Expert
                    </a>

                    {/* What was revealed */}
                    <div className="rounded-lg bg-gray-950/60 border border-gray-800 p-4">
                      <p className="text-xs text-gray-500 font-medium mb-1">
                        What was revealed on-chain
                      </p>
                      <p className="text-sm text-gray-300">
                        NOTHING — your {credential.name.toLowerCase()} stays private.
                        Only the proof validity was verified.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

          {/* General error */}
          {error && (
            <div className="flex items-center gap-3 rounded-xl bg-red-500/10 border border-red-500/20 p-4">
              <XCircle className="size-5 text-red-400 shrink-0" />
              <p className="text-sm text-red-300">{error}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProofPage() {
  return (
    <Suspense
      fallback={
        <div className="pt-24 flex justify-center">
          <Loader2 className="size-8 animate-spin text-violet-400" />
        </div>
      }
    >
      <ProofContent />
    </Suspense>
  );
}

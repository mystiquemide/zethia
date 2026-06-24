"use client";

import Link from "next/link";
import {
  TrendingUp,
  ShieldCheck,
  UserCheck,
  ArrowRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Credential } from "@/lib/credentials";

const ICON_MAP: Record<string, LucideIcon> = {
  TrendingUp,
  ShieldCheck,
  UserCheck,
};

interface CredentialCardProps {
  credential: Credential;
  className?: string;
}

export function CredentialCard({ credential, className }: CredentialCardProps) {
  const Icon = ICON_MAP[credential.icon] || ShieldCheck;

  const meetsThreshold = credential.value >= credential.threshold;

  return (
    <div
      className={cn(
        "group relative rounded-xl border border-gray-800 bg-gray-900/70 p-6",
        "hover:border-violet-500/30 hover:bg-gray-900/90",
        "transition-all duration-300",
        className
      )}
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-violet-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative z-10 space-y-4">
        {/* Icon + Status badge */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "flex items-center justify-center size-10 rounded-lg",
                "bg-violet-500/10 border border-violet-500/20"
              )}
            >
              <Icon className="size-5 text-violet-400" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white">
                {credential.name}
              </h3>
              <p className="text-xs text-gray-400">{credential.issuer}</p>
            </div>
          </div>
          {meetsThreshold && (
            <span
              className={cn(
                "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium",
                "bg-teal-500/10 border border-teal-500/20 text-teal-400"
              )}
            >
              ✓ Ready
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-gray-400 leading-relaxed">
          {credential.description}
        </p>

        {/* Threshold info */}
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span>Threshold: ≥ {credential.threshold}</span>
          <span>•</span>
          <span
            className={cn(
              "font-mono",
              meetsThreshold ? "text-teal-400" : "text-red-400"
            )}
          >
            You: {credential.value}
          </span>
        </div>

        {/* Generate Proof button */}
        <Link
          href={`/proof?credential=${credential.id}`}
          className={cn(
            "inline-flex items-center gap-2 rounded-lg px-4 py-2.5 w-full justify-center",
            "bg-violet-600 hover:bg-violet-500 text-white font-medium text-sm",
            "transition-all duration-200 shadow-lg shadow-violet-500/20",
            "hover:shadow-violet-500/30 hover:scale-[1.02]"
          )}
        >
          <span>Generate Proof</span>
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}

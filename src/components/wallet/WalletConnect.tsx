"use client";

import { useState, useCallback } from "react";
import { Wallet, LogOut, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  getFreighterPublicKey,
  getTestnetBalance,
  isFreighterInstalled,
} from "@/lib/stellar";

type ConnectionState =
  | "disconnected"
  | "connecting"
  | "connected"
  | "error";

export function WalletConnect() {
  const [state, setState] = useState<ConnectionState>("disconnected");
  const [address, setAddress] = useState<string>("");
  const [balance, setBalance] = useState<string>("");
  const [error, setError] = useState<string>("");

  const truncateAddress = (addr: string) =>
    `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  const connect = useCallback(async () => {
    setError("");
    setState("connecting");

    try {
      if (!isFreighterInstalled()) {
        throw new Error(
          "Freighter wallet not detected. Please install the Freighter browser extension."
        );
      }

      const publicKey = await getFreighterPublicKey();
      setAddress(publicKey);

      // Fetch testnet balance
      try {
        const bal = await getTestnetBalance(publicKey);
        setBalance(bal);
      } catch (balErr) {
        console.warn("Could not fetch balance", balErr);
        setBalance("—");
      }

      setState("connected");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to connect wallet";
      setError(message);
      setState("error");
    }
  }, []);

  const disconnect = useCallback(() => {
    setAddress("");
    setBalance("");
    setError("");
    setState("disconnected");
  }, []);

  return (
    <div className="w-full">
      {state === "disconnected" && (
        <button
          onClick={connect}
          className={cn(
            "group relative inline-flex items-center gap-3 rounded-xl px-6 py-4",
            "bg-gradient-to-r from-violet-600 to-violet-500 hover:from-violet-500 hover:to-violet-400",
            "text-white font-semibold text-sm transition-all duration-300",
            "shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40",
            "hover:scale-[1.02] active:scale-[0.98]"
          )}
        >
          <Wallet className="size-5" />
          <span>Connect Freighter</span>
        </button>
      )}

      {state === "connecting" && (
        <div className="inline-flex items-center gap-3 rounded-xl px-6 py-4 bg-violet-600/20 border border-violet-500/30">
          <Loader2 className="size-5 animate-spin text-violet-400" />
          <span className="text-violet-300 font-medium text-sm">
            Connecting to Freighter...
          </span>
        </div>
      )}

      {state === "connected" && (
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-3 rounded-xl bg-gray-900 border border-gray-800 px-5 py-3">
            <div className="size-2.5 rounded-full bg-teal-400 shadow-[0_0_8px_rgba(6,214,160,0.5)]" />
            <div>
              <p className="text-xs text-gray-400 font-medium">
                Connected
              </p>
              <p className="text-sm text-white font-mono">
                {truncateAddress(address)}
              </p>
            </div>
            {balance && balance !== "—" && (
              <>
                <div className="w-px h-8 bg-gray-800" />
                <div>
                  <p className="text-xs text-gray-400 font-medium">
                    Testnet Balance
                  </p>
                  <p className="text-sm text-white font-mono">
                    {balance} XLM
                  </p>
                </div>
              </>
            )}
          </div>
          <button
            onClick={disconnect}
            className={cn(
              "inline-flex items-center gap-2 rounded-lg px-4 py-2.5",
              "text-gray-400 hover:text-red-400 hover:bg-red-400/10",
              "border border-gray-800 hover:border-red-400/30",
              "transition-all duration-200 text-sm"
            )}
          >
            <LogOut className="size-4" />
            Disconnect
          </button>
        </div>
      )}

      {state === "error" && (
        <div className="space-y-3">
          <div className="inline-flex items-start gap-3 rounded-xl bg-red-500/10 border border-red-500/30 px-5 py-4 max-w-md">
            <AlertCircle className="size-5 text-red-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm text-red-300 font-medium">
                Connection Failed
              </p>
              <p className="text-xs text-red-400/80 mt-0.5">{error}</p>
            </div>
          </div>
          <button
            onClick={connect}
            className={cn(
              "inline-flex items-center gap-2 rounded-lg px-4 py-2",
              "text-violet-400 hover:text-violet-300 hover:bg-violet-400/10",
              "text-sm transition-colors"
            )}
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
}

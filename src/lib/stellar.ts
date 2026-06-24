/**
 * Stellar testnet client — wallet connect + balance queries
 */
import type { Horizon } from "@stellar/stellar-sdk";

// Freighter wallet API (browser-only)
const getFreighter = () => {
  if (typeof window === "undefined") return null;
  return (window as any).freighterApi;
};

/**
 * Connect to Freighter wallet and return the user's Stellar public key.
 */
export async function getFreighterPublicKey(): Promise<string> {
  const freighter = getFreighter();
  if (!freighter) {
    throw new Error(
      "Freighter wallet extension not detected. Please install Freighter from https://freighter.app"
    );
  }

  const isConnected = await freighter.isConnected();
  if (!isConnected) {
    await freighter.requestAccess();
  }

  const publicKey: string = await freighter.getPublicKey();
  if (!publicKey) {
    throw new Error("No public key returned from Freighter. Please unlock your wallet.");
  }

  return publicKey;
}

/**
 * Fetch XLM balance for a Stellar address from Horizon testnet.
 */
export async function getTestnetBalance(address: string): Promise<string> {
  const HORIZON_TESTNET = "https://horizon-testnet.stellar.org";

  try {
    const res = await fetch(`${HORIZON_TESTNET}/accounts/${address}`);
    if (!res.ok) {
      // Account not funded yet
      if (res.status === 404) return "0";
      throw new Error(`Horizon error: ${res.status}`);
    }

    const data: Horizon.ServerApi.AccountRecord = await res.json();

    // Check for native XLM balance (asset_type is "native" string)
    const xlmBalance = data.balances.find(
      (b) => (b.asset_type as string) === "native"
    );

    if (!xlmBalance) return "0";

    // Truncate to 4 decimal places
    const balance = parseFloat(xlmBalance.balance);
    return balance.toFixed(4);
  } catch (err) {
    console.error("Failed to fetch testnet balance:", err);
    throw err;
  }
}

/**
 * Check if Freighter extension is installed (does not prompt).
 */
export function isFreighterInstalled(): boolean {
  const freighter = getFreighter();
  return !!freighter;
}

export const STELLAR_NETWORK = "TESTNET";
export const SOROBAN_RPC = "https://soroban-testnet.stellar.org";
export const HORIZON_TESTNET = "https://horizon-testnet.stellar.org";

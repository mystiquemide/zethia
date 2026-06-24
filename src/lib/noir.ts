/**
 * Browser-side ZK proof generation (mock — WASM integration coming soon).
 *
 * Simulates Noir proof generation for "value >= threshold" constraint.
 */

export interface ProofResult {
  valid: boolean;
  proofHash: string;
  durationMs: number;
}

/**
 * Generate a ZK proof that `value >= threshold`.
 * Mock: simulates 2-second computation, always returns valid.
 */
export async function generateProof(
  value: number,
  threshold: number
): Promise<ProofResult> {
  const start = performance.now();

  // Simulate proof generation computation (2 seconds)
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const durationMs = Math.round(performance.now() - start);
  const valid = value >= threshold;

  // Generate a deterministic-looking mock proof hash
  const hashData = `zethia-proof:${value}:${threshold}:${Date.now()}`;
  const hashBuffer = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(hashData)
  );
  const proofHash =
    "0x" +
    Array.from(new Uint8Array(hashBuffer))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

  return {
    valid,
    proofHash,
    durationMs,
  };
}

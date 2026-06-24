/**
 * Mock credential data for the Zethia ZK credentials demo.
 */

export interface Credential {
  id: string;
  name: string; // "Credit Score", "KYC Verified", "Age 18+"
  issuer: string; // mock issuer name
  threshold: number; // minimum required value to pass verification
  value: number; // user's actual underlying value (mock)
  icon: string; // lucide-react icon name
  description: string;
}

export const MOCK_CREDENTIALS: Credential[] = [
  {
    id: "credit-score",
    name: "Credit Score",
    issuer: "Zethia Credit Bureau",
    threshold: 650,
    value: 720,
    icon: "TrendingUp",
    description: "Prove your credit score exceeds the minimum without revealing the actual number.",
  },
  {
    id: "kyc-verified",
    name: "KYC Verified",
    issuer: "Zethia Identity",
    threshold: 1,
    value: 1,
    icon: "ShieldCheck",
    description: "Prove you've completed KYC verification without exposing your identity documents.",
  },
  {
    id: "age-18-plus",
    name: "Age 18+",
    issuer: "Zethia Identity",
    threshold: 18,
    value: 25,
    icon: "UserCheck",
    description: "Prove you are over 18 without revealing your exact birth date.",
  },
];

export function getCredentialById(id: string): Credential | undefined {
  return MOCK_CREDENTIALS.find((c) => c.id === id);
}

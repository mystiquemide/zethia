# Zethia — PRD

## Problem Statement
Stellar DeFi has no privacy-preserving credential system. Borrowers must either doxx themselves completely or remain anonymous with no credit history. Lenders have no way to verify creditworthiness without seeing full wallet contents. KYC is one-and-done with no reusable proof. Protocol 25/26 added ZK primitives to Soroban, but no application uses them for identity/credentials yet.

## Target Users
- DeFi borrowers on Stellar who want to prove creditworthiness without revealing their wallet balance or transaction history
- DeFi lending protocols (like Blend) that need reputation signals to underwrite loans
- KYC providers who want to issue reusable, privacy-preserving credentials
- Hackathon judges evaluating real-world ZK on Stellar

## Measurable Success Criteria
1. ZK circuit compiles and generates valid proofs — a Noir circuit for threshold/range proof that outputs a verifiable proof artifact
2. Soroban contract verifies proofs on-chain — deployed to testnet, callable, returns true/false for proof validity
3. Browser-based proof generation — user clicks "Prove Credit Score > 650" and generates a ZK proof entirely in-browser (Noir WASM)
4. Demo DeFi integration — a mock lending protocol that accepts ZK credentials and shows "Loan Approved" or "Loan Denied" based on proof verification
5. Landing page accessible at a live URL with brand identity, how-it-works, and demo CTA
6. README renders correctly on GitHub with architecture diagram, setup instructions, and demo video link

## Explicit Non-Goals
- Production-grade circuit audit
- Mainnet deployment
- Real KYC provider integration (mock issuer only)
- Multi-credential aggregation (single credential type for demo)
- Key rotation or credential revocation
- Mobile app — desktop browser only
- Revenue model or tokenomics

## C4 Level 1: System Context
```
                      +--------------+
                      |   Stellar    |
                      |   Testnet    |
                      | (Soroban)    |
                      +------+-------+
                             | verify proof
                      +------v-------+
   +-----+    proof   |   Zethia     |   issue credential   +----------+
   |User +----------->+  Web App     +<---------------------+  Issuer  |
   +-----+            | (Next.js)    |                       |  (mock)  |
                      +------+-------+
                             |
                      +------v-------+
                      |  ZK Circuit  |
                      |    (Noir)    |
                      |  -> WASM     |
                      +--------------+
```

## Constraints
- 5-day build window (June 24-28, submit June 29)
- Browser-only ZK — Noir compiled to WASM, no server-side proving
- Testnet only — free, permissionless, no real value at risk
- Single credential type — credit score threshold proof (prove score > N without revealing N)
- React/Next.js frontend — matching boilerplate tech stack
- No external API dependencies — fully local/self-contained proof generation

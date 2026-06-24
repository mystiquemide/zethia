# Zethia — Implementation Tasks

## T1: Noir ZK Circuit (credit score threshold proof)
**File**: circuits/noir/src/main.nr
Hide: actual credit score (input)
Prove: score > threshold (e.g. 650)
Output: Verifiable proof artifact (to be submitted on-chain)

Acceptance:
- Circuit compiles: nargo compile (circuits/noir/)
- Generates valid proof for score > threshold
- Generates valid proof for score = threshold (equal)
- Fails/rejects for score < threshold
- Public inputs: threshold value only (not the score)
- Output: proof bytes file

## T2: Soroban Verifier Contract
**File**: contracts/soroban/verifier/src/lib.rs
Deploys to Stellar testnet
Exposes: verify(proof_bytes, threshold: u32) -> bool
Uses Soroban's native verification primitives
Stores verified credential hashes on-chain (prevent replay)

Acceptance:
- Contract compiles: soroban contract build
- Deploys to testnet successfully
- verify() returns true for valid proofs
- verify() returns false for invalid/tampered proofs
- Contract address is deterministic for README

## T3: Next.js Lib — Stellar + Soroban Client
**Files**: src/lib/stellar.ts, src/lib/soroban.ts
Init Stellar SDK for testnet
Freighter wallet connect/disconnect
Soroban RPC client (testnet endpoint)
Contract invocation helper (call verifier.verify())

Acceptance:
- Wallet connect works in browser with Freighter extension
- Can query Soroban testnet RPC
- Can invoke verifier contract with proof bytes
- Returns structured {valid: boolean, txHash: string} response

## T4: Next.js Lib — Noir/WASM Proof Generation
**File**: src/lib/noir.ts
Load Noir WASM module in browser
Accept inputs: {score: number, threshold: number}
Generate ZK proof client-side
Return {proof: Uint8Array, publicInputs: string[]}

Acceptance:
- WASM module loads without errors
- Generates proof for valid inputs in <5 seconds
- Returns structured proof bytes ready for contract submission
- Handles errors gracefully (invalid inputs, WASM load failure)

## T5: Frontend — Wallet Connect + Dashboard
**File**: src/components/web3/WalletConnect.tsx, src/app/dashboard/page.tsx
Freighter "Connect Wallet" button
Show connected address + testnet balance
Dashboard with credential cards (mock data initially)
Generate Proof button per credential

Acceptance:
- Wallet connect/disconnect flow works
- Shows Stellar testnet address
- Dashboard renders with credential cards
- "Generate Proof" button is functional placeholder

## T6: Frontend — Proof Generator Screen
**File**: src/components/credentials/ProofGenerator.tsx, src/app/proof/page.tsx
Input: select credential, enter threshold
Generate: calls lib/noir.ts to create proof
Display: proof hash, generation time, status
Submit: sends proof to Soroban contract
Result: shows verification result with tx link

Acceptance:
- User can select credential + enter threshold
- Generates ZK proof in browser
- Shows proof generation progress
- Submits to contract and displays result
- Handles error states (contract down, wallet not connected)

## T7: Frontend — Demo Lending Protocol Integration
**File**: src/components/demo/LoanSimulator.tsx, src/app/demo/page.tsx
Mock lending UI: "Apply for Loan"
Shows required credential: "Credit Score > 650"
Triggers proof generation flow
On verification success: shows "Loan Approved" with mock amount
On verification failure: shows "Loan Denied" with reason
Shows what was revealed (nothing — ZK!)

Acceptance:
- Complete demo flow works end-to-end
- Judge can connect wallet, generate proof, see loan approved
- Under 2 minutes for full demo walkthrough
- Visual polish matches Zethia brand

## T8: Landing Page
**File**: src/components/landing/*, src/app/page.tsx
Follows The Look's brand direction (violet #7C3AED, teal #06D6A0, dark bg)
Hero: "Prove Everything. Reveal Nothing." with glowing hexagon
How it works: 3-step visual (Connect → Prove → Verify)
Use cases: DeFi Lending, KYC Reuse, DAO Governance
Built on Stellar: tech logos
CTA: "Try Demo" → /demo

Acceptance:
- Fully responsive landing page
- Brand colors applied correctly
- All sections present
- CTA links work
- No console errors

## T9: README + Architecture Diagram + Devpost Draft
**File**: README.md
Project description (story-driven)
Architecture diagram (from docs/architecture.md)
Setup instructions (npm install, env vars, testnet account)
Demo video embed
Sponsor tool mentions (Stellar, Soroban, Noir)
License

Acceptance:
- Renders correctly on GitHub
- Architecture diagram is clear and readable
- Setup instructions work (fresh clone + npm install + dev)
- Sponsor tools prominently mentioned

## Build Order (Dependency Chain)
T1 (circuit) → T2 (contract needs circuit's verification key)
T3, T4 (libs) → can run parallel
T5 (wallet) → depends on T3
T6 (proof UI) → depends on T3, T4
T7 (demo) → depends on T5, T6
T8 (landing) → independent, parallel
T9 (docs) → last, depends on everything

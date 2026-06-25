# Zethia — Project Memory

## What We Built

Zethia is a zero-knowledge credential system for Stellar DeFi. Users prove things about themselves (credit score > 650, KYC passed, age > 18) without revealing the underlying data. Proofs are verified on-chain via a Soroban smart contract on Stellar testnet.

Built in 1 day for **Stellar Hacks: Real-World ZK** (deadline June 29, 2026).

## Where Everything Is

```
zethia/                          ← Project root
├── circuits/noir/               ← ZK circuits (Noir DSL)
│   ├── src/main.nr              ← Credit score threshold proof
│   ├── Nargo.toml               ← Noir package config
│   └── Prover.toml              ← Test inputs (score=720, threshold=650)
├── contracts/soroban/verifier/  ← Soroban smart contract (Rust)
│   ├── src/lib.rs               ← Verifier contract: verify(), verify_hash(), get_last_threshold()
│   ├── Cargo.toml               ← Rust deps (soroban-sdk 27.0.0-rc.1)
│   └── zethia_verifier.wasm     ← Compiled WASM (1,511 bytes)
├── src/
│   ├── app/
│   │   ├── page.tsx              ← Landing page (hero, how it works, use cases)
│   │   ├── dashboard/page.tsx    ← Credential dashboard
│   │   ├── demo/page.tsx         ← End-to-end lending demo (515 lines)
│   │   └── proof/page.tsx        ← Proof generation + verification
│   ├── components/
│   │   ├── credentials/CredentialCard.tsx
│   │   ├── wallet/WalletConnect.tsx
│   │   ├── landing/hero.tsx, features.tsx, cta.tsx
│   │   ├── layout/nav.tsx, footer.tsx
│   │   └── ui/button.tsx, card.tsx, modal.tsx, skeleton.tsx, toast.tsx
│   └── lib/
│       ├── stellar.ts            ← Freighter wallet connect + Horizon balance
│       ├── noir.ts               ← Mock ZK proof generation (WASM-ready)
│       ├── soroban.ts            ← Soroban contract calls
│       └── credentials.ts        ← Mock credential data (3 credentials)
├── docs/
│   ├── MEMORY.md                 ← THIS FILE — project handoff
│   ├── prd.md                    ← Product requirements
│   ├── architecture.md           ← C4 Level 1-3 diagrams (462 lines)
│   ├── tasks.md                  ← Implementation task breakdown
│   ├── DEMO_VIDEO_PLAN.md        ← 8-scene demo script + recording checklist
│   └── PITCH.md                  ← 6-slide live pitch + Q&A prep
└── README.md                     ← GitHub-facing project readme
```

## The Stack

| Layer | Tech | Notes |
|-------|------|-------|
| Frontend | Next.js 15, React 19, Tailwind v4, TypeScript | App Router, dark mode default |
| ZK Circuits | Noir DSL | Compiles to WASM for browser-side proving |
| Smart Contract | Soroban SDK (Rust) | Deployed to Stellar testnet |
| Wallet | Freighter | Browser extension |
| Network | Stellar Testnet | Free, permissionless |

## Key Artifacts

### Soroban Contract
- **Contract ID**: `CALMKGAJFJFM2PGXQJU2I6NWUOFCI6VOO347DGL6GLE27LBWHLCJ2UXJ`
- **WASM Hash**: `55a31fcaa3663aa8ff524056a6b76d274570a76deed4463ad8cc75fa31fd202b`
- **Deployed by**: `parcis-deployer` (Soroban key in WSL)
- **Deploy Tx**: https://stellar.expert/explorer/testnet/tx/5bd69baf6e990e1423dc72614170b5743fc09acc4da604f845167ef541d600d2
- **Verify Tx**: https://stellar.expert/explorer/testnet/tx/2ee27f3e2fa983994f5962147f00e2cf680bd49d69ec9b58aadbf95cdce6aac4
- **Lab Explorer**: https://lab.stellar.org/r/testnet/contract/CALMKGAJFJFM2PGXQJU2I6NWUOFCI6VOO347DGL6GLE27LBWHLCJ2UXJ

### Noir Circuit
- **Circuit**: Score > threshold comparison
- **Test input**: score=720, threshold=650 → output: true
- **Compile**: `nargo compile` (in circuits/noir/, WSL only)
- **Execute**: `nargo execute` (in circuits/noir/, WSL only)

## Build Commands

### Frontend
```bash
cd /c/Users/Prince/Projects/hackathons/stellar-hacks-zk/zethia
npm install          # Install deps
npm run dev          # Dev server on port 3000 (we used 3456)
npx next build       # Production build
```

### Noir Circuit (WSL only)
```bash
wsl -d Ubuntu -- bash -c 'export PATH="$HOME/.nargo/bin:$PATH" && cd /mnt/c/Users/Prince/Projects/hackathons/stellar-hacks-zk/zethia/circuits/noir && nargo compile && nargo execute'
```

### Soroban Contract (WSL only)
```bash
# Build (copies to /tmp for native Linux speed)
wsl -d Ubuntu -- bash -c 'rm -rf /tmp/zethia-contracts && cp -r /mnt/c/Users/Prince/Projects/hackathons/stellar-hacks-zk/zethia/contracts /tmp/zethia-contracts && cd /tmp/zethia-contracts/soroban/verifier && soroban contract build'

# Deploy
wsl -d Ubuntu -- bash -c 'soroban contract deploy --wasm /mnt/c/Users/Prince/Projects/hackathons/stellar-hacks-zk/zethia/contracts/soroban/verifier/zethia_verifier.wasm --source parcis-deployer --network testnet'

# Invoke
wsl -d Ubuntu -- bash -c 'soroban contract invoke --id CALMKGAJFJFM2PGXQJU2I6NWUOFCI6VOO347DGL6GLE27LBWHLCJ2UXJ --source parcis-deployer --network testnet --send=yes -- verify_hash --proof_hash "[1,2,3,4,5]" --threshold "650"'
```

## What's Real vs Mock

| Component | Real | Mock | Notes |
|-----------|:----:|:----:|-------|
| Noir ZK circuit | ✅ | | Compiles, executes, generates witness |
| Soroban contract | ✅ | | Deployed to testnet, returns true/false |
| Freighter wallet connect | ✅ | | Real Stellar SDK, needs browser + extension |
| Proof generation (browser) | | ✅ | Mock 2s delay (WASM integration TODO) |
| Credential data | | ✅ | 3 hardcoded mock credentials |
| Lending protocol | | ✅ | Simulated approval flow |

The contract is genuinely deployed and callable. The ZK circuit genuinely proves score>threshold. The mock parts are the browser-side WASM proof generation (Noir WASM needs integration work) and the credential data (would be issuer-signed in production).

## Brand

- **Name**: Zethia (zero prior usage verified across DDG, X/Twitter, GitHub, npm, Crunchbase, ProductHunt)
- **Colors**: Primary #7C3AED (violet), Secondary #06D6A0 (teal)
- **Background**: #0A0A0F, Surface: #16161F
- **Logo**: Hexagon SVG (public/zethia-hexagon.svg)
- **Font**: System font stack (Geist removed due to Google Fonts fetch issues)
- **Tagline**: "Prove Everything. Reveal Nothing."

## Known Issues

1. **Proof page at /proof without searchParams** shows "Credential Not Found" — needs fallback
2. **Google Fonts fetch fails** on some networks — switched to system fonts
3. **Soroban WASM build is slow on /mnt/c cross-mount** — copy to /tmp first (see build commands)
4. **No wallet disconnect flow** — Freighter disconnect not implemented yet
5. **Boilerplate public/ assets** (file.svg, globe.svg, etc.) still present — not cleaned up

## Git Log

```
7d616e8 docs: demo video script, pitch narrative, screenshots dir
f8249c1 feat: Soroban contract deployed to testnet
9054f9d fix: Soroban SDK version 27.0.0-rc.1
39ac45f docs: README, hexagon logo
2f75147 feat: full frontend — dashboard, proof, demo, wallet
154b1fc feat: landing page with brand styling
4156b54 feat: Noir circuit, Soroban contract, architecture docs
4e09705 feat: strip boilerplate, Zethia branding, PRD
```

## What Needs Doing Before Submission

1. [ ] Take screenshots: landing, dashboard, proof, demo, stellar.expert contract
2. [ ] Record demo video (script in docs/DEMO_VIDEO_PLAN.md)
3. [ ] Submit to DoraHacks at dorahacks.io/hackathon/stellar-hacks-zk
4. [ ] Clean up boilerplate public/ assets (file.svg, globe.svg, etc.)
5. [ ] Add screenshot thumbnails to README

## WSL Toolchain

- **nargo**: `/home/mystiquemide/.nargo/bin/nargo` (v1.0.0-beta.22)
- **soroban**: `/usr/local/bin/soroban` (stellar-cli v27.0.0)
- **rustc**: `/home/mystiquemide/.cargo/bin/rustc` (1.96.0)
- **Soroban keys**: `parcis-deployer` (configured in WSL soroban keystore)

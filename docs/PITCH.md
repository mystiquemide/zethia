# Zethia — Live Pitch Script

**Duration**: 2:30 | **Format**: 6 slides + live demo

---

## Slide 1: Problem (20s)

"Every transaction on Stellar is public. Your balance, your history, your entire financial life — anyone can look it up. That transparency is great for trust but terrible for privacy.

If you want a loan on Stellar DeFi today, you have two bad options: doxx your entire wallet so the protocol can assess your credit, or stay anonymous and get denied.

There's no middle ground. Until now."

---

## Slide 2: Solution (20s)

"Zethia gives you that middle ground. Zero-knowledge credentials for Stellar DeFi.

You prove your credit score is above 650 — without revealing the actual number. You prove you passed KYC — without sharing your passport again. The only thing that goes on-chain is a cryptographic proof. Let me show you."

---

## Slide 3: Live Demo (60-90s)

*[Switch to browser — Zethia dashboard is pre-loaded]*

"This is Zethia running on Stellar testnet right now. Three credentials ready to go: Credit Score, KYC Verified, Age 18+.

I'll prove my credit score is above 650. One click. The proof generates in my browser — my actual score never leaves this machine. Noir compiles our ZK circuit to WASM, so the proving happens client-side.

Now I submit the proof to our Soroban verifier contract on Stellar testnet. Contract checks the proof, stores the threshold on-chain. Anyone can verify this on Stellar Expert right now. Here's the transaction.

Now the real use case. A DeFi lending protocol needs to verify credit before approving a loan. Watch this.

*[Navigate to Demo page, click through the flow]*

Connect wallet, generate proof, submit. Loan approved — 5,000 XLM. And what did the protocol learn about me? Nothing. My credit score stays private. Only the proof is on-chain. That's zero-knowledge."

---

## Slide 4: Architecture (15s)

"Under the hood: Noir circuits define what we prove. Soroban smart contracts verify proofs on-chain. Stellar testnet is our trust layer. The whole thing is open source — Noir circuit, Soroban contract, and Next.js frontend."

---

## Slide 5: Impact (20s)

"This works today for credit scores. Tomorrow it works for KYC credentials, accredited investor verification, DAO governance — any scenario where you need to prove something without revealing everything.

We built the ZK credential layer that Stellar DeFi has been missing."

---

## Slide 6: Team (10s)

"I'm MystiqueMide. Built this in 5 days for Stellar Hacks: Real-World ZK. Code is on GitHub. Try the demo yourself."

---

## Q&A Prep

**"How is this different from a privacy pool like Tornado Cash?"**
Tornado Cash hides transactions completely. Zethia does selective disclosure — you choose exactly what to reveal. That makes it regulatory-friendly. Banks and institutions can use this.

**"What did you build vs what's from existing tools?"**
The Noir ZK circuit, the Soroban verifier contract, and the Next.js frontend are all original. We use Freighter for wallet connection and Stellar testnet as the network — smart choices under time constraints.

**"Why Stellar?"**
Protocol 25 and 26 added ZK primitives to Soroban. No one has built a credential layer on top of them yet. We're first to market on this chain.

**"What's the business model?"**
Issuers pay to register credentials. Verifiers pay per verification. But honestly — that's post-hackathon. Right now we're showing ZK can be practical, not just academic.

**"How does this handle edge cases like credential revocation?"**
That's on the roadmap. The verifier contract can check a revocation registry. We'd add it as a public input to the circuit — if the credential is revoked, the proof fails.

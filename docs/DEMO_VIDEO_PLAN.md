# Zethia — Demo Video Plan

**Duration**: 2:30-3:00
**Style**: Voiceover + screen capture + captions
**Tone**: Confident founder showing a real product. Conversational, not documentary narrator.

---

## Scene 1: Hook + Problem (0:00-0:20)

**Visual**: Dark screen fades in. Zethia hexagon logo pulses once. Cut to a Stellar block explorer showing a public transaction with amounts visible.

**Voiceover**: "Every transaction on Stellar is public. Your balance, your history, your entire financial life — visible to anyone. That's great for transparency. Terrible for privacy."

**Caption**: "Every Stellar transaction is public."

---

## Scene 2: The Solution (0:20-0:35)

**Visual**: Zethia dashboard loads. Three credential cards appear: Credit Score, KYC Verified, Age 18+. Clean dark UI with violet accents.

**Voiceover**: "Zethia changes that. Zero-knowledge credentials for Stellar DeFi. Prove your credit score is above 650 without revealing the actual number. Prove you passed KYC without sharing your passport again."

**Caption**: "Prove everything. Reveal nothing."

---

## Scene 3: Connect Wallet (0:35-0:50)

**Visual**: Click "Connect Freighter" button. Wallet extension popup appears. Click approve. Dashboard shows connected address: GABC...XYZ and testnet balance: 10,000 XLM.

**Voiceover**: "Connect your Freighter wallet. Everything runs on Stellar testnet — no real funds, but real contracts, real proofs, real verification."

**Caption**: "Connect Freighter wallet to Stellar testnet."

---

## Scene 4: Generate ZK Proof (0:50-1:20)

**Visual**: Click "Generate Proof" on the Credit Score card. Proof generation screen appears. Progress spinner for 2 seconds. Proof hash displays: 0x7a3b...f21e. Generation time: 1.8s.

**Voiceover**: "Let me prove my credit score is above 650. One click. The proof generates entirely in my browser — my actual score never leaves this machine. Noir compiles our ZK circuit to WASM, so proving happens client-side."

**Caption**: "ZK proof generated in-browser. Your data never leaves your machine."

---

## Scene 5: Verify on Stellar (1:20-1:50)

**Visual**: Click "Verify on Stellar" button. Loading state for 1.5 seconds. Green checkmark appears. Transaction hash displayed: bc7a65460e78... Link to stellar.expert.

**Voiceover**: "Submit the proof to our Soroban verifier contract on Stellar testnet. The contract checks the proof and stores the verified threshold on-chain. Anyone can verify this transaction on Stellar Expert right now."

**Caption**: "Verified on-chain. Contract: CALMKGAJFJFM2PGXQJU2I6NWUOFCI6VOO347DGL6GLE27LBWHLCJ2UXJ"

---

## Scene 6: Demo Lending Flow (1:50-2:15)

**Visual**: Navigate to Demo page. "Apply for Loan" card with requirement: Credit Score > 650. Step indicators: 1-2-3-4. Click through: Connect → Generate Proof (2s) → Submit → "Loan Approved! 5,000 XLM" with green animation.

**Voiceover**: "Here's the real-world use case. A DeFi lending protocol needs to verify your credit score before approving a loan. Zethia generates the proof, submits to Soroban, and the protocol approves — without ever seeing your actual credit score."

**Caption**: "Loan approved. Credit score remains private."

---

## Scene 7: What Was Revealed (2:15-2:30)

**Visual**: Panel slides in: "What was revealed: NOTHING. Your credit score stays private. Only the proof goes on-chain."

**Voiceover**: "And here's what the protocol learned about me. Nothing. My credit score stays private. The only thing on-chain is a cryptographic proof that I meet the threshold. That's zero-knowledge."

**Caption**: "ZK proofs: verify without revealing."

---

## Scene 8: Tech Stack + End Card (2:30-2:50)

**Visual**: Grid of logos: Stellar, Soroban, Noir, RISC Zero, Freighter. Then end card: Zethia logo, "Built for Stellar Hacks: Real-World ZK 2026", GitHub URL, live URL.

**Voiceover**: "Built with Noir for zero-knowledge circuits, Soroban for on-chain verification, and Stellar testnet as our trust layer. Zethia is fully open source. Try the demo, fork the repo, or deploy your own verifier contract."

**Caption**: "github.com/MystiqueMide/zethia"

---

## Recording Checklist

### Before Recording
- [ ] Open fresh Chrome profile (no extensions cluttering)
- [ ] Set resolution to 1920x1080
- [ ] `npm run dev` on port 3456, verify all pages load
- [ ] Pre-sign any transactions (use mock flow)
- [ ] Close all other apps, tabs, notifications
- [ ] Test microphone, check for background noise
- [ ] Have backup screenshots ready in /docs/screenshots/

### During Recording
- [ ] Move cursor deliberately, pause on key elements
- [ ] No typing — pre-fill everything
- [ ] If wallet popup lags, cut and re-record that scene
- [ ] Record in one take per scene, edit together later

### After Recording
- [ ] Trim dead air at start and end of each scene
- [ ] Add captions (CapCut auto-captions then edit)
- [ ] Normalize audio to -16 LUFS
- [ ] Export: 1080p, 30fps, H.264, MP4
- [ ] Add end card with GitHub URL and live URL
- [ ] Watch full video once before submitting

## Production Notes

- **Voiceover**: Record in CapCut Desktop while watching the screen recording. Conversational tone — like explaining to a friend.
- **Captions**: Burnt-in, white text on dark semi-transparent bar at bottom. Font: Inter (matching Zethia brand).
- **Transitions**: Simple cuts. No effects. This is a security/infra product — clean and clinical.
- **Audio**: No background music during demo. Light ambient under intro/outro only.
- **End card**: Zethia hexagon logo, "github.com/MystiqueMide/zethia", "Built for Stellar Hacks: Real-World ZK 2026"

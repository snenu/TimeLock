# ⏰ TimeLock Contacts

<div align="center">

![TimeLock Logo](public/logo.svg)

**Send Messages, Files, and Crypto Into the Future**

[![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js%2015-black?logo=next.js)](https://nextjs.org/)
[![Polygon Mainnet](https://img.shields.io/badge/Network-Polygon%20Mainnet-8247E5?logo=polygon)](https://polygon.technology/)
[![Powered by Pinata](https://img.shields.io/badge/Storage-Pinata%20IPFS-00B8D4)](https://pinata.cloud/)
[![AI by Gemini](https://img.shields.io/badge/AI-Gemini%20Flash-4285F4?logo=google)](https://ai.google.dev/)

</div>

---


## 🌟 What is TimeLock Contacts?

**TimeLock Contacts** is a revolutionary time capsule application that lets you send messages, files, and cryptocurrency to the future. Create emotional letters, store precious memories, schedule crypto transfers, or set up a digital legacy — all secured on-chain and encrypted on IPFS.

### ✨ Core Features

- 💌 **Future Messages** — Write heartfelt letters delivered at the perfect moment
- 📁 **File Time Capsules** — Store photos, videos, documents securely until unlock date
- 💰 **Scheduled Crypto Transfers** — Send cryptocurrency to loved ones at any future date
- 🤖 **AI Message Enhancement** — Gemini AI enhances your messages with emotional depth
- 🔐 **Blockchain Security** — Tamper-proof storage on Polygon + encrypted IPFS
- 🎯 **Multiple Unlock Methods** — Date-based, age-based, condition-based, or inactivity triggers
- 🔒 **End-to-End Encryption** — Your content stays private until unlock

---

## 🚀 How It Works

### User Flow

```
1️⃣ Connect Wallet (MetaMask/WalletConnect)
       ↓
2️⃣ Create TimeLock
   - Select type: Message, File, or Crypto Transfer
   - Choose recipient (self, partner, family, child, friend)
   - Add content or upload files
   - Optionally enhance with Gemini AI
       ↓
3️⃣ Set Unlock Method
   - Date/time unlock
   - Age-based unlock
   - Inactivity-based (legacy mode)
   - Custom condition unlock
       ↓
4️⃣ Encrypt & Store
   - Content encrypted with AES-256
   - Uploaded to IPFS via Pinata
   - Hash stored on-chain via smart contract
       ↓
5️⃣ Unlock When Ready
   - Smart contract verifies unlock time
   - Content decrypted and revealed
   - Crypto automatically claimable (if applicable)
```

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS 4 + Framer Motion
- **UI Components**: Radix UI + shadcn/ui
- **Web3**: wagmi, viem, ethers.js

### Backend & APIs
- **API Routes**: Next.js API routes
- **AI Enhancement**: Google Gemini 1.5 Flash
- **File Storage**: Pinata IPFS
- **Encryption**: crypto-js (AES-256)

### Blockchain
- **Smart Contract**: Solidity
- **Network**: Polygon Mainnet
- **Development**: Hardhat
- **Wallet Integration**: WalletConnect, MetaMask

---

## 📦 Installation & Setup

### Prerequisites

- Node.js 18+ or Bun
- MetaMask or compatible Web3 wallet
- POL on Polygon mainnet (buy from [exchanges](https://www.coinbase.com/price/polygon-ecosystem-token))

### 1. Clone Repository

```bash
git clone https://github.com/yourusername/orchids-timelock-app.git
cd orchids-timelock-app
```

### 2. Install Dependencies

```bash
bun install
# or
npm install
```

### 3. Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

Required variables:

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_CONTRACT_ADDRESS` | Deployed TimeLock contract address (see deployment section) |
| `NEXT_PUBLIC_CHAIN_ID` | Chain ID (`137` for Polygon Mainnet) |
| `NEXT_PUBLIC_RPC_URL` | RPC URL (`https://polygon.drpc.org`) |
| `NEXT_PUBLIC_WC_PROJECT_ID` | [WalletConnect](https://cloud.walletconnect.com/) project ID |
| `PINATA_API_KEY` | [Pinata](https://pinata.cloud/) API key (server-only; uploads go via `/api/pinata/upload`) |
| `PINATA_SECRET_KEY` or `PINATA_SECRET_API_KEY` | Pinata secret key (server-only) |
| `PINATA_JWT` | Pinata JWT (server-only; required for file uploads) |
| `GEMINI_API_KEY` | [Google AI](https://ai.google.dev/) API key for message enhancement |
| `MODEL_NAME` | (Optional) Gemini model, e.g. `gemini-2.0-flash-exp` |
| `STRIPE_SECRET_KEY` | [Stripe](https://dashboard.stripe.com/apikeys) secret key (for Pro checkout) |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key (if using client-side Stripe) |
| `PRIVATE_KEY` | (Optional) Wallet private key for contract deployment only |

### 4. Run Development Server

```bash
bun dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

---

## 📝 Smart Contract Deployment

### Deploy to Polygon Mainnet

```bash
# Install dependencies (use --legacy-peer-deps if needed)
npm install --legacy-peer-deps

# Ensure PRIVATE_KEY and POLYGON_MAINNET_RPC are set in .env
# Deployer wallet must have POL for gas

# Deploy contract
npm run deploy:mainnet

# Copy deployed contract address to .env
# NEXT_PUBLIC_CONTRACT_ADDRESS=0x...
```

### Contract Addresses
- **Polygon Mainnet**: `0x383Ac49c5379ECB0adE722C45A3b403aa512E607` ([PolygonScan](https://polygonscan.com/address/0x383Ac49c5379ECB0adE722C45A3b403aa512E607))
- **Polygon Amoy** (testnet): `npm run deploy:amoy` for testnet deployment

---

## Update in Wave 6

### Network Migration
- **Switched from Polygon Amoy (Testnet) to Polygon Mainnet**
- Chain ID: 137
- RPC: https://polygon-mainnet.g.alchemy.com/v2/... (or https://polygon.drpc.org)
- Explorer: https://polygonscan.com

### Contract (Deployed)
- **Mainnet contract address**: `0x383Ac49c5379ECB0adE722C45A3b403aa512E607`
- **Explorer**: [View on PolygonScan](https://polygonscan.com/address/0x383Ac49c5379ECB0adE722C45A3b403aa512E607)
- **Deployer**: 0x1E3c4C991F9aaADA12Ab1588cD02D545545d02FE
- **Deployed**: 2026-03-05

To redeploy: Run `npm run deploy:mainnet` (uses `deploy-standalone.mjs`), then copy the printed address to `NEXT_PUBLIC_CONTRACT_ADDRESS` in your `.env` file.

### Environment Variable Aliases
- `PINATA_SECRET_API_KEY` = `PINATA_SECRET_KEY` (both supported)
- `NEXT_PUBLIC_POLYGON_MAINNET_RPC` = `NEXT_PUBLIC_RPC_URL` (both supported)
- `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` = `NEXT_PUBLIC_WC_PROJECT_ID` (both supported)

### Improvements Made
- **Network**: Full migration to Polygon Mainnet; all UI, config, and links updated
- **Security**: Added `.env` and `.env.local` to `.gitignore` to prevent secret exposure
- **Config**: `hardhat.config.js` with polygonMainnet network; `deploy.cjs` supports mainnet and testnet
- **UI**: Landing badge "PRODUCTION READY • POLYGON MAINNET"; footer links point to polygonscan.com and Get POL
- **Network Switcher**: Prompts users to switch to Polygon Mainnet instead of Amoy
- **Settings**: Updated contract explorer link and Resources (Get POL, PolygonScan)
- **Dashboard**: Added "View on Explorer" link on each TimeLock card
- **Create**: Confetti celebration on successful TimeLock creation
- **SEO**: Enhanced metadata with Open Graph and Twitter card for production
- **Deployment**: `npm run deploy:mainnet` (standalone ethers script) and `npm run deploy:amoy` scripts added
- **Build**: WalletConnect connector temporarily excluded (use MetaMask/injected); `@wagmi/core` used for injected connector to avoid pnpm path issues
- **Deploy script**: `deploy-standalone.mjs` for mainnet when Hardhat has ESM issues

---

## 🚢 Production / Mainnet

1. **Build**: Run `npm run build` and fix any TypeScript or ESLint errors.
2. **Environment**: Set all production env vars (no `NEXT_PUBLIC_` for secrets). Use mainnet RPC and contract address when moving off testnet.
3. **Checklist**: Contract address, RPC URL, WalletConnect project ID, Stripe live keys and webhook URL, Pinata and Gemini keys.
4. **Deploy**: Use your preferred host (Vercel, etc.). Configure Stripe webhook to point to `https://your-domain.com/api/stripe/webhook`.

---

## 🎨 App Pages

| Page | Route | Description |
|------|-------|-------------|
| **Landing** | `/` | Hero section with features showcase |
| **Dashboard** | `/dashboard` | View all sent and received TimeLocks |
| **Create** | `/create` | 3-step wizard to create new TimeLock |
| **Unlock** | `/unlock` | Enter TimeLock ID to view or unlock |
| **Unlock** | `/unlock/[id]` | View and unlock TimeLock details |
| **Pricing** | `/pricing` | Free and Pro plans |
| **Checkout** | `/checkout` | Stripe checkout for Pro upgrade |
| **Success** | `/checkout/success` | Post-checkout confirmation |
| **Settings** | `/settings` | Wallet info and app preferences |

---

## 🔐 Security Features

- ✅ **End-to-End Encryption** — AES-256 encryption for all content
- ✅ **On-Chain Immutability** — Smart contract prevents tampering
- ✅ **Decentralized Storage** — IPFS ensures data persistence
- ✅ **Private Keys Never Exposed** — Encryption keys stored securely
- ✅ **Time-Locked Execution** — Smart contract enforces unlock times

---

## 🌈 Use Cases

- 💑 **Love Letters** — Romantic messages for anniversaries
- 🎂 **Birthday Wishes** — Surprise messages for future birthdays
- 👨‍👩‍👧 **Family Messages** — Memories for children when they grow up
- 🎓 **Graduation Messages** — Inspirational notes for milestone achievements
- 💼 **Digital Will** — Legacy mode activates if you're inactive
- 💸 **Scheduled Payments** — Crypto gifts for future events
- 📜 **Legal Documents** — Time-released contracts and agreements

---

## 🧪 API Endpoints

### POST `/api/enhance`

Enhance message with Gemini AI.

**Request:**
```json
{
  "message": "Your original message",
  "recipientType": "partner"
}
```

**Response:**
```json
{
  "enhanced": "AI-enhanced emotional message"
}
```

---

## 📖 Contract Functions

### `createTimeLock()`
Create new TimeLock with encrypted IPFS hash, unlock time, and optional crypto amount.

### `unlockTimeLock(uint256 _id)`
Unlock TimeLock when time condition is met.

### `claimCrypto(uint256 _id)`
Claim locked cryptocurrency after unlock.

### `getTimeLock(uint256 _id)`
Retrieve TimeLock details by ID.

---

## 🛣️ Roadmap

- [ ] Add location-based unlock triggers
- [ ] NFT minting for unlocked memories
- [ ] Multi-signature TimeLocks
- [ ] Group time capsules
- [ ] Voice/video recording support
- [ ] Mobile app (React Native)

---

## 🤝 Contributing

Contributions welcome! Please open an issue or submit a PR.

---

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

---

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Powered by [Polygon](https://polygon.technology/)
- Stored on [Pinata IPFS](https://pinata.cloud/)
- Enhanced by [Google Gemini](https://ai.google.dev/)

---

<div align="center">

**⏰ Made with ❤️ for preserving memories and connecting across time**

[Website](https://timelock-contacts.vercel.app) • [Twitter](https://twitter.com/timelockapp) • [Discord](https://discord.gg/timelockapp)

</div>

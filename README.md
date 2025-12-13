# ⏰ TimeLock Contacts

<div align="center">

![TimeLock Logo](public/logo.svg)

**Send Messages, Files, and Crypto Into the Future**

[![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js%2015-black?logo=next.js)](https://nextjs.org/)
[![Polygon Amoy](https://img.shields.io/badge/Network-Polygon%20Amoy-8247E5?logo=polygon)](https://polygon.technology/)
[![Powered by Pinata](https://img.shields.io/badge/Storage-Pinata%20IPFS-00B8D4)](https://pinata.cloud/)
[![AI by Gemini](https://img.shields.io/badge/AI-Gemini%20Flash-4285F4?logo=google)](https://ai.google.dev/)

</div>





---


live url - https://timelockh.vercel.app/

live demo url - https://youtu.be/Y_Z60a_I6LQ

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
- **Network**: Polygon Amoy Testnet
- **Development**: Hardhat
- **Wallet Integration**: WalletConnect, MetaMask

---

## 📦 Installation & Setup

### Prerequisites

- Node.js 18+ or Bun
- MetaMask or compatible Web3 wallet
- Polygon Amoy testnet tokens (get from [faucet](https://faucet.polygon.technology/))

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

Create a `.env.local` file in the root directory:

```env
# Blockchain
PRIVATE_KEY=your_wallet_private_key
POLYGON_AMOY_RPC=https://polygon-amoy.g.alchemy.com/v2/YOUR_KEY
NEXT_PUBLIC_CHAIN_ID=80002
NEXT_PUBLIC_RPC_URL=https://polygon-amoy.g.alchemy.com/v2/YOUR_KEY
NEXT_PUBLIC_CONTRACT_ADDRESS=your_deployed_contract_address

# WalletConnect
NEXT_PUBLIC_WC_PROJECT_ID=your_walletconnect_project_id

# Pinata IPFS
NEXT_PUBLIC_PINATA_API_KEY=your_pinata_api_key
NEXT_PUBLIC_PINATA_SECRET_KEY=your_pinata_secret_key
NEXT_PUBLIC_PINATA_JWT=your_pinata_jwt_token

# Gemini AI
GEMINI_API_KEY=your_gemini_api_key
```

### 4. Run Development Server

```bash
bun dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

---

## 📝 Smart Contract Deployment

### Deploy to Polygon Amoy

```bash
# Compile contract
npx hardhat compile

# Deploy contract
npx hardhat run scripts/deploy.js --network amoy

# Copy deployed contract address to .env.local
# NEXT_PUBLIC_CONTRACT_ADDRESS=0x...
```

### Contract Address
- **Polygon Amoy**: `0xA8006F58a9fe59e23a8768549ebfA89A9dE75908`

---

## 🎨 App Pages

| Page | Route | Description |
|------|-------|-------------|
| **Landing** | `/` | Hero section with features showcase |
| **Dashboard** | `/dashboard` | View all sent and received TimeLocks |
| **Create** | `/create` | 3-step wizard to create new TimeLock |
| **Unlock** | `/unlock/[id]` | View and unlock TimeLock details |
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

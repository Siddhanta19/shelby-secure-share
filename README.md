<p align="center">
  <a href="https://shelby.xyz">
    <img src="https://avatars.githubusercontent.com/u/219037914?s=96&v=4" alt="Shelby Logo" width="96" height="96">
    <h3 align="center">Secure Share</h3>
  </a>
</p>

<p align="center">
  Decentralized file sharing powered by the <a href="https://shelby.xyz">Shelby Protocol</a> on Aptos.
</p>

<p align="center">
  <a href="https://docs.shelby.xyz">Documentation</a>
  &nbsp;|&nbsp;
  <a href="https://github.com/shelby">Shelby GitHub</a>
  &nbsp;|&nbsp;
  <a href="https://x.com/shelbyserves">@shelbyserves</a>
</p>

---

## About

**Secure Share** is a decentralized file sharing portal built on the [Shelby Protocol](https://docs.shelby.xyz/protocol) — a decentralized blob storage system on the Aptos network.

Connect your wallet, upload any file, and share it via a direct link. No sign-ups, no centralized servers — just your wallet and the Shelby network.

### Features

- 🔗 **Wallet-based authentication** — Connect via Petra or any Aptos-compatible wallet
- 📤 **File upload** — Upload any file to decentralized Shelby blob storage
- 📋 **Shareable links** — Generate and copy direct download links for your files
- 📂 **Blob explorer** — View all blobs uploaded by your account
- 💰 **ShelbyUSD faucet** — Mint testnet tokens to pay for storage

## Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) with Turbopack
- **Storage:** [@shelby-protocol/sdk](https://docs.shelby.xyz/sdks/typescript)
- **Wallet:** [@aptos-labs/wallet-adapter-react](https://github.com/aptos-labs/aptos-wallet-adapter)
- **UI:** [@shelby-protocol/ui](https://github.com/shelby) components
- **Monorepo:** [Turborepo](https://turborepo.com/) + [pnpm](https://pnpm.io/)

## Prerequisites

- Node.js >= 22.15.0
- pnpm >= 10.10.0
- An Aptos-compatible wallet browser extension (e.g., [Petra](https://petra.app/))

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Siddhanta19/shelby-secure-share.git
cd shelby-secure-share
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Configure environment variables

Create a `.env.local` file inside `apps/secure-share/`:

```bash
cp apps/secure-share/.env.example apps/secure-share/.env.local
```

Then edit it with your credentials:

```env
NEXT_PUBLIC_SHELBY_API_KEY=AG-your-api-key-here
NEXT_PUBLIC_SHELBY_API_URL=https://api.shelbynet.shelby.xyz
NEXT_PUBLIC_APTOS_API_KEY=
```

> You can get a Shelby API key from the [Shelby docs](https://docs.shelby.xyz/sdks/typescript).

### 4. Run the development server

```bash
cd apps/secure-share
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. **Connect your wallet** — Click the wallet button in the top-right corner
2. **Mint ShelbyUSD** — Click "Mint shelbyUSD" to get testnet tokens for storage fees
3. **Upload a file** — Choose a file and click "Upload"
4. **Share** — Use "Open File" to view or "Copy Link" to share the download URL

## Build

```bash
pnpm build --filter=@shelby-protocol/secure-share
```

## Project Structure

```
apps/secure-share/
├── app/                  # Next.js app router
│   ├── layout.tsx        # Root layout with wallet provider
│   └── page.tsx          # Main page with hero, upload, and blob list
├── components/
│   ├── Header.tsx        # App header with wallet connection
│   ├── FileUpload.tsx    # File selection and upload UI
│   ├── AccountBlobs.tsx  # Lists uploaded blobs with share actions
│   └── WalletProvider.tsx # Aptos wallet adapter setup
├── hooks/
│   ├── useSubmitFileToChain.tsx  # Registers blob on-chain
│   └── useUploadFile.tsx        # Uploads file data to Shelby RPC
└── utils/
    ├── client.ts         # Shelby + Aptos client initialization
    └── encodeFile.ts     # Generates blob commitments via erasure coding
```

## License

MIT

---

Built with ❤️ using the [Shelby Protocol](https://shelby.xyz)

# ChadWallet

A premium cryptocurrency trading platform built with **Next.js 15**, focused on fast execution, real-time market data, and a modern trading experience.

## 🚀 Live Demo

**Production:** https://chad-wallet-two.vercel.app/

---

## Tech Stack

* **Framework:** Next.js 15 (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS + shadcn/ui
* **Animation:** Framer Motion
* **State Management:** Zustand
* **Data Fetching:** TanStack Query
* **Database:** Supabase
* **Authentication:** Privy (Google Authentication)
* **Blockchain:** Solana
* **APIs & Services:**

  * BirdEye
  * DexScreener
  * Jupiter
  * Alchemy RPC
  * TradingView

---

## Features

* Modern crypto trading interface
* Live trending tokens
* Token search
* Interactive trading pages
* Live market statistics
* Token watchlist & favorites
* Wallet authentication with Privy
* Responsive desktop & mobile UI
* Animated token ticker
* Real-time token data from BirdEye & DexScreener
* TradingView charts (supported markets)

---

## Getting Started

### Install dependencies

```bash
npm install
```

### Configure environment variables

```bash
cp .env.example .env.local
```

Fill in the required API keys and credentials.

### Database

Apply the SQL schema located at:

```text
supabase/schema.sql
```

to your Supabase project.

### Start development

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## Environment Variables

Refer to `.env.example` for all required variables.

Enable live market data:

```env
NEXT_PUBLIC_USE_LIVE_DATA=true
```

---

## Project Structure

```text
src/
├── app/               # App Router pages
├── components/        # Shared UI components
├── constants/         # Application constants
├── features/          # Feature modules
├── hooks/             # Custom React hooks
├── lib/               # Utilities
├── providers/         # React providers
├── services/          # API integrations
├── store/             # Zustand stores
├── styles/            # Global styles
├── types/             # TypeScript types
└── utils/             # Helper functions
```

---

## Deployment

Deploy using Vercel:

```bash
vercel deploy
```

Production URL:

```text
https://chad-wallet-two.vercel.app/
```

---

## License

Private — All Rights Reserved.

# ChadWallet

Premium cryptocurrency trading platform built with Next.js 15.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Animation**: Framer Motion
- **State**: Zustand
- **Data Fetching**: TanStack Query
- **Database**: Supabase
- **Auth**: Privy (Google + Apple)
- **APIs**: BirdEye, Alchemy, Jupiter, TradingView

## Getting Started

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Run database migrations
# Apply supabase/schema.sql to your Supabase project

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

See `.env.example` for all required variables.

Set `NEXT_PUBLIC_USE_LIVE_DATA=true` to switch from mock data to live BirdEye/Jupiter APIs.

## Project Structure

```
src/
├── app/           # Next.js App Router pages
├── components/    # Shared UI components
├── features/      # Feature-based modules
├── hooks/         # Custom React hooks
├── lib/           # Utilities and mock data
├── providers/     # React context providers
├── services/      # API service layer
├── store/         # Zustand stores
├── types/         # TypeScript types
├── utils/         # Helper functions
├── styles/        # Global styles
└── constants/     # App constants
```

## Deployment

Deploy to Vercel:

```bash
vercel deploy
```

## License

Private - All rights reserved.

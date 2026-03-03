# ArtDrop — AI Art for Your Walls

A full-stack MVP web application for personalized AI art. Users browse templates, customize styles, upload personal photos to stylize, and order framed prints delivered to their door.

![Next.js](https://img.shields.io/badge/Next.js-14-black) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC) ![Supabase](https://img.shields.io/badge/Supabase-Auth%20%2B%20DB-3ECF8E) ![Stripe](https://img.shields.io/badge/Stripe-Payments-635BFF)

---

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS — bold, editorial design studio aesthetic
- **Auth + Database:** Supabase (Auth + Postgres + Storage)
- **AI Image Generation:** Hugging Face Inference API (`stabilityai/stable-diffusion-2`)
- **Payments:** Stripe (Checkout Sessions)

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm
- A [Supabase](https://supabase.com) project
- A [Hugging Face](https://huggingface.co) account (free tier)
- A [Stripe](https://stripe.com) account (test mode)

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd aiart
npm install
```

### 2. Configure Environment Variables

Copy the example env file and fill in your keys:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your values:

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL (e.g. `https://abc123.supabase.co`) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous/public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server-side only) |
| `HUGGINGFACE_API_TOKEN` | Your Hugging Face API token |
| `STRIPE_SECRET_KEY` | Stripe secret key (starts with `sk_test_`) |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret (starts with `whsec_`) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key (starts with `pk_test_`) |

### 3. Set Up Supabase Database

Run these SQL commands in your Supabase SQL editor:

```sql
-- Designs table
CREATE TABLE designs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  template_id TEXT NOT NULL,
  prompt TEXT NOT NULL,
  style TEXT NOT NULL,
  palette TEXT,
  image_url TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Orders table
CREATE TABLE orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  design_id UUID REFERENCES designs(id) ON DELETE SET NULL,
  frame_style TEXT NOT NULL,
  size TEXT NOT NULL,
  stripe_session_id TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE designs ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Designs: users can only see/manage their own
CREATE POLICY "Users can view own designs" ON designs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own designs" ON designs FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own designs" ON designs FOR DELETE USING (auth.uid() = user_id);

-- Orders: users can view their own
CREATE POLICY "Users can view own orders" ON orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Service role can insert orders" ON orders FOR INSERT WITH CHECK (true);
```

### 4. Set Up Supabase Storage

Create a storage bucket named `images` in your Supabase dashboard for uploaded and generated images.

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

---

## Pages & Features

| Route | Description |
|---|---|
| `/` | Homepage — hero section + masonry grid of AI art templates with category filters |
| `/customize/[templateId]` | Customization Studio — prompt input, style selector, color palette, photo upload, AI generation |
| `/order/[designId]` | Order Page — frame style/size selection, pricing, Stripe checkout |
| `/order/success` | Order confirmation page |
| `/gallery` | User's saved designs (auth required) — edit, delete, order actions |

## API Routes

| Endpoint | Method | Description |
|---|---|---|
| `/api/generate` | POST | Takes `{ prompt, style, imageBase64? }`, calls Hugging Face, returns image |
| `/api/save-design` | POST | Saves design to Supabase (auth required) |
| `/api/create-checkout` | POST | Creates a Stripe Checkout Session |
| `/api/webhook/stripe` | POST | Handles Stripe webhooks to update order status |

---

## Stripe Test Mode

This app uses Stripe in **test mode**. Use these test card details:

| Card Number | Expiry | CVC | Result |
|---|---|---|---|
| `4242 4242 4242 4242` | Any future date | Any 3 digits | ✅ Successful payment |
| `4000 0000 0000 3220` | Any future date | Any 3 digits | 🔐 3D Secure required |
| `4000 0000 0000 0002` | Any future date | Any 3 digits | ❌ Declined |

---

## Design System

- **Fonts:** Inter (body), DM Serif Display (headings) — via Google Fonts
- **Colors:** Off-white `#F5F5F0` background, near-black `#111111` foreground, deep forest green `#1A4A3A` accent
- **Typography:** Large, confident headings (60–80px desktop)
- **Buttons:** Sharp corners, bold weight
- **Minimal borders, heavy whitespace**
- **Image cards:** Subtle hover zoom effect

---

## Folder Structure

```
src/
├── app/
│   ├── api/
│   │   ├── generate/route.ts
│   │   ├── save-design/route.ts
│   │   ├── create-checkout/route.ts
│   │   └── webhook/stripe/route.ts
│   ├── customize/[templateId]/page.tsx
│   ├── gallery/page.tsx
│   ├── order/
│   │   ├── [designId]/page.tsx
│   │   └── success/page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── AuthModal.tsx
│   ├── Navbar.tsx
│   └── TemplateCard.tsx
├── context/
│   └── AuthContext.tsx
├── data/
│   └── templates.ts
└── lib/
    ├── stripe.ts
    ├── supabase-server.ts
    └── supabase.ts
```

---

## Notes

- The Hugging Face API call includes a 30-second timeout with a placeholder image fallback
- Without environment variables configured, the app runs in demo mode using placeholder SVG images
- Stripe webhook requires setting up a webhook endpoint in your Stripe dashboard pointing to `/api/webhook/stripe`

---

## License

MIT

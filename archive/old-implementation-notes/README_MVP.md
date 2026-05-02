# 📸 SS Foto - O2O Photo Lab Platform (MVP)

> **Melayani kebutuhan fotografi keluarga Indonesia sejak 1986**

Modern web platform untuk **SS Foto Digital Lab** - layanan cetak foto profesional dengan 5 cabang fisik di Jabodetabek.

---

## 🎯 Project Overview

**Business Model:** O2O (Online-to-Offline)  
**Target:** Local customers in Jakarta, Bekasi, Bogor  
**USP:** Lab-quality printing (Silver Halide) vs cheap digital printing  
**Brand Voice:** "Sahabat Keluarga" - Warm & Trustworthy

### Key Features
- ⚡ **Pas Foto Express** - Order online, ready in 1 hour
- 🖼️ **Wall Decor Premium** - Custom canvas & frames
- 📚 **Photobook** - Hardcover albums with layflat binding
- 📷 **Studio Services** - Family & portrait photography
- 📍 **5 Physical Locations** - Pickup or shipping options

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 14 (App Router), React 18, TypeScript |
| **Styling** | Tailwind CSS, Lucide Icons |
| **Database** | Supabase (PostgreSQL) |
| **Storage** | Supabase Storage |
| **Auth** | Supabase Auth (planned) |
| **State** | Zustand |
| **Forms** | React Hook Form + Zod |
| **CMS** | Sanity.io (planned) |
| **Analytics** | PostHog (planned) |
| **Payment** | Midtrans (sandbox) |

---

## 📁 Project Structure

```
ssfoto-web/
├── supabase/                    # Database schemas
│   ├── schema.sql              # Main database
│   ├── pas_foto_orders.sql     # Pas foto feature
│   └── README.md               # Setup guide
│
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx            # ✅ Landing page
│   │   ├── layanan/            # ✅ Services
│   │   ├── lokasi/             # ✅ Store locations
│   │   ├── tentang-kami/       # ✅ About
│   │   ├── kontak/             # ✅ Contact
│   │   └── layout.tsx          # Root layout
│   │
│   ├── components/             # Reusable components
│   │   └── layout/            # Header, Footer
│   │
│   ├── lib/                    # Utilities
│   │   ├── supabase/          # DB client
│   │   └── utils/             # Helpers
│   │
│   ├── types/                  # TypeScript types
│   │   ├── database.ts        # Supabase types
│   │   ├── product.ts         # Product types
│   │   └── pas-foto.ts        # Pas foto types
│   │
│   └── store/                  # Zustand stores
│
├── public/                     # Static assets
├── FOLDER_STRUCTURE.md        # Complete folder guide
├── ENV_SETUP.md               # Environment setup
├── MVP_PROGRESS.md            # Development progress
└── README_MVP.md              # This file
```

---

## 🚀 Quick Start

### 1. Prerequisites
```bash
- Node.js 18+ 
- npm or yarn
- Supabase account (free tier OK)
```

### 2. Installation

```bash
# Clone repository
git clone <your-repo>
cd ssfoto-web

# Install dependencies
npm install

# Create environment file
cp .env.local.example .env.local
```

### 3. Environment Setup

Create `.env.local`:

```bash
# Supabase (REQUIRED)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

# App Config
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Get Supabase keys:**
1. Create project at https://supabase.com
2. Go to Settings → API
3. Copy URL and `anon/public` key

### 4. Database Setup

```bash
# 1. Open Supabase SQL Editor
# 2. Run: supabase/schema.sql
# 3. Run: supabase/pas_foto_orders.sql
# 4. Create Storage buckets:
#    - 'order-files' (Private)
#    - 'uploads' (Public)
```

Full guide: `supabase/README.md`

### 5. Run Development Server

```bash
npm run dev
# Opens at http://localhost:3000
```

---

## ✅ Current Features (Live)

### Public Pages
- ✅ **Landing Page** (`/`) - Hero, Why Us, Products, Locations
- ✅ **Services** (`/layanan`) - Product catalog with pricing
- ✅ **Store Locations** (`/lokasi`) - 5 branches with maps
- ✅ **About Us** (`/tentang-kami`) - Company history & values
- ✅ **Contact** (`/kontak`) - Contact form & info

### Components
- ✅ **Header** - Responsive navigation (Indonesian)
- ✅ **Footer** - Links, contact info, social media
- ✅ **SEO** - Metadata & structured data (JSON-LD)

### Infrastructure
- ✅ **Database Schema** - 7 tables with RLS
- ✅ **Supabase Client** - Configured & typed
- ✅ **Type System** - Complete TypeScript types
- ✅ **Utilities** - Currency, date formatters
- ✅ **State Management** - Zustand ready

---

## 🚧 Next Features (Roadmap)

### Phase 1: Pas Foto Orders (PRIORITY) ⚡
**Timeline:** 1-2 days

- [ ] Order form page (`/pesan-pas-foto`)
- [ ] Photo upload (Supabase Storage)
- [ ] Price calculator
- [ ] Order confirmation
- [ ] Order tracking (`/cek-status`)

**Impact:** Immediate revenue from most popular service

---

### Phase 2: Product Catalog
**Timeline:** 2-3 days

- [ ] Dynamic product listing (`/produk`)
- [ ] Product detail pages
- [ ] Category filtering
- [ ] Search functionality

---

### Phase 3: Shopping Cart
**Timeline:** 2-3 days

- [ ] Cart state management (Zustand)
- [ ] Add to cart functionality
- [ ] Cart sidebar
- [ ] Quantity management

---

### Phase 4: Checkout & Payment
**Timeline:** 3-4 days

- [ ] Checkout form
- [ ] Store selection
- [ ] Shipping options
- [ ] Midtrans integration (sandbox)
- [ ] Order confirmation email

---

### Phase 5: User Accounts
**Timeline:** 2-3 days

- [ ] Login / Register
- [ ] Profile management
- [ ] Order history
- [ ] Saved addresses

---

### Phase 6: Admin Dashboard
**Timeline:** 1 week

- [ ] Order management
- [ ] Product management
- [ ] Customer management
- [ ] Reports & analytics

---

## 📊 Database Schema

### Main Tables

```sql
profiles          -- User profiles
products          -- Product catalog (8 seeded)
stores            -- 5 physical locations (seeded)
orders            -- Main orders
order_items       -- Line items with uploads
uploaded_files    -- File tracking
pas_foto_orders   -- Quick pas foto orders
```

### Pas Foto Table Structure

```typescript
{
  id: uuid
  order_number: "PF-20241201-001"
  customer_name: string
  customer_whatsapp: string
  photo_url: string
  background_color: 'red' | 'blue' | 'white'
  print_size: '2x3' | '3x4' | '4x6' | 'mix'
  quantity_package: '4_pcs' | '8_pcs' | '12_pcs'
  branch_location: string
  total_price: number
  status: 'pending' | 'paid' | 'processing' | 'ready' | 'completed'
  created_at: timestamp
}
```

---

## 💰 Pricing Strategy

### Pas Foto Pricing (Auto-calculated)

| Size | 4 Lembar | 8 Lembar | 12 Lembar |
|------|----------|----------|-----------|
| 2x3  | Rp 30.000 | Rp 54.000 | Rp 75.000 |
| 3x4  | Rp 35.000 | Rp 63.000 | Rp 87.500 |
| 4x6  | Rp 40.000 | Rp 72.000 | Rp 100.000 |

**Built-in discounts:**
- 8 pcs: 10% off
- 12 pcs: 15% off

---

## 🎨 Design System

### Brand Colors
```css
--primary-red:    #ea2423;  /* CTA buttons, highlights */
--dark-gray:      #1f2937;  /* Text, headings */
--light-gray:     #f3f4f6;  /* Backgrounds */
--white:          #ffffff;  /* Cards, content */
```

### Typography
```css
--font-serif:  'Playfair Display';  /* Headings */
--font-sans:   'Inter';             /* Body text */
```

### Component Guidelines
- **Cards:** Rounded-3xl, hover shadow
- **Buttons:** Rounded-full, smooth transitions
- **Forms:** Rounded-xl, clear labels
- **Icons:** Lucide React, 20px default

---

## 📸 5 Store Locations

1. **SS Foto Rawamangun** - Jakarta Timur (Flagship)
2. **SS Foto Pondok Pinang** - Jakarta Selatan
3. **SS Foto Jatiwaringin** - Bekasi
4. **SS Foto Galaxy** - Bekasi Selatan
5. **SS Foto Bogor** - Bogor

All stores:
- Open 7 days/week
- Lab-quality printing equipment
- Professional staff
- Parking available

---

## 🔐 Security

- **RLS Enabled:** Row-level security on all tables
- **Guest Checkout:** Allowed for pas foto
- **Secure Uploads:** Private storage bucket
- **API Keys:** Never committed to repo
- **HTTPS Only:** Enforced in production

---

## 📈 Analytics (Planned)

### Key Metrics
- Daily orders by product
- Revenue by branch
- Average order value
- Completion rate
- Popular product combinations

### Tools
- PostHog for user analytics
- Supabase built-in logging
- Custom dashboard queries

---

## 🧪 Testing

### Manual Testing Checklist
- [ ] All pages load correctly
- [ ] Navigation works on mobile
- [ ] Forms validate properly
- [ ] Database queries return data
- [ ] File uploads succeed
- [ ] Responsive on mobile/tablet/desktop

### Future: Automated Tests
- Unit tests (Jest + React Testing Library)
- E2E tests (Playwright)
- API tests (Supabase)

---

## 🚀 Deployment

### Vercel (Recommended)

```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Deploy
vercel

# 3. Add environment variables in Vercel dashboard
```

### Environment Variables (Production)
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_APP_URL`

---

## 📚 Documentation

- **Database Setup:** `supabase/README.md`
- **Environment Setup:** `ENV_SETUP.md`
- **Folder Structure:** `FOLDER_STRUCTURE.md`
- **Progress Tracking:** `MVP_PROGRESS.md`

---

## 🤝 Contributing

This is a private project for SS Foto Digital Lab.

---

## 📄 License

Proprietary - All rights reserved by SS Foto Digital Lab

---

## 🆘 Support

For questions or issues:
- Email: info@ssfoto.co.id
- WhatsApp: +62 819-3644-4486

---

## 🎯 Success Criteria (MVP Launch)

- [ ] Pas Foto orders working end-to-end
- [ ] Payment processing (sandbox)
- [ ] Order tracking functional
- [ ] Mobile responsive
- [ ] Production deployment
- [ ] 5+ real orders processed

---

**Built with ❤️ for Indonesian families since 1986**


# 📁 SS Foto - Folder Structure

```
ssfoto-web/
├── supabase/
│   ├── schema.sql              # Database schema & seed data
│   └── migrations/             # Future migrations
│
├── src/
│   ├── app/                    # Next.js 14 App Router
│   │   ├── (auth)/            # Auth group (login, register)
│   │   │   ├── login/
│   │   │   └── register/
│   │   │
│   │   ├── (shop)/            # Shopping flow group
│   │   │   ├── produk/        # Product catalog
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/    # Product detail
│   │   │   ├── keranjang/     # Shopping cart
│   │   │   ├── checkout/      # Checkout flow
│   │   │   └── upload/        # Smart upload page
│   │   │
│   │   ├── akun/              # User account
│   │   │   ├── page.tsx       # Profile
│   │   │   ├── pesanan/       # Order history
│   │   │   └── settings/      # Settings
│   │   │
│   │   ├── blog/              # Sanity CMS integration
│   │   │   ├── page.tsx
│   │   │   └── [slug]/
│   │   │
│   │   ├── layanan/           # ✅ Already exists
│   │   ├── lokasi/            # ✅ Already exists
│   │   ├── tentang-kami/      # ✅ Already exists
│   │   ├── kontak/            # ✅ Already exists
│   │   │
│   │   ├── layout.tsx         # ✅ Root layout
│   │   ├── page.tsx           # ✅ Home page
│   │   └── globals.css        # ✅ Tailwind CSS
│   │
│   ├── components/
│   │   ├── layout/            # ✅ Header, Footer
│   │   │   ├── Header.tsx
│   │   │   └── Footer.tsx
│   │   │
│   │   ├── products/          # Product-related components
│   │   │   ├── ProductCard.tsx
│   │   │   ├── ProductGrid.tsx
│   │   │   └── ProductFilter.tsx
│   │   │
│   │   ├── cart/              # Cart-related components
│   │   │   ├── CartButton.tsx
│   │   │   ├── CartSidebar.tsx
│   │   │   └── CartItem.tsx
│   │   │
│   │   ├── upload/            # Upload system
│   │   │   ├── UploadZone.tsx
│   │   │   ├── FilePreview.tsx
│   │   │   └── DuplicateDetector.tsx
│   │   │
│   │   ├── checkout/          # Checkout flow
│   │   │   ├── StoreSelector.tsx
│   │   │   ├── ShippingForm.tsx
│   │   │   └── PaymentMethod.tsx
│   │   │
│   │   └── ui/                # Reusable UI components
│   │       ├── Button.tsx
│   │       ├── Input.tsx
│   │       ├── Modal.tsx
│   │       └── Toast.tsx
│   │
│   ├── lib/
│   │   ├── supabase/          # Supabase client & utils
│   │   │   ├── client.ts      # Browser client
│   │   │   ├── server.ts      # Server client
│   │   │   └── middleware.ts  # Auth middleware
│   │   │
│   │   ├── sanity/            # Sanity CMS
│   │   │   ├── client.ts
│   │   │   └── queries.ts
│   │   │
│   │   ├── payments/          # Payment integrations
│   │   │   └── midtrans.ts
│   │   │
│   │   └── utils/
│   │       ├── format.ts      # Currency, date formatting
│   │       ├── validation.ts  # Form validation
│   │       └── hash.ts        # File hashing for duplicates
│   │
│   ├── hooks/
│   │   ├── useCart.ts         # Cart state management
│   │   ├── useAuth.ts         # Authentication
│   │   ├── useProducts.ts     # Fetch products
│   │   └── useUpload.ts       # File upload logic
│   │
│   ├── store/                 # State management (Zustand)
│   │   ├── cart.ts            # Cart store
│   │   ├── user.ts            # User store
│   │   └── upload.ts          # Upload store
│   │
│   ├── types/
│   │   ├── database.ts        # Supabase generated types
│   │   ├── product.ts         # Product types
│   │   ├── order.ts           # Order types
│   │   └── index.ts           # Exports
│   │
│   └── providers/
│       ├── SupabaseProvider.tsx
│       ├── PostHogProvider.tsx
│       └── ToastProvider.tsx
│
├── public/
│   ├── images/
│   ├── icons/
│   └── logo.png
│
├── .env.local.example         # Environment variables template
├── next.config.mjs            # ✅ Already configured
├── tailwind.config.ts         # ✅ Already configured
├── package.json               # ✅ Dependencies
└── README.md

```

## 🎯 Current Status

### ✅ Completed
- Landing page dengan Hero, Why Us, Products, Locations
- Layanan page (Services catalog)
- Lokasi page (5 branches with real data)
- Tentang Kami page (About page)
- Kontak page (Contact page)
- Shared Header & Footer components
- SEO metadata & structured data
- Tailwind CSS configuration
- Next.js 14 App Router setup

### 🚧 Next Steps (MVP Phase)
1. **Database Setup** ✅ schema.sql ready
2. **Supabase Integration** (client setup)
3. **Product Catalog** (dynamic from database)
4. **Upload System** (react-dropzone + duplicate detection)
5. **Shopping Cart** (Zustand state management)
6. **Checkout Flow** (store selection + payment mock)
7. **Blog Integration** (Sanity CMS)
8. **Analytics** (PostHog provider)

## 📦 Required Dependencies

```bash
# Core
npm install @supabase/supabase-js @supabase/auth-helpers-nextjs

# State Management
npm install zustand immer

# File Upload
npm install react-dropzone

# CMS
npm install @sanity/client next-sanity

# Analytics
npm install posthog-js

# Utils
npm install date-fns clsx

# Forms
npm install react-hook-form @hookform/resolvers zod

# Payment (Mock for now)
npm install midtrans-client
```


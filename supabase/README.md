# 🗄️ Supabase Database Setup

This folder contains SQL scripts for SS Foto database setup.

## 📋 Scripts

### 1. `schema.sql` - Main Database Schema
**Purpose:** Complete e-commerce database with products, orders, stores, etc.

**Contains:**
- 6 main tables (profiles, products, stores, orders, order_items, uploaded_files)
- Row Level Security policies
- Indexes and triggers
- Seed data (8 products, 5 stores)

**When to use:** Full database setup for the complete application

---

### 2. `pas_foto_orders.sql` - Pas Foto Quick Orders
**Purpose:** Stand-alone table for fast Pas Foto ordering (MVP feature)

**Contains:**
- `pas_foto_orders` table with customer info
- ENUM types for background colors, sizes, quantities
- Auto-generated order numbers (format: `PF-YYYYMMDD-###`)
- Price calculation function
- Order tracking by WhatsApp
- Daily summary view for reporting

**When to use:** If you want to launch Pas Foto feature quickly without full e-commerce system

---

## 🚀 Quick Start

### Option A: Full Setup (Recommended for complete app)

```sql
-- 1. Run in Supabase SQL Editor
-- Copy and execute: schema.sql
-- This gives you the complete database

-- 2. Optional: Add Pas Foto quick orders
-- Copy and execute: pas_foto_orders.sql
```

### Option B: MVP Start (Pas Foto only)

```sql
-- 1. Run in Supabase SQL Editor
-- Copy and execute: pas_foto_orders.sql
-- This creates just the Pas Foto ordering system
```

---

## 📦 Storage Buckets Setup

After running SQL scripts, create these storage buckets in Supabase:

### 1. **`order-files`** (Private)
- **Purpose:** Customer uploaded photos for orders
- **Policy:** 
  ```
  Allow authenticated uploads
  Allow SELECT by order owner
  ```

### 2. **`uploads`** (Public)
- **Purpose:** Product images, blog images
- **Policy:** 
  ```
  Allow public read
  Allow authenticated uploads
  ```

---

## 🔧 Setup Instructions

### Step 1: Create Supabase Project
1. Go to https://supabase.com
2. Create new project
3. Wait for provisioning (~2 minutes)

### Step 2: Run SQL Scripts
1. Open **SQL Editor** in Supabase dashboard
2. Create new query
3. Copy contents of `schema.sql` (or `pas_foto_orders.sql`)
4. Click **Run**

### Step 3: Create Storage Buckets
1. Go to **Storage** in Supabase
2. Click **New Bucket**
3. Create `order-files` (Private)
4. Create `uploads` (Public)

### Step 4: Configure RLS Policies
The scripts already include RLS policies, but you can customize them in:
- **Authentication** → **Policies**

### Step 5: Get API Keys
1. Go to **Settings** → **API**
2. Copy `Project URL` and `anon public` key
3. Add to your `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

---

## 📊 Database Schema Overview

### Main Tables (schema.sql)

```
profiles          → User profiles (extends auth.users)
products          → Product catalog
stores            → 5 physical store locations
orders            → Customer orders
order_items       → Line items in orders
uploaded_files    → Track all uploaded files
```

### Pas Foto Table (pas_foto_orders.sql)

```
pas_foto_orders   → Quick pas foto orders
  ├── id (uuid)
  ├── order_number (PF-YYYYMMDD-###)
  ├── customer_name
  ├── customer_whatsapp
  ├── photo_url
  ├── background_color (red/blue/white)
  ├── print_size (2x3/3x4/4x6/mix)
  ├── quantity_package (4/8/12 pcs)
  ├── branch_location
  ├── total_price
  └── status (pending/paid/processing/ready/completed)
```

---

## 🔍 Useful Queries

### Get today's orders
```sql
SELECT * FROM pas_foto_orders
WHERE DATE(created_at) = CURRENT_DATE
ORDER BY created_at DESC;
```

### Check order by number
```sql
SELECT * FROM pas_foto_orders
WHERE order_number = 'PF-20241201-001';
```

### Get customer's orders
```sql
SELECT * FROM pas_foto_orders
WHERE customer_whatsapp = '+6281234567890'
ORDER BY created_at DESC;
```

### Daily revenue by branch
```sql
SELECT 
  branch_location,
  COUNT(*) as orders,
  SUM(total_price) as revenue
FROM pas_foto_orders
WHERE DATE(created_at) = CURRENT_DATE
GROUP BY branch_location;
```

---

## 🔐 Security Notes

- **RLS is enabled** on all tables
- Guest checkout is allowed for `pas_foto_orders`
- Users can only see their own orders
- Admin access requires service role key
- Storage buckets have separate policies

---

## 🆘 Troubleshooting

### "Function update_updated_at_column does not exist"
- Run `schema.sql` first (it contains the function)
- Or add it manually to `pas_foto_orders.sql`

### "Permission denied for table"
- Check RLS policies are enabled
- Verify you're using the correct API key
- Check if user is authenticated

### Storage upload fails
- Ensure bucket exists and is properly named
- Check storage policies
- Verify file size limits

---

## 📚 Next Steps

After database setup:
1. ✅ Configure environment variables
2. ✅ Test database connection in your app
3. ✅ Create Supabase client in `src/lib/supabase/client.ts`
4. ✅ Build the Pas Foto order form
5. ✅ Implement file upload to storage

---

## 🔄 Migrations (Future)

For production, use Supabase CLI migrations:

```bash
# Install Supabase CLI
npm install -g supabase

# Initialize migrations
supabase init

# Create migration
supabase migration new add_pas_foto_orders

# Push to production
supabase db push
```

---

Need help? Check Supabase docs: https://supabase.com/docs


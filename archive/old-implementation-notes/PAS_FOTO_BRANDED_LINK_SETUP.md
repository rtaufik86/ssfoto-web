# 🎯 Pas Foto Branded Link Implementation Guide

## 📋 Overview

Sistem Branded Link untuk Pas Foto menggunakan arsitektur yang sama dengan Canvas Art, namun dengan endpoint dan tabel database terpisah untuk pemisahan data yang lebih baik.

---

## 🗂️ Files Created

### 1. **API Route** - `src/app/api/pas-foto-link/route.ts`
- Menerima public URL dari Supabase
- Generate token unik dengan prefix `pf-`
- Simpan ke database table `pas_foto_orders`
- Return branded link: `https://ssfoto.co.id/dl-pf/[token]`

### 2. **Redirect Route** - `src/app/dl-pf/[token]/page.tsx`
- Server Component untuk redirect
- Query database berdasarkan token
- Redirect ke Supabase public URL

### 3. **SQL Schema** - `supabase_pas_foto_orders_table.sql`
- Create table `pas_foto_orders`
- Setup indexes untuk performance
- Configure RLS policies

### 4. **Frontend Update** - `src/app/upload/pas-foto/page.tsx`
- Update `handleSubmit` function
- Call `/api/pas-foto-link` setelah upload
- Update WhatsApp message dengan branded link

---

## 🔄 Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│  USER UPLOADS PAS FOTO                                      │
│                                                             │
│  Step 1: Upload foto ke Supabase Storage                   │
│          ↓                                                  │
│  Response: publicUrl (Supabase URL)                        │
│                                                             │
│  Step 2: Call /api/pas-foto-link                          │
│          ↓                                                  │
│  API: Generate token (pf-xxx)                              │
│  API: Insert to pas_foto_orders table                      │
│  API: Return brandedLink (https://ssfoto.co.id/dl-pf/xxx)  │
│                                                             │
│  Step 3: Send WhatsApp with branded link                   │
│          ↓                                                  │
│  CS clicks link → /dl-pf/[token]                           │
│          ↓                                                  │
│  Server queries pas_foto_orders table                       │
│          ↓                                                  │
│  Redirect to original Supabase publicUrl                    │
└─────────────────────────────────────────────────────────────┘
```

---

## 📊 Database Schema

### Table: `pas_foto_orders`

| Column | Type | Description |
|--------|------|-------------|
| `id` | BIGSERIAL | Primary key |
| `token` | TEXT | Unique token (e.g., `pf-abc123`) |
| `public_url` | TEXT | Original Supabase URL |
| `size` | TEXT | Pas foto size (2x3, 3x4, etc.) |
| `background` | TEXT | Background color |
| `quantity` | INTEGER | Number of prints (4 or 8) |
| `customer_name` | TEXT | Customer name |
| `customer_whatsapp` | TEXT | Customer WhatsApp |
| `created_at` | TIMESTAMPTZ | Creation timestamp |
| `updated_at` | TIMESTAMPTZ | Update timestamp |

**Indexes:**
- `idx_pas_foto_orders_token` on `token` (for fast lookups)
- `idx_pas_foto_orders_created_at` on `created_at DESC` (for sorting)

---

## 🚀 Setup Instructions

### Step 1: Create Database Table

Run the SQL in Supabase SQL Editor:

```bash
# Open file: supabase_pas_foto_orders_table.sql
# Copy contents
# Paste in Supabase Dashboard → SQL Editor → New Query → Run
```

### Step 2: Verify Environment Variables

Ensure `.env.local` contains:

```env
NEXT_PUBLIC_SUPABASE_URL=https://iaipgwtrbjhinfmlibpi.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...  # Required for API
```

### Step 3: Test the Flow

1. **Upload Test:**
   ```
   http://localhost:3000/upload/pas-foto
   ```

2. **Upload a foto:**
   - Fill form
   - Click "Pesan Sekarang"
   - Check console for logs

3. **Verify Database:**
   ```sql
   SELECT * FROM pas_foto_orders ORDER BY created_at DESC LIMIT 5;
   ```

4. **Test Redirect:**
   - Copy token from database
   - Visit: `http://localhost:3000/dl-pf/[token]`
   - Should redirect to Supabase URL

5. **Test WhatsApp:**
   - Click should open WhatsApp
   - Message should contain `https://ssfoto.co.id/dl-pf/xxx`

---

## 📱 WhatsApp Message Format

### BEFORE (Old):
```
Halo SS Foto, Order Baru! 🚀

Nama: John Doe
Request: Pas Foto 3x4 Background Merah
Jumlah: 4 Lembar
Order ID: #123

👇 DOWNLOAD FOTO:
https://iaipgwtrbjhinfmlibpi.supabase.co/storage/v1/object/public/pas-foto-uploads/uploads/...

(Link valid 24 jam)
```

### AFTER (New with Branded Link):
```
Halo SS Foto, Order Baru! 🚀

📋 *DATA PESANAN:*
━━━━━━━━━━━━━━━━
• Nama: John Doe
• WhatsApp: 08123456789
• Layanan: Pas Foto 3x4
• Background: Merah
• Jumlah: 4 Lembar
• Order ID: #123

📸 *DOWNLOAD FOTO:*
https://ssfoto.co.id/dl-pf/pf-l9q8x7abc123

Mohon proses pesanan ini. Terima kasih! 🙏
```

---

## 🔐 Security Features

1. **Separate Tables:** 
   - Canvas orders: `canvas_orders`
   - Pas Foto orders: `pas_foto_orders`

2. **Token Prefixes:**
   - Canvas: `cv-`
   - Pas Foto: `pf-`

3. **Separate Redirect Paths:**
   - Canvas: `/dl/[token]`
   - Pas Foto: `/dl-pf/[token]`

4. **Service Role Key:**
   - Only API routes have access
   - Frontend uses anon key

5. **RLS Policies:**
   - Service role: Full access
   - Public: Read-only for redirect

---

## 🧪 Testing Checklist

- [ ] Database table created
- [ ] Indexes created
- [ ] RLS policies active
- [ ] Environment variables set
- [ ] Upload foto works
- [ ] Branded link created in database
- [ ] Redirect route works
- [ ] WhatsApp message contains branded link
- [ ] Token prefix is `pf-`
- [ ] Link format: `https://ssfoto.co.id/dl-pf/[token]`

---

## 🐛 Troubleshooting

### Issue: "Failed to save order to database"
**Solution:** Check `SUPABASE_SERVICE_ROLE_KEY` in `.env.local`

### Issue: "404 on redirect"
**Solution:** Verify token exists in `pas_foto_orders` table

### Issue: "Token not found"
**Solution:** Check RLS policies allow public read access

### Issue: "Upload works but no branded link"
**Solution:** Check `/api/pas-foto-link` response in Network tab

---

## 📈 Benefits

1. **Branding:** Professional `ssfoto.co.id` domain
2. **Tracking:** All downloads logged in database
3. **Analytics:** Can track clicks, conversion rates
4. **Security:** Hide direct Supabase URLs
5. **Flexibility:** Can change storage backend without breaking links
6. **Expiry:** Can implement link expiration logic
7. **Monitoring:** Can track which orders are being accessed

---

## 🔮 Future Enhancements

1. **Link Expiration:**
   ```sql
   ALTER TABLE pas_foto_orders ADD COLUMN expires_at TIMESTAMPTZ;
   ```

2. **Click Tracking:**
   ```sql
   ALTER TABLE pas_foto_orders ADD COLUMN click_count INTEGER DEFAULT 0;
   ALTER TABLE pas_foto_orders ADD COLUMN last_accessed_at TIMESTAMPTZ;
   ```

3. **Status Tracking:**
   ```sql
   ALTER TABLE pas_foto_orders ADD COLUMN status TEXT DEFAULT 'pending';
   ```

4. **Admin Dashboard:**
   - View all orders
   - Filter by status
   - Export to CSV

---

## 📞 Support

Jika ada issue, check:
1. Browser console (F12)
2. Network tab untuk API responses
3. Supabase logs di dashboard
4. Server logs di terminal

---

**Setup Complete! 🎉**


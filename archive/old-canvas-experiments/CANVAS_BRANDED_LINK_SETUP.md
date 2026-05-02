# 🎨 Canvas Art Branded Link Implementation Guide

## 📋 Overview

Sistem Branded Link untuk Canvas Art menggunakan arsitektur 3-tier dengan API Route untuk logging dan redirect route untuk serving. Semua data order tersimpan di database untuk tracking dan analytics.

---

## 🗂️ Files Created/Modified

### 1. **API Route** - `src/app/api/order-link/route.ts` ✅
- **Purpose:** Handle branded link creation
- **Features:**
  - Robust error logging dengan `console.error`
  - Comprehensive field validation
  - Token generation dengan prefix `cv-`
  - Database insertion dengan error handling
  - Returns branded link: `https://ssfoto.co.id/dl/[token]`

### 2. **Redirect Route** - `src/app/dl/[token]/page.tsx` ✅
- **Purpose:** Redirect branded links to Supabase URLs
- **Features:**
  - Server Component for SEO
  - Database query by token
  - Automatic redirect
  - Error handling (404 fallback)

### 3. **Database Schema** - `supabase_canvas_orders_table.sql` ✅
- **Purpose:** Store canvas orders
- **Features:**
  - Table: `canvas_orders`
  - Indexes for performance
  - RLS policies configured
  - Comprehensive comments

### 4. **Frontend Update** - `src/app/upload/canvas/page.tsx` ✅
- **Purpose:** Call API after upload
- **Changes:**
  - Added `/api/order-link` call
  - Updated WhatsApp message format
  - Added branded link to message

---

## 🔄 Complete Flow Diagram

```
┌────────────────────────────────────────────────────────────────┐
│  STEP 1: User fills form + uploads photo                      │
│          ↓                                                     │
│  STEP 2: Upload to Supabase Storage                           │
│          ↓                                                     │
│  Response: publicUrl (long Supabase URL)                      │
│          ↓                                                     │
│  STEP 3: Call POST /api/order-link                           │
│          Body: {                                              │
│            publicUrl: "https://supabase.co/...",             │
│            size: "16R",                                       │
│            orientation: "portrait",                            │
│            customerName: "John Doe",                          │
│            customerWhatsApp: "08123456789"                    │
│          }                                                     │
│          ↓                                                     │
│  API: Generate token (cv-l9q8x7abc)                          │
│  API: Insert to canvas_orders table                          │
│  API: Return brandedLink                                      │
│          ↓                                                     │
│  Response: {                                                  │
│    success: true,                                             │
│    token: "cv-l9q8x7abc",                                    │
│    brandedLink: "https://ssfoto.co.id/dl/cv-l9q8x7abc",     │
│    orderId: 123                                               │
│  }                                                             │
│          ↓                                                     │
│  STEP 4: Format WhatsApp message with brandedLink            │
│          ↓                                                     │
│  STEP 5: Open WhatsApp                                        │
│          ↓                                                     │
│  CS clicks link → /dl/cv-l9q8x7abc                           │
│          ↓                                                     │
│  Server: Query canvas_orders WHERE token = 'cv-l9q8x7abc'   │
│          ↓                                                     │
│  Server: redirect(publicUrl)                                  │
│          ↓                                                     │
│  Browser: Download from Supabase Storage                      │
└────────────────────────────────────────────────────────────────┘
```

---

## 📊 Database Schema

### Table: `canvas_orders`

| Column | Type | Description | Example |
|--------|------|-------------|---------|
| `id` | BIGSERIAL | Primary key | 1 |
| `token` | TEXT | Unique token | `cv-l9q8x7abc` |
| `public_url` | TEXT | Supabase URL | `https://...` |
| `size` | TEXT | Canvas size | `16R` |
| `orientation` | TEXT | Orientation | `portrait` |
| `customer_name` | TEXT | Customer name | `John Doe` |
| `customer_whatsapp` | TEXT | WhatsApp | `08123456789` |
| `created_at` | TIMESTAMPTZ | Created | `2024-01-01...` |
| `updated_at` | TIMESTAMPTZ | Updated | `2024-01-01...` |

**Indexes:**
- `idx_canvas_orders_token` on `token` (UNIQUE, fast lookups)
- `idx_canvas_orders_created_at` on `created_at DESC` (sorting)

**RLS Policies:**
- Service role: Full access (INSERT, SELECT, UPDATE, DELETE)
- Public: Read-only SELECT (for redirect)

---

## 🚀 Setup Instructions

### Step 1: Create Database Table

1. Open Supabase Dashboard
2. Go to SQL Editor
3. Copy contents from `supabase_canvas_orders_table.sql`
4. Execute

**Verify:**
```sql
SELECT * FROM canvas_orders LIMIT 1;
-- Should return empty result (not error)
```

### Step 2: Verify Environment Variables

Check `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://iaipgwtrbjhinfmlibpi.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...  # ⚠️ REQUIRED for API!
```

**Test:**
```bash
# Restart server completely
Ctrl+C
npm run dev
```

### Step 3: Test API Endpoint (Optional)

**Health Check:**
```bash
curl http://localhost:3000/api/order-link
```

**Expected Response:**
```json
{
  "status": "ok",
  "endpoint": "/api/order-link",
  "message": "Canvas order link API is running",
  "environment": {
    "supabaseUrlConfigured": true,
    "serviceKeyConfigured": true
  }
}
```

### Step 4: Test Upload Flow

1. **Navigate to:**
   ```
   http://localhost:3000/upload/canvas
   ```

2. **Fill form:**
   - Upload foto
   - Select size (e.g., 16R)
   - Select orientation (Portrait/Landscape)
   - Enter name
   - Enter WhatsApp

3. **Click Submit**

4. **Check Console (F12):**
   ```
   ✓ [API] Request body parsed successfully
   🔑 [API] Generated token: cv-l9q8x7abc
   💾 [API] Prepared order data for insertion
   🚀 [API] Attempting to insert into canvas_orders table...
   ✅ [API] Order inserted successfully!
   ```

5. **Check Database:**
   ```sql
   SELECT token, size, orientation, customer_name, created_at 
   FROM canvas_orders 
   ORDER BY created_at DESC 
   LIMIT 5;
   ```

6. **Test Redirect:**
   - Copy token from database
   - Visit: `http://localhost:3000/dl/[token]`
   - Should redirect to Supabase URL and download

7. **Check WhatsApp:**
   - WhatsApp should open
   - Message should contain: `https://ssfoto.co.id/dl/cv-xxx`

---

## 📱 WhatsApp Message Format

### NEW (With Branded Link):

```
Halo SS Foto! 🎨

Saya ingin memesan *Canvas Art* dengan detail:

📋 *DETAIL PESANAN:*
━━━━━━━━━━━━━━━━
• Ukuran: *16R* (30×40 cm)
• Orientasi: *Portrait* (Vertikal / Tegak)
• Harga: *Rp 420.000*
━━━━━━━━━━━━━━━━

👤 *DATA PEMESAN:*
• Nama: John Doe
• WhatsApp: 08123456789

📸 *FOTO YANG DIPESAN:*
https://ssfoto.co.id/dl/cv-l9q8x7abc123  ← BRANDED!

⚠️ Saya memahami bahwa harga di atas *belum termasuk ongkir*.

Mohon konfirmasi ketersediaan dan estimasi pengerjaan. Terima kasih! 🙏
```

---

## 🐛 Debugging Guide

### Issue: "Failed to save order to database"

**Check Console Logs:**
```
❌ [API] Supabase insertion error:
Error code: 42P01
Error message: relation "canvas_orders" does not exist
```

**Solution:** Run SQL to create table

---

### Issue: "Missing required fields"

**Check Console:**
```
❌ [API] Missing required fields: ['publicUrl', 'size']
```

**Solution:** Ensure frontend sends all fields

---

### Issue: "404 on redirect"

**Check Console:**
```
❌ [Redirect] Token lookup error: ...
Token: cv-xxx
```

**Solution:** 
1. Verify token exists in database
2. Check RLS policies allow public SELECT

---

### Issue: "SUPABASE_SERVICE_ROLE_KEY not found"

**Check Console:**
```
❌ Missing Supabase environment variables
SUPABASE_SERVICE_ROLE_KEY: ✗ Missing
```

**Solution:**
1. Add to `.env.local`
2. Restart server completely (Ctrl+C, then npm run dev)

---

## 📈 API Response Examples

### Success Response:

```json
{
  "success": true,
  "token": "cv-l9q8x7abc123",
  "brandedLink": "https://ssfoto.co.id/dl/cv-l9q8x7abc123",
  "orderId": 123
}
```

### Error Response (Missing Fields):

```json
{
  "error": "Missing required fields",
  "missingFields": ["publicUrl", "size"]
}
```

### Error Response (Database):

```json
{
  "error": "Failed to save order to database",
  "details": "relation \"canvas_orders\" does not exist",
  "code": "42P01",
  "hint": "Perhaps you meant to reference the table \"public\".\"canvas_orders\"."
}
```

---

## 🧪 Testing Checklist

### Database Setup:
- [ ] `canvas_orders` table created
- [ ] Indexes created
- [ ] RLS enabled
- [ ] Service role policy created
- [ ] Public read policy created

### Environment:
- [ ] `NEXT_PUBLIC_SUPABASE_URL` set
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` set
- [ ] `SUPABASE_SERVICE_ROLE_KEY` set
- [ ] Server restarted

### API Testing:
- [ ] GET `/api/order-link` returns health check
- [ ] POST with valid data returns branded link
- [ ] POST with missing fields returns 400 error
- [ ] Console logs show detailed debug info

### Frontend Testing:
- [ ] Upload foto works
- [ ] API call successful
- [ ] Branded link appears in WhatsApp message
- [ ] Token format: `cv-xxx`
- [ ] Link format: `https://ssfoto.co.id/dl/cv-xxx`

### Redirect Testing:
- [ ] `/dl/[valid-token]` redirects to Supabase URL
- [ ] `/dl/[invalid-token]` shows 404
- [ ] Download starts automatically

---

## 🔐 Security Notes

1. **Service Role Key:**
   - Only used in API routes (server-side)
   - Never exposed to frontend
   - Has full database access

2. **RLS Policies:**
   - Service role bypasses RLS
   - Public can only SELECT
   - No INSERT/UPDATE/DELETE for public

3. **Token Generation:**
   - Uses timestamp + random string
   - Prefix `cv-` for easy identification
   - Virtually impossible to guess

4. **URL Privacy:**
   - Original Supabase URLs hidden
   - Only short branded links exposed
   - Can track all accesses

---

## 📊 Analytics Possibilities

Future enhancements can track:

1. **Click Tracking:**
   ```sql
   ALTER TABLE canvas_orders ADD COLUMN clicks INTEGER DEFAULT 0;
   ALTER TABLE canvas_orders ADD COLUMN last_accessed_at TIMESTAMPTZ;
   ```

2. **Conversion Tracking:**
   ```sql
   ALTER TABLE canvas_orders ADD COLUMN status TEXT DEFAULT 'pending';
   -- pending, confirmed, completed, cancelled
   ```

3. **Revenue Tracking:**
   ```sql
   ALTER TABLE canvas_orders ADD COLUMN price INTEGER;
   ALTER TABLE canvas_orders ADD COLUMN paid BOOLEAN DEFAULT false;
   ```

---

## 🎯 Benefits

1. **Branding:** Professional `ssfoto.co.id` domain
2. **Tracking:** All orders logged in database
3. **Analytics:** Can analyze popular sizes, orientations
4. **Security:** Hide direct storage URLs
5. **Flexibility:** Can change storage without breaking links
6. **Monitoring:** Track which orders CS has accessed
7. **Debugging:** Comprehensive console logs for troubleshooting

---

## 📞 Support

**If stuck, check:**
1. Browser Console (F12) for frontend errors
2. Terminal for API logs
3. Supabase Dashboard → Logs
4. Network tab for API responses

**Common Log Prefixes:**
- `📥 [API]` - API route logs
- `🔗 [Redirect]` - Redirect route logs
- `✅` - Success
- `❌` - Error
- `🔑` - Token generation
- `💾` - Database operations

---

**Setup Complete! 🎉**

Your Canvas orders now use professional branded links for better tracking and security.


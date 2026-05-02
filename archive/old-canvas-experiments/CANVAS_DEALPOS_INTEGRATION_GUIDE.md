# 🏪 Canvas Orders - Dealpos Integration Guide

## 📋 Overview

Setelah diskusi, ternyata Canvas Art juga akan:
- ✅ Terintegrasi dengan **Dealpos POS**
- ✅ Support **Branch Pickup** (seperti Pas Foto)
- ✅ Butuh tracking **Status** dan **Sync**

Maka struktur tabel `canvas_orders` diupdate untuk match dengan `orders` table.

---

## 🔄 Updated Structure

### **Before (Original):**
```sql
canvas_orders (
  id,
  token,              -- Branded link token
  public_url,
  size,
  orientation,
  customer_name,
  customer_whatsapp,
  created_at,
  updated_at
)
```

### **After (With Dealpos Support):**
```sql
canvas_orders (
  id,
  token,              -- Branded link token (unique to canvas)
  public_url,
  size,
  orientation,
  customer_name,
  customer_whatsapp,
  branch_id,          -- ✅ NEW: Branch pickup location
  product_type,       -- ✅ NEW: Always "canvas"
  total_price,        -- ✅ NEW: Final price
  status,             -- ✅ NEW: Order workflow status
  details,            -- ✅ NEW: JSON metadata
  dealpos_order_id,   -- ✅ NEW: Dealpos integration
  sync_status,        -- ✅ NEW: Sync with Dealpos
  created_at,
  updated_at
)
```

---

## 📊 Complete Field Comparison

| Field | `orders` (Pas Foto) | `canvas_orders` (Canvas) | Notes |
|-------|---------------------|--------------------------|-------|
| `id` | ✅ | ✅ | Primary key |
| `created_at` | ✅ | ✅ | Timestamp |
| `customer_name` | ✅ | ✅ | Same |
| `customer_whatsapp` | ✅ | ✅ | Same |
| `branch_id` | ✅ | ✅ | Pickup location |
| `product_type` | ✅ | ✅ | "pas_foto" vs "canvas" |
| `photo_uri` | ✅ | `public_url` | Different name, same purpose |
| `total_price` | ✅ | ✅ | Final price |
| `status` | ✅ | ✅ | Order status |
| `details` | ✅ | ✅ | JSON metadata |
| `dealpos_order_id` | ✅ | ✅ | POS integration |
| `sync_status` | ✅ | ✅ | Sync status |
| `token` | ❌ | ✅ | **Unique to canvas** (branded link) |
| `size` | ❌ | ✅ | **Unique to canvas** (14R, 16R, etc) |
| `orientation` | ❌ | ✅ | **Unique to canvas** (portrait/landscape) |
| `updated_at` | ❌ | ✅ | Update timestamp |

---

## 🚀 Setup Instructions

### Step 1: Run UPDATE SQL

**File:** `supabase_canvas_orders_UPDATE.sql`

1. Open Supabase Dashboard
2. Go to SQL Editor
3. Copy & paste SQL dari file
4. Click **Run**

**SQL:**
```sql
ALTER TABLE public.canvas_orders 
  ADD COLUMN IF NOT EXISTS branch_id TEXT,
  ADD COLUMN IF NOT EXISTS product_type TEXT DEFAULT 'canvas',
  ADD COLUMN IF NOT EXISTS total_price NUMERIC,
  ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'pending',
  ADD COLUMN IF NOT EXISTS details JSONB,
  ADD COLUMN IF NOT EXISTS dealpos_order_id TEXT,
  ADD COLUMN IF NOT EXISTS sync_status TEXT;

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_canvas_orders_branch_id ON public.canvas_orders(branch_id);
CREATE INDEX IF NOT EXISTS idx_canvas_orders_dealpos_id ON public.canvas_orders(dealpos_order_id);
CREATE INDEX IF NOT EXISTS idx_canvas_orders_status ON public.canvas_orders(status);
```

### Step 2: Verify Structure

```sql
SELECT column_name, data_type, column_default
FROM information_schema.columns
WHERE table_name = 'canvas_orders'
ORDER BY ordinal_position;
```

**Expected Columns:**
```
id              | bigint
token           | text
public_url      | text
size            | text
orientation     | text
customer_name   | text
customer_whatsapp | text
created_at      | timestamp with time zone
updated_at      | timestamp with time zone
branch_id       | text                      ← NEW
product_type    | text (default 'canvas')   ← NEW
total_price     | numeric                   ← NEW
status          | text (default 'pending')  ← NEW
details         | jsonb                     ← NEW
dealpos_order_id | text                     ← NEW
sync_status     | text                      ← NEW
```

---

## 📝 Status Values

### Order Status Flow:
```
pending → confirmed → processing → ready → completed
                                        ↘ cancelled
```

| Status | Description | Next Action |
|--------|-------------|-------------|
| `pending` | Order baru masuk | CS review |
| `confirmed` | CS sudah konfirmasi | Mulai produksi |
| `processing` | Sedang cetak/produksi | Tunggu selesai |
| `ready` | Siap pickup/kirim | Notify customer |
| `completed` | Sudah diambil/terkirim | Done ✅ |
| `cancelled` | Order dibatalkan | - |

### Sync Status:
```
pending → syncing → synced
                  ↘ failed
```

| Sync Status | Description |
|-------------|-------------|
| `pending` | Belum sync ke Dealpos |
| `syncing` | Sedang proses sync |
| `synced` | Berhasil sync ✅ |
| `failed` | Gagal sync (retry) |

---

## 🏪 Branch IDs

Default branches (sesuaikan dengan aktual):

```typescript
const BRANCHES = [
  { id: 'rawamangun', name: 'Rawamangun' },
  { id: 'kemang', name: 'Kemang' },
  { id: 'bekasi', name: 'Bekasi' },
  { id: 'bogor', name: 'Bogor' },
  { id: 'depok', name: 'Depok' },
];
```

---

## 💰 Price Structure

Prices stored in `total_price` field (in Rupiah):

| Size | Price |
|------|-------|
| 14R (28×35 cm) | 350,000 |
| 16R (30×40 cm) | 420,000 |
| 16RS (30×45 cm) | 450,000 |
| 20R (40×50 cm) | 550,000 |
| 24R (50×60 cm) | 750,000 |

**Note:** Frontend automatically calculates price based on selected size.

---

## 🔄 API Flow (Updated)

### Frontend → API:
```typescript
POST /api/order-link
{
  publicUrl: "https://supabase.co/...",
  size: "16R",
  orientation: "portrait",
  customerName: "John Doe",
  customerWhatsApp: "08123456789",
  branchId: "rawamangun",      // ← NEW
  totalPrice: 420000            // ← NEW
}
```

### API → Database:
```typescript
INSERT INTO canvas_orders {
  token: "cv-abc123",
  public_url: "...",
  size: "16R",
  orientation: "portrait",
  customer_name: "John Doe",
  customer_whatsapp: "08123456789",
  branch_id: "rawamangun",      // ← NEW
  product_type: "canvas",        // ← NEW (auto)
  total_price: 420000,           // ← NEW
  status: "pending",             // ← NEW (auto)
  sync_status: "pending",        // ← NEW (auto)
  details: {                     // ← NEW (auto)
    size: "16R",
    orientation: "portrait",
    order_source: "website"
  }
}
```

### API → Frontend:
```typescript
{
  success: true,
  token: "cv-abc123",
  brandedLink: "https://ssfoto.co.id/dl/cv-abc123",
  orderId: 123
}
```

---

## 📋 Details JSON Structure

The `details` field stores additional metadata:

```json
{
  "size": "16R",
  "orientation": "portrait",
  "order_source": "website",
  "frame_type": "gallery_wrap",
  "material": "cotton_canvas",
  "notes": "Customer request notes here"
}
```

---

## 🔗 Dealpos Integration Flow

```
┌─────────────────────────────────────────────────────────┐
│  1. Customer orders via website                         │
│     ↓                                                    │
│  2. Insert to canvas_orders                             │
│     status: "pending"                                    │
│     sync_status: "pending"                               │
│     ↓                                                    │
│  3. CS confirms order                                   │
│     status: "confirmed"                                  │
│     ↓                                                    │
│  4. Sync to Dealpos (Background Job)                    │
│     sync_status: "syncing"                               │
│     ↓                                                    │
│  5. Dealpos creates order                               │
│     Returns: dealpos_order_id                            │
│     ↓                                                    │
│  6. Update canvas_orders                                │
│     dealpos_order_id: "PO-12345"                         │
│     sync_status: "synced"                                │
│     ↓                                                    │
│  7. Production starts                                   │
│     status: "processing"                                 │
│     ↓                                                    │
│  8. Canvas ready                                        │
│     status: "ready"                                      │
│     ↓                                                    │
│  9. Customer pickup/delivery                            │
│     status: "completed"                                  │
└─────────────────────────────────────────────────────────┘
```

---

## 🧪 Testing

### Test Insert:
```sql
INSERT INTO canvas_orders (
  token,
  public_url,
  size,
  orientation,
  customer_name,
  customer_whatsapp,
  branch_id,
  product_type,
  total_price,
  status,
  sync_status,
  details
) VALUES (
  'cv-test123',
  'https://example.com/test.jpg',
  '16R',
  'portrait',
  'Test Customer',
  '08123456789',
  'rawamangun',
  'canvas',
  420000,
  'pending',
  'pending',
  '{"size":"16R","orientation":"portrait","order_source":"website"}'::jsonb
);
```

### Verify:
```sql
SELECT 
  id,
  token,
  size,
  orientation,
  branch_id,
  total_price,
  status,
  sync_status,
  created_at
FROM canvas_orders
WHERE token = 'cv-test123';
```

### Cleanup:
```sql
DELETE FROM canvas_orders WHERE token = 'cv-test123';
```

---

## 📊 Query Examples

### Get pending orders:
```sql
SELECT * FROM canvas_orders 
WHERE status = 'pending' 
ORDER BY created_at DESC;
```

### Get orders by branch:
```sql
SELECT * FROM canvas_orders 
WHERE branch_id = 'rawamangun' 
AND status IN ('ready', 'processing')
ORDER BY created_at DESC;
```

### Get unsync orders:
```sql
SELECT * FROM canvas_orders 
WHERE sync_status = 'pending' 
OR sync_status = 'failed'
ORDER BY created_at ASC;
```

### Sales report by size:
```sql
SELECT 
  size,
  COUNT(*) as order_count,
  SUM(total_price) as total_revenue
FROM canvas_orders
WHERE status = 'completed'
GROUP BY size
ORDER BY total_revenue DESC;
```

---

## 🚨 Migration Notes

**If you already created `canvas_orders` without these fields:**

1. ✅ Run `supabase_canvas_orders_UPDATE.sql`
2. ✅ Existing data will keep `NULL` for new columns
3. ✅ New orders will have proper values
4. ✅ No data loss

**If starting fresh:**

1. ❌ Don't run the basic SQL
2. ✅ Create a combined SQL with all fields
3. ✅ Or run basic first, then UPDATE

---

## ✅ Checklist

After running UPDATE SQL:

- [ ] All new columns added
- [ ] Indexes created (branch_id, dealpos_order_id, status)
- [ ] Default values work (`product_type='canvas'`, `status='pending'`)
- [ ] Frontend sends `branchId` and `totalPrice`
- [ ] API saves all fields correctly
- [ ] Test order creates successfully
- [ ] Branded link still works
- [ ] WhatsApp integration unchanged

---

## 🎯 Benefits

1. **Unified Structure:** Canvas orders now consistent with Pas Foto
2. **Dealpos Ready:** Can sync to POS system
3. **Branch Support:** Multi-location pickup
4. **Status Tracking:** Clear order workflow
5. **Price Tracking:** Revenue reports
6. **Extensible:** Easy to add more fields

---

## 📞 Next Steps

1. **Backend Team:** Implement Dealpos sync API
2. **CS Dashboard:** Build order management UI
3. **Branch Staff:** Train on order pickup flow
4. **Analytics:** Setup sales reports

---

**Canvas Orders now ready for Dealpos integration! 🏪**


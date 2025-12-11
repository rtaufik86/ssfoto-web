# 🚚 Canvas Delivery Options - Implementation Guide

## 📋 Overview

Canvas order form sekarang include opsi pengiriman:
- ✅ **Ambil di Cabang** (Pickup) - GRATIS
- ✅ **Kirim dengan GoSend** (Delivery) - Biaya sesuai jarak

---

## 🎯 What Was Added

### **Frontend Changes:**

**File:** `src/app/upload/canvas/page.tsx`

1. **New State Variables:**
   ```typescript
   const [deliveryMethod, setDeliveryMethod] = useState<string>('pickup');
   const [pickupBranch, setPickupBranch] = useState<string>('');
   const [deliveryAddress, setDeliveryAddress] = useState('');
   ```

2. **New Constants:**
   ```typescript
   const DELIVERY_METHODS = [
     { id: 'pickup', label: 'Ambil di Cabang', description: 'Gratis' },
     { id: 'gosend', label: 'Kirim dengan GoSend', description: 'Biaya sesuai jarak' },
   ];

   const BRANCH_OPTIONS = [
     { id: 'jakarta-selatan', label: 'Jakarta Selatan' },
     { id: 'jakarta-pusat', label: 'Jakarta Pusat' },
     { id: 'bogor', label: 'Bogor' },
     { id: 'bekasi-1', label: 'Bekasi 1' },
     { id: 'bekasi-2', label: 'Bekasi 2' },
   ];
   ```

3. **New Form Section:**
   - Section 5: Metode Pengambilan / Pengiriman
   - Conditional rendering:
     - If **Pickup** → Show branch dropdown
     - If **GoSend** → Show address textarea

4. **Updated Validation:**
   ```typescript
   if (deliveryMethod === 'pickup' && !pickupBranch) {
     errors.delivery = 'Silakan pilih cabang untuk pickup';
   }
   if (deliveryMethod === 'gosend' && !deliveryAddress.trim()) {
     errors.delivery = 'Silakan isi alamat pengiriman lengkap';
   }
   ```

5. **Updated API Call:**
   ```typescript
   body: JSON.stringify({
     // ... existing fields
     deliveryMethod,
     pickupBranch: deliveryMethod === 'pickup' ? pickupBranch : null,
     deliveryAddress: deliveryMethod === 'gosend' ? deliveryAddress : null,
   })
   ```

6. **Updated WhatsApp Message:**
   ```typescript
   const deliveryInfo = deliveryMethod === 'pickup'
     ? `🏪 *PENGAMBILAN:*\n• Ambil di Cabang: ${branchLabel}`
     : `🚚 *PENGIRIMAN:*\n• GoSend ke:\n${deliveryAddress}`;
   ```

---

### **Backend Changes:**

**File:** `src/app/api/order-link/route.ts`

1. **Extract New Fields:**
   ```typescript
   const { 
     // ... existing
     deliveryMethod,
     pickupBranch,
     deliveryAddress 
   } = body;
   ```

2. **Store in Database:**
   ```typescript
   details: {
     size,
     orientation,
     order_source: 'website',
     delivery_method: deliveryMethod || 'pickup',
     pickup_branch: pickupBranch || null,
     delivery_address: deliveryAddress || null,
   }
   ```

---

### **Database Changes:**

**File:** `supabase_canvas_orders_delivery_fields_UPDATE.sql`

**New Columns:**
```sql
ALTER TABLE public.canvas_orders 
  ADD COLUMN IF NOT EXISTS delivery_method TEXT DEFAULT 'pickup',
  ADD COLUMN IF NOT EXISTS pickup_branch TEXT,
  ADD COLUMN IF NOT EXISTS delivery_address TEXT;
```

**New Indexes:**
```sql
CREATE INDEX idx_canvas_orders_delivery_method ON canvas_orders(delivery_method);
CREATE INDEX idx_canvas_orders_pickup_branch ON canvas_orders(pickup_branch);
```

---

## 🎨 UI Preview

### **Delivery Method Selection:**

```
┌──────────────────────────────────────────────┐
│  ⑤ Metode Pengambilan / Pengiriman           │
│                                              │
│  ┌────────────────┬────────────────┐         │
│  │ ✓ Ambil di     │  Kirim dengan  │         │
│  │   Cabang       │  GoSend        │         │
│  │   Gratis       │  Biaya sesuai  │         │
│  │                │  jarak         │         │
│  └────────────────┴────────────────┘         │
└──────────────────────────────────────────────┘
```

### **If Pickup Selected:**

```
┌──────────────────────────────────────────────┐
│  Pilih Cabang *                              │
│  ┌─────────────────────────────────────────┐ │
│  │ -- Pilih Cabang --              ▼      │ │
│  └─────────────────────────────────────────┘ │
│  ✓ Kanvas siap diambil 3-5 hari kerja       │
└──────────────────────────────────────────────┘

Options:
- Jakarta Selatan
- Jakarta Pusat  
- Bogor
- Bekasi 1
- Bekasi 2
```

### **If GoSend Selected:**

```
┌──────────────────────────────────────────────┐
│  Alamat Pengiriman Lengkap *                 │
│  ┌─────────────────────────────────────────┐ │
│  │ Jl. Merdeka No. 123,                   │ │
│  │ RT 01/RW 02, Kelurahan Menteng,        │ │
│  │ Kecamatan Menteng,                     │ │
│  │ Jakarta Pusat 10110                    │ │
│  └─────────────────────────────────────────┘ │
│  ✓ Biaya GoSend dikonfirmasi CS             │
└──────────────────────────────────────────────┘
```

---

## 📱 WhatsApp Message Format

### **Pickup:**

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

🏪 *PENGAMBILAN:*
• Ambil di Cabang: Jakarta Selatan

📸 *FOTO YANG DIPESAN:*
https://ssfoto.co.id/dl/cv-abc123

⚠️ Saya memahami bahwa harga di atas *belum termasuk ongkir*.

Mohon konfirmasi ketersediaan dan estimasi pengerjaan. Terima kasih! 🙏
```

### **GoSend:**

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

🚚 *PENGIRIMAN:*
• GoSend ke:
Jl. Merdeka No. 123, RT 01/RW 02,
Kelurahan Menteng, Kecamatan Menteng,
Jakarta Pusat 10110

📸 *FOTO YANG DIPESAN:*
https://ssfoto.co.id/dl/cv-abc123

⚠️ Saya memahami bahwa harga di atas *belum termasuk ongkir dan biaya GoSend*.

Mohon konfirmasi ketersediaan dan estimasi pengerjaan. Terima kasih! 🙏
```

---

## 🗄️ Database Structure

### **canvas_orders Table:**

| Column | Type | Description |
|--------|------|-------------|
| `delivery_method` | TEXT | `pickup` or `gosend` |
| `pickup_branch` | TEXT | Branch ID (jakarta-selatan, etc) |
| `delivery_address` | TEXT | Full address for GoSend |

**Example Data (Pickup):**
```json
{
  "delivery_method": "pickup",
  "pickup_branch": "jakarta-selatan",
  "delivery_address": null
}
```

**Example Data (GoSend):**
```json
{
  "delivery_method": "gosend",
  "pickup_branch": null,
  "delivery_address": "Jl. Merdeka No. 123, RT 01/RW 02..."
}
```

---

## 🚀 Setup Instructions

### **Step 1: Run Database Migration**

```bash
# Open Supabase Dashboard
# SQL Editor → New Query
# Copy from: supabase_canvas_orders_delivery_fields_UPDATE.sql
# Click Run
```

### **Step 2: Verify Database**

```sql
SELECT 
  column_name, 
  data_type, 
  column_default
FROM information_schema.columns
WHERE table_name = 'canvas_orders'
AND column_name IN ('delivery_method', 'pickup_branch', 'delivery_address');
```

Expected output:
```
delivery_method  | text | 'pickup'
pickup_branch    | text | NULL
delivery_address | text | NULL
```

### **Step 3: Test Form**

1. Navigate to: `http://localhost:3000/upload/canvas`
2. Fill form completely
3. Select **Ambil di Cabang**
4. Choose branch
5. Submit
6. Check WhatsApp message includes branch info

7. Test again with **GoSend**
8. Enter address
9. Submit  
10. Check WhatsApp message includes address

---

## ✅ Validation Rules

### **Pickup Method:**
- ✅ Branch selection is **REQUIRED**
- ✅ Address field is **HIDDEN**
- ✅ Error if no branch selected

### **GoSend Method:**
- ✅ Address is **REQUIRED**
- ✅ Branch dropdown is **HIDDEN**
- ✅ Error if address empty
- ✅ Minimum 10 characters for address

---

## 🎯 Form Completion Check

```typescript
const isDeliveryComplete = deliveryMethod === 'pickup' 
  ? !!pickupBranch 
  : (deliveryMethod === 'gosend' ? !!deliveryAddress.trim() : false);

const isFormComplete = 
  file && 
  selectedSize && 
  selectedOrientation && 
  customerName.trim() && 
  customerWhatsApp.trim() && 
  isDeliveryComplete;  // ← NEW
```

Submit button **DISABLED** until all required fields filled.

---

## 📊 Query Examples

### **Get pickup orders by branch:**
```sql
SELECT * FROM canvas_orders 
WHERE delivery_method = 'pickup'
AND pickup_branch = 'jakarta-selatan'
ORDER BY created_at DESC;
```

### **Get GoSend orders:**
```sql
SELECT 
  id,
  customer_name,
  delivery_address,
  total_price,
  status
FROM canvas_orders 
WHERE delivery_method = 'gosend'
ORDER BY created_at DESC;
```

### **Orders by delivery method:**
```sql
SELECT 
  delivery_method,
  COUNT(*) as total_orders,
  SUM(total_price) as total_revenue
FROM canvas_orders
GROUP BY delivery_method;
```

---

## 🔔 Important Notes

### **⚠️ CRITICAL: Backend Team Action Required**

The API route (`/api/order-link`) and database (`canvas_orders`) **MUST** accept and store:
- `delivery_method` (TEXT)
- `pickup_branch` (TEXT, nullable)
- `delivery_address` (TEXT, nullable)

### **Branch IDs Must Match:**

Frontend uses these IDs:
```
- jakarta-selatan
- jakarta-pusat
- bogor
- bekasi-1
- bekasi-2
```

Make sure backend/CS dashboard uses the **SAME IDs**.

### **GoSend Integration (Future):**

This prepares for future GoSend API integration:
- CS currently calculates manually
- Future: Auto-calculate via GoSend API
- Store estimated price in `details` JSON

---

## 📈 Analytics Opportunities

With delivery data, you can analyze:
- Most popular pickup branches
- GoSend vs Pickup ratio
- Average order value by delivery method
- Peak pickup times by branch

---

## 🧪 Testing Checklist

- [ ] Form loads with delivery section
- [ ] Default method is "Pickup"
- [ ] Selecting Pickup shows branch dropdown
- [ ] Selecting GoSend shows address textarea
- [ ] Branch validation works (error if empty)
- [ ] Address validation works (error if empty)
- [ ] Submit button disabled until delivery complete
- [ ] API receives delivery fields
- [ ] Database stores delivery fields
- [ ] WhatsApp message includes delivery info
- [ ] Shipping notice updates based on method

---

## 🎉 Benefits

1. **Better Logistics:** Clear delivery intent from customer
2. **Cost Transparency:** Separate pickup (free) vs delivery (paid)
3. **Branch Planning:** Track which branches are popular
4. **CS Efficiency:** All info in one message
5. **User Choice:** Flexibility for customer preference

---

**Canvas delivery options implementation complete! 🚚**


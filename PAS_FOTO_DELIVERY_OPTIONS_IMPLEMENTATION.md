# 🚚 Pas Foto Delivery Options - Implementation Guide

## 📋 Overview

Pas Foto upload page sekarang include opsi pengiriman yang sama dengan Canvas:
- ✅ **Ambil di Cabang** (Pickup) - GRATIS
- ✅ **Kirim dengan GoSend** (Delivery) - Biaya sesuai jarak

---

## 🎯 What Was Added

### **Frontend Changes:**

**File:** `src/app/upload/pas-foto/page.tsx`

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
     { id: 'rawamangun', label: 'Rawamangun - Jakarta Timur' },
     { id: 'pondok-pinang', label: 'Pondok Pinang - Jakarta Selatan' },
     { id: 'bogor', label: 'Bogor' },
     { id: 'galaxy-bekasi', label: 'Galaxy - Bekasi' },
     { id: 'jatiwaringin-bekasi', label: 'Jatiwaringin - Bekasi' },
   ];
   ```

3. **New Form Section:**
   - Section 4: Metode Pengambilan / Pengiriman
   - Conditional rendering:
     - If **Pickup** → Show branch dropdown
     - If **GoSend** → Show address textarea

4. **Updated Validation:**
   ```typescript
   if (deliveryMethod === 'pickup' && !pickupBranch) {
     alert("Silakan pilih cabang untuk pengambilan");
   }
   if (deliveryMethod === 'gosend' && !deliveryAddress.trim()) {
     alert("Silakan isi alamat pengiriman lengkap");
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

**File:** `src/app/api/pas-foto-link/route.ts`

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
   delivery_method: deliveryMethod || 'pickup',
   pickup_branch: deliveryMethod === 'pickup' ? (pickupBranch || null) : null,
   delivery_address: deliveryMethod === 'gosend' ? (deliveryAddress || null) : null,
   ```

---

### **Database Changes:**

**File:** `supabase_pas_foto_orders_delivery_fields_UPDATE.sql`

**New Columns:**
```sql
ALTER TABLE public.pas_foto_orders 
  ADD COLUMN IF NOT EXISTS delivery_method TEXT DEFAULT 'pickup',
  ADD COLUMN IF NOT EXISTS pickup_branch TEXT,
  ADD COLUMN IF NOT EXISTS delivery_address TEXT;
```

**New Indexes:**
```sql
CREATE INDEX idx_pas_foto_orders_delivery_method ON pas_foto_orders(delivery_method);
CREATE INDEX idx_pas_foto_orders_pickup_branch ON pas_foto_orders(pickup_branch);
```

---

## 🎨 UI Preview

### **Delivery Method Selection:**

```
┌──────────────────────────────────────────────┐
│  4. Metode Pengambilan / Pengiriman          │
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
│  ✓ Pas foto siap diambil 2 jam setelah      │
│    konfirmasi                                 │
└──────────────────────────────────────────────┘

Options:
- Rawamangun - Jakarta Timur
- Pondok Pinang - Jakarta Selatan
- Bogor
- Galaxy - Bekasi
- Jatiwaringin - Bekasi
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
│  ✓ Biaya GoSend dikonfirmasi CS              │
└──────────────────────────────────────────────┘
```

---

## 📱 WhatsApp Message Format

### **Pickup:**

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

🏪 *PENGAMBILAN:*
• Ambil di Cabang: Pondok Pinang - Jakarta Selatan

📸 *DOWNLOAD FOTO:*
https://ssfoto.co.id/dl-pf/pf-abc123

⚠️ Saya memahami bahwa harga di atas *belum termasuk ongkir*.

Mohon proses pesanan ini. Terima kasih! 🙏
```

### **GoSend:**

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

🚚 *PENGIRIMAN:*
• GoSend ke:
Jl. Merdeka No. 123, RT 01/RW 02,
Kelurahan Menteng, Kecamatan Menteng,
Jakarta Pusat 10110

📸 *DOWNLOAD FOTO:*
https://ssfoto.co.id/dl-pf/pf-abc123

⚠️ Saya memahami bahwa harga di atas *belum termasuk biaya GoSend*.

Mohon proses pesanan ini. Terima kasih! 🙏
```

---

## 🗄️ Database Structure

### **pas_foto_orders Table:**

| Column | Type | Description |
|--------|------|-------------|
| `delivery_method` | TEXT | `pickup` or `gosend` |
| `pickup_branch` | TEXT | Branch ID (rawamangun, etc) |
| `delivery_address` | TEXT | Full address for GoSend |

**Example Data (Pickup):**
```json
{
  "delivery_method": "pickup",
  "pickup_branch": "pondok-pinang",
  "delivery_address": null
}
```

**Example Data (GoSend):**
```json
{
  "delivery_method": "gosend",
  "pickup_branch": null,
  "delivery_address": "Jl. Merdeka No. 123..."
}
```

---

## 🚀 Setup Instructions

### **Step 1: Run Database Migration**

```bash
# Open Supabase Dashboard
# SQL Editor → New Query
# Copy from: supabase_pas_foto_orders_delivery_fields_UPDATE.sql
# Click Run
```

### **Step 2: Verify Database**

```sql
SELECT 
  column_name, 
  data_type, 
  column_default
FROM information_schema.columns
WHERE table_name = 'pas_foto_orders'
AND column_name IN ('delivery_method', 'pickup_branch', 'delivery_address');
```

Expected output:
```
delivery_method  | text | 'pickup'
pickup_branch    | text | NULL
delivery_address | text | NULL
```

### **Step 3: Test Form**

1. Navigate to: `http://localhost:3000/upload/pas-foto`
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

## 📊 Query Examples

### **Get pickup orders by branch:**
```sql
SELECT * FROM pas_foto_orders 
WHERE delivery_method = 'pickup'
AND pickup_branch = 'pondok-pinang'
ORDER BY created_at DESC;
```

### **Get GoSend orders:**
```sql
SELECT 
  id,
  customer_name,
  delivery_address,
  status
FROM pas_foto_orders 
WHERE delivery_method = 'gosend'
ORDER BY created_at DESC;
```

### **Orders by delivery method:**
```sql
SELECT 
  delivery_method,
  COUNT(*) as total_orders
FROM pas_foto_orders
GROUP BY delivery_method;
```

---

## 🎯 Benefits

1. **✅ Consistency:** Same UX as Canvas orders
2. **✅ User Choice:** Customer can choose pickup or delivery
3. **✅ Cost Transparency:** Clear pricing (free pickup vs paid delivery)
4. **✅ Branch Planning:** Track which branches are popular
5. **✅ CS Efficiency:** All info in one WhatsApp message

---

## 📋 Checklist

After implementation, verify:

- [ ] Delivery section appears in form
- [ ] Pickup shows branch dropdown
- [ ] GoSend shows address textarea
- [ ] Validation works for both methods
- [ ] API receives delivery fields
- [ ] Database stores delivery fields
- [ ] WhatsApp message includes delivery info
- [ ] SQL migration completed

---

**Pas Foto delivery options implementation complete! 🚚**


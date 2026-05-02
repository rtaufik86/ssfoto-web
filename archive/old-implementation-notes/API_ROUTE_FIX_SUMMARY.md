# 🔧 API Route Fix - Column Mapping Correction

## ❌ **ERROR YANG TERJADI:**

```
Error code: PGRST204
Error message: Could not find the 'branch_id' column of 'canvas_orders' in the schema cache
```

**Root Cause:** API route mencoba insert dengan kolom `branch_id` yang tidak ada di tabel.

---

## ✅ **PERBAIKAN YANG DILAKUKAN:**

### **1. Fixed Column Mapping**

**BEFORE (❌ Wrong):**
```typescript
const orderData = {
  branch_id: branchId || pickupBranch || 'rawamangun', // ❌ Kolom tidak ada!
  // ...
};
```

**AFTER (✅ Correct):**
```typescript
const orderData = {
  delivery_method: deliveryMethod || 'pickup',        // ✅ Kolom benar
  pickup_branch: pickupBranch || branchId || null,   // ✅ Kolom benar
  delivery_address: deliveryAddress || null,          // ✅ Kolom benar
  // NO branch_id! ✅
};
```

### **2. Explicit Field Mapping**

Semua field sekarang menggunakan **snake_case** yang sesuai dengan database:

| Frontend (camelCase) | Database (snake_case) | Status |
|---------------------|----------------------|--------|
| `publicUrl` | `public_url` | ✅ |
| `customerName` | `customer_name` | ✅ |
| `customerWhatsApp` | `customer_whatsapp` | ✅ |
| `deliveryMethod` | `delivery_method` | ✅ |
| `pickupBranch` | `pickup_branch` | ✅ |
| `deliveryAddress` | `delivery_address` | ✅ |
| `totalPrice` | `total_price` | ✅ |
| ~~`branchId`~~ | ~~`branch_id`~~ | ❌ **REMOVED** |

### **3. Conditional Field Insertion**

```typescript
// Only include fields that are relevant
delivery_method: deliveryMethod || 'pickup',
pickup_branch: deliveryMethod === 'pickup' ? (pickupBranch || null) : null,
delivery_address: deliveryMethod === 'gosend' ? (deliveryAddress || null) : null,
```

### **4. Null Value Cleanup**

```typescript
// Remove null/undefined to avoid issues
Object.keys(orderData).forEach(key => {
  if (orderData[key] === null || orderData[key] === undefined) {
    delete orderData[key];
  }
});
```

---

## 📊 **FINAL ORDER DATA STRUCTURE:**

```typescript
{
  // Core fields
  token: "cv-xxx",
  public_url: "https://...",
  size: "14R",
  orientation: "portrait",
  customer_name: "John Doe",
  customer_whatsapp: "08123456789",
  
  // Product & pricing
  product_type: "canvas",
  total_price: 350000,
  
  // Status
  status: "pending",
  sync_status: "pending",
  
  // Delivery (FIXED)
  delivery_method: "pickup",           // ✅ Correct column
  pickup_branch: "bogor",              // ✅ Correct column
  // delivery_address: null (not included for pickup)
  
  // Timestamp
  created_at: "2024-01-01T12:00:00Z",
  
  // Metadata
  details: {
    size: "14R",
    orientation: "portrait",
    order_source: "website",
    delivery_method: "pickup",
    pickup_branch: "bogor",
    // ...
  }
}
```

---

## 🚀 **SETUP REQUIRED:**

### **Step 1: Run SQL to Add Missing Columns**

**File:** `supabase_canvas_orders_FIX_missing_columns.sql`

Jalankan di Supabase SQL Editor untuk menambahkan kolom:
- `delivery_method`
- `pickup_branch`
- `delivery_address`
- `branch_id` (optional, untuk backward compatibility)
- Dan kolom lainnya

### **Step 2: Refresh Schema Cache**

1. Supabase Dashboard → Settings → API
2. Scroll ke bawah
3. Klik "Reload Schema" atau "Refresh"

### **Step 3: Restart Next.js Server**

```bash
Ctrl+C
npm run dev
```

---

## ✅ **VERIFICATION:**

### **Test Insert:**

```sql
-- Test insert dengan data yang benar
INSERT INTO canvas_orders (
  token,
  public_url,
  size,
  orientation,
  customer_name,
  customer_whatsapp,
  delivery_method,
  pickup_branch,
  product_type,
  total_price,
  status,
  sync_status
) VALUES (
  'cv-test-fix',
  'https://example.com/test.jpg',
  '14R',
  'portrait',
  'Test User',
  '08123456789',
  'pickup',
  'bogor',
  'canvas',
  350000,
  'pending',
  'pending'
);

-- Should succeed ✅
```

### **Verify Columns:**

```sql
SELECT column_name 
FROM information_schema.columns
WHERE table_name = 'canvas_orders'
  AND column_name IN (
    'delivery_method',
    'pickup_branch',
    'delivery_address'
  );
```

**Expected:**
```
delivery_method
pickup_branch
delivery_address
```

---

## 🎯 **WHAT CHANGED:**

| Aspect | Before | After |
|--------|--------|-------|
| **Branch field** | `branch_id` ❌ | `pickup_branch` ✅ |
| **Delivery method** | In details only | Top-level + details ✅ |
| **Null handling** | Included nulls | Cleaned up ✅ |
| **Field mapping** | Implicit | Explicit snake_case ✅ |
| **Error handling** | Basic | Comprehensive ✅ |

---

## 📝 **IMPORTANT NOTES:**

1. **`branch_id` REMOVED:** Kolom ini tidak digunakan lagi. Gunakan `pickup_branch` untuk branch pickup.

2. **Conditional Fields:** 
   - Jika `delivery_method = 'pickup'` → hanya `pickup_branch` diisi
   - Jika `delivery_method = 'gosend'` → hanya `delivery_address` diisi

3. **Backward Compatibility:** 
   - `branchId` dari frontend masih diterima
   - Tapi di-mapping ke `pickup_branch` (bukan `branch_id`)

4. **Details JSON:** 
   - Tetap menyimpan semua info di `details` JSONB
   - Untuk referensi dan analytics

---

## 🧪 **TESTING:**

Setelah fix, test dengan:

1. **Pickup Order:**
   ```json
   {
     "deliveryMethod": "pickup",
     "pickupBranch": "bogor"
   }
   ```
   Expected: Insert dengan `pickup_branch = 'bogor'` ✅

2. **GoSend Order:**
   ```json
   {
     "deliveryMethod": "gosend",
     "deliveryAddress": "Jl. Merdeka No. 123..."
   }
   ```
   Expected: Insert dengan `delivery_address = '...'` ✅

---

## ✅ **SUCCESS INDICATORS:**

Setelah fix, console log harusnya:

```
✅ [API] Order inserted successfully!
📄 [API] Inserted data: { id: 123, token: 'cv-xxx', ... }
🔗 [API] Generated branded link: https://ssfoto.co.id/dl/cv-xxx
```

**NO MORE:**
```
❌ Could not find the 'branch_id' column
```

---

**Fix Complete! 🎉**

Setelah run SQL untuk add columns, upload seharusnya berhasil!


# 🏪 Branch List Update - Canvas Upload Page

## 📋 Overview

Daftar cabang di halaman upload Canvas telah diupdate dengan nama cabang SS Foto yang definitif dan akurat.

---

## 🔄 **PERUBAHAN:**

### **BEFORE (Placeholder):**
```typescript
const BRANCH_OPTIONS = [
  { id: 'jakarta-selatan', label: 'Jakarta Selatan' },
  { id: 'jakarta-pusat', label: 'Jakarta Pusat' },
  { id: 'bogor', label: 'Bogor' },
  { id: 'bekasi-1', label: 'Bekasi 1' },
  { id: 'bekasi-2', label: 'Bekasi 2' },
];
```

### **AFTER (Definitive):**
```typescript
const BRANCH_OPTIONS = [
  { id: 'rawamangun', label: 'Rawamangun - Jakarta Timur' },
  { id: 'pondok-pinang', label: 'Pondok Pinang - Jakarta Selatan' },
  { id: 'bogor', label: 'Bogor' },
  { id: 'galaxy-bekasi', label: 'Galaxy - Bekasi' },
  { id: 'jatiwaringin-bekasi', label: 'Jatiwaringin - Bekasi' },
];
```

---

## 📊 **BRANCH MAPPING:**

| ID | Label | Location |
|----|-------|----------|
| `rawamangun` | Rawamangun - Jakarta Timur | Jakarta Timur |
| `pondok-pinang` | Pondok Pinang - Jakarta Selatan | Jakarta Selatan |
| `bogor` | Bogor | Bogor |
| `galaxy-bekasi` | Galaxy - Bekasi | Bekasi |
| `jatiwaringin-bekasi` | Jatiwaringin - Bekasi | Bekasi |

---

## ✅ **AUTOMATIC UPDATES:**

Karena menggunakan `BRANCH_OPTIONS` array, semua bagian yang menggunakan branch list akan otomatis ter-update:

### **1. Dropdown Selection:**
```tsx
<select>
  {BRANCH_OPTIONS.map((branch) => (
    <option key={branch.id} value={branch.id}>
      {branch.label}  {/* ✅ Auto-updated */}
    </option>
  ))}
</select>
```

### **2. WhatsApp Message:**
```typescript
const deliveryInfo = deliveryMethod === 'pickup'
  ? `🏪 *PENGAMBILAN:*\n• Ambil di Cabang: ${BRANCH_OPTIONS.find(b => b.id === pickupBranch)?.label}`
  // ✅ Auto-uses correct label
```

### **3. API Payload:**
```typescript
pickupBranch: deliveryMethod === 'pickup' ? pickupBranch : null
// ✅ Uses branch ID (rawamangun, pondok-pinang, etc.)
```

---

## 📱 **WHATSAPP MESSAGE EXAMPLE:**

### **Before:**
```
🏪 *PENGAMBILAN:*
• Ambil di Cabang: Jakarta Selatan
```

### **After:**
```
🏪 *PENGAMBILAN:*
• Ambil di Cabang: Pondok Pinang - Jakarta Selatan
```

---

## 🗄️ **DATABASE CONSISTENCY:**

**Important:** Pastikan database juga menggunakan ID yang sama:

```sql
-- Verify branch IDs in database match
SELECT DISTINCT pickup_branch 
FROM canvas_orders 
WHERE delivery_method = 'pickup';

-- Expected IDs:
-- rawamangun
-- pondok-pinang
-- bogor
-- galaxy-bekasi
-- jatiwaringin-bekasi
```

**Jika ada data lama dengan ID berbeda:**
```sql
-- Migration script (if needed)
UPDATE canvas_orders
SET pickup_branch = 'rawamangun'
WHERE pickup_branch = 'jakarta-timur';

UPDATE canvas_orders
SET pickup_branch = 'pondok-pinang'
WHERE pickup_branch = 'jakarta-selatan';

-- etc.
```

---

## 🎨 **UI PREVIEW:**

### **Dropdown:**
```
┌─────────────────────────────────────────┐
│ Pilih Cabang *                          │
│ ┌─────────────────────────────────────┐ │
│ │ -- Pilih Cabang --          ▼      │ │
│ │ Rawamangun - Jakarta Timur          │ │
│ │ Pondok Pinang - Jakarta Selatan    │ │
│ │ Bogor                                │ │
│ │ Galaxy - Bekasi                      │ │
│ │ Jatiwaringin - Bekasi                │ │
│ └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

---

## ✅ **VERIFICATION:**

### **Test Checklist:**

- [ ] Dropdown shows 5 branches with correct names
- [ ] Selecting branch updates `pickupBranch` state
- [ ] WhatsApp message shows full branch name
- [ ] API receives correct branch ID
- [ ] Database stores correct branch ID
- [ ] No console errors

### **Test Flow:**

1. Navigate to: `http://localhost:3000/upload/canvas`
2. Select "Ambil di Cabang"
3. Open branch dropdown
4. Verify 5 branches with correct names
5. Select "Pondok Pinang - Jakarta Selatan"
6. Fill form and submit
7. Check WhatsApp message includes: "Pondok Pinang - Jakarta Selatan"
8. Check database: `pickup_branch = 'pondok-pinang'`

---

## 🔄 **BACKWARD COMPATIBILITY:**

**Jika ada data lama dengan ID berbeda:**

1. **Option A: Keep both IDs**
   - Frontend uses new IDs
   - Database can have both old and new
   - Query handles both

2. **Option B: Migrate data**
   - Run migration SQL to update old IDs
   - All data uses new IDs

3. **Option C: Map in API**
   - API route maps old IDs to new IDs
   - No database migration needed

**Recommendation:** Option B (migrate) untuk konsistensi.

---

## 📝 **FILES UPDATED:**

1. ✅ `src/app/upload/canvas/page.tsx` - Updated BRANCH_OPTIONS array

---

## 🎯 **BENEFITS:**

1. **✅ Accurate:** Nama cabang sesuai dengan realitas
2. **✅ Clear:** User tahu lokasi cabang dengan jelas
3. **✅ Professional:** Nama lengkap lebih profesional
4. **✅ Consistent:** Semua bagian otomatis ter-update

---

**Branch list update complete! 🏪**


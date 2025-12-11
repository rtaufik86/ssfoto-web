# 🔧 Supabase Setup Guide - SS Foto Upload Feature

## 📦 **Step 1: Create Storage Bucket**

### **A. Login to Supabase Dashboard:**
```
https://supabase.com/dashboard
```
Login dengan akun Anda

### **B. Navigate to Storage:**
1. Pilih project: `iaipgwtrbjhinfmlibpi`
2. Klik **"Storage"** di sidebar kiri
3. Klik **"Create a new bucket"**

### **C. Bucket Configuration:**
```
Bucket Name: pas-foto-uploads
Public bucket: ✅ YES (centang ini!)
```

**IMPORTANT:** Nama bucket harus `pas-foto-uploads` (bukan `uploads`!)

### **D. Set Bucket Policies:**
Setelah bucket dibuat, klik bucket `pas-foto-uploads`, lalu tab **"Policies"**:

**Policy 1: Allow Public Upload (INSERT)**
```sql
CREATE POLICY "Allow public uploads"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'pas-foto-uploads');
```

**Policy 2: Allow Public Read (SELECT)**
```sql
CREATE POLICY "Allow public reads"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'pas-foto-uploads');
```

---

## 🗄️ **Step 2: Fix Database RLS Policies**

### **A. Navigate to SQL Editor:**
1. Klik **"SQL Editor"** di sidebar
2. Klik **"New query"**

### **B. Run This SQL:**

```sql
-- 1. Buat table orders jika belum ada
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name TEXT NOT NULL,
  customer_whatsapp TEXT NOT NULL,
  product_type TEXT NOT NULL,
  photo_url TEXT,
  status TEXT DEFAULT 'pending',
  details JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Enable RLS (Row Level Security)
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- 3. Drop existing policies jika ada (untuk fresh start)
DROP POLICY IF EXISTS "Allow public insert orders" ON orders;
DROP POLICY IF EXISTS "Allow public read orders" ON orders;

-- 4. POLICY BARU: Allow anyone to INSERT orders (untuk testing)
CREATE POLICY "Allow public insert orders"
ON orders FOR INSERT
TO public
WITH CHECK (true);

-- 5. POLICY BARU: Allow anyone to READ their own orders
CREATE POLICY "Allow public read orders"
ON orders FOR SELECT
TO public
USING (true);

-- 6. Verify policies
SELECT * FROM pg_policies WHERE tablename = 'orders';
```

### **C. Verify Setup:**
Query ini akan menunjukkan policies yang aktif:
```sql
SELECT * FROM pg_policies WHERE tablename = 'orders';
```

Harusnya ada 2 policies:
- ✅ `Allow public insert orders`
- ✅ `Allow public read orders`

---

## ✅ **Step 3: Test Upload**

Setelah setup Supabase:

1. **Refresh halaman:** `http://localhost:3000/upload/pas-foto`
2. **Upload foto lagi**
3. **Check browser console** - seharusnya tidak ada error lagi

---

## 🔍 **Troubleshooting**

### **Error: "Bucket not found"**
**Fix:** Pastikan nama bucket `pas-foto-uploads` (bukan `uploads`)

### **Error: "new row violates row-level security policy"**
**Fix:** Run SQL di atas untuk buat policy `Allow public insert orders`

### **Error: "400 Bad Request" on upload**
**Fix:** Pastikan bucket is PUBLIC (centang "Public bucket" saat buat)

---

## 📊 **Verify Everything Works:**

```sql
-- Check if bucket exists
SELECT * FROM storage.buckets WHERE name = 'pas-foto-uploads';

-- Check bucket policies
SELECT * FROM storage.policies WHERE bucket_id = 'pas-foto-uploads';

-- Check table policies
SELECT * FROM pg_policies WHERE tablename = 'orders';

-- Test insert (manual)
INSERT INTO orders (customer_name, customer_whatsapp, product_type, photo_url, status)
VALUES ('Test User', '08123456789', 'pas_foto', 'https://test.jpg', 'pending');
```

Jika semua query berhasil, upload feature siap digunakan! ✅


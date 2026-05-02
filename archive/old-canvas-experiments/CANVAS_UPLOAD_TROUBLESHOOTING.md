# 🔧 Canvas Upload Error - Troubleshooting Guide

## ❌ Error yang Terjadi

**Error Message:** `"Failed to save order to database"`

**Lokasi:** Halaman `/upload/canvas` saat submit form

---

## 🔍 DIAGNOSIS MASALAH

Error ini terjadi karena salah satu dari:

1. ❌ **Tabel `canvas_orders` belum ada**
2. ❌ **Kolom-kolom baru belum ditambahkan**
3. ❌ **Storage bucket `canvas-uploads` belum dibuat**
4. ❌ **RLS policies blocking insert**

---

## ✅ SOLUSI LENGKAP (Step-by-Step)

### **STEP 1: Setup Database Table** ⚠️ **WAJIB**

**File:** `supabase_canvas_orders_COMPLETE_SETUP.sql`

1. Buka **Supabase Dashboard**
2. Klik **"SQL Editor"** di sidebar
3. Klik **"New Query"**
4. Copy-paste **SEMUA** SQL dari file di atas
5. Klik **"Run"** (atau `Ctrl+Enter`)

**Expected Output:**
```
✅ Table created/updated
✅ 17 columns total
✅ 7 indexes created
✅ 2 RLS policies created
```

**Verify:**
```sql
SELECT COUNT(*) FROM canvas_orders;
-- Should return 0 (empty table, no error)
```

---

### **STEP 2: Setup Storage Bucket** ⚠️ **WAJIB**

#### **Method A: Via Dashboard (RECOMMENDED)**

1. Buka **Supabase Dashboard**
2. Klik **"Storage"** di sidebar
3. Klik **"New bucket"**
4. **Name:** `canvas-uploads`
5. **Public:** ✅ **YES** (untuk public URL)
6. Klik **"Create bucket"**

#### **Method B: Via SQL**

**File:** `supabase_canvas_uploads_bucket_SETUP.sql`

1. Copy SQL dari file
2. Run di SQL Editor
3. Verify bucket exists

**Verify:**
```sql
SELECT id, name, public FROM storage.buckets WHERE id = 'canvas-uploads';
```

**Expected:**
```
id              | name            | public
----------------|-----------------|--------
canvas-uploads  | canvas-uploads  | true
```

---

### **STEP 3: Setup Storage Policies** ⚠️ **WAJIB**

Run SQL ini untuk allow uploads:

```sql
-- Allow public to read files
CREATE POLICY "Public can read canvas uploads"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'canvas-uploads');

-- Allow service role to upload
CREATE POLICY "Service role can upload canvas"
ON storage.objects FOR INSERT
TO service_role
WITH CHECK (bucket_id = 'canvas-uploads');

-- Allow service role full access
CREATE POLICY "Service role full access canvas"
ON storage.objects FOR ALL
TO service_role
USING (bucket_id = 'canvas-uploads')
WITH CHECK (bucket_id = 'canvas-uploads');
```

**Verify:**
```sql
SELECT policyname, cmd 
FROM pg_policies 
WHERE tablename = 'objects' 
AND policyname LIKE '%canvas%';
```

---

### **STEP 4: Verify Environment Variables**

Check `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=https://iaipgwtrbjhinfmlibpi.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...  # ⚠️ REQUIRED!
```

**Restart server:**
```bash
Ctrl+C
npm run dev
```

---

### **STEP 5: Test Upload**

1. Navigate to: `http://localhost:3000/upload/canvas`
2. Upload foto
3. Fill all fields
4. Select delivery method
5. Click submit

**Check Browser Console (F12):**
```
✓ [API] Request body parsed successfully
🔑 [API] Generated token: cv-xxx
💾 [API] Prepared order data
🚀 [API] Attempting to insert...
✅ [API] Order inserted successfully!
```

---

## 🐛 TROUBLESHOOTING SPECIFIC ERRORS

### **Error 1: "relation canvas_orders does not exist"**

**Solution:**
```sql
-- Run complete setup SQL
-- File: supabase_canvas_orders_COMPLETE_SETUP.sql
```

---

### **Error 2: "column delivery_method does not exist"**

**Solution:**
```sql
ALTER TABLE public.canvas_orders 
  ADD COLUMN IF NOT EXISTS delivery_method TEXT DEFAULT 'pickup',
  ADD COLUMN IF NOT EXISTS pickup_branch TEXT,
  ADD COLUMN IF NOT EXISTS delivery_address TEXT;
```

---

### **Error 3: "new row violates row-level security policy"**

**Solution:**
```sql
-- Check if policies exist
SELECT * FROM pg_policies WHERE tablename = 'canvas_orders';

-- If missing, create:
CREATE POLICY "Allow service role full access" ON public.canvas_orders
  FOR ALL TO service_role USING (true) WITH CHECK (true);
```

---

### **Error 4: "Bucket canvas-uploads not found"**

**Solution:**
1. Go to Storage Dashboard
2. Create bucket `canvas-uploads`
3. Set to **Public**
4. Or run SQL from `supabase_canvas_uploads_bucket_SETUP.sql`

---

### **Error 5: "Storage upload failed: 400 Bad Request"**

**Solution:**
```sql
-- Check storage policies
SELECT * FROM pg_policies 
WHERE tablename = 'objects' 
AND policyname LIKE '%canvas%';

-- If missing, create policies (see Step 3)
```

---

## 📊 VERIFICATION CHECKLIST

After setup, verify:

### **Database:**
- [ ] Table `canvas_orders` exists
- [ ] 17 columns total
- [ ] RLS enabled
- [ ] Service role policy exists
- [ ] Public read policy exists

### **Storage:**
- [ ] Bucket `canvas-uploads` exists
- [ ] Bucket is **Public**
- [ ] Storage policies exist
- [ ] Can upload test file

### **Environment:**
- [ ] `NEXT_PUBLIC_SUPABASE_URL` set
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` set
- [ ] `SUPABASE_SERVICE_ROLE_KEY` set
- [ ] Server restarted

### **Code:**
- [ ] API route exists: `/api/order-link`
- [ ] Frontend calls API correctly
- [ ] Error handling works

---

## 🧪 TEST QUERIES

### **Test 1: Insert Test Order**
```sql
INSERT INTO canvas_orders (
  token, public_url, size, orientation,
  customer_name, customer_whatsapp,
  delivery_method, pickup_branch
) VALUES (
  'cv-test-123',
  'https://example.com/test.jpg',
  '16R',
  'portrait',
  'Test User',
  '08123456789',
  'pickup',
  'jakarta-selatan'
);

-- Should succeed without error
```

### **Test 2: Query Test Order**
```sql
SELECT * FROM canvas_orders WHERE token = 'cv-test-123';
-- Should return 1 row
```

### **Test 3: Delete Test Order**
```sql
DELETE FROM canvas_orders WHERE token = 'cv-test-123';
```

---

## 📞 QUICK FIX SUMMARY

**Jika masih error, run ini secara berurutan:**

```sql
-- 1. Complete table setup
-- (Run: supabase_canvas_orders_COMPLETE_SETUP.sql)

-- 2. Verify bucket exists
SELECT id FROM storage.buckets WHERE id = 'canvas-uploads';

-- 3. If bucket missing, create via Dashboard or SQL

-- 4. Create storage policies
CREATE POLICY "Service role can upload canvas"
ON storage.objects FOR INSERT
TO service_role
WITH CHECK (bucket_id = 'canvas-uploads');

-- 5. Restart Next.js server
```

---

## ✅ EXPECTED SUCCESS FLOW

```
1. User uploads photo
   ↓
2. Photo uploaded to Supabase Storage
   ↓
3. Get public URL
   ↓
4. Call /api/order-link
   ↓
5. Insert to canvas_orders table ✅
   ↓
6. Generate branded link
   ↓
7. Return to frontend
   ↓
8. Open WhatsApp with message
```

---

## 🎯 NEXT STEPS AFTER FIX

1. ✅ Test upload flow end-to-end
2. ✅ Verify data in database
3. ✅ Check WhatsApp message format
4. ✅ Test branded link redirect
5. ✅ Monitor for any other errors

---

**Setelah run semua SQL di atas, upload seharusnya berhasil! 🚀**


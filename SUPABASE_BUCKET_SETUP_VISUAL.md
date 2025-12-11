# 🎯 CARA BUAT STORAGE BUCKET (Step-by-Step dengan Screenshot)

## ⚠️ PENTING: Bucket HARUS dibuat manual lewat UI (tidak bisa lewat SQL!)

---

## 📍 **Step 1: Login ke Supabase Dashboard**

1. Buka browser, kunjungi:
   ```
   https://supabase.com/dashboard
   ```

2. Login dengan akun Anda

3. Pilih project: **`iaipgwtrbjhinfmlibpi`**

---

## 📍 **Step 2: Navigate ke Storage**

1. Di sidebar kiri, cari dan klik **"Storage"**
   
   ```
   ┌────────────────┐
   │ Project        │
   ├────────────────┤
   │ Table Editor   │
   │ Authentication │
   │ ▶ Storage      │ ← KLIK INI!
   │ SQL Editor     │
   │ Database       │
   └────────────────┘
   ```

2. Anda akan melihat halaman "All Buckets"

---

## 📍 **Step 3: Check Apakah Bucket Sudah Ada**

1. Lihat list bucket yang ada
2. **Cari bucket dengan nama: `pas-foto-uploads`**

### **Skenario A: Bucket BELUM Ada**
→ Lanjut ke **Step 4** untuk create bucket baru

### **Skenario B: Bucket SUDAH Ada**
→ **CHECK apakah Public: YES**
   - Kalau Public = NO, klik bucket → Settings → Centang "Public bucket" → Save
   - Kalau Public = YES, lanjut ke **Step 5** (run SQL fix)

---

## 📍 **Step 4: Create New Bucket (Jika Belum Ada)**

1. **Klik tombol "New bucket"** atau **"Create a new bucket"**
   
   ```
   ┌─────────────────────────────────────┐
   │ All Buckets                         │
   │                                     │
   │ [+ New bucket]  ← KLIK INI!        │
   │                                     │
   └─────────────────────────────────────┘
   ```

2. **Modal "Create a new bucket" akan muncul**

3. **Isi Form dengan EXACT values ini:**

   ```
   ┌────────────────────────────────────────┐
   │ Create a new bucket                    │
   ├────────────────────────────────────────┤
   │                                        │
   │ Name *                                 │
   │ ┌──────────────────────────────────┐  │
   │ │ pas-foto-uploads                 │  │ ← PERSIS INI!
   │ └──────────────────────────────────┘  │
   │                                        │
   │ ✅ Public bucket    ← CENTANG INI!    │
   │    (Files can be accessed without     │
   │     authentication)                    │
   │                                        │
   │ File size limit                        │
   │ ┌──────────────────────────────────┐  │
   │ │ (Leave empty for unlimited)      │  │
   │ └──────────────────────────────────┘  │
   │                                        │
   │ Allowed MIME types                     │
   │ ┌──────────────────────────────────┐  │
   │ │ (Leave empty for all types)      │  │
   │ └──────────────────────────────────┘  │
   │                                        │
   │      [Cancel]  [Create bucket]         │
   │                        ↑               │
   │                     KLIK INI!          │
   └────────────────────────────────────────┘
   ```

4. **PASTIKAN CHECKLIST "Public bucket" TER-CENTANG!** ← INI SANGAT PENTING!

5. **Klik "Create bucket"**

6. **Bucket berhasil dibuat!**

---

## 📍 **Step 5: Verify Bucket Configuration**

### **A. Via UI (Visual Check):**

1. Di list buckets, Anda akan lihat:
   ```
   ┌──────────────────────────────────────────────┐
   │ Name               │ Public  │ Size          │
   ├──────────────────────────────────────────────┤
   │ pas-foto-uploads   │ ✅ Yes  │ 0 files       │
   └──────────────────────────────────────────────┘
   ```

2. **Public HARUS "Yes"!** Kalau "No", klik bucket → Settings → Centang "Public bucket"

### **B. Via SQL (Technical Check):**

1. Go to **SQL Editor**
2. Klik **"New query"**
3. Paste SQL ini:
   ```sql
   SELECT 
     name,
     public,
     CASE 
       WHEN public = true THEN '✅ BUCKET IS PUBLIC - GOOD!'
       ELSE '❌ BUCKET IS NOT PUBLIC - FIX THIS!'
     END as status
   FROM storage.buckets 
   WHERE name = 'pas-foto-uploads';
   ```
4. Klik **"Run"** (F5)
5. **Expected Result:**
   ```
   name              | public | status
   ------------------+--------+---------------------------
   pas-foto-uploads  | true   | ✅ BUCKET IS PUBLIC - GOOD!
   ```

---

## 📍 **Step 6: Apply Emergency SQL Fix**

1. Tetap di **SQL Editor**
2. Klik **"New query"** lagi
3. **Copy-paste ENTIRE content dari file:** `supabase/EMERGENCY_FIX.sql`
4. Klik **"Run"** (F5)
5. **You should see:**
   ```
   ✅ Emergency Fix Applied! RLS Disabled, Storage Policy Super Permissive.
   ```

---

## 📍 **Step 7: Test Upload di App**

1. **Refresh halaman app:**
   ```
   http://localhost:3000/upload/pas-foto
   ```

2. **Buka Browser Console (F12)**

3. **Upload foto lagi**

4. **Check console logs:**
   ```
   📤 Starting upload... {fileName: "test.jpg", fileSize: 4065622}
   ✅ Upload success: {path: "1764659362100-.trashed-1763448079-IMG_20251019_134103.jpg"}
   🔗 Public URL: https://iaipgwtrbjhinfmlibpi.supabase.co/storage/v1/...
   💾 Saving to database: {customer_name: "Test", ...}
   ✅ Database insert success: [{id: "...", ...}]
   ```

5. **WhatsApp should open with message** ✅

---

## ❌ **Troubleshooting**

### **Error: "Bucket not found"**
→ Bucket belum dibuat atau salah nama
→ **Fix:** Create bucket dengan nama EXACT: `pas-foto-uploads`

### **Error: "400 Bad Request"**
→ Bucket bukan public atau storage policy belum dibuat
→ **Fix:** 
   1. Centang "Public bucket" di bucket settings
   2. Run `EMERGENCY_FIX.sql`

### **Error: "new row violates row-level security policy"**
→ RLS masih blocking insert
→ **Fix:** Run `EMERGENCY_FIX.sql` (disable RLS completely)

### **Error: "Failed to fetch"**
→ CORS issue atau network error
→ **Fix:** Check internet connection, restart dev server

---

## ✅ **Success Checklist**

- [ ] Bucket `pas-foto-uploads` exists
- [ ] Bucket is PUBLIC (centang "Public bucket")
- [ ] Storage policy allows ALL operations
- [ ] RLS on `orders` table is DISABLED (untuk testing)
- [ ] Console shows "✅ Upload success"
- [ ] Console shows "✅ Database insert success"
- [ ] WhatsApp opens with message
- [ ] File appears in Storage bucket

---

## 🎯 **Visual Summary**

```
1. Login Supabase Dashboard
   ↓
2. Storage > New Bucket
   ↓
3. Name: pas-foto-uploads
   Public: ✅ YES (CENTANG!)
   ↓
4. Create Bucket
   ↓
5. SQL Editor > Run EMERGENCY_FIX.sql
   ↓
6. Refresh App > Test Upload
   ↓
7. SUCCESS! 🎉
```

---

## 📞 **Kalau Masih Error:**

**Screenshot & Share:**
1. Supabase Storage page (showing buckets list)
2. Browser console (after upload attempt)
3. Error message yang muncul

**Check:**
```sql
-- Run di SQL Editor untuk diagnostic
SELECT name, public FROM storage.buckets WHERE name = 'pas-foto-uploads';
SELECT tablename, rowsecurity FROM pg_tables WHERE tablename = 'orders';
SELECT policyname FROM pg_policies WHERE tablename = 'objects' AND schemaname = 'storage';
```

Paste hasil query nya! 💪


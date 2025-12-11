-- ========================================
-- 🚨 EMERGENCY FIX: Disable RLS untuk Testing
-- ========================================
-- Copy-paste ke Supabase SQL Editor dan RUN!

-- ========================================
-- 1. FIX STORAGE POLICIES (PALING PENTING!)
-- ========================================

-- Drop semua policies yang ada di storage.objects
DROP POLICY IF EXISTS "Allow public uploads" ON storage.objects;
DROP POLICY IF EXISTS "Allow public reads" ON storage.objects;
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Give users access to own folder" ON storage.objects;

-- Buat policy SUPER PERMISSIVE untuk storage (Allow ALL operations)
CREATE POLICY "Allow all operations on pas-foto-uploads"
ON storage.objects
FOR ALL
TO public
USING (bucket_id = 'pas-foto-uploads')
WITH CHECK (bucket_id = 'pas-foto-uploads');

-- ========================================
-- 2. FIX ORDERS TABLE POLICIES
-- ========================================

-- Drop semua policies yang ada
DROP POLICY IF EXISTS "Allow public insert orders" ON orders;
DROP POLICY IF EXISTS "Allow public read orders" ON orders;
DROP POLICY IF EXISTS "Allow public update orders" ON orders;

-- DISABLE RLS COMPLETELY (untuk testing)
ALTER TABLE orders DISABLE ROW LEVEL SECURITY;

-- Atau kalau mau tetap pakai RLS, buat policy super permissive:
-- ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "Allow all operations" ON orders FOR ALL TO public USING (true) WITH CHECK (true);

-- ========================================
-- 3. VERIFY SETUP
-- ========================================

-- Check storage policies
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  cmd,
  qual
FROM pg_policies 
WHERE tablename = 'objects' AND schemaname = 'storage';

-- Check orders RLS status
SELECT 
  tablename,
  rowsecurity as "RLS Enabled"
FROM pg_tables 
WHERE tablename = 'orders';

-- Check bucket configuration
SELECT 
  id,
  name,
  public
FROM storage.buckets 
WHERE name = 'pas-foto-uploads';

SELECT '✅ Emergency Fix Applied! RLS Disabled, Storage Policy Super Permissive.' AS status;


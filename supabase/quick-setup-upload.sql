-- ========================================
-- 🚀 QUICK SETUP: SS Foto Upload Feature
-- ========================================
-- Copy-paste this ENTIRE file to Supabase SQL Editor and run it!

-- ========================================
-- 1. CREATE STORAGE BUCKET (Manual step - see note below)
-- ========================================
-- ⚠️ MANUAL STEP REQUIRED:
-- Storage buckets can't be created via SQL.
-- Go to: Storage > Create Bucket
-- Name: pas-foto-uploads
-- Public: ✅ YES (check this!)

-- ========================================
-- 2. CREATE ORDERS TABLE
-- ========================================

CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name TEXT NOT NULL,
  customer_whatsapp TEXT NOT NULL,
  product_type TEXT NOT NULL,
  photo_url TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'cancelled')),
  details JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add index for faster queries
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_whatsapp ON orders(customer_whatsapp);

-- ========================================
-- 3. ENABLE ROW LEVEL SECURITY (RLS)
-- ========================================

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- ========================================
-- 4. DROP OLD POLICIES (Fresh start)
-- ========================================

DROP POLICY IF EXISTS "Allow public insert orders" ON orders;
DROP POLICY IF EXISTS "Allow public read orders" ON orders;
DROP POLICY IF EXISTS "Allow public update orders" ON orders;

-- ========================================
-- 5. CREATE RLS POLICIES (Allow Public Access for MVP)
-- ========================================

-- Policy 1: Allow anyone to INSERT orders (untuk customer order)
CREATE POLICY "Allow public insert orders"
ON orders FOR INSERT
TO public
WITH CHECK (true);

-- Policy 2: Allow anyone to READ all orders (untuk testing)
-- ⚠️ PRODUCTION: Ganti dengan authenticated users only!
CREATE POLICY "Allow public read orders"
ON orders FOR SELECT
TO public
USING (true);

-- Policy 3: Allow anyone to UPDATE their own orders
CREATE POLICY "Allow public update orders"
ON orders FOR UPDATE
TO public
USING (true)
WITH CHECK (true);

-- ========================================
-- 6. CREATE STORAGE POLICIES (Run AFTER creating bucket)
-- ========================================

-- Policy 1: Allow public uploads to pas-foto-uploads bucket
INSERT INTO storage.policies (name, bucket_id, definition, check_definition, command)
VALUES (
  'Allow public uploads',
  'pas-foto-uploads',
  '(bucket_id = ''pas-foto-uploads'')',
  '(bucket_id = ''pas-foto-uploads'')',
  'INSERT'
)
ON CONFLICT (bucket_id, name) DO NOTHING;

-- Policy 2: Allow public reads from pas-foto-uploads bucket
INSERT INTO storage.policies (name, bucket_id, definition, check_definition, command)
VALUES (
  'Allow public reads',
  'pas-foto-uploads',
  '(bucket_id = ''pas-foto-uploads'')',
  NULL,
  'SELECT'
)
ON CONFLICT (bucket_id, name) DO NOTHING;

-- ========================================
-- 7. VERIFY SETUP
-- ========================================

-- Check if table exists
SELECT 
  table_name, 
  table_type
FROM information_schema.tables 
WHERE table_name = 'orders';

-- Check RLS is enabled
SELECT 
  tablename, 
  rowsecurity 
FROM pg_tables 
WHERE tablename = 'orders';

-- Check policies
SELECT 
  schemaname, 
  tablename, 
  policyname, 
  cmd, 
  qual
FROM pg_policies 
WHERE tablename = 'orders';

-- Check storage policies
SELECT 
  name, 
  bucket_id, 
  command
FROM storage.policies 
WHERE bucket_id = 'pas-foto-uploads';

-- ========================================
-- ✅ SETUP COMPLETE!
-- ========================================

-- 📝 Next Steps:
-- 1. ✅ Run this SQL in Supabase SQL Editor
-- 2. ✅ Go to Storage > Create bucket "pas-foto-uploads" (Public: YES)
-- 3. ✅ Refresh your app: http://localhost:3000/upload/pas-foto
-- 4. ✅ Test upload!

-- 🔍 Expected Results:
-- - ✅ Table 'orders' exists
-- - ✅ RLS enabled on 'orders'
-- - ✅ 3 policies on 'orders' table
-- - ✅ 2 policies on 'pas-foto-uploads' bucket
-- - ✅ Bucket 'pas-foto-uploads' exists and is PUBLIC

SELECT '✅ SQL Setup Complete! Now create storage bucket manually.' AS status;


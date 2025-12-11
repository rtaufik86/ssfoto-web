-- ========================================
-- 🔍 VERIFY & FIX BUCKET CONFIGURATION
-- ========================================

-- ========================================
-- STEP 1: Check if bucket exists
-- ========================================

SELECT 
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types
FROM storage.buckets 
WHERE name = 'pas-foto-uploads';

-- Expected Result:
-- name: pas-foto-uploads
-- public: TRUE  ← HARUS TRUE!

-- ========================================
-- STEP 2: If bucket exists but not public, make it public
-- ========================================

UPDATE storage.buckets
SET public = true
WHERE name = 'pas-foto-uploads';

-- ========================================
-- STEP 3: If bucket doesn't exist, you MUST create it manually!
-- ========================================

-- ⚠️ STORAGE BUCKETS CAN'T BE CREATED VIA SQL!
-- Go to: Supabase Dashboard > Storage > "Create a new bucket"
-- Name: pas-foto-uploads
-- Public: ✅ YES (MUST CHECK THIS!)
-- Then run this SQL again to verify.

-- ========================================
-- STEP 4: Verify bucket is now public
-- ========================================

SELECT 
  name,
  public,
  CASE 
    WHEN public = true THEN '✅ BUCKET IS PUBLIC'
    ELSE '❌ BUCKET IS NOT PUBLIC - FIX THIS!'
  END as status
FROM storage.buckets 
WHERE name = 'pas-foto-uploads';

-- ========================================
-- STEP 5: Check storage policies
-- ========================================

SELECT 
  policyname,
  cmd as operation,
  qual as condition
FROM pg_policies 
WHERE tablename = 'objects' 
  AND schemaname = 'storage'
  AND qual LIKE '%pas-foto-uploads%';

-- Expected: Should see at least 1 policy allowing operations on 'pas-foto-uploads'


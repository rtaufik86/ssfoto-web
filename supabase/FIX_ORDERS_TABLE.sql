-- ========================================
-- 🔧 FIX ORDERS TABLE: Make branch_id NULLABLE
-- ========================================
-- Copy-paste ke Supabase SQL Editor dan RUN!

-- ========================================
-- Option 1: Make branch_id NULLABLE (Recommended)
-- ========================================

-- Drop not-null constraint dari branch_id
ALTER TABLE orders 
ALTER COLUMN branch_id DROP NOT NULL;

-- ========================================
-- Option 2: Add default value untuk branch_id
-- ========================================

-- Atau kalau mau tetap NOT NULL, kasih default value
-- ALTER TABLE orders 
-- ALTER COLUMN branch_id SET DEFAULT 'rawamangun';

-- ========================================
-- Option 3: Drop column branch_id kalau tidak diperlukan
-- ========================================

-- Atau hapus column ini sama sekali kalau memang tidak dipakai
-- ALTER TABLE orders DROP COLUMN IF EXISTS branch_id;

-- ========================================
-- VERIFY: Check column constraints
-- ========================================

SELECT 
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_name = 'orders'
  AND column_name IN ('branch_id', 'customer_name', 'customer_whatsapp', 'product_type');

-- Expected Result setelah fix:
-- branch_id | text | YES | (nullable)

SELECT '✅ branch_id is now NULLABLE' AS status;


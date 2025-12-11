-- ═══════════════════════════════════════════════════════════════════════════
-- FIX MISSING COLUMNS IN CANVAS_ORDERS TABLE
-- ═══════════════════════════════════════════════════════════════════════════
-- Run this to add missing columns that cause PGRST204 error

-- Add branch_id column (if missing)
ALTER TABLE public.canvas_orders 
  ADD COLUMN IF NOT EXISTS branch_id TEXT;

-- Add product_type column (if missing)
ALTER TABLE public.canvas_orders 
  ADD COLUMN IF NOT EXISTS product_type TEXT DEFAULT 'canvas';

-- Add total_price column (if missing)
ALTER TABLE public.canvas_orders 
  ADD COLUMN IF NOT EXISTS total_price NUMERIC;

-- Add status column (if missing)
ALTER TABLE public.canvas_orders 
  ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'pending';

-- Add details column (if missing)
ALTER TABLE public.canvas_orders 
  ADD COLUMN IF NOT EXISTS details JSONB;

-- Add dealpos_order_id column (if missing)
ALTER TABLE public.canvas_orders 
  ADD COLUMN IF NOT EXISTS dealpos_order_id TEXT;

-- Add sync_status column (if missing)
ALTER TABLE public.canvas_orders 
  ADD COLUMN IF NOT EXISTS sync_status TEXT;

-- Add delivery_method column (if missing)
ALTER TABLE public.canvas_orders 
  ADD COLUMN IF NOT EXISTS delivery_method TEXT DEFAULT 'pickup';

-- Add pickup_branch column (if missing)
ALTER TABLE public.canvas_orders 
  ADD COLUMN IF NOT EXISTS pickup_branch TEXT;

-- Add delivery_address column (if missing)
ALTER TABLE public.canvas_orders 
  ADD COLUMN IF NOT EXISTS delivery_address TEXT;

-- ═══════════════════════════════════════════════════════════════════════════
-- REFRESH SCHEMA CACHE (Important!)
-- ═══════════════════════════════════════════════════════════════════════════
-- Supabase PostgREST caches the schema. After adding columns, we need to
-- notify it to refresh. This is usually done automatically, but sometimes
-- we need to force it.

-- Method 1: Notify schema cache (if available)
NOTIFY pgrst, 'reload schema';

-- Method 2: Verify columns exist
SELECT 
  column_name, 
  data_type, 
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_name = 'canvas_orders'
  AND column_name IN (
    'branch_id',
    'product_type',
    'total_price',
    'status',
    'details',
    'dealpos_order_id',
    'sync_status',
    'delivery_method',
    'pickup_branch',
    'delivery_address'
  )
ORDER BY column_name;

-- ═══════════════════════════════════════════════════════════════════════════
-- VERIFY ALL COLUMNS EXIST
-- ═══════════════════════════════════════════════════════════════════════════
SELECT 
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_name = 'canvas_orders'
ORDER BY ordinal_position;


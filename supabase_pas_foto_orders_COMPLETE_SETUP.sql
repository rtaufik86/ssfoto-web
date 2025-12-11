-- ═══════════════════════════════════════════════════════════════════════════
-- COMPLETE PAS FOTO ORDERS TABLE SETUP
-- ═══════════════════════════════════════════════════════════════════════════
-- Run this to create the pas_foto_orders table with ALL required fields

-- Step 1: Create table if not exists
CREATE TABLE IF NOT EXISTS public.pas_foto_orders (
  id BIGSERIAL PRIMARY KEY,
  token TEXT NOT NULL UNIQUE,
  public_url TEXT NOT NULL,
  size TEXT NOT NULL,
  background TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  customer_name TEXT NOT NULL,
  customer_whatsapp TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Step 2: Add delivery fields (if not exists)
ALTER TABLE public.pas_foto_orders 
  ADD COLUMN IF NOT EXISTS delivery_method TEXT DEFAULT 'pickup',
  ADD COLUMN IF NOT EXISTS pickup_branch TEXT,
  ADD COLUMN IF NOT EXISTS delivery_address TEXT;

-- Step 3: Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_pas_foto_orders_token ON public.pas_foto_orders(token);
CREATE INDEX IF NOT EXISTS idx_pas_foto_orders_created_at ON public.pas_foto_orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_pas_foto_orders_delivery_method ON public.pas_foto_orders(delivery_method);
CREATE INDEX IF NOT EXISTS idx_pas_foto_orders_pickup_branch ON public.pas_foto_orders(pickup_branch);

-- Step 4: Enable Row Level Security
ALTER TABLE public.pas_foto_orders ENABLE ROW LEVEL SECURITY;

-- Step 5: Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Allow service role full access" ON public.pas_foto_orders;
DROP POLICY IF EXISTS "Allow public read access" ON public.pas_foto_orders;

-- Step 6: Create RLS policies
CREATE POLICY "Allow service role full access" ON public.pas_foto_orders
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public read access" ON public.pas_foto_orders
  FOR SELECT
  TO public
  USING (true);

-- Step 7: Add column comments
COMMENT ON TABLE public.pas_foto_orders IS 'Stores pas foto orders with branded download links';
COMMENT ON COLUMN public.pas_foto_orders.token IS 'Unique short token for branded link (e.g., pf-abc123)';
COMMENT ON COLUMN public.pas_foto_orders.public_url IS 'Original Supabase public URL for the uploaded photo';
COMMENT ON COLUMN public.pas_foto_orders.size IS 'Pas foto size (e.g., 2x3, 3x4, 4x6, visa)';
COMMENT ON COLUMN public.pas_foto_orders.background IS 'Background color (merah, biru, putih, asli)';
COMMENT ON COLUMN public.pas_foto_orders.quantity IS 'Number of prints (4 or 8)';
COMMENT ON COLUMN public.pas_foto_orders.delivery_method IS 'Delivery method: pickup (at branch) or gosend (delivery)';
COMMENT ON COLUMN public.pas_foto_orders.pickup_branch IS 'Branch ID for pickup (rawamangun, pondok-pinang, bogor, galaxy-bekasi, jatiwaringin-bekasi)';
COMMENT ON COLUMN public.pas_foto_orders.delivery_address IS 'Full delivery address if using GoSend';

-- Step 8: Verify table structure
SELECT 
  column_name, 
  data_type, 
  is_nullable, 
  column_default
FROM information_schema.columns
WHERE table_name = 'pas_foto_orders'
ORDER BY ordinal_position;

-- Step 9: Verify indexes
SELECT 
  indexname, 
  indexdef
FROM pg_indexes
WHERE tablename = 'pas_foto_orders';

-- Step 10: Verify RLS policies
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd
FROM pg_policies
WHERE tablename = 'pas_foto_orders';


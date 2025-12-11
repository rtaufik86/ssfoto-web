-- ═══════════════════════════════════════════════════════════════════════════
-- COMPLETE CANVAS ORDERS TABLE SETUP
-- ═══════════════════════════════════════════════════════════════════════════
-- Run this to create/update the canvas_orders table with ALL required fields

-- Step 1: Create table if not exists
CREATE TABLE IF NOT EXISTS public.canvas_orders (
  id BIGSERIAL PRIMARY KEY,
  token TEXT NOT NULL UNIQUE,
  public_url TEXT NOT NULL,
  size TEXT NOT NULL,
  orientation TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  customer_whatsapp TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Step 2: Add Dealpos & Branch fields (if not exists)
ALTER TABLE public.canvas_orders 
  ADD COLUMN IF NOT EXISTS branch_id TEXT,
  ADD COLUMN IF NOT EXISTS product_type TEXT DEFAULT 'canvas',
  ADD COLUMN IF NOT EXISTS total_price NUMERIC,
  ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'pending',
  ADD COLUMN IF NOT EXISTS details JSONB,
  ADD COLUMN IF NOT EXISTS dealpos_order_id TEXT,
  ADD COLUMN IF NOT EXISTS sync_status TEXT;

-- Step 3: Add Delivery fields (if not exists)
ALTER TABLE public.canvas_orders 
  ADD COLUMN IF NOT EXISTS delivery_method TEXT DEFAULT 'pickup',
  ADD COLUMN IF NOT EXISTS pickup_branch TEXT,
  ADD COLUMN IF NOT EXISTS delivery_address TEXT;

-- Step 4: Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_canvas_orders_token ON public.canvas_orders(token);
CREATE INDEX IF NOT EXISTS idx_canvas_orders_created_at ON public.canvas_orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_canvas_orders_branch_id ON public.canvas_orders(branch_id);
CREATE INDEX IF NOT EXISTS idx_canvas_orders_dealpos_id ON public.canvas_orders(dealpos_order_id);
CREATE INDEX IF NOT EXISTS idx_canvas_orders_status ON public.canvas_orders(status);
CREATE INDEX IF NOT EXISTS idx_canvas_orders_delivery_method ON public.canvas_orders(delivery_method);
CREATE INDEX IF NOT EXISTS idx_canvas_orders_pickup_branch ON public.canvas_orders(pickup_branch);

-- Step 5: Enable Row Level Security
ALTER TABLE public.canvas_orders ENABLE ROW LEVEL SECURITY;

-- Step 6: Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Allow service role full access" ON public.canvas_orders;
DROP POLICY IF EXISTS "Allow public read access" ON public.canvas_orders;

-- Step 7: Create RLS policies
CREATE POLICY "Allow service role full access" ON public.canvas_orders
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public read access" ON public.canvas_orders
  FOR SELECT
  TO public
  USING (true);

-- Step 8: Add column comments
COMMENT ON TABLE public.canvas_orders IS 'Stores canvas art orders with branded download links';
COMMENT ON COLUMN public.canvas_orders.token IS 'Unique short token for branded link (e.g., cv-abc123)';
COMMENT ON COLUMN public.canvas_orders.public_url IS 'Original Supabase public URL for the uploaded photo';
COMMENT ON COLUMN public.canvas_orders.size IS 'Canvas size (e.g., 14R, 16R, 20R, 24R)';
COMMENT ON COLUMN public.canvas_orders.orientation IS 'Canvas orientation (portrait or landscape)';
COMMENT ON COLUMN public.canvas_orders.delivery_method IS 'Delivery method: pickup (at branch) or gosend (delivery)';
COMMENT ON COLUMN public.canvas_orders.pickup_branch IS 'Branch ID for pickup (jakarta-selatan, jakarta-pusat, bogor, bekasi-1, bekasi-2)';
COMMENT ON COLUMN public.canvas_orders.delivery_address IS 'Full delivery address if using GoSend';

-- Step 9: Verify table structure
SELECT 
  column_name, 
  data_type, 
  is_nullable, 
  column_default
FROM information_schema.columns
WHERE table_name = 'canvas_orders'
ORDER BY ordinal_position;

-- Step 10: Verify indexes
SELECT 
  indexname, 
  indexdef
FROM pg_indexes
WHERE tablename = 'canvas_orders';

-- Step 11: Verify RLS policies
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual
FROM pg_policies
WHERE tablename = 'canvas_orders';


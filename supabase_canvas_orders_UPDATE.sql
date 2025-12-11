-- ═══════════════════════════════════════════════════════════════════════════
-- UPDATE CANVAS ORDERS TABLE - Add Dealpos & Branch Support
-- ═══════════════════════════════════════════════════════════════════════════
-- Run this AFTER creating the basic canvas_orders table

-- Add missing columns for Dealpos integration and branch pickup
ALTER TABLE public.canvas_orders 
  ADD COLUMN IF NOT EXISTS branch_id TEXT,
  ADD COLUMN IF NOT EXISTS product_type TEXT DEFAULT 'canvas',
  ADD COLUMN IF NOT EXISTS total_price NUMERIC,
  ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'pending',
  ADD COLUMN IF NOT EXISTS details JSONB,
  ADD COLUMN IF NOT EXISTS dealpos_order_id TEXT,
  ADD COLUMN IF NOT EXISTS sync_status TEXT;

-- Update column comments
COMMENT ON COLUMN public.canvas_orders.branch_id IS 'Branch ID for pickup location (e.g., rawamangun, kemang)';
COMMENT ON COLUMN public.canvas_orders.product_type IS 'Always "canvas" for this table';
COMMENT ON COLUMN public.canvas_orders.total_price IS 'Final price including size, frame, shipping, etc';
COMMENT ON COLUMN public.canvas_orders.status IS 'Order status: pending, confirmed, processing, ready, completed, cancelled';
COMMENT ON COLUMN public.canvas_orders.details IS 'Additional order details in JSON format';
COMMENT ON COLUMN public.canvas_orders.dealpos_order_id IS 'Integration with Dealpos POS system';
COMMENT ON COLUMN public.canvas_orders.sync_status IS 'Sync status with Dealpos: pending, synced, failed';

-- Create index for branch_id lookups
CREATE INDEX IF NOT EXISTS idx_canvas_orders_branch_id ON public.canvas_orders(branch_id);

-- Create index for dealpos_order_id
CREATE INDEX IF NOT EXISTS idx_canvas_orders_dealpos_id ON public.canvas_orders(dealpos_order_id);

-- Create index for status filtering
CREATE INDEX IF NOT EXISTS idx_canvas_orders_status ON public.canvas_orders(status);

-- Show updated structure
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'canvas_orders'
ORDER BY ordinal_position;


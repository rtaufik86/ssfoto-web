-- ═══════════════════════════════════════════════════════════════════════════
-- ADD DELIVERY FIELDS TO CANVAS ORDERS TABLE
-- ═══════════════════════════════════════════════════════════════════════════
-- Run this to add delivery-specific fields if not already added

-- Add delivery_method column (pickup or gosend)
ALTER TABLE public.canvas_orders 
  ADD COLUMN IF NOT EXISTS delivery_method TEXT DEFAULT 'pickup';

-- Add pickup_branch column (specific branch for pickup)
ALTER TABLE public.canvas_orders 
  ADD COLUMN IF NOT EXISTS pickup_branch TEXT;

-- Add delivery_address column (full address for GoSend)
ALTER TABLE public.canvas_orders 
  ADD COLUMN IF NOT EXISTS delivery_address TEXT;

-- Update column comments
COMMENT ON COLUMN public.canvas_orders.delivery_method IS 'Delivery method: pickup (at branch) or gosend (delivery)';
COMMENT ON COLUMN public.canvas_orders.pickup_branch IS 'Branch ID for pickup (jakarta-selatan, jakarta-pusat, bogor, bekasi-1, bekasi-2)';
COMMENT ON COLUMN public.canvas_orders.delivery_address IS 'Full delivery address if using GoSend';

-- Create index for delivery_method filtering
CREATE INDEX IF NOT EXISTS idx_canvas_orders_delivery_method ON public.canvas_orders(delivery_method);

-- Create index for pickup_branch filtering
CREATE INDEX IF NOT EXISTS idx_canvas_orders_pickup_branch ON public.canvas_orders(pickup_branch);

-- Show updated structure
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'canvas_orders'
ORDER BY ordinal_position;


-- ═══════════════════════════════════════════════════════════════════════════
-- ADD DELIVERY FIELDS TO PAS FOTO ORDERS TABLE
-- ═══════════════════════════════════════════════════════════════════════════
-- Run this to add delivery-specific fields for Pas Foto orders

-- Add delivery_method column (pickup or gosend)
ALTER TABLE public.pas_foto_orders 
  ADD COLUMN IF NOT EXISTS delivery_method TEXT DEFAULT 'pickup';

-- Add pickup_branch column (specific branch for pickup)
ALTER TABLE public.pas_foto_orders 
  ADD COLUMN IF NOT EXISTS pickup_branch TEXT;

-- Add delivery_address column (full address for GoSend)
ALTER TABLE public.pas_foto_orders 
  ADD COLUMN IF NOT EXISTS delivery_address TEXT;

-- Add column comments for documentation
COMMENT ON COLUMN public.pas_foto_orders.delivery_method IS 'Delivery method: pickup (at branch) or gosend (delivery)';
COMMENT ON COLUMN public.pas_foto_orders.pickup_branch IS 'Branch ID for pickup (rawamangun, pondok-pinang, bogor, galaxy-bekasi, jatiwaringin-bekasi)';
COMMENT ON COLUMN public.pas_foto_orders.delivery_address IS 'Full delivery address if using GoSend';

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_pas_foto_orders_delivery_method ON public.pas_foto_orders(delivery_method);
CREATE INDEX IF NOT EXISTS idx_pas_foto_orders_pickup_branch ON public.pas_foto_orders(pickup_branch);

-- Show updated structure
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'pas_foto_orders'
ORDER BY ordinal_position;


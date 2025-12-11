-- ═══════════════════════════════════════════════════════════════════════════
-- CREATE PAS FOTO ORDERS TABLE
-- ═══════════════════════════════════════════════════════════════════════════
-- This table stores pas foto orders with branded link tokens
-- Run this in Supabase SQL Editor

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

-- Create index on token for fast lookups
CREATE INDEX IF NOT EXISTS idx_pas_foto_orders_token ON public.pas_foto_orders(token);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_pas_foto_orders_created_at ON public.pas_foto_orders(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE public.pas_foto_orders ENABLE ROW LEVEL SECURITY;

-- Create policy to allow service role to insert/select
CREATE POLICY "Allow service role full access" ON public.pas_foto_orders
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Create policy to allow public read access (for redirect)
CREATE POLICY "Allow public read access" ON public.pas_foto_orders
  FOR SELECT
  TO public
  USING (true);

-- Add comment to table
COMMENT ON TABLE public.pas_foto_orders IS 'Stores pas foto orders with branded download links';

-- Add comments to columns
COMMENT ON COLUMN public.pas_foto_orders.token IS 'Unique short token for branded link (e.g., pf-abc123)';
COMMENT ON COLUMN public.pas_foto_orders.public_url IS 'Original Supabase public URL for the uploaded photo';
COMMENT ON COLUMN public.pas_foto_orders.size IS 'Pas foto size (e.g., 2x3, 3x4, 4x6)';
COMMENT ON COLUMN public.pas_foto_orders.background IS 'Background color (merah, biru, putih, asli)';
COMMENT ON COLUMN public.pas_foto_orders.quantity IS 'Number of prints (4 or 8)';


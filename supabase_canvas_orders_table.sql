-- ═══════════════════════════════════════════════════════════════════════════
-- CREATE CANVAS ORDERS TABLE
-- ═══════════════════════════════════════════════════════════════════════════
-- This table stores canvas art orders with branded link tokens
-- Run this in Supabase SQL Editor

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

-- Create index on token for fast lookups
CREATE INDEX IF NOT EXISTS idx_canvas_orders_token ON public.canvas_orders(token);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_canvas_orders_created_at ON public.canvas_orders(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE public.canvas_orders ENABLE ROW LEVEL SECURITY;

-- Create policy to allow service role to insert/select
CREATE POLICY "Allow service role full access" ON public.canvas_orders
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Create policy to allow public read access (for redirect)
CREATE POLICY "Allow public read access" ON public.canvas_orders
  FOR SELECT
  TO public
  USING (true);

-- Add comment to table
COMMENT ON TABLE public.canvas_orders IS 'Stores canvas art orders with branded download links';

-- Add comments to columns
COMMENT ON COLUMN public.canvas_orders.token IS 'Unique short token for branded link (e.g., cv-abc123)';
COMMENT ON COLUMN public.canvas_orders.public_url IS 'Original Supabase public URL for the uploaded photo';
COMMENT ON COLUMN public.canvas_orders.size IS 'Canvas size (e.g., 14R, 16R, 20R, 24R)';
COMMENT ON COLUMN public.canvas_orders.orientation IS 'Canvas orientation (portrait or landscape)';


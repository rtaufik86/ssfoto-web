-- ============================================================================
-- PAS FOTO ORDERS TABLE - MVP FEATURE
-- ============================================================================
-- Description: Stand-alone table for Pas Foto quick orders
-- Purpose: Simple, fast ordering without full e-commerce complexity
-- Author: SS Foto Dev Team
-- Last Updated: 2024-12-01
-- ============================================================================

-- ============================================================================
-- 1. CREATE ENUM TYPES
-- ============================================================================

-- Background color options
CREATE TYPE pas_foto_background AS ENUM ('red', 'blue', 'white');

-- Print size options
CREATE TYPE pas_foto_size AS ENUM ('2x3', '3x4', '4x6', 'mix');

-- Quantity package options
CREATE TYPE pas_foto_quantity AS ENUM ('4_pcs', '8_pcs', '12_pcs');

-- Order status
CREATE TYPE pas_foto_status AS ENUM ('pending', 'paid', 'processing', 'ready', 'completed', 'cancelled');

-- ============================================================================
-- 2. CREATE TABLE
-- ============================================================================

CREATE TABLE public.pas_foto_orders (
  -- Primary Key
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  
  -- Order Reference
  order_number TEXT UNIQUE NOT NULL DEFAULT 'PF-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || LPAD(FLOOR(RANDOM() * 1000)::TEXT, 3, '0'),
  
  -- Customer Information
  customer_name TEXT NOT NULL,
  customer_whatsapp TEXT NOT NULL,
  customer_email TEXT,
  
  -- Photo Upload
  photo_url TEXT NOT NULL,
  photo_filename TEXT,
  
  -- Pas Foto Specifications
  background_color pas_foto_background NOT NULL DEFAULT 'blue',
  print_size pas_foto_size NOT NULL DEFAULT '3x4',
  quantity_package pas_foto_quantity NOT NULL DEFAULT '4_pcs',
  
  -- Pickup Location
  branch_location TEXT NOT NULL, -- 'rawamangun', 'pondok-pinang', etc.
  
  -- Pricing
  total_price NUMERIC(10, 2) NOT NULL,
  
  -- Order Status
  status pas_foto_status DEFAULT 'pending' NOT NULL,
  
  -- Additional Notes
  special_instructions TEXT,
  admin_notes TEXT,
  
  -- Payment Info
  payment_method TEXT, -- 'cash', 'bank_transfer', 'e_wallet', 'qris'
  payment_proof_url TEXT,
  paid_at TIMESTAMP WITH TIME ZONE,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  ready_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE
);

-- ============================================================================
-- 3. CREATE INDEXES
-- ============================================================================

-- Index for order number lookup
CREATE INDEX idx_pas_foto_orders_order_number 
  ON public.pas_foto_orders(order_number);

-- Index for customer lookup
CREATE INDEX idx_pas_foto_orders_customer_whatsapp 
  ON public.pas_foto_orders(customer_whatsapp);

-- Index for status filtering
CREATE INDEX idx_pas_foto_orders_status 
  ON public.pas_foto_orders(status);

-- Index for branch location filtering
CREATE INDEX idx_pas_foto_orders_branch 
  ON public.pas_foto_orders(branch_location);

-- Index for date-based queries
CREATE INDEX idx_pas_foto_orders_created_at 
  ON public.pas_foto_orders(created_at DESC);

-- ============================================================================
-- 4. ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

-- Enable RLS
ALTER TABLE public.pas_foto_orders ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can create orders (guest checkout)
CREATE POLICY "Anyone can create pas foto orders"
  ON public.pas_foto_orders
  FOR INSERT
  WITH CHECK (true);

-- Policy: Customers can view their own orders by WhatsApp
CREATE POLICY "Customers can view their own orders"
  ON public.pas_foto_orders
  FOR SELECT
  USING (
    customer_whatsapp = current_setting('request.jwt.claims', true)::json->>'phone'
    OR auth.role() = 'authenticated'
  );

-- Note: For MVP, we allow SELECT without auth for order tracking by order_number
-- This will be tightened in production
CREATE POLICY "Anyone can view orders with order_number"
  ON public.pas_foto_orders
  FOR SELECT
  USING (true);

-- ============================================================================
-- 5. TRIGGERS
-- ============================================================================

-- Trigger to auto-update updated_at timestamp
CREATE TRIGGER update_pas_foto_orders_updated_at
  BEFORE UPDATE ON public.pas_foto_orders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- 6. HELPER FUNCTIONS
-- ============================================================================

-- Function to generate unique order number
CREATE OR REPLACE FUNCTION generate_pas_foto_order_number()
RETURNS TEXT AS $$
DECLARE
  new_order_number TEXT;
  order_count INTEGER;
  date_prefix TEXT;
BEGIN
  -- Get today's date prefix
  date_prefix := TO_CHAR(NOW(), 'YYYYMMDD');
  
  -- Count today's orders
  SELECT COUNT(*) INTO order_count
  FROM public.pas_foto_orders
  WHERE order_number LIKE 'PF-' || date_prefix || '%';
  
  -- Generate new order number
  new_order_number := 'PF-' || date_prefix || '-' || LPAD((order_count + 1)::TEXT, 3, '0');
  
  RETURN new_order_number;
END;
$$ LANGUAGE plpgsql;

-- Function to calculate price based on size and quantity
CREATE OR REPLACE FUNCTION calculate_pas_foto_price(
  p_size pas_foto_size,
  p_quantity pas_foto_quantity
)
RETURNS NUMERIC AS $$
DECLARE
  base_price NUMERIC;
BEGIN
  -- Base prices by size (4 pcs)
  CASE p_size
    WHEN '2x3' THEN base_price := 30000;
    WHEN '3x4' THEN base_price := 35000;
    WHEN '4x6' THEN base_price := 40000;
    WHEN 'mix' THEN base_price := 45000;
    ELSE base_price := 35000;
  END CASE;
  
  -- Adjust for quantity
  CASE p_quantity
    WHEN '4_pcs' THEN RETURN base_price;
    WHEN '8_pcs' THEN RETURN base_price * 1.8; -- 10% discount
    WHEN '12_pcs' THEN RETURN base_price * 2.5; -- 15% discount
    ELSE RETURN base_price;
  END CASE;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- 7. VIEWS (Optional - for reporting)
-- ============================================================================

-- View for daily orders summary
CREATE OR REPLACE VIEW pas_foto_orders_daily_summary AS
SELECT
  DATE(created_at) as order_date,
  branch_location,
  status,
  COUNT(*) as total_orders,
  SUM(total_price) as total_revenue,
  COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed_orders
FROM public.pas_foto_orders
GROUP BY DATE(created_at), branch_location, status
ORDER BY order_date DESC;

-- ============================================================================
-- 8. SEED DATA (Sample for testing)
-- ============================================================================

-- Insert a test order (optional - comment out for production)
/*
INSERT INTO public.pas_foto_orders (
  customer_name,
  customer_whatsapp,
  photo_url,
  background_color,
  print_size,
  quantity_package,
  branch_location,
  total_price,
  status
) VALUES (
  'Budi Santoso',
  '+6281234567890',
  'https://example.com/sample-photo.jpg',
  'blue',
  '3x4',
  '4_pcs',
  'rawamangun',
  35000,
  'pending'
);
*/

-- ============================================================================
-- 9. COMMENTS FOR DOCUMENTATION
-- ============================================================================

COMMENT ON TABLE public.pas_foto_orders IS 
  'Stand-alone table for quick Pas Foto orders. Simplified MVP without full e-commerce complexity.';

COMMENT ON COLUMN public.pas_foto_orders.order_number IS 
  'Auto-generated unique order number format: PF-YYYYMMDD-###';

COMMENT ON COLUMN public.pas_foto_orders.customer_whatsapp IS 
  'Customer WhatsApp number for order notifications and tracking';

COMMENT ON COLUMN public.pas_foto_orders.photo_url IS 
  'URL to uploaded photo in Supabase Storage bucket';

COMMENT ON COLUMN public.pas_foto_orders.branch_location IS 
  'Pickup branch slug: rawamangun, pondok-pinang, jatiwaringin, galaxy, bogor';

COMMENT ON FUNCTION calculate_pas_foto_price IS 
  'Calculate total price based on print size and quantity with built-in discounts';

-- ============================================================================
-- USAGE EXAMPLES
-- ============================================================================

-- Example 1: Create new order
/*
INSERT INTO public.pas_foto_orders (
  order_number,
  customer_name,
  customer_whatsapp,
  photo_url,
  background_color,
  print_size,
  quantity_package,
  branch_location,
  total_price
) VALUES (
  generate_pas_foto_order_number(),
  'John Doe',
  '+6281234567890',
  'https://storage.supabase.co/...',
  'blue',
  '3x4',
  '4_pcs',
  'rawamangun',
  calculate_pas_foto_price('3x4', '4_pcs')
);
*/

-- Example 2: Track order by order number
/*
SELECT * FROM public.pas_foto_orders
WHERE order_number = 'PF-20241201-001';
*/

-- Example 3: Get customer's orders
/*
SELECT * FROM public.pas_foto_orders
WHERE customer_whatsapp = '+6281234567890'
ORDER BY created_at DESC;
*/

-- Example 4: Get today's orders by branch
/*
SELECT 
  branch_location,
  status,
  COUNT(*) as order_count,
  SUM(total_price) as total_revenue
FROM public.pas_foto_orders
WHERE DATE(created_at) = CURRENT_DATE
GROUP BY branch_location, status;
*/

-- ============================================================================
-- END OF SCRIPT
-- ============================================================================

-- Run this script in Supabase SQL Editor
-- Make sure to create the 'order-files' storage bucket for photo uploads


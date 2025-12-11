-- ============================================================================
-- SS FOTO DATABASE SCHEMA
-- ============================================================================
-- Description: Complete database schema for SS Foto O2O Photo Lab Service
-- Author: SS Foto Dev Team
-- Last Updated: 2024-12-01
-- ============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- 1. PROFILES TABLE (Extends auth.users)
-- ============================================================================
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  phone_number TEXT UNIQUE,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS Policies for profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- ============================================================================
-- 2. PRODUCTS TABLE
-- ============================================================================
CREATE TYPE product_category AS ENUM (
  'pas_foto',
  'cetak_foto',
  'wall_decor',
  'photobook',
  'studio'
);

CREATE TYPE product_status AS ENUM ('active', 'inactive', 'out_of_stock');

CREATE TABLE public.products (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  category product_category NOT NULL,
  base_price INTEGER NOT NULL, -- in rupiah
  image_url TEXT,
  specifications JSONB, -- Store variant details like sizes, finishes
  is_featured BOOLEAN DEFAULT FALSE,
  status product_status DEFAULT 'active',
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS Policies for products (Public read)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active products"
  ON public.products FOR SELECT
  USING (status = 'active');

-- Indexes
CREATE INDEX idx_products_category ON public.products(category);
CREATE INDEX idx_products_slug ON public.products(slug);

-- ============================================================================
-- 3. STORES TABLE (Physical Locations)
-- ============================================================================
CREATE TABLE public.stores (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  phone TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  opening_hours JSONB, -- {"monday": "09:00-21:00", ...}
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS Policies for stores (Public read)
ALTER TABLE public.stores ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active stores"
  ON public.stores FOR SELECT
  USING (is_active = TRUE);

-- ============================================================================
-- 4. ORDERS TABLE
-- ============================================================================
CREATE TYPE order_status AS ENUM (
  'draft',
  'pending_payment',
  'payment_confirmed',
  'processing',
  'ready_for_pickup',
  'shipped',
  'completed',
  'cancelled',
  'refunded'
);

CREATE TYPE delivery_method AS ENUM ('pickup', 'shipping');

CREATE TABLE public.orders (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  order_number TEXT UNIQUE NOT NULL, -- e.g., "SS-20241201-001"
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  
  -- Contact Info (for guest checkout)
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  
  -- Order Details
  status order_status DEFAULT 'draft',
  subtotal INTEGER NOT NULL,
  shipping_cost INTEGER DEFAULT 0,
  total_amount INTEGER NOT NULL,
  
  -- Delivery
  delivery_method delivery_method NOT NULL,
  pickup_store_id UUID REFERENCES public.stores(id),
  shipping_address TEXT,
  
  -- Payment
  payment_method TEXT, -- 'bank_transfer', 'e_wallet', 'credit_card'
  payment_proof_url TEXT,
  paid_at TIMESTAMP WITH TIME ZONE,
  
  -- Notes
  customer_notes TEXT,
  admin_notes TEXT,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- RLS Policies for orders
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own orders"
  ON public.orders FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own orders"
  ON public.orders FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Indexes
CREATE INDEX idx_orders_user_id ON public.orders(user_id);
CREATE INDEX idx_orders_order_number ON public.orders(order_number);
CREATE INDEX idx_orders_status ON public.orders(status);

-- ============================================================================
-- 5. ORDER ITEMS TABLE
-- ============================================================================
CREATE TABLE public.order_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
  
  -- Product snapshot (in case product changes/deleted)
  product_name TEXT NOT NULL,
  product_category product_category NOT NULL,
  
  -- Item details
  quantity INTEGER NOT NULL DEFAULT 1,
  unit_price INTEGER NOT NULL,
  subtotal INTEGER NOT NULL,
  
  -- Specifications (size, finish, etc.)
  specifications JSONB,
  
  -- Uploaded files
  uploaded_files JSONB, -- Array of {file_url, file_name, file_size}
  
  -- Processing notes
  special_instructions TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS Policies for order_items
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own order items"
  ON public.order_items FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.orders
      WHERE orders.id = order_items.order_id
      AND orders.user_id = auth.uid()
    )
  );

-- Indexes
CREATE INDEX idx_order_items_order_id ON public.order_items(order_id);
CREATE INDEX idx_order_items_product_id ON public.order_items(product_id);

-- ============================================================================
-- 6. UPLOADED FILES TABLE (Track all uploads)
-- ============================================================================
CREATE TABLE public.uploaded_files (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  order_item_id UUID REFERENCES public.order_items(id) ON DELETE SET NULL,
  
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_size INTEGER, -- in bytes
  mime_type TEXT,
  
  -- Metadata
  width INTEGER,
  height INTEGER,
  checksum TEXT, -- For duplicate detection
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS Policies for uploaded_files
ALTER TABLE public.uploaded_files ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own files"
  ON public.uploaded_files FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can upload their own files"
  ON public.uploaded_files FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Indexes
CREATE INDEX idx_uploaded_files_user_id ON public.uploaded_files(user_id);
CREATE INDEX idx_uploaded_files_checksum ON public.uploaded_files(checksum);

-- ============================================================================
-- 7. FUNCTIONS & TRIGGERS
-- ============================================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to tables
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to generate order number
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TEXT AS $$
DECLARE
  new_order_number TEXT;
  order_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO order_count
  FROM public.orders
  WHERE DATE(created_at) = CURRENT_DATE;
  
  new_order_number := 'SS-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || LPAD((order_count + 1)::TEXT, 3, '0');
  
  RETURN new_order_number;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- 8. SEED DATA (Initial Products & Stores)
-- ============================================================================

-- Insert stores
INSERT INTO public.stores (name, slug, address, city, phone, latitude, longitude, is_active) VALUES
('SS Foto Rawamangun', 'rawamangun', 'Jl. Balai Pustaka Timur No.11, RT.4/RW.11, Rawamangun, Jakarta Timur 13220', 'Jakarta Timur', '+6281936444486', -6.2014817, 106.8831616, TRUE),
('SS Foto Pondok Pinang', 'pondok-pinang', 'Jl. Ciputat Raya, RT.6/RW.2, Pondok Pinang, Jakarta Selatan 12310', 'Jakarta Selatan', '+6281936444486', -6.2668148, 106.7702563, TRUE),
('SS Foto Jatiwaringin', 'jatiwaringin', 'Jl. Raya Jatiwaringin No.344, RW.004, Jaticempaka, Bekasi 17411', 'Bekasi', '+6281936444486', -6.2619307, 106.9083321, TRUE),
('SS Foto Galaxy', 'galaxy', 'Jl. Sedap Malam No.183, Jaka Setia, Bekasi Selatan 17147', 'Bekasi Selatan', '+6281511029359', -6.2556449, 106.9669859, TRUE),
('SS Foto Bogor', 'bogor', 'Jl. Mawar No.63, RT.02/RW.05, Menteng, Bogor Barat 16111', 'Bogor', '+6281936444486', -6.5893142, 106.7849301, TRUE);

-- Insert sample products
INSERT INTO public.products (name, slug, category, base_price, description, specifications, is_featured, status) VALUES
('Pas Foto 3x4 (4 Lembar)', 'pas-foto-3x4', 'pas_foto', 35000, 'Pas foto standar untuk KTP, SIM, dan keperluan administrasi. Background merah/biru/putih. Selesai 1 jam.', '{"sizes": ["3x4"], "background_colors": ["merah", "biru", "putih"], "quantity": 4, "turnaround": "1 jam"}', TRUE, 'active'),
('Pas Foto 4x6 (4 Lembar)', 'pas-foto-4x6', 'pas_foto', 40000, 'Pas foto ukuran 4x6 untuk visa, paspor, dan keperluan internasional.', '{"sizes": ["4x6"], "background_colors": ["merah", "biru", "putih"], "quantity": 4, "turnaround": "1 jam"}', TRUE, 'active'),
('Cetak Foto 4R', 'cetak-foto-4r', 'cetak_foto', 3000, 'Cetak foto ukuran 4R (10x15cm) dengan kertas Fujifilm asli. Kualitas lab profesional.', '{"size": "4R (10x15cm)", "paper": "Fujifilm Crystal Archive", "finish": ["glossy", "matte"]}', TRUE, 'active'),
('Cetak Foto 5R', 'cetak-foto-5r', 'cetak_foto', 4000, 'Cetak foto ukuran 5R (13x18cm) dengan kertas Fujifilm asli.', '{"size": "5R (13x18cm)", "paper": "Fujifilm Crystal Archive", "finish": ["glossy", "matte"]}', FALSE, 'active'),
('Canvas Print 30x40cm', 'canvas-print-30x40', 'wall_decor', 150000, 'Cetak canvas premium dengan frame kayu. Cocok untuk dekorasi rumah dan kantor.', '{"size": "30x40cm", "material": "Canvas Premium", "frame": "Kayu", "finish": "Glossy"}', TRUE, 'active'),
('Custom Frame Premium', 'custom-frame-premium', 'wall_decor', 200000, 'Bingkai custom dengan berbagai pilihan material dan ukuran. Dikerjakan di workshop kami sendiri.', '{"materials": ["Kayu Jati", "Aluminium", "Fiber"], "colors": "Custom", "turnaround": "3-5 hari"}', FALSE, 'active'),
('Photobook Hardcover A4', 'photobook-hardcover-a4', 'photobook', 250000, 'Album foto premium dengan hardcover dan sistem layflat. Minimal 20 halaman.', '{"size": "A4", "cover": "Hardcover", "binding": "Layflat", "min_pages": 20}', TRUE, 'active'),
('Sesi Foto Studio Keluarga', 'studio-session-family', 'studio', 500000, 'Paket foto studio keluarga dengan makeup artist dan cetak langsung 10 foto 5R.', '{"duration": "1 jam", "includes": ["Makeup", "10 foto 5R cetak", "Softcopy HD"], "turnaround": "Langsung"}', FALSE, 'active');

-- ============================================================================
-- NOTES FOR DEVELOPERS
-- ============================================================================
-- 1. Run this script in Supabase SQL Editor
-- 2. Enable Realtime for 'orders' table if you want live updates
-- 3. Setup Storage buckets:
--    - 'uploads' (public): For product images
--    - 'order-files' (private): For customer uploaded photos
-- 4. Configure Storage policies to allow authenticated uploads
-- ============================================================================


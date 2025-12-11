-- ═══════════════════════════════════════════════════════════════════════════
-- CREATE CANVAS UPLOADS STORAGE BUCKET
-- ═══════════════════════════════════════════════════════════════════════════
-- Run this to create the storage bucket for canvas uploads

-- Note: Storage buckets are created via Supabase Dashboard or Storage API
-- This SQL is for reference only - use Dashboard method below

-- ═══════════════════════════════════════════════════════════════════════════
-- METHOD 1: Via Supabase Dashboard (RECOMMENDED)
-- ═══════════════════════════════════════════════════════════════════════════
-- 
-- 1. Go to Supabase Dashboard
-- 2. Click "Storage" in sidebar
-- 3. Click "New bucket"
-- 4. Name: "canvas-uploads"
-- 5. Public: YES (for public URL access)
-- 6. Click "Create bucket"
--
-- ═══════════════════════════════════════════════════════════════════════════
-- METHOD 2: Via SQL (if bucket doesn't exist)
-- ═══════════════════════════════════════════════════════════════════════════

-- Insert bucket into storage.buckets (if not exists)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'canvas-uploads',
  'canvas-uploads',
  true,
  26214400, -- 25MB in bytes
  ARRAY['image/jpeg', 'image/jpg', 'image/png']
)
ON CONFLICT (id) DO NOTHING;

-- ═══════════════════════════════════════════════════════════════════════════
-- STORAGE POLICIES (RLS for Storage)
-- ═══════════════════════════════════════════════════════════════════════════

-- Allow public to read files
CREATE POLICY "Public can read canvas uploads"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'canvas-uploads');

-- Allow authenticated users to upload
CREATE POLICY "Authenticated can upload canvas"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'canvas-uploads');

-- Allow service role full access
CREATE POLICY "Service role full access canvas"
ON storage.objects FOR ALL
TO service_role
USING (bucket_id = 'canvas-uploads')
WITH CHECK (bucket_id = 'canvas-uploads');

-- ═══════════════════════════════════════════════════════════════════════════
-- VERIFY BUCKET EXISTS
-- ═══════════════════════════════════════════════════════════════════════════

SELECT id, name, public, created_at
FROM storage.buckets
WHERE id = 'canvas-uploads';


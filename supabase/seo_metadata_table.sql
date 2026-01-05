-- ============================================================================
-- SEO METADATA TABLE
-- ============================================================================
-- Table untuk menyimpan semua SEO metadata (title, description, schema, dll)
-- secara terpusat dan mudah dikelola tanpa harus edit kode

-- Drop table jika sudah ada (hati-hati di production!)
DROP TABLE IF EXISTS public.seo_metadata CASCADE;

-- Create table
CREATE TABLE public.seo_metadata (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Page Identifier
  page_path TEXT NOT NULL UNIQUE, -- e.g., '/', '/layanan', '/layanan/pas-foto'
  page_name TEXT NOT NULL, -- e.g., 'Homepage', 'Layanan', 'Pas Foto'
  
  -- Meta Tags
  meta_title TEXT NOT NULL,
  meta_description TEXT NOT NULL,
  meta_keywords TEXT[], -- Array of keywords
  
  -- Open Graph
  og_title TEXT,
  og_description TEXT,
  og_image TEXT, -- URL to OG image
  og_type TEXT DEFAULT 'website',
  
  -- Twitter Card
  twitter_card TEXT DEFAULT 'summary_large_image',
  twitter_title TEXT,
  twitter_description TEXT,
  twitter_image TEXT,
  
  -- Canonical URL
  canonical_url TEXT,
  
  -- Structured Data (Schema.org)
  schema_json JSONB, -- Store schema markup as JSON
  
  -- On-Page SEO
  h1_text TEXT, -- Main H1 heading
  h2_texts TEXT[], -- Array of H2 headings
  focus_keyword TEXT, -- Primary keyword untuk page ini
  
  -- Status & Metadata
  is_active BOOLEAN DEFAULT true,
  is_indexed BOOLEAN DEFAULT true, -- Apakah page ini di-index Google?
  priority DECIMAL(2,1) DEFAULT 0.5, -- Sitemap priority (0.0 - 1.0)
  change_frequency TEXT DEFAULT 'weekly', -- Sitemap changefreq
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Versioning (untuk tracking perubahan)
  version INTEGER DEFAULT 1,
  updated_by TEXT -- Email/ID user yang update
);

-- ============================================================================
-- INDEXES
-- ============================================================================
CREATE INDEX idx_seo_page_path ON public.seo_metadata(page_path);
CREATE INDEX idx_seo_is_active ON public.seo_metadata(is_active);
CREATE INDEX idx_seo_focus_keyword ON public.seo_metadata(focus_keyword);

-- ============================================================================
-- RLS (Row Level Security)
-- ============================================================================
ALTER TABLE public.seo_metadata ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read active SEO metadata
CREATE POLICY "Anyone can read active SEO metadata"
ON public.seo_metadata
FOR SELECT
USING (is_active = true);

-- Policy: Only authenticated users can insert/update/delete
-- (Sesuaikan dengan kebutuhan auth Anda)
CREATE POLICY "Authenticated users can manage SEO metadata"
ON public.seo_metadata
FOR ALL
USING (auth.role() = 'authenticated');

-- ============================================================================
-- TRIGGER: Auto-update updated_at
-- ============================================================================
CREATE OR REPLACE FUNCTION update_seo_metadata_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  NEW.version = OLD.version + 1;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_seo_metadata_timestamp
BEFORE UPDATE ON public.seo_metadata
FOR EACH ROW
EXECUTE FUNCTION update_seo_metadata_timestamp();

-- ============================================================================
-- SEED DATA: Insert existing SEO metadata
-- ============================================================================

-- Homepage
INSERT INTO public.seo_metadata (
  page_path,
  page_name,
  meta_title,
  meta_description,
  meta_keywords,
  og_title,
  og_description,
  canonical_url,
  h1_text,
  focus_keyword,
  priority,
  change_frequency,
  schema_json
) VALUES (
  '/',
  'Homepage',
  'SS Foto Digital Lab - Studio & Cetak Foto Profesional Jakarta',
  'SS Foto Digital Lab: Jasa cetak pas foto kilat & studio. Menggunakan teknologi Silver Halide (tahan 100 tahun). Kunjungi cabang kami di Jakarta, Bogor, & Bekasi.',
  ARRAY['Cetak foto jakarta', 'Studio foto terdekat', 'Lab foto profesional', 'Cetak pas foto kilat', 'SS Foto'],
  'SS Foto Digital Lab - Studio & Cetak Foto Profesional Jakarta',
  'Jasa cetak pas foto kilat & studio. Menggunakan teknologi Silver Halide (tahan 100 tahun). Kunjungi cabang kami di Jakarta, Bogor, & Bekasi.',
  'https://ssfoto.co.id',
  'Merawat Kenangan Keluarga, Semudah Sentuhan Jari.',
  'cetak foto jakarta',
  1.0,
  'weekly',
  '{"@context": "https://schema.org", "@type": "Organization", "name": "SS Foto Digital Lab"}'::jsonb
);

-- Halaman Lokasi
INSERT INTO public.seo_metadata (
  page_path,
  page_name,
  meta_title,
  meta_description,
  meta_keywords,
  og_title,
  og_description,
  canonical_url,
  h1_text,
  focus_keyword,
  priority,
  change_frequency
) VALUES (
  '/lokasi',
  'Lokasi Cabang',
  'Lokasi Cabang SS Foto - Studio & Cetak Foto Terdekat',
  'Temukan 5 cabang SS Foto di Jakarta (Rawamangun, Pondok Pinang), Bekasi (Galaxy, Jatiwaringin), dan Bogor. Lihat alamat lengkap, jam buka, dan peta lokasi.',
  ARRAY['Cetak foto terdekat', 'Studio foto Jakarta', 'SS Foto Bekasi', 'SS Foto Bogor'],
  'Lokasi Cabang SS Foto - 5 Cabang di Jakarta, Bekasi & Bogor',
  'Temukan cabang SS Foto terdekat: Jakarta (Rawamangun, Pondok Pinang), Bekasi (Galaxy, Jatiwaringin), dan Bogor. Buka setiap hari 09.00-21.00 WIB.',
  'https://ssfoto.co.id/lokasi',
  'Temukan Cabang SS Foto Terdekat',
  'lokasi ss foto',
  0.7,
  'monthly'
);

-- Halaman Layanan
INSERT INTO public.seo_metadata (
  page_path,
  page_name,
  meta_title,
  meta_description,
  meta_keywords,
  og_title,
  og_description,
  canonical_url,
  h1_text,
  focus_keyword,
  priority,
  change_frequency
) VALUES (
  '/layanan',
  'Layanan',
  'Layanan Cetak Foto & Studio Professional - SS Foto Digital Lab',
  'Daftar harga cetak pas foto kilat, cetak foto kanvas, frame custom, dan foto studio. Kualitas lab tahan 100 tahun. Tersedia di Jakarta, Bekasi, dan Bogor.',
  ARRAY['cetak foto', 'pas foto', 'foto visa', 'cetak kanvas', 'frame foto', 'foto studio'],
  'Layanan Cetak Foto & Studio Professional - SS Foto',
  'Daftar harga cetak pas foto kilat, cetak foto kanvas, frame custom, dan foto studio. Kualitas lab tahan 100 tahun.',
  'https://ssfoto.co.id/layanan',
  'Layanan Kami',
  'layanan cetak foto',
  0.9,
  'weekly'
);

-- Halaman Pas Foto
INSERT INTO public.seo_metadata (
  page_path,
  page_name,
  meta_title,
  meta_description,
  meta_keywords,
  og_title,
  og_description,
  canonical_url,
  h1_text,
  focus_keyword,
  priority,
  change_frequency
) VALUES (
  '/layanan/pas-foto',
  'Pas Foto',
  'Cetak Pas Foto Kilat Jakarta - Jaminan Lolos | SS Foto',
  'Cetak pas foto berkualitas lab dengan jaminan lolos aplikasi. Proses cepat 2 jam, tersedia di 5 cabang Jakarta, Bekasi, dan Bogor. Harga mulai Rp 35.000 untuk 4 lembar.',
  ARRAY['pas foto jakarta', 'pas foto kilat', 'foto paspor', 'foto visa', 'foto KTP', 'foto CPNS'],
  'Cetak Pas Foto Kilat Jakarta - Jaminan Lolos | SS Foto',
  'Cetak pas foto berkualitas lab dengan jaminan lolos aplikasi. Proses cepat 2 jam. Harga mulai Rp 35.000.',
  'https://ssfoto.co.id/layanan/pas-foto',
  'Pas Foto: Lolos Aplikasi, Hemat Waktu, dan Jaminan Kualitas',
  'pas foto jakarta',
  0.9,
  'weekly'
);

-- Halaman Cetak Canvas
INSERT INTO public.seo_metadata (
  page_path,
  page_name,
  meta_title,
  meta_description,
  meta_keywords,
  og_title,
  og_description,
  canonical_url,
  h1_text,
  focus_keyword,
  priority,
  change_frequency
) VALUES (
  '/layanan/cetak-canvas',
  'Cetak Canvas',
  'Jasa Cetak Kanvas Premium | Garansi 100 Tahun - SS Foto',
  'Ubah foto menjadi lukisan dinding dengan Kanvas Premium SS Foto. Dicetak di Kanvas Cotton Asli, tinta UV Protection (Garansi 100 Tahun), rangka Kayu Jati Oven. Desain foto kanvas Anda sekarang!',
  ARRAY['cetak kanvas', 'jasa cetak foto kanvas', 'cetak kanvas premium', 'cetak foto kanvas Jakarta'],
  'Jasa Cetak Kanvas Premium | Garansi 100 Tahun - SS Foto',
  'Ubah foto menjadi lukisan dinding dengan Kanvas Premium SS Foto. Garansi 100 Tahun!',
  'https://ssfoto.co.id/layanan/cetak-canvas',
  'Cetak Canvas Premium',
  'cetak kanvas jakarta',
  0.8,
  'weekly'
);

-- Halaman Tentang Kami
INSERT INTO public.seo_metadata (
  page_path,
  page_name,
  meta_title,
  meta_description,
  meta_keywords,
  og_title,
  og_description,
  canonical_url,
  h1_text,
  focus_keyword,
  priority,
  change_frequency
) VALUES (
  '/tentang-kami',
  'Tentang Kami',
  'Tentang SS Foto - Lab Foto Profesional Sejak 1986',
  'Mengenal perjalanan SS Foto melayani keluarga Indonesia selama lebih dari 30 tahun. Kualitas lab kimia asli (Silver Halide), bukan digital printing biasa.',
  ARRAY['ss foto', 'tentang ss foto', 'lab foto profesional', 'cetak foto sejak 1986', 'silver halide'],
  'Tentang SS Foto - Lab Foto Profesional Sejak 1986',
  'Mengenal perjalanan SS Foto melayani keluarga Indonesia selama lebih dari 30 tahun dengan teknologi lab kimia asli.',
  'https://ssfoto.co.id/tentang-kami',
  'Lebih Dari Sekadar Tukang Cetak.',
  'tentang ss foto',
  0.6,
  'monthly'
);

-- Halaman Kontak
INSERT INTO public.seo_metadata (
  page_path,
  page_name,
  meta_title,
  meta_description,
  meta_keywords,
  og_title,
  og_description,
  canonical_url,
  h1_text,
  focus_keyword,
  priority,
  change_frequency
) VALUES (
  '/kontak',
  'Kontak',
  'Hubungi SS Foto - Layanan Pelanggan & Kerjasama',
  'Hubungi tim SS Foto untuk pertanyaan seputar cetak foto, keluhan pelanggan, atau penawaran kerjasama B2B. Respon cepat via WhatsApp.',
  ARRAY['kontak ss foto', 'hubungi ss foto', 'customer service', 'whatsapp ss foto'],
  'Hubungi SS Foto - Layanan Pelanggan & Kerjasama',
  'Hubungi tim SS Foto untuk pertanyaan seputar cetak foto, keluhan pelanggan, atau kerjasama B2B. Respon cepat via WhatsApp.',
  'https://ssfoto.co.id/kontak',
  'Kami Siap Membantu',
  'kontak ss foto',
  0.5,
  'monthly'
);

-- ============================================================================
-- HELPFUL QUERIES
-- ============================================================================

-- Get SEO metadata for a specific page
-- SELECT * FROM public.seo_metadata WHERE page_path = '/';

-- Get all active pages for sitemap
-- SELECT page_path, priority, change_frequency, updated_at 
-- FROM public.seo_metadata 
-- WHERE is_active = true AND is_indexed = true
-- ORDER BY priority DESC;

-- Update meta description for homepage
-- UPDATE public.seo_metadata 
-- SET meta_description = 'New description here',
--     updated_by = 'admin@ssfoto.co.id'
-- WHERE page_path = '/';

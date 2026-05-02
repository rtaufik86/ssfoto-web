# SEO Database Management System

Sistem manajemen SEO terpusat menggunakan Supabase untuk memudahkan update meta tags, schema markup, dan on-page optimization tanpa harus edit kode.

## 📋 Daftar Isi

1. [Setup Database](#setup-database)
2. [Cara Menggunakan](#cara-menggunakan)
3. [Update SEO Metadata](#update-seo-metadata)
4. [Integrasi dengan Pages](#integrasi-dengan-pages)
5. [API Reference](#api-reference)

---

## 🚀 Setup Database

### 1. Jalankan SQL Script

Buka Supabase Dashboard → SQL Editor → Jalankan file:
```
supabase/seo_metadata_table.sql
```

Script ini akan:
- ✅ Membuat table `seo_metadata`
- ✅ Setup indexes untuk performa
- ✅ Enable Row Level Security (RLS)
- ✅ Insert data SEO existing pages
- ✅ Setup auto-update timestamp trigger

### 2. Verifikasi Table

Cek di Supabase Dashboard → Table Editor → `seo_metadata`

Seharusnya sudah ada 7 rows untuk:
- `/` (Homepage)
- `/lokasi`
- `/layanan`
- `/layanan/pas-foto`
- `/layanan/cetak-canvas`
- `/tentang-kami`
- `/kontak`

---

## 📖 Cara Menggunakan

### Struktur Table

| Column | Type | Description |
|--------|------|-------------|
| `page_path` | TEXT | Path halaman (e.g., `/`, `/layanan`) |
| `meta_title` | TEXT | Title tag untuk SEO |
| `meta_description` | TEXT | Meta description |
| `meta_keywords` | TEXT[] | Array keywords |
| `og_title` | TEXT | Open Graph title |
| `og_description` | TEXT | Open Graph description |
| `og_image` | TEXT | URL gambar OG |
| `schema_json` | JSONB | Schema.org markup |
| `h1_text` | TEXT | Main H1 heading |
| `focus_keyword` | TEXT | Primary keyword |
| `priority` | DECIMAL | Sitemap priority (0.0-1.0) |
| `change_frequency` | TEXT | Sitemap changefreq |
| `is_active` | BOOLEAN | Aktif/nonaktif |
| `is_indexed` | BOOLEAN | Di-index Google? |

---

## ✏️ Update SEO Metadata

### Via Supabase Dashboard

1. Buka **Supabase Dashboard** → **Table Editor** → `seo_metadata`
2. Klik row yang ingin diupdate
3. Edit field yang diperlukan
4. Klik **Save**

### Via SQL Query

```sql
-- Update meta description homepage
UPDATE public.seo_metadata 
SET meta_description = 'Deskripsi baru di sini',
    updated_by = 'admin@ssfoto.co.id'
WHERE page_path = '/';

-- Update multiple fields
UPDATE public.seo_metadata 
SET 
    meta_title = 'Title Baru',
    meta_description = 'Description baru',
    focus_keyword = 'keyword baru',
    updated_by = 'admin@ssfoto.co.id'
WHERE page_path = '/layanan/pas-foto';
```

### Tambah Page Baru

```sql
INSERT INTO public.seo_metadata (
    page_path,
    page_name,
    meta_title,
    meta_description,
    meta_keywords,
    canonical_url,
    h1_text,
    focus_keyword,
    priority,
    change_frequency
) VALUES (
    '/layanan/photobook',
    'Photobook',
    'Cetak Photobook Premium - SS Foto',
    'Cetak photobook berkualitas tinggi dengan berbagai pilihan cover dan ukuran.',
    ARRAY['photobook', 'cetak photobook', 'album foto'],
    'https://ssfoto.co.id/layanan/photobook',
    'Photobook Premium',
    'photobook jakarta',
    0.8,
    'weekly'
);
```

---

## 🔌 Integrasi dengan Pages

### Cara 1: Menggunakan `generateSEOMetadata` (Recommended)

File: `src/app/page.tsx`

```typescript
import { generateSEOMetadata } from '@/lib/seo/metadata';
import { Metadata } from 'next';

// Fallback metadata jika database tidak tersedia
const fallbackMetadata: Metadata = {
  title: 'SS Foto - Fallback Title',
  description: 'Fallback description',
};

// Generate metadata dari database dengan fallback
export async function generateMetadata(): Promise<Metadata> {
  return await generateSEOMetadata('/', fallbackMetadata);
}

export default function HomePage() {
  return <div>Homepage Content</div>;
}
```

### Cara 2: Manual Fetch

```typescript
import { getSEOMetadata, convertToNextMetadata } from '@/lib/seo/metadata';

export async function generateMetadata(): Promise<Metadata> {
  const seoData = await getSEOMetadata('/layanan/pas-foto');
  
  if (seoData) {
    return convertToNextMetadata(seoData);
  }
  
  // Fallback
  return {
    title: 'Default Title',
    description: 'Default description',
  };
}
```

### Cara 3: Get Schema Markup

```typescript
import { getSchemaMarkup } from '@/lib/seo/metadata';

export default async function Page() {
  const schema = await getSchemaMarkup('/layanan/pas-foto');
  
  return (
    <>
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
      <div>Page Content</div>
    </>
  );
}
```

---

## 📚 API Reference

### `getSEOMetadata(pagePath: string)`

Fetch SEO metadata untuk halaman tertentu.

**Parameters:**
- `pagePath` (string): Path halaman (e.g., `/`, `/layanan`)

**Returns:** `Promise<SEOMetadata | null>`

**Example:**
```typescript
const seo = await getSEOMetadata('/layanan/pas-foto');
console.log(seo?.meta_title); // "Cetak Pas Foto Kilat Jakarta..."
```

---

### `convertToNextMetadata(seoData: SEOMetadata)`

Convert database SEO data ke Next.js Metadata format.

**Parameters:**
- `seoData` (SEOMetadata): Data dari database

**Returns:** `Metadata`

**Example:**
```typescript
const seoData = await getSEOMetadata('/');
const metadata = convertToNextMetadata(seoData);
```

---

### `generateSEOMetadata(pagePath: string, fallbackMetadata: Metadata)`

Generate metadata dengan fallback otomatis.

**Parameters:**
- `pagePath` (string): Path halaman
- `fallbackMetadata` (Metadata): Metadata fallback jika DB tidak tersedia

**Returns:** `Promise<Metadata>`

**Example:**
```typescript
export async function generateMetadata() {
  return await generateSEOMetadata('/', {
    title: 'Fallback Title',
    description: 'Fallback Description',
  });
}
```

---

### `getAllActivePagesForSitemap()`

Get semua pages aktif untuk sitemap generation.

**Returns:** `Promise<SEOMetadata[]>`

**Example:**
```typescript
const pages = await getAllActivePagesForSitemap();
// Returns array sorted by priority (highest first)
```

---

### `getSchemaMarkup(pagePath: string)`

Get schema.org JSON-LD markup untuk halaman.

**Parameters:**
- `pagePath` (string): Path halaman

**Returns:** `Promise<any | null>`

**Example:**
```typescript
const schema = await getSchemaMarkup('/layanan/pas-foto');
// Returns: { "@context": "https://schema.org", ... }
```

---

## 🎯 Best Practices

### 1. **Selalu Gunakan Fallback**

Jangan pernah assume database selalu available:

```typescript
// ✅ GOOD
export async function generateMetadata() {
  return await generateSEOMetadata('/', fallbackMetadata);
}

// ❌ BAD
export async function generateMetadata() {
  const seo = await getSEOMetadata('/');
  return convertToNextMetadata(seo!); // Bisa error!
}
```

### 2. **Update `updated_by` Field**

Selalu isi field `updated_by` saat update:

```sql
UPDATE seo_metadata 
SET meta_description = 'New description',
    updated_by = 'admin@ssfoto.co.id'
WHERE page_path = '/';
```

### 3. **Test Setelah Update**

Setelah update SEO metadata:
1. Refresh halaman website
2. View Page Source (Ctrl+U)
3. Cek meta tags sudah berubah
4. Test di [Google Rich Results Test](https://search.google.com/test/rich-results)

### 4. **Versioning**

Table otomatis track version changes:

```sql
-- Lihat history perubahan
SELECT page_path, version, updated_at, updated_by 
FROM seo_metadata 
WHERE page_path = '/'
ORDER BY updated_at DESC;
```

---

## 🔍 Troubleshooting

### SEO Metadata Tidak Muncul

**Problem:** Metadata dari database tidak muncul di website

**Solution:**
1. Cek console browser untuk error
2. Pastikan `is_active = true` di database
3. Restart dev server (`npm run dev`)
4. Clear Next.js cache (`.next` folder)

### Error: "Cannot find table seo_metadata"

**Problem:** Table belum dibuat

**Solution:**
Jalankan SQL script: `supabase/seo_metadata_table.sql`

### Fallback Metadata Terus Muncul

**Problem:** Selalu pakai fallback, tidak fetch dari DB

**Solution:**
1. Cek Supabase credentials di `.env.local`
2. Cek RLS policies di Supabase
3. Cek console untuk error messages

---

## 📊 Monitoring

### Query untuk Analytics

```sql
-- Pages dengan priority tertinggi
SELECT page_path, meta_title, priority 
FROM seo_metadata 
WHERE is_active = true
ORDER BY priority DESC;

-- Pages yang belum di-index
SELECT page_path, meta_title 
FROM seo_metadata 
WHERE is_indexed = false;

-- Recent updates
SELECT page_path, updated_at, updated_by, version
FROM seo_metadata 
ORDER BY updated_at DESC
LIMIT 10;

-- Focus keywords distribution
SELECT focus_keyword, COUNT(*) as count
FROM seo_metadata
GROUP BY focus_keyword
ORDER BY count DESC;
```

---

## 🚀 Next Steps

1. **Setup Supabase Table** - Jalankan SQL script
2. **Test Integration** - Update 1 page untuk testing
3. **Migrate All Pages** - Pindahkan semua hardcoded metadata ke DB
4. **Create Admin Panel** (Optional) - Build UI untuk manage SEO
5. **Setup Monitoring** - Track SEO performance

---

## 📞 Support

Jika ada pertanyaan atau issue:
1. Cek dokumentasi ini
2. Cek console browser untuk error
3. Cek Supabase logs
4. Contact developer

---

**Last Updated:** 2025-12-15
**Version:** 1.0.0

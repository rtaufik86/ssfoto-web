SSFOTO_TECHNICAL_SEO_SPEC.md
1. Objective

Dokumen ini mendefinisikan spesifikasi teknis SEO untuk website SSFOTO.CO.ID agar:

website mudah di-crawl Google

halaman cepat di-index

entity SEO dapat dikenali mesin pencari

performa website tetap optimal

Semua implementasi teknis harus mengikuti standar ini.

2. URL Structure Rules

Struktur URL harus:

pendek

deskriptif

menggunakan keyword utama

Contoh URL yang benar:

/pas-foto
/cetak-foto
/cetak-foto-4r
/cetak-canvas
/studio-foto-keluarga

Contoh URL yang tidak disarankan:

/layanan/cetak-foto-4r
/page?id=123
/service/photo-printing

Gunakan format:

keyword-keyword

Semua huruf kecil.

3. Redirect Rules

Jika halaman lama diubah, gunakan 301 redirect.

Contoh:

/layanan/cetak-foto-4r
→
/cetak-foto-4r

Tujuan redirect:

menjaga authority halaman lama

mencegah broken links

Redirect harus dilakukan di level server atau framework routing.

4. Sitemap Structure

Website harus memiliki sitemap XML.

Contoh:

/sitemap.xml

Sitemap harus berisi:

service pages
location pages
studio pages

Struktur ideal:

/sitemap-pages.xml
/sitemap-locations.xml
/sitemap-images.xml

Semua sitemap harus terdaftar di Google Search Console.

5. Robots.txt Rules

File robots.txt harus mengizinkan Google untuk meng-crawl halaman penting.

Contoh konfigurasi:

User-agent: *
Allow: /

Disallow: /admin/
Disallow: /api/
Disallow: /upload/temp/

Area admin tidak boleh diindex.

6. Indexing Rules

Halaman berikut harus indexable:

service pages
location pages
studio pages
blog articles

Halaman berikut harus noindex:

admin dashboard
order tracking page
internal system pages

Contoh meta tag:

<meta name="robots" content="noindex,nofollow">
7. Page Title Rules

Setiap halaman harus memiliki title yang mengandung keyword utama.

Contoh:

Pas Foto Instan di Jakarta | SS Foto
Cetak Foto 4R Berkualitas | SS Foto
Studio Foto Keluarga Jakarta Timur | SS Foto

Panjang title:

50 – 60 karakter
8. Meta Description Rules

Meta description harus menjelaskan layanan secara jelas.

Contoh:

Cetak pas foto cepat dan profesional di SS Foto. Tersedia ukuran 2x3, 3x4, dan 4x6 untuk dokumen resmi.

Panjang ideal:

140 – 160 karakter
9. Heading Structure

Struktur heading harus konsisten.

Contoh:

H1 → judul utama
H2 → section utama
H3 → sub section

Setiap halaman hanya boleh memiliki 1 H1.

10. Internal Linking System

Setiap halaman harus memiliki minimal 3 internal links.

Contoh:

Halaman:

/pas-foto

Internal link:

/cetak-foto
/lokasi
/studio-foto

Anchor text harus deskriptif.

Contoh:

layanan pas foto
cetak foto berkualitas
studio foto keluarga
11. Structured Data

Website harus menggunakan schema markup.

Schema utama yang digunakan:

LocalBusiness
Organization
Service
Product
ImageObject
FAQPage
Local Business Schema

Untuk halaman lokasi.

Contoh atribut:

name
address
telephone
openingHours
geo coordinates

Ini membantu Google Maps.

Service Schema

Untuk halaman layanan seperti:

/pas-foto
/cetak-foto

Atribut:

serviceType
provider
areaServed
FAQ Schema

Halaman layanan harus memiliki FAQ schema.

Ini membantu muncul di rich results Google.

12. Core Web Vitals

Website harus memenuhi standar Core Web Vitals.

Target:

LCP < 2.5s
CLS < 0.1
INP < 200ms

Beberapa langkah optimasi:

gunakan image WebP

lazy loading gambar

minimalkan JavaScript berat

13. Mobile Optimization

Mayoritas pencarian lokal berasal dari mobile.

Website harus:

mobile responsive
fast loading
tap friendly

CTA harus mudah diakses.

14. Image Optimization

Semua gambar harus mengikuti standar:

WebP format
compressed
descriptive filename
alt text

Hal ini mengikuti dokumen:

SSFOTO_IMAGE_SEO_ARCHITECTURE.md
15. Google Business Integration

Halaman lokasi harus memiliki:

Google Maps embed
alamat lengkap
jam operasional

Ini memperkuat sinyal local SEO.

16. Canonical Rules

Jika ada halaman dengan konten mirip, gunakan canonical tag.

Contoh:

<link rel="canonical" href="https://ssfotos.co.id/cetak-foto">

Ini mencegah duplicate content.

17. Monitoring Tools

Website harus terhubung dengan:

Google Search Console
Google Analytics

Data yang dipantau:

impressions
clicks
ranking
CTR
18. Deployment Checklist

Sebelum halaman dipublish, developer harus memeriksa:

URL benar
title ada
meta description ada
H1 ada
internal link ada
schema aktif
gambar optimized

Jika salah satu tidak terpenuhi, halaman tidak boleh dipublish.

19. Security

Website harus menggunakan:

HTTPS
SSL certificate

Ini juga merupakan faktor ranking.

20. Long-Term Scalability

Arsitektur teknis ini harus mampu mendukung:

100+ SEO pages
location expansion
programmatic SEO

Tanpa perlu merombak struktur website.

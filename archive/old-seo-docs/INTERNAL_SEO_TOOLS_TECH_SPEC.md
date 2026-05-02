# TECHNICAL SPECIFICATION: SEO INTERNAL TOOLS

**Project:** BBC / SS Foto Website  
**Framework:** Next.js (App Router)  

Dokumen ini merupakan panduan spesifikasi teknis untuk pengembangan **Web Audit Tool** dan **Internal Link Graph Tool** secara in-house di lingkungan Next.js. Dokumentasi ini harus digunakan oleh developer sebagai Blueprint implementasi.

---

## 1. STRUKTUR FOLDER & FILES

Tambahkan struktur berikut ke dalam project Next.js Anda (di dalam `src/`):

```text
src/
├── app/
│   ├── internal/
│   │   ├── layout.tsx                (Layout khusus internal tools + Access Control)
│   │   ├── page.tsx                  (Dashboard Redirect ke Web Audit)
│   │   ├── web-audit/
│   │   │   └── page.tsx              (UI Web Audit Table)
│   │   └── internal-links/
│   │       └── page.tsx              (UI Internal Link Graph & Table)
│   └── api/
│       └── internal/
│           ├── seo-audit/
│           │   └── route.ts          (Endpoint GET/POST untuk run Web Audit)
│           └── link-graph/
│               └── route.ts          (Endpoint GET/POST untuk generate Link Graph)
├── lib/
│   └── seo-tools/
│       ├── pageTypeMapper.ts         (Logic pemetaan URL berdasar rules ke Page Type)
│       ├── crawler.ts                (Internal HTML parser menggunakan Cheerio)
│       ├── authorityScore.ts         (Algoritma scoring authority & audit)
│       └── urlSource.ts              (Logic pengambilan list URL via Sitemap atau Route Manifest)
└── types/
    └── seo-internal.ts               (Definisi Typescript)
```

---

## 2. ACCESS CONTROL IMPLEMENTATION

Tool internal tidak boleh diekspos ke publik atau Googlebot. Implementasikan Middleware atau pengecekan di `layout.tsx` untuk melakukan blacklist otomatis di production.

**File:** `src/app/internal/layout.tsx`
```tsx
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

export default function InternalToolsLayout({ children }: { children: React.ReactNode }) {
  // Hanya bisa diakses di mode development ATAU ada env var ALLOW_INTERNAL_TOOLS = true
  const isDev = process.env.NODE_ENV === 'development';
  const isInternalAuth = process.env.ALLOW_INTERNAL_TOOLS === 'true';

  if (!isDev && !isInternalAuth) {
    // Di mode production, kembalikan ke 404 agar tidak terlacak index crawler
    redirect('/404');
  }

  return (
    <div className="internal-tools-layout min-h-screen bg-gray-50 text-gray-900 p-8 font-sans">
      <header className="mb-8">
        <h1 className="text-2xl font-bold">SEO Internal Dashboard</h1>
      </header>
      <main>
        {children}
      </main>
    </div>
  );
}
```

---

## 3. TYPE DEFINITIONS

Buat definisi tipe yang ketat untuk memastikan data flow seragam antara crawler, API, dan UI.

**File:** `src/types/seo-internal.ts`
```typescript
export type PageType = 'homepage' | 'money-page' | 'hub-page' | 'weapon-page' | 'trust-page' | 'utility';

export interface LinkNode {
  url: string;
  type: PageType;
  title: string;
  status: number;
  indexable: boolean;
  canonical: string | null;
}

export interface LinkEdge {
  source: string; // URL pengirim
  target: string; // URL yang dituju
  anchorText: string;
  context: 'header' | 'footer' | 'body' | 'sidebar' | 'breadcrumb';
}

export interface WebAuditData {
  url: string;
  status: number;
  pageType: PageType;
  indexable: boolean;
  canonical: string | null;
  metaTitle: string | null;
  titleLength: number;
  metaDescription: string | null;
  descLength: number;
  h1Count: number;
  h2Count: number;
  h3Count: number;
  h1Text: string[];
  wordCount: number;
  internalLinksCount: number;
  outboundLinksCount: number;
  imagesCount: number;
  imagesWithoutAltCount: number;
  hasStructuredData: boolean;
  publishScore: number;
  warnings: string[];
}

export interface InternalLinkData {
  url: string;
  pageType: PageType;
  totalInlinks: number;
  totalOutlinks: number;
  uniqueInlinks: number;
  isOrphan: boolean;
  authorityScore: number;
  warnings: string[];
}
```

---

## 4. LOGIC & DATA GATHERING (CRAWLER & PARSER)

### A. URL Discovery (`lib/seo-tools/urlSource.ts`)
Karena kita menggunakan Next.js, Anda bisa mengambil semua halaman dari output `sitemap.xml` yang di-generate server. Jika `sitemap.xml` belum stabil, sediakan array / list static URL yang ingin diaudit secara hardcoded sebagai MVP (Minimum Viable Product).

### B. Scraping/Parsing HTML (`lib/seo-tools/crawler.ts`)
Gunakan library `cheerio` (atau library JSDOM ringan) untuk parsing saat memanggil halaman dari URL localhost.
Panggil route internal dalam mode server: `fetch(`http://localhost:3000${path}`)` -> pass output text ke cheerio.

```typescript
// Pseudo-code extracting data
import * as cheerio from 'cheerio';

export async function parsePageForAudit(html: string, urlPath: string) {
  const $ = cheerio.load(html);
  
  // 1. Meta check
  const title = $('title').text();
  const metaDesc = $('meta[name="description"]').attr('content') || null;
  const canonical = $('link[rel="canonical"]').attr('href') || null;
  const indexable = !$('meta[name="robots"]').attr('content')?.includes('noindex');

  // 2. Headings count
  const h1Count = $('h1').length;
  const h1Text = $('h1').map((_, el) => $(el).text()).get();

  // 3. Word count (excluding nav/footer ideally)
  const bodyText = $('main').text() || $('body').text();
  const wordCount = bodyText.trim().split(/\s+/).length;

  // 4. Anchor tags extracting contexts
  const links = [];
  $('a[href]').each((_, el) => {
     let context = 'body';
     const parentTags = $(el).parents().map((_, p) => p.tagName).get();
     if(parentTags.includes('header') || parentTags.includes('nav')) context = 'header';
     else if(parentTags.includes('footer')) context = 'footer';
     
     links.push({
       url: $(el).attr('href'),
       anchorText: $(el).text(),
       context
     });
  });

  return { title, metaDesc, indexable, h1Count, h1Text, wordCount, links };
}
```

### C. Mapping Page Type (`lib/seo-tools/pageTypeMapper.ts`)
Map URL ke tipe halaman secara programmatic.

```typescript
export function getPageType(url: string): PageType {
  if (url === '/' || url === 'http://localhost:3000/') return 'homepage';
  
  // SS FOTO Examples
  if (url.includes('/pas-foto') || url.includes('/cetak-foto') || url.includes('/studio-foto') || url.includes('/cetak-canvas')) {
     return 'money-page';
  }
  
  if (url.includes('/tentang') || url.includes('/kontak')) return 'trust-page';
  if (url.includes('/blog') || url.includes('/artikel')) return 'weapon-page';
  
  return 'utility';
}
```

### D. Authority Scoring Pseudo-Logic (`lib/seo-tools/authorityScore.ts`)
Gunakan kombinasi bobot inlinks berdasarkan region link tersebut.

```typescript
export function calculateAuthorityScore(indexable: boolean, edgesToNode: LinkEdge[]): number {
  if (!indexable) return 0; // Halaman noindex tidak dievaluasi skor SEO
  
  let score = 0;
  
  edgesToNode.forEach(edge => {
    let edgeWeight = 1; // Default
    
    // Link di header dan footer seringnya sitewide dan bobot SEO lebih kecil daripada In-Context links
    if (edge.context === 'body') edgeWeight += 2; 
    else if (edge.context === 'header' || edge.context === 'footer') edgeWeight += 0.5;
    
    score += edgeWeight;
  });
  
  // Penalti berat jika orphan page
  if (edgesToNode.length === 0) return -10;
  
  return score;
}
```

---

## 5. ACCEPTANCE CRITERIA (QA GUIDELINES UNTUK DEVELOPER)

### 5.1 Internal Link Graph (`/internal/internal-links`)
- [ ] **Data Fetching:** Halaman menampilkan daftar seluruh URL site berdasarkan page type beserta statistik *Inlinks*, *Outlinks*, dan *Authority Score*.
- [ ] **Orphan Page Detection:** Filter dan highlight khusus (berwarna merah/peringatan) jika suatu URL memiliki `uniqueInlinks = 0`.
- [ ] **Graph Visualization (Opsional tapi disarankan):** Gunakan library JS visualizer graph sederhana (`react-force-graph` atau Vis.js) jika ingin memperlihatkan view node interaktif, dengan core money pages terlihat memusat.
- [ ] **Export Feature:** Tombol Export to CSV untuk memberikan tabel link node secara utuh ke tim SEO.

### 5.2 Web Audit Table (`/internal/web-audit`)
- [ ] **UI/UX Table:** Menampilkan daftar halaman layaknya Google Search Console/ScreamingFrog sederhana. UI Table harus bisa *sort by* Word Count, Title Length, dan H1 Count.
- [ ] **Warnings Flag List:** Kolom Flags mengeluarkan icon warning jika:
    - `metaTitle === undefined || null`
    - `h1Count > 1` (Multiple H1)
    - `h1Count === 0` (Missing H1)
    - `canonical` kosong mis-match dengan page url.
    - `wordCount < 300` (Thin Content Risk - kecuali type 'utility').
- [ ] **Expandable Row:** Ketika klik salah satu Table Row, keluarkan rincian list Outbound Internal Links (Anchor text apa mengarah kemana).

### 5.3 Keamanan/Security
- [ ] Saat dibuka menggunakan Production environment lokal (contoh via local build lalu ganti `NODE_ENV=production`), jika `ALLOW_INTERNAL_TOOLS` tidak didefinisikan (falsy), Route `/internal/*` HARUS `redirect` ke `/404` atau Return JSON Error kosong. Tidak boleh bocor ke Google!

---
*(Instruksi teknis ini bisa langsung Anda berikan kepada Developer System Anda untuk dieksekusi)*

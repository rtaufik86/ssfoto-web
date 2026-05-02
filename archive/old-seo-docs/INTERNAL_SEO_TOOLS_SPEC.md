# INSTRUKSI UNTUK DEVELOPER

## Pembuatan Tool Internal SEO: Internal Link Graph + Web Audit

**Project:** BBC Website
**Environment:** Hanya dapat diakses di localhost / environment internal, tidak boleh terindeks publik

---

## 1. TUJUAN UTAMA

Kita membutuhkan dua tool internal untuk membantu pengambilan keputusan SEO dan quality control website BBC:

### A. Internal Link Graph Tool

Tool ini digunakan untuk:

* memetakan hubungan internal link antar halaman
* melihat distribusi authority flow
* mendeteksi orphan pages
* mendeteksi halaman yang terlalu lemah atau terlalu sedikit menerima link
* membantu authority injection plan
* membantu audit page type system

### B. Web Audit Tool

Tool ini digunakan untuk:

* melihat kondisi SEO on-page setiap halaman
* mengecek title, meta description, heading structure, canonical, indexability
* melihat jumlah kata
* melihat jumlah internal links dan outbound links
* mendeteksi missing metadata
* mendeteksi halaman thin content atau halaman yang belum layak publish

Dua tool ini harus saling melengkapi:

* **Web Audit** = audit kualitas tiap halaman secara individual
* **Internal Link Graph** = audit struktur hubungan antar halaman secara sistemik

---

# 2. ATURAN UMUM IMPLEMENTASI

## 2.1 Access Control

Tool ini:

* **tidak boleh public**
* **tidak boleh masuk sitemap**
* **tidak boleh terindeks Google**
* **hanya bisa diakses di localhost** atau environment internal tertentu

### Minimum requirement:

* route hanya aktif jika:

  * `NODE_ENV=development`, atau
  * host adalah `localhost`, atau
  * ada whitelist internal env flag

Contoh route:

* `/internal/web-audit`
* `/internal/internal-links`

Jika production domain publik mengakses route ini, harus:

* return 404, atau
* diblok total

---

# 3. INTERNAL LINK GRAPH TOOL

## 3.1 Nama Halaman

Route yang diinginkan:
`/internal/internal-links`

## 3.2 Tujuan Fungsional

Tool harus membaca semua halaman indexable di website BBC dan membangun graph internal linking.

Tool harus bisa menjawab:

* halaman mana yang paling banyak menerima internal link
* halaman mana yang paling sedikit menerima internal link
* orphan pages mana saja
* halaman mana yang menjadi authority hub
* halaman mana yang terlalu lemah
* apakah money pages menerima cukup authority
* apakah SEO weapons mengalirkan authority ke hub/money page secara benar
* apakah ada link pattern yang salah secara strategis

---

## 3.3 Data yang Harus Ditampilkan

Untuk setiap URL, tampilkan minimal kolom berikut:

* URL
* Page title
* Page type

  * homepage
  * money page
  * hub page
  * weapon page
  * trust page
  * utility/system page
* Status code
* Indexability

  * index / noindex
* Canonical URL
* Total internal outlinks
* Total internal inlinks
* Total outbound links
* Total incoming unique pages
* Total outgoing unique pages
* Orphan status
* Click depth estimate from homepage
* Authority score
* Suggested action / notes

---

## 3.4 Visual Graph

Selain tabel, buat mode visual graph sederhana:

* node = halaman
* edge = internal link
* warna node dibedakan berdasarkan page type
* ukuran node mengikuti authority score atau jumlah inlinks
* homepage harus terlihat sebagai root node
* money pages harus terlihat jelas
* orphan pages harus disorot merah
* noindex pages diberi style berbeda

Tidak perlu terlalu artistik. Yang penting:

* cepat dibaca
* jelas
* berguna untuk audit

---

## 3.5 Filter yang Harus Ada

Tambahkan filter agar mudah dipakai:

* filter berdasarkan page type
* filter berdasarkan indexability
* filter berdasarkan orphan / non-orphan
* filter berdasarkan minimum inlinks
* filter berdasarkan slug search
* filter berdasarkan kategori

---

## 3.6 Authority Score Model

Tool harus punya **authority score internal**. Tidak perlu terlalu akademik, tetapi harus cukup berguna.

### Versi awal minimum:

Authority score dapat dihitung dari kombinasi:

* jumlah internal inlinks
* kualitas halaman yang memberi link
* posisi halaman dalam site hierarchy
* apakah link berasal dari homepage / header / footer / contextual body
* apakah halaman indexable
* apakah anchor text deskriptif

### Rekomendasi bobot awal:

Contoh logika sederhana:

* link dari homepage body / featured section = bobot tinggi
* link dari header/footer = bobot menengah
* link contextual dalam body content = bobot tinggi
* link dari halaman authority node = lebih besar daripada halaman lemah
* link dari noindex page = bobot rendah
* orphan page = score sangat rendah
* page receiving links from multiple unique relevant pages = score naik

Tidak perlu persis seperti PageRank akademik. Yang penting hasilnya membantu kita melihat:

* halaman kuat
* halaman lemah
* halaman yang perlu authority injection

---

## 3.7 Link Source Classification

Sangat penting: tool harus membedakan sumber link, minimal:

* header
* footer
* main content
* related content block
* CTA block
* breadcrumb
* sidebar (jika ada)

Ini penting karena link dari body content biasanya lebih bermakna daripada link navigasi.

---

## 3.8 Orphan Page Detection

Tool harus mendeteksi orphan pages, yaitu:

* halaman indexable
* tidak menerima internal link dari halaman indexable lain
* atau hanya bisa ditemukan dari sitemap/manual access

Harus ada daftar khusus:

* orphan indexable pages
* orphan noindex/system pages

Karena orphan page pada SEO pages adalah masalah serius.

---

## 3.9 Strategic Rules yang Harus Dicek

Tool perlu punya rule checks sederhana, misalnya:

* money pages harus menerima internal links dari banyak halaman relevan
* SEO weapon pages sebaiknya mengalirkan authority ke hub/money pages
* noindex pages tidak boleh menjadi authority sink utama
* important pages tidak boleh memiliki inlinks terlalu rendah
* halaman dengan intent komersial tinggi tidak boleh dead-end
* halaman trust/supporting boleh membantu distribusi authority

Tambahkan kolom “Flags” atau “Warnings” seperti:

* Low inlink count
* Orphan page
* No contextual inlinks
* Canonical mismatch
* Dead-end risk
* Overlinked to weak pages
* Important page under-supported

---

## 3.10 Export

Harus ada export:

* CSV
* JSON

Agar bisa dianalisis lebih lanjut di luar sistem.

---

# 4. WEB AUDIT TOOL

## 4.1 Nama Halaman

Route yang diinginkan:
`/internal/web-audit`

## 4.2 Tujuan Fungsional

Tool ini harus menjadi inventory audit halaman website dari sisi on-page SEO dan publishing readiness.

Tool harus bisa membantu menjawab:

* halaman mana yang belum punya meta title/description yang benar
* heading structure rusak atau kosong
* halaman mana yang terlalu tipis
* canonical salah atau kosong
* mana yang noindex
* mana yang belum punya cukup internal links
* mana yang secara SEO belum layak publish

---

## 4.3 Data yang Harus Ditampilkan per Halaman

Untuk setiap URL tampilkan:

* URL
* Status code
* Page type
* Indexability
* Canonical URL
* Meta title
* Meta title length
* Meta description
* Meta description length
* H1 count
* H2 count
* H3 count
* H1 text
* Word count
* Internal links count
* Outbound links count
* Images count
* Images without alt count
* Structured data detected or not
* Open Graph title present / not
* Open Graph description present / not
* Last modified (jika tersedia)
* Publish readiness score / SEO health score
* Warning flags

---

## 4.4 Audit Warnings yang Harus Dideteksi

Tambahkan flag otomatis seperti:

* Missing title
* Missing meta description
* Title too short
* Title too long
* Meta description too short
* Meta description too long
* Missing H1
* Multiple H1
* No H2
* Very low word count
* No internal links
* Too few internal links
* Too many outbound links
* Canonical missing
* Canonical mismatch
* Noindex page
* Image alt missing
* No structured data
* Thin content risk
* Duplicate title candidate
* Duplicate meta description candidate

---

## 4.5 Word Count Rules

Tool harus menghitung jumlah kata halaman.

Minimal tampilkan:

* total word count
* optional: main content word count only jika memungkinkan

Tujuannya bukan sekadar panjang konten, tetapi membantu mendeteksi:

* thin content
* halaman placeholder
* halaman yang belum selesai

---

## 4.6 Heading Structure Check

Tool harus membaca:

* H1
* H2
* H3

Dan mendeteksi masalah seperti:

* H1 tidak ada
* H1 lebih dari satu
* H2 kosong
* heading hierarchy aneh

Karena ini sebelumnya pernah menjadi sumber bug penting.

---

## 4.7 Metadata Readiness

Tool harus memudahkan audit meta secara bulk.

Idealnya ada tampilan tabel yang bisa di-sort berdasarkan:

* title length
* description length
* missing metadata
* word count
* internal link count

Ini penting supaya penulisan meta oleh Claude dan validasi manual bisa lebih cepat.

---

## 4.8 Search / Filter

Tambahkan filter:

* berdasarkan slug
* berdasarkan page type
* berdasarkan missing issues
* berdasarkan noindex/index
* berdasarkan word count minimum
* berdasarkan status code

---

## 4.9 Detail Drawer / Expand Row

Saat row diklik, tampilkan detail tambahan:

* full title
* full meta description
* H1/H2/H3 texts
* daftar internal links keluar
* daftar outbound links
* canonical
* structured data summary
* warnings explanation

---

## 4.10 Export

Harus bisa export:

* CSV
* JSON

---

# 5. SOURCE OF URLS

Tool harus membaca semua URL website dari sumber yang stabil.

Urutan preferensi:

1. route manifest / app routes / source of truth dari Next.js
2. sitemap generator
3. crawl internal site links
4. optional manual exclusions

Harus bisa membedakan:

* real SEO pages
* utility pages
* auth pages
* admin/internal pages
* system pages

Perlu ada konfigurasi untuk exclude:

* `/admin`
* `/login`
* `/signup`
* `/forgot-password`
* `/api/*`
* halaman system lain
  kecuali memang ingin ikut diaudit secara teknis

---

# 6. PAGE TYPE MAPPING

Sangat penting: tambahkan mekanisme mapping page type.

Minimal ada config file sederhana, misalnya:

* homepage
* money page
* hub page
* weapon page
* trust page
* utility/system

Mapping ini boleh hardcoded sementara dalam config.

Tujuannya:

* Internal Link Graph bisa membaca authority flow secara strategis
* Web Audit bisa lebih bermakna, karena standar audit tiap page type tidak selalu sama

Contoh:

* money pages butuh internal links kuat dan CTA jelas
* weapon pages fokus topical support
* trust pages membantu entity trust
* utility pages tidak perlu dianggap authority target

---

# 7. SCORING SYSTEM

## 7.1 Web Audit Score

Buat skor kesehatan sederhana 0–100 berdasarkan:

* metadata completeness
* heading structure
* word count
* internal linking presence
* canonical
* indexability
* image alt coverage

Tujuan:

* cepat melihat halaman bermasalah
* memprioritaskan perbaikan

## 7.2 Internal Link Score

Buat skor terpisah untuk kekuatan internal linking:

* inlinks
* contextual inlinks
* source diversity
* link from important nodes

---

# 8. UX REQUIREMENTS

Tool ini dibuat untuk keputusan cepat, jadi UI harus:

* tabel cepat dibaca
* sortable
* searchable
* filterable
* tidak berat
* bisa dipakai untuk audit bulk

Tidak perlu desain mewah. Yang penting:

* efisien
* informatif
* stabil

---

# 9. OUTPUT YANG KITA HARAPKAN

## Dari Internal Link Graph

Kita harus bisa langsung melihat:

* orphan pages
* halaman authority kuat
* halaman lemah
* money pages yang kurang didukung
* distribusi authority antar cluster
* halaman yang perlu injection link

## Dari Web Audit

Kita harus bisa langsung melihat:

* halaman yang belum layak publish
* meta dan heading yang rusak
* thin content
* canonical/indexing issues
* halaman yang perlu diperbaiki dulu sebelum publish atau submit sitemap

---

# 10. IMPLEMENTATION PRIORITY

## Phase 1 — MVP

Buat dulu versi yang menampilkan:

### Internal Link Graph

* URL
* page type
* internal inlinks
* internal outlinks
* orphan status
* authority score sederhana
* visual graph basic

### Web Audit

* URL
* title
* meta description
* H1/H2/H3 count
* word count
* internal links
* outbound links
* canonical
* indexability
* warning flags

## Phase 2 — Improvement

Tambahkan:

* source classification of links
* advanced scoring
* duplicate detection
* structured data detection
* image alt audit
* click depth
* export improvement
* richer graph visualization

---

# 11. CATATAN PENTING

1. Tool ini **bukan** sekadar crawler report.
   Tool ini harus membantu keputusan SEO strategis.

2. Tool ini harus membaca website sesuai real rendered output sebisa mungkin, bukan hanya file route mentah.

3. Kita butuh fondasi untuk:

* internal linking execution
* authority injection planning
* pre-publish QA
* bulk content audit
* page type enforcement

---

# 12. DELIVERABLE YANG DIMINTA DARI DEVELOPER

Developer diminta mengirim:

1. route tool:

* `/internal/web-audit`
* `/internal/internal-links`

2. akses hanya localhost/internal

3. tabel audit berfungsi penuh

4. graph visual basic berfungsi

5. export CSV/JSON

6. config file untuk page type mapping

7. dokumentasi singkat:

* bagaimana source URL dibaca
* bagaimana authority score dihitung
* bagaimana page type mapping diatur
* bagaimana menambah pengecualian routes

---

Jika Anda ingin, saya bisa lanjutkan satu tahap lagi dan ubah ini menjadi **technical specification yang lebih ketat** untuk developer, lengkap dengan:

* struktur folder
* source files yang perlu dibuat
* type definitions
* pseudo logic authority score
* acceptance criteria QA per fitur.

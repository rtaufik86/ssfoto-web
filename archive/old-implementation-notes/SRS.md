# Software Requirements Specification (SRS)
# SS Foto Web Platform

**Versi:** 1.0
**Tanggal:** 11 Februari 2026
**Status:** Draft

---

## 1. Pendahuluan

### 1.1 Tujuan
Dokumen ini menjelaskan spesifikasi kebutuhan perangkat lunak (SRS) untuk platform **SS Foto Web**. Platform ini bertujuan untuk mentransformasi bisnis SS Foto dari layanan konvensional menjadi model **O2O (Online-to-Offline)** yang modern, memungkinkan pelanggan memesan layanan cetak foto, pas foto, dan produk kustom secara online dengan integrasi ke cabang fisik.

### 1.2 Lingkup Masalah
SS Foto memiliki 5 cabang fisik namun belum memiliki kehadiran digital yang terintegrasi. Pelanggan saat ini harus datang ke toko untuk memesan. Aplikasi ini akan menangani:
- Pemesanan layanan "Pas Foto Kilat" secara online.
- Katalog produk (Cetak Foto, Canvas, Photobook).
- Integrasi data penjualan dan inventaris dengan sistem POS (DealPOS).
- Manajemen order terpusat admin dashboard.

### 1.3 Definisi dan Singkatan
- **O2O (Online-to-Offline):** Model bisnis yang menarik pelanggan dari saluran online ke toko fisik.
- **RLS (Row Level Security):** Fitur keamanan database PostgreSQL untuk membatasi akses data per baris.
- **Supabase:** Backend-as-a-Service yang digunakan untuk Database, Auth, dan Storage.
- **DealPOS:** Sistem Point of Sales yang digunakan di toko fisik.
- **MVP (Minimum Viable Product):** Versi produk dengan fitur dasar yang cukup untuk digunakan pengguna awal.

---

## 2. Deskripsi Keseluruhan

### 2.1 Perspektif Produk
Sistem ini adalah aplikasi web berbasis **Next.js** yang berjalan secara independen namun terhubung dengan ekosistem eksternal:
- **Supabase:** Menyimpan data pengguna, pesanan, dan file foto.
- **DealPOS API:** Sinkronisasi produk dan data penjualan (omset).
- **WhatsApp Gateway:** Notifikasi dan konfirmasi pesanan ke pelanggan/toko.

### 2.2 Fungsi Utama Produk
1.  **Pas Foto Express:** Upload foto selfie, pemilihan spesifikasi (ukuran/background), dan pemesanan instan.
2.  **Katalog Produk:** Menampilkan layanan cetak foto, canvas, dan frame.
3.  **Store Locator:** Informasi lokasi 5 cabang SS Foto.
4.  **Admin Dashboard:**
    - Monitoring penjualan harian.
    - Sinkronisasi data DealPOS.
    - Manajemen status pesanan.

### 2.3 Karakteristik Pengguna
- **Pelanggan (Guest/Terdaftar):** Umum, semua umur, membutuhkan kemudahan upload dan pemesanan cepat via HP.
- **Staff Toko:** Memproses pesanan yang masuk, memverifikasi pembayaran.
- **Administrator:** Memantau performa bisnis, mengelola katalog dan harga.

### 2.4 Lingkungan Operasi
- **Frontend:** Browser modern (Chrome, Safari, Firefox, Edge) pada Desktop dan Mobile (Responsive).
- **Backend:** Serverless Functions (Next.js API Routes).
- **Database:** PostgreSQL (Supabase).

---

## 3. Kebutuhan Sistem (Functional Requirements)

### 3.1 Fitur Pas Foto Order
- **FR-01 Upload Foto:** Sistem harus mengizinkan pengguna mengunggah file gambar (JPG/PNG/WEBP) dengan validasi ukuran maks 25MB.
- **FR-02 Spesifikasi Foto:** Sistem menyediakan opsi pemilihan background (Merah, Biru, Putih), ukuran cetak (2x3, 3x4, 4x6), dan jumlah cetak.
- **FR-03 Kalkulasi Harga:** Sistem harus menghitung total harga secara *real-time* berdasarkan varian dan diskon kuantitas.
- **FR-04 Pemilihan Cabang:** Pengguna wajib memilih salah satu dari 5 cabang pengambilan.
- **FR-05 Guest Checkout:** Pengguna dapat memesan tanpa login, hanya dengan Nama dan WhatsApp.
- **FR-06 Integrasi WhatsApp:** Setelah submit, sistem mengarahkan pengguna ke WhatsApp dengan pesan pre-filled berisi detail order.

### 3.2 Manajemen Order & Database
- **FR-07 Penyimpanan Aman:** File foto yang diunggah harus disimpan di *Private Bucket* dan hanya dapat diakses melalui *Signed URL*.
- **FR-08 Pencatatan Transaksi:** Setiap pesanan harus tercatat di tabel `orders` dengan status awal 'pending'.
- **FR-09 Kode Unik:** Sistem harus men-generate Nomor Order unik (cth: `PF-20241201-001`).

### 3.3 Integrasi DealPOS (Backend)
- **FR-10 Sync Outlet:** Sistem mampu mengambil data outlet aktif dari DealPOS API.
- **FR-11 Sync Order:** Sistem mencatat ringkasan order dari DealPOS untuk keperluan reporting di dashboard.
- **FR-12 Webhook (Opsional):** Menerima update status inventaris/order dari DealPOS.

### 3.4 Keamanan & Akses Data
- **FR-13 Row Level Security (RLS):** Tabel `orders` tidak boleh dapat diakses publik (SELECT/INSERT) secara langsung dari client-side, harus melalui API yang aman (Service Role).
- **FR-14 Validasi Input:** Semua input form harus divalidasi di sisi client dan server (Zod schema).
- **FR-15 Rate Limiting:** API upload harus memiliki pembatasan jumlah request per IP untuk mencegah spam.

---

## 4. Kebutuhan Antarmuka Eksternal

### 4.1 Antarmuka Pengguna (UI)
- Desain responsif (Mobile-First) menggunakan **Tailwind CSS**.
- Mengikuti *Design System* brand SS Foto (Warna Merah/Putih, Font Inter).
- Feedback visual instan (loading state, error message, success alert).

### 4.2 Antarmuka Perangkat Lunak (API)
- **Supabase API:** Menggunakan `supabase-js` client untuk interaksi database dan auth.
- **Supabase Storage API:** Untuk manajemen upload file.
- **DealPOS API:** REST API untuk pertukaran data bisnis.

---

## 5. Kebutuhan Non-Fungsional

### 5.1 Performa
- Halaman utama harus dimuat dalam waktu < 1.5 detik (First Contentful Paint).
- Proses upload foto hingga respons server maksimal 5 detik pada koneksi 4G standar.

### 5.2 Keamanan
- **Data Privacy:** Foto pelanggan bersifat privat dan harus dihapus otomatis setelah periode tertentu (retensi data).
- **Secure Communication:** Seluruh komunikasi data wajib menggunakan HTTPS/TLS.
- **API Key Management:** Service Role Key tidak boleh terekspos di client-side bundle.

### 5.3 Ketersediaan (Availability)
- Sistem dirancang untuk uptime 99.9% memanfaatkan infrastruktur Vercel dan Supabase.

---

## 6. Model Data (Ringkasan Skema)

### 6.1 Entitas Utama
1.  **User/Profiles:** Menyimpan data pengguna terdaftar (Opsional untuk fase MVP).
2.  **Orders:** Menyimpan transaksi pemesanan (Pas Foto, Cetak, dll).
    - `id`, `order_number`, `customer_name`, `status`, `total_amount`.
3.  **Uploaded Files:** Metadata file yang diunggah pengguna.
4.  **Products:** Katalog layanan dan harga.
5.  **Stores:** Data lokasi cabang (Static/Database).
6.  **Dealpos Orders:** Tabel sinkronisasi data dari sistem POS eksternal.

---

## 7. Roadmap Pengembangan

1.  **Fase 1 (MVP):** Pas Foto Order (Guest), Landing Page, Store Locator.
2.  **Fase 2:** Integrasi Payment Gateway (Midtrans), Login User.
3.  **Fase 3:** Dashboard Admin komprehensif, Order Tracking Real-time.

# 🚀 Panduan Deploy SS Foto ke Vercel (Domain ssfoto.co.id)

Panduan ini akan membantu Anda mempublish aplikasi `ssfoto-web` ke Vercel dan menghubungkannya dengan domain `ssfoto.co.id`.

## 📋 Langkah 1: Push Code ke GitHub

Karena folder ini baru saja diinisialisasi git-nya, Anda perlu menguploadnya ke GitHub agar Vercel bisa mengaksesnya.

1.  Buka [GitHub.com](https://github.com) dan buat **Repository Baru** (nama bebas, misal: `ssfoto-web`).
2.  Jangan centang "Add README" atau "Add .gitignore".
3.  Setelah repo dibuat, copy URL repository (misal: `https://github.com/username/ssfoto-web.git`).
4.  Buka terminal di folder project ini dan jalankan perintah:

```bash
git remote add origin https://github.com/USERNAME_ANDA/ssfoto-web.git
git branch -M main
git push -u origin main
```
*(Ganti URL dengan URL repository Anda)*

## ▲ Langkah 2: Deploy di Vercel

1.  Buka [Vercel Dashboard](https://vercel.com/dashboard).
2.  Klik **"Add New..."** > **"Project"**.
3.  Pilih repository `ssfoto-web` yang baru saja Anda upload (Impor dari GitHub).
4.  Di halaman **Configure Project**:
    *   **Framework Preset**: Next.js (biasanya otomatis terdeteksi).
    *   **Root Directory**: `./` (biarkan default).
    *   **Environment Variables**: Masukkan variabel dari `.env.local` Anda:
        *   `NEXT_PUBLIC_SUPABASE_URL`: (Copy dari file .env.local Anda)
        *   `NEXT_PUBLIC_SUPABASE_ANON_KEY`: (Copy dari file .env.local Anda)
        *   *(Tambahkan variabel lain jika ada)*
5.  Klik **Deploy**. Tunggu hingga proses selesai (biasanya 1-2 menit).

## 🌐 Langkah 3: Koneksi Domain (ssfoto.co.id)

Setelah deployment berhasil:

1.  Masuk ke dashboard project Vercel Anda.
2.  Pergi ke **Settings** > **Domains**.
3.  Masukkan domain `ssfoto.co.id` di kolom input lalu klik **Add**.
4.  Vercel akan memberikan **DNS Records** yang perlu Anda setting. Biasanya ada dua pilihan:
    *   **A Record** (Recommended untuk root domain):
        *   Type: `A`
        *   Name: `@`
        *   Value: `76.76.21.21` (IP Vercel)
    *   **CNAME Record** (Untuk `www`):
        *   Type: `CNAME`
        *   Name: `www`
        *   Value: `cname.vercel-dns.com`

## ⚙️ Langkah 4: Konfigurasi DNS di Penyedia Domain

1.  Login ke tempat Anda membeli domain `ssfoto.co.id` (misal: IDCloudHost, Niagahoster, RumahWeb, dll).
2.  Cari menu **DNS Management** atau **Name Server**.
3.  Tambahkan/Edit record sesuai instruksi Vercel di atas (A Record dan CNAME).
4.  Simpan perubahan. Propagasi DNS bisa memakan waktu 1 jam hingga 24 jam (biasanya lebih cepat).

## ✅ Selesai!

Setelah DNS terpropagasi, website Anda akan bisa diakses di `https://ssfoto.co.id`. Vercel otomatis akan mengurus sertifikat SSL (HTTPS) untuk Anda.

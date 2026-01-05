# Supabase Keep-Alive Cron Job

## Masalah
Supabase database pada paket gratis (Free Tier) akan otomatis **pause/mati** jika tidak ada aktivitas selama **7 hari**. Ini menyebabkan website tidak bisa mengakses database sampai database di-resume secara manual.

## Solusi
Implementasi cron job yang berjalan setiap **6 hari** untuk memastikan ada aktivitas database secara rutin, sehingga database tidak pernah mati.

---

## Implementasi

### 1. API Endpoint
**Path:** `/api/cron/keep-alive`

**File:** `src/app/api/cron/keep-alive/route.ts`

Endpoint ini melakukan:
- Koneksi ke Supabase
- Query sederhana ke tabel `canvas_orders` atau `pas_foto_orders`
- Return JSON dengan status sukses/gagal

### 2. Vercel Cron Configuration
**File:** `vercel.json`

```json
{
  "crons": [
    {
      "path": "/api/cron/keep-alive",
      "schedule": "0 0 */6 * *"
    }
  ]
}
```

**Schedule Breakdown:**
- `0` - Menit ke-0
- `0` - Jam ke-0 (midnight)
- `*/6` - Setiap 6 hari
- `*` - Setiap bulan
- `*` - Setiap hari dalam seminggu

Artinya: Berjalan setiap **6 hari sekali pada tengah malam UTC**.

---

## Testing

### Test Manual (Lokal)
```bash
# Jalankan dev server
npm run dev

# Buka browser atau gunakan curl
curl http://localhost:3000/api/cron/keep-alive
```

### Expected Response (Success)
```json
{
  "success": true,
  "message": "Supabase database keep-alive ping successful",
  "timestamp": "2026-01-05T07:00:00.000Z",
  "details": {
    "tableQueried": "canvas_orders",
    "rowCount": 10
  }
}
```

---

## Keamanan (Opsional)

Untuk keamanan tambahan, Anda bisa menambahkan environment variable `CRON_SECRET`:

### 1. Tambahkan di Vercel Dashboard
```
CRON_SECRET=your-random-secret-string
```

### 2. Endpoint akan memvalidasi header
Vercel secara otomatis mengirim header authorization dengan token ini saat menjalankan cron job.

---

## Monitoring

### Melihat Log Cron di Vercel
1. Buka [Vercel Dashboard](https://vercel.com)
2. Pilih project `ssfoto-web`
3. Buka tab **Functions** → **Cron**
4. Lihat execution history dan logs

### Cek Status Manual
Anda bisa mengecek endpoint kapan saja:
```
https://ssfoto.id/api/cron/keep-alive
```

atau domain Vercel:
```
https://ssfoto-web.vercel.app/api/cron/keep-alive
```

---

## Catatan Penting

1. **Vercel Cron hanya tersedia di paket Hobby (gratis) dengan batasan:**
   - Maksimal 2 cron jobs
   - Berjalan di Edge Network

2. **Jika database masih mati:**
   - Cek Vercel logs apakah cron berjalan
   - Cek Supabase dashboard untuk error
   - Resume database secara manual dari Supabase dashboard

3. **Alternative schedule:**
   - Setiap 5 hari: `0 0 */5 * *`
   - Setiap hari: `0 0 * * *`
   - Setiap 12 jam: `0 */12 * * *`

---

## Deployment

Setelah push ke GitHub, Vercel akan:
1. Build ulang aplikasi
2. Membaca `vercel.json`
3. Mendaftarkan cron job otomatis
4. Mulai menjalankan sesuai schedule

Tidak perlu konfigurasi tambahan di Vercel Dashboard.

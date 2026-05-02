# Pas Foto Order Flow - WhatsApp Redirect Update

## Ringkasan Perubahan

Update flow pemesanan Pas Foto agar pesanan dikirim ke nomor WhatsApp cabang yang sesuai, bukan ke satu nomor pusat.

---

## Perubahan Utama

### 1. **Mapping Nomor WhatsApp per Cabang**

Setiap cabang sekarang memiliki nomor WhatsApp sendiri:

| Cabang | Nomor WhatsApp |
|--------|----------------|
| Rawamangun - Jakarta Timur | 6281936444486 |
| Pondok Pinang - Jakarta Selatan | 6285772072012 |
| Bogor | 6285772072013 |
| Galaxy - Bekasi | 6285772072011 |
| Jatiwaringin - Bekasi | 6285772072010 |

### 2. **Flow untuk "Ambil di Cabang"**

**Sebelum:**
- User pilih cabang
- Pesanan dikirim ke nomor pusat (6281936444486)

**Sesudah:**
- User pilih cabang
- Pesanan **langsung dikirim ke nomor WhatsApp cabang tersebut**
- Template pesan mencantumkan cabang pengambilan

### 3. **Flow untuk "Kirim dengan GoSend"**

**Sebelum:**
- User isi alamat pengiriman
- Pesanan dikirim ke nomor pusat

**Sesudah:**
- User **pilih cabang pengirim** (dropdown baru)
- User isi alamat pengiriman
- Pesanan **dikirim ke nomor WhatsApp cabang pengirim**
- Template pesan mencantumkan:
  - Cabang pengirim
  - Alamat tujuan pengiriman

---

## File yang Diubah

### 1. `src/app/upload/pas-foto/page.tsx`

**Perubahan:**

#### a. Tambah Mapping WhatsApp di BRANCH_OPTIONS
```tsx
const BRANCH_OPTIONS = [
  { 
    id: 'rawamangun', 
    label: 'Rawamangun - Jakarta Timur',
    whatsapp: '6281936444486'
  },
  { 
    id: 'pondok-pinang', 
    label: 'Pondok Pinang - Jakarta Selatan',
    whatsapp: '6285772072012'
  },
  // ... dst
];
```

#### b. Tambah State untuk Cabang Pengirim GoSend
```tsx
const [gosendSenderBranch, setGosendSenderBranch] = useState<string>('');
```

#### c. Tambah Validasi Cabang Pengirim
```tsx
if (deliveryMethod === 'gosend' && !gosendSenderBranch) {
  alert("Silakan pilih cabang pengirim untuk GoSend");
  return;
}
```

#### d. Update Logika WhatsApp Redirect
```tsx
// Tentukan cabang target berdasarkan metode pengiriman
const targetBranchId = deliveryMethod === 'pickup' ? pickupBranch : gosendSenderBranch;
const targetBranch = BRANCH_OPTIONS.find(b => b.id === targetBranchId);

// Gunakan nomor WhatsApp cabang
const whatsappNumber = targetBranch?.whatsapp || "6281936444486";
```

#### e. Update Template Pesan WhatsApp
```tsx
const deliveryInfo = deliveryMethod === 'pickup'
  ? `🏪 *PENGAMBILAN:*\n• Ambil di Cabang: ${BRANCH_OPTIONS.find(b => b.id === pickupBranch)?.label}`
  : `🚚 *PENGIRIMAN:*\n• Dikirim dari: ${BRANCH_OPTIONS.find(b => b.id === gosendSenderBranch)?.label}\n• GoSend ke:\n${deliveryAddress}`;
```

#### f. Tambah UI Pilihan Cabang Pengirim (GoSend)
```tsx
{deliveryMethod === 'gosend' && (
  <div className="space-y-4">
    {/* Sender Branch Selection */}
    <div>
      <label>Dikirim dari Cabang <span className="text-red-500">*</span></label>
      <select
        value={gosendSenderBranch}
        onChange={(e) => setGosendSenderBranch(e.target.value)}
      >
        <option value="">-- Pilih Cabang Pengirim --</option>
        {BRANCH_OPTIONS.map((branch) => (
          <option key={branch.id} value={branch.id}>
            {branch.label}
          </option>
        ))}
      </select>
      <p className="text-xs text-gray-500 mt-1">
        Pilih cabang terdekat untuk meminimalkan biaya GoSend
      </p>
    </div>

    {/* Address Input */}
    <div>
      <label>Alamat Pengiriman Lengkap</label>
      <textarea value={deliveryAddress} ... />
    </div>
  </div>
)}
```

### 2. `src/app/lokasi/page.tsx`

**Perubahan:**
- Update nomor telepon untuk semua cabang di halaman lokasi
- Nomor yang ditampilkan dan link WhatsApp sekarang menggunakan nomor yang benar

---

## User Experience Flow

### Skenario 1: Ambil di Cabang

1. User upload foto
2. User pilih spesifikasi (background, ukuran, jumlah)
3. User isi data diri (nama, WhatsApp)
4. User pilih "Ambil di Cabang"
5. User pilih cabang (misal: **Bogor**)
6. Klik "Kirim Pesanan"
7. ✅ **Redirect ke WhatsApp cabang Bogor (6285772072013)**
8. Template pesan sudah terisi dengan info cabang pengambilan

### Skenario 2: Kirim dengan GoSend

1. User upload foto
2. User pilih spesifikasi
3. User isi data diri
4. User pilih "Kirim dengan GoSend"
5. User pilih **cabang pengirim** (misal: **Rawamangun**)
6. User isi alamat pengiriman lengkap
7. Klik "Kirim Pesanan"
8. ✅ **Redirect ke WhatsApp cabang Rawamangun (6281936444486)**
9. Template pesan mencantumkan:
   - Cabang pengirim: Rawamangun
   - Alamat tujuan

---

## Testing Checklist

- [x] Build berhasil tanpa error
- [ ] Test pickup flow - pilih cabang Rawamangun → redirect ke 6281936444486
- [ ] Test pickup flow - pilih cabang Pondok Pinang → redirect ke 6285772072012
- [ ] Test pickup flow - pilih cabang Bogor → redirect ke 6285772072013
- [ ] Test pickup flow - pilih cabang Galaxy → redirect ke 6285772072011
- [ ] Test pickup flow - pilih cabang Jatiwaringin → redirect ke 6285772072010
- [ ] Test GoSend flow - pilih cabang pengirim → redirect ke nomor yang sesuai
- [ ] Validasi error jika cabang belum dipilih
- [ ] Template pesan WhatsApp menampilkan info yang benar

---

## Deployment

Setelah testing lokal berhasil:

```bash
git add .
git commit -m "feat: redirect pas foto orders to branch-specific WhatsApp numbers"
git push
```

Vercel akan otomatis deploy perubahan.

---

## Catatan Penting

1. **Nomor WhatsApp harus dalam format internasional** (tanpa +): `6281936444486`
2. **Fallback number** tetap ada jika terjadi error: `6281936444486` (Rawamangun)
3. **Halaman lokasi** juga sudah diupdate dengan nomor yang benar
4. **Cronjob Supabase** sudah dibuat (lihat `SUPABASE_KEEPALIVE_CRON.md`)

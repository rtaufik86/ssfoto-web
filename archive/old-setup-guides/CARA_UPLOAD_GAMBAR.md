# 📸 Cara Upload Gambar ke Project SS Foto

## 🎯 **OVERVIEW**

Panduan lengkap untuk upload gambar (logo, foto produk, dll) ke project Next.js SS Foto.

---

## 📁 **STRUKTUR FOLDER**

```
ssfoto-web/
├── public/              ← Folder untuk file static
│   ├── logo/           ← Logo SS Foto
│   │   └── ssfoto-logo.png
│   ├── images/         ← Gambar produk, hero, dll
│   │   ├── products/
│   │   ├── hero/
│   │   └── gallery/
│   └── favicon.ico
└── src/
    └── ...
```

---

## 🖼️ **CARA UPLOAD GAMBAR**

### **METHOD 1: Via File Explorer (Windows)** ⭐ **PALING MUDAH**

1. **Buka File Explorer**
   - Tekan `Windows + E`
   - Navigate ke: `C:\Users\Worknew\Documents\Saas\ssfoto-web`

2. **Masuk ke Folder `public`**
   ```
   ssfoto-web → public
   ```

3. **Buat Folder (jika belum ada)**
   - Klik kanan → New → Folder
   - Nama: `logo` (untuk logo) atau `images` (untuk gambar lain)

4. **Copy-Paste File**
   - Copy file gambar dari lokasi asal
   - Paste ke folder `public/logo/` atau `public/images/`

5. **Rename File (jika perlu)**
   - Klik kanan → Rename
   - Contoh: `ssfoto-logo.png`

---

### **METHOD 2: Via VS Code / Cursor**

1. **Buka Project di Cursor**
   - File sudah terbuka: `ssfoto-web`

2. **Buka Sidebar Explorer**
   - Klik icon folder di sidebar kiri
   - Atau tekan `Ctrl + Shift + E`

3. **Navigasi ke Folder `public`**
   ```
   📁 ssfoto-web
     📁 public
       📁 logo  ← Klik kanan di sini
   ```

4. **Reveal in File Explorer**
   - Klik kanan folder `logo`
   - Pilih: **"Reveal in File Explorer"**
   - File Explorer akan terbuka

5. **Copy-Paste File**
   - Drag & drop file ke folder yang terbuka
   - Atau copy-paste seperti biasa

---

### **METHOD 3: Drag & Drop Langsung**

1. **Buka Folder di File Explorer**
   ```
   C:\Users\Worknew\Documents\Saas\ssfoto-web\public\logo
   ```

2. **Drag File dari Lokasi Asal**
   - Buka folder asal file
   - Drag file ke folder `public/logo/`

3. **Drop File**
   - Release mouse button
   - File akan ter-copy otomatis

---

## 📋 **LOGO SETUP (SPECIFIC)**

### **File Requirements:**

- **Nama File:** `ssfoto-logo.png` (atau `.jpg`, `.svg`)
- **Lokasi:** `public/logo/ssfoto-logo.png`
- **Format:** PNG (recommended), JPG, atau SVG
- **Ukuran:** 
  - Minimum: 280x80px
  - Recommended: 560x160px
  - Aspect Ratio: ~3.5:1

### **Step-by-Step:**

1. **Siapkan File Logo**
   - Pastikan file sudah di-optimize
   - Format: PNG dengan transparent background (recommended)

2. **Buat Folder (jika belum ada)**
   ```bash
   # Via Command Prompt
   mkdir public\logo
   ```

3. **Copy File ke Folder**
   ```
   public/logo/ssfoto-logo.png
   ```

4. **Verify File**
   - Cek file size (tidak terlalu besar)
   - Cek format (PNG/JPG/SVG)
   - Cek nama file (exact match: `ssfoto-logo.png`)

---

## 🖼️ **GAMBAR LAIN (PRODUCTS, HERO, DLL)**

### **Struktur Folder:**

```
public/
├── images/
│   ├── products/        ← Foto produk
│   │   ├── pas-foto-1.jpg
│   │   ├── canvas-1.jpg
│   │   └── studio-1.jpg
│   ├── hero/            ← Hero images
│   │   └── hero-main.jpg
│   ├── gallery/         ← Gallery images
│   │   └── ...
│   └── og/              ← Open Graph images
│       └── og-image.jpg
```

### **Cara Upload:**

1. **Buat Folder Sesuai Kategori**
   ```
   public/images/products/
   ```

2. **Upload File**
   - Copy-paste atau drag & drop
   - Nama file: descriptive (contoh: `pas-foto-merah.jpg`)

3. **Gunakan di Code**
   ```tsx
   <Image
     src="/images/products/pas-foto-merah.jpg"
     alt="Pas Foto Background Merah"
     width={800}
     height={600}
   />
   ```

---

## ✅ **VERIFICATION**

### **After Upload:**

1. **Check File Exists**
   ```
   public/logo/ssfoto-logo.png  ← File harus ada di sini
   ```

2. **Check File Name**
   - Exact match (case-sensitive)
   - No spaces (gunakan `-` atau `_`)
   - Extension correct (`.png`, `.jpg`, `.svg`)

3. **Restart Dev Server**
   ```bash
   # Stop server (Ctrl + C)
   npm run dev
   ```

4. **Check Browser**
   - Logo muncul di Header
   - Logo muncul di Footer
   - No 404 errors di console

---

## 🐛 **TROUBLESHOOTING**

### **Error: "Cannot find module '/logo/ssfoto-logo.png'"**

**Causes:**
- File tidak ada di folder yang benar
- Nama file tidak match
- File belum di-save

**Solutions:**
1. Check file path: `public/logo/ssfoto-logo.png`
2. Verify file name (case-sensitive)
3. Restart dev server
4. Clear Next.js cache: `rm -rf .next` (Linux/Mac) atau delete `.next` folder (Windows)

---

### **Logo Not Showing**

**Causes:**
- File path salah
- File format tidak didukung
- File corrupted

**Solutions:**
1. Check browser console (F12) untuk error
2. Verify file format (PNG, JPG, SVG)
3. Try different file format
4. Check file size (tidak terlalu besar)

---

### **Logo Too Small/Large**

**Solutions:**
1. Update `width` dan `height` di component
2. Adjust `className` untuk sizing
3. Use larger source image

**Example:**
```tsx
// Larger logo
<Image
  src="/logo/ssfoto-logo.png"
  width={200}  // ← Increase
  height={60}  // ← Increase
  className="h-12 lg:h-16"  // ← Adjust
/>
```

---

## 📝 **BEST PRACTICES**

1. **Optimize Images**
   - Compress sebelum upload
   - Use WebP untuk better performance
   - Resize ke ukuran yang diperlukan

2. **Naming Convention**
   - Use lowercase
   - Use `-` instead of spaces
   - Descriptive names
   - Example: `pas-foto-merah.jpg` ✅
   - Not: `Pas Foto Merah.jpg` ❌

3. **File Organization**
   - Group by category (products, hero, gallery)
   - Use subfolders untuk organization
   - Keep file names consistent

4. **Performance**
   - Use Next.js Image component (automatic optimization)
   - Add `priority` prop untuk above-the-fold images
   - Use appropriate sizes (tidak terlalu besar)

---

## 🎯 **QUICK REFERENCE**

### **Logo:**
```
File: public/logo/ssfoto-logo.png
Usage: <Image src="/logo/ssfoto-logo.png" />
```

### **Product Images:**
```
File: public/images/products/product-name.jpg
Usage: <Image src="/images/products/product-name.jpg" />
```

### **Hero Images:**
```
File: public/images/hero/hero-main.jpg
Usage: <Image src="/images/hero/hero-main.jpg" />
```

---

## 📞 **NEED HELP?**

Jika masih ada masalah:
1. Check file path (exact match)
2. Check file format (supported formats)
3. Restart dev server
4. Clear browser cache
5. Check console untuk error messages

---

**Setelah upload, gambar akan otomatis tersedia di website! 🎨**


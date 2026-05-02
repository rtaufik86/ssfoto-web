# 🎨 Logo SSFOTO Setup Instructions

## 📋 Overview

Logo SSFOTO perlu ditambahkan ke folder `public/logo/` untuk digunakan di Header dan Footer.

---

## 📁 **FOLDER STRUCTURE:**

```
public/
└── logo/
    └── ssfoto-logo.png  (atau .jpg, .svg)
```

---

## 🖼️ **LOGO SPECIFICATIONS:**

### **File Requirements:**
- **Format:** PNG (recommended), JPG, atau SVG
- **Background:** Transparent (untuk PNG) atau sesuai kebutuhan
- **Dimensions:** 
  - Minimum: 280x80px (untuk retina display)
  - Recommended: 560x160px (untuk high-res)
  - Aspect Ratio: ~3.5:1 (width:height)

### **Logo Description:**
- Text: "SSFOTO" 
- Color: Red (#ea2423 atau sesuai brand)
- Style: Bold, italicized, dengan shadow effect
- Background: Black atau transparent

---

## 📝 **SETUP STEPS:**

### **Step 1: Create Folder Structure**

```bash
# Di root project
mkdir -p public/logo
```

### **Step 2: Add Logo File**

1. Copy logo file ke: `public/logo/ssfoto-logo.png`
2. Atau rename sesuai format yang diinginkan:
   - `ssfoto-logo.png`
   - `ssfoto-logo.jpg`
   - `ssfoto-logo.svg`

### **Step 3: Update Code (Already Done)**

✅ Header component sudah diupdate
✅ Footer component sudah diupdate
✅ Menggunakan Next.js Image component untuk optimization

### **Step 4: Verify**

1. Restart dev server:
   ```bash
   npm run dev
   ```

2. Check Header:
   - Logo muncul di top-left
   - Responsive (h-8 di mobile, h-10 di desktop)
   - Clickable (link ke homepage)

3. Check Footer:
   - Logo muncul di footer branding section
   - Proper sizing dan alignment

---

## 🎨 **CUSTOMIZATION:**

### **If Logo Path Different:**

Jika logo ada di path lain, update di:

**Header:**
```tsx
// src/components/layout/Header.tsx
<Image
  src="/your-custom-path/logo.png"  // ← Update ini
  alt="SS Foto Digital Lab"
  width={140}
  height={40}
  className="h-8 lg:h-10 w-auto object-contain"
  priority
/>
```

**Footer:**
```tsx
// src/components/layout/Footer.tsx
<Image
  src="/your-custom-path/logo.png"  // ← Update ini
  alt="SS Foto Digital Lab"
  width={160}
  height={45}
  className="h-10 w-auto object-contain"
  priority
/>
```

### **If Logo Size Different:**

Adjust `width` dan `height` props, serta `className` untuk sizing:

```tsx
// Example: Larger logo
<Image
  src="/logo/ssfoto-logo.png"
  alt="SS Foto Digital Lab"
  width={200}      // ← Adjust
  height={60}      // ← Adjust
  className="h-12 lg:h-14 w-auto object-contain"  // ← Adjust
  priority
/>
```

---

## ✅ **VERIFICATION CHECKLIST:**

- [ ] Folder `public/logo/` exists
- [ ] Logo file exists (`ssfoto-logo.png` atau format lain)
- [ ] Header shows logo correctly
- [ ] Footer shows logo correctly
- [ ] Logo is clickable (links to homepage)
- [ ] Logo is responsive (mobile & desktop)
- [ ] No console errors
- [ ] Logo loads fast (Next.js optimization)

---

## 🐛 **TROUBLESHOOTING:**

### **Error: "Cannot find module '/logo/ssfoto-logo.png'"**

**Solution:**
1. Check file exists: `public/logo/ssfoto-logo.png`
2. Check file name matches exactly (case-sensitive)
3. Restart dev server

### **Logo Not Showing:**

**Solution:**
1. Check browser console for errors
2. Verify file path is correct
3. Check file format is supported (PNG, JPG, SVG)
4. Ensure file is not corrupted

### **Logo Too Small/Large:**

**Solution:**
1. Adjust `width` and `height` props
2. Update `className` with custom height
3. Use `object-contain` to maintain aspect ratio

---

## 📱 **RESPONSIVE BEHAVIOR:**

### **Header:**
- **Mobile:** `h-8` (32px height)
- **Desktop:** `h-10` (40px height)
- Width: Auto (maintains aspect ratio)

### **Footer:**
- **All sizes:** `h-10` (40px height)
- Width: Auto (maintains aspect ratio)

---

## 🎯 **BEST PRACTICES:**

1. **Use PNG with transparent background** untuk flexibility
2. **Optimize image size** (compress jika perlu)
3. **Use SVG** jika logo adalah vector (scalable)
4. **Test on different screen sizes** untuk ensure responsiveness
5. **Use `priority` prop** untuk above-the-fold logo (faster loading)

---

**Setelah logo file ditambahkan ke `public/logo/ssfoto-logo.png`, logo akan otomatis muncul di Header dan Footer! 🎨**


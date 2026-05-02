# 📸 Pas Foto Order Feature - Implementation Guide

**Status:** ✅ Frontend Complete | ⏳ Backend Integration Pending  
**Priority:** HIGH (Cash Cow Product)  
**Route:** `/upload/pas-foto`

---

## 🎯 Feature Overview

**Purpose:** Enable customers to order passport photos (Pas Foto) online with express 1-hour service.

**Business Impact:**
- Most popular product (60%+ of daily revenue)
- High conversion (simple process)
- Low friction (no account required)
- Fast turnaround (competitive advantage)

---

## ✅ What's Built

### **Frontend Page:** `src/app/upload/pas-foto/page.tsx`

**Complete single-page form with 4 steps:**

#### Step 1: Upload Foto
- ✅ Drag & drop zone (react-dropzone)
- ✅ Mobile-friendly tap upload
- ✅ Image preview with remove button
- ✅ File validation (JPG/PNG, max 10MB)
- ✅ Error handling

#### Step 2: Pilih Spesifikasi
- ✅ **Background Color:** Red, Blue, White (with color swatches)
- ✅ **Print Size:** 2x3, 3x4, 4x6, Mix (touch-friendly buttons)
- ✅ **Quantity:** 4/8/12 pcs with discount badges (10%/15% off)
- ✅ Real-time price calculation

#### Step 3: Pilih Cabang
- ✅ 5 store locations (card layout)
- ✅ City labels for clarity
- ✅ Link to full locations page
- ✅ Active selection state

#### Step 4: Data Diri
- ✅ Name input with icon
- ✅ WhatsApp input with validation
- ✅ Error messages
- ✅ Clear instructions

#### Floating Bottom Bar
- ✅ Sticky total price display
- ✅ "Pesan Sekarang" CTA button
- ✅ Loading state during submit
- ✅ Mobile responsive

---

## 💰 Pricing Logic

Prices are automatically calculated based on selection:

| Size | 4 Lembar | 8 Lembar (10%) | 12 Lembar (15%) |
|------|----------|----------------|-----------------|
| 2x3  | Rp 30.000 | Rp 54.000 | Rp 75.000 |
| **3x4** | **Rp 35.000** | **Rp 63.000** | **Rp 87.500** |
| 4x6  | Rp 40.000 | Rp 72.000 | Rp 100.000 |
| Mix  | Rp 45.000 | Rp 81.000 | Rp 112.500 |

**Implemented in:** `src/types/pas-foto.ts` → `calculatePasFotoPrice()`

---

## 🔗 Navigation Updates

All CTA buttons across the site now link to the order page:

### Updated Links:
- ✅ Header "Unggah Foto" button → `/upload/pas-foto`
- ✅ Homepage hero "Cetak Pas Foto Kilat" → `/upload/pas-foto`
- ✅ How It Works section "Mulai Unggah" → `/upload/pas-foto`
- ✅ CTA section "Unggah Foto Sekarang" → `/upload/pas-foto`

---

## 📱 User Journey

```
1. User clicks "Cetak Pas Foto Kilat" (Homepage/Header)
   ↓
2. Lands on /upload/pas-foto
   ↓
3. Uploads selfie photo
   ↓
4. Selects: Background (Blue) + Size (3x4) + Quantity (8 pcs)
   ↓
5. Chooses pickup store (Rawamangun)
   ↓
6. Enters: Name + WhatsApp
   ↓
7. Clicks "Pesan Sekarang"
   ↓
8. System validates → Shows alert → Redirects to WhatsApp
   ↓
9. Customer sends pre-filled message to SS Foto
   ↓
10. Staff confirms & processes order
```

---

## 🧪 Current Behavior (Mock)

When user clicks "Pesan Sekarang":

1. **Validates form:**
   - Photo uploaded? ✅
   - Name filled? ✅
   - WhatsApp valid format? ✅

2. **Console logs data:**
   ```javascript
   {
     photo: "selfie.jpg",
     backgroundColor: "blue",
     printSize: "3x4",
     quantity: "8_pcs",
     branch: "rawamangun",
     customerName: "John Doe",
     customerWhatsApp: "081234567890",
     totalPrice: 63000
   }
   ```

3. **Shows alert:**
   ```
   ✅ Pesanan Diterima!
   Kami akan menghubungi Anda via WhatsApp untuk konfirmasi pembayaran.
   ```

4. **Redirects to WhatsApp:**
   ```
   https://wa.me/6281936444486?text=
   Halo SS Foto! Saya ingin pesan Pas Foto:
   
   📸 Foto: selfie.jpg
   🎨 Background: Biru
   📏 Ukuran: 3x4 cm
   📦 Paket: 8 Lembar
   📍 Ambil di: SS Foto Rawamangun
   💰 Total: Rp 63.000
   
   Nama: John Doe
   WhatsApp: 081234567890
   ```

---

## 🚀 Next Steps: Backend Integration

### Phase 1: File Upload to Supabase Storage

**Create:** `src/lib/supabase/storage.ts`

```typescript
export async function uploadPasFotoPhoto(file: File, userId?: string) {
  const fileName = `${Date.now()}-${file.name}`;
  const filePath = `pas-foto/${fileName}`;
  
  const { data, error } = await supabase.storage
    .from('order-files')
    .upload(filePath, file);
  
  if (error) throw error;
  
  // Get public URL
  const { data: urlData } = supabase.storage
    .from('order-files')
    .getPublicUrl(filePath);
  
  return urlData.publicUrl;
}
```

---

### Phase 2: Save Order to Database

**Create:** `src/app/api/pas-foto/route.ts`

```typescript
import { supabase } from '@/lib/supabase/client';

export async function POST(request: Request) {
  const body = await request.json();
  
  // Upload photo first
  const photoUrl = await uploadPasFotoPhoto(body.photo);
  
  // Generate order number
  const { data: orderNumber } = await supabase
    .rpc('generate_pas_foto_order_number');
  
  // Insert order
  const { data, error } = await supabase
    .from('pas_foto_orders')
    .insert({
      order_number: orderNumber,
      customer_name: body.customerName,
      customer_whatsapp: body.customerWhatsApp,
      photo_url: photoUrl,
      background_color: body.backgroundColor,
      print_size: body.printSize,
      quantity_package: body.quantity,
      branch_location: body.branch,
      total_price: body.totalPrice,
      status: 'pending',
    })
    .select()
    .single();
  
  if (error) throw error;
  
  return Response.json({ success: true, order: data });
}
```

---

### Phase 3: Order Tracking Page

**Create:** `src/app/cek-status/page.tsx`

Allow customers to track orders by:
- Order number (PF-20241201-001)
- WhatsApp number

Display:
- Order status
- Specifications
- Pickup location
- Estimated ready time

---

## 🎨 Design Features

### Mobile-First
- ✅ Large touch targets (48px+)
- ✅ Bottom sticky bar (easy thumb access)
- ✅ Single column layout
- ✅ Clear step indicators

### Visual Feedback
- ✅ Active states on all selections
- ✅ Checkmarks on selected items
- ✅ Color swatches for backgrounds
- ✅ Discount badges on packages
- ✅ Loading spinner on submit

### User Experience
- ✅ Real-time price updates
- ✅ Validation with clear error messages
- ✅ Image preview before submit
- ✅ Pre-filled WhatsApp message
- ✅ No page navigation (single page form)

---

## 📊 Conversion Optimization

### A/B Test Ideas:
1. **Price Display:**
   - Current: Show discount badges
   - Test: Show original price crossed out

2. **Upload CTA:**
   - Current: "Pesan Sekarang"
   - Test: "Pesan & Bayar Nanti"

3. **Store Selection:**
   - Current: Manual selection
   - Test: Auto-select nearest (with geolocation)

---

## 🧪 Testing Checklist

### Functional Tests
- [ ] Photo upload works (drag & drop)
- [ ] Photo upload works (tap/click)
- [ ] Photo preview displays correctly
- [ ] Remove photo works
- [ ] All spec selections update state
- [ ] Price calculates correctly
- [ ] Store selection works
- [ ] Form validation catches errors
- [ ] Submit button shows loading state
- [ ] WhatsApp redirect works with correct data

### Responsive Tests
- [ ] Works on mobile (375px)
- [ ] Works on tablet (768px)
- [ ] Works on desktop (1440px)
- [ ] Bottom bar doesn't cover content
- [ ] Touch targets are large enough

### Edge Cases
- [ ] Invalid phone number format
- [ ] Empty name field
- [ ] No photo uploaded
- [ ] File too large (>10MB)
- [ ] Wrong file type (PDF, etc)

---

## 📈 Success Metrics

### KPIs to Track:
- **Conversion Rate:** Form start → Submit
- **Drop-off Points:** Which step loses users?
- **Average Order Value:** Most selected package?
- **Popular Combinations:** Size + Quantity
- **Peak Hours:** When do orders come in?

### Analytics Events (PostHog):
```javascript
// Track form interactions
posthog.capture('pas_foto_started');
posthog.capture('pas_foto_photo_uploaded');
posthog.capture('pas_foto_specs_selected', { size, quantity });
posthog.capture('pas_foto_submitted', { totalPrice, branch });
```

---

## 🔐 Security Considerations

### Current (MVP):
- ✅ File type validation (client-side)
- ✅ File size limit (10MB)
- ✅ WhatsApp format validation

### Production Additions:
- [ ] Server-side file validation
- [ ] Image dimension check (min 600x800px)
- [ ] Malware scanning
- [ ] Rate limiting (prevent spam)
- [ ] CAPTCHA for bot prevention

---

## 💡 Future Enhancements

### Phase 2 Features:
1. **Photo Editor:**
   - Crop tool
   - Brightness adjustment
   - Background remover (AI)

2. **Multiple Photos:**
   - Upload different photos for same order
   - Bulk upload for families

3. **Quick Reorder:**
   - Save customer data
   - Reorder with one click

4. **Real-time Status:**
   - Push notifications
   - SMS updates
   - Live tracking

5. **Payment Integration:**
   - Direct payment (not just WhatsApp)
   - QRIS code generation
   - E-wallet options

---

## 🐛 Known Limitations (MVP)

1. **No actual file upload** - Currently mock (WhatsApp only)
2. **No payment processing** - Manual via WhatsApp
3. **No order tracking** - `/cek-status` not built yet
4. **No photo editing** - Raw upload only
5. **No account system** - Guest checkout only

---

## 🚀 How to Test

### Local Testing:

```bash
# 1. Ensure dev server is running
npm run dev

# 2. Navigate to:
http://localhost:3000/upload/pas-foto

# 3. Test flow:
- Upload a photo (any portrait photo)
- Select: Blue background
- Select: 3x4 size
- Select: 8 Lembar (should show Rp 63.000)
- Select: Rawamangun store
- Enter: Your name
- Enter: Your WhatsApp (format: 081234567890)
- Click: "Pesan Sekarang"

# 4. Expected result:
- Alert appears
- WhatsApp opens with pre-filled message
- Data logged in browser console
```

### Manual QA Checklist:

**Photo Upload:**
- [ ] Can drag & drop photo
- [ ] Can click to browse
- [ ] Preview shows correctly
- [ ] Can remove and re-upload
- [ ] Error shows if submitting without photo

**Specifications:**
- [ ] All backgrounds selectable
- [ ] All sizes selectable
- [ ] All quantities selectable
- [ ] Checkmarks appear on selection
- [ ] Price updates instantly

**Store Selection:**
- [ ] All 5 stores visible
- [ ] Selection highlights correctly
- [ ] Link to locations page works

**Customer Info:**
- [ ] Name input works
- [ ] WhatsApp input works
- [ ] Validation catches empty fields
- [ ] Validation catches invalid phone format

**Submit:**
- [ ] Button shows loading state
- [ ] Alert appears on success
- [ ] WhatsApp opens with correct message
- [ ] All data is in the message

---

## 📱 Mobile Experience

### Key Design Decisions:

1. **Large Touch Targets**
   - Minimum 48x48px for all interactive elements
   - Extra padding on buttons

2. **Sticky Bottom Bar**
   - Always visible price + CTA
   - Positioned for thumb reach
   - Doesn't obstruct form

3. **Single Column Layout**
   - No horizontal scrolling
   - One decision at a time
   - Clear visual hierarchy

4. **Instant Feedback**
   - Price updates immediately
   - Selection states are obvious
   - Errors appear inline

---

## 🔄 Integration Workflow (Production)

### Current: WhatsApp Flow
```
User submits → WhatsApp message → Manual processing by staff
```

### Future: Automated Flow
```
User submits 
  → Photo uploads to Supabase Storage
  → Order saved to database
  → Auto-generate order number
  → Send WhatsApp notification to customer
  → Admin dashboard shows new order
  → Staff processes order
  → Update status to 'ready'
  → Customer notified
```

---

## 📋 Database Integration (Next Step)

### Required Changes in Form:

**Replace mock submit with:**

```typescript
// 1. Upload photo to Supabase Storage
const photoUrl = await uploadToSupabase(uploadedFile);

// 2. Create order in database
const response = await fetch('/api/pas-foto', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    customer_name: customerName,
    customer_whatsapp: customerWhatsApp,
    photo_url: photoUrl,
    background_color: backgroundColor,
    print_size: printSize,
    quantity_package: quantity,
    branch_location: branch,
    total_price: totalPrice,
  }),
});

const { order } = await response.json();

// 3. Redirect to success page
router.push(`/pesanan/${order.order_number}`);
```

---

## 🎯 Performance Targets

### Load Time:
- ⚡ **First Contentful Paint:** < 1.5s
- ⚡ **Time to Interactive:** < 3s
- ⚡ **Largest Contentful Paint:** < 2.5s

### User Actions:
- ⚡ **Photo preview:** Instant
- ⚡ **Price calculation:** < 50ms
- ⚡ **Form submission:** < 2s (with upload)

---

## 🎨 Brand Consistency

### Colors Used:
```css
Primary Red:     #ea2423  /* CTA buttons, highlights */
Success Green:   #10b981  /* Checkmarks */
Warning Amber:   #f59e0b  /* Discount badges */
Error Red:       #ef4444  /* Error states */
```

### Typography:
```css
Headings:  font-serif (Playfair Display)
Body:      font-sans (Inter)
Buttons:   font-semibold
```

### Spacing:
- Section padding: `py-8` (mobile), `py-12` (desktop)
- Card padding: `p-6` (mobile), `p-8` (desktop)
- Gap between sections: `space-y-8`

---

## 🐛 Troubleshooting

### "react-dropzone not found"
```bash
npm install react-dropzone
```

### "PAS_FOTO_LABELS not found"
Check that `src/types/pas-foto.ts` exists and is properly imported

### "formatCurrency not found"
Check that `src/lib/utils/format.ts` exists

### Photo preview not showing
- Check browser console for errors
- Verify image file is valid
- Check FileReader is supported

---

## 📚 Code References

### Files Created/Modified:

| File | Purpose | Status |
|------|---------|--------|
| `src/app/upload/pas-foto/page.tsx` | Main order form | ✅ Complete |
| `src/types/pas-foto.ts` | Types & pricing | ✅ Complete |
| `src/lib/utils/format.ts` | Currency formatter | ✅ Complete |
| `src/app/page.tsx` | Updated CTA links | ✅ Updated |
| `src/components/layout/Header.tsx` | Updated upload button | ✅ Updated |
| `supabase/pas_foto_orders.sql` | Database table | ✅ Complete |

---

## 🎯 Go-Live Checklist

### Before Launching to Public:

**Backend:**
- [ ] Run SQL script in Supabase
- [ ] Create 'order-files' storage bucket
- [ ] Test file upload to storage
- [ ] Test order creation
- [ ] Setup order notifications

**Frontend:**
- [x] Form validation working
- [x] Mobile responsive
- [x] Error handling
- [ ] Connect to real API
- [ ] Add loading states
- [ ] Add success page

**Business:**
- [ ] Test end-to-end with real staff
- [ ] Verify pricing is correct
- [ ] Test all 5 branch selections
- [ ] Prepare staff training
- [ ] Setup order processing workflow

**Marketing:**
- [ ] Update social media links
- [ ] Add to Google Ads landing page
- [ ] Create Instagram story swipe-up
- [ ] Add promotional banner

---

## 🔥 Quick Demo

**Try it now:**
```
http://localhost:3000/upload/pas-foto
```

**Test credentials:**
- Name: Test User
- WhatsApp: 081234567890
- Photo: Any portrait photo from your phone

---

## 💪 Why This Feature Will Convert

1. **Simple:** 4 easy steps, one page
2. **Fast:** 1-hour turnaround promise
3. **Transparent:** See price before committing
4. **Convenient:** Online order, offline pickup
5. **Trustworthy:** 38 years experience badge
6. **Mobile-optimized:** Most traffic is mobile

---

**Ready to integrate with Supabase?** Follow the integration workflow above! 🚀


# Canvas Order - WhatsApp Redirect Implementation Plan

## Status: IN PROGRESS

### Completed ✅
1. Added WhatsApp number mapping to BRANCH_OPTIONS
2. Added `gosendSenderBranch` state for GoSend sender branch selection
3. Re-added missing constants (ACCEPTED_TYPES, SIZE_OPTIONS, etc.)

### Remaining Tasks 🔄

#### 1. Update Form Validation (Line ~260-270)
Add validation for gosendSenderBranch when delivery method is gosend:

```tsx
// After line 265 (existing gosend address validation)
if (deliveryMethod === 'gosend' && !gosendSenderBranch) {
  errors.delivery = 'Silakan pilih cabang pengirim untuk GoSend';
}
```

#### 2. Update WhatsApp Submit Handler (Line ~360-400)
Replace the WhatsApp number logic:

**Current (Line ~393):**
```tsx
const whatsappUrl = `https://wa.me/${CS_WHATSAPP.replace(/[^0-9]/g, '')}?text=${encodedMessage}`;
```

**New:**
```tsx
// Determine target branch based on delivery method
const targetBranchId = deliveryMethod === 'pickup' ? pickupBranch : gosendSenderBranch;
const targetBranch = BRANCH_OPTIONS.find(b => b.id === targetBranchId);

// Use branch-specific WhatsApp number
const whatsappNumber = targetBranch?.whatsapp || '6281936444486';
const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
```

#### 3. Update Delivery Info Message (Line ~360-362)
Update to include sender branch for GoSend:

**Current:**
```tsx
const deliveryInfo = deliveryMethod === 'pickup'
  ? `🏪 *PENGAMBILAN:*\\n• Ambil di Cabang: ${BRANCH_OPTIONS.find(b => b.id === pickupBranch)?.label}`
  : `🚚 *PENGIRIMAN:*\\n• GoSend ke:\\n${deliveryAddress}`;
```

**New:**
```tsx
const deliveryInfo = deliveryMethod === 'pickup'
  ? `🏪 *PENGAMBILAN:*\\n• Ambil di Cabang: ${BRANCH_OPTIONS.find(b => b.id === pickupBranch)?.label}`
  : `🚚 *PENGIRIMAN:*\\n• Dikirim dari: ${BRANCH_OPTIONS.find(b => b.id === gosendSenderBranch)?.label}\\n• GoSend ke:\\n${deliveryAddress}`;
```

#### 4. Add GoSend Sender Branch UI (Line ~793-820)
Add sender branch selection BEFORE address input when gosend is selected:

```tsx
{/* Conditional: GoSend Sender Branch + Address Input */}
{deliveryMethod === 'gosend' && (
  <div className="space-y-4">
    {/* Sender Branch Selection */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        Dikirim dari Cabang <span className="text-red-500">*</span>
      </label>
      <select
        value={gosendSenderBranch}
        disabled={isUploading}
        onChange={(e) => {
          setGosendSenderBranch(e.target.value);
          setFormErrors(prev => ({ ...prev, delivery: '' }));
        }}
        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ea2423] focus:border-transparent disabled:bg-gray-100 ${
          formErrors.delivery ? 'border-red-400' : 'border-gray-300'
        }`}
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
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        Alamat Pengiriman Lengkap <span className="text-red-500">*</span>
      </label>
      <textarea
        value={deliveryAddress}
        disabled={isUploading}
        onChange={(e) => {
          setDeliveryAddress(e.target.value);
          setFormErrors(prev => ({ ...prev, delivery: '' }));
        }}
        placeholder="Contoh: Jl. Merdeka No. 123, RT 01/RW 02, Kelurahan Menteng, Kecamatan Menteng, Jakarta Pusat 10110"
        rows={4}
        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ea2423] focus:border-transparent disabled:bg-gray-100 ${
          formErrors.delivery ? 'border-red-400' : 'border-gray-300'
        }`}
      />
      <p className="text-xs text-gray-500 mt-1">
        Biaya GoSend akan dikonfirmasi oleh CS berdasarkan jarak
      </p>
    </div>
  </div>
)}
```

#### 5. Update isDeliveryComplete Logic (Line ~415-417)
Update to include gosendSenderBranch validation:

**Current:**
```tsx
const isDeliveryComplete = deliveryMethod === 'pickup' 
  ? !!pickupBranch 
  : (deliveryMethod === 'gosend' ? !!deliveryAddress.trim() : false);
```

**New:**
```tsx
const isDeliveryComplete = deliveryMethod === 'pickup' 
  ? !!pickupBranch 
  : (deliveryMethod === 'gosend' ? (!!deliveryAddress.trim() && !!gosendSenderBranch) : false);
```

#### 6. Update Reset Logic in handleWhatsAppSubmit
After successful submission, reset gosendSenderBranch (if there's a reset section).

---

## Testing Checklist

After implementation:
- [ ] Pickup flow: Select branch → redirects to correct branch WhatsApp
- [ ] GoSend flow: Select sender branch + address → redirects to sender branch WhatsApp
- [ ] Validation works for both flows
- [ ] WhatsApp message includes correct delivery info
- [ ] Form resets properly after submission

---

## Files to Modify
1. `src/app/upload/canvas/page.tsx` - Main canvas order page (all changes above)

---

## Estimated Lines to Change
- Validation: +4 lines (around line 265)
- WhatsApp logic: +5 lines, -2 lines (around line 360-393)
- Delivery info: +1 line (around line 360)
- UI: +50 lines (around line 793)
- isDeliveryComplete: +1 line (around line 415)

**Total: ~60 lines of changes**

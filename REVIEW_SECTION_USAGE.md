# 📊 Review Section Component - Usage Guide

## 📋 Overview

Komponen `ReviewSection` adalah komponen reusable untuk menampilkan social proof dan review pelanggan di halaman produk. Didesain dengan best practices e-commerce modern (terinspirasi dari Mixbook, Amazon, dll).

---

## 🎯 Features

### 1. **Review Summary (Left Panel)**
- ✅ Aggregate rating dengan angka besar (4.9/5)
- ✅ Total review count
- ✅ Star visualization
- ✅ **Bar chart** untuk distribusi rating (5★, 4★, 3★, 2★, 1★)
- ✅ Filter by rating (klik bar untuk filter)
- ✅ Sticky positioning untuk desktop

### 2. **Review List (Right Panel)**
- ✅ Individual review cards
- ✅ User avatar (initial letter)
- ✅ Verified purchase badge
- ✅ Star rating per review
- ✅ Review text
- ✅ **Image attachments** (placeholder untuk foto customer)
- ✅ Helpful counter dengan like button
- ✅ Date stamp

### 3. **Controls**
- ✅ Sort by: Recent / Helpful / Highest / Lowest
- ✅ Filter by rating
- ✅ Load more button (placeholder)
- ✅ Write review CTA

---

## 📁 File Structure

```
src/
├── components/
│   └── reviews/
│       └── ReviewSection.tsx        ← Main component
├── data/
│   ├── canvasReviews.ts            ← Canvas data
│   └── pasFotoReviews.ts           ← Pas Foto data
└── app/
    ├── layanan/
    │   ├── cetak-canvas/
    │   │   └── CetakCanvasContent.tsx  ← Import here
    │   └── pas-foto/
    │       └── page.tsx                ← Import here
    └── ...
```

---

## 🚀 Usage

### For Canvas Art Page

**File:** `src/app/layanan/cetak-canvas/CetakCanvasContent.tsx`

```tsx
import ReviewSection from '@/components/reviews/ReviewSection';
import { canvasReviewsData } from '@/data/canvasReviews';

export default function CetakCanvasContent() {
  return (
    <>
      {/* ... other sections ... */}
      
      {/* Hero Section */}
      {/* Features Section */}
      {/* FAQ Section */}
      
      {/* Review Section */}
      <ReviewSection
        productName={canvasReviewsData.productName}
        averageRating={canvasReviewsData.averageRating}
        totalReviews={canvasReviewsData.totalReviews}
        ratingDistribution={canvasReviewsData.ratingDistribution}
        reviews={canvasReviewsData.reviews}
      />
      
      {/* Final CTA */}
    </>
  );
}
```

---

### For Pas Foto Page

**File:** `src/app/layanan/pas-foto/page.tsx`

```tsx
import ReviewSection from '@/components/reviews/ReviewSection';
import { pasFotoReviewsData } from '@/data/pasFotoReviews';

export default function PasFotoPage() {
  return (
    <>
      {/* ... other sections ... */}
      
      {/* Hero Section */}
      {/* Features Section */}
      {/* FAQ Section */}
      
      {/* Review Section */}
      <ReviewSection
        productName={pasFotoReviewsData.productName}
        averageRating={pasFotoReviewsData.averageRating}
        totalReviews={pasFotoReviewsData.totalReviews}
        ratingDistribution={pasFotoReviewsData.ratingDistribution}
        reviews={pasFotoReviewsData.reviews}
      />
      
      {/* Final CTA */}
    </>
  );
}
```

---

## 📊 Data Structure

### TypeScript Interfaces

```typescript
interface Review {
  id: string;                 // Unique identifier
  userName: string;           // Customer name
  date: string;               // Human-readable date
  rating: number;             // 1-5 stars
  text: string;               // Review content
  verified: boolean;          // Verified purchase?
  helpful: number;            // Helpful count
  images?: string[];          // Optional photo attachments
}

interface ReviewSectionProps {
  productName: string;        // "Canvas Art" or "Pas Foto"
  averageRating: number;      // e.g., 4.9
  totalReviews: number;       // e.g., 1247
  ratingDistribution: {
    5: number;                // Count of 5-star reviews
    4: number;                // Count of 4-star reviews
    3: number;                // Count of 3-star reviews
    2: number;                // Count of 2-star reviews
    1: number;                // Count of 1-star reviews
  };
  reviews: Review[];          // Array of individual reviews
}
```

---

## 🎨 UI Components

### 1. Summary Panel (Left)

```
┌─────────────────────────┐
│         4.9             │  ← Large rating number
│       ★★★★★             │  ← Star visualization
│   Berdasarkan 1200+     │  ← Total count
│   ─────────────────     │
│   5★ ████████████ 1089  │  ← Bar chart
│   4★ ██           124   │
│   3★ █            22    │
│   2★ ▌            8     │
│   1★ ▌            4     │
└─────────────────────────┘
```

### 2. Review Card (Right)

```
┌─────────────────────────────────────────────┐
│  👤 Ibu Siti          ★★★★★                 │
│     2 hari yang lalu  ✓ Verified            │
│                                             │
│  Hasil cetakan kanvasnya luar biasa...      │
│  [Review text content here]                 │
│                                             │
│  📷 📷 📷  ← Image attachments              │
│                                             │
│  👍 Membantu (47)     ✓ Pembelian Verified  │
└─────────────────────────────────────────────┘
```

---

## 🎮 Interactive Features

### Sorting

```typescript
// User can sort by:
- 'recent'   → Newest reviews first
- 'helpful'  → Most helpful first
- 'highest'  → Highest rating first
- 'lowest'   → Lowest rating first
```

### Filtering

```typescript
// User can filter by rating:
- 'all'  → Show all reviews
- 5      → Only 5-star reviews
- 4      → Only 4-star reviews
- 3      → Only 3-star reviews
- 2      → Only 2-star reviews
- 1      → Only 1-star reviews
```

**Interaction:** Click on bar chart to filter

---

## 🎨 Styling & Branding

### Colors

| Element | Color | Tailwind Class |
|---------|-------|----------------|
| Primary CTA | Red | `bg-[#ea2423]` |
| Stars (filled) | Amber | `fill-amber-400` |
| Verified badge | Green | `text-green-600` |
| Bar chart | Amber | `bg-amber-400` |
| Hover effect | Light Red | `hover:bg-red-50` |

### Responsive Breakpoints

```css
/* Mobile: Stack layout */
< 1024px: Review list below summary

/* Desktop: Side-by-side */
≥ 1024px: 
  - Summary: 1/3 width (sticky)
  - List: 2/3 width (scrollable)
```

---

## 🔧 Customization

### Adding New Reviews

**Update data files:**

```typescript
// src/data/canvasReviews.ts or pasFotoReviews.ts
export const reviewsData = {
  // ... existing data
  reviews: [
    // ... existing reviews
    {
      id: 'new-1',
      userName: 'New Customer',
      date: 'Today',
      rating: 5,
      text: 'Great product!',
      verified: true,
      helpful: 0,
      images: ['/path/to/image.jpg'],
    },
  ],
};
```

### Changing Average Rating

```typescript
averageRating: 4.9,  // Change this
```

### Updating Distribution

```typescript
ratingDistribution: {
  5: 1089,  // Count of 5-star reviews
  4: 124,   // Count of 4-star reviews
  3: 22,    // Count of 3-star reviews
  2: 8,     // Count of 2-star reviews
  1: 4,     // Count of 1-star reviews
},
```

**Note:** Make sure sum equals `totalReviews`!

---

## 🧪 Testing Checklist

### Desktop View:
- [ ] Summary panel sticks on scroll
- [ ] Bar chart displays correctly
- [ ] Sort dropdown works
- [ ] Filter by rating works
- [ ] Review cards display properly
- [ ] Image placeholders show
- [ ] Helpful button responsive

### Mobile View:
- [ ] Summary stacks above list
- [ ] Bar chart remains readable
- [ ] Controls stack vertically
- [ ] Review cards remain readable
- [ ] Touch interactions work

### Interactions:
- [ ] Click bar → Filter by rating
- [ ] Change sort → Reviews reorder
- [ ] Click "Tampilkan Semua" → Reset filter
- [ ] "Load More" button visible when needed
- [ ] "Tulis Ulasan" CTA visible

---

## 📈 SEO Benefits

1. **Rich Content:** Real user reviews improve page quality
2. **Keywords:** Natural language mentions product features
3. **Social Proof:** Builds trust and credibility
4. **Engagement:** Users spend more time reading reviews
5. **Conversion:** Higher trust = higher conversion rate

---

## 🔮 Future Enhancements

### Phase 2:
- [ ] Connect to real database
- [ ] Image lightbox/modal
- [ ] Video review support
- [ ] Reply from CS
- [ ] Report inappropriate review

### Phase 3:
- [ ] AI sentiment analysis
- [ ] Auto-translate reviews
- [ ] Review rewards program
- [ ] Share review to social media

---

## 🎯 Conversion Optimization

### Best Practices Implemented:

1. **High Rating Visibility:** 4.9/5 prominent display
2. **Bar Chart:** Visual trust indicator
3. **Verified Badges:** Authenticity signals
4. **Real Photos:** Customer-uploaded images
5. **Recent Reviews:** Shows active customer base
6. **Helpful Counter:** Social validation
7. **Filter Options:** Easy navigation
8. **Mobile-First:** Responsive design

---

## 📞 Support

**Questions?**
- Check component props in TypeScript definitions
- Review data structure in data files
- Test interactions in browser DevTools

---

**Review Section Ready to Use! ⭐⭐⭐⭐⭐**


# Homepage V2 - Quick Reference Guide

## 🎯 CASEY KEITH'S GOLDEN RULES

### Rule #1: Primary Entity ALWAYS First
```tsx
✅ CORRECT: "SSFoto - Cetak Pas Foto"
❌ WRONG:   "Cetak Pas Foto - SSFoto"
❌ WRONG:   "Layanan Cetak Pas Foto"
```

### Rule #2: Supporting Brand Entities Build Trust
```tsx
Show recognized brands:
- Canon (equipment)
- Fujifilm (paper)
- Epson (technology)
- Google Reviews (platform)
```

### Rule #3: Specific > Generic
```tsx
✅ "Harga mulai Rp 15.000"
❌ "Harga terjangkau"

✅ "Ready dalam 15 menit"
❌ "Proses cepat"

✅ "50,000+ pelanggan sejak 2015"
❌ "Banyak pelanggan"
```

### Rule #4: Dark Sections for Social Proof
```tsx
Testimonials: bg-gray-900 (dark)
Locations:    bg-gray-900 (dark)
Final CTA:    bg-red-gradient (bright)
```

### Rule #5: Answer-First Content
```tsx
✅ "SSFoto adalah layanan cetak foto profesional dengan 5 cabang..."
❌ "Kami adalah perusahaan yang bergerak di bidang..."
```

---

## 📋 SECTION CHECKLIST

When creating/updating sections, ensure:

### Hero Section
- [ ] Brand name in H1 (first position)
- [ ] Specific numbers in trust signals
- [ ] Supporting brand logos visible
- [ ] Primary CTA clear and prominent

### Service Section
- [ ] Service titles: "Brand + Service" format
- [ ] Specific features listed (not generic)
- [ ] Pricing shown (if applicable)
- [ ] Clear CTA for each service

### Testimonials
- [ ] Dark background (bg-gray-900)
- [ ] Specific service mentioned
- [ ] Specific location mentioned
- [ ] Specific price mentioned
- [ ] Specific outcome mentioned
- [ ] Real name + location
- [ ] Service badge + date

### Brand Entities
- [ ] Equipment brands listed
- [ ] Certifications shown
- [ ] Specific numbers (customers, rating, years)
- [ ] Achievement badges

### Final CTA
- [ ] Bright background (high contrast)
- [ ] Contact info VISIBLE
- [ ] WhatsApp number prominent
- [ ] Multiple contact methods

---

## 🎨 DESIGN SYSTEM

### Colors
```tsx
Primary:   #ea2423 (SSFoto Red)
Dark BG:   gray-900 (Testimonials, Locations)
Light BG:  white, gray-50 (Content sections)
Success:   green-600 (Checkmarks)
Warning:   yellow-400 (Stars)
Info:      blue-600 (Shields)
```

### Typography
```tsx
H1: font-serif text-4xl sm:text-5xl lg:text-6xl font-bold
H2: font-serif text-3xl sm:text-4xl lg:text-5xl font-bold
H3: font-serif text-2xl font-bold
Body: text-lg text-gray-600
```

### Spacing
```tsx
Section: py-20 lg:py-28
Container: max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
Grid Gap: gap-6 (small) to gap-12 (large)
```

### Components
```tsx
Card: rounded-3xl p-8 border border-gray-100
Button Primary: bg-[#ea2423] text-white rounded-full px-8 py-4
Button Secondary: border-2 border-gray-300 rounded-full px-8 py-4
Badge: px-4 py-1.5 bg-red-50 text-[#ea2423] rounded-full
```

---

## 📝 CONTENT TEMPLATES

### Testimonial Template
```tsx
{
  rating: 5,
  text: "[Service] di [SSFoto Location] untuk [purpose]. [Specific detail about staff/process]. [Specific outcome] dalam [timeframe]. [Price mention]. [Recommendation]!",
  author: "[Real Name]",
  location: "[City/Area]",
  service: "[Service Type]",
  date: "[Month Year]",
}

Example:
"Cetak pas foto visa Schengen di SSFoto Rawamangun untuk aplikasi visa ke Belanda. 
Staff-nya super helpful ngejelasin requirement ukuran 35x45mm dengan background putih. 
Visa approved dalam 2 minggu. Harga cuma 25rb. Recommended banget!"
```

### Service Card Template
```tsx
{
  icon: "📷",
  title: "SSFoto [Service Name]",  // Brand FIRST!
  description: "[Service description with specific details]",
  specs: [
    "[Specific feature 1]",
    "[Specific feature 2]",
    "[Specific feature 3]",
    "Harga mulai Rp [price]",  // Always include price
  ],
  link: "/layanan/[service-slug]",
  linkText: "[Action] →",
}
```

### Location Card Template
```tsx
{
  name: "SSFoto [Location]",  // Brand FIRST!
  address: "[Full address]",
  phone: "([area code]) [number]",
  hours: "Senin-Minggu: [opening]-[closing]",
}
```

---

## 🔍 SEO CHECKLIST

### Meta Tags
- [ ] Title: "SSFoto - [Main Service] | [USP]" (60 chars)
- [ ] Description: Mentions SSFoto, services, locations, pricing (155 chars)
- [ ] Keywords: Include "SSFoto" + service + location combinations

### Schema Markup
- [ ] Organization schema (name, logo, address, phone)
- [ ] LocalBusiness schema (for each location)
- [ ] FAQ schema (for FAQ section)
- [ ] AggregateRating schema (reviews)

### Entity Optimization
- [ ] Primary entity (SSFoto) in H1
- [ ] Service entities: "SSFoto + Service"
- [ ] Location entities: "SSFoto + Location"
- [ ] Supporting entities: Canon, Fujifilm, Epson

### Internal Linking
- [ ] Service pages linked from service cards
- [ ] Location pages linked from location cards
- [ ] Anchor text includes brand name

---

## 🚀 DEPLOYMENT CHECKLIST

### Before Deploying
- [ ] Test on mobile (responsive design)
- [ ] Test all CTAs (links work)
- [ ] Check image loading (Next.js Image optimization)
- [ ] Verify WhatsApp link format
- [ ] Test schema markup (Google Rich Results Test)

### After Deploying
- [ ] Submit sitemap to GSC
- [ ] Monitor Core Web Vitals
- [ ] Check indexed pages
- [ ] Monitor entity recognition in GSC

---

## 📊 MONITORING

### Google Search Console
```
Monitor these queries:
- "SSFoto"
- "SSFoto cetak pas foto"
- "SSFoto [location]"
- "cetak pas foto [location]"
- "studio foto [location]"
```

### Key Metrics
```
Track:
- Impressions for "SSFoto" branded queries
- CTR for service pages
- Position for location + service combinations
- Entity recognition in Knowledge Graph
```

---

## 🛠️ COMMON UPDATES

### Adding New Service
```tsx
// 1. Add to services array in ServicesSection
{
  icon: "🎯",
  title: "SSFoto [New Service]",  // Brand first!
  description: "[Specific description]",
  specs: [
    "[Feature 1]",
    "[Feature 2]",
    "[Feature 3]",
    "Harga mulai Rp [price]",
  ],
  link: "/layanan/[slug]",
  linkText: "[CTA Text] →",
}

// 2. Add to FAQ section
{
  question: "Apakah SSFoto bisa [new service]?",
  answer: "Ya, SSFoto melayani [new service] dengan [specific details]...",
}

// 3. Create dedicated page (if high demand)
```

### Adding New Location
```tsx
// 1. Add to locations array in LocationsSection
{
  name: "SSFoto [New Location]",  // Brand first!
  address: "[Full address]",
  phone: "([code]) [number]",
  hours: "Senin-Minggu: [time]",
}

// 2. Update schema markup (add new address)

// 3. Create location-specific page (duplicate homepage)
```

### Adding New Testimonial
```tsx
// 1. Add to testimonials array in TestimonialsSection
{
  rating: 5,
  text: "[Detailed testimonial with specifics]",
  author: "[Real Name]",
  location: "[City]",
  service: "[Service Type]",
  date: "[Month Year]",
}

// Remember: Include specific service, price, outcome, timeline!
```

---

## ⚠️ COMMON MISTAKES TO AVOID

### ❌ DON'T DO THIS:
```tsx
// Generic service title
<h3>Cetak Pas Foto</h3>

// Generic testimonial
"Pelayanan bagus, recommended!"

// Hidden contact info
<p className="text-xs text-gray-400">Call: 0812...</p>

// Light testimonial background
<section className="bg-white">

// Generic trust signal
"Berpengalaman bertahun-tahun"
```

### ✅ DO THIS INSTEAD:
```tsx
// Brand-first service title
<h3>SSFoto Cetak Pas Foto</h3>

// Specific testimonial
"Cetak pas foto visa di SSFoto Rawamangun, hasil perfect, 
visa approved 2 minggu, harga 25rb!"

// Prominent contact info
<span className="text-xl font-bold">0819-3644-4486</span>

// Dark testimonial background
<section className="bg-gray-900">

// Specific trust signal
"50,000+ pelanggan sejak 2015"
```

---

## 📞 QUICK LINKS

- **Homepage V2**: `/homepage-v2`
- **Source Code**: `src/app/homepage-v2/page.tsx`
- **Documentation**: `HOMEPAGE_V2_BURLOAK_IMPLEMENTATION.md`
- **Comparison**: `HOMEPAGE_V2_BEFORE_AFTER.md`

---

## 🎓 CASEY KEITH RESOURCES

### Key Teachings:
1. **Primary Entity First**: Brand name before everything
2. **Supporting Entities**: Use recognized brands for trust
3. **Answer-First**: Direct value prop, no fluff
4. **E-E-A-T**: Specific numbers, equipment, guarantees
5. **Visual Hierarchy**: Dark sections for social proof

### Burloak Example:
- Brand name in H1
- Supporting brands visible (HomeStars, Yelp, Google)
- Dark testimonial section
- Bright final CTA
- Specific project details

---

*Keep this guide handy when updating Homepage V2!*
*Last Updated: December 26, 2024*

# Internal Link Tracking System - Documentation

## 📊 Overview

This tracking spreadsheet helps you:
- **Audit all internal links** across SSFoto website
- **Ensure entity-optimized anchor text** (Casey Keith methodology)
- **Monitor link hierarchy** (pillar → supporting pages)
- **Track link health** (broken links, redirects)
- **Plan future link additions** with proper entity structure

---

## 📁 File Location

**CSV File**: `INTERNAL_LINK_TRACKING.csv`

**How to Use**:
1. Open with Excel, Google Sheets, or Numbers
2. Enable filters on header row
3. Sort/filter by any column

---

## 📋 Column Definitions

### 1. **Source Page (URL)**
- The page WHERE the link appears
- Format: `/path/to/page` or full URL
- Example: `/homepage-v2`, `/layanan/pas-foto`

### 2. **Source Section**
- WHERE on the page the link appears
- Options:
  - `Hero` - Above the fold section
  - `Body` - Main content area
  - `Services` - Service cards/grid
  - `Locations` - Location cards
  - `Final CTA` - Bottom conversion section
  - `Breadcrumb` - Navigation breadcrumbs
  - `Footer` - Page footer
  - `Reviews` - Testimonial/review section

### 3. **Anchor Text**
- The EXACT clickable text
- Example: "SSFoto Cetak Pas Foto", "Lihat Harga Pas Foto"
- **Important**: Should include entity name when possible

### 4. **Target Page (URL)**
- WHERE the link goes
- Format: `/path/to/page` or full URL
- Example: `/layanan/pas-foto`, `https://wa.me/6281936444486`

### 5. **Entity Included**
- Does anchor text include "SSFoto" or location name?
- Options: `Yes` or `No`
- **Casey Keith Rule**: Entity should be included when linking to service/location pages

### 6. **Link Type**
- What kind of link is this?
- Options:
  - `Service` - Links to service pages
  - `Location` - Links to location pages
  - `Sub-service` - Links to specific sub-services
  - `Navigation` - Breadcrumb/menu links
  - `External` - External links (WhatsApp, Maps, etc.)
  - `Internal Anchor` - Same-page anchor links (#section)

### 7. **Direction**
- Link hierarchy direction
- Options:
  - `Down` - From pillar to supporting page (e.g., homepage → service page)
  - `Up` - From supporting to pillar (e.g., service page → homepage)
  - `Lateral` - Between pages of same level (e.g., service → service)
  - `N/A` - For external links

**Casey Keith Hierarchy**:
```
Homepage (Pillar)
    ↓ Down
Service Hub (/layanan)
    ↓ Down
Service Pages (/layanan/pas-foto)
    ↓ Down
Upload Flow (/upload/pas-foto)
```

### 8. **Priority**
- How important is this link?
- Options:
  - `High` - Conversion CTAs, primary navigation
  - `Medium` - Secondary CTAs, related links
  - `Low` - Breadcrumbs, footer links

### 9. **Status**
- Current state of the link
- Options:
  - `Live` - Link is active and working
  - `Pending` - Planned but not implemented
  - `Remove` - Should be removed
  - `Broken` - Link is broken (404)
  - `Redirect` - Link redirects

### 10. **Last Updated**
- Date when link was last checked/updated
- Format: `YYYY-MM-DD`

### 11. **Notes**
- Additional context
- Examples:
  - "Primary CTA in hero"
  - "Entity-optimized anchor text"
  - "Needs entity in anchor"

---

## 🎯 CASEY KEITH ENTITY RULES

### Rule #1: Entity-First Anchor Text

**✅ CORRECT**:
```
Anchor Text: "SSFoto Cetak Pas Foto"
Target: /layanan/pas-foto
Entity Included: Yes
```

**❌ WRONG**:
```
Anchor Text: "Cetak Pas Foto"
Target: /layanan/pas-foto
Entity Included: No
```

### Rule #2: Location Entity Format

**✅ CORRECT**:
```
Anchor Text: "SSFoto Rawamangun"
Target: /lokasi/rawamangun
Entity Included: Yes
```

**❌ WRONG**:
```
Anchor Text: "Cabang Rawamangun"
Target: /lokasi/rawamangun
Entity Included: No
```

### Rule #3: Link Direction Matters

**Pillar → Supporting (Down)**:
- Homepage → Service pages ✅
- Service hub → Individual services ✅

**Supporting → Pillar (Up)**:
- Service page → Homepage (breadcrumb) ✅
- Upload flow → Service page ✅

**Lateral (Same Level)**:
- Service → Service ⚠️ (use sparingly)
- Location → Location ⚠️ (use sparingly)

---

## 📊 HOW TO USE THIS SPREADSHEET

### 1. **Regular Audits**

**Monthly Check**:
```
1. Filter by Status = "Live"
2. Check each link still works
3. Update "Last Updated" column
4. Mark broken links as "Broken"
```

### 2. **Entity Optimization**

**Find Links Missing Entities**:
```
1. Filter by Entity Included = "No"
2. Filter by Link Type = "Service" or "Location"
3. Update anchor text to include "SSFoto"
4. Change Entity Included to "Yes"
```

**Example Fix**:
```
BEFORE:
- Anchor Text: "Cetak Pas Foto"
- Entity Included: No

AFTER:
- Anchor Text: "SSFoto Cetak Pas Foto"
- Entity Included: Yes
```

### 3. **Priority Analysis**

**High Priority Links**:
```
1. Filter by Priority = "High"
2. Ensure all are working
3. Verify entity inclusion
4. Check conversion tracking
```

### 4. **Link Direction Audit**

**Check Hierarchy**:
```
1. Group by Source Page
2. Check Direction column
3. Ensure proper flow:
   - Homepage has mostly "Down" links
   - Service pages have mix of "Up" and "Down"
   - Upload flows have mostly "Up" links
```

---

## 🔍 COMMON ISSUES & FIXES

### Issue #1: Missing Entity in Service Links

**Problem**:
```csv
/homepage-v2,Services,Lihat Harga,/layanan/pas-foto,No,Service,Down,High,Live
```

**Fix**:
```csv
/homepage-v2,Services,SSFoto Cetak Pas Foto - Lihat Harga,/layanan/pas-foto,Yes,Service,Down,High,Live
```

### Issue #2: Too Many Lateral Links

**Problem**:
```csv
/layanan/pas-foto,Body,Cetak Kanvas,/layanan/cetak-canvas,No,Service,Lateral,High,Live
/layanan/pas-foto,Body,Studio Foto,/layanan/studio,No,Service,Lateral,High,Live
/layanan/pas-foto,Body,Cetak Pembesaran,/layanan/pembesaran,No,Service,Lateral,High,Live
```

**Fix**: Reduce lateral links, prioritize "Up" to service hub:
```csv
/layanan/pas-foto,Body,Lihat Semua Layanan SSFoto,/layanan,Yes,Service,Up,Medium,Live
```

### Issue #3: Broken External Links

**Problem**:
```csv
/kontak,Contact,WhatsApp,https://wa.me/OLD_NUMBER,No,External,N/A,High,Broken
```

**Fix**:
```csv
/kontak,Contact,WhatsApp SSFoto,https://wa.me/6281936444486,Yes,External,N/A,High,Live
```

---

## 📈 TRACKING METRICS

### Key Metrics to Monitor:

1. **Entity Coverage**:
   ```
   Target: 80%+ of service/location links include entity
   Formula: (Entity Included = Yes) / (Link Type = Service or Location)
   ```

2. **Link Health**:
   ```
   Target: 100% of High Priority links = Live
   Formula: (Status = Live) / (Priority = High)
   ```

3. **Hierarchy Balance**:
   ```
   Homepage: 80% Down, 20% Lateral
   Service Pages: 40% Up, 40% Down, 20% Lateral
   Upload Flows: 60% Up, 40% Down
   ```

---

## 🚀 ADDING NEW LINKS

### Step-by-Step Process:

1. **Add New Row**:
   ```csv
   /new-page,Hero,Anchor Text,/target,Yes/No,Type,Direction,Priority,Pending,2024-12-26,Notes
   ```

2. **Fill Required Columns**:
   - Source Page (URL)
   - Source Section
   - Anchor Text (with entity if applicable)
   - Target Page (URL)
   - Entity Included (Yes/No)
   - Link Type
   - Direction
   - Priority

3. **Set Status**:
   - `Pending` - Not yet implemented
   - `Live` - After implementation

4. **Implement in Code**:
   ```tsx
   <Link href="/target">
     SSFoto [Service Name]  {/* Entity included! */}
   </Link>
   ```

5. **Update Status**:
   ```csv
   Status: Pending → Live
   Last Updated: [Today's Date]
   ```

---

## 📋 RECOMMENDED WORKFLOWS

### Weekly Workflow:
```
1. Check all "High" priority links
2. Verify external links (WhatsApp, Maps)
3. Update "Last Updated" for checked links
```

### Monthly Workflow:
```
1. Full audit of all links
2. Entity optimization check
3. Remove "Remove" status links
4. Implement "Pending" links
5. Export report for stakeholders
```

### Quarterly Workflow:
```
1. Comprehensive link hierarchy review
2. A/B test anchor text variations
3. Analyze conversion data by link
4. Plan new internal linking strategy
```

---

## 🎨 SPREADSHEET TIPS

### Filtering Examples:

**Find All Homepage Links**:
```
Filter: Source Page = "/"
```

**Find Entity-Optimized Links**:
```
Filter: Entity Included = "Yes"
```

**Find Broken Links**:
```
Filter: Status = "Broken"
```

**Find High Priority Service Links**:
```
Filter: Priority = "High" AND Link Type = "Service"
```

### Sorting Examples:

**By Priority**:
```
Sort: Priority (High → Medium → Low)
```

**By Last Updated**:
```
Sort: Last Updated (Oldest → Newest)
```

**By Source Page**:
```
Sort: Source Page (A → Z)
```

---

## 📊 EXPORT & REPORTING

### Google Sheets Import:
```
1. Open Google Sheets
2. File → Import → Upload
3. Select INTERNAL_LINK_TRACKING.csv
4. Import location: New spreadsheet
5. Separator type: Comma
```

### Excel Import:
```
1. Open Excel
2. Data → From Text/CSV
3. Select INTERNAL_LINK_TRACKING.csv
4. Delimiter: Comma
5. Load
```

### Create Reports:
```
1. Pivot Table by Link Type
2. Chart: Entity Coverage %
3. Chart: Link Health by Priority
4. Export as PDF for stakeholders
```

---

## 🔧 MAINTENANCE SCHEDULE

### Daily:
- [ ] Check "High" priority external links (WhatsApp)

### Weekly:
- [ ] Verify all conversion CTAs working
- [ ] Check for 404 errors in GSC
- [ ] Update broken links

### Monthly:
- [ ] Full link audit
- [ ] Entity optimization review
- [ ] Implement pending links
- [ ] Remove deprecated links

### Quarterly:
- [ ] Link hierarchy analysis
- [ ] Anchor text A/B testing
- [ ] Conversion tracking review
- [ ] Strategic planning for new links

---

## 📞 SUPPORT

If you need to:
- **Add new pages**: Create new rows for all links on that page
- **Update anchor text**: Edit "Anchor Text" column + set "Entity Included"
- **Remove links**: Set Status to "Remove" + add note
- **Track broken links**: Set Status to "Broken" + add note with error

---

## 🎯 CASEY KEITH COMPLIANCE

### Checklist for Each Link:

- [ ] Entity included in anchor text (for service/location links)
- [ ] Proper link direction (pillar → supporting)
- [ ] High priority for conversion CTAs
- [ ] Descriptive anchor text (not "click here")
- [ ] Consistent entity format ("SSFoto + Service")

---

*Last Updated: December 26, 2024*
*Methodology: Casey Keith's Entity-First Internal Linking*

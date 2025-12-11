import type { Metadata } from "next";
import CetakCanvasContent from "./CetakCanvasContent";

// =====================================
// METADATA (Server Component)
// =====================================

export async function generateMetadata(): Promise<Metadata> {
  const title = "Jasa Cetak Kanvas Premium | Garansi 100 Tahun - SS Foto";
  const description =
    "Ubah foto menjadi lukisan dinding dengan Kanvas Premium SS Foto. Dicetak di Kanvas Cotton Asli, tinta UV Protection (Garansi 100 Tahun), rangka Kayu Jati Oven. Desain foto kanvas Anda sekarang!";
  const keywords =
    "cetak kanvas, jasa cetak foto kanvas, cetak kanvas premium, cetak foto kanvas Jakarta, SS Foto";
  const ogImage = "/images/og/cetak-kanvas.jpg";
  const url = "https://ssfoto.co.id/layanan/cetak-canvas";

  return {
    title,
    description,
    keywords,
    
    // Canonical URL (prevents duplicate content issues)
    alternates: {
      canonical: url,
    },

    // Open Graph (Facebook, LinkedIn, WhatsApp)
    openGraph: {
      type: "website",
      locale: "id_ID",
      url,
      title,
      description,
      siteName: "SS Foto Digital Lab",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: "Cetak Kanvas Premium SS Foto",
        },
      ],
    },

    // Twitter Card
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },

    // Additional SEO optimizations
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    // Verification (optional, add your actual codes)
    // verification: {
    //   google: "your-google-verification-code",
    // },
  };
}

// =====================================
// STRUCTURED DATA (Schema Markup)
// =====================================

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "@id": "https://ssfoto.co.id/layanan/cetak-canvas#product",
  name: "Jasa Cetak Kanvas Premium SS Foto",
  description:
    "Ubah foto menjadi lukisan dinding dengan Kanvas Premium SS Foto. Dicetak di Kanvas Cotton Asli, tinta UV Protection (Garansi 100 Tahun), rangka Kayu Jati Oven.",
  image: [
    "https://ssfoto.co.id/images/og/cetak-kanvas.jpg",
    "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=1200",
  ],
  brand: {
    "@type": "Brand",
    name: "SS Foto",
    logo: "https://ssfoto.co.id/logo.png",
  },
  offers: {
    "@type": "Offer",
    url: "https://ssfoto.co.id/layanan/cetak-canvas",
    priceCurrency: "IDR",
    price: "250000",
    priceValidUntil: "2026-12-31",
    availability: "https://schema.org/InStock",
    seller: {
      "@type": "Organization",
      name: "SS Foto Digital Lab",
    },
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "1200",
    bestRating: "5",
    worstRating: "1",
  },
  category: "Wall Decor / Canvas Printing",
  material: "100% Cotton Canvas 360gsm",
  additionalProperty: [
    {
      "@type": "PropertyValue",
      name: "Frame Material",
      value: "Kayu Jati Belanda Oven (Anti Rayap)",
    },
    {
      "@type": "PropertyValue",
      name: "Ink Type",
      value: "UV Protection Ink (Fade-resistant 100 years)",
    },
    {
      "@type": "PropertyValue",
      name: "Mounting",
      value: "Gallery Wrap (Ready to Hang)",
    },
  ],
  isRelatedTo: {
    "@type": "Service",
    name: "Layanan Desain Foto Kanvas",
    description: "Konsultasi gratis untuk memilih ukuran dan komposisi terbaik.",
  },
};

// FAQ Schema for SEO
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Berapa harga cetak kanvas di SS Foto?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Harga cetak kanvas di SS Foto mulai dari Rp 250.000 untuk ukuran 40x60 cm. Harga bervariasi tergantung ukuran dan jenis frame yang dipilih.",
      },
    },
    {
      "@type": "Question",
      name: "Apakah kanvas SS Foto tahan lama?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ya, kanvas SS Foto menggunakan bahan 100% Cotton Canvas 360gsm dengan tinta UV Protection yang tahan pudar hingga 100 tahun. Rangka kayu jati belanda oven anti rayap.",
      },
    },
    {
      "@type": "Question",
      name: "Berapa lama proses cetak kanvas?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Proses produksi cetak kanvas SS Foto memakan waktu 3-4 hari kerja. Untuk pengiriman luar kota, estimasi total 5-7 hari kerja.",
      },
    },
    {
      "@type": "Question",
      name: "Apakah bisa cetak kanvas dari foto HP?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Bisa, selama resolusi foto minimal 2000 x 3000 pixel atau 6 Megapixel. Untuk hasil terbaik, gunakan foto yang diambil dengan kamera HP mode maksimal (tidak terkrop). Tim kami akan cek kualitas sebelum produksi.",
      },
    },
    {
      "@type": "Question",
      name: "Apakah kanvas bisa tahan air?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ya, kanvas SS Foto dilapis coating tahan air (water-resistant). Bisa dilap dengan kain lembab untuk membersihkan debu.",
      },
    },
  ],
};

// Organization Schema (for E-E-A-T)
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://ssfoto.co.id/#organization",
  name: "SS Foto Digital Lab",
  url: "https://ssfoto.co.id",
  logo: "https://ssfoto.co.id/logo.png",
  sameAs: [
    "https://www.instagram.com/ssfoto_id",
    "https://www.facebook.com/ssfoto",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+62-819-3644-4486",
    contactType: "Customer Service",
    areaServed: "ID",
    availableLanguage: ["Indonesian"],
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Jl. Balai Pustaka Timur No.11",
    addressLocality: "Rawamangun",
    addressRegion: "DKI Jakarta",
    postalCode: "13220",
    addressCountry: "ID",
  },
};

// =====================================
// MAIN PAGE COMPONENT (Server Component)
// =====================================

export default function CetakCanvasPage() {
  return (
    <>
      {/* Product Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Organization Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />

      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Beranda",
                item: "https://ssfoto.co.id",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Layanan",
                item: "https://ssfoto.co.id/layanan",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "Cetak Kanvas Premium",
                item: "https://ssfoto.co.id/layanan/cetak-canvas",
              },
            ],
          }),
        }}
      />

      {/* Page Content (Client Component with interactivity) */}
      <CetakCanvasContent />
    </>
  );
}


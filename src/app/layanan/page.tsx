import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Camera,
  Frame,
  Image as ImageIcon,
  Users,
  Clock,
  Award,
  Shield,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Star,
  Zap,
} from "lucide-react";

// ============================================================================
// SEO METADATA
// ============================================================================
export const metadata: Metadata = {
  title: "Layanan Cetak Foto & Studio Professional - SS Foto Digital Lab",
  description:
    "Daftar harga cetak pas foto kilat, cetak foto kanvas, frame custom, dan foto studio. Kualitas lab tahan 100 tahun. Tersedia di 5 cabang.",
  keywords:
    "cetak foto, pas foto, foto visa, cetak kanvas, frame foto, foto studio, cetak foto lab, harga cetak foto",
  alternates: {
    canonical: "/layanan",
  },
  openGraph: {
    title: "Layanan Cetak Foto & Studio Professional - SS Foto",
    description:
      "Daftar harga cetak pas foto kilat, cetak foto kanvas, frame custom, dan foto studio. Kualitas lab tahan 100 tahun.",
    type: "website",
    url: "/layanan",
  },
};

// ============================================================================
// PRODUCT DATA
// ============================================================================
const products = [
  {
    id: "pas-foto",
    name: "Pas Foto & Visa",
    description:
      "Standar kedutaan & CPNS/BUMN. Ganti background, retouch kulit natural, siap ditunggu.",
    price: "Mulai Rp 35.000",
    tag: "Paling Laris",
    tagColor: "bg-[#ea2423] text-white",
    icon: Camera,
    image: "/images/products/layanan-pas-foto.jpg",
    features: ["Siap 1 Jam", "Standar Internasional", "Background Custom"],
    priority: true,
  },
  {
    id: "cetak-canvas",
    name: "Premium Canvas",
    description:
      "Ubah foto HP menjadi karya seni galeri. Kanvas asli dengan bingkai kayu premium. Garansi 100 tahun.",
    price: "Mulai Rp 250.000",
    tag: "Premium",
    tagColor: "bg-amber-500 text-white",
    icon: Frame,
    image:
      "/images/products/layanan-cetak-canvas.jpg",
    features: ["Kanvas Asli", "Garansi 100 Tahun", "Tahan Pudar"],
    priority: true,
  },
  {
    id: "foto-studio",
    name: "Foto Studio Keluarga",
    description:
      "Abadikan momen wisuda, maternity, atau keluarga besar di studio kami yang nyaman.",
    price: "Mulai Rp 500.000",
    tag: null,
    tagColor: "",
    icon: Users,
    image:
      "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?auto=format&fit=crop&q=80&w=800",
    features: ["Studio Profesional", "Makeup Ready", "Cetak Langsung"],
    priority: false,
  },
];

// ============================================================================
// USP DATA
// ============================================================================
const usps = [
  {
    icon: Shield,
    title: "Garansi Cetak Ulang",
    desc: "Tidak puas? Kami cetak ulang gratis.",
  },
  {
    icon: Clock,
    title: "Siap Ditunggu",
    desc: "Pas foto selesai dalam 1 jam.",
  },
  {
    icon: Award,
    title: "Tahan 100 Tahun",
    desc: "Kertas Fujifilm lab asli.",
  },
  {
    icon: Sparkles,
    title: "Retouch Natural",
    desc: "Edit kulit tanpa terlihat fake.",
  },
];

// ============================================================================
// PRODUCT CARD COMPONENT
// ============================================================================
function ProductCard({ product }: { product: (typeof products)[0] }) {
  const IconComponent = product.icon;

  return (
    <article
      className={`group relative bg-white rounded-3xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${
        product.priority ? "md:col-span-1 lg:row-span-1" : ""
      }`}
    >
      {/* Tag Badge */}
      {product.tag && (
        <div
          className={`absolute top-4 left-4 z-10 px-3 py-1.5 ${product.tagColor} text-xs font-bold rounded-full flex items-center gap-1.5 shadow-lg`}
        >
          {product.tag === "Paling Laris" && (
            <Zap className="w-3.5 h-3.5 fill-current" />
          )}
          {product.tag === "Rekomendasi" && (
            <Star className="w-3.5 h-3.5 fill-current" />
          )}
          {product.tag}
        </div>
      )}

      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Icon Badge */}
        <div className="absolute bottom-4 left-4 w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg">
          <IconComponent className="w-6 h-6 text-[#ea2423]" />
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title & Price */}
        <div className="flex items-start justify-between gap-4 mb-3">
          <h2 className="font-serif text-xl font-bold text-gray-900 group-hover:text-[#ea2423] transition-colors">
            {product.name}
          </h2>
          <span className="text-[#ea2423] font-bold text-sm whitespace-nowrap bg-red-50 px-3 py-1 rounded-full">
            {product.price}
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          {product.description}
        </p>

        {/* Features */}
        <div className="flex flex-wrap gap-2 mb-5">
          {product.features.map((feature) => (
            <span
              key={feature}
              className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-50 text-gray-600 text-xs font-medium rounded-lg"
            >
              <CheckCircle2 className="w-3 h-3 text-green-500" />
              {feature}
            </span>
          ))}
        </div>

        {/* CTA Button */}
        <Link
          href={`/layanan/${product.id}`}
          className="inline-flex items-center gap-2 w-full justify-center px-5 py-3 bg-gray-900 text-white font-semibold rounded-xl hover:bg-[#ea2423] transition-all duration-300 group/btn"
        >
          Lihat Detail
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>
    </article>
  );
}

// ============================================================================
// PRIORITY PRODUCT CARD (Larger)
// ============================================================================
function PriorityProductCard({ product }: { product: (typeof products)[0] }) {
  const IconComponent = product.icon;

  return (
    <article className="group relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500">
      {/* Tag Badge */}
      {product.tag && (
        <div
          className={`absolute top-6 left-6 z-10 px-4 py-2 ${product.tagColor} text-sm font-bold rounded-full flex items-center gap-2 shadow-lg`}
        >
          {product.tag === "Paling Laris" && (
            <Zap className="w-4 h-4 fill-current" />
          )}
          {product.tag === "Rekomendasi" && (
            <Star className="w-4 h-4 fill-current" />
          )}
          {product.tag}
        </div>
      )}

      <div className="grid md:grid-cols-2">
        {/* Image */}
        <div className="relative aspect-[4/3] md:aspect-auto overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-gray-900/40 to-transparent md:bg-gradient-to-r" />
        </div>

        {/* Content */}
        <div className="relative p-8 lg:p-10 flex flex-col justify-center">
          {/* Icon */}
          <div className="w-16 h-16 bg-[#ea2423] rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-red-500/30">
            <IconComponent className="w-8 h-8 text-white" />
          </div>

          {/* Title */}
          <h2 className="font-serif text-2xl lg:text-3xl font-bold text-white mb-3">
            {product.name}
          </h2>

          {/* Price */}
          <p className="text-[#ea2423] font-bold text-xl mb-4">
            {product.price}
          </p>

          {/* Description */}
          <p className="text-gray-300 leading-relaxed mb-6">
            {product.description}
          </p>

          {/* Features */}
          <div className="flex flex-wrap gap-3 mb-8">
            {product.features.map((feature) => (
              <span
                key={feature}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 text-white text-sm font-medium rounded-lg backdrop-blur-sm"
              >
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                {feature}
              </span>
            ))}
          </div>

          {/* CTA Button */}
          <Link
            href={`/layanan/${product.id}`}
            className="inline-flex items-center gap-2 w-fit px-8 py-4 bg-[#ea2423] text-white font-semibold rounded-full hover:bg-[#c91f1e] transition-all duration-300 shadow-lg shadow-red-500/30 hover:shadow-red-500/50 group/btn"
          >
            Lihat Detail & Harga
            <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </article>
  );
}

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================
export default function LayananPage() {
  const priorityProducts = products.filter((p) => p.priority);
  const regularProducts = products.filter((p) => !p.priority);

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-50 via-white to-red-50/30 overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-20 right-10 w-72 h-72 bg-red-100/40 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-amber-100/30 rounded-full blur-3xl" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
              <Link href="/" className="hover:text-[#ea2423] transition-colors">
                Beranda
              </Link>
              <span>/</span>
              <span className="text-gray-900 font-medium">Layanan</span>
            </nav>

            {/* Header Content */}
            <div className="max-w-3xl">
              <span className="inline-block px-4 py-1.5 bg-red-50 text-[#ea2423] text-sm font-semibold rounded-full mb-6">
                Katalog Produk
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Layanan <span className="text-[#ea2423]">Kami</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
                Solusi cetak foto profesional untuk kebutuhan administrasi
                hingga dekorasi rumah. Semua dikerjakan dengan mesin lab
                berkualitas tinggi.
              </p>
            </div>
          </div>
        </section>

        {/* USP Bar */}
        <section className="bg-gray-900 py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {usps.map((usp, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#ea2423]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <usp.icon className="w-5 h-5 text-[#ea2423]" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">
                      {usp.title}
                    </p>
                    <p className="text-gray-400 text-xs">{usp.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Priority Products */}
        <section className="py-16 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 bg-red-50 text-[#ea2423] text-sm font-semibold rounded-full mb-4">
                Layanan Unggulan
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900">
                Paling Banyak Dipesan
              </h2>
            </div>

            <div className="space-y-8">
              {priorityProducts.map((product) => (
                <PriorityProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Regular Products Grid */}
        <section className="py-16 lg:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 bg-red-50 text-[#ea2423] text-sm font-semibold rounded-full mb-4">
                Layanan Lainnya
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900">
                Semua Kebutuhan Foto Anda
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-20 bg-gradient-to-br from-[#ea2423] to-[#c91f1e] text-white relative overflow-hidden">
          {/* Decorative */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-black/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Butuh Bantuan Memilih?
            </h2>
            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
              Tim kami siap membantu konsultasi gratis untuk kebutuhan cetak
              foto Anda. Hubungi kami sekarang!
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://wa.me/6281936444486?text=Halo%20SS%20Foto,%20saya%20ingin%20bertanya%20tentang%20layanan%20cetak%20foto"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-10 py-4 bg-white text-[#ea2423] font-bold rounded-full hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:scale-105 text-lg"
              >
                Chat WhatsApp
                <ArrowRight className="w-5 h-5" />
              </a>
              <Link
                href="/lokasi"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/50 text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-300"
              >
                Kunjungi Toko
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center justify-center gap-8 mt-12 text-white/70 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                <span>Konsultasi Gratis</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                <span>Tanpa Minimum Order</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                <span>5 Cabang Siap Melayani</span>
              </div>
            </div>
          </div>
        </section>

        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              name: "Layanan Cetak Foto & Studio - SS Foto",
              description:
                "Daftar lengkap layanan cetak foto profesional, pas foto, dan studio di SS Foto Digital Lab",
              url: "https://ssfoto.co.id/layanan",
              numberOfItems: 3,
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  item: {
                    "@type": "Service",
                    name: "Cetak Pas Foto Kilat & Visa",
                    description:
                      "Layanan cetak pas foto standar kedutaan, CPNS, dan BUMN. Ganti background, retouch kulit natural. Siap ditunggu 1 jam.",
                    provider: {
                      "@type": "LocalBusiness",
                      name: "SS Foto Digital Lab",
                      url: "https://ssfoto.co.id",
                      telephone: "+6281936444486",
                      address: {
                        "@type": "PostalAddress",
                        addressLocality: "Jakarta",
                        addressCountry: "ID",
                      },
                    },
                    serviceType: "Pas Foto",
                    areaServed: "Jakarta, Bekasi, Bogor",
                    offers: {
                      "@type": "Offer",
                      price: "35000",
                      priceCurrency: "IDR",
                      availability: "https://schema.org/InStock",
                      priceValidUntil: "2025-12-31",
                      url: "https://ssfoto.co.id/layanan/pas-foto",
                    },
                  },
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  item: {
                    "@type": "Service",
                    name: "Cetak Foto Kanvas & Wall Decor Premium",
                    description:
                      "Hiasan dinding premium dengan bahan kanvas asli atau bingkai minimalis dari workshop sendiri. Custom ukuran tersedia.",
                    provider: {
                      "@type": "LocalBusiness",
                      name: "SS Foto Digital Lab",
                    },
                    serviceType: "Wall Decor",
                    offers: {
                      "@type": "Offer",
                      price: "150000",
                      priceCurrency: "IDR",
                      availability: "https://schema.org/InStock",
                      priceValidUntil: "2025-12-31",
                      url: "https://ssfoto.co.id/layanan/wall-decor",
                    },
                  },
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  item: {
                    "@type": "Service",
                    name: "Cetak Foto Lab 4R - 10R",
                    description:
                      "Cetak foto dengan mesin Lab Kimia (Silver Halide). Tahan air dan pudar hingga 100 tahun. Bukan inkjet biasa.",
                    provider: {
                      "@type": "LocalBusiness",
                      name: "SS Foto Digital Lab",
                    },
                    serviceType: "Photo Printing",
                    offers: {
                      "@type": "Offer",
                      price: "3000",
                      priceCurrency: "IDR",
                      availability: "https://schema.org/InStock",
                      priceValidUntil: "2025-12-31",
                      url: "https://ssfoto.co.id/layanan/cetak-foto",
                    },
                  },
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  item: {
                    "@type": "Service",
                    name: "Foto Studio Keluarga Profesional",
                    description:
                      "Sesi foto studio untuk wisuda, maternity, dan keluarga besar. Dilengkapi makeup ready dan cetak langsung.",
                    provider: {
                      "@type": "LocalBusiness",
                      name: "SS Foto Digital Lab",
                    },
                    serviceType: "Photography Studio",
                    offers: {
                      "@type": "Offer",
                      price: "500000",
                      priceCurrency: "IDR",
                      availability: "https://schema.org/PreOrder",
                      priceValidUntil: "2025-12-31",
                      url: "https://ssfoto.co.id/layanan/foto-studio",
                    },
                  },
                },
              ],
            }),
          }}
        />
    </>
  );
}


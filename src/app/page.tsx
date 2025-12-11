import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Camera,
  Clock,
  Shield,
  Palette,
  Award,
  Upload,
  MapPin,
  CheckCircle2,
  ArrowRight,
  Smartphone,
  Store,
  Package,
  Heart,
  Star,
  Frame,
  X,
} from "lucide-react";

// ============================================================================
// SEO METADATA
// ============================================================================
export const metadata: Metadata = {
  title: "SS Foto Digital Lab - Studio & Cetak Foto Profesional Jakarta",
  description:
    "Jasa cetak foto kualitas lab (tahan 100 tahun), pas foto kilat, studio keluarga, dan photobook. Pesan online, ambil di 5 cabang (Rawamangun, Bekasi, Bogor, dll).",
  keywords: [
    "Cetak foto jakarta",
    "Studio foto terdekat",
    "Lab foto profesional",
    "Cetak pas foto kilat",
    "SS Foto",
    "Cetak foto lab",
    "Photo studio Jakarta",
    "Photobook premium",
  ],
  alternates: {
    canonical: "https://ssfoto.co.id",
  },
  openGraph: {
    title: "SS Foto Digital Lab - Studio & Cetak Foto Profesional Jakarta",
    description:
      "Jasa cetak foto kualitas lab (tahan 100 tahun), pas foto kilat, studio keluarga, dan photobook premium. 5 cabang siap melayani Anda.",
    type: "website",
    url: "https://ssfoto.co.id",
    siteName: "SS Foto Digital Lab",
    locale: "id_ID",
    images: [
      {
        url: "https://ssfoto.co.id/og-image.png",
        width: 1200,
        height: 630,
        alt: "SS Foto Digital Lab",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SS Foto Digital Lab - Studio & Cetak Foto Profesional Jakarta",
    description:
      "Jasa cetak foto kualitas lab (tahan 100 tahun), pas foto kilat, studio keluarga, dan photobook premium.",
    images: ["https://ssfoto.co.id/og-image.png"],
  },
};

// ============================================================================
// HERO SECTION
// ============================================================================
function HeroSection() {
  return (
    <section id="beranda" className="relative bg-gradient-to-br from-gray-50 via-white to-red-50/30 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-red-100/40 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-100/30 rounded-full blur-3xl" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Merawat Kenangan Keluarga,{" "}
                <span className="text-[#ea2423]">Semudah Sentuhan Jari.</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-xl">
                Cetak foto kualitas lab profesional. Pesan online, ambil di 5 cabang kami: 
                <strong>Rawamangun, Pondok Pinang, Jatiwaringin, Galaxy, & Bogor</strong>. 
                Warna akurat, kertas premium, hasil tahan puluhan tahun.
              </p>
            </div>

            {/* Dual CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/upload/pas-foto"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#ea2423] text-white font-semibold rounded-full hover:bg-[#c91f1e] transition-all duration-300 shadow-xl shadow-red-500/30 hover:shadow-red-500/50 hover:scale-105"
              >
                <Camera className="w-5 h-5" />
                Cetak Pas Foto Kilat
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/layanan"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-full hover:border-[#ea2423] hover:text-[#ea2423] transition-all duration-300 hover:scale-105"
              >
                <Frame className="w-5 h-5" />
                Hias Dinding Rumah
              </Link>
            </div>

            {/* Trust Badge */}
            <div className="flex flex-wrap items-center gap-6 pt-4">
              <div className="flex items-center gap-2 text-gray-600">
                <Award className="w-5 h-5 text-[#ea2423]" />
                <span className="font-medium">Melayani sejak 1986</span>
              </div>
              <div className="w-px h-6 bg-gray-300 hidden sm:block" />
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-5 h-5 text-[#ea2423]" />
                <span className="font-medium">5 Cabang Fisik</span>
              </div>
              <div className="w-px h-6 bg-gray-300 hidden sm:block" />
              <div className="flex items-center gap-2 text-gray-600">
                <Heart className="w-5 h-5 text-[#ea2423]" />
                <span className="font-medium">50rb+ Keluarga</span>
              </div>
            </div>
          </div>

          {/* Right: Hero Image */}
          <div className="relative">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/images/hero/hero ssfoto.png"
                alt="Foto Keluarga Premium - SS Foto Digital Lab"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              {/* Decorative Frame */}
              <div className="absolute inset-4 border-2 border-white/50 rounded-2xl pointer-events-none" />
            </div>
            
            {/* Floating Badge */}
            <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Kualitas Terjamin</p>
                <p className="text-sm text-gray-500">Garansi cetak ulang</p>
              </div>
            </div>

            {/* Floating Rating */}
            <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl p-4">
              <div className="flex items-center gap-1 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-sm font-medium text-gray-900">4.9/5 Rating</p>
              <p className="text-xs text-gray-500">500+ Ulasan</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// WHY US SECTION - PAIN POINT SOLVER
// ============================================================================
function WhyUsSection() {
  const comparisons = [
    {
      icon: Shield,
      ssFoto: "Tahan 100 Tahun",
      ssFotoDesc: "Proses Lab Kimia (Silver Halide) dengan kertas Fujifilm asli. Lapisan pelindung UV, warna tidak pudar.",
      generic: "Pudar 5-10 Tahun",
      genericDesc: "Tinta inkjet dye-based cepat memudar terkena cahaya dan kelembaban.",
    },
    {
      icon: Palette,
      ssFoto: "Warna Kulit Natural",
      ssFotoDesc: "Kalibrasi warna profesional untuk tone kulit Asia yang akurat.",
      generic: "Warna Terlalu Terang",
      genericDesc: "Saturasi berlebihan, kulit terlihat tidak natural.",
    },
    {
      icon: Award,
      ssFoto: "Garansi Cetak Ulang",
      ssFotoDesc: "Tidak puas? Kami cetak ulang gratis tanpa pertanyaan.",
      generic: "Tidak Ada Garansi",
      genericDesc: "Sekali cetak selesai, tidak ada jaminan kualitas.",
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 bg-red-50 text-[#ea2423] text-sm font-semibold rounded-full mb-4">
            Kenapa SS Foto?
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Perbedaan yang <span className="text-[#ea2423]">Terlihat</span>
          </h2>
          <p className="text-lg text-gray-600 mb-2">
            Tidak semua cetakan foto sama. Lihat perbandingan hasil <strong>Lab Kimia (Silver Halide)</strong> vs cetakan digital printing biasa.
          </p>
          <p className="text-sm text-gray-500">
            Kami menggunakan mesin lab profesional, bukan printer inkjet rumahan.
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {comparisons.map((item, index) => (
            <div
              key={index}
              className="relative bg-gradient-to-b from-gray-50 to-white rounded-3xl p-8 border border-gray-100 hover:shadow-xl transition-shadow duration-300"
            >
              {/* Icon */}
              <div className="w-14 h-14 bg-[#ea2423] rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-red-500/20">
                <item.icon className="w-7 h-7 text-white" />
              </div>

              {/* SS Foto */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span className="font-semibold text-green-700 text-sm">SS Foto Lab</span>
                </div>
                <h3 className="font-serif text-xl font-bold text-gray-900 mb-2">{item.ssFoto}</h3>
                <p className="text-gray-600 text-sm">{item.ssFotoDesc}</p>
              </div>

              {/* Divider */}
              <div className="border-t border-dashed border-gray-200 my-6" />

              {/* Generic */}
              <div className="opacity-60">
                <div className="flex items-center gap-2 mb-2">
                  <X className="w-5 h-5 text-gray-400" />
                  <span className="font-semibold text-gray-500 text-sm">Digital Printing Biasa</span>
                </div>
                <h3 className="font-serif text-xl font-bold text-gray-500 mb-2">{item.generic}</h3>
                <p className="text-gray-400 text-sm">{item.genericDesc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// PRODUCT FOCUS GRID
// ============================================================================
function ProductGrid() {
  const products = [
    {
      title: "Pas Foto",
      description: "Untuk dokumen, visa, SKCK, dan keperluan resmi lainnya.",
      tag: "Siap 1 Jam",
      tagColor: "bg-green-100 text-green-700",
      icon: Camera,
      gradient: "from-blue-50 to-indigo-50",
    },
    {
      title: "Custom Frame & Wall Decor",
      description: "Bingkai custom dengan berbagai pilihan material premium.",
      tag: "Workshop Sendiri",
      tagColor: "bg-amber-100 text-amber-700",
      icon: Frame,
      gradient: "from-amber-50 to-orange-50",
    },
    {
      title: "Foto Studio",
      description: "Studio profesional untuk portrait, keluarga, dan produk.",
      tag: "Booking Online",
      tagColor: "bg-red-100 text-red-700",
      icon: Camera,
      gradient: "from-red-50 to-rose-50",
    },
  ];

  return (
    <section id="layanan" className="py-20 lg:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 bg-red-50 text-[#ea2423] text-sm font-semibold rounded-full mb-4">
            Layanan Kami
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Semua Kebutuhan <span className="text-[#ea2423]">Foto Anda</span>
          </h2>
          <p className="text-lg text-gray-600">
            Dari cetak cepat hingga produk premium, kami siap melayani dengan kualitas terbaik.
          </p>
        </div>

        {/* Product Grid - 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <div
              key={index}
              className={`group relative bg-gradient-to-br ${product.gradient} rounded-3xl p-6 border border-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer`}
            >
              {/* Tag */}
              <span className={`inline-block px-3 py-1 ${product.tagColor} text-xs font-semibold rounded-full mb-4`}>
                {product.tag}
              </span>

              {/* Icon */}
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-4 shadow-sm group-hover:shadow-md transition-shadow">
                <product.icon className="w-6 h-6 text-[#ea2423]" />
              </div>

              {/* Content */}
              <h3 className="font-serif text-xl font-bold text-gray-900 mb-2">{product.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{product.description}</p>

              {/* Arrow */}
              <div className="flex items-center gap-2 text-[#ea2423] font-medium text-sm group-hover:gap-3 transition-all">
                <span>Pelajari</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// O2O FLOW - HOW IT WORKS
// ============================================================================
function HowItWorks() {
  const steps = [
    {
      step: "01",
      title: "Unggah dari HP",
      description: "Pilih foto terbaik langsung dari galeri smartphone Anda.",
      icon: Smartphone,
    },
    {
      step: "02",
      title: "Pilih Ukuran & Produk",
      description: "Tentukan ukuran cetak, jenis kertas, dan produk yang diinginkan.",
      icon: Package,
    },
    {
      step: "03",
      title: "Ambil di Cabang",
      description: "Pesanan siap di cabang pilihan Anda. Cepat dan praktis!",
      icon: Store,
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 bg-red-50 text-[#ea2423] text-sm font-semibold rounded-full mb-4">
            Cara Kerja
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Semudah <span className="text-[#ea2423]">1-2-3</span>
          </h2>
          <p className="text-lg text-gray-600">
            Pesan online, ambil offline. Nikmati kemudahan layanan O2O kami.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((item, index) => (
            <div key={index} className="relative text-center">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-[60%] w-[80%] border-t-2 border-dashed border-gray-200" />
              )}

              {/* Icon Circle */}
              <div className="relative inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-red-50 to-red-100 rounded-full mb-6">
                <item.icon className="w-12 h-12 text-[#ea2423]" />
                {/* Step Number */}
                <span className="absolute -top-2 -right-2 w-10 h-10 bg-[#ea2423] text-white text-sm font-bold rounded-full flex items-center justify-center shadow-lg">
                  {item.step}
                </span>
              </div>

              {/* Content */}
              <h3 className="font-serif text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
              <p className="text-gray-600 max-w-xs mx-auto">{item.description}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Link
            href="/upload/pas-foto"
            className="inline-flex items-center gap-3 px-10 py-4 bg-[#ea2423] text-white font-semibold rounded-full hover:bg-[#c91f1e] transition-all duration-300 shadow-xl shadow-red-500/30 hover:shadow-red-500/50 hover:scale-105 text-lg"
          >
            <Upload className="w-5 h-5" />
            Mulai Unggah Sekarang
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// LOCATIONS SECTION
// ============================================================================
function LocationsSection() {
  const locations = [
    {
      name: "SS Foto Rawamangun",
      city: "Jakarta Timur",
      address: "Jl. Balai Pustaka Timur No.11, Rawamangun",
      hours: "09:00 - 21:00",
    },
    {
      name: "SS Foto Pondok Pinang",
      city: "Jakarta Selatan",
      address: "Jl. Ciputat Raya, Pondok Pinang",
      hours: "09:00 - 20:00",
    },
    {
      name: "SS Foto Jatiwaringin",
      city: "Bekasi",
      address: "Jl. Raya Jatiwaringin No.344",
      hours: "09:00 - 20:00",
    },
    {
      name: "SS Foto Galaxy",
      city: "Bekasi Selatan",
      address: "Jl. Sedap Malam No.183, Jaka Setia",
      hours: "09:00 - 20:00",
    },
    {
      name: "SS Foto Bogor",
      city: "Bogor",
      address: "Jl. Mawar No.63, Menteng",
      hours: "09:00 - 20:00",
    },
  ];

  return (
    <section id="lokasi" className="py-20 lg:py-28 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 bg-red-500/20 text-red-400 text-sm font-semibold rounded-full mb-4">
            Lokasi Kami
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            5 Cabang <span className="text-[#ea2423]">Siap Melayani</span>
          </h2>
          <p className="text-lg text-gray-400">
            Pilih cabang terdekat untuk mengambil pesanan Anda. Buka setiap hari!
          </p>
        </div>

        {/* Locations Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {locations.map((location, index) => (
            <div
              key={index}
              className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-[#ea2423]/50 transition-all duration-300 hover:transform hover:scale-105"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#ea2423]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-[#ea2423]" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">{location.name}</h3>
                  <p className="text-[#ea2423] text-xs font-medium mb-2">{location.city}</p>
                  <p className="text-gray-400 text-sm mb-2">{location.address}</p>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-500">{location.hours}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Link
            href="/lokasi"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#ea2423] text-white font-semibold rounded-full hover:bg-[#c91f1e] transition-all duration-300 shadow-xl shadow-red-500/30 hover:shadow-red-500/50 hover:scale-105"
          >
            <MapPin className="w-5 h-5" />
            Lihat Alamat Lengkap
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// CTA SECTION
// ============================================================================
function CTASection() {
  return (
    <section id="kontak" className="py-20 lg:py-28 bg-gradient-to-br from-[#ea2423] to-[#c91f1e] text-white relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-black/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Siap Mengabadikan Momen Berharga?
          </h2>
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Unggah foto pertama Anda hari ini. Gratis konsultasi untuk pesanan pertama!
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/upload/pas-foto"
              className="inline-flex items-center gap-3 px-10 py-4 bg-white text-[#ea2423] font-bold rounded-full hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:scale-105 text-lg"
            >
              <Upload className="w-5 h-5" />
              Unggah Foto Sekarang
            </Link>
          <Link
            href="https://wa.me/628123456789"
            className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/50 text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-300"
          >
            Chat WhatsApp
          </Link>
        </div>

        {/* Trust indicators */}
        <div className="flex flex-wrap items-center justify-center gap-8 mt-12 text-white/70 text-sm">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            <span>Tanpa minimum order</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            <span>Konsultasi gratis</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            <span>Garansi kepuasan</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// MAIN PAGE EXPORT
// ============================================================================
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <WhyUsSection />
      <ProductGrid />
      <HowItWorks />
      <LocationsSection />
      <CTASection />

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Organization",
                "@id": "https://ssfoto.co.id/#organization",
                name: "SS Foto Digital Lab",
                alternateName: "SS Foto",
                url: "https://ssfoto.co.id",
                logo: {
                  "@type": "ImageObject",
                  url: "https://ssfoto.co.id/logo.png",
                  width: 600,
                  height: 60,
                },
                image: "https://ssfoto.co.id/og-image.png",
                description:
                  "Studio foto profesional dan digital lab terpercaya sejak 1986. Melayani cetak foto berkualitas tinggi dengan teknologi lab kimia Silver Halide.",
                foundingDate: "1986",
                slogan: "Menjaga Memori Keluarga Indonesia Sejak 1986",
                telephone: "+6281936444486",
                email: "info@ssfoto.id",
                address: {
                  "@type": "PostalAddress",
                  streetAddress:
                    "Jl. Balai Pustaka Timur No.11, RT.4/RW.11, Rawamangun",
                  addressLocality: "Jakarta Timur",
                  addressRegion: "DKI Jakarta",
                  postalCode: "13220",
                  addressCountry: "ID",
                },
                areaServed: [
                  {
                    "@type": "City",
                    name: "Jakarta",
                  },
                  {
                    "@type": "City",
                    name: "Bekasi",
                  },
                  {
                    "@type": "City",
                    name: "Bogor",
                  },
                ],
                sameAs: [
                  "https://www.instagram.com/ssfoto",
                  "https://www.facebook.com/ssfoto",
                ],
                contactPoint: {
                  "@type": "ContactPoint",
                  telephone: "+6281936444486",
                  contactType: "customer service",
                  areaServed: "ID",
                  availableLanguage: ["Indonesian"],
                  contactOption: "TollFree",
                },
                aggregateRating: {
                  "@type": "AggregateRating",
                  ratingValue: "4.9",
                  reviewCount: "500",
                  bestRating: "5",
                  worstRating: "1",
                },
              },
              {
                "@type": "WebSite",
                "@id": "https://ssfoto.co.id/#website",
                url: "https://ssfoto.co.id",
                name: "SS Foto Official Website",
                description:
                  "Website resmi SS Foto Digital Lab untuk layanan cetak foto profesional, pas foto, photobook, dan studio keluarga.",
                publisher: {
                  "@id": "https://ssfoto.co.id/#organization",
                },
                potentialAction: {
                  "@type": "SearchAction",
                  target: {
                    "@type": "EntryPoint",
                    urlTemplate: "https://ssfoto.co.id/search?q={search_term_string}",
                  },
                  "query-input": "required name=search_term_string",
                },
                inLanguage: "id-ID",
              },
            ],
          }),
        }}
      />
    </>
  );
}

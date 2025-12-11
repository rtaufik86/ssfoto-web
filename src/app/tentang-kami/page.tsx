import type { Metadata } from "next";
import Link from "next/link";
import {
  Award,
  Heart,
  Shield,
  Users,
  MapPin,
  Clock,
  Sparkles,
  Camera,
  CheckCircle2,
  ArrowRight,
  Calendar,
  Target,
  Lightbulb,
} from "lucide-react";

// ============================================================================
// SEO METADATA
// ============================================================================
export const metadata: Metadata = {
  title: "Tentang SS Foto - Lab Foto Profesional Sejak 1986",
  description:
    "Mengenal perjalanan SS Foto melayani keluarga Indonesia selama lebih dari 30 tahun. Kualitas lab kimia asli (Silver Halide), bukan digital printing biasa.",
  keywords:
    "ss foto, tentang ss foto, lab foto profesional, cetak foto sejak 1986, silver halide, foto lab jakarta",
  alternates: {
    canonical: "/tentang-kami",
  },
  openGraph: {
    title: "Tentang SS Foto - Lab Foto Profesional Sejak 1986",
    description:
      "Mengenal perjalanan SS Foto melayani keluarga Indonesia selama lebih dari 30 tahun dengan teknologi lab kimia asli.",
    type: "website",
    url: "/tentang-kami",
    siteName: "SS Foto Digital Lab",
    locale: "id_ID",
  },
};

// ============================================================================
// TIMELINE DATA
// ============================================================================
const timeline = [
  {
    year: "1986",
    title: "Lahirnya SS Foto",
    description:
      "Memulai usaha cetak foto lab kimia pertama di Jakarta Timur dengan komitmen memberikan kualitas terbaik.",
    icon: Calendar,
  },
  {
    year: "2000",
    title: "Ekspansi Cabang",
    description:
      "Membuka cabang kedua dan ketiga di Jakarta Selatan untuk menjangkau lebih banyak keluarga Indonesia.",
    icon: MapPin,
  },
  {
    year: "2015",
    title: "Era Digital",
    description:
      "Mengintegrasikan teknologi digital tanpa meninggalkan kualitas lab kimia tradisional yang terpercaya.",
    icon: Sparkles,
  },
  {
    year: "2024",
    title: "5 Cabang Aktif",
    description:
      "Melayani Jabodetabek dengan 5 cabang strategis, tetap konsisten dengan standar kualitas sejak awal.",
    icon: Award,
  },
];

// ============================================================================
// VALUES DATA
// ============================================================================
const values = [
  {
    icon: Heart,
    title: "Jaga Kenangan, Bukan Profit",
    description:
      "Kami percaya foto keluarga adalah aset berharga. Karena itu, kami tidak pernah kompromi dengan kualitas demi margin lebih besar.",
    color: "text-red-500",
    bgColor: "bg-red-50",
  },
  {
    icon: Shield,
    title: "Kualitas Lab Asli",
    description:
      "Menggunakan mesin lab kimia Silver Halide, bukan inkjet atau laserjet biasa. Hasil cetak tahan hingga 100 tahun.",
    color: "text-blue-500",
    bgColor: "bg-blue-50",
  },
  {
    icon: Users,
    title: "Melayani dengan Hati",
    description:
      "Setiap pelanggan diperlakukan seperti keluarga sendiri. Tim kami terlatih untuk memberikan konsultasi terbaik.",
    color: "text-amber-500",
    bgColor: "bg-amber-50",
  },
  {
    icon: Target,
    title: "Transparansi Harga",
    description:
      "Tidak ada biaya tersembunyi. Harga yang Anda lihat adalah harga final. Garansi cetak ulang jika tidak puas.",
    color: "text-green-500",
    bgColor: "bg-green-50",
  },
];

// ============================================================================
// STATS DATA
// ============================================================================
const stats = [
  { number: "38+", label: "Tahun Pengalaman", icon: Calendar },
  { number: "50rb+", label: "Keluarga Dilayani", icon: Users },
  { number: "5", label: "Cabang Aktif", icon: MapPin },
  { number: "100%", label: "Garansi Kepuasan", icon: Shield },
];

// ============================================================================
// WHY LAB PRINT DATA
// ============================================================================
const whyLabPrint = [
  {
    title: "Mesin Lab Kimia (Silver Halide)",
    description: "Proses cetak menggunakan reaksi kimia pada kertas fotosensitif.",
    benefit: "Tahan air, tidak mudah pudar, warna stabil hingga 100 tahun.",
  },
  {
    title: "Kertas Fujifilm Asli",
    description: "Kertas premium dengan coating anti UV dan scratch.",
    benefit: "Permukaan halus, glossy sempurna, tekstur profesional.",
  },
  {
    title: "Kalibrasi Warna Profesional",
    description: "Setiap mesin dikalibrasi rutin untuk akurasi warna.",
    benefit: "Tone kulit natural, warna sesuai file asli, tidak oversaturated.",
  },
];

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================
export default function TentangKamiPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#ea2423]/20 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#ea2423]/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
            <div className="max-w-4xl mx-auto text-center">
              {/* Breadcrumb */}
              <nav className="flex items-center justify-center gap-2 text-sm text-gray-400 mb-8">
                <Link
                  href="/"
                  className="hover:text-white transition-colors"
                >
                  Beranda
                </Link>
                <span>/</span>
                <span className="text-white">Tentang Kami</span>
              </nav>

              {/* Hero Content */}
              <div className="mb-12">
                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight">
                  Lebih Dari Sekadar{" "}
                  <span className="text-[#ea2423]">Tukang Cetak.</span>
                </h1>
                <p className="text-xl sm:text-2xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
                  Kami adalah penjaga memori keluarga Anda sejak tahun{" "}
                  <span className="text-[#ea2423] font-semibold">1986</span>.
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all"
                  >
                    <stat.icon className="w-8 h-8 text-[#ea2423] mx-auto mb-3" />
                    <p className="text-3xl lg:text-4xl font-bold mb-1">
                      {stat.number}
                    </p>
                    <p className="text-sm text-gray-400">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-20 lg:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left: Text Content */}
              <div>
                <span className="inline-block px-4 py-1.5 bg-red-50 text-[#ea2423] text-sm font-semibold rounded-full mb-6">
                  Cerita Kami
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  Perjalanan Menjaga{" "}
                  <span className="text-[#ea2423]">Memori Indonesia</span>
                </h2>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    Dimulai dari sebuah toko kecil di Jakarta Timur pada tahun
                    1986, <strong>SS Foto</strong> lahir dengan satu misi
                    sederhana: memberikan hasil cetak foto berkualitas lab yang
                    tahan lama untuk keluarga Indonesia.
                  </p>
                  <p>
                    Saat sebagian besar kompetitor beralih ke{" "}
                    <em>digital printing</em> murah yang cepat pudar, kami
                    tetap konsisten menggunakan{" "}
                    <strong>teknologi lab kimia (Silver Halide)</strong>{" "}
                    tradisional yang sudah terbukti sejak era analog.
                  </p>
                  <p>
                    Lebih dari 3 dekade, kami telah melayani{" "}
                    <strong>50,000+ keluarga</strong> Indonesia. Dari foto
                    kenangan pernikahan, wisuda anak, hingga album keluarga
                    yang akan diwariskan ke cucu—kami bangga menjadi bagian dari
                    cerita hidup Anda.
                  </p>
                </div>

                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    href="/layanan"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#ea2423] text-white font-semibold rounded-full hover:bg-[#c91f1e] transition-all duration-300 shadow-lg shadow-red-500/30"
                  >
                    Lihat Layanan Kami
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/lokasi"
                    className="inline-flex items-center gap-2 px-6 py-3 border-2 border-gray-200 text-gray-700 font-semibold rounded-full hover:border-[#ea2423] hover:text-[#ea2423] transition-all duration-300"
                  >
                    <MapPin className="w-4 h-4" />
                    Kunjungi Toko
                  </Link>
                </div>
              </div>

              {/* Right: Image Placeholder */}
              <div className="relative">
                <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl overflow-hidden shadow-2xl">
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 p-8">
                    <Camera className="w-20 h-20 mb-4 opacity-50" />
                    <p className="text-center text-lg font-medium">
                      Foto Sejarah SS Foto
                    </p>
                    <p className="text-center text-sm opacity-75">
                      Placeholder untuk foto toko/founder
                    </p>
                  </div>
                </div>

                {/* Floating Badge */}
                <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-6 max-w-xs">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#ea2423] rounded-full flex items-center justify-center flex-shrink-0">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-lg">
                        38 Tahun
                      </p>
                      <p className="text-sm text-gray-500">
                        Melayani dengan Konsisten
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-20 lg:py-28 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="inline-block px-4 py-1.5 bg-red-50 text-[#ea2423] text-sm font-semibold rounded-full mb-4">
                Timeline
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Perjalanan <span className="text-[#ea2423]">SS Foto</span>
              </h2>
              <p className="text-gray-600">
                Dari toko kecil di Jakarta Timur hingga 5 cabang di Jabodetabek.
              </p>
            </div>

            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 hidden lg:block" />

              <div className="space-y-12">
                {timeline.map((item, index) => (
                  <div
                    key={index}
                    className={`relative flex flex-col lg:flex-row gap-8 items-center ${
                      index % 2 === 0 ? "lg:flex-row-reverse" : ""
                    }`}
                  >
                    {/* Content */}
                    <div className="lg:w-1/2">
                      <div
                        className={`bg-white rounded-2xl p-6 shadow-lg border border-gray-100 ${
                          index % 2 === 0 ? "lg:text-right" : ""
                        }`}
                      >
                        <div
                          className={`inline-flex items-center gap-2 px-3 py-1 bg-[#ea2423] text-white text-sm font-bold rounded-full mb-4`}
                        >
                          <item.icon className="w-4 h-4" />
                          {item.year}
                        </div>
                        <h3 className="font-serif text-xl font-bold text-gray-900 mb-2">
                          {item.title}
                        </h3>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                    </div>

                    {/* Center Point */}
                    <div className="hidden lg:block w-4 h-4 bg-[#ea2423] rounded-full border-4 border-white shadow-lg absolute left-1/2 transform -translate-x-1/2" />

                    {/* Spacer */}
                    <div className="lg:w-1/2" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Our Values Section */}
        <section className="py-20 lg:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="inline-block px-4 py-1.5 bg-red-50 text-[#ea2423] text-sm font-semibold rounded-full mb-4">
                Nilai Kami
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Prinsip yang <span className="text-[#ea2423]">Kami Pegang</span>
              </h2>
              <p className="text-gray-600">
                Komitmen kami untuk memberikan yang terbaik, bukan yang tercepat
                atau termurah.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 border border-gray-100 hover:shadow-xl transition-shadow duration-300"
                >
                  <div
                    className={`w-14 h-14 ${value.bgColor} rounded-2xl flex items-center justify-center mb-6`}
                  >
                    <value.icon className={`w-7 h-7 ${value.color}`} />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-gray-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Lab Print Section */}
        <section className="py-20 lg:py-28 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block px-4 py-1.5 bg-red-500/20 text-red-400 text-sm font-semibold rounded-full mb-4">
                Teknologi Kami
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                Kenapa Kami Tetap Gunakan{" "}
                <span className="text-[#ea2423]">Lab Kimia?</span>
              </h2>
              <p className="text-xl text-gray-300">
                Karena kualitas tidak bisa di-<em>hack</em> dengan cara instan.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {whyLabPrint.map((item, index) => (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all"
                >
                  <div className="w-12 h-12 bg-[#ea2423] rounded-xl flex items-center justify-center mb-6">
                    <Lightbulb className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-serif text-xl font-bold mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 mb-4 text-sm">
                    {item.description}
                  </p>
                  <div className="flex items-start gap-2 text-green-400">
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <p className="text-sm font-medium">{item.benefit}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-gray-400 mb-6">
                <strong className="text-white">
                  Inilah perbedaan Lab Print vs Digital Printing biasa.
                </strong>{" "}
                Kami tidak berkompromi.
              </p>
              <Link
                href="/layanan"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#ea2423] text-white font-semibold rounded-full hover:bg-[#c91f1e] transition-all duration-300 shadow-lg shadow-red-500/30"
              >
                Lihat Daftar Harga
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 lg:py-28 bg-gradient-to-br from-red-50 to-amber-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Siap Mempercayakan{" "}
              <span className="text-[#ea2423]">Memori Anda?</span>
            </h2>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Kunjungi cabang terdekat atau hubungi kami untuk konsultasi
              gratis. Tim kami siap membantu!
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/lokasi"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#ea2423] text-white font-bold rounded-full hover:bg-[#c91f1e] transition-all duration-300 shadow-xl hover:scale-105"
              >
                <MapPin className="w-5 h-5" />
                Lihat Lokasi Cabang
              </Link>
              <a
                href="https://wa.me/6281936444486?text=Halo%20SS%20Foto,%20saya%20ingin%20bertanya"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-full hover:border-[#ea2423] hover:text-[#ea2423] transition-all duration-300"
              >
                Chat WhatsApp
              </a>
            </div>
          </div>
        </section>

      {/* Structured Data for Organization */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "SS Foto Digital Lab",
            alternateName: "SS Foto",
            description:
              "Penyedia layanan cetak foto lab profesional dan studio keluarga terpercaya di Jabodetabek sejak 1986. Menggunakan teknologi Silver Halide untuk hasil tahan 100 tahun.",
            foundingDate: "1986",
            url: "https://ssfoto.co.id",
            logo: "https://ssfoto.co.id/logo.png",
            image: "https://ssfoto.co.id/og-image.png",
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
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+6281936444486",
              contactType: "customer service",
              areaServed: "ID",
              availableLanguage: ["Indonesian"],
              contactOption: "TollFree",
              hoursAvailable: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday",
                ],
                opens: "09:00",
                closes: "21:00",
              },
            },
            areaServed: {
              "@type": "GeoCircle",
              geoMidpoint: {
                "@type": "GeoCoordinates",
                latitude: "-6.2014817",
                longitude: "106.8831616",
              },
              geoRadius: "50000",
            },
            sameAs: [
              "https://www.instagram.com/ssfoto",
              "https://www.facebook.com/ssfoto",
            ],
            slogan: "Menjaga Memori Keluarga Indonesia Sejak 1986",
            knowsAbout: [
              "Photo Printing",
              "Lab Photography",
              "Passport Photos",
              "Photo Frames",
              "Photobooks",
              "Family Photography",
            ],
            numberOfEmployees: {
              "@type": "QuantitativeValue",
              value: 50,
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.9",
              reviewCount: "500",
            },
          }),
        }}
      />
    </>
  );
}


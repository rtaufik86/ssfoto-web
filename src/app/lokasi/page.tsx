import type { Metadata } from "next";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Clock,
  Navigation,
  ArrowRight,
  CheckCircle2,
  Star,
  Camera,
} from "lucide-react";

// ============================================================================
// SEO METADATA
// ============================================================================
export const metadata: Metadata = {
  title: "Lokasi Cabang SS Foto - Studio & Cetak Foto Terdekat",
  description: "Temukan 5 cabang SS Foto di Jakarta (Rawamangun, Pondok Pinang), Bekasi (Galaxy, Jatiwaringin), dan Bogor. Lihat alamat lengkap, jam buka, dan peta lokasi.",
  keywords: ["Cetak foto terdekat", "Studio foto Jakarta", "SS Foto Bekasi", "SS Foto Bogor", "Cetak pas foto kilat"],
  alternates: {
    canonical: "/lokasi",
  },
  openGraph: {
    title: "Lokasi Cabang SS Foto - 5 Cabang di Jakarta, Bekasi & Bogor",
    description: "Temukan cabang SS Foto terdekat: Jakarta (Rawamangun, Pondok Pinang), Bekasi (Galaxy, Jatiwaringin), dan Bogor. Buka setiap hari 09.00-21.00 WIB.",
    url: "https://ssfoto.co.id/lokasi",
    siteName: "SS Foto Digital Lab",
    locale: "id_ID",
    type: "website",
  },
};

// ============================================================================
// BRANCH DATA
// ============================================================================
const branches = [
  {
    id: "rawamangun",
    name: "SS Foto Rawamangun",
    displayName: "SS Foto Rawamangun - Pusat Cetak Digital",
    address:
      "Jl. Balai Pustaka Timur No.11, RT.4/RW.11, Rawamangun, Kec. Pulo Gadung, Kota Jakarta Timur, 13220",
    phone: "+6281936444486",
    mapUrl:
      "https://www.google.com/maps/place/SS+Foto+Rawamangun/@-6.2014817,106.8831616,17z",
    hours: "Senin - Minggu: 09.00 - 21.00 WIB",
    image:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=1000",
    featured: true,
    services: ["Cetak Foto", "Pas Foto", "Foto Studio", "Frame Custom"],
  },
  {
    id: "pondok-pinang",
    name: "SS Foto Pondok Pinang",
    displayName: "SS Foto Pondok Pinang - Cetak Foto Kilat",
    address:
      "Jl. Ciputat Raya, RT.6/RW.2, Pd. Pinang, Kec. Kebayoran Lama, Kota Jakarta Selatan, 12310",
    phone: "+6281936444486",
    mapUrl:
      "https://www.google.com/maps/place/SS+Foto+Pondok+Pinang/@-6.2668148,106.7702563,17z",
    hours: "Senin - Minggu: 09.00 - 20.00 WIB",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1000",
    featured: false,
    services: ["Cetak Foto", "Pas Foto", "Photobook"],
  },
  {
    id: "jatiwaringin",
    name: "SS Foto Jatiwaringin",
    displayName: "SS Foto Jatiwaringin - Studio Keluarga",
    address:
      "Jl. Raya Jatiwaringin No.344, RW.004, Jaticempaka, Kota Bekasi, Jawa Barat 17411",
    phone: "+6281936444486",
    mapUrl:
      "https://www.google.com/maps/place/SS+Foto+Jatiwaringin/@-6.2619307,106.9083321,17z",
    hours: "Senin - Minggu: 09.00 - 20.00 WIB",
    image:
      "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?auto=format&fit=crop&q=80&w=1000",
    featured: false,
    services: ["Cetak Foto", "Pas Foto", "Foto Studio"],
  },
  {
    id: "galaxy",
    name: "SS Foto Galaxy",
    displayName: "SS Foto Galaxy - Frame & Photobook",
    address:
      "Jl. Sedap Malam No.183, Jaka Setia, Kec. Bekasi Sel., Kota Bekasi, Jawa Barat 17147",
    phone: "+6281511029359",
    mapUrl:
      "https://www.google.com/maps/place/SS+Foto+Galaxy/@-6.2556449,106.9669859,17z",
    hours: "Senin - Minggu: 09.00 - 20.00 WIB",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&q=80&w=1000",
    featured: false,
    services: ["Cetak Foto", "Pas Foto", "Frame Custom", "Photobook"],
  },
  {
    id: "bogor",
    name: "SS Foto Bogor",
    displayName: "SS Foto Bogor - Lab Cetak Foto",
    address:
      "Jl. Mawar No.63, RT.02/RW.05, Menteng, Kec. Bogor Bar., Kota Bogor, Jawa Barat 16111",
    phone: "+6281936444486",
    mapUrl:
      "https://www.google.com/maps/place/SS+Foto+Bogor/@-6.5893142,106.7849301,17z",
    hours: "Senin - Minggu: 09.00 - 20.00 WIB",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000",
    featured: false,
    services: ["Cetak Foto", "Pas Foto", "Photobook"],
  },
];

// ============================================================================
// BRANCH CARD COMPONENT
// ============================================================================
function BranchCard({
  branch,
  index,
}: {
  branch: (typeof branches)[0];
  index: number;
}) {
  const phoneFormatted = branch.phone.replace("+62", "0");
  const whatsappLink = `https://wa.me/${branch.phone.replace("+", "")}`;

  return (
    <article
      className={`group relative bg-white rounded-3xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 ${branch.featured ? "md:col-span-2 md:row-span-1" : ""
        }`}
    >
      {/* Featured Badge */}
      {branch.featured && (
        <div className="absolute top-4 left-4 z-10 px-3 py-1.5 bg-[#ea2423] text-white text-xs font-semibold rounded-full flex items-center gap-1.5 shadow-lg">
          <Star className="w-3.5 h-3.5 fill-white" />
          Cabang Utama
        </div>
      )}

      <div
        className={`${branch.featured ? "md:flex md:flex-row" : "flex flex-col"}`}
      >
        {/* Image */}
        <div
          className={`relative overflow-hidden ${branch.featured
              ? "md:w-1/2 aspect-[4/3] md:aspect-auto"
              : "aspect-[16/10]"
            }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
            style={{ backgroundImage: `url(${branch.image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

          {/* Location Number */}
          <div className="absolute bottom-4 left-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center">
            <span className="text-lg font-bold text-gray-900">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className={`p-6 ${branch.featured ? "md:w-1/2 md:p-8" : ""}`}>
          {/* Branch Name */}
          <h2 className="font-serif text-xl lg:text-2xl font-bold text-gray-900 mb-2 group-hover:text-[#ea2423] transition-colors">
            {branch.name}
          </h2>

          {/* Address */}
          <div className="flex items-start gap-3 mb-4">
            <MapPin className="w-5 h-5 text-[#ea2423] flex-shrink-0 mt-0.5" />
            <p className="text-gray-600 text-sm leading-relaxed">
              {branch.address}
            </p>
          </div>

          {/* Hours */}
          <div className="flex items-center gap-3 mb-4">
            <Clock className="w-5 h-5 text-[#ea2423] flex-shrink-0" />
            <p className="text-gray-600 text-sm">{branch.hours}</p>
          </div>

          {/* Phone */}
          <div className="flex items-center gap-3 mb-5">
            <Phone className="w-5 h-5 text-[#ea2423] flex-shrink-0" />
            <a
              href={`tel:${branch.phone}`}
              className="text-gray-900 font-medium text-sm hover:text-[#ea2423] transition-colors"
            >
              {phoneFormatted}
            </a>
          </div>

          {/* Services Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {branch.services.map((service) => (
              <span
                key={service}
                className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full"
              >
                {service}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={branch.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#ea2423] text-white font-semibold rounded-full hover:bg-[#c91f1e] transition-all duration-300 text-sm shadow-lg shadow-red-500/20 hover:shadow-red-500/40"
            >
              <Navigation className="w-4 h-4" />
              Lihat di Maps
            </a>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 border-2 border-gray-200 text-gray-700 font-semibold rounded-full hover:border-[#ea2423] hover:text-[#ea2423] transition-all duration-300 text-sm"
            >
              <Phone className="w-4 h-4" />
              Hubungi
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================
export default function LocationsPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#ea2423]/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#ea2423]/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
              <Link href="/" className="hover:text-white transition-colors">
                Beranda
              </Link>
              <span>/</span>
              <span className="text-white">Lokasi</span>
            </nav>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Temukan Cabang{" "}
              <span className="text-[#ea2423]">SS Foto Terdekat</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-8">
              5 lokasi strategis di Jakarta siap melayani kebutuhan cetak foto
              Anda. Kunjungi cabang terdekat atau pesan online, ambil di toko!
            </p>

            {/* Quick Stats */}
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-[#ea2423]/20 rounded-xl flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-[#ea2423]" />
                </div>
                <div>
                  <p className="text-2xl font-bold">5</p>
                  <p className="text-xs text-gray-400">Cabang Aktif</p>
                </div>
              </div>
              <div className="w-px h-10 bg-gray-700" />
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-[#ea2423]/20 rounded-xl flex items-center justify-center">
                  <Clock className="w-5 h-5 text-[#ea2423]" />
                </div>
                <div>
                  <p className="text-2xl font-bold">7 Hari</p>
                  <p className="text-xs text-gray-400">Buka Setiap Hari</p>
                </div>
              </div>
              <div className="w-px h-10 bg-gray-700" />
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-[#ea2423]/20 rounded-xl flex items-center justify-center">
                  <Camera className="w-5 h-5 text-[#ea2423]" />
                </div>
                <div>
                  <p className="text-2xl font-bold">Sejak 1986</p>
                  <p className="text-xs text-gray-400">Melayani Indonesia</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Branches Grid */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-block px-4 py-1.5 bg-red-50 text-[#ea2423] text-sm font-semibold rounded-full mb-4">
              Semua Lokasi
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Pilih Cabang Terdekat Anda
            </h2>
            <p className="text-gray-600">
              Setiap cabang dilengkapi dengan peralatan cetak profesional dan
              staff yang siap membantu.
            </p>
          </div>

          {/* Branches Grid */}
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {branches.map((branch, index) => (
              <BranchCard key={branch.id} branch={branch} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Tersedia di Semua Cabang
            </h2>
            <p className="text-gray-600">
              Nikmati layanan lengkap dan fasilitas modern di setiap lokasi.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Parkir Luas",
                desc: "Area parkir nyaman untuk mobil dan motor",
              },
              {
                title: "AC & Ruang Tunggu",
                desc: "Ruangan ber-AC dengan tempat duduk nyaman",
              },
              {
                title: "Cetak Express",
                desc: "Layanan cetak kilat tersedia",
              },
              {
                title: "Pembayaran Digital",
                desc: "QRIS, transfer, dan kartu kredit/debit",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-6 bg-gray-50 rounded-2xl"
              >
                <CheckCircle2 className="w-6 h-6 text-[#ea2423] flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-[#ea2423] to-[#c91f1e] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-4">
            Tidak Sempat ke Toko?
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Upload foto online, kami siapkan pesanan Anda. Tinggal ambil di
            cabang pilihan!
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/#upload"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#ea2423] font-bold rounded-full hover:bg-gray-100 transition-all duration-300 shadow-xl"
            >
              Upload Foto Sekarang
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="https://wa.me/6281936444486"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/50 text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-300"
            >
              <Phone className="w-5 h-5" />
              Tanya via WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "SS Foto",
            url: "https://ssfoto.id",
            logo: "https://ssfoto.id/logo.png",
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+62-819-3644-4486",
              contactType: "customer service",
            },
            sameAs: [],
            location: branches.map((branch) => ({
              "@type": "LocalBusiness",
              name: branch.displayName,
              address: {
                "@type": "PostalAddress",
                streetAddress: branch.address,
                addressLocality: "Jakarta",
                addressCountry: "ID",
              },
              telephone: branch.phone,
              openingHours: "Mo-Su 09:00-21:00",
              image: branch.image,
              url: branch.mapUrl,
            })),
          }),
        }}
      />
    </>
  );
}


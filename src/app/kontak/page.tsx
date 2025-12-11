import type { Metadata } from "next";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  HeadphonesIcon,
  Building2,
  User,
  AlertCircle,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

// ============================================================================
// SEO METADATA
// ============================================================================
export const metadata: Metadata = {
  title: "Hubungi SS Foto - Layanan Pelanggan & Kerjasama",
  description:
    "Hubungi tim SS Foto untuk pertanyaan seputar cetak foto, keluhan pelanggan, atau penawaran kerjasama B2B. Respon cepat via WhatsApp.",
  keywords:
    "kontak ss foto, hubungi ss foto, customer service, whatsapp ss foto, email ss foto, lokasi ss foto",
  alternates: {
    canonical: "/kontak",
  },
  openGraph: {
    title: "Hubungi SS Foto - Layanan Pelanggan & Kerjasama",
    description:
      "Hubungi tim SS Foto untuk pertanyaan seputar cetak foto, keluhan pelanggan, atau kerjasama B2B. Respon cepat via WhatsApp.",
    type: "website",
    url: "/kontak",
    siteName: "SS Foto Digital Lab",
    locale: "id_ID",
  },
};

// ============================================================================
// CONTACT METHODS DATA
// ============================================================================
const contactMethods = [
  {
    icon: MessageCircle,
    title: "WhatsApp (Paling Cepat)",
    description: "Chat langsung dengan tim kami. Respon dalam hitungan menit.",
    value: "+62 819-3644-4486",
    link: "https://wa.me/6281936444486?text=Halo%20SS%20Foto,%20saya%20ingin%20bertanya",
    cta: "Chat Sekarang",
    color: "text-green-500",
    bgColor: "bg-green-50",
    featured: true,
  },
  {
    icon: Phone,
    title: "Telepon",
    description: "Hubungi langsung untuk konsultasi atau informasi mendesak.",
    value: "+62 819-3644-4486",
    link: "tel:+6281936444486",
    cta: "Telepon Kami",
    color: "text-blue-500",
    bgColor: "bg-blue-50",
    featured: false,
  },
  {
    icon: Mail,
    title: "Email",
    description: "Kirim pertanyaan detail atau penawaran kerjasama B2B.",
    value: "info@ssfoto.id",
    link: "mailto:info@ssfoto.id",
    cta: "Kirim Email",
    color: "text-purple-500",
    bgColor: "bg-purple-50",
    featured: false,
  },
];

// ============================================================================
// CONTACT TOPICS DATA
// ============================================================================
const contactTopics = [
  {
    icon: HeadphonesIcon,
    title: "Layanan Pelanggan",
    description:
      "Pertanyaan tentang produk, harga, cara pemesanan, atau status order.",
    whatsappText:
      "Halo SS Foto, saya ingin bertanya tentang layanan dan produk",
  },
  {
    icon: AlertCircle,
    title: "Keluhan & Masukan",
    description: "Laporkan keluhan atau berikan saran untuk perbaikan layanan.",
    whatsappText:
      "Halo SS Foto, saya ingin menyampaikan keluhan/masukan tentang",
  },
  {
    icon: Building2,
    title: "Kerjasama B2B",
    description:
      "Penawaran kerjasama korporat, event, atau partnership bisnis.",
    whatsappText: "Halo SS Foto, saya ingin membahas kerjasama B2B untuk",
  },
  {
    icon: User,
    title: "Karir & Lowongan",
    description: "Informasi lowongan pekerjaan dan lamaran kerja.",
    whatsappText: "Halo SS Foto, saya tertarik dengan lowongan pekerjaan",
  },
];

// ============================================================================
// BRANCH LOCATIONS (Simplified)
// ============================================================================
const locations = [
  {
    name: "SS Foto Rawamangun",
    address: "Jl. Balai Pustaka Timur No.11, Jakarta Timur",
    phone: "+62 819-3644-4486",
    hours: "09.00 - 21.00 WIB",
    mapUrl:
      "https://www.google.com/maps/place/SS+Foto+Rawamangun/@-6.2014817,106.8831616,17z",
  },
  {
    name: "SS Foto Pondok Pinang",
    address: "Jl. Ciputat Raya, Jakarta Selatan",
    phone: "+62 819-3644-4486",
    hours: "09.00 - 20.00 WIB",
    mapUrl:
      "https://www.google.com/maps/place/SS+Foto+Pondok+Pinang/@-6.2668148,106.7702563,17z",
  },
  {
    name: "SS Foto Jatiwaringin",
    address: "Jl. Raya Jatiwaringin No.344, Bekasi",
    phone: "+62 819-3644-4486",
    hours: "09.00 - 20.00 WIB",
    mapUrl:
      "https://www.google.com/maps/place/SS+Foto+Jatiwaringin/@-6.2619307,106.9083321,17z",
  },
];

// ============================================================================
// FAQ DATA
// ============================================================================
const faqs = [
  {
    question: "Berapa lama proses cetak foto?",
    answer:
      "Pas foto siap dalam 1 jam. Cetak foto reguler 4R-8R bisa ditunggu (15-30 menit). Untuk produk premium seperti kanvas atau photobook, perlu 3-7 hari kerja.",
  },
  {
    question: "Apakah bisa pesan online?",
    answer:
      "Ya! Upload foto via WhatsApp, pilih produk dan ukuran, lalu ambil di cabang terdekat. Kami juga sediakan layanan antar untuk area tertentu (minimal order berlaku).",
  },
  {
    question: "Bagaimana cara komplain jika hasil tidak memuaskan?",
    answer:
      "Hubungi kami langsung via WhatsApp/telepon dengan menyertakan foto bukti. Kami akan cetak ulang GRATIS jika memang ada kesalahan dari pihak kami. Garansi kepuasan 100%.",
  },
  {
    question: "Apakah menerima pesanan untuk event/korporat?",
    answer:
      "Tentu! Kami melayani kerjasama B2B untuk event, wedding, perusahaan, dan sekolah. Hubungi kami untuk penawaran harga khusus dan diskon volume.",
  },
];

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================
export default function KontakPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#ea2423]/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#ea2423]/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
            <div className="max-w-3xl mx-auto text-center">
              {/* Breadcrumb */}
              <nav className="flex items-center justify-center gap-2 text-sm text-gray-400 mb-8">
                <Link
                  href="/"
                  className="hover:text-white transition-colors"
                >
                  Beranda
                </Link>
                <span>/</span>
                <span className="text-white">Kontak</span>
              </nav>

              {/* Hero Content */}
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                Kami <span className="text-[#ea2423]">Siap Membantu</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-8">
                Punya pertanyaan tentang layanan cetak foto? Butuh bantuan dengan
                pesanan? Atau ingin bekerjasama dengan kami? Tim SS Foto siap
                melayani Anda!
              </p>

              {/* Quick Stats */}
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                  <span>Respon Cepat</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                  <span>Konsultasi Gratis</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                  <span>7 Hari Seminggu</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Methods Section */}
        <section className="py-16 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="inline-block px-4 py-1.5 bg-red-50 text-[#ea2423] text-sm font-semibold rounded-full mb-4">
                Hubungi Kami
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Pilih Cara <span className="text-[#ea2423]">Terbaik</span> untuk
                Anda
              </h2>
              <p className="text-gray-600">
                Kami tersedia di berbagai channel untuk kemudahan Anda.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
              {contactMethods.map((method, index) => (
                <div
                  key={index}
                  className={`relative bg-white rounded-3xl p-8 border-2 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${
                    method.featured
                      ? "border-[#ea2423] shadow-xl shadow-red-500/10"
                      : "border-gray-100 hover:border-[#ea2423]"
                  }`}
                >
                  {method.featured && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-[#ea2423] text-white text-xs font-bold rounded-full">
                      Rekomendasi
                    </div>
                  )}

                  <div
                    className={`w-14 h-14 ${method.bgColor} rounded-2xl flex items-center justify-center mb-6`}
                  >
                    <method.icon className={`w-7 h-7 ${method.color}`} />
                  </div>

                  <h3 className="font-serif text-xl font-bold text-gray-900 mb-2">
                    {method.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {method.description}
                  </p>

                  <p className="font-mono text-gray-900 font-semibold mb-6">
                    {method.value}
                  </p>

                  <a
                    href={method.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center justify-center gap-2 w-full px-6 py-3 font-semibold rounded-full transition-all duration-300 ${
                      method.featured
                        ? "bg-[#ea2423] text-white hover:bg-[#c91f1e] shadow-lg shadow-red-500/30"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {method.cta}
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Topics Section */}
        <section className="py-16 lg:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="inline-block px-4 py-1.5 bg-red-50 text-[#ea2423] text-sm font-semibold rounded-full mb-4">
                Topik Pertanyaan
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Apa yang Bisa <span className="text-[#ea2423]">Kami Bantu?</span>
              </h2>
              <p className="text-gray-600">
                Pilih topik sesuai kebutuhan Anda untuk respon lebih cepat.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {contactTopics.map((topic, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mb-4">
                    <topic.icon className="w-6 h-6 text-[#ea2423]" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {topic.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {topic.description}
                  </p>
                  <a
                    href={`https://wa.me/6281936444486?text=${encodeURIComponent(
                      topic.whatsappText
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[#ea2423] font-medium text-sm hover:gap-3 transition-all"
                  >
                    Chat via WA
                    <Send className="w-4 h-4" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Business Hours & Locations */}
        <section className="py-16 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
              {/* Business Hours */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-[#ea2423] rounded-xl flex items-center justify-center">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="font-serif text-2xl font-bold text-gray-900">
                    Jam Operasional
                  </h2>
                </div>

                <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-100">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-3 border-b border-gray-200">
                      <span className="text-gray-600 font-medium">
                        Senin - Minggu
                      </span>
                      <span className="text-gray-900 font-bold">
                        09.00 - 21.00 WIB
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-gray-200">
                      <span className="text-gray-600 font-medium">
                        Hari Libur Nasional
                      </span>
                      <span className="text-gray-900 font-bold">Tutup</span>
                    </div>
                    <div className="flex items-center justify-between py-3">
                      <span className="text-gray-600 font-medium">
                        WhatsApp Customer Service
                      </span>
                      <span className="text-green-600 font-bold">24/7</span>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-green-50 rounded-xl border border-green-200">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-green-900 mb-1">
                          Buka Setiap Hari!
                        </p>
                        <p className="text-xs text-green-700">
                          Chat WhatsApp kami aktif 24/7 untuk pertanyaan cepat.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Locations */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-[#ea2423] rounded-xl flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="font-serif text-2xl font-bold text-gray-900">
                    Lokasi Cabang
                  </h2>
                </div>

                <div className="space-y-4">
                  {locations.map((location, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-shadow"
                    >
                      <h3 className="font-semibold text-gray-900 mb-2">
                        {location.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">
                        {location.address}
                      </p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">{location.hours}</span>
                        <a
                          href={location.mapUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#ea2423] font-medium hover:underline"
                        >
                          Lihat Maps →
                        </a>
                      </div>
                    </div>
                  ))}

                  <Link
                    href="/lokasi"
                    className="block text-center py-3 text-[#ea2423] font-semibold hover:underline"
                  >
                    Lihat Semua Cabang (5) →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 lg:py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 bg-red-50 text-[#ea2423] text-sm font-semibold rounded-full mb-4">
                Pertanyaan Umum
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                FAQ <span className="text-[#ea2423]">Seputar Layanan</span>
              </h2>
              <p className="text-gray-600">
                Pertanyaan yang sering ditanyakan pelanggan kami.
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 border border-gray-100"
                >
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-[#ea2423] text-white rounded-full flex items-center justify-center text-xs font-bold">
                      {index + 1}
                    </span>
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 leading-relaxed pl-9">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-600 mb-4">
                Tidak menemukan jawaban yang Anda cari?
              </p>
              <a
                href="https://wa.me/6281936444486?text=Halo%20SS%20Foto,%20saya%20punya%20pertanyaan"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3 bg-[#ea2423] text-white font-semibold rounded-full hover:bg-[#c91f1e] transition-all duration-300 shadow-lg shadow-red-500/30"
              >
                <MessageCircle className="w-5 h-5" />
                Tanya via WhatsApp
              </a>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-20 bg-gradient-to-br from-[#ea2423] to-[#c91f1e] text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-4">
              Masih Ragu?
            </h2>
            <p className="text-xl text-white/80 mb-8">
              Kunjungi toko kami langsung untuk konsultasi tatap muka dan lihat
              contoh produk secara langsung!
            </p>
            <Link
              href="/lokasi"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#ea2423] font-bold rounded-full hover:bg-gray-100 transition-all duration-300 shadow-xl"
            >
              <MapPin className="w-5 h-5" />
              Lihat Lokasi Cabang
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>

      {/* Structured Data for ContactPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            name: "Hubungi SS Foto",
            description:
              "Halaman kontak SS Foto Digital Lab untuk layanan pelanggan, keluhan, dan kerjasama B2B.",
            url: "https://ssfoto.co.id/kontak",
            mainEntity: {
              "@type": "Organization",
              name: "SS Foto Digital Lab",
              alternateName: "SS Foto",
              url: "https://ssfoto.co.id",
              logo: "https://ssfoto.co.id/logo.png",
              contactPoint: [
                {
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
                {
                  "@type": "ContactPoint",
                  telephone: "+6281936444486",
                  contactType: "customer support",
                  availableLanguage: ["Indonesian"],
                },
                {
                  "@type": "ContactPoint",
                  email: "info@ssfoto.id",
                  contactType: "customer service",
                  availableLanguage: ["Indonesian"],
                },
              ],
              address: {
                "@type": "PostalAddress",
                streetAddress:
                  "Jl. Balai Pustaka Timur No.11, RT.4/RW.11, Rawamangun",
                addressLocality: "Jakarta Timur",
                addressRegion: "DKI Jakarta",
                postalCode: "13220",
                addressCountry: "ID",
              },
            },
          }),
        }}
      />
    </>
  );
}


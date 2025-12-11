"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Check,
  Package,
  ShieldCheck,
  ChevronRight,
  Star,
  Clock,
  Award,
  MapPin,
  Zap,
  Camera,
  ThumbsUp,
  MessageCircle,
} from "lucide-react";
import ProductImageSlider from "./ProductImageSlider";
import ReviewSection from "./ReviewSection";
import ProductBreadcrumb from "@/components/ui/ProductBreadcrumb";

// Schema Markup (Product + FAQPage)
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Product",
      name: "Jasa Cetak Pas Foto Profesional SS Foto",
      description:
        "Cetak pas foto berkualitas lab dengan jaminan lolos aplikasi. Proses cepat 2 jam, tersedia di 5 cabang Jakarta, Bekasi, dan Bogor. Harga mulai Rp 35.000 untuk 4 lembar.",
      image: "/images/og/pas-foto.jpg",
      brand: {
        "@type": "Brand",
        name: "SS Foto",
      },
      offers: {
        "@type": "Offer",
        priceCurrency: "IDR",
        price: "35000",
        availability: "http://schema.org/InStock",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "2400",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Berapa lama waktu pengerjaan pas foto?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Waktu standar adalah 2 jam untuk pengambilan di toko. Untuk layanan kilat (1 jam), tersedia dengan tambahan biaya Rp 20.000.",
          },
        },
        {
          "@type": "Question",
          name: "Apakah bisa ganti background warna?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Ya, kami bisa mengganti background foto Anda ke warna merah, biru, atau putih sesuai kebutuhan aplikasi (visa, paspor, CPNS, dll) tanpa biaya tambahan.",
          },
        },
        {
          "@type": "Question",
          name: "Apa jaminan jika pas foto ditolak?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Kami memberikan garansi 100% cetak ulang gratis jika pas foto Anda ditolak karena kesalahan teknis kami (ukuran, background, atau kualitas cetak). Syarat: memberikan bukti penolakan resmi.",
          },
        },
        {
          "@type": "Question",
          name: "Apakah bisa upload foto sendiri dari HP?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Ya! Anda bisa upload foto selfie dari HP melalui sistem kami. Tim kami akan melakukan quality check dan adjustment (background, lighting, komposisi) sebelum cetak untuk memastikan lolos standar aplikasi.",
          },
        },
      ],
    },
    {
      "@type": "Organization",
      name: "SS Foto Digital Lab",
      url: "https://ssfoto.co.id",
      logo: "https://ssfoto.co.id/logo.png",
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+6281936444486",
        contactType: "customer service",
      },
    },
    {
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
          name: "Pas Foto",
          item: "https://ssfoto.co.id/layanan/pas-foto",
        },
      ],
    },
  ],
};

export default function PasFotoPage() {
  return (
    <>
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb Navigation */}
      <ProductBreadcrumb 
        productName="Cetak Pas Foto" 
        productSlug="pas-foto" 
      />

      {/* Hero Section - Split Screen (50/50) */}
      <section className="min-h-[90vh] grid grid-cols-1 lg:grid-cols-2">
        {/* Left Column - Product Image Slider */}
        <ProductImageSlider />

        {/* Right Column - Content & Specs */}
        <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16 bg-white">
          {/* Tag */}
          <div className="mb-4">
            <span className="inline-block px-4 py-1.5 bg-red-50 text-[#ea2423] text-sm font-semibold rounded-full">
              🚀 Siap 2 Jam • Jaminan Lolos
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6 leading-tight">
            Pas Foto: Lolos Aplikasi, Hemat Waktu, dan Jaminan Kualitas
          </h1>

          {/* Subheadline */}
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            Unggah foto selfie dari HP, kami proses dengan teknologi lab
            profesional. Dijamin lolos standar visa, paspor, CPNS, dan SKCK.
          </p>

          {/* Price */}
          <div className="mb-8">
            <p className="text-3xl md:text-4xl font-bold text-gray-900">
              Mulai Rp 35.000
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Sudah termasuk 4 lembar (berbagai ukuran tersedia)
            </p>
          </div>

          {/* CTA Button */}
          <Link
            href="/upload/pas-foto"
            className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#ea2423] text-white font-bold rounded-lg text-lg hover:bg-[#c91f1e] transition-all duration-300 shadow-lg hover:shadow-xl mb-8"
          >
            Mulai Unggah Foto
            <ChevronRight className="w-5 h-5" />
          </Link>

          {/* Trust Signals */}
          <div className="flex flex-wrap justify-between gap-4 mb-8 pb-6 border-b border-gray-200">
            {/* Signal 1: Kecepatan */}
            <div className="flex items-center gap-3">
              <Clock className="w-6 h-6 text-green-500 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  Proses <span className="text-green-600">2 Jam Selesai</span>
                </p>
              </div>
            </div>

            {/* Signal 2: Garansi */}
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-red-600 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  <span className="text-red-600">Garansi Ganti Rugi</span> Jika
                  Ditolak
                </p>
              </div>
            </div>
          </div>

          {/* Detail Product Accordion (5 Items) */}
          <div className="space-y-4">
            {/* Item 1: Detail Kualitas & Kecepatan */}
            <details className="group border border-gray-200 rounded-lg overflow-hidden">
              <summary className="flex items-center justify-between px-5 py-4 cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors list-none">
                <span className="font-bold text-lg text-gray-900">
                  Detail Kualitas & Kecepatan
                </span>
                <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                  <span className="text-2xl font-bold text-[#ea2423] group-open:hidden">
                    +
                  </span>
                  <span className="text-2xl font-bold text-[#ea2423] hidden group-open:block">
                    −
                  </span>
                </div>
              </summary>
              <div className="px-5 py-5 text-base text-gray-700 space-y-3 bg-white border-t border-gray-200">
                <p className="leading-relaxed">
                  Pas foto kami bukan hasil print biasa—ini adalah{" "}
                  <strong>cetakan lab profesional</strong> yang digunakan untuk
                  dokumen resmi seperti paspor dan visa internasional.
                </p>
                <ul className="space-y-2 pl-1">
                  <li className="leading-relaxed">
                    • <strong>Proses Cepat 2 Jam:</strong> Upload pagi, ambil
                    siang. Tidak perlu antri.
                  </li>
                  <li className="leading-relaxed">
                    • <strong>Kertas Foto Lab Profesional:</strong> Kodak atau
                    Fujifilm, tahan air dan tidak mudah pudar.
                  </li>
                  <li className="leading-relaxed">
                    • <strong>Warna Akurat:</strong> Teknologi Color Management
                    System untuk warna kulit natural.
                  </li>
                  <li className="leading-relaxed">
                    • <strong>Adjustment Otomatis:</strong> Tim kami akan
                    merapikan background, lighting, dan komposisi.
                  </li>
                </ul>
              </div>
            </details>

            {/* Item 2: Panduan Ukuran & Latar Belakang */}
            <details className="group border border-gray-200 rounded-lg overflow-hidden">
              <summary className="flex items-center justify-between px-5 py-4 cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors list-none">
                <span className="font-bold text-lg text-gray-900">
                  Panduan Ukuran & Latar Belakang
                </span>
                <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                  <span className="text-2xl font-bold text-[#ea2423] group-open:hidden">
                    +
                  </span>
                  <span className="text-2xl font-bold text-[#ea2423] hidden group-open:block">
                    −
                  </span>
                </div>
              </summary>
              <div className="px-5 py-5 bg-white border-t border-gray-200">
                <p className="text-base text-gray-600 mb-4">
                  Pilih ukuran dan background sesuai kebutuhan aplikasi Anda:
                </p>

                {/* Pricing Table */}
                <div className="overflow-x-auto mb-4">
                  <table className="w-full text-base border-collapse">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="text-left py-3 px-4 font-bold text-gray-900 border border-gray-300">
                          Ukuran
                        </th>
                        <th className="text-left py-3 px-4 font-bold text-gray-900 border border-gray-300">
                          Kegunaan
                        </th>
                        <th className="text-left py-3 px-4 font-bold text-gray-900 border border-gray-300">
                          Background
                        </th>
                        <th className="text-right py-3 px-4 font-bold text-gray-900 border border-gray-300">
                          Harga (4 Lembar)
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="hover:bg-gray-50">
                        <td className="py-3 px-4 border border-gray-300 font-semibold">
                          2x3 cm
                        </td>
                        <td className="py-3 px-4 border border-gray-300">
                          SKCK, KTP
                        </td>
                        <td className="py-3 px-4 border border-gray-300">
                          <span className="inline-block px-2 py-1 bg-red-100 text-red-800 text-xs font-semibold rounded mr-1">
                            Merah
                          </span>
                          <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded">
                            Biru
                          </span>
                        </td>
                        <td className="py-3 px-4 border border-gray-300 text-right font-semibold">
                          Rp 35.000
                        </td>
                      </tr>
                      <tr className="bg-orange-50 hover:bg-orange-100">
                        <td className="py-3 px-4 border border-gray-300 font-semibold">
                          3x4 cm
                        </td>
                        <td className="py-3 px-4 border border-gray-300">
                          CPNS, Ijazah
                        </td>
                        <td className="py-3 px-4 border border-gray-300">
                          <span className="inline-block px-2 py-1 bg-red-100 text-red-800 text-xs font-semibold rounded mr-1">
                            Merah
                          </span>
                          <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded">
                            Biru
                          </span>
                        </td>
                        <td className="py-3 px-4 border border-gray-300 text-right font-semibold text-[#ea2423]">
                          Rp 40.000
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="py-3 px-4 border border-gray-300 font-semibold">
                          4x6 cm
                        </td>
                        <td className="py-3 px-4 border border-gray-300">
                          Paspor, Visa
                        </td>
                        <td className="py-3 px-4 border border-gray-300">
                          <span className="inline-block px-2 py-1 bg-gray-100 text-gray-800 text-xs font-semibold rounded">
                            Putih
                          </span>
                        </td>
                        <td className="py-3 px-4 border border-gray-300 text-right font-semibold">
                          Rp 50.000
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  *Harga sudah termasuk adjustment background dan quality check.
                </p>
              </div>
            </details>

            {/* Item 3: Jaminan Lolos Aplikasi */}
            <details className="group border border-gray-200 rounded-lg overflow-hidden">
              <summary className="flex items-center justify-between px-5 py-4 cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors list-none">
                <span className="font-bold text-lg text-gray-900">
                  Jaminan Lolos Aplikasi
                </span>
                <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                  <span className="text-2xl font-bold text-[#ea2423] group-open:hidden">
                    +
                  </span>
                  <span className="text-2xl font-bold text-[#ea2423] hidden group-open:block">
                    −
                  </span>
                </div>
              </summary>
              <div className="px-5 py-5 text-base text-gray-700 space-y-4 bg-white border-t border-gray-200">
                <p className="leading-relaxed">
                  Kami memahami bahwa pas foto bukan sekadar cetakan—ini adalah{" "}
                  <strong>syarat penting untuk masa depan Anda</strong>. Karena
                  itu, kami memberikan jaminan 100% lolos untuk:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 mr-2 mt-0.5 text-[#ea2423] shrink-0" />
                    <div>
                      <strong>Paspor & Visa Internasional:</strong> Memenuhi
                      standar ICAO (resolusi min. 600 DPI, background putih
                      bersih, pencahayaan merata).
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 mr-2 mt-0.5 text-[#ea2423] shrink-0" />
                    <div>
                      <strong>CPNS & Tes Kerja:</strong> Background merah/biru
                      solid, wajah menghadap depan (tidak miring).
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 mr-2 mt-0.5 text-[#ea2423] shrink-0" />
                    <div>
                      <strong>SKCK & Dokumen Resmi:</strong> Ukuran presisi
                      (±0.1mm toleransi), tidak blur atau pixelated.
                    </div>
                  </li>
                </ul>

                <div className="border-l-4 border-green-500 p-3 bg-green-50 rounded">
                  <p className="font-bold text-gray-900 mb-1">
                    Garansi Cetak Ulang Gratis:
                  </p>
                  <p className="text-sm">
                    Jika pas foto Anda ditolak karena kesalahan teknis kami
                    (ukuran, background, kualitas), kami akan cetak ulang 100%
                    gratis. Cukup tunjukkan bukti penolakan resmi.
                  </p>
                </div>
              </div>
            </details>

            {/* Item 4: Lokasi Pengambilan */}
            <details className="group border border-gray-200 rounded-lg overflow-hidden">
              <summary className="flex items-center justify-between px-5 py-4 cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors list-none">
                <span className="font-bold text-lg text-gray-900">
                  Lokasi Pengambilan (5 Cabang)
                </span>
                <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                  <span className="text-2xl font-bold text-[#ea2423] group-open:hidden">
                    +
                  </span>
                  <span className="text-2xl font-bold text-[#ea2423] hidden group-open:block">
                    −
                  </span>
                </div>
              </summary>
              <div className="px-5 py-5 text-base text-gray-700 space-y-4 bg-white border-t border-gray-200">
                <p className="leading-relaxed">
                  Upload foto Anda secara online, dan ambil hasil cetakan di
                  salah satu cabang kami:
                </p>

                {/* Branch List */}
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <MapPin className="w-5 h-5 text-[#ea2423] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-gray-900">
                        SS Foto Rawamangun (Pusat)
                      </p>
                      <p className="text-sm text-gray-600">
                        Jl. Balai Pustaka Timur No.11, Rawamangun, Jakarta
                        Timur
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <MapPin className="w-5 h-5 text-[#ea2423] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-gray-900">
                        SS Foto Pondok Pinang
                      </p>
                      <p className="text-sm text-gray-600">
                        Jl. Ciputat Raya No.7D, Jakarta Selatan
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <MapPin className="w-5 h-5 text-[#ea2423] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-gray-900">
                        SS Foto Jatiwaringin
                      </p>
                      <p className="text-sm text-gray-600">
                        Jl. Raya Jatiwaringin No.99, Bekasi
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <MapPin className="w-5 h-5 text-[#ea2423] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-gray-900">
                        SS Foto Galaxy Mall
                      </p>
                      <p className="text-sm text-gray-600">
                        Mall Galaxy, Lt. GF, Bekasi
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <MapPin className="w-5 h-5 text-[#ea2423] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-gray-900">SS Foto Bogor</p>
                      <p className="text-sm text-gray-600">
                        Jl. Pajajaran No.45, Bogor
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-l-4 border-blue-500 p-3 bg-blue-50 rounded">
                  <p className="font-bold text-gray-900 mb-1">
                    💡 Tip Hemat Waktu:
                  </p>
                  <p className="text-sm">
                    Upload foto Anda sebelum datang ke toko. Saat tiba, pas
                    foto Anda sudah siap—hanya perlu bayar dan ambil. Total
                    waktu di toko: <strong>5 menit</strong>.
                  </p>
                </div>
              </div>
            </details>

            {/* Item 5: Bantuan & Konsultasi */}
            <details className="group border border-gray-200 rounded-lg overflow-hidden">
              <summary className="flex items-center justify-between px-5 py-4 cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors list-none">
                <span className="font-bold text-lg text-gray-900">
                  Bantuan & Konsultasi
                </span>
                <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                  <span className="text-2xl font-bold text-[#ea2423] group-open:hidden">
                    +
                  </span>
                  <span className="text-2xl font-bold text-[#ea2423] hidden group-open:block">
                    −
                  </span>
                </div>
              </summary>
              <div className="px-5 py-5 text-base text-gray-700 space-y-4 bg-white border-t border-gray-200">
                <p className="leading-relaxed">
                  Tidak yakin ukuran atau background yang tepat untuk aplikasi
                  Anda? Tim kami siap membantu!
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-900">WhatsApp:</span>
                    <a
                      href="https://wa.me/6281936444486"
                      className="text-[#ea2423] font-bold hover:underline"
                    >
                      +62 819-3644-4486
                    </a>
                    <span className="text-sm text-green-600 font-semibold">
                      (Fast Response)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-900">Email:</span>
                    <a
                      href="mailto:pasfoto@ssfoto.co.id"
                      className="text-[#ea2423] font-bold hover:underline"
                    >
                      pasfoto@ssfoto.co.id
                    </a>
                  </div>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                  <p className="text-gray-700 leading-relaxed">
                    <strong>💡 Tidak yakin foto Anda cukup bagus?</strong>
                    <br />
                    Kirim foto trial ke WhatsApp untuk review kualitas GRATIS
                    sebelum order!
                  </p>
                </div>
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* Trust Pillars Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
              Kenapa Memilih SS Foto untuk Pas Foto?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Bukan sekadar cetak biasa. Ini adalah investasi untuk masa depan
              Anda.
            </p>
          </div>

          {/* 4 Trust Pillars */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Pillar 1: Kecepatan */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-blue-100 mb-4 transition-all hover:scale-110 hover:bg-blue-200">
                <Zap className="w-8 h-8 md:w-10 md:h-10 text-blue-600" />
              </div>
              <h3 className="font-bold text-base md:text-lg text-gray-900 mb-2">
                Proses 2 Jam
              </h3>
              <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                Upload pagi, ambil siang. Tidak perlu antri.
              </p>
            </div>

            {/* Pillar 2: Garansi Lolos */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-green-100 mb-4 transition-all hover:scale-110 hover:bg-green-200">
                <ShieldCheck className="w-8 h-8 md:w-10 md:h-10 text-green-600" />
              </div>
              <h3 className="font-bold text-base md:text-lg text-gray-900 mb-2">
                Garansi Lolos
              </h3>
              <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                100% cetak ulang gratis jika ditolak
              </p>
            </div>

            {/* Pillar 3: Kualitas Lab */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-orange-100 mb-4 transition-all hover:scale-110 hover:bg-orange-200">
                <Award className="w-8 h-8 md:w-10 md:h-10 text-orange-600" />
              </div>
              <h3 className="font-bold text-base md:text-lg text-gray-900 mb-2">
                Kualitas Lab
              </h3>
              <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                Kertas Kodak/Fujifilm, tahan puluhan tahun
              </p>
            </div>

            {/* Pillar 4: Rating */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-purple-100 mb-4 transition-all hover:scale-110 hover:bg-purple-200">
                <Star className="w-8 h-8 md:w-10 md:h-10 text-purple-600" />
              </div>
              <h3 className="font-bold text-base md:text-lg text-gray-900 mb-2">
                Rating 4.9/5
              </h3>
              <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                Dipercaya 2400+ pelanggan di Indonesia
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Zig-Zag 1: Kecepatan */}
      <section className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            {/* Kiri: Visual */}
            <div className="relative aspect-square rounded-xl shadow-xl overflow-hidden">
              <Image
                src="/images/products/cetak-pas-foto-dengan-mudah.png"
                alt="Proses Cepat Pas Foto SS Foto"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Kanan: Content */}
            <div className="flex flex-col justify-center lg:pr-8">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
                20 Menit Selesai, Tidak Perlu Antri
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Lupakan pengalaman antri berjam-jam di photo studio
                tradisional. Dengan sistem online kami, Anda hanya perlu upload
                foto dari HP, dan kami akan memproses semuanya.
              </p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <Check className="h-5 w-5 mr-2 mt-0.5 text-[#ea2423] shrink-0" />
                  <strong>Upload Kapan Saja:</strong> 24/7, dari mana saja.
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 mr-2 mt-0.5 text-[#ea2423] shrink-0" />
                  <strong>Kami edit foto Anda:</strong> Background, lighting,
                  dan komposisi diperbaiki oleh tim profesional.
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 mr-2 mt-0.5 text-[#ea2423] shrink-0" />
                  <strong>Ambil di 5 Cabang:</strong> Pilih lokasi terdekat
                  Anda.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Zig-Zag 2: Kualitas */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            {/* Kanan: Visual */}
            <div className="relative aspect-square rounded-xl shadow-xl overflow-hidden lg:order-last">
              <Image
                src="/images/products/kertas-cetak-pas-foto-profesional.png"
                alt="Kualitas Cetakan Lab Profesional SS Foto"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Kiri: Content */}
            <div className="flex flex-col justify-center lg:order-first lg:pl-8">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
                Kertas Lab Profesional &{" "}
                <span className="text-[#ea2423]">Tahan Pudar</span>
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Kami tidak menggunakan kertas print biasa. Setiap pas foto
                dicetak di <strong>kertas foto lab</strong> dari Kodak atau
                Fujifilm yang sama dengan yang digunakan untuk dokumen resmi
                internasional.
              </p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <Check className="h-5 w-5 mr-2 mt-0.5 text-[#ea2423] shrink-0" />
                  <strong>Tahan Air & Lembab:</strong> Tidak luntur meski
                  terkena keringat.
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 mr-2 mt-0.5 text-[#ea2423] shrink-0" />
                  <strong>Tidak Pudar:</strong> Warna bertahan hingga puluhan
                  tahun.
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 mr-2 mt-0.5 text-[#ea2423] shrink-0" />
                  <strong>Resolusi Tinggi:</strong> Detail wajah tajam, tidak
                  blur atau pixelated.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Review Section - Social Proof */}
      <ReviewSection />

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
              Pertanyaan yang Sering Ditanyakan
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Temukan jawaban untuk pertanyaan umum seputar layanan pas foto
              kami.
            </p>
          </div>

          <div className="space-y-4">
            {/* Q1 */}
            <details className="group border border-gray-200 rounded-lg overflow-hidden hover:border-[#ea2423] transition-colors">
              <summary className="flex items-center justify-between px-6 py-4 cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors list-none">
                <span className="font-semibold text-lg text-gray-900">
                  Berapa lama waktu pengerjaan pas foto?
                </span>
                <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                  <span className="text-2xl font-bold text-[#ea2423] group-open:hidden">
                    +
                  </span>
                  <span className="text-2xl font-bold text-[#ea2423] hidden group-open:block">
                    −
                  </span>
                </div>
              </summary>
              <div className="px-6 pb-5 pt-4 text-base text-gray-700 leading-relaxed bg-white border-t border-gray-200">
                Waktu standar adalah <strong>2 jam</strong> untuk pengambilan
                di toko. Untuk layanan kilat (1 jam), tersedia dengan tambahan
                biaya Rp 20.000.
              </div>
            </details>

            {/* Q2 */}
            <details className="group border border-gray-200 rounded-lg overflow-hidden hover:border-[#ea2423] transition-colors">
              <summary className="flex items-center justify-between px-6 py-4 cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors list-none">
                <span className="font-semibold text-lg text-gray-900">
                  Apakah bisa ganti background warna?
                </span>
                <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                  <span className="text-2xl font-bold text-[#ea2423] group-open:hidden">
                    +
                  </span>
                  <span className="text-2xl font-bold text-[#ea2423] hidden group-open:block">
                    −
                  </span>
                </div>
              </summary>
              <div className="px-6 pb-5 pt-4 text-base text-gray-700 leading-relaxed bg-white border-t border-gray-200">
                Ya, kami bisa mengganti background foto Anda ke warna{" "}
                <strong>merah, biru, atau putih</strong> sesuai kebutuhan
                aplikasi (visa, paspor, CPNS, dll) tanpa biaya tambahan.
              </div>
            </details>

            {/* Q3 */}
            <details className="group border border-gray-200 rounded-lg overflow-hidden hover:border-[#ea2423] transition-colors">
              <summary className="flex items-center justify-between px-6 py-4 cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors list-none">
                <span className="font-semibold text-lg text-gray-900">
                  Apa jaminan jika pas foto ditolak?
                </span>
                <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                  <span className="text-2xl font-bold text-[#ea2423] group-open:hidden">
                    +
                  </span>
                  <span className="text-2xl font-bold text-[#ea2423] hidden group-open:block">
                    −
                  </span>
                </div>
              </summary>
              <div className="px-6 pb-5 pt-4 text-base text-gray-700 leading-relaxed bg-white border-t border-gray-200">
                Kami memberikan garansi <strong>100% cetak ulang gratis</strong>{" "}
                jika pas foto Anda ditolak karena kesalahan teknis kami
                (ukuran, background, atau kualitas cetak). Syarat: memberikan
                bukti penolakan resmi.
              </div>
            </details>

            {/* Q4 */}
            <details className="group border border-gray-200 rounded-lg overflow-hidden hover:border-[#ea2423] transition-colors">
              <summary className="flex items-center justify-between px-6 py-4 cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors list-none">
                <span className="font-semibold text-lg text-gray-900">
                  Apakah bisa upload foto sendiri dari HP?
                </span>
                <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                  <span className="text-2xl font-bold text-[#ea2423] group-open:hidden">
                    +
                  </span>
                  <span className="text-2xl font-bold text-[#ea2423] hidden group-open:block">
                    −
                  </span>
                </div>
              </summary>
              <div className="px-6 pb-5 pt-4 text-base text-gray-700 leading-relaxed bg-white border-t border-gray-200">
                Ya! Anda bisa upload foto selfie dari HP melalui sistem kami.
                Tim kami akan melakukan <strong>quality check</strong> dan
                adjustment (background, lighting, komposisi) sebelum cetak untuk
                memastikan lolos standar aplikasi.
              </div>
            </details>
          </div>

          {/* Bottom CTA for FAQ */}
          <div className="mt-12 text-center p-6 bg-gray-50 rounded-xl">
            <p className="text-lg text-gray-800 mb-4 font-semibold">
              Masih ada pertanyaan? Tim kami siap membantu!
            </p>
            <a
              href="https://wa.me/6281936444486"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#25D366] text-white font-bold rounded-lg text-lg hover:bg-[#1DA851] transition-all shadow-lg"
            >
              <MessageCircle className="w-6 h-6" />
              Chat via WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#ea2423]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
            Siap Cetak Pas Foto Anda?
          </h2>
          <p className="text-white/90 text-lg mb-8">
            Upload foto sekarang, ambil 2 jam kemudian. Dijamin lolos aplikasi
            atau uang kembali!
          </p>
          <Link
            href="/upload/pas-foto"
            className="inline-flex items-center gap-2 px-10 py-5 bg-white text-[#ea2423] font-bold text-xl rounded-lg hover:bg-gray-100 transition-all shadow-2xl hover:shadow-3xl"
          >
            Mulai Upload Foto Sekarang
            <ChevronRight className="w-6 h-6" />
          </Link>
          <p className="text-white/75 text-sm mt-6">
            Konsultasi gratis via WhatsApp • Respon cepat • Garansi 100% Cetak
            Ulang
          </p>
        </div>
      </section>
    </>
  );
}

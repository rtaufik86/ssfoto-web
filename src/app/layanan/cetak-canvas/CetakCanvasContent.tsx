"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Check,
  Package,
  ShieldCheck,
  ChevronRight,
  Star,
  Ruler,
  Zap,
  HeartHandshake,
} from "lucide-react";
import ReviewSection from "./ReviewSection";
import ProductImageSlider from "./ProductImageSlider";
import ProductBreadcrumb from "@/components/ui/ProductBreadcrumb";

export default function CetakCanvasContent() {

  return (
    <>
      {/* Breadcrumb Navigation */}
      <ProductBreadcrumb 
        productName="Cetak Kanvas Premium" 
        productSlug="cetak-canvas" 
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
              Best Seller Wall Decor
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6 leading-tight">
            Hidupkan Dinding Rumah dengan Kenangan Terindah
          </h1>

          {/* Subheadline */}
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            Ubah foto HP Anda menjadi karya seni galeri. Kualitas museum,
            bergaransi seumur hidup.
          </p>

          {/* Price */}
          <div className="mb-8">
            <p className="text-3xl md:text-4xl font-bold text-gray-900">
              Mulai Rp 250.000
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Sudah termasuk rangka kayu & pengait
            </p>
          </div>

          {/* CTA Button */}
          <Link
            href="/upload/canvas"
            className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#ea2423] text-white font-bold rounded-lg text-lg hover:bg-[#c91f1e] transition-all duration-300 shadow-lg hover:shadow-xl mb-8"
          >
            Mulai Desain Sekarang
            <ChevronRight className="w-5 h-5" />
          </Link>

          {/* Trust Signals */}
          <div className="flex flex-wrap justify-between gap-4 mb-8 pb-6 border-b border-gray-200">
            {/* Signal 1: Durability */}
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-green-500 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  Garansi <span className="text-green-600">100 Tahun</span> Tahan Pudar
                </p>
              </div>
            </div>

            {/* Signal 2: Shipping */}
            <div className="flex items-center gap-3">
              <Package className="w-6 h-6 text-red-600 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  Packing Kayu <span className="text-red-600">Gratis</span> & Aman
                </p>
              </div>
            </div>
          </div>

          {/* Detail Product Accordion (5 Items - Refined UX) */}
          <div className="space-y-4">
            {/* Item 1: Kualitas Tahan Warisan */}
            <details className="group border border-gray-200 rounded-lg overflow-hidden">
              <summary className="flex items-center justify-between px-5 py-4 cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors list-none">
                <span className="font-bold text-lg text-gray-900">
                  Kualitas Tahan Warisan
                </span>
                {/* Custom +/- Toggle */}
                <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                  <span className="text-2xl font-bold text-[#ea2423] group-open:hidden">+</span>
                  <span className="text-2xl font-bold text-[#ea2423] hidden group-open:block">−</span>
                </div>
              </summary>
              <div className="px-5 py-5 text-base text-gray-700 space-y-3 bg-white border-t border-gray-200">
                <p className="leading-relaxed">
                  Kanvas ini bukan sekadar cetakan foto—ini adalah <strong>warisan keluarga</strong> yang akan bertahan hingga cicit Anda dewasa.
                </p>
                <ul className="space-y-2 pl-1">
                  <li className="leading-relaxed">
                    • <strong>Kanvas 100% Cotton 360gsm</strong> (bukan plastik flexy)
                  </li>
                  <li className="leading-relaxed">
                    • <strong>Tinta UV Protection</strong> dengan garansi 100 tahun tahan pudar
                  </li>
                  <li className="leading-relaxed">
                    • <strong>Rangka Kayu Jati Oven</strong> anti rayap & anti melengkung
                  </li>
                </ul>
              </div>
            </details>

            {/* Item 2: Inspirasi Desain */}
            <details className="group border border-gray-200 rounded-lg overflow-hidden">
              <summary className="flex items-center justify-between px-5 py-4 cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors list-none">
                <span className="font-bold text-lg text-gray-900">
                  Inspirasi Desain
                </span>
                {/* Custom +/- Toggle */}
                <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                  <span className="text-2xl font-bold text-[#ea2423] group-open:hidden">+</span>
                  <span className="text-2xl font-bold text-[#ea2423] hidden group-open:block">−</span>
                </div>
              </summary>
              <div className="px-5 py-5 text-base text-gray-700 space-y-4 bg-white border-t border-gray-200">
                <div>
                  <p className="font-bold text-gray-900 mb-2">Lifestyle Statement Piece:</p>
                  <p className="leading-relaxed">
                    Foto keluarga besar di ruang tamu, momen pre-wedding di kamar utama, atau pemandangan alam di ruang kerja. Satu kanvas besar (60x90 cm) langsung mengubah atmosfer ruangan.
                  </p>
                </div>
                <div>
                  <p className="font-bold text-gray-900 mb-2">Gallery Wall (Trending!):</p>
                  <p className="leading-relaxed">
                    Kombinasi 3-5 kanvas berbeda ukuran di satu dinding. Cocok untuk cerita perjalanan keluarga, koleksi momen wisuda, atau seri foto anak dari bayi hingga sekarang.
                  </p>
                </div>
              </div>
            </details>

            {/* Item 3: Panduan Harga & Ukuran */}
            <details className="group border border-gray-200 rounded-lg overflow-hidden">
              <summary className="flex items-center justify-between px-5 py-4 cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors list-none">
                <span className="font-bold text-lg text-gray-900">
                  Panduan Harga & Ukuran
                </span>
                {/* Custom +/- Toggle */}
                <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                  <span className="text-2xl font-bold text-[#ea2423] group-open:hidden">+</span>
                  <span className="text-2xl font-bold text-[#ea2423] hidden group-open:block">−</span>
                </div>
              </summary>
              <div className="px-5 py-5 bg-white border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-4">Pilih ukuran sesuai kebutuhan ruangan Anda:</p>
                
                {/* Pricing Table */}
                <div className="overflow-x-auto mb-4">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="text-left py-3 px-4 font-bold text-gray-900 border border-gray-300">Format</th>
                        <th className="text-left py-3 px-4 font-bold text-gray-900 border border-gray-300">Ukuran</th>
                        <th className="text-right py-3 px-4 font-bold text-gray-900 border border-gray-300">Mulai Dari</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="hover:bg-gray-50">
                        <td className="py-3 px-4 border border-gray-300">
                          <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded">Square</span>
                        </td>
                        <td className="py-3 px-4 border border-gray-300">30 x 30 cm</td>
                        <td className="py-3 px-4 text-right font-bold text-[#ea2423] border border-gray-300">Rp 250.000</td>
                      </tr>
                      <tr className="bg-orange-50 hover:bg-orange-100">
                        <td className="py-3 px-4 border border-gray-300">
                          <span className="inline-block px-2 py-1 bg-orange-100 text-orange-800 text-xs font-semibold rounded">Rectangular</span>
                          <span className="ml-2 text-sm text-orange-600 font-bold">⭐ Best Seller</span>
                        </td>
                        <td className="py-3 px-4 border border-gray-300">40 x 60 cm</td>
                        <td className="py-3 px-4 text-right font-bold text-[#ea2423] border border-gray-300">Rp 420.000</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="py-3 px-4 border border-gray-300">
                          <span className="inline-block px-2 py-1 bg-purple-100 text-purple-800 text-xs font-semibold rounded">Panoramic</span>
                        </td>
                        <td className="py-3 px-4 border border-gray-300">30 x 90 cm</td>
                        <td className="py-3 px-4 text-right font-bold text-[#ea2423] border border-gray-300">Rp 550.000</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <p className="text-sm text-gray-500 italic">
                  *Sudah termasuk rangka kayu & keyhole hanger. Diskon 10% untuk pemesanan 3 kanvas sekaligus.
                </p>
              </div>
            </details>

            {/* Item 4: Pengiriman & Garansi */}
            <details className="group border border-gray-200 rounded-lg overflow-hidden">
              <summary className="flex items-center justify-between px-5 py-4 cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors list-none">
                <span className="font-bold text-lg text-gray-900">
                  Pengiriman & Garansi
                </span>
                {/* Custom +/- Toggle */}
                <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                  <span className="text-2xl font-bold text-[#ea2423] group-open:hidden">+</span>
                  <span className="text-2xl font-bold text-[#ea2423] hidden group-open:block">−</span>
                </div>
              </summary>
              <div className="px-5 py-5 text-base text-gray-700 space-y-4 bg-white border-t border-gray-200">
                <p className="leading-relaxed">
                  Setiap kanvas dipacking dengan <strong>bubble wrap 3 lapis + packing kayu GRATIS</strong> untuk ukuran ≥60x90 cm. Estimasi produksi 3-4 hari kerja.
                </p>
                
                {/* Shipping Calculator Placeholder */}
                <div className="mt-4 p-4 border rounded-lg bg-red-50/50">
                  <div className="text-center">
                    <Package className="w-10 h-10 text-[#ea2423] mx-auto mb-2" />
                    <p className="text-sm font-bold text-gray-700 mb-1">
                      [Placeholder: Shipping Calculator Component Integrated Here]
                    </p>
                    <p className="text-sm text-gray-600">
                      Interactive shipping cost & delivery time estimator
                    </p>
                  </div>
                </div>
                
                <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                  <p className="font-bold text-gray-900 mb-2">✅ Garansi Kami:</p>
                  <ul className="space-y-1 text-gray-700">
                    <li>• 100% uang kembali jika rusak saat tiba</li>
                    <li>• Cetak ulang gratis jika warna tidak sesuai</li>
                    <li>• Garansi tinta 100 tahun tahan pudar</li>
                  </ul>
                </div>
              </div>
            </details>

            {/* Item 5: Bantuan & Konsultasi */}
            <details className="group border border-gray-200 rounded-lg overflow-hidden">
              <summary className="flex items-center justify-between px-5 py-4 cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors list-none">
                <span className="font-bold text-lg text-gray-900">
                  Bantuan & Konsultasi
                </span>
                {/* Custom +/- Toggle */}
                <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                  <span className="text-2xl font-bold text-[#ea2423] group-open:hidden">+</span>
                  <span className="text-2xl font-bold text-[#ea2423] hidden group-open:block">−</span>
                </div>
              </summary>
              <div className="px-5 py-5 text-base text-gray-700 space-y-4 bg-white border-t border-gray-200">
                <p className="leading-relaxed">
                  Tim <strong>Customer Happiness</strong> kami siap membantu Anda memilih ukuran yang tepat, mengecek kualitas foto, dan menjawab semua pertanyaan.
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-900">WhatsApp:</span>
                    <a href="https://wa.me/6281936444486" className="text-[#ea2423] font-bold hover:underline">
                      +62 819-3644-4486
                    </a>
                    <span className="text-sm text-green-600 font-semibold">(Fast Response)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-900">Email:</span>
                    <a href="mailto:canvas@ssfoto.co.id" className="text-[#ea2423] font-bold hover:underline">
                      canvas@ssfoto.co.id
                    </a>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-gray-900">Toko:</span>
                    <span className="text-gray-700">5 cabang di Jakarta, Bekasi & Bogor</span>
                  </div>
                </div>
                
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                  <p className="text-gray-700 leading-relaxed">
                    <strong>💡 Tidak yakin foto Anda cukup bagus?</strong><br />
                    Kirim ke WhatsApp untuk review kualitas GRATIS sebelum order!
                  </p>
                </div>
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* Kenapa Memilih Kanvas SS Foto? Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
              Kenapa Memilih Kanvas SS Foto?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Bukan sekadar cetak foto biasa. Ini adalah investasi kenangan yang bertahan selamanya.
            </p>
          </div>

          {/* 4 Pillars Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {/* Pillar 1: Bahan Premium */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-blue-100 mb-4 transition-all hover:scale-110 hover:bg-blue-200">
                <Check className="w-8 h-8 md:w-10 md:h-10 text-blue-600" />
              </div>
              <h3 className="font-bold text-base md:text-lg text-gray-900 mb-2">
                Bahan Premium
              </h3>
              <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                Kanvas Cotton asli, bukan flexy banner plastik
              </p>
            </div>

            {/* Pillar 2: Garansi 100 Tahun */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-green-100 mb-4 transition-all hover:scale-110 hover:bg-green-200">
                <ShieldCheck className="w-8 h-8 md:w-10 md:h-10 text-green-600" />
              </div>
              <h3 className="font-bold text-base md:text-lg text-gray-900 mb-2">
                Garansi 100 Tahun
              </h3>
              <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                Tinta UV Protection tahan pudar seumur hidup
              </p>
            </div>

            {/* Pillar 3: Packing Kayu Gratis */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-orange-100 mb-4 transition-all hover:scale-110 hover:bg-orange-200">
                <Package className="w-8 h-8 md:w-10 md:h-10 text-orange-600" />
              </div>
              <h3 className="font-bold text-base md:text-lg text-gray-900 mb-2">
                Packing Kayu Gratis
              </h3>
              <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                Dijamin aman hingga tujuan dengan bubble wrap tebal
              </p>
            </div>

            {/* Pillar 4: Rating 4.9/5 Bintang */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-purple-100 mb-4 transition-all hover:scale-110 hover:bg-purple-200">
                <Star className="w-8 h-8 md:w-10 md:h-10 text-purple-600" />
              </div>
              <h3 className="font-bold text-base md:text-lg text-gray-900 mb-2">
                Rating 4.9/5 Bintang
              </h3>
              <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                Dipercaya 1200+ pelanggan di seluruh Indonesia
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Zig-Zag Feature Section 1: Tekstur Kanvas Premium */}
      <section className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left: Canvas Texture Image */}
            <div className="relative h-96 md:h-[500px] rounded-xl shadow-2xl overflow-hidden">
              <Image
                src="/images/canvas-texture-detail.jpg"
                alt="Detail Tekstur Kanvas Premium SS Foto - 100% Cotton 360gsm"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Right: Texture Content */}
            <div className="lg:pr-8">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4 leading-tight">
                Tekstur Kanvas Asli yang Terasa Premium
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Bukan <em>banner</em> plastik yang licin dan mengkilap. Kanvas kami menggunakan <strong>100% Cotton Kanvas 360gsm</strong> dengan tekstur anyaman khas yang sama dengan kanvas lukisan profesional. Tekstur ini memberikan dimensi dan "kehidupan" pada foto Anda.
              </p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <Check className="h-5 w-5 mr-3 mt-0.5 text-[#ea2423] shrink-0" />
                  <span>Tidak mudah sobek (<strong>Tensile Strength tinggi</strong>)</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 mr-3 mt-0.5 text-[#ea2423] shrink-0" />
                  <span>Anti kusut (<em>Wrinkle-resistant coating</em>)</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 mr-3 mt-0.5 text-[#ea2423] shrink-0" />
                  <span><em>Breathable</em> — mencegah jamur dan kelembaban</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 mr-3 mt-0.5 text-[#ea2423] shrink-0" />
                  <span>Permukaan matte (tidak mengkilap seperti banner plastik)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Zig-Zag Feature Section 2: Gallery Wrap */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left: Gallery Wrap Content (Order reversed on desktop) */}
            <div className="lg:order-first lg:pl-8">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4 leading-tight">
                Sudut Rapi & Presisi <span className="text-[#ea2423]">&apos;Gallery Wrap&apos;</span>
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Setiap kanvas dicetak dengan teknik <strong>Gallery Wrap</strong>, di mana foto membungkus hingga ke sisi rangka kayu. Hasilnya adalah tampilan yang bersih, modern, dan siap pajang tanpa perlu bingkai tambahan.
              </p>

              {/* Premium Wooden Frame Specs */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Rangka Kayu Premium:</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                      <Ruler className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">Material Pilihan</p>
                      <p className="text-gray-600">Kayu Jati Belanda/Pinus kering oven, anti melengkung</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center mr-4">
                      <Zap className="h-5 w-5 text-yellow-600" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">Ketebalan Ideal</p>
                      <p className="text-gray-600">Rangka 3cm yang kokoh namun ringan</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center mr-4">
                      <HeartHandshake className="h-5 w-5 text-pink-600" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">Treatment Khusus</p>
                      <p className="text-gray-600">Anti rayap dan anti jamur untuk daya tahan seumur hidup</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                      <Package className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">Siap Pajang</p>
                      <p className="text-gray-600">Sudah termasuk pengait &quot;Keyhole Hanger&quot; yang tersembunyi</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right: Gallery Wrap Detail Image (Order last on desktop) */}
            <div className="lg:order-last relative h-96 md:h-[500px] rounded-xl shadow-2xl overflow-hidden">
              <Image
                src="/images/gallery-wrap-detail.jpg"
                alt="Detail Gallery Wrap SS Foto - Sudut Rapi dan Presisi"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Review Section - Social Proof */}
      <ReviewSection />

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
              Pertanyaan yang Sering Ditanyakan
            </h2>
            <p className="text-gray-600">
              Jawaban untuk pertanyaan umum seputar kanvas premium kami
            </p>
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {/* Q1: Tahan Air */}
            <details className="group border border-gray-200 rounded-lg overflow-hidden bg-white hover:border-[#ea2423] transition-colors">
              <summary className="flex items-center justify-between px-6 py-4 cursor-pointer list-none font-semibold text-lg text-gray-900 hover:text-[#ea2423] transition-colors">
                <span>Apakah Kanvas SS Foto Tahan Air?</span>
                <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center ml-4">
                  <span className="text-2xl font-bold text-[#ea2423] group-open:hidden">+</span>
                  <span className="text-2xl font-bold text-[#ea2423] hidden group-open:block">−</span>
                </div>
              </summary>
              <div className="px-6 pb-5 text-base text-gray-700 leading-relaxed border-t border-gray-100">
                <p className="pt-4">
                  Tinta UV yang kami gunakan memiliki ketahanan air yang sangat baik. Kanvas dapat dibersihkan dengan lap kering atau sedikit lembab tanpa merusak cetakan. Namun, tidak disarankan untuk terkena air mengalir atau kelembaban tinggi dalam waktu lama.
                </p>
              </div>
            </details>

            {/* Q2: Garansi 100 Tahun */}
            <details className="group border border-gray-200 rounded-lg overflow-hidden bg-white hover:border-[#ea2423] transition-colors">
              <summary className="flex items-center justify-between px-6 py-4 cursor-pointer list-none font-semibold text-lg text-gray-900 hover:text-[#ea2423] transition-colors">
                <span>Bagaimana Garansi 100 Tahun Tahan Pudar berlaku?</span>
                <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center ml-4">
                  <span className="text-2xl font-bold text-[#ea2423] group-open:hidden">+</span>
                  <span className="text-2xl font-bold text-[#ea2423] hidden group-open:block">−</span>
                </div>
              </summary>
              <div className="px-6 pb-5 text-base text-gray-700 leading-relaxed border-t border-gray-100">
                <p className="pt-4">
                  Garansi ini berlaku untuk pemudaran atau retak di bawah kondisi penggunaan normal di dalam ruangan (tidak terkena sinar matahari langsung ekstrem atau kelembaban tinggi). Kami akan mengganti produk secara gratis jika kondisi ini tidak terpenuhi dalam periode garansi.
                </p>
              </div>
            </details>

            {/* Q3: Proses Produksi */}
            <details className="group border border-gray-200 rounded-lg overflow-hidden bg-white hover:border-[#ea2423] transition-colors">
              <summary className="flex items-center justify-between px-6 py-4 cursor-pointer list-none font-semibold text-lg text-gray-900 hover:text-[#ea2423] transition-colors">
                <span>Berapa lama proses produksi dan pengiriman?</span>
                <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center ml-4">
                  <span className="text-2xl font-bold text-[#ea2423] group-open:hidden">+</span>
                  <span className="text-2xl font-bold text-[#ea2423] hidden group-open:block">−</span>
                </div>
              </summary>
              <div className="px-6 pb-5 text-base text-gray-700 leading-relaxed border-t border-gray-100">
                <p className="pt-4">
                  Waktu produksi standar adalah <strong>2-3 hari kerja</strong>. Pengiriman reguler (termasuk <em>packing kayu</em> gratis untuk ukuran ≥60x90 cm) membutuhkan tambahan 1-3 hari (Jabodetabek) atau 3-7 hari (Luar Jawa).
                </p>
              </div>
            </details>

            {/* Q4: Resolusi Foto */}
            <details className="group border border-gray-200 rounded-lg overflow-hidden bg-white hover:border-[#ea2423] transition-colors">
              <summary className="flex items-center justify-between px-6 py-4 cursor-pointer list-none font-semibold text-lg text-gray-900 hover:text-[#ea2423] transition-colors">
                <span>Apa resolusi foto minimum yang dibutuhkan?</span>
                <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center ml-4">
                  <span className="text-2xl font-bold text-[#ea2423] group-open:hidden">+</span>
                  <span className="text-2xl font-bold text-[#ea2423] hidden group-open:block">−</span>
                </div>
              </summary>
              <div className="px-6 pb-5 text-base text-gray-700 leading-relaxed border-t border-gray-100">
                <p className="pt-4">
                  Kami merekomendasikan resolusi foto minimum <strong>300 DPI</strong> untuk hasil cetak yang paling tajam. Untuk ukuran 60x90 cm, foto harus minimal 2000 x 3000 pixel. Tim kami akan melakukan quality check dan menghubungi Anda jika resolusi foto terlalu rendah sebelum produksi dimulai.
                </p>
              </div>
            </details>
          </div>

          {/* Bottom CTA */}
          <div className="mt-12 text-center p-6 bg-gray-50 rounded-xl">
            <p className="text-gray-700 mb-4">
              Masih ada pertanyaan? Tim kami siap membantu!
            </p>
            <a
              href="https://wa.me/6281936444486"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#ea2423] text-white font-bold rounded-lg hover:bg-[#c91f1e] transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Chat via WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#ea2423]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
            Siap Mencetak Kenangan Anda?
          </h2>
          <p className="text-white/90 text-lg mb-8">
            Upload foto Anda sekarang dan lihat preview langsung. Proses cepat & mudah!
          </p>
          <Link
            href="/upload/canvas"
            className="inline-flex items-center gap-2 px-10 py-5 bg-white text-[#ea2423] font-bold text-xl rounded-lg hover:bg-gray-100 transition-all shadow-2xl hover:shadow-3xl"
          >
            Mulai Desain Kanvas Sekarang
            <ChevronRight className="w-6 h-6" />
          </Link>
          <p className="text-white/75 text-sm mt-6">
            Konsultasi gratis via WhatsApp • Respon cepat • Garansi 100% Uang Kembali
          </p>
        </div>
      </section>
    </>
  );
}


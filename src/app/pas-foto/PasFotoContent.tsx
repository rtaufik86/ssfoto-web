"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Check,
  ShieldCheck,
  ChevronRight,
  Star,
  Clock,
  Award,
  MapPin,
  Zap,
  Upload,
  MessageCircle,
  Smartphone,
  Printer,
  Package,
  CheckCircle,
} from "lucide-react";
import ReviewSection from "./ReviewSection";
import ProductBreadcrumb from "@/components/ui/ProductBreadcrumb";

// ─── DATA ────────────────────────────────────────────────────────────────────

const STEPS = [
  {
    step: 1,
    icon: <Upload className="w-7 h-7" />,
    title: "Upload Foto",
    desc: "Upload foto langsung di website atau kirim via WhatsApp. Foto dari HP sudah cukup.",
  },
  {
    step: 2,
    icon: <Package className="w-7 h-7" />,
    title: "Pilih Ukuran",
    desc: "Tentukan ukuran: 2×3, 3×4, atau 4×6. Kami siapkan sesuai standar dokumen resmi.",
  },
  {
    step: 3,
    icon: <Printer className="w-7 h-7" />,
    title: "Kami Cetak di Lab",
    desc: "Foto dicetak dengan mesin lab profesional — warna akurat, hasil tajam, tidak mudah pudar.",
  },
  {
    step: 4,
    icon: <MapPin className="w-7 h-7" />,
    title: "Ambil di Toko",
    desc: "Siap dalam hitungan jam. Ambil di cabang SS Foto terdekat dari lokasi Anda.",
  },
];

const USE_CASES = [
  { icon: "💼", label: "Melamar kerja & CPNS" },
  { icon: "✈️", label: "Pembuatan paspor & visa" },
  { icon: "🪪", label: "KTP, KK, dan dokumen administrasi" },
  { icon: "🎓", label: "Keperluan sekolah & kampus" },
  { icon: "📄", label: "SKCK dan surat resmi lainnya" },
];

const VALUE_PROPS = [
  {
    icon: <Award className="w-8 h-8" />,
    color: "bg-orange-100 text-orange-600 group-hover:bg-orange-600 group-hover:text-white",
    title: "Mesin Lab Profesional",
    desc: "Bukan printer biasa. SS Foto menggunakan mesin cetak lab yang menghasilkan warna akurat dan detail tajam — standar fotografer profesional.",
  },
  {
    icon: <ShieldCheck className="w-8 h-8" />,
    color: "bg-green-100 text-green-600 group-hover:bg-green-600 group-hover:text-white",
    title: "Jaminan Lolos Dokumen",
    desc: "Pas foto SS Foto memenuhi standar warna, ukuran, dan latar belakang untuk dokumen resmi — dari KTP hingga paspor internasional.",
  },
  {
    icon: <Clock className="w-8 h-8" />,
    color: "bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white",
    title: "Proses Cepat",
    desc: "Upload pagi, ambil siang. Tidak perlu antre panjang. Kami proses segera setelah file diterima.",
  },
  {
    icon: <MapPin className="w-8 h-8" />,
    color: "bg-purple-100 text-purple-600 group-hover:bg-purple-600 group-hover:text-white",
    title: "5 Cabang di Jabodetabek",
    desc: "Rawamangun, Bekasi, Bogor, dan cabang lainnya. Pilih yang paling dekat dari lokasi Anda.",
  },
];

const GUARANTEE_ITEMS = [
  "Ukuran sesuai standar dokumen resmi",
  "Latar belakang sesuai ketentuan (merah, biru, putih)",
  "Hasil cetak tajam, tidak buram",
  "Warna konsisten antar lembar",
];

const SIZES = [
  { size: "2×3 cm", use: "KTP, KK, akta, melamar kerja", price: "Rp 35.000" },
  { size: "3×4 cm", use: "Ijazah, rapor, SKCK, CPNS", price: "Rp 35.000" },
  { size: "4×6 cm", use: "Paspor, visa, SIM internasional", price: "Rp 35.000" },
];

const FAQS = [
  {
    q: "Apakah foto dari HP bisa langsung dicetak?",
    a: "Ya. Kirim foto via WhatsApp, tim kami siap proses. Pastikan foto cukup terang dan tidak blur.",
    visible: true,
  },
  {
    q: "Berapa lama proses cetak pas foto?",
    a: "Rata-rata 1–2 jam setelah file diterima. Untuk kebutuhan mendesak, hubungi kami langsung.",
    visible: true,
  },
  {
    q: "Apakah hasil cetak bisa digunakan untuk CPNS dan paspor?",
    a: "Ya. SS Foto mencetak sesuai standar ukuran dan warna yang ditetapkan untuk dokumen resmi termasuk CPNS dan paspor.",
    visible: false,
  },
  {
    q: "Apakah ada layanan edit foto sebelum dicetak?",
    a: "Ya. Tim kami bisa bantu penyesuaian latar belakang, kecerahan, dan cropping sesuai kebutuhan dokumen.",
    visible: false,
  },
  {
    q: "Apakah SS Foto menerima pesanan dalam jumlah besar?",
    a: "Ya. Hubungi kami via WhatsApp untuk kebutuhan pas foto massal (instansi, sekolah, perusahaan).",
    visible: false,
  },
];

const BRANCHES = [
  { name: "Rawamangun", area: "Jakarta Timur" },
  { name: "Galaxy", area: "Bekasi" },
  { name: "Assyafiiyah", area: "Jakarta Timur" },
  { name: "Pondok Pinang", area: "Jakarta Selatan" },
  { name: "Bogor", area: "Bogor" },
];

const UPLOAD_LINK = "/upload/pas-foto";
const WA_SUPPORT = "https://wa.me/6281936444486?text=Halo%20SS%20Foto%2C%20saya%20butuh%20bantuan%20pas%20foto";

// ─── SUB-COMPONENTS ───────────────────────────────────────────────────────────

function PrimaryBtn({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#ea2423] text-white font-bold rounded-xl text-lg hover:bg-[#c91f1e] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
    >
      {children}
    </Link>
  );
}



function TrustBadge({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
      <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center text-[#ea2423]">
        {icon}
      </div>
      <span>{label}</span>
    </div>
  );
}

function FaqItem({ q, a, defaultOpen = false }: { q: string; a: string; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div
      className={`border rounded-2xl overflow-hidden transition-all ${open ? "border-[#ea2423] shadow-sm" : "border-gray-200"}`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full px-6 py-5 text-left bg-gray-50 hover:bg-gray-100 transition-colors"
        aria-expanded={open}
      >
        <span className="font-bold text-gray-900 text-base pr-4">{q}</span>
        <div
          className={`w-7 h-7 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${open ? "border-[#ea2423] text-[#ea2423]" : "border-gray-300 text-gray-400"}`}
        >
          <span className="text-xl font-bold leading-none">{open ? "−" : "+"}</span>
        </div>
      </button>
      {open && (
        <div className="px-6 pb-6 pt-4 text-gray-600 leading-relaxed bg-white border-t border-gray-100">
          {a}
        </div>
      )}
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

export default function PasFotoPage() {
  return (
    <>
      <ProductBreadcrumb productName="Pas Foto" productSlug="pas-foto" />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SECTION 0 — HERO
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative bg-white overflow-hidden">
        {/* Decorative background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -right-32 w-[600px] h-[600px] bg-red-50 rounded-full blur-3xl opacity-60" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-50 rounded-full blur-3xl opacity-40" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left — Copy */}
          <div>
            {/* Tag pill */}
            <span className="inline-block px-4 py-1.5 bg-red-50 text-[#ea2423] text-sm font-bold rounded-full mb-6">
              ✨ Layanan Profesional SS Foto
            </span>

            {/* H1 */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-5 leading-tight">
              Pas Foto Online —<br />
              <span className="text-[#ea2423]">Upload, Cetak, Ambil di Toko</span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl text-gray-600 mb-6 leading-relaxed max-w-xl">
              SS Foto mencetak pas foto Anda dengan mesin lab profesional. Upload dari HP, pilih
              ukuran, ambil di cabang terdekat.
            </p>

            {/* Social proof line */}
            <div className="flex items-center gap-2 mb-8">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="font-bold text-gray-800">4.9</span>
              <span className="text-gray-500">· Dipercaya ribuan pelanggan di Jakarta, Bekasi, dan Bogor</span>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <PrimaryBtn href={UPLOAD_LINK}>
                <Upload className="w-5 h-5" />
                Upload Foto Sekarang
              </PrimaryBtn>
            </div>
            {/* Support help text — low visibility */}
            <p className="text-sm text-gray-400 mb-10">
              Butuh bantuan?{" "}
              <a
                href={WA_SUPPORT}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-700 underline underline-offset-2"
              >
                Hubungi tim kami
              </a>
            </p>

            {/* Trust badges */}
            <div className="grid grid-cols-2 gap-3 pt-6 border-t border-gray-100">
              <TrustBadge icon={<Award className="w-4 h-4" />} label="Mesin Lab Profesional" />
              <TrustBadge icon={<Zap className="w-4 h-4" />} label="Cetak Hari Ini" />
              <TrustBadge icon={<ShieldCheck className="w-4 h-4" />} label="Jaminan Lolos Dokumen" />
              <TrustBadge icon={<MapPin className="w-4 h-4" />} label="5 Cabang Jabodetabek" />
            </div>
          </div>

          {/* Right — Visual (size cards) */}
          <div className="relative flex flex-col gap-4">
            {/* Preview: stacked size cards */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-8 border border-gray-100 text-center shadow-sm">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
                Ukuran Pas Foto Tersedia
              </p>
              <div className="flex items-end justify-center gap-6">
                {/* 2x3 */}
                <div className="flex flex-col items-center gap-2">
                  <div
                    className="bg-blue-500 rounded-lg shadow-xl"
                    style={{ width: 64, height: 96 }}
                  >
                    <div className="w-full h-full rounded-lg overflow-hidden relative">
                      <Image
                        src="/images/products/pas-foto-background-biru.png"
                        alt="Pas foto 2x3 background biru"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <span className="text-xs font-bold text-gray-600">2×3</span>
                </div>
                {/* 3x4 — featured */}
                <div className="flex flex-col items-center gap-2">
                  <div
                    className="bg-red-500 rounded-lg shadow-2xl ring-4 ring-[#ea2423]/20"
                    style={{ width: 80, height: 107 }}
                  >
                    <div className="w-full h-full rounded-lg overflow-hidden relative">
                      <Image
                        src="/images/products/pas-foto-background-merah.png"
                        alt="Pas foto 3x4 background merah"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#ea2423]">3×4 ★</span>
                </div>
                {/* 4x6 */}
                <div className="flex flex-col items-center gap-2">
                  <div
                    className="bg-gray-300 rounded-lg shadow-xl"
                    style={{ width: 96, height: 144 }}
                  >
                    <div className="w-full h-full rounded-lg overflow-hidden relative">
                      <Image
                        src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=600&auto=format&fit=crop"
                        alt="Pas foto 4x6 background putih"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <span className="text-xs font-bold text-gray-600">4×6</span>
                </div>
              </div>
              <p className="mt-6 text-xs text-gray-500">
                Background merah · biru · putih — semua tersedia
              </p>
            </div>

            {/* Floating badge */}
            <div className="absolute -top-4 -right-4 bg-[#ea2423] text-white rounded-2xl px-4 py-3 shadow-xl text-center">
              <p className="text-2xl font-black">Mulai</p>
              <p className="text-lg font-bold">Rp 35.000</p>
            </div>

            {/* Quick features */}
            <div className="grid grid-cols-3 gap-3 mt-2">
              {[
                { icon: <Smartphone className="w-5 h-5" />, label: "Dari HP" },
                { icon: <Clock className="w-5 h-5" />, label: "1–2 Jam" },
                { icon: <CheckCircle className="w-5 h-5" />, label: "Garansi Lolos" },
              ].map((f) => (
                <div
                  key={f.label}
                  className="flex flex-col items-center gap-1.5 p-3 bg-white rounded-xl border border-gray-100 shadow-sm text-center"
                >
                  <div className="text-[#ea2423]">{f.icon}</div>
                  <span className="text-xs font-bold text-gray-700">{f.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SECTION 1 — CARA PESAN (4 STEPS)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_#ea2423,_transparent_60%)]" />
        </div>
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Cara Pesan Pas Foto Online
            </h2>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">
              Cukup 4 langkah mudah — dari HP Anda langsung ke dokumen resmi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {STEPS.map((item, idx) => (
              <div key={item.step} className="relative">
                {/* Connector line */}
                {idx < STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-[#ea2423]/60 to-transparent z-0" />
                )}
                <div className="flex flex-col items-center text-center p-6 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 hover:border-[#ea2423]/50 transition-all group">
                  <div className="w-16 h-16 rounded-2xl bg-[#ea2423] flex items-center justify-center mb-4 text-white group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <div className="text-[#ea2423] font-black text-xs uppercase tracking-widest mb-1">
                    Langkah {item.step}
                  </div>
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <PrimaryBtn href={UPLOAD_LINK}>
              Upload Foto Sekarang <ChevronRight className="w-5 h-5" />
            </PrimaryBtn>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SECTION 2 — UKURAN & HARGA
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Ukuran Pas Foto
            </h2>
            <p className="text-gray-600 text-lg">
              Semua ukuran tersedia sesuai standar dokumen resmi Indonesia.
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-4 font-bold text-gray-900">Ukuran</th>
                  <th className="px-6 py-4 font-bold text-gray-900">Kegunaan</th>
                  <th className="px-6 py-4 font-bold text-gray-900 text-right">Harga mulai</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {SIZES.map((row) => (
                  <tr key={row.size} className="hover:bg-red-50/30 transition-colors">
                    <td className="px-6 py-4 font-bold text-[#ea2423] text-lg">{row.size}</td>
                    <td className="px-6 py-4 text-gray-600">{row.use}</td>
                    <td className="px-6 py-4 font-bold text-gray-900 text-right">{row.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-sm text-gray-500 mt-3 text-center">
            Harga per set.{" "}
            <a
              href={WA_SUPPORT}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-gray-700"
            >
              Hubungi kami
            </a>
            {" "}untuk kebutuhan jumlah besar.
          </p>


        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SECTION 3 — USE CASE
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Pas Foto untuk Berbagai Kebutuhan
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {USE_CASES.map((uc) => (
              <div
                key={uc.label}
                className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:border-[#ea2423]/40 hover:shadow-md transition-all"
              >
                <span className="text-2xl">{uc.icon}</span>
                <span className="font-semibold text-gray-800">{uc.label}</span>
              </div>
            ))}
          </div>

          <p className="text-center text-gray-600">
            Tidak tahu ukuran yang dibutuhkan?{" "}
            <Link href={UPLOAD_LINK} className="text-[#ea2423] font-bold hover:underline">
              Upload foto sekarang, tim kami siap bantu.
            </Link>
          </p>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SECTION 4 — VALUE PROPOSITION
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 bg-white overflow-hidden relative">
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 bg-red-50 rounded-full blur-3xl opacity-40 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Kenapa Pilih SS Foto?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUE_PROPS.map((vp) => (
              <div
                key={vp.title}
                className="p-8 rounded-3xl bg-gray-50 border border-gray-100 transition-all hover:bg-white hover:shadow-2xl hover:border-transparent hover:-translate-y-2 group"
              >
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-colors ${vp.color}`}
                >
                  {vp.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{vp.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">{vp.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SECTION 5 — GALERI
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Hasil Cetak Lab SS Foto
            </h2>
            <p className="text-gray-600">
              Contoh hasil pas foto cetak lab — warna konsisten, detail tajam, siap digunakan untuk dokumen resmi.
            </p>
          </div>

          {(() => {
            const galleryImages = [
              { src: "/images/products/pas-foto-background-merah.png", label: "3×4 Background Merah", alt: "pas foto 3x4 background merah hasil cetak lab SS Foto" },
              { src: "/images/products/pas-foto-background-biru.png", label: "3×4 Background Biru", alt: "pas foto 3x4 background biru hasil cetak lab SS Foto" },
              { src: "/images/products/cetak-pas-foto-dengan-mudah.png", label: "Cetak dari HP", alt: "cetak pas foto online dari HP SS Foto" },
              { src: "/images/products/kertas-cetak-pas-foto-profesional.png", label: "Kertas Lab Pro", alt: "kertas cetak pas foto profesional lab SS Foto" },
              { src: "/images/products/layanan-pas-foto.jpg", label: "Layanan SS Foto", alt: "layanan pas foto profesional SS Foto Jakarta" },
              { src: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?q=80&w=600&auto=format&fit=crop", label: "Hasil Cetak 4×6", alt: "pas foto 4x6 hasil cetak lab profesional" },
            ];
            return (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {galleryImages.map((img, i) => (
                  <div key={i} className="aspect-[3/4] relative rounded-2xl overflow-hidden shadow-md group">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      loading="lazy"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                      <span className="text-white text-xs font-bold">{img.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            );
          })()}

          {/* Internal link to cetak-foto */}
          <p className="text-center mt-8 text-gray-600 text-sm">
            Butuh{" "}
            <Link href="/cetak-foto" className="text-[#ea2423] font-bold hover:underline">
              cetak foto profesional
            </Link>{" "}
            selain pas foto? Kami juga menyediakan layanan cetak foto ukuran lainnya.
          </p>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SECTION 6 — JAMINAN LOLOS
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Visual */}
            <div className="order-2 lg:order-1 relative flex items-center justify-center">
              <div className="absolute inset-0 bg-red-100 rounded-full blur-3xl opacity-30 scale-75" />
              <ShieldCheck className="w-56 h-56 text-[#ea2423] relative z-10 opacity-15" />
              <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
                <span className="text-7xl font-black text-gray-900 leading-none">100%</span>
                <span className="text-xl font-bold text-[#ea2423] mt-2 uppercase tracking-widest">
                  Garansi Lolos
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Jaminan Lolos Aplikasi Online
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                SS Foto memastikan setiap hasil cetak memenuhi persyaratan foto dokumen resmi —
                ukuran piksel, ukuran file, warna latar, dan posisi wajah sesuai standar CPNS,
                paspor, dan keperluan administrasi lainnya.
              </p>

              <div className="space-y-4 mb-10">
                {GUARANTEE_ITEMS.map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-gray-800 font-medium">✓ {item}</span>
                  </div>
                ))}
              </div>

              <div className="p-5 bg-red-50 border-l-4 border-[#ea2423] rounded-r-xl mb-8">
                <p className="font-bold text-gray-900 mb-1">Garansi Cetak Ulang Gratis:</p>
                <p className="text-gray-700 text-sm">
                  Jika foto yang kami proses ditolak oleh sistem karena alasan teknis, kami cetak
                  ulang dan kirim file baru —{" "}
                  <strong>tanpa biaya tambahan</strong>.
                  Jika foto tidak sesuai, tim SS Foto akan menghubungi Anda untuk penyesuaian.
                </p>
              </div>

              <PrimaryBtn href={UPLOAD_LINK}>
                <Upload className="w-5 h-5" />
                Upload Foto Sekarang
              </PrimaryBtn>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SECTION 7 — TESTIMONI (slim)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <ReviewSection />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SECTION 8 — LOCAL (soft, singkat)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-16 bg-gray-50 border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            Butuh Pas Foto Langsung?
          </h2>
          <p className="text-gray-600 mb-8">
            SS Foto hadir di 5 lokasi di Jabodetabek — mudah dijangkau dari mana saja.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {BRANCHES.map((b) => (
              <div
                key={b.name}
                className="flex items-center gap-2 px-5 py-2.5 bg-white rounded-full shadow-sm border border-gray-100"
              >
                <MapPin className="w-4 h-4 text-[#ea2423]" />
                <span className="font-semibold text-gray-800 text-sm">
                  {b.name}
                  <span className="text-gray-400 font-normal"> — {b.area}</span>
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/lokasi"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-200 text-gray-800 font-bold rounded-xl hover:border-[#ea2423] hover:text-[#ea2423] transition-all"
            >
              Lihat Semua Lokasi <ChevronRight className="w-4 h-4" />
            </Link>
            <Link
              href="/pas-foto/rawamangun"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-200 text-gray-800 font-bold rounded-xl hover:border-[#ea2423] hover:text-[#ea2423] transition-all"
            >
              Cabang Rawamangun <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SECTION 9 — FAQ (online only)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Pertanyaan yang Sering Ditanyakan
            </h2>
            <p className="text-gray-600">
              Punya pertanyaan lain?{" "}
              <Link href={UPLOAD_LINK} className="text-[#ea2423] font-bold hover:underline">
                Upload foto sekarang
              </Link>
              {" "}dan tim kami akan segera menghubungi Anda.
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => (
              <FaqItem key={idx} q={faq.q} a={faq.a} defaultOpen={faq.visible} />
            ))}
          </div>

          {/* WA support — allowed in FAQ, text link only */}
          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-500">
              Masih ada pertanyaan?{" "}
              <a
                href={WA_SUPPORT}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-gray-600 font-medium hover:text-gray-900 underline underline-offset-2"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                Hubungi tim kami melalui WhatsApp
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SECTION 10 — FINAL CTA
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-gradient-to-r from-[#ea2423] to-[#ff4d4d] rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-black/10 rounded-full blur-3xl" />

            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                Siap Cetak Pas Foto Anda Sekarang?
              </h2>
              <p className="text-white/90 text-lg mb-10">
                Upload foto, pilih ukuran, dan ambil di{" "}
                <Link href="/lokasi" className="underline font-bold hover:text-white">
                  cabang SS Foto terdekat
                </Link>
                .<br />
                Proses cepat, hasil profesional, jaminan lolos dokumen.
              </p>
              <div className="flex justify-center">
                <Link
                  href={UPLOAD_LINK}
                  className="inline-flex items-center justify-center gap-2 px-12 py-5 bg-white text-[#ea2423] font-bold text-xl rounded-2xl hover:bg-gray-100 transition-all shadow-xl hover:-translate-y-0.5"
                >
                  <Upload className="w-6 h-6" />
                  Upload Foto Online
                </Link>
              </div>
              <p className="mt-8 text-white/70 text-sm">
                ✨ Proses 1–2 Jam · Konsultasi Ukuran Gratis · Garansi Cetak Ulang
              </p>
              <p className="mt-2 text-white/50 text-xs">
                Butuh bantuan?{" "}
                <a
                  href={WA_SUPPORT}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-white/80"
                >
                  Chat WhatsApp
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          STICKY CTA — MOBILE ONLY
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden p-4 bg-white/95 backdrop-blur border-t border-gray-200 shadow-2xl">
        <Link
          href={UPLOAD_LINK}
          className="w-full flex items-center justify-center gap-2 py-4 bg-[#ea2423] text-white font-bold rounded-xl text-base"
        >
          <Upload className="w-5 h-5" />
          Upload Foto Sekarang
        </Link>
      </div>

      {/* Spacer for sticky CTA on mobile */}
      <div className="md:hidden h-24" />
    </>
  );
}

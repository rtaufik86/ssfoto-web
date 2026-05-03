import type { Metadata } from 'next';
import { MapPin, CheckCircle, Clock, ShieldCheck, MessageCircle, ChevronRight, Zap } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: "Cetak Foto Rawamangun – SS Foto Jakarta Timur",
  description: "Layanan cetak foto di Rawamangun dengan kualitas lab profesional. SS Foto menyediakan berbagai ukuran cetak foto dari 4R hingga besar untuk kebutuhan pribadi dan dokumentasi di Jakarta Timur.",
  alternates: { canonical: 'https://www.ssfoto.co.id/cetak-foto/rawamangun' }
};

export default function CetakFotoRawamangun() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-6">
              <span className="bg-red-50 text-[#ea2423] px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">
                Professional Print: Rawamangun
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Cetak Foto di Rawamangun Jakarta Timur
            </h1>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
              SS Foto menyediakan layanan cetak foto profesional di Rawamangun, Jakarta Timur, yang melayani berbagai kebutuhan cetak foto dari ukuran kecil hingga besar dengan kualitas lab printing terbaik. Sebagai penyedia layanan cetak foto terpercaya di Jakarta Timur, SS Foto memastikan setiap hasil cetak tajam, warna akurat, dan tahan lama.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link
                href="/upload/cetak-foto"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#ea2423] text-white font-bold rounded-xl hover:bg-[#c91f1e] transition-all shadow-lg hover:shadow-2xl"
              >
                Cetak Foto Online →
              </Link>
              <a
                href="https://wa.me/6281936444486"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#25D366] text-white font-bold rounded-xl hover:bg-[#1da851] transition-all"
              >
                <MessageCircle className="w-5 h-5" />
                Order via WhatsApp
              </a>
            </div>

            <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <Image
                src="/images/products/kertas-cetak-pas-foto-profesional.png"
                alt="Hasil Cetak Foto Lab Profesional - SS Foto Rawamangun"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
        {/* Abstract Background Element */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-50/50 clip-path-slant hidden lg:block" />
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="prose prose-lg prose-slate max-w-none">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Cetak Foto Berkualitas di Rawamangun</h2>
            <p className="text-gray-600 mb-6">
              Rawamangun merupakan salah satu kawasan di Jakarta Timur yang memiliki kebutuhan tinggi akan layanan cetak foto, mulai dari kebutuhan pribadi, dokumentasi acara, hingga keperluan profesional. Bagi Anda yang berada di Rawamangun dan sekitarnya, SS Foto hadir sebagai tempat cetak foto terpercaya dengan hasil lab printing profesional.
            </p>
            <p className="text-gray-600 mb-8">
              SS Foto Rawamangun dikenal sebagai salah satu tempat cetak foto berkualitas di Jakarta Timur dengan mesin printing profesional dan kertas foto premium. Berbeda dengan cetak foto biasa, kami menggunakan standar lab printing sehingga hasil cetak tajam, warna akurat, dan tahan lama.
            </p>
            
            <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 my-12 flex items-start gap-4">
              <Zap className="w-8 h-8 text-amber-500 shrink-0 mt-1" />
              <p className="text-gray-600 italic leading-relaxed">
                Anda bisa mencetak foto langsung dari smartphone, kamera digital, maupun file yang dikirimkan secara online melalui WhatsApp. Setiap foto diproses dengan teliti untuk memastikan warna dan detail sesuai dengan aslinya.
              </p>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Area yang Kami Layani</h2>
            <p className="text-gray-600 mb-8">
              Layanan cetak foto SS Foto tidak hanya tersedia untuk pelanggan di Rawamangun, tetapi juga mencakup area sekitar seperti Pulogadung, Kayu Putih, Pisangan Baru, Utan Kayu, dan seluruh wilayah Jakarta Timur. Anda cukup datang langsung ke toko kami atau kirim file foto terlebih dahulu melalui WhatsApp.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Cabang SS Foto di Rawamangun</h2>
            <p className="text-gray-600 mb-8">
               Cabang SS Foto di Rawamangun siap melayani kebutuhan cetak foto Anda setiap hari. Lokasi kami strategis dan mudah dijangkau dari berbagai wilayah Jakarta Timur. Untuk informasi lengkap alamat dan jam operasional, kunjungi halaman <Link href="/lokasi" className="text-[#ea2423] font-bold hover:underline italic">lokasi</Link> kami.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Ukuran Cetak Foto yang Tersedia</h2>
            <p className="text-gray-600 mb-8">
               SS Foto menyediakan berbagai ukuran <Link href="/cetak-foto" className="text-[#ea2423] font-bold hover:underline italic">cetak foto</Link> untuk berbagai kebutuhan:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="p-6 border border-gray-100 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow">
                <p className="font-bold text-gray-900 mb-2">4R (10x15 cm)</p>
                <p className="text-sm text-gray-500">Ukuran paling populer untuk foto keluarga & album kenangan.</p>
              </div>
              <div className="p-6 border border-gray-100 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow">
                <p className="font-bold text-gray-900 mb-2">5R (13x18 cm)</p>
                <p className="text-sm text-gray-500">Ideal untuk foto wisuda, keluarga, dan dokumentasi acara.</p>
              </div>
              <div className="p-6 border border-gray-100 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow">
                <p className="font-bold text-gray-900 mb-2">10R (20x25 cm)</p>
                <p className="text-sm text-gray-500">Ukuran medium yang ideal untuk pajangan rumah atau kantor.</p>
              </div>
              <div className="p-6 border border-gray-100 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow">
                <p className="font-bold text-gray-900 mb-2 uppercase tracking-widest">Ukuran Besar</p>
                <p className="text-sm text-gray-500">Melayani cetak ukuran besar untuk display pameran & dekorasi.</p>
              </div>
            </div>

            <p className="text-gray-600 mb-12">
               Semua ukuran dicetak menggunakan kertas foto berkualitas tinggi dengan pilihan finishing glossy maupun matte sesuai preferensi Anda.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mb-6">Cocok untuk Berbagai Kebutuhan</h2>
            <ul className="space-y-4 mb-12 list-none p-0">
               {[
                 "Foto kenangan keluarga dan momen pribadi",
                 "Foto wisuda, ulang tahun, dan acara spesial",
                 "Foto dokumentasi pernikahan dan prewedding",
                 "Foto untuk bingkai dan dekorasi rumah",
                 "Foto album dan koleksi pribadi",
                 "Keperluan cetak foto dalam jumlah banyak"
               ].map((item, i) => (
                 <li key={i} className="flex items-center gap-3 text-gray-700">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                    {item}
                 </li>
               ))}
            </ul>

            <p className="text-gray-600 mb-12">
               Lihat juga informasi lengkap mengenai layanan <Link href="/cetak-foto" className="text-[#ea2423] font-bold hover:underline italic">cetak foto</Link> SS Foto untuk semua ukuran dan pilihan kertas yang tersedia.
            </p>

            {/* FAQ Section */}
            <div className="bg-slate-50 p-10 rounded-[2rem] my-20 border border-slate-100">
               <h3 className="text-2xl font-bold mb-8 text-gray-900">FAQ Cetak Foto Rawamangun</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <p className="font-bold text-base mb-2 text-gray-900 underline decoration-red-500 underline-offset-4">Apakah bisa cetak foto di Rawamangun dari HP langsung?</p>
                    <p className="text-gray-500 text-sm">Ya. Anda bisa mengirim file foto dari smartphone langsung melalui WhatsApp, kemudian hasil cetak bisa diambil di toko SS Foto Rawamangun.</p>
                  </div>
                  <div>
                    <p className="font-bold text-base mb-2 text-gray-900 underline decoration-red-500 underline-offset-4">Berapa lama proses cetak foto di Rawamangun?</p>
                    <p className="text-gray-500 text-sm">Proses cetak foto umumnya selesai dalam waktu singkat tergantung jumlah foto. Untuk kebutuhan mendesak, datang langsung ke toko kami.</p>
                  </div>
                  <div>
                    <p className="font-bold text-base mb-2 text-gray-900 underline decoration-red-500 underline-offset-4">Jenis kertas apa yang digunakan?</p>
                    <p className="text-gray-500 text-sm">Kami menggunakan kertas foto berkualitas lab dengan pilihan glossy atau matte sesuai kebutuhan Anda.</p>
                  </div>
                  <div>
                    <p className="font-bold text-base mb-2 text-gray-900 underline decoration-red-500 underline-offset-4">Bisa cetak foto dalam jumlah banyak?</p>
                    <p className="text-gray-500 text-sm">Ya, melayani cetak foto dalam jumlah banyak untuk dokumentasi acara, wisuda, pernikahan, maupun keperluan lainnya.</p>
                  </div>
               </div>
            </div>

            <div className="text-center py-12 bg-gray-900 text-white rounded-[2rem] px-6 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-600 rounded-full blur-[80px] opacity-20" />
                <h3 className="text-3xl font-bold mb-4">Cetak Foto Sekarang di SS Foto Rawamangun</h3>
                <p className="text-gray-400 mb-10 max-w-xl mx-auto">
                   Ingin cetak foto berkualitas di Rawamangun? Kunjungi SS Foto terdekat sekarang untuk layanan cetak foto cepat dan profesional di Jakarta Timur, atau kirim file foto Anda melalui WhatsApp.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/lokasi"
                    className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-white text-gray-900 font-bold rounded-xl shadow-lg hover:bg-gray-100"
                  >
                    <MapPin className="w-5 h-5 text-red-600" />
                    Lokasi Cabang
                  </Link>
                  <a
                    href="https://wa.me/6281936444486"
                    className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-[#25D366] text-white font-bold rounded-xl shadow-lg hover:bg-[#1da851]"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Kirim Foto
                  </a>
                </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

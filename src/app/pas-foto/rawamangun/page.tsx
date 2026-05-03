import type { Metadata } from 'next';
import { MapPin, CheckCircle, Clock, ShieldCheck, MessageCircle, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: "Pas Foto Rawamangun – SS Foto Jakarta Timur",
  description: "Layanan pas foto di Rawamangun dengan hasil profesional dan proses cepat. SS Foto melayani berbagai kebutuhan dokumen resmi, visa, sekolah, dan pekerjaan di Jakarta Timur.",
  alternates: { canonical: 'https://www.ssfoto.co.id/pas-foto/rawamangun' }
};

export default function PasFotoRawamangun() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-6">
              <span className="bg-red-50 text-[#ea2423] px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">
                Local Services: Rawamangun
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Pas Foto di Rawamangun Jakarta Timur
            </h1>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
              SS Foto menyediakan layanan pas foto profesional di Rawamangun, Jakarta Timur, yang melayani berbagai kebutuhan dokumen resmi, sekolah, pekerjaan, hingga visa. Sebagai penyedia layanan foto terpercaya di Jakarta Timur, SS Foto memastikan setiap hasil pas foto sesuai standar dan siap digunakan.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link
                href="/upload/pas-foto"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#ea2423] text-white font-bold rounded-xl hover:bg-[#c91f1e] transition-all shadow-lg hover:shadow-2xl"
              >
                Mulai Upload Foto →
              </Link>
              <a
                href="https://wa.me/6281936444486"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-gray-200 text-gray-900 font-bold rounded-xl hover:border-[#ea2423] transition-all"
              >
                <MessageCircle className="w-5 h-5 text-green-500" />
                WhatsApp CS
              </a>
            </div>

            <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <Image
                src="/images/products/pas-foto-background-merah.png"
                alt="Contoh Pas Foto Standar Resmi - SS Foto Rawamangun"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
        {/* Abstract Background Element */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-red-50/50 clip-path-slant hidden lg:block" />
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="prose prose-lg prose-slate max-w-none">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Layanan Pas Foto Profesional di Rawamangun</h2>
            <p className="text-gray-600 mb-6">
              Rawamangun merupakan salah satu kawasan di Jakarta Timur yang memiliki kebutuhan tinggi akan layanan pas foto untuk berbagai keperluan administrasi. Bagi Anda yang berada di Rawamangun dan sekitarnya, SS Foto hadir sebagai pilihan tepat untuk kebutuhan pas foto profesional.
            </p>
            <p className="text-gray-600 mb-8">
              Setiap sesi pas foto ditangani langsung oleh fotografer berpengalaman dengan pencahayaan studio yang sesuai standar dokumen resmi. Hasilnya langsung dicetak di tempat sehingga Anda tidak perlu menunggu lama.
            </p>
            
            <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 my-12">
              <p className="text-gray-600 italic leading-relaxed">
                "SS Foto Rawamangun dikenal sebagai salah satu tempat pas foto terpercaya di Jakarta Timur dengan layanan cepat dan hasil berkualitas. Kami memahami bahwa setiap dokumen memiliki persyaratan ukuran dan latar belakang yang berbeda — mulai dari pas foto untuk KTP, ijazah, lamaran kerja, paspor, hingga visa, semua kami kerjakan sesuai standar yang dibutuhkan."
              </p>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Area yang Kami Layani</h2>
            <p className="text-gray-600 mb-8">
              Layanan pas foto SS Foto tidak hanya mencakup Rawamangun, tetapi juga area sekitar seperti Pulogadung, Kayu Putih, Pisangan Baru, Utan Kayu, dan seluruh wilayah Jakarta Timur. Anda yang berada di kawasan tersebut dapat langsung mengunjungi toko kami tanpa perlu reservasi terlebih dahulu.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Cabang SS Foto di Rawamangun</h2>
            <p className="text-gray-600 mb-8">
              Cabang SS Foto di Rawamangun berlokasi strategis dan mudah diakses dari berbagai penjuru Jakarta Timur. Toko kami buka setiap hari dan siap melayani kebutuhan pas foto Anda saat itu juga. Untuk informasi lengkap alamat dan jam operasional, kunjungi halaman <Link href="/lokasi" className="text-[#ea2423] font-bold hover:underline italic">lokasi</Link> kami.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Ukuran Pas Foto yang Tersedia</h2>
            <p className="text-gray-600 mb-8">
              SS Foto menyediakan berbagai ukuran <Link href="/pas-foto" className="text-[#ea2423] font-bold hover:underline italic">pas foto</Link> sesuai kebutuhan dokumen resmi:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="p-6 border border-gray-100 rounded-2xl bg-white shadow-sm">
                <p className="font-bold text-gray-900 mb-2">2x3 cm</p>
                <p className="text-xs text-gray-500">Digunakan untuk KTP, SIM, dan identitas resmi.</p>
              </div>
              <div className="p-6 border border-gray-100 rounded-2xl bg-white shadow-sm">
                <p className="font-bold text-gray-900 mb-2">3x4 cm</p>
                <p className="text-xs text-gray-500">Standard ijazah, lamaran kerja, transkrip nilai.</p>
              </div>
              <div className="p-6 border border-gray-100 rounded-2xl bg-white shadow-sm">
                <p className="font-bold text-gray-900 mb-2">4x6 cm</p>
                <p className="text-xs text-gray-500">Paspor, kartu pelajar, formulir khusus.</p>
              </div>
            </div>

            <p className="text-gray-600 mb-12">
              Semua ukuran tersedia dengan pilihan latar belakang merah, biru, atau putih sesuai persyaratan dokumen Anda.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mb-6">Cocok untuk Berbagai Kebutuhan</h2>
            <ul className="space-y-4 mb-12 list-none p-0">
               {[
                 "Dokumen resmi: KTP, SIM, paspor, akta",
                 "Kebutuhan sekolah: ijazah, kartu pelajar, beasiswa",
                 "Kebutuhan kerja: lamaran pekerjaan, SKCK, sertifikasi",
                 "Kebutuhan visa dan perjalanan luar negeri",
                 "Kebutuhan pribadi dan administrasi lainnya"
               ].map((item, i) => (
                 <li key={i} className="flex items-center gap-3 text-gray-700">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                    {item}
                 </li>
               ))}
            </ul>

            <p className="text-gray-600 mb-12">
                Lihat juga informasi lengkap mengenai layanan <Link href="/pas-foto" className="text-[#ea2423] font-bold hover:underline italic">pas foto</Link> SS Foto untuk semua jenis dokumen resmi.
            </p>

            {/* FAQ Section */}
            <div className="bg-gray-900 text-white p-10 rounded-[2rem] my-20">
               <h3 className="text-2xl font-bold mb-8">FAQ Pas Foto Rawamangun</h3>
               <div className="space-y-8">
                  <div>
                    <p className="font-bold text-lg mb-2 text-red-400">Apakah bisa pas foto di Rawamangun langsung jadi?</p>
                    <p className="text-gray-400 text-sm">Ya. SS Foto melayani pas foto dengan hasil cetak langsung di tempat. Proses pengambilan foto hingga cetak selesai dalam waktu singkat.</p>
                  </div>
                  <div>
                    <p className="font-bold text-lg mb-2 text-red-400">Apakah perlu reservasi untuk pas foto di Rawamangun?</p>
                    <p className="text-gray-400 text-sm">Tidak perlu. Anda bisa langsung datang ke toko SS Foto di Rawamangun tanpa perlu membuat janji terlebih dahulu.</p>
                  </div>
                  <div>
                    <p className="font-bold text-lg mb-2 text-red-400">Ukuran apa saja yang tersedia untuk pas foto di SS Foto?</p>
                    <p className="text-gray-400 text-sm">Kami menyediakan ukuran 2x3, 3x4, dan 4x6 cm dengan pilihan background merah, biru, atau putih sesuai kebutuhan dokumen Anda.</p>
                  </div>
                  <div>
                    <p className="font-bold text-lg mb-2 text-red-400">Apakah bisa pas foto untuk anak-anak?</p>
                    <p className="text-gray-400 text-sm">Ya, SS Foto melayani pas foto untuk semua usia termasuk bayi dan anak-anak dengan pendekatan yang ramah dan sabar.</p>
                  </div>
               </div>
            </div>

            <div className="text-center py-10 bg-red-50 rounded-3xl border border-red-100 px-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Kunjungi SS Foto Rawamangun Sekarang</h3>
                <p className="text-gray-600 mb-8 max-w-xl mx-auto">
                    Butuh pas foto cepat dan profesional di Rawamangun? Kunjungi SS Foto terdekat dari Rawamangun sekarang untuk layanan pas foto cepat dan profesional di Jakarta Timur, atau hubungi kami melalui WhatsApp. Lihat lokasi lengkap cabang kami di halaman <Link href="/lokasi" className="text-[#ea2423] font-bold hover:underline italic">lokasi</Link>.
                </p>
                <Link
                  href="/lokasi"
                  className="inline-flex items-center gap-2 px-10 py-4 bg-[#ea2423] text-white font-bold rounded-xl shadow-lg"
                >
                  <MapPin className="w-5 h-5" />
                  Lihat Lokasi & Cabang
                </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

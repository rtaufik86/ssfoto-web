import type { Metadata } from "next";
import LocalizedServicePage from "@/components/seo/LocalizedServicePage";

export const metadata: Metadata = {
    title: "Pas Foto Ukuran 2×3 cm, Standar KTP & Dokumen Resmi | SS Foto",
    description: "Pas foto ukuran 2×3 di SS Foto — cetak cepat, standar dokumen resmi, background solid. Langsung jadi, tidak perlu booking.",
    alternates: { canonical: "https://www.ssfoto.co.id/pas-foto-2x3" }
};

export default function Page() {
    return (
        <LocalizedServicePage
            serviceName="SS Foto"
            serviceSlug="pas-foto-2x3"
            headline={"Pas Foto Ukuran 2×3 cm"}
            subheadline={"Ukuran 2×3 cm adalah salah satu ukuran pas foto paling sering diminta untuk dokumen administrasi dasar di Indonesia. Dari KTP, kartu pelajar, hingga formulir pendaftaran instansi pemerintah — ukuran ini menjadi standar yang tidak bisa dihindari.\n\nDi SS Foto, kami mencetak pas foto 2×3 dengan ukuran presisi, background solid tanpa gradasi, dan pencahayaan studio profesional. Hasilnya langsung diterima instansi — tidak perlu diulang."}
            heroImage="/images/products/kertas-cetak-pas-foto-profesional.png"
            benefits={[{ icon: "zap", text: "Proses Cepat" }, { icon: "star", text: "Kualitas Lab" }]}
            contentSections={[
{ title: "Ukuran Pas Foto 2×3 — Berapa Sebenarnya?", content: <div dangerouslySetInnerHTML={{ __html: "<div class=\"space-y-4\">\n<p>Ukuran 2×3 mengacu pada dimensi cetak fisik: <strong>2 cm lebar × 3 cm tinggi</strong>. Dalam satuan lain:</p>\n<ul class=\"list-disc pl-5 space-y-2\">\n<li><strong>Milimeter:</strong> 20 × 30 mm</li><li><strong>Piksel (resolusi cetak 300 DPI):</strong> ± 236 × 354 piksel</li><li><strong>Inch:</strong> ± 0,79 × 1,18 inch</li>\n</ul>\n<p>Pas foto 2×3 termasuk ukuran paling kecil di antara semua ukuran standar Indonesia. Meski kecil, standar kualitasnya sama ketatnya dengan ukuran lebih besar — background harus solid, wajah harus tampak jelas, dan ukuran cetak harus presisi.</p>\n<p>Ukuran pas foto lainnya yang tersedia di SS Foto: 3×4 · 4×6 · <a href=\"/pas-foto\" class=\"text-[#ea2423] font-semibold hover:underline\">Semua ukuran →</a>\n</p>\n</div>" }} /> },
{ title: "Dokumen yang Membutuhkan Pas Foto 2×3", content: <div dangerouslySetInnerHTML={{ __html: "<div class=\"space-y-4\">\n<p>Ukuran 2×3 digunakan untuk berbagai dokumen administrasi, terutama yang bersifat lokal dan pemerintahan:</p>\n<ul class=\"list-disc pl-5 space-y-2\">\n<li><strong>KTP</strong> dan perpanjangan KTP — standar Dukcapil</li><li><strong>Kartu Keluarga (KK)</strong> — untuk pembaruan data anggota keluarga</li><li><strong>Kartu pelajar</strong> — SD, SMP, SMA</li><li><strong>Formulir kelurahan dan kecamatan</strong> — berbagai administrasi warga</li><li><strong>Buku tabungan</strong> dan dokumen perbankan tertentu</li><li><strong>Formulir pendaftaran instansi pemerintah</strong></li><li><strong>Kartu anggota organisasi</strong> dan komunitas</li>\n</ul>\n<p>Meski kecil, foto yang buruk di dokumen KTP tetap terlihat jelas dan bisa menimbulkan masalah saat verifikasi identitas.\n</p>\n</div>" }} /> },
{ title: "Standar Pas Foto 2×3 yang Diterima Instansi", content: <div dangerouslySetInnerHTML={{ __html: "<div class=\"space-y-4\">\n<p>Berikut standar yang harus dipenuhi agar pas foto 2×3 diterima:</p>\n<p><strong>Ukuran dan komposisi:</strong>\n- Ukuran tepat 2 × 3 cm — tidak boleh lebih besar atau kecil\n- Wajah mengisi sekitar 70–80% frame foto\n- Tampak depan — tidak miring atau setengah profil</p>\n<p><strong>Background:</strong>\n- Merah — untuk sebagian besar dokumen pemerintah (KTP, formulir kelurahan)\n- Biru — untuk beberapa dokumen lainnya sesuai ketentuan\n- Solid tanpa gradasi, bayangan, atau pola</p>\n<p><strong>Pencahayaan:</strong>\n- Merata di seluruh wajah dan background\n- Tidak ada bayangan keras di wajah, leher, atau background</p>\n<p><strong>Ekspresi dan penampilan:</strong>\n- Ekspresi netral — mulut tertutup, tidak senyum berlebihan\n- Mata terbuka dan menatap kamera\n- Pakaian formal — kemeja atau atasan formal, hindari kaos polos\n- Tidak memakai topi atau kacamata (kecuali ketentuan khusus)</p>\n<p>Di SS Foto, semua standar ini diterapkan secara konsisten sejak pengambilan foto hingga cetak akhir.\n</p>\n</div>" }} /> }
            ]}
            pricing={undefined}
            faq={[{"q":"Apakah bisa langsung datang tanpa booking untuk pas foto 2×3?","a":"Bisa. SS Foto menerima pelanggan langsung tanpa reservasi di semua cabang. Cukup datang selama jam operasional."},{"q":"Background apa yang digunakan untuk pas foto 2×3 KTP?","a":"Untuk KTP, background merah adalah yang paling umum sesuai ketentuan Dukcapil. Tim SS Foto akan memastikan background yang tepat sesuai dokumen yang kamu butuhkan."},{"q":"Berapa lembar yang bisa dicetak dalam satu sesi pas foto 2×3?","a":"Dalam satu sheet standar biasanya memuat 4–8 lembar ukuran 2×3. Bisa dicetak lebih banyak sesuai kebutuhan."},{"q":"Apakah tersedia file digital pas foto 2×3?","a":"Ya. SS Foto menyediakan file JPG dengan ukuran dan resolusi sesuai untuk keperluan upload online — portal PPDB, rekrutmen, atau administrasi digital."},{"q":"Apakah pas foto 2×3 bisa untuk anak kecil atau balita?","a":"Bisa. Tim SS Foto terbiasa menangani foto anak dari semua usia, termasuk balita untuk keperluan KIA (Kartu Identitas Anak)."},{"q":"Berapa lama proses pas foto 2×3 di SS Foto?","a":"Rata-rata 10–15 menit dari sesi foto hingga hasil cetak siap dibawa pulang."}]}
        />
    );
}

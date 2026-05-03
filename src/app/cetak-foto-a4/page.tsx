import type { Metadata } from "next";
import LocalizedServicePage from "@/components/seo/LocalizedServicePage";

export const metadata: Metadata = {
    title: "Cetak Foto A4 21 × 29,7 cm, Lab Printing Profesional | SS Foto",
    description: "Cetak foto ukuran A4 (21 × 29,7 cm) di SS Foto — mesin lab printing profesional, warna akurat, kertas foto premium. Bisa kirim via WhatsApp, langsung jadi.",
    alternates: { canonical: "https://www.ssfoto.co.id/cetak-foto-a4" }
};

export default function Page() {
    return (
        <LocalizedServicePage
            serviceName="SS Foto"
            serviceSlug="cetak-foto-a4"
            headline={"Cetak Foto Ukuran A4 (21 × 29,7 cm)"}
            subheadline={"Ukuran A4 (21 × 29,7 cm) adalah salah satu ukuran cetak foto yang paling populer. Foto formal, foto wisuda, poster, dan cetakan yang perlu dimensi standar kertas A4. Cocok untuk pigura A4 yang mudah ditemukan di pasaran.\n\nDi SS Foto, cetak foto A4 menggunakan mesin lab printing profesional — hasilnya tajam, warna akurat, dan tahan jauh lebih lama dibanding cetak inkjet biasa."}
            heroImage="/images/products/kertas-cetak-pas-foto-profesional.png"
            benefits={[{ icon: "zap", text: "Proses Cepat" }, { icon: "star", text: "Kualitas Lab" }]}
            contentSections={[
{ title: "Dimensi dan Spesifikasi Foto A4", content: <div dangerouslySetInnerHTML={{ __html: "<div class=\"space-y-4\">\n<p>Detail teknis ukuran A4:</p>\n<ul class=\"list-disc pl-5 space-y-2\">\n<li><strong>Dimensi:</strong> 21 × 29,7 cm</li><li><strong>Rasio aspek:</strong> 1:1.41</li><li><strong>Resolusi minimum untuk cetak tajam:</strong> 2.480 × 3.508 piksel</li><li><strong>HP yang aman untuk ukuran ini:</strong> HP flagship atau kamera digital direkomendasikan</li>\n</ul>\n</div>" }} /> },
{ title: "Untuk Apa Foto A4 Digunakan?", content: <div dangerouslySetInnerHTML={{ __html: "<div class=\"space-y-4\">\n<p>Foto formal, foto wisuda, poster, dan cetakan yang perlu dimensi standar kertas A4. Cocok untuk pigura A4 yang mudah ditemukan di pasaran.</p>\n<p><strong>Penggunaan paling umum:</strong>\n- Foto keluarga untuk frame standar atau kliping\n- Hadiah foto untuk ulang tahun, pernikahan, atau momen istimewa\n- Foto wisuda atau foto resmi yang dipajang\n- Koleksi foto album fisik\n</p>\n</div>" }} /> },
{ title: "Perbandingan Ukuran Foto", content: <div dangerouslySetInnerHTML={{ __html: "<div class=\"space-y-4\">\n<p>| Ukuran | Dimensi | Keterangan |\n|--------|---------|------------|\n| 4R | 10 × 15 cm | Paling umum, kompak |\n| 5R | 13 × 18 cm | Sedikit lebih besar dari 4R |\n| 6R | 15 × 20 cm | Untuk frame dinding kecil |\n| 8R | 20 × 25 cm | Display premium |\n| <strong>A4</strong> | <strong>21 × 29,7 cm</strong> | <strong>Halaman ini</strong> |\n| Canvas | Custom | Tanpa frame, langsung dipasang |\n</p>\n</div>" }} /> },
{ title: "Kenapa Cetak Foto A4 di SS Foto?", content: <div dangerouslySetInnerHTML={{ __html: "<div class=\"space-y-4\">\n<p>SS Foto menggunakan <strong>mesin lab printing profesional</strong> — bukan printer inkjet rumahan. Perbedaannya terasa langsung:</p>\n<ul class=\"list-disc pl-5 space-y-2\">\n<li><strong>Warna lebih akurat:</strong> Mesin lab printing menghasilkan warna yang mendekati tampilan layar — skin tone natural, bukan kebiruan atau kepucatan</li><li><strong>Detail lebih tajam:</strong> Terutama terasa di ukuran A4 ke atas — texture wajah, pakaian, dan latar belakang terlihat dengan jelas</li><li><strong>Kertas foto premium:</strong> Lebih tebal dan kokoh dari kertas inkjet biasa</li><li><strong>Tahan lama:</strong> Hasil lab printing bertahan puluhan tahun tanpa pemudaran signifikan</li>\n</ul>\n</div>" }} /> },
{ title: "Pilihan Kertas untuk Foto A4", content: <div dangerouslySetInnerHTML={{ __html: "<div class=\"space-y-4\">\n<p><strong>Glossy (mengkilap):</strong>\nWarna lebih vivid dan kontras. Cocok untuk foto liburan, foto keluarga, dan foto yang ingin tampil mencolok di frame. Permukaan mengkilap memantulkan cahaya.</p>\n<p><strong>Matte (doff):</strong>\nTampilan lebih natural dan elegan, tidak memantulkan cahaya. Cocok untuk foto formal, foto wisuda, dan ruangan dengan banyak pencahayaan alami.</p>\n<p>Tidak yakin mana yang lebih baik? Tim SS Foto membantu memilih berdasarkan jenis foto dan tempatnya akan dipajang.\n</p>\n</div>" }} /> },
{ title: "Cara Cetak Foto A4 di SS Foto", content: <div dangerouslySetInnerHTML={{ __html: "<div class=\"space-y-4\">\n<p><strong>Opsi 1 — Kirim via WhatsApp (paling praktis):</strong>\n1. Pilih foto terbaik dari galeri HP\n2. Kirim ke nomor WhatsApp SS Foto — jangan kompres\n3. Informasikan: ukuran A4, jumlah, dan pilihan kertas (glossy/matte)\n4. Ambil hasil di toko saat selesai</p>\n<p><strong>Opsi 2 — Datang langsung:</strong>\n1. Bawa HP atau flashdisk dengan file foto\n2. Pilih ukuran dan kertas di toko\n3. Tunggu beberapa menit — langsung jadi\n</p>\n</div>" }} /> }
            ]}
            pricing={undefined}
            faq={[{"q":"Apakah foto dari HP bisa dicetak di ukuran A4?","a":"Ya, foto dari HP modern sudah lebih dari cukup untuk ukuran A4. Kirim file original (bukan hasil screenshot) untuk hasil terbaik."},{"q":"Berapa lama proses cetak foto A4?","a":"Untuk jumlah normal (di bawah 50 lembar), biasanya selesai dalam 15–30 menit. Untuk jumlah besar, SS Foto menginformasikan estimasi waktu terlebih dahulu."},{"q":"Apakah bisa minta preview sebelum cetak?","a":"Untuk order besar atau cetak yang memerlukan penyesuaian khusus, tim SS Foto akan konfirmasi terlebih dahulu sebelum memproses."},{"q":"Kertas glossy atau matte yang lebih baik untuk foto A4?","a":"Glossy lebih vivid dan cocok untuk foto liburan dan keluarga. Matte lebih elegan dan tidak memantulkan cahaya, cocok untuk ruangan terang atau foto formal."},{"q":"Apakah ada minimum order untuk cetak foto A4?","a":"Tidak ada minimum. Bisa cetak 1 lembar saja."}]}
        />
    );
}

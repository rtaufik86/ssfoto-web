import type { Metadata } from "next";
import LocalizedServicePage from "@/components/seo/LocalizedServicePage";

export const metadata: Metadata = {
    title: "Cetak Foto 4R 10 × 15 cm, Lab Printing Profesional | SS Foto",
    description: "Cetak foto ukuran 4R (10 × 15 cm) di SS Foto — mesin lab printing profesional, warna akurat, kertas foto premium. Bisa kirim via WhatsApp, langsung jadi.",
    alternates: { canonical: "https://www.ssfoto.co.id/cetak-foto-4r" }
};

export default function Page() {
    return (
        <LocalizedServicePage
            serviceName="SS Foto"
            serviceSlug="cetak-foto-4r"
            headline={"Cetak Foto Ukuran 4R (10 × 15 cm)"}
            subheadline={"Ukuran 4R (10 × 15 cm) adalah salah satu ukuran cetak foto yang paling populer. Frame meja, foto kenangan, album foto keluarga, dan gift cetak untuk orang tersayang. Ukuran paling umum untuk cetak foto dari HP.\n\nDi SS Foto, cetak foto 4R menggunakan mesin lab printing profesional — hasilnya tajam, warna akurat, dan tahan jauh lebih lama dibanding cetak inkjet biasa."}
            heroImage="/images/products/kertas-cetak-pas-foto-profesional.png"
            benefits={[{ icon: "zap", text: "Proses Cepat" }, { icon: "star", text: "Kualitas Lab" }]}
            contentSections={[
{ title: "Dimensi dan Spesifikasi Foto 4R", content: <div dangerouslySetInnerHTML={{ __html: "<div class=\"space-y-4\">\n<p>Detail teknis ukuran 4R:</p>\n<ul class=\"list-disc pl-5 space-y-2\">\n<li><strong>Dimensi:</strong> 10 × 15 cm</li><li><strong>Rasio aspek:</strong> 2:3</li><li><strong>Resolusi minimum untuk cetak tajam:</strong> 1.200 × 1.800 piksel</li><li><strong>HP yang aman untuk ukuran ini:</strong> Semua HP dengan kamera 8 megapiksel ke atas</li>\n</ul>\n</div>" }} /> },
{ title: "Untuk Apa Foto 4R Digunakan?", content: <div dangerouslySetInnerHTML={{ __html: "<div class=\"space-y-4\">\n<p>Frame meja, foto kenangan, album foto keluarga, dan gift cetak untuk orang tersayang. Ukuran paling umum untuk cetak foto dari HP.</p>\n<p><strong>Penggunaan paling umum:</strong>\n- Foto keluarga untuk frame meja atau dinding kecil\n- Hadiah foto untuk ulang tahun, pernikahan, atau momen istimewa\n- Foto kenangan dari liburan atau acara khusus\n- Koleksi foto album fisik\n</p>\n</div>" }} /> },
{ title: "Perbandingan Ukuran Foto", content: <div dangerouslySetInnerHTML={{ __html: "<div class=\"space-y-4\">\n<p>| Ukuran | Dimensi | Keterangan |\n|--------|---------|------------|\n| 4R | 10 × 15 cm | Paling umum, kompak |\n| 5R | 13 × 18 cm | Sedikit lebih besar dari 4R |\n| 6R | 15 × 20 cm | Untuk frame dinding kecil |\n| 8R | 20 × 25 cm | Display premium |\n| <strong>4R</strong> | <strong>10 × 15 cm</strong> | <strong>Halaman ini</strong> |\n| Canvas | Custom | Tanpa frame, langsung dipasang |\n</p>\n</div>" }} /> },
{ title: "Kenapa Cetak Foto 4R di SS Foto?", content: <div dangerouslySetInnerHTML={{ __html: "<div class=\"space-y-4\">\n<p>SS Foto menggunakan <strong>mesin lab printing profesional</strong> — bukan printer inkjet rumahan. Perbedaannya terasa langsung:</p>\n<ul class=\"list-disc pl-5 space-y-2\">\n<li><strong>Warna lebih akurat:</strong> Mesin lab printing menghasilkan warna yang mendekati tampilan layar — skin tone natural, bukan kebiruan atau kepucatan</li><li><strong>Detail lebih tajam:</strong> Terutama terasa di ukuran 4R ke atas — texture wajah, pakaian, dan latar belakang terlihat dengan jelas</li><li><strong>Kertas foto premium:</strong> Lebih tebal dan kokoh dari kertas inkjet biasa</li><li><strong>Tahan lama:</strong> Hasil lab printing bertahan puluhan tahun tanpa pemudaran signifikan</li>\n</ul>\n</div>" }} /> },
{ title: "Pilihan Kertas untuk Foto 4R", content: <div dangerouslySetInnerHTML={{ __html: "<div class=\"space-y-4\">\n<p><strong>Glossy (mengkilap):</strong>\nWarna lebih vivid dan kontras. Cocok untuk foto liburan, foto keluarga, dan foto yang ingin tampil mencolok di frame. Permukaan mengkilap memantulkan cahaya.</p>\n<p><strong>Matte (doff):</strong>\nTampilan lebih natural dan elegan, tidak memantulkan cahaya. Cocok untuk foto formal, foto wisuda, dan ruangan dengan banyak pencahayaan alami.</p>\n<p>Tidak yakin mana yang lebih baik? Tim SS Foto membantu memilih berdasarkan jenis foto dan tempatnya akan dipajang.\n</p>\n</div>" }} /> },
{ title: "Cara Cetak Foto 4R di SS Foto", content: <div dangerouslySetInnerHTML={{ __html: "<div class=\"space-y-4\">\n<p><strong>Opsi 1 — Kirim via WhatsApp (paling praktis):</strong>\n1. Pilih foto terbaik dari galeri HP\n2. Kirim ke nomor WhatsApp SS Foto — jangan kompres\n3. Informasikan: ukuran 4R, jumlah, dan pilihan kertas (glossy/matte)\n4. Ambil hasil di toko saat selesai</p>\n<p><strong>Opsi 2 — Datang langsung:</strong>\n1. Bawa HP atau flashdisk dengan file foto\n2. Pilih ukuran dan kertas di toko\n3. Tunggu beberapa menit — langsung jadi\n</p>\n</div>" }} /> }
            ]}
            pricing={undefined}
            faq={[{"q":"Apakah foto dari HP bisa dicetak di ukuran 4R?","a":"Ya, foto dari HP modern sudah lebih dari cukup untuk ukuran 4R. Kirim file original (bukan hasil screenshot) untuk hasil terbaik."},{"q":"Berapa lama proses cetak foto 4R?","a":"Untuk jumlah normal (di bawah 50 lembar), biasanya selesai dalam 15–30 menit. Untuk jumlah besar, SS Foto menginformasikan estimasi waktu terlebih dahulu."},{"q":"Apakah bisa minta preview sebelum cetak?","a":"Untuk order besar atau cetak yang memerlukan penyesuaian khusus, tim SS Foto akan konfirmasi terlebih dahulu sebelum memproses."},{"q":"Kertas glossy atau matte yang lebih baik untuk foto 4R?","a":"Glossy lebih vivid dan cocok untuk foto liburan dan keluarga. Matte lebih elegan dan tidak memantulkan cahaya, cocok untuk ruangan terang atau foto formal."},{"q":"Apakah ada minimum order untuk cetak foto 4R?","a":"Tidak ada minimum. Bisa cetak 1 lembar saja."}]}
        />
    );
}

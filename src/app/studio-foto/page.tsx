import type { Metadata } from "next";
import LocalizedServicePage from "@/components/seo/LocalizedServicePage";

export const metadata: Metadata = {
    title: "Studio Foto Jakarta, Foto Profesional dengan Fotografer Berpengalaman | SS Foto",
    description: "Studio foto profesional di SS Foto Rawamangun Jakarta Timur. Sesi foto keluarga, wisuda, anak, dan profil. Fotografer berpengalaman, berbagai backdrop.",
    alternates: { canonical: "https://www.ssfoto.co.id/studio-foto" }
};

export default function Page() {
    return (
        <LocalizedServicePage
            serviceName="SS Foto"
            serviceSlug="studio-foto"
            headline={"Studio Foto Profesional — SS Foto Rawamangun"}
            subheadline={"SS Foto Rawamangun menghadirkan studio foto profesional di Jakarta Timur — untuk keluarga, wisuda, foto anak, dan foto profil. Fotografer berpengalaman, lighting studio, berbagai pilihan backdrop."}
            heroImage="/images/products/kertas-cetak-pas-foto-profesional.png"
            benefits={[{ icon: "zap", text: "Proses Cepat" }, { icon: "star", text: "Kualitas Lab" }]}
            contentSections={[
{ title: "Layanan Studio Foto di SS Foto", content: <div dangerouslySetInnerHTML={{ __html: "<div class=\"space-y-4\">\n<p>SS Foto menyediakan berbagai jenis sesi foto studio yang disesuaikan dengan kebutuhan pelanggan:</p>\n<ul class=\"list-disc pl-5 space-y-2\">\n<li><span class=\"text-[#ea2423] font-semibold\">Studio foto keluarga</span> — abadikan momen kebersamaan seluruh keluarga</li><li><span class=\"text-[#ea2423] font-semibold\">Studio foto wisuda</span> — foto wisuda profesional dengan toga atau busana formal</li><li><span class=\"text-[#ea2423] font-semibold\">Studio foto anak</span> — sesi foto khusus anak dengan suasana yang nyaman dan menyenangkan</li><li>Studio foto profil — foto profesional untuk LinkedIn, kartu nama, dan media sosial</li>\n</ul>\n</div>" }} /> },
{ title: "Mengapa Memilih Studio Foto SS Foto?", content: <div dangerouslySetInnerHTML={{ __html: "<div class=\"space-y-4\">\n<p><strong>Fotografer berpengalaman dan sabar</strong>\nIni kunci utama — terutama jika ada anak kecil atau anggota keluarga yang tidak suka difoto. Tim fotografer SS Foto tahu cara mencairkan suasana dan mendapatkan ekspresi natural yang terbaik dari setiap orang.</p>\n<p><strong>Sistem lighting profesional</strong>\nPencahayaan studio yang dirancang khusus menghasilkan foto yang flattering untuk semua usia — dari wajah anak kecil hingga wajah lansia. Tidak ada bayangan keras atau pencahayaan yang tidak merata.</p>\n<p><strong>Berbagai pilihan backdrop</strong>\nDari backdrop simpel dan elegan untuk foto formal, hingga yang lebih kreatif untuk sesi yang lebih kasual. Tim SS Foto membantu memilih backdrop yang paling sesuai dengan tujuan foto.</p>\n<p><strong>Langsung cetak setelah sesi</strong>\nTidak perlu menunggu berhari-hari. Setelah sesi, foto favorit bisa langsung diproses — cetak foto ukuran besar, canvas, atau berbagai format lain.</p>\n<p><strong>Studio yang nyaman</strong>\nRuang studio yang cukup luas bahkan untuk keluarga besar, dengan ruang tunggu yang nyaman.\n</p>\n</div>" }} /> },
{ title: "Jenis Sesi Studio yang Tersedia", content: <div dangerouslySetInnerHTML={{ __html: "<div class=\"space-y-4\">\n<p><strong>Sesi Keluarga</strong>\nUntuk keluarga inti (orang tua + anak) hingga keluarga besar dengan kakek-nenek dan semua cucu. Tidak ada batasan jumlah orang.</p>\n<p><strong>Sesi Wisuda</strong>\nFoto wisuda dengan toga atau busana formal — baik sesi individual maupun bersama keluarga.</p>\n<p><strong>Sesi Foto Anak</strong>\nKhusus untuk anak-anak dari semua usia — mulai dari bayi baru lahir (newborn) hingga remaja. Tim SS Foto terbiasa menangani anak yang tidak suka difoto.</p>\n<p><strong>Sesi Foto Profil</strong>\nFoto profesional untuk LinkedIn, kartu nama, atau profil media sosial. Tampilan yang mencerminkan profesionalisme.\n</p>\n</div>" }} /> },
{ title: "Tips Mempersiapkan Sesi Studio", content: <div dangerouslySetInnerHTML={{ __html: "<div class=\"space-y-4\">\n<p><strong>Koordinasikan warna pakaian:</strong>\nTidak harus seragam, tapi pilih palet warna yang harmonis. Tone earth (cokelat, krem, hijau tua) atau blue-white selalu terlihat bagus di foto studio.</p>\n<p><strong>Datang dalam kondisi segar:</strong>\nHindari jadwal foto setelah aktivitas berat. Kondisi fisik yang segar terpancar di foto.</p>\n<p><strong>Ceritakan ekspektasimu:</strong>\nJika ada gaya foto tertentu yang diinginkan, ceritakan ke fotografer sebelum sesi dimulai.\n</p>\n</div>" }} /> }
            ]}
            pricing={undefined}
            faq={[{"q":"Berapa orang maksimal yang bisa masuk studio foto SS Foto?","a":"Tidak ada batasan jumlah orang. Studio SS Foto cukup luas untuk keluarga besar sekalipun."},{"q":"Apakah harus booking untuk sesi studio?","a":"Ya, untuk sesi studio foto sebaiknya booking minimal 2–3 hari sebelumnya untuk mengamankan jadwal fotografer."},{"q":"Berapa lama durasi sesi foto studio?","a":"Tergantung paket — mulai dari 30 menit hingga 90 menit. Hubungi SS Foto untuk detail paket yang tersedia."},{"q":"Apakah hasil foto bisa langsung dicetak canvas?","a":"Ya. Setelah sesi, foto favorit bisa langsung diproses sebagai canvas dan siap dibawa pulang hari itu juga."},{"q":"Apakah tersedia sesi foto bayi atau newborn?","a":"Bisa. Tim SS Foto terbiasa menangani foto bayi dari usia baru lahir."}]}
        />
    );
}

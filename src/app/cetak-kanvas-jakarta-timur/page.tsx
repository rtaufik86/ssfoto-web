import type { Metadata } from "next";
import LocalizedServicePage from "@/components/seo/LocalizedServicePage";
import { ServiceSchema, FAQSchema, BreadcrumbSchema, WebPageSchema } from "@/components/schema";

export const metadata: Metadata = {
    title: "Cetak Kanvas Jakarta Timur — Dekorasi Dinding Premium | SS Foto",
    description: "Cetak foto canvas premium di Jakarta Timur. Bahan cotton asli, rangka kayu kokoh, garansi pudar 100 tahun. Workshop pusat di Rawamangun Jakarta Timur.",
    alternates: {
        canonical: "https://www.ssfoto.co.id/cetak-kanvas-jakarta-timur",
    },
};

const schemas = [
    ServiceSchema({
        name: "Cetak Kanvas Jakarta Timur",
        description: "Layanan cetak kanvas berkualitas museum di Jakarta Timur.",
        url: "https://www.ssfoto.co.id/cetak-kanvas-jakarta-timur"
    }),
    FAQSchema([
        {
            q: "Berapa lama proses cetak kanvas di Jakarta Timur?",
            a: "Estimasi pengerjaan adalah 2-4 hari kerja siap ambil atau kirim."
        }
    ]),
    BreadcrumbSchema([
        { name: "Beranda", url: "/" },
        { name: "Cetak Kanvas", url: "/cetak-canvas" },
        { name: "Jakarta Timur", url: "/cetak-kanvas-jakarta-timur" }
    ]),
    WebPageSchema({
        name: "Cetak Kanvas Jakarta Timur",
        url: "/cetak-kanvas-jakarta-timur"
    })
];

export default function CetakCanvasJakartaTimurPage() {
    return (
        <>
            {schemas.map((s, i) => (
                <script
                    key={i}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
                />
            ))}
            <LocalizedServicePage
                serviceName="Kanvas Jaktim"
                serviceSlug="cetak-kanvas-jakarta-timur"
                headline="Cetak Kanvas Jakarta Timur — Dekorasi Premium"
                subheadline="Ubah foto keluarga atau pre-wedding Anda menjadi karya seni dinding yang indah di Jakarta Timur. Workshop kami di Rawamangun siap melayani Anda."
                heroImage="/images/products/cetak-foto-canvas-di-kamar-tidur.png"
                benefits={[
                    { icon: "zap", text: "Cotton Canvas" },
                    { icon: "award", text: "Rangka Kayu Solid" },
                    { icon: "clock", text: "Workshop Sendiri" },
                    { icon: "star", text: "Garansi 100 Thn" }
                ]}
                pricing={{
                    title: "Harga Canvas Jaktim",
                    items: [
                        { label: "Ukuran 30x30 cm", price: "Rp 250.000", note: "Siap pajang" },
                        { label: "Ukuran 40x60 cm", price: "Rp 420.000", note: "Best seller" }
                    ]
                }}
            />
        </>
    );
}

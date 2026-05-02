import type { Metadata } from 'next';
import PasFotoContent from './PasFotoContent';

export const metadata: Metadata = {
    title: "Pas Foto Online Jakarta | Cetak Lab Profesional — SS Foto",
    description: "Upload foto dari HP, SS Foto cetak dengan mesin lab profesional. Ukuran 2x3, 3x4, 4x6 — siap ambil di toko. Mulai Rp 35.000.",
    alternates: { canonical: 'https://www.ssfoto.co.id/pas-foto' },
    keywords: ['pas foto', 'pas foto online', 'edit pas foto', 'pas foto jakarta', 'cetak pas foto', 'pas foto cpns', 'pas foto visa', 'pas foto paspor'],
    openGraph: {
        title: 'Pas Foto Online Jakarta | Cetak Lab Profesional — SS Foto',
        description: 'Upload foto dari HP, SS Foto cetak dengan mesin lab profesional. Siap dalam hitungan jam. Mulai Rp 35.000.',
        type: 'website',
        url: 'https://www.ssfoto.co.id/pas-foto',
    },
};

const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "Service",
            "name": "Pas Foto Online",
            "description": "Layanan cetak pas foto profesional dengan mesin lab. Upload dari HP, pilih ukuran 2x3, 3x4, 4x6, siap cetak dan diambil di cabang. Dijamin lolos dokumen resmi.",
            "provider": {
                "@type": "LocalBusiness",
                "name": "SS Foto",
                "url": "https://www.ssfoto.co.id",
                "telephone": "+6281936444486",
                "priceRange": "Rp 35.000",
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "Jl. Pemuda, Rawamangun",
                    "addressLocality": "Jakarta Timur",
                    "addressRegion": "DKI Jakarta",
                    "addressCountry": "ID"
                }
            },
            "areaServed": ["Jakarta", "Bekasi", "Bogor", "Depok"],
            "offers": {
                "@type": "Offer",
                "price": "35000",
                "priceCurrency": "IDR",
                "availability": "https://schema.org/InStock"
            }
        },
        {
            "@type": "FAQPage",
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": "Apakah foto dari HP bisa langsung dicetak?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Ya. Kirim foto via WhatsApp, tim kami siap proses. Pastikan foto cukup terang dan tidak blur."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Berapa lama proses cetak pas foto?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Rata-rata 1–2 jam setelah file diterima. Untuk kebutuhan mendesak, hubungi kami langsung."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Apakah hasil cetak bisa digunakan untuk CPNS dan paspor?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Ya. SS Foto mencetak sesuai standar ukuran dan warna yang ditetapkan untuk dokumen resmi termasuk CPNS dan paspor."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Apakah ada layanan edit foto sebelum dicetak?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Ya. Tim kami bisa bantu penyesuaian latar belakang, kecerahan, dan cropping sesuai kebutuhan dokumen."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Apakah SS Foto menerima pesanan dalam jumlah besar?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Ya. Hubungi kami via WhatsApp untuk kebutuhan pas foto massal (instansi, sekolah, perusahaan)."
                    }
                }
            ]
        }
    ]
};

export default function Page() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <PasFotoContent />
        </>
    );
}

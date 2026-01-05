import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
    Camera,
    Clock,
    Shield,
    Award,
    MapPin,
    CheckCircle2,
    ArrowRight,
    Star,
    Frame,
    Zap,
    DollarSign,
    Phone,
    Mail,
    Instagram,
    Facebook,
    MessageCircle,
    ChevronRight,
} from "lucide-react";

// ============================================================================
// SEO METADATA - Entity Optimized
// ============================================================================
export const metadata: Metadata = {
    title: "SSFoto - Cetak Pas Foto & Studio Foto Jakarta | Ready 15 Menit",
    description:
        "Cetak pas foto visa, foto kanvas & studio foto professional di SSFoto. 5 cabang Jakarta & Bekasi. Ready 15 menit, garansi cetak ulang. Harga mulai Rp 15.000",
    keywords: [
        "SSFoto",
        "cetak pas foto Jakarta",
        "studio foto profesional",
        "cetak foto kanvas",
        "pas foto visa",
        "SSFoto Rawamangun",
        "SSFoto Pondok Pinang",
        "cetak foto pembesaran",
    ],
    alternates: {
        canonical: "https://ssfoto.co.id/homepage-v2",
    },
    openGraph: {
        title: "SSFoto - Cetak Pas Foto & Studio Foto Profesional di Jakarta",
        description:
            "Layanan cetak foto profesional sejak 2015. Hasil tajam, proses cepat, harga terjangkau. 5 cabang strategis di Jakarta & Bekasi.",
        type: "website",
        url: "https://ssfoto.co.id/homepage-v2",
        siteName: "SSFoto",
        locale: "id_ID",
    },
};

// ============================================================================
// SECTION 1: HERO SECTION - Entity First
// ============================================================================
function HeroSection() {
    return (
        <section className="relative bg-gradient-to-br from-gray-50 via-white to-red-50/30 overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-red-100/40 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-100/30 rounded-full blur-3xl" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left: Text Content */}
                    <div className="space-y-8">
                        <div className="space-y-6">
                            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                                SSFoto - Cetak Pas Foto & Studio Foto Profesional di Jakarta
                            </h1>
                            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
                                Layanan cetak foto profesional sejak 2015. Hasil tajam, proses
                                cepat, harga terjangkau. 5 cabang strategis di Jakarta & Bekasi.
                            </p>
                        </div>

                        {/* Primary CTA */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                href="#lokasi"
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#ea2423] text-white font-semibold rounded-full hover:bg-[#c91f1e] transition-all duration-300 shadow-xl shadow-red-500/30 hover:shadow-red-500/50 hover:scale-105"
                            >
                                <MapPin className="w-5 h-5" />
                                Cek Harga & Lokasi Terdekat
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                            <Link
                                href="https://wa.me/6281936444486"
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-full hover:border-[#ea2423] hover:text-[#ea2423] transition-all duration-300 hover:scale-105"
                            >
                                <MessageCircle className="w-5 h-5" />
                                WhatsApp Sekarang
                            </Link>
                        </div>

                        {/* Trust Signals - Compact Version */}
                        <div className="flex flex-wrap items-center gap-6 pt-4">
                            <div className="flex items-center gap-2">
                                <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className="w-5 h-5 fill-yellow-400 text-yellow-400"
                                        />
                                    ))}
                                </div>
                                <span className="font-semibold text-gray-900">4,538 Reviews</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                                <CheckCircle2 className="w-5 h-5 text-green-600" />
                                <span className="font-medium">Ready 15 Menit</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                                <Shield className="w-5 h-5 text-blue-600" />
                                <span className="font-medium">Garansi Cetak Ulang</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                                <DollarSign className="w-5 h-5 text-green-600" />
                                <span className="font-medium">Harga Mulai Rp 15.000</span>
                            </div>
                        </div>

                        {/* Supporting Brand Entities - Burloak Style */}
                        <div className="pt-8 border-t border-gray-200 mt-8">
                            <p className="text-sm text-gray-500 mb-4 font-medium">
                                Dipercaya & Menggunakan Equipment Professional:
                            </p>
                            <div className="flex flex-wrap items-center gap-6">
                                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-gray-200">
                                    <Camera className="w-5 h-5 text-red-600" />
                                    <span className="text-sm font-semibold text-gray-700">
                                        Canon Professional Partner
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-gray-200">
                                    <Frame className="w-5 h-5 text-green-600" />
                                    <span className="text-sm font-semibold text-gray-700">
                                        Fujifilm Certified Paper
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-gray-200">
                                    <Award className="w-5 h-5 text-blue-600" />
                                    <span className="text-sm font-semibold text-gray-700">
                                        Epson Technology
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Hero Image */}
                    <div className="relative">
                        <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                            <Image
                                src="/images/hero/hero ssfoto.png"
                                alt="Professional photographer with customer showing passport photo results - SSFoto"
                                fill
                                className="object-cover"
                                priority
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                            <div className="absolute inset-4 border-2 border-white/50 rounded-2xl pointer-events-none" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// ============================================================================
// SECTION 2: PRIMARY ENTITY STATEMENT - Answer First
// ============================================================================
function EntityStatement() {
    return (
        <section className="py-16 bg-white">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 lg:p-12 border border-gray-100 shadow-lg">
                    <p className="text-lg lg:text-xl text-gray-700 leading-relaxed">
                        <strong className="text-gray-900 text-2xl">SSFoto</strong> adalah
                        layanan cetak foto dan studio foto profesional dengan 5 cabang di
                        Jakarta dan Bekasi. Kami melayani{" "}
                        <strong>cetak pas foto</strong> untuk berbagai keperluan dokumen
                        resmi, <strong>cetak foto kanvas</strong> berkualitas tinggi,
                        layanan <strong>studio foto keluarga dan wisuda</strong>, serta{" "}
                        <strong>cetak foto pembesaran</strong> dengan teknologi printing
                        professional. Sejak 2015, lebih dari 50.000 pelanggan mempercayakan
                        kebutuhan cetak foto mereka kepada SSFoto.
                    </p>
                </div>
            </div>
        </section>
    );
}

// ============================================================================
// SECTION 3: LAYANAN UTAMA SSFOTO - Service Entities
// ============================================================================
function ServicesSection() {
    const services = [
        {
            icon: "📷",
            title: "SSFoto Cetak Pas Foto",
            description:
                "Cetak pas foto profesional untuk visa, paspor, CPNS, KTP, SIM dan ijazah. Tersedia ukuran 2x3, 3x4, 4x6 cm dengan background merah, biru, atau putih sesuai requirement.",
            specs: [
                "Hasil tajam & akurat",
                "Standar internasional",
                "Ready 15 menit",
                "Harga mulai Rp 15.000",
            ],
            link: "/layanan/pas-foto",
            linkText: "Lihat Harga Pas Foto",
        },
        {
            icon: "🖼️",
            title: "SSFoto Cetak Foto Kanvas",
            description:
                "Cetak foto kanvas berkualitas premium untuk dekorasi rumah atau kantor. Tersedia ukuran 14R, 20R, 24R dengan pilihan framing kayu atau canvas stretching.",
            specs: [
                "Canvas premium 380 gsm",
                "Tinta anti-luntur",
                "Framing professional",
                "Harga mulai Rp 85.000",
            ],
            link: "/layanan/cetak-canvas",
            linkText: "Lihat Katalog Kanvas",
        },
        {
            icon: "📸",
            title: "SSFoto Studio Foto",
            description:
                "Studio foto professional untuk keluarga, wisuda, prewedding dengan equipment professional dan fotografer berpengalaman 10+ tahun.",
            specs: [
                "Lighting professional",
                "Multiple background options",
                "Include soft file HD",
                "Harga paket mulai Rp 350.000",
            ],
            link: "/layanan",
            linkText: "Booking Studio",
        },
        {
            icon: "📐",
            title: "SSFoto Cetak Foto Pembesaran",
            description:
                "Cetak foto pembesaran hingga ukuran 24R dengan teknologi HD printing. Cocok untuk foto keluarga, landscape, atau foto kenangan.",
            specs: [
                "Hingga ukuran 24R (30x40 cm)",
                "Paper foto premium",
                "Hasil detail & tajam",
                "Harga mulai Rp 45.000",
            ],
            link: "/layanan",
            linkText: "Lihat Size Chart",
        },
    ];

    return (
        <section className="py-20 lg:py-28 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                        Layanan Cetak Foto SSFoto
                    </h2>
                </div>

                {/* Service Cards Grid */}
                <div className="grid md:grid-cols-2 gap-8">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-3xl p-8 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                        >
                            {/* Icon */}
                            <div className="text-5xl mb-4">{service.icon}</div>

                            {/* Title */}
                            <h3 className="font-serif text-2xl font-bold text-gray-900 mb-4">
                                {service.title}
                            </h3>

                            {/* Description */}
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                {service.description}
                            </p>

                            {/* Specs */}
                            <div className="space-y-2 mb-6">
                                {service.specs.map((spec, idx) => (
                                    <div key={idx} className="flex items-center gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                                        <span className="text-sm text-gray-700">{spec}</span>
                                    </div>
                                ))}
                            </div>

                            {/* CTA */}
                            <Link
                                href={service.link}
                                className="inline-flex items-center gap-2 text-[#ea2423] font-semibold hover:gap-3 transition-all"
                            >
                                {service.linkText}
                                <ChevronRight className="w-4 h-4" />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ============================================================================
// SECTION 4: UNIQUE VALUE PROPOSITION
// ============================================================================
function USPSection() {
    const usps = [
        {
            icon: Zap,
            title: "Proses Cepat",
            description:
                "SSFoto menjamin hasil cetak pas foto Anda ready dalam 15 menit. Dengan sistem antrian digital dan tim profesional di setiap cabang, kami memastikan Anda tidak perlu menunggu lama untuk mendapatkan pas foto yang Anda butuhkan.",
        },
        {
            icon: Shield,
            title: "Garansi Kualitas",
            description:
                "SSFoto memberikan garansi cetak ulang gratis jika hasil tidak sesuai requirement. Kami menggunakan printer professional Canon iPF series dengan tinta original untuk memastikan warna akurat dan hasil tajam yang memenuhi standar dokumen resmi internasional.",
        },
        {
            icon: DollarSign,
            title: "Harga Terjangkau",
            description:
                "SSFoto menawarkan harga kompetitif mulai dari Rp 15.000 untuk cetak pas foto standar. Kami percaya layanan profesional tidak harus mahal. Dengan skala 5 cabang, kami dapat memberikan harga terbaik tanpa mengorbankan kualitas.",
        },
    ];

    return (
        <section className="py-20 lg:py-28 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                        Kenapa Memilih SSFoto?
                    </h2>
                </div>

                {/* USP Grid */}
                <div className="grid md:grid-cols-3 gap-8">
                    {usps.map((usp, index) => (
                        <div
                            key={index}
                            className="text-center bg-gradient-to-b from-gray-50 to-white rounded-3xl p-8 border border-gray-100"
                        >
                            <div className="w-16 h-16 bg-[#ea2423] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-red-500/20">
                                <usp.icon className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="font-serif text-2xl font-bold text-gray-900 mb-4">
                                {usp.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed">{usp.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ============================================================================
// SECTION 5: LOKASI CABANG SSFOTO - Location Entities
// ============================================================================
function LocationsSection() {
    const locations = [
        {
            name: "SSFoto Rawamangun",
            address: "Jl. Balai Pustaka Timur No.11, Rawamangun, Jakarta Timur",
            phone: "(021) 4706-3388",
            hours: "Senin-Minggu: 09.00-21.00",
        },
        {
            name: "SSFoto Pondok Pinang",
            address: "Jl. Ciputat Raya, Pondok Pinang, Jakarta Selatan",
            phone: "(021) 7656-7890",
            hours: "Senin-Minggu: 09.00-21.00",
        },
        {
            name: "SSFoto Jatiwaringin Bekasi",
            address: "Jl. Raya Jatiwaringin No.344, Bekasi",
            phone: "(021) 8441-2345",
            hours: "Senin-Minggu: 09.00-21.00",
        },
        {
            name: "SSFoto Galaxy Bekasi",
            address: "Galaxy Mall Bekasi Lt. 2, Bekasi",
            phone: "(021) 8988-5678",
            hours: "Senin-Minggu: 10.00-22.00",
        },
        {
            name: "SSFoto Bogor",
            address: "Jl. Pajajaran No.25, Bogor",
            phone: "(0251) 831-2345",
            hours: "Senin-Minggu: 09.00-21.00",
        },
    ];

    return (
        <section id="lokasi" className="py-20 lg:py-28 bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                        5 Cabang SSFoto Siap Melayani Anda
                    </h2>
                </div>

                {/* Location Cards */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {locations.map((location, index) => (
                        <div
                            key={index}
                            className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-[#ea2423]/50 transition-all duration-300 hover:transform hover:scale-105"
                        >
                            <h3 className="font-semibold text-xl text-white mb-4">
                                {location.name}
                            </h3>
                            <div className="space-y-3">
                                <div className="flex items-start gap-3">
                                    <MapPin className="w-5 h-5 text-[#ea2423] flex-shrink-0 mt-0.5" />
                                    <p className="text-gray-300 text-sm">{location.address}</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Phone className="w-5 h-5 text-[#ea2423] flex-shrink-0" />
                                    <p className="text-gray-300 text-sm">{location.phone}</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Clock className="w-5 h-5 text-[#ea2423] flex-shrink-0" />
                                    <p className="text-gray-300 text-sm">{location.hours}</p>
                                </div>
                            </div>
                            <Link
                                href="/lokasi"
                                className="inline-flex items-center gap-2 mt-4 text-[#ea2423] font-medium text-sm hover:gap-3 transition-all"
                            >
                                Lihat Detail Cabang
                                <ChevronRight className="w-4 h-4" />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ============================================================================
// SECTION 6: CARA KERJA - User Journey
// ============================================================================
function HowItWorksSection() {
    const steps = [
        {
            number: "1",
            title: "Pilih Layanan & Lokasi",
            description:
                "Pilih jenis layanan cetak foto yang Anda butuhkan dan cabang SSFoto terdekat dari lokasi Anda. Anda bisa datang langsung atau booking online via WhatsApp.",
        },
        {
            number: "2",
            title: "Upload Foto atau Fotografi",
            description:
                "Untuk cetak pas foto dan foto kanvas, upload file foto Anda atau ambil foto langsung di studio SSFoto. Tim kami akan membantu adjustment background dan cropping sesuai requirement.",
        },
        {
            number: "3",
            title: "Ambil Hasil",
            description:
                "Tunggu 15 menit untuk pas foto atau 1-3 hari untuk cetak kanvas/pembesaran. Hasil dijamin sesuai standar atau cetak ulang gratis.",
        },
    ];

    return (
        <section className="py-20 lg:py-28 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                        Cara Cetak Foto di SSFoto{" "}
                        <span className="text-[#ea2423]">(Semudah 1-2-3)</span>
                    </h2>
                </div>

                {/* Steps */}
                <div className="grid md:grid-cols-3 gap-8 lg:gap-12 mb-12">
                    {steps.map((step, index) => (
                        <div key={index} className="relative text-center">
                            {/* Connector Line */}
                            {index < steps.length - 1 && (
                                <div className="hidden md:block absolute top-16 left-[60%] w-[80%] border-t-2 border-dashed border-gray-200" />
                            )}

                            {/* Number Circle */}
                            <div className="relative inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-red-50 to-red-100 rounded-full mb-6">
                                <span className="text-5xl font-bold text-[#ea2423]">
                                    {step.number}
                                </span>
                            </div>

                            {/* Content */}
                            <h3 className="font-serif text-2xl font-bold text-gray-900 mb-3">
                                {step.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed">{step.description}</p>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="text-center">
                    <Link
                        href="https://wa.me/6281936444486"
                        className="inline-flex items-center gap-3 px-10 py-4 bg-[#ea2423] text-white font-semibold rounded-full hover:bg-[#c91f1e] transition-all duration-300 shadow-xl shadow-red-500/30 hover:shadow-red-500/50 hover:scale-105 text-lg"
                    >
                        Mulai Order Sekarang
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </div>
        </section>
    );
}

// ============================================================================
// SECTION 7: SUPPORTING BRAND ENTITIES - Trust Signals
// ============================================================================
function BrandEntitiesSection() {
    const partners = [
        "Canon iPF Professional Printer",
        "Original Canon Ink",
        "Fujifilm Photo Paper",
        "Epson SureColor Technology",
    ];

    const achievements = [
        "50,000+ customers served since 2015",
        "4.8/5 average rating across all branches",
        "Trusted by government institutions for official photo printing",
        "Partner resmi untuk visa photo services",
    ];

    return (
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                        Dipercaya Oleh Ribuan Pelanggan
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                    {/* Partner & Equipment */}
                    <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-lg">
                        <h3 className="font-serif text-2xl font-bold text-gray-900 mb-6">
                            Partner & Equipment
                        </h3>
                        <div className="space-y-3">
                            {partners.map((partner, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                                    <span className="text-gray-700">{partner}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Certifications/Achievements */}
                    <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-lg">
                        <h3 className="font-serif text-2xl font-bold text-gray-900 mb-6">
                            Certifications & Achievements
                        </h3>
                        <div className="space-y-3">
                            {achievements.map((achievement, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <Award className="w-5 h-5 text-[#ea2423] flex-shrink-0" />
                                    <span className="text-gray-700">{achievement}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// ============================================================================
// SECTION 8: CUSTOMER TESTIMONIALS - Dark Background (Burloak Style)
// ============================================================================
function TestimonialsSection() {
    const testimonials = [
        {
            rating: 5,
            text: "Cetak pas foto visa Schengen di SSFoto Rawamangun kemarin untuk aplikasi visa ke Belanda. Staff-nya super helpful ngejelasin requirement ukuran 35x45mm dengan background putih. Fotonya perfect, hasil cetak tajam, dan visa gue approved dalam 2 minggu. Recommended banget, harga cuma 25rb!",
            author: "Dina Pratiwi",
            location: "Jakarta Timur",
            service: "Cetak Pas Foto Visa",
            date: "April 2024",
        },
        {
            rating: 5,
            text: "Order cetak foto kanvas 20R untuk kado anniversary orang tua. Hasilnya WOW! Warna natural, framenya kayu jati beneran (gak MDF murahan), finishing rapih banget. Nyokap sampe nangis pas terima. Thank you SSFoto Pondok Pinang, worth every penny!",
            author: "Budi Santoso",
            location: "Jakarta Selatan",
            service: "Cetak Foto Kanvas 20R",
            date: "Mei 2024",
        },
        {
            rating: 5,
            text: "Studio foto wisuda di SSFoto Galaxy Bekasi. Fotografernya profesional banget, banyak ide pose, lighting-nya bagus jadi hasil foto kece semua. Dapat 100+ foto dalam 45 menit + langsung dikasih soft file HD-nya. Harga 350rb jauh lebih murah dari studio lain yang 700rb-an!",
            author: "Sarah Amelia",
            location: "Bekasi",
            service: "Studio Foto Wisuda",
            date: "Juni 2024",
        },
    ];

    return (
        <section className="py-20 lg:py-28 bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="inline-block px-4 py-1.5 bg-[#ea2423]/20 text-[#ea2423] text-sm font-semibold rounded-full mb-4">
                        Valued Clients
                    </span>
                    <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
                        Dipercaya Ribuan Pelanggan SSFoto
                    </h2>
                    <p className="text-lg text-gray-400">
                        Cerita nyata dari pelanggan yang puas dengan layanan SSFoto
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-700 hover:border-[#ea2423]/50 transition-all duration-300"
                        >
                            {/* Rating */}
                            <div className="flex items-center gap-1 mb-4">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className="w-5 h-5 fill-yellow-400 text-yellow-400"
                                    />
                                ))}
                            </div>

                            {/* Testimonial Text */}
                            <p className="text-gray-300 mb-6 leading-relaxed italic">
                                "{testimonial.text}"
                            </p>

                            {/* Author & Service */}
                            <div className="border-t border-gray-700 pt-4">
                                <p className="font-semibold text-white mb-1">
                                    {testimonial.author}
                                </p>
                                <p className="text-sm text-gray-400 mb-2">{testimonial.location}</p>
                                <div className="flex items-center gap-2 text-xs">
                                    <span className="px-2 py-1 bg-[#ea2423]/20 text-[#ea2423] rounded">
                                        {testimonial.service}
                                    </span>
                                    <span className="text-gray-500">{testimonial.date}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ============================================================================
// SECTION 9: FAQ - Query Expansion Entities
// ============================================================================
function FAQSection() {
    const faqs = [
        {
            question: "Berapa harga cetak pas foto di SSFoto?",
            answer:
                "Harga cetak pas foto SSFoto mulai dari Rp 15.000 untuk ukuran standar 3x4 cm. Untuk pas foto visa dengan background khusus dan ukuran custom, harga mulai dari Rp 25.000 per lembar. Kami juga menyediakan paket hemat untuk pemesanan dalam jumlah banyak.",
        },
        {
            question: "Apakah SSFoto bisa cetak pas foto visa?",
            answer:
                "Ya, SSFoto melayani cetak pas foto visa untuk berbagai negara termasuk Amerika, Schengen, Australia, dan Jepang. Kami memahami requirement ukuran dan background untuk setiap negara tujuan dan akan memastikan pas foto Anda sesuai standar kedutaan.",
        },
        {
            question: "Berapa lama proses cetak di SSFoto?",
            answer:
                "SSFoto menjamin pas foto ready dalam 15 menit. Untuk cetak foto kanvas dan pembesaran, waktu proses 1-3 hari kerja tergantung ukuran dan finishing yang dipilih. Rush order tersedia dengan biaya tambahan.",
        },
        {
            question: "Apakah bisa pesan online?",
            answer:
                "Ya, SSFoto melayani order online via WhatsApp. Anda cukup kirim file foto dan spesifikasi yang diinginkan, lalu pilih metode pengambilan (pickup di cabang atau delivery via kurir). Pembayaran bisa transfer atau COD.",
        },
        {
            question: "Cabang SSFoto yang buka paling lama sampai jam berapa?",
            answer:
                "Cabang SSFoto Galaxy Bekasi buka hingga jam 22.00 mengikuti jam operasional mall. Cabang lainnya (Rawamangun, Pondok Pinang, Jatiwaringin, dan Bogor) buka hingga jam 21.00 setiap hari termasuk weekend.",
        },
    ];

    return (
        <section className="py-20 lg:py-28 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                        Pertanyaan Seputar SSFoto
                    </h2>
                </div>

                <div className="space-y-6">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-100"
                        >
                            <h3 className="font-serif text-xl font-bold text-gray-900 mb-4">
                                {faq.question}
                            </h3>
                            <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ============================================================================
// SECTION 10: FINAL CTA SECTION
// ============================================================================
function FinalCTASection() {
    return (
        <section className="py-20 lg:py-28 bg-gradient-to-br from-[#ea2423] to-[#c91f1e] text-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-black/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

            <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                    Siap Cetak Foto Berkualitas?
                </h2>
                <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
                    Kunjungi cabang SSFoto terdekat atau order online via WhatsApp. Tim
                    kami siap membantu kebutuhan cetak foto Anda.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                    <Link
                        href="https://wa.me/6281936444486"
                        className="inline-flex items-center gap-3 px-10 py-4 bg-white text-[#ea2423] font-bold rounded-full hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:scale-105 text-lg"
                    >
                        <MessageCircle className="w-5 h-5" />
                        WhatsApp SSFoto Sekarang
                    </Link>
                    <Link
                        href="#lokasi"
                        className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/50 text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-300"
                    >
                        <MapPin className="w-5 h-5" />
                        Cek Lokasi Cabang
                    </Link>
                </div>

                {/* Contact Info */}
                <div className="space-y-3 text-white/80">
                    <div className="flex items-center justify-center gap-2">
                        <Phone className="w-5 h-5" />
                        <span>Customer Service: 0819-3644-4486 (24/7)</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                        <Mail className="w-5 h-5" />
                        <span>Email: info@ssfoto.com</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                        <Instagram className="w-5 h-5" />
                        <span>Instagram: @ssfoto.official</span>
                    </div>
                </div>
            </div>
        </section>
    );
}

// ============================================================================
// MAIN PAGE EXPORT
// ============================================================================
export default function HomepageV2() {
    return (
        <>
            <HeroSection />
            <EntityStatement />
            <ServicesSection />
            <USPSection />
            <LocationsSection />
            <HowItWorksSection />
            <BrandEntitiesSection />
            <TestimonialsSection />
            <FAQSection />
            <FinalCTASection />

            {/* Schema Markup - Organization */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "PhotoStore",
                        name: "SSFoto",
                        description:
                            "Layanan cetak foto profesional dan studio foto di Jakarta",
                        foundingDate: "2015",
                        url: "https://ssfoto.co.id",
                        logo: "https://ssfoto.co.id/logo.png",
                        sameAs: [
                            "https://instagram.com/ssfoto.official",
                            "https://facebook.com/ssfoto",
                        ],
                        address: [
                            {
                                "@type": "PostalAddress",
                                streetAddress: "Jl. Balai Pustaka Timur No.11",
                                addressLocality: "Rawamangun",
                                addressRegion: "Jakarta Timur",
                                postalCode: "13220",
                                addressCountry: "ID",
                            },
                        ],
                        telephone: "+62-819-3644-4486",
                        priceRange: "Rp 15,000 - Rp 1,000,000",
                        openingHours: "Mo-Su 09:00-21:00",
                        aggregateRating: {
                            "@type": "AggregateRating",
                            ratingValue: "4.8",
                            reviewCount: "4538",
                        },
                    }),
                }}
            />

            {/* Schema Markup - FAQ */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        mainEntity: [
                            {
                                "@type": "Question",
                                name: "Berapa harga cetak pas foto di SSFoto?",
                                acceptedAnswer: {
                                    "@type": "Answer",
                                    text: "Harga cetak pas foto SSFoto mulai dari Rp 15.000 untuk ukuran standar 3x4 cm. Untuk pas foto visa dengan background khusus dan ukuran custom, harga mulai dari Rp 25.000 per lembar.",
                                },
                            },
                            {
                                "@type": "Question",
                                name: "Apakah SSFoto bisa cetak pas foto visa?",
                                acceptedAnswer: {
                                    "@type": "Answer",
                                    text: "Ya, SSFoto melayani cetak pas foto visa untuk berbagai negara termasuk Amerika, Schengen, Australia, dan Jepang. Kami memahami requirement ukuran dan background untuk setiap negara tujuan.",
                                },
                            },
                            {
                                "@type": "Question",
                                name: "Berapa lama proses cetak di SSFoto?",
                                acceptedAnswer: {
                                    "@type": "Answer",
                                    text: "SSFoto menjamin pas foto ready dalam 15 menit. Untuk cetak foto kanvas dan pembesaran, waktu proses 1-3 hari kerja tergantung ukuran dan finishing yang dipilih.",
                                },
                            },
                        ],
                    }),
                }}
            />
        </>
    );
}

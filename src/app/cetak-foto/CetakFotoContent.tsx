"use client";

import Image from "next/image";
import Link from "next/link";
import {
    Check,
    ChevronRight,
    Clock,
    Award,
    MapPin,
    Zap,
    MessageCircle,
} from "lucide-react";
import ProductBreadcrumb from "@/components/ui/ProductBreadcrumb";

export default function CetakFotoContent() {
    return (
        <>
            <ProductBreadcrumb
                productName="Cetak Foto"
                productSlug="cetak-foto"
            />

            {/* Hero Section */}
            <section className="min-h-[80vh] grid grid-cols-1 lg:grid-cols-2">
                {/* Left Column - Image */}
                <div className="relative h-[50vh] lg:h-auto bg-gray-100">
                    <Image
                        src="/images/products/cetak-foto-lab-profesional.png"
                        alt="Cetak Foto Lab Profesional SS Foto"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/50 to-transparent lg:hidden" />
                </div>

                {/* Right Column - Content */}
                <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16 bg-white">
                    <div className="mb-4">
                        <span className="inline-block px-4 py-1.5 bg-red-50 text-[#ea2423] text-sm font-semibold rounded-full">
                            🚀 Kualitas Lab • 15 Menit Selesai
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                        SSFoto - Cetak Foto Lab Profesional & Tahan 100 Tahun
                    </h1>

                    <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                        Ubah foto di HP kamu menjadi kenangan fisik yang abadi. Hasil tajam, warna akurat, kualitas lab kimia Fujifilm — bukan inkjet biasa.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 mb-8">
                        <Link
                            href="https://wa.me/6281936444486"
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#ea2423] text-white font-bold rounded-lg text-lg hover:bg-[#c91f1e] transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                            Upload Foto via WhatsApp
                            <MessageCircle className="w-5 h-5" />
                        </Link>
                        <Link
                            href="/lokasi"
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-gray-200 text-gray-900 font-bold rounded-lg text-lg hover:border-[#ea2423] hover:text-[#ea2423] transition-all duration-300"
                        >
                            Kunjungi Toko Terdekat
                            <MapPin className="w-5 h-5" />
                        </Link>
                    </div>

                    {/* Key Benefits */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex items-center gap-3">
                            <Zap className="w-5 h-5 text-orange-500" />
                            <span className="text-sm font-semibold text-gray-700">15-30 Menit Jadi</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Award className="w-5 h-5 text-blue-500" />
                            <span className="text-sm font-semibold text-gray-700">Kualitas Lab Profesional</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Comparison Section */}
            <section className="py-16 md:py-24 bg-gray-50">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center mb-12">Bedanya Cetak Foto di SS Foto vs Tempat Biasa</h2>
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-900 text-white">
                                    <th className="py-6 px-8 font-bold">Fitur</th>
                                    <th className="py-6 px-8 font-bold">SS Foto (Lab Printing)</th>
                                    <th className="py-6 px-8 font-bold">Tempat Biasa (Inkjet)</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 text-gray-700">
                                <tr>
                                    <td className="py-5 px-8 font-semibold">Warna</td>
                                    <td className="py-5 px-8 text-green-600 font-medium">Akurat dan Vivid</td>
                                    <td className="py-5 px-8 text-gray-400 italic">Sering pucat atau kebiruan</td>
                                </tr>
                                <tr>
                                    <td className="py-5 px-8 font-semibold">Ketajaman</td>
                                    <td className="py-5 px-8 text-green-600 font-medium">Detail sangat tajam</td>
                                    <td className="py-5 px-8 text-gray-400 italic">Cukup baik untuk ukuran kecil</td>
                                </tr>
                                <tr>
                                    <td className="py-5 px-8 font-semibold">Ketahanan</td>
                                    <td className="py-5 px-8 text-green-600 font-medium font-bold">100+ Tahun (Garansi)</td>
                                    <td className="py-5 px-8 text-gray-400 italic">5–10 tahun saja</td>
                                </tr>
                                <tr>
                                    <td className="py-5 px-8 font-semibold">Kertas</td>
                                    <td className="py-5 px-8 text-green-600 font-medium">Foto Fujifilm/Kodak Asli</td>
                                    <td className="py-5 px-8 text-gray-400 italic">Kertas print bervariasi</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p className="text-center mt-8 text-gray-500 italic text-sm">
                        Ini bukan soal harga — ini soal apakah foto tersebut masih bisa dinikmati 20 tahun lagi.
                    </p>
                </div>
            </section>

            {/* Sizes Grid */}
            <section className="py-16 md:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-12">Ukuran Cetak Foto yang Tersedia</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { label: "2R", desc: "6 x 9 cm", link: "/cetak-foto-2r" },
                            { label: "3R", desc: "9 x 13 cm", link: "/cetak-foto-3r" },
                            { label: "4R", desc: "10 x 15 cm", link: "/cetak-foto-4r" },
                            { label: "5R", desc: "13 x 18 cm", link: "/cetak-foto-5r" },
                            { label: "6R", desc: "15 x 20 cm", link: "/cetak-foto-6r" },
                            { label: "8R", desc: "20 x 25 cm", link: "/cetak-foto-8r" },
                            { label: "10R", desc: "25 x 30 cm", link: "/cetak-foto-10r" },
                            { label: "A4", desc: "21 x 29.7 cm", link: "/cetak-foto-a4" },
                        ].map((size) => (
                            <Link
                                key={size.label}
                                href={size.link}
                                className="group p-6 border border-gray-100 rounded-2xl hover:border-[#ea2423] hover:shadow-xl transition-all"
                            >
                                <div className="text-2xl font-bold text-gray-900 group-hover:text-[#ea2423]">{size.label}</div>
                                <div className="text-sm text-gray-500 mt-1">{size.desc}</div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}

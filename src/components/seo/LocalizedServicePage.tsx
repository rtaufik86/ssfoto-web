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
    Info,
    Star,
    Camera,
    Smile,
    Heart
} from "lucide-react";
import ProductBreadcrumb from "@/components/ui/ProductBreadcrumb";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface LocalizedServicePageProps {
    serviceName: string;
    serviceSlug: string;
    headline: string;
    subheadline: React.ReactNode;
    heroImage: string;
    benefits?: { icon: "zap" | "award" | "clock" | "star" | "map-pin" | "camera" | "smile" | "heart"; text: string }[];
    contentSections?: {
        title: string;
        content: string | React.ReactNode;
        image?: string;
        imageAlt?: string;
    }[];
    pricing?: {
        title: string;
        items: { label: string; price: string; note?: string }[];
    };
    faq?: { q: string; a: string }[];
    ctaWhatsAppUrl?: string;
    ctaLocationUrl?: string;
}

const iconMap = {
    zap: <Zap className="w-5 h-5 text-orange-500" />,
    award: <Award className="w-5 h-5 text-blue-500" />,
    clock: <Clock className="w-5 h-5 text-green-500" />,
    star: <Star className="w-5 h-5 text-yellow-500" />,
    "map-pin": <MapPin className="w-5 h-5 text-[#ea2423]" />,
    camera: <Camera className="w-5 h-5 text-gray-700" />,
    smile: <Smile className="w-5 h-5 text-pink-500" />,
    heart: <Heart className="w-5 h-5 text-red-500" />,
};

export default function LocalizedServicePage({
    serviceName,
    serviceSlug,
    headline,
    subheadline,
    heroImage,
    benefits = [],
    contentSections = [],
    pricing,
    faq = [],
    ctaWhatsAppUrl = "https://wa.me/6281936444486",
    ctaLocationUrl = "/lokasi",
}: LocalizedServicePageProps) {
    return (
        <div className="bg-white">
            <ProductBreadcrumb
                productName={serviceName}
                productSlug={serviceSlug}
            />

            {/* Hero Section */}
            <section className="min-h-[70vh] grid grid-cols-1 lg:grid-cols-2 border-b">
                {/* Left Column - Image */}
                <div className="relative h-[40vh] lg:h-auto bg-gray-100">
                    <Image
                        src={heroImage}
                        alt={headline}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/10 lg:hidden" />
                </div>

                {/* Right Column - Content */}
                <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16">
                    <div className="mb-4">
                        <span className="inline-block px-4 py-1.5 bg-red-50 text-[#ea2423] text-sm font-semibold rounded-full">
                            ✨ Layanan Profesional SS Foto
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                        {headline}
                    </h1>

                    <p className="text-lg text-gray-600 mb-8 leading-relaxed whitespace-pre-wrap">
                        {subheadline}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 mb-8">
                        <Link
                            href={ctaWhatsAppUrl}
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#ea2423] text-white font-bold rounded-lg text-lg hover:bg-[#c91f1e] transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                            Hubungi Kami via WA
                            <MessageCircle className="w-5 h-5" />
                        </Link>
                        <Link
                            href={ctaLocationUrl}
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-gray-200 text-gray-900 font-bold rounded-lg text-lg hover:border-[#ea2423] hover:text-[#ea2423] transition-all duration-300"
                        >
                            Toko Terdekat
                            <MapPin className="w-5 h-5" />
                        </Link>
                    </div>

                    {/* Key Benefits */}
                    {benefits && benefits.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-gray-100">
                            {benefits.map((benefit, idx) => (
                                <div key={idx} className="flex items-center gap-3">
                                    {iconMap[benefit.icon as keyof typeof iconMap]}
                                    <span className="text-sm font-semibold text-gray-700">{benefit.text}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Content Sections */}
            {contentSections.map((section, idx) => (
                <section key={idx} className={`py-16 md:py-24 ${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                    <div className="max-w-7xl mx-auto px-6">
                        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                            <div className={idx % 2 !== 0 ? 'lg:order-2' : ''}>
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                                    {section.title}
                                </h2>
                                <div className="prose prose-lg text-gray-600 max-w-none">
                                    {typeof section.content === 'string' ? (
                                        <p>{section.content}</p>
                                    ) : (
                                        section.content
                                    )}
                                </div>
                            </div>
                            {section.image && (
                                <div className={`relative h-[300px] md:h-[450px] rounded-2xl overflow-hidden shadow-2xl ${idx % 2 !== 0 ? 'lg:order-1' : ''}`}>
                                    <Image
                                        src={section.image}
                                        alt={section.imageAlt || section.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            ))}

            {/* Pricing Table Section */}
            {pricing && (
                <section className="py-16 md:py-24 bg-gray-900 text-white">
                    <div className="max-w-4xl mx-auto px-6">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">{pricing.title}</h2>
                            <p className="text-gray-400">Harga transparan tanpa biaya tersembunyi</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-white/10">
                                        <th className="py-4 px-8 font-bold">Layanan</th>
                                        <th className="py-4 px-8 font-bold">Harga</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/10">
                                    {pricing.items.map((item, idx) => (
                                        <tr key={idx}>
                                            <td className="py-4 px-8">
                                                <div className="font-semibold">{item.label}</div>
                                                {item.note && <div className="text-xs text-gray-400 mt-1">{item.note}</div>}
                                            </td>
                                            <td className="py-4 px-8 font-mono text-[#ff4d4d] font-bold">
                                                {item.price}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            )}

            {/* FAQ Section */}
            {faq && faq.length > 0 && (
                <section className="py-16 md:py-24 bg-white">
                    <div className="max-w-3xl mx-auto px-6">
                        <h2 className="text-3xl font-bold text-center mb-12">Pertanyaan Umum (FAQ)</h2>
                        <Accordion type="single" collapsible className="w-full">
                            {faq.map((item, idx) => (
                                <AccordionItem key={idx} value={`item-${idx}`}>
                                    <AccordionTrigger className="text-left font-semibold text-lg hover:text-[#ea2423]">
                                        {item.q}
                                    </AccordionTrigger>
                                    <AccordionContent className="text-gray-600 text-base leading-relaxed">
                                        {item.a}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </section>
            )}

            {/* Final CTA */}
            <section className="py-20 bg-[#ea2423] text-white text-center">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-3xl md:text-5xl font-bold mb-8">Siap Mendapatkan Hasil Foto Sempurna?</h2>
                    <p className="text-xl mb-10 text-white/90">Kunjungi outlet SS Foto terdekat atau hubungi kami melalui WhatsApp untuk konsultasi gratis.</p>
                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                        <Link
                            href={ctaWhatsAppUrl}
                            className="px-10 py-5 bg-white text-[#ea2423] font-bold rounded-full text-xl hover:bg-gray-100 transition-all shadow-xl"
                        >
                            Chat WhatsApp Sekarang
                        </Link>
                        <Link
                            href={ctaLocationUrl}
                            className="px-10 py-5 border-2 border-white text-white font-bold rounded-full text-xl hover:bg-white hover:text-[#ea2423] transition-all"
                        >
                            Lihat Lokasi Toko
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}

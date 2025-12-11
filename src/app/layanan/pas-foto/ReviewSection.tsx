"use client";

import { useState } from "react";
import { Star, CheckCircle, Camera, ThumbsUp, MessageCircle } from "lucide-react";
import Link from "next/link";

// Helper to render star icons
const renderStars = (rating: number, size: "sm" | "md" | "lg" = "md") => {
  const starSizeClass =
    size === "sm" ? "w-4 h-4" : size === "md" ? "w-5 h-5" : "w-6 h-6";
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${starSizeClass} ${star <= rating
              ? "fill-yellow-400 text-yellow-400"
              : "text-gray-300"
            }`}
        />
      ))}
    </div>
  );
};

// Placeholder review data
const reviews = [
  {
    id: "1",
    user: "Rizki Maulana",
    location: "Jakarta Timur",
    date: "2024-11-25",
    rating: 5,
    text: "Pas foto untuk visa Jepang saya langsung diterima! Kualitasnya bagus, background putih bersih, dan ukurannya presisi. Prosesnya cepat, upload pagi jam 9, siang jam 12 sudah bisa diambil. Recommended!",
    hasImages: true,
    imageCount: 2,
    helpful: 32,
    avatarInitial: "RM",
  },
  {
    id: "2",
    user: "Siti Aisyah",
    location: "Bekasi",
    date: "2024-11-22",
    rating: 5,
    text: "Untuk keperluan CPNS, butuh pas foto background merah 3x4. Tim SS Foto sangat membantu, mereka adjust background dan lighting foto saya yang agak gelap. Hasilnya sempurna dan lolos verifikasi online. Terima kasih!",
    hasImages: true,
    imageCount: 1,
    helpful: 28,
    avatarInitial: "SA",
  },
  {
    id: "3",
    user: "Budi Santoso",
    location: "Bogor",
    date: "2024-11-20",
    rating: 5,
    text: "Sudah 3x cetak pas foto di sini untuk berbagai keperluan (lamaran kerja, SKCK, visa). Selalu puas dengan hasilnya. Kertas fotonya tebal dan berkualitas, tidak seperti print biasa.",
    hasImages: false,
    imageCount: 0,
    helpful: 24,
    avatarInitial: "BS",
  },
  {
    id: "4",
    user: "Linda Wijaya",
    location: "Jakarta Selatan",
    date: "2024-11-18",
    rating: 4,
    text: "Kualitas cetakan bagus, proses cepat. Hanya saja waktu saya datang ke toko agak ramai jadi harus antri sebentar. Tapi overall pelayanan ramah dan hasil memuaskan.",
    hasImages: true,
    imageCount: 1,
    helpful: 15,
    avatarInitial: "LW",
  },
  {
    id: "5",
    user: "Ahmad Fauzi",
    location: "Jakarta Timur",
    date: "2024-11-15",
    rating: 5,
    text: "Pas foto untuk ijazah dan transkrip nilai. Background biru-nya solid dan rapi. Yang paling saya suka, mereka paham standar foto untuk berbagai kebutuhan, jadi tidak perlu khawatir ditolak.",
    hasImages: true,
    imageCount: 2,
    helpful: 19,
    avatarInitial: "AF",
  },
];

// Calculate rating distribution
const totalReviews = reviews.length;
const ratingDistribution = {
  5: (reviews.filter((r) => r.rating === 5).length / totalReviews) * 100,
  4: (reviews.filter((r) => r.rating === 4).length / totalReviews) * 100,
  3: (reviews.filter((r) => r.rating === 3).length / totalReviews) * 100,
  2: (reviews.filter((r) => r.rating === 2).length / totalReviews) * 100,
  1: (reviews.filter((r) => r.rating === 1).length / totalReviews) * 100,
};

export default function ReviewSection() {
  const [sortBy, setSortBy] = useState<"recent" | "helpful">("recent");

  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortBy === "recent") {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    return b.helpful - a.helpful;
  });

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
            Dipercaya Ribuan Pelanggan Indonesia
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Lihat apa kata pelanggan kami yang telah mempercayakan pas foto
            mereka kepada SS Foto.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Column: Review Summary */}
          <div className="lg:col-span-1 bg-white rounded-xl p-8 shadow-lg flex flex-col items-center lg:items-start sticky lg:top-24 h-fit">
            <p className="text-sm font-semibold text-gray-600 mb-2">
              Rata-rata Rating
            </p>
            <div className="flex items-center gap-2 mb-4">
              <div className="text-5xl font-bold text-gray-900">4.9</div>
              {renderStars(5, "lg")}
            </div>
            <p className="text-sm text-gray-700 mb-6">
              Berdasarkan 2,400+ ulasan
            </p>

            {/* Rating Distribution Bar Chart */}
            <div className="w-full space-y-2 mb-8">
              {[5, 4, 3, 2, 1].map((star) => (
                <div key={star} className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-700 w-8">
                    {star} ⭐
                  </span>
                  <div className="flex-grow bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-yellow-400 h-2.5 rounded-full"
                      style={{ width: `${ratingDistribution[star as keyof typeof ratingDistribution]}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 w-8 text-right">
                    {ratingDistribution[star as keyof typeof ratingDistribution].toFixed(0)}%
                  </span>
                </div>
              ))}
            </div>

            {/* Trust Badge */}
            <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg border border-green-200 w-full">
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
              <p className="text-sm text-green-800 font-semibold">
                Semua ulasan telah diverifikasi keasliannya.
              </p>
            </div>
          </div>

          {/* Right Column: Review List */}
          <div className="lg:col-span-2 space-y-8">
            {/* Sorting Control */}
            <div className="flex justify-end mb-6">
              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value as "recent" | "helpful")
                }
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 focus:ring-[#ea2423] focus:border-[#ea2423]"
              >
                <option value="recent">Terbaru</option>
                <option value="helpful">Paling Membantu</option>
              </select>
            </div>

            {/* Individual Review Cards */}
            {sortedReviews.map((review) => (
              <div
                key={review.id}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                    {review.avatarInitial}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-gray-900">
                        {review.user}
                      </p>
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-xs text-gray-500">
                        (Pembeli Terverifikasi)
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">
                      {review.location} •{" "}
                      {new Date(review.date).toLocaleDateString("id-ID", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
                <div className="mb-4">{renderStars(review.rating, "sm")}</div>
                <p className="text-sm text-gray-700 leading-relaxed mb-4">
                  {review.text}
                </p>

                {review.hasImages && (
                  <div className="relative w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500 border-2 border-dashed border-gray-300 mb-4">
                    <Camera className="w-8 h-8" />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent rounded-lg flex items-end justify-center p-1 text-white text-xs font-semibold">
                      {review.imageCount} Foto
                    </div>
                  </div>
                )}

                <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#ea2423] transition-colors">
                  <ThumbsUp className="w-4 h-4" />
                  <span>Membantu ({review.helpful})</span>
                </button>
              </div>
            ))}

            {/* Load More Button */}
            <div className="text-center mt-8">
              <button className="px-6 py-3 border-2 border-gray-300 rounded-lg text-gray-700 font-semibold hover:border-[#ea2423] hover:text-[#ea2423] transition-colors">
                Muat Lebih Banyak Ulasan
              </button>
            </div>

            {/* Bottom CTA */}
            <div className="mt-12 text-center p-8 bg-gradient-to-br from-[#ea2423] to-red-700 text-white rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold mb-4">
                Bergabunglah dengan Ribuan Pelanggan Puas Lainnya!
              </h3>
              <p className="text-white/90 mb-6">
                Cetak pas foto Anda sekarang dan dapatkan hasil berkualitas lab
                dengan jaminan lolos aplikasi.
              </p>
              <Link
                href="/upload/pas-foto"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#ea2423] font-bold rounded-lg text-lg hover:bg-gray-100 transition-all shadow-xl"
              >
                <MessageCircle className="w-5 h-5" />
                Mulai Upload Foto
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


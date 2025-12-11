"use client";

import { useState } from "react";
import { Star, ThumbsUp, Camera, CheckCircle } from "lucide-react";
import Image from "next/image";

// Types
interface Review {
  id: string;
  userName: string;
  userLocation: string;
  date: string;
  rating: number;
  reviewText: string;
  hasImages: boolean;
  imageCount?: number;
  verified: boolean;
  helpfulCount: number;
}

// Placeholder Review Data
const placeholderReviews: Review[] = [
  {
    id: "1",
    userName: "Ibu Sari Dewi",
    userLocation: "Jakarta Selatan",
    date: "15 Nov 2024",
    rating: 5,
    reviewText:
      "Hasilnya luar biasa! Foto keluarga kami jadi terlihat seperti lukisan profesional. Kanvasnya tebal dan teksturnya premium banget. Packing juga sangat rapi dengan bubble wrap tebal + kayu. Highly recommended!",
    hasImages: true,
    imageCount: 3,
    verified: true,
    helpfulCount: 24,
  },
  {
    id: "2",
    userName: "Pak Ahmad Rizki",
    userLocation: "Bekasi",
    date: "10 Nov 2024",
    rating: 5,
    reviewText:
      "Pesan 3 kanvas sekaligus untuk gallery wall di ruang tamu. Hasilnya wow! Warna tajam, tidak mengkilap, dan sudut-sudutnya rapi. Tim CS juga responsif banget, bantu pilih ukuran yang pas. Worth every penny!",
    hasImages: true,
    imageCount: 2,
    verified: true,
    helpfulCount: 18,
  },
  {
    id: "3",
    userName: "Rina Wulandari",
    userLocation: "Bogor",
    date: "5 Nov 2024",
    rating: 5,
    reviewText:
      "Foto pre-wedding kami dicetak ukuran 60x90 cm, hasilnya bikin merinding! Detail di wajah sangat tajam, warna kulitnya natural. Rangka kayunya kokoh dan sudah ada pengaitnya. Tinggal pasang langsung. Terima kasih SS Foto!",
    hasImages: true,
    imageCount: 1,
    verified: true,
    helpfulCount: 15,
  },
  {
    id: "4",
    userName: "Budi Santoso",
    userLocation: "Tangerang",
    date: "28 Okt 2024",
    rating: 4,
    reviewText:
      "Kualitas kanvas bagus, hanya pengiriman agak lama karena custom. Tapi hasil akhirnya puas! Foto pemandangan Bromo jadi hidup di dinding. Next mau pesan lagi untuk foto anak.",
    hasImages: false,
    verified: true,
    helpfulCount: 9,
  },
  {
    id: "5",
    userName: "Ibu Linda",
    userLocation: "Jakarta Timur",
    date: "20 Okt 2024",
    rating: 5,
    reviewText:
      "Sudah 3x order di SS Foto, selalu puas! Kali ini pesan kanvas panoramic 30x90 untuk di atas sofa. Ukurannya pas banget dan kualitasnya konsisten bagus. Tim SS Foto juga sabar bantu revisi desain sampai cocok.",
    hasImages: true,
    imageCount: 2,
    verified: true,
    helpfulCount: 12,
  },
];

// Rating Distribution Data
const ratingDistribution = [
  { stars: 5, count: 720, percentage: 85 },
  { stars: 4, count: 102, percentage: 12 },
  { stars: 3, count: 17, percentage: 2 },
  { stars: 2, count: 8, percentage: 1 },
  { stars: 1, count: 3, percentage: 0 },
];

export default function ReviewSection() {
  const [sortBy, setSortBy] = useState<"recent" | "helpful">("recent");

  // Calculate aggregate rating
  const totalReviews = 850;
  const averageRating = 4.8;

  // Render star rating
  const renderStars = (rating: number, size: "sm" | "md" | "lg" = "sm") => {
    const sizeClasses = {
      sm: "w-4 h-4",
      md: "w-5 h-5",
      lg: "w-6 h-6",
    };

    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${sizeClasses[size]} ${
              star <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "fill-gray-200 text-gray-200"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
            Dipercaya Ribuan Keluarga Indonesia
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Lihat testimoni asli dari pelanggan kami yang sudah merasakan kualitas premium SS Foto
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* LEFT: Review Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-sm sticky top-8">
              {/* Aggregate Rating */}
              <div className="text-center pb-6 border-b border-gray-200">
                <div className="text-5xl font-bold text-gray-900 mb-2">
                  {averageRating}
                </div>
                <div className="flex justify-center mb-2">
                  {renderStars(5, "md")}
                </div>
                <p className="text-sm text-gray-600">
                  Berdasarkan <strong>{totalReviews} ulasan</strong>
                </p>
              </div>

              {/* Rating Distribution Chart */}
              <div className="pt-6 space-y-3">
                <p className="text-sm font-semibold text-gray-900 mb-4">
                  Distribusi Rating:
                </p>
                {ratingDistribution.map((item) => (
                  <div key={item.stars} className="flex items-center gap-3">
                    {/* Stars Label */}
                    <div className="flex items-center gap-1 w-16">
                      <span className="text-sm font-medium text-gray-700">
                        {item.stars}
                      </span>
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    </div>

                    {/* Progress Bar */}
                    <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-400 rounded-full transition-all"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>

                    {/* Count */}
                    <span className="text-sm text-gray-600 w-12 text-right">
                      {item.count}
                    </span>
                  </div>
                ))}
              </div>

              {/* Trust Badge */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Semua ulasan terverifikasi</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Review List */}
          <div className="lg:col-span-2">
            {/* Sorting Controls */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm font-semibold text-gray-900">
                {placeholderReviews.length} Ulasan Terbaru
              </p>
              <div className="flex items-center gap-2">
                <label htmlFor="sort" className="text-sm text-gray-600">
                  Urutkan:
                </label>
                <select
                  id="sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as "recent" | "helpful")}
                  className="text-sm border border-gray-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#ea2423]"
                >
                  <option value="recent">Terbaru</option>
                  <option value="helpful">Paling Membantu</option>
                </select>
              </div>
            </div>

            {/* Review Cards */}
            <div className="space-y-6">
              {placeholderReviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* Review Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4">
                      {/* User Avatar Placeholder */}
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                        {review.userName.charAt(0)}
                      </div>

                      {/* User Info */}
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-semibold text-gray-900">
                            {review.userName}
                          </p>
                          {review.verified && (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          )}
                        </div>
                        <p className="text-xs text-gray-500">
                          {review.userLocation} • {review.date}
                        </p>
                      </div>
                    </div>

                    {/* Star Rating */}
                    <div>{renderStars(review.rating, "sm")}</div>
                  </div>

                  {/* Review Text */}
                  <p className="text-sm text-gray-700 leading-relaxed mb-4">
                    {review.reviewText}
                  </p>

                  {/* Image Proof Placeholder */}
                  {review.hasImages && (
                    <div className="mb-4">
                      <div className="flex items-center gap-3">
                        {/* Placeholder Image Thumbnails */}
                        {[...Array(review.imageCount || 1)].map((_, index) => (
                          <div
                            key={index}
                            className="w-20 h-20 rounded-lg bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center border-2 border-dashed border-gray-400"
                          >
                            <Camera className="w-6 h-6 text-gray-500" />
                          </div>
                        ))}
                        <div className="text-xs text-gray-500">
                          <p className="font-semibold">
                            [Placeholder: Customer Photos]
                          </p>
                          <p>{review.imageCount} foto dari pelanggan</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Review Footer - Helpful Button */}
                  <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
                    <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#ea2423] transition-colors">
                      <ThumbsUp className="w-4 h-4" />
                      <span>Membantu ({review.helpfulCount})</span>
                    </button>
                    {review.hasImages && (
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Camera className="w-3 h-3" />
                        Dengan Foto
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Load More Button (Placeholder) */}
            <div className="mt-8 text-center">
              <button className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-[#ea2423] hover:text-[#ea2423] transition-colors">
                Muat Lebih Banyak Ulasan
              </button>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center p-8 bg-white rounded-xl shadow-sm">
          <p className="text-lg font-semibold text-gray-900 mb-2">
            Bergabunglah dengan ribuan pelanggan puas kami!
          </p>
          <p className="text-gray-600 mb-6">
            Mulai cetak kanvas premium Anda hari ini dan rasakan kualitas terbaik.
          </p>
          <a
            href="/upload/canvas"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#ea2423] text-white font-bold rounded-lg hover:bg-[#c91f1e] transition-all shadow-lg hover:shadow-xl"
          >
            Mulai Desain Sekarang
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}


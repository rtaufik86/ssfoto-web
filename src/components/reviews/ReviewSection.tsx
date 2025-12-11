'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Star, ThumbsUp, CheckCircle, Camera, ChevronDown, Filter } from 'lucide-react';

// ═══════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════

interface Review {
  id: string;
  userName: string;
  date: string;
  rating: number;
  text: string;
  verified: boolean;
  helpful: number;
  images?: string[];
}

interface ReviewSectionProps {
  productName: string;
  averageRating: number;
  totalReviews: number;
  ratingDistribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
  reviews: Review[];
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export default function ReviewSection({
  productName,
  averageRating,
  totalReviews,
  ratingDistribution,
  reviews: initialReviews,
}: ReviewSectionProps) {
  const [sortBy, setSortBy] = useState<'recent' | 'helpful' | 'highest' | 'lowest'>('recent');
  const [filterRating, setFilterRating] = useState<number | 'all'>('all');
  const [showFilters, setShowFilters] = useState(false);

  // Sort reviews
  const sortedReviews = [...initialReviews].sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case 'helpful':
        return b.helpful - a.helpful;
      case 'highest':
        return b.rating - a.rating;
      case 'lowest':
        return a.rating - b.rating;
      default:
        return 0;
    }
  });

  // Filter reviews
  const filteredReviews = filterRating === 'all'
    ? sortedReviews
    : sortedReviews.filter(review => review.rating === filterRating);

  // Calculate percentage for each rating
  const getPercentage = (count: number) => {
    return totalReviews > 0 ? (count / totalReviews) * 100 : 0;
  };

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
            Dipercaya Ribuan Keluarga Indonesia
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Lihat apa kata pelanggan kami tentang kualitas {productName}
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          
          {/* ═════════════════════════════════════════════════════════════ */}
          {/* LEFT: Review Summary (Sticky) */}
          {/* ═════════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-gray-50 rounded-2xl p-6 md:p-8 border border-gray-100">
              
              {/* Average Rating */}
              <div className="text-center mb-6 pb-6 border-b border-gray-200">
                <div className="text-6xl font-bold text-gray-900 mb-2">
                  {averageRating.toFixed(1)}
                </div>
                
                {/* Stars */}
                <div className="flex items-center justify-center gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-6 h-6 ${
                        star <= Math.round(averageRating)
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                
                <p className="text-gray-600 font-medium">
                  Berdasarkan {totalReviews.toLocaleString('id-ID')}+ ulasan
                </p>
              </div>

              {/* Rating Distribution */}
              <div className="space-y-3">
                {[5, 4, 3, 2, 1].map((rating) => {
                  const count = ratingDistribution[rating as keyof typeof ratingDistribution];
                  const percentage = getPercentage(count);
                  
                  return (
                    <button
                      key={rating}
                      onClick={() => setFilterRating(filterRating === rating ? 'all' : rating)}
                      className={`w-full flex items-center gap-3 p-2 rounded-lg transition-colors ${
                        filterRating === rating
                          ? 'bg-red-50 ring-2 ring-[#ea2423]'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      {/* Star Label */}
                      <div className="flex items-center gap-1 min-w-[60px]">
                        <span className="text-sm font-medium text-gray-700">{rating}</span>
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-amber-400 transition-all duration-300"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      
                      {/* Count */}
                      <span className="text-sm text-gray-600 min-w-[40px] text-right">
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Reset Filter */}
              {filterRating !== 'all' && (
                <button
                  onClick={() => setFilterRating('all')}
                  className="w-full mt-4 py-2 text-sm text-[#ea2423] font-medium hover:underline"
                >
                  Tampilkan Semua Ulasan
                </button>
              )}
            </div>
          </div>

          {/* ═════════════════════════════════════════════════════════════ */}
          {/* RIGHT: Review List */}
          {/* ═════════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-2">
            
            {/* Sorting & Filtering Controls */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-gray-200">
              
              {/* Results Count */}
              <div className="text-gray-600">
                Menampilkan <span className="font-semibold text-gray-900">{filteredReviews.length}</span> ulasan
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Filter className="w-4 h-4" />
                  <span className="text-sm font-medium">Filter</span>
                </button>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#ea2423] focus:border-transparent"
                >
                  <option value="recent">Terbaru</option>
                  <option value="helpful">Paling Membantu</option>
                  <option value="highest">Rating Tertinggi</option>
                  <option value="lowest">Rating Terendah</option>
                </select>
              </div>
            </div>

            {/* Review Cards */}
            <div className="space-y-6">
              {filteredReviews.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500">Tidak ada ulasan yang sesuai dengan filter Anda.</p>
                </div>
              ) : (
                filteredReviews.map((review) => (
                  <div
                    key={review.id}
                    className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
                  >
                    {/* Header: User Info & Rating */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        {/* Avatar */}
                        <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                          {review.userName.charAt(0).toUpperCase()}
                        </div>
                        
                        {/* Name & Date */}
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-semibold text-gray-900">{review.userName}</p>
                            {review.verified && (
                              <CheckCircle className="w-4 h-4 text-green-600" title="Pembelian Terverifikasi" />
                            )}
                          </div>
                          <p className="text-sm text-gray-500">{review.date}</p>
                        </div>
                      </div>

                      {/* Star Rating */}
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-4 h-4 ${
                              star <= review.rating
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Review Text */}
                    <p className="text-gray-700 leading-relaxed mb-4">
                      {review.text}
                    </p>

                    {/* Review Images (if any) */}
                    {review.images && review.images.length > 0 && (
                      <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                        {review.images.map((image, index) => (
                          <div
                            key={index}
                            className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100 border border-gray-200 group cursor-pointer"
                          >
                            {/* Placeholder for actual image */}
                            <div className="absolute inset-0 flex items-center justify-center">
                              <Camera className="w-8 h-8 text-gray-400" />
                            </div>
                            {/* Hover overlay */}
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <p className="text-white text-xs">Lihat Foto</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Footer: Helpful Button */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-[#ea2423] hover:bg-red-50 rounded-lg transition-colors">
                        <ThumbsUp className="w-4 h-4" />
                        <span>Membantu ({review.helpful})</span>
                      </button>
                      
                      {review.verified && (
                        <div className="flex items-center gap-1 text-sm text-green-600">
                          <CheckCircle className="w-4 h-4" />
                          <span>Pembelian Terverifikasi</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Load More Button (Placeholder) */}
            {filteredReviews.length > 0 && filteredReviews.length < totalReviews && (
              <div className="text-center mt-8">
                <button className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-[#ea2423] hover:text-[#ea2423] transition-colors">
                  <span>Muat Lebih Banyak Ulasan</span>
                  <ChevronDown className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 pt-12 border-t border-gray-200 text-center">
          <p className="text-gray-600 mb-4">
            Sudah pernah memesan dari kami? Bagikan pengalaman Anda!
          </p>
          <button className="inline-flex items-center gap-2 px-6 py-3 bg-[#ea2423] text-white font-semibold rounded-xl hover:bg-red-600 transition-colors">
            <Star className="w-5 h-5" />
            <span>Tulis Ulasan</span>
          </button>
        </div>
      </div>
    </section>
  );
}


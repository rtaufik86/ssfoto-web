'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Check,
  ArrowRight,
  ArrowLeft,
  Square,
  RectangleHorizontal,
  PanelTop,
  Sparkles,
  ShieldCheck,
  Package,
  Star,
  Info,
} from 'lucide-react';

// Canvas size options with pricing
const SIZE_OPTIONS = [
  {
    id: 'square-30',
    format: 'Square',
    formatLabel: 'Persegi',
    size: '30×30 cm',
    width: 30,
    height: 30,
    price: 250000,
    priceLabel: 'Rp 250.000',
    icon: Square,
    popular: false,
    description: 'Cocok untuk foto close-up atau portrait tunggal.',
    aspectPreview: 'aspect-square',
  },
  {
    id: 'rect-40x60',
    format: 'Rectangular',
    formatLabel: 'Persegi Panjang',
    size: '40×60 cm',
    width: 40,
    height: 60,
    price: 420000,
    priceLabel: 'Rp 420.000',
    icon: RectangleHorizontal,
    popular: true,
    description: 'Ukuran paling populer untuk ruang tamu dan kamar.',
    aspectPreview: 'aspect-[2/3]',
  },
  {
    id: 'pano-30x90',
    format: 'Panoramic',
    formatLabel: 'Panoramik',
    size: '30×90 cm',
    width: 30,
    height: 90,
    price: 550000,
    priceLabel: 'Rp 550.000',
    icon: PanelTop,
    popular: false,
    description: 'Sempurna untuk pemandangan alam atau skyline kota.',
    aspectPreview: 'aspect-[1/3]',
  },
];

// Additional size options (expandable)
const ADDITIONAL_SIZES = [
  { id: 'square-40', size: '40×40 cm', price: 'Rp 320.000', format: 'Square' },
  { id: 'rect-50x70', size: '50×70 cm', price: 'Rp 520.000', format: 'Rectangular' },
  { id: 'rect-60x90', size: '60×90 cm', price: 'Rp 750.000', format: 'Rectangular' },
];

export default function CanvasSizePage() {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [showAllSizes, setShowAllSizes] = useState(false);

  const selectedOption = SIZE_OPTIONS.find(opt => opt.id === selectedSize);

  // Format price with thousand separator
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Progress Bar */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between text-sm">
            <Link 
              href="/upload/canvas"
              className="flex items-center gap-2 text-gray-500 hover:text-[#ea2423] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali</span>
            </Link>
            
            {/* Step Indicator */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                  <Check className="w-4 h-4" />
                </div>
                <span className="text-green-600 font-medium hidden sm:inline">Unggah</span>
              </div>
              <div className="w-8 h-0.5 bg-green-500" />
              <div className="flex items-center gap-1">
                <div className="w-6 h-6 bg-[#ea2423] text-white rounded-full flex items-center justify-center text-xs font-bold">
                  2
                </div>
                <span className="text-[#ea2423] font-medium hidden sm:inline">Ukuran</span>
              </div>
              <div className="w-8 h-0.5 bg-gray-200" />
              <div className="flex items-center gap-1">
                <div className="w-6 h-6 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center text-xs font-bold">
                  3
                </div>
                <span className="text-gray-400 hidden sm:inline">Pesan</span>
              </div>
            </div>

            <div className="w-20" /> {/* Spacer for alignment */}
          </div>
        </div>
      </div>

      {/* Header */}
      <section className="py-10 text-center px-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 text-[#ea2423] rounded-full text-sm font-medium mb-4">
          <Sparkles className="w-4 h-4" />
          <span>Langkah 2 dari 3</span>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
          Pilih Ukuran & Format Kanvas Anda
        </h1>
        
        <p className="text-gray-600 max-w-lg mx-auto">
          Pilih ukuran yang sesuai dengan ruangan dan kebutuhan Anda. 
          Semua ukuran termasuk rangka kayu premium.
        </p>
      </section>

      {/* Size Selection Grid */}
      <section className="max-w-4xl mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {SIZE_OPTIONS.map((option) => {
            const Icon = option.icon;
            const isSelected = selectedSize === option.id;
            
            return (
              <button
                key={option.id}
                onClick={() => setSelectedSize(option.id)}
                className={`
                  relative p-6 rounded-2xl border-2 text-left transition-all duration-200
                  ${isSelected 
                    ? 'border-[#ea2423] bg-red-50 ring-4 ring-red-100 scale-[1.02]' 
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                  }
                `}
              >
                {/* Popular Badge */}
                {option.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#ea2423] text-white text-xs font-bold rounded-full">
                    ⭐ Paling Populer
                  </div>
                )}

                {/* Selection Indicator */}
                {isSelected && (
                  <div className="absolute top-4 right-4 w-6 h-6 bg-[#ea2423] rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}

                {/* Icon & Format */}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isSelected ? 'bg-[#ea2423] text-white' : 'bg-gray-100 text-gray-600'}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{option.formatLabel}</p>
                    <p className="text-sm text-gray-500">{option.format}</p>
                  </div>
                </div>

                {/* Size */}
                <div className="mb-4">
                  <p className="text-2xl font-bold text-gray-900">{option.size}</p>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 mb-4">
                  {option.description}
                </p>

                {/* Price */}
                <div className={`text-xl font-bold ${isSelected ? 'text-[#ea2423]' : 'text-gray-900'}`}>
                  {option.priceLabel}
                </div>

                {/* Aspect Preview (Visual) */}
                <div className="mt-4 flex justify-center">
                  <div 
                    className={`
                      w-16 bg-gray-200 border-2 
                      ${isSelected ? 'border-[#ea2423]' : 'border-gray-300'}
                      ${option.aspectPreview}
                    `}
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* More Sizes Toggle */}
        <div className="mt-6 text-center">
          <button
            onClick={() => setShowAllSizes(!showAllSizes)}
            className="text-sm text-[#ea2423] font-medium hover:underline"
          >
            {showAllSizes ? 'Sembunyikan ukuran lain' : 'Lihat ukuran lainnya →'}
          </button>
        </div>

        {/* Additional Sizes */}
        {showAllSizes && (
          <div className="mt-4 p-4 bg-gray-50 rounded-xl">
            <p className="text-sm font-medium text-gray-700 mb-3">Ukuran Lainnya:</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {ADDITIONAL_SIZES.map((size) => (
                <div 
                  key={size.id}
                  className="p-3 bg-white rounded-lg border border-gray-200 text-center"
                >
                  <p className="font-medium text-gray-900">{size.size}</p>
                  <p className="text-sm text-gray-500">{size.format}</p>
                  <p className="text-sm font-semibold text-[#ea2423] mt-1">{size.price}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-3 text-center">
              Hubungi kami untuk ukuran custom lainnya
            </p>
          </div>
        )}
      </section>

      {/* Summary & CTA */}
      <section className="sticky bottom-0 bg-white border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Selected Summary */}
            <div className="flex-1 text-center sm:text-left">
              {selectedOption ? (
                <div>
                  <p className="text-sm text-gray-500">Ukuran dipilih:</p>
                  <p className="font-bold text-gray-900">
                    {selectedOption.formatLabel} - {selectedOption.size}
                  </p>
                  <p className="text-lg font-bold text-[#ea2423]">
                    {selectedOption.priceLabel}
                  </p>
                </div>
              ) : (
                <p className="text-gray-500">Pilih ukuran untuk melanjutkan</p>
              )}
            </div>

            {/* CTA Button */}
            {selectedSize ? (
              <Link
                href="/upload/canvas/checkout"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-[#ea2423] text-white font-bold rounded-xl hover:bg-red-600 transition-colors shadow-lg shadow-red-500/25"
              >
                Lanjutkan ke Checkout & Pesan
                <ArrowRight className="w-5 h-5" />
              </Link>
            ) : (
              <button
                disabled
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-gray-200 text-gray-400 font-bold rounded-xl cursor-not-allowed"
              >
                Lanjutkan ke Checkout & Pesan
                <ArrowRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="bg-gray-50 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-sm font-medium text-gray-900">Garansi 100 Tahun</p>
              <p className="text-xs text-gray-500">Tinta anti pudar</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Package className="w-5 h-5 text-blue-600" />
              </div>
              <p className="text-sm font-medium text-gray-900">Packing Kayu Gratis</p>
              <p className="text-xs text-gray-500">Aman sampai tujuan</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                <Star className="w-5 h-5 text-amber-600" />
              </div>
              <p className="text-sm font-medium text-gray-900">Rating 4.9/5</p>
              <p className="text-xs text-gray-500">1200+ ulasan</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Info className="w-5 h-5 text-purple-600" />
              </div>
              <p className="text-sm font-medium text-gray-900">Rangka Kayu Jati</p>
              <p className="text-xs text-gray-500">Anti rayap & kokoh</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Note */}
      <section className="py-6 text-center px-4">
        <p className="text-sm text-gray-500">
          Langkah 2 dari 3: Unggah Foto → <strong className="text-[#ea2423]">Pilih Ukuran</strong> → Pesan
        </p>
      </section>
    </main>
  );
}


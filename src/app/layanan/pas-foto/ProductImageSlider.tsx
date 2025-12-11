"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductImageSliderProps {
  onImageChange?: (index: number) => void;
  initialImageIndex?: number;
}

const productImages = [
  {
    url: "/images/products/pas-foto-background-biru.png?q=80&w=2940&auto=format&fit=crop",
    alt: "Contoh Pas Foto Background Merah",
    title: "Background Merah (CPNS)",
  },
  {
    url: "/images/products/pas-foto-background-merah.png?q=80&w=2940&auto=format&fit=crop",
    alt: "Contoh Pas Foto Background Biru",
    title: "Background Biru (Lamaran)",
  },
  {
    url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2940&auto=format&fit=crop",
    alt: "Contoh Pas Foto Background Putih (Visa)",
    title: "Background Putih (Visa)",
  },
  {
    url: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2940&auto=format&fit=crop",
    alt: "Hasil Cetak Pas Foto dalam Amplop",
    title: "Hasil Final & Packaging",
  },
];

export default function ProductImageSlider({
  onImageChange,
  initialImageIndex = 0,
}: ProductImageSliderProps) {
  const [currentImageIndex, setCurrentImageIndex] =
    useState(initialImageIndex);

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prevIndex) => {
      const newIndex = (prevIndex + 1) % productImages.length;
      onImageChange?.(newIndex);
      return newIndex;
    });
  }, [onImageChange]);

  const prevImage = useCallback(() => {
    setCurrentImageIndex((prevIndex) => {
      const newIndex =
        (prevIndex - 1 + productImages.length) % productImages.length;
      onImageChange?.(newIndex);
      return newIndex;
    });
  }, [onImageChange]);

  const handleThumbnailClick = useCallback(
    (index: number) => {
      setCurrentImageIndex(index);
      onImageChange?.(index);
    },
    [onImageChange]
  );

  return (
    <div className="relative h-[50vh] lg:h-auto min-h-[400px] overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center p-4 lg:p-8">
      {/* Main Product Image */}
      <div className="relative w-full h-full max-w-xl max-h-[calc(100%-80px)] lg:max-h-[calc(100%-120px)] flex items-center justify-center">
        <Image
          src={productImages[currentImageIndex].url}
          alt={productImages[currentImageIndex].alt}
          fill
          priority={currentImageIndex === 0}
          className="object-contain drop-shadow-2xl rounded-lg"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        {/* Image Title Overlay */}
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold text-gray-800 shadow-md hidden md:block">
          {productImages[currentImageIndex].title}
        </div>
        {/* Image Counter */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-700 shadow-md">
          {currentImageIndex + 1} / {productImages.length}
        </div>
      </div>

      {/* Navigation Arrows (Desktop Only) */}
      <button
        onClick={prevImage}
        className="hidden lg:flex absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center rounded-full bg-white/90 hover:bg-white text-gray-900 shadow-lg transition-all hover:scale-110 z-10"
        aria-label="Previous product image"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextImage}
        className="hidden lg:flex absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center rounded-full bg-white/90 hover:bg-white text-gray-900 shadow-lg transition-all hover:scale-110 z-10"
        aria-label="Next product image"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Thumbnail Strip */}
      <div className="absolute bottom-4 lg:bottom-8 w-full px-4 flex justify-center gap-3 overflow-x-auto">
        {productImages.map((image, index) => (
          <button
            key={index}
            onClick={() => handleThumbnailClick(index)}
            className={`relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
              currentImageIndex === index
                ? "border-[#ea2423] scale-105 shadow-md"
                : "border-gray-300 hover:border-gray-400"
            }`}
            aria-label={`View image ${index + 1}: ${image.title}`}
          >
            <Image
              src={image.url}
              alt={image.alt}
              fill
              sizes="80px"
              className={`object-cover ${
                currentImageIndex === index ? "brightness-75" : ""
              }`}
            />
            {currentImageIndex === index && (
              <div className="absolute inset-0 bg-[#ea2423]/20"></div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}


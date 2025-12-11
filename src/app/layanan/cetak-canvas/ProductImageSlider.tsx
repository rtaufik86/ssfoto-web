"use client";

import { useState, useCallback } from "react";
import Image from "next/image";

// Product image data (4 close-up shots)
const productImages = [
  {
    id: 0,
    url: "/images/products/cetak-foto-kanvas-outdoor.jpg",
    alt: "Canvas Texture Close-up - Premium Cotton 360gsm",
    title: "Tekstur Kanvas Premium",
  },
  {
    id: 1,
    url: "/images/products/cetak-foto-canvas-bayi-lahir.jpg",
    alt: "Gallery Wrap Detail - Wooden Frame Corner",
    title: "Detail Gallery Wrap",
  },
  {
    id: 2,
    url: "/images/products/cetak-canvas-keluarga-diatas-meja-kayu.png",
    alt: "Canvas Art in Modern Living Room Setting",
    title: "Kanvas di Ruang Tamu",
  },
  {
    id: 3,
    url: "/images/products/cetak-foto-canvas-di-kamar-tidur.png",
    alt: "Multiple Canvas Gallery Wall Installation",
    title: "Gallery Wall Display",
  },
];

interface ProductImageSliderProps {
  // Optional: External control for accordion linkage (future feature)
  onImageChange?: (index: number) => void;
}

export default function ProductImageSlider({ onImageChange }: ProductImageSliderProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  /**
   * Handle thumbnail click to switch main image
   * This function is exposed via state management for potential external control
   * (e.g., clicking accordion items could trigger image changes)
   */
  const handleThumbnailClick = useCallback(
    (index: number) => {
      setCurrentImageIndex(index);
      if (onImageChange) {
        onImageChange(index);
      }
    },
    [onImageChange]
  );

  /**
   * FUTURE INTEGRATION NOTE:
   * To link accordion clicks to image changes, the parent component can:
   * 1. Pass a ref or state updater to control setCurrentImageIndex
   * 2. Map accordion items to image indexes (e.g., Item 1 -> Image 0, Item 2 -> Image 1)
   * 3. Call setCurrentImageIndex(mappedIndex) when accordion item is clicked
   * 
   * Example usage from parent:
   * const imageSliderRef = useRef();
   * <ProductImageSlider ref={imageSliderRef} />
   * // On accordion click: imageSliderRef.current?.setImage(2);
   */

  return (
    <div className="relative h-[60vh] lg:h-auto min-h-[500px] lg:min-h-[700px] bg-gray-50 flex flex-col">
      {/* Main Product Image View */}
      <div className="flex-1 relative p-6 lg:p-8 flex items-center justify-center">
        <div className="relative w-full h-full max-w-2xl lg:max-w-3xl max-h-[600px] lg:max-h-[700px]">
          <Image
            src={productImages[currentImageIndex].url}
            alt={productImages[currentImageIndex].alt}
            fill
            priority={currentImageIndex === 0}
            className="object-contain drop-shadow-2xl"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        {/* Image Title Overlay */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
          <p className="text-sm font-semibold text-gray-900">
            {productImages[currentImageIndex].title}
          </p>
        </div>
      </div>

      {/* Thumbnail Strip */}
      <div className="bg-white border-t border-gray-200 px-4 py-4">
        <div className="max-w-xl mx-auto flex items-center justify-center gap-3">
          {productImages.map((image, index) => (
            <button
              key={image.id}
              onClick={() => handleThumbnailClick(index)}
              className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                currentImageIndex === index
                  ? "border-[#ea2423] shadow-lg scale-105"
                  : "border-gray-300 hover:border-gray-400 opacity-70 hover:opacity-100"
              }`}
              aria-label={`View ${image.title}`}
            >
              <Image
                src={image.url}
                alt={image.alt}
                fill
                className="object-cover"
              />
              
              {/* Active Indicator */}
              {currentImageIndex === index && (
                <div className="absolute inset-0 bg-[#ea2423]/10 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-[#ea2423]" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Navigation Arrows (Optional Desktop Enhancement) */}
      <button
        onClick={() =>
          handleThumbnailClick(
            currentImageIndex === 0 ? productImages.length - 1 : currentImageIndex - 1
          )
        }
        className="hidden lg:flex absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 items-center justify-center rounded-full bg-white/90 hover:bg-white text-gray-900 shadow-lg transition-all hover:scale-110 z-10"
        aria-label="Previous image"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        onClick={() =>
          handleThumbnailClick(
            currentImageIndex === productImages.length - 1 ? 0 : currentImageIndex + 1
          )
        }
        className="hidden lg:flex absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 items-center justify-center rounded-full bg-white/90 hover:bg-white text-gray-900 shadow-lg transition-all hover:scale-110 z-10"
        aria-label="Next image"
      >
        <svg
          className="w-6 h-6"
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
      </button>

      {/* Image Counter */}
      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-md">
        <p className="text-xs font-semibold text-gray-700">
          {currentImageIndex + 1} / {productImages.length}
        </p>
      </div>
    </div>
  );
}


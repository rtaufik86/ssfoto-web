'use client';

import { useState, useCallback, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  CloudUpload,
  Image as ImageIcon,
  X,
  Check,
  ArrowRight,
  Sparkles,
  Monitor,
  Smartphone,
  Camera,
  AlertCircle,
  Loader2,
} from 'lucide-react';

// Supported file types
const ACCEPTED_FILE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25MB for high-res canvas prints

// Cloud storage options (placeholders for future integration)
const CLOUD_OPTIONS = [
  {
    id: 'google-photos',
    name: 'Google Photos',
    icon: '/icons/google-photos.svg',
    color: 'bg-white hover:bg-gray-50',
    available: false,
  },
  {
    id: 'google-drive',
    name: 'Google Drive',
    icon: '/icons/google-drive.svg',
    color: 'bg-white hover:bg-gray-50',
    available: false,
  },
  {
    id: 'dropbox',
    name: 'Dropbox',
    icon: '/icons/dropbox.svg',
    color: 'bg-white hover:bg-gray-50',
    available: false,
  },
];

// Recommended aspect ratios for canvas
const ASPECT_RATIOS = [
  { name: 'Square', ratio: '1:1', example: '30x30 cm', icon: '⬜' },
  { name: 'Landscape', ratio: '3:2', example: '60x40 cm', icon: '🖼️' },
  { name: 'Portrait', ratio: '2:3', example: '40x60 cm', icon: '📱' },
  { name: 'Panoramic', ratio: '3:1', example: '90x30 cm', icon: '🌄' },
];

export default function WallDecorUploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageInfo, setImageInfo] = useState<{ width: number; height: number } | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Validate file
  const validateFile = (file: File): string | null => {
    if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
      return 'Format file tidak didukung. Gunakan JPG, PNG, atau WebP.';
    }
    if (file.size > MAX_FILE_SIZE) {
      return 'Ukuran file terlalu besar. Maksimal 25MB.';
    }
    return null;
  };

  // Handle file selection
  const handleFileSelect = useCallback((selectedFile: File) => {
    setError(null);
    
    const validationError = validateFile(selectedFile);
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);
    setFile(selectedFile);

    // Create preview URL
    const url = URL.createObjectURL(selectedFile);
    setPreviewUrl(url);

    // Get image dimensions
    const img = new window.Image();
    img.onload = () => {
      setImageInfo({ width: img.width, height: img.height });
      setIsLoading(false);
    };
    img.onerror = () => {
      setError('Gagal memuat preview gambar.');
      setIsLoading(false);
    };
    img.src = url;
  }, []);

  // Handle drag events
  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      handleFileSelect(droppedFile);
    }
  }, [handleFileSelect]);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      handleFileSelect(selectedFile);
    }
  };

  // Remove selected file
  const handleRemoveFile = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setFile(null);
    setPreviewUrl(null);
    setImageInfo(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Calculate aspect ratio recommendation
  const getAspectRatioRecommendation = () => {
    if (!imageInfo) return null;
    const ratio = imageInfo.width / imageInfo.height;
    
    if (ratio > 2.5) return 'Panoramic (3:1)';
    if (ratio > 1.3) return 'Landscape (3:2)';
    if (ratio > 0.9 && ratio < 1.1) return 'Square (1:1)';
    if (ratio < 0.8) return 'Portrait (2:3)';
    return 'Standard';
  };

  // Check if image resolution is good for canvas
  const isHighResolution = () => {
    if (!imageInfo) return false;
    // Minimum 2000px on longest side for good canvas print
    return Math.max(imageInfo.width, imageInfo.height) >= 2000;
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Header */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 text-[#ea2423] rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            <span>Desain Kanvas Premium</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
            Mulai Desain Kanvas Anda
          </h1>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Unggah foto terbaik Anda untuk memulai proses desain. 
            Kami akan mengubahnya menjadi karya seni dinding yang menakjubkan.
          </p>
        </div>
      </section>

      {/* Main Upload Area */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left: Upload Dropzone (2 columns) */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              
              {/* Dropzone */}
              {!file ? (
                <div
                  onDragEnter={handleDragEnter}
                  onDragLeave={handleDragLeave}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  className={`
                    relative border-2 border-dashed rounded-xl p-8 md:p-12 text-center
                    transition-all duration-300 cursor-pointer
                    ${isDragging 
                      ? 'border-[#ea2423] bg-red-50 scale-[1.02]' 
                      : 'border-gray-300 hover:border-[#ea2423] hover:bg-gray-50'
                    }
                  `}
                  onClick={() => fileInputRef.current?.click()}
                >
                  {/* Upload Icon */}
                  <div className={`
                    mx-auto w-20 h-20 rounded-full flex items-center justify-center mb-6
                    transition-all duration-300
                    ${isDragging ? 'bg-[#ea2423] text-white scale-110' : 'bg-gray-100 text-gray-400'}
                  `}>
                    <CloudUpload className="w-10 h-10" />
                  </div>

                  {/* Text */}
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {isDragging ? 'Lepaskan foto di sini!' : 'Drag & Drop Foto Anda'}
                  </h3>
                  <p className="text-gray-500 mb-6">
                    atau klik untuk memilih dari komputer
                  </p>

                  {/* File Input Button */}
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#ea2423] text-white font-semibold rounded-lg hover:bg-red-600 transition-colors"
                  >
                    <ImageIcon className="w-5 h-5" />
                    Pilih Foto dari Komputer
                  </button>

                  {/* Hidden Input */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/webp"
                    onChange={handleInputChange}
                    className="hidden"
                  />

                  {/* File Type Info */}
                  <p className="text-xs text-gray-400 mt-6">
                    Format: JPG, PNG, WebP • Maksimal 25MB
                  </p>
                </div>
              ) : (
                /* Preview Area */
                <div className="relative">
                  {/* Loading Overlay */}
                  {isLoading && (
                    <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-10 rounded-xl">
                      <Loader2 className="w-8 h-8 text-[#ea2423] animate-spin" />
                    </div>
                  )}

                  {/* Image Preview */}
                  <div className="relative aspect-video bg-gray-100 rounded-xl overflow-hidden mb-4">
                    {previewUrl && (
                      <Image
                        src={previewUrl}
                        alt="Preview"
                        fill
                        className="object-contain"
                      />
                    )}
                    
                    {/* Remove Button */}
                    <button
                      onClick={handleRemoveFile}
                      className="absolute top-3 right-3 w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700 transition-colors shadow-lg"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* File Info */}
                  <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900 truncate max-w-[200px]">
                        {file.name}
                      </span>
                      <span className="text-xs text-gray-500">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </span>
                    </div>

                    {imageInfo && (
                      <div className="flex flex-wrap gap-3 text-sm">
                        {/* Resolution */}
                        <div className="flex items-center gap-1.5">
                          <Monitor className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">
                            {imageInfo.width} × {imageInfo.height} px
                          </span>
                        </div>
                        
                        {/* Aspect Ratio */}
                        <div className="flex items-center gap-1.5">
                          <ImageIcon className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">
                            {getAspectRatioRecommendation()}
                          </span>
                        </div>

                        {/* Resolution Quality */}
                        <div className={`flex items-center gap-1.5 ${isHighResolution() ? 'text-green-600' : 'text-amber-600'}`}>
                          {isHighResolution() ? (
                            <>
                              <Check className="w-4 h-4" />
                              <span>Resolusi Tinggi ✓</span>
                            </>
                          ) : (
                            <>
                              <AlertCircle className="w-4 h-4" />
                              <span>Resolusi Rendah</span>
                            </>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Continue Button */}
                  <Link
                    href="/upload/wall-decor/customize"
                    className="mt-6 w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-[#ea2423] text-white font-bold rounded-xl hover:bg-red-600 transition-colors text-lg"
                  >
                    Lanjutkan ke Desain
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-red-800">{error}</p>
                    <button
                      onClick={() => setError(null)}
                      className="text-sm text-red-600 underline mt-1"
                    >
                      Coba lagi
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Cloud Storage Options */}
            <div className="mt-6 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">
                Atau impor dari Cloud Storage
              </h3>
              
              <div className="grid grid-cols-3 gap-3">
                {CLOUD_OPTIONS.map((option) => (
                  <button
                    key={option.id}
                    disabled={!option.available}
                    className={`
                      relative p-4 rounded-xl border-2 border-gray-200 
                      flex flex-col items-center gap-2 transition-all
                      ${option.available 
                        ? 'hover:border-[#ea2423] hover:bg-red-50 cursor-pointer' 
                        : 'opacity-50 cursor-not-allowed'
                      }
                    `}
                  >
                    {/* Placeholder icon */}
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Camera className="w-5 h-5 text-gray-400" />
                    </div>
                    <span className="text-xs font-medium text-gray-700">{option.name}</span>
                    
                    {!option.available && (
                      <span className="absolute top-1 right-1 text-[10px] bg-gray-200 text-gray-500 px-1.5 py-0.5 rounded-full">
                        Segera
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Guidelines (1 column) */}
          <div className="lg:col-span-1">
            {/* Recommendations Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#ea2423]" />
                Tips Foto Terbaik
              </h3>

              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Resolusi Tinggi</p>
                    <p className="text-xs text-gray-500">Minimal 2000px untuk hasil cetak optimal</p>
                  </div>
                </li>
                
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Fokus Jelas</p>
                    <p className="text-xs text-gray-500">Hindari foto blur atau out-of-focus</p>
                  </div>
                </li>
                
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Pencahayaan Baik</p>
                    <p className="text-xs text-gray-500">Foto dengan cahaya natural lebih indah</p>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Smartphone className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Dari HP? OK!</p>
                    <p className="text-xs text-gray-500">iPhone/Android terbaru sudah cukup</p>
                  </div>
                </li>
              </ul>

              {/* Aspect Ratio Guide */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <h4 className="text-sm font-semibold text-gray-900 mb-3">
                  Pilihan Ukuran Kanvas
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {ASPECT_RATIOS.map((ar) => (
                    <div key={ar.ratio} className="p-2 bg-gray-50 rounded-lg text-center">
                      <span className="text-lg">{ar.icon}</span>
                      <p className="text-xs font-medium text-gray-900">{ar.name}</p>
                      <p className="text-[10px] text-gray-500">{ar.example}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Help Link */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <Link 
                  href="/layanan/cetak-canvas"
                  className="text-sm text-[#ea2423] font-medium hover:underline flex items-center gap-1"
                >
                  Lihat detail produk Kanvas
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-gray-50 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-600" />
              <span>Garansi 100 Tahun</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-600" />
              <span>Packing Kayu Gratis</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-600" />
              <span>Pengiriman Aman</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-600" />
              <span>Rating 4.9/5 ⭐</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}


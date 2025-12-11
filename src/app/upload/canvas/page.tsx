'use client';

import { useState, useCallback, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';
import {
  CloudUpload,
  Image as ImageIcon,
  X,
  Check,
  Send,
  AlertTriangle,
  Loader2,
  FileImage,
  Sparkles,
  User,
  Phone,
  RectangleVertical,
  RectangleHorizontal,
  ShieldCheck,
  Package,
  Star,
  MessageCircle,
  CheckCircle2,
  XCircle,
} from 'lucide-react';

// ═══════════════════════════════════════════════════════════════════════════
// SUPABASE CLIENT INITIALIZATION
// ═══════════════════════════════════════════════════════════════════════════
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Storage bucket name
const STORAGE_BUCKET = 'canvas-uploads';

// CS WhatsApp number
const CS_WHATSAPP = '+6281936444486'; // Nomor CS SS Foto

// ═══════════════════════════════════════════════════════════════════════════
// CONSTANTS & TYPES
// ═══════════════════════════════════════════════════════════════════════════

// Supported file types
const ACCEPTED_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];
const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25MB

// Size options with pricing
const SIZE_OPTIONS = [
  { id: '14R', label: '14R', size: '28×35 cm', price: 'Rp 350.000' },
  { id: '16R', label: '16R', size: '30×40 cm', price: 'Rp 420.000' },
  { id: '16RS', label: '16RS', size: '30×45 cm', price: 'Rp 450.000' },
  { id: '20R', label: '20R', size: '40×50 cm', price: 'Rp 550.000' },
  { id: '24R', label: '24R', size: '50×60 cm', price: 'Rp 750.000' },
];

// Orientation options
const ORIENTATION_OPTIONS = [
  { id: 'portrait', label: 'Portrait', icon: RectangleVertical, description: 'Vertikal / Tegak' },
  { id: 'landscape', label: 'Landscape', icon: RectangleHorizontal, description: 'Horizontal / Tidur' },
];

// Delivery method options
const DELIVERY_METHODS = [
  { id: 'pickup', label: 'Ambil di Cabang', description: 'Gratis' },
  { id: 'gosend', label: 'Kirim dengan GoSend', description: 'Biaya sesuai jarak' },
];

// Branch options (Definitive SS Foto branches)
const BRANCH_OPTIONS = [
  { id: 'rawamangun', label: 'Rawamangun - Jakarta Timur' },
  { id: 'pondok-pinang', label: 'Pondok Pinang - Jakarta Selatan' },
  { id: 'bogor', label: 'Bogor' },
  { id: 'galaxy-bekasi', label: 'Galaxy - Bekasi' },
  { id: 'jatiwaringin-bekasi', label: 'Jatiwaringin - Bekasi' },
];

// Upload status type
type UploadStatus = 'idle' | 'uploading' | 'success' | 'error';

// ═══════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export default function CanvasOrderPage() {
  // Form state
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedOrientation, setSelectedOrientation] = useState<string>('');
  const [customerName, setCustomerName] = useState('');
  const [customerWhatsApp, setCustomerWhatsApp] = useState('');
  
  // NEW: Delivery options state
  const [deliveryMethod, setDeliveryMethod] = useState<string>('pickup');
  const [pickupBranch, setPickupBranch] = useState<string>('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  
  // Upload state
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>('idle');
  const [uploadProgress, setUploadProgress] = useState<string>('');
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  
  // UI state
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ═══════════════════════════════════════════════════════════════════════
  // FILE HANDLING FUNCTIONS
  // ═══════════════════════════════════════════════════════════════════════

  // Validate file
  const validateFile = (file: File): string | null => {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      return 'Format tidak didukung. Gunakan JPG atau PNG.';
    }
    if (file.size > MAX_FILE_SIZE) {
      return 'Ukuran file terlalu besar. Maksimal 25MB.';
    }
    return null;
  };

  // Generate unique filename
  const generateUniqueFilename = (originalName: string): string => {
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(2, 8);
    const extension = originalName.split('.').pop()?.toLowerCase() || 'jpg';
    return `canvas-${timestamp}-${randomStr}.${extension}`;
  };

  // Handle file selection
  const handleFileSelect = useCallback((selectedFile: File) => {
    setError(null);
    setFormErrors(prev => ({ ...prev, file: '' }));
    setUploadStatus('idle');
    setUploadedUrl(null);
    setUploadError(null);
    
    const validationError = validateFile(selectedFile);
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);
    setFile(selectedFile);

    const url = URL.createObjectURL(selectedFile);
    setPreviewUrl(url);
    setIsLoading(false);
  }, []);

  // Drag events
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

  // Input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      handleFileSelect(selectedFile);
    }
  };

  // Remove file
  const handleRemoveFile = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setFile(null);
    setPreviewUrl(null);
    setUploadStatus('idle');
    setUploadedUrl(null);
    setUploadError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // ═══════════════════════════════════════════════════════════════════════
  // FORM VALIDATION
  // ═══════════════════════════════════════════════════════════════════════

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!file) {
      errors.file = 'Silakan upload foto terlebih dahulu';
    }
    if (!selectedSize) {
      errors.size = 'Silakan pilih ukuran kanvas';
    }
    if (!selectedOrientation) {
      errors.orientation = 'Silakan pilih orientasi';
    }
    if (!customerName.trim()) {
      errors.name = 'Nama lengkap wajib diisi';
    }
    if (!customerWhatsApp.trim()) {
      errors.whatsapp = 'Nomor WhatsApp wajib diisi';
    } else {
      const whatsappDigits = customerWhatsApp.replace(/[^0-9]/g, '');
      if (whatsappDigits.length < 10 || whatsappDigits.length > 15) {
        errors.whatsapp = 'Nomor WhatsApp tidak valid';
      }
    }
    
    // NEW: Validate delivery options
    if (deliveryMethod === 'pickup' && !pickupBranch) {
      errors.delivery = 'Silakan pilih cabang untuk pickup';
    }
    if (deliveryMethod === 'gosend' && !deliveryAddress.trim()) {
      errors.delivery = 'Silakan isi alamat pengiriman lengkap';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // ═══════════════════════════════════════════════════════════════════════
  // SUPABASE UPLOAD FUNCTION
  // ═══════════════════════════════════════════════════════════════════════

  const uploadToSupabase = async (fileToUpload: File): Promise<string> => {
    // Generate unique filename
    const uniqueFilename = generateUniqueFilename(fileToUpload.name);
    const filePath = `orders/${uniqueFilename}`;

    setUploadProgress('Mengupload foto ke server...');

    // Upload file to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(filePath, fileToUpload, {
        cacheControl: '3600',
        upsert: false,
        contentType: fileToUpload.type,
      });

    if (uploadError) {
      console.error('Upload error:', uploadError);
      throw new Error(`Gagal mengupload foto: ${uploadError.message}`);
    }

    setUploadProgress('Mendapatkan URL foto...');

    // Get public URL
    const { data: urlData } = supabase.storage
      .from(STORAGE_BUCKET)
      .getPublicUrl(filePath);

    if (!urlData?.publicUrl) {
      throw new Error('Gagal mendapatkan URL foto');
    }

    return urlData.publicUrl;
  };

  // ═══════════════════════════════════════════════════════════════════════
  // WHATSAPP SUBMISSION HANDLER
  // ═══════════════════════════════════════════════════════════════════════

  const handleWhatsAppSubmit = async () => {
    // Step 1: Validate form
    if (!validateForm()) {
      return;
    }

    // Step 2: Check if file exists
    if (!file) {
      setFormErrors(prev => ({ ...prev, file: 'Silakan upload foto terlebih dahulu' }));
      return;
    }

    try {
      // Step 3: Set uploading state
      setUploadStatus('uploading');
      setUploadError(null);
      setUploadProgress('Mempersiapkan upload...');

      // Step 4: Upload file to Supabase
      const publicUrl = await uploadToSupabase(file);
      
      // Step 5: Store the uploaded URL
      setUploadedUrl(publicUrl);
      setUploadStatus('success');
      setUploadProgress('Upload berhasil!');

      // Step 6: Create branded link via API
      setUploadProgress('Membuat branded link...');
      
      // Get price from selected size
      const sizeOption = SIZE_OPTIONS.find(s => s.id === selectedSize);
      const priceString = sizeOption?.price || 'Rp 350.000';
      const priceNumber = parseInt(priceString.replace(/\D/g, ''));
      
      const linkResponse = await fetch('/api/order-link', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          publicUrl,
          size: selectedSize,
          orientation: selectedOrientation,
          customerName,
          customerWhatsApp,
          branchId: deliveryMethod === 'pickup' ? pickupBranch : null,
          totalPrice: priceNumber,
          deliveryMethod,
          pickupBranch: deliveryMethod === 'pickup' ? pickupBranch : null,
          deliveryAddress: deliveryMethod === 'gosend' ? deliveryAddress : null,
        }),
      });

      const linkData = await linkResponse.json();

      if (!linkResponse.ok) {
        console.error('Branded link error:', linkData);
        throw new Error(linkData.error || 'Gagal membuat branded link');
      }

      // Step 7: Get order details (sizeOption already declared above)
      const orientationOption = ORIENTATION_OPTIONS.find(o => o.id === selectedOrientation);

      // Step 8: Format delivery info for WhatsApp
      const deliveryInfo = deliveryMethod === 'pickup'
        ? `🏪 *PENGAMBILAN:*\n• Ambil di Cabang: ${BRANCH_OPTIONS.find(b => b.id === pickupBranch)?.label}`
        : `🚚 *PENGIRIMAN:*\n• GoSend ke:\n${deliveryAddress}`;

      // Step 9: Format WhatsApp message WITH BRANDED LINK & DELIVERY INFO
      const message = `Halo SS Foto! 🎨

Saya ingin memesan *Canvas Art* dengan detail:

📋 *DETAIL PESANAN:*
━━━━━━━━━━━━━━━━
• Ukuran: *${sizeOption?.label}* (${sizeOption?.size})
• Orientasi: *${orientationOption?.label}* (${orientationOption?.description})
• Harga: *${sizeOption?.price}*
━━━━━━━━━━━━━━━━

👤 *DATA PEMESAN:*
• Nama: ${customerName}
• WhatsApp: ${customerWhatsApp}

${deliveryInfo}

📸 *FOTO YANG DIPESAN:*
${linkData.brandedLink}

⚠️ Saya memahami bahwa harga di atas *belum termasuk ongkir* ${deliveryMethod === 'gosend' ? 'dan biaya GoSend' : ''}.

Mohon konfirmasi ketersediaan dan estimasi pengerjaan. Terima kasih! 🙏`;

      // Step 10: Encode message for URL
      const encodedMessage = encodeURIComponent(message);
      
      // Step 11: Generate WhatsApp URL
      const whatsappUrl = `https://wa.me/${CS_WHATSAPP.replace(/[^0-9]/g, '')}?text=${encodedMessage}`;

      // Step 12: Small delay to show success state
      await new Promise(resolve => setTimeout(resolve, 500));

      // Step 13: Open WhatsApp
      window.open(whatsappUrl, '_blank');

    } catch (err: any) {
      // Handle upload error
      console.error('Submit error:', err);
      setUploadStatus('error');
      setUploadError(err.message || 'Terjadi kesalahan saat mengupload foto');
    }
  };

  // ═══════════════════════════════════════════════════════════════════════
  // COMPUTED VALUES
  // ═══════════════════════════════════════════════════════════════════════

  const selectedSizeDetails = SIZE_OPTIONS.find(s => s.id === selectedSize);
  // Check if delivery options are complete
  const isDeliveryComplete = deliveryMethod === 'pickup' 
    ? !!pickupBranch 
    : (deliveryMethod === 'gosend' ? !!deliveryAddress.trim() : false);
  
  const isFormComplete = file && selectedSize && selectedOrientation && customerName.trim() && customerWhatsApp.trim() && isDeliveryComplete;
  const isUploading = uploadStatus === 'uploading';

  // ═══════════════════════════════════════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════════════════════════════════════

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 px-4">
      <div className="max-w-2xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 text-[#ea2423] rounded-full text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            <span>Langkah 1 dari 1: Kirim Pesanan ke CS</span>
          </div>
          
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mb-3">
            Pesan Kanvas Art: Unggah & Pilih Ukuran
          </h1>
          
          <p className="text-gray-600 max-w-md mx-auto text-sm">
            Lengkapi form di bawah, lalu kirim pesanan langsung ke Customer Service kami via WhatsApp.
          </p>
        </div>

        {/* Main Form Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          
          {/* Section 1: Photo Upload */}
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-7 h-7 bg-[#ea2423] text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
              Upload Foto
            </h2>

            {!file ? (
              <div
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`
                  relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200
                  ${isDragging 
                    ? 'border-[#ea2423] bg-red-50 scale-[1.02]' 
                    : formErrors.file
                    ? 'border-red-400 bg-red-50'
                    : 'border-gray-300 hover:border-[#ea2423] hover:bg-gray-50'
                  }
                `}
              >
                <div className={`mx-auto w-14 h-14 rounded-full flex items-center justify-center mb-4 ${isDragging ? 'bg-[#ea2423] text-white' : 'bg-gray-100 text-gray-400'}`}>
                  <CloudUpload className="w-7 h-7" />
                </div>

                <p className="font-semibold text-gray-900 mb-1">
                  {isDragging ? 'Lepaskan foto di sini!' : 'Seret & Lepas Foto'}
                </p>
                <p className="text-sm text-gray-500 mb-4">atau klik untuk memilih</p>

                <button
                  type="button"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#ea2423] text-white font-semibold rounded-lg hover:bg-red-600 transition-colors text-sm"
                >
                  <ImageIcon className="w-4 h-4" />
                  Pilih Foto
                </button>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  onChange={handleInputChange}
                  className="hidden"
                />

                <p className="text-xs text-gray-400 mt-4">
                  Format: JPG, PNG • Maksimal 25MB
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative aspect-video bg-gray-100 rounded-xl overflow-hidden">
                  {previewUrl && (
                    <Image
                      src={previewUrl}
                      alt="Preview"
                      fill
                      className="object-contain"
                    />
                  )}
                  <button
                    onClick={handleRemoveFile}
                    disabled={isUploading}
                    className="absolute top-2 right-2 w-8 h-8 bg-black/70 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors disabled:opacity-50"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-green-800 truncate">{file.name}</p>
                    <p className="text-xs text-green-600">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className="text-xs text-green-700 underline hover:text-green-800 disabled:opacity-50"
                  >
                    Ganti
                  </button>
                </div>

                {/* Upload Status Indicator */}
                {uploadStatus === 'success' && uploadedUrl && (
                  <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    <p className="text-sm text-green-700">Foto berhasil diupload ke server!</p>
                  </div>
                )}
              </div>
            )}

            {formErrors.file && (
              <p className="text-sm text-red-600 mt-2">{formErrors.file}</p>
            )}
          </div>

          {/* Section 2: Size Selection */}
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-7 h-7 bg-[#ea2423] text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
              Pilih Ukuran Kanvas
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SIZE_OPTIONS.map((size) => (
                <button
                  key={size.id}
                  type="button"
                  disabled={isUploading}
                  onClick={() => {
                    setSelectedSize(size.id);
                    setFormErrors(prev => ({ ...prev, size: '' }));
                  }}
                  className={`
                    relative p-4 rounded-xl border-2 text-left transition-all disabled:opacity-50
                    ${selectedSize === size.id
                      ? 'border-[#ea2423] bg-red-50 ring-2 ring-red-100'
                      : formErrors.size
                      ? 'border-red-300 hover:border-red-400'
                      : 'border-gray-200 hover:border-gray-300'
                    }
                  `}
                >
                  {selectedSize === size.id && (
                    <div className="absolute top-2 right-2 w-5 h-5 bg-[#ea2423] rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  )}
                  <p className="text-lg font-bold text-gray-900">{size.label}</p>
                  <p className="text-sm text-gray-500">{size.size}</p>
                  <p className={`text-sm font-semibold mt-1 ${selectedSize === size.id ? 'text-[#ea2423]' : 'text-gray-700'}`}>
                    {size.price}
                  </p>
                </button>
              ))}
            </div>

            {formErrors.size && (
              <p className="text-sm text-red-600 mt-2">{formErrors.size}</p>
            )}
          </div>

          {/* Section 3: Orientation */}
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-7 h-7 bg-[#ea2423] text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
              Pilih Orientasi
            </h2>

            <div className="grid grid-cols-2 gap-3">
              {ORIENTATION_OPTIONS.map((option) => {
                const Icon = option.icon;
                return (
                  <button
                    key={option.id}
                    type="button"
                    disabled={isUploading}
                    onClick={() => {
                      setSelectedOrientation(option.id);
                      setFormErrors(prev => ({ ...prev, orientation: '' }));
                    }}
                    className={`
                      relative p-4 rounded-xl border-2 text-center transition-all disabled:opacity-50
                      ${selectedOrientation === option.id
                        ? 'border-[#ea2423] bg-red-50 ring-2 ring-red-100'
                        : formErrors.orientation
                        ? 'border-red-300 hover:border-red-400'
                        : 'border-gray-200 hover:border-gray-300'
                      }
                    `}
                  >
                    {selectedOrientation === option.id && (
                      <div className="absolute top-2 right-2 w-5 h-5 bg-[#ea2423] rounded-full flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                    <Icon className={`w-10 h-10 mx-auto mb-2 ${selectedOrientation === option.id ? 'text-[#ea2423]' : 'text-gray-400'}`} />
                    <p className="font-semibold text-gray-900">{option.label}</p>
                    <p className="text-xs text-gray-500">{option.description}</p>
                  </button>
                );
              })}
            </div>

            {formErrors.orientation && (
              <p className="text-sm text-red-600 mt-2">{formErrors.orientation}</p>
            )}
          </div>

          {/* Section 4: Contact Info */}
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-7 h-7 bg-[#ea2423] text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
              Data Pemesan
            </h2>

            <div className="space-y-4">
              {/* Name Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Nama Lengkap <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={customerName}
                    disabled={isUploading}
                    onChange={(e) => {
                      setCustomerName(e.target.value);
                      setFormErrors(prev => ({ ...prev, name: '' }));
                    }}
                    placeholder="Masukkan nama lengkap Anda"
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ea2423] focus:border-transparent disabled:bg-gray-100 ${
                      formErrors.name ? 'border-red-400' : 'border-gray-300'
                    }`}
                  />
                </div>
                {formErrors.name && (
                  <p className="text-sm text-red-600 mt-1">{formErrors.name}</p>
                )}
              </div>

              {/* WhatsApp Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Nomor WhatsApp <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    value={customerWhatsApp}
                    disabled={isUploading}
                    onChange={(e) => {
                      setCustomerWhatsApp(e.target.value);
                      setFormErrors(prev => ({ ...prev, whatsapp: '' }));
                    }}
                    placeholder="Contoh: 08123456789"
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ea2423] focus:border-transparent disabled:bg-gray-100 ${
                      formErrors.whatsapp ? 'border-red-400' : 'border-gray-300'
                    }`}
                  />
                </div>
                {formErrors.whatsapp && (
                  <p className="text-sm text-red-600 mt-1">{formErrors.whatsapp}</p>
                )}
                <p className="text-xs text-gray-500 mt-1">
                  CS akan menghubungi Anda via WhatsApp untuk konfirmasi
                </p>
              </div>
            </div>
          </div>

          {/* Section 5: Delivery Options */}
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-7 h-7 bg-[#ea2423] text-white rounded-full flex items-center justify-center text-sm font-bold">5</span>
              Metode Pengambilan / Pengiriman
            </h2>

            {/* Delivery Method Selection */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Pilih Metode <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {DELIVERY_METHODS.map((method) => (
                  <button
                    key={method.id}
                    type="button"
                    disabled={isUploading}
                    onClick={() => {
                      setDeliveryMethod(method.id);
                      setFormErrors(prev => ({ ...prev, delivery: '' }));
                      // Reset dependent fields
                      if (method.id === 'pickup') {
                        setDeliveryAddress('');
                      } else {
                        setPickupBranch('');
                      }
                    }}
                    className={`
                      relative p-4 rounded-xl border-2 text-left transition-all disabled:opacity-50
                      ${deliveryMethod === method.id
                        ? 'border-[#ea2423] bg-red-50 ring-2 ring-red-100'
                        : 'border-gray-200 hover:border-gray-300'
                      }
                    `}
                  >
                    {deliveryMethod === method.id && (
                      <div className="absolute top-3 right-3 w-5 h-5 bg-[#ea2423] rounded-full flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                    <p className="font-semibold text-gray-900 mb-1">{method.label}</p>
                    <p className="text-sm text-gray-500">{method.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Conditional: Branch Selection (if pickup) */}
            {deliveryMethod === 'pickup' && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Pilih Cabang <span className="text-red-500">*</span>
                </label>
                <select
                  value={pickupBranch}
                  disabled={isUploading}
                  onChange={(e) => {
                    setPickupBranch(e.target.value);
                    setFormErrors(prev => ({ ...prev, delivery: '' }));
                  }}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ea2423] focus:border-transparent disabled:bg-gray-100 ${
                    formErrors.delivery ? 'border-red-400' : 'border-gray-300'
                  }`}
                >
                  <option value="">-- Pilih Cabang --</option>
                  {BRANCH_OPTIONS.map((branch) => (
                    <option key={branch.id} value={branch.id}>
                      {branch.label}
                    </option>
                  ))}
                </select>
                {formErrors.delivery && deliveryMethod === 'pickup' && (
                  <p className="text-sm text-red-600 mt-1">{formErrors.delivery}</p>
                )}
                <p className="text-xs text-gray-500 mt-1">
                  Kanvas siap diambil 3-5 hari kerja setelah konfirmasi
                </p>
              </div>
            )}

            {/* Conditional: Address Input (if gosend) */}
            {deliveryMethod === 'gosend' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Alamat Pengiriman Lengkap <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={deliveryAddress}
                  disabled={isUploading}
                  onChange={(e) => {
                    setDeliveryAddress(e.target.value);
                    setFormErrors(prev => ({ ...prev, delivery: '' }));
                  }}
                  placeholder="Contoh: Jl. Merdeka No. 123, RT 01/RW 02, Kelurahan Menteng, Kecamatan Menteng, Jakarta Pusat 10110"
                  rows={4}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ea2423] focus:border-transparent disabled:bg-gray-100 ${
                    formErrors.delivery ? 'border-red-400' : 'border-gray-300'
                  }`}
                />
                {formErrors.delivery && deliveryMethod === 'gosend' && (
                  <p className="text-sm text-red-600 mt-1">{formErrors.delivery}</p>
                )}
                <p className="text-xs text-gray-500 mt-1">
                  Biaya GoSend akan dikonfirmasi oleh CS berdasarkan jarak
                </p>
              </div>
            )}
          </div>

          {/* Shipping Notice - CRITICAL */}
          <div className="p-6 bg-amber-50 border-b border-amber-200">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-amber-800">
                  PERHATIAN: Harga yang tertera <span className="text-red-600">belum termasuk biaya {deliveryMethod === 'gosend' ? 'GoSend' : 'pengiriman (ongkir)'}</span>.
                </p>
                <p className="text-sm text-amber-700 mt-1">
                  {deliveryMethod === 'pickup' 
                    ? 'Pengambilan di cabang GRATIS. CS akan konfirmasi waktu siap ambil.'
                    : 'CS akan menginformasikan total biaya termasuk ongkir GoSend setelah pesanan diterima.'}
                </p>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          {isFormComplete && selectedSizeDetails && (
            <div className="p-6 bg-gray-50 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-3">📋 Ringkasan Pesanan:</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Ukuran:</span>
                  <span className="font-medium">{selectedSizeDetails.label} ({selectedSizeDetails.size})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Orientasi:</span>
                  <span className="font-medium">{ORIENTATION_OPTIONS.find(o => o.id === selectedOrientation)?.label}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Harga Kanvas:</span>
                  <span className="font-bold text-[#ea2423]">{selectedSizeDetails.price}</span>
                </div>
                <p className="text-xs text-gray-500 pt-2 border-t border-gray-200">
                  *Belum termasuk ongkir
                </p>
              </div>
            </div>
          )}

          {/* Upload Progress/Error Feedback */}
          {uploadStatus === 'uploading' && (
            <div className="p-4 bg-blue-50 border-b border-blue-200">
              <div className="flex items-center gap-3">
                <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
                <div>
                  <p className="text-sm font-medium text-blue-800">Sedang mengupload...</p>
                  <p className="text-xs text-blue-600">{uploadProgress}</p>
                </div>
              </div>
            </div>
          )}

          {uploadStatus === 'error' && uploadError && (
            <div className="p-4 bg-red-50 border-b border-red-200">
              <div className="flex items-start gap-3">
                <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-red-800">Upload Gagal</p>
                  <p className="text-xs text-red-600">{uploadError}</p>
                  <button
                    onClick={() => {
                      setUploadStatus('idle');
                      setUploadError(null);
                    }}
                    className="text-xs text-red-700 underline mt-1"
                  >
                    Coba lagi
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="p-6">
            <button
              onClick={handleWhatsAppSubmit}
              disabled={isUploading || !isFormComplete}
              className={`
                w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-bold text-lg transition-all
                ${isFormComplete && !isUploading
                  ? 'bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-500/25'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }
              `}
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Mengupload Foto...</span>
                </>
              ) : (
                <>
                  <MessageCircle className="w-5 h-5" />
                  <span>Kirim Pesanan & Foto via WhatsApp</span>
                </>
              )}
            </button>

            <p className="text-center text-xs text-gray-500 mt-3">
              Foto akan diupload ke server kami, lalu WhatsApp akan terbuka dengan pesan yang sudah terformat lengkap dengan link foto.
            </p>
          </div>
        </div>

        {/* Trust Signals */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-xs font-medium text-gray-700">Garansi 100 Tahun</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Package className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-xs font-medium text-gray-700">Packing Kayu Gratis</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
              <Star className="w-5 h-5 text-amber-600" />
            </div>
            <p className="text-xs font-medium text-gray-700">Rating 4.9/5</p>
          </div>
        </div>

        {/* Back Link */}
        <div className="mt-8 text-center">
          <Link 
            href="/layanan/cetak-canvas"
            className="text-sm text-gray-500 hover:text-[#ea2423] transition-colors"
          >
            ← Kembali ke halaman produk
          </Link>
        </div>
      </div>
    </main>
  );
}

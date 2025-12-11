"use client";

import { useState } from "react";
import Image from "next/image";
import { Upload, Check, Loader2, X } from "lucide-react";

type BackgroundColor = "merah" | "biru" | "putih" | "asli";
type Size = "2x3" | "3x4" | "4x6" | "visa";
type Quantity = 4 | 8;

const BACKGROUND_OPTIONS: { id: BackgroundColor; label: string; color: string }[] = [
  { id: "merah", label: "Merah", color: "bg-red-600" },
  { id: "biru", label: "Biru", color: "bg-blue-600" },
  { id: "putih", label: "Putih", color: "bg-white border-2 border-gray-300" },
  { id: "asli", label: "Asli/Tidak Diedit", color: "bg-gray-200" },
];

const SIZE_OPTIONS: { id: Size; label: string }[] = [
  { id: "2x3", label: "2×3 cm" },
  { id: "3x4", label: "3×4 cm" },
  { id: "4x6", label: "4×6 cm" },
  { id: "visa", label: "Visa/Custom" },
];

const QUANTITY_OPTIONS: { id: Quantity; label: string; price: number }[] = [
  { id: 4, label: "4 Lembar", price: 15000 },
  { id: 8, label: "8 Lembar", price: 25000 },
];

// Delivery method options
const DELIVERY_METHODS = [
  { id: 'pickup', label: 'Ambil di Cabang', description: 'Gratis' },
  { id: 'gosend', label: 'Kirim dengan GoSend', description: 'Biaya sesuai jarak' },
];

// Branch options (Same as Canvas)
const BRANCH_OPTIONS = [
  { id: 'rawamangun', label: 'Rawamangun - Jakarta Timur' },
  { id: 'pondok-pinang', label: 'Pondok Pinang - Jakarta Selatan' },
  { id: 'bogor', label: 'Bogor' },
  { id: 'galaxy-bekasi', label: 'Galaxy - Bekasi' },
  { id: 'jatiwaringin-bekasi', label: 'Jatiwaringin - Bekasi' },
];

export default function PasFotoUploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [background, setBackground] = useState<BackgroundColor>("merah");
  const [size, setSize] = useState<Size>("3x4");
  const [quantity, setQuantity] = useState<Quantity>(4);
  const [customerName, setCustomerName] = useState("");
  const [customerWhatsApp, setCustomerWhatsApp] = useState("");
  
  // NEW: Delivery options state
  const [deliveryMethod, setDeliveryMethod] = useState<string>('pickup');
  const [pickupBranch, setPickupBranch] = useState<string>('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  
  const [isUploading, setIsUploading] = useState(false);

  // Calculate total price
  const totalPrice = QUANTITY_OPTIONS.find((q) => q.id === quantity)?.price || 15000;

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
    }
  };

  // Handle form submission - NOW USING SECURE API
  const handleSubmit = async () => {
    // Validation
    if (!file) {
      alert("Silakan pilih foto terlebih dahulu");
      return;
    }
    if (!customerName.trim()) {
      alert("Silakan isi nama lengkap Anda");
      return;
    }
    if (!customerWhatsApp.trim()) {
      alert("Silakan isi nomor WhatsApp Anda");
      return;
    }
    
    // Client-side WhatsApp validation
    const whatsappDigits = customerWhatsApp.replace(/[^0-9]/g, '');
    if (whatsappDigits.length < 10 || whatsappDigits.length > 16) {
      alert("Nomor WhatsApp tidak valid. Gunakan format: 08xxx atau +628xxx (10-16 digit)");
      return;
    }
    if (!whatsappDigits.startsWith('0') && !whatsappDigits.startsWith('62')) {
      alert("Nomor WhatsApp harus dimulai dengan 0 (contoh: 08123456789) atau 62 (contoh: +628123456789)");
      return;
    }
    
    // NEW: Validate delivery options
    if (deliveryMethod === 'pickup' && !pickupBranch) {
      alert("Silakan pilih cabang untuk pengambilan");
      return;
    }
    if (deliveryMethod === 'gosend' && !deliveryAddress.trim()) {
      alert("Silakan isi alamat pengiriman lengkap");
      return;
    }

    setIsUploading(true);

    try {
      // STEP 1: Upload foto to Supabase Storage via API
      const formData = new FormData();
      formData.append('file', file);
      formData.append('customerName', customerName);
      formData.append('customerWhatsApp', customerWhatsApp);
      formData.append('background', background);
      formData.append('size', size);
      formData.append('quantity', quantity.toString());

      const uploadResponse = await fetch('/api/upload-pas-foto', {
        method: 'POST',
        body: formData,
      });

      const uploadData = await uploadResponse.json();

      // Handle rate limiting
      if (uploadResponse.status === 429) {
        alert(uploadData.error || 'Terlalu banyak request. Silakan coba lagi nanti.');
        return;
      }

      // Handle upload errors
      if (!uploadResponse.ok) {
        throw new Error(uploadData.error || 'Upload gagal. Silakan coba lagi.');
      }

      // STEP 2: Get the public URL and create branded link via API
      const linkResponse = await fetch('/api/pas-foto-link', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          publicUrl: uploadData.photoUrl,
          size,
          background,
          quantity,
          customerName,
          customerWhatsApp,
          deliveryMethod,
          pickupBranch: deliveryMethod === 'pickup' ? pickupBranch : null,
          deliveryAddress: deliveryMethod === 'gosend' ? deliveryAddress : null,
        }),
      });

      const linkData = await linkResponse.json();

      if (!linkResponse.ok) {
        throw new Error(linkData.error || 'Gagal membuat branded link.');
      }

      // STEP 3: Format delivery info for WhatsApp
      const deliveryInfo = deliveryMethod === 'pickup'
        ? `🏪 *PENGAMBILAN:*\n• Ambil di Cabang: ${BRANCH_OPTIONS.find(b => b.id === pickupBranch)?.label}`
        : `🚚 *PENGIRIMAN:*\n• GoSend ke:\n${deliveryAddress}`;

      // STEP 4: Generate WhatsApp message with BRANDED LINK & DELIVERY INFO
      const message = `Halo SS Foto, Order Baru! 🚀

📋 *DATA PESANAN:*
━━━━━━━━━━━━━━━━
• Nama: ${customerName}
• WhatsApp: ${customerWhatsApp}
• Layanan: Pas Foto ${size}
• Background: ${background.charAt(0).toUpperCase() + background.slice(1)}
• Jumlah: ${quantity} Lembar
• Order ID: #${uploadData.orderId}

${deliveryInfo}

📸 *DOWNLOAD FOTO:*
${linkData.brandedLink}

⚠️ Saya memahami bahwa harga di atas *belum termasuk ${deliveryMethod === 'gosend' ? 'biaya GoSend' : 'ongkir'}*.

Mohon proses pesanan ini. Terima kasih! 🙏`;

      const whatsappNumber = "6281936444486";
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

      // STEP 5: Open WhatsApp
      window.open(whatsappUrl, "_blank");

      // Show success message
      alert("✅ Pesanan berhasil dikirim! Menghubungkan ke WhatsApp...");

      // Reset form
      setFile(null);
      setPreviewUrl(null);
      setCustomerName("");
      setCustomerWhatsApp("");
      setBackground("merah");
      setSize("3x4");
      setQuantity(4);
      setDeliveryMethod("pickup");
      setPickupBranch("");
      setDeliveryAddress("");
      
    } catch (error: any) {
      console.error("Upload Error:", error);
      alert(error.message || "Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-32">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Upload Pas Foto
          </h1>
          <p className="text-gray-600">
            Kami edit background & cetak. Siap 1 jam.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-8 space-y-8">
        {/* Step 1: Upload Photo */}
        <section className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            1. Upload Foto
          </h2>

          {!previewUrl ? (
            <label className="block cursor-pointer">
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-[#ea2423] hover:bg-red-50/50 transition-all">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-lg font-semibold text-gray-700 mb-2">
                  Klik untuk pilih foto
                </p>
                <p className="text-sm text-gray-500">
                  Format: JPG, PNG (Max 10MB)
                </p>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          ) : (
            <div className="space-y-4">
              <div className="relative w-full h-80 rounded-xl overflow-hidden bg-gray-100">
                <Image
                  src={previewUrl}
                  alt="Preview"
                  fill
                  className="object-contain"
                />
              </div>
              <label className="block">
                <button
                  type="button"
                  className="w-full px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Ganti Foto
                </button>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>
          )}
        </section>

        {/* Step 2: Options */}
        <section className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            2. Pilih Spesifikasi
          </h2>

          {/* Background Color */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              Warna Background
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {BACKGROUND_OPTIONS.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setBackground(option.id)}
                  className={`relative p-4 rounded-xl border-2 transition-all ${
                    background === option.id
                      ? "border-[#ea2423] bg-red-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-lg mx-auto mb-2 ${option.color}`}
                  />
                  <p className="text-sm font-medium text-gray-900">
                    {option.label}
                  </p>
                  {background === option.id && (
                    <div className="absolute top-2 right-2 w-5 h-5 bg-[#ea2423] rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Size */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              Ukuran
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {SIZE_OPTIONS.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setSize(option.id)}
                  className={`relative p-4 rounded-xl border-2 transition-all ${
                    size === option.id
                      ? "border-[#ea2423] bg-red-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <p className="font-semibold text-gray-900">{option.label}</p>
                  {size === option.id && (
                    <div className="absolute top-2 right-2 w-5 h-5 bg-[#ea2423] rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              Jumlah
            </label>
            <div className="grid grid-cols-2 gap-3">
              {QUANTITY_OPTIONS.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setQuantity(option.id)}
                  className={`relative p-4 rounded-xl border-2 transition-all ${
                    quantity === option.id
                      ? "border-[#ea2423] bg-red-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <p className="font-semibold text-gray-900">{option.label}</p>
                  <p className="text-sm text-gray-600">
                    Rp {option.price.toLocaleString("id-ID")}
                  </p>
                  {quantity === option.id && (
                    <div className="absolute top-2 right-2 w-5 h-5 bg-[#ea2423] rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Step 3: Customer Data */}
        <section className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            3. Data Diri
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Nama Lengkap
              </label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Contoh: Ahmad Santoso"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ea2423] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Nomor WhatsApp <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                value={customerWhatsApp}
                onChange={(e) => setCustomerWhatsApp(e.target.value)}
                placeholder="Contoh: 08123456789 atau +628123456789"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ea2423] focus:border-transparent"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                ✓ Gunakan format: 08xxx atau +628xxx (10-16 digit)
              </p>
              <p className="text-xs text-gray-500">
                ✓ Kami akan konfirmasi pesanan via WhatsApp
              </p>
            </div>
          </div>
        </section>

        {/* Step 4: Delivery Options */}
        <section className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            4. Metode Pengambilan / Pengiriman
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
                onChange={(e) => setPickupBranch(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ea2423] focus:border-transparent disabled:bg-gray-100"
              >
                <option value="">-- Pilih Cabang --</option>
                {BRANCH_OPTIONS.map((branch) => (
                  <option key={branch.id} value={branch.id}>
                    {branch.label}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">
                Pas foto siap diambil 2 jam setelah konfirmasi
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
                onChange={(e) => setDeliveryAddress(e.target.value)}
                placeholder="Contoh: Jl. Merdeka No. 123, RT 01/RW 02, Kelurahan Menteng, Kecamatan Menteng, Jakarta Pusat 10110"
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ea2423] focus:border-transparent disabled:bg-gray-100"
              />
              <p className="text-xs text-gray-500 mt-1">
                Biaya GoSend akan dikonfirmasi oleh CS berdasarkan jarak
              </p>
            </div>
          )}

          {/* Shipping Notice */}
          <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <div className="flex items-start gap-2">
              <span className="text-amber-600 text-sm">⚠️</span>
              <div>
                <p className="text-sm font-semibold text-amber-800">
                  Harga belum termasuk {deliveryMethod === 'gosend' ? 'biaya GoSend' : 'ongkir'}
                </p>
                <p className="text-xs text-amber-700 mt-1">
                  {deliveryMethod === 'pickup' 
                    ? 'Pengambilan di cabang GRATIS. CS akan konfirmasi waktu siap ambil.'
                    : 'CS akan menginformasikan total biaya termasuk ongkir GoSend setelah pesanan diterima.'}
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Sticky Footer (Action Bar) */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 px-6 py-4 shadow-2xl">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-4">
          <div>
            <p className="text-xs text-gray-500">Total Harga</p>
            <p className="text-2xl font-bold text-gray-900">
              Rp {totalPrice.toLocaleString("id-ID")}
            </p>
          </div>
          <button
            onClick={handleSubmit}
            disabled={isUploading}
            className="flex items-center gap-2 px-8 py-4 bg-[#ea2423] text-white font-bold rounded-lg hover:bg-[#c91f1e] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isUploading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Uploading...
              </>
            ) : (
              "Kirim Pesanan"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

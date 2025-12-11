import { Loader2 } from 'lucide-react';

export default function UploadLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        {/* Animated Spinner */}
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white shadow-lg mb-6">
          <Loader2 className="w-10 h-10 text-[#ea2423] animate-spin" />
        </div>
        
        {/* Loading Text */}
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Memuat halaman...
        </h2>
        <p className="text-gray-500 text-sm">
          Mohon tunggu sebentar
        </p>
      </div>
    </div>
  );
}


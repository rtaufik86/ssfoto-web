import { Loader2 } from 'lucide-react';

export default function GlobalLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        {/* Animated Spinner */}
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gray-50 shadow-lg mb-6">
          <Loader2 className="w-12 h-12 text-[#ea2423] animate-spin" />
        </div>
        
        {/* Loading Text */}
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          SS Foto Digital Lab
        </h2>
        <p className="text-gray-500">
          Memuat halaman...
        </p>
      </div>
    </div>
  );
}


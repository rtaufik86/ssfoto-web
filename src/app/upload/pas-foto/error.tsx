'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { ImageOff, RefreshCcw, MessageCircle, ArrowLeft } from 'lucide-react';

export default function UploadError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Upload Error:', error);
    }
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 mb-6">
            <ImageOff className="w-10 h-10 text-[#ea2423]" />
          </div>

          {/* Heading */}
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Upload Gagal
          </h2>
          
          {/* Description */}
          <p className="text-gray-600 mb-8">
            Terjadi kesalahan saat mengupload foto Anda. Silakan coba lagi atau hubungi customer service kami.
          </p>

          {/* Actions */}
          <div className="space-y-3">
            <button
              onClick={reset}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-[#ea2423] text-white font-semibold rounded-lg hover:bg-[#c91f1e] transition-all shadow-lg hover:shadow-xl"
            >
              <RefreshCcw className="w-5 h-5" />
              Coba Upload Lagi
            </button>
            
            <a
              href="https://wa.me/6281936444486"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-all shadow-lg"
            >
              <MessageCircle className="w-5 h-5" />
              Hubungi Customer Service
            </a>
            
            <Link
              href="/layanan/pas-foto"
              className="block w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Kembali ke Info Pas Foto
            </Link>
          </div>

          {/* Common Issues */}
          <div className="mt-8 pt-6 border-t border-gray-200 text-left">
            <p className="text-sm font-semibold text-gray-700 mb-3">
              Kemungkinan penyebab:
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start">
                <span className="text-[#ea2423] mr-2">•</span>
                File terlalu besar (maksimal 25MB)
              </li>
              <li className="flex items-start">
                <span className="text-[#ea2423] mr-2">•</span>
                Format file tidak didukung (gunakan JPG/PNG)
              </li>
              <li className="flex items-start">
                <span className="text-[#ea2423] mr-2">•</span>
                Koneksi internet tidak stabil
              </li>
            </ul>
          </div>

          {/* Error Details (Development Only) */}
          {process.env.NODE_ENV === 'development' && error && (
            <details className="mt-6 text-left">
              <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700 font-medium">
                🔧 Error Details (Dev Mode)
              </summary>
              <div className="mt-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <pre className="text-xs text-gray-700 overflow-auto whitespace-pre-wrap break-words">
                  {error.message}
                </pre>
              </div>
            </details>
          )}
        </div>
      </div>
    </div>
  );
}


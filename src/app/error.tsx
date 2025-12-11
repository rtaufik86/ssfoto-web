'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, Home, RefreshCcw } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Global Error:', error);
    }
    
    // TODO: Send to error tracking service (e.g., Sentry)
    // Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="id">
      <body>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center">
            {/* Icon */}
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 mb-6">
              <AlertTriangle className="w-10 h-10 text-[#ea2423]" />
            </div>

            {/* Heading */}
            <h1 className="text-2xl font-bold text-gray-900 mb-3">
              Oops! Terjadi Kesalahan
            </h1>
            
            {/* Description */}
            <p className="text-gray-600 mb-8 leading-relaxed">
              Mohon maaf, terjadi kesalahan yang tidak terduga. Tim kami sudah diberitahu dan sedang menangani masalah ini.
            </p>

            {/* Actions */}
            <div className="space-y-3">
              <button
                onClick={reset}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#ea2423] text-white font-semibold rounded-lg hover:bg-[#c91f1e] transition-all shadow-lg hover:shadow-xl"
              >
                <RefreshCcw className="w-5 h-5" />
                Coba Lagi
              </button>
              
              <Link
                href="/"
                className="block w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Home className="w-5 h-5" />
                Kembali ke Beranda
              </Link>
            </div>

            {/* Support Info */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-2">Butuh bantuan?</p>
              <a
                href="https://wa.me/6281936444486"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[#ea2423] font-semibold hover:underline"
              >
                Hubungi Customer Service →
              </a>
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
                    {error.stack && `\n\n${error.stack}`}
                  </pre>
                  {error.digest && (
                    <p className="mt-2 text-xs text-gray-500">
                      Digest: {error.digest}
                    </p>
                  )}
                </div>
              </details>
            )}
          </div>
        </div>
      </body>
    </html>
  );
}


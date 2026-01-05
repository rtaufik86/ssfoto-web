import { createClient } from '@supabase/supabase-js';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Download } from 'lucide-react';

// ═══════════════════════════════════════════════════════════════════════════
// SUPABASE CLIENT (Server Component - Service Role)
// ═══════════════════════════════════════════════════════════════════════════
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

// ═══════════════════════════════════════════════════════════════════════════
// PAGE COMPONENT (Server Component - Display Image)
// ═══════════════════════════════════════════════════════════════════════════
export default async function PasFotoDownloadPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  // Await params in Next.js 14+
  const { token } = await params;

  try {
    // Query database for the token
    const { data, error } = await supabase
      .from('pas_foto_orders')
      .select('public_url, customer_name, size, background, quantity')
      .eq('token', token)
      .single();

    if (error || !data) {
      console.error('Token lookup error:', error);
      notFound();
    }

    const { public_url, customer_name, size, background, quantity } = data;

    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Download Pas Foto
            </h1>
            <p className="text-gray-600">
              Pesanan untuk: <span className="font-semibold">{customer_name}</span>
            </p>
          </div>

          {/* Order Details */}
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Detail Pesanan</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-gray-500">Ukuran</p>
                <p className="font-semibold text-gray-900">{size}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Background</p>
                <p className="font-semibold text-gray-900 capitalize">{background}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Jumlah</p>
                <p className="font-semibold text-gray-900">{quantity} Lembar</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Order ID</p>
                <p className="font-semibold text-gray-900 text-xs">#{token.substring(3, 11)}</p>
              </div>
            </div>
          </div>

          {/* Image Display */}
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
            <div className="relative w-full aspect-[3/4] bg-gray-100 rounded-xl overflow-hidden mb-4">
              <Image
                src={public_url}
                alt={`Pas Foto - ${customer_name}`}
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Download Button */}
            <a
              href={public_url}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-[#ea2423] text-white font-bold rounded-xl hover:bg-[#c91f1e] transition-all shadow-lg"
            >
              <Download className="w-5 h-5" />
              Download Foto Original
            </a>
          </div>

          {/* Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <p className="text-sm text-blue-800">
              <strong>Catatan:</strong> Link download ini berlaku selamanya. Simpan link ini untuk mengunduh foto kapan saja.
            </p>
          </div>
        </div>
      </div>
    );

  } catch (error) {
    console.error('Page error:', error);
    notFound();
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// METADATA
// ═══════════════════════════════════════════════════════════════════════════
export async function generateMetadata({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;

  return {
    title: `SS Foto - Download Pas Foto #${token.substring(3, 11)}`,
    description: 'Download foto pas foto Anda dari SS Foto',
    robots: 'noindex, nofollow',
  };
}

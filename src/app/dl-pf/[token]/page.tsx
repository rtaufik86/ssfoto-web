import { redirect } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

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
// PAGE COMPONENT (Server Component for Redirect)
// ═══════════════════════════════════════════════════════════════════════════
export default async function PasFotoRedirectPage({
  params,
}: {
  params: { token: string };
}) {
  const { token } = params;

  try {
    // Query database for the token
    const { data, error } = await supabase
      .from('pas_foto_orders')
      .select('public_url')
      .eq('token', token)
      .single();

    if (error || !data) {
      console.error('Token lookup error:', error);
      // Redirect to error page or 404
      redirect('/404');
    }

    // Redirect to the actual Supabase public URL
    redirect(data.public_url);

  } catch (error) {
    console.error('Redirect error:', error);
    redirect('/404');
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// METADATA
// ═══════════════════════════════════════════════════════════════════════════
export async function generateMetadata({ params }: { params: { token: string } }) {
  return {
    title: 'SS Foto - Redirect Pas Foto',
    robots: 'noindex, nofollow',
  };
}


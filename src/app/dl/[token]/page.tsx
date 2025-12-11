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
export default async function CanvasRedirectPage({
  params,
}: {
  params: { token: string };
}) {
  const { token } = params;

  console.log('🔗 [Redirect] Canvas redirect requested for token:', token);

  try {
    // Query database for the token
    const { data, error } = await supabase
      .from('canvas_orders')
      .select('public_url')
      .eq('token', token)
      .single();

    if (error || !data) {
      console.error('❌ [Redirect] Token lookup error:', error);
      console.error('Token:', token);
      // Redirect to error page or 404
      redirect('/404');
    }

    console.log('✅ [Redirect] Token found, redirecting to:', data.public_url.substring(0, 50) + '...');

    // Redirect to the actual Supabase public URL
    redirect(data.public_url);

  } catch (error) {
    console.error('❌ [Redirect] Unexpected error:', error);
    redirect('/404');
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// METADATA
// ═══════════════════════════════════════════════════════════════════════════
export async function generateMetadata({ params }: { params: { token: string } }) {
  return {
    title: 'SS Foto - Redirect Canvas',
    robots: 'noindex, nofollow',
  };
}


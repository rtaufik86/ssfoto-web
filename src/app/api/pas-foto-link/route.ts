import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// ═══════════════════════════════════════════════════════════════════════════
// SUPABASE CLIENT (Service Role for Database Write)
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
// TOKEN GENERATION
// ═══════════════════════════════════════════════════════════════════════════
function generateToken(): string {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 10);
  return `pf-${timestamp}${randomStr}`; // 'pf' prefix for Pas Foto
}

// ═══════════════════════════════════════════════════════════════════════════
// POST HANDLER
// ═══════════════════════════════════════════════════════════════════════════
export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    const { 
      publicUrl, 
      size, 
      background, 
      quantity, 
      customerName, 
      customerWhatsApp,
      deliveryMethod,
      pickupBranch,
      deliveryAddress 
    } = body;

    // Validate required fields
    if (!publicUrl || !size || !background || !quantity || !customerName || !customerWhatsApp) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Generate unique token
    const token = generateToken();

    // Prepare order data (Explicit snake_case mapping)
    const orderData: Record<string, any> = {
      // Core fields
      token,
      public_url: publicUrl,
      size,
      background,
      quantity,
      customer_name: customerName,
      customer_whatsapp: customerWhatsApp,
      
      // Delivery fields (NEW)
      delivery_method: deliveryMethod || 'pickup',
      pickup_branch: deliveryMethod === 'pickup' ? (pickupBranch || null) : null,
      delivery_address: deliveryMethod === 'gosend' ? (deliveryAddress || null) : null,
      
      // Timestamp
      created_at: new Date().toISOString(),
    };

    // Remove null/undefined values
    Object.keys(orderData).forEach(key => {
      if (orderData[key] === null || orderData[key] === undefined) {
        delete orderData[key];
      }
    });

    // Insert into pas_foto_orders table
    const { data, error } = await supabase
      .from('pas_foto_orders')
      .insert(orderData)
      .select()
      .single();

    if (error) {
      console.error('Database insert error:', error);
      return NextResponse.json(
        { error: 'Failed to save order to database', details: error.message },
        { status: 500 }
      );
    }

    // Generate branded link
    const brandedLink = `https://ssfoto.co.id/dl-pf/${token}`;

    // Return success response
    return NextResponse.json({
      success: true,
      token,
      brandedLink,
      orderId: data.id,
    });

  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}


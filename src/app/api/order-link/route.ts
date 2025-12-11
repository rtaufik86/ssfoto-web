import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// ═══════════════════════════════════════════════════════════════════════════
// SUPABASE CLIENT (Service Role for Database Write)
// ═══════════════════════════════════════════════════════════════════════════
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Validate environment variables
if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase environment variables');
  console.error('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✓ Set' : '✗ Missing');
  console.error('SUPABASE_SERVICE_ROLE_KEY:', supabaseServiceKey ? '✓ Set' : '✗ Missing');
}

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
  return `cv-${timestamp}${randomStr}`; // 'cv' prefix for Canvas
}

// ═══════════════════════════════════════════════════════════════════════════
// POST HANDLER
// ═══════════════════════════════════════════════════════════════════════════
export async function POST(request: NextRequest) {
  console.log('📥 [API] /api/order-link - POST request received');
  
  try {
    // ─────────────────────────────────────────────────────────────────────
    // STEP 1: Parse Request Body
    // ─────────────────────────────────────────────────────────────────────
    let body;
    try {
      body = await request.json();
      console.log('✓ [API] Request body parsed successfully');
      console.log('📋 [API] Body keys:', Object.keys(body));
    } catch (parseError: any) {
      console.error('❌ [API] Failed to parse request body:', parseError);
      return NextResponse.json(
        { 
          error: 'Invalid JSON body',
          details: parseError.message 
        },
        { status: 400 }
      );
    }

    // ─────────────────────────────────────────────────────────────────────
    // STEP 2: Extract and Validate Required Fields
    // ─────────────────────────────────────────────────────────────────────
    const { 
      publicUrl, 
      size, 
      orientation, 
      customerName, 
      customerWhatsApp,
      branchId,
      totalPrice,
      deliveryMethod,
      pickupBranch,
      deliveryAddress 
    } = body;

    console.log('📊 [API] Extracted data:', {
      publicUrl: publicUrl ? `${publicUrl.substring(0, 50)}...` : 'MISSING',
      size: size || 'MISSING',
      orientation: orientation || 'MISSING',
      customerName: customerName || 'MISSING',
      customerWhatsApp: customerWhatsApp || 'MISSING',
      branchId: branchId || 'NOT PROVIDED',
      totalPrice: totalPrice || 'NOT PROVIDED',
      deliveryMethod: deliveryMethod || 'NOT PROVIDED',
      pickupBranch: pickupBranch || 'NOT PROVIDED',
      deliveryAddress: deliveryAddress || 'NOT PROVIDED',
    });

    // Validate required fields
    const missingFields = [];
    if (!publicUrl) missingFields.push('publicUrl');
    if (!size) missingFields.push('size');
    if (!orientation) missingFields.push('orientation');
    if (!customerName) missingFields.push('customerName');
    if (!customerWhatsApp) missingFields.push('customerWhatsApp');

    if (missingFields.length > 0) {
      console.error('❌ [API] Missing required fields:', missingFields);
      return NextResponse.json(
        { 
          error: 'Missing required fields',
          missingFields,
        },
        { status: 400 }
      );
    }

    // ─────────────────────────────────────────────────────────────────────
    // STEP 3: Generate Unique Token
    // ─────────────────────────────────────────────────────────────────────
    const token = generateToken();
    console.log('🔑 [API] Generated token:', token);

    // ─────────────────────────────────────────────────────────────────────
    // STEP 4: Prepare Order Data (Explicit snake_case mapping)
    // ─────────────────────────────────────────────────────────────────────
    // Map all camelCase fields to snake_case database columns
    const orderData: Record<string, any> = {
      // Core fields
      token,
      public_url: publicUrl,
      size,
      orientation,
      customer_name: customerName,
      customer_whatsapp: customerWhatsApp,
      
      // Product & pricing
      product_type: 'canvas',
      total_price: totalPrice || null,
      
      // Status fields
      status: 'pending',
      sync_status: 'pending',
      
      // Delivery fields (FIXED: Use correct column names)
      delivery_method: deliveryMethod || 'pickup',
      pickup_branch: deliveryMethod === 'pickup' ? (pickupBranch || branchId || null) : null,
      delivery_address: deliveryMethod === 'gosend' ? (deliveryAddress || null) : null,
      
      // Timestamp
      created_at: new Date().toISOString(),
      
      // Additional metadata in JSONB
      details: {
        size,
        orientation,
        order_source: 'website',
        delivery_method: deliveryMethod || 'pickup',
        pickup_branch: deliveryMethod === 'pickup' ? (pickupBranch || branchId || null) : null,
        delivery_address: deliveryMethod === 'gosend' ? (deliveryAddress || null) : null,
        original_branch_id: branchId || null, // Keep for reference if needed
      },
    };

    // Remove null/undefined values to avoid issues
    Object.keys(orderData).forEach(key => {
      if (orderData[key] === null || orderData[key] === undefined) {
        delete orderData[key];
      }
    });

    console.log('💾 [API] Prepared order data for insertion:', {
      token,
      size,
      orientation,
      customer_name: customerName,
      delivery_method: orderData.delivery_method,
      pickup_branch: orderData.pickup_branch,
      has_delivery_address: !!orderData.delivery_address,
    });

    // ─────────────────────────────────────────────────────────────────────
    // STEP 5: Insert into Supabase Database
    // ─────────────────────────────────────────────────────────────────────
    console.log('🚀 [API] Attempting to insert into canvas_orders table...');
    console.log('📦 [API] Order data keys:', Object.keys(orderData));
    console.log('📦 [API] Order data preview:', {
      token: orderData.token,
      size: orderData.size,
      delivery_method: orderData.delivery_method,
      pickup_branch: orderData.pickup_branch,
      has_details: !!orderData.details,
    });
    
    const { data, error } = await supabase
      .from('canvas_orders')
      .insert(orderData)
      .select()
      .single();

    // ─────────────────────────────────────────────────────────────────────
    // STEP 6: Handle Insertion Error
    // ─────────────────────────────────────────────────────────────────────
    if (error) {
      console.error('❌ [API] Supabase insertion error:');
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
      console.error('Error details:', error.details);
      console.error('Error hint:', error.hint);
      console.error('Full error object:', JSON.stringify(error, null, 2));
      
      return NextResponse.json(
        { 
          error: 'Failed to save order to database',
          details: error.message,
          code: error.code,
          hint: error.hint,
        },
        { status: 500 }
      );
    }

    // ─────────────────────────────────────────────────────────────────────
    // STEP 7: Success! Generate Branded Link
    // ─────────────────────────────────────────────────────────────────────
    console.log('✅ [API] Order inserted successfully!');
    console.log('📄 [API] Inserted data:', data);

    const brandedLink = `https://ssfoto.co.id/dl/${token}`;
    console.log('🔗 [API] Generated branded link:', brandedLink);

    // ─────────────────────────────────────────────────────────────────────
    // STEP 8: Return Success Response
    // ─────────────────────────────────────────────────────────────────────
    const response = {
      success: true,
      token,
      brandedLink,
      orderId: data.id,
    };

    console.log('✅ [API] Returning success response');
    return NextResponse.json(response, { status: 200 });

  } catch (error: any) {
    // ─────────────────────────────────────────────────────────────────────
    // GLOBAL ERROR HANDLER
    // ─────────────────────────────────────────────────────────────────────
    console.error('❌ [API] Unexpected error in /api/order-link:');
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error.message,
        type: error.name,
      },
      { status: 500 }
    );
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// HEALTH CHECK (Optional)
// ═══════════════════════════════════════════════════════════════════════════
export async function GET(request: NextRequest) {
  return NextResponse.json({
    status: 'ok',
    endpoint: '/api/order-link',
    message: 'Canvas order link API is running',
    environment: {
      supabaseUrlConfigured: !!supabaseUrl,
      serviceKeyConfigured: !!supabaseServiceKey,
    },
  });
}


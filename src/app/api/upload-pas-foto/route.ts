import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { checkRateLimit } from '@/lib/rateLimiter';
import { logger } from '@/lib/logger';

// Server-side Supabase client with SERVICE_ROLE_KEY
// ⚠️ NEVER expose this key to the client!
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// File validation constants
const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25MB (increased for high-res photos)
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
const ALLOWED_BACKGROUNDS = ['merah', 'biru', 'putih', 'asli'];
const ALLOWED_SIZES = ['2x3', '3x4', '4x6', 'visa'];
const ALLOWED_QUANTITIES = [4, 8];

export async function POST(request: NextRequest) {
  try {
    // === RATE LIMITING ===
    const rateLimitResult = await checkRateLimit(request);
    
    if (!rateLimitResult.success) {
      const resetDate = new Date(rateLimitResult.reset);
      logger.warn('⚠️ Rate limit exceeded:', {
        ip: request.ip,
        remaining: rateLimitResult.remaining,
        reset: resetDate.toISOString(),
      });
      
      return NextResponse.json(
        { 
          error: `Terlalu banyak request. Silakan coba lagi setelah ${resetDate.toLocaleTimeString('id-ID')}.`,
          remainingRequests: rateLimitResult.remaining,
          resetTime: resetDate.toISOString(),
        },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Limit': rateLimitResult.limit.toString(),
            'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
            'X-RateLimit-Reset': rateLimitResult.reset.toString(),
          }
        }
      );
    }

    logger.log('✅ Rate limit check passed:', {
      remaining: rateLimitResult.remaining,
      limit: rateLimitResult.limit,
    });

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const customerName = formData.get('customerName') as string;
    const customerWhatsApp = formData.get('customerWhatsApp') as string;
    const background = formData.get('background') as string;
    const size = formData.get('size') as string;
    const quantity = formData.get('quantity') as string;

    // === VALIDATION ===
    
    // 1. Required fields
    if (!file || !customerName || !customerWhatsApp || !background || !size || !quantity) {
      return NextResponse.json(
        { error: 'Semua field wajib diisi.' },
        { status: 400 }
      );
    }

    // 2. File size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: `File terlalu besar. Maksimal ${MAX_FILE_SIZE / 1024 / 1024}MB.` },
        { status: 400 }
      );
    }

    // 3. File type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: 'Format file tidak valid. Gunakan JPG, PNG, atau WebP.' },
        { status: 400 }
      );
    }

    // 4. Customer name (sanitize)
    const sanitizedName = customerName.trim().substring(0, 100);
    if (sanitizedName.length < 2) {
      return NextResponse.json(
        { error: 'Nama minimal 2 karakter.' },
        { status: 400 }
      );
    }

    // 5. WhatsApp number (flexible Indonesian format validation)
    const sanitizedWhatsApp = customerWhatsApp.replace(/[^0-9]/g, '');
    
    // Indonesian phone: 08xxx (11-13 digits) or 628xxx (12-14 digits)
    if (sanitizedWhatsApp.length < 10 || sanitizedWhatsApp.length > 16) {
      return NextResponse.json(
        { error: 'Nomor WhatsApp tidak valid. Format: 08xxxxxxxxxx atau +628xxxxxxxxxx' },
        { status: 400 }
      );
    }
    
    // Must start with 0 or 62
    if (!sanitizedWhatsApp.startsWith('0') && !sanitizedWhatsApp.startsWith('62')) {
      return NextResponse.json(
        { error: 'Nomor WhatsApp harus dimulai dengan 0 atau 62.' },
        { status: 400 }
      );
    }

    // 6. Background validation
    if (!ALLOWED_BACKGROUNDS.includes(background)) {
      return NextResponse.json(
        { error: 'Background tidak valid.' },
        { status: 400 }
      );
    }

    // 7. Size validation
    if (!ALLOWED_SIZES.includes(size)) {
      return NextResponse.json(
        { error: 'Ukuran tidak valid.' },
        { status: 400 }
      );
    }

    // 8. Quantity validation
    const quantityNum = parseInt(quantity);
    if (!ALLOWED_QUANTITIES.includes(quantityNum)) {
      return NextResponse.json(
        { error: 'Jumlah tidak valid.' },
        { status: 400 }
      );
    }

    // === UPLOAD TO STORAGE ===
    
    // Convert File to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Generate secure filename
    const fileExt = file.name.split('.').pop()?.toLowerCase() || 'jpg';
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(7);
    const uniqueFileName = `${timestamp}-${randomStr}.${fileExt}`;
    const filePath = `uploads/${uniqueFileName}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('pas-foto-uploads')
      .upload(filePath, buffer, {
        contentType: file.type,
        cacheControl: '3600',
        upsert: false,
      });

    if (uploadError) {
      logger.error('❌ Upload Error:', uploadError);
      return NextResponse.json(
        { error: 'Gagal upload foto. Silakan coba lagi.' },
        { status: 500 }
      );
    }

    logger.log('✅ Upload success:', uploadData);

    // === GENERATE SIGNED URL (valid for 24 hours) ===
    
    const { data: signedUrlData, error: signedUrlError } = await supabase.storage
      .from('pas-foto-uploads')
      .createSignedUrl(filePath, 86400); // 24 hours = 86400 seconds

    if (signedUrlError || !signedUrlData) {
      logger.error('❌ Signed URL Error:', signedUrlError);
      
      // Rollback: Delete uploaded file
      await supabase.storage.from('pas-foto-uploads').remove([filePath]);
      
      return NextResponse.json(
        { error: 'Gagal generate URL. Silakan coba lagi.' },
        { status: 500 }
      );
    }

    logger.log('✅ Signed URL generated:', signedUrlData.signedUrl);

    // === SAVE TO DATABASE ===
    
    const orderData = {
      customer_name: sanitizedName,
      customer_whatsapp: sanitizedWhatsApp,
      product_type: 'pas_foto',
      photo_url: signedUrlData.signedUrl, // ✅ Private signed URL
      status: 'pending',
      branch_id: 'rawamangun',
      details: {
        background,
        size,
        quantity: quantityNum,
        original_filename: file.name,
        file_path: filePath, // Store for future signed URL regeneration
        file_size: file.size,
        uploaded_at: new Date().toISOString(),
      },
    };

    const { data: insertedData, error: dbError } = await supabase
      .from('orders')
      .insert(orderData)
      .select()
      .single();

    if (dbError) {
      logger.error('❌ Database Error:', dbError);
      
      // Rollback: Delete uploaded file
      await supabase.storage.from('pas-foto-uploads').remove([filePath]);
      
      return NextResponse.json(
        { error: 'Gagal menyimpan pesanan. Silakan coba lagi.' },
        { status: 500 }
      );
    }

    logger.log('✅ Database insert success:', insertedData);

    // === SUCCESS RESPONSE ===
    
    return NextResponse.json({
      success: true,
      orderId: insertedData.id,
      photoUrl: signedUrlData.signedUrl,
      message: 'Upload berhasil! Foto Anda telah diterima.',
    });

  } catch (error: any) {
    logger.error('❌ Server Error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan server. Silakan coba lagi.' },
      { status: 500 }
    );
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({ 
    status: 'OK',
    service: 'Upload Pas Foto API',
    timestamp: new Date().toISOString(),
  });
}


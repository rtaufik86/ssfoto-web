import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// Create a server-side Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function GET(request: Request) {
    // Verify the cron secret if provided (optional security measure)
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;

    // If CRON_SECRET is set, validate it
    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
        console.log('❌ Unauthorized cron request');
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const supabase = createClient(supabaseUrl, supabaseAnonKey);

        // Perform a simple query to keep the database active
        // This query checks if there are any tables accessible
        const timestamp = new Date().toISOString();

        // Try to query an existing table to keep the database active
        // We'll try canvas_orders first, then pas_foto_orders as fallback
        let tableUsed = '';
        let rowCount = 0;

        // Try canvas_orders table
        // Try canvas_orders table
        const { data: canvasData, error: canvasError } = await supabase
            .from('canvas_orders')
            .select('id')
            .limit(1);

        if (!canvasError) {
            tableUsed = 'canvas_orders';
            rowCount = canvasData?.length || 0;
        } else {
            // Try pas_foto_orders as fallback
            const { data: pasData, error: pasError } = await supabase
                .from('pas_foto_orders')
                .select('id')
                .limit(1);

            if (!pasError) {
                tableUsed = 'pas_foto_orders';
                rowCount = pasData?.length || 0;
            } else {
                // If both tables failed, log the error but still return success
                // because the connection itself keeps the database active
                console.log('⚠️ Could not query tables, but connection was made:', {
                    canvasError: canvasError.message,
                    pasError: pasError.message
                });
            }
        }

        console.log('✅ Supabase Keep-Alive Ping Successful:', {
            timestamp,
            tableQueried: tableUsed || 'connection-only',
            rowCount
        });

        return NextResponse.json({
            success: true,
            message: 'Supabase database keep-alive ping successful',
            timestamp,
            details: {
                tableQueried: tableUsed || 'connection-only',
                rowCount
            }
        });

    } catch (error) {
        console.error('❌ Supabase Keep-Alive Error:', error);

        return NextResponse.json({
            success: false,
            message: 'Failed to ping Supabase database',
            error: error instanceof Error ? error.message : 'Unknown error',
            timestamp: new Date().toISOString()
        }, { status: 500 });
    }
}

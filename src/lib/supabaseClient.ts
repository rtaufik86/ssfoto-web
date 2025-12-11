import { createClient } from '@supabase/supabase-js';

// Read environment variables (NEXT_PUBLIC_* are available in browser)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Debugging: Log env vars status
console.log("🔧 Supabase Client Initialization:", {
  urlExists: !!supabaseUrl,
  keyExists: !!supabaseAnonKey,
  url: supabaseUrl || "❌ NOT LOADED",
});

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    '⚠️ Supabase environment variables are missing!\n' +
    'Please check:\n' +
    '1. .env.local file exists in project ROOT (next to package.json)\n' +
    '2. File contains NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY\n' +
    '3. Dev server has been fully restarted (Ctrl+C then npm run dev)'
  );
}

// Initialize and export Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
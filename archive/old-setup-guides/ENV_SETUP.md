# 🔐 Environment Variables Setup

Create a `.env.local` file in the root directory with the following variables:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Sanity CMS (Optional for now)
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_sanity_token

# PostHog Analytics (Optional for now)
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_key
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com

# Midtrans Payment (Sandbox)
NEXT_PUBLIC_MIDTRANS_CLIENT_KEY=your_midtrans_client_key
MIDTRANS_SERVER_KEY=your_midtrans_server_key
MIDTRANS_IS_PRODUCTION=false

# App Config
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 📋 How to Get API Keys

### 1. Supabase
1. Go to https://supabase.com
2. Create a new project (or use existing)
3. Go to Settings → API
4. Copy `Project URL` and `anon/public key`
5. Run the `supabase/schema.sql` script in SQL Editor

### 2. Sanity (For Blog - Optional)
1. Go to https://sanity.io
2. Create a new project
3. Copy Project ID
4. Generate API token in Manage

### 3. PostHog (Analytics - Optional)
1. Go to https://posthog.com
2. Sign up for free account
3. Copy Project API key

### 4. Midtrans (Payment Gateway - Sandbox)
1. Go to https://dashboard.midtrans.com/register
2. Sign up for account
3. Go to Settings → Access Keys
4. Use Sandbox keys for development


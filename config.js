// Supabase config is read from environment variables:
// VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env.local
// 
// Do NOT hardcode credentials here.
// For local development, copy .env.local.example to .env.local and fill in your values.

const SUPABASE_CONFIG = {};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = SUPABASE_CONFIG;
}

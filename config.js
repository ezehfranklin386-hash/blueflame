// 🚨 SUPABASE CONFIGURATION
// ===========================
// 
// This file contains your Supabase credentials.
// KEEP THIS FILE SAFE! Don't commit to public repositories.
//
// For production, use environment variables instead of hardcoding credentials.

const SUPABASE_CONFIG = {
    URL: 'https://YOUR_PROJECT.supabase.co',  // Replace with your Project URL
    KEY: 'YOUR_ANON_KEY',                      // Replace with your Anon Key
    ADMIN_PASSWORD: 'blueflame2024'            // Change this to a strong password
};

// After creating your Supabase project:
// 1. Copy your Project URL from: Settings → API
// 2. Copy your Anon Key from: Settings → API
// 3. Paste them below:
//
// Example:
// const SUPABASE_CONFIG = {
//     URL: 'https://abc123def456.supabase.co',
//     KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
//     ADMIN_PASSWORD: 'your-secure-password'
// };

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SUPABASE_CONFIG;
}

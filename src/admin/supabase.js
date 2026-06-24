import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://eoqvfmmrbgbonbpgibsq.supabase.co';
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVvcXZmbW1yYmdib25icGdpYnNxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk0MzcxNzcsImV4cCI6MjA5NTAxMzE3N30.QuLcy9EF_FZDF0JNoAxEniifxPnPLW41_x4M8C20PCw';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

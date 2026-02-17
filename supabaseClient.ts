import { createClient } from '@supabase/supabase-js';

// Verilen anahtarlar
const SUPABASE_URL = 'https://tcvbemqaqchztmbhrdal.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjdmJlbXFhcWNoenRtYmhyZGFsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA2Mzc1OTksImV4cCI6MjA4NjIxMzU5OX0.pKbvEraM-XLEynR5EhcJy8iu6tru4YE0s80UAwDIvoI';

// Safe access helper (optional usage now, but kept for structure)
const getEnv = (key: string, fallback: string) => {
  try {
    // @ts-ignore
    if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env[key]) {
      // @ts-ignore
      return import.meta.env[key];
    }
  } catch (e) {
    // Ignore error
  }
  
  try {
    if (typeof process !== 'undefined' && process.env && process.env[key]) {
      return process.env[key];
    }
  } catch (e) {
    //kv
  }
  
  return fallback;
};

const url = getEnv('VITE_SUPABASE_URL', SUPABASE_URL);
const key = getEnv('VITE_SUPABASE_ANON_KEY', SUPABASE_ANON_KEY);

export const supabase = createClient(url, key);
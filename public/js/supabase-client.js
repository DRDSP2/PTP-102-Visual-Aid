import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm'

// PTP-102 Visual Aid - Supabase Configuration
// TODO: Replace with your actual Supabase project credentials
// Get these from: Supabase Dashboard > Project Settings > API
const supabaseUrl = localStorage.getItem('SUPABASE_URL') || 'https://vtxrmjuftqtealzymqbk.supabase.co'
const supabaseKey = localStorage.getItem('SUPABASE_ANON_KEY') || 'YOUR_ANON_KEY_HERE'

export const supabase = createClient(supabaseUrl, supabaseKey)

export function setSupabaseCredentials(url, key) {
    localStorage.setItem('SUPABASE_URL', url)
    localStorage.setItem('SUPABASE_ANON_KEY', key)
    window.location.reload()
}

// Helper to check if credentials are set
export function hasCredentials() {
    return supabaseKey !== 'YOUR_ANON_KEY_HERE' && supabaseKey.length > 20
}

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm'

const supabaseUrl = localStorage.getItem('SUPABASE_URL') || 'https://xxxx.supabase.co'
const supabaseKey = localStorage.getItem('SUPABASE_ANON_KEY') || 'eyJ...'

export const supabase = createClient(supabaseUrl, supabaseKey)

export function setSupabaseCredentials(url, key) {
    localStorage.setItem('SUPABASE_URL', url)
    localStorage.setItem('SUPABASE_ANON_KEY', key)
    window.location.reload()
}

import { createClient } from '@supabase/supabase-js';
/*
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
*/
const SUPABASE_URL= import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

//import { SUPABASE_URL, SUPABASE_ANON_KEY } from '$env/static/public'
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
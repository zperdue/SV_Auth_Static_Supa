import { writable } from 'svelte/store';
import { supabase } from './supabase';
import type { User } from '@supabase/supabase-js';

// Store user session data
//export const user = writable(null);
export const user = writable<User | null>(null);
export const loading = writable(true); // New loading state

// Check for existing session on load
async function loadUser() {
    loading.set(true);
    const { data: { session } } = await supabase.auth.getSession();

    user.set(session?.user || null);
    loading.set(false); // Done loading
}
loadUser();

// Listen for auth changes
supabase.auth.onAuthStateChange((event, session) => {
  user.set(session?.user || null);
});

// Login Function
export async function login(email: string, password: string) {
  const { error, data } = await supabase.auth.signInWithPassword({ email, password });

  if (error) throw error;
  return data;
}

// Login with Google
export async function loginGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
          redirectTo: 'http://localhost:5173/private' // Change '/dashboard' to your desired route
      }
  });

  if (error) throw error;
  return data;
}

// Logout Function
export async function logout() {
  await supabase.auth.signOut();
  user.set(null);
}


// Signup
export async function register(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({ email, password,
        options: {
          emailRedirectTo: 'http://localhost:5173/private',
        },
    })
}

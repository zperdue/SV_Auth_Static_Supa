
import type { LayoutLoad } from '../$types';
import { supabase } from '$lib/supabase';
import { goto } from '$app/navigation';

export const ssr = false;

export const load: LayoutLoad = async () => {
	const { data: { session } } = await supabase.auth.getSession();

    console.log(session);
    
    if (!session) {
        goto('/auth/login');
    }

    return { session };
};

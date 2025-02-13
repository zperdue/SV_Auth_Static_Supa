<script lang="ts">

import { logout } from '$lib/auth';
import { goto } from '$app/navigation';

async function handleLogout() {
    await logout();
    goto('/auth/login');
    //goto('/Sandbox/Testing/Svelte/Static_01/auth/login');
}

</script>
  
<button onclick={handleLogout}>Logout</button>

Well Hey there partner....





    
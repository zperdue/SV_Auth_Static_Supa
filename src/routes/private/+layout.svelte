<script lang="ts">
  
    import { goto } from '$app/navigation';
    import type { LayoutProps } from "../$types";

    let { data, children }: LayoutProps = $props();

    if (!data.session) {
        goto('/auth/login');
    }

</script>
  
{@render children()}
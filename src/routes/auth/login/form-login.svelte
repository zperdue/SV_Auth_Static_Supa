<script lang="ts">
    import * as Form from "$lib/components/ui/form";
    import { Input } from "$lib/components/ui/input";
    import { goto } from '$app/navigation';
    import { login } from '$lib/auth';
    import type { HTMLInputAttributes } from 'svelte/elements';
    type InputProps = HTMLInputAttributes;
    //import Checkbox from "$lib/components/ui/checkbox/checkbox.svelte";
    //import Mail from "lucide-svelte/icons/mail";

    import { loginSchema, type LoginSchema } from "$lib/forms/schema/schema";
    import { zod } from "sveltekit-superforms/adapters";

    import { superValidate, type SuperValidated, type Infer, superForm } from "sveltekit-superforms";
    import { zodClient } from "sveltekit-superforms/adapters";

    let { data }: { data: { form: SuperValidated<Infer<LoginSchema>> } } = $props();
    
    const form  = superForm(data.form, {
        validators: zodClient(loginSchema),
    });

    const { form: formData, enhance, message } = form;

     // Handle form submission manually
    async function handleSubmit(event: SubmitEvent) {
        event.preventDefault(); // Prevent the default form submission

        const data = {
            email: $formData.email as string,
            password: $formData.password as string,
        };

        const validatedForm = await superValidate(data, zod(loginSchema));

        if (!validatedForm.valid) {
            console.log("Not valid");
            form.errors.set(validatedForm.errors);
            return;
        }

        try {
            await login(data.email, data.password);
            goto('/private');
            //goto('/Sandbox/Testing/Svelte/Static_01/private');
        } catch (err) {
            // message.set(err.message);
            if (err instanceof Error) {
                message.set(err.message);
            } else {
                message.set(String(err));
            }
            return;
        }
    }

</script>


<form onsubmit={handleSubmit}>

    {#if $message}
        <div class="text-red-600 text-sm mb-4">{$message}</div>
    {/if}

    <Form.Field {form} name="email">
        <Form.Control >
            {#snippet children({ props }: { props: HTMLInputAttributes })}
                <!-- <Form.Label>Email</Form.Label> -->
                <Input type="email" {...props} bind:value={$formData.email} placeholder="Email Address" />
            {/snippet}
        </Form.Control>
        <Form.FieldErrors />
    </Form.Field>

    <Form.Field {form} name="password">
        <Form.Control>
            {#snippet children({ props }: { props: HTMLInputAttributes })}
                <!-- <Form.Label>Password</Form.Label> -->
                <Input type="password" {...props} bind:value={$formData.password} placeholder="Password" />
            {/snippet}
        </Form.Control>
        <Form.FieldErrors />
    </Form.Field>

    <Form.Button class="w-full">
        <!--<Mail class="mr-2 size-4" />-->
        Login with Email 
    </Form.Button>
</form>
















































































<script lang="ts">
    import * as Form from "$lib/components/ui/form";
    import { Input } from "$lib/components/ui/input";
    import { goto } from '$app/navigation';
    import { register } from '$lib/auth';
    import type { HTMLInputAttributes } from 'svelte/elements';
    type InputProps = HTMLInputAttributes;
    //import Checkbox from "$lib/components/ui/checkbox/checkbox.svelte";
    //import Mail from "lucide-svelte/icons/mail";

    import { registerSchema, type RegisterSchema } from "$lib/forms/schema/schema";
    import { zod } from "sveltekit-superforms/adapters";

    import { superValidate, type SuperValidated, type Infer, superForm } from "sveltekit-superforms";
    import { zodClient } from "sveltekit-superforms/adapters";

    let { data }: { data: { form: SuperValidated<Infer<RegisterSchema>> } } = $props();
    
    const form = superForm(data.form, {
        validators: zodClient(registerSchema),
    });

    const { form: formData, message } = form;


    // Handle form submission manually
    async function handleSubmit(event: SubmitEvent) {
        event.preventDefault(); // Prevent the default form submission

        const data = {
            email: $formData.email as string,
            password: $formData.password as string,
            confirmPassword: $formData.confirmPassword as string,
        };

        const validatedForm = await superValidate(data, zod(registerSchema));

        if (!validatedForm.valid) {
            console.log("Not valid");
            form.errors.set(validatedForm.errors);
            return;
        }

        try {
            await register(data.email, data.password);
            console.log("done")
            goto('/auth/register/confirm');
            //goto('/Sandbox/Testing/Svelte/Static_01/auth/register/confirm');
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

    <Form.Field {form} name="confirmPassword">
        <Form.Control>
            {#snippet children({ props }: { props: HTMLInputAttributes })}
                <!-- <Form.Label>Confirm Password</Form.Label> -->
                <Input type="password" {...props} bind:value={$formData.confirmPassword} placeholder="Confirm Password" />
            {/snippet}
        </Form.Control>
        <Form.FieldErrors />
    </Form.Field>
<!--
    <Form.Field {form} name="tos">
        <Form.Control>
            {#snippet children({ props })}
                <Checkbox {...props} />
                <Form.Label>Accept terms and conditions</Form.Label>              
            {/snippet}
        </Form.Control>
        <Form.FieldErrors />
    </Form.Field>

    <Form.Field {form} name="remember">
        <Form.Control>
            {#snippet children({ props })}
                <Checkbox {...props} />
                <Form.Label>Remember me on this device</Form.Label>              
            {/snippet}
        </Form.Control>
        <Form.FieldErrors />
    </Form.Field>
-->
    <Form.Button class="w-full">
       <!-- <Mail class="mr-2 size-4" />-->
        Register with Email 
    </Form.Button>
</form>



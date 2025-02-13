import { superValidate } from "sveltekit-superforms";
import { registerSchema } from "$lib/forms/schema/schema";
import { zod } from "sveltekit-superforms/adapters";

import type { PageLoad } from "./$types.js";

export const ssr = false;

export const load: PageLoad = async (event) => {
    return {
        form: await superValidate(zod(registerSchema)),
    };
};
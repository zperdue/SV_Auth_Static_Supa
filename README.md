# Boilerplate: Svelte 5 Static Auth w/SupaBase + Google OAuth

Boilerplate code for integrating client-side authorization in SvelteKit 5 w/Email (SupaBase) and Google OAuth.

Includes:
- Shadcn-svelte for UI
- Superforms + Zod
- Tailwindcss 3

## Install

Clone the repo, then:

```bash
# install node dependencies
npm install

# start up dev server
npm run dev
```
## Configuration

.env: Update with SupaBase database + project credentials & Google Cloud project credentials + routes.
/lib/forms/schema/schema.ts: Make any necessary modifications to table schema.
/lib/auth.st: Update routes in loginGoogle and signUp functions.
* May need to update routes in /auth directories if implementing different routing

## Notes

Used Tailwindcss 3 (instead of 4) due to Shadcn-svelte not seeming to play nice with Tailwindcss 4. Once resolved, should update to Tailwindcss 4.

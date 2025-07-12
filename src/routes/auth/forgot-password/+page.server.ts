import type { PageServerLoad, Actions } from './$types.js';
import { fail, redirect } from '@sveltejs/kit';
import { superValidate, setError } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { formSchema } from './schema';
import { auth } from '$lib/server/auth';
import { APIError } from 'better-auth/api';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(formSchema))
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(formSchema));

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		try {
			await auth.api.forgetPassword({
				body: {
					email: form.data.email
				}
			});
			
			// Redirect to success page or show success message
			return redirect(302, '/auth/forgot-password?sent=true');
		} catch (error) {
			if (error instanceof APIError) {
				// Don't reveal if email exists for security reasons
				return redirect(302, '/auth/forgot-password?sent=true');
			}
			console.log('Unexpected error during password reset request', error);
			return setError(form, 'Unable to process request. Please try again.');
		}
	}
};
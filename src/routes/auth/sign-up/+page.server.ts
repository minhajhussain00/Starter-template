import type { PageServerLoad, Actions } from './$types.js';
import { auth } from '$lib/server/auth.js';
import { fail} from '@sveltejs/kit';
import { signupSchema } from './schema';
import { message, setError, superValidate } from 'sveltekit-superforms/server';
import { zod } from 'sveltekit-superforms/adapters';
import { APIError } from 'better-auth/api';


export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(signupSchema))
	};
};

export const actions:Actions = {
  default: async (event) => {
	console.log("request")
	const form = await superValidate(event, zod(signupSchema));

    if (!form.valid) {
      return fail(400, { form });
    }

	console.log("atempting sing-up")
    const { email, password, firstName, lastName } = form.data;

    try {
			await auth.api.signUpEmail({
				body: {
					name:"user",
					email,
					password,

					firstName,
					lastName
				}
			});
			console.log("User created")
		} catch (error) {
			if (error instanceof APIError) {
				return setError(form, error.message || 'Signin failed');
			}
			console.log('Unexpected error during sign in', error);
			return setError(form, 'Unexpected error');
		}
		return message(
			form,
			'Your account has been created. Please check your inbox for an activation link.'
		);
	},
};

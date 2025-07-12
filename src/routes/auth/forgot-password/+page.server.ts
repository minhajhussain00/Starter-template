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
			console.log(`🔄 Processing forgot password request for email: ${form.data.email}`);
			
			await auth.api.forgetPassword({
				body: {
					email: form.data.email
				}
			});
			
			console.log('✅ Forgot password request processed successfully');
			// Redirect to success page or show success message
			return redirect(302, '/auth/forgot-password?sent=true');
		} catch (error) {
			console.error('❌ Error during password reset request:', error);
			
			if (error instanceof APIError) {
				// Check if this is an email sending error
				if (error.message?.includes('Email service not configured') || 
				    error.message?.includes('Failed to send reset password email')) {
					// This is an actual email sending error, don't hide it
					console.error('Email sending failed:', error.message);
					return setError(form, 'Unable to send reset email. Please contact support or try again later.');
				}
				// For other API errors (like user not found), still redirect to success for security
				console.log('API error (likely user not found):', error.message);
				return redirect(302, '/auth/forgot-password?sent=true');
			}
			
			console.error('Unexpected error during password reset request:', error);
			return setError(form, 'Unable to process request. Please try again.');
		}
	}
};
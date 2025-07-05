import { auth } from '$lib/server/auth';
import { redirect } from '@sveltejs/kit';
export const load = async (event) => {
	const session = await auth.api.getSession({
		headers: event.request.headers
	});

	if (!session) {
		return redirect(302, '/auth/sign-in');
	}

	return session;
};
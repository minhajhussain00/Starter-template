import { PRIVATE_RESEND_KEY } from '$env/static/private';
import { PUBLIC_BASE_URL } from '$env/static/public';
import { Resend } from 'resend';

const resend = new Resend(PRIVATE_RESEND_KEY);

export async function sendVerificationEmail(email: string, url: string, token: string) {

  const verifyUrl = url.startsWith("http")
    ? url 
    : `${PUBLIC_BASE_URL}/api/auth${url}`;
    
  const { data, error } = await resend.emails.send({
    from: 'onboarding@resend.dev', 
    to: [email],
    subject: 'Verify your email address',
    html: `
      <h2>Welcome to Acme</h2>
      <p>Please verify your email by clicking the link below:</p>
      <p><a href="${verifyUrl}">Click here</a> to verifiy your email</p>
      <p>This link will expire shortly. If you did not create an account, feel free to ignore this email.</p>
    `,
  });

  if (error) {
    console.error('Resend email errorsrsr:', error);
    throw new Error('Failed to send verification email');
  }
    console.log(data)
  return data;
}

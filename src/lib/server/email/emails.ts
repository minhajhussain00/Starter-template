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

export async function sendResetPasswordEmail(email: string, url: string, token: string) {
  
  const resetUrl = url.startsWith("http")
    ? url 
    : `${PUBLIC_BASE_URL}/auth/reset-password?token=${token}`;
    
  const { data, error } = await resend.emails.send({
    from: 'onboarding@resend.dev', 
    to: [email],
    subject: 'Reset your password',
    html: `
      <h2>Reset Your Password</h2>
      <p>You have requested to reset your password. Click the link below to reset it:</p>
      <p><a href="${resetUrl}">Reset Password</a></p>
      <p>This link will expire in 1 hour. If you did not request a password reset, feel free to ignore this email.</p>
    `,
  });

  if (error) {
    console.error('Resend email error:', error);
    throw new Error('Failed to send reset password email');
  }
  console.log(data)
  return data;
}

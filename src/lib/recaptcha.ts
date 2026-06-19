/**
 * Verifies a reCAPTCHA v3 token with Google's siteverify endpoint.
 * Returns true if the token is valid and the score is acceptable.
 */
export async function verifyRecaptcha(token: string): Promise<boolean> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;

  // If no secret is configured (e.g. local dev), skip verification.
  if (!secret) {
    console.warn('RECAPTCHA_SECRET_KEY not set — skipping verification.');
    return true;
  }

  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret, response: token }),
    });

    const data = await response.json();
    return data.success === true && (data.score ?? 1) >= 0.5;
  } catch (error) {
    console.error('reCAPTCHA verification failed:', error);
    return false;
  }
}

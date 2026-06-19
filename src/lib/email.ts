import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

interface ContactNotificationParams {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

/**
 * Sends an email notification when a new contact message arrives.
 * Silently no-ops if RESEND_API_KEY is not configured (e.g. local dev).
 */
export async function sendContactNotification(params: ContactNotificationParams) {
  if (!resend) {
    console.warn('RESEND_API_KEY not set — skipping email notification.');
    return { success: true, skipped: true };
  }

  const receiver = process.env.CONTACT_RECEIVER_EMAIL ?? 'info@dolphinpets.com';

  try {
    await resend.emails.send({
      from: 'Dolphin Website <noreply@dolphinpets.com>',
      to: receiver,
      subject: `رسالة جديدة من ${params.name}${params.subject ? ` — ${params.subject}` : ''}`,
      html: `
        <div style="font-family: sans-serif; line-height: 1.6; max-width: 600px;">
          <h2 style="color: #0F5132;">رسالة جديدة من نموذج التواصل</h2>
          <p><strong>الاسم:</strong> ${escapeHtml(params.name)}</p>
          <p><strong>البريد الإلكتروني:</strong> ${escapeHtml(params.email)}</p>
          ${params.phone ? `<p><strong>الهاتف:</strong> ${escapeHtml(params.phone)}</p>` : ''}
          ${params.subject ? `<p><strong>الموضوع:</strong> ${escapeHtml(params.subject)}</p>` : ''}
          <p><strong>الرسالة:</strong></p>
          <p style="background:#F0E9DC; padding: 12px; border-radius: 8px;">${escapeHtml(params.message)}</p>
        </div>
      `,
    });
    return { success: true };
  } catch (error) {
    console.error('Failed to send contact notification email:', error);
    return { success: false };
  }
}

/**
 * Basic HTML escaping to prevent injection in email templates.
 */
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

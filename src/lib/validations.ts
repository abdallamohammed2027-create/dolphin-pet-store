import { z } from 'zod';

/**
 * Contact form validation schema.
 * Phone is optional but validated for Egyptian mobile format when present.
 */
export const contactFormSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(150),
  phone: z
    .string()
    .trim()
    .regex(/^01[0-25][0-9]{8}$/)
    .optional()
    .or(z.literal('')),
  subject: z.string().trim().max(150).optional().or(z.literal('')),
  message: z.string().trim().min(10).max(2000),
  recaptchaToken: z.string().min(1),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;

/**
 * Newsletter subscription schema.
 */
export const newsletterSchema = z.object({
  email: z.string().trim().email().max(150),
});

export type NewsletterInput = z.infer<typeof newsletterSchema>;

/**
 * Admin login schema.
 */
export const adminLoginSchema = z.object({
  password: z.string().min(1),
});

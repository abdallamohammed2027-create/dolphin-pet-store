'use client';

import { useState, type FormEvent } from 'react';
import Script from 'next/script';
import { useTranslations } from 'next-intl';
import { Send, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

interface FormState {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const initialState: FormState = { name: '', email: '', phone: '', subject: '', message: '' };

export default function ContactForm() {
  const t = useTranslations('contact');
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [loading, setLoading] = useState(false);

  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  const validate = (): boolean => {
    const newErrors: Partial<FormState> = {};

    if (form.name.trim().length < 2) {
      newErrors.name = t('validation.nameRequired');
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = t('validation.emailInvalid');
    }
    if (form.phone && !/^01[0-25][0-9]{8}$/.test(form.phone)) {
      newErrors.phone = t('validation.phoneInvalid');
    }
    if (form.message.trim().length < 10) {
      newErrors.message = t('validation.messageMin');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getRecaptchaToken = async (): Promise<string> => {
    if (!siteKey || typeof window === 'undefined' || !window.grecaptcha) {
      return 'no-recaptcha';
    }
    return new Promise((resolve) => {
      window.grecaptcha!.ready(async () => {
        const token = await window.grecaptcha!.execute(siteKey, { action: 'contact' });
        resolve(token);
      });
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const recaptchaToken = await getRecaptchaToken();

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, recaptchaToken }),
      });
      const data = await res.json();

      if (data.success) {
        toast.success(t('success'));
        setForm(initialState);
        setErrors({});
      } else {
        toast.error(t('error'));
      }
    } catch {
      toast.error(t('error'));
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (field: keyof FormState) =>
    `w-full rounded-xl border bg-white px-4 py-3 text-sm text-charcoal placeholder:text-charcoal/40 focus:border-forest dark:bg-charcoal/30 dark:text-cream dark:placeholder:text-cream/40 ${
      errors[field] ? 'border-coral' : 'border-forest/15 dark:border-white/10'
    }`;

  return (
    <>
      {siteKey && (
        <Script src={`https://www.google.com/recaptcha/api.js?render=${siteKey}`} strategy="lazyOnload" />
      )}
      <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-semibold text-charcoal dark:text-cream">
            {t('nameLabel')}
          </label>
          <input
            id="name"
            type="text"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            placeholder={t('namePlaceholder')}
            className={inputClass('name')}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {errors.name && <p id="name-error" className="mt-1 text-xs text-coral">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-charcoal dark:text-cream">
            {t('emailLabel')}
          </label>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            placeholder={t('emailPlaceholder')}
            className={inputClass('email')}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && <p id="email-error" className="mt-1 text-xs text-coral">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-semibold text-charcoal dark:text-cream">
            {t('phoneLabel')}
          </label>
          <input
            id="phone"
            type="tel"
            value={form.phone}
            onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
            placeholder={t('phonePlaceholder')}
            className={inputClass('phone')}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
          />
          {errors.phone && <p id="phone-error" className="mt-1 text-xs text-coral">{errors.phone}</p>}
        </div>

        <div>
          <label htmlFor="subject" className="mb-1.5 block text-sm font-semibold text-charcoal dark:text-cream">
            {t('subjectLabel')}
          </label>
          <input
            id="subject"
            type="text"
            value={form.subject}
            onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
            placeholder={t('subjectPlaceholder')}
            className={inputClass('subject')}
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="message" className="mb-1.5 block text-sm font-semibold text-charcoal dark:text-cream">
            {t('messageLabel')}
          </label>
          <textarea
            id="message"
            rows={5}
            value={form.message}
            onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
            placeholder={t('messagePlaceholder')}
            className={inputClass('message')}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? 'message-error' : undefined}
          />
          {errors.message && <p id="message-error" className="mt-1 text-xs text-coral">{errors.message}</p>}
        </div>

        <div className="sm:col-span-2">
          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-forest px-6 py-3.5 text-base font-bold text-cream shadow-sm transition-all hover:bg-forest-dark hover:shadow-md active:scale-95 disabled:opacity-60 sm:w-auto"
          >
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
            {loading ? t('submitting') : t('submit')}
          </button>
        </div>
      </form>
    </>
  );
}

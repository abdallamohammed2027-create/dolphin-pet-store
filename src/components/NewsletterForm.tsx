'use client';

import { useState, type FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import { Send, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function NewsletterForm({ compact = false }: { compact?: boolean }) {
  const t = useTranslations('newsletter');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (data.success) {
        toast.success(t('success'));
        setEmail('');
      } else if (data.error === 'already_subscribed') {
        toast.error(t('alreadySubscribed'));
      } else {
        toast.error(t('error'));
      }
    } catch {
      toast.error(t('error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row">
      <label htmlFor="newsletter-email" className="sr-only">
        {t('placeholder')}
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={t('placeholder')}
        className={`w-full rounded-full border border-forest/20 bg-white px-5 py-3 text-sm text-charcoal placeholder:text-charcoal/40 focus:border-forest dark:border-white/20 dark:bg-charcoal/50 dark:text-cream dark:placeholder:text-cream/40 ${
          compact ? '' : 'sm:flex-1'
        }`}
      />
      <button
        type="submit"
        disabled={loading}
        className="flex items-center justify-center gap-2 rounded-full bg-amber px-6 py-3 text-sm font-bold text-forest-dark shadow-sm transition-all hover:bg-amber-dark hover:shadow-md active:scale-95 disabled:opacity-60"
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        {t('button')}
      </button>
    </form>
  );
}

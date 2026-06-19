'use client';

import { useState, type FormEvent } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Lock, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import PawIcon from '@/components/PawIcon';

export default function AdminLoginPage() {
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();

      if (data.success) {
        router.push(`/${locale}/admin/dashboard`);
        router.refresh();
      } else if (data.error === 'rate_limited') {
        toast.error('Too many attempts. Please wait a few minutes.');
      } else {
        toast.error('Incorrect password.');
      }
    } catch {
      toast.error('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm rounded-3xl border border-forest/10 bg-white p-8 shadow-lg dark:border-white/10 dark:bg-white/5">
        <div className="flex flex-col items-center text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-amber text-forest">
            <PawIcon className="h-8 w-8" />
          </span>
          <h1 className="mt-4 font-display text-2xl font-bold text-forest dark:text-amber-light">
            Dolphin Admin
          </h1>
          <p className="mt-1 text-sm text-charcoal/60 dark:text-cream/60">
            Sign in to manage your store
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-semibold text-charcoal dark:text-cream">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute start-4 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal/40 dark:text-cream/40" />
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-forest/15 bg-white py-3 ps-11 pe-4 text-sm text-charcoal focus:border-forest dark:border-white/10 dark:bg-charcoal/30 dark:text-cream"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-forest px-6 py-3 text-sm font-bold text-cream transition-all hover:bg-forest-dark active:scale-95 disabled:opacity-60"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

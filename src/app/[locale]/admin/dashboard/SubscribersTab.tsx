'use client';

import { useEffect, useState } from 'react';
import { Trash2, Loader2, Mail } from 'lucide-react';
import toast from 'react-hot-toast';
import type { NewsletterSubscriber } from '@/lib/supabase/database.types';

export default function SubscribersTab() {
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/subscribers')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setSubscribers(data.data);
        setLoading(false);
      });
  }, []);

  const deleteSubscriber = async (id: string) => {
    if (!confirm('Remove this subscriber?')) return;
    const res = await fetch(`/api/admin/subscribers?id=${id}`, { method: 'DELETE' });
    const data = await res.json();
    if (data.success) {
      setSubscribers((prev) => prev.filter((s) => s.id !== id));
      toast.success('Subscriber removed');
    } else {
      toast.error('Failed to remove');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-6 w-6 animate-spin text-forest" />
      </div>
    );
  }

  if (subscribers.length === 0) {
    return <p className="py-12 text-center text-charcoal/50 dark:text-cream/50">No subscribers yet.</p>;
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-forest/10 dark:border-white/10">
      <table className="w-full text-sm">
        <thead className="bg-sand dark:bg-white/5">
          <tr>
            <th className="px-4 py-3 text-start font-semibold text-charcoal dark:text-cream">Email</th>
            <th className="px-4 py-3 text-start font-semibold text-charcoal dark:text-cream">Subscribed</th>
            <th className="px-4 py-3 text-start font-semibold text-charcoal dark:text-cream">Status</th>
            <th className="px-4 py-3" />
          </tr>
        </thead>
        <tbody>
          {subscribers.map((sub) => (
            <tr key={sub.id} className="border-t border-forest/5 dark:border-white/5">
              <td className="px-4 py-3">
                <span className="flex items-center gap-2 text-charcoal dark:text-cream">
                  <Mail className="h-4 w-4 text-amber" />
                  {sub.email}
                </span>
              </td>
              <td className="px-4 py-3 text-charcoal/60 dark:text-cream/60">
                {new Date(sub.subscribed_at).toLocaleDateString()}
              </td>
              <td className="px-4 py-3">
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                    sub.is_active
                      ? 'bg-forest/10 text-forest dark:bg-amber/10 dark:text-amber-light'
                      : 'bg-charcoal/10 text-charcoal/60 dark:bg-white/10 dark:text-cream/60'
                  }`}
                >
                  {sub.is_active ? 'Active' : 'Inactive'}
                </span>
              </td>
              <td className="px-4 py-3 text-end">
                <button
                  onClick={() => deleteSubscriber(sub.id)}
                  aria-label="Remove subscriber"
                  className="flex h-8 w-8 items-center justify-center rounded-full text-coral transition-colors hover:bg-coral/10"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

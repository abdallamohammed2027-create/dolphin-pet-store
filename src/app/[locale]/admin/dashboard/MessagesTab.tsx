'use client';

import { useEffect, useState } from 'react';
import { Mail, MailOpen, Trash2, Loader2, Phone } from 'lucide-react';
import toast from 'react-hot-toast';
import type { ContactMessage } from '@/lib/supabase/database.types';

export default function MessagesTab() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = () => {
    setLoading(true);
    fetch('/api/admin/messages')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setMessages(data.data);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const toggleRead = async (msg: ContactMessage) => {
    const res = await fetch('/api/admin/messages', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: msg.id, is_read: !msg.is_read }),
    });
    const data = await res.json();
    if (data.success) {
      setMessages((prev) =>
        prev.map((m) => (m.id === msg.id ? { ...m, is_read: !m.is_read } : m))
      );
    }
  };

  const deleteMessage = async (id: string) => {
    if (!confirm('Delete this message?')) return;
    const res = await fetch(`/api/admin/messages?id=${id}`, { method: 'DELETE' });
    const data = await res.json();
    if (data.success) {
      setMessages((prev) => prev.filter((m) => m.id !== id));
      toast.success('Message deleted');
    } else {
      toast.error('Failed to delete');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-6 w-6 animate-spin text-forest" />
      </div>
    );
  }

  if (messages.length === 0) {
    return <p className="py-12 text-center text-charcoal/50 dark:text-cream/50">No messages yet.</p>;
  }

  return (
    <div className="space-y-3">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`rounded-2xl border p-4 transition-colors sm:p-5 ${
            msg.is_read
              ? 'border-forest/10 bg-white dark:border-white/10 dark:bg-white/5'
              : 'border-amber/40 bg-amber/5 dark:bg-amber/10'
          }`}
        >
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <p className="font-display font-bold text-charcoal dark:text-cream">{msg.name}</p>
              <p className="text-sm text-charcoal/60 dark:text-cream/60">{msg.email}</p>
              {msg.phone && (
                <p className="mt-0.5 flex items-center gap-1 text-sm text-charcoal/60 dark:text-cream/60">
                  <Phone className="h-3.5 w-3.5" />
                  {msg.phone}
                </p>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleRead(msg)}
                aria-label={msg.is_read ? 'Mark as unread' : 'Mark as read'}
                className="flex h-9 w-9 items-center justify-center rounded-full text-forest transition-colors hover:bg-forest/10 dark:text-amber-light dark:hover:bg-white/10"
              >
                {msg.is_read ? <MailOpen className="h-4 w-4" /> : <Mail className="h-4 w-4" />}
              </button>
              <button
                onClick={() => deleteMessage(msg.id)}
                aria-label="Delete message"
                className="flex h-9 w-9 items-center justify-center rounded-full text-coral transition-colors hover:bg-coral/10"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
          {msg.subject && (
            <p className="mt-2 text-sm font-semibold text-charcoal dark:text-cream">
              {msg.subject}
            </p>
          )}
          <p className="mt-1 text-sm text-charcoal/75 dark:text-cream/75">{msg.message}</p>
          <p className="mt-2 text-xs text-charcoal/40 dark:text-cream/40">
            {new Date(msg.created_at).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}

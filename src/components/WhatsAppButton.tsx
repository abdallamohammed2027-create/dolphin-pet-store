'use client';

import { MessageCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function WhatsAppButton() {
  const t = useTranslations('whatsapp');
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '201014410528';
  const message = encodeURIComponent(t('defaultMessage'));

  return (
    <a
      href={`https://wa.me/${whatsappNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t('label')}
      className="group fixed bottom-5 end-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110 active:scale-95 animate-paw-bounce"
    >
      <MessageCircle className="h-7 w-7" aria-hidden="true" />
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366]/40" />
    </a>
  );
}

'use client';

import { useRouter, useParams } from 'next/navigation';
import { LogOut } from 'lucide-react';
import PawIcon from '@/components/PawIcon';

export default function AdminHeader() {
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push(`/${locale}/admin/login`);
    router.refresh();
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-amber text-forest">
          <PawIcon className="h-6 w-6" />
        </span>
        <div>
          <h1 className="font-display text-xl font-bold text-forest dark:text-amber-light">
            Dolphin Admin
          </h1>
          <p className="text-sm text-charcoal/60 dark:text-cream/60">Store management dashboard</p>
        </div>
      </div>
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 rounded-full border border-forest/15 px-4 py-2 text-sm font-semibold text-forest transition-colors hover:bg-forest hover:text-cream dark:border-white/10 dark:text-amber-light"
      >
        <LogOut className="h-4 w-4" />
        Logout
      </button>
    </div>
  );
}

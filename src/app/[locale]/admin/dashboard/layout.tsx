import type { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { verifyAdminSession } from '@/lib/auth';
import AdminHeader from './AdminHeader';

export default async function DashboardLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const authorized = await verifyAdminSession();

  if (!authorized) {
    redirect(`/${locale}/admin/login`);
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <AdminHeader />
      <div className="mt-8">{children}</div>
    </div>
  );
}

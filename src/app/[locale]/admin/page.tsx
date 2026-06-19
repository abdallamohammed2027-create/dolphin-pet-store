import { redirect } from 'next/navigation';
import { verifyAdminSession } from '@/lib/auth';

export default async function AdminIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const authorized = await verifyAdminSession();
  redirect(authorized ? `/${locale}/admin/dashboard` : `/${locale}/admin/login`);
}

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard | TimeLock Contacts',
  description: 'View and manage your TimeLocks. Sent and received time capsules on one dashboard.',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

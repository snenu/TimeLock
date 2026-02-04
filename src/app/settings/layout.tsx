import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Settings | TimeLock Contacts',
  description: 'Wallet and app settings for TimeLock Contacts.',
};

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

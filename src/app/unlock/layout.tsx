import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Unlock TimeLock | TimeLock Contacts',
  description: 'View or unlock your TimeLock. Enter your encryption key to reveal the content.',
};

export default function UnlockLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

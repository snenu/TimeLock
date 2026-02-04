import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create TimeLock | TimeLock Contacts',
  description: 'Create a new TimeLock. Send messages, files, or crypto into the future with end-to-end encryption.',
};

export default function CreateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

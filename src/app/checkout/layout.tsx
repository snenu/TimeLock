import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Checkout | TimeLock Contacts',
  description: 'Upgrade to Pro for unlimited TimeLocks.',
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

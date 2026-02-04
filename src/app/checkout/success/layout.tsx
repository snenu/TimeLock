import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Success | TimeLock Contacts',
  description: 'Welcome to Pro. You now have unlimited TimeLocks.',
};

export default function CheckoutSuccessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

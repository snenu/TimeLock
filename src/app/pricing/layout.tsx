import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing | TimeLock Contacts',
  description: 'TimeLock Contacts pricing. Free tier and Pro for unlimited TimeLocks and premium features.',
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

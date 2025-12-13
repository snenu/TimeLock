'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { WalletConnect } from './wallet-connect';
import { Clock, LayoutDashboard, Plus, Settings, DollarSign, Crown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAccount } from 'wagmi';
import { useEffect, useState } from 'react';
import { getSubscription } from '@/lib/subscription';

const navItems = [
  { href: '/', label: 'Home', icon: Clock },
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/create', label: 'Create', icon: Plus },
  { href: '/pricing', label: 'Pricing', icon: DollarSign },
  { href: '/settings', label: 'Settings', icon: Settings },
];

export function Navbar() {
  const pathname = usePathname();
  const { isConnected, address } = useAccount();
  const [isPro, setIsPro] = useState(false);

  useEffect(() => {
    if (address) {
      const subscription = getSubscription(address);
      setIsPro(subscription.plan === 'pro' && subscription.status === 'active');
    }
  }, [address]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-sky-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-sky-600 to-blue-700 bg-clip-text text-transparent">
              TimeLock
            </span>
            {isPro && (
              <span className="ml-2 px-2 py-0.5 bg-sky-100 text-sky-700 text-xs font-bold rounded-full flex items-center gap-1">
                <Crown className="w-3 h-3" />
                PRO
              </span>
            )}
          </Link>

          {isConnected && (
            <div className="hidden md:flex items-center gap-1">
              {navItems.slice(1).map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                      isActive 
                        ? "bg-sky-100 text-sky-700" 
                        : "text-gray-600 hover:bg-sky-50 hover:text-sky-600"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          )}

          <WalletConnect />
        </div>
      </div>
    </nav>
  );
}
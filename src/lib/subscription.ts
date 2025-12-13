'use client';

const STORAGE_KEY = 'timelock_subscription';
const TIMELOCK_COUNT_KEY = 'timelock_count';

export interface SubscriptionData {
  walletAddress: string;
  status: 'active' | 'canceled' | 'past_due' | 'none';
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  currentPeriodEnd?: number;
  plan: 'free' | 'pro';
}

export function getSubscription(walletAddress: string): SubscriptionData {
  if (typeof window === 'undefined') {
    return { walletAddress, status: 'none', plan: 'free' };
  }
  
  const stored = localStorage.getItem(`${STORAGE_KEY}_${walletAddress}`);
  if (stored) {
    const data = JSON.parse(stored) as SubscriptionData;
    if (data.currentPeriodEnd && Date.now() / 1000 > data.currentPeriodEnd) {
      data.status = 'none';
      data.plan = 'free';
    }
    return data;
  }
  
  return { walletAddress, status: 'none', plan: 'free' };
}

export function setSubscription(data: SubscriptionData): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(`${STORAGE_KEY}_${data.walletAddress}`, JSON.stringify(data));
}

export function getTimeLockCount(walletAddress: string): number {
  if (typeof window === 'undefined') return 0;
  const stored = localStorage.getItem(`${TIMELOCK_COUNT_KEY}_${walletAddress}`);
  return stored ? parseInt(stored, 10) : 0;
}

export function incrementTimeLockCount(walletAddress: string): number {
  if (typeof window === 'undefined') return 0;
  const current = getTimeLockCount(walletAddress);
  const newCount = current + 1;
  localStorage.setItem(`${TIMELOCK_COUNT_KEY}_${walletAddress}`, newCount.toString());
  return newCount;
}

export function canCreateTimeLock(walletAddress: string): boolean {
  const subscription = getSubscription(walletAddress);
  if (subscription.plan === 'pro' && subscription.status === 'active') {
    return true;
  }
  return getTimeLockCount(walletAddress) < 10;
}

export function getRemainingTimeLocks(walletAddress: string): number | 'unlimited' {
  const subscription = getSubscription(walletAddress);
  if (subscription.plan === 'pro' && subscription.status === 'active') {
    return 'unlimited';
  }
  return Math.max(0, 10 - getTimeLockCount(walletAddress));
}

'use client';

import { useState, useEffect, Suspense } from 'react';
import { useAccount } from 'wagmi';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Check, Sparkles, Lock, Infinity, Clock, Shield, 
  Loader2, AlertCircle, Zap, Crown
} from 'lucide-react';
import { toast } from 'sonner';
import { STRIPE_PRO_PRICE_ID } from '@/lib/stripe';
import { getSubscription, getRemainingTimeLocks } from '@/lib/subscription';

const features = [
  { icon: Infinity, text: 'Unlimited TimeLocks' },
  { icon: Clock, text: 'Schedule up to 100 years ahead' },
  { icon: Shield, text: 'Priority encryption' },
  { icon: Zap, text: 'AI message enhancement' },
  { icon: Sparkles, text: 'Premium templates' },
  { icon: Crown, text: 'Early access to features' },
];

function CheckoutContent() {
  const { address, isConnected } = useAccount();
  const searchParams = useSearchParams();
  const canceled = searchParams.get('canceled');
  const [isLoading, setIsLoading] = useState(false);
  const [remaining, setRemaining] = useState<number | 'unlimited'>(10);
  const [isPro, setIsPro] = useState(false);

  useEffect(() => {
    if (address) {
      const subscription = getSubscription(address);
      setIsPro(subscription.plan === 'pro' && subscription.status === 'active');
      setRemaining(getRemainingTimeLocks(address));
    }
  }, [address]);

  useEffect(() => {
    if (canceled) {
      toast.error('Checkout was canceled');
    }
  }, [canceled]);

  const handleCheckout = async () => {
    if (!isConnected || !address) {
      toast.error('Please connect your wallet first');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          walletAddress: address,
          priceId: STRIPE_PRO_PRICE_ID,
        }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        toast.error(data.error || 'Failed to create checkout session');
      }
    } catch {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isConnected) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <Card className="p-12 text-center max-w-md border-sky-100">
          <Lock className="w-16 h-16 text-sky-300 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Connect Wallet</h2>
          <p className="text-gray-600">Connect your wallet to upgrade to Pro</p>
        </Card>
      </div>
    );
  }

  if (isPro) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <Card className="p-12 text-center max-w-md border-green-100 bg-green-50">
          <Crown className="w-16 h-16 text-green-500 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">You&apos;re Pro!</h2>
          <p className="text-gray-600 mb-6">You have unlimited TimeLocks</p>
          <Button onClick={() => window.location.href = '/create'} className="bg-green-500 hover:bg-green-600">
            Create TimeLock
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-amber-50/30 py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-2 rounded-full mb-6">
            <AlertCircle className="w-4 h-4" />
            <span className="text-sm font-medium">
              {remaining === 'unlimited' ? 'Unlimited' : remaining} TimeLocks remaining on Free plan
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Upgrade to <span className="text-sky-500">Pro</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Unlock unlimited TimeLocks and premium features
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="p-8 border-gray-200 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
                  <Lock className="w-6 h-6 text-gray-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Free</h3>
                  <p className="text-gray-500">Current plan</p>
                </div>
              </div>
              
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">$0</span>
                <span className="text-gray-500">/month</span>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-gray-600">
                  <Check className="w-5 h-5 text-gray-400" />
                  <span>10 TimeLocks total</span>
                </li>
                <li className="flex items-center gap-3 text-gray-600">
                  <Check className="w-5 h-5 text-gray-400" />
                  <span>Basic encryption</span>
                </li>
                <li className="flex items-center gap-3 text-gray-600">
                  <Check className="w-5 h-5 text-gray-400" />
                  <span>Message & file support</span>
                </li>
              </ul>

              <Button variant="outline" disabled className="w-full border-gray-200">
                Current Plan
              </Button>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-8 border-2 border-sky-500 bg-gradient-to-br from-sky-50 to-white h-full relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-sky-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                RECOMMENDED
              </div>
              
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-sky-100 flex items-center justify-center">
                  <Crown className="w-6 h-6 text-sky-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Pro</h3>
                  <p className="text-sky-600">Unlimited access</p>
                </div>
              </div>
              
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">$9.99</span>
                <span className="text-gray-500">/month</span>
              </div>

              <ul className="space-y-3 mb-8">
                {features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700">
                    <div className="w-5 h-5 rounded-full bg-sky-100 flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-3 h-3 text-sky-600" />
                    </div>
                    <span>{feature.text}</span>
                  </li>
                ))}
              </ul>

              <Button 
                onClick={handleCheckout}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 h-12 text-lg"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Loading...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Upgrade to Pro
                  </>
                )}
              </Button>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12 text-gray-500"
        >
          <p className="flex items-center justify-center gap-2">
            <Shield className="w-4 h-4" />
            Secure payment powered by Stripe
          </p>
          <p className="text-sm mt-2">Cancel anytime. No hidden fees.</p>
        </motion.div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[80vh] flex items-center justify-center">
        <Loader2 className="w-16 h-16 text-sky-500 animate-spin" />
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
}
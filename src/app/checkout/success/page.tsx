'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAccount } from 'wagmi';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Loader2, Crown, ArrowRight } from 'lucide-react';
import { setSubscription } from '@/lib/subscription';
import confetti from 'canvas-confetti';

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const { address } = useAccount();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionId || !address) return;

    const verifySubscription = async () => {
      try {
        const response = await fetch(`/api/stripe/subscription?session_id=${sessionId}`);
        const data = await response.json();

        if (data.status === 'active') {
          setSubscription({
            walletAddress: address,
            status: 'active',
            plan: 'pro',
            stripeCustomerId: data.customerId,
            stripeSubscriptionId: data.subscriptionId,
            currentPeriodEnd: data.currentPeriodEnd,
          });

          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#0ea5e9', '#3b82f6', '#6366f1'],
          });
        } else {
          setError('Subscription not active yet. Please wait...');
        }
      } catch {
        setError('Failed to verify subscription');
      } finally {
        setLoading(false);
      }
    };

    verifySubscription();
  }, [sessionId, address]);

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <Card className="p-12 text-center max-w-md border-sky-100">
          <Loader2 className="w-16 h-16 text-sky-500 mx-auto mb-6 animate-spin" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Verifying...</h2>
          <p className="text-gray-600">Confirming your subscription</p>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <Card className="p-12 text-center max-w-md border-amber-100 bg-amber-50">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Processing...</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Button onClick={() => window.location.reload()} variant="outline">
            Retry
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white py-16 px-4">
      <div className="max-w-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Card className="p-8 text-center border-sky-100">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.2 }}
              className="w-24 h-24 rounded-full bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle className="w-12 h-12 text-white" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="inline-flex items-center gap-2 bg-sky-100 text-sky-700 px-4 py-2 rounded-full mb-4">
                <Crown className="w-4 h-4" />
                <span className="font-medium">Pro Member</span>
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Welcome to Pro!
              </h1>
              <p className="text-gray-600 mb-8">
                You now have unlimited TimeLocks and access to all premium features.
              </p>

              <div className="flex flex-col gap-3">
                <Button 
                  onClick={() => window.location.href = '/create'}
                  className="w-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 h-12"
                >
                  Create TimeLock <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button 
                  onClick={() => window.location.href = '/dashboard'}
                  variant="outline"
                  className="w-full border-sky-200"
                >
                  Go to Dashboard
                </Button>
              </div>
            </motion.div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[80vh] flex items-center justify-center">
        <Loader2 className="w-16 h-16 text-sky-500 animate-spin" />
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}

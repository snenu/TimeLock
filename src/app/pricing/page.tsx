'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Check, Zap, Crown, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useAccount } from 'wagmi';

const plans = [
  {
    name: 'Free',
    price: '$0',
    description: 'Perfect for getting started',
    features: [
      'Up to 10 TimeLocks',
      'Basic encryption',
      'Message & file storage',
      'Email notifications',
      'Community support',
    ],
    icon: Sparkles,
    gradient: 'from-gray-400 to-gray-600',
    buttonText: 'Get Started',
    popular: false,
  },
  {
    name: 'Pro',
    price: '$9.99',
    period: '/month',
    description: 'For power users',
    features: [
      'Unlimited TimeLocks',
      'Advanced encryption',
      'Priority IPFS pinning',
      'AI message enhancement',
      'Custom unlock conditions',
      'Priority support',
      'Analytics dashboard',
      'Early access to features',
    ],
    icon: Zap,
    gradient: 'from-sky-400 to-blue-600',
    buttonText: 'Upgrade to Pro',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For teams and organizations',
    features: [
      'Everything in Pro',
      'White-label solution',
      'Dedicated infrastructure',
      'Custom contract deployment',
      'SLA guarantee',
      'Dedicated support',
      'Custom integrations',
      'Team management',
    ],
    icon: Crown,
    gradient: 'from-purple-400 to-indigo-600',
    buttonText: 'Contact Sales',
    popular: false,
  },
];

export default function PricingPage() {
  const { isConnected } = useAccount();

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-blue-50 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-sky-100 rounded-full text-sky-700 text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              Simple, Transparent Pricing
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-sky-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Choose Your Plan
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Start free with 10 TimeLocks. Upgrade anytime for unlimited access.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, i) => {
            const Icon = plan.icon;
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="relative"
              >
                {plan.popular && (
                  <div className="absolute -top-5 left-0 right-0 flex justify-center">
                    <span className="bg-gradient-to-r from-sky-500 to-blue-600 text-white text-sm font-bold px-4 py-1 rounded-full shadow-lg">
                      Most Popular
                    </span>
                  </div>
                )}

                <Card
                  className={`p-8 h-full flex flex-col ${
                    plan.popular
                      ? 'border-sky-300 shadow-2xl shadow-sky-200 scale-105'
                      : 'border-sky-100'
                  }`}
                >
                  <div className="mb-6">
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center mb-4`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-gray-600 mb-4">{plan.description}</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold text-gray-900">
                        {plan.price}
                      </span>
                      {plan.period && (
                        <span className="text-gray-600">{plan.period}</span>
                      )}
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8 flex-grow">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-sky-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {plan.name === 'Free' ? (
                    <Link href={isConnected ? '/create' : '/'}>
                      <Button
                        className="w-full bg-gradient-to-r from-gray-500 to-gray-700 hover:from-gray-600 hover:to-gray-800"
                        size="lg"
                      >
                        {plan.buttonText}
                      </Button>
                    </Link>
                  ) : plan.name === 'Enterprise' ? (
                    <Button
                      className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700"
                      size="lg"
                      onClick={() => window.open('mailto:sales@timelock.app', '_blank')}
                    >
                      {plan.buttonText}
                    </Button>
                  ) : (
                    <Link href="/checkout">
                      <Button
                        className={`w-full bg-gradient-to-r ${plan.gradient} hover:opacity-90`}
                        size="lg"
                      >
                        {plan.buttonText}
                      </Button>
                    </Link>
                  )}
                </Card>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center"
        >
          <Card className="max-w-4xl mx-auto p-8 bg-gradient-to-br from-sky-50 to-blue-50 border-sky-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              All plans include
            </h3>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div>
                <div className="text-sky-600 font-semibold mb-2">Security</div>
                <p className="text-gray-700 text-sm">
                  Military-grade encryption, blockchain security, IPFS storage
                </p>
              </div>
              <div>
                <div className="text-sky-600 font-semibold mb-2">Reliability</div>
                <p className="text-gray-700 text-sm">
                  99.9% uptime, automated backups, redundant storage
                </p>
              </div>
              <div>
                <div className="text-sky-600 font-semibold mb-2">Support</div>
                <p className="text-gray-700 text-sm">
                  Documentation, tutorials, community forum, email support
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

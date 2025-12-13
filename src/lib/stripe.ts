import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-05-28.basil',
});

export const STRIPE_PRO_PRICE_ID = 'price_1SdbLE6gBj1WFUnuqnVgexzH';

export const PLANS = {
  FREE: {
    name: 'Free',
    maxTimeLocks: 10,
    price: 0,
  },
  PRO: {
    name: 'Pro',
    maxTimeLocks: Infinity,
    priceMonthly: 9.99,
    priceId: STRIPE_PRO_PRICE_ID,
  },
} as const;
import Stripe from 'stripe';

const key = process.env.STRIPE_SECRET_KEY;
export const stripe = key ? new Stripe(key, { apiVersion: '2025-11-17.clover' }) : null;

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
import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function POST() {
  if (!stripe) {
    return NextResponse.json({ error: 'Stripe not configured' }, { status: 500 });
  }
  try {
    const product = await stripe.products.create({
      name: 'TimeLock Pro',
      description: 'Unlimited TimeLocks with Pro subscription',
    });

    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: 999,
      currency: 'usd',
      recurring: {
        interval: 'month',
      },
    });

    return NextResponse.json({
      productId: product.id,
      priceId: price.id,
    });
  } catch (error) {
    console.error('Stripe setup error:', error);
    return NextResponse.json(
      { error: 'Failed to setup Stripe products' },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import Stripe from 'stripe';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!stripe) {
    return NextResponse.json({ error: 'Stripe not configured' }, { status: 500 });
  }
  if (!signature) {
    return NextResponse.json(
      { error: 'No signature found' },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = await stripe.webhooks.constructEventAsync(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    );
  }

  const subscription = event.data.object as Stripe.Subscription & { current_period_end?: number; metadata?: { walletAddress?: string } };
  const walletAddress = subscription.metadata?.walletAddress;

  switch (event.type) {
    case 'customer.subscription.created':
    case 'customer.subscription.updated':
      console.log(`Subscription ${event.type}:`, {
        subscriptionId: subscription.id,
        status: subscription.status,
        walletAddress,
        currentPeriodEnd: subscription.current_period_end,
      });
      break;

    case 'customer.subscription.deleted':
      console.log('Subscription canceled:', {
        subscriptionId: subscription.id,
        walletAddress,
      });
      break;

    case 'invoice.payment_failed':
      console.log('Payment failed:', {
        subscriptionId: subscription.id,
        walletAddress,
      });
      break;

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}

'use client';

import { useAccount, useSwitchChain } from 'wagmi';
import { polygonAmoy } from '@/lib/wagmi-config';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

export function NetworkSwitcher() {
  const { chain } = useAccount();
  const { switchChain } = useSwitchChain();

  if (!chain || chain.id === polygonAmoy.id) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-md">
      <div className="bg-amber-50 border-2 border-amber-400 rounded-xl p-4 shadow-lg">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
          <div className="flex-1">
            <h4 className="font-semibold text-amber-900 mb-1">Wrong Network</h4>
            <p className="text-sm text-amber-700 mb-3">
              Please switch to Polygon Amoy Testnet to use this app.
            </p>
            <Button
              onClick={() => switchChain({ chainId: polygonAmoy.id })}
              className="bg-amber-600 hover:bg-amber-700 text-white"
              size="sm"
            >
              Switch to Polygon Amoy
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

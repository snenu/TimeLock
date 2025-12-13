'use client';

import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { Button } from '@/components/ui/button';
import { Wallet, LogOut, Loader2 } from 'lucide-react';

export function WalletConnect() {
  const { address, isConnected } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-3">
        <div className="px-4 py-2 bg-sky-100 rounded-full text-sky-700 text-sm font-medium">
          {address.slice(0, 6)}...{address.slice(-4)}
        </div>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => disconnect()}
          className="border-sky-200 hover:bg-sky-50"
        >
          <LogOut className="w-4 h-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="flex gap-2">
      {connectors.map((connector) => (
        <Button
          key={connector.uid}
          onClick={() => connect({ connector })}
          disabled={isPending}
          className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white"
        >
          {isPending ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Wallet className="w-4 h-4 mr-2" />
          )}
          {connector.name === 'Injected' ? 'MetaMask' : connector.name}
        </Button>
      ))}
    </div>
  );
}

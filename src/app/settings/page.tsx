'use client';

import { useAccount, useDisconnect, useBalance } from 'wagmi';
import { formatUnits } from 'viem';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Wallet, LogOut, Copy, ExternalLink, Shield, 
  CheckCircle, Settings, Link as LinkIcon
} from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { polygon } from '@/lib/wagmi-config';
import { CONTRACT_ADDRESS } from '@/lib/contract';

export default function SettingsPage() {
  const { address, isConnected, chain } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: balance } = useBalance({ address });

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      toast.success('Address copied!');
    }
  };

  if (!isConnected) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <Card className="p-12 text-center max-w-md border-sky-100">
          <Settings className="w-16 h-16 text-sky-300 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Connect Wallet</h2>
          <p className="text-gray-600">Connect your wallet to view settings</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-600">Manage your wallet and preferences</p>
        </div>

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="p-6 border-sky-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-sky-100 flex items-center justify-center">
                  <Wallet className="w-6 h-6 text-sky-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Wallet</h2>
                  <p className="text-sm text-gray-500">Your connected wallet details</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-sky-50 rounded-xl">
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="font-mono text-sm text-gray-900">{address}</p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={copyAddress}>
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 bg-sky-50 rounded-xl">
                  <div>
                    <p className="text-sm text-gray-500">Balance</p>
                    <p className="font-semibold text-gray-900">
                      {balance ? `${parseFloat(formatUnits(balance.value, balance.decimals)).toFixed(4)} ${balance.symbol}` : '0 POL'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-sky-50 rounded-xl">
                  <div>
                    <p className="text-sm text-gray-500">Network</p>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-900">
                        {chain?.name || 'Unknown'}
                      </span>
                      {chain?.id === polygon.id && (
                        <Badge variant="secondary" className="bg-green-100 text-green-700">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Connected
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-sky-100">
                <Button
                  variant="outline"
                  onClick={() => disconnect()}
                  className="w-full border-red-200 text-red-600 hover:bg-red-50"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Disconnect Wallet
                </Button>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="p-6 border-sky-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-sky-100 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-sky-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Contract</h2>
                  <p className="text-sm text-gray-500">TimeLock smart contract details</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-sky-50 rounded-xl">
                  <p className="text-sm text-gray-500 mb-1">Contract Address</p>
                  <div className="flex items-center gap-2">
                    <p className="font-mono text-xs text-gray-900 break-all">{CONTRACT_ADDRESS}</p>
                    <a
                      href={`https://polygonscan.com/address/${CONTRACT_ADDRESS}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sky-600 hover:text-sky-700"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                <div className="p-4 bg-sky-50 rounded-xl">
                  <p className="text-sm text-gray-500 mb-1">Network</p>
                  <p className="font-semibold text-gray-900">Polygon Mainnet (Chain ID: 137)</p>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-6 border-sky-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-sky-100 flex items-center justify-center">
                  <LinkIcon className="w-6 h-6 text-sky-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Resources</h2>
                  <p className="text-sm text-gray-500">Helpful links and tools</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <a
                  href="https://www.coinbase.com/price/polygon-ecosystem-token"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-sky-50 rounded-xl hover:bg-sky-100 transition-colors"
                >
                  <p className="font-semibold text-gray-900">Get POL</p>
                  <p className="text-sm text-gray-500">Buy POL on exchanges</p>
                </a>
                <a
                  href="https://polygonscan.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-sky-50 rounded-xl hover:bg-sky-100 transition-colors"
                >
                  <p className="font-semibold text-gray-900">PolygonScan</p>
                  <p className="text-sm text-gray-500">View transactions</p>
                </a>
                <a
                  href="https://docs.polygon.technology/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-sky-50 rounded-xl hover:bg-sky-100 transition-colors"
                >
                  <p className="font-semibold text-gray-900">Polygon Docs</p>
                  <p className="text-sm text-gray-500">Learn about Polygon</p>
                </a>
                <a
                  href="https://metamask.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-sky-50 rounded-xl hover:bg-sky-100 transition-colors"
                >
                  <p className="font-semibold text-gray-900">MetaMask</p>
                  <p className="text-sm text-gray-500">Get a wallet</p>
                </a>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

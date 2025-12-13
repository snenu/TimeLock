'use client';

import { useAccount, useReadContract } from 'wagmi';
import { CONTRACT_ADDRESS, CONTRACT_ABI, TimeLockData } from '@/lib/contract';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Clock, Plus, Lock, Unlock, Send, Inbox, 
  Calendar, Coins, FileText, Loader2 
} from 'lucide-react';
import { formatDistanceToNow, format } from 'date-fns';
import { formatEther } from 'viem';
import { useEffect, useState } from 'react';

function TimeLockCard({ lockId, isSent }: { lockId: bigint; isSent: boolean }) {
  const { data: lockData } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getTimeLock',
    args: [lockId],
    query: {
      refetchInterval: 5000,
    },
  });

  if (!lockData) return null;

  const lock = lockData as TimeLockData;
  const unlockDate = new Date(Number(lock.unlockTime) * 1000);
  const isUnlockable = Date.now() >= Number(lock.unlockTime) * 1000;
  const metadata = lock.metadata ? JSON.parse(lock.metadata) : {};

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card className="p-6 hover:shadow-lg transition-all border-sky-100 hover:border-sky-200">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              lock.isUnlocked 
                ? 'bg-green-100 text-green-600' 
                : isUnlockable 
                  ? 'bg-amber-100 text-amber-600' 
                  : 'bg-sky-100 text-sky-600'
            }`}>
              {lock.isUnlocked ? <Unlock className="w-6 h-6" /> : <Lock className="w-6 h-6" />}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">
                {metadata.title || `TimeLock #${lock.id.toString()}`}
              </h3>
              <p className="text-sm text-gray-500">{lock.lockType || 'Message'}</p>
            </div>
          </div>
          <Badge variant={lock.isUnlocked ? 'default' : isUnlockable ? 'secondary' : 'outline'}>
            {lock.isUnlocked ? 'Unlocked' : isUnlockable ? 'Ready' : 'Locked'}
          </Badge>
        </div>

        <div className="space-y-2 text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>Unlocks: {format(unlockDate, 'PPP p')}</span>
          </div>
          {!lock.isUnlocked && !isUnlockable && (
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{formatDistanceToNow(unlockDate, { addSuffix: true })}</span>
            </div>
          )}
          {Number(lock.cryptoAmount) > 0 && (
            <div className="flex items-center gap-2">
              <Coins className="w-4 h-4" />
              <span>{formatEther(lock.cryptoAmount)} POL</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-sky-50">
          <span className="text-xs text-gray-400">
            {isSent ? 'To: ' : 'From: '}
            {(isSent ? lock.recipient : lock.owner).slice(0, 6)}...
            {(isSent ? lock.recipient : lock.owner).slice(-4)}
          </span>
          <Link href={`/unlock/${lock.id.toString()}`}>
            <Button size="sm" variant="outline" className="border-sky-200 hover:bg-sky-50">
              View Details
            </Button>
          </Link>
        </div>
      </Card>
    </motion.div>
  );
}

export default function DashboardPage() {
  const { address, isConnected } = useAccount();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { data: sentLocks, isLoading: loadingSent } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getUserLocks',
    args: address ? [address] : undefined,
    query: {
      refetchInterval: 5000,
    },
  });

  const { data: receivedLocks, isLoading: loadingReceived } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getReceivedLocks',
    args: address ? [address] : undefined,
  });

  if (!mounted) return null;

  if (!isConnected) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <Card className="p-12 text-center max-w-md border-sky-100">
          <div className="w-20 h-20 rounded-2xl bg-sky-100 flex items-center justify-center mx-auto mb-6">
            <Lock className="w-10 h-10 text-sky-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Connect Your Wallet</h2>
          <p className="text-gray-600 mb-6">
            Connect your wallet to view and manage your TimeLocks
          </p>
        </Card>
      </div>
    );
  }

  const sentArray = (sentLocks as bigint[]) || [];
  const receivedArray = (receivedLocks as bigint[]) || [];
  const totalLocks = sentArray.length + receivedArray.length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">Manage your TimeLocks</p>
          </div>
          <Link href="/create">
            <Button className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Create New
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <Card className="p-6 bg-gradient-to-br from-sky-500 to-blue-600 text-white">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sky-100 text-sm">Total TimeLocks</p>
                <p className="text-3xl font-bold">{totalLocks}</p>
              </div>
            </div>
          </Card>
          <Card className="p-6 border-sky-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-sky-100 flex items-center justify-center">
                <Send className="w-6 h-6 text-sky-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Sent</p>
                <p className="text-3xl font-bold text-gray-900">{sentArray.length}</p>
              </div>
            </div>
          </Card>
          <Card className="p-6 border-sky-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-sky-100 flex items-center justify-center">
                <Inbox className="w-6 h-6 text-sky-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Received</p>
                <p className="text-3xl font-bold text-gray-900">{receivedArray.length}</p>
              </div>
            </div>
          </Card>
        </div>

        <Tabs defaultValue="sent" className="space-y-6">
          <TabsList className="bg-sky-100">
            <TabsTrigger value="sent" className="data-[state=active]:bg-white">
              <Send className="w-4 h-4 mr-2" />
              Sent ({sentArray.length})
            </TabsTrigger>
            <TabsTrigger value="received" className="data-[state=active]:bg-white">
              <Inbox className="w-4 h-4 mr-2" />
              Received ({receivedArray.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="sent">
            {loadingSent ? (
              <div className="flex justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-sky-600" />
              </div>
            ) : sentArray.length === 0 ? (
              <Card className="p-12 text-center border-sky-100">
                <Send className="w-12 h-12 text-sky-300 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">No TimeLocks sent yet</p>
                <Link href="/create">
                  <Button className="bg-sky-500 hover:bg-sky-600">Create Your First</Button>
                </Link>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {sentArray.map((lockId) => (
                  <TimeLockCard key={lockId.toString()} lockId={lockId} isSent={true} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="received">
            {loadingReceived ? (
              <div className="flex justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-sky-600" />
              </div>
            ) : receivedArray.length === 0 ? (
              <Card className="p-12 text-center border-sky-100">
                <Inbox className="w-12 h-12 text-sky-300 mx-auto mb-4" />
                <p className="text-gray-600">No TimeLocks received yet</p>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {receivedArray.map((lockId) => (
                  <TimeLockCard key={lockId.toString()} lockId={lockId} isSent={false} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
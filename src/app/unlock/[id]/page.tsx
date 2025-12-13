'use client';

import { useState, use } from 'react';
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { CONTRACT_ADDRESS, CONTRACT_ABI, TimeLockData } from '@/lib/contract';
import { fetchFromPinata, getIPFSUrl } from '@/lib/pinata';
import { decrypt } from '@/lib/encryption';
import { polygonAmoy } from 'wagmi/chains';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { 
  Lock, Unlock, Clock, Calendar, Coins, Key, 
  Loader2, CheckCircle, AlertTriangle,
  Download, ExternalLink, ArrowLeft
} from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';
import { formatEther } from 'viem';
import Link from 'next/link';

export default function UnlockPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const lockId = BigInt(resolvedParams.id);
  const { address, isConnected } = useAccount();
  const [encryptionKey, setEncryptionKey] = useState('');
  const [decryptedContent, setDecryptedContent] = useState<{
    type: string;
    title: string;
    message: string;
    timestamp: number;
  } | null>(null);
  const [isDecrypting, setIsDecrypting] = useState(false);

  const { data: lockData, isLoading } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getTimeLock',
    args: [lockId],
  });

  const { data: hash, writeContract, isPending } = useWriteContract();
  const { isLoading: isConfirming } = useWaitForTransactionReceipt({ hash });

  const lock = lockData as TimeLockData | undefined;
  const unlockDate = lock ? new Date(Number(lock.unlockTime) * 1000) : new Date();
  const isUnlockable = lock ? Date.now() >= Number(lock.unlockTime) * 1000 : false;
  const metadata = lock?.metadata ? JSON.parse(lock.metadata) : {};
  const canInteract = lock && address && (address === lock.owner || address === lock.recipient);

  const handleUnlock = () => {
    if (!lock || !canInteract) return;
    
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: 'unlock',
      args: [lockId],
      chainId: polygonAmoy.id,
    });
  };

  const handleClaimCrypto = () => {
    if (!lock || address !== lock.recipient) return;
    
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: 'claimCrypto',
      args: [lockId],
      chainId: polygonAmoy.id,
    });
  };

  const handleDecrypt = async () => {
    if (!lock || !encryptionKey) {
      toast.error('Please enter the encryption key');
      return;
    }

    setIsDecrypting(true);
    try {
      const encryptedData = await fetchFromPinata(lock.ipfsHash);
      let dataToDecrypt = encryptedData;
      
      if (typeof encryptedData === 'string' && encryptedData.startsWith('{')) {
        const parsed = JSON.parse(encryptedData);
        dataToDecrypt = parsed.content || encryptedData;
      }

      const decrypted = decrypt(dataToDecrypt, encryptionKey);
      const content = JSON.parse(decrypted);
      setDecryptedContent(content);
      toast.success('Content decrypted successfully!');
    } catch (error) {
      console.error(error);
      toast.error('Failed to decrypt. Check your encryption key.');
    } finally {
      setIsDecrypting(false);
    }
  };

  if (!isConnected) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <Card className="p-12 text-center max-w-md border-sky-100">
          <Lock className="w-16 h-16 text-sky-300 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Connect Wallet</h2>
          <p className="text-gray-600">Connect your wallet to view this TimeLock</p>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-sky-600" />
      </div>
    );
  }

  if (!lock) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <Card className="p-12 text-center max-w-md border-sky-100">
          <AlertTriangle className="w-16 h-16 text-amber-400 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Not Found</h2>
          <p className="text-gray-600 mb-6">This TimeLock does not exist</p>
          <Link href="/dashboard">
            <Button className="bg-sky-500 hover:bg-sky-600">Go to Dashboard</Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-sky-600 hover:text-sky-700 mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="p-8 border-sky-100">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
                  lock.isUnlocked 
                    ? 'bg-green-100 text-green-600' 
                    : isUnlockable 
                      ? 'bg-amber-100 text-amber-600' 
                      : 'bg-sky-100 text-sky-600'
                }`}>
                  {lock.isUnlocked ? <Unlock className="w-8 h-8" /> : <Lock className="w-8 h-8" />}
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {metadata.title || `TimeLock #${lock.id.toString()}`}
                  </h1>
                  <p className="text-gray-500">{lock.lockType || 'Message'}</p>
                </div>
              </div>
              <Badge 
                variant={lock.isUnlocked ? 'default' : isUnlockable ? 'secondary' : 'outline'}
                className="text-base px-4 py-1"
              >
                {lock.isUnlocked ? 'Unlocked' : isUnlockable ? 'Ready to Unlock' : 'Locked'}
              </Badge>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 bg-sky-50 rounded-xl">
                  <Calendar className="w-5 h-5 text-sky-600" />
                  <div>
                    <p className="text-sm text-gray-500">Unlock Date</p>
                    <p className="font-medium text-gray-900">{format(unlockDate, 'PPP p')}</p>
                  </div>
                </div>
                
                {!lock.isUnlocked && !isUnlockable && (
                  <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-xl">
                    <Clock className="w-5 h-5 text-amber-600" />
                    <div>
                      <p className="text-sm text-gray-500">Time Remaining</p>
                      <p className="font-medium text-gray-900">{formatDistanceToNow(unlockDate)}</p>
                    </div>
                  </div>
                )}

                {Number(lock.cryptoAmount) > 0 && (
                  <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-xl">
                    <Coins className="w-5 h-5 text-purple-600" />
                    <div>
                      <p className="text-sm text-gray-500">Crypto Amount</p>
                      <p className="font-medium text-gray-900">{formatEther(lock.cryptoAmount)} POL</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-500 mb-1">From</p>
                  <p className="font-mono text-sm text-gray-900 break-all">{lock.owner}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-500 mb-1">To</p>
                  <p className="font-mono text-sm text-gray-900 break-all">{lock.recipient}</p>
                </div>
              </div>
            </div>

            {!lock.isUnlocked && isUnlockable && canInteract && (
              <div className="mb-8">
                <Button
                  onClick={handleUnlock}
                  disabled={isPending || isConfirming}
                  className="w-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 py-6 text-lg"
                >
                  {isPending || isConfirming ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Unlocking...
                    </>
                  ) : (
                    <>
                      <Unlock className="w-5 h-5 mr-2" />
                      Unlock Now
                    </>
                  )}
                </Button>
              </div>
            )}

            {lock.isUnlocked && (
              <div className="border-t border-sky-100 pt-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">View Content</h2>
                
                {!decryptedContent ? (
                  <div className="space-y-4">
                    <div>
                      <Label>Encryption Key</Label>
                      <div className="flex gap-2 mt-2">
                        <Input
                          type="password"
                          placeholder="Enter your encryption key..."
                          value={encryptionKey}
                          onChange={(e) => setEncryptionKey(e.target.value)}
                          className="border-sky-200"
                        />
                        <Button
                          onClick={handleDecrypt}
                          disabled={isDecrypting || !encryptionKey}
                          className="bg-sky-500 hover:bg-sky-600"
                        >
                          {isDecrypting ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Key className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <div className="p-6 bg-gradient-to-br from-sky-50 to-blue-50 rounded-xl border border-sky-100">
                      <div className="flex items-center gap-2 mb-4">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="font-medium text-green-700">Content Decrypted</span>
                      </div>
                      
                      {decryptedContent.title && (
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">
                          {decryptedContent.title}
                        </h3>
                      )}
                      
                      {decryptedContent.type === 'message' && (
                        <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                          {decryptedContent.message}
                        </p>
                      )}

                      {decryptedContent.type === 'file' && decryptedContent.message && (
                        <div className="mt-4">
                          <a 
                            href={getIPFSUrl(decryptedContent.message)} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-sky-200 text-sky-600 hover:bg-sky-50"
                          >
                            <Download className="w-4 h-4" />
                            Download File
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      )}

                      <p className="text-sm text-gray-400 mt-4">
                        Created: {format(new Date(decryptedContent.timestamp), 'PPP p')}
                      </p>
                    </div>
                  </motion.div>
                )}

                {lock.isUnlocked && !lock.isClaimed && Number(lock.cryptoAmount) > 0 && address === lock.recipient && (
                  <div className="mt-6">
                    <Button
                      onClick={handleClaimCrypto}
                      disabled={isPending || isConfirming}
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 py-6"
                    >
                      {isPending || isConfirming ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Claiming...
                        </>
                      ) : (
                        <>
                          <Coins className="w-5 h-5 mr-2" />
                          Claim {formatEther(lock.cryptoAmount)} POL
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </div>
            )}

            {!lock.isUnlocked && !isUnlockable && (
              <div className="bg-sky-50 rounded-xl p-6 text-center">
                <Lock className="w-12 h-12 text-sky-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  This TimeLock is Still Sealed
                </h3>
                <p className="text-gray-600">
                  Come back in {formatDistanceToNow(unlockDate)} to unlock it
                </p>
              </div>
            )}
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
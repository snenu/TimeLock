'use client';

import { useState, useEffect } from 'react';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther } from 'viem';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '@/lib/contract';
import { uploadToPinata } from '@/lib/pinata';
import { polygonAmoy } from 'wagmi/chains';
import { encrypt, generateEncryptionKey, hashKey } from '@/lib/encryption';
import { canCreateTimeLock, getRemainingTimeLocks, incrementTimeLockCount, getSubscription } from '@/lib/subscription';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, FileText, Coins, Calendar as CalendarIcon, Clock,
  Upload, Sparkles, Lock, Loader2, CheckCircle, ArrowRight, 
  Heart, Gift, Users, Baby, AlertTriangle, Crown
} from 'lucide-react';
import { format, addDays, addMonths, addYears } from 'date-fns';
import { cn } from '@/lib/utils';

const lockTypes = [
  { value: 'message', label: 'Message', icon: Mail, description: 'Send a text message' },
  { value: 'file', label: 'File', icon: FileText, description: 'Upload photos, videos, docs' },
  { value: 'crypto', label: 'Crypto', icon: Coins, description: 'Schedule POL transfer' },
];

const recipientTypes = [
  { value: 'self', label: 'Future Self', icon: Clock },
  { value: 'partner', label: 'Partner', icon: Heart },
  { value: 'family', label: 'Family', icon: Users },
  { value: 'child', label: 'Child', icon: Baby },
  { value: 'friend', label: 'Friend', icon: Gift },
  { value: 'custom', label: 'Custom', icon: Mail },
];

const quickDates = [
  { label: '1 Week', getValue: () => addDays(new Date(), 7) },
  { label: '1 Month', getValue: () => addMonths(new Date(), 1) },
  { label: '6 Months', getValue: () => addMonths(new Date(), 6) },
  { label: '1 Year', getValue: () => addYears(new Date(), 1) },
  { label: '5 Years', getValue: () => addYears(new Date(), 5) },
  { label: '10 Years', getValue: () => addYears(new Date(), 10) },
];

export default function CreatePage() {
  const { address, isConnected } = useAccount();
  const [step, setStep] = useState(1);
  const [lockType, setLockType] = useState('message');
  const [recipientType, setRecipientType] = useState('self');
  const [recipientAddress, setRecipientAddress] = useState('');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [cryptoAmount, setCryptoAmount] = useState('');
  const [unlockDate, setUnlockDate] = useState<Date | undefined>(addMonths(new Date(), 1));
  const [unlockHour, setUnlockHour] = useState('12');
  const [unlockMinute, setUnlockMinute] = useState('00');
  const [isUploading, setIsUploading] = useState(false);
  const [encryptionKey, setEncryptionKey] = useState('');
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [remaining, setRemaining] = useState<number | 'unlimited'>(10);
  const [isPro, setIsPro] = useState(false);

  const { data: hash, writeContract, isPending } = useWriteContract();
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  useEffect(() => {
    if (address) {
      const subscription = getSubscription(address);
      setIsPro(subscription.plan === 'pro' && subscription.status === 'active');
      setRemaining(getRemainingTimeLocks(address));
    }
  }, [address]);

  useEffect(() => {
    if (isSuccess && address) {
      incrementTimeLockCount(address);
      setRemaining(getRemainingTimeLocks(address));
      toast.success('TimeLock created successfully!', {
        description: 'View it in your dashboard',
        action: {
          label: 'View Dashboard',
          onClick: () => window.location.href = '/dashboard',
        },
      });
    }
  }, [isSuccess, address]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const enhanceWithAI = async () => {
    if (!message) {
      toast.error('Please enter a message first');
      return;
    }
    
    toast.loading('Enhancing with AI...');
    try {
      const response = await fetch('/api/enhance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, recipientType }),
      });
      const data = await response.json();
      if (data.enhanced) {
        setMessage(data.enhanced);
        toast.dismiss();
        toast.success('Message enhanced!');
      }
    } catch {
      toast.dismiss();
      toast.error('AI enhancement failed');
    }
  };

  const handleSubmit = async () => {
    if (!isConnected || !address) {
      toast.error('Please connect your wallet');
      return;
    }

    if (!canCreateTimeLock(address)) {
      setShowUpgradeModal(true);
      return;
    }

    const recipient = recipientType === 'self' ? address : recipientAddress;
    if (!recipient || !/^0x[a-fA-F0-9]{40}$/.test(recipient)) {
      toast.error('Please enter a valid recipient address');
      return;
    }

    if (!unlockDate) {
      toast.error('Please select an unlock date');
      return;
    }

    setIsUploading(true);

    try {
      const key = generateEncryptionKey();
      setEncryptionKey(key);
      
      let ipfsHash = '';
      const contentData = {
        type: lockType,
        title,
        message: lockType === 'message' ? message : '',
        timestamp: Date.now(),
      };

      if (lockType === 'file' && file) {
        const encryptedContent = encrypt(JSON.stringify(contentData), key);
        ipfsHash = await uploadToPinata(encryptedContent, `timelock-${Date.now()}`);
        const fileHash = await uploadToPinata(file, file.name);
        contentData.message = fileHash;
      } else {
        const encryptedContent = encrypt(JSON.stringify(contentData), key);
        ipfsHash = await uploadToPinata(encryptedContent, `timelock-${Date.now()}`);
      }

      const keyHash = hashKey(key);
      
      const unlockDateTime = new Date(unlockDate);
      unlockDateTime.setHours(parseInt(unlockHour), parseInt(unlockMinute), 0, 0);
      const unlockTimestamp = BigInt(Math.floor(unlockDateTime.getTime() / 1000));

      const metadata = JSON.stringify({
        title,
        recipientType,
        lockType,
        createdAt: Date.now(),
      });

      writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'createTimeLock',
        args: [
          recipient as `0x${string}`,
          ipfsHash,
          keyHash,
          unlockTimestamp,
          lockType,
          metadata,
        ],
        value: lockType === 'crypto' && cryptoAmount ? parseEther(cryptoAmount) : BigInt(0),
        chainId: polygonAmoy.id,
      });

      toast.success('Transaction submitted! Waiting for confirmation...');
    } catch (error) {
      console.error(error);
      toast.error('Failed to create TimeLock');
    } finally {
      setIsUploading(false);
    }
  };

  if (!isConnected) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <Card className="p-12 text-center max-w-md border-sky-100">
          <Lock className="w-16 h-16 text-sky-300 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Connect Wallet</h2>
          <p className="text-gray-600">Connect your wallet to create a TimeLock</p>
        </Card>
      </div>
    );
  }

  if (isSuccess && encryptionKey) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white py-12 px-4">
        <div className="max-w-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Card className="p-8 text-center border-sky-100">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">TimeLock Created!</h2>
              <p className="text-gray-600 mb-6">Your message is now locked and will be delivered at the scheduled time.</p>
              
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
                <div className="flex items-center gap-2 text-amber-700 mb-2">
                  <AlertTriangle className="w-5 h-5" />
                  <span className="font-semibold">Save Your Encryption Key!</span>
                </div>
                <p className="text-sm text-amber-600 mb-3">You need this key to decrypt your content</p>
                <code className="block bg-white p-3 rounded-lg text-xs break-all text-gray-800 border border-amber-200">
                  {encryptionKey}
                </code>
              </div>

              <div className="flex gap-4">
                <Button 
                  onClick={() => navigator.clipboard.writeText(encryptionKey)}
                  variant="outline"
                  className="flex-1 border-sky-200"
                >
                  Copy Key
                </Button>
                <Button 
                  onClick={() => window.location.href = '/dashboard'}
                  className="flex-1 bg-sky-500 hover:bg-sky-600"
                >
                  Go to Dashboard
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create TimeLock</h1>
          <p className="text-gray-600">Send a message, file, or crypto into the future</p>
          
          <div className="mt-4 inline-flex items-center gap-2">
            {isPro ? (
              <span className="bg-sky-100 text-sky-700 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                <Crown className="w-4 h-4" />
                Pro - Unlimited TimeLocks
              </span>
            ) : (
              <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm font-medium">
                {remaining} TimeLocks remaining
              </span>
            )}
          </div>
        </div>

        {/* Upgrade Modal */}
        <AnimatePresence>
          {showUpgradeModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
              onClick={() => setShowUpgradeModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <Card className="p-8 max-w-md bg-white">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-4">
                      <AlertTriangle className="w-8 h-8 text-amber-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Free Limit Reached</h2>
                    <p className="text-gray-600 mb-6">
                      You&apos;ve used all 10 free TimeLocks. Upgrade to Pro for unlimited access.
                    </p>
                    <div className="flex flex-col gap-3">
                      <Button 
                        onClick={() => window.location.href = '/checkout'}
                        className="w-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700"
                      >
                        <Crown className="w-4 h-4 mr-2" />
                        Upgrade to Pro - $9.99/mo
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => setShowUpgradeModal(false)}
                        className="w-full border-gray-200"
                      >
                        Maybe Later
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center justify-center gap-2 mb-10">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all",
                step >= s 
                  ? "bg-sky-500 text-white" 
                  : "bg-sky-100 text-sky-400"
              )}
            >
              {s}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Card className="p-8 border-sky-100">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">What do you want to send?</h2>
                
                <div className="grid grid-cols-3 gap-4 mb-8">
                  {lockTypes.map((type) => (
                    <button
                      key={type.value}
                      onClick={() => setLockType(type.value)}
                      className={cn(
                        "p-6 rounded-xl border-2 transition-all text-center",
                        lockType === type.value
                          ? "border-sky-500 bg-sky-50"
                          : "border-gray-200 hover:border-sky-200"
                      )}
                    >
                      <type.icon className={cn(
                        "w-8 h-8 mx-auto mb-2",
                        lockType === type.value ? "text-sky-600" : "text-gray-400"
                      )} />
                      <p className="font-medium text-gray-900">{type.label}</p>
                      <p className="text-xs text-gray-500 mt-1">{type.description}</p>
                    </button>
                  ))}
                </div>

                <h2 className="text-xl font-semibold text-gray-900 mb-4">Who is the recipient?</h2>
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {recipientTypes.map((type) => (
                    <button
                      key={type.value}
                      onClick={() => {
                        setRecipientType(type.value);
                        if (type.value === 'self' && address) {
                          setRecipientAddress(address);
                        }
                      }}
                      className={cn(
                        "p-4 rounded-xl border-2 transition-all",
                        recipientType === type.value
                          ? "border-sky-500 bg-sky-50"
                          : "border-gray-200 hover:border-sky-200"
                      )}
                    >
                      <type.icon className={cn(
                        "w-6 h-6 mx-auto mb-1",
                        recipientType === type.value ? "text-sky-600" : "text-gray-400"
                      )} />
                      <p className="text-sm font-medium text-gray-900">{type.label}</p>
                    </button>
                  ))}
                </div>

                {recipientType !== 'self' && (
                  <div className="mb-6">
                    <Label>Recipient Wallet Address</Label>
                    <Input
                      placeholder="0x..."
                      value={recipientAddress}
                      onChange={(e) => setRecipientAddress(e.target.value)}
                      className="mt-2 border-sky-200 focus:ring-sky-500"
                    />
                  </div>
                )}

                <Button 
                  onClick={() => setStep(2)}
                  className="w-full bg-sky-500 hover:bg-sky-600"
                >
                  Continue <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Card>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Card className="p-8 border-sky-100">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Create Your Content</h2>

                <div className="space-y-6">
                  <div>
                    <Label>Title</Label>
                    <Input
                      placeholder="Give your TimeLock a name..."
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="mt-2 border-sky-200"
                    />
                  </div>

                  {lockType === 'message' && (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Label>Message</Label>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={enhanceWithAI}
                          className="text-sky-600 hover:text-sky-700"
                        >
                          <Sparkles className="w-4 h-4 mr-1" />
                          Enhance with AI
                        </Button>
                      </div>
                      <Textarea
                        placeholder="Write your heartfelt message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="min-h-[200px] border-sky-200"
                      />
                    </div>
                  )}

                  {lockType === 'file' && (
                    <div>
                      <Label>Upload File</Label>
                      <div className="mt-2 border-2 border-dashed border-sky-200 rounded-xl p-8 text-center hover:border-sky-400 transition-colors">
                        <input
                          type="file"
                          onChange={handleFileChange}
                          className="hidden"
                          id="file-upload"
                        />
                        <label htmlFor="file-upload" className="cursor-pointer">
                          <Upload className="w-12 h-12 text-sky-400 mx-auto mb-4" />
                          {file ? (
                            <p className="text-sky-600 font-medium">{file.name}</p>
                          ) : (
                            <>
                              <p className="text-gray-600 mb-1">Click to upload or drag and drop</p>
                              <p className="text-sm text-gray-400">Images, videos, documents up to 50MB</p>
                            </>
                          )}
                        </label>
                      </div>
                    </div>
                  )}

                  {lockType === 'crypto' && (
                    <div>
                      <Label>POL Amount</Label>
                      <div className="relative mt-2">
                        <Coins className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="0.00"
                          value={cryptoAmount}
                          onChange={(e) => setCryptoAmount(e.target.value)}
                          className="pl-10 border-sky-200"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex gap-4 mt-8">
                  <Button variant="outline" onClick={() => setStep(1)} className="flex-1 border-sky-200">
                    Back
                  </Button>
                  <Button onClick={() => setStep(3)} className="flex-1 bg-sky-500 hover:bg-sky-600">
                    Continue <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Card className="p-8 border-sky-100">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Set Unlock Date & Time</h2>

                <div className="grid grid-cols-3 gap-2 mb-6">
                  {quickDates.map((qd) => (
                    <Button
                      key={qd.label}
                      variant="outline"
                      size="sm"
                      onClick={() => setUnlockDate(qd.getValue())}
                      className="border-sky-200 hover:bg-sky-50"
                    >
                      {qd.label}
                    </Button>
                  ))}
                </div>

                <div className="flex gap-4 mb-6">
                  <div className="flex-1">
                    <Label>Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal mt-2 border-sky-200",
                            !unlockDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {unlockDate ? format(unlockDate, 'PPP') : 'Pick a date'}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={unlockDate}
                          onSelect={setUnlockDate}
                          disabled={(date) => date < new Date()}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="w-24">
                    <Label>Hour</Label>
                    <Select value={unlockHour} onValueChange={setUnlockHour}>
                      <SelectTrigger className="mt-2 border-sky-200">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 24 }, (_, i) => (
                          <SelectItem key={i} value={i.toString().padStart(2, '0')}>
                            {i.toString().padStart(2, '0')}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="w-24">
                    <Label>Minute</Label>
                    <Select value={unlockMinute} onValueChange={setUnlockMinute}>
                      <SelectTrigger className="mt-2 border-sky-200">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {['00', '15', '30', '45'].map((m) => (
                          <SelectItem key={m} value={m}>{m}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {unlockDate && (
                  <div className="bg-sky-50 rounded-xl p-4 mb-6">
                    <div className="flex items-center gap-2 text-sky-700">
                      <Clock className="w-5 h-5" />
                      <span className="font-medium">
                        Unlocks on {format(unlockDate, 'PPPP')} at {unlockHour}:{unlockMinute}
                      </span>
                    </div>
                  </div>
                )}

                <div className="flex gap-4">
                  <Button variant="outline" onClick={() => setStep(2)} className="flex-1 border-sky-200">
                    Back
                  </Button>
                  <Button 
                    onClick={handleSubmit}
                    disabled={isPending || isUploading || isConfirming}
                    className="flex-1 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700"
                  >
                    {(isPending || isUploading || isConfirming) ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        {isUploading ? 'Uploading...' : isConfirming ? 'Confirming...' : 'Creating...'}
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4 mr-2" />
                        Create TimeLock
                      </>
                    )}
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
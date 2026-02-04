'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './dialog';
import { Button } from './button';
import { Input } from './input';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Share2, Copy, Check, Twitter, Mail, QrCode, ExternalLink } from 'lucide-react';
import QRCode from 'react-qr-code';
import { cn } from '@/lib/utils';

interface ShareDialogProps {
    lockId: string;
    title?: string;
    children?: React.ReactNode;
}

export function ShareDialog({ lockId, title, children }: ShareDialogProps) {
    const [copied, setCopied] = useState(false);
    const [showQR, setShowQR] = useState(false);

    const shareUrl = typeof window !== 'undefined'
        ? `${window.location.origin}/unlock/${lockId}`
        : `/unlock/${lockId}`;

    const handleCopy = async () => {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        toast.success('Link copied to clipboard!');
        setTimeout(() => setCopied(false), 2000);
    };

    const handleTwitterShare = () => {
        const text = title
            ? `Check out my TimeLock: "${title}" 🔐⏰`
            : `Check out this TimeLock! 🔐⏰`;
        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`;
        window.open(url, '_blank');
    };

    const handleEmailShare = () => {
        const subject = title ? `TimeLock: ${title}` : 'Check out this TimeLock!';
        const body = `I've created a TimeLock message for you! Open it here: ${shareUrl}`;
        window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                {children || (
                    <Button variant="outline" size="sm" className="border-sky-200 hover:bg-sky-50">
                        <Share2 className="w-4 h-4 mr-2" />
                        Share
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Share2 className="w-5 h-5 text-sky-600" />
                        Share TimeLock
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-6 py-4">
                    {/* URL Input */}
                    <div className="flex items-center gap-2">
                        <Input
                            value={shareUrl}
                            readOnly
                            className="font-mono text-sm border-sky-200"
                        />
                        <Button
                            onClick={handleCopy}
                            variant="outline"
                            size="icon"
                            className={cn(
                                "shrink-0 transition-colors",
                                copied ? "bg-green-50 border-green-300" : "border-sky-200"
                            )}
                        >
                            {copied ? (
                                <Check className="w-4 h-4 text-green-600" />
                            ) : (
                                <Copy className="w-4 h-4" />
                            )}
                        </Button>
                    </div>

                    {/* Share Options */}
                    <div className="grid grid-cols-3 gap-3">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleTwitterShare}
                            className="flex flex-col items-center gap-2 p-4 rounded-xl bg-sky-50 hover:bg-sky-100 transition-colors"
                        >
                            <div className="w-10 h-10 rounded-full bg-sky-500 flex items-center justify-center">
                                <Twitter className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-sm font-medium text-gray-700">Twitter</span>
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleEmailShare}
                            className="flex flex-col items-center gap-2 p-4 rounded-xl bg-purple-50 hover:bg-purple-100 transition-colors"
                        >
                            <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center">
                                <Mail className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-sm font-medium text-gray-700">Email</span>
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setShowQR(!showQR)}
                            className={cn(
                                "flex flex-col items-center gap-2 p-4 rounded-xl transition-colors",
                                showQR ? "bg-gray-100" : "bg-gray-50 hover:bg-gray-100"
                            )}
                        >
                            <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                                <QrCode className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-sm font-medium text-gray-700">QR Code</span>
                        </motion.button>
                    </div>

                    {/* QR Code Display */}
                    {showQR && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="flex flex-col items-center gap-4 p-6 bg-white border border-sky-100 rounded-xl"
                        >
                            <div className="p-4 bg-white rounded-lg shadow-sm border">
                                <QRCode value={shareUrl} size={160} />
                            </div>
                            <p className="text-sm text-gray-500 text-center">
                                Scan this QR code to open the TimeLock
                            </p>
                        </motion.div>
                    )}

                    {/* Open Link Button */}
                    <Button
                        onClick={() => window.open(shareUrl, '_blank')}
                        variant="outline"
                        className="w-full border-sky-200 hover:bg-sky-50"
                    >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Open in New Tab
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

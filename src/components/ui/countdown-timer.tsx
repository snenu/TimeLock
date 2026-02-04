'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CountdownTimerProps {
    targetDate: Date;
    onComplete?: () => void;
    className?: string;
    compact?: boolean;
}

interface TimeUnit {
    value: number;
    label: string;
}

export function CountdownTimer({
    targetDate,
    onComplete,
    className,
    compact = false
}: CountdownTimerProps) {
    const [timeLeft, setTimeLeft] = useState<TimeUnit[]>([]);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        const calculateTimeLeft = () => {
            const difference = targetDate.getTime() - Date.now();

            if (difference <= 0) {
                setIsComplete(true);
                onComplete?.();
                return [
                    { value: 0, label: 'Days' },
                    { value: 0, label: 'Hrs' },
                    { value: 0, label: 'Mins' },
                    { value: 0, label: 'Secs' },
                ];
            }

            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((difference / (1000 * 60)) % 60);
            const seconds = Math.floor((difference / 1000) % 60);

            return [
                { value: days, label: 'Days' },
                { value: hours, label: 'Hrs' },
                { value: minutes, label: 'Mins' },
                { value: seconds, label: 'Secs' },
            ];
        };

        setTimeLeft(calculateTimeLeft());
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate, onComplete]);

    if (isComplete) {
        return (
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className={cn(
                    "flex items-center justify-center gap-2 p-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl text-white",
                    className
                )}
            >
                <motion.span
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="text-2xl"
                >
                    🎉
                </motion.span>
                <span className="font-bold text-lg">Ready to Unlock!</span>
                <motion.span
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5, delay: 0.5 }}
                    className="text-2xl"
                >
                    🎉
                </motion.span>
            </motion.div>
        );
    }

    if (compact) {
        return (
            <div className={cn("flex items-center gap-1 text-sm font-mono", className)}>
                {timeLeft.map((unit, i) => (
                    <span key={unit.label} className="flex items-center">
                        <span className="font-bold text-sky-600">
                            {unit.value.toString().padStart(2, '0')}
                        </span>
                        {i < timeLeft.length - 1 && <span className="text-gray-400 mx-0.5">:</span>}
                    </span>
                ))}
            </div>
        );
    }

    return (
        <div className={cn("flex items-center justify-center gap-2 md:gap-4", className)}>
            <AnimatePresence mode="popLayout">
                {timeLeft.map((unit, index) => (
                    <motion.div
                        key={unit.label}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex flex-col items-center"
                    >
                        <div className="relative">
                            <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center shadow-lg shadow-sky-500/30">
                                <AnimatePresence mode="popLayout">
                                    <motion.span
                                        key={unit.value}
                                        initial={{ y: -20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: 20, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="text-2xl md:text-3xl font-bold text-white font-mono"
                                    >
                                        {unit.value.toString().padStart(2, '0')}
                                    </motion.span>
                                </AnimatePresence>
                            </div>
                            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-12 h-1 bg-sky-600/30 rounded-full blur-sm" />
                        </div>
                        <span className="mt-2 text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">
                            {unit.label}
                        </span>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}

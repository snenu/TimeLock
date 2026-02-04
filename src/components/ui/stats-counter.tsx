'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

interface StatsCounterProps {
    value: number;
    suffix?: string;
    prefix?: string;
    label: string;
    icon?: React.ReactNode;
    className?: string;
    duration?: number;
}

export function StatsCounter({
    value,
    suffix = '',
    prefix = '',
    label,
    icon,
    className,
    duration = 2,
}: StatsCounterProps) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    useEffect(() => {
        if (!isInView) return;

        let startTime: number;
        let animationFrame: number;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);

            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            setCount(Math.floor(easeOutQuart * value));

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);

        return () => {
            if (animationFrame) {
                cancelAnimationFrame(animationFrame);
            }
        };
    }, [isInView, value, duration]);

    const formatNumber = (num: number) => {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        }
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toLocaleString();
    };

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className={cn(
                "flex flex-col items-center p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-sky-100 shadow-lg",
                className
            )}
        >
            {icon && (
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center mb-4 shadow-lg shadow-sky-500/20">
                    {icon}
                </div>
            )}
            <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">
                {prefix}
                <span className="tabular-nums">{formatNumber(count)}</span>
                {suffix}
            </div>
            <p className="text-sm text-gray-500 font-medium">{label}</p>
        </motion.div>
    );
}

interface StatsGridProps {
    stats: Array<{
        value: number;
        label: string;
        suffix?: string;
        prefix?: string;
        icon?: React.ReactNode;
    }>;
    className?: string;
}

export function StatsGrid({ stats, className }: StatsGridProps) {
    return (
        <div className={cn("grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6", className)}>
            {stats.map((stat, index) => (
                <StatsCounter
                    key={stat.label}
                    {...stat}
                    duration={2 + index * 0.3}
                />
            ))}
        </div>
    );
}

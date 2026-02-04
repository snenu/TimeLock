'use client';

import { useEffect, useState } from 'react';
import ReactConfetti from 'react-confetti';

interface ConfettiProps {
    trigger?: boolean;
    duration?: number;
}

export function Confetti({ trigger = true, duration = 5000 }: ConfettiProps) {
    const [showConfetti, setShowConfetti] = useState(trigger);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        setDimensions({
            width: window.innerWidth,
            height: window.innerHeight,
        });

        const handleResize = () => {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (trigger) {
            setShowConfetti(true);
            const timer = setTimeout(() => setShowConfetti(false), duration);
            return () => clearTimeout(timer);
        }
    }, [trigger, duration]);

    if (!showConfetti) return null;

    return (
        <ReactConfetti
            width={dimensions.width}
            height={dimensions.height}
            recycle={false}
            numberOfPieces={200}
            gravity={0.3}
            colors={['#4db8e8', '#60d5f5', '#87ceeb', '#7c3aed', '#f59e0b', '#10b981']}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                zIndex: 1000,
                pointerEvents: 'none',
            }}
        />
    );
}

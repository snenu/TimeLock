'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useAccount } from 'wagmi';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { 
  Clock, Heart, Users, Gift, Lock, Sparkles, ArrowRight,
  Calendar, MapPin, Zap, Mail, Brain
} from 'lucide-react';

const useCases = [
  { icon: Heart, label: 'Love Letters' },
  { icon: Gift, label: 'Birthday Wishes' },
  { icon: Users, label: 'Family Messages' },
  { icon: Calendar, label: 'Anniversary' },
  { icon: MapPin, label: 'Location Unlock' },
  { icon: Zap, label: 'Condition-Based' },
];

export function LandingPage() {
  const { isConnected } = useAccount();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#f0f9ff] to-[#e0f4ff] relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[700px] h-[700px] bg-[#87ceeb]/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -left-40 w-[600px] h-[600px] bg-[#60d5f5]/8 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-[550px] h-[550px] bg-[#b0e6ff]/12 rounded-full blur-3xl" />
        
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(135,206,235,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(96,213,245,0.06),transparent_50%)]" />
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(135,206,235,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(135,206,235,0.04) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      <section className="relative pt-28 pb-44 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-10"
          >
            <span className="inline-flex items-center gap-2 px-6 py-3 bg-white/90 backdrop-blur-xl rounded-full text-[#4db8e8] text-sm font-bold border border-[#87ceeb]/40 shadow-lg shadow-[#87ceeb]/20">
              <Sparkles className="w-4 h-4" />
              POWERED BY POLYGON BLOCKCHAIN
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-7xl md:text-9xl font-extrabold mb-10 leading-[1.05] tracking-tighter"
          >
            <span className="bg-gradient-to-r from-[#4db8e8] via-[#60d5f5] to-[#87ceeb] bg-clip-text text-transparent">
              SEND MESSAGES
            </span>
            <br />
            <span className="text-[#2c3e50]">INTO THE FUTURE</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="text-2xl text-gray-600 max-w-3xl mx-auto mb-14 leading-relaxed font-medium"
          >
            Craft time capsules, digital legacies, and scheduled crypto transfers. 
            <br className="hidden md:block" />
            <span className="text-[#4db8e8] font-bold">Your memories, unlocked at the perfect moment.</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            {isConnected ? (
              <Link href="/create">
                <Button size="lg" className="bg-gradient-to-r from-[#4db8e8] to-[#60d5f5] hover:from-[#60d5f5] hover:to-[#87ceeb] text-white text-lg px-12 py-8 rounded-2xl shadow-xl shadow-[#87ceeb]/30 hover:shadow-[#87ceeb]/50 transition-all duration-300 font-bold border border-[#60d5f5]/20">
                  CREATE TIMELOCK
                  <ArrowRight className="w-6 h-6 ml-2" />
                </Button>
              </Link>
            ) : (
              <Button size="lg" className="bg-gradient-to-r from-[#4db8e8]/60 to-[#60d5f5]/60 text-white text-lg px-12 py-8 rounded-2xl shadow-lg font-bold opacity-60" disabled>
                CONNECT WALLET TO START
              </Button>
            )}
            <Link href="/dashboard">
              <Button size="lg" variant="outline" className="text-lg px-12 py-8 rounded-2xl border-2 border-[#4db8e8] text-[#4db8e8] hover:bg-[#4db8e8]/5 hover:border-[#60d5f5] transition-all duration-300 font-bold backdrop-blur-sm bg-white/50">
                VIEW DASHBOARD
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.6 }}
            className="mt-24 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#87ceeb]/20 to-[#60d5f5]/20 rounded-[2.5rem] blur-2xl opacity-40" />
            <Card className="relative bg-white/95 backdrop-blur-2xl rounded-[2.5rem] p-12 shadow-2xl border-2 border-[#87ceeb]/30 max-w-6xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
                {useCases.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + i * 0.1 }}
                    className="flex items-center gap-5 p-5 rounded-2xl hover:bg-[#f0f9ff] transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-lg border border-transparent hover:border-[#87ceeb]/20"
                  >
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#60d5f5] to-[#87ceeb] flex items-center justify-center shadow-lg">
                      <item.icon className="w-7 h-7 text-white" />
                    </div>
                    <span className="font-bold text-[#2c3e50] text-lg tracking-tight">{item.label}</span>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      <section className="relative py-36 px-4 bg-gradient-to-b from-[#f0f9ff]/80 to-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <span className="inline-flex items-center gap-2 px-6 py-3 bg-white/90 backdrop-blur-xl rounded-full text-[#4db8e8] text-sm font-bold border border-[#87ceeb]/40 shadow-lg shadow-[#87ceeb]/20 mb-10">
              <Sparkles className="w-4 h-4" />
              TRANSPARENT PRICING
            </span>
            <h2 className="text-6xl md:text-7xl font-extrabold text-[#2c3e50] mb-8 tracking-tighter">
              Start Free, Upgrade When Ready
            </h2>
            <p className="text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Begin with 10 free TimeLocks. Need unlimited? Upgrade to Pro for advanced features.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto mb-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Card className="p-12 text-left border-2 border-gray-200 bg-white/90 backdrop-blur-xl hover:border-[#87ceeb]/40 hover:shadow-2xl transition-all duration-300 h-full rounded-3xl">
                <div className="text-gray-500 font-bold mb-4 text-lg uppercase tracking-wider">Free Tier</div>
                <div className="mb-8">
                  <span className="text-6xl font-extrabold text-[#2c3e50]">$0</span>
                </div>
                <ul className="space-y-5">
                  <li className="flex items-center gap-5 text-gray-600 text-lg">
                    <Heart className="w-7 h-7 text-[#87ceeb]" />
                    <span className="font-medium">10 TimeLocks total</span>
                  </li>
                  <li className="flex items-center gap-5 text-gray-600 text-lg">
                    <Lock className="w-7 h-7 text-[#87ceeb]" />
                    <span className="font-medium">Basic encryption</span>
                  </li>
                  <li className="flex items-center gap-5 text-gray-600 text-lg">
                    <Mail className="w-7 h-7 text-[#87ceeb]" />
                    <span className="font-medium">Messages & files</span>
                  </li>
                </ul>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Card className="p-12 text-left border-3 border-[#60d5f5] bg-gradient-to-br from-white via-[#f0f9ff] to-white backdrop-blur-xl hover:shadow-2xl hover:shadow-[#87ceeb]/20 transition-all duration-300 h-full relative rounded-3xl overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#87ceeb]/15 to-[#60d5f5]/15 rounded-full blur-2xl" />
                <div className="absolute top-6 right-6 bg-gradient-to-r from-[#4db8e8] to-[#60d5f5] text-white text-xs font-extrabold px-5 py-2.5 rounded-full shadow-xl">
                  POPULAR
                </div>
                <div className="text-[#4db8e8] font-bold mb-4 text-lg relative z-10 uppercase tracking-wider">Pro Plan</div>
                <div className="mb-8 relative z-10">
                  <span className="text-6xl font-extrabold text-[#2c3e50]">$9.99</span>
                  <span className="text-gray-500 text-xl">/month</span>
                </div>
                <ul className="space-y-5 mb-10 relative z-10">
                  <li className="flex items-center gap-5 text-gray-600 text-lg">
                    <Sparkles className="w-7 h-7 text-[#4db8e8]" />
                    <span className="font-medium">Unlimited TimeLocks</span>
                  </li>
                  <li className="flex items-center gap-5 text-gray-600 text-lg">
                    <Lock className="w-7 h-7 text-[#4db8e8]" />
                    <span className="font-medium">Priority encryption</span>
                  </li>
                  <li className="flex items-center gap-5 text-gray-600 text-lg">
                    <Brain className="w-7 h-7 text-[#4db8e8]" />
                    <span className="font-medium">AI enhancement</span>
                  </li>
                </ul>
                <Link href="/pricing" className="relative z-10">
                  <Button className="w-full bg-gradient-to-r from-[#4db8e8] to-[#60d5f5] hover:from-[#60d5f5] hover:to-[#87ceeb] text-white py-7 text-lg rounded-2xl shadow-xl font-bold border border-[#60d5f5]/20">
                    SEE ALL FEATURES <ArrowRight className="w-6 h-6 ml-2" />
                  </Button>
                </Link>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative py-36 px-4 bg-gradient-to-br from-[#f0f9ff] via-white to-[#e0f4ff] overflow-hidden backdrop-blur-sm">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(135,206,235,0.12),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(96,213,245,0.1),transparent_50%)]" />
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#4db8e8] to-[#60d5f5] flex items-center justify-center mx-auto mb-10 shadow-2xl shadow-[#87ceeb]/30">
              <Clock className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-6xl md:text-7xl font-extrabold text-[#2c3e50] mb-10 tracking-tighter">
              Start Your Time Capsule Today
            </h2>
            <p className="text-2xl text-gray-600 mb-14 leading-relaxed max-w-2xl mx-auto">
              Your future self and loved ones will thank you for preserving these moments
            </p>
            {isConnected ? (
              <Link href="/create">
                <Button size="lg" className="bg-gradient-to-r from-[#4db8e8] to-[#60d5f5] hover:from-[#60d5f5] hover:to-[#87ceeb] text-white text-lg px-14 py-8 rounded-2xl shadow-2xl shadow-[#87ceeb]/40 font-extrabold border-2 border-[#60d5f5]/20">
                  CREATE YOUR FIRST TIMELOCK
                  <ArrowRight className="w-6 h-6 ml-2" />
                </Button>
              </Link>
            ) : (
              <p className="text-xl text-[#4db8e8] font-bold">Connect your wallet to get started</p>
            )}
          </motion.div>
        </div>
      </section>

      <footer className="py-20 px-4 bg-white relative border-t border-gray-200">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#4db8e8] to-[#60d5f5] flex items-center justify-center shadow-xl">
              <Clock className="w-8 h-8 text-white" />
            </div>
            <span className="text-3xl font-extrabold text-[#2c3e50] tracking-tight">TIMELOCK CONTACTS</span>
          </div>
          <p className="text-gray-500 text-lg font-medium">
            Built with Polygon Blockchain, Pinata IPFS, and Gemini AI
          </p>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
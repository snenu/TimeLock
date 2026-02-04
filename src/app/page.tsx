'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useAccount } from 'wagmi';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import {
  Clock, Heart, Users, Gift, Lock, Sparkles, ArrowRight,
  Calendar, MapPin, Zap, Mail, Brain, Shield, FileText,
  Twitter, Github, MessageCircle, ChevronRight, Star,
  Coins, Timer, CheckCircle2
} from 'lucide-react';
import { StatsGrid } from '@/components/ui/stats-counter';

const useCases = [
  { icon: Heart, label: 'Love Letters' },
  { icon: Gift, label: 'Birthday Wishes' },
  { icon: Users, label: 'Family Messages' },
  { icon: Calendar, label: 'Anniversary' },
  { icon: MapPin, label: 'Location Unlock' },
  { icon: Zap, label: 'Condition-Based' },
];

const howItWorks = [
  { step: 1, title: 'Connect Wallet', description: 'Link your MetaMask or WalletConnect wallet', icon: Lock },
  { step: 2, title: 'Create Content', description: 'Write a message, upload files, or attach crypto', icon: FileText },
  { step: 3, title: 'Set Unlock Time', description: 'Choose when your TimeLock becomes accessible', icon: Timer },
  { step: 4, title: 'Store Securely', description: 'AES-256 encrypted and stored on IPFS + blockchain', icon: Shield },
];

const testimonials = [
  {
    name: 'Sarah M.',
    role: 'Mother',
    quote: 'I created TimeLocks for my children to open on their 18th birthdays. It\'s the most meaningful gift I\'ve ever given.',
    avatar: '👩'
  },
  {
    name: 'David K.',
    role: 'Entrepreneur',
    quote: 'Scheduled crypto payments to my team made easy. The blockchain security gives me complete peace of mind.',
    avatar: '👨‍💼'
  },
  {
    name: 'Emily R.',
    role: 'Newlywed',
    quote: 'My husband and I exchange anniversary TimeLocks every year. It\'s become our most treasured tradition.',
    avatar: '👰'
  },
];

const stats = [
  { value: 12847, label: 'TimeLocks Created', icon: <Lock className="w-6 h-6 text-white" /> },
  { value: 8234, label: 'Active Users', icon: <Users className="w-6 h-6 text-white" /> },
  { value: 45230, prefix: '$', label: 'POL Secured', icon: <Coins className="w-6 h-6 text-white" /> },
  { value: 99, suffix: '%', label: 'Uptime', icon: <CheckCircle2 className="w-6 h-6 text-white" /> },
];

export function LandingPage() {
  const { isConnected } = useAccount();
  const [mounted, setMounted] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
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

      {/* Hero Section */}
      <section className="relative pt-28 pb-32 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-10"
          >
            <span className="inline-flex items-center gap-2 px-6 py-3 bg-white/90 backdrop-blur-xl rounded-full text-[#4db8e8] text-sm font-bold border border-[#87ceeb]/40 shadow-lg shadow-[#87ceeb]/20">
              <Sparkles className="w-4 h-4" />
              PRODUCTION READY • POLYGON BLOCKCHAIN
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-6xl md:text-8xl lg:text-9xl font-extrabold mb-10 leading-[1.05] tracking-tighter"
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
            className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-14 leading-relaxed font-medium"
          >
            Create time capsules, digital legacies, and scheduled crypto transfers with
            <span className="text-[#4db8e8] font-bold"> end-to-end encryption</span> on the blockchain.
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
        </div>
      </section>

      {/* Live Stats Section */}
      <section className="relative py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <StatsGrid stats={stats} />
          </motion.div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#87ceeb]/20 to-[#60d5f5]/20 rounded-[2.5rem] blur-2xl opacity-40" />
            <Card className="relative bg-white/95 backdrop-blur-2xl rounded-[2.5rem] p-12 shadow-2xl border-2 border-[#87ceeb]/30">
              <h3 className="text-2xl font-bold text-center text-[#2c3e50] mb-10">Perfect For Every Occasion</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-10">
                {useCases.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-4 md:gap-5 p-4 md:p-5 rounded-2xl hover:bg-[#f0f9ff] transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-lg border border-transparent hover:border-[#87ceeb]/20"
                  >
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-[#60d5f5] to-[#87ceeb] flex items-center justify-center shadow-lg shrink-0">
                      <item.icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
                    </div>
                    <span className="font-bold text-[#2c3e50] text-base md:text-lg tracking-tight">{item.label}</span>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative py-24 px-4 bg-gradient-to-b from-transparent to-[#f0f9ff]/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 px-6 py-3 bg-white/90 backdrop-blur-xl rounded-full text-[#4db8e8] text-sm font-bold border border-[#87ceeb]/40 shadow-lg shadow-[#87ceeb]/20 mb-8">
              <Zap className="w-4 h-4" />
              SIMPLE 4-STEP PROCESS
            </span>
            <h2 className="text-5xl md:text-6xl font-extrabold text-[#2c3e50] tracking-tighter">
              How It Works
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6">
            {howItWorks.map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <Card className="h-full p-6 bg-white/90 backdrop-blur-xl border-2 border-[#87ceeb]/20 hover:border-[#60d5f5]/50 hover:shadow-xl transition-all duration-300 rounded-2xl text-center">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#4db8e8] to-[#60d5f5] flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#87ceeb]/30">
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#f0f9ff] flex items-center justify-center mx-auto mb-4 text-[#4db8e8] font-bold">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-bold text-[#2c3e50] mb-2">{item.title}</h3>
                  <p className="text-gray-500 text-sm">{item.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 px-6 py-3 bg-white/90 backdrop-blur-xl rounded-full text-[#4db8e8] text-sm font-bold border border-[#87ceeb]/40 shadow-lg shadow-[#87ceeb]/20 mb-8">
              <Star className="w-4 h-4" />
              LOVED BY USERS
            </span>
            <h2 className="text-5xl md:text-6xl font-extrabold text-[#2c3e50] tracking-tighter">
              What People Say
            </h2>
          </motion.div>

          <div className="relative">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, x: 50 }}
                animate={{
                  opacity: activeTestimonial === index ? 1 : 0,
                  x: activeTestimonial === index ? 0 : 50,
                  position: activeTestimonial === index ? 'relative' : 'absolute'
                }}
                transition={{ duration: 0.5 }}
                className={`w-full ${activeTestimonial !== index ? 'pointer-events-none' : ''}`}
              >
                <Card className="p-8 md:p-10 bg-white/95 backdrop-blur-xl border-2 border-[#87ceeb]/30 rounded-3xl shadow-xl">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#87ceeb]/20 to-[#60d5f5]/20 flex items-center justify-center text-3xl">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h4 className="font-bold text-[#2c3e50] text-lg">{testimonial.name}</h4>
                      <p className="text-gray-500">{testimonial.role}</p>
                    </div>
                    <div className="ml-auto flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xl text-gray-700 leading-relaxed italic">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                </Card>
              </motion.div>
            ))}

            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all ${activeTestimonial === index
                      ? 'bg-[#4db8e8] w-8'
                      : 'bg-[#87ceeb]/30 hover:bg-[#87ceeb]/50'
                    }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
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
            <h2 className="text-5xl md:text-6xl font-extrabold text-[#2c3e50] mb-8 tracking-tighter">
              Start Free, Upgrade When Ready
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Begin with 10 free TimeLocks. Need unlimited? Upgrade to Pro for advanced features.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Card className="p-8 md:p-10 text-left border-2 border-gray-200 bg-white/90 backdrop-blur-xl hover:border-[#87ceeb]/40 hover:shadow-2xl transition-all duration-300 h-full rounded-3xl">
                <div className="text-gray-500 font-bold mb-4 text-base uppercase tracking-wider">Free Tier</div>
                <div className="mb-8">
                  <span className="text-5xl md:text-6xl font-extrabold text-[#2c3e50]">$0</span>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-center gap-4 text-gray-600">
                    <Heart className="w-6 h-6 text-[#87ceeb]" />
                    <span className="font-medium">10 TimeLocks total</span>
                  </li>
                  <li className="flex items-center gap-4 text-gray-600">
                    <Lock className="w-6 h-6 text-[#87ceeb]" />
                    <span className="font-medium">AES-256 encryption</span>
                  </li>
                  <li className="flex items-center gap-4 text-gray-600">
                    <Mail className="w-6 h-6 text-[#87ceeb]" />
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
              <Card className="p-8 md:p-10 text-left border-3 border-[#60d5f5] bg-gradient-to-br from-white via-[#f0f9ff] to-white backdrop-blur-xl hover:shadow-2xl hover:shadow-[#87ceeb]/20 transition-all duration-300 h-full relative rounded-3xl overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#87ceeb]/15 to-[#60d5f5]/15 rounded-full blur-2xl" />
                <div className="absolute top-6 right-6 bg-gradient-to-r from-[#4db8e8] to-[#60d5f5] text-white text-xs font-extrabold px-4 py-2 rounded-full shadow-xl">
                  POPULAR
                </div>
                <div className="text-[#4db8e8] font-bold mb-4 text-base relative z-10 uppercase tracking-wider">Pro Plan</div>
                <div className="mb-8 relative z-10">
                  <span className="text-5xl md:text-6xl font-extrabold text-[#2c3e50]">$9.99</span>
                  <span className="text-gray-500 text-lg">/month</span>
                </div>
                <ul className="space-y-4 mb-8 relative z-10">
                  <li className="flex items-center gap-4 text-gray-600">
                    <Sparkles className="w-6 h-6 text-[#4db8e8]" />
                    <span className="font-medium">Unlimited TimeLocks</span>
                  </li>
                  <li className="flex items-center gap-4 text-gray-600">
                    <Lock className="w-6 h-6 text-[#4db8e8]" />
                    <span className="font-medium">Priority encryption</span>
                  </li>
                  <li className="flex items-center gap-4 text-gray-600">
                    <Brain className="w-6 h-6 text-[#4db8e8]" />
                    <span className="font-medium">AI enhancement</span>
                  </li>
                </ul>
                <Link href="/pricing" className="relative z-10 block">
                  <Button className="w-full bg-gradient-to-r from-[#4db8e8] to-[#60d5f5] hover:from-[#60d5f5] hover:to-[#87ceeb] text-white py-6 text-base rounded-2xl shadow-xl font-bold border border-[#60d5f5]/20">
                    SEE ALL FEATURES <ChevronRight className="w-5 h-5 ml-1" />
                  </Button>
                </Link>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 px-4 bg-gradient-to-br from-[#f0f9ff] via-white to-[#e0f4ff] overflow-hidden backdrop-blur-sm">
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
            <h2 className="text-5xl md:text-6xl font-extrabold text-[#2c3e50] mb-8 tracking-tighter">
              Start Your Time Capsule Today
            </h2>
            <p className="text-xl text-gray-600 mb-12 leading-relaxed max-w-2xl mx-auto">
              Your future self and loved ones will thank you for preserving these moments
            </p>
            {isConnected ? (
              <Link href="/create">
                <Button size="lg" className="bg-gradient-to-r from-[#4db8e8] to-[#60d5f5] hover:from-[#60d5f5] hover:to-[#87ceeb] text-white text-lg px-12 py-8 rounded-2xl shadow-2xl shadow-[#87ceeb]/40 font-extrabold border-2 border-[#60d5f5]/20">
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

      {/* Footer */}
      <footer className="py-16 px-4 bg-[#2c3e50] text-white relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#4db8e8] to-[#60d5f5] flex items-center justify-center shadow-lg">
                  <Clock className="w-7 h-7 text-white" />
                </div>
                <span className="text-2xl font-extrabold tracking-tight">TIMELOCK</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-sm">
                Send messages, files, and crypto into the future with blockchain security and end-to-end encryption.
              </p>
              <div className="flex gap-4">
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                  <Github className="w-5 h-5" />
                </a>
                <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                  <MessageCircle className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-lg">Product</h4>
              <ul className="space-y-3 text-gray-400">
                <li><Link href="/create" className="hover:text-white transition-colors">Create TimeLock</Link></li>
                <li><Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
                <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="/settings" className="hover:text-white transition-colors">Settings</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-lg">Resources</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="https://faucet.polygon.technology/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Get Test POL</a></li>
                <li><a href="https://amoy.polygonscan.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">PolygonScan</a></li>
                <li><a href="https://docs.polygon.technology/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Polygon Docs</a></li>
                <li><a href="https://metamask.io/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">MetaMask</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm">
              © 2026 TimeLock. Built with Polygon Blockchain, Pinata IPFS, and Gemini AI.
            </p>
            <div className="flex items-center gap-6 text-gray-400 text-sm">
              <span>Network: Polygon Amoy</span>
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span>All Systems Operational</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
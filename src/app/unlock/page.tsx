'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
import { Unlock, Search, ArrowRight } from 'lucide-react';

export default function UnlockIndexPage() {
  const [lockId, setLockId] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (lockId) {
      router.push(`/unlock/${lockId}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white py-12 px-4">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-10">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center mx-auto mb-6">
            <Unlock className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Unlock TimeLock</h1>
          <p className="text-gray-600">Enter a TimeLock ID to view or unlock it</p>
        </div>

        <Card className="p-8 border-sky-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label>TimeLock ID</Label>
              <div className="relative mt-2">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="number"
                  placeholder="Enter TimeLock ID (e.g., 1, 2, 3...)"
                  value={lockId}
                  onChange={(e) => setLockId(e.target.value)}
                  className="pl-10 border-sky-200"
                />
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={!lockId}
              className="w-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700"
            >
              View TimeLock
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}

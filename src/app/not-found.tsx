import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Clock, Home, LayoutDashboard, Plus } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white flex items-center justify-center px-4">
      <Card className="p-12 text-center max-w-md border-sky-100">
        <div className="w-20 h-20 rounded-2xl bg-sky-100 flex items-center justify-center mx-auto mb-6">
          <Clock className="w-10 h-10 text-sky-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Page not found</h1>
        <p className="text-gray-600 mb-8">
          This page doesn&apos;t exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild className="bg-sky-500 hover:bg-sky-600">
            <Link href="/" className="inline-flex items-center gap-2">
              <Home className="w-4 h-4" />
              Home
            </Link>
          </Button>
          <Button asChild variant="outline" className="border-sky-200">
            <Link href="/dashboard" className="inline-flex items-center gap-2">
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </Link>
          </Button>
          <Button asChild variant="outline" className="border-sky-200">
            <Link href="/create" className="inline-flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Create
            </Link>
          </Button>
        </div>
      </Card>
    </div>
  );
}

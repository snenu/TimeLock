import { Loader2 } from 'lucide-react';

export default function UnlockIdLoading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <Loader2 className="w-10 h-10 text-sky-500 animate-spin" />
    </div>
  );
}

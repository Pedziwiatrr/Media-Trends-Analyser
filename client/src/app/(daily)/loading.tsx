import { Loader2 } from 'lucide-react';
import { Box } from '@/components/Box';
import { DailyHeader } from './_components/DailyHeader';

export default function Loading() {
  return (
    <Box>
      <DailyHeader />

      <div className="w-full flex flex-col items-center justify-center py-20">
        <Loader2 className="w-12 h-12 text-indigo-500 animate-spin mb-4" />
        <h3 className="text-xl font-medium text-white">Fetching Reports...</h3>
        <p className="text-gray-400 text-sm mt-2">
          Retrieving daily analysis and statistics
        </p>
      </div>
    </Box>
  );
}

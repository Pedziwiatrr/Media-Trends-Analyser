'use client';

import { useState } from 'react';
import { DailyCard } from './DailyCard';
import type { DailyReport } from '@/types/dailyReport';

type DailyListProps = {
  data: DailyReport[];
};

export function DailyList({ data }: DailyListProps) {
  const [openDate, setOpenDate] = useState<string | null>(
    data[0]?.date || null
  );

  const handleToggle = (date: string) => {
    setOpenDate((previous) => (previous === date ? null : date));
  };

  return (
    <div className="flex flex-col gap-4">
      {data.map((dayData) => (
        <DailyCard
          key={dayData.date}
          data={dayData}
          isOpen={openDate === dayData.date}
          onToggle={() => handleToggle(dayData.date)}
        />
      ))}
    </div>
  );
}

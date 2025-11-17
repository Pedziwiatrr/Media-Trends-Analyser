'use client';

interface AnalyticsTabProps {
  startDate: string;
  endDate: string;
  selectedSources: string[];
}

export default function AnalyticsTab({
  startDate,
  endDate,
  selectedSources,
}: AnalyticsTabProps) {
  const sourcesText =
    selectedSources.length > 0
      ? selectedSources.join(', ')
      : 'No data sources selected.';

  return (
    <div className="bg-gray-900 p-6 rounded-xl shadow-2xl border border-gray-700 min-h-[500px] text-center mx-auto max-w-7xl">
      <h2 className="text-3xl font-bold text-white mb-4">Trend Analytics</h2>
      <p className="text-gray-400 mb-6">
        Analytics for period:{' '}
        <span className="text-gray-400 mb-6">
          {startDate || '...'} - {endDate || '...'}
        </span>{' '}
        Selected data sources: {sourcesText}.
      </p>
      <div className="text-gray-500 italic"></div>
    </div>
  );
}

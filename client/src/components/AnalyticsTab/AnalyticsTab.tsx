import { Box } from '@/components/Box';
import { CategoryPieChart } from '@/components/PieChart/CategoryPieChart';

type CategoryData = {
  name: string;
  value: number;
};

type AnalyticsTabProps = {
  startDate: string;
  endDate: string;
  selectedSources: string[];
  categoryData: CategoryData[];
};

export function AnalyticsTab({
  startDate,
  endDate,
  selectedSources,
  categoryData,
}: AnalyticsTabProps) {
  const sourcesText =
    selectedSources.length > 0
      ? selectedSources.join(', ')
      : 'No data sources selected.';

  return (
    <Box className="min-h-[500px] text-center flex flex-col">
      <h2 className="text-3xl font-bold text-white mb-4">Trend Analytics</h2>
      <p className="text-gray-400 mb-2">
        Analytics for period: {startDate || '...'} - {endDate || '...'}
      </p>
      <p className="text-gray-400 mb-6">
        Selected data sources: {sourcesText}.
      </p>

      <CategoryPieChart data={categoryData} />
    </Box>
  );
}

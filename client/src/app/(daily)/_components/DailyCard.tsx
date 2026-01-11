'use client';

import { useState, useMemo } from 'react';
import { BarChart3, Info } from 'lucide-react';
import { SourceCard } from '@/components/SourceCard';
import { CategoryPieChart } from '@/components/charts/PieChart';
import { type Category, getCategoryConfig } from '@/constants/categories';
import type { DailyReport } from '@/types/dailyReport';
import type { Source } from '@/constants/sources';
import { DailyHeader } from './DailyHeader';

type DailyCardProps = {
  data: DailyReport;
};

export function DailyCard({ data }: DailyCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<Category>('Politics');

  const { topCategories, pieData } = useMemo(() => {
    const totals: Record<string, number> = {};

    Object.values(data.categories).forEach((sourceCats) => {
      Object.entries(sourceCats).forEach(([category, count]) => {
        totals[category] = (totals[category] || 0) + count;
      });
    });

    const total = Object.values(totals).reduce((a, b) => a + b, 0);

    const sorted = Object.entries(totals)
      .sort(([, a], [, b]) => b - a)
      .map(([category, count]) => ({
        category,
        count,
        percent: total > 0 ? Math.round((count / total) * 100) : 0,
      }));

    const pieData = sorted.map((item) => ({
      name: item.category,
      value: item.percent,
    }));

    return { topCategories: sorted, pieData };
  }, [data]);

  const availableCategories = useMemo(() => {
    const categories = new Set<Category>();

    Object.values(data.summaries).forEach((sourceData) => {
      Object.keys(sourceData).forEach((category) => {
        const typedCategory = category as Category;
        categories.add(typedCategory);
      });
    });

    return Array.from(categories).sort();
  }, [data]);

  const currentCategory = availableCategories.includes(activeCategory)
    ? activeCategory
    : availableCategories[0];

  return (
    <div className="bg-white/4 border border-white/10 rounded-xl overflow-hidden transition-all duration-300 hover:border-white/20">
      <DailyHeader
        date={data.date}
        topCategories={topCategories}
        isOpen={isOpen}
        onToggle={() => setIsOpen(!isOpen)}
      />

      {isOpen && (
        <div className="border-t border-white/5 bg-black/20">
          <div className="p-6 border-b border-white/5 flex flex-col gap-6">
            <div className="text-sm text-gray-400 leading-relaxed max-w-3xl">
              <strong className="text-white block mb-1">
                Select a Category
              </strong>
              Explore how different sources covered the key topics of the day.
              Click a category below to filter the summaries.
            </div>

            <div className="flex flex-wrap gap-2">
              {availableCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`
                    px-4 py-2 rounded-full text-sm font-medium transition-all border
                    ${
                      currentCategory === category
                        ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/25'
                        : 'bg-white/5 border-white/5 text-gray-400 hover:bg-white/10 hover:text-white hover:border-white/10'
                    }
                  `}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(data.summaries).map(([sourceName, categories]) => {
              const summaryText = categories[currentCategory];

              if (!summaryText) return null;

              const typedSource = sourceName as Source;
              const sourceCounts = data.categories[typedSource];

              return (
                <SourceCard
                  key={sourceName}
                  source={typedSource}
                  text={summaryText}
                  categoryCounts={sourceCounts}
                />
              );
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center border-t border-white/5 bg-black/20 p-6 md:p-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-indigo-400" />
                <h4 className="text-xs uppercase tracking-wider text-gray-400 font-medium">
                  Quantitative Analysis
                </h4>
              </div>

              <h3 className="text-xl font-bold text-white">
                {topCategories[0]?.category} leads the narrative.
              </h3>

              <p className="text-gray-400 text-sm leading-relaxed">
                The data highlights a strong focus on{' '}
                <span
                  className={getCategoryConfig(topCategories[0]?.category).text}
                >
                  {topCategories[0]?.category}
                </span>
                , which accounted for{' '}
                <span className="text-indigo-400 font-bold">
                  {topCategories[0]?.percent}%
                </span>{' '}
                of the total volume today.
                {topCategories[1] && (
                  <>
                    {' '}
                    This was followed by{' '}
                    <span
                      className={
                        getCategoryConfig(topCategories[1]?.category).text
                      }
                    >
                      {topCategories[1]?.category}
                    </span>{' '}
                    at {topCategories[1]?.percent}%.
                  </>
                )}
              </p>

              <div className="flex items-center gap-2 p-3 bg-indigo-500/5 border border-indigo-500/10 rounded-lg">
                <Info className="w-4 h-4 text-indigo-400 shrink-0" />
                <span className="text-xs text-indigo-300">
                  Percentages represent the average share of voice across all
                  monitored sources.
                </span>
              </div>
            </div>

            <div className="h-48 w-full flex justify-center md:justify-end">
              <div className="w-full max-w-sm h-full">
                <CategoryPieChart
                  data={pieData}
                  isExport={false}
                  innerRadius={40}
                  outerRadius={65}
                  legendPosition="right"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

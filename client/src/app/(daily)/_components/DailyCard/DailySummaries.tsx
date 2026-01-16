'use client';

import { SearchX } from 'lucide-react';
import { SourceCard } from '@/components/SourceCard';
import type { Category } from '@/constants/categories';
import { type Source, getSourceConfig } from '@/constants/sources';
import type { DailyReport } from '@/types/dailyReport';

type DailyFiltersProps = {
  availableCategories: Category[];
  activeCategory: Category;
  onSelect: (category: Category) => void;
};

export function DailyFilters({
  availableCategories,
  activeCategory,
  onSelect,
}: DailyFiltersProps) {
  return (
    <div className="p-6 border-b border-white/5 flex flex-col gap-6">
      <div className="text-sm text-gray-400 leading-relaxed max-w-3xl">
        <strong className="text-white block mb-1">Select a Category</strong>
        Explore how different sources covered the key topics of the day. Click a
        category below to filter the summaries.
      </div>

      <div className="flex flex-wrap gap-2">
        {availableCategories.map((category) => (
          <button
            key={category}
            onClick={() => onSelect(category)}
            className={`
                    px-4 py-2 rounded-full text-sm font-medium transition-all border
                    ${
                      activeCategory === category
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
  );
}

type DailySourceGridProps = {
  data: DailyReport;
  currentCategory: Category;
};

export function DailySourceGrid({
  data,
  currentCategory,
}: DailySourceGridProps) {
  const activeSources: Source[] = [];
  const silentSources: Source[] = [];

  Object.entries(data.summaries).forEach(([sourceName, categoryMap]) => {
    const summaryText = categoryMap[currentCategory];
    const source = sourceName as Source;

    if (summaryText && summaryText.trim().length > 0) {
      activeSources.push(source);
    } else {
      silentSources.push(source);
    }
  });

  return (
    <div className="p-3 sm:p-6 flex flex-col gap-6">
      {activeSources.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {activeSources.map((source) => {
            const summaryText = data.summaries[source][currentCategory];
            const sourceCounts = data.categories[source];

            return (
              <SourceCard
                key={source}
                source={source}
                text={summaryText}
                categoryCounts={sourceCounts}
              />
            );
          })}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500 italic">
          No sources covered {currentCategory} on this day.
        </div>
      )}

      {silentSources.length > 0 && (
        <div className="w-full rounded-xl border border-white/5 border-dashed bg-black/20 p-4 sm:px-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex items-center gap-3 shrink-0 opacity-70">
            <SearchX className="w-5 h-5 text-gray-400" />
            <span className="text-sm text-gray-400 font-medium">
              Did not cover{' '}
              <span className="text-gray-300">{currentCategory}</span>:
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {silentSources.map((source) => {
              const config = getSourceConfig(source);

              return (
                <div
                  key={source}
                  className={`
                    px-2.5 py-1 rounded text-xs font-medium border bg-black/30 flex items-center gap-1.5
                    ${config.border} opacity-80 hover:opacity-100 transition-opacity
                  `}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${config.bg.replace(
                      'bg-',
                      'bg-current '
                    )} ${config.color}`}
                  />
                  <span className="text-gray-300">{source}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

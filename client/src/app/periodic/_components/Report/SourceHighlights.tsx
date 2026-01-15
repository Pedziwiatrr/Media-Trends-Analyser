'use client';

import { Radio, SearchX } from 'lucide-react';
import { SectionWrapper } from '@/components/SectionWrapper';
import { type Source, getSourceConfig } from '@/constants/sources';
import { SourceCard } from '@/components/SourceCard';

type Highlights = Record<Source, string>;

type References = Record<Source, string[]>;

type SourceHighlightsProps = {
  highlights: Highlights;
  references: References;
  isExport?: boolean;
};

export function SourceHighlights({
  highlights,
  references,
  isExport = false,
}: SourceHighlightsProps) {
  const allEntries = Object.entries(highlights);

  if (allEntries.length === 0) return null;

  const validHighlights = allEntries.filter(
    ([, text]) => text && text.trim().length > 0
  );

  const emptyHighlights = allEntries.filter(
    ([, text]) => !text || text.trim().length === 0
  );

  if (validHighlights.length === 0 && emptyHighlights.length === 0) return null;

  return (
    <SectionWrapper
      title="Source Breakdown"
      icon={<Radio className="w-5 h-5 text-indigo-400" />}
    >
      <div className="flex flex-col gap-6">
        {validHighlights.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {validHighlights.map(([source, text]) => (
              <SourceCard
                key={source}
                source={source as Source}
                text={text}
                urls={isExport ? [] : references[source as Source] || []}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500 italic">
            No sources provided detailed reports on this topic.
          </div>
        )}

        {emptyHighlights.length > 0 && (
          <div className="w-full rounded-xl border border-white/5 border-dashed bg-black/20 p-4 sm:px-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex items-center gap-3 shrink-0 opacity-70">
              <SearchX className="w-5 h-5 text-gray-400" />
              <span className="text-sm text-gray-400 font-medium">
                No coverage found in:
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {emptyHighlights.map(([sourceName]) => {
                const sourceKey = sourceName as Source;
                const config = getSourceConfig(sourceKey);

                return (
                  <div
                    key={sourceKey}
                    className={`
                      px-2.5 py-1 rounded text-xs font-medium border bg-black/30 flex items-center gap-1.5
                      ${config.border} opacity-80 hover:opacity-100 transition-opacity
                    `}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${config.bg.replace('bg-', 'bg-current ')} ${config.color}`}
                    />
                    <span className="text-gray-300">{sourceKey}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </SectionWrapper>
  );
}

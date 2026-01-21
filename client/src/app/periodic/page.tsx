import { parseSearchParams, toQueryString } from '@/utils/urlUtils';
import { ClientWrapper } from './ClientWrapper';
import { checkTaskStatus, startPeriodicTask } from './api';
import { redirect } from 'next/navigation';

type HomeProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Home({ searchParams }: HomeProps) {
  const rawParams = await searchParams;
  const filters = parseSearchParams(rawParams);

  const hasFilters = filters.source.length > 0 || filters.category.length > 0;

  let initialData = null;
  let initialError: string | null = null;
  let taskId = typeof rawParams.id === 'string' ? rawParams.id : null;

  let redirectTo: string | null = null;

  if (hasFilters) {
    try {
      if (taskId) {
        const task = await checkTaskStatus(taskId);

        if (task.status === 'completed' && task.result) {
          initialData = task.result;
        } else if (task.status === 'failed') {
          initialError = 'Report generation failed on the server.';
        } else if (task.status === 'not_found') {
          console.warn(`Task ${taskId} expired. Regenerating...`);
          taskId = null;
        }
      }

      if (!taskId) {
        const newTaskId = await startPeriodicTask(filters);

        const queryString = toQueryString(filters);

        redirectTo = `/periodic?${queryString}&id=${newTaskId}`;
      }
    } catch (error) {
      console.error('Periodic Page Error:', error);
      initialError = 'Failed to initiate report generation.';
    }
  }

  if (redirectTo) {
    redirect(redirectTo);
  }

  const paramsKey = JSON.stringify(filters);

  return (
    <ClientWrapper
      key={paramsKey}
      initialData={initialData}
      taskId={taskId}
      initialError={initialError}
      startDate={filters.from}
      endDate={filters.to}
      searchParamsKey={paramsKey}
    />
  );
}

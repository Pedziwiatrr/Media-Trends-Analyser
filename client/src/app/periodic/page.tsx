import { ClientWrapper } from './ClientWrapper';
import { getPeriodicTaskId, checkTaskStatus, startPeriodicTask } from './api';

type HomeProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;

  const paramsKey = new URLSearchParams(
    params as Record<string, string>
  ).toString();

  const hasFilters = Object.keys(params).length > 0;

  let initialData = null;
  let taskId: string | null = null;
  let initialError: string | null = null;

  if (hasFilters) {
    try {
      taskId = await getPeriodicTaskId(params);

      let task = await checkTaskStatus(taskId);

      if (task.status == 'not_found') {
        console.warn(
          `Stale cache detected for Task ${taskId}. Starting fresh task.`
        );

        taskId = await startPeriodicTask(params);
        task = await checkTaskStatus(taskId);
      }

      if (task.status === 'completed' && task.result) {
        initialData = task.result;
      } else if (task.status === 'failed') {
        initialError = 'Report generation failed on the server.';
      }
    } catch (error) {
      console.error('Periodic Page Load Error:', error);
      initialError = 'Failed to initiate report generation.';
    }
  }

  const startDate = typeof params.from === 'string' ? params.from : '';
  const endDate = typeof params.to === 'string' ? params.to : '';

  return (
    <ClientWrapper
      key={paramsKey}
      initialData={initialData}
      taskId={taskId}
      initialError={initialError}
      startDate={startDate}
      endDate={endDate}
      searchParamsKey={paramsKey}
    />
  );
}

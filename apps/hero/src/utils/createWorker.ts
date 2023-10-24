import getCrossOriginWorkerURL from 'crossoriginworker';

export const createWorker = async (url: string) => {
  const localUrl = await getCrossOriginWorkerURL(url);
  return new Worker(localUrl);
};

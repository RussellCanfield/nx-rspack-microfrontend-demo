import { useSyncExternalStore } from 'react';
import { globalStore } from '../lib/store';

const useGlobalSync = () => {
  const store = useSyncExternalStore(
    globalStore.subscribe,
    globalStore.getSnapshot
  );

  return {
    store,
    addProduct: globalStore.addProduct,
  };
};

export default useGlobalSync;

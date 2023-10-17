export type Store = {
  products: unknown[];
};

let store: Store = {
  products: [],
};

export type Listener = () => void;

interface CustomWindow extends Window {
  listeners: Listener[];
}

export const globalStore = {
  addProduct(product: unknown) {
    store = {
      products: [...store.products, product],
    };
    emitChange();
  },
  subscribe(listener: Listener) {
    const customWindow = window as unknown as CustomWindow;
    const listeners = customWindow.listeners || [];
    customWindow.listeners = [...listeners, listener];
    return () => {
      customWindow.listeners = listeners.filter((l) => l !== listener);
    };
  },
  getSnapshot() {
    return store;
  },
};

function emitChange() {
  const customWindow = window as unknown as CustomWindow;
  for (const listener of customWindow.listeners ?? []) {
    listener();
  }
}

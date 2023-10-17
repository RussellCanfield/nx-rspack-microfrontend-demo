declare const useGlobalSync: () => {
    store: import("../lib/store").Store;
    addProduct: (product: unknown) => void;
};
export default useGlobalSync;

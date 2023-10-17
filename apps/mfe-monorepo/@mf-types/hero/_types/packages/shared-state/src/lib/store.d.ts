export type Store = {
    products: unknown[];
};
export type Listener = () => void;
export declare const globalStore: {
    addProduct(product: unknown): void;
    subscribe(listener: Listener): () => void;
    getSnapshot(): Store;
};

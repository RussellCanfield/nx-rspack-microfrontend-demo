export type BroadcastHandler<T> = (event: BroadcastEvent<T>) => void;
export interface BroadcastEvent<T> {
    sender: string;
    type: string;
    data: T;
}
declare const useStateEventChannel: () => {
    subscribe: (eventHandler: BroadcastHandler<unknown>) => void;
    unsubscribe: (eventHandler: BroadcastHandler<unknown>) => void;
    sendEvent: <T>(event: BroadcastEvent<T>) => void;
};
export default useStateEventChannel;

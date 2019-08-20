export interface InvokedPromiseOptions {
    id?: string;
}
export interface PromiseMachineSchema {
    states: {
        pending: {};
        resolved: {};
        rejected: {};
    };
}

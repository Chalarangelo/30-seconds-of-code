/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
declare type Global = NodeJS.Global;
export declare type Options = {
    clearTimeout: Global['clearTimeout'];
    fail: (error: Error) => void;
    onException: (error: Error) => void;
    queueableFns: Array<QueueableFn>;
    setTimeout: Global['setTimeout'];
    userContext: any;
};
export declare type QueueableFn = {
    fn: (done: (error?: any) => void) => void;
    timeout?: () => number;
    initError?: Error;
};
export default function queueRunner(options: Options): {
    cancel: any;
    catch: <TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | null | undefined) => Promise<void | TResult>;
    then: <TResult1 = void, TResult2 = never>(onfulfilled?: ((value: void) => TResult1 | PromiseLike<TResult1>) | null | undefined, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null | undefined) => Promise<TResult1 | TResult2>;
};
export {};
//# sourceMappingURL=queueRunner.d.ts.map
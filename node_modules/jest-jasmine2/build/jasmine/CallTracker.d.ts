/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
export declare type Context = {
    object: unknown;
    args: Array<unknown>;
    returnValue?: unknown;
};
declare class CallTracker {
    track: (context: Context) => void;
    any: () => boolean;
    count: () => number;
    argsFor: (index: number) => Array<unknown>;
    all: () => Array<Context>;
    allArgs: () => Array<unknown>;
    first: () => Context;
    mostRecent: () => Context;
    reset: () => void;
    constructor();
}
export default CallTracker;
//# sourceMappingURL=CallTracker.d.ts.map
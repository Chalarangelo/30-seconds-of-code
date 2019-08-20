/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
export default class SpyStrategy {
    identity: () => string;
    exec: (...args: Array<any>) => unknown;
    callThrough: () => unknown;
    returnValue: (value: unknown) => unknown;
    returnValues: () => unknown;
    throwError: (something: string | Error) => unknown;
    callFake: (fn: Function) => unknown;
    stub: (fn: Function) => unknown;
    constructor({ name, fn, getSpy, }?: {
        name?: string;
        fn?: Function;
        getSpy?: () => unknown;
    });
}
//# sourceMappingURL=SpyStrategy.d.ts.map
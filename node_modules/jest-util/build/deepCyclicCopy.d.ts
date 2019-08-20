/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
export declare type DeepCyclicCopyOptions = {
    blacklist?: Set<string>;
    keepPrototype?: boolean;
};
export default function deepCyclicCopy<T>(value: T, options?: DeepCyclicCopyOptions, cycles?: WeakMap<any, any>): T;
//# sourceMappingURL=deepCyclicCopy.d.ts.map
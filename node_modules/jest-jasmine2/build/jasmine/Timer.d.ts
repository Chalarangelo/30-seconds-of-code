/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
export default class Timer {
    start: () => void;
    elapsed: () => number;
    constructor(options?: {
        now?: () => number;
    });
}
//# sourceMappingURL=Timer.d.ts.map
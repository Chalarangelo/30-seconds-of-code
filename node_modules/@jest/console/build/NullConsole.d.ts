/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import CustomConsole from './CustomConsole';
export default class NullConsole extends CustomConsole {
    assert(): void;
    debug(): void;
    dir(): void;
    error(): void;
    info(): void;
    log(): void;
    time(): void;
    timeEnd(): void;
    trace(): void;
    warn(): void;
}
//# sourceMappingURL=NullConsole.d.ts.map
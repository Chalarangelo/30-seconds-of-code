/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/// <reference types="node" />
import { BaseWatchPlugin } from 'jest-watcher';
declare class QuitPlugin extends BaseWatchPlugin {
    isInternal: true;
    constructor(options: {
        stdin: NodeJS.ReadStream;
        stdout: NodeJS.WriteStream;
    });
    run(): Promise<void>;
    getUsageInfo(): {
        key: string;
        prompt: string;
    };
}
export default QuitPlugin;
//# sourceMappingURL=quit.d.ts.map
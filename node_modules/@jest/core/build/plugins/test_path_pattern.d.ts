/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/// <reference types="node" />
import { Config } from '@jest/types';
import { BaseWatchPlugin, UpdateConfigCallback } from 'jest-watcher';
declare class TestPathPatternPlugin extends BaseWatchPlugin {
    private _prompt;
    isInternal: true;
    constructor(options: {
        stdin: NodeJS.ReadStream;
        stdout: NodeJS.WriteStream;
    });
    getUsageInfo(): {
        key: string;
        prompt: string;
    };
    onKey(key: string): void;
    run(globalConfig: Config.GlobalConfig, updateConfigAndRun: UpdateConfigCallback): Promise<void>;
}
export default TestPathPatternPlugin;
//# sourceMappingURL=test_path_pattern.d.ts.map
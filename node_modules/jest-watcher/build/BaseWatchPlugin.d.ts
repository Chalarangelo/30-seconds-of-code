/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/// <reference types="node" />
import { Config } from '@jest/types';
import { JestHookSubscriber, UpdateConfigCallback, UsageData, WatchPlugin } from './types';
declare class BaseWatchPlugin implements WatchPlugin {
    protected _stdin: NodeJS.ReadStream;
    protected _stdout: NodeJS.WriteStream;
    constructor({ stdin, stdout, }: {
        stdin: NodeJS.ReadStream;
        stdout: NodeJS.WriteStream;
    });
    apply(_hooks: JestHookSubscriber): void;
    getUsageInfo(_globalConfig: Config.GlobalConfig): UsageData | null;
    onKey(_key: string): void;
    run(_globalConfig: Config.GlobalConfig, _updateConfigAndRun: UpdateConfigCallback): Promise<void | boolean>;
}
export default BaseWatchPlugin;
//# sourceMappingURL=BaseWatchPlugin.d.ts.map
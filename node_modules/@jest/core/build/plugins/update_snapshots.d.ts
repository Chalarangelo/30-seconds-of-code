/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/// <reference types="node" />
import { Config } from '@jest/types';
import { BaseWatchPlugin, JestHookSubscriber, UpdateConfigCallback } from 'jest-watcher';
declare class UpdateSnapshotsPlugin extends BaseWatchPlugin {
    private _hasSnapshotFailure;
    isInternal: true;
    constructor(options: {
        stdin: NodeJS.ReadStream;
        stdout: NodeJS.WriteStream;
    });
    run(_globalConfig: Config.GlobalConfig, updateConfigAndRun: UpdateConfigCallback): Promise<boolean>;
    apply(hooks: JestHookSubscriber): void;
    getUsageInfo(): {
        key: string;
        prompt: string;
    } | null;
}
export default UpdateSnapshotsPlugin;
//# sourceMappingURL=update_snapshots.d.ts.map
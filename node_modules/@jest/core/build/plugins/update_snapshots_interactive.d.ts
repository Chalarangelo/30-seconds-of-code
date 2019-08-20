/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Config } from '@jest/types';
import { AggregatedResult, AssertionLocation } from '@jest/test-result';
import { BaseWatchPlugin, JestHookSubscriber } from 'jest-watcher';
declare class UpdateSnapshotInteractivePlugin extends BaseWatchPlugin {
    private _snapshotInteractiveMode;
    private _failedSnapshotTestAssertions;
    isInternal: true;
    getFailedSnapshotTestAssertions(testResults: AggregatedResult): Array<AssertionLocation>;
    apply(hooks: JestHookSubscriber): void;
    onKey(key: string): void;
    run(_globalConfig: Config.GlobalConfig, updateConfigAndRun: Function): Promise<void>;
    getUsageInfo(): {
        key: string;
        prompt: string;
    } | null;
}
export default UpdateSnapshotInteractivePlugin;
//# sourceMappingURL=update_snapshots_interactive.d.ts.map
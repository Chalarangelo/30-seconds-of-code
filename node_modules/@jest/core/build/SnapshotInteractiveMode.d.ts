/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/// <reference types="node" />
import { AggregatedResult, AssertionLocation } from '@jest/test-result';
export default class SnapshotInteractiveMode {
    private _pipe;
    private _isActive;
    private _updateTestRunnerConfig;
    private _testAssertions;
    private _countPaths;
    private _skippedNum;
    constructor(pipe: NodeJS.WritableStream);
    isActive(): boolean;
    getSkippedNum(): number;
    private _clearTestSummary;
    private _drawUIProgress;
    private _drawUIDoneWithSkipped;
    private _drawUIDone;
    private _drawUIOverlay;
    put(key: string): void;
    abort(): void;
    restart(): void;
    updateWithResults(results: AggregatedResult): void;
    private _run;
    run(failedSnapshotTestAssertions: Array<AssertionLocation>, onConfigChange: (assertion: AssertionLocation | null, shouldUpdateSnapshot: boolean) => unknown): void;
}
//# sourceMappingURL=SnapshotInteractiveMode.d.ts.map
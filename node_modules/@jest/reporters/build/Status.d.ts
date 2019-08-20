/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Config } from '@jest/types';
import { AggregatedResult, TestResult } from '@jest/test-result';
import { ReporterOnStartOptions } from './types';
/**
 * A class that generates the CLI status of currently running tests
 * and also provides an ANSI escape sequence to remove status lines
 * from the terminal.
 */
export default class Status {
    private _cache;
    private _callback?;
    private _currentTests;
    private _done;
    private _emitScheduled;
    private _estimatedTime;
    private _interval?;
    private _aggregatedResults?;
    private _showStatus;
    constructor();
    onChange(callback: () => void): void;
    runStarted(aggregatedResults: AggregatedResult, options: ReporterOnStartOptions): void;
    runFinished(): void;
    testStarted(testPath: Config.Path, config: Config.ProjectConfig): void;
    testFinished(_config: Config.ProjectConfig, testResult: TestResult, aggregatedResults: AggregatedResult): void;
    get(): {
        content: string;
        clear: string;
    };
    private _emit;
    private _debouncedEmit;
    private _tick;
}
//# sourceMappingURL=Status.d.ts.map
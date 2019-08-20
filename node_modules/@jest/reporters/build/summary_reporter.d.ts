/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Config } from '@jest/types';
import { AggregatedResult } from '@jest/test-result';
import { Context, ReporterOnStartOptions } from './types';
import BaseReporter from './base_reporter';
export default class SummaryReporter extends BaseReporter {
    private _estimatedTime;
    private _globalConfig;
    constructor(globalConfig: Config.GlobalConfig);
    private _write;
    onRunStart(aggregatedResults: AggregatedResult, options: ReporterOnStartOptions): void;
    onRunComplete(contexts: Set<Context>, aggregatedResults: AggregatedResult): void;
    private _printSnapshotSummary;
    private _printSummary;
    private _getTestSummary;
}
//# sourceMappingURL=summary_reporter.d.ts.map
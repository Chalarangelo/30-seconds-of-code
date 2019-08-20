/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Config } from '@jest/types';
import { AggregatedResult } from '@jest/test-result';
import { TestSchedulerContext, Context } from './types';
import BaseReporter from './base_reporter';
export default class NotifyReporter extends BaseReporter {
    private _startRun;
    private _globalConfig;
    private _context;
    constructor(globalConfig: Config.GlobalConfig, startRun: (globalConfig: Config.GlobalConfig) => any, context: TestSchedulerContext);
    onRunComplete(contexts: Set<Context>, result: AggregatedResult): void;
}
//# sourceMappingURL=notify_reporter.d.ts.map
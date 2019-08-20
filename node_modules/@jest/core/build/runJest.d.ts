/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/// <reference types="node" />
import { JestHookEmitter } from 'jest-watcher';
import { Config } from '@jest/types';
import { AggregatedResult } from '@jest/test-result';
import { ChangedFiles } from 'jest-changed-files';
import FailedTestsCache from './FailedTestsCache';
import TestWatcher from './TestWatcher';
import { Filter } from './types';
declare const _default: ({ contexts, globalConfig, outputStream, testWatcher, jestHooks, startRun, changedFilesPromise, onComplete, failedTestsCache, filter, }: {
    globalConfig: Config.GlobalConfig;
    contexts: import("jest-runtime/build/types").Context[];
    outputStream: NodeJS.WritableStream;
    testWatcher: TestWatcher;
    jestHooks?: JestHookEmitter | undefined;
    startRun: (globalConfig: Config.GlobalConfig) => void;
    changedFilesPromise?: Promise<ChangedFiles> | undefined;
    onComplete: (testResults: AggregatedResult) => void;
    failedTestsCache?: FailedTestsCache | undefined;
    filter?: Filter | undefined;
}) => Promise<void | null>;
export default _default;
//# sourceMappingURL=runJest.d.ts.map
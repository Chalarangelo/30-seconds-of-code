/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { Config } from '@jest/types';
import { TestResult } from '@jest/test-result';
import Resolver from 'jest-resolve';
import { TestRunnerContext } from './types';
export default function runTest(path: Config.Path, globalConfig: Config.GlobalConfig, config: Config.ProjectConfig, resolver: Resolver, context?: TestRunnerContext): Promise<TestResult>;
//# sourceMappingURL=runTest.d.ts.map
/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Config } from '@jest/types';
import { TestResult } from '@jest/test-result';
import { JestEnvironment } from '@jest/environment';
import Runtime from 'jest-runtime';
import { Jasmine as JestJasmine } from './types';
declare function jasmine2(globalConfig: Config.GlobalConfig, config: Config.ProjectConfig, environment: JestEnvironment, runtime: Runtime, testPath: string): Promise<TestResult>;
declare namespace jasmine2 {
    type Jasmine = JestJasmine;
}
export = jasmine2;
//# sourceMappingURL=index.d.ts.map
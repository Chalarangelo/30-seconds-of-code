/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { Config } from '@jest/types';
import { TestResult } from '@jest/test-result';
import { SerializableModuleMap } from 'jest-haste-map';
import { TestRunnerSerializedContext } from './types';
export declare type SerializableResolver = {
    config: Config.ProjectConfig;
    serializableModuleMap: SerializableModuleMap;
};
declare type WorkerData = {
    config: Config.ProjectConfig;
    globalConfig: Config.GlobalConfig;
    path: Config.Path;
    context?: TestRunnerSerializedContext;
};
export declare function setup(setupData: {
    serializableResolvers: Array<SerializableResolver>;
}): void;
export declare function worker({ config, globalConfig, path, context, }: WorkerData): Promise<TestResult>;
export {};
//# sourceMappingURL=testWorker.d.ts.map
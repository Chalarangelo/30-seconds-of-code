/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Config } from '@jest/types';
import { AssertionResult, SerializableError } from '@jest/test-result';
import { Frame } from './types';
export { Frame } from './types';
export declare type StackTraceConfig = Pick<Config.ProjectConfig, 'rootDir' | 'testMatch'>;
export declare type StackTraceOptions = {
    noStackTrace: boolean;
};
export declare const formatExecError: (error: string | Error | SerializableError | undefined, config: Pick<Config.ProjectConfig, "rootDir" | "testMatch">, options: StackTraceOptions, testPath?: string | undefined, reuseMessage?: boolean | undefined) => string;
export declare const getStackTraceLines: (stack: string, options?: StackTraceOptions) => string[];
export declare const getTopFrame: (lines: string[]) => Frame | null;
export declare const formatStackTrace: (stack: string, config: Pick<Config.ProjectConfig, "rootDir" | "testMatch">, options: StackTraceOptions, testPath?: string | undefined) => string;
export declare const formatResultsErrors: (testResults: AssertionResult[], config: Pick<Config.ProjectConfig, "rootDir" | "testMatch">, options: StackTraceOptions, testPath?: string | undefined) => string | null;
export declare const separateMessageFromStack: (content: string) => {
    message: string;
    stack: string;
};
//# sourceMappingURL=index.d.ts.map
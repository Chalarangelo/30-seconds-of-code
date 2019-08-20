/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/// <reference types="node" />
import { PatternPrompt, Prompt, ScrollOptions } from 'jest-watcher';
import { TestResult } from '@jest/test-result';
export default class TestNamePatternPrompt extends PatternPrompt {
    _cachedTestResults: Array<TestResult>;
    constructor(pipe: NodeJS.WritableStream, prompt: Prompt);
    _onChange(pattern: string, options: ScrollOptions): void;
    _printPrompt(pattern: string): void;
    _getMatchedTests(pattern: string): string[];
    updateCachedTestResults(testResults?: Array<TestResult>): void;
}
//# sourceMappingURL=TestNamePatternPrompt.d.ts.map
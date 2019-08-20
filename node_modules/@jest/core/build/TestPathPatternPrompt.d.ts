/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/// <reference types="node" />
import { Context } from 'jest-runtime';
import { Test } from 'jest-runner';
import { PatternPrompt, Prompt, ScrollOptions } from 'jest-watcher';
import SearchSource from './SearchSource';
declare type SearchSources = Array<{
    context: Context;
    searchSource: SearchSource;
}>;
export default class TestPathPatternPrompt extends PatternPrompt {
    _searchSources?: SearchSources;
    constructor(pipe: NodeJS.WritableStream, prompt: Prompt);
    _onChange(pattern: string, options: ScrollOptions): void;
    _printPrompt(pattern: string): void;
    _getMatchedTests(pattern: string): Array<Test>;
    updateSearchSources(searchSources: SearchSources): void;
}
export {};
//# sourceMappingURL=TestPathPatternPrompt.d.ts.map
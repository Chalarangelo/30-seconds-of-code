/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { DiffOptions } from 'jest-diff';
declare type MatcherHintColor = (arg: string) => string;
export declare type MatcherHintOptions = {
    comment?: string;
    expectedColor?: MatcherHintColor;
    isDirectExpectCall?: boolean;
    isNot?: boolean;
    promise?: string;
    receivedColor?: MatcherHintColor;
    secondArgument?: string;
    secondArgumentColor?: MatcherHintColor;
};
export { DiffOptions };
export declare const EXPECTED_COLOR: import("chalk").Chalk & {
    supportsColor: import("chalk").ColorSupport;
};
export declare const RECEIVED_COLOR: import("chalk").Chalk & {
    supportsColor: import("chalk").ColorSupport;
};
export declare const INVERTED_COLOR: import("chalk").Chalk & {
    supportsColor: import("chalk").ColorSupport;
};
export declare const BOLD_WEIGHT: import("chalk").Chalk & {
    supportsColor: import("chalk").ColorSupport;
};
export declare const DIM_COLOR: import("chalk").Chalk & {
    supportsColor: import("chalk").ColorSupport;
};
export declare const SUGGEST_TO_CONTAIN_EQUAL: string;
export declare const stringify: (object: unknown, maxDepth?: number) => string;
export declare const highlightTrailingWhitespace: (text: string) => string;
export declare const printReceived: (object: unknown) => string;
export declare const printExpected: (value: unknown) => string;
export declare const printWithType: (name: string, value: unknown, print: (value: unknown) => string) => string;
export declare const ensureNoExpected: (expected: unknown, matcherName: string, options?: MatcherHintOptions | undefined) => void;
export declare const ensureActualIsNumber: (actual: unknown, matcherName: string, options?: MatcherHintOptions | undefined) => void;
export declare const ensureExpectedIsNumber: (expected: unknown, matcherName: string, options?: MatcherHintOptions | undefined) => void;
export declare const ensureNumbers: (actual: unknown, expected: unknown, matcherName: string, options?: MatcherHintOptions | undefined) => void;
export declare const ensureExpectedIsNonNegativeInteger: (expected: unknown, matcherName: string, options?: MatcherHintOptions | undefined) => void;
export declare const printDiffOrStringify: (expected: unknown, received: unknown, expectedLabel: string, receivedLabel: string, expand: boolean) => string;
export declare const diff: (a: any, b: any, options?: import("jest-diff/build/types").DiffOptions | undefined) => string | null;
export declare const pluralize: (word: string, count: number) => string;
declare type PrintLabel = (string: string) => string;
export declare const getLabelPrinter: (...strings: string[]) => PrintLabel;
export declare const matcherErrorMessage: (hint: string, generic: string, specific: string) => string;
export declare const matcherHint: (matcherName: string, received?: string, expected?: string, options?: MatcherHintOptions) => string;
//# sourceMappingURL=index.d.ts.map
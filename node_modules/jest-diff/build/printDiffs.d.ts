/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Diff } from './cleanupSemantic';
import { DiffOptions } from './types';
export declare const DIM_COLOR: import("chalk").Chalk & {
    supportsColor: import("chalk").ColorSupport;
};
export declare const EXPECTED_COLOR: import("chalk").Chalk & {
    supportsColor: import("chalk").ColorSupport;
};
export declare const INVERTED_COLOR: import("chalk").Chalk & {
    supportsColor: import("chalk").ColorSupport;
};
export declare const RECEIVED_COLOR: import("chalk").Chalk & {
    supportsColor: import("chalk").ColorSupport;
};
export declare const getHighlightedString: (op: number, diffs: Diff[]) => string;
export declare const getExpectedString: (diffs: Diff[]) => string;
export declare const getReceivedString: (diffs: Diff[]) => string;
export declare const MULTILINE_REGEXP: RegExp;
export declare const printDeleteLine: (line: string) => string;
export declare const printInsertLine: (line: string) => string;
export declare const printCommonLine: (line: string, isFirstOrLast?: boolean) => string;
export declare const computeStringDiffs: (expected: string, received: string) => {
    diffs: Diff[];
    isMultiline: boolean;
};
export declare const hasCommonDiff: (diffs: Diff[], isMultiline: boolean) => boolean;
export declare const printAnnotation: (options?: DiffOptions | undefined) => string;
export declare const createPatchMark: (aStart: number, aEnd: number, bStart: number, bEnd: number) => string;
export declare const printMultilineStringDiffs: (diffs: Diff[], expand: boolean) => string;
declare type StringDiffResult = {
    isMultiline: true;
    annotatedDiff: string;
} | {
    isMultiline: false;
    a: string;
    b: string;
} | null;
export declare const getStringDiff: (expected: string, received: string, options?: DiffOptions | undefined) => StringDiffResult;
export {};
//# sourceMappingURL=printDiffs.d.ts.map
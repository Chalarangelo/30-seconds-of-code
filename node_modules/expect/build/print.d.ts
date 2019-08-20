/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
export declare const printReceivedStringContainExpectedSubstring: (received: string, start: number, length: number) => string;
export declare const printReceivedStringContainExpectedResult: (received: string, result: RegExpExecArray | null) => string;
export declare const printReceivedArrayContainExpectedItem: (received: unknown[], index: number) => string;
export declare const printExpectedConstructorName: (label: string, expected: Function) => string;
export declare const printExpectedConstructorNameNot: (label: string, expected: Function) => string;
export declare const printReceivedConstructorName: (label: string, received: Function) => string;
export declare const printReceivedConstructorNameNot: (label: string, received: Function, expected: Function) => string;
//# sourceMappingURL=print.d.ts.map
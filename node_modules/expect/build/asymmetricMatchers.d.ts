/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
export declare class AsymmetricMatcher<T> {
    protected sample: T;
    $$typeof: symbol;
    inverse?: boolean;
    constructor(sample: T);
}
declare class Any extends AsymmetricMatcher<any> {
    constructor(sample: unknown);
    asymmetricMatch(other: unknown): boolean;
    toString(): string;
    getExpectedType(): string;
    toAsymmetricMatcher(): string;
}
declare class Anything extends AsymmetricMatcher<void> {
    asymmetricMatch(other: unknown): boolean;
    toString(): string;
    toAsymmetricMatcher(): string;
}
declare class ArrayContaining extends AsymmetricMatcher<Array<unknown>> {
    constructor(sample: Array<unknown>, inverse?: boolean);
    asymmetricMatch(other: Array<unknown>): boolean;
    toString(): string;
    getExpectedType(): string;
}
declare class ObjectContaining extends AsymmetricMatcher<Record<string, any>> {
    constructor(sample: Record<string, any>, inverse?: boolean);
    asymmetricMatch(other: any): boolean;
    toString(): string;
    getExpectedType(): string;
}
declare class StringContaining extends AsymmetricMatcher<string> {
    constructor(sample: string, inverse?: boolean);
    asymmetricMatch(other: string): boolean;
    toString(): string;
    getExpectedType(): string;
}
declare class StringMatching extends AsymmetricMatcher<RegExp> {
    constructor(sample: string | RegExp, inverse?: boolean);
    asymmetricMatch(other: string): boolean;
    toString(): string;
    getExpectedType(): string;
}
export declare const any: (expectedObject: any) => Any;
export declare const anything: () => Anything;
export declare const arrayContaining: (sample: unknown[]) => ArrayContaining;
export declare const arrayNotContaining: (sample: unknown[]) => ArrayContaining;
export declare const objectContaining: (sample: Record<string, any>) => ObjectContaining;
export declare const objectNotContaining: (sample: Record<string, any>) => ObjectContaining;
export declare const stringContaining: (expected: string) => StringContaining;
export declare const stringNotContaining: (expected: string) => StringContaining;
export declare const stringMatching: (expected: string | RegExp) => StringMatching;
export declare const stringNotMatching: (expected: string | RegExp) => StringMatching;
export {};
//# sourceMappingURL=asymmetricMatchers.d.ts.map
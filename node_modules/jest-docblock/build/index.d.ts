/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
declare type Pragmas = Record<string, string | Array<string>>;
export declare function extract(contents: string): string;
export declare function strip(contents: string): string;
export declare function parse(docblock: string): Pragmas;
export declare function parseWithComments(docblock: string): {
    comments: string;
    pragmas: Pragmas;
};
export declare function print({ comments, pragmas, }: {
    comments?: string;
    pragmas?: Pragmas;
}): string;
export {};
//# sourceMappingURL=index.d.ts.map
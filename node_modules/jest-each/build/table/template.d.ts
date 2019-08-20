/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
declare type Template = Record<string, unknown>;
declare const _default: (title: string, headings: string[], row: unknown[]) => {
    title: string;
    arguments: unknown[];
}[];
export default _default;
export declare function getPath<Obj extends Template, A extends keyof Obj, B extends keyof Obj[A], C extends keyof Obj[A][B], D extends keyof Obj[A][B][C], E extends keyof Obj[A][B][C][D]>(obj: Obj, path: [A, B, C, D, E]): Obj[A][B][C][D][E];
export declare function getPath<Obj extends Template, A extends keyof Obj, B extends keyof Obj[A], C extends keyof Obj[A][B], D extends keyof Obj[A][B][C]>(obj: Obj, path: [A, B, C, D]): Obj[A][B][C][D];
export declare function getPath<Obj extends Template, A extends keyof Obj, B extends keyof Obj[A], C extends keyof Obj[A][B]>(obj: Obj, path: [A, B, C]): Obj[A][B][C];
export declare function getPath<Obj extends Template, A extends keyof Obj, B extends keyof Obj[A]>(obj: Obj, path: [A, B]): Obj[A][B];
export declare function getPath<Obj extends Template, A extends keyof Obj>(obj: Obj, path: [A]): Obj[A];
export declare function getPath<Obj extends Template>(obj: Obj, path: Array<string>): unknown;
//# sourceMappingURL=template.d.ts.map
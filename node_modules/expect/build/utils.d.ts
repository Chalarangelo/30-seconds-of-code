/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
declare type GetPath = {
    hasEndProp?: boolean;
    lastTraversedObject: unknown;
    traversedPath: Array<string>;
    value?: unknown;
};
export declare const hasOwnProperty: (object: object, key: string) => boolean;
export declare const getPath: (object: Record<string, any>, propertyPath: string | string[]) => GetPath;
export declare const getObjectSubset: (object: any, subset: any, seenReferences?: WeakMap<object, boolean>) => any;
export declare const iterableEquality: (a: any, b: any, aStack?: any[], bStack?: any[]) => boolean | undefined;
export declare const subsetEquality: (object: any, subset: any) => boolean | undefined;
export declare const typeEquality: (a: any, b: any) => false | undefined;
export declare const sparseArrayEquality: (a: unknown, b: unknown) => boolean | undefined;
export declare const partition: <T>(items: T[], predicate: (arg: T) => boolean) => [T[], T[]];
export declare const isError: (value: unknown) => boolean;
export declare function emptyObject(obj: any): boolean;
export declare const isOneline: (expected: any, received: any) => boolean;
export {};
//# sourceMappingURL=utils.d.ts.map
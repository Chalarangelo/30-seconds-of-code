/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/// <reference types="node" />
import { CoverageMapData } from 'istanbul-lib-coverage';
export declare type DoneFn = (reason?: string | Error) => void;
export declare type TestName = string;
export declare type TestFn = (done?: DoneFn) => Promise<any> | void | undefined;
export declare type BlockFn = () => void;
export declare type BlockName = string;
export declare type Col = unknown;
export declare type Row = Array<Col>;
export declare type Table = Array<Row>;
export declare type ArrayTable = Table | Row;
export declare type TemplateTable = TemplateStringsArray;
export declare type TemplateData = Array<unknown>;
export declare type EachTable = ArrayTable | TemplateTable;
export declare type EachTestFn = (...args: Array<any>) => Promise<any> | void | undefined;
declare type Jasmine = {
    _DEFAULT_TIMEOUT_INTERVAL?: number;
    addMatchers: Function;
};
declare type Each = (table: EachTable, ...taggedTemplateData: Array<unknown>) => (title: string, test: EachTestFn, timeout?: number) => void;
export interface ItBase {
    (testName: TestName, fn: TestFn, timeout?: number): void;
    each: Each;
}
export interface It extends ItBase {
    only: ItBase;
    skip: ItBase;
    todo: (testName: TestName, ...rest: Array<any>) => void;
}
export interface ItConcurrentBase {
    (testName: string, testFn: () => Promise<any>, timeout?: number): void;
}
export interface ItConcurrentExtended extends ItConcurrentBase {
    only: ItConcurrentBase;
    skip: ItConcurrentBase;
}
export interface ItConcurrent extends It {
    concurrent: ItConcurrentExtended;
}
export interface DescribeBase {
    (blockName: BlockName, blockFn: BlockFn): void;
    each: Each;
}
export interface Describe extends DescribeBase {
    only: DescribeBase;
    skip: DescribeBase;
}
export interface Global extends NodeJS.Global {
    it: ItConcurrent;
    test: ItConcurrent;
    fit: ItBase & {
        concurrent?: ItConcurrentBase;
    };
    xit: ItBase;
    xtest: ItBase;
    describe: Describe;
    xdescribe: DescribeBase;
    fdescribe: DescribeBase;
    __coverage__: CoverageMapData;
    jasmine: Jasmine;
    fail: () => void;
    pending: () => void;
    spyOn: () => void;
    spyOnProperty: () => void;
    [extras: string]: any;
}
export {};
//# sourceMappingURL=Global.d.ts.map
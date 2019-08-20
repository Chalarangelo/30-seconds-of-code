/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { Global } from '@jest/types';
export declare type EachTests = Array<{
    title: string;
    arguments: Array<unknown>;
}>;
declare type TestFn = (done?: Global.DoneFn) => Promise<any> | void | undefined;
declare type GlobalCallback = (testName: string, fn: TestFn, timeout?: number) => void;
declare const _default: (cb: GlobalCallback, supportsDone?: boolean) => (table: Global.EachTable, ...taggedTemplateData: unknown[]) => (title: string, test: Global.EachTestFn, timeout?: number | undefined) => void;
export default _default;
//# sourceMappingURL=bind.d.ts.map
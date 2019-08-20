/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Config, Printer, NewPlugin } from '../types';
export declare type ReactTestObject = {
    $$typeof: symbol;
    type: string;
    props?: Record<string, any>;
    children?: null | Array<ReactTestChild>;
};
declare type ReactTestChild = ReactTestObject | string | number;
export declare const serialize: (object: ReactTestObject, config: Config, indentation: string, depth: number, refs: any[], printer: Printer) => string;
export declare const test: (val: any) => boolean;
declare const plugin: NewPlugin;
export default plugin;
//# sourceMappingURL=ReactTestComponent.d.ts.map
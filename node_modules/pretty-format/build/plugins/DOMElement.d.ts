/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Config, NewPlugin, Printer } from '../types';
export declare const test: (val: any) => boolean;
declare type HandledType = Element | Text | Comment | DocumentFragment;
export declare const serialize: (node: HandledType, config: Config, indentation: string, depth: number, refs: any[], printer: Printer) => string;
declare const plugin: NewPlugin;
export default plugin;
//# sourceMappingURL=DOMElement.d.ts.map
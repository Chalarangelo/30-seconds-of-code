/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Config, Printer } from '../../types';
export declare const printProps: (keys: string[], props: any, config: Config, indentation: string, depth: number, refs: any[], printer: Printer) => string;
export declare const printChildren: (children: any[], config: Config, indentation: string, depth: number, refs: any[], printer: Printer) => string;
export declare const printText: (text: string, config: Config) => string;
export declare const printComment: (comment: string, config: Config) => string;
export declare const printElement: (type: string, printedProps: string, printedChildren: string, config: Config, indentation: string) => string;
export declare const printElementAsLeaf: (type: string, config: Config) => string;
//# sourceMappingURL=markup.d.ts.map
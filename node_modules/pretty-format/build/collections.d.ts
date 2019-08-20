/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { Config, Printer, Refs } from './types';
/**
 * Return entries (for example, of a map)
 * with spacing, indentation, and comma
 * without surrounding punctuation (for example, braces)
 */
export declare function printIteratorEntries(iterator: any, config: Config, indentation: string, depth: number, refs: Refs, printer: Printer, separator?: string): string;
/**
 * Return values (for example, of a set)
 * with spacing, indentation, and comma
 * without surrounding punctuation (braces or brackets)
 */
export declare function printIteratorValues(iterator: Iterator<any>, config: Config, indentation: string, depth: number, refs: Refs, printer: Printer): string;
/**
 * Return items (for example, of an array)
 * with spacing, indentation, and comma
 * without surrounding punctuation (for example, brackets)
 **/
export declare function printListItems(list: any, config: Config, indentation: string, depth: number, refs: Refs, printer: Printer): string;
/**
 * Return properties of an object
 * with spacing, indentation, and comma
 * without surrounding punctuation (for example, braces)
 */
export declare function printObjectProperties(val: Record<string, any>, config: Config, indentation: string, depth: number, refs: Refs, printer: Printer): string;
//# sourceMappingURL=collections.d.ts.map
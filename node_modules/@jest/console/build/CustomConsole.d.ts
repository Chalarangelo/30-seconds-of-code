/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/// <reference types="node" />
import { Console } from 'console';
import { LogMessage, LogType } from './types';
declare type Formatter = (type: LogType, message: LogMessage) => string;
export default class CustomConsole extends Console {
    private _stdout;
    private _stderr;
    private _formatBuffer;
    private _counters;
    private _timers;
    private _groupDepth;
    constructor(stdout: NodeJS.WritableStream, stderr: NodeJS.WritableStream, formatBuffer?: Formatter);
    private _log;
    private _logError;
    assert(value: any, message?: string | Error): void;
    count(label?: string): void;
    countReset(label?: string): void;
    debug(firstArg: any, ...args: Array<any>): void;
    dir(firstArg: any, ...args: Array<any>): void;
    dirxml(firstArg: any, ...args: Array<any>): void;
    error(firstArg: any, ...args: Array<any>): void;
    group(title?: string, ...args: Array<any>): void;
    groupCollapsed(title?: string, ...args: Array<any>): void;
    groupEnd(): void;
    info(firstArg: any, ...args: Array<any>): void;
    log(firstArg: any, ...args: Array<any>): void;
    time(label?: string): void;
    timeEnd(label?: string): void;
    warn(firstArg: any, ...args: Array<any>): void;
    getBuffer(): undefined;
}
export {};
//# sourceMappingURL=CustomConsole.d.ts.map
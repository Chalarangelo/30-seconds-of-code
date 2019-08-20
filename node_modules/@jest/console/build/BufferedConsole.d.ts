/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Console } from 'console';
import { SourceMapRegistry } from '@jest/source-map';
import { ConsoleBuffer, LogMessage, LogType } from './types';
export default class BufferedConsole extends Console {
    private _buffer;
    private _counters;
    private _timers;
    private _groupDepth;
    private _getSourceMaps;
    constructor(getSourceMaps: () => SourceMapRegistry | null | undefined);
    static write(buffer: ConsoleBuffer, type: LogType, message: LogMessage, level?: number | null, sourceMaps?: SourceMapRegistry | null): import("./types").LogEntry[];
    private _log;
    assert(value: any, message?: string | Error): void;
    count(label?: string): void;
    countReset(label?: string): void;
    debug(firstArg: any, ...rest: Array<any>): void;
    dir(firstArg: any, ...rest: Array<any>): void;
    dirxml(firstArg: any, ...rest: Array<any>): void;
    error(firstArg: any, ...rest: Array<any>): void;
    group(title?: string, ...rest: Array<any>): void;
    groupCollapsed(title?: string, ...rest: Array<any>): void;
    groupEnd(): void;
    info(firstArg: any, ...rest: Array<any>): void;
    log(firstArg: any, ...rest: Array<any>): void;
    time(label?: string): void;
    timeEnd(label?: string): void;
    warn(firstArg: any, ...rest: Array<any>): void;
    getBuffer(): import("./types").LogEntry[] | undefined;
}
//# sourceMappingURL=BufferedConsole.d.ts.map
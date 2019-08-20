/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
export declare type LogMessage = string;
export declare type LogEntry = {
    message: LogMessage;
    origin: string;
    type: LogType;
};
export declare type LogCounters = {
    [label: string]: number;
};
export declare type LogTimers = {
    [label: string]: Date;
};
export declare type LogType = 'assert' | 'count' | 'debug' | 'dir' | 'dirxml' | 'error' | 'group' | 'groupCollapsed' | 'info' | 'log' | 'time' | 'warn';
export declare type ConsoleBuffer = Array<LogEntry>;
//# sourceMappingURL=types.d.ts.map
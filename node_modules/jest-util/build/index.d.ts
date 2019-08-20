/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/// <reference types="node" />
import { JestFakeTimers as FakeTimers } from '@jest/fake-timers';
import { BufferedConsole, CustomConsole, NullConsole } from '@jest/console';
import { formatTestResults } from '@jest/test-result';
import createDirectory from './createDirectory';
import ErrorWithStack from './ErrorWithStack';
import getFailedSnapshotTests from './getFailedSnapshotTests';
import installCommonGlobals from './installCommonGlobals';
import interopRequireDefault from './interopRequireDefault';
import deepCyclicCopy from './deepCyclicCopy';
import convertDescriptorToString from './convertDescriptorToString';
import * as specialChars from './specialChars';
import replacePathSepForGlob from './replacePathSepForGlob';
import * as preRunMessage from './preRunMessage';
import pluralize from './pluralize';
declare const _default: {
    BufferedConsole: typeof BufferedConsole;
    Console: typeof CustomConsole;
    ErrorWithStack: typeof ErrorWithStack;
    FakeTimers: typeof FakeTimers;
    NullConsole: typeof NullConsole;
    clearLine: (stream: NodeJS.WritableStream) => void;
    convertDescriptorToString: typeof convertDescriptorToString;
    createDirectory: typeof createDirectory;
    deepCyclicCopy: typeof deepCyclicCopy;
    formatTestResults: typeof formatTestResults;
    getCallsite: (level: number, sourceMaps?: Record<string, string> | null | undefined) => import("callsites").CallSite;
    getConsoleOutput: (root: string, verbose: boolean, buffer: import("@jest/console/build/types").LogEntry[]) => string;
    getFailedSnapshotTests: typeof getFailedSnapshotTests;
    installCommonGlobals: typeof installCommonGlobals;
    interopRequireDefault: typeof interopRequireDefault;
    isInteractive: boolean;
    isPromise: (candidate: unknown) => candidate is Promise<unknown>;
    pluralize: typeof pluralize;
    preRunMessage: typeof preRunMessage;
    replacePathSepForGlob: typeof replacePathSepForGlob;
    setGlobal: (globalToMutate: NodeJS.Global | Window, key: string, value: unknown) => void;
    specialChars: typeof specialChars;
    testPathPatternToRegExp: (testPathPattern: string) => RegExp;
};
export = _default;
//# sourceMappingURL=index.d.ts.map
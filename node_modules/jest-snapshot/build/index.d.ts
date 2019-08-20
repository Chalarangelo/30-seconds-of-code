/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Config } from '@jest/types';
import { MatcherState } from 'expect';
import { SnapshotResolver as JestSnapshotResolver } from './snapshot_resolver';
import SnapshotState from './State';
import * as utils from './utils';
declare type Context = MatcherState & {
    snapshotState: SnapshotState;
};
declare const JestSnapshot: {
    EXTENSION: string;
    SnapshotState: typeof SnapshotState;
    addSerializer: (plugin: import("pretty-format/build/types").Plugin) => void;
    buildSnapshotResolver: (config: Config.ProjectConfig) => JestSnapshotResolver;
    cleanup: (hasteFS: import("jest-haste-map/build/HasteFS").default, update: Config.SnapshotUpdateState, snapshotResolver: JestSnapshotResolver, testPathIgnorePatterns?: string[] | undefined) => {
        filesRemoved: number;
        filesRemovedList: string[];
    };
    getSerializers: () => import("pretty-format/build/types").Plugin[];
    isSnapshotPath: (path: string) => boolean;
    toMatchInlineSnapshot: (this: Context, received: any, propertyMatchersOrInlineSnapshot?: any, inlineSnapshot?: string | undefined) => {
        message: () => string;
        name: string;
        pass: boolean;
        report: () => string;
        actual?: undefined;
        expected?: undefined;
    } | {
        message: () => string;
        pass: boolean;
        name?: undefined;
        report?: undefined;
        actual?: undefined;
        expected?: undefined;
    } | {
        actual: string;
        expected: string | null;
        message: () => string;
        name: string;
        pass: boolean;
        report: () => string;
    };
    toMatchSnapshot: (this: Context, received: any, propertyMatchers?: any, hint?: string | undefined) => {
        message: () => string;
        name: string;
        pass: boolean;
        report: () => string;
        actual?: undefined;
        expected?: undefined;
    } | {
        message: () => string;
        pass: boolean;
        name?: undefined;
        report?: undefined;
        actual?: undefined;
        expected?: undefined;
    } | {
        actual: string;
        expected: string | null;
        message: () => string;
        name: string;
        pass: boolean;
        report: () => string;
    };
    toThrowErrorMatchingInlineSnapshot: (this: Context, received: any, inlineSnapshot?: string | undefined, fromPromise?: boolean | undefined) => {
        message: () => string;
        name: string;
        pass: boolean;
        report: () => string;
        actual?: undefined;
        expected?: undefined;
    } | {
        message: () => string;
        pass: boolean;
        name?: undefined;
        report?: undefined;
        actual?: undefined;
        expected?: undefined;
    } | {
        actual: string;
        expected: string | null;
        message: () => string;
        name: string;
        pass: boolean;
        report: () => string;
    };
    toThrowErrorMatchingSnapshot: (this: Context, received: any, hint: string | undefined, fromPromise: boolean) => {
        message: () => string;
        name: string;
        pass: boolean;
        report: () => string;
        actual?: undefined;
        expected?: undefined;
    } | {
        message: () => string;
        pass: boolean;
        name?: undefined;
        report?: undefined;
        actual?: undefined;
        expected?: undefined;
    } | {
        actual: string;
        expected: string | null;
        message: () => string;
        name: string;
        pass: boolean;
        report: () => string;
    };
    utils: typeof utils;
};
declare namespace JestSnapshot {
    type SnapshotResolver = JestSnapshotResolver;
    type SnapshotStateType = SnapshotState;
}
export = JestSnapshot;
//# sourceMappingURL=index.d.ts.map
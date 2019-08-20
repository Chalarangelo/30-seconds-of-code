/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Config } from '@jest/types';
export declare const SNAPSHOT_VERSION = "1";
export declare const SNAPSHOT_GUIDE_LINK = "https://goo.gl/fbAQLP";
export declare const SNAPSHOT_VERSION_WARNING: string;
export declare const testNameToKey: (testName: string, count: number) => string;
export declare const keyToTestName: (key: string) => string;
export declare const getSnapshotData: (snapshotPath: string, update: Config.SnapshotUpdateState) => {
    data: Record<string, string>;
    dirty: boolean;
};
export declare const serialize: (data: string) => string;
export declare const unescape: (data: string) => string;
export declare const escapeBacktickString: (str: string) => string;
export declare const ensureDirectoryExists: (filePath: string) => void;
export declare const saveSnapshotFile: (snapshotData: Record<string, string>, snapshotPath: string) => void;
export declare const deepMerge: (target: any, source: any) => any;
//# sourceMappingURL=utils.d.ts.map
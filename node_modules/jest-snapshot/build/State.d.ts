/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Config } from '@jest/types';
export declare type SnapshotStateOptions = {
    updateSnapshot: Config.SnapshotUpdateState;
    getPrettier: () => null | any;
    getBabelTraverse: () => Function;
    expand?: boolean;
};
export declare type SnapshotMatchOptions = {
    testName: string;
    received: any;
    key?: string;
    inlineSnapshot?: string;
    error?: Error;
};
export default class SnapshotState {
    private _counters;
    private _dirty;
    private _index;
    private _updateSnapshot;
    private _snapshotData;
    private _initialData;
    private _snapshotPath;
    private _inlineSnapshots;
    private _uncheckedKeys;
    private _getBabelTraverse;
    private _getPrettier;
    added: number;
    expand: boolean;
    matched: number;
    unmatched: number;
    updated: number;
    constructor(snapshotPath: Config.Path, options: SnapshotStateOptions);
    markSnapshotsAsCheckedForTest(testName: string): void;
    private _addSnapshot;
    clear(): void;
    save(): {
        deleted: boolean;
        saved: boolean;
    };
    getUncheckedCount(): number;
    getUncheckedKeys(): Array<string>;
    removeUncheckedKeys(): void;
    match({ testName, received, key, inlineSnapshot, error, }: SnapshotMatchOptions): {
        actual: string;
        count: number;
        expected: string | null;
        key: string;
        pass: boolean;
    };
    fail(testName: string, _received: any, key?: string): string;
}
//# sourceMappingURL=State.d.ts.map
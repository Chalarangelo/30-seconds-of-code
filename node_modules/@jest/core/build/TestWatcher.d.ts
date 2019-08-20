/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/// <reference types="node" />
import { EventEmitter } from 'events';
declare type State = {
    interrupted: boolean;
};
export default class TestWatcher extends EventEmitter {
    state: State;
    private _isWatchMode;
    constructor({ isWatchMode }: {
        isWatchMode: boolean;
    });
    setState(state: State): void;
    isInterrupted(): boolean;
    isWatchMode(): boolean;
}
export {};
//# sourceMappingURL=TestWatcher.d.ts.map
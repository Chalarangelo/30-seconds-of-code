/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/// <reference types="node" />
import { ModuleMocker } from 'jest-mock';
import { StackTraceConfig } from 'jest-message-util';
declare type Callback = (...args: Array<unknown>) => void;
declare type TimerConfig<Ref> = {
    idToRef: (id: number) => Ref;
    refToId: (ref: Ref) => number | void;
};
export default class FakeTimers<TimerRef> {
    private _cancelledImmediates;
    private _cancelledTicks;
    private _config;
    private _disposed?;
    private _fakeTimerAPIs;
    private _global;
    private _immediates;
    private _maxLoops;
    private _moduleMocker;
    private _now;
    private _ticks;
    private _timerAPIs;
    private _timers;
    private _uuidCounter;
    private _timerConfig;
    constructor({ global, moduleMocker, timerConfig, config, maxLoops, }: {
        global: NodeJS.Global;
        moduleMocker: ModuleMocker;
        timerConfig: TimerConfig<TimerRef>;
        config: StackTraceConfig;
        maxLoops?: number;
    });
    clearAllTimers(): void;
    dispose(): void;
    reset(): void;
    runAllTicks(): void;
    runAllImmediates(): void;
    private _runImmediate;
    runAllTimers(): void;
    runOnlyPendingTimers(): void;
    advanceTimersToNextTimer(steps?: number): void;
    advanceTimersByTime(msToRun: number): void;
    runWithRealTimers(cb: Callback): void;
    useRealTimers(): void;
    useFakeTimers(): void;
    getTimerCount(): number;
    private _checkFakeTimers;
    private _createMocks;
    private _fakeClearTimer;
    private _fakeClearImmediate;
    private _fakeNextTick;
    private _fakeSetImmediate;
    private _fakeSetInterval;
    private _fakeSetTimeout;
    private _getNextTimerHandle;
    private _runTimerHandle;
}
export {};
//# sourceMappingURL=jestFakeTimers.d.ts.map
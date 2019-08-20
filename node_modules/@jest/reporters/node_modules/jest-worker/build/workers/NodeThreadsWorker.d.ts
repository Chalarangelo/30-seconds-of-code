/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/// <reference types="node" />
import { ChildMessage, OnEnd, OnStart, WorkerOptions, WorkerInterface, ParentMessage } from '../types';
export default class ExperimentalWorker implements WorkerInterface {
    private _worker;
    private _options;
    private _onProcessEnd;
    private _request;
    private _retries;
    private _stderr;
    private _stdout;
    private _fakeStream;
    constructor(options: WorkerOptions);
    initialize(): void;
    private _shutdown;
    onMessage(response: ParentMessage): void;
    onExit(exitCode: number): void;
    send(request: ChildMessage, onProcessStart: OnStart, onProcessEnd: OnEnd): void;
    getWorkerId(): number;
    getStdout(): NodeJS.ReadableStream | null;
    getStderr(): NodeJS.ReadableStream | null;
    private _getFakeStream;
}
//# sourceMappingURL=NodeThreadsWorker.d.ts.map
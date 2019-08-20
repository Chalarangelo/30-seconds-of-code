/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/// <reference types="node" />
import { EventEmitter } from 'events';
import { ForkOptions } from 'child_process';
export declare const CHILD_MESSAGE_INITIALIZE: 0;
export declare const CHILD_MESSAGE_CALL: 1;
export declare const CHILD_MESSAGE_END: 2;
export declare const PARENT_MESSAGE_OK: 0;
export declare const PARENT_MESSAGE_CLIENT_ERROR: 1;
export declare const PARENT_MESSAGE_SETUP_ERROR: 2;
export declare type PARENT_MESSAGE_ERROR = typeof PARENT_MESSAGE_CLIENT_ERROR | typeof PARENT_MESSAGE_SETUP_ERROR;
export { ForkOptions };
export interface WorkerPoolInterface {
    getStderr(): NodeJS.ReadableStream;
    getStdout(): NodeJS.ReadableStream;
    getWorkers(): Array<WorkerInterface>;
    createWorker(options: WorkerOptions): WorkerInterface;
    send(workerId: number, request: ChildMessage, onStart: OnStart, onEnd: OnEnd): void;
    end(): void;
}
export interface WorkerInterface {
    send(request: ChildMessage, onProcessStart: OnStart, onProcessEnd: OnEnd): void;
    getWorkerId(): number;
    getStderr(): NodeJS.ReadableStream | null;
    getStdout(): NodeJS.ReadableStream | null;
    onExit(exitCode: number): void;
    onMessage(message: ParentMessage): void;
}
export declare type FarmOptions = {
    computeWorkerKey?: (method: string, ...args: Array<unknown>) => string | null;
    exposedMethods?: ReadonlyArray<string>;
    forkOptions?: ForkOptions;
    setupArgs?: Array<unknown>;
    maxRetries?: number;
    numWorkers?: number;
    WorkerPool?: (workerPath: string, options?: WorkerPoolOptions) => WorkerPoolInterface;
    enableWorkerThreads?: boolean;
};
export declare type WorkerPoolOptions = {
    setupArgs: Array<unknown>;
    forkOptions: ForkOptions;
    maxRetries: number;
    numWorkers: number;
    enableWorkerThreads: boolean;
};
export declare type WorkerOptions = {
    forkOptions: ForkOptions;
    setupArgs: Array<unknown>;
    maxRetries: number;
    workerId: number;
    workerPath: string;
};
export declare type MessagePort = typeof EventEmitter & {
    postMessage(message: unknown): void;
};
export declare type MessageChannel = {
    port1: MessagePort;
    port2: MessagePort;
};
export declare type ChildMessageInitialize = [typeof CHILD_MESSAGE_INITIALIZE, // type
boolean, // processed
string, // file
// file
Array<unknown> | undefined, // setupArgs
// setupArgs
MessagePort | undefined];
export declare type ChildMessageCall = [typeof CHILD_MESSAGE_CALL, // type
boolean, // processed
string, // method
Array<unknown>];
export declare type ChildMessageEnd = [typeof CHILD_MESSAGE_END, // type
boolean];
export declare type ChildMessage = ChildMessageInitialize | ChildMessageCall | ChildMessageEnd;
export declare type ParentMessageOk = [typeof PARENT_MESSAGE_OK, // type
unknown];
export declare type ParentMessageError = [PARENT_MESSAGE_ERROR, // type
string, // constructor
string, // message
string, // stack
unknown];
export declare type ParentMessage = ParentMessageOk | ParentMessageError;
export declare type OnStart = (worker: WorkerInterface) => void;
export declare type OnEnd = (err: Error | null, result: unknown) => void;
export declare type QueueChildMessage = {
    request: ChildMessage;
    onStart: OnStart;
    onEnd: OnEnd;
};
export declare type QueueItem = {
    task: QueueChildMessage;
    next: QueueItem | null;
};
//# sourceMappingURL=types.d.ts.map
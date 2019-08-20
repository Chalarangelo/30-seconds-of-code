/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/// <reference types="node" />
/// <reference types="jest" />
import { Script } from 'vm';
import { Circus, Config, Global } from '@jest/types';
import jestMock, { ModuleMocker } from 'jest-mock';
import { ScriptTransformer } from '@jest/transform';
import { JestFakeTimers as FakeTimers } from '@jest/fake-timers';
declare type JestMockFn = typeof jestMock.fn;
declare type JestMockSpyOn = typeof jestMock.spyOn;
export declare type EnvironmentContext = Partial<{
    console: Console;
    docblockPragmas: Record<string, string | Array<string>>;
    testPath: Config.Path;
}>;
export declare type ModuleWrapper = (module: Module, exports: Module['exports'], require: Module['require'], __dirname: string, __filename: Module['filename'], global: Global.Global, jest: Jest, ...extraGlobals: Array<Global.Global[keyof Global.Global]>) => unknown;
export declare class JestEnvironment {
    constructor(config: Config.ProjectConfig, context?: EnvironmentContext);
    global: Global.Global;
    fakeTimers: FakeTimers<unknown> | null;
    moduleMocker: ModuleMocker | null;
    runScript(script: Script): {
        [ScriptTransformer.EVAL_RESULT_VARIABLE]: ModuleWrapper;
    } | null;
    setup(): Promise<void>;
    teardown(): Promise<void>;
    handleTestEvent?(event: Circus.Event, state: Circus.State): void;
}
export declare type Module = NodeModule;
export interface LocalModuleRequire extends NodeRequire {
    requireActual(moduleName: string): unknown;
    requireMock(moduleName: string): unknown;
}
export interface Jest {
    /**
     * Provides a way to add Jasmine-compatible matchers into your Jest context.
     *
     * @deprecated Use `expect.extend` instead
     */
    addMatchers(matchers: Record<string, any>): void;
    /**
     * Advances all timers by the needed milliseconds so that only the next timeouts/intervals will run.
     * Optionally, you can provide steps, so it will run steps amount of next timeouts/intervals.
     */
    advanceTimersToNextTimer(steps?: number): void;
    /**
     * Disables automatic mocking in the module loader.
     */
    autoMockOff(): Jest;
    /**
     * Enables automatic mocking in the module loader.
     */
    autoMockOn(): Jest;
    /**
     * Clears the mock.calls and mock.instances properties of all mocks.
     * Equivalent to calling .mockClear() on every mocked function.
     */
    clearAllMocks(): Jest;
    /**
     * Removes any pending timers from the timer system. If any timers have been
     * scheduled, they will be cleared and will never have the opportunity to
     * execute in the future.
     */
    clearAllTimers(): void;
    /**
     * Indicates that the module system should never return a mocked version
     * of the specified module, including all of the specified module's
     * dependencies.
     */
    deepUnmock(moduleName: string): Jest;
    /**
     * Disables automatic mocking in the module loader.
     *
     * After this method is called, all `require()`s will return the real
     * versions of each module (rather than a mocked version).
     */
    disableAutomock(): Jest;
    /**
     * When using `babel-jest`, calls to mock will automatically be hoisted to
     * the top of the code block. Use this method if you want to explicitly avoid
     * this behavior.
     */
    doMock(moduleName: string, moduleFactory?: () => unknown): Jest;
    /**
     * Indicates that the module system should never return a mocked version
     * of the specified module from require() (e.g. that it should always return
     * the real module).
     */
    dontMock(moduleName: string): Jest;
    /**
     * Enables automatic mocking in the module loader.
     */
    enableAutomock(): Jest;
    /**
     * Creates a mock function. Optionally takes a mock implementation.
     */
    fn: JestMockFn;
    /**
     * Given the name of a module, use the automatic mocking system to generate a
     * mocked version of the module for you.
     *
     * This is useful when you want to create a manual mock that extends the
     * automatic mock's behavior.
     */
    genMockFromModule(moduleName: string): unknown;
    /**
     * Determines if the given function is a mocked function.
     */
    isMockFunction(fn: Function): fn is ReturnType<JestMockFn>;
    /**
     * Mocks a module with an auto-mocked version when it is being required.
     */
    mock(moduleName: string, moduleFactory?: () => unknown, options?: {
        virtual?: boolean;
    }): Jest;
    /**
     * Returns the actual module instead of a mock, bypassing all checks on
     * whether the module should receive a mock implementation or not.
     *
     * @example
     ```
      jest.mock('../myModule', () => {
      // Require the original module to not be mocked...
      const originalModule = jest.requireActual(moduleName);
        return {
          __esModule: true, // Use it when dealing with esModules
          ...originalModule,
          getRandom: jest.fn().mockReturnValue(10),
        };
      });
  
      const getRandom = require('../myModule').getRandom;
  
      getRandom(); // Always returns 10
      ```
     */
    requireActual: (moduleName: string) => unknown;
    /**
     * Returns a mock module instead of the actual module, bypassing all checks
     * on whether the module should be required normally or not.
     */
    requireMock: (moduleName: string) => unknown;
    /**
     * Resets the state of all mocks.
     * Equivalent to calling .mockReset() on every mocked function.
     */
    resetAllMocks(): Jest;
    /**
     * Resets the module registry - the cache of all required modules. This is
     * useful to isolate modules where local state might conflict between tests.
     *
     * @deprecated Use `jest.resetModules()`
     */
    resetModuleRegistry(): Jest;
    /**
     * Resets the module registry - the cache of all required modules. This is
     * useful to isolate modules where local state might conflict between tests.
     */
    resetModules(): Jest;
    /**
     * Restores all mocks back to their original value. Equivalent to calling
     * `.mockRestore` on every mocked function.
     *
     * Beware that jest.restoreAllMocks() only works when the mock was created with
     * jest.spyOn; other mocks will require you to manually restore them.
     */
    restoreAllMocks(): Jest;
    /**
     * Runs failed tests n-times until they pass or until the max number of
     * retries is exhausted. This only works with `jest-circus`!
     */
    retryTimes(numRetries: number): Jest;
    /**
     * Exhausts tasks queued by setImmediate().
     */
    runAllImmediates(): void;
    /**
     * Exhausts the micro-task queue (usually interfaced in node via
     * process.nextTick).
     */
    runAllTicks(): void;
    /**
     * Exhausts the macro-task queue (i.e., all tasks queued by setTimeout()
     * and setInterval()).
     */
    runAllTimers(): void;
    /**
     * Executes only the macro-tasks that are currently pending (i.e., only the
     * tasks that have been queued by setTimeout() or setInterval() up to this
     * point). If any of the currently pending macro-tasks schedule new
     * macro-tasks, those new tasks will not be executed by this call.
     */
    runOnlyPendingTimers(): void;
    /**
     * Advances all timers by msToRun milliseconds. All pending "macro-tasks"
     * that have been queued via setTimeout() or setInterval(), and would be
     * executed within this timeframe will be executed.
     */
    advanceTimersByTime(msToRun: number): void;
    /**
     * Executes only the macro task queue (i.e. all tasks queued by setTimeout()
     * or setInterval() and setImmediate()).
     *
     * @deprecated Use `jest.advanceTimersByTime()`
     */
    runTimersToTime(msToRun: number): void;
    /**
     * Returns the number of fake timers still left to run.
     */
    getTimerCount(): number;
    /**
     * Explicitly supplies the mock object that the module system should return
     * for the specified module.
     *
     * Note It is recommended to use `jest.mock()` instead. The `jest.mock`
     * API's second argument is a module factory instead of the expected
     * exported module object.
     */
    setMock(moduleName: string, moduleExports: unknown): Jest;
    /**
     * Set the default timeout interval for tests and before/after hooks in
     * milliseconds.
     *
     * Note: The default timeout interval is 5 seconds if this method is not
     * called.
     */
    setTimeout(timeout: number): Jest;
    /**
     * Creates a mock function similar to `jest.fn` but also tracks calls to
     * `object[methodName]`.
     *
     * Note: By default, jest.spyOn also calls the spied method. This is
     * different behavior from most other test libraries.
     */
    spyOn: JestMockSpyOn;
    /**
     * Indicates that the module system should never return a mocked version of
     * the specified module from require() (e.g. that it should always return the
     * real module).
     */
    unmock(moduleName: string): Jest;
    /**
     * Instructs Jest to use fake versions of the standard timer functions.
     */
    useFakeTimers(): Jest;
    /**
     * Instructs Jest to use the real versions of the standard timer functions.
     */
    useRealTimers(): Jest;
    /**
     * `jest.isolateModules(fn)` goes a step further than `jest.resetModules()`
     * and creates a sandbox registry for the modules that are loaded inside
     * the callback function. This is useful to isolate specific modules for
     * every test so that local module state doesn't conflict between tests.
     */
    isolateModules(fn: () => void): Jest;
}
export {};
//# sourceMappingURL=index.d.ts.map
/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/// <reference types="node" />
import { Script } from 'vm';
import { Global, Config } from '@jest/types';
import { ModuleMocker } from 'jest-mock';
import { JestFakeTimers as FakeTimers } from '@jest/fake-timers';
import { JestEnvironment, EnvironmentContext } from '@jest/environment';
import { JSDOM } from 'jsdom';
declare type Win = Window & Global.Global & {
    Error: {
        stackTraceLimit: number;
    };
};
declare class JSDOMEnvironment implements JestEnvironment {
    dom: JSDOM | null;
    fakeTimers: FakeTimers<number> | null;
    global: Win;
    errorEventListener: ((event: Event & {
        error: Error;
    }) => void) | null;
    moduleMocker: ModuleMocker | null;
    constructor(config: Config.ProjectConfig, options?: EnvironmentContext);
    setup(): Promise<void>;
    teardown(): Promise<void>;
    runScript(script: Script): any;
}
export = JSDOMEnvironment;
//# sourceMappingURL=index.d.ts.map
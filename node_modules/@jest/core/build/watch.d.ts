/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/// <reference types="node" />
import HasteMap from 'jest-haste-map';
import { Context } from 'jest-runtime';
import { Config } from '@jest/types';
import { JestHook } from 'jest-watcher';
import { Filter } from './types';
export default function watch(initialGlobalConfig: Config.GlobalConfig, contexts: Array<Context>, outputStream: NodeJS.WriteStream, hasteMapInstances: Array<HasteMap>, stdin?: NodeJS.ReadStream, hooks?: JestHook, filter?: Filter): Promise<void>;
//# sourceMappingURL=watch.d.ts.map
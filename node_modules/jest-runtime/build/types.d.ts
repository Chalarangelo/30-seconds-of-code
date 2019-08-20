/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Config } from '@jest/types';
import HasteResolver from 'jest-resolve';
import { FS as HasteFS, ModuleMap } from 'jest-haste-map';
export declare type Context = {
    config: Config.ProjectConfig;
    hasteFS: HasteFS;
    moduleMap: ModuleMap;
    resolver: HasteResolver;
};
//# sourceMappingURL=types.d.ts.map
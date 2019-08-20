/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Config } from '@jest/types';
declare type AllOptions = Config.ProjectConfig & Config.GlobalConfig;
export default function normalize(options: Config.InitialOptions, argv: Config.Argv, configPath?: Config.Path | null, projectIndex?: number): {
    hasDeprecationWarnings: boolean;
    options: AllOptions;
};
export {};
//# sourceMappingURL=normalize.d.ts.map
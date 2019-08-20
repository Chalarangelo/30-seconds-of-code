/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Config } from '@jest/types';
export declare type Options = {
    lastCommit?: boolean;
    withAncestor?: boolean;
    changedSince?: string;
    includePaths?: Array<Config.Path>;
};
declare type Paths = Set<Config.Path>;
export declare type Repos = {
    git: Paths;
    hg: Paths;
};
export declare type ChangedFiles = {
    repos: Repos;
    changedFiles: Paths;
};
export declare type ChangedFilesPromise = Promise<ChangedFiles>;
export declare type SCMAdapter = {
    findChangedFiles: (cwd: Config.Path, options: Options) => Promise<Array<Config.Path>>;
    getRoot: (cwd: Config.Path) => Promise<Config.Path | null>;
};
export {};
//# sourceMappingURL=types.d.ts.map
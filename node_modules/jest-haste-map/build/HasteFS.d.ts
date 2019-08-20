/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Config } from '@jest/types';
import { FileData } from './types';
export default class HasteFS {
    private readonly _rootDir;
    private readonly _files;
    constructor({ rootDir, files }: {
        rootDir: Config.Path;
        files: FileData;
    });
    getModuleName(file: Config.Path): string | null;
    getSize(file: Config.Path): number | null;
    getDependencies(file: Config.Path): Array<string> | null;
    getSha1(file: Config.Path): string | null;
    exists(file: Config.Path): boolean;
    getAllFiles(): Array<Config.Path>;
    getFileIterator(): Iterable<Config.Path>;
    getAbsoluteFileIterator(): Iterable<Config.Path>;
    matchFiles(pattern: RegExp | string): Array<Config.Path>;
    matchFilesWithGlob(globs: Array<Config.Glob>, root: Config.Path | null): Set<Config.Path>;
    private _getFileData;
}
//# sourceMappingURL=HasteFS.d.ts.map
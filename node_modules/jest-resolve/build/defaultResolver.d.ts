/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Config } from '@jest/types';
declare type ResolverOptions = {
    basedir: Config.Path;
    browser?: boolean;
    defaultResolver: typeof defaultResolver;
    extensions?: Array<string>;
    moduleDirectory?: Array<string>;
    paths?: Array<Config.Path>;
    rootDir?: Config.Path;
};
export default function defaultResolver(path: Config.Path, options: ResolverOptions): Config.Path;
export declare const clearDefaultResolverCache: () => void;
export {};
//# sourceMappingURL=defaultResolver.d.ts.map
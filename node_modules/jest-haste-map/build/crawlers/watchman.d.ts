/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { InternalHasteMap, CrawlerOptions } from '../types';
declare const _default: (options: CrawlerOptions) => Promise<{
    changedFiles?: Map<string, [string, number, number, 0 | 1, string, string | null | undefined]> | undefined;
    removedFiles: Map<string, [string, number, number, 0 | 1, string, string | null | undefined]>;
    hasteMap: InternalHasteMap;
}>;
export = _default;
//# sourceMappingURL=watchman.d.ts.map
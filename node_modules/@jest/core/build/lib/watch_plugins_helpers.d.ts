/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Config } from '@jest/types';
import { WatchPlugin, UsageData } from 'jest-watcher';
export declare const filterInteractivePlugins: (watchPlugins: WatchPlugin[], globalConfig: Config.GlobalConfig) => WatchPlugin[];
export declare const getSortedUsageRows: (watchPlugins: WatchPlugin[], globalConfig: Config.GlobalConfig) => UsageData[];
//# sourceMappingURL=watch_plugins_helpers.d.ts.map
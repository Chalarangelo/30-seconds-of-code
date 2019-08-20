/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Config } from '@jest/types';
export default function getMaxWorkers(argv: Partial<Pick<Config.Argv, 'maxWorkers' | 'runInBand' | 'watch'>>, defaultOptions?: Partial<Pick<Config.Argv, 'maxWorkers'>>): number;
//# sourceMappingURL=getMaxWorkers.d.ts.map
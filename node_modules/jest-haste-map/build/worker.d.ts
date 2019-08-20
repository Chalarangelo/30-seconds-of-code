/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { WorkerMessage, WorkerMetadata } from './types';
export declare function worker(data: WorkerMessage): Promise<WorkerMetadata>;
export declare function getSha1(data: WorkerMessage): Promise<WorkerMetadata>;
//# sourceMappingURL=worker.d.ts.map
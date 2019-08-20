/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Frame } from 'jest-message-util';
export declare type InlineSnapshot = {
    snapshot: string;
    frame: Frame;
};
export declare const saveInlineSnapshots: (snapshots: InlineSnapshot[], prettier: any, babelTraverse: Function) => void;
//# sourceMappingURL=inline_snapshots.d.ts.map
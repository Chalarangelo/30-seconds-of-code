/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
declare type IsCommon = (aIndex: number, // caller can assume: 0 <= aIndex && aIndex < aLength
bIndex: number) => boolean;
declare type FoundSubsequence = (nCommon: number, // caller can assume: 0 < nCommon
aCommon: number, // caller can assume: 0 <= aCommon && aCommon < aLength
bCommon: number) => void;
export declare type Callbacks = {
    foundSubsequence: FoundSubsequence;
    isCommon: IsCommon;
};
declare const _default: (aLength: number, bLength: number, isCommon: IsCommon, foundSubsequence: FoundSubsequence) => void;
export default _default;
//# sourceMappingURL=index.d.ts.map
/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
declare const extractExpectedAssertionsErrors: () => ({
    actual: any;
    error: any;
    expected: number;
} | {
    actual: string;
    error: any;
    expected: string;
})[];
export default extractExpectedAssertionsErrors;
//# sourceMappingURL=extractExpectedAssertionsErrors.d.ts.map
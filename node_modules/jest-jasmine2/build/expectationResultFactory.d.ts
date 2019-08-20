/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { FailedAssertion } from '@jest/test-result';
export declare type Options = {
    matcherName: string;
    passed: boolean;
    actual?: any;
    error?: any;
    expected?: any;
    message?: string | null;
};
export default function expectationResultFactory(options: Options, initError?: Error): FailedAssertion;
//# sourceMappingURL=expectationResultFactory.d.ts.map
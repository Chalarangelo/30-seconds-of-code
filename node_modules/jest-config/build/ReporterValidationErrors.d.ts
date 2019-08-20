/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Config } from '@jest/types';
/**
 * Reporter Validation Error is thrown if the given arguments
 * within the reporter are not valid.
 *
 * This is a highly specific reporter error and in the future will be
 * merged with jest-validate. Till then, we can make use of it. It works
 * and that's what counts most at this time.
 */
export declare function createReporterError(reporterIndex: number, reporterValue: Array<Config.ReporterConfig> | string): import("jest-validate/build/utils").ValidationError;
export declare function createArrayReporterError(arrayReporter: Config.ReporterConfig, reporterIndex: number, valueIndex: number, value: string | Record<string, any>, expectedType: string, valueName: string): import("jest-validate/build/utils").ValidationError;
export declare function validateReporters(reporterConfig: Array<Config.ReporterConfig | string>): boolean;
//# sourceMappingURL=ReporterValidationErrors.d.ts.map
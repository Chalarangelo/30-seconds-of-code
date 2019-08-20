/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
export declare const DEPRECATION: string;
export declare const ERROR: string;
export declare const WARNING: string;
export declare const format: (value: any) => string;
export declare const formatPrettyObject: (value: any) => string;
export declare class ValidationError extends Error {
    name: string;
    message: string;
    constructor(name: string, message: string, comment?: string | null);
}
export declare const logValidationWarning: (name: string, message: string, comment?: string | null | undefined) => void;
export declare const createDidYouMeanMessage: (unrecognized: string, allowedOptions: string[]) => string;
//# sourceMappingURL=utils.d.ts.map
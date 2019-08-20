/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ValidationError } from './utils';
import validateCLIOptions from './validateCLIOptions';
import { multipleValidOptions } from './condition';
declare const _default: {
    ValidationError: typeof ValidationError;
    createDidYouMeanMessage: (unrecognized: string, allowedOptions: string[]) => string;
    format: (value: any) => string;
    logValidationWarning: (name: string, message: string, comment?: string | null | undefined) => void;
    multipleValidOptions: typeof multipleValidOptions;
    validate: (config: Record<string, any>, options: import("./types").ValidationOptions) => {
        hasDeprecationWarnings: boolean;
        isValid: boolean;
    };
    validateCLIOptions: typeof validateCLIOptions;
};
export = _default;
//# sourceMappingURL=index.d.ts.map
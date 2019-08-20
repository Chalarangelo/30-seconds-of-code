/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ValidationOptions } from './types';
declare const validate: (config: Record<string, any>, options: ValidationOptions) => {
    hasDeprecationWarnings: boolean;
    isValid: boolean;
};
export default validate;
//# sourceMappingURL=validate.d.ts.map
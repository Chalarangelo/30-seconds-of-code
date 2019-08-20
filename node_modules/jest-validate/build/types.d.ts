/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
declare type Title = {
    deprecation?: string;
    error?: string;
    warning?: string;
};
export declare type DeprecatedOptions = Record<string, Function>;
export declare type ValidationOptions = {
    comment?: string;
    condition?: (option: any, validOption: any) => boolean;
    deprecate?: (config: Record<string, any>, option: string, deprecatedOptions: DeprecatedOptions, options: ValidationOptions) => boolean;
    deprecatedConfig?: DeprecatedOptions;
    error?: (option: string, received: any, defaultValue: any, options: ValidationOptions, path?: Array<string>) => void;
    exampleConfig: Record<string, any>;
    recursive?: boolean;
    recursiveBlacklist?: Array<string>;
    title?: Title;
    unknown?: (config: Record<string, any>, exampleConfig: Record<string, any>, option: string, options: ValidationOptions, path?: Array<string>) => void;
};
export {};
//# sourceMappingURL=types.d.ts.map
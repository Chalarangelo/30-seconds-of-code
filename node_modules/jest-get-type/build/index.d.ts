/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
declare type ValueType = 'array' | 'boolean' | 'function' | 'null' | 'number' | 'object' | 'regexp' | 'map' | 'set' | 'date' | 'string' | 'symbol' | 'undefined';
declare function getType(value: unknown): ValueType;
declare namespace getType {
    var isPrimitive: (value: unknown) => boolean;
}
export = getType;
//# sourceMappingURL=index.d.ts.map
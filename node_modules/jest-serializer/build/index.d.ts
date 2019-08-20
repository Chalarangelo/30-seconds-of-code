/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/// <reference path="../v8.d.ts" />
/// <reference types="node" />
declare type Path = string;
export declare function deserialize(buffer: Buffer): any;
export declare function serialize(content: unknown): Buffer;
export declare function readFileSync(filePath: Path): any;
export declare function writeFileSync(filePath: Path, content: any): void;
declare const _default: {
    deserialize: typeof deserialize;
    readFileSync: typeof readFileSync;
    serialize: typeof serialize;
    writeFileSync: typeof writeFileSync;
};
export default _default;
//# sourceMappingURL=index.d.ts.map
/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

declare module 'v8' {
  function serialize(value: unknown): Buffer;
  function deserialize(value: Buffer): unknown;
}

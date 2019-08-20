/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { Spy } from '../types';
export default class SpyRegistry {
    allowRespy: (allow: unknown) => void;
    spyOn: (obj: Record<string, any>, methodName: string, accessType?: keyof PropertyDescriptor) => Spy;
    clearSpies: () => void;
    respy: unknown;
    private _spyOnProperty;
    constructor({ currentSpies, }?: {
        currentSpies?: () => Array<Spy>;
    });
}
//# sourceMappingURL=spyRegistry.d.ts.map
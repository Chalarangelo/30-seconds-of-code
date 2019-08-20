/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/// <reference types="node" />
import Prompt from './lib/Prompt';
import { ScrollOptions } from './types';
export default class PatternPrompt {
    protected _pipe: NodeJS.WritableStream;
    protected _prompt: Prompt;
    protected _entityName: string;
    protected _currentUsageRows: number;
    constructor(pipe: NodeJS.WritableStream, prompt: Prompt);
    run(onSuccess: (value: string) => void, onCancel: () => void, options?: {
        header: string;
    }): void;
    protected _onChange(_pattern: string, _options: ScrollOptions): void;
}
//# sourceMappingURL=PatternPrompt.d.ts.map
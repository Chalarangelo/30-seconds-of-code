/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ScrollOptions } from '../types';
export default class Prompt {
    private _entering;
    private _value;
    private _onChange;
    private _onSuccess;
    private _onCancel;
    private _offset;
    private _promptLength;
    private _selection;
    constructor();
    private _onResize;
    enter(onChange: (pattern: string, options: ScrollOptions) => void, onSuccess: (pattern: string) => void, onCancel: () => void): void;
    setPromptLength(length: number): void;
    setPromptSelection(selected: string): void;
    put(key: string): void;
    abort(): void;
    isEntering(): boolean;
}
//# sourceMappingURL=Prompt.d.ts.map
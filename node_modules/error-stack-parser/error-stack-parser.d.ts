// Type definitions for ErrorStackParser v2.0.0
// Project: https://github.com/stacktracejs/error-stack-parser
// Definitions by: Eric Wendelin <https://www.eriwen.com>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare module ErrorStackParser {
    export interface StackFrame {
        constructor(object: StackFrame): StackFrame;

        isConstructor?: boolean;
        getIsConstructor(): boolean;
        setIsConstructor(): void;

        isEval?: boolean;
        getIsEval(): boolean;
        setIsEval(): void;

        isNative?: boolean;
        getIsNative(): boolean;
        setIsNative(): void;

        isTopLevel?: boolean;
        getIsTopLevel(): boolean;
        setIsTopLevel(): void;

        columnNumber?: number;
        getColumnNumber(): number;
        setColumnNumber(): void;

        lineNumber?: number;
        getLineNumber(): number;
        setLineNumber(): void;

        fileName?: string;
        getFileName(): string;
        setFileName(): void;

        functionName?: string;
        getFunctionName(): string;
        setFunctionName(): void;

        source?: string;
        getSource(): string;
        setSource(): void;

        args?: any[];
        getArgs(): any[];
        setArgs(): void;

        evalOrigin?: StackFrame;
        getEvalOrigin(): StackFrame;
        setEvalOrigin(): void;

        toString(): string;
    }

    /**
     * Given an Error object, extract the most information from it.
     *
     * @param {Error} error object
     * @return {Array} of StackFrames
     */
    export function parse(error: Error): StackFrame[];
}

export = ErrorStackParser;

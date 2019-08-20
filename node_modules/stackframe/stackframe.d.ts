// Type definitions for StackFrame v1.0.0
// Project: https://github.com/stacktracejs/stackframe
// Definitions by: Eric Wendelin <https://www.eriwen.com>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare module StackFrame {
    export interface StackFrameOptions {
        isConstructor?: boolean;
        isEval?: boolean;
        isNative?: boolean;
        isToplevel?: boolean;
        columnNumber?: number;
        lineNumber?: number;
        fileName?: string;
        functionName?: string;
        source?: string;
        args?: any[];
    }

    class StackFrame {
        constructor(obj: StackFrameOptions);

        getArgs(): any[];
        setArgs(args: any[]): void;
        getEvalOrigin(): StackFrame;
        setEvalOrigin(stackframe: StackFrame): void;
        getIsConstructor(): boolean;
        setIsConstructor(isConstructor: boolean): void;
        getIsEval(): boolean;
        setIsEval(isEval: boolean): void;
        getIsNative(): boolean;
        setIsNative(isNative: boolean): void;
        getIsToplevel(): boolean;
        setIsToplevel(isToplevel: boolean): void;
        getColumnNumber(): number;
        setColumnNumber(columnNumber: number): void;
        getLineNumber(): number;
        setLineNumber(lineNumber: number): void;
        getFileName(): string;
        setFileName(fileName: string): void;
        getFunctionName(): string;
        setFunctionName(functionName: string): void;
        getSource(): string;
        setSource(source: string): void;
        toString(): string;
    }
}

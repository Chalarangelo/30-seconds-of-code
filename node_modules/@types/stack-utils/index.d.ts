// Type definitions for stack-utils 1.0
// Project: https://github.com/tapjs/stack-utils#readme
// Definitions by: BendingBender <https://github.com/BendingBender>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.2

export = StackUtils;

declare class StackUtils {
    static nodeInternals(): RegExp[];
    constructor(options?: StackUtils.Options);
    clean(stack: string | string[]): string;
    capture(limit?: number, startStackFunction?: Function): StackUtils.CallSite[];
    capture(startStackFunction: Function): StackUtils.CallSite[];
    captureString(limit?: number, startStackFunction?: Function): string;
    captureString(startStackFunction: Function): string;
    at(startStackFunction?: Function): StackUtils.CallSiteLike;
    parseLine(line: string): StackUtils.StackLineData | null;
}

declare namespace StackUtils {
    interface Options {
        internals?: RegExp[];
        cwd?: string;
        wrapCallSite?(callSite: CallSite): CallSite;
    }

    interface CallSite {
        getThis(): object | undefined;
        getTypeName(): string;
        getFunction(): Function | undefined;
        getFunctionName(): string;
        getMethodName(): string | null;
        getFileName(): string | undefined;
        getLineNumber(): number;
        getColumnNumber(): number;
        getEvalOrigin(): CallSite | string;
        isToplevel(): boolean;
        isEval(): boolean;
        isNative(): boolean;
        isConstructor(): boolean;
    }

    interface CallSiteLike extends StackData {
        type?: string;
    }

    interface StackLineData extends StackData {
        evalLine?: number;
        evalColumn?: number;
        evalFile?: string;
    }

    interface StackData {
        line?: number;
        column?: number;
        file?: string;
        constructor?: boolean;
        evalOrigin?: string;
        native?: boolean;
        function?: string;
        method?: string;
    }
}

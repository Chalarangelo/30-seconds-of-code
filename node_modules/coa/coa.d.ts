/// <reference types="q"/>

export const Arg: undefined;

export const Opt: undefined;

export function Cmd(cmd?: classes.Cmd): classes.Cmd;

export namespace classes {
    class Arg {
        constructor(cmd: Cmd);
        name(name: string): Arg;
        title(title: string): Arg;
        arr(): Arg;
        req(): Arg;
        val(validation: (this: Arg, value: any) => boolean): Arg;
        def(def: any): Arg;
        output(): Arg;
        comp(fn: (opts: any) => any): Arg;
        end(): Cmd;
        apply(...args: any[]): Arg;
        input(): Arg;
        reject(...args: any[]): Arg;
    }

    class Cmd {
        constructor(cmd?: Cmd);
        static create(cmd?: Cmd): Cmd;
        api(): any;
        name(name: string): Cmd;
        title(title: string): Cmd;
        cmd(cmd?: Cmd): Cmd;
        opt(): Opt;
        arg(): Arg;
        act(act: (opts: any, args: any[], res: any) => any, force?: boolean): Cmd;
        apply(fn: Function, args?: any[]): Cmd;
        comp(fs: (opts: any) => any): Cmd;
        helpful(): Cmd;
        completable(): Cmd;
        usage(): string;
        run(argv: string[]): Cmd;
        invoke(cmds?: string|string[], opts?: any, args?: any): Q.Promise<any>;
        reject(reason: any): Q.Promise<any>;
        end(): Cmd;
        do(argv: string[]): any;
        extendable(pattern?: string): Cmd;
    }

    class Opt {
        constructor(cmd?: Cmd);
        name(name: string): Opt;
        title(title: string): Opt;
        short(short: string): Opt;
        long(long: string): Opt;
        flag(): Opt;
        arr(): Opt;
        req(): Opt;
        only(): Opt;
        val(validation: (this: Opt, value: any) => boolean): Opt;
        def(def: any): Opt;
        input(): Opt;
        output(): Opt;
        act(act: (opts: any, args: any[], res: any) => any): Opt;
        comp(fn: (opts: any) => any): Opt;
        end(): Cmd;
        apply(...args: any[]): void;
        reject(...args: any[]): void;
    }
}

export namespace shell {
    function escape(w: string): string;
    function unescape(w: string): string;
}

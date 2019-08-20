// Type definitions for Glob 5.0
// Project: https://github.com/isaacs/node-glob
// Definitions by: vvakame <https://github.com/vvakame>
//                 voy <https://github.com/voy>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

/// <reference types="node" />

import events = require("events");
import fs = require('fs');
import minimatch = require("minimatch");

declare function G(pattern: string, cb: (err: Error | null, matches: string[]) => void): void;
declare function G(pattern: string, options: G.IOptions, cb: (err: Error | null, matches: string[]) => void): void;

declare namespace G {
    function __promisify__(pattern: string, options?: IOptions): Promise<string[]>;

    function sync(pattern: string, options?: IOptions): string[];

    function hasMagic(pattern: string, options?: IOptions): boolean;

    let Glob: IGlobStatic;
    let GlobSync: IGlobSyncStatic;

    interface IOptions extends minimatch.IOptions {
        cwd?: string;
        root?: string;
        dot?: boolean;
        nomount?: boolean;
        mark?: boolean;
        nosort?: boolean;
        stat?: boolean;
        silent?: boolean;
        strict?: boolean;
        cache?: { [path: string]: any /* boolean | string | string[] */ };
        statCache?: { [path: string]: fs.Stats };
        symlinks?: any;
        sync?: boolean;
        nounique?: boolean;
        nonull?: boolean;
        debug?: boolean;
        nobrace?: boolean;
        noglobstar?: boolean;
        noext?: boolean;
        nocase?: boolean;
        matchBase?: any;
        nodir?: boolean;
        ignore?: any; /* string | string[] */
        follow?: boolean;
        realpath?: boolean;
        nonegate?: boolean;
        nocomment?: boolean;
        absolute?: boolean;

        /** Deprecated. */
        globDebug?: boolean;
    }

    interface IGlobStatic extends events.EventEmitter {
        new (pattern: string, cb?: (err: Error | null, matches: string[]) => void): IGlob;
        new (pattern: string, options: IOptions, cb?: (err: Error | null, matches: string[]) => void): IGlob;
        prototype: IGlob;
    }

    interface IGlobSyncStatic {
        new (pattern: string, options?: IOptions): IGlobBase;
        prototype: IGlobBase;
    }

    interface IGlobBase {
        minimatch: minimatch.IMinimatch;
        options: IOptions;
        aborted: boolean;
        cache: { [path: string]: any /* boolean | string | string[] */ };
        statCache: { [path: string]: fs.Stats };
        symlinks: { [path: string]: boolean };
        realpathCache: { [path: string]: string };
        found: string[];
    }

    interface IGlob extends IGlobBase, events.EventEmitter {
        pause(): void;
        resume(): void;
        abort(): void;

        /** Deprecated. */
        EOF: any;
        /** Deprecated. */
        paused: boolean;
        /** Deprecated. */
        maxDepth: number;
        /** Deprecated. */
        maxLength: number;
        /** Deprecated. */
        changedCwd: boolean;
        /** Deprecated. */
        cwd: string;
        /** Deprecated. */
        root: string;
        /** Deprecated. */
        error: any;
        /** Deprecated. */
        matches: string[];
        /** Deprecated. */
        log(...args: any[]): void;
        /** Deprecated. */
        emitMatch(m: any): void;
    }
}

export = G;

/// <reference types="node" />

import fs = require('fs');

declare namespace re {
    interface Entry extends fs.Stats {
        path: string;
        depth: number;
    }

    type FilterFunction = (stat: Entry) => boolean;
    type Callback<T> = (err: NodeJS.ErrnoException, result: T) => void;
    type CallbackString = Callback<string[]>;
    type CallbackEntry = Callback<Entry[]>;

    interface FileSystem {
        readdir?: (path: string, callback: Callback<string[]>) => void;
        lstat?: (path: string, callback: Callback<fs.Stats>) => void;
        stat?: (path: string, callback: Callback<fs.Stats>) => void;
    }

    interface Options {
        filter?: string | RegExp | FilterFunction;
        deep?: boolean | number | RegExp | FilterFunction;
        sep?: string;
        basePath?: string;
        fs?: FileSystem;
    }

    function stat(root: string, options?: Options): Promise<Entry[]>;
    function stat(root: string, callback: CallbackEntry): void;
    function stat(root: string, options: Options, callback: CallbackEntry): void;

    function async(root: string, options?: Options): Promise<string[]>;
    function async(root: string, callback: CallbackString): void;
    function async(root: string, options: Options, callback: CallbackString): void;

    function readdirAsyncStat(root: string, options?: Options): Promise<Entry[]>;
    function readdirAsyncStat(root: string, callback: CallbackEntry): void;
    function readdirAsyncStat(root: string, options: Options, callback: CallbackEntry): void;

    namespace async {
        function stat(root: string, options?: Options): Promise<Entry[]>;
        function stat(root: string, callback: CallbackEntry): void;
        function stat(root: string, options: Options, callback: CallbackEntry): void;
    }

    function stream(root: string, options?: Options): NodeJS.ReadableStream;
    function readdirStreamStat(root: string, options?: Options): NodeJS.ReadableStream;

    namespace stream {
        function stat(root: string, options?: Options): NodeJS.ReadableStream;
    }

    function sync(root: string, options?: Options): string[];
    function readdirSyncStat(root: string, options?: Options): Entry[];

    namespace sync {
        function stat(root: string, options?: Options): Entry[];
    }
}

declare function re(root: string, options?: re.Options): Promise<string[]>;
declare function re(root: string, callback: re.CallbackString): void;
declare function re(root: string, options: re.Options, callback: re.CallbackString): void;

export = re;

import { FileSystemAdapter } from '../adapters/fs';
export interface Options {
    fs?: Partial<FileSystemAdapter>;
    throwErrorOnBrokenSymlinks?: boolean;
    followSymlinks?: boolean;
}
export declare type StrictOptions = {
    fs: FileSystemAdapter;
} & Required<Options>;
export declare function prepare(opts?: Options): StrictOptions;
//# sourceMappingURL=options.d.ts.map
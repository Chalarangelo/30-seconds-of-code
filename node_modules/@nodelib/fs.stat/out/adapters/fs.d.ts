/// <reference types="node" />
import * as fs from 'fs';
export interface FileSystemAdapter {
    lstat: typeof fs.lstat;
    stat: typeof fs.stat;
    lstatSync: typeof fs.lstatSync;
    statSync: typeof fs.statSync;
}
export declare const FILE_SYSTEM_ADAPTER: FileSystemAdapter;
export declare function getFileSystemAdapter(fsMethods?: Partial<FileSystemAdapter>): FileSystemAdapter;
//# sourceMappingURL=fs.d.ts.map
export declare const absolutePath: RegExp;
export declare const relativePath: RegExp;
export declare function isAbsolute(path: string): boolean;
export declare function isRelative(path: string): boolean;
export declare function normalize(path: string): string;
export { basename, dirname, extname, relative, resolve } from 'path';

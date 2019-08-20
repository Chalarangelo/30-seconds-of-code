import { EntryItem } from '../types/entries';
import { Pattern } from '../types/patterns';
export declare type TransformFunction<T> = (entry: EntryItem) => T;
export interface IOptions<T = EntryItem> {
    /**
     * The current working directory in which to search.
     */
    cwd: string;
    /**
     * The deep option can be set to true to traverse the entire directory structure,
     * or it can be set to a number to only traverse that many levels deep.
     */
    deep: number | boolean;
    /**
     * Add an array of glob patterns to exclude matches.
     */
    ignore: Pattern[];
    /**
     * Allow patterns to match filenames starting with a period (files & directories),
     * even if the pattern does not explicitly have a period in that spot.
     */
    dot: boolean;
    /**
     * Return `fs.Stats` with `path` property instead of file path.
     */
    stats: boolean;
    /**
     * Return only files.
     */
    onlyFiles: boolean;
    /**
     * Return only directories.
     */
    onlyDirectories: boolean;
    /**
     * Follow symlinked directories when expanding `**` patterns.
     */
    followSymlinkedDirectories: boolean;
    /**
     * Prevent duplicate results.
     */
    unique: boolean;
    /**
     * Add a `/` character to directory entries.
     */
    markDirectories: boolean;
    /**
     * Return absolute paths for matched entries.
     */
    absolute: boolean;
    /**
     * Disable expansion of brace patterns.
     */
    nobrace: boolean;
    /**
     * Enable expansion of brace patterns.
     */
    brace: boolean;
    /**
     * Disable matching with globstars (`**`).
     */
    noglobstar: boolean;
    /**
     * Enable matching with globstars (`**`).
     */
    globstar: boolean;
    /**
     * Disable extglob support, so that extglobs are regarded as literal characters.
     */
    noext: boolean;
    /**
     * Enable extglob support, so that extglobs are regarded as literal characters.
     */
    extension: boolean;
    /**
     * Disable a case-insensitive regex for matching files.
     */
    nocase: boolean;
    /**
     * Enable a case-insensitive regex for matching files.
     */
    case: boolean;
    /**
     * Allow glob patterns without slashes to match a file path based on its basename.
     * For example, `a?b` would match the path `/xyz/123/acb`, but not `/xyz/acb/123`.
     */
    matchBase: boolean;
    /**
     * Allows you to transform a path or `fs.Stats` object before sending to the array.
     */
    transform: TransformFunction<T> | null;
}
export declare type IPartialOptions<T = EntryItem> = Partial<IOptions<T>>;
export declare function prepare(options?: IPartialOptions): IOptions;

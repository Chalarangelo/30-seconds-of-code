/**
 * Returns «true» if the last partial of the path starting with a period.
 */
export declare function isDotDirectory(filepath: string): boolean;
/**
 * Convert a windows-like path to a unix-style path.
 */
export declare function normalize(filepath: string): string;
/**
 * Returns normalized absolute path of provided filepath.
 */
export declare function makeAbsolute(cwd: string, filepath: string): string;

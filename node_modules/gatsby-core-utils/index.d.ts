/**
 * Encrypts an input using md5 hash of hexadecimal digest.
 *
 * @param {*} input The input to encrypt
 * @return {string} The content digest
 */
export declare function createContentDigest(input: any): string

/**
 * Joins all given path segments and converts
 * @param {string[]} paths A sequence of path segments
 */
export declare function joinPath(...paths: string[]): string

/**
 * Calculate CPU core count
 *
 * @param {boolean} ignoreEnvVar Ignore the 'GATSBY_CPU_COUNT' env var to calculate the requested type of CPU cores
 * @return {number} Count of the requested type of CPU cores. Defaults to number of physical cores or 1
 */
export declare function cpuCoreCount(ignoreEnvVar?: boolean): number

/**
 * Joins all given segments and converts using a forward slash (/) as a delimiter
 * @param {string[]} segments A sequence of segments
 */
export declare function urlResolve(...segments: string[]): string

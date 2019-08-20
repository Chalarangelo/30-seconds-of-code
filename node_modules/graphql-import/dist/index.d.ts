/**
 * Describes the information from a single import line
 *
 */
export interface RawModule {
    imports: string[];
    from: string;
}
/**
 * Parse a single import line and extract imported types and schema filename
 *
 * @param importLine Import line
 * @returns Processed import line
 */
export declare function parseImportLine(importLine: string): RawModule;
/**
 * Parse a schema and analyze all import lines
 *
 * @param sdl Schema to parse
 * @returns Array with collection of imports per import line (file)
 */
export declare function parseSDL(sdl: string): RawModule[];
/**
 * Main entry point. Recursively process all import statement in a schema
 *
 * @param filePath File path to the initial schema file
 * @returns Single bundled schema with all imported types
 */
export declare function importSchema(schema: string, schemas?: {
    [key: string]: string;
}): string;

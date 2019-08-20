import micromatch = require('micromatch');
import { Pattern, PatternRe } from '../types/patterns';
/**
 * Return true for static pattern.
 */
export declare function isStaticPattern(pattern: Pattern): boolean;
/**
 * Return true for pattern that looks like glob.
 */
export declare function isDynamicPattern(pattern: Pattern): boolean;
/**
 * Convert a windows «path» to a unix-style «path».
 */
export declare function unixifyPattern(pattern: Pattern): Pattern;
/**
 * Returns negative pattern as positive pattern.
 */
export declare function convertToPositivePattern(pattern: Pattern): Pattern;
/**
 * Returns positive pattern as negative pattern.
 */
export declare function convertToNegativePattern(pattern: Pattern): Pattern;
/**
 * Return true if provided pattern is negative pattern.
 */
export declare function isNegativePattern(pattern: Pattern): boolean;
/**
 * Return true if provided pattern is positive pattern.
 */
export declare function isPositivePattern(pattern: Pattern): boolean;
/**
 * Extracts negative patterns from array of patterns.
 */
export declare function getNegativePatterns(patterns: Pattern[]): Pattern[];
/**
 * Extracts positive patterns from array of patterns.
 */
export declare function getPositivePatterns(patterns: Pattern[]): Pattern[];
/**
 * Extract base directory from provided pattern.
 */
export declare function getBaseDirectory(pattern: Pattern): string;
/**
 * Return true if provided pattern has globstar.
 */
export declare function hasGlobStar(pattern: Pattern): boolean;
/**
 * Return true if provided pattern ends with slash and globstar.
 */
export declare function endsWithSlashGlobStar(pattern: Pattern): boolean;
/**
 * Returns «true» when pattern ends with a slash and globstar or the last partial of the pattern is static pattern.
 */
export declare function isAffectDepthOfReadingPattern(pattern: Pattern): boolean;
/**
 * Return naive depth of provided pattern without depth of the base directory.
 */
export declare function getNaiveDepth(pattern: Pattern): number;
/**
 * Return max naive depth of provided patterns without depth of the base directory.
 */
export declare function getMaxNaivePatternsDepth(patterns: Pattern[]): number;
/**
 * Make RegExp for provided pattern.
 */
export declare function makeRe(pattern: Pattern, options: micromatch.Options): PatternRe;
/**
 * Convert patterns to regexps.
 */
export declare function convertPatternsToRe(patterns: Pattern[], options: micromatch.Options): PatternRe[];
/**
 * Returns true if the entry match any of the given RegExp's.
 */
export declare function matchAny(entry: string, patternsRe: PatternRe[]): boolean;

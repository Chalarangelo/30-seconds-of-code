import micromatch = require('micromatch');
import { IOptions } from '../../managers/options';
import { FilterFunction } from '@mrmlnc/readdir-enhanced';
import { Pattern } from '../../types/patterns';
export default class DeepFilter {
    private readonly options;
    private readonly micromatchOptions;
    constructor(options: IOptions, micromatchOptions: micromatch.Options);
    /**
     * Returns filter for directories.
     */
    getFilter(positive: Pattern[], negative: Pattern[]): FilterFunction;
    /**
     * Returns max depth of the provided patterns.
     */
    private getMaxPatternDepth;
    /**
     * Returns RegExp's for patterns that can affect the depth of reading.
     */
    private getNegativePatternsRe;
    /**
     * Returns «true» for directory that should be read.
     */
    private filter;
    /**
     * Returns «true» when the «deep» option is disabled or number and depth of the entry is greater that the option value.
     */
    private isSkippedByDeepOption;
    /**
     * Returns «true» when depth parameter is not an Infinity and entry depth greater that the parameter value.
     */
    private isSkippedByMaxPatternDepth;
    /**
     * Returns «true» for symlinked directory if the «followSymlinkedDirectories» option is disabled.
     */
    private isSkippedSymlinkedDirectory;
    /**
     * Returns «true» for a directory whose name starts with a period if «dot» option is disabled.
     */
    private isSkippedDotDirectory;
    /**
     * Returns «true» for a directory whose path math to any negative pattern.
     */
    private isSkippedByNegativePatterns;
}

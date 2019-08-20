"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pathUtils = require("../../utils/path");
var patternUtils = require("../../utils/pattern");
var DeepFilter = /** @class */ (function () {
    function DeepFilter(options, micromatchOptions) {
        this.options = options;
        this.micromatchOptions = micromatchOptions;
    }
    /**
     * Returns filter for directories.
     */
    DeepFilter.prototype.getFilter = function (positive, negative) {
        var _this = this;
        var maxPatternDepth = this.getMaxPatternDepth(positive);
        var negativeRe = this.getNegativePatternsRe(negative);
        return function (entry) { return _this.filter(entry, negativeRe, maxPatternDepth); };
    };
    /**
     * Returns max depth of the provided patterns.
     */
    DeepFilter.prototype.getMaxPatternDepth = function (patterns) {
        var globstar = patterns.some(patternUtils.hasGlobStar);
        return globstar ? Infinity : patternUtils.getMaxNaivePatternsDepth(patterns);
    };
    /**
     * Returns RegExp's for patterns that can affect the depth of reading.
     */
    DeepFilter.prototype.getNegativePatternsRe = function (patterns) {
        var affectDepthOfReadingPatterns = patterns.filter(patternUtils.isAffectDepthOfReadingPattern);
        return patternUtils.convertPatternsToRe(affectDepthOfReadingPatterns, this.micromatchOptions);
    };
    /**
     * Returns «true» for directory that should be read.
     */
    DeepFilter.prototype.filter = function (entry, negativeRe, maxPatternDepth) {
        if (this.isSkippedByDeepOption(entry.depth)) {
            return false;
        }
        if (this.isSkippedByMaxPatternDepth(entry.depth, maxPatternDepth)) {
            return false;
        }
        if (this.isSkippedSymlinkedDirectory(entry)) {
            return false;
        }
        if (this.isSkippedDotDirectory(entry)) {
            return false;
        }
        return this.isSkippedByNegativePatterns(entry, negativeRe);
    };
    /**
     * Returns «true» when the «deep» option is disabled or number and depth of the entry is greater that the option value.
     */
    DeepFilter.prototype.isSkippedByDeepOption = function (entryDepth) {
        return !this.options.deep || (typeof this.options.deep === 'number' && entryDepth >= this.options.deep);
    };
    /**
     * Returns «true» when depth parameter is not an Infinity and entry depth greater that the parameter value.
     */
    DeepFilter.prototype.isSkippedByMaxPatternDepth = function (entryDepth, maxPatternDepth) {
        return maxPatternDepth !== Infinity && entryDepth >= maxPatternDepth;
    };
    /**
     * Returns «true» for symlinked directory if the «followSymlinkedDirectories» option is disabled.
     */
    DeepFilter.prototype.isSkippedSymlinkedDirectory = function (entry) {
        return !this.options.followSymlinkedDirectories && entry.isSymbolicLink();
    };
    /**
     * Returns «true» for a directory whose name starts with a period if «dot» option is disabled.
     */
    DeepFilter.prototype.isSkippedDotDirectory = function (entry) {
        return !this.options.dot && pathUtils.isDotDirectory(entry.path);
    };
    /**
     * Returns «true» for a directory whose path math to any negative pattern.
     */
    DeepFilter.prototype.isSkippedByNegativePatterns = function (entry, negativeRe) {
        return !patternUtils.matchAny(entry.path, negativeRe);
    };
    return DeepFilter;
}());
exports.default = DeepFilter;

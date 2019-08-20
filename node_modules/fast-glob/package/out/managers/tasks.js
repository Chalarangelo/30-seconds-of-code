"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var patternUtils = require("../utils/pattern");
/**
 * Generate tasks based on parent directory of each pattern.
 */
function generate(patterns, options) {
    var unixPatterns = patterns.map(patternUtils.unixifyPattern);
    var unixIgnore = options.ignore.map(patternUtils.unixifyPattern);
    var positivePatterns = getPositivePatterns(unixPatterns);
    var negativePatterns = getNegativePatternsAsPositive(unixPatterns, unixIgnore);
    /**
     * When the `case` option is disabled, all patterns must be marked as dynamic, because we cannot check filepath
     * directly (without read directory).
     */
    var staticPatterns = !options.case ? [] : positivePatterns.filter(patternUtils.isStaticPattern);
    var dynamicPatterns = !options.case ? positivePatterns : positivePatterns.filter(patternUtils.isDynamicPattern);
    var staticTasks = convertPatternsToTasks(staticPatterns, negativePatterns, /* dynamic */ false);
    var dynamicTasks = convertPatternsToTasks(dynamicPatterns, negativePatterns, /* dynamic */ true);
    return staticTasks.concat(dynamicTasks);
}
exports.generate = generate;
/**
 * Convert patterns to tasks based on parent directory of each pattern.
 */
function convertPatternsToTasks(positive, negative, dynamic) {
    var positivePatternsGroup = groupPatternsByBaseDirectory(positive);
    // When we have a global group – there is no reason to divide the patterns into independent tasks.
    // In this case, the global task covers the rest.
    if ('.' in positivePatternsGroup) {
        var task = convertPatternGroupToTask('.', positive, negative, dynamic);
        return [task];
    }
    return convertPatternGroupsToTasks(positivePatternsGroup, negative, dynamic);
}
exports.convertPatternsToTasks = convertPatternsToTasks;
/**
 * Return only positive patterns.
 */
function getPositivePatterns(patterns) {
    return patternUtils.getPositivePatterns(patterns);
}
exports.getPositivePatterns = getPositivePatterns;
/**
 * Return only negative patterns.
 */
function getNegativePatternsAsPositive(patterns, ignore) {
    var negative = patternUtils.getNegativePatterns(patterns).concat(ignore);
    var positive = negative.map(patternUtils.convertToPositivePattern);
    return positive;
}
exports.getNegativePatternsAsPositive = getNegativePatternsAsPositive;
/**
 * Group patterns by base directory of each pattern.
 */
function groupPatternsByBaseDirectory(patterns) {
    return patterns.reduce(function (collection, pattern) {
        var base = patternUtils.getBaseDirectory(pattern);
        if (base in collection) {
            collection[base].push(pattern);
        }
        else {
            collection[base] = [pattern];
        }
        return collection;
    }, {});
}
exports.groupPatternsByBaseDirectory = groupPatternsByBaseDirectory;
/**
 * Convert group of patterns to tasks.
 */
function convertPatternGroupsToTasks(positive, negative, dynamic) {
    return Object.keys(positive).map(function (base) {
        return convertPatternGroupToTask(base, positive[base], negative, dynamic);
    });
}
exports.convertPatternGroupsToTasks = convertPatternGroupsToTasks;
/**
 * Create a task for positive and negative patterns.
 */
function convertPatternGroupToTask(base, positive, negative, dynamic) {
    return {
        base: base,
        dynamic: dynamic,
        positive: positive,
        negative: negative,
        patterns: [].concat(positive, negative.map(patternUtils.convertToNegativePattern))
    };
}
exports.convertPatternGroupToTask = convertPatternGroupToTask;

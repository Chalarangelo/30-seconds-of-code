/**
 * @fileoverview Default CLIEngineOptions.
 * @author Ian VanSchooten
 */

"use strict";

module.exports = {
    configFile: null,
    baseConfig: false,
    rulePaths: [],
    useEslintrc: true,
    envs: [],
    globals: [],
    extensions: [".js"],
    ignore: true,
    ignorePath: null,
    cache: false,

    /*
     * in order to honor the cacheFile option if specified
     * this option should not have a default value otherwise
     * it will always be used
     */
    cacheLocation: "",
    cacheFile: ".eslintcache",
    fix: false,
    allowInlineConfig: true,
    reportUnusedDisableDirectives: false,
    globInputPaths: true
};

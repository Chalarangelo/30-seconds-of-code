/**
 * @fileoverview Options configuration for optionator.
 * @author George Zahariev
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const optionator = require("optionator");

//------------------------------------------------------------------------------
// Initialization and Public Interface
//------------------------------------------------------------------------------

// exports "parse(args)", "generateHelp()", and "generateHelpForOption(optionName)"
module.exports = optionator({
    prepend: "eslint [options] file.js [file.js] [dir]",
    defaults: {
        concatRepeatedArrays: true,
        mergeRepeatedObjects: true
    },
    options: [
        {
            heading: "Basic configuration"
        },
        {
            option: "eslintrc",
            type: "Boolean",
            default: "true",
            description: "Disable use of configuration from .eslintrc.*"
        },
        {
            option: "config",
            alias: "c",
            type: "path::String",
            description: "Use this configuration, overriding .eslintrc.* config options if present"
        },
        {
            option: "env",
            type: "[String]",
            description: "Specify environments"
        },
        {
            option: "ext",
            type: "[String]",
            default: ".js",
            description: "Specify JavaScript file extensions"
        },
        {
            option: "global",
            type: "[String]",
            description: "Define global variables"
        },
        {
            option: "parser",
            type: "String",
            description: "Specify the parser to be used"
        },
        {
            option: "parser-options",
            type: "Object",
            description: "Specify parser options"
        },
        {
            heading: "Specifying rules and plugins"
        },
        {
            option: "rulesdir",
            type: "[path::String]",
            description: "Use additional rules from this directory"
        },
        {
            option: "plugin",
            type: "[String]",
            description: "Specify plugins"
        },
        {
            option: "rule",
            type: "Object",
            description: "Specify rules"
        },
        {
            heading: "Fixing problems"
        },
        {
            option: "fix",
            type: "Boolean",
            default: false,
            description: "Automatically fix problems"
        },
        {
            option: "fix-dry-run",
            type: "Boolean",
            default: false,
            description: "Automatically fix problems without saving the changes to the file system"
        },
        {
            option: "fix-type",
            type: "Array",
            description: "Specify the types of fixes to apply (problem, suggestion, layout)"
        },
        {
            heading: "Ignoring files"
        },
        {
            option: "ignore-path",
            type: "path::String",
            description: "Specify path of ignore file"
        },
        {
            option: "ignore",
            type: "Boolean",
            default: "true",
            description: "Disable use of ignore files and patterns"
        },
        {
            option: "ignore-pattern",
            type: "[String]",
            description: "Pattern of files to ignore (in addition to those in .eslintignore)",
            concatRepeatedArrays: [true, {
                oneValuePerFlag: true
            }]
        },
        {
            heading: "Using stdin"
        },
        {
            option: "stdin",
            type: "Boolean",
            default: "false",
            description: "Lint code provided on <STDIN>"
        },
        {
            option: "stdin-filename",
            type: "String",
            description: "Specify filename to process STDIN as"
        },
        {
            heading: "Handling warnings"
        },
        {
            option: "quiet",
            type: "Boolean",
            default: "false",
            description: "Report errors only"
        },
        {
            option: "max-warnings",
            type: "Int",
            default: "-1",
            description: "Number of warnings to trigger nonzero exit code"
        },
        {
            heading: "Output"
        },
        {
            option: "output-file",
            alias: "o",
            type: "path::String",
            description: "Specify file to write report to"
        },
        {
            option: "format",
            alias: "f",
            type: "String",
            default: "stylish",
            description: "Use a specific output format"
        },
        {
            option: "color",
            type: "Boolean",
            alias: "no-color",
            description: "Force enabling/disabling of color"
        },
        {
            heading: "Inline configuration comments"
        },
        {
            option: "inline-config",
            type: "Boolean",
            default: "true",
            description: "Prevent comments from changing config or rules"
        },
        {
            option: "report-unused-disable-directives",
            type: "Boolean",
            default: false,
            description: "Adds reported errors for unused eslint-disable directives"
        },
        {
            heading: "Caching"
        },
        {
            option: "cache",
            type: "Boolean",
            default: "false",
            description: "Only check changed files"
        },
        {
            option: "cache-file",
            type: "path::String",
            default: ".eslintcache",
            description: "Path to the cache file. Deprecated: use --cache-location"
        },
        {
            option: "cache-location",
            type: "path::String",
            description: "Path to the cache file or directory"
        },
        {
            heading: "Miscellaneous"
        },
        {
            option: "init",
            type: "Boolean",
            default: "false",
            description: "Run config initialization wizard"
        },
        {
            option: "debug",
            type: "Boolean",
            default: false,
            description: "Output debugging information"
        },
        {
            option: "help",
            alias: "h",
            type: "Boolean",
            description: "Show help"
        },
        {
            option: "version",
            alias: "v",
            type: "Boolean",
            description: "Output the version number"
        },
        {
            option: "print-config",
            type: "path::String",
            description: "Print the configuration for the given file"
        }
    ]
});

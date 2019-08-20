"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var FileSystem = /** @class */ (function () {
    function FileSystem(options) {
        this.options = options;
    }
    /**
     * Return full path to entry.
     */
    FileSystem.prototype.getFullEntryPath = function (filepath) {
        return path.resolve(this.options.cwd, filepath);
    };
    /**
     * Return an implementation of the Entry interface.
     */
    FileSystem.prototype.makeEntry = function (stat, pattern) {
        stat.path = pattern;
        stat.depth = pattern.split('/').length;
        return stat;
    };
    return FileSystem;
}());
exports.default = FileSystem;

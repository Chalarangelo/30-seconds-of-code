"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var deep_1 = require("./filters/deep");
var entry_1 = require("./filters/entry");
var pathUtil = require("../utils/path");
var Reader = /** @class */ (function () {
    function Reader(options) {
        this.options = options;
        this.micromatchOptions = this.getMicromatchOptions();
        this.entryFilter = new entry_1.default(options, this.micromatchOptions);
        this.deepFilter = new deep_1.default(options, this.micromatchOptions);
    }
    /**
     * Returns root path to scanner.
     */
    Reader.prototype.getRootDirectory = function (task) {
        return path.resolve(this.options.cwd, task.base);
    };
    /**
     * Returns options for reader.
     */
    Reader.prototype.getReaderOptions = function (task) {
        return {
            basePath: task.base === '.' ? '' : task.base,
            filter: this.entryFilter.getFilter(task.positive, task.negative),
            deep: this.deepFilter.getFilter(task.positive, task.negative),
            sep: '/'
        };
    };
    /**
     * Returns options for micromatch.
     */
    Reader.prototype.getMicromatchOptions = function () {
        return {
            dot: this.options.dot,
            nobrace: !this.options.brace,
            noglobstar: !this.options.globstar,
            noext: !this.options.extension,
            nocase: !this.options.case,
            matchBase: this.options.matchBase
        };
    };
    /**
     * Returns transformed entry.
     */
    Reader.prototype.transform = function (entry) {
        if (this.options.absolute) {
            entry.path = pathUtil.makeAbsolute(this.options.cwd, entry.path);
        }
        if (this.options.markDirectories && entry.isDirectory()) {
            entry.path += '/';
        }
        var item = this.options.stats ? entry : entry.path;
        if (this.options.transform === null) {
            return item;
        }
        return this.options.transform(item);
    };
    /**
     * Returns true if error has ENOENT code.
     */
    Reader.prototype.isEnoentCodeError = function (err) {
        return err.code === 'ENOENT';
    };
    return Reader;
}());
exports.default = Reader;

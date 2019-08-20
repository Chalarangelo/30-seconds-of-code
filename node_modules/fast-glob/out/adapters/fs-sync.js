"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var fsStat = require("@nodelib/fs.stat");
var fs_1 = require("./fs");
var FileSystemSync = /** @class */ (function (_super) {
    __extends(FileSystemSync, _super);
    function FileSystemSync() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Use sync API to read entries for Task.
     */
    FileSystemSync.prototype.read = function (patterns, filter) {
        var _this = this;
        var entries = [];
        patterns.forEach(function (pattern) {
            var filepath = _this.getFullEntryPath(pattern);
            var entry = _this.getEntry(filepath, pattern);
            if (entry === null || !filter(entry)) {
                return;
            }
            entries.push(entry);
        });
        return entries;
    };
    /**
     * Return entry for the provided path.
     */
    FileSystemSync.prototype.getEntry = function (filepath, pattern) {
        try {
            var stat = this.getStat(filepath);
            return this.makeEntry(stat, pattern);
        }
        catch (err) {
            return null;
        }
    };
    /**
     * Return fs.Stats for the provided path.
     */
    FileSystemSync.prototype.getStat = function (filepath) {
        return fsStat.statSync(filepath, { throwErrorOnBrokenSymlinks: false });
    };
    return FileSystemSync;
}(fs_1.default));
exports.default = FileSystemSync;

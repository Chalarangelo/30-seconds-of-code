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
var stream = require("stream");
var fsStat = require("@nodelib/fs.stat");
var fs_1 = require("./fs");
var FileSystemStream = /** @class */ (function (_super) {
    __extends(FileSystemStream, _super);
    function FileSystemStream() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Use stream API to read entries for Task.
     */
    FileSystemStream.prototype.read = function (patterns, filter) {
        var _this = this;
        var filepaths = patterns.map(this.getFullEntryPath, this);
        var transform = new stream.Transform({ objectMode: true });
        transform._transform = function (index, _enc, done) {
            return _this.getEntry(filepaths[index], patterns[index]).then(function (entry) {
                if (entry !== null && filter(entry)) {
                    transform.push(entry);
                }
                if (index === filepaths.length - 1) {
                    transform.end();
                }
                done();
            });
        };
        for (var i = 0; i < filepaths.length; i++) {
            transform.write(i);
        }
        return transform;
    };
    /**
     * Return entry for the provided path.
     */
    FileSystemStream.prototype.getEntry = function (filepath, pattern) {
        var _this = this;
        return this.getStat(filepath)
            .then(function (stat) { return _this.makeEntry(stat, pattern); })
            .catch(function () { return null; });
    };
    /**
     * Return fs.Stats for the provided path.
     */
    FileSystemStream.prototype.getStat = function (filepath) {
        return fsStat.stat(filepath, { throwErrorOnBrokenSymlinks: false });
    };
    return FileSystemStream;
}(fs_1.default));
exports.default = FileSystemStream;

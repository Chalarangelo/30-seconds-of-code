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
var readdir = require("@mrmlnc/readdir-enhanced");
var reader_1 = require("./reader");
var fs_stream_1 = require("../adapters/fs-stream");
var TransformStream = /** @class */ (function (_super) {
    __extends(TransformStream, _super);
    function TransformStream(reader) {
        var _this = _super.call(this, { objectMode: true }) || this;
        _this.reader = reader;
        return _this;
    }
    TransformStream.prototype._transform = function (entry, _encoding, callback) {
        callback(null, this.reader.transform(entry));
    };
    return TransformStream;
}(stream.Transform));
var ReaderStream = /** @class */ (function (_super) {
    __extends(ReaderStream, _super);
    function ReaderStream() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(ReaderStream.prototype, "fsAdapter", {
        /**
         * Returns FileSystem adapter.
         */
        get: function () {
            return new fs_stream_1.default(this.options);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Use stream API to read entries for Task.
     */
    ReaderStream.prototype.read = function (task) {
        var _this = this;
        var root = this.getRootDirectory(task);
        var options = this.getReaderOptions(task);
        var transform = new TransformStream(this);
        var readable = this.api(root, task, options);
        return readable
            .on('error', function (err) { return _this.isEnoentCodeError(err) ? null : transform.emit('error', err); })
            .pipe(transform);
    };
    /**
     * Returns founded paths.
     */
    ReaderStream.prototype.api = function (root, task, options) {
        if (task.dynamic) {
            return this.dynamicApi(root, options);
        }
        return this.staticApi(task, options);
    };
    /**
     * Api for dynamic tasks.
     */
    ReaderStream.prototype.dynamicApi = function (root, options) {
        return readdir.readdirStreamStat(root, options);
    };
    /**
     * Api for static tasks.
     */
    ReaderStream.prototype.staticApi = function (task, options) {
        return this.fsAdapter.read(task.patterns, options.filter);
    };
    return ReaderStream;
}(reader_1.default));
exports.default = ReaderStream;

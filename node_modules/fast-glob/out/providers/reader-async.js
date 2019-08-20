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
var readdir = require("@mrmlnc/readdir-enhanced");
var reader_1 = require("./reader");
var fs_stream_1 = require("../adapters/fs-stream");
var ReaderAsync = /** @class */ (function (_super) {
    __extends(ReaderAsync, _super);
    function ReaderAsync() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(ReaderAsync.prototype, "fsAdapter", {
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
     * Use async API to read entries for Task.
     */
    ReaderAsync.prototype.read = function (task) {
        var _this = this;
        var root = this.getRootDirectory(task);
        var options = this.getReaderOptions(task);
        var entries = [];
        return new Promise(function (resolve, reject) {
            var stream = _this.api(root, task, options);
            stream.on('error', function (err) {
                _this.isEnoentCodeError(err) ? resolve([]) : reject(err);
                stream.pause();
            });
            stream.on('data', function (entry) { return entries.push(_this.transform(entry)); });
            stream.on('end', function () { return resolve(entries); });
        });
    };
    /**
     * Returns founded paths.
     */
    ReaderAsync.prototype.api = function (root, task, options) {
        if (task.dynamic) {
            return this.dynamicApi(root, options);
        }
        return this.staticApi(task, options);
    };
    /**
     * Api for dynamic tasks.
     */
    ReaderAsync.prototype.dynamicApi = function (root, options) {
        return readdir.readdirStreamStat(root, options);
    };
    /**
     * Api for static tasks.
     */
    ReaderAsync.prototype.staticApi = function (task, options) {
        return this.fsAdapter.read(task.patterns, options.filter);
    };
    return ReaderAsync;
}(reader_1.default));
exports.default = ReaderAsync;

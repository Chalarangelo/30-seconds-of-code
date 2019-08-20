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
var fs_sync_1 = require("../adapters/fs-sync");
var ReaderSync = /** @class */ (function (_super) {
    __extends(ReaderSync, _super);
    function ReaderSync() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(ReaderSync.prototype, "fsAdapter", {
        /**
         * Returns FileSystem adapter.
         */
        get: function () {
            return new fs_sync_1.default(this.options);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Use sync API to read entries for Task.
     */
    ReaderSync.prototype.read = function (task) {
        var root = this.getRootDirectory(task);
        var options = this.getReaderOptions(task);
        try {
            var entries = this.api(root, task, options);
            return entries.map(this.transform, this);
        }
        catch (err) {
            if (this.isEnoentCodeError(err)) {
                return [];
            }
            throw err;
        }
    };
    /**
     * Returns founded paths.
     */
    ReaderSync.prototype.api = function (root, task, options) {
        if (task.dynamic) {
            return this.dynamicApi(root, options);
        }
        return this.staticApi(task, options);
    };
    /**
     * Api for dynamic tasks.
     */
    ReaderSync.prototype.dynamicApi = function (root, options) {
        return readdir.readdirSyncStat(root, options);
    };
    /**
     * Api for static tasks.
     */
    ReaderSync.prototype.staticApi = function (task, options) {
        return this.fsAdapter.read(task.patterns, options.filter);
    };
    return ReaderSync;
}(reader_1.default));
exports.default = ReaderSync;

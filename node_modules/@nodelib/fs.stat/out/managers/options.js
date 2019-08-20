"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fsAdapter = require("../adapters/fs");
function prepare(opts) {
    const options = Object.assign({
        fs: fsAdapter.getFileSystemAdapter(opts ? opts.fs : undefined),
        throwErrorOnBrokenSymlinks: true,
        followSymlinks: true
    }, opts);
    return options;
}
exports.prepare = prepare;

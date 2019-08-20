"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
exports.FILE_SYSTEM_ADAPTER = {
    lstat: fs.lstat,
    stat: fs.stat,
    lstatSync: fs.lstatSync,
    statSync: fs.statSync
};
function getFileSystemAdapter(fsMethods) {
    if (!fsMethods) {
        return exports.FILE_SYSTEM_ADAPTER;
    }
    return Object.assign({}, exports.FILE_SYSTEM_ADAPTER, fsMethods);
}
exports.getFileSystemAdapter = getFileSystemAdapter;

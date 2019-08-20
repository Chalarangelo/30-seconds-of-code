"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
/**
 * Returns «true» if the last partial of the path starting with a period.
 */
function isDotDirectory(filepath) {
    return path.basename(filepath).startsWith('.');
}
exports.isDotDirectory = isDotDirectory;
/**
 * Convert a windows-like path to a unix-style path.
 */
function normalize(filepath) {
    return filepath.replace(/\\/g, '/');
}
exports.normalize = normalize;
/**
 * Returns normalized absolute path of provided filepath.
 */
function makeAbsolute(cwd, filepath) {
    return normalize(path.resolve(cwd, filepath));
}
exports.makeAbsolute = makeAbsolute;

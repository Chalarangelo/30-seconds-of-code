"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function sync(path, options) {
    const lstat = options.fs.lstatSync(path);
    if (!isFollowedSymlink(lstat, options)) {
        return lstat;
    }
    try {
        const stat = options.fs.statSync(path);
        stat.isSymbolicLink = () => true;
        return stat;
    }
    catch (err) {
        if (!options.throwErrorOnBrokenSymlinks) {
            return lstat;
        }
        throw err;
    }
}
exports.sync = sync;
function async(path, options, callback) {
    options.fs.lstat(path, (err0, lstat) => {
        if (err0) {
            return callback(err0, undefined);
        }
        if (!isFollowedSymlink(lstat, options)) {
            return callback(null, lstat);
        }
        options.fs.stat(path, (err1, stat) => {
            if (err1) {
                return options.throwErrorOnBrokenSymlinks ? callback(err1) : callback(null, lstat);
            }
            stat.isSymbolicLink = () => true;
            callback(null, stat);
        });
    });
}
exports.async = async;
/**
 * Returns `true` for followed symlink.
 */
function isFollowedSymlink(stat, options) {
    return stat.isSymbolicLink() && options.followSymlinks;
}
exports.isFollowedSymlink = isFollowedSymlink;

'use strict';

const call = require('./call');

module.exports = stat;

/**
 * Retrieves the {@link fs.Stats} for the given path. If the path is a symbolic link,
 * then the Stats of the symlink's target are returned instead.  If the symlink is broken,
 * then the Stats of the symlink itself are returned.
 *
 * @param {object} fs - Synchronous or Asynchronouse facade for the "fs" module
 * @param {string} path - The path to return stats for
 * @param {function} callback
 */
function stat (fs, path, callback) {
  let isSymLink = false;

  call.safe(fs.lstat, path, (err, lstats) => {
    if (err) {
      // fs.lstat threw an eror
      return callback(err);
    }

    try {
      isSymLink = lstats.isSymbolicLink();
    }
    catch (err2) {
      // lstats.isSymbolicLink() threw an error
      // (probably because fs.lstat returned an invalid result)
      return callback(err2);
    }

    if (isSymLink) {
      // Try to resolve the symlink
      symlinkStat(fs, path, lstats, callback);
    }
    else {
      // It's not a symlink, so return the stats as-is
      callback(null, lstats);
    }
  });
}

/**
 * Retrieves the {@link fs.Stats} for the target of the given symlink.
 * If the symlink is broken, then the Stats of the symlink itself are returned.
 *
 * @param {object} fs - Synchronous or Asynchronouse facade for the "fs" module
 * @param {string} path - The path of the symlink to return stats for
 * @param {object} lstats - The stats of the symlink
 * @param {function} callback
 */
function symlinkStat (fs, path, lstats, callback) {
  call.safe(fs.stat, path, (err, stats) => {
    if (err) {
      // The symlink is broken, so return the stats for the link itself
      return callback(null, lstats);
    }

    try {
      // Return the stats for the resolved symlink target,
      // and override the `isSymbolicLink` method to indicate that it's a symlink
      stats.isSymbolicLink = () => true;
    }
    catch (err2) {
      // Setting stats.isSymbolicLink threw an error
      // (probably because fs.stat returned an invalid result)
      return callback(err2);
    }

    callback(null, stats);
  });
}

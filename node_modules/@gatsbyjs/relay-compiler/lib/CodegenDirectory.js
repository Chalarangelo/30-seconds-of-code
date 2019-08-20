/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *  strict-local
 * @format
 */
'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _asyncToGenerator = require("@babel/runtime/helpers/asyncToGenerator");

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var Profiler = require("./GraphQLCompilerProfiler");

var invariant = require("fbjs/lib/invariant");

var path = require("path");

/**
 * CodegenDirectory is a helper class for scripts that generate code into one
 * output directory. The purpose is to make it easy to only write files that
 * have changed and delete files that are no longer generated.
 * It gives statistics about added/removed/updated/unchanged in the end.
 * The class also has an option to "validate" which means that no file
 * operations are performed and only the statistics are created for what would
 * have happened. If there's anything but "unchanged", someone probably forgot
 * to run the codegen script.
 *
 * Example:
 *
 *   const dir = new CodegenDirectory('/some/path/generated', {filesystem: require('fs')});
 *   // write files in case content changed (less watchman/mtime changes)
 *   dir.writeFile('OneFile.js', contents);
 *   dir.writeFile('OtherFile.js', contents);
 *
 *   // delete files that are not generated
 *   dir.deleteExtraFiles();
 *
 *   // arrays of file names to print or whatever
 *   dir.changes.created
 *   dir.changes.updated
 *   dir.changes.deleted
 *   dir.changes.unchanged
 */
var CodegenDirectory =
/*#__PURE__*/
function () {
  function CodegenDirectory(dir, _ref) {
    var _this = this;

    var filesystem = _ref.filesystem,
        onlyValidate = _ref.onlyValidate;
    this._filesystem = filesystem || require("fs");
    this.onlyValidate = onlyValidate;

    if (this._filesystem.existsSync(dir)) {
      !this._filesystem.statSync(dir).isDirectory() ? process.env.NODE_ENV !== "production" ? invariant(false, 'Expected `%s` to be a directory.', dir) : invariant(false) : void 0;
    } else if (!this.onlyValidate) {
      var dirs = [dir];
      var parent = path.dirname(dir);

      while (!this._filesystem.existsSync(parent)) {
        dirs.unshift(parent);
        parent = path.dirname(parent);
      }

      dirs.forEach(function (d) {
        return _this._filesystem.mkdirSync(d);
      });
    }

    this._files = new Set();
    this.changes = {
      deleted: [],
      updated: [],
      created: [],
      unchanged: []
    };
    this._dir = dir;
  }

  CodegenDirectory.combineChanges = function combineChanges(dirs) {
    var changes = {
      deleted: [],
      updated: [],
      created: [],
      unchanged: []
    };
    dirs.forEach(function (dir) {
      var _changes$deleted, _changes$updated, _changes$created, _changes$unchanged;

      (_changes$deleted = changes.deleted).push.apply(_changes$deleted, (0, _toConsumableArray2["default"])(dir.changes.deleted));

      (_changes$updated = changes.updated).push.apply(_changes$updated, (0, _toConsumableArray2["default"])(dir.changes.updated));

      (_changes$created = changes.created).push.apply(_changes$created, (0, _toConsumableArray2["default"])(dir.changes.created));

      (_changes$unchanged = changes.unchanged).push.apply(_changes$unchanged, (0, _toConsumableArray2["default"])(dir.changes.unchanged));
    });
    return changes;
  };

  CodegenDirectory.hasChanges = function hasChanges(changes) {
    return changes.created.length > 0 || changes.updated.length > 0 || changes.deleted.length > 0;
  };

  CodegenDirectory.printChanges = function printChanges(changes, options) {
    Profiler.run('CodegenDirectory.printChanges', function () {
      var output = [];

      function printFiles(label, files) {
        if (files.length > 0) {
          output.push(label + ':');
          files.forEach(function (file) {
            output.push(' - ' + file);
          });
        }
      }

      if (options.onlyValidate) {
        printFiles('Missing', changes.created);
        printFiles('Out of date', changes.updated);
        printFiles('Extra', changes.deleted);
      } else {
        printFiles('Created', changes.created);
        printFiles('Updated', changes.updated);
        printFiles('Deleted', changes.deleted);
        output.push("Unchanged: ".concat(changes.unchanged.length, " files"));
      } // eslint-disable-next-line no-console


      console.log(output.join('\n'));
    });
  };

  CodegenDirectory.getAddedRemovedFiles = function getAddedRemovedFiles(dirs) {
    var added = [];
    var removed = [];
    dirs.forEach(function (dir) {
      dir.changes.created.forEach(function (name) {
        added.push(dir.getPath(name));
      });
      dir.changes.deleted.forEach(function (name) {
        removed.push(dir.getPath(name));
      });
    });
    return {
      added: added,
      removed: removed
    };
  };

  CodegenDirectory.sourceControlAddRemove =
  /*#__PURE__*/
  function () {
    var _sourceControlAddRemove = _asyncToGenerator(function* (sourceControl, dirs) {
      var _CodegenDirectory$get = CodegenDirectory.getAddedRemovedFiles(dirs),
          added = _CodegenDirectory$get.added,
          removed = _CodegenDirectory$get.removed;

      sourceControl.addRemove(added, removed);
    });

    return function sourceControlAddRemove(_x, _x2) {
      return _sourceControlAddRemove.apply(this, arguments);
    };
  }();

  var _proto = CodegenDirectory.prototype;

  _proto.printChanges = function printChanges() {
    CodegenDirectory.printChanges(this.changes, {
      onlyValidate: this.onlyValidate
    });
  };

  _proto.read = function read(filename) {
    var filePath = path.join(this._dir, filename);

    if (this._filesystem.existsSync(filePath)) {
      return this._filesystem.readFileSync(filePath, 'utf8');
    }

    return null;
  };

  _proto.markUnchanged = function markUnchanged(filename) {
    this._addGenerated(filename);

    this.changes.unchanged.push(filename);
  };
  /**
   * Marks a files as updated or out of date without actually writing the file.
   * This is probably only be useful when doing validation without intention to
   * actually write to disk.
   */


  _proto.markUpdated = function markUpdated(filename) {
    this._addGenerated(filename);

    this.changes.updated.push(filename);
  };

  _proto.writeFile = function writeFile(filename, content) {
    var _this2 = this;

    Profiler.run('CodegenDirectory.writeFile', function () {
      _this2._addGenerated(filename);

      var filePath = path.join(_this2._dir, filename);

      if (_this2._filesystem.existsSync(filePath)) {
        var existingContent = _this2._filesystem.readFileSync(filePath, 'utf8');

        if (existingContent === content) {
          _this2.changes.unchanged.push(filename);
        } else {
          _this2._writeFile(filePath, content);

          _this2.changes.updated.push(filename);
        }
      } else {
        _this2._writeFile(filePath, content);

        _this2.changes.created.push(filename);
      }
    });
  };

  _proto._writeFile = function _writeFile(filePath, content) {
    if (!this.onlyValidate) {
      this._filesystem.writeFileSync(filePath, content, 'utf8');
    }
  };
  /**
   * Deletes all non-generated files, except for invisible "dot" files (ie.
   * files with names starting with ".") and any files matching the supplied
   * filePatternToKeep.
   */


  _proto.deleteExtraFiles = function deleteExtraFiles(filePatternToKeep) {
    var _this3 = this;

    Profiler.run('CodegenDirectory.deleteExtraFiles', function () {
      _this3._filesystem.readdirSync(_this3._dir).forEach(function (actualFile) {
        var shouldFileExist = _this3._files.has(actualFile) || /^\./.test(actualFile) || filePatternToKeep != null && filePatternToKeep.test(actualFile);

        if (shouldFileExist) {
          return;
        }

        if (!_this3.onlyValidate) {
          try {
            _this3._filesystem.unlinkSync(path.join(_this3._dir, actualFile));
          } catch (_unused) {
            throw new Error('CodegenDirectory: Failed to delete `' + actualFile + '` in `' + _this3._dir + '`.');
          }
        }

        _this3.changes.deleted.push(actualFile);
      });
    });
  };

  _proto.getPath = function getPath(filename) {
    return path.join(this._dir, filename);
  };

  _proto._addGenerated = function _addGenerated(filename) {
    !!this._files.has(filename) ? process.env.NODE_ENV !== "production" ? invariant(false, 'CodegenDirectory: Tried to generate `%s` twice in `%s`.', filename, this._dir) : invariant(false) : void 0;

    this._files.add(filename);
  };

  return CodegenDirectory;
}();

module.exports = CodegenDirectory;
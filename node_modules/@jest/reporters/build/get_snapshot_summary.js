'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.default = void 0;

function _chalk() {
  const data = _interopRequireDefault(require('chalk'));

  _chalk = function _chalk() {
    return data;
  };

  return data;
}

function _jestUtil() {
  const data = require('jest-util');

  _jestUtil = function _jestUtil() {
    return data;
  };

  return data;
}

var _utils = require('./utils');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

function _toArray(arr) {
  return _arrayWithHoles(arr) || _iterableToArray(arr) || _nonIterableRest();
}

function _nonIterableRest() {
  throw new TypeError('Invalid attempt to destructure non-iterable instance');
}

function _iterableToArray(iter) {
  if (
    Symbol.iterator in Object(iter) ||
    Object.prototype.toString.call(iter) === '[object Arguments]'
  )
    return Array.from(iter);
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

const ARROW = ' \u203A ';
const DOWN_ARROW = ' \u21B3 ';
const DOT = ' \u2022 ';

const FAIL_COLOR = _chalk().default.bold.red;

const OBSOLETE_COLOR = _chalk().default.bold.yellow;

const SNAPSHOT_ADDED = _chalk().default.bold.green;

const SNAPSHOT_NOTE = _chalk().default.dim;

const SNAPSHOT_REMOVED = _chalk().default.bold.green;

const SNAPSHOT_SUMMARY = _chalk().default.bold;

const SNAPSHOT_UPDATED = _chalk().default.bold.green;

var _default = (snapshots, globalConfig, updateCommand) => {
  const summary = [];
  summary.push(SNAPSHOT_SUMMARY('Snapshot Summary'));

  if (snapshots.added) {
    summary.push(
      SNAPSHOT_ADDED(
        ARROW +
          (0, _jestUtil().pluralize)('snapshot', snapshots.added) +
          ' written '
      ) +
        `from ${(0, _jestUtil().pluralize)(
          'test suite',
          snapshots.filesAdded
        )}.`
    );
  }

  if (snapshots.unmatched) {
    summary.push(
      FAIL_COLOR(
        `${ARROW}${(0, _jestUtil().pluralize)(
          'snapshot',
          snapshots.unmatched
        )} failed`
      ) +
        ` from ${(0, _jestUtil().pluralize)(
          'test suite',
          snapshots.filesUnmatched
        )}. ` +
        SNAPSHOT_NOTE(
          'Inspect your code changes or ' + updateCommand + ' to update them.'
        )
    );
  }

  if (snapshots.updated) {
    summary.push(
      SNAPSHOT_UPDATED(
        ARROW +
          (0, _jestUtil().pluralize)('snapshot', snapshots.updated) +
          ' updated '
      ) +
        `from ${(0, _jestUtil().pluralize)(
          'test suite',
          snapshots.filesUpdated
        )}.`
    );
  }

  if (snapshots.filesRemoved) {
    if (snapshots.didUpdate) {
      summary.push(
        SNAPSHOT_REMOVED(
          `${ARROW}${(0, _jestUtil().pluralize)(
            'snapshot file',
            snapshots.filesRemoved
          )} removed `
        ) +
          `from ${(0, _jestUtil().pluralize)(
            'test suite',
            snapshots.filesRemoved
          )}.`
      );
    } else {
      summary.push(
        OBSOLETE_COLOR(
          `${ARROW}${(0, _jestUtil().pluralize)(
            'snapshot file',
            snapshots.filesRemoved
          )} obsolete `
        ) +
          `from ${(0, _jestUtil().pluralize)(
            'test suite',
            snapshots.filesRemoved
          )}. ` +
          SNAPSHOT_NOTE(
            `To remove ${
              snapshots.filesRemoved === 1 ? 'it' : 'them all'
            }, ${updateCommand}.`
          )
      );
    }
  }

  if (snapshots.filesRemovedList && snapshots.filesRemovedList.length) {
    const _snapshots$filesRemov = _toArray(snapshots.filesRemovedList),
      head = _snapshots$filesRemov[0],
      tail = _snapshots$filesRemov.slice(1);

    summary.push(
      `  ${DOWN_ARROW} ${DOT}${(0, _utils.formatTestPath)(globalConfig, head)}`
    );
    tail.forEach(key => {
      summary.push(
        `      ${DOT}${(0, _utils.formatTestPath)(globalConfig, key)}`
      );
    });
  }

  if (snapshots.unchecked) {
    if (snapshots.didUpdate) {
      summary.push(
        SNAPSHOT_REMOVED(
          `${ARROW}${(0, _jestUtil().pluralize)(
            'snapshot',
            snapshots.unchecked
          )} removed `
        ) +
          `from ${(0, _jestUtil().pluralize)(
            'test suite',
            snapshots.uncheckedKeysByFile.length
          )}.`
      );
    } else {
      summary.push(
        OBSOLETE_COLOR(
          `${ARROW}${(0, _jestUtil().pluralize)(
            'snapshot',
            snapshots.unchecked
          )} obsolete `
        ) +
          `from ${(0, _jestUtil().pluralize)(
            'test suite',
            snapshots.uncheckedKeysByFile.length
          )}. ` +
          SNAPSHOT_NOTE(
            `To remove ${
              snapshots.unchecked === 1 ? 'it' : 'them all'
            }, ${updateCommand}.`
          )
      );
    }

    snapshots.uncheckedKeysByFile.forEach(uncheckedFile => {
      summary.push(
        `  ${DOWN_ARROW}${(0, _utils.formatTestPath)(
          globalConfig,
          uncheckedFile.filePath
        )}`
      );
      uncheckedFile.keys.forEach(key => {
        summary.push(`      ${DOT}${key}`);
      });
    });
  }

  return summary;
};

exports.default = _default;

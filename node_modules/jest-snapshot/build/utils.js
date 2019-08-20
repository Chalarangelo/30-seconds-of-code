'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.deepMerge = exports.saveSnapshotFile = exports.ensureDirectoryExists = exports.escapeBacktickString = exports.unescape = exports.serialize = exports.getSnapshotData = exports.keyToTestName = exports.testNameToKey = exports.SNAPSHOT_VERSION_WARNING = exports.SNAPSHOT_GUIDE_LINK = exports.SNAPSHOT_VERSION = void 0;

var _fs = _interopRequireDefault(require('fs'));

var _path = _interopRequireDefault(require('path'));

var _mkdirp = _interopRequireDefault(require('mkdirp'));

var _naturalCompare = _interopRequireDefault(require('natural-compare'));

var _chalk = _interopRequireDefault(require('chalk'));

var _prettyFormat = _interopRequireDefault(require('pretty-format'));

var _plugins = require('./plugins');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

var Symbol = global['jest-symbol-do-not-touch'] || global.Symbol;

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);
    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(
        Object.getOwnPropertySymbols(source).filter(function(sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        })
      );
    }
    ownKeys.forEach(function(key) {
      _defineProperty(target, key, source[key]);
    });
  }
  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

var Symbol = global['jest-symbol-do-not-touch'] || global.Symbol;

var jestWriteFile =
  global[Symbol.for('jest-native-write-file')] || _fs.default.writeFileSync;

var Symbol = global['jest-symbol-do-not-touch'] || global.Symbol;

var jestReadFile =
  global[Symbol.for('jest-native-read-file')] || _fs.default.readFileSync;

var Symbol = global['jest-symbol-do-not-touch'] || global.Symbol;

var jestExistsFile =
  global[Symbol.for('jest-native-exists-file')] || _fs.default.existsSync;

const SNAPSHOT_VERSION = '1';
exports.SNAPSHOT_VERSION = SNAPSHOT_VERSION;
const SNAPSHOT_VERSION_REGEXP = /^\/\/ Jest Snapshot v(.+),/;
const SNAPSHOT_GUIDE_LINK = 'https://goo.gl/fbAQLP';
exports.SNAPSHOT_GUIDE_LINK = SNAPSHOT_GUIDE_LINK;

const SNAPSHOT_VERSION_WARNING = _chalk.default.yellow(
  `${_chalk.default.bold('Warning')}: Before you upgrade snapshots, ` +
    `we recommend that you revert any local changes to tests or other code, ` +
    `to ensure that you do not store invalid state.`
);

exports.SNAPSHOT_VERSION_WARNING = SNAPSHOT_VERSION_WARNING;

const writeSnapshotVersion = () =>
  `// Jest Snapshot v${SNAPSHOT_VERSION}, ${SNAPSHOT_GUIDE_LINK}`;

const validateSnapshotVersion = snapshotContents => {
  const versionTest = SNAPSHOT_VERSION_REGEXP.exec(snapshotContents);
  const version = versionTest && versionTest[1];

  if (!version) {
    return new Error(
      _chalk.default.red(
        `${_chalk.default.bold(
          'Outdated snapshot'
        )}: No snapshot header found. ` +
          `Jest 19 introduced versioned snapshots to ensure all developers ` +
          `on a project are using the same version of Jest. ` +
          `Please update all snapshots during this upgrade of Jest.\n\n`
      ) + SNAPSHOT_VERSION_WARNING
    );
  }

  if (version < SNAPSHOT_VERSION) {
    return new Error(
      _chalk.default.red(
        `${_chalk.default.red.bold(
          'Outdated snapshot'
        )}: The version of the snapshot ` +
          `file associated with this test is outdated. The snapshot file ` +
          `version ensures that all developers on a project are using ` +
          `the same version of Jest. ` +
          `Please update all snapshots during this upgrade of Jest.\n\n`
      ) +
        `Expected: v${SNAPSHOT_VERSION}\n` +
        `Received: v${version}\n\n` +
        SNAPSHOT_VERSION_WARNING
    );
  }

  if (version > SNAPSHOT_VERSION) {
    return new Error(
      _chalk.default.red(
        `${_chalk.default.red.bold(
          'Outdated Jest version'
        )}: The version of this ` +
          `snapshot file indicates that this project is meant to be used ` +
          `with a newer version of Jest. The snapshot file version ensures ` +
          `that all developers on a project are using the same version of ` +
          `Jest. Please update your version of Jest and re-run the tests.\n\n`
      ) +
        `Expected: v${SNAPSHOT_VERSION}\n` +
        `Received: v${version}`
    );
  }

  return null;
};

function isObject(item) {
  return item && typeof item === 'object' && !Array.isArray(item);
}

const testNameToKey = (testName, count) => testName + ' ' + count;

exports.testNameToKey = testNameToKey;

const keyToTestName = key => {
  if (!/ \d+$/.test(key)) {
    throw new Error('Snapshot keys must end with a number.');
  }

  return key.replace(/ \d+$/, '');
};

exports.keyToTestName = keyToTestName;

const getSnapshotData = (snapshotPath, update) => {
  const data = Object.create(null);
  let snapshotContents = '';
  let dirty = false;

  if (jestExistsFile(snapshotPath)) {
    try {
      snapshotContents = jestReadFile(snapshotPath, 'utf8'); // eslint-disable-next-line no-new-func

      const populate = new Function('exports', snapshotContents);
      populate(data);
    } catch (e) {}
  }

  const validationResult = validateSnapshotVersion(snapshotContents);
  const isInvalid = snapshotContents && validationResult;

  if (update === 'none' && isInvalid) {
    throw validationResult;
  }

  if ((update === 'all' || update === 'new') && isInvalid) {
    dirty = true;
  }

  return {
    data,
    dirty
  };
}; // Extra line breaks at the beginning and at the end of the snapshot are useful
// to make the content of the snapshot easier to read

exports.getSnapshotData = getSnapshotData;

const addExtraLineBreaks = string =>
  string.includes('\n') ? `\n${string}\n` : string;

const serialize = data =>
  addExtraLineBreaks(
    normalizeNewlines(
      (0, _prettyFormat.default)(data, {
        escapeRegex: true,
        plugins: (0, _plugins.getSerializers)(),
        printFunctionName: false
      })
    )
  ); // unescape double quotes

exports.serialize = serialize;

const unescape = data => data.replace(/\\(")/g, '$1');

exports.unescape = unescape;

const escapeBacktickString = str => str.replace(/`|\\|\${/g, '\\$&');

exports.escapeBacktickString = escapeBacktickString;

const printBacktickString = str => '`' + escapeBacktickString(str) + '`';

const ensureDirectoryExists = filePath => {
  try {
    _mkdirp.default.sync(
      _path.default.join(_path.default.dirname(filePath)),
      '777'
    );
  } catch (e) {}
};

exports.ensureDirectoryExists = ensureDirectoryExists;

const normalizeNewlines = string => string.replace(/\r\n|\r/g, '\n');

const saveSnapshotFile = (snapshotData, snapshotPath) => {
  const snapshots = Object.keys(snapshotData)
    .sort(_naturalCompare.default)
    .map(
      key =>
        'exports[' +
        printBacktickString(key) +
        '] = ' +
        printBacktickString(normalizeNewlines(snapshotData[key])) +
        ';'
    );
  ensureDirectoryExists(snapshotPath);
  jestWriteFile(
    snapshotPath,
    writeSnapshotVersion() + '\n\n' + snapshots.join('\n\n') + '\n'
  );
};

exports.saveSnapshotFile = saveSnapshotFile;

const deepMergeArray = (target, source) => {
  const mergedOutput = Array.from(target);
  source.forEach((sourceElement, index) => {
    const targetElement = mergedOutput[index];

    if (Array.isArray(target[index])) {
      mergedOutput[index] = deepMergeArray(target[index], sourceElement);
    } else if (isObject(targetElement)) {
      mergedOutput[index] = deepMerge(target[index], sourceElement);
    } else {
      // Source does not exist in target or target is primitive and cannot be deep merged
      mergedOutput[index] = sourceElement;
    }
  });
  return mergedOutput;
};

const deepMerge = (target, source) => {
  const mergedOutput = _objectSpread({}, target);

  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key]) && !source[key].$$typeof) {
        if (!(key in target))
          Object.assign(mergedOutput, {
            [key]: source[key]
          });
        else mergedOutput[key] = deepMerge(target[key], source[key]);
      } else if (Array.isArray(source[key])) {
        mergedOutput[key] = deepMergeArray(target[key], source[key]);
      } else {
        Object.assign(mergedOutput, {
          [key]: source[key]
        });
      }
    });
  }

  return mergedOutput;
};

exports.deepMerge = deepMerge;

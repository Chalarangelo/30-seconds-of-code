'use strict';

var _fs = _interopRequireDefault(require('fs'));

var _jestMatcherUtils = require('jest-matcher-utils');

var _snapshot_resolver = require('./snapshot_resolver');

var _State = _interopRequireDefault(require('./State'));

var _plugins = require('./plugins');

var _print = require('./print');

var utils = _interopRequireWildcard(require('./utils'));

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};
    if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc =
            Object.defineProperty && Object.getOwnPropertyDescriptor
              ? Object.getOwnPropertyDescriptor(obj, key)
              : {};
          if (desc.get || desc.set) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
    }
    newObj.default = obj;
    return newObj;
  }
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

var Symbol = global['jest-symbol-do-not-touch'] || global.Symbol;
var Symbol = global['jest-symbol-do-not-touch'] || global.Symbol;

var jestExistsFile =
  global[Symbol.for('jest-native-exists-file')] || _fs.default.existsSync;

const DID_NOT_THROW = 'Received function did not throw'; // same as toThrow

const NOT_SNAPSHOT_MATCHERS = `.${(0, _jestMatcherUtils.BOLD_WEIGHT)(
  'not'
)} cannot be used with snapshot matchers`;
const HINT_ARG = 'hint';
const HINT_COLOR = _jestMatcherUtils.BOLD_WEIGHT;
const INLINE_SNAPSHOT_ARG = 'snapshot';
const PROPERTY_MATCHERS_ARG = 'properties';
const INDENTATION_REGEX = /^([^\S\n]*)\S/m; // Display name in report when matcher fails same as in snapshot file,
// but with optional hint argument in bold weight.

const printName = (concatenatedBlockNames = '', hint = '', count) => {
  const hasNames = concatenatedBlockNames.length !== 0;
  const hasHint = hint.length !== 0;
  return (
    '`' +
    (hasNames ? utils.escapeBacktickString(concatenatedBlockNames) : '') +
    (hasNames && hasHint ? ': ' : '') +
    (hasHint
      ? (0, _jestMatcherUtils.BOLD_WEIGHT)(utils.escapeBacktickString(hint))
      : '') +
    ' ' +
    count +
    '`'
  );
};

function stripAddedIndentation(inlineSnapshot) {
  // Find indentation if exists.
  const match = inlineSnapshot.match(INDENTATION_REGEX);

  if (!match || !match[1]) {
    // No indentation.
    return inlineSnapshot;
  }

  const indentation = match[1];
  const lines = inlineSnapshot.split('\n');

  if (lines.length <= 2) {
    // Must be at least 3 lines.
    return inlineSnapshot;
  }

  if (lines[0].trim() !== '' || lines[lines.length - 1].trim() !== '') {
    // If not blank first and last lines, abort.
    return inlineSnapshot;
  }

  for (let i = 1; i < lines.length - 1; i++) {
    if (lines[i] !== '') {
      if (lines[i].indexOf(indentation) !== 0) {
        // All lines except first and last should either be blank or have the same
        // indent as the first line (or more). If this isn't the case we don't
        // want to touch the snapshot at all.
        return inlineSnapshot;
      }

      lines[i] = lines[i].substr(indentation.length);
    }
  } // Last line is a special case because it won't have the same indent as others
  // but may still have been given some indent to line up.

  lines[lines.length - 1] = ''; // Return inline snapshot, now at indent 0.

  inlineSnapshot = lines.join('\n');
  return inlineSnapshot;
}

const fileExists = (filePath, hasteFS) =>
  hasteFS.exists(filePath) || jestExistsFile(filePath);

const cleanup = (hasteFS, update, snapshotResolver, testPathIgnorePatterns) => {
  const pattern = '\\.' + _snapshot_resolver.EXTENSION + '$';
  const files = hasteFS.matchFiles(pattern);
  let testIgnorePatternsRegex = null;

  if (testPathIgnorePatterns && testPathIgnorePatterns.length > 0) {
    testIgnorePatternsRegex = new RegExp(testPathIgnorePatterns.join('|'));
  }

  const list = files.filter(snapshotFile => {
    const testPath = snapshotResolver.resolveTestPath(snapshotFile); // ignore snapshots of ignored tests

    if (testIgnorePatternsRegex && testIgnorePatternsRegex.test(testPath)) {
      return false;
    }

    if (!fileExists(testPath, hasteFS)) {
      if (update === 'all') {
        _fs.default.unlinkSync(snapshotFile);
      }

      return true;
    }

    return false;
  });
  return {
    filesRemoved: list.length,
    filesRemovedList: list
  };
};

const toMatchSnapshot = function toMatchSnapshot(
  received,
  propertyMatchers,
  hint
) {
  const matcherName = 'toMatchSnapshot';
  let expectedArgument = '';
  let secondArgument = '';

  if (typeof propertyMatchers === 'object' && propertyMatchers !== null) {
    expectedArgument = PROPERTY_MATCHERS_ARG;

    if (typeof hint === 'string' && hint.length !== 0) {
      secondArgument = HINT_ARG;
    }
  } else if (
    typeof propertyMatchers === 'string' &&
    propertyMatchers.length !== 0
  ) {
    expectedArgument = HINT_ARG;
  }

  const options = {
    isNot: this.isNot,
    promise: this.promise,
    secondArgument
  };

  if (expectedArgument === HINT_ARG) {
    options.expectedColor = HINT_COLOR;
  }

  if (secondArgument === HINT_ARG) {
    options.secondArgumentColor = HINT_COLOR;
  }

  if (arguments.length === 3 && !propertyMatchers) {
    throw new Error(
      'Property matchers must be an object.\n\nTo provide a snapshot test name without property matchers, use: toMatchSnapshot("name")'
    );
  }

  return _toMatchSnapshot({
    context: this,
    expectedArgument,
    hint,
    matcherName,
    options,
    propertyMatchers,
    received
  });
};

const toMatchInlineSnapshot = function toMatchInlineSnapshot(
  received,
  propertyMatchersOrInlineSnapshot,
  inlineSnapshot
) {
  const matcherName = 'toMatchInlineSnapshot';
  let expectedArgument = '';
  let secondArgument = '';

  if (typeof propertyMatchersOrInlineSnapshot === 'string') {
    expectedArgument = INLINE_SNAPSHOT_ARG;
  } else if (
    typeof propertyMatchersOrInlineSnapshot === 'object' &&
    propertyMatchersOrInlineSnapshot !== null
  ) {
    expectedArgument = PROPERTY_MATCHERS_ARG;

    if (typeof inlineSnapshot === 'string') {
      secondArgument = INLINE_SNAPSHOT_ARG;
    }
  }

  const options = {
    isNot: this.isNot,
    promise: this.promise,
    secondArgument
  };
  let propertyMatchers;

  if (typeof propertyMatchersOrInlineSnapshot === 'string') {
    inlineSnapshot = propertyMatchersOrInlineSnapshot;
  } else {
    propertyMatchers = propertyMatchersOrInlineSnapshot;
  }

  return _toMatchSnapshot({
    context: this,
    expectedArgument,
    inlineSnapshot: stripAddedIndentation(inlineSnapshot || ''),
    matcherName,
    options,
    propertyMatchers,
    received
  });
};

const _toMatchSnapshot = ({
  context,
  expectedArgument,
  hint,
  inlineSnapshot,
  matcherName,
  options,
  propertyMatchers,
  received
}) => {
  context.dontThrow && context.dontThrow();
  hint = typeof propertyMatchers === 'string' ? propertyMatchers : hint;
  const currentTestName = context.currentTestName,
    isNot = context.isNot,
    snapshotState = context.snapshotState;

  if (isNot) {
    throw new Error(
      (0, _jestMatcherUtils.matcherHint)(
        matcherName,
        undefined,
        expectedArgument,
        options
      ) +
        '\n\n' +
        NOT_SNAPSHOT_MATCHERS
    );
  }

  if (!snapshotState) {
    throw new Error(
      (0, _jestMatcherUtils.matcherHint)(
        matcherName,
        undefined,
        expectedArgument,
        options
      ) + '\n\nsnapshot state must be initialized'
    );
  }

  const fullTestName =
    currentTestName && hint
      ? `${currentTestName}: ${hint}`
      : currentTestName || ''; // future BREAKING change: || hint

  if (typeof propertyMatchers === 'object') {
    if (propertyMatchers === null) {
      throw new Error(`Property matchers must be an object.`);
    }

    const propertyPass = context.equals(received, propertyMatchers, [
      context.utils.iterableEquality,
      context.utils.subsetEquality
    ]);

    if (!propertyPass) {
      const key = snapshotState.fail(fullTestName, received);
      const matched = /(\d+)$/.exec(key);
      const count = matched === null ? 1 : Number(matched[1]);

      const report = () =>
        `Snapshot name: ${printName(currentTestName, hint, count)}\n` +
        '\n' +
        `Expected properties: ${context.utils.printExpected(
          propertyMatchers
        )}\n` +
        `Received value:      ${context.utils.printReceived(received)}`;

      return {
        message: () =>
          (0, _jestMatcherUtils.matcherHint)(
            matcherName,
            undefined,
            expectedArgument,
            options
          ) +
          '\n\n' +
          report(),
        name: matcherName,
        pass: false,
        report
      };
    } else {
      received = utils.deepMerge(received, propertyMatchers);
    }
  }

  const result = snapshotState.match({
    error: context.error,
    inlineSnapshot,
    received,
    testName: fullTestName
  });
  const count = result.count,
    pass = result.pass;
  let actual = result.actual,
    expected = result.expected;
  let report;

  if (pass) {
    return {
      message: () => '',
      pass: true
    };
  } else if (!expected) {
    report = () =>
      `New snapshot was ${(0, _jestMatcherUtils.RECEIVED_COLOR)(
        'not written'
      )}. The update flag ` +
      `must be explicitly passed to write a new snapshot.\n\n` +
      `This is likely because this test is run in a continuous integration ` +
      `(CI) environment in which snapshots are not written by default.\n\n` +
      `${(0, _jestMatcherUtils.RECEIVED_COLOR)('Received value')} ` +
      `${actual}`;
  } else {
    expected = (expected || '').trim();
    actual = (actual || '').trim(); // Assign to local variable because of declaration let expected:
    // TypeScript thinks it could change before report function is called.

    const printed = (0, _print.printDiffOrStringified)(
      expected,
      actual,
      received,
      'Snapshot',
      'Received',
      snapshotState.expand
    );

    report = () =>
      `Snapshot name: ${printName(currentTestName, hint, count)}\n\n` + printed;
  } // Passing the actual and expected objects so that a custom reporter
  // could access them, for example in order to display a custom visual diff,
  // or create a different error message

  return {
    actual,
    expected,
    message: () =>
      (0, _jestMatcherUtils.matcherHint)(
        matcherName,
        undefined,
        expectedArgument,
        options
      ) +
      '\n\n' +
      report(),
    name: matcherName,
    pass: false,
    report
  };
};

const toThrowErrorMatchingSnapshot = function toThrowErrorMatchingSnapshot(
  received,
  hint, // because error TS1016 for hint?: string
  fromPromise
) {
  const matcherName = 'toThrowErrorMatchingSnapshot';
  const expectedArgument =
    typeof hint === 'string' && hint.length !== 0 ? HINT_ARG : '';
  const options = {
    expectedColor: HINT_COLOR,
    isNot: this.isNot,
    promise: this.promise,
    secondArgument: ''
  };
  return _toThrowErrorMatchingSnapshot(
    {
      context: this,
      expectedArgument,
      hint,
      matcherName,
      options,
      received
    },
    fromPromise
  );
};

const toThrowErrorMatchingInlineSnapshot = function toThrowErrorMatchingInlineSnapshot(
  received,
  inlineSnapshot,
  fromPromise
) {
  const matcherName = 'toThrowErrorMatchingInlineSnapshot';
  const expectedArgument =
    typeof inlineSnapshot === 'string' ? INLINE_SNAPSHOT_ARG : '';
  const options = {
    isNot: this.isNot,
    promise: this.promise,
    secondArgument: ''
  };
  return _toThrowErrorMatchingSnapshot(
    {
      context: this,
      expectedArgument,
      inlineSnapshot: inlineSnapshot || '',
      matcherName,
      options,
      received
    },
    fromPromise
  );
};

const _toThrowErrorMatchingSnapshot = (
  {
    context,
    expectedArgument,
    inlineSnapshot,
    matcherName,
    options,
    received,
    hint
  },
  fromPromise
) => {
  context.dontThrow && context.dontThrow();
  const isNot = context.isNot;

  if (isNot) {
    throw new Error(
      (0, _jestMatcherUtils.matcherHint)(
        matcherName,
        undefined,
        expectedArgument,
        options
      ) +
        '\n\n' +
        NOT_SNAPSHOT_MATCHERS
    );
  }

  let error;

  if (fromPromise) {
    error = received;
  } else {
    try {
      received();
    } catch (e) {
      error = e;
    }
  }

  if (error === undefined) {
    throw new Error(
      (0, _jestMatcherUtils.matcherHint)(
        matcherName,
        undefined,
        expectedArgument,
        options
      ) +
        '\n\n' +
        DID_NOT_THROW
    );
  }

  return _toMatchSnapshot({
    context,
    expectedArgument,
    hint,
    inlineSnapshot,
    matcherName,
    options,
    received: error.message
  });
};

const JestSnapshot = {
  EXTENSION: _snapshot_resolver.EXTENSION,
  SnapshotState: _State.default,
  addSerializer: _plugins.addSerializer,
  buildSnapshotResolver: _snapshot_resolver.buildSnapshotResolver,
  cleanup,
  getSerializers: _plugins.getSerializers,
  isSnapshotPath: _snapshot_resolver.isSnapshotPath,
  toMatchInlineSnapshot,
  toMatchSnapshot,
  toThrowErrorMatchingInlineSnapshot,
  toThrowErrorMatchingSnapshot,
  utils
};
/* eslint-disable-next-line no-redeclare */

module.exports = JestSnapshot;

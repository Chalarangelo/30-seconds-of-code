'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.saveInlineSnapshots = void 0;

var _fs = _interopRequireDefault(require('fs'));

var _path = _interopRequireDefault(require('path'));

var _semver = _interopRequireDefault(require('semver'));

var _types = require('@babel/types');

var _utils = require('./utils');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

var Symbol = global['jest-symbol-do-not-touch'] || global.Symbol;
var Symbol = global['jest-symbol-do-not-touch'] || global.Symbol;

var jestWriteFile =
  global[Symbol.for('jest-native-write-file')] || _fs.default.writeFileSync;

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

var jestReadFile =
  global[Symbol.for('jest-native-read-file')] || _fs.default.readFileSync;

const saveInlineSnapshots = (snapshots, prettier, babelTraverse) => {
  if (!prettier) {
    throw new Error(
      `Jest: Inline Snapshots requires Prettier.\n` +
        `Please ensure "prettier" is installed in your project.`
    );
  } // Custom parser API was added in 1.5.0

  if (_semver.default.lt(prettier.version, '1.5.0')) {
    throw new Error(
      `Jest: Inline Snapshots require prettier>=1.5.0.\n` +
        `Please upgrade "prettier".`
    );
  }

  const snapshotsByFile = groupSnapshotsByFile(snapshots);

  var _arr = Object.keys(snapshotsByFile);

  for (var _i = 0; _i < _arr.length; _i++) {
    const sourceFilePath = _arr[_i];
    saveSnapshotsForFile(
      snapshotsByFile[sourceFilePath],
      sourceFilePath,
      prettier,
      babelTraverse
    );
  }
};

exports.saveInlineSnapshots = saveInlineSnapshots;

const saveSnapshotsForFile = (
  snapshots,
  sourceFilePath,
  prettier,
  babelTraverse
) => {
  const sourceFile = jestReadFile(sourceFilePath, 'utf8'); // Resolve project configuration.
  // For older versions of Prettier, do not load configuration.

  const config = prettier.resolveConfig
    ? prettier.resolveConfig.sync(sourceFilePath, {
        editorconfig: true
      })
    : null; // Detect the parser for the test file.
  // For older versions of Prettier, fallback to a simple parser detection.

  const inferredParser = prettier.getFileInfo
    ? prettier.getFileInfo.sync(sourceFilePath).inferredParser
    : (config && config.parser) || simpleDetectParser(sourceFilePath); // Insert snapshots using the custom parser API. After insertion, the code is
  // formatted, except snapshot indentation. Snapshots cannot be formatted until
  // after the initial format because we don't know where the call expression
  // will be placed (specifically its indentation).

  const newSourceFile = prettier.format(
    sourceFile,
    _objectSpread({}, config, {
      filepath: sourceFilePath,
      parser: createInsertionParser(snapshots, inferredParser, babelTraverse)
    })
  ); // Format the snapshots using the custom parser API.

  const formattedNewSourceFile = prettier.format(
    newSourceFile,
    _objectSpread({}, config, {
      filepath: sourceFilePath,
      parser: createFormattingParser(inferredParser, babelTraverse)
    })
  );

  if (formattedNewSourceFile !== sourceFile) {
    jestWriteFile(sourceFilePath, formattedNewSourceFile);
  }
};

const groupSnapshotsBy = createKey => snapshots =>
  snapshots.reduce((object, inlineSnapshot) => {
    const key = createKey(inlineSnapshot);
    return _objectSpread({}, object, {
      [key]: (object[key] || []).concat(inlineSnapshot)
    });
  }, {});

const groupSnapshotsByFrame = groupSnapshotsBy(({frame: {line, column}}) =>
  typeof line === 'number' && typeof column === 'number'
    ? `${line}:${column - 1}`
    : ''
);
const groupSnapshotsByFile = groupSnapshotsBy(({frame: {file}}) => file);

const indent = (snapshot, numIndents, indentation) => {
  const lines = snapshot.split('\n'); // Prevent re-identation of inline snapshots.

  if (
    lines.length >= 2 &&
    lines[1].startsWith(indentation.repeat(numIndents + 1))
  ) {
    return snapshot;
  }

  return lines
    .map((line, index) => {
      if (index === 0) {
        // First line is either a 1-line snapshot or a blank line.
        return line;
      } else if (index !== lines.length - 1) {
        // Do not indent empty lines.
        if (line === '') {
          return line;
        } // Not last line, indent one level deeper than expect call.

        return indentation.repeat(numIndents + 1) + line;
      } else {
        // The last line should be placed on the same level as the expect call.
        return indentation.repeat(numIndents) + line;
      }
    })
    .join('\n');
};

const getAst = (parsers, inferredParser, text) => {
  // Flow uses a 'Program' parent node, babel expects a 'File'.
  let ast = parsers[inferredParser](text);

  if (ast.type !== 'File') {
    ast = (0, _types.file)(ast, ast.comments, ast.tokens);
    delete ast.program.comments;
  }

  return ast;
}; // This parser inserts snapshots into the AST.

const createInsertionParser = (snapshots, inferredParser, babelTraverse) => (
  text,
  parsers,
  options
) => {
  // Workaround for https://github.com/prettier/prettier/issues/3150
  options.parser = inferredParser;
  const groupedSnapshots = groupSnapshotsByFrame(snapshots);
  const remainingSnapshots = new Set(snapshots.map(({snapshot}) => snapshot));
  const ast = getAst(parsers, inferredParser, text);
  babelTraverse(ast, {
    CallExpression({node: {arguments: args, callee}}) {
      if (
        callee.type !== 'MemberExpression' ||
        callee.property.type !== 'Identifier'
      ) {
        return;
      }

      const _callee$property$loc$ = callee.property.loc.start,
        line = _callee$property$loc$.line,
        column = _callee$property$loc$.column;
      const snapshotsForFrame = groupedSnapshots[`${line}:${column}`];

      if (!snapshotsForFrame) {
        return;
      }

      if (snapshotsForFrame.length > 1) {
        throw new Error(
          'Jest: Multiple inline snapshots for the same call are not supported.'
        );
      }

      const snapshotIndex = args.findIndex(
        ({type}) => type === 'TemplateLiteral'
      );
      const values = snapshotsForFrame.map(({snapshot}) => {
        remainingSnapshots.delete(snapshot);
        return (0, _types.templateLiteral)(
          [
            (0, _types.templateElement)({
              raw: (0, _utils.escapeBacktickString)(snapshot)
            })
          ],
          []
        );
      });
      const replacementNode = values[0];

      if (snapshotIndex > -1) {
        args[snapshotIndex] = replacementNode;
      } else {
        args.push(replacementNode);
      }
    }
  });

  if (remainingSnapshots.size) {
    throw new Error(`Jest: Couldn't locate all inline snapshots.`);
  }

  return ast;
}; // This parser formats snapshots to the correct indentation.

const createFormattingParser = (inferredParser, babelTraverse) => (
  text,
  parsers,
  options
) => {
  // Workaround for https://github.com/prettier/prettier/issues/3150
  options.parser = inferredParser;
  const ast = getAst(parsers, inferredParser, text);
  babelTraverse(ast, {
    CallExpression({node: {arguments: args, callee}}) {
      if (
        callee.type !== 'MemberExpression' ||
        callee.property.type !== 'Identifier' ||
        callee.property.name !== 'toMatchInlineSnapshot' ||
        !callee.loc ||
        callee.computed
      ) {
        return;
      }

      let snapshotIndex;
      let snapshot;

      for (let i = 0; i < args.length; i++) {
        const node = args[i];

        if (node.type === 'TemplateLiteral') {
          snapshotIndex = i;
          snapshot = node.quasis[0].value.raw;
        }
      }

      if (snapshot === undefined || snapshotIndex === undefined) {
        return;
      }

      const useSpaces = !options.useTabs;
      snapshot = indent(
        snapshot,
        Math.ceil(
          useSpaces
            ? callee.loc.start.column / options.tabWidth
            : callee.loc.start.column / 2 // Each tab is 2 characters.
        ),
        useSpaces ? ' '.repeat(options.tabWidth) : '\t'
      );
      const replacementNode = (0, _types.templateLiteral)(
        [
          (0, _types.templateElement)({
            raw: snapshot
          })
        ],
        []
      );
      args[snapshotIndex] = replacementNode;
    }
  });
  return ast;
};

const simpleDetectParser = filePath => {
  const extname = _path.default.extname(filePath);

  if (/tsx?$/.test(extname)) {
    return 'typescript';
  }

  return 'babylon';
};

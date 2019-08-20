'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _postcss = require('postcss');

var _postcss2 = _interopRequireDefault(_postcss);

var _icssReplaceSymbols = require('icss-replace-symbols');

var _icssReplaceSymbols2 = _interopRequireDefault(_icssReplaceSymbols);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var matchImports = /^(.+?|\([\s\S]+?\))\s+from\s+("[^"]*"|'[^']*'|[\w-]+)$/;
var matchValueDefinition = /(?:\s+|^)([\w-]+):?\s+(.+?)\s*$/g;
var matchImport = /^([\w-]+)(?:\s+as\s+([\w-]+))?/;
var options = {};
var importIndex = 0;
var createImportedName = options && options.createImportedName || function (importName /*, path*/) {
  return 'i__const_' + importName.replace(/\W/g, '_') + '_' + importIndex++;
};

exports.default = _postcss2.default.plugin('postcss-modules-values', function () {
  return function (css, result) {
    var importAliases = [];
    var definitions = {};

    var addDefinition = function addDefinition(atRule) {
      var matches = void 0;
      while (matches = matchValueDefinition.exec(atRule.params)) {
        var _matches = matches;

        var _matches2 = _slicedToArray(_matches, 3);

        var /*match*/key = _matches2[1];
        var value = _matches2[2];
        // Add to the definitions, knowing that values can refer to each other

        definitions[key] = (0, _icssReplaceSymbols.replaceAll)(definitions, value);
        atRule.remove();
      }
    };

    var addImport = function addImport(atRule) {
      var matches = matchImports.exec(atRule.params);
      if (matches) {
        var _matches3 = _slicedToArray(matches, 3);

        var /*match*/aliases = _matches3[1];
        var path = _matches3[2];
        // We can use constants for path names

        if (definitions[path]) path = definitions[path];
        var imports = aliases.replace(/^\(\s*([\s\S]+)\s*\)$/, '$1').split(/\s*,\s*/).map(function (alias) {
          var tokens = matchImport.exec(alias);
          if (tokens) {
            var _tokens = _slicedToArray(tokens, 3);

            var /*match*/theirName = _tokens[1];
            var _tokens$ = _tokens[2];
            var myName = _tokens$ === undefined ? theirName : _tokens$;

            var importedName = createImportedName(myName);
            definitions[myName] = importedName;
            return { theirName: theirName, importedName: importedName };
          } else {
            throw new Error('@import statement "' + alias + '" is invalid!');
          }
        });
        importAliases.push({ path: path, imports: imports });
        atRule.remove();
      }
    };

    /* Look at all the @value statements and treat them as locals or as imports */
    css.walkAtRules('value', function (atRule) {
      if (matchImports.exec(atRule.params)) {
        addImport(atRule);
      } else {
        if (atRule.params.indexOf('@value') !== -1) {
          result.warn('Invalid value definition: ' + atRule.params);
        }

        addDefinition(atRule);
      }
    });

    /* We want to export anything defined by now, but don't add it to the CSS yet or
     it well get picked up by the replacement stuff */
    var exportDeclarations = Object.keys(definitions).map(function (key) {
      return _postcss2.default.decl({
        value: definitions[key],
        prop: key,
        raws: { before: "\n  " }
      });
    });

    /* If we have no definitions, don't continue */
    if (!Object.keys(definitions).length) return;

    /* Perform replacements */
    (0, _icssReplaceSymbols2.default)(css, definitions);

    /* Add export rules if any */
    if (exportDeclarations.length > 0) {
      var exportRule = _postcss2.default.rule({
        selector: ':export',
        raws: { after: "\n" }
      });
      exportRule.append(exportDeclarations);
      css.prepend(exportRule);
    }

    /* Add import rules */
    importAliases.reverse().forEach(function (_ref) {
      var path = _ref.path;
      var imports = _ref.imports;

      var importRule = _postcss2.default.rule({
        selector: ':import(' + path + ')',
        raws: { after: "\n" }
      });
      imports.forEach(function (_ref2) {
        var theirName = _ref2.theirName;
        var importedName = _ref2.importedName;

        importRule.append({
          value: theirName,
          prop: importedName,
          raws: { before: "\n  " }
        });
      });

      css.prepend(importRule);
    });
  };
});
module.exports = exports['default'];
'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var postcss = require('postcss');
var topologicalSort = require('./topologicalSort');

var declWhitelist = ['composes'];
var declFilter = new RegExp(`^(${declWhitelist.join('|')})$`);
var matchImports = /^(.+?)\s+from\s+(?:"([^"]+)"|'([^']+)'|(global))$/;
var icssImport = /^:import\((?:"([^"]+)"|'([^']+)')\)/;

var VISITED_MARKER = 1;

function createParentName(rule, root) {
  return `__${root.index(rule.parent)}_${rule.selector}`;
}

function serializeImports(imports) {
  return imports.map(function (importPath) {
    return '`' + importPath + '`';
  }).join(', ');
}

/**
 * :import('G') {}
 *
 * Rule
 *   composes: ... from 'A'
 *   composes: ... from 'B'

 * Rule
 *   composes: ... from 'A'
 *   composes: ... from 'A'
 *   composes: ... from 'C'
 *
 * Results in:
 *
 * graph: {
 *   G: [],
 *   A: [],
 *   B: ['A'],
 *   C: ['A'],
 * }
 */
function addImportToGraph(importId, parentId, graph, visited) {
  var siblingsId = parentId + '_' + 'siblings';
  var visitedId = parentId + '_' + importId;

  if (visited[visitedId] !== VISITED_MARKER) {
    if (!Array.isArray(visited[siblingsId])) visited[siblingsId] = [];

    var siblings = visited[siblingsId];

    if (Array.isArray(graph[importId])) graph[importId] = graph[importId].concat(siblings);else graph[importId] = siblings.slice();

    visited[visitedId] = VISITED_MARKER;
    siblings.push(importId);
  }
}

module.exports = postcss.plugin('modules-extract-imports', function () {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var failOnWrongOrder = options.failOnWrongOrder;

  return function (css) {
    var graph = {};
    var visited = {};

    var existingImports = {};
    var importDecls = {};
    var imports = {};

    var importIndex = 0;

    var createImportedName = typeof options.createImportedName !== 'function' ? function (importName /*, path*/) {
      return `i__imported_${importName.replace(/\W/g, '_')}_${importIndex++}`;
    } : options.createImportedName;

    // Check the existing imports order and save refs
    css.walkRules(function (rule) {
      var matches = icssImport.exec(rule.selector);

      if (matches) {
        var _matches = _slicedToArray(matches, 3),
            /*match*/doubleQuotePath = _matches[1],
            singleQuotePath = _matches[2];

        var importPath = doubleQuotePath || singleQuotePath;

        addImportToGraph(importPath, 'root', graph, visited);

        existingImports[importPath] = rule;
      }
    });

    // Find any declaration that supports imports
    css.walkDecls(declFilter, function (decl) {
      var matches = decl.value.match(matchImports);
      var tmpSymbols = void 0;

      if (matches) {
        var _matches2 = _slicedToArray(matches, 5),

        /*match*/symbols = _matches2[1],
            doubleQuotePath = _matches2[2],
            singleQuotePath = _matches2[3],
            global = _matches2[4];

        if (global) {
          // Composing globals simply means changing these classes to wrap them in global(name)
          tmpSymbols = symbols.split(/\s+/).map(function (s) {
            return `global(${s})`;
          });
        } else {
          var importPath = doubleQuotePath || singleQuotePath;
          var parentRule = createParentName(decl.parent, css);

          addImportToGraph(importPath, parentRule, graph, visited);

          importDecls[importPath] = decl;
          imports[importPath] = imports[importPath] || {};

          tmpSymbols = symbols.split(/\s+/).map(function (s) {
            if (!imports[importPath][s]) {
              imports[importPath][s] = createImportedName(s, importPath);
            }

            return imports[importPath][s];
          });
        }

        decl.value = tmpSymbols.join(' ');
      }
    });

    var importsOrder = topologicalSort(graph, failOnWrongOrder);

    if (importsOrder instanceof Error) {
      var importPath = importsOrder.nodes.find(function (importPath) {
        return importDecls.hasOwnProperty(importPath);
      });
      var decl = importDecls[importPath];

      var errMsg = 'Failed to resolve order of composed modules ' + serializeImports(importsOrder.nodes) + '.';

      throw decl.error(errMsg, {
        plugin: 'modules-extract-imports',
        word: 'composes'
      });
    }

    var lastImportRule = void 0;
    importsOrder.forEach(function (path) {
      var importedSymbols = imports[path];
      var rule = existingImports[path];

      if (!rule && importedSymbols) {
        rule = postcss.rule({
          selector: `:import("${path}")`,
          raws: { after: '\n' }
        });

        if (lastImportRule) css.insertAfter(lastImportRule, rule);else css.prepend(rule);
      }

      lastImportRule = rule;

      if (!importedSymbols) return;

      Object.keys(importedSymbols).forEach(function (importedSymbol) {
        rule.append(postcss.decl({
          value: importedSymbol,
          prop: importedSymbols[importedSymbol],
          raws: { before: '\n  ' }
        }));
      });
    });
  };
});
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _postcss = require('postcss');

var _postcss2 = _interopRequireDefault(_postcss);

var _cssSelectorTokenizer = require('css-selector-tokenizer');

var _cssSelectorTokenizer2 = _interopRequireDefault(_cssSelectorTokenizer);

var hasOwnProperty = Object.prototype.hasOwnProperty;

function getSingleLocalNamesForComposes(selectors) {
  return selectors.nodes.map(function (node) {
    if (node.type !== 'selector' || node.nodes.length !== 1) {
      throw new Error('composition is only allowed when selector is single :local class name not in "' + _cssSelectorTokenizer2['default'].stringify(selectors) + '"');
    }
    node = node.nodes[0];
    if (node.type !== 'nested-pseudo-class' || node.name !== 'local' || node.nodes.length !== 1) {
      throw new Error('composition is only allowed when selector is single :local class name not in "' + _cssSelectorTokenizer2['default'].stringify(selectors) + '", "' + _cssSelectorTokenizer2['default'].stringify(node) + '" is weird');
    }
    node = node.nodes[0];
    if (node.type !== 'selector' || node.nodes.length !== 1) {
      throw new Error('composition is only allowed when selector is single :local class name not in "' + _cssSelectorTokenizer2['default'].stringify(selectors) + '", "' + _cssSelectorTokenizer2['default'].stringify(node) + '" is weird');
    }
    node = node.nodes[0];
    if (node.type !== 'class') {
      // 'id' is not possible, because you can't compose ids
      throw new Error('composition is only allowed when selector is single :local class name not in "' + _cssSelectorTokenizer2['default'].stringify(selectors) + '", "' + _cssSelectorTokenizer2['default'].stringify(node) + '" is weird');
    }
    return node.name;
  });
}

var processor = _postcss2['default'].plugin('postcss-modules-scope', function (options) {
  return function (css) {
    var generateScopedName = options && options.generateScopedName || processor.generateScopedName;

    var exports = {};

    function exportScopedName(name) {
      var scopedName = generateScopedName(name, css.source.input.from, css.source.input.css);
      exports[name] = exports[name] || [];
      if (exports[name].indexOf(scopedName) < 0) {
        exports[name].push(scopedName);
      }
      return scopedName;
    }

    function localizeNode(node) {
      var newNode = Object.create(node);
      switch (node.type) {
        case 'selector':
          newNode.nodes = node.nodes.map(localizeNode);
          return newNode;
        case 'class':
        case 'id':
          var scopedName = exportScopedName(node.name);
          newNode.name = scopedName;
          return newNode;
      }
      throw new Error(node.type + ' ("' + _cssSelectorTokenizer2['default'].stringify(node) + '") is not allowed in a :local block');
    }

    function traverseNode(node) {
      switch (node.type) {
        case 'nested-pseudo-class':
          if (node.name === 'local') {
            if (node.nodes.length !== 1) {
              throw new Error('Unexpected comma (",") in :local block');
            }
            return localizeNode(node.nodes[0]);
          }
        /* falls through */
        case 'selectors':
        case 'selector':
          var newNode = Object.create(node);
          newNode.nodes = node.nodes.map(traverseNode);
          return newNode;
      }
      return node;
    }

    // Find any :import and remember imported names
    var importedNames = {};
    css.walkRules(function (rule) {
      if (/^:import\(.+\)$/.test(rule.selector)) {
        rule.walkDecls(function (decl) {
          importedNames[decl.prop] = true;
        });
      }
    });

    // Find any :local classes
    css.walkRules(function (rule) {
      var selector = _cssSelectorTokenizer2['default'].parse(rule.selector);
      var newSelector = traverseNode(selector);
      rule.selector = _cssSelectorTokenizer2['default'].stringify(newSelector);
      rule.walkDecls(/composes|compose-with/, function (decl) {
        var localNames = getSingleLocalNamesForComposes(selector);
        var classes = decl.value.split(/\s+/);
        classes.forEach(function (className) {
          var global = /^global\(([^\)]+)\)$/.exec(className);
          if (global) {
            localNames.forEach(function (exportedName) {
              exports[exportedName].push(global[1]);
            });
          } else if (hasOwnProperty.call(importedNames, className)) {
            localNames.forEach(function (exportedName) {
              exports[exportedName].push(className);
            });
          } else if (hasOwnProperty.call(exports, className)) {
            localNames.forEach(function (exportedName) {
              exports[className].forEach(function (item) {
                exports[exportedName].push(item);
              });
            });
          } else {
            throw decl.error('referenced class name "' + className + '" in ' + decl.prop + ' not found');
          }
        });
        decl.remove();
      });

      rule.walkDecls(function (decl) {
        var tokens = decl.value.split(/(,|'[^']*'|"[^"]*")/);
        tokens = tokens.map(function (token, idx) {
          if (idx === 0 || tokens[idx - 1] === ',') {
            var localMatch = /^(\s*):local\s*\((.+?)\)/.exec(token);
            if (localMatch) {
              return localMatch[1] + exportScopedName(localMatch[2]) + token.substr(localMatch[0].length);
            } else {
              return token;
            }
          } else {
            return token;
          }
        });
        decl.value = tokens.join('');
      });
    });

    // Find any :local keyframes
    css.walkAtRules(function (atrule) {
      if (/keyframes$/.test(atrule.name)) {
        var localMatch = /^\s*:local\s*\((.+?)\)\s*$/.exec(atrule.params);
        if (localMatch) {
          atrule.params = exportScopedName(localMatch[1]);
        }
      }
    });

    // If we found any :locals, insert an :export rule
    var exportedNames = Object.keys(exports);
    if (exportedNames.length > 0) {
      (function () {
        var exportRule = _postcss2['default'].rule({ selector: ':export' });
        exportedNames.forEach(function (exportedName) {
          return exportRule.append({
            prop: exportedName,
            value: exports[exportedName].join(' '),
            raws: { before: '\n  ' }
          });
        });
        css.append(exportRule);
      })();
    }
  };
});

processor.generateScopedName = function (exportedName, path) {
  var sanitisedPath = path.replace(/\.[^\.\/\\]+$/, '').replace(/[\W_]+/g, '_').replace(/^_|_$/g, '');
  return '_' + sanitisedPath + '__' + exportedName;
};

exports['default'] = processor;
module.exports = exports['default'];
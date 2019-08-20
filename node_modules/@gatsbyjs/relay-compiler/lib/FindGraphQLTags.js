/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */
'use strict';

var Profiler = require("./GraphQLCompilerProfiler");

var babylon = require("@babel/parser");

var util = require("util");

// Attempt to be as inclusive as possible of source text.
var BABYLON_OPTIONS = {
  allowImportExportEverywhere: true,
  allowReturnOutsideFunction: true,
  allowSuperOutsideMethod: true,
  sourceType: 'module',
  plugins: [// Previously "*"
  'asyncGenerators', 'classProperties', ['decorators', {
    decoratorsBeforeExport: true
  }], 'doExpressions', 'dynamicImport', 'exportExtensions', 'flow', 'functionBind', 'functionSent', 'jsx', 'nullishCoalescingOperator', 'objectRestSpread', 'optionalChaining', 'optionalCatchBinding'],
  strictMode: false
};

function find(text) {
  var result = [];
  var ast = babylon.parse(text, BABYLON_OPTIONS);
  var visitors = {
    CallExpression: function CallExpression(node) {
      var callee = node.callee;

      if (!(callee.type === 'Identifier' && CREATE_CONTAINER_FUNCTIONS[callee.name] || callee.kind === 'MemberExpression' && callee.object.type === 'Identifier' && callee.object.value === 'Relay' && callee.property.type === 'Identifier' && CREATE_CONTAINER_FUNCTIONS[callee.property.name])) {
        traverse(node, visitors);
        return;
      }

      var fragments = node.arguments[1];

      if (fragments.type === 'ObjectExpression') {
        fragments.properties.forEach(function (property) {
          !(property.type === 'ObjectProperty' && property.key.type === 'Identifier' && property.value.type === 'TaggedTemplateExpression') ? process.env.NODE_ENV !== "production" ? invariant(false, 'FindGraphQLTags: `%s` expects fragment definitions to be ' + '`key: graphql`.', node.callee.name) : invariant(false) : void 0;
          !isGraphQLTag(property.value.tag) ? process.env.NODE_ENV !== "production" ? invariant(false, 'FindGraphQLTags: `%s` expects fragment definitions to be tagged ' + 'with `graphql`, got `%s`.', node.callee.name, getSourceTextForLocation(text, property.value.tag.loc)) : invariant(false) : void 0;
          result.push({
            keyName: property.key.name,
            template: getGraphQLText(property.value.quasi),
            sourceLocationOffset: getSourceLocationOffset(property.value.quasi)
          });
        });
      } else {
        !(fragments && fragments.type === 'TaggedTemplateExpression') ? process.env.NODE_ENV !== "production" ? invariant(false, 'FindGraphQLTags: `%s` expects a second argument of fragment ' + 'definitions.', node.callee.name) : invariant(false) : void 0;
        !isGraphQLTag(fragments.tag) ? process.env.NODE_ENV !== "production" ? invariant(false, 'FindGraphQLTags: `%s` expects fragment definitions to be tagged ' + 'with `graphql`, got `%s`.', node.callee.name, getSourceTextForLocation(text, fragments.tag.loc)) : invariant(false) : void 0;
        result.push({
          keyName: null,
          template: getGraphQLText(fragments.quasi),
          sourceLocationOffset: getSourceLocationOffset(fragments.quasi)
        });
      } // Visit remaining arguments


      for (var ii = 2; ii < node.arguments.length; ii++) {
        visit(node.arguments[ii], visitors);
      }
    },
    TaggedTemplateExpression: function TaggedTemplateExpression(node) {
      if (isGraphQLTag(node.tag)) {
        result.push({
          keyName: null,
          template: node.quasi.quasis[0].value.raw,
          sourceLocationOffset: getSourceLocationOffset(node.quasi)
        });
      }
    }
  };
  visit(ast, visitors);
  return result;
}

var CREATE_CONTAINER_FUNCTIONS = Object.create(null, {
  createFragmentContainer: {
    value: true
  },
  createPaginationContainer: {
    value: true
  },
  createRefetchContainer: {
    value: true
  }
});
var IGNORED_KEYS = {
  comments: true,
  end: true,
  leadingComments: true,
  loc: true,
  name: true,
  start: true,
  trailingComments: true,
  type: true
};

function isGraphQLTag(tag) {
  return tag.type === 'Identifier' && tag.name === 'graphql';
}

function getTemplateNode(quasi) {
  var quasis = quasi.quasis;
  !(quasis && quasis.length === 1) ? process.env.NODE_ENV !== "production" ? invariant(false, 'FindGraphQLTags: Substitutions are not allowed in graphql tags.') : invariant(false) : void 0;
  return quasis[0];
}

function getGraphQLText(quasi) {
  return getTemplateNode(quasi).value.raw;
}

function getSourceLocationOffset(quasi) {
  var loc = getTemplateNode(quasi).loc.start;
  return {
    line: loc.line,
    column: loc.column + 1 // babylon is 0-indexed, graphql expects 1-indexed

  };
}

function getSourceTextForLocation(text, loc) {
  if (loc == null) {
    return '(source unavailable)';
  }

  var lines = text.split('\n').slice(loc.start.line - 1, loc.end.line);
  lines[0] = lines[0].slice(loc.start.column);
  lines[lines.length - 1] = lines[lines.length - 1].slice(0, loc.end.column);
  return lines.join('\n');
}

function invariant(condition, msg) {
  if (!condition) {
    for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    throw new Error(util.format.apply(util, [msg].concat(args)));
  }
}

function visit(node, visitors) {
  var fn = visitors[node.type];

  if (fn != null) {
    fn(node);
    return;
  }

  traverse(node, visitors);
}

function traverse(node, visitors) {
  for (var key in node) {
    if (IGNORED_KEYS[key]) {
      continue;
    }

    var prop = node[key];

    if (prop && typeof prop === 'object' && typeof prop.type === 'string') {
      visit(prop, visitors);
    } else if (Array.isArray(prop)) {
      prop.forEach(function (item) {
        if (item && typeof item === 'object' && typeof item.type === 'string') {
          visit(item, visitors);
        }
      });
    }
  }
}

module.exports = {
  find: Profiler.instrument(find, 'FindGraphQLTags.find')
};
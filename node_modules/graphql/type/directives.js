"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isDirective = isDirective;
exports.assertDirective = assertDirective;
exports.isSpecifiedDirective = isSpecifiedDirective;
exports.specifiedDirectives = exports.GraphQLDeprecatedDirective = exports.DEFAULT_DEPRECATION_REASON = exports.GraphQLSkipDirective = exports.GraphQLIncludeDirective = exports.GraphQLDirective = void 0;

var _objectEntries = _interopRequireDefault(require("../polyfills/objectEntries"));

var _isObjectLike = _interopRequireDefault(require("../jsutils/isObjectLike"));

var _definition = require("./definition");

var _scalars = require("./scalars");

var _defineToStringTag = _interopRequireDefault(require("../jsutils/defineToStringTag"));

var _defineToJSON = _interopRequireDefault(require("../jsutils/defineToJSON"));

var _instanceOf = _interopRequireDefault(require("../jsutils/instanceOf"));

var _invariant = _interopRequireDefault(require("../jsutils/invariant"));

var _inspect = _interopRequireDefault(require("../jsutils/inspect"));

var _directiveLocation = require("../language/directiveLocation");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-next-line no-redeclare
function isDirective(directive) {
  return (0, _instanceOf.default)(directive, GraphQLDirective);
}

function assertDirective(directive) {
  !isDirective(directive) ? (0, _invariant.default)(0, "Expected ".concat((0, _inspect.default)(directive), " to be a GraphQL directive.")) : void 0;
  return directive;
}
/**
 * Directives are used by the GraphQL runtime as a way of modifying execution
 * behavior. Type system creators will usually not create these directly.
 */


var GraphQLDirective =
/*#__PURE__*/
function () {
  function GraphQLDirective(config) {
    this.name = config.name;
    this.description = config.description;
    this.locations = config.locations;
    this.isRepeatable = config.isRepeatable != null && config.isRepeatable;
    this.astNode = config.astNode;
    !config.name ? (0, _invariant.default)(0, 'Directive must be named.') : void 0;
    !Array.isArray(config.locations) ? (0, _invariant.default)(0, "@".concat(config.name, " locations must be an Array.")) : void 0;
    var args = config.args || {};
    !((0, _isObjectLike.default)(args) && !Array.isArray(args)) ? (0, _invariant.default)(0, "@".concat(config.name, " args must be an object with argument names as keys.")) : void 0;
    this.args = (0, _objectEntries.default)(args).map(function (_ref) {
      var argName = _ref[0],
          arg = _ref[1];
      return {
        name: argName,
        description: arg.description === undefined ? null : arg.description,
        type: arg.type,
        defaultValue: arg.defaultValue,
        astNode: arg.astNode
      };
    });
  }

  var _proto = GraphQLDirective.prototype;

  _proto.toString = function toString() {
    return '@' + this.name;
  };

  _proto.toConfig = function toConfig() {
    return {
      name: this.name,
      description: this.description,
      locations: this.locations,
      args: (0, _definition.argsToArgsConfig)(this.args),
      isRepeatable: this.isRepeatable,
      astNode: this.astNode
    };
  };

  return GraphQLDirective;
}(); // Conditionally apply `[Symbol.toStringTag]` if `Symbol`s are supported


exports.GraphQLDirective = GraphQLDirective;
(0, _defineToStringTag.default)(GraphQLDirective);
(0, _defineToJSON.default)(GraphQLDirective);

/**
 * Used to conditionally include fields or fragments.
 */
var GraphQLIncludeDirective = new GraphQLDirective({
  name: 'include',
  description: 'Directs the executor to include this field or fragment only when the `if` argument is true.',
  locations: [_directiveLocation.DirectiveLocation.FIELD, _directiveLocation.DirectiveLocation.FRAGMENT_SPREAD, _directiveLocation.DirectiveLocation.INLINE_FRAGMENT],
  args: {
    if: {
      type: (0, _definition.GraphQLNonNull)(_scalars.GraphQLBoolean),
      description: 'Included when true.'
    }
  }
});
/**
 * Used to conditionally skip (exclude) fields or fragments.
 */

exports.GraphQLIncludeDirective = GraphQLIncludeDirective;
var GraphQLSkipDirective = new GraphQLDirective({
  name: 'skip',
  description: 'Directs the executor to skip this field or fragment when the `if` argument is true.',
  locations: [_directiveLocation.DirectiveLocation.FIELD, _directiveLocation.DirectiveLocation.FRAGMENT_SPREAD, _directiveLocation.DirectiveLocation.INLINE_FRAGMENT],
  args: {
    if: {
      type: (0, _definition.GraphQLNonNull)(_scalars.GraphQLBoolean),
      description: 'Skipped when true.'
    }
  }
});
/**
 * Constant string used for default reason for a deprecation.
 */

exports.GraphQLSkipDirective = GraphQLSkipDirective;
var DEFAULT_DEPRECATION_REASON = 'No longer supported';
/**
 * Used to declare element of a GraphQL schema as deprecated.
 */

exports.DEFAULT_DEPRECATION_REASON = DEFAULT_DEPRECATION_REASON;
var GraphQLDeprecatedDirective = new GraphQLDirective({
  name: 'deprecated',
  description: 'Marks an element of a GraphQL schema as no longer supported.',
  locations: [_directiveLocation.DirectiveLocation.FIELD_DEFINITION, _directiveLocation.DirectiveLocation.ENUM_VALUE],
  args: {
    reason: {
      type: _scalars.GraphQLString,
      description: 'Explains why this element was deprecated, usually also including a suggestion for how to access supported similar data. Formatted using the Markdown syntax (as specified by [CommonMark](https://commonmark.org/).',
      defaultValue: DEFAULT_DEPRECATION_REASON
    }
  }
});
/**
 * The full list of specified directives.
 */

exports.GraphQLDeprecatedDirective = GraphQLDeprecatedDirective;
var specifiedDirectives = Object.freeze([GraphQLIncludeDirective, GraphQLSkipDirective, GraphQLDeprecatedDirective]);
exports.specifiedDirectives = specifiedDirectives;

function isSpecifiedDirective(directive) {
  return isDirective(directive) && specifiedDirectives.some(function (_ref2) {
    var name = _ref2.name;
    return name === directive.name;
  });
}

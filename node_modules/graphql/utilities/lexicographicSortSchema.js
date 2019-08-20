"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.lexicographicSortSchema = lexicographicSortSchema;

var _objectValues = _interopRequireDefault(require("../polyfills/objectValues"));

var _inspect = _interopRequireDefault(require("../jsutils/inspect"));

var _keyValMap = _interopRequireDefault(require("../jsutils/keyValMap"));

var _schema = require("../type/schema");

var _directives = require("../type/directives");

var _definition = require("../type/definition");

var _introspection = require("../type/introspection");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Sort GraphQLSchema.
 */
function lexicographicSortSchema(schema) {
  var schemaConfig = schema.toConfig();
  var typeMap = (0, _keyValMap.default)(sortByName(schemaConfig.types), function (type) {
    return type.name;
  }, sortNamedType);
  return new _schema.GraphQLSchema(_objectSpread({}, schemaConfig, {
    types: (0, _objectValues.default)(typeMap),
    directives: sortByName(schemaConfig.directives).map(sortDirective),
    query: replaceMaybeType(schemaConfig.query),
    mutation: replaceMaybeType(schemaConfig.mutation),
    subscription: replaceMaybeType(schemaConfig.subscription)
  }));

  function replaceType(type) {
    if ((0, _definition.isListType)(type)) {
      return new _definition.GraphQLList(replaceType(type.ofType));
    } else if ((0, _definition.isNonNullType)(type)) {
      return new _definition.GraphQLNonNull(replaceType(type.ofType));
    }

    return replaceNamedType(type);
  }

  function replaceNamedType(type) {
    return typeMap[type.name];
  }

  function replaceMaybeType(maybeType) {
    return maybeType && replaceNamedType(maybeType);
  }

  function sortDirective(directive) {
    var config = directive.toConfig();
    return new _directives.GraphQLDirective(_objectSpread({}, config, {
      locations: sortBy(config.locations, function (x) {
        return x;
      }),
      args: sortArgs(config.args)
    }));
  }

  function sortArgs(args) {
    return sortObjMap(args, function (arg) {
      return _objectSpread({}, arg, {
        type: replaceType(arg.type)
      });
    });
  }

  function sortFields(fieldsMap) {
    return sortObjMap(fieldsMap, function (field) {
      return _objectSpread({}, field, {
        type: replaceType(field.type),
        args: sortArgs(field.args)
      });
    });
  }

  function sortInputFields(fieldsMap) {
    return sortObjMap(fieldsMap, function (field) {
      return _objectSpread({}, field, {
        type: replaceType(field.type)
      });
    });
  }

  function sortTypes(arr) {
    return sortByName(arr).map(replaceNamedType);
  }

  function sortNamedType(type) {
    if ((0, _definition.isScalarType)(type) || (0, _introspection.isIntrospectionType)(type)) {
      return type;
    } else if ((0, _definition.isObjectType)(type)) {
      var config = type.toConfig();
      return new _definition.GraphQLObjectType(_objectSpread({}, config, {
        interfaces: function interfaces() {
          return sortTypes(config.interfaces);
        },
        fields: function fields() {
          return sortFields(config.fields);
        }
      }));
    } else if ((0, _definition.isInterfaceType)(type)) {
      var _config = type.toConfig();

      return new _definition.GraphQLInterfaceType(_objectSpread({}, _config, {
        fields: function fields() {
          return sortFields(_config.fields);
        }
      }));
    } else if ((0, _definition.isUnionType)(type)) {
      var _config2 = type.toConfig();

      return new _definition.GraphQLUnionType(_objectSpread({}, _config2, {
        types: function types() {
          return sortTypes(_config2.types);
        }
      }));
    } else if ((0, _definition.isEnumType)(type)) {
      var _config3 = type.toConfig();

      return new _definition.GraphQLEnumType(_objectSpread({}, _config3, {
        values: sortObjMap(_config3.values)
      }));
    } else if ((0, _definition.isInputObjectType)(type)) {
      var _config4 = type.toConfig();

      return new _definition.GraphQLInputObjectType(_objectSpread({}, _config4, {
        fields: function fields() {
          return sortInputFields(_config4.fields);
        }
      }));
    } // Not reachable. All possible types have been considered.

    /* istanbul ignore next */


    throw new Error("Unexpected type: \"".concat((0, _inspect.default)(type), "\"."));
  }
}

function sortObjMap(map, sortValueFn) {
  var sortedMap = Object.create(null);
  var sortedKeys = sortBy(Object.keys(map), function (x) {
    return x;
  });

  for (var _i = 0, _sortedKeys = sortedKeys; _i < _sortedKeys.length; _i++) {
    var key = _sortedKeys[_i];
    var value = map[key];
    sortedMap[key] = sortValueFn ? sortValueFn(value) : value;
  }

  return sortedMap;
}

function sortByName(array) {
  return sortBy(array, function (obj) {
    return obj.name;
  });
}

function sortBy(array, mapToKey) {
  return array.slice().sort(function (obj1, obj2) {
    var key1 = mapToKey(obj1);
    var key2 = mapToKey(obj2);
    return key1.localeCompare(key2);
  });
}

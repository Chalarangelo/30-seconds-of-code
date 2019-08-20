"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extendingUnknownTypeMessage = extendingUnknownTypeMessage;
exports.extendingDifferentTypeKindMessage = extendingDifferentTypeKindMessage;
exports.PossibleTypeExtensions = PossibleTypeExtensions;

var _didYouMean = _interopRequireDefault(require("../../jsutils/didYouMean"));

var _suggestionList = _interopRequireDefault(require("../../jsutils/suggestionList"));

var _GraphQLError = require("../../error/GraphQLError");

var _kinds = require("../../language/kinds");

var _predicates = require("../../language/predicates");

var _definition = require("../../type/definition");

var _defKindToExtKind;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function extendingUnknownTypeMessage(typeName, suggestedTypes) {
  return "Cannot extend type \"".concat(typeName, "\" because it is not defined.") + (0, _didYouMean.default)(suggestedTypes.map(function (x) {
    return "\"".concat(x, "\"");
  }));
}

function extendingDifferentTypeKindMessage(typeName, kind) {
  return "Cannot extend non-".concat(kind, " type \"").concat(typeName, "\".");
}
/**
 * Possible type extension
 *
 * A type extension is only valid if the type is defined and has the same kind.
 */


function PossibleTypeExtensions(context) {
  var schema = context.getSchema();
  var definedTypes = Object.create(null);
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = context.getDocument().definitions[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var def = _step.value;

      if ((0, _predicates.isTypeDefinitionNode)(def)) {
        definedTypes[def.name.value] = def;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return {
    ScalarTypeExtension: checkExtension,
    ObjectTypeExtension: checkExtension,
    InterfaceTypeExtension: checkExtension,
    UnionTypeExtension: checkExtension,
    EnumTypeExtension: checkExtension,
    InputObjectTypeExtension: checkExtension
  };

  function checkExtension(node) {
    var typeName = node.name.value;
    var defNode = definedTypes[typeName];
    var existingType = schema && schema.getType(typeName);

    if (defNode) {
      var expectedKind = defKindToExtKind[defNode.kind];

      if (expectedKind !== node.kind) {
        context.reportError(new _GraphQLError.GraphQLError(extendingDifferentTypeKindMessage(typeName, extensionKindToTypeName(expectedKind)), [defNode, node]));
      }
    } else if (existingType) {
      var _expectedKind = typeToExtKind(existingType);

      if (_expectedKind !== node.kind) {
        context.reportError(new _GraphQLError.GraphQLError(extendingDifferentTypeKindMessage(typeName, extensionKindToTypeName(_expectedKind)), node));
      }
    } else {
      var allTypeNames = Object.keys(definedTypes);

      if (schema) {
        allTypeNames = allTypeNames.concat(Object.keys(schema.getTypeMap()));
      }

      var suggestedTypes = (0, _suggestionList.default)(typeName, allTypeNames);
      context.reportError(new _GraphQLError.GraphQLError(extendingUnknownTypeMessage(typeName, suggestedTypes), node.name));
    }
  }
}

var defKindToExtKind = (_defKindToExtKind = {}, _defineProperty(_defKindToExtKind, _kinds.Kind.SCALAR_TYPE_DEFINITION, _kinds.Kind.SCALAR_TYPE_EXTENSION), _defineProperty(_defKindToExtKind, _kinds.Kind.OBJECT_TYPE_DEFINITION, _kinds.Kind.OBJECT_TYPE_EXTENSION), _defineProperty(_defKindToExtKind, _kinds.Kind.INTERFACE_TYPE_DEFINITION, _kinds.Kind.INTERFACE_TYPE_EXTENSION), _defineProperty(_defKindToExtKind, _kinds.Kind.UNION_TYPE_DEFINITION, _kinds.Kind.UNION_TYPE_EXTENSION), _defineProperty(_defKindToExtKind, _kinds.Kind.ENUM_TYPE_DEFINITION, _kinds.Kind.ENUM_TYPE_EXTENSION), _defineProperty(_defKindToExtKind, _kinds.Kind.INPUT_OBJECT_TYPE_DEFINITION, _kinds.Kind.INPUT_OBJECT_TYPE_EXTENSION), _defKindToExtKind);

function typeToExtKind(type) {
  if ((0, _definition.isScalarType)(type)) {
    return _kinds.Kind.SCALAR_TYPE_EXTENSION;
  } else if ((0, _definition.isObjectType)(type)) {
    return _kinds.Kind.OBJECT_TYPE_EXTENSION;
  } else if ((0, _definition.isInterfaceType)(type)) {
    return _kinds.Kind.INTERFACE_TYPE_EXTENSION;
  } else if ((0, _definition.isUnionType)(type)) {
    return _kinds.Kind.UNION_TYPE_EXTENSION;
  } else if ((0, _definition.isEnumType)(type)) {
    return _kinds.Kind.ENUM_TYPE_EXTENSION;
  } else if ((0, _definition.isInputObjectType)(type)) {
    return _kinds.Kind.INPUT_OBJECT_TYPE_EXTENSION;
  }
}

function extensionKindToTypeName(kind) {
  switch (kind) {
    case _kinds.Kind.SCALAR_TYPE_EXTENSION:
      return 'scalar';

    case _kinds.Kind.OBJECT_TYPE_EXTENSION:
      return 'object';

    case _kinds.Kind.INTERFACE_TYPE_EXTENSION:
      return 'interface';

    case _kinds.Kind.UNION_TYPE_EXTENSION:
      return 'union';

    case _kinds.Kind.ENUM_TYPE_EXTENSION:
      return 'enum';

    case _kinds.Kind.INPUT_OBJECT_TYPE_EXTENSION:
      return 'input object';

    default:
      return 'unknown type';
  }
}

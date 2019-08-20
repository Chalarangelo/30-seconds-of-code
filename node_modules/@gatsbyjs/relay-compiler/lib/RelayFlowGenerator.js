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

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var babelGenerator = require("@babel/generator")["default"];

var FlattenTransform = require("./FlattenTransform");

var IRVisitor = require("./GraphQLIRVisitor");

var Profiler = require("./GraphQLCompilerProfiler");

var RelayMaskTransform = require("./RelayMaskTransform");

var RelayMatchTransform = require("./RelayMatchTransform");

var RelayRefetchableFragmentTransform = require("./RelayRefetchableFragmentTransform");

var RelayRelayDirectiveTransform = require("./RelayRelayDirectiveTransform");

var invariant = require("fbjs/lib/invariant");

var nullthrows = require("nullthrows");

var t = require("@babel/types");

var _require = require("./GraphQLSchemaUtils"),
    isAbstractType = _require.isAbstractType;

var _require2 = require("./RelayFlowBabelFactories"),
    anyTypeAlias = _require2.anyTypeAlias,
    exactObjectTypeAnnotation = _require2.exactObjectTypeAnnotation,
    exportType = _require2.exportType,
    importTypes = _require2.importTypes,
    intersectionTypeAnnotation = _require2.intersectionTypeAnnotation,
    lineComments = _require2.lineComments,
    readOnlyArrayOfType = _require2.readOnlyArrayOfType,
    readOnlyObjectTypeProperty = _require2.readOnlyObjectTypeProperty,
    unionTypeAnnotation = _require2.unionTypeAnnotation;

var _require3 = require("./RelayFlowTypeTransformers"),
    transformScalarType = _require3.transformScalarType,
    transformInputType = _require3.transformInputType;

var _require4 = require("graphql"),
    GraphQLInputObjectType = _require4.GraphQLInputObjectType,
    GraphQLNonNull = _require4.GraphQLNonNull;

function generate(node, options) {
  var ast = IRVisitor.visit(node, createVisitor(options));
  return babelGenerator(ast).code;
}

function makeProp(_ref, state, unmasked, concreteType) {
  var key = _ref.key,
      schemaName = _ref.schemaName,
      value = _ref.value,
      conditional = _ref.conditional,
      nodeType = _ref.nodeType,
      nodeSelections = _ref.nodeSelections;

  if (nodeType) {
    value = transformScalarType(nodeType, state, selectionsToBabel([Array.from(nullthrows(nodeSelections).values())], state, unmasked));
  }

  if (schemaName === '__typename' && concreteType) {
    value = t.stringLiteralTypeAnnotation(concreteType);
  }

  var typeProperty = readOnlyObjectTypeProperty(key, value);

  if (conditional) {
    typeProperty.optional = true;
  }

  return typeProperty;
}

var isTypenameSelection = function isTypenameSelection(selection) {
  return selection.schemaName === '__typename';
};

var hasTypenameSelection = function hasTypenameSelection(selections) {
  return selections.some(isTypenameSelection);
};

var onlySelectsTypename = function onlySelectsTypename(selections) {
  return selections.every(isTypenameSelection);
};

function selectionsToBabel(selections, state, unmasked, refTypeName) {
  var baseFields = new Map();
  var byConcreteType = {};
  flattenArray(selections).forEach(function (selection) {
    var concreteType = selection.concreteType;

    if (concreteType) {
      var _byConcreteType$concr;

      byConcreteType[concreteType] = (_byConcreteType$concr = byConcreteType[concreteType]) !== null && _byConcreteType$concr !== void 0 ? _byConcreteType$concr : [];
      byConcreteType[concreteType].push(selection);
    } else {
      var previousSel = baseFields.get(selection.key);
      baseFields.set(selection.key, previousSel ? mergeSelection(selection, previousSel) : selection);
    }
  });
  var types = [];

  if (Object.keys(byConcreteType).length && onlySelectsTypename(Array.from(baseFields.values())) && (hasTypenameSelection(Array.from(baseFields.values())) || Object.keys(byConcreteType).every(function (type) {
    return hasTypenameSelection(byConcreteType[type]);
  }))) {
    (function () {
      var typenameAliases = new Set();

      var _loop = function _loop(concreteType) {
        types.push(groupRefs((0, _toConsumableArray2["default"])(Array.from(baseFields.values())).concat((0, _toConsumableArray2["default"])(byConcreteType[concreteType]))).map(function (selection) {
          if (selection.schemaName === '__typename') {
            typenameAliases.add(selection.key);
          }

          return makeProp(selection, state, unmasked, concreteType);
        }));
      };

      for (var concreteType in byConcreteType) {
        _loop(concreteType);
      } // It might be some other type then the listed concrete types. Ideally, we
      // would set the type to diff(string, set of listed concrete types), but
      // this doesn't exist in Flow at the time.


      types.push(Array.from(typenameAliases).map(function (typenameAlias) {
        var otherProp = readOnlyObjectTypeProperty(typenameAlias, t.stringLiteralTypeAnnotation('%other'));
        otherProp.leadingComments = lineComments("This will never be '%other', but we need some", 'value in case none of the concrete values match.');
        return otherProp;
      }));
    })();
  } else {
    var selectionMap = selectionsToMap(Array.from(baseFields.values()));

    for (var concreteType in byConcreteType) {
      selectionMap = mergeSelections(selectionMap, selectionsToMap(byConcreteType[concreteType].map(function (sel) {
        return (0, _objectSpread2["default"])({}, sel, {
          conditional: true
        });
      })));
    }

    var selectionMapValues = groupRefs(Array.from(selectionMap.values())).map(function (sel) {
      return isTypenameSelection(sel) && sel.concreteType ? makeProp((0, _objectSpread2["default"])({}, sel, {
        conditional: false
      }), state, unmasked, sel.concreteType) : makeProp(sel, state, unmasked);
    });
    types.push(selectionMapValues);
  }

  return unionTypeAnnotation(types.map(function (props) {
    if (refTypeName) {
      props.push(readOnlyObjectTypeProperty('$refType', t.genericTypeAnnotation(t.identifier(refTypeName))));
    }

    return unmasked ? t.objectTypeAnnotation(props) : exactObjectTypeAnnotation(props);
  }));
}

function mergeSelection(a, b) {
  if (!a) {
    return (0, _objectSpread2["default"])({}, b, {
      conditional: true
    });
  }

  return (0, _objectSpread2["default"])({}, a, {
    nodeSelections: a.nodeSelections ? mergeSelections(a.nodeSelections, nullthrows(b.nodeSelections)) : null,
    conditional: a.conditional && b.conditional
  });
}

function mergeSelections(a, b) {
  var merged = new Map();
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = a.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _step$value = _step.value,
          key = _step$value[0],
          value = _step$value[1];
      merged.set(key, value);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = b.entries()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var _step2$value = _step2.value,
          key = _step2$value[0],
          value = _step2$value[1];
      merged.set(key, mergeSelection(a.get(key), value));
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
        _iterator2["return"]();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  return merged;
}

function isPlural(node) {
  return Boolean(node.metadata && node.metadata.plural);
}

function createVisitor(options) {
  var state = {
    customScalars: options.customScalars,
    enumsHasteModule: options.enumsHasteModule,
    existingFragmentNames: options.existingFragmentNames,
    generatedFragments: new Set(),
    generatedInputObjectTypes: {},
    optionalInputFields: options.optionalInputFields,
    usedEnums: {},
    usedFragments: new Set(),
    useHaste: options.useHaste,
    useSingleArtifactDirectory: options.useSingleArtifactDirectory,
    noFutureProofEnums: options.noFutureProofEnums
  };
  var hasMatchField = false;
  return {
    leave: {
      Root: function Root(node) {
        var inputVariablesType = generateInputVariablesType(node, state);
        var inputObjectTypes = generateInputObjectTypes(state);
        var responseType = exportType("".concat(node.name, "Response"), selectionsToBabel(node.selections, state, false));
        var operationType = exportType(node.name, exactObjectTypeAnnotation([t.objectTypeProperty(t.identifier('variables'), t.genericTypeAnnotation(t.identifier("".concat(node.name, "Variables")))), t.objectTypeProperty(t.identifier('response'), t.genericTypeAnnotation(t.identifier("".concat(node.name, "Response"))))]));
        var importedTypes = [];

        if (hasMatchField) {
          importedTypes.push('MatchPointer');
        }

        return t.program((0, _toConsumableArray2["default"])(getFragmentImports(state)).concat((0, _toConsumableArray2["default"])(getEnumDefinitions(state)), [importedTypes.length ? importTypes(importedTypes, 'relay-runtime') : null], (0, _toConsumableArray2["default"])(inputObjectTypes), [inputVariablesType, responseType, operationType]).filter(Boolean));
      },
      Fragment: function Fragment(node) {
        var selections = flattenArray(node.selections);
        var numConecreteSelections = selections.filter(function (s) {
          return s.concreteType;
        }).length;
        selections = selections.map(function (selection) {
          if (numConecreteSelections <= 1 && isTypenameSelection(selection) && !isAbstractType(node.type)) {
            return [(0, _objectSpread2["default"])({}, selection, {
              concreteType: node.type.toString()
            })];
          }

          return [selection];
        });
        state.generatedFragments.add(node.name);
        var refTypeName = getRefTypeName(node.name);
        var refType = t.declareExportDeclaration(t.declareOpaqueType(t.identifier(refTypeName), null, t.genericTypeAnnotation(t.identifier('FragmentReference'))));
        var unmasked = node.metadata && node.metadata.mask === false;
        var baseType = selectionsToBabel(selections, state, unmasked, unmasked ? undefined : refTypeName);
        var type = isPlural(node) ? readOnlyArrayOfType(baseType) : baseType;
        var importedTypes = ['FragmentReference'];

        if (hasMatchField) {
          importedTypes.push('MatchPointer');
        }

        return t.program((0, _toConsumableArray2["default"])(getFragmentImports(state)).concat((0, _toConsumableArray2["default"])(getEnumDefinitions(state)), [importTypes(importedTypes, 'relay-runtime'), refType, exportType(node.name, type)]));
      },
      InlineFragment: function InlineFragment(node) {
        var typeCondition = node.typeCondition;
        return flattenArray(node.selections).map(function (typeSelection) {
          return isAbstractType(typeCondition) ? (0, _objectSpread2["default"])({}, typeSelection, {
            conditional: true
          }) : (0, _objectSpread2["default"])({}, typeSelection, {
            concreteType: typeCondition.toString()
          });
        });
      },
      Condition: function Condition(node) {
        return flattenArray(node.selections).map(function (selection) {
          return (0, _objectSpread2["default"])({}, selection, {
            conditional: true
          });
        });
      },
      ScalarField: function ScalarField(node) {
        var _node$alias;

        return [{
          key: (_node$alias = node.alias) !== null && _node$alias !== void 0 ? _node$alias : node.name,
          schemaName: node.name,
          value: transformScalarType(node.type, state)
        }];
      },
      LinkedField: function LinkedField(node) {
        var _node$alias2;

        return [{
          key: (_node$alias2 = node.alias) !== null && _node$alias2 !== void 0 ? _node$alias2 : node.name,
          schemaName: node.name,
          nodeType: node.type,
          nodeSelections: selectionsToMap(flattenArray(node.selections))
        }];
      },
      MatchField: function MatchField(node) {
        var _node$alias3;

        hasMatchField = true;
        return [{
          key: (_node$alias3 = node.alias) !== null && _node$alias3 !== void 0 ? _node$alias3 : node.name,
          schemaName: node.name,
          value: t.nullableTypeAnnotation(t.genericTypeAnnotation(t.identifier('MatchPointer')))
        }];
      },
      FragmentSpread: function FragmentSpread(node) {
        state.usedFragments.add(node.name);
        return [{
          key: '__fragments_' + node.name,
          ref: node.name
        }];
      }
    }
  };
}

function selectionsToMap(selections) {
  var map = new Map();
  selections.forEach(function (selection) {
    var previousSel = map.get(selection.key);
    map.set(selection.key, previousSel ? mergeSelection(previousSel, selection) : selection);
  });
  return map;
}

function flattenArray(arrayOfArrays) {
  var result = [];
  arrayOfArrays.forEach(function (array) {
    return result.push.apply(result, (0, _toConsumableArray2["default"])(array));
  });
  return result;
}

function generateInputObjectTypes(state) {
  return Object.keys(state.generatedInputObjectTypes).map(function (typeIdentifier) {
    var inputObjectType = state.generatedInputObjectTypes[typeIdentifier];
    !(typeof inputObjectType !== 'string') ? process.env.NODE_ENV !== "production" ? invariant(false, 'RelayCompilerFlowGenerator: Expected input object type to have been' + ' defined before calling `generateInputObjectTypes`') : invariant(false) : void 0;
    return exportType(typeIdentifier, inputObjectType);
  });
}

function generateInputVariablesType(node, state) {
  return exportType("".concat(node.name, "Variables"), exactObjectTypeAnnotation(node.argumentDefinitions.map(function (arg) {
    var property = t.objectTypeProperty(t.identifier(arg.name), transformInputType(arg.type, state));

    if (!(arg.type instanceof GraphQLNonNull)) {
      property.optional = true;
    }

    return property;
  })));
}

function groupRefs(props) {
  var result = [];
  var refs = [];
  props.forEach(function (prop) {
    if (prop.ref) {
      refs.push(prop.ref);
    } else {
      result.push(prop);
    }
  });

  if (refs.length > 0) {
    var value = intersectionTypeAnnotation(refs.map(function (ref) {
      return t.genericTypeAnnotation(t.identifier(getRefTypeName(ref)));
    }));
    result.push({
      key: '$fragmentRefs',
      conditional: false,
      value: value
    });
  }

  return result;
}

function getFragmentImports(state) {
  var imports = [];

  if (state.usedFragments.size > 0) {
    var usedFragments = Array.from(state.usedFragments).sort();
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      for (var _iterator3 = usedFragments[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        var usedFragment = _step3.value;
        var refTypeName = getRefTypeName(usedFragment);

        if (!state.generatedFragments.has(usedFragment)) {
          if (state.useHaste && state.existingFragmentNames.has(usedFragment)) {
            // TODO(T22653277) support non-haste environments when importing
            // fragments
            imports.push(importTypes([refTypeName], usedFragment + '.graphql'));
          } else if (state.useSingleArtifactDirectory && state.existingFragmentNames.has(usedFragment)) {
            imports.push(importTypes([refTypeName], './' + usedFragment + '.graphql'));
          } else {
            imports.push(anyTypeAlias(refTypeName));
          }
        }
      }
    } catch (err) {
      _didIteratorError3 = true;
      _iteratorError3 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
          _iterator3["return"]();
        }
      } finally {
        if (_didIteratorError3) {
          throw _iteratorError3;
        }
      }
    }
  }

  return imports;
}

function getEnumDefinitions(_ref2) {
  var enumsHasteModule = _ref2.enumsHasteModule,
      usedEnums = _ref2.usedEnums,
      noFutureProofEnums = _ref2.noFutureProofEnums;
  var enumNames = Object.keys(usedEnums).sort();

  if (enumNames.length === 0) {
    return [];
  }

  if (enumsHasteModule) {
    return [importTypes(enumNames, enumsHasteModule)];
  }

  return enumNames.map(function (name) {
    var values = usedEnums[name].getValues().map(function (_ref3) {
      var value = _ref3.value;
      return value;
    });
    values.sort();

    if (!noFutureProofEnums) {
      values.push('%future added value');
    }

    return exportType(name, t.unionTypeAnnotation(values.map(function (value) {
      return t.stringLiteralTypeAnnotation(value);
    })));
  });
}

function getRefTypeName(name) {
  return "".concat(name, "$ref");
}

var FLOW_TRANSFORMS = [RelayRelayDirectiveTransform.transform, RelayMaskTransform.transform, RelayMatchTransform.transform, FlattenTransform.transformWithOptions({}), RelayRefetchableFragmentTransform.transform];
module.exports = {
  generate: Profiler.instrument(generate, 'RelayFlowGenerator.generate'),
  transforms: FLOW_TRANSFORMS
};
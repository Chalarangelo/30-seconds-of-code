// @flow strict

import didYouMean from '../../jsutils/didYouMean';
import suggestionList from '../../jsutils/suggestionList';
import { type SDLValidationContext } from '../ValidationContext';
import { GraphQLError } from '../../error/GraphQLError';
import { Kind } from '../../language/kinds';
import { isTypeDefinitionNode } from '../../language/predicates';
import { type ASTVisitor } from '../../language/visitor';
import {
  isScalarType,
  isObjectType,
  isInterfaceType,
  isUnionType,
  isEnumType,
  isInputObjectType,
} from '../../type/definition';

export function extendingUnknownTypeMessage(
  typeName: string,
  suggestedTypes: $ReadOnlyArray<string>,
): string {
  return (
    `Cannot extend type "${typeName}" because it is not defined.` +
    didYouMean(suggestedTypes.map(x => `"${x}"`))
  );
}

export function extendingDifferentTypeKindMessage(
  typeName: string,
  kind: string,
): string {
  return `Cannot extend non-${kind} type "${typeName}".`;
}

/**
 * Possible type extension
 *
 * A type extension is only valid if the type is defined and has the same kind.
 */
export function PossibleTypeExtensions(
  context: SDLValidationContext,
): ASTVisitor {
  const schema = context.getSchema();
  const definedTypes = Object.create(null);

  for (const def of context.getDocument().definitions) {
    if (isTypeDefinitionNode(def)) {
      definedTypes[def.name.value] = def;
    }
  }

  return {
    ScalarTypeExtension: checkExtension,
    ObjectTypeExtension: checkExtension,
    InterfaceTypeExtension: checkExtension,
    UnionTypeExtension: checkExtension,
    EnumTypeExtension: checkExtension,
    InputObjectTypeExtension: checkExtension,
  };

  function checkExtension(node) {
    const typeName = node.name.value;
    const defNode = definedTypes[typeName];
    const existingType = schema && schema.getType(typeName);

    if (defNode) {
      const expectedKind = defKindToExtKind[defNode.kind];
      if (expectedKind !== node.kind) {
        context.reportError(
          new GraphQLError(
            extendingDifferentTypeKindMessage(
              typeName,
              extensionKindToTypeName(expectedKind),
            ),
            [defNode, node],
          ),
        );
      }
    } else if (existingType) {
      const expectedKind = typeToExtKind(existingType);
      if (expectedKind !== node.kind) {
        context.reportError(
          new GraphQLError(
            extendingDifferentTypeKindMessage(
              typeName,
              extensionKindToTypeName(expectedKind),
            ),
            node,
          ),
        );
      }
    } else {
      let allTypeNames = Object.keys(definedTypes);
      if (schema) {
        allTypeNames = allTypeNames.concat(Object.keys(schema.getTypeMap()));
      }

      const suggestedTypes = suggestionList(typeName, allTypeNames);
      context.reportError(
        new GraphQLError(
          extendingUnknownTypeMessage(typeName, suggestedTypes),
          node.name,
        ),
      );
    }
  }
}

const defKindToExtKind = {
  [Kind.SCALAR_TYPE_DEFINITION]: Kind.SCALAR_TYPE_EXTENSION,
  [Kind.OBJECT_TYPE_DEFINITION]: Kind.OBJECT_TYPE_EXTENSION,
  [Kind.INTERFACE_TYPE_DEFINITION]: Kind.INTERFACE_TYPE_EXTENSION,
  [Kind.UNION_TYPE_DEFINITION]: Kind.UNION_TYPE_EXTENSION,
  [Kind.ENUM_TYPE_DEFINITION]: Kind.ENUM_TYPE_EXTENSION,
  [Kind.INPUT_OBJECT_TYPE_DEFINITION]: Kind.INPUT_OBJECT_TYPE_EXTENSION,
};

function typeToExtKind(type) {
  if (isScalarType(type)) {
    return Kind.SCALAR_TYPE_EXTENSION;
  } else if (isObjectType(type)) {
    return Kind.OBJECT_TYPE_EXTENSION;
  } else if (isInterfaceType(type)) {
    return Kind.INTERFACE_TYPE_EXTENSION;
  } else if (isUnionType(type)) {
    return Kind.UNION_TYPE_EXTENSION;
  } else if (isEnumType(type)) {
    return Kind.ENUM_TYPE_EXTENSION;
  } else if (isInputObjectType(type)) {
    return Kind.INPUT_OBJECT_TYPE_EXTENSION;
  }
}

function extensionKindToTypeName(kind) {
  switch (kind) {
    case Kind.SCALAR_TYPE_EXTENSION:
      return 'scalar';
    case Kind.OBJECT_TYPE_EXTENSION:
      return 'object';
    case Kind.INTERFACE_TYPE_EXTENSION:
      return 'interface';
    case Kind.UNION_TYPE_EXTENSION:
      return 'union';
    case Kind.ENUM_TYPE_EXTENSION:
      return 'enum';
    case Kind.INPUT_OBJECT_TYPE_EXTENSION:
      return 'input object';
    default:
      return 'unknown type';
  }
}

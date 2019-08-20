// @flow strict

import {
  type ValidationContext,
  type SDLValidationContext,
} from '../ValidationContext';
import { GraphQLError } from '../../error/GraphQLError';
import { Kind } from '../../language/kinds';
import { DirectiveLocation } from '../../language/directiveLocation';
import { type ASTVisitor } from '../../language/visitor';
import { specifiedDirectives } from '../../type/directives';

export function unknownDirectiveMessage(directiveName: string): string {
  return `Unknown directive "${directiveName}".`;
}

export function misplacedDirectiveMessage(
  directiveName: string,
  location: string,
): string {
  return `Directive "${directiveName}" may not be used on ${location}.`;
}

/**
 * Known directives
 *
 * A GraphQL document is only valid if all `@directives` are known by the
 * schema and legally positioned.
 */
export function KnownDirectives(
  context: ValidationContext | SDLValidationContext,
): ASTVisitor {
  const locationsMap = Object.create(null);

  const schema = context.getSchema();
  const definedDirectives = schema
    ? schema.getDirectives()
    : specifiedDirectives;
  for (const directive of definedDirectives) {
    locationsMap[directive.name] = directive.locations;
  }

  const astDefinitions = context.getDocument().definitions;
  for (const def of astDefinitions) {
    if (def.kind === Kind.DIRECTIVE_DEFINITION) {
      locationsMap[def.name.value] = def.locations.map(name => name.value);
    }
  }

  return {
    Directive(node, key, parent, path, ancestors) {
      const name = node.name.value;
      const locations = locationsMap[name];

      if (!locations) {
        context.reportError(
          new GraphQLError(unknownDirectiveMessage(name), node),
        );
        return;
      }
      const candidateLocation = getDirectiveLocationForASTPath(ancestors);
      if (candidateLocation && locations.indexOf(candidateLocation) === -1) {
        context.reportError(
          new GraphQLError(
            misplacedDirectiveMessage(name, candidateLocation),
            node,
          ),
        );
      }
    },
  };
}

function getDirectiveLocationForASTPath(ancestors) {
  const appliedTo = ancestors[ancestors.length - 1];
  if (!Array.isArray(appliedTo)) {
    switch (appliedTo.kind) {
      case Kind.OPERATION_DEFINITION:
        switch (appliedTo.operation) {
          case 'query':
            return DirectiveLocation.QUERY;
          case 'mutation':
            return DirectiveLocation.MUTATION;
          case 'subscription':
            return DirectiveLocation.SUBSCRIPTION;
        }
        break;
      case Kind.FIELD:
        return DirectiveLocation.FIELD;
      case Kind.FRAGMENT_SPREAD:
        return DirectiveLocation.FRAGMENT_SPREAD;
      case Kind.INLINE_FRAGMENT:
        return DirectiveLocation.INLINE_FRAGMENT;
      case Kind.FRAGMENT_DEFINITION:
        return DirectiveLocation.FRAGMENT_DEFINITION;
      case Kind.VARIABLE_DEFINITION:
        return DirectiveLocation.VARIABLE_DEFINITION;
      case Kind.SCHEMA_DEFINITION:
      case Kind.SCHEMA_EXTENSION:
        return DirectiveLocation.SCHEMA;
      case Kind.SCALAR_TYPE_DEFINITION:
      case Kind.SCALAR_TYPE_EXTENSION:
        return DirectiveLocation.SCALAR;
      case Kind.OBJECT_TYPE_DEFINITION:
      case Kind.OBJECT_TYPE_EXTENSION:
        return DirectiveLocation.OBJECT;
      case Kind.FIELD_DEFINITION:
        return DirectiveLocation.FIELD_DEFINITION;
      case Kind.INTERFACE_TYPE_DEFINITION:
      case Kind.INTERFACE_TYPE_EXTENSION:
        return DirectiveLocation.INTERFACE;
      case Kind.UNION_TYPE_DEFINITION:
      case Kind.UNION_TYPE_EXTENSION:
        return DirectiveLocation.UNION;
      case Kind.ENUM_TYPE_DEFINITION:
      case Kind.ENUM_TYPE_EXTENSION:
        return DirectiveLocation.ENUM;
      case Kind.ENUM_VALUE_DEFINITION:
        return DirectiveLocation.ENUM_VALUE;
      case Kind.INPUT_OBJECT_TYPE_DEFINITION:
      case Kind.INPUT_OBJECT_TYPE_EXTENSION:
        return DirectiveLocation.INPUT_OBJECT;
      case Kind.INPUT_VALUE_DEFINITION: {
        const parentNode = ancestors[ancestors.length - 3];
        return parentNode.kind === Kind.INPUT_OBJECT_TYPE_DEFINITION
          ? DirectiveLocation.INPUT_FIELD_DEFINITION
          : DirectiveLocation.ARGUMENT_DEFINITION;
      }
    }
  }
}

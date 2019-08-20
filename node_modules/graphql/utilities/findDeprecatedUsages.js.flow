// @flow strict

import { GraphQLError } from '../error/GraphQLError';
import { visit, visitWithTypeInfo } from '../language/visitor';
import { type DocumentNode } from '../language/ast';
import { getNamedType } from '../type/definition';
import { type GraphQLSchema } from '../type/schema';
import { TypeInfo } from './TypeInfo';

/**
 * A validation rule which reports deprecated usages.
 *
 * Returns a list of GraphQLError instances describing each deprecated use.
 */
export function findDeprecatedUsages(
  schema: GraphQLSchema,
  ast: DocumentNode,
): Array<GraphQLError> {
  const errors = [];
  const typeInfo = new TypeInfo(schema);

  visit(
    ast,
    visitWithTypeInfo(typeInfo, {
      Field(node) {
        const fieldDef = typeInfo.getFieldDef();
        if (fieldDef && fieldDef.isDeprecated) {
          const parentType = typeInfo.getParentType();
          if (parentType) {
            const reason = fieldDef.deprecationReason;
            errors.push(
              new GraphQLError(
                `The field ${parentType.name}.${fieldDef.name} is deprecated.` +
                  (reason ? ' ' + reason : ''),
                node,
              ),
            );
          }
        }
      },
      EnumValue(node) {
        const enumVal = typeInfo.getEnumValue();
        if (enumVal && enumVal.isDeprecated) {
          const type = getNamedType(typeInfo.getInputType());
          if (type) {
            const reason = enumVal.deprecationReason;
            errors.push(
              new GraphQLError(
                `The enum value ${type.name}.${enumVal.name} is deprecated.` +
                  (reason ? ' ' + reason : ''),
                node,
              ),
            );
          }
        }
      },
    }),
  );

  return errors;
}

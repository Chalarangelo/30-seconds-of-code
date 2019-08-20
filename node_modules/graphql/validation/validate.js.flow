// @flow strict

import invariant from '../jsutils/invariant';
import { type GraphQLError } from '../error/GraphQLError';
import { visit, visitInParallel, visitWithTypeInfo } from '../language/visitor';
import { type DocumentNode } from '../language/ast';
import { type GraphQLSchema } from '../type/schema';
import { assertValidSchema } from '../type/validate';
import { TypeInfo } from '../utilities/TypeInfo';
import { specifiedRules, specifiedSDLRules } from './specifiedRules';
import {
  type SDLValidationRule,
  type ValidationRule,
  SDLValidationContext,
  ValidationContext,
} from './ValidationContext';

/**
 * Implements the "Validation" section of the spec.
 *
 * Validation runs synchronously, returning an array of encountered errors, or
 * an empty array if no errors were encountered and the document is valid.
 *
 * A list of specific validation rules may be provided. If not provided, the
 * default list of rules defined by the GraphQL specification will be used.
 *
 * Each validation rules is a function which returns a visitor
 * (see the language/visitor API). Visitor methods are expected to return
 * GraphQLErrors, or Arrays of GraphQLErrors when invalid.
 *
 * Optionally a custom TypeInfo instance may be provided. If not provided, one
 * will be created from the provided schema.
 */
export function validate(
  schema: GraphQLSchema,
  documentAST: DocumentNode,
  rules?: $ReadOnlyArray<ValidationRule> = specifiedRules,
  typeInfo?: TypeInfo = new TypeInfo(schema),
): $ReadOnlyArray<GraphQLError> {
  invariant(documentAST, 'Must provide document');
  // If the schema used for validation is invalid, throw an error.
  assertValidSchema(schema);

  const context = new ValidationContext(schema, documentAST, typeInfo);
  // This uses a specialized visitor which runs multiple visitors in parallel,
  // while maintaining the visitor skip and break API.
  const visitor = visitInParallel(rules.map(rule => rule(context)));
  // Visit the whole document with each instance of all provided rules.
  visit(documentAST, visitWithTypeInfo(typeInfo, visitor));
  return context.getErrors();
}

// @internal
export function validateSDL(
  documentAST: DocumentNode,
  schemaToExtend?: ?GraphQLSchema,
  rules?: $ReadOnlyArray<SDLValidationRule> = specifiedSDLRules,
): $ReadOnlyArray<GraphQLError> {
  const context = new SDLValidationContext(documentAST, schemaToExtend);
  const visitors = rules.map(rule => rule(context));
  visit(documentAST, visitInParallel(visitors));
  return context.getErrors();
}

/**
 * Utility function which asserts a SDL document is valid by throwing an error
 * if it is invalid.
 *
 * @internal
 */
export function assertValidSDL(documentAST: DocumentNode): void {
  const errors = validateSDL(documentAST);
  if (errors.length !== 0) {
    throw new Error(errors.map(error => error.message).join('\n\n'));
  }
}

/**
 * Utility function which asserts a SDL document is valid by throwing an error
 * if it is invalid.
 *
 * @internal
 */
export function assertValidSDLExtension(
  documentAST: DocumentNode,
  schema: GraphQLSchema,
): void {
  const errors = validateSDL(documentAST, schema);
  if (errors.length !== 0) {
    throw new Error(errors.map(error => error.message).join('\n\n'));
  }
}

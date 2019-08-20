// The GraphQL query recommended for a full schema introspection.
export { // Produce the GraphQL query recommended for a full schema introspection.
// Accepts optional IntrospectionOptions.
getIntrospectionQuery, // @deprecated, use getIntrospectionQuery() - will be removed in v15.
introspectionQuery } from './introspectionQuery';
// Gets the target Operation from a Document.
export { getOperationAST } from './getOperationAST'; // Gets the Type for the target Operation AST.

export { getOperationRootType } from './getOperationRootType'; // Convert a GraphQLSchema to an IntrospectionQuery.

export { introspectionFromSchema } from './introspectionFromSchema'; // Build a GraphQLSchema from an introspection result.

export { buildClientSchema } from './buildClientSchema'; // Build a GraphQLSchema from GraphQL Schema language.

export { buildASTSchema, buildSchema, // @deprecated: Get the description from a schema AST node and supports legacy
// syntax for specifying descriptions - will be removed in v16.
getDescription } from './buildASTSchema';
// Extends an existing GraphQLSchema from a parsed GraphQL Schema language AST.
export { extendSchema } from './extendSchema'; // Sort a GraphQLSchema.

export { lexicographicSortSchema } from './lexicographicSortSchema'; // Print a GraphQLSchema to GraphQL Schema language.

export { printSchema, printType, printIntrospectionSchema } from './schemaPrinter'; // Create a GraphQLType from a GraphQL language AST.

export { typeFromAST } from './typeFromAST'; // Create a JavaScript value from a GraphQL language AST with a type.

export { valueFromAST } from './valueFromAST'; // Create a JavaScript value from a GraphQL language AST without a type.

export { valueFromASTUntyped } from './valueFromASTUntyped'; // Create a GraphQL language AST from a JavaScript value.

export { astFromValue } from './astFromValue'; // A helper to use within recursive-descent visitors which need to be aware of
// the GraphQL type system.

export { TypeInfo } from './TypeInfo'; // Coerces a JavaScript value to a GraphQL type, or produces errors.

export { coerceValue } from './coerceValue'; // @deprecated use coerceValue - will be removed in v15.

export { isValidJSValue } from './isValidJSValue'; // @deprecated use validation - will be removed in v15

export { isValidLiteralValue } from './isValidLiteralValue'; // Concatenates multiple AST together.

export { concatAST } from './concatAST'; // Separates an AST into an AST per Operation.

export { separateOperations } from './separateOperations'; // Strips characters that are not significant to the validity or execution
// of a GraphQL document.

export { stripIgnoredCharacters } from './stripIgnoredCharacters'; // Comparators for types

export { isEqualType, isTypeSubTypeOf, doTypesOverlap } from './typeComparators'; // Asserts that a string is a valid GraphQL name

export { assertValidName, isValidNameError } from './assertValidName'; // Compares two GraphQLSchemas and detects breaking changes.

export { BreakingChangeType, DangerousChangeType, findBreakingChanges, findDangerousChanges } from './findBreakingChanges';
// Report all deprecated usage within a GraphQL document.
export { findDeprecatedUsages } from './findDeprecatedUsages';

// @flow strict

import find from '../polyfills/find';
import { GraphQLError } from '../error/GraphQLError';
import inspect from '../jsutils/inspect';
import invariant from '../jsutils/invariant';
import keyMap from '../jsutils/keyMap';
import { coerceValue } from '../utilities/coerceValue';
import { typeFromAST } from '../utilities/typeFromAST';
import { valueFromAST } from '../utilities/valueFromAST';
import { Kind } from '../language/kinds';
import { print } from '../language/printer';
import {
  type GraphQLField,
  isInputType,
  isNonNullType,
} from '../type/definition';
import { type GraphQLDirective } from '../type/directives';
import { type ObjMap } from '../jsutils/ObjMap';
import { type GraphQLSchema } from '../type/schema';
import {
  type FieldNode,
  type DirectiveNode,
  type VariableDefinitionNode,
} from '../language/ast';

type CoercedVariableValues = {|
  errors: $ReadOnlyArray<GraphQLError> | void,
  coerced: { [variable: string]: mixed, ... } | void,
|};

/**
 * Prepares an object map of variableValues of the correct type based on the
 * provided variable definitions and arbitrary input. If the input cannot be
 * parsed to match the variable definitions, a GraphQLError will be thrown.
 *
 * Note: The returned value is a plain Object with a prototype, since it is
 * exposed to user code. Care should be taken to not pull values from the
 * Object prototype.
 */
export function getVariableValues(
  schema: GraphQLSchema,
  varDefNodes: $ReadOnlyArray<VariableDefinitionNode>,
  inputs: { +[variable: string]: mixed, ... },
): CoercedVariableValues {
  const errors = [];
  const coercedValues = {};
  for (let i = 0; i < varDefNodes.length; i++) {
    const varDefNode = varDefNodes[i];
    const varName = varDefNode.variable.name.value;
    const varType = typeFromAST(schema, varDefNode.type);
    if (!isInputType(varType)) {
      // Must use input types for variables. This should be caught during
      // validation, however is checked again here for safety.
      errors.push(
        new GraphQLError(
          `Variable "$${varName}" expected value of type ` +
            `"${print(
              varDefNode.type,
            )}" which cannot be used as an input type.`,
          varDefNode.type,
        ),
      );
    } else {
      const hasValue = hasOwnProperty(inputs, varName);
      const value = hasValue ? inputs[varName] : undefined;
      if (!hasValue && varDefNode.defaultValue) {
        // If no value was provided to a variable with a default value,
        // use the default value.
        coercedValues[varName] = valueFromAST(varDefNode.defaultValue, varType);
      } else if ((!hasValue || value === null) && isNonNullType(varType)) {
        // If no value or a nullish value was provided to a variable with a
        // non-null type (required), produce an error.
        errors.push(
          new GraphQLError(
            hasValue
              ? `Variable "$${varName}" of non-null type ` +
                `"${inspect(varType)}" must not be null.`
              : `Variable "$${varName}" of required type ` +
                `"${inspect(varType)}" was not provided.`,
            varDefNode,
          ),
        );
      } else if (hasValue) {
        if (value === null) {
          // If the explicit value `null` was provided, an entry in the coerced
          // values must exist as the value `null`.
          coercedValues[varName] = null;
        } else {
          // Otherwise, a non-null value was provided, coerce it to the expected
          // type or report an error if coercion fails.
          const coerced = coerceValue(value, varType, varDefNode);
          const coercionErrors = coerced.errors;
          if (coercionErrors) {
            for (const error of coercionErrors) {
              error.message =
                `Variable "$${varName}" got invalid value ${inspect(value)}; ` +
                error.message;
            }
            errors.push(...coercionErrors);
          } else {
            coercedValues[varName] = coerced.value;
          }
        }
      }
    }
  }
  return errors.length === 0
    ? { errors: undefined, coerced: coercedValues }
    : { errors, coerced: undefined };
}

/**
 * Prepares an object map of argument values given a list of argument
 * definitions and list of argument AST nodes.
 *
 * Note: The returned value is a plain Object with a prototype, since it is
 * exposed to user code. Care should be taken to not pull values from the
 * Object prototype.
 */
export function getArgumentValues(
  def: GraphQLField<*, *> | GraphQLDirective,
  node: FieldNode | DirectiveNode,
  variableValues?: ?ObjMap<mixed>,
): { [argument: string]: mixed, ... } {
  const coercedValues = {};
  const argDefs = def.args;
  const argNodes = node.arguments;
  if (!argDefs || !argNodes) {
    return coercedValues;
  }
  const argNodeMap = keyMap(argNodes, arg => arg.name.value);
  for (let i = 0; i < argDefs.length; i++) {
    const argDef = argDefs[i];
    const name = argDef.name;
    const argType = argDef.type;
    const argumentNode = argNodeMap[name];
    let hasValue;
    let isNull;
    if (argumentNode && argumentNode.value.kind === Kind.VARIABLE) {
      const variableName = argumentNode.value.name.value;
      hasValue =
        variableValues != null && hasOwnProperty(variableValues, variableName);
      isNull = variableValues != null && variableValues[variableName] === null;
    } else {
      hasValue = argumentNode != null;
      isNull = argumentNode != null && argumentNode.value.kind === Kind.NULL;
    }

    if (!hasValue && argDef.defaultValue !== undefined) {
      // If no argument was provided where the definition has a default value,
      // use the default value.
      coercedValues[name] = argDef.defaultValue;
    } else if ((!hasValue || isNull) && isNonNullType(argType)) {
      // If no argument or a null value was provided to an argument with a
      // non-null type (required), produce a field error.
      if (isNull) {
        throw new GraphQLError(
          `Argument "${name}" of non-null type "${inspect(argType)}" ` +
            'must not be null.',
          argumentNode.value,
        );
      } else if (argumentNode && argumentNode.value.kind === Kind.VARIABLE) {
        const variableName = argumentNode.value.name.value;
        throw new GraphQLError(
          `Argument "${name}" of required type "${inspect(argType)}" ` +
            `was provided the variable "$${variableName}" which was not provided a runtime value.`,
          argumentNode.value,
        );
      } else {
        throw new GraphQLError(
          `Argument "${name}" of required type "${inspect(argType)}" ` +
            'was not provided.',
          node,
        );
      }
    } else if (hasValue) {
      if (argumentNode.value.kind === Kind.NULL) {
        // If the explicit value `null` was provided, an entry in the coerced
        // values must exist as the value `null`.
        coercedValues[name] = null;
      } else if (argumentNode.value.kind === Kind.VARIABLE) {
        const variableName = argumentNode.value.name.value;
        invariant(variableValues, 'Must exist for hasValue to be true.');
        // Note: This does no further checking that this variable is correct.
        // This assumes that this query has been validated and the variable
        // usage here is of the correct type.
        coercedValues[name] = variableValues[variableName];
      } else {
        const valueNode = argumentNode.value;
        const coercedValue = valueFromAST(valueNode, argType, variableValues);
        if (coercedValue === undefined) {
          // Note: ValuesOfCorrectType validation should catch this before
          // execution. This is a runtime check to ensure execution does not
          // continue with an invalid argument value.
          throw new GraphQLError(
            `Argument "${name}" has invalid value ${print(valueNode)}.`,
            argumentNode.value,
          );
        }
        coercedValues[name] = coercedValue;
      }
    }
  }
  return coercedValues;
}

/**
 * Prepares an object map of argument values given a directive definition
 * and a AST node which may contain directives. Optionally also accepts a map
 * of variable values.
 *
 * If the directive does not exist on the node, returns undefined.
 *
 * Note: The returned value is a plain Object with a prototype, since it is
 * exposed to user code. Care should be taken to not pull values from the
 * Object prototype.
 */
export function getDirectiveValues(
  directiveDef: GraphQLDirective,
  node: { +directives?: $ReadOnlyArray<DirectiveNode>, ... },
  variableValues?: ?ObjMap<mixed>,
): void | { [argument: string]: mixed, ... } {
  const directiveNode =
    node.directives &&
    find(
      node.directives,
      directive => directive.name.value === directiveDef.name,
    );

  if (directiveNode) {
    return getArgumentValues(directiveDef, directiveNode, variableValues);
  }
}

function hasOwnProperty(obj: mixed, prop: string): boolean {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

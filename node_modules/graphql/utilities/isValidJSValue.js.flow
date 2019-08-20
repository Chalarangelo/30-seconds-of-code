// @flow strict

/* istanbul ignore file */
import { coerceValue } from './coerceValue';
import { type GraphQLInputType } from '../type/definition';

/**
 * Deprecated. Use coerceValue() directly for richer information.
 *
 * This function will be removed in v15
 */
export function isValidJSValue(
  value: mixed,
  type: GraphQLInputType,
): Array<string> {
  const errors = coerceValue(value, type).errors;
  return errors ? errors.map(error => error.message) : [];
}

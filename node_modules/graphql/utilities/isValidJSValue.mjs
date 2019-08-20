/* istanbul ignore file */
import { coerceValue } from './coerceValue';

/**
 * Deprecated. Use coerceValue() directly for richer information.
 *
 * This function will be removed in v15
 */
export function isValidJSValue(value, type) {
  var errors = coerceValue(value, type).errors;
  return errors ? errors.map(function (error) {
    return error.message;
  }) : [];
}

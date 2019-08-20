/**
 * Returns true if a value is null, undefined, or NaN.
 */
export default function isNullish(value) {
  return value === null || value === undefined || value !== value;
}

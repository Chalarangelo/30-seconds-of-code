// @flow strict

export default function invariant(condition: mixed, message: string) {
  const booleanCondition = Boolean(condition);
  /* istanbul ignore else */
  if (!booleanCondition) {
    throw new Error(message);
  }
}

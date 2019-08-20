export default function invariant(condition, message) {
  var booleanCondition = Boolean(condition);
  /* istanbul ignore else */

  if (!booleanCondition) {
    throw new Error(message);
  }
}

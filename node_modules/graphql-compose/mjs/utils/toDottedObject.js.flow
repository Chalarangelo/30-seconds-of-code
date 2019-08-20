/* @flow strict */

/**
 * Convert object to dotted-key/value pair
 * { a: { b: { c: 1 }}} ->  { 'a.b.c': 1 }
 * Usage:
 *   var dotObject(obj)
 *   or
 *   var target = {}; dotObject(obj, target)
 *
 * @param {Object} obj source object
 * @param {Object} target target object
 * @param {Array} path path array (internal)
 */
function toDottedObject(
  obj: Object,
  target?: Object = {},
  path?: string[] = []
): { [dottedPath: string]: mixed } {
  /* eslint-disable */
  Object.keys(obj).forEach((key) => {
    if (Object(obj[key]) === obj[key]) {
      return toDottedObject(obj[key], target, path.concat(key));
    } else {
      target[path.concat(key).join('.')] = obj[key];
    }
  });
  return target;
  /* eslint-enable */
}

export default toDottedObject;

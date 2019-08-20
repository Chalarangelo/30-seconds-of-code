// @flow strict

/**
 * A replacement for instanceof which includes an error warning when multi-realm
 * constructors are detected.
 */
declare function instanceOf(
  value: mixed,
  constructor: mixed,
): boolean %checks(value instanceof constructor);

// See: https://expressjs.com/en/advanced/best-practice-performance.html#set-node_env-to-production
// See: https://webpack.js.org/guides/production/
export default process.env.NODE_ENV === 'production'
  ? // eslint-disable-next-line no-shadow
    function instanceOf(value: mixed, constructor: mixed) {
      return value instanceof constructor;
    }
  : // eslint-disable-next-line no-shadow
    function instanceOf(value: any, constructor: any) {
      if (value instanceof constructor) {
        return true;
      }
      if (value) {
        const valueClass = value.constructor;
        const className = constructor.name;
        if (className && valueClass && valueClass.name === className) {
          throw new Error(
            `Cannot use ${className} "${value}" from another module or realm.

Ensure that there is only one instance of "graphql" in the node_modules
directory. If different versions of "graphql" are the dependencies of other
relied on modules, use "resolutions" to ensure only one version is installed.

https://yarnpkg.com/en/docs/selective-version-resolutions

Duplicate "graphql" modules cannot be used at the same time since different
versions may have different capabilities and behavior. The data from one
version used in the function from another could produce confusing and
spurious results.`,
          );
        }
      }
      return false;
    };

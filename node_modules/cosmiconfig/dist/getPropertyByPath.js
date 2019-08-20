//      
'use strict';

// Resolves property names or property paths defined with period-delimited
// strings or arrays of strings. Property names that are found on the source
// object are used directly (even if they include a period).
// Nested property names that include periods, within a path, are only
// understood in array paths.
function getPropertyByPath(source        , path                        )      {
  if (typeof path === 'string' && source.hasOwnProperty(path)) {
    return source[path];
  }

  const parsedPath = typeof path === 'string' ? path.split('.') : path;
  return parsedPath.reduce((previous, key) => {
    if (previous === undefined) {
      return previous;
    }
    return previous[key];
  }, source);
}

module.exports = getPropertyByPath;

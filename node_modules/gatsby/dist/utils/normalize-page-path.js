"use strict";

// This is a duplicate of the runtime util
// file cache-dir/normalize-page-path.js
module.exports = path => {
  if (path === undefined) {
    return path;
  }

  if (path === `/`) {
    return `/`;
  }

  if (path.charAt(path.length - 1) === `/`) {
    return path.slice(0, -1);
  }

  return path;
};
//# sourceMappingURL=normalize-page-path.js.map
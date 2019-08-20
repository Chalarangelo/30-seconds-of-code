"use strict";

const _ = require(`lodash`);

module.exports = str => {
  const exploded = str.split(`/`);
  const regex = new RegExp(exploded.slice(1, -1).join(`/`) // Double escaping is needed to get past the GraphQL parser,
  // but single escaping is needed for the RegExp constructor,
  // i.e. `"\\\\w+"` for `/\w+/`.
  .replace(/\\\\/, `\\`), _.last(exploded));
  return regex;
};
//# sourceMappingURL=prepare-regex.js.map
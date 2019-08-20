"use strict";

const path = require(`path`);

exports.chunkNamer = chunk => {
  if (chunk.name) return chunk.name;
  let n = [];
  chunk.forEachModule(m => {
    n.push(path.relative(m.context, m.userRequest));
  });
  return n.join(`_`);
};
//# sourceMappingURL=webpack-helpers.js.map
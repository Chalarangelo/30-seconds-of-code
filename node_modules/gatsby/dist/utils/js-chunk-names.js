"use strict";

const {
  kebabCase
} = require(`lodash`);

const path = require(`path`);

const {
  store
} = require(`../redux`);

const generateComponentChunkName = componentPath => {
  const program = store.getState().program;
  let directory = `/`;

  if (program && program.directory) {
    directory = program.directory;
  }

  const name = path.relative(directory, componentPath);
  return `component---${kebabCase(name)}`;
};

exports.generateComponentChunkName = generateComponentChunkName;
//# sourceMappingURL=js-chunk-names.js.map
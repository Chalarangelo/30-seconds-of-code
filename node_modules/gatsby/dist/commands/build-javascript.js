"use strict";

const webpack = require(`webpack`);

const webpackConfig = require(`../utils/webpack.config`);

module.exports = async program => {
  const {
    directory
  } = program;
  const compilerConfig = await webpackConfig(program, directory, `build-javascript`);
  return new Promise((resolve, reject) => {
    webpack(compilerConfig).run((err, stats) => {
      if (err) {
        reject(err);
        return;
      }

      if (stats.hasErrors()) {
        reject(stats.compilation.errors);
        return;
      }

      resolve(stats);
    });
  });
};
//# sourceMappingURL=build-javascript.js.map
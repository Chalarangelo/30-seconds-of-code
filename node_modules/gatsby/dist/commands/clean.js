"use strict";

const fs = require(`fs-extra`);

const path = require(`path`);

module.exports = async function clean(args) {
  const {
    directory,
    report
  } = args;
  const directories = [`.cache`, `public`];
  report.info(`Deleting ${directories.join(`, `)}`);
  await Promise.all(directories.map(dir => fs.remove(path.join(directory, dir))));
  report.info(`Successfully deleted directories`);
};
//# sourceMappingURL=clean.js.map
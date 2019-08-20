"use strict";

const fs = require(`fs-extra`);

const path = require(`path`);

const Promise = require(`bluebird`);

const getFilePath = ({
  publicDir
}, pagePath) => {
  const fixedPagePath = pagePath === `/` ? `index` : pagePath;
  return path.join(publicDir, `page-data`, fixedPagePath, `page-data.json`);
};

const updateJsonFileField = async (filename, fieldname, value) => {
  const object = JSON.parse((await fs.readFile(filename, `utf-8`)));
  object[fieldname] = value;
  await fs.outputFile(filename, JSON.stringify(object), `utf-8`);
};

const updateCompilationHashes = ({
  publicDir
}, pagePaths, webpackCompilationHash) => Promise.map(pagePaths, pagePath => updateJsonFileField(getFilePath({
  publicDir
}, pagePath), `webpackCompilationHash`, webpackCompilationHash));

module.exports = {
  getFilePath,
  updateCompilationHashes
};
//# sourceMappingURL=page-data.js.map
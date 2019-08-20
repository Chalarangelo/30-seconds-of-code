"use strict";

exports.__esModule = true;
exports.renderHTML = renderHTML;

const fs = require(`fs-extra`);

const path = require(`path`);

const Promise = require(`bluebird`); // copied from https://github.com/markdalgleish/static-site-generator-webpack-plugin/blob/master/index.js#L161


const generatePathToOutput = outputPath => {
  let outputFileName = outputPath.replace(/^(\/|\\)/, ``); // Remove leading slashes for webpack-dev-server

  if (!/\.(html?)$/i.test(outputFileName)) {
    outputFileName = path.join(outputFileName, `index.html`);
  }

  return path.join(process.cwd(), `public`, outputFileName);
};

function renderHTML({
  htmlComponentRendererPath,
  paths,
  envVars
}) {
  // This is being executed in child process, so we need to set some vars
  // for modules that aren't bundled by webpack.
  envVars.forEach(([key, value]) => process.env[key] = value);
  return Promise.map(paths, path => new Promise((resolve, reject) => {
    const htmlComponentRenderer = require(htmlComponentRendererPath);

    try {
      htmlComponentRenderer.default(path, (throwAway, htmlString) => {
        resolve(fs.outputFile(generatePathToOutput(path), htmlString));
      });
    } catch (e) {
      // add some context to error so we can display more helpful message
      e.context = {
        path
      };
      reject(e);
    }
  }));
}
//# sourceMappingURL=render-html.js.map
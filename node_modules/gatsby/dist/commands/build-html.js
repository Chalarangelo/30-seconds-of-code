"use strict";

const Promise = require(`bluebird`);

const webpack = require(`webpack`);

const fs = require(`fs-extra`);

const convertHrtime = require(`convert-hrtime`);

const {
  chunk
} = require(`lodash`);

const webpackConfig = require(`../utils/webpack.config`);

const reporter = require(`gatsby-cli/lib/reporter`);

const {
  createErrorFromString
} = require(`gatsby-cli/lib/reporter/errors`);

const telemetry = require(`gatsby-telemetry`);

const handleWebpackError = require(`../utils/webpack-error-parser`);

const runWebpack = compilerConfig => new Promise((resolve, reject) => {
  webpack(compilerConfig).run((err, stats) => {
    if (err) {
      reject(err);
    } else {
      resolve(stats);
    }
  });
});

const doBuildRenderer = async (program, webpackConfig) => {
  const {
    directory
  } = program;
  const stats = await runWebpack(webpackConfig); // render-page.js is hard coded in webpack.config

  const outputFile = `${directory}/public/render-page.js`;

  if (stats.hasErrors()) {
    reporter.panic(handleWebpackError(`build-html`, stats.compilation.errors));
  }

  return outputFile;
};

const buildRenderer = async (program, stage) => {
  const {
    directory
  } = program;
  const config = await webpackConfig(program, directory, stage, null);
  return await doBuildRenderer(program, config);
};

const deleteRenderer = async rendererPath => {
  try {
    await fs.remove(rendererPath);
    await fs.remove(`${rendererPath}.map`);
  } catch (e) {// This function will fail on Windows with no further consequences.
  }
};

const renderHTMLQueue = ({
  workerPool,
  activity
}, htmlComponentRendererPath, pages) => new Promise((resolve, reject) => {
  // We need to only pass env vars that are set programmatically in gatsby-cli
  // to child process. Other vars will be picked up from environment.
  const envVars = Object.entries({
    NODE_ENV: process.env.NODE_ENV,
    gatsby_executing_command: process.env.gatsby_executing_command,
    gatsby_log_level: process.env.gatsby_log_level
  });
  const start = process.hrtime();
  const segments = chunk(pages, 50);
  let finished = 0;
  Promise.map(segments, pageSegment => new Promise((resolve, reject) => {
    workerPool.renderHTML({
      htmlComponentRendererPath,
      paths: pageSegment,
      envVars
    }).then(() => {
      finished += pageSegment.length;

      if (activity) {
        activity.setStatus(`${finished}/${pages.length} ${(finished / convertHrtime(process.hrtime(start)).seconds).toFixed(2)} pages/second`);
      }

      resolve();
    }).catch(reject);
  })).then(resolve).catch(reject);
});

const doBuildPages = async ({
  rendererPath,
  pagePaths,
  activity,
  workerPool
}) => {
  telemetry.decorateEvent(`BUILD_END`, {
    siteMeasurements: {
      pagesCount: pagePaths.length
    }
  });

  try {
    await renderHTMLQueue({
      workerPool,
      activity
    }, rendererPath, pagePaths);
  } catch (e) {
    const prettyError = createErrorFromString(e.stack, `${rendererPath}.map`);
    prettyError.context = e.context;
    throw prettyError;
  }
};

const buildPages = async ({
  program,
  stage,
  pagePaths,
  activity,
  workerPool
}) => {
  const rendererPath = await buildRenderer(program, stage);
  await doBuildPages({
    rendererPath,
    pagePaths,
    activity,
    workerPool
  });
  await deleteRenderer(rendererPath);
};

module.exports = {
  buildPages
};
//# sourceMappingURL=build-html.js.map
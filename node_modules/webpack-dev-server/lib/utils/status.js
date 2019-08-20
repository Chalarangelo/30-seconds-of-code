'use strict';

const colors = require('./colors');
const runOpen = require('./runOpen');

// TODO: don't emit logs when webpack-dev-server is used via Node.js API
function status(uri, options, log, useColor) {
  const contentBase = Array.isArray(options.contentBase)
    ? options.contentBase.join(', ')
    : options.contentBase;

  if (options.socket) {
    log.info(`Listening to socket at ${colors.info(useColor, options.socket)}`);
  } else {
    log.info(`Project is running at ${colors.info(useColor, uri)}`);
  }

  log.info(
    `webpack output is served from ${colors.info(useColor, options.publicPath)}`
  );

  if (contentBase) {
    log.info(
      `Content not from webpack is served from ${colors.info(
        useColor,
        contentBase
      )}`
    );
  }

  if (options.historyApiFallback) {
    log.info(
      `404s will fallback to ${colors.info(
        useColor,
        options.historyApiFallback.index || '/index.html'
      )}`
    );
  }

  if (options.bonjour) {
    log.info(
      'Broadcasting "http" with subtype of "webpack" via ZeroConf DNS (Bonjour)'
    );
  }

  if (options.open) {
    runOpen(uri, options, log);
  }
}

module.exports = status;

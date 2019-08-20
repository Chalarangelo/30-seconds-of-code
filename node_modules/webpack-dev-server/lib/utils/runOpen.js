'use strict';

const open = require('opn');
const isAbsoluteUrl = require('is-absolute-url');

function runOpen(uri, options, log) {
  // https://github.com/webpack/webpack-dev-server/issues/1990
  let openOptions = { wait: false };
  let openMessage = 'Unable to open browser';

  if (typeof options.open === 'string') {
    openOptions = Object.assign({}, openOptions, { app: options.open });
    openMessage += `: ${options.open}`;
  }

  const pageUrl =
    options.openPage && isAbsoluteUrl(options.openPage)
      ? options.openPage
      : `${uri}${options.openPage || ''}`;

  return open(pageUrl, openOptions).catch(() => {
    log.warn(
      `${openMessage}. If you are running in a headless environment, please do not use the --open flag`
    );
  });
}

module.exports = runOpen;

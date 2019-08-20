'use strict';

const path = require('path');
const isAbsoluteUrl = require('is-absolute-url');
const defaultTo = require('./defaultTo');

function createConfig(config, argv, { port }) {
  const firstWpOpt = Array.isArray(config) ? config[0] : config;
  const options = firstWpOpt.devServer || {};

  // This updates both config and firstWpOpt
  firstWpOpt.mode = defaultTo(firstWpOpt.mode, 'development');

  if (argv.bonjour) {
    options.bonjour = true;
  }

  if (argv.host && (argv.host !== 'localhost' || !options.host)) {
    options.host = argv.host;
  }

  if (argv.allowedHosts) {
    options.allowedHosts = argv.allowedHosts.split(',');
  }

  if (argv.public) {
    options.public = argv.public;
  }

  if (argv.socket) {
    options.socket = argv.socket;
  }

  if (argv.sockHost) {
    options.sockHost = argv.sockHost;
  }

  if (argv.sockPath) {
    options.sockPath = argv.sockPath;
  }

  if (argv.sockPort) {
    options.sockPort = argv.sockPort;
  }

  if (argv.liveReload === false) {
    options.liveReload = false;
  }

  if (argv.profile) {
    options.profile = argv.profile;
  }

  if (argv.progress) {
    options.progress = argv.progress;
  }

  if (argv.overlay) {
    options.overlay = argv.overlay;
  }

  if (!options.publicPath) {
    // eslint-disable-next-line
    options.publicPath =
      (firstWpOpt.output && firstWpOpt.output.publicPath) || '';

    if (
      !isAbsoluteUrl(String(options.publicPath)) &&
      options.publicPath[0] !== '/'
    ) {
      options.publicPath = `/${options.publicPath}`;
    }
  }

  if (!options.filename && firstWpOpt.output && firstWpOpt.output.filename) {
    options.filename = firstWpOpt.output && firstWpOpt.output.filename;
  }

  if (!options.watchOptions && firstWpOpt.watchOptions) {
    options.watchOptions = firstWpOpt.watchOptions;
  }

  if (argv.stdin) {
    process.stdin.on('end', () => {
      // eslint-disable-next-line no-process-exit
      process.exit(0);
    });

    process.stdin.resume();
  }

  // TODO https://github.com/webpack/webpack-dev-server/issues/616 (v4)
  // We should prefer CLI arg under config, now we always prefer `hot` from `devServer`
  if (!options.hot) {
    options.hot = argv.hot;
  }

  // TODO https://github.com/webpack/webpack-dev-server/issues/616 (v4)
  // We should prefer CLI arg under config, now we always prefer `hotOnly` from `devServer`
  if (!options.hotOnly) {
    options.hotOnly = argv.hotOnly;
  }

  // TODO https://github.com/webpack/webpack-dev-server/issues/616 (v4)
  // We should prefer CLI arg under config, now we always prefer `clientLogLevel` from `devServer`
  if (!options.clientLogLevel && argv.clientLogLevel) {
    options.clientLogLevel = argv.clientLogLevel;
  }

  if (argv.contentBase) {
    options.contentBase = argv.contentBase;

    if (Array.isArray(options.contentBase)) {
      options.contentBase = options.contentBase.map((p) => path.resolve(p));
    } else if (/^[0-9]$/.test(options.contentBase)) {
      options.contentBase = +options.contentBase;
    } else if (!isAbsoluteUrl(String(options.contentBase))) {
      options.contentBase = path.resolve(options.contentBase);
    }
  }
  // It is possible to disable the contentBase by using
  // `--no-content-base`, which results in arg["content-base"] = false
  else if (argv.contentBase === false) {
    options.contentBase = false;
  }

  if (argv.watchContentBase) {
    options.watchContentBase = true;
  }

  if (!options.stats) {
    options.stats = defaultTo(firstWpOpt.stats, {
      cached: false,
      cachedAssets: false,
    });
  }

  if (
    typeof options.stats === 'object' &&
    typeof options.stats.colors === 'undefined' &&
    argv.color
  ) {
    options.stats = Object.assign({}, options.stats, { colors: argv.color });
  }

  if (argv.lazy) {
    options.lazy = true;
  }

  // TODO remove in `v4`
  if (!argv.info) {
    options.noInfo = true;
  }

  // TODO remove in `v4`
  if (argv.quiet) {
    options.quiet = true;
  }

  if (argv.https) {
    options.https = true;
  }

  if (argv.http2) {
    options.http2 = true;
  }

  if (argv.key) {
    options.key = argv.key;
  }

  if (argv.cert) {
    options.cert = argv.cert;
  }

  if (argv.cacert) {
    options.ca = argv.cacert;
  }

  if (argv.pfx) {
    options.pfx = argv.pfx;
  }

  if (argv.pfxPassphrase) {
    options.pfxPassphrase = argv.pfxPassphrase;
  }

  if (argv.inline === false) {
    options.inline = false;
  }

  if (argv.historyApiFallback) {
    options.historyApiFallback = true;
  }

  if (argv.compress) {
    options.compress = true;
  }

  if (argv.disableHostCheck) {
    options.disableHostCheck = true;
  }

  if (argv.openPage) {
    options.open = true;
    options.openPage = argv.openPage;
  }

  if (typeof argv.open !== 'undefined') {
    options.open = argv.open !== '' ? argv.open : true;
  }

  if (options.open && !options.openPage) {
    options.openPage = '';
  }

  if (argv.useLocalIp) {
    options.useLocalIp = true;
  }

  // Kind of weird, but ensures prior behavior isn't broken in cases
  // that wouldn't throw errors. E.g. both argv.port and options.port
  // were specified, but since argv.port is 8080, options.port will be
  // tried first instead.
  options.port =
    argv.port === port
      ? defaultTo(options.port, argv.port)
      : defaultTo(argv.port, options.port);

  return options;
}

module.exports = createConfig;

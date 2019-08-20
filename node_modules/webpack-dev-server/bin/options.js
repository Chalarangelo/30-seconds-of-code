'use strict';

/* eslint-disable
  multiline-ternary,
  space-before-function-paren
*/
const ADVANCED_GROUP = 'Advanced options:';
const DISPLAY_GROUP = 'Stats options:';
const SSL_GROUP = 'SSL options:';
const CONNECTION_GROUP = 'Connection options:';
const RESPONSE_GROUP = 'Response options:';
const BASIC_GROUP = 'Basic options:';

const options = {
  bonjour: {
    type: 'boolean',
    describe: 'Broadcasts the server via ZeroConf networking on start',
  },
  lazy: {
    type: 'boolean',
    describe: 'Lazy',
  },
  liveReload: {
    type: 'boolean',
    describe: 'Enables/Disables live reloading on changing files',
    default: true,
  },
  serveIndex: {
    type: 'boolean',
    describe: 'Enables/Disables serveIndex middleware',
    default: true,
  },
  inline: {
    type: 'boolean',
    default: true,
    describe:
      'Inline mode (set to false to disable including client scripts like livereload)',
  },
  profile: {
    type: 'boolean',
    describe: 'Print compilation profile data for progress steps',
  },
  progress: {
    type: 'boolean',
    describe: 'Print compilation progress in percentage',
    group: BASIC_GROUP,
  },
  'hot-only': {
    type: 'boolean',
    describe: 'Do not refresh page if HMR fails',
    group: ADVANCED_GROUP,
  },
  stdin: {
    type: 'boolean',
    describe: 'close when stdin ends',
  },
  open: {
    type: 'string',
    describe: 'Open the default browser, or optionally specify a browser name',
  },
  useLocalIp: {
    type: 'boolean',
    describe: 'Open default browser with local IP',
  },
  'open-page': {
    type: 'string',
    describe: 'Open default browser with the specified page',
    requiresArg: true,
  },
  color: {
    type: 'boolean',
    alias: 'colors',
    default: function supportsColor() {
      // Use `require('supports-color').stdout` for supports-color >= 5.0.0.
      // See https://github.com/webpack/webpack-dev-server/pull/1555.
      return require('supports-color').stdout;
    },
    group: DISPLAY_GROUP,
    describe: 'Enables/Disables colors on the console',
  },
  info: {
    type: 'boolean',
    group: DISPLAY_GROUP,
    default: true,
    describe: 'Info',
  },
  quiet: {
    type: 'boolean',
    group: DISPLAY_GROUP,
    describe: 'Quiet',
  },
  'client-log-level': {
    type: 'string',
    group: DISPLAY_GROUP,
    default: 'info',
    describe:
      'Log level in the browser (trace, debug, info, warn, error or silent)',
  },
  https: {
    type: 'boolean',
    group: SSL_GROUP,
    describe: 'HTTPS',
  },
  http2: {
    type: 'boolean',
    group: SSL_GROUP,
    describe: 'HTTP/2, must be used with HTTPS',
  },
  key: {
    type: 'string',
    describe: 'Path to a SSL key.',
    group: SSL_GROUP,
  },
  cert: {
    type: 'string',
    describe: 'Path to a SSL certificate.',
    group: SSL_GROUP,
  },
  cacert: {
    type: 'string',
    describe: 'Path to a SSL CA certificate.',
    group: SSL_GROUP,
  },
  pfx: {
    type: 'string',
    describe: 'Path to a SSL pfx file.',
    group: SSL_GROUP,
  },
  'pfx-passphrase': {
    type: 'string',
    describe: 'Passphrase for pfx file.',
    group: SSL_GROUP,
  },
  'content-base': {
    type: 'string',
    describe: 'A directory or URL to serve HTML content from.',
    group: RESPONSE_GROUP,
  },
  'watch-content-base': {
    type: 'boolean',
    describe: 'Enable live-reloading of the content-base.',
    group: RESPONSE_GROUP,
  },
  'history-api-fallback': {
    type: 'boolean',
    describe: 'Fallback to /index.html for Single Page Applications.',
    group: RESPONSE_GROUP,
  },
  compress: {
    type: 'boolean',
    describe: 'Enable gzip compression',
    group: RESPONSE_GROUP,
  },
  port: {
    describe: 'The port',
    group: CONNECTION_GROUP,
  },
  'disable-host-check': {
    type: 'boolean',
    describe: 'Will not check the host',
    group: CONNECTION_GROUP,
  },
  socket: {
    type: 'String',
    describe: 'Socket to listen',
    group: CONNECTION_GROUP,
  },
  public: {
    type: 'string',
    describe: 'The public hostname/ip address of the server',
    group: CONNECTION_GROUP,
  },
  host: {
    type: 'string',
    default: 'localhost',
    describe: 'The hostname/ip address the server will bind to',
    group: CONNECTION_GROUP,
  },
  'allowed-hosts': {
    type: 'string',
    describe:
      'A comma-delimited string of hosts that are allowed to access the dev server',
    group: CONNECTION_GROUP,
  },
};

module.exports = options;

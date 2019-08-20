'use strict';

/* eslint-disable
  class-methods-use-this,
  func-names
*/
const sockjs = require('sockjs');
const BaseServer = require('./BaseServer');

// Workaround for sockjs@~0.3.19
// sockjs will remove Origin header, however Origin header is required for checking host.
// See https://github.com/webpack/webpack-dev-server/issues/1604 for more information
{
  const SockjsSession = require('sockjs/lib/transport').Session;
  const decorateConnection = SockjsSession.prototype.decorateConnection;
  SockjsSession.prototype.decorateConnection = function(req) {
    decorateConnection.call(this, req);
    const connection = this.connection;
    if (
      connection.headers &&
      !('origin' in connection.headers) &&
      'origin' in req.headers
    ) {
      connection.headers.origin = req.headers.origin;
    }
  };
}

module.exports = class SockJSServer extends BaseServer {
  // options has: error (function), debug (function), server (http/s server), path (string)
  constructor(server) {
    super(server);
    this.socket = sockjs.createServer({
      // Use provided up-to-date sockjs-client
      sockjs_url: '/__webpack_dev_server__/sockjs.bundle.js',
      // Limit useless logs
      log: (severity, line) => {
        if (severity === 'error') {
          this.server.log.error(line);
        } else {
          this.server.log.debug(line);
        }
      },
    });

    this.socket.installHandlers(this.server.listeningApp, {
      prefix: this.server.sockPath,
    });
  }

  send(connection, message) {
    // prevent cases where the server is trying to send data while connection is closing
    if (connection.readyState !== 1) {
      return;
    }

    connection.write(message);
  }

  close(connection) {
    connection.close();
  }

  // f should be passed the resulting connection and the connection headers
  onConnection(f) {
    this.socket.on('connection', (connection) => {
      f(connection, connection.headers);
    });
  }

  onConnectionClose(connection, f) {
    connection.on('close', f);
  }
};

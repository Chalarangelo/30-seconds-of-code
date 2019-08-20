'use strict';

/* eslint-disable
  class-methods-use-this
*/
const ws = require('ws');
const BaseServer = require('./BaseServer');

module.exports = class WebsocketServer extends BaseServer {
  constructor(server) {
    super(server);
    this.wsServer = new ws.Server({
      server: this.server.listeningApp,
      path: this.server.sockPath,
    });

    this.wsServer.on('error', (err) => {
      this.server.log.error(err.message);
    });
  }

  send(connection, message) {
    // prevent cases where the server is trying to send data while connection is closing
    if (connection.readyState !== 1) {
      return;
    }

    connection.send(message);
  }

  close(connection) {
    connection.close();
  }

  // f should be passed the resulting connection and the connection headers
  onConnection(f) {
    this.wsServer.on('connection', (connection, req) => {
      f(connection, req.headers);
    });
  }

  onConnectionClose(connection, f) {
    connection.on('close', f);
  }
};

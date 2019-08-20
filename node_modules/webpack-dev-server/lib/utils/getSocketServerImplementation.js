'use strict';

function getSocketServerImplementation(options) {
  let ServerImplementation;
  let serverImplFound = true;
  switch (typeof options.transportMode.server) {
    case 'string':
      // could be 'sockjs', in the future 'ws', or a path that should be required
      if (options.transportMode.server === 'sockjs') {
        ServerImplementation = require('../servers/SockJSServer');
      } else if (options.transportMode.server === 'ws') {
        ServerImplementation = require('../servers/WebsocketServer');
      } else {
        try {
          // eslint-disable-next-line import/no-dynamic-require
          ServerImplementation = require(options.transportMode.server);
        } catch (e) {
          serverImplFound = false;
        }
      }
      break;
    case 'function':
      // potentially do more checks here to confirm that the user implemented this properlly
      // since errors could be difficult to understand
      ServerImplementation = options.transportMode.server;
      break;
    default:
      serverImplFound = false;
  }

  if (!serverImplFound) {
    throw new Error(
      "transportMode.server must be a string denoting a default implementation (e.g. 'sockjs', 'ws'), a full path to " +
        'a JS file which exports a class extending BaseServer (webpack-dev-server/lib/servers/BaseServer) ' +
        'via require.resolve(...), or the class itself which extends BaseServer'
    );
  }

  return ServerImplementation;
}

module.exports = getSocketServerImplementation;

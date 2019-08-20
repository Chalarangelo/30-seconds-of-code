module.exports = function makeKillable(server) {
  var sockets = [];

  server.on('connection', function (socket) {
    //add socket to list
    sockets.push(socket);

    socket.once('close', function () {
      //remove socket from list
      sockets.splice(sockets.indexOf(socket), 1);
    });
  });

  server.kill = function (cb) {
    server.close(cb);
    sockets.forEach(function (socket) {
      socket.destroy();
    });
    // reset so the server can be restarted
    sockets = [];
  };

  return server;
};

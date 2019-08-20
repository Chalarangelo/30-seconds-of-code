'use strict'

function attachPush (req) {
  var handle = req.socket._handle

  handle.getStream(function (stream) {
    stream.on('pushPromise', function (push) {
      req.emit('push', push)
    })
  })
}

exports.onNewListener = function onNewListener (type) {
  var req = this

  if (type !== 'push') {
    return
  }

  // Not first listener
  if (req.listeners('push').length !== 0) {
    return
  }

  if (!req.socket) {
    req.on('socket', function () {
      attachPush(req)
    })
    return
  }

  attachPush(req)
}

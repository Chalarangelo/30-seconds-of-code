var WebSocket = require('..').Client,
    deflate   = require('permessage-deflate'),
    fs        = require('fs');

var url   = process.argv[2],
    proxy = process.argv[3],
    ca    = fs.readFileSync(__dirname + '/../spec/server.crt'),
    tls   = {ca: ca};

var ws = new WebSocket(url, [], {
  proxy:      {origin: proxy, headers: {'User-Agent': 'Echo'}, tls: tls},
  tls:        tls,
  headers:    {Origin: 'http://faye.jcoglan.com'},
  extensions: [deflate]
});

ws.onopen = function() {
  console.log('[open]', ws.headers);
  ws.send('mic check');
};

ws.onclose = function(close) {
  console.log('[close]', close.code, close.reason);
};

ws.onerror = function(error) {
  console.log('[error]', error.message);
};

ws.onmessage = function(message) {
  console.log('[message]', message.data);
};

var WebSocket = require('..'),
    deflate   = require('permessage-deflate'),
    fs        = require('fs'),
    http      = require('http'),
    https     = require('https');

var port    = process.argv[2] || 7000,
    secure  = process.argv[3] === 'tls',
    options = {extensions: [deflate], ping: 5};

var upgradeHandler = function(request, socket, head) {
  var ws = new WebSocket(request, socket, head, ['irc', 'xmpp'], options);
  console.log('[open]', ws.url, ws.version, ws.protocol, request.headers);

  ws.pipe(ws);

  ws.onclose = function(event) {
    console.log('[close]', event.code, event.reason);
    ws = null;
  };
};

var requestHandler = function(request, response) {
  if (!WebSocket.EventSource.isEventSource(request))
    return staticHandler(request, response);

  var es   = new WebSocket.EventSource(request, response),
      time = parseInt(es.lastEventId, 10) || 0;

  console.log('[open]', es.url, es.lastEventId);

  var loop = setInterval(function() {
    time += 1;
    es.send('Time: ' + time);
    setTimeout(function() {
      if (es) es.send('Update!!', {event: 'update', id: time});
    }, 1000);
  }, 2000);

  fs.createReadStream(__dirname + '/haproxy.conf').pipe(es, {end: false});

  es.onclose = function() {
    clearInterval(loop);
    console.log('[close]', es.url);
    es = null;
  };
};

var staticHandler = function(request, response) {
  var path = request.url;

  fs.readFile(__dirname + path, function(err, content) {
    var status = err ? 404 : 200;
    response.writeHead(status, {'Content-Type': 'text/html'});
    response.write(content || 'Not found');
    response.end();
  });
};

var server = secure
           ? https.createServer({
               key:  fs.readFileSync(__dirname + '/../spec/server.key'),
               cert: fs.readFileSync(__dirname + '/../spec/server.crt')
             })
           : http.createServer();

server.on('request', requestHandler);
server.on('upgrade', upgradeHandler);
server.listen(port);

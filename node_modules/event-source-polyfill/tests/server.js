var PORT1 = 8004;
var PORT2 = 8003;

var http = require("http");
var fs = require("fs");
var url = require("url");
var EventEmitter = require("events").EventEmitter;

console.log("Version: " + process.version);
console.log("Starting server at http://localhost:" + PORT1);

process.on("uncaughtException", function (e) {
  try {
    console.log("Caught exception: " + e + " " + (typeof e === "object" ? e.stack : ""));
  } catch (ignore) {
  }
});

var emitter = new EventEmitter();
var history = [];
var heartbeatTimeout = 9000;
var firstId = Number(new Date());
var idCounter = 0;

setInterval(function () {
  emitter.emit("message");
}, heartbeatTimeout / 2);

function eventStream(request, response) {
  var parsedURL = url.parse(request.url, true);
  var lastEventId = Number(request.headers["last-event-id"]) || Number(parsedURL.query.lastEventId) || 0;
  var authorization = request.headers["authorization"];

  if (parsedURL.query.authorization !== undefined && !authorization) {
    response.writeHead(401, {
      "WWW-Authenticate": "Basic realm=\"EventSource" + (1 + Math.random()).toString().slice(2) + "\"",
      "Access-Control-Allow-Origin": "*"
    });
    response.end("");
    return;
  }

  function sendMessages() {
    lastEventId = Math.max(lastEventId, firstId);
    while (lastEventId - firstId < history.length) {
      response.write("id: " + (lastEventId + 1) + "\n" + "data: " + (history[lastEventId - firstId]).replace(/[\r\n\x00]/g, "\ndata: ") + "\n\n");
      lastEventId += 1;
    }
    response.write(":\n");
  }

  var id = ++idCounter;
  console.log('connected ' + id);
  response.on("close", function () {
    console.log('disconnected ' + id);
    emitter.removeListener("message", sendMessages);
    response.end();
  });

  response.socket.setTimeout(0); // see http://contourline.wordpress.com/2011/03/30/preventing-server-timeout-in-node-js/

  var estest = parsedURL.query.estest;
  if (estest !== undefined) {
    var i = estest.indexOf("\n\n");
    var headers = {};
    estest.slice(0, i).replace(/[^\n]*/g, function (line) {
      var header = line.split(":");
      if (header[0].trim() !== "") {
        headers[header[0].trim()] = header.slice(1).join(":").trim();
      }
    });
    response.writeHead(200, headers);
    var body = estest.slice(i + 2);
    body = body.replace(/<random\(\)>/g, function () {
      return Math.random();
    });
    body = body.replace(/<lastEventId\((\d+)\)>/g, function (p, increment) {
      return lastEventId + Number(increment);
    });
    body = body.replace(/<authorization>/g, function () {
      return authorization;
    });
    body = body.replace(/<bigData>/g, function () {
      return new Array(1024 * 1024 * 16).join("X");
    });
    body = body.split(/<delay\((\d+)\)>/);
    i = -1;
    var next = function () {
      ++i;
      if (body[i] !== "") {
        var pieces = body[i].split(/<byte\(([0-9A-F][0-9A-F])\)>/);
        for (var j = 0; j < pieces.length; j += 2) {
          if (pieces[j] !== "") {
            response.write(pieces[j]);
          }
          if (j + 1 < pieces.length) {
            var b = parseInt(pieces[j + 1], 16);
            response.write(Buffer.from([b]));
          }
        }
        //response.write(body[i]);
      }
      if (++i < body.length) {
        setTimeout(next, Number(body[i]));
      } else {
        response.end();
      }
    };
    next();
    return;
  }

  response.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-store",
    "Access-control-allow-headers": "x-requested-with",
    "Access-Control-Allow-Origin": "*"
  });

  response.write(":" + Array(2049).join(" ") + "\n"); // 2kB padding for IE
  response.write("retry: 1000\n");
  response.write("heartbeatTimeout: " + heartbeatTimeout + "\n");//!

  emitter.addListener("message", sendMessages);
  emitter.setMaxListeners(0);
  sendMessages();
}

function onRequest(request, response) {
  var parsedURL = url.parse(request.url, true);
  var query = parsedURL.query;
  var pathname = parsedURL.pathname;
  var time = "";
  var data = "";

  if (query.message) {
    time = new Date();
    data = "[" + time.toISOString() + "][IP: " + request.connection.remoteAddress + "] " + query.message;
    response.writeHead(200, {
      "Content-Type": "text/plain"
    });
    response.end(String(firstId + history.push(data)));
    emitter.emit("message");
    return;
  }

  if (pathname === "/events") {
    eventStream(request, response);
  } else {
    var files = [
      "/example.html",
      "/nodechat.css",
      "/eventsource.js",
      "/nodechat.js",
      "/tests.html",
      "/qunit.css",
      "/qunit.js",
      "/tests.js",
      "/stop.js"
    ];
    if (files.indexOf(pathname) === -1) {
      pathname = files[0];
    }
    fs.stat(__dirname + pathname, function (error, stats) {
      if (error) {
        response.writeHead(404);
        response.end();
      } else {
        var mtime = Date.parse(request.headers["if-modified-since"]) || 0;
        if (stats.mtime <= mtime) {
          response.writeHead(304);
          response.end();
        } else {
          var raw = fs.createReadStream(__dirname + pathname);
          response.writeHead(200, {
            "Content-Type": (pathname.indexOf(".js") !== -1 ? "text/javascript" : (pathname.indexOf(".css") !== -1 ? "text/css" : "text/html")),
            "Last-Modified": stats.mtime.toUTCString()
          });
          raw.pipe(response);
        }
      }
    });
  }
}

http.createServer(onRequest).listen(PORT1);
http.createServer(onRequest).listen(PORT2);

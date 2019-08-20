var koa     = require('koa');
var sockjs  = require('sockjs');
var http    = require('http');
var fs      = require('fs');
var path    = require('path');

// 1. Echo sockjs server
var sockjs_opts = {sockjs_url: "http://cdn.jsdelivr.net/sockjs/1.0.1/sockjs.min.js"};
var sockjs_echo = sockjs.createServer(sockjs_opts);
sockjs_echo.on('connection', function(conn) {
    conn.on('data', function(message) {
        conn.write(message);
    });
});

// 2. koa server
var app = koa();

app.use(function *() {
    var filePath = __dirname + '/index.html';
    this.type = path.extname(filePath);
    this.body = fs.createReadStream(filePath);
});

var server = http.createServer(app.callback());
sockjs_echo.installHandlers(server, {prefix:'/echo'});

server.listen(9999, '0.0.0.0');
console.log(' [*] Listening on 0.0.0.0:9999' );

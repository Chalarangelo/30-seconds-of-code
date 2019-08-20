"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var schema = require('./schema.json');
var http_1 = require("http");
function serveSchema(port) {
    if (port === void 0) { port = 33333; }
    var handleRequest = function (request, response) {
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify(schema));
    };
    var server = http_1.createServer(handleRequest);
    return new Promise(function (resolve) {
        server.listen(port, resolve);
    });
}
exports.serveSchema = serveSchema;

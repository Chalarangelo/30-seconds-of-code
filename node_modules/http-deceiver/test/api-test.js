var assert = require('assert');
var net = require('net');
var http = require('http');
var streamPair = require('stream-pair');
var thing = require('handle-thing');

var httpDeceiver = require('../');

describe('HTTP Deceiver', function() {
  var handle;
  var pair;
  var socket;
  var deceiver;

  beforeEach(function() {
    pair = streamPair.create();
    handle = thing.create(pair.other);
    socket = new net.Socket({ handle: handle });

    // For v0.8
    socket.readable = true;
    socket.writable = true;

    deceiver = httpDeceiver.create(socket);
  });

  it('should emit request', function(done) {
    var server = http.createServer();
    server.emit('connection', socket);

    server.on('request', function(req, res) {
      assert.equal(req.method, 'PUT');
      assert.equal(req.url, '/hello');
      assert.deepEqual(req.headers, { a: 'b' });

      done();
    });

    deceiver.emitRequest({
      method: 'PUT',
      path: '/hello',
      headers: {
        a: 'b'
      }
    });
  });

  it('should emit response', function(done) {
    var agent = new http.Agent();
    agent.createConnection = function createConnection() {
      return socket;
    };
    var client = http.request({
      method: 'POST',
      path: '/ok',
      agent: agent
    }, function(res) {
      assert.equal(res.statusCode, 421);
      assert.deepEqual(res.headers, { a: 'b' });

      done();
    });

    process.nextTick(function() {
      deceiver.emitResponse({
        status: 421,
        reason: 'F',
        headers: {
          a: 'b'
        }
      });
    });
  });

  it('should override .execute and .finish', function(done) {
    var server = http.createServer();
    server.emit('connection', socket);

    server.on('request', function(req, res) {
      assert.equal(req.method, 'PUT');
      assert.equal(req.url, '/hello');
      assert.deepEqual(req.headers, { a: 'b' });

      var actual = '';
      req.on('data', function(chunk) {
        actual += chunk;
      });
      req.once('end', function() {
        assert.equal(actual, 'hello world');
        done();
      });
    });

    deceiver.emitRequest({
      method: 'PUT',
      path: '/hello',
      headers: {
        a: 'b'
      }
    });

    pair.write('hello');
    pair.end(' world');
  });

  it('should work with reusing parser', function(done) {
    var server = http.createServer();
    server.emit('connection', socket);

    function secondRequest() {
      pair = streamPair.create();
      handle = thing.create(pair.other);
      socket = new net.Socket({ handle: handle });

      // For v0.8
      socket.readable = true;
      socket.writable = true;

      server.emit('connection', socket);

      pair.end('PUT /second HTTP/1.1\r\nContent-Length:11\r\n\r\nhello world');
    }

    server.on('request', function(req, res) {
      var actual = '';
      req.on('data', function(chunk) {
        actual += chunk;
      });
      req.once('end', function() {
        assert.equal(actual, 'hello world');

        if (req.url === '/first')
          secondRequest();
        else
          done();
      });
    });

    deceiver.emitRequest({
      method: 'PUT',
      path: '/first',
      headers: {
        a: 'b'
      }
    });

    pair.write('hello');
    pair.end(' world');
  });

  it('should emit CONNECT request', function(done) {
    var server = http.createServer();
    server.emit('connection', socket);

    server.on('connect', function(req, socket, bodyHead) {
      assert.equal(req.method, 'CONNECT');
      assert.equal(req.url, '/hello');

      done();
    });

    deceiver.emitRequest({
      method: 'CONNECT',
      path: '/hello',
      headers: {
      }
    });
  });

  it('should emit Upgrade request', function(done) {
    var server = http.createServer();
    server.emit('connection', socket);

    server.on('upgrade', function(req, socket, bodyHead) {
      assert.equal(req.method, 'POST');
      assert.equal(req.url, '/hello');

      socket.on('data', function(chunk) {
        assert.equal(chunk + '', 'hm');
        done();
      });
    });

    deceiver.emitRequest({
      method: 'POST',
      path: '/hello',
      headers: {
        'upgrade': 'websocket'
      }
    });

    pair.write('hm');
  });

  it('should emit Upgrade response', function(done) {
    var agent = new http.Agent();
    agent.createConnection = function createConnection() {
      return socket;
    };
    var client = http.request({
      method: 'POST',
      path: '/ok',
      headers: {
        connection: 'upgrade',
        upgrade: 'websocket'
      },
      agent: agent
    }, function(res) {
      assert(false);
    });
    client.on('upgrade', function(res, socket) {
      assert.equal(res.statusCode, 421);
      done();
    });

    process.nextTick(function() {
      deceiver.emitResponse({
        status: 421,
        reason: 'F',
        headers: {
          upgrade: 'websocket'
        }
      });
    });
  });
});

var EventSource = require('../lib/eventsource')
  , http = require('http')
  , https = require('https')
  , fs = require('fs')
  , assert = require('assert')
  , u = require('url');

var _port = 20000;
var servers = 0;
process.on('exit', function () {
  if (servers != 0) {
    console.error("************ Didn't kill all servers - there is still %d running.", servers);
  }
});

function createServer(callback) {
  var server = http.createServer();
  configureServer(server, 'http', _port++, callback);
}

function createHttpsServer(callback) {
  var options = {
    key: fs.readFileSync(__dirname + '/key.pem'),
    cert: fs.readFileSync(__dirname + '/certificate.pem')
  };
  var server = https.createServer(options);
  configureServer(server, 'https', _port++, callback);
}

function configureServer(server, protocol, port, callback) {
  var responses = [];

  var oldClose = server.close;
  server.close = function() {
    responses.forEach(function (res) {
      res.end();
    });
    servers--;
    oldClose.apply(this, arguments);
  };

  server.on('request', function (req, res) {
    responses.push(res);
  });

  server.url = protocol + '://localhost:' + port;

  server.listen(port, function onOpen(err) {
    servers++;
    callback(err, server);
  });
}

function writeEvents(chunks) {
  return function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/event-stream'});
    chunks.forEach(function (chunk) {
      res.write(chunk);
    });
    res.write(':'); // send a dummy comment to ensure that the head is flushed
  };
}

describe('Parser', function () {
  it('parses multibyte characters', function (done) {
    createServer(function (err, server) {
      if (err) return done(err);

      server.on('request', writeEvents(["id: 1\ndata: €豆腐\n\n"]));
      var es = new EventSource(server.url);

      es.onmessage = function (m) {
        assert.equal("€豆腐", m.data);
        server.close(done);
      };
    });
  });

  it('parses empty lines with multibyte characters', function (done) {
    createServer(function (err, server) {
      if (err) return done(err);

      server.on('request', writeEvents(["\n\n\n\nid: 1\ndata: 我現在都看實況不玩遊戲\n\n"]));
      var es = new EventSource(server.url);

      es.onmessage = function (m) {
        assert.equal("我現在都看實況不玩遊戲", m.data);
        server.close(done);
      };
    });
  });

  it('parses one one-line message in one chunk', function (done) {
    createServer(function (err, server) {
      if (err) return done(err);

      server.on('request', writeEvents(["data: Hello\n\n"]));
      var es = new EventSource(server.url);
      es.onmessage = function (m) {
        assert.equal("Hello", m.data);
        server.close(done);
      };
    });
  });

  it('parses one one-line message in two chunks', function (done) {
    createServer(function (err, server) {
      if (err) return done(err);

      server.on('request', writeEvents(["data: Hel", "lo\n\n"]));
      var es = new EventSource(server.url);
      es.onmessage = function (m) {
        assert.equal("Hello", m.data);
        server.close(done);
      };
    });
  });

  it('parses two one-line messages in one chunk', function (done) {
    createServer(function (err, server) {
      if (err) return done(err);

      server.on('request', writeEvents(["data: Hello\n\n", "data: World\n\n"]));
      var es = new EventSource(server.url);

      es.onmessage = first;

      function first(m) {
        assert.equal("Hello", m.data);
        es.onmessage = second;
      }

      function second(m) {
        assert.equal("World", m.data);
        server.close(done);
      }
    });
  });

  it('parses one two-line message in one chunk', function (done) {
    createServer(function (err, server) {
      if (err) return done(err);

      server.on('request', writeEvents(["data: Hello\ndata:World\n\n"]));
      var es = new EventSource(server.url);

      es.onmessage = function (m) {
        assert.equal("Hello\nWorld", m.data);
        server.close(done);
      };
    });
  });

  it('parses really chopped up unicode data', function (done) {
    createServer(function (err, server) {
      if (err) return done(err);

      var chopped = "data: Aslak\n\ndata: Hellesøy\n\n".split("");
      server.on('request', writeEvents(chopped));
      var es = new EventSource(server.url);

      es.onmessage = first;

      function first(m) {
        assert.equal("Aslak", m.data);
        es.onmessage = second;
      }

      function second(m) {
        assert.equal("Hellesøy", m.data);
        server.close(done);
      }
    });
  });

  it('accepts CRLF as separator', function (done) {
    createServer(function (err, server) {
      if (err) return done(err);

      var chopped = "data: Aslak\r\n\r\ndata: Hellesøy\r\n\r\n".split("");
      server.on('request', writeEvents(chopped));
      var es = new EventSource(server.url);

      es.onmessage = first;

      function first(m) {
        assert.equal("Aslak", m.data);
        es.onmessage = second;
      }

      function second(m) {
        assert.equal("Hellesøy", m.data);
        server.close(done);
      }
    });
  });

  it('accepts CR as separator', function (done) {
    createServer(function (err, server) {
      if (err) return done(err);

      var chopped = "data: Aslak\r\rdata: Hellesøy\r\r".split("");
      server.on('request', writeEvents(chopped));
      var es = new EventSource(server.url);

      es.onmessage = first;

      function first(m) {
        assert.equal("Aslak", m.data);
        es.onmessage = second;
      }

      function second(m) {
        assert.equal("Hellesøy", m.data);
        server.close(done);
      }
    });
  });

  it('delivers message with explicit event', function (done) {
    createServer(function (err, server) {
      if (err) return done(err);

      server.on('request', writeEvents(["event: greeting\ndata: Hello\n\n"]));
      var es = new EventSource(server.url);

      es.addEventListener('greeting', function (m) {
        assert.equal("Hello", m.data);
        server.close(done);
      });
    });
  });

  it('ignores comments', function (done) {
    createServer(function (err, server) {
      if (err) return done(err);

      server.on('request', writeEvents(["data: Hello\n\n:nothing to see here\n\ndata: World\n\n"]));
      var es = new EventSource(server.url);

      es.onmessage = first;

      function first(m) {
        assert.equal("Hello", m.data);
        es.onmessage = second;
      }

      function second(m) {
        assert.equal("World", m.data);
        server.close(done);
      }
    });
  });

  it('ignores empty comments', function (done) {
    createServer(function (err, server) {
      if (err) return done(err);

      server.on('request', writeEvents(["data: Hello\n\n:\n\ndata: World\n\n"]));
      var es = new EventSource(server.url);

      es.onmessage = first;

      function first(m) {
        assert.equal("Hello", m.data);
        es.onmessage = second;
      }

      function second(m) {
        assert.equal("World", m.data);
        server.close(done);
      }
    });
  });

  it('does not ignore multilines strings', function (done) {
    createServer(function (err, server) {
      if (err) return done(err);

      server.on('request', writeEvents(["data: line one\ndata:\ndata: line two\n\n"]));
      var es = new EventSource(server.url);

      es.onmessage = function (m) {
        assert.equal('line one\n\nline two', m.data);
        server.close(done);
      };
    });
  });

  it('does not ignore multilines strings even in data beginning', function (done) {
    createServer(function (err, server) {
      if (err) return done(err);

      server.on('request', writeEvents(["data:\ndata:line one\ndata: line two\n\n"]));
      var es = new EventSource(server.url);

      es.onmessage = function (m) {
        assert.equal('\nline one\nline two', m.data);
        server.close(done);
      };
    });
  });

  it('causes entire event to be ignored for empty event field', function (done) {
    createServer(function (err, server) {
      if (err) return done(err);

      server.on('request', writeEvents(["event:\n\ndata: Hello\n\n"]));
      var es = new EventSource(server.url);

      var originalEmit = es.emit;
      es.emit = function (event) {
        assert.ok(event === 'message' || event === 'newListener');
        return originalEmit.apply(this, arguments);
      };
      es.onmessage = function (m) {
        assert.equal('Hello', m.data);
        server.close(done);
      };
    });
  });

  it('parses relatively huge messages efficiently', function (done) {
    this.timeout(1000);

    createServer(function (err, server) {
      if (err) return done(err);
      var longMessage = "data: " + new Array(100000).join('a') + "\n\n";
      server.on('request', writeEvents([longMessage]));

      var es = new EventSource(server.url);

      es.onmessage = function () {
        server.close(done);
      };
    });
  });
});

describe('HTTP Request', function () {
  it('passes cache-control: no-cache to server', function (done) {
    createServer(function (err, server) {
      if (err) return done(err);

      server.on('request', function (req) {
        assert.equal('no-cache', req.headers['cache-control']);
        server.close(done);
      });
      new EventSource(server.url);
    });
  });

  it('sets request headers', function (done) {
    var server = createServer(function (err, server) {
      if (err) return done(err);

      server.on('request', function (req) {
        assert.equal(req.headers['user-agent'], 'test');
        assert.equal(req.headers['cookie'], 'test=test');
        assert.equal(req.headers['last-event-id'], '99');
        server.close(done);
      });

      var headers = {
        'User-Agent': 'test',
        'Cookie': 'test=test',
        'Last-Event-ID': '99'
      };
      new EventSource(server.url, {headers: headers});
    });
  });

  it("does not set request headers that don't have a value", function (done) {
    var server = createServer(function (err, server) {
      if (err) return done(err);

      server.on('request', function (req) {
        assert.equal(req.headers['user-agent'], 'test');
        assert.equal(req.headers['cookie'], 'test=test');
        assert.equal(req.headers['last-event-id'], '99');
        assert.equal(req.headers['X-Something'], undefined);
        server.close(done);
      });

      var headers = {
        'User-Agent': 'test',
        'Cookie': 'test=test',
        'Last-Event-ID': '99',
        'X-Something': null
      };

      assert.doesNotThrow(
        function() {
          new EventSource(server.url, {headers: headers});
        }
      );
    });
  });

  [301, 307].forEach(function (status) {
    it('follows http ' + status + ' redirect', function (done) {
      var redirectSuffix = '/foobar';
      var clientRequestedRedirectUrl = false;
      createServer(function (err, server) {
        if(err) return done(err);

        server.on('request', function (req, res) {
          if (req.url === '/') {
            res.writeHead(status, {
              'Connection': 'Close',
              'Location': server.url + redirectSuffix
            });
            res.end();
          } else if (req.url === redirectSuffix) {
            clientRequestedRedirectUrl = true;
            res.writeHead(200, {'Content-Type': 'text/event-stream'});
            res.end();
          }
        });

        var es = new EventSource(server.url);
        es.onopen = function () {
          assert.ok(clientRequestedRedirectUrl);
          assert.equal(server.url + redirectSuffix, es.url);
          server.close(done);
        };
      });
    });


    it('causes error event when response is ' + status + ' with missing location', function (done) {
      var redirectSuffix = '/foobar';
      var clientRequestedRedirectUrl = false;
      createServer(function (err, server) {
        if(err) return done(err);

        server.on('request', function (req, res) {
          res.writeHead(status, {
            'Connection': 'Close'
          });
          res.end();
        });

        var es = new EventSource(server.url);
        es.onerror = function (err) {
          assert.equal(err.status, status);
          server.close(done);
        };
      });
    });
  });

  [401, 403].forEach(function (status) {
    it('causes error event when response status is ' + status, function (done) {
      createServer(function (err, server) {
        if(err) return done(err);

        server.on('request', function (req, res) {
          res.writeHead(status, {'Content-Type': 'text/html'});
          res.end();
        });

        var es = new EventSource(server.url);
        es.onerror = function (err) {
          assert.equal(err.status, status);
          server.close(done);
        };
      });
    });
  });
});

describe('HTTPS Support', function () {
  it('uses https for https urls', function (done) {
    createHttpsServer(function (err, server) {
      if(err) return done(err);

      server.on('request', writeEvents(["data: hello\n\n"]));
      var es = new EventSource(server.url, {rejectUnauthorized: false});

      es.onmessage = function (m) {
        assert.equal("hello", m.data);
        server.close(done);
      }
    });
  });
});

describe('Reconnection', function () {
  it('is attempted when server is down', function (done) {
    var es = new EventSource('http://localhost:' + _port);
    es.reconnectInterval = 0;

    es.onerror = function () {
      es.onerror = null;
      createServer(function (err, server) {
        if(err) return done(err);

        server.on('request', writeEvents(["data: hello\n\n"]));

        es.onmessage = function (m) {
          assert.equal("hello", m.data);
          server.close(done);
        }
      });
    };
  });

  it('is attempted when server goes down after connection', function (done) {
    createServer(function (err, server) {
      if(err) return done(err);

      server.on('request', writeEvents(["data: hello\n\n"]));
      var es = new EventSource(server.url);
      es.reconnectInterval = 0;

      es.onmessage = function (m) {
        assert.equal("hello", m.data);
        server.close(function (err) {
          if(err) return done(err);

          var port = u.parse(es.url).port;
          configureServer(http.createServer(), 'http', port, function (err, server2) {
            if(err) return done(err);

            server2.on('request', writeEvents(["data: world\n\n"]));
            es.onmessage = function (m) {
              assert.equal("world", m.data);
              server2.close(done);
            };
          });
        });
      };
    });
  });

  it('is stopped when server goes down and eventsource is being closed', function (done) {
    createServer(function (err, server) {
      if(err) return done(err);

      server.on('request', writeEvents(["data: hello\n\n"]));
      var es = new EventSource(server.url);
      es.reconnectInterval = 0;

      es.onmessage = function (m) {
        assert.equal("hello", m.data);
        server.close(function (err) {
          if(err) return done(err);
          // The server has closed down. es.onerror should now get called,
          // because es's remote connection was dropped.
        });
      };

      es.onerror = function () {
        // We received an error because the remote connection was closed.
        // We close es, so we do not want es to reconnect.
        es.close();

        var port = u.parse(es.url).port;
        configureServer(http.createServer(), 'http', port, function (err, server2) {
          if(err) return done(err);
          server2.on('request', writeEvents(["data: world\n\n"]));

          es.onmessage = function (m) {
            return done(new Error("Unexpected message: " + m.data));
          };

          setTimeout(function () {
            // We have not received any message within 100ms, we can
            // presume this works correctly.
            server2.close(done);
          }, 100);
        });
      };
    });
  });

  it('is not attempted when server responds with HTTP 204', function (done) {
    createServer(function (err, server) {
      if(err) return done(err);

      server.on('request', function (req, res) {
        res.writeHead(204);
        res.end();
      });

      var es = new EventSource(server.url);
      es.reconnectInterval = 0;

      es.onerror = function (e) {
        assert.equal(e.status, 204);
        server.close(function (err) {
          if(err) return done(err);

          var port = u.parse(es.url).port;
          configureServer(http.createServer(), 'http', port, function (err, server2) {
            if(err) return done(err);

            // this will be verified by the readyState
            // going from CONNECTING to CLOSED,
            // along with the tests verifying that the
            // state is CONNECTING when a server closes.
            // it's next to impossible to write a fail-safe
            // test for this, though.
            var ival = setInterval(function () {
              if (es.readyState == EventSource.CLOSED) {
                clearInterval(ival);
                server2.close(done);
              }
            }, 5);
          });
        });
      };
    });
  });

  it('sends Last-Event-ID http header when it has previously been passed in an event from the server', function (done) {
    createServer(function (err, server) {
      if(err) return done(err);

      server.on('request', writeEvents(['id: 10\ndata: Hello\n\n']));

      var es = new EventSource(server.url);
      es.reconnectInterval = 0;

      es.onmessage = function () {
        server.close(function (err) {
          if(err) return done(err);

          var port = u.parse(es.url).port;
          configureServer(http.createServer(), 'http', port, function (err, server2) {
            server2.on('request', function (req, res) {
              assert.equal('10', req.headers['last-event-id']);
              server2.close(done);
            });
          });
        });
      };
    });
  });

  it('sends correct Last-Event-ID http header when an initial Last-Event-ID header was specified in the constructor', function (done) {
    createServer(function (err, server) {
      if(err) return done(err);

      server.on('request', function (req, res) {
        assert.equal('9', req.headers['last-event-id']);
        server.close(done);
      });

      new EventSource(server.url, {headers: {'Last-Event-ID': '9'}});
    });
  });

  it('does not send Last-Event-ID http header when it has not been previously sent by the server', function (done) {
    createServer(function (err, server) {
      if(err) return done(err);

      server.on('request', writeEvents(['data: Hello\n\n']));

      var es = new EventSource(server.url);
      es.reconnectInterval = 0;

      es.onmessage = function () {
        server.close(function (err) {
          if(err) return done(err);

          var port = u.parse(es.url).port;
          configureServer(http.createServer(), 'http', port, function (err, server2) {
            server2.on('request', function (req, res) {
              assert.equal(undefined, req.headers['last-event-id']);
              server2.close(done);
            });
          });
        });
      };
    });
  });
});

describe('readyState', function () {
  it('has CONNECTING constant', function () {
    assert.equal(0, EventSource.CONNECTING);
  });

  it('has OPEN constant', function () {
    assert.equal(1, EventSource.OPEN);
  });

  it('has CLOSED constant', function () {
    assert.equal(2, EventSource.CLOSED);
  });

  it('is CONNECTING before connection has been established', function (done) {
    var es = new EventSource('http://localhost:' + _port);
    assert.equal(EventSource.CONNECTING, es.readyState);
    es.onerror = function () {
      es.close();
      done();
    }
  });

  it('is CONNECTING when server has closed the connection', function (done) {
    createServer(function (err, server) {
      if(err) return done(err);

      server.on('request', writeEvents([]));
      var es = new EventSource(server.url);
      es.reconnectInterval = 0;

      es.onopen = function (m) {
        server.close(function (err) {
          if(err) return done(err);

          es.onerror = function () {
            es.onerror = null;
            assert.equal(EventSource.CONNECTING, es.readyState);
            done();
          };
        });
      };
    });
  });

  it('is OPEN when connection has been established', function (done) {
    createServer(function (err, server) {
      if(err) return done(err);

      server.on('request', writeEvents([]));
      var es = new EventSource(server.url);

      es.onopen = function () {
        assert.equal(EventSource.OPEN, es.readyState);
        server.close(done);
      }
    });
  });

  it('is CLOSED after connection has been closed', function (done) {
    createServer(function (err, server) {
      if(err) return done(err);

      server.on('request', writeEvents([]));
      var es = new EventSource(server.url);

      es.onopen = function () {
        es.close();
        assert.equal(EventSource.CLOSED, es.readyState);
        server.close(done);
      }
    });
  });
});

describe('Properties', function () {
  it('url exposes original request url', function () {
    var url = 'http://localhost:' + _port;
    var es = new EventSource(url);
    assert.equal(url, es.url);
  });
});

describe('Events', function () {
  it('calls onopen when connection is established', function (done) {
    createServer(function (err, server) {
      if(err) return done(err);

      server.on('request', writeEvents([]));
      var es = new EventSource(server.url);

      es.onopen = function (event) {
        assert.equal(event.type, 'open');
        server.close(done);
      }
    });
  });

  it('supplies the correct origin', function (done) {
    createServer(function (err, server) {
      if(err) return done(err);

      server.on('request', writeEvents(["data: hello\n\n"]));
      var es = new EventSource(server.url);

      es.onmessage = function (event) {
        assert.equal(event.origin, server.url);
        server.close(done);
      }
    });
  });

  it('emits open event when connection is established', function (done) {
    createServer(function (err, server) {
      if(err) return done(err);

      server.on('request', writeEvents([]));
      var es = new EventSource(server.url);

      es.addEventListener('open', function (event) {
        assert.equal(event.type, 'open');
        server.close(done);
      });
    });
  });

  it('does not emit error when connection is closed by client', function (done) {
    createServer(function (err, server) {
      if(err) return done(err);

      server.on('request', writeEvents([]));
      var es = new EventSource(server.url);

      es.addEventListener('open', function () {
        es.close();
        process.nextTick(function () {
          server.close(done);
        });
      });
      es.addEventListener('error', function () {
        done(new Error('error should not be emitted'));
      });
    });
  });

  it('populates message\'s lastEventId correctly when the last event has an associated id', function (done) {
    createServer(function (err, server) {
      if(err) return done(err);

      server.on('request', writeEvents(["id: 123\ndata: hello\n\n"]));
      var es = new EventSource(server.url);

      es.onmessage = function (m) {
        assert.equal(m.lastEventId, "123");
        server.close(done);
      };
    });
  });

  it('populates message\'s lastEventId correctly when the last event doesn\'t have an associated id', function (done) {
    createServer(function (err, server) {
      if(err) return done(err);

      server.on('request', writeEvents(["id: 123\ndata: Hello\n\n", "data: World\n\n"]));
      var es = new EventSource(server.url);

      es.onmessage = first;

      function first() {
        es.onmessage = second;
      }

      function second(m) {
        assert.equal(m.data, "World");
        assert.equal(m.lastEventId, "123");  //expect to get back the previous event id
        server.close(done);
      }
    });
  });

  it('populates messages with enumerable properties so they can be inspected via console.log().', function (done) {
    createServer(function (err, server) {
      if(err) return done(err);

      server.on('request', writeEvents(["data: World\n\n"]));
      var es = new EventSource(server.url);

      es.onmessage = function (m) {
        var enumerableAttributes = Object.keys(m);
        assert.notEqual(enumerableAttributes.indexOf("data"), -1);
        assert.notEqual(enumerableAttributes.indexOf("type"), -1);
        server.close(done);
      };
    });
  });
});

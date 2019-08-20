killable
========

Keeps track of a server's open sockets so they can be destroyed at a
moment's notice. This way, the server connection can be killed very
fast.

Installation
------------

```
npm install killable
```

Example usage
-------------

Using express:
('server' in the example is just an ``http.server``, so other frameworks
or pure Node should work just as well.)

```javascript
var killable = require('killable');

var app = require('express')();
var server;

app.route('/', function (req, res, next) {
  res.send('Server is going down NOW!');

  server.kill(function () {
    //the server is down when this is called. That won't take long.
  });
});

var server = app.listen(8080);
killable(server);
```

API
---

The ``killable`` module is callable. When you call it on a Node
``http.Server`` object, it will add a ``server.kill()`` method on it. It
returns the server object.

``server.kill([callback])`` closes all open sockets and calls
``server.close()``, to which the ``callback`` is passed on.

Inspired by: http://stackoverflow.com/a/14636625

License
-------

ISC

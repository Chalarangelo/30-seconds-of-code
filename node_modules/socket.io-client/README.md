
# socket.io-client

[![Build Status](https://secure.travis-ci.org/socketio/socket.io-client.svg?branch=master)](http://travis-ci.org/socketio/socket.io-client)
[![Dependency Status](https://david-dm.org/socketio/socket.io-client.svg)](https://david-dm.org/socketio/socket.io-client)
[![devDependency Status](https://david-dm.org/socketio/socket.io-client/dev-status.svg)](https://david-dm.org/socketio/socket.io-client#info=devDependencies)
[![NPM version](https://badge.fury.io/js/socket.io-client.svg)](https://www.npmjs.com/package/socket.io-client)
![Downloads](http://img.shields.io/npm/dm/socket.io-client.svg?style=flat)
[![](http://slack.socket.io/badge.svg?)](http://slack.socket.io)

[![Sauce Test Status](https://saucelabs.com/browser-matrix/socket.svg)](https://saucelabs.com/u/socket)

## How to use

A standalone build of `socket.io-client` is exposed automatically by the
socket.io server as `/socket.io/socket.io.js`. Alternatively you can
serve the file `socket.io.js` found in the `dist` folder.

```html
<script src="/socket.io/socket.io.js"></script>
<script>
  var socket = io('http://localhost');
  socket.on('connect', function(){});
  socket.on('event', function(data){});
  socket.on('disconnect', function(){});
</script>
```

```js
// with ES6 import
import io from 'socket.io-client';

const socket = io('http://localhost');
```

A slim build (without `JSON3`, a JSON polyfill for IE6/IE7, and `debug`) is also available: `socket.io.slim.js`.

Socket.IO is compatible with [browserify](http://browserify.org/) and [webpack](https://webpack.js.org/) (see example [there](https://github.com/socketio/socket.io/tree/2.0.3/examples/webpack-build)).

### Node.JS (server-side usage)

  Add `socket.io-client` to your `package.json` and then:

  ```js
  var socket = require('socket.io-client')('http://localhost');
  socket.on('connect', function(){});
  socket.on('event', function(data){});
  socket.on('disconnect', function(){});
  ```

## API

See [API](/docs/API.md)

## License

[MIT](/LICENSE)

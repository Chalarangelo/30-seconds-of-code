# http-proxy-middleware

[![Build Status](https://img.shields.io/travis/chimurai/http-proxy-middleware/master.svg?style=flat-square)](https://travis-ci.org/chimurai/http-proxy-middleware)
[![Coveralls](https://img.shields.io/coveralls/chimurai/http-proxy-middleware.svg?style=flat-square)](https://coveralls.io/r/chimurai/http-proxy-middleware)
[![dependency Status](https://img.shields.io/david/chimurai/http-proxy-middleware.svg?style=flat-square)](https://david-dm.org/chimurai/http-proxy-middleware#info=dependencies)
[![dependency Status](https://snyk.io/test/npm/http-proxy-middleware/badge.svg)](https://snyk.io/test/npm/http-proxy-middleware)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

Node.js proxying made simple. Configure proxy middleware with ease for [connect](https://github.com/senchalabs/connect), [express](https://github.com/strongloop/express), [browser-sync](https://github.com/BrowserSync/browser-sync) and [many more](#compatible-servers).

Powered by the popular Nodejitsu [`http-proxy`](https://github.com/nodejitsu/node-http-proxy). [![GitHub stars](https://img.shields.io/github/stars/nodejitsu/node-http-proxy.svg?style=social&label=Star)](https://github.com/nodejitsu/node-http-proxy)

## TL;DR

Proxy `/api` requests to `http://www.example.org`

```javascript
var express = require('express')
var proxy = require('http-proxy-middleware')

var app = express()

app.use('/api', proxy({ target: 'http://www.example.org', changeOrigin: true }))
app.listen(3000)

// http://localhost:3000/api/foo/bar -> http://www.example.org/api/foo/bar
```

_All_ `http-proxy` [options](https://github.com/nodejitsu/node-http-proxy#options) can be used, along with some extra `http-proxy-middleware` [options](#options).

:bulb: **Tip:** Set the option `changeOrigin` to `true` for [name-based virtual hosted sites](http://en.wikipedia.org/wiki/Virtual_hosting#Name-based).

## Table of Contents

<!-- MarkdownTOC autolink=true bracket=round depth=2 -->

- [Install](#install)
- [Core concept](#core-concept)
- [Example](#example)
- [Context matching](#context-matching)
- [Options](#options)
  - [http-proxy-middleware options](#http-proxy-middleware-options)
  - [http-proxy events](#http-proxy-events)
  - [http-proxy options](#http-proxy-options)
- [Shorthand](#shorthand)
  - [app.use\(path, proxy\)](#appusepath-proxy)
- [WebSocket](#websocket)
  - [External WebSocket upgrade](#external-websocket-upgrade)
- [Working examples](#working-examples)
- [Recipes](#recipes)
- [Compatible servers](#compatible-servers)
- [Tests](#tests)
- [Changelog](#changelog)
- [License](#license)

<!-- /MarkdownTOC -->

## Install

```javascript
$ npm install --save-dev http-proxy-middleware
```

## Core concept

Proxy middleware configuration.

#### proxy([context,] config)

```javascript
var proxy = require('http-proxy-middleware')

var apiProxy = proxy('/api', { target: 'http://www.example.org' })
//                   \____/   \_____________________________/
//                     |                    |
//                   context             options

// 'apiProxy' is now ready to be used as middleware in a server.
```

- **context**: Determine which requests should be proxied to the target host.
  (more on [context matching](#context-matching))
- **options.target**: target host to proxy to. _(protocol + host)_

(full list of [`http-proxy-middleware` configuration options](#options))

#### proxy(uri [, config])

```javascript
// shorthand syntax for the example above:
var apiProxy = proxy('http://www.example.org/api')
```

More about the [shorthand configuration](#shorthand).

## Example

An example with `express` server.

```javascript
// include dependencies
var express = require('express')
var proxy = require('http-proxy-middleware')

// proxy middleware options
var options = {
  target: 'http://www.example.org', // target host
  changeOrigin: true, // needed for virtual hosted sites
  ws: true, // proxy websockets
  pathRewrite: {
    '^/api/old-path': '/api/new-path', // rewrite path
    '^/api/remove/path': '/path' // remove base path
  },
  router: {
    // when request.headers.host == 'dev.localhost:3000',
    // override target 'http://www.example.org' to 'http://localhost:8000'
    'dev.localhost:3000': 'http://localhost:8000'
  }
}

// create the proxy (without context)
var exampleProxy = proxy(options)

// mount `exampleProxy` in web server
var app = express()
app.use('/api', exampleProxy)
app.listen(3000)
```

## Context matching

Providing an alternative way to decide which requests should be proxied; In case you are not able to use the server's [`path` parameter](http://expressjs.com/en/4x/api.html#app.use) to mount the proxy or when you need more flexibility.

[RFC 3986 `path`](https://tools.ietf.org/html/rfc3986#section-3.3) is used for context matching.

```
         foo://example.com:8042/over/there?name=ferret#nose
         \_/   \______________/\_________/ \_________/ \__/
          |           |            |            |        |
       scheme     authority       path        query   fragment
```

- **path matching**

  - `proxy({...})` - matches any path, all requests will be proxied.
  - `proxy('/', {...})` - matches any path, all requests will be proxied.
  - `proxy('/api', {...})` - matches paths starting with `/api`

- **multiple path matching**

  - `proxy(['/api', '/ajax', '/someotherpath'], {...})`

- **wildcard path matching**

  For fine-grained control you can use wildcard matching. Glob pattern matching is done by _micromatch_. Visit [micromatch](https://www.npmjs.com/package/micromatch) or [glob](https://www.npmjs.com/package/glob) for more globbing examples.

  - `proxy('**', {...})` matches any path, all requests will be proxied.
  - `proxy('**/*.html', {...})` matches any path which ends with `.html`
  - `proxy('/*.html', {...})` matches paths directly under path-absolute
  - `proxy('/api/**/*.html', {...})` matches requests ending with `.html` in the path of `/api`
  - `proxy(['/api/**', '/ajax/**'], {...})` combine multiple patterns
  - `proxy(['/api/**', '!**/bad.json'], {...})` exclusion

  **Note**: In multiple path matching, you cannot use string paths and wildcard paths together.

- **custom matching**

  For full control you can provide a custom function to determine which requests should be proxied or not.

  ```javascript
  /**
   * @return {Boolean}
   */
  var filter = function(pathname, req) {
    return pathname.match('^/api') && req.method === 'GET'
  }

  var apiProxy = proxy(filter, { target: 'http://www.example.org' })
  ```

## Options

### http-proxy-middleware options

- **option.pathRewrite**: object/function, rewrite target's url path. Object-keys will be used as _RegExp_ to match paths.

  ```javascript
  // rewrite path
  pathRewrite: {'^/old/api' : '/new/api'}

  // remove path
  pathRewrite: {'^/remove/api' : ''}

  // add base path
  pathRewrite: {'^/' : '/basepath/'}

  // custom rewriting
  pathRewrite: function (path, req) { return path.replace('/api', '/base/api') }
  ```

- **option.router**: object/function, re-target `option.target` for specific requests.

  ```javascript
  // Use `host` and/or `path` to match requests. First match will be used.
  // The order of the configuration matters.
  router: {
      'integration.localhost:3000' : 'http://localhost:8001',  // host only
      'staging.localhost:3000'     : 'http://localhost:8002',  // host only
      'localhost:3000/api'         : 'http://localhost:8003',  // host + path
      '/rest'                      : 'http://localhost:8004'   // path only
  }

  // Custom router function
  router: function(req) {
      return 'http://localhost:8004';
  }
  ```

- **option.logLevel**: string, ['debug', 'info', 'warn', 'error', 'silent']. Default: `'info'`

- **option.logProvider**: function, modify or replace log provider. Default: `console`.

  ```javascript
  // simple replace
  function logProvider(provider) {
    // replace the default console log provider.
    return require('winston')
  }
  ```

  ```javascript
  // verbose replacement
  function logProvider(provider) {
    var logger = new (require('winston')).Logger()

    var myCustomProvider = {
      log: logger.log,
      debug: logger.debug,
      info: logger.info,
      warn: logger.warn,
      error: logger.error
    }
    return myCustomProvider
  }
  ```

- (DEPRECATED) **option.proxyHost**: Use `option.changeOrigin = true` instead.
- (DEPRECATED) **option.proxyTable**: Use `option.router` instead.

### http-proxy events

Subscribe to [http-proxy events](https://github.com/nodejitsu/node-http-proxy#listening-for-proxy-events):

- **option.onError**: function, subscribe to http-proxy's `error` event for custom error handling.

  ```javascript
  function onError(err, req, res) {
    res.writeHead(500, {
      'Content-Type': 'text/plain'
    })
    res.end(
      'Something went wrong. And we are reporting a custom error message.'
    )
  }
  ```

- **option.onProxyRes**: function, subscribe to http-proxy's `proxyRes` event.

  ```javascript
  function onProxyRes(proxyRes, req, res) {
    proxyRes.headers['x-added'] = 'foobar' // add new header to response
    delete proxyRes.headers['x-removed'] // remove header from response
  }
  ```

- **option.onProxyReq**: function, subscribe to http-proxy's `proxyReq` event.

  ```javascript
  function onProxyReq(proxyReq, req, res) {
    // add custom header to request
    proxyReq.setHeader('x-added', 'foobar')
    // or log the req
  }
  ```

- **option.onProxyReqWs**: function, subscribe to http-proxy's `proxyReqWs` event.

  ```javascript
  function onProxyReqWs(proxyReq, req, socket, options, head) {
    // add custom header
    proxyReq.setHeader('X-Special-Proxy-Header', 'foobar')
  }
  ```

- **option.onOpen**: function, subscribe to http-proxy's `open` event.

  ```javascript
  function onOpen(proxySocket) {
    // listen for messages coming FROM the target here
    proxySocket.on('data', hybiParseAndLogMessage)
  }
  ```

- **option.onClose**: function, subscribe to http-proxy's `close` event.
  ```javascript
  function onClose(res, socket, head) {
    // view disconnected websocket connections
    console.log('Client disconnected')
  }
  ```

### http-proxy options

The following options are provided by the underlying [http-proxy](https://github.com/nodejitsu/node-http-proxy#options) library.

- **option.target**: url string to be parsed with the url module
- **option.forward**: url string to be parsed with the url module
- **option.agent**: object to be passed to http(s).request (see Node's [https agent](http://nodejs.org/api/https.html#https_class_https_agent) and [http agent](http://nodejs.org/api/http.html#http_class_http_agent) objects)
- **option.ssl**: object to be passed to https.createServer()
- **option.ws**: true/false: if you want to proxy websockets
- **option.xfwd**: true/false, adds x-forward headers
- **option.secure**: true/false, if you want to verify the SSL Certs
- **option.toProxy**: true/false, passes the absolute URL as the `path` (useful for proxying to proxies)
- **option.prependPath**: true/false, Default: true - specify whether you want to prepend the target's path to the proxy path
- **option.ignorePath**: true/false, Default: false - specify whether you want to ignore the proxy path of the incoming request (note: you will have to append / manually if required).
- **option.localAddress** : Local interface string to bind for outgoing connections
- **option.changeOrigin**: true/false, Default: false - changes the origin of the host header to the target URL
- **option.preserveHeaderKeyCase**: true/false, Default: false - specify whether you want to keep letter case of response header key
- **option.auth** : Basic authentication i.e. 'user:password' to compute an Authorization header.
- **option.hostRewrite**: rewrites the location hostname on (301/302/307/308) redirects.
- **option.autoRewrite**: rewrites the location host/port on (301/302/307/308) redirects based on requested host/port. Default: false.
- **option.protocolRewrite**: rewrites the location protocol on (301/302/307/308) redirects to 'http' or 'https'. Default: null.
- **option.cookieDomainRewrite**: rewrites domain of `set-cookie` headers. Possible values:
  - `false` (default): disable cookie rewriting
  - String: new domain, for example `cookieDomainRewrite: "new.domain"`. To remove the domain, use `cookieDomainRewrite: ""`.
  - Object: mapping of domains to new domains, use `"*"` to match all domains.  
    For example keep one domain unchanged, rewrite one domain and remove other domains:
    ```
    cookieDomainRewrite: {
      "unchanged.domain": "unchanged.domain",
      "old.domain": "new.domain",
      "*": ""
    }
    ```
- **option.cookiePathRewrite**: rewrites path of `set-cookie` headers. Possible values:
  - `false` (default): disable cookie rewriting
  - String: new path, for example `cookiePathRewrite: "/newPath/"`. To remove the path, use `cookiePathRewrite: ""`. To set path to root use `cookiePathRewrite: "/"`.
  - Object: mapping of paths to new paths, use `"*"` to match all paths.
    For example, to keep one path unchanged, rewrite one path and remove other paths:
    ```
    cookiePathRewrite: {
      "/unchanged.path/": "/unchanged.path/",
      "/old.path/": "/new.path/",
      "*": ""
    }
    ```
- **option.headers**: object, adds [request headers](https://en.wikipedia.org/wiki/List_of_HTTP_header_fields#Request_fields). (Example: `{host:'www.example.org'}`)
- **option.proxyTimeout**: timeout (in millis) when proxy receives no response from target
- **option.timeout**: timeout (in millis) for incoming requests
- **option.followRedirects**: true/false, Default: false - specify whether you want to follow redirects
- **option.selfHandleResponse** true/false, if set to true, none of the webOutgoing passes are called and it's your responsibility to appropriately return the response by listening and acting on the `proxyRes` event
- **option.buffer**: stream of data to send as the request body. Maybe you have some middleware that consumes the request stream before proxying it on e.g. If you read the body of a request into a field called 'req.rawbody' you could restream this field in the buffer option:

  ```
  'use strict';

  const streamify = require('stream-array');
  const HttpProxy = require('http-proxy');
  const proxy = new HttpProxy();

  module.exports = (req, res, next) => {

    proxy.web(req, res, {
      target: 'http://localhost:4003/',
      buffer: streamify(req.rawBody)
    }, next);

  };
  ```

## Shorthand

Use the shorthand syntax when verbose configuration is not needed. The `context` and `option.target` will be automatically configured when shorthand is used. Options can still be used if needed.

```javascript
proxy('http://www.example.org:8000/api')
// proxy('/api', {target: 'http://www.example.org:8000'});

proxy('http://www.example.org:8000/api/books/*/**.json')
// proxy('/api/books/*/**.json', {target: 'http://www.example.org:8000'});

proxy('http://www.example.org:8000/api', { changeOrigin: true })
// proxy('/api', {target: 'http://www.example.org:8000', changeOrigin: true});
```

### app.use(path, proxy)

If you want to use the server's `app.use` `path` parameter to match requests;
Create and mount the proxy without the http-proxy-middleware `context` parameter:

```javascript
app.use('/api', proxy({ target: 'http://www.example.org', changeOrigin: true }))
```

`app.use` documentation:

- express: http://expressjs.com/en/4x/api.html#app.use
- connect: https://github.com/senchalabs/connect#mount-middleware

## WebSocket

```javascript
// verbose api
proxy('/', { target: 'http://echo.websocket.org', ws: true })

// shorthand
proxy('http://echo.websocket.org', { ws: true })

// shorter shorthand
proxy('ws://echo.websocket.org')
```

### External WebSocket upgrade

In the previous WebSocket examples, http-proxy-middleware relies on a initial http request in order to listen to the http `upgrade` event. If you need to proxy WebSockets without the initial http request, you can subscribe to the server's http `upgrade` event manually.

```javascript
var wsProxy = proxy('ws://echo.websocket.org', { changeOrigin: true })

var app = express()
app.use(wsProxy)

var server = app.listen(3000)
server.on('upgrade', wsProxy.upgrade) // <-- subscribe to http 'upgrade'
```

## Working examples

View and play around with [working examples](https://github.com/chimurai/http-proxy-middleware/tree/master/examples).

- Browser-Sync ([example source](https://github.com/chimurai/http-proxy-middleware/tree/master/examples/browser-sync/index.js))
- express ([example source](https://github.com/chimurai/http-proxy-middleware/tree/master/examples/express/index.js))
- connect ([example source](https://github.com/chimurai/http-proxy-middleware/tree/master/examples/connect/index.js))
- WebSocket ([example source](https://github.com/chimurai/http-proxy-middleware/tree/master/examples/websocket/index.js))

## Recipes

View the [recipes](https://github.com/chimurai/http-proxy-middleware/tree/master/recipes) for common use cases.

## Compatible servers

`http-proxy-middleware` is compatible with the following servers:

- [connect](https://www.npmjs.com/package/connect)
- [express](https://www.npmjs.com/package/express)
- [browser-sync](https://www.npmjs.com/package/browser-sync)
- [lite-server](https://www.npmjs.com/package/lite-server)
- [grunt-contrib-connect](https://www.npmjs.com/package/grunt-contrib-connect)
- [grunt-browser-sync](https://www.npmjs.com/package/grunt-browser-sync)
- [gulp-connect](https://www.npmjs.com/package/gulp-connect)
- [gulp-webserver](https://www.npmjs.com/package/gulp-webserver)

Sample implementations can be found in the [server recipes](https://github.com/chimurai/http-proxy-middleware/tree/master/recipes/servers.md).

## Tests

Run the test suite:

```bash
# install dependencies
$ npm install

# linting
$ npm run lint

# unit tests
$ npm test

# code coverage
$ npm run cover
```

## Changelog

- [View changelog](https://github.com/chimurai/http-proxy-middleware/blob/master/CHANGELOG.md)

## License

The MIT License (MIT)

Copyright (c) 2015-2018 Steven Chim

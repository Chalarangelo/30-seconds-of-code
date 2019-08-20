# xhr

[![Join the chat at https://gitter.im/naugtur-xhr/Lobby](https://badges.gitter.im/naugtur-xhr/Lobby.svg)](https://gitter.im/naugtur-xhr/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

[![Greenkeeper badge](https://badges.greenkeeper.io/naugtur/xhr.svg)](https://greenkeeper.io/)

A small XMLHttpRequest wrapper. Designed for use with [browserify](http://browserify.org/), [webpack](https://webpack.github.io/) etc.

API is a subset of [request](https://github.com/request/request) so you can write code that works in both node.js and the browser by using `require('request')` in your code and telling your browser bundler to load `xhr` instead of `request`.

For browserify, add a [browser](https://github.com/substack/node-browserify#browser-field) field to your `package.json`:

```
"browser": {
  "request": "xhr"
}
```

For webpack, add a [resolve.alias](http://webpack.github.io/docs/configuration.html#resolve-alias) field to your configuration:

```
"resolve": {
  "alias": {
    "request$": "xhr"
  }
}
```

Browser support: IE8+ and everything else.

## Installation

```
npm install xhr
```

## Example

```js
var xhr = require("xhr")

xhr({
    method: "post",
    body: someJSONString,
    uri: "/foo",
    headers: {
        "Content-Type": "application/json"
    }
}, function (err, resp, body) {
    // check resp.statusCode
})
```

## `var req = xhr(options, callback)`

```js
type XhrOptions = String | {
    useXDR: Boolean?,
    sync: Boolean?,
    uri: String,
    url: String,
    method: String?,
    timeout: Number?,
    headers: Object?,
    body: String? | Object?,
    json: Boolean? | Object?,
    username: String?,
    password: String?,
    withCredentials: Boolean?,
    responseType: String?,
    beforeSend: Function?
}
xhr := (XhrOptions, Callback<Response>) => Request
```
the returned object is either an [`XMLHttpRequest`][3] instance
    or an [`XDomainRequest`][4] instance (if on IE8/IE9 &&
    `options.useXDR` is set to `true`)

Your callback will be called once with the arguments
    ( [`Error`][5], `response` , `body` ) where the response is an object:
```js
{
    body: Object||String,
    statusCode: Number,
    method: String,
    headers: {},
    url: String,
    rawRequest: xhr
}
```
 - `body`: HTTP response body - [`XMLHttpRequest.response`][6], [`XMLHttpRequest.responseText`][7] or
    [`XMLHttpRequest.responseXML`][8] depending on the request type.
 - `rawRequest`: Original  [`XMLHttpRequest`][3] instance
    or [`XDomainRequest`][4] instance (if on IE8/IE9 &&
    `options.useXDR` is set to `true`)
 - `headers`: A collection of headers where keys are header names converted to lowercase


Your callback will be called with an [`Error`][5] if there is an error in the browser that prevents sending the request.
A HTTP 500 response is not going to cause an error to be returned.

## Other signatures

* `var req = xhr(url, callback)` -
a simple string instead of the options. In this case, a GET request will be made to that url.

* `var req = xhr(url, options, callback)` -
the above may also be called with the standard set of options.

### Convience methods
* `var req = xhr.{post, put, patch, del, head, get}(url, callback)`
* `var req = xhr.{post, put, patch, del, head, get}(options, callback)`
* `var req = xhr.{post, put, patch, del, head, get}(url, options, callback)`

The `xhr` module has convience functions attached that will make requests with the given method.
Each function is named after its method, with the exception of `DELETE` which is called `xhr.del` for compatibility.

The method shorthands may be combined with the url-first form of `xhr` for succinct and descriptive requests. For example,

```js
xhr.post('/post-to-me', function(err, resp) {
  console.log(resp.body)
})
```

or

```js
xhr.del('/delete-me', { headers: { my: 'auth' } }, function (err, resp) {
  console.log(resp.statusCode);
})
```

## Options

### `options.method`

Specify the method the [`XMLHttpRequest`][3] should be opened
    with. Passed to [`XMLHttpRequest.open`][2]. Defaults to "GET"

### `options.useXDR`

Specify whether this is a cross origin (CORS) request for IE<10.
    Switches IE to use [`XDomainRequest`][4] instead of `XMLHttpRequest`.
    Ignored in other browsers.

Note that headers cannot be set on an XDomainRequest instance.

### `options.sync`

Specify whether this is a synchrounous request. Note that when
    this is true the callback will be called synchronously. In
    most cases this option should not be used. Only use if you
    know what you are doing!

### `options.body`

Pass in body to be send across the [`XMLHttpRequest`][3].
    Generally should be a string. But anything that's valid as
    a parameter to [`XMLHttpRequest.send`][1] should work  (Buffer for file, etc.).

If `options.json` is `true`, then this must be a JSON-serializable object. `options.body` is passed to `JSON.stringify` and sent.

### `options.uri` or `options.url`

The uri to send a request to. Passed to [`XMLHttpRequest.open`][2]. `options.url` and `options.uri` are aliases for each other.

### `options.headers`

An object of headers that should be set on the request. The
    key, value pair is passed to [`XMLHttpRequest.setRequestHeader`][9]

### `options.timeout`

Number of miliseconds to wait for response. Defaults to 0 (no timeout). Ignored when `options.sync` is true.

### `options.json`

Set to `true` to send request as `application/json` (see `options.body`) and parse response from JSON.

For backwards compatibility `options.json` can also be a valid JSON-serializable value to be sent to the server. Additionally the response body is still parsed as JSON

For sending booleans as JSON body see FAQ

### `options.withCredentials`

Specify whether user credentials are to be included in a cross-origin
    request. Sets [`XMLHttpRequest.withCredentials`][10]. Defaults to false.

A wildcard `*` cannot be used in the `Access-Control-Allow-Origin` header when `withCredentials` is true.
    The header needs to specify your origin explicitly or browser will abort the request.

### `options.responseType`

Determines the data type of the `response`. Sets [`XMLHttpRequest.responseType`][11]. For example, a `responseType` of `document` will return a parsed `Document` object as the `response.body` for an XML resource.

### `options.beforeSend`

A function being called right before the `send` method of the `XMLHttpRequest` or `XDomainRequest` instance is called. The `XMLHttpRequest` or `XDomainRequest` instance is passed as an argument.

### `options.xhr`

Pass an `XMLHttpRequest` object (or something that acts like one) to use instead of constructing a new one using the `XMLHttpRequest` or `XDomainRequest` constructors. Useful for testing.

## FAQ

- Why is my server's JSON response not parsed? I returned the right content-type.
  - See `options.json` - you can set it to `true` on a GET request to tell `xhr` to parse the response body.
  - Without `options.json` body is returned as-is (a string or when `responseType` is set and the browser supports it - a result of parsing JSON or XML)
- How do I send an object or array as POST body?
  - `options.body` should be a string. You need to serialize your object before passing to `xhr` for sending.
  - To serialize to JSON you can use
   `options.json:true` with `options.body` for convenience - then `xhr` will do the serialization and set content-type accordingly.
- Where's stream API? `.pipe()` etc.
  - Not implemented. You can't reasonably have that in the browser.
- Why can't I send `"true"` as body by passing it as `options.json` anymore?
  - Accepting `true` as a value was a bug. Despite what `JSON.stringify` does, the string `"true"` is not valid JSON. If you're sending booleans as JSON, please consider wrapping them in an object or array to save yourself from more trouble in the future. To bring back the old behavior, hardcode `options.json` to `true` and set `options.body` to your boolean value.
- How do I add an `onprogress` listener?
  - use `beforeSend` function for non-standard things that are browser specific. In this case:
  ```js
  xhr({
    ...
    beforeSend: function(xhrObject){
      xhrObject.onprogress = function(){}
    }
  })
  ```

## Mocking Requests
You can override the constructor used to create new requests for testing. When you're making a new request:

```js
xhr({ xhr: new MockXMLHttpRequest() })
```

or you can override the constructors used to create requests at the module level:

```js
xhr.XMLHttpRequest = MockXMLHttpRequest
xhr.XDomainRequest = MockXDomainRequest
```

## MIT Licenced

  [1]: http://xhr.spec.whatwg.org/#the-send()-method
  [2]: http://xhr.spec.whatwg.org/#the-open()-method
  [3]: http://xhr.spec.whatwg.org/#interface-xmlhttprequest
  [4]: http://msdn.microsoft.com/en-us/library/ie/cc288060(v=vs.85).aspx
  [5]: http://es5.github.com/#x15.11
  [6]: http://xhr.spec.whatwg.org/#the-response-attribute
  [7]: http://xhr.spec.whatwg.org/#the-responsetext-attribute
  [8]: http://xhr.spec.whatwg.org/#the-responsexml-attribute
  [9]: http://xhr.spec.whatwg.org/#the-setrequestheader()-method
  [10]: http://xhr.spec.whatwg.org/#the-withcredentials-attribute
  [11]: https://xhr.spec.whatwg.org/#the-responsetype-attribute

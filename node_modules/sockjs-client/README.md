
# SockJS-client

[![npm version](https://img.shields.io/npm/v/sockjs-client.svg?style=flat-square)](https://www.npmjs.com/package/sockjs-client)[![Build Status](https://img.shields.io/travis/sockjs/sockjs-client/master.svg?style=flat-square)](https://travis-ci.org/sockjs/sockjs-client)[![Dependencies](https://img.shields.io/david/sockjs/sockjs-client.svg?style=flat-square)](https://david-dm.org/sockjs/sockjs-client)[![Chat](https://img.shields.io/badge/Chat-gitter.im-blue.svg?style=flat-square)](https://gitter.im/sockjs/sockjs-client)
[![Sauce Test Status](https://saucelabs.com/buildstatus/brycekahle)](https://saucelabs.com/u/brycekahle)

SockJS is a browser JavaScript library that provides a WebSocket-like
object. SockJS gives you a coherent, cross-browser, Javascript API
which creates a low latency, full duplex, cross-domain communication
channel between the browser and the web server.

Under the hood SockJS tries to use native WebSockets first. If that
fails it can use a variety of browser-specific transport protocols and
presents them through WebSocket-like abstractions.

SockJS is intended to work for all modern browsers and in environments
which don't support the WebSocket protocol -- for example, behind restrictive
corporate proxies.

SockJS-client does require a server counterpart:

 * [SockJS-node](https://github.com/sockjs/sockjs-node) is a SockJS
   server for Node.js.


Philosophy:

 * The API should follow
   [HTML5 Websockets API](https://www.w3.org/TR/websockets/) as
   closely as possible.
 * All the transports must support cross domain connections out of the
   box. It's possible and recommended to host a SockJS server on a
   different server than your main web site.
 * There is support for at least one streaming protocol for every
   major browser.
 * Streaming transports should work cross-domain and
   should support cookies (for cookie-based sticky sessions).
 * Polling transports are used as a fallback for old browsers and
   hosts behind restrictive proxies.
 * Connection establishment should be fast and lightweight.
 * No Flash inside (no need to open port 843 - which doesn't work
   through proxies, no need to host 'crossdomain.xml', no need
   [to wait for 3 seconds](https://github.com/gimite/web-socket-js/issues/49)
   in order to detect problems)


Subscribe to
[SockJS mailing list](https://groups.google.com/forum/#!forum/sockjs) for
discussions and support.

SockJS family:

  * [SockJS-client](https://github.com/sockjs/sockjs-client) JavaScript client library
  * [SockJS-node](https://github.com/sockjs/sockjs-node) Node.js server
  * [SockJS-erlang](https://github.com/sockjs/sockjs-erlang) Erlang server
  * [SockJS-cyclone](https://github.com/flaviogrossi/sockjs-cyclone) Python/Cyclone/Twisted server
  * [SockJS-tornado](https://github.com/MrJoes/sockjs-tornado) Python/Tornado server
  * [SockJS-twisted](https://github.com/DesertBus/sockjs-twisted/) Python/Twisted server
  * [SockJS-aiohttp](https://github.com/aio-libs/sockjs/) Python/Aiohttp server
  * [Spring Framework](https://projects.spring.io/spring-framework) Java [client](https://docs.spring.io/spring-framework/docs/current/spring-framework-reference/html/websocket.html#websocket-fallback-sockjs-client) & server
  * [vert.x](https://github.com/vert-x/vert.x) Java/vert.x server
  * [Xitrum](https://xitrum-framework.github.io/) Scala server
  * [Atmosphere Framework](https://github.com/Atmosphere/atmosphere) JavaEE Server, Play Framework, Netty, Vert.x

Work in progress:

  * [SockJS-ruby](https://github.com/nyarly/sockjs-ruby)
  * [SockJS-netty](https://github.com/cgbystrom/sockjs-netty)
  * [SockJS-gevent](https://github.com/ksava/sockjs-gevent) ([SockJS-gevent fork](https://github.com/njoyce/sockjs-gevent))
  * [pyramid-SockJS](https://github.com/fafhrd91/pyramid_sockjs)
  * [wildcloud-websockets](https://github.com/wildcloud/wildcloud-websockets)
  * [wai-SockJS](https://github.com/Palmik/wai-sockjs)
  * [SockJS-perl](https://github.com/vti/sockjs-perl)
  * [SockJS-go](https://github.com/igm/sockjs-go/)

Getting Started
-------

SockJS mimics the [WebSockets API](https://www.w3.org/TR/websockets/),
but instead of `WebSocket` there is a `SockJS` Javascript object.

First, you need to load the SockJS JavaScript library. For example, you can
put that in your HTML head:

```html
<script src="https://cdn.jsdelivr.net/sockjs/1/sockjs.min.js"></script>
```

After the script is loaded you can establish a connection with the
SockJS server. Here's a simple example:

```javascript
 var sock = new SockJS('https://mydomain.com/my_prefix');
 sock.onopen = function() {
     console.log('open');
 };
 sock.onmessage = function(e) {
     console.log('message', e.data);
 };
 sock.onclose = function() {
     console.log('close');
 };

 sock.send('test');
 sock.close();
```

SockJS-client API
-----------------

### SockJS class

Similar to the 'WebSocket' API, the 'SockJS' constructor takes one, or more arguments:

```javascript
var sockjs = new SockJS(url, _reserved, options);
```

`url` may contain a query string, if one is desired.

Where `options` is a hash which can contain:

 *  **server (string)**

    String to append to url for actual data connection. Defaults to a random 4 digit number.

 *  **transports (string OR array of strings)**

    Sometimes it is useful to disable some fallback transports. This
    option allows you to supply a list transports that may be used by
    SockJS. By default all available transports will be used.

 *  **sessionId (number OR function)**

    Both client and server use session identifiers to distinguish connections.
    If you specify this option as a number, SockJS will use its random string
    generator function to generate session ids that are N-character long
    (where N corresponds to the number specified by **sessionId**).
    When you specify this option as a function, the function must return a
    randomly generated string. Every time SockJS needs to generate a session
    id it will call this function and use the returned string directly.
    If you don't specify this option, the default is to use the default random
    string generator to generate 8-character long session ids.

Although the 'SockJS' object tries to emulate the 'WebSocket'
behaviour, it's impossible to support all of its features. An
important SockJS limitation is the fact that you're not allowed to
open more than one SockJS connection to a single domain at a time.
This limitation is caused by an in-browser limit of outgoing
connections - usually [browsers don't allow opening more than two
outgoing connections to a single domain](https://stackoverflow.com/questions/985431/max-parallel-http-connections-in-a-browser). A single SockJS session
requires those two connections - one for downloading data, the other for
sending messages.  Opening a second SockJS session at the same time
would most likely block, and can result in both sessions timing out.

Opening more than one SockJS connection at a time is generally a
bad practice. If you absolutely must do it, you can use
multiple subdomains, using a different subdomain for every
SockJS connection.

Supported transports, by browser (html served from http:// or https://)
-----------------------------------------------------------------------

_Browser_       | _Websockets_     | _Streaming_ | _Polling_
----------------|------------------|-------------|-------------------
IE 6, 7         | no               | no          | jsonp-polling
IE 8, 9 (cookies=no) |    no       | xdr-streaming &dagger; | xdr-polling &dagger;
IE 8, 9 (cookies=yes)|    no       | iframe-htmlfile | iframe-xhr-polling
IE 10           | rfc6455          | xhr-streaming   | xhr-polling
Chrome 6-13     | hixie-76         | xhr-streaming   | xhr-polling
Chrome 14+      | hybi-10 / rfc6455| xhr-streaming   | xhr-polling
Firefox <10     | no &Dagger;      | xhr-streaming   | xhr-polling
Firefox 10+     | hybi-10 / rfc6455| xhr-streaming   | xhr-polling
Safari 5.x      | hixie-76         | xhr-streaming   | xhr-polling
Safari 6+       | rfc6455          | xhr-streaming   | xhr-polling
Opera 10.70+    | no &Dagger;      | iframe-eventsource | iframe-xhr-polling
Opera 12.10+    | rfc6455          | xhr-streaming | xhr-polling
Konqueror       | no               | no          | jsonp-polling


 * **&dagger;**: IE 8+ supports [XDomainRequest][^9], which is
    essentially a modified AJAX/XHR that can do requests across
    domains. But unfortunately it doesn't send any cookies, which
    makes it inappropriate for deployments when the load balancer uses
    JSESSIONID cookie to do sticky sessions.

 * **&Dagger;**: Firefox 4.0 and Opera 11.00 and shipped with disabled
     Websockets "hixie-76". They can still be enabled by manually
     changing a browser setting.

Supported transports, by browser (html served from file://)
-----------------------------------------------------------

Sometimes you may want to serve your html from "file://" address - for
development or if you're using PhoneGap or similar technologies. But
due to the Cross Origin Policy files served from "file://" have no
Origin, and that means some of SockJS transports won't work. For this
reason the SockJS transport table is different than usually, major
differences are:

_Browser_       | _Websockets_  | _Streaming_        | _Polling_
----------------|---------------|--------------------|-------------------
IE 8, 9         | same as above | iframe-htmlfile    | iframe-xhr-polling
Other           | same as above | iframe-eventsource | iframe-xhr-polling

Supported transports, by name
-----------------------------

_Transport_          | _References_
---------------------|---------------
websocket (rfc6455)  | [rfc 6455][^10]
websocket (hixie-76) | [draft-hixie-thewebsocketprotocol-76][^1]
websocket (hybi-10)  | [draft-ietf-hybi-thewebsocketprotocol-10][^2]
xhr-streaming        | Transport using [Cross domain XHR][^5] [streaming][^7] capability (readyState=3).
xdr-streaming        | Transport using [XDomainRequest][^9] [streaming][^7] capability (readyState=3).
eventsource          | [EventSource/Server-sent events][^4].
iframe-eventsource   | [EventSource/Server-sent events][^4] used from an [iframe via postMessage][^3].
htmlfile             | [HtmlFile][^8].
iframe-htmlfile      | [HtmlFile][^8] used from an [iframe via postMessage][^3].
xhr-polling          | Long-polling using [cross domain XHR][^5].
xdr-polling          | Long-polling using [XDomainRequest][^9].
iframe-xhr-polling   | Long-polling using normal AJAX from an [iframe via postMessage][^3].
jsonp-polling        | Slow and old fashioned [JSONP polling][^6]. This transport will show "busy indicator" (aka: "spinning wheel") when sending data.


[^1]: https://tools.ietf.org/html/draft-hixie-thewebsocketprotocol-76
[^2]: https://tools.ietf.org/html/draft-ietf-hybi-thewebsocketprotocol-10
[^3]: https://developer.mozilla.org/en/DOM/window.postMessage
[^4]: https://html.spec.whatwg.org/multipage/comms.html#server-sent-events
[^5]: https://secure.wikimedia.org/wikipedia/en/wiki/XMLHttpRequest#Cross-domain_requests
[^6]: https://secure.wikimedia.org/wikipedia/en/wiki/JSONP
[^7]: http://www.debugtheweb.com/test/teststreaming.aspx
[^8]: http://cometdaily.com/2007/11/18/ie-activexhtmlfile-transport-part-ii/
[^9]: https://blogs.msdn.microsoft.com/ieinternals/2010/05/13/xdomainrequest-restrictions-limitations-and-workarounds/
[^10]: https://www.rfc-editor.org/rfc/rfc6455.txt


Connecting to SockJS without the client
---------------------------------------

Although the main point of SockJS is to enable browser-to-server
connectivity, it is possible to connect to SockJS from an external
application. Any SockJS server complying with 0.3 protocol does
support a raw WebSocket url. The raw WebSocket url for the test server
looks like:

 * ws://localhost:8081/echo/websocket

You can connect any WebSocket RFC 6455 compliant WebSocket client to
this url. This can be a command line client, external application,
third party code or even a browser (though I don't know why you would
want to do so).


Deployment
----------

You should use a version of sockjs-client
that supports the protocol used by your server. For example:

```html
<script src="https://cdn.jsdelivr.net/sockjs/1/sockjs.min.js"></script>
```


For server-side deployment tricks, especially about load balancing and
session stickiness, take a look at the
[SockJS-node readme](https://github.com/sockjs/sockjs-node#readme).


Development and testing
-----------------------

SockJS-client needs [node.js](https://nodejs.org/) for running a test
server and JavaScript minification. If you want to work on
SockJS-client source code, checkout the git repo and follow these
steps:

    cd sockjs-client
    npm install

To generate JavaScript, run:

    gulp browserify

To generate minified JavaScript, run:

    gulp browserify:min

Both commands output into the `build` directory.

### Testing

Once you've compiled the SockJS-client you may want to check if your changes
pass all the tests.

    npm run test:browser_local

This will start [zuul](https://github.com/defunctzombie/zuul) and a test support server. Open the browser to [http://localhost:9090/_zuul](http://localhost:9090/_zuul) and watch the tests run.

Browser Quirks
--------------

There are various browser quirks which we don't intend to address:

 * Pressing ESC in Firefox, before Firefox 20, closes the SockJS connection. For a workaround
   and discussion see [#18](https://github.com/sockjs/sockjs-client/issues/18).
 * `jsonp-polling` transport will show a "spinning wheel" (aka. "busy indicator")
   when sending data.
 * You can't open more than one SockJS connection to one domain at the
   same time due to [the browser's limit of concurrent connections](https://stackoverflow.com/questions/985431/max-parallel-http-connections-in-a-browser)
   (this limit is not counting native WebSocket connections).
 * Although SockJS is trying to escape any strange Unicode characters
   (even invalid ones - [like surrogates \xD800-\xDBFF](https://en.wikipedia.org/wiki/Mapping_of_Unicode_characters#Surrogates) or [\xFFFE and \xFFFF](https://en.wikipedia.org/wiki/Unicode#Character_General_Category))
   it's advisable to use only valid characters. Using invalid
   characters is a bit slower, and may not work with SockJS servers
   that have proper Unicode support.
 * Having a global function called `onmessage` or such is probably a
   bad idea, as it could be called by the built-in `postMessage` API.
 * From SockJS' point of view there is nothing special about
   SSL/HTTPS. Connecting between unencrypted and encrypted sites
   should work just fine.
 * Although SockJS does its best to support both prefix and cookie based
   sticky sessions, the latter may not work well cross-domain with
   browsers that don't accept third-party cookies by default (Safari).
   In order to get around this make sure you're connecting to SockJS
   from the same parent domain as the main site. For example
   'sockjs.a.com' is able to set cookies if you're connecting from
   'www.a.com' or 'a.com'.
 * Trying to connect from secure "https://" to insecure "http://" is
   not a good idea. The other way around should be fine.
 * Long polling is known to cause problems on Heroku, but a
   [workaround for SockJS is available](https://github.com/sockjs/sockjs-node/issues/57#issuecomment-5242187).
 * SockJS [websocket transport is more stable over SSL](https://github.com/sockjs/sockjs-client/issues/94). If
   you're a serious SockJS user then consider using SSL
   ([more info](https://www.ietf.org/mail-archive/web/hybi/current/msg01605.html)).

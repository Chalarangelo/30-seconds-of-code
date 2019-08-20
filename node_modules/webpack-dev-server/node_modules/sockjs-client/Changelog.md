1.2.1
==
 * Revert `debug` to `^3` because v4 starts using ES6. Fixes #457

1.2.0
==
 * Update all outdated dependencies
 * Switch to karma and browserstack for running automated browser tests

1.1.5
==
 * Wrap the the contentWindow access in a try/catch block when in setTimeout #363
 * Revised example in README #356
 * Fix connection close when Transport timeout #358
 * Fixed crash with react-native@0.45.1 on Android #386
 * Update jsDelivr link #404, #405
 * Remove Sauce Labs unsupported browsers
 * Add link to rust server implementation #411
 * location.protocol should include final `:` #396

1.1.4
==
 * Upgrade `debug` and fix object key literal mangling, fixes regression in Opera 11.10 #359
 * Trim descriptions in package.json and bower.json - #372

1.1.3
==
  * Bad publish to NPM (removed)

1.1.2
==

 * Ensure both sender and receiver are cleaned upon close - #342
 * Remove event listeners before calling `close` - #344
 * Update documentation links - #351, #339, #316
 * Explicitly export `undefined` when `WebSocket` does not exist. Fixes Webpack. #321
 * Include `dist` folder on npm - #265
 * Simplify build setup
 * Update to Node.js 6.9
 * Add sourcemap for minified version
 * Remove unused String.trim shim

1.1.1
==

 * Do not pass `protocols` or `options` arguments to browser WebSocket constructor - #309

1.1.0
==

 * Fix IE7/8 usage of `console.log` which does not have `apply` - #279
 * Remove `dbg` global variable - #282
 * Bump `faye-websocket` version to `0.11.0` - #267
 * Optimize `arguments` usage - #263
 * Add sourcemap file to dist folder - #237
 * Add way to transparently pass transport-specific options - #272

1.0.3
==

 * Use `https` module for xhr requests in node when url uses https - #254

1.0.2
==

 * Fix iframe info receiver url
 * Move iframe.contentWindow check inside setTimeout - #246

1.0.1
==

 * Use proper base url for iframe-based info receiver - #249
 * Don't register unload event in chrome packaged app - #223
 * Allow custom session ids - #250
 * Remove version property from bower.json - #247
 * Update example CDN url - #244

1.0.0
===

 * Simplify url handling by delegating to `url-parse` - #242
 * Upgrade to `url-parse` 1.0.1 to fix colon issue if auth has no password

1.0.0-beta.13
===

 * Transport timeout on connection should fallback - #238

1.0.0-beta.12
====

 * Upgrade `url-parse` to 1.0.0 to fix #218 again

1.0.0-beta.10
====

 * Upgrade `url-parse` to 0.2.3 to fix #222

1.0.0-beta.9
====

 * Upgrade `url-parse` to 0.2.1 to fix 'too much recursion' errors

1.0.0-beta.8
====

 * Upgrade `url-parse` to 0.2.0 to fix inheritance issues

1.0.0-beta.7
====

 * Upgrade `url-parse` to 0.1.5 to fix #218
 * Don't strip basic auth from url - #219

1.0.0-beta.6
====

 * Upgrade `url-parse` to 0.1.3 to avoid CSP issues

1.0.0-beta.5
=====

 * Upgrade `url-parse` to 0.1.1 to fix #214

1.0.0-beta.4
=====

 * Upgrade `url-parse` to 0.1.0 and `sockjs` to 0.3.11
 * Update .npmignore

1.0.0-beta.3
=====

 * Move `debug` from devDependencies to dependencies

1.0.0-beta.2
=====

 * Relax requirements when using same origin XHR - #80
 * Upgrade to JSON3 from JSON2 - #123
 * Package library with browserify supporting the UMD pattern - #184
 * Move tests to JavaScript
 * Add Gulp.js build script
 * Fix getOrigin for file:/// urls and standard ports - #173
 * Add onerror event handlers to Websockets - #169
 * Increase RTO lower bound to prevent spurious timeouts on IE8/9 - #161
 * Use window.crypto for random values when available - #128
 * Fix handling of listeners added and removed mid-dispatch - #127
 * Fix XHR Streaming for IE8 - #83
 * Remove explicit AMD name - #107
 * Check for an empty response from /info request - #143
 * Add Content-Type to XHR requests to fix issue over HTTPS on Galaxy S4 - #164
 * Fix iframe fallback when message is sent from a popup in IE7/8 - #166
 * Add support for query strings on the url - #72
 * Now works inside of Web Workers - #181
 * Support EventSource / Server Sent Events outside of iframes - #201
 * Rename protocols to transports - #65
 * Allow transports which need the body to trigger on 'interactive' readyState - #175
 * try/catch access to document.domain - #187
 * Use `window.location` instead of `document.location` - #195
 * Allow usage from node.js with same API

0.3.4
=====

 * Mentioned njoyce's fork of sockjs-gevent.
 * #90 - Don't catch onbeforeunload event - it breaks javascript://
   links in IE.
 * IE mangles 204 response code for 1223 on ajax, see:
   http://bugs.jquery.com/ticket/1450
 * Make `new` optional for SockJS constructor (via substack).
 * It is impossible to cancel JSONP polling request - compensate for that.
 * Refactored EventEmitter prototype (used only internally)
 * #66 - Failure to post data to /xhr_send should kill the session


0.3.2
=====

 * #77 - Getting /info on modern browsers when html is served from
         file:// urls was broken.

0.3.1
=====

 * #61 - Meteor guys found that we unintentionally catch "onopen" errors.
 * #63 - Meteorjs guys found that xhr-streaming on Safari sometimes
   left busy cursor running.
 * Increased allowed time for websocket transport (from 1 rtt to 2),
   this should make ws transport more reliable over SSL, at the cost
   of slightly longer connection time for users with blocked ws.
 * #57 - previous fix didn't really work, sockjs-client still left
   a mess in browsers history when using iframe transports. This
   is fixed now.
 * #60 - Opera 12 (next) claims to do AJAX2 / CORS, but can't
   do xhr-streaming.
 * #58 - onunload test sometimes failed on Safari on windows
 * Updated readme WRT websocket protocols
 * Updated readme WRT deployments on heroku
 * Add minimalistic license block to every source file.


0.3.0
=====

 * Temporarily disabled iframe tests - they are failing unpredictably.
 * #57 - pointing an iframe to "about:blank" during cleanup caused
   Opera to messup history.
 * #55 - Improved iframe abstraction (reduced a possible mem leak)
 * Refactored AJAX abstractions, for better CORS handing - again.
 * Add additional parent origin security check to an iframe.
 * Urls with hashes or query strings can't be passed to SockJS.
 * #18 - Mention workaround for Firefox ESC key issue
 * #53 - AMD compliance
 * sockjs/sockjs-protocol#28 - always use square brackets for
   websocket frames
 * #51 - initial support for IE10 - try XHR before XDR
 * #28 - handle onunload / onbeforeunload in a more robust fashion
 * #49 - support SockJS-client being used from files served from
   file:// urls.


0.2.1
=====

 * "smoke-latency.html" test was unnecesairly sending too much data.
 * Bumped core dependencies (coffee-script and uglify-js)
 * Minor updates to the README, few cosmetic changes in the code.


0.2.0
=====

 * The API had changed - use `protocols_whitelist` option instead of
   passing  an array of protocols as a second argument to SockJS constructor.
 * Dropped 'chunking-test' functionality and replace it with 'info'.
 * Rewritten protocol-choosing alogirthm, see "utils.detectProtocols" method.
 * Use dynamic protocol timeouts based on RTT, not hardcoded 5 seconds
 * #34 - Don't ever reuse `session_id`, especially when trying
   fallback protocols.
 * The test server got moved from SockJS-client to SockJS-node.
 * Don't test unicode surrogates - it can't work in some environments.
 * XHR/XDR helpers were rewritten, ajax transports were simplified.
 * Added a domain check in the iframe to improve security.
 * SockJS will now trigger 1002 error if there is a problem during handshake
   instead of 2000 error.
 * Smoke-throughput test is renamed to smoke-latency.

0.1.2
=====

 * #29 - Allow all unicode characters to be send over SockJS.
 * #15 - SockJS should now work fine even if the connection is started
   in HEAD, before BODY is loaded.
 * #28 - In rare circumstances WebSocket connection can be left intact
   after the page is unloaded in FireFox.
 * Updated scripts to work with Node 0.6.
 * Initial work to do better QUnit testing.
 * Updated the minifying script (always escape unicode chars, remove
   trailing comment).
 * Use string instead of array of chars (utils.js:random_number_string).


0.1.1
=====

 * #21 Get JsonP transport working on IE9 (Vladimir Dronnikov).
 * #26 Emit heartbeat event.
 * #27 Include license inline.


0.1.0
=====

 * SockJS-client can only send UTF-8 encodable strings.  Previously we
   took advantage of rich data structures and automatically
   json-encoded them, but this got removed.  Now, all data passed to
   `send` will be converted to string. This is also how native
 * `status` property on `EventClose` is renamed to `code`
   as per Websocket API
   WebSockets behave.
 * The test server was updated to new `sockjs-node` API
 * Fixed problem with Jsonp-polling transport on IE9
 * Repository was moved - updated links.


0.0.4
=====

 * All transports were refactored, some transports were introduced:
   htmlfile and separate xhr-streaming.
 * Added logic to detect support for http chunking, and thus a
   possibility to rule out streaming transports before running them.
 * Added 'cookie' option, useful for cookie-based load balancing
   (currently, it make a difference only for IE).
 * Added hack to prevent EventSource from crashing Safari and Chrome.
 * Loads and loads of other small and medium changes.


0.0.2
=====

 * Initial support for JSESSIONID based load balancing. Currently
   doesn't play nicely with IE XDomainRequest transport.


0.0.1
=====

 * Initial release.

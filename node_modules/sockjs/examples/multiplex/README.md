WebSocket-multiplex SockJS example
==================================

This example is a copy of example from
[websocket-multiplex](https://github.com/sockjs/websocket-multiplex/)
project:

 * https://github.com/sockjs/websocket-multiplex/


To run this example, first install dependencies:

    npm install

And run a server:

    node server.js


That will spawn an http server at http://127.0.0.1:9999/ which will
serve both html (served from the current directory) and also SockJS
service (under the [/multiplex](http://127.0.0.1:9999/multiplex)
path).

With that set up, WebSocket-multiplex is able to push three virtual
connections over a single SockJS connection. See the code for details.

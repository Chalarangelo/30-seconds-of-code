SockJS-node Echo example
========================

To run this example, first install dependencies:

    npm install

And run a server:

    node server.js


That will spawn an http server at http://127.0.0.1:9999/ which will
serve both html (served from the current directory) and also SockJS
server (under the [/echo](http://127.0.0.1:9999/echo) path).

---
title: createHTTPServer
tags: node,beginner
firstSeen: 2021-10-14T15:26:31.821Z
lastUpdated: 2021-10-14T15:26:31.821Z
---

Create a simple http server.
- Use `http.createServer()` to create a http server with port and hostname.

```js
const http = require('http');
const host = '127.0.0.1';
const port = 3000;
  const  setupHttpServer=()=> {
const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World!');
});

server.listen(port,host)}
```
```js
setupHttpServer();
```
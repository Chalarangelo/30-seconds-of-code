---
title: Create a static file server with Node.js
shortTitle: Node.js static file server
type: story
tags: javascript,node,server
author: chalarangelo
cover: blog_images/man-cup-laptop.jpg
excerpt: Create your own static file server with Node.js in just 70 lines of code.
firstSeen: 2022-06-05T05:00:00-04:00
---

### A simple static file server

One of the simplest beginner backend projects you can create is a static file server. In its simplest form, a static file server will listen for requests and try to match the requested URL to a file on the local filesystem. Here's a minimal example of that in action:

```js
const fs = require('fs');
const http = require('http');

http.createServer((req, res) => {
  fs.readFile(__dirname + req.url, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end('404: File not found');
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    }
  });
}).listen(8000);
```

In this code example, we're using the `fs` module to read the file at `__dirname + req.url`. If the file doesn't exist, we'll return a `404` error. Otherwise, we'll return the file. The `http` module is used to create the server that listens on port `8000`.

In theory, one could stop here and have a very basic static file server. However, there are a few considerations that could be taken into account. Let's explore them one by one, and see how we can address them.

### Modularity

First and foremost, we don't necessarily want to serve files from the same directory as our Node.js server. To address this problem, we would have to change the directory `fs.readFile()` looks for the file in. To accomplish this, we can specify a directory to serve files from and use the `path` module to resolve files from that directory. This way, we can also better handle different operating systems and environments.

Here's a short snippet on how to resolve a file path using the `path` module:

```js
const fs = require('fs');
const path = require('path');

const directoryName = './public';
const requestUrl = 'index.html';

const filePath = path.join(directoryName, requestUrl);

fs.readFile(filePath, (err, data) => {
  // ...
});
```

### Security

Our next concern is security. Obviously, we don't want users prying around our machine unauthorized. Currently, it's not impossible to get access to files outside of the specified root directory (e.g. `GET /../../../`). To address this, we can use the `path` module again to check if the requested file is inside the root directory.

```js
const path = require('path');

const directoryName = './public';
const root = path.normalize(path.resolve(directoryName));

const requestUrl = 'index.html';

const filePath = path.join(root, fileName);
const isPathUnderRoot = path
  .normalize(path.resolve(filePath))
  .startsWith(root);
```

Similarly, we can ensure that users don't get access to sensitive files by checking the file type. For this to work, we can specify an array or object of supported file types and check the file's extension using the `path` module once again.

```js
const path = require('path');

const types = ['html', 'css', 'js', 'json'];

const requestUrl = 'index.html';
const extension = path.extname(requestUrl).slice(1);

const isTypeSupported = types.includes(extension);
```

### Omitting the HTML extension

A staple of most websites is the ability to omit the file extension from the URL when requesting an HTML page. It's a small quality of life improvement that users expect and it would be really nice to add to our static file server.

This is where things get a little tricky. To provide this functionality, we need to check for missing extensions and look up the appropriate HTML file. Bear in mind, though, that there are two possible matches for a URL such as `/my-page`. This path can either be matched by `/my-page.html` or `my-page/index.html`. To deal with this, we'll prioritize one over the other. In our case, we'll prioritize `/my-page.html` over `my-page/index.html`, but it's pretty easy to swap them the other way round.

To implement this, we can use the `fs` module to check if one of them exists and handle things appropriately. A special case would also need to be added for the root url (`/`) to match it to the `index.html` file.

```js
const fs = require('fs');
const path = require('path');

const directoryName = './public';
const root = path.normalize(path.resolve(directoryName));

const extension = path.extname(req.url).slice(1);
let fileName = requestUrl;

if (requestUrl === '/') fileName = 'index.html';
else if (!extension) {
  try {
    fs.accessSync(path.join(root, requestUrl + '.html'), fs.constants.F_OK);
    fileName = requestUrl + '.html';
  } catch (e) {
    fileName = path.join(requestUrl, 'index.html');
  }
}
```

### Final touches

After implementing all of the above, we can put everything together to create a static file server with all the functionality we need. I'll throw in a couple of finishing touches, such as logging requests to the console and handling a few more file types, and here's the final product:

```js
const fs = require('fs');
const http = require('http');
const path = require('path');

const port = 8000;
const directoryName = './public';

const types = {
  html: 'text/html',
  css: 'text/css',
  js: 'application/javascript',
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  gif: 'image/gif',
  json: 'application/json',
  xml: 'application/xml',
};

const root = path.normalize(path.resolve(directoryName));

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);

  const extension = path.extname(req.url).slice(1);
  const type = extension ? types[extension] : types.html;
  const supportedExtension = Boolean(type);

  if (!supportedExtension) {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('404: File not found');
    return;
  }

  let fileName = req.url;
  if (req.url === '/') fileName = 'index.html';
  else if (!extension) {
    try {
      fs.accessSync(path.join(root, req.url + '.html'), fs.constants.F_OK);
      fileName = req.url + '.html';
    } catch (e) {
      fileName = path.join(req.url, 'index.html');
    }
  }

  const filePath = path.join(root, fileName);
  const isPathUnderRoot = path
    .normalize(path.resolve(filePath))
    .startsWith(root);

  if (!isPathUnderRoot) {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('404: File not found');
    return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end('404: File not found');
    } else {
      res.writeHead(200, { 'Content-Type': type });
      res.end(data);
    }
  });
});

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
```

Not too bad, right? In just 70 lines of code, we managed to create a pretty decent static file server without using anything but core Node.js APIs.

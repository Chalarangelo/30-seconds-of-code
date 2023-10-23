---
title: Window.location Cheat Sheet
type: cheatsheet
language: javascript
tags: [browser]
cover: yellow-sofa
excerpt: A quick reference for the `window.location` object.
dateModified: 2022-12-21
---

The `window.location` object is particularly useful when **working with a page's URL information**. Let's take a look at an example of a URL and what each property of the `window.location` object represents.

```js
const url = 'https://dev.30secondsofcode.org:8000/c/js?page=2&sort=asc#search';
```

Provided the above URL, here's a quick reference for the properties `window.location` object:

### window.location.protocol

- The protocol schema of the URL (usually `http:` or `https:`)
- Sample value: `https:`

### window.location.hostname

- The domain name of the URL
- Sample value: `dev.30secondsofcode.org`

### window.location.port

- The port number of the URL
- Sample value: `8000`

### window.location.host

- The domain name and port number of the URL
- Sample value: `dev.30secondsofcode.org:8000`

### window.location.origin

- The protocol schema, domain name and port number of the URL
- Sample value: `https://dev.30secondsofcode.org:8000`

### window.location.pathname

- The path of the URL, including the leading slash
- Sample value: `/c/js`

### window.location.search

- The query string of the URL, including the leading question mark
- Sample value: `?page=2&sort=asc`

### window.location.hash

- The fragment identifier of the URL, including the leading hash
- Sample value: `#search`

### window.location.href

- The full URL, including the protocol schema, domain name, port number, path, query string and fragment identifier
- Sample value: `https://dev.30secondsofcode.org:8000/c/js?page=2&sort=asc#search`

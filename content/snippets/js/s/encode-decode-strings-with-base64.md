---
title: How to encode and decode strings with Base64 in JavaScript
shortTitle: Encode & decode strings with base64
language: javascript
tags: [string]
excerpt: Encode and decode strings with Base64 in JavaScript easily with these code snippets.
cover: thread
listed: true
dateModified: 2023-12-25
---

Converting strings to and from [Base64](https://en.wikipedia.org/wiki/Base64) is a simple operation that might come in handy every once in a while. Luckily, modern JavaScript provides some easy-to-use global helper functions for just this purpose.

## Encode a string with Base64

The `btoa()` method creates a base-64 encoded string from a String object in which each character in the string is treated as a byte of binary data.

```js
const stringToEncode = 'foobar';

const encodedString = btoa(stringToEncode); // 'Zm9vYmFy'
```

## Decode a Base64 encoded string

Conversely, the `atob()` method decodes a string of data which has been encoded using base-64 encoding.

```js
const stringToDecode = 'Zm9vYmFy';

const decodedString = atob(stringToDecode); // 'foobar'
```

## Compatibility & older Node.js versions

Luckily, both `btoa()` and `atob()` are supported in all modern browsers and **Node.js since version 16.0.0**.

If, however, you need to support older Node.js versions, you will need to use the `Buffer` class to define your own `btoa()` and `atob()` functions.

```js
const btoa = str => Buffer.from(str, 'binary').toString('base64');
const atob = str => Buffer.from(str, 'base64').toString('binary');

const stringToEncode = 'foobar';
const encodedString = btoa(stringToEncode); // 'Zm9vYmFy'

const stringToDecode = 'Zm9vYmFy';
const decodedString = atob(stringToDecode); // 'foobar'
```



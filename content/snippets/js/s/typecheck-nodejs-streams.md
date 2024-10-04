---
title: How can I check if a value implements a stream in Node.js?
shortTitle: Stream type checking
language: javascript
tags: [node,type]
excerpt: Learn how to type check for different types of streams in Node.js.
cover: mountain-lake-cottage-2
listed: true
dateModified: 2023-12-21
---

A [Stream](https://nodejs.org/api/stream.html#stream) is an **abstract interface** for working with **streaming data** in Node.js. It is designed to support many different types of streams, such as readable, writable, and duplex streams.

While specifics differ from one type to another, there are also **commonalities** that can be used to type check for a stream. On top of that, these classes are well-defined and documented, so we can use that to our advantage to type check for a specific type of stream.

## Check if value is a stream

In the most general case, we can check if a value is a stream by checking if it is an **object** and has a `pipe` property that is a function.

```js
import { createReadStream } from 'fs';

const isStream = val =>
  val !== null && typeof val === 'object' && typeof val.pipe === 'function';

isStream(createReadStream('test.txt')); // true
```

## Check if value is a readable stream

A [readable stream](https://nodejs.org/api/stream.html#readable-streams) needs to have a  `_read` function and a `_readableState` object. This is in addition to the general stream check, defined previously.

```js
import { createReadStream } from 'fs';

const isReadableStream = val =>
  val !== null &&
  typeof val === 'object' &&
  typeof val.pipe === 'function' &&
  typeof val._read === 'function' &&
  typeof val._readableState === 'object';

isReadableStream(createReadStream('test.txt')); // true
```

## Check if value is a writable stream

A [writable stream](https://nodejs.org/api/stream.html#writable-streams) needs to have a `_write` function and a `_writableState` object. This is in addition to the general stream check, defined previously.

```js
import { createWriteStream } from 'fs';

const isWritableStream = val =>
  val !== null &&
  typeof val === 'object' &&
  typeof val.pipe === 'function' &&
  typeof val._write === 'function' &&
  typeof val._writableState === 'object';

isWritableStream(createWriteStream('test.txt')); // true
```

## Check if value is a duplex stream

Finally, a [duplex stream](https://nodejs.org/api/stream.html#class-streamduplex) needs to match the conditions for both a readable and a writable stream, as defined previously.

```js
import Stream from 'stream';

const isDuplexStream = val =>
  val !== null &&
  typeof val === 'object' &&
  typeof val.pipe === 'function' &&
  typeof val._read === 'function' &&
  typeof val._readableState === 'object' &&
  typeof val._write === 'function' &&
  typeof val._writableState === 'object';

isDuplexStream(new Stream.Duplex()); // true
```

> [!NOTE]
>
> [Transform streams](https://nodejs.org/api/stream.html#class-streamtransform) are a special case of duplex streams, so they will also pass the `isDuplexStream` check.

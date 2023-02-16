---
title: "Tip: Abort a fetch request in JavaScript"
shortTitle: Abort a fetch request
type: story
tags: javascript,function
author: chalarangelo
cover: cancel-typographer
excerpt: Aborting a fetch request in JavaScript is a common problem. Here's how to handle it correctly.
firstSeen: 2022-05-15T05:00:00-04:00
---

The Fetch API is nowadays the de facto way to send asynchronous requests in JavaScript. This is in part due to the fact that the `fetch()` method accepts a multitude of useful options. One of these is the `signal` option, which can be used to abort a request. To create a valid value for this option, you can use `AbortController.signal` after creating a new instance of `AbortController`. Then, you can use `AbortController.abort()` to cancel the request at any time.

```js
// Create the AbortController
const controller = new AbortController();
const { signal } = controller;

// Perform the request
fetch('https://my.site.com/data', { signal }).then(res => console.log(res));

// Abort the request
controller.abort();
```

This is particularly useful in scenarios where a request takes too long or the response is no longer needed. You can see a common React use-case for this in the [useFetch hook](https://www.30secondsofcode.org/react/s/use-fetch).

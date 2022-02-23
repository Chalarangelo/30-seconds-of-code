---
title: What is the difference between encodeURI() and encodeURIComponent() in JavaScript?
type: question
tags: javascript,browser
author: chalarangelo
cover: blog_images/laptop-view.jpg
excerpt: JavaScript provides two methods for encoding characters to URL-safe strings. Do you know when to use each one?
firstSeen: 2021-01-07T10:41:38+02:00
lastUpdated: 2021-06-12T19:30:41+03:00
---

### encodeURIComponent()

The [`encodeURIComponent()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent) function encodes everything in the given string, except `A-Z a-z 0-9 - _ . ! ~ * ' ( )`. You should use this function if the string you are encoding is only part of a URL.

```js
const partOfURL = 'my-page#with,speci@l&/"characters"?';
const fullURL = 'https://my-website.com/my-page?query="a%b"&user=1';

encodeURIComponent(partOfURL); // Good, escapes special characters
// 'my-page%23with%2Cspeci%40l%26%2F%22characters%22%3F'

encodeURIComponent(fullURL);  // Bad, encoded URL is not valid
// 'https%3A%2F%2Fmy-website.com%2Fmy-page%3Fquery%3D%22a%25b%22%26user%3D1'
```

### encodeURI()

The [`encodeURI()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURI) function encodes everything in the given string, except `A-Z a-z 0-9 ; , / ? : @ & = + $ - _ . ! ~ * ' ( ) #`. You should use this function if the string you are encoding is a full URL.

```js
const partOfURL = 'my-page#with,speci@l&/"characters"?';
const fullURL = 'https://my-website.com/my-page?query="a%b"&user=1';

encodeURI(partOfURL); // Bad, does not escape all special characters
// 'my-page#with,speci@l&/%22characters%22?'

encodeURI(fullURL);  // Good, encoded URL is valid
// 'https://my-website.com/my-page?query=%22this%25thing%22&user=1'
```

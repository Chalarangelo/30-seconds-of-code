---
title: How do I use JavaScript to get the base URL or the URL parameters?
shortTitle: Get base URL or URL parameters
language: javascript
tags: [string,browser,regexp]
cover: blue-lake
excerpt: Master URL handling by learning how to get the base URL and the URL parameters as an object in JavaScript.
listed: true
dateModified: 2024-08-20
---

When developing for the web, it's inevitable that you'll have to manipulate URLs one way or the other. Some of the most common tasks include retrieving the base URL and extracting the URL parameters. Luckily, it only takes a few lines of JavaScript code.

## Get base URL

The **base URL** is the part of the URL that comes **before any parameters or fragment identifiers**. To get the base URL, you can use a **regular expression** to remove everything after either `'?'` or `'#'`, with the help of `String.prototype.replace()`.

```js
const getBaseURL = url => url.replace(/[?#].*$/, '');

getBaseURL('http://url.com/page?name=Adam&surname=Smith');
// 'http://url.com/page'
```

## Get URL parameters object

Similarly, you can extract the **URL parameters** as an **object** by using a **regular expression** and `String.prototype.match()` to match all key-value pairs. Then, you can use `Array.prototype.reduce()` to map and combine them into a single object.

```js
const getURLParameters = url =>
  (url.match(/([^?=&]+)(=([^&]*))/g) || []).reduce(
    (a, v) => (
      (a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1)), a
    ),
    {}
  );

getURLParameters(location.search);
// Gets the URL parameters of the current page
getURLParameters('http://url.com/page?name=Adam&surname=Smith');
// { name: 'Adam', surname: 'Smith' }
getURLParameters('google.com');
// {}
```

> [!TIP]
>
> If you want to learn how to **edit URL parameters** in JavaScript, check out the article on [editing URL parameters](/js/s/edit-url-params).

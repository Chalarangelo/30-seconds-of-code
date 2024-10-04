---
title: Parse or serialize a cookie with JavaScript
shortTitle: Parse or serialize cookie
language: javascript
tags: [browser,string]
cover: purple-sunset-beach
excerpt: Learn how to parse or serialize a cookie with JavaScript, quickly and effectively.
listed: true
dateModified: 2024-01-12
---

Cookies are **small pieces of data that are stored in the browser**. They are used to store information about the user, such as preferences, or to track user activity. Cookies are **sent to the server with every request**, and can be accessed and modified by both the client and the server.

_But how do we work with them in the browser? How do we parse a cookie string into an object, or serialize an object into a cookie string?_ Oddly enough, JavaScript doesn't have a complete API to do this, but we can easily fill in the gaps.

## Anatomy of a cookie

Before we can work with cookies, we need to understand how they are formatted. An HTTP Cookie header string is a **string of key-value pairs, separated by semicolons**. For example:

```js
const cookieString = document.cookie;
// 'foo=bar; equation=E%3Dmc%5E2'
/* This represents a cookie store with two cookie name-value pairs:
  {
    foo: 'bar',
    equation: 'E=mc^2'
  }
*/
```

A parsed cookie is the result of converting this string into an object. Serializing a cookie is the opposite process, converting an object into a string.

## Parse a cookie

Knowing how a cookie string is structured allows us to work towards parsing it.

First, we'll break it down into **individual key-value pairs**, using `String.prototype.split()`. Then, using `Array.prototype.map()` and `String.prototype.split()` we'll **separate the keys from the values** in each pair. Finally, we'll use `Array.prototype.reduce()` and `decodeURIComponent()` to **create an object** with all key-value pairs.

```js
const parseCookie = str =>
  str
    .split(';')
    .map(v => v.split('='))
    .reduce((acc, v) => {
      acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
      return acc;
    }, {});

parseCookie('foo=bar; equation=E%3Dmc%5E2');
// { foo: 'bar', equation: 'E=mc^2' }
```

## Serialize a cookie

Serializing a cookie is much more straightforward. Using **template literals** and `encodeURIComponent()` we can create the appropriate string.

```js
const serializeCookie = (name, val) =>
  `${encodeURIComponent(name)}=${encodeURIComponent(val)}`;

serializeCookie('foo', 'bar'); // 'foo=bar'
```

> [!TIP]
>
> You should read more about [how `encodeURIComponent()` works](/js/s/encodeuri-encodeuricomponent), and when to use it.

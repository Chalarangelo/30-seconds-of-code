---
title: parseCookie
tags: browser,string,intermediate
---

Parses an HTTP Cookie header string, returning an object of all cookie name-value pairs.

- Use `String.prototype.split(';')` to separate key-value pairs from each other.
- Use `Array.prototype.map()` and `String.prototype.split('=')` to separate keys from values in each pair.
- Use `Array.prototype.reduce()` and `decodeURIComponent()` to create an object with all key-value pairs.
- Use `RegExp.prototype.test()` and `Array.prototype.slice()` to check and remove double quotes that wraps values.

```js
const parseCookie = str =>
  str
    .split(';')
    .map(v => v.split('='))
    .reduce((acc, v) => {
      const v1 = v[1].trim();
      acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(/^\".*\"$/.test(v1) ? v1.slice(1, -1) : v1);
      return acc;
    }, {});
```

```js
parseCookie('foo=bar; equation=E%3Dmc%5E2');
// { foo: 'bar', equation: 'E=mc^2' }
```

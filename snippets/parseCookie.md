### parseCookie

Parse an HTTP Cookie header string and return an object of all cookie name-value pairs.

Use `String.split(';')` to separate key-value pairs from each other.
Use `Array.map()` and `String.split('=')` to separate keys from values in each pair.
Use `Array.reduce()` and `decodeURIComponent()` to create an object with all key-value pairs.

```js
const parseCookie = str =>
  str.split(';').map(v => v.split('=')).reduce((acc,v) => {acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim()); return acc},{});
```

```js
parseCookie('foo=bar; equation=E%3Dmc%5E2'); // { foo: 'bar', equation: 'E=mc^2' }
```

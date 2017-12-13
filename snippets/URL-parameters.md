### URL parameters

Use `match()` with an appropriate regular expression to get all key-value pairs, `Array.reduce()` to map and combine them into a single object.
Pass `location.search` as the argument to apply to the current `url`.

```js
const getUrlParameters = url =>
  url.match(/([^?=&]+)(=([^&]*))?/g).reduce(
    (a,v) => (a[v.slice(0,v.indexOf('='))] = v.slice(v.indexOf('=')+1), a), {}
  );
// getUrlParameters('http://url.com/page?name=Adam&surname=Smith') -> {name: 'Adam', surname: 'Smith'}
```

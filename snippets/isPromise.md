### isPromise

Returns `true` if an object looks like a [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise), `false` otherwise.

Check if the object is not `null`, its `typeof` matches either `object` or `function` and if it has a `.then` property, which is also a `function`.

```js
const isPromise = obj =>
  obj !== null && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
```

```js
isPromise({then:function () {return ''}}); // true
isPromise(null); // false
isPromise({}); // false
```

### nodeListToArray

Converts a `NodeList` to an array.

Use `Array.prototype.slice()` and `Function.prototype.call()` to convert a `NodeList` to an array.

```js
const nodeListToArray = nodeList => [...nodeList];
```

```js
nodeListToArray(document.childNodes); // [ <!DOCTYPE html>, html ]
```

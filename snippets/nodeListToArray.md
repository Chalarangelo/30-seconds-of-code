### nodeListToArray

Converts a `NodeList` to an array.

Use the spread operator (`...`) to convert a `NodeList` to an array.

```js
const nodeListToArray = nodeList => [...nodeList];
```

```js
nodeListToArray(document.childNodes); // [ <!DOCTYPE html>, html ]
```

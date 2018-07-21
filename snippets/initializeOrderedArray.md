### InitializeOrderedArray

Initializes and fills an array with the specified value.

Use `Array(n)` to create an array of the desired length.

```js
const initializeArrayWithValues = (n) => [...(Array(n).keys())];
```

```js
initializeArrayWithValues(5); // [0,1,2,3,4,5]
```

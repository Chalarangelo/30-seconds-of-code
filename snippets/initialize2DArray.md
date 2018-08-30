### initialize2DArray

Initializes a 2D array of given width and height and value.

Use `Array.from()` callback to generate h rows where each is a new array of size w initialized with value `val`. If the value is not provided, default to `null`.

```js
const initialize2DArray = (w, h, val = null) =>
  Array.from(
    { length: h },
    () => Array.from(
      { length: w },
      () => val
    )
  );
```

```js
initialize2DArray(2, 2, 0); // [[0,0], [0,0]]
```

### initialize2DArray

Initializes an 2D array of given width and height and value.

Use `.map()` to generate h rows where each is a new array of size w initialize with value.

```js
const initialize2DArray = (w, h, val = null) => 
  Array(h).fill().map(() => Array(w).fill(val));
// initializeArrayWithRange(2, 2, 0) -> [[0,0], 
//                                       [0,0]]
```

### flatten

Flattens an array.

Using a new array we concatinate it with the spread input array causing a shallow flatten

```js
const flatten = arr => [ ].concat( ...arr );
// flatten([1,[2],3,4]) -> [1,2,3,4]
```

### flatten

Flattens an array.

Use a new array and concatenate it with the spread input array causing a shallow denesting of any contained arrays.

```js
const flatten = arr => [ ].concat( ...arr );
```

```js
flatten([1,[2],3,4]) // [1,2,3,4]
```

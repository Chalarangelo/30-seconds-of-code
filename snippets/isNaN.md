### isNaN

Returns `true` if the specified value is `NaN`.

Use the strict inequality operator to check if the passed value isn't equal to itself.

```js
const isNaN = val => val !== val;
```

```js
isNaN(NaN); // true
isNaN("foo"); // false
isNaN(1); //false
isNaN("1"); //false
```

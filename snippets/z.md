### Z

Returns function that takes anonymous function. 

Z combinator allows us to use recursive anonymous function which looks like math function definition.

[See more](https://en.wikipedia.org/wiki/Fixed-point_combinator) combinators and Lambda calculus. 

```js
const Z = f => v => f(Z(f))(v)
```

```js
console.log(Z(f => x => x == 0 ? 1 : x * f(x - 1))(5)) // 120
```

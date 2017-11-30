![Logo](/logo.png)

# 30 seconds of code
> Curated collection of useful Javascript snippets that you can understand in 30 seconds or less.

- Use <kbd>Ctrl</kbd> + <kbd>F</kbd> or <kbd>command</kbd> + <kbd>F</kbd> to search for a snippet.
- Contributions welcome, please read [contribution guide](contributing.md).

## Contents

* [Even or odd number](#even-or-odd-number)
* [Fibonacci array generator](#fibonacci-array-generator)
* [Greatest common divisor (GCD)](#greatest-common-divisor-gcd)
* [Initialize array with value](#initialize-array-with-value)
* [Random number in range](#random-number-in-range)
* [Randomize order of array](#randomize-order-of-array)
* [RGB to hexadecimal](#rgb-to-hexadecimal)
* [Sort characters in string alphabetical](#sort-characters-in-string-alphabetical)
* [Sum of array of numbers](#sum-of-array-of-numbers)
* [Unique values of array](#unique-values-of-array)

### Even or odd number

Use `Math.abs()` to extend logic to negative numbers, check using the modulo (`%`) operator.
Return `true` if the number is even, `false` if the number is odd.

```js
var isEven = num => Math.abs(num) % 2 === 0;
```

### Fibonacci array generator

Create an empty array of the specific length, initializing the first two values (`0` and `1`).
Use `reduce()` to add values into the array, using the sum of the last two values, except for the first two.

```js
var fibonacci = n =>
  Array.apply(null, [0,1].concat(Array(n-2))).reduce(
    (acc, val, i) => {
      acc.push( i>1 ? acc[i-1]+acc[i-2] : val);
      return acc;
    },[]);
```

### Greatest common divisor (GCD)

Use recursion.
Base case is when `y` equals `0`. In this case, return `x`.
Otherwise, return the GCD of `y` and the remainder of the division `x/y`.

```js
var gcd = (x , y) => !y ? x : gcd(y, x % y);
```

### Initialize array with values

Use `Array(n)` to create an array of the desired length, `fill(v)` to fill it with the desired value.
You can omit `v` to use a default value of `0`.

```js
var initializeArray = (n, v = 0) =>
  Array(n).fill(v);
```

### Random number in range

Use `Math.random()` to generate a random value, map it to the desired range using multiplication.

```js
var randomInRange = (min, max) => Math.random() * (max - min) + min;
```

### Randomize order of array

Use `sort()` to reorder elements, utilizing `Math.random()` to randomize the sorting.

```js
var randomizeOrder = arr => arr.sort( (a,b) => Math.random() >= 0.5 ? -1 : 1)
```

### RGB to hexadecimal

Convert each value to a hexadecimal string, using `toString(16)`, then `padStart(2,'0')` to get a 2-digit hexadecimal value.
Combine values using `join('')`.

```js
var rgbToHex = (r, g, b) =>
  [r,g,b].map( v => v.toString(16).padStart(2,'0')).join('');
```

### Sort characters in string (alphabetical)

Split the string using `split('')`, `sort()` utilizing `localeCompare()`, recombine using `join('')`.

```js
var sortCharactersInString = str =>
  str.split('').sort( (a,b) => a.localeCompare(b) ).join('');
```

### Sum of array of numbers

Use `reduce()` to add each value to an accumulator, initialized with a value of `0`.

```js
var sum = arr =>
  arr.reduce( (acc , val) => acc + val, 0);
```

### Unique values of array

Use `reduce()` to accumulate all unique values in an array.
Check if each value has already been added, using `indexOf()` on the accumulator array.

```js
var uniqueValues = arr =>
  arr.reduce( (acc, val) => {
    if(acc.indexOf(val) === -1)
      acc.push(val);
      return acc;
  }, []);
```

## Credits

*Icons made by [Smashicons](https://www.flaticon.com/authors/smashicons) from [www.flaticon.com](https://www.flaticon.com/) is licensed by [CC 3.0 BY](http://creativecommons.org/licenses/by/3.0/).*


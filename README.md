![Logo](/logo.png)

# 30 seconds of code
> Curated collection of useful Javascript snippets that you can understand in 30 seconds or less.

- Use <kbd>Ctrl</kbd> + <kbd>F</kbd> or <kbd>command</kbd> + <kbd>F</kbd> to search for a snippet.
- Contributions welcome, please read [contribution guide](contributing.md).

## Contents

* [Anagrams of string (with duplicates)](#anagrams-of-string-with-duplicates)
* [Average of array of numbers](#average-of-array-of-numbers)
* [Capitalize first letter](#capitalize-first-letter)
* [Count occurences of a value in array](#count-occurences-of-a-value-in-array)
* [Current URL](#current-url)
* [Curry](#curry)
* [Difference between arrays](#difference-between-arrays)
* [Distance between two points](#distance-between-two-points)
* [Escape regular expression](#escape-regular-expression)
* [Even or odd number](#even-or-odd-number)
* [Factorial](#factorial)
* [Fibonacci array generator](#fibonacci-array-generator)
* [Flatten array](#flatten-array)
* [Greatest common divisor (GCD)](#greatest-common-divisor-gcd)
* [Head of list](#head-of-list)
* [Initial of list](#initial-of-list)
* [Initialize array with range](#initialize-array-with-range)
* [Initialize array with values](#initialize-array-with-values)
* [Last of list](#last-of-list)
* [Measure time taken by function](#measure-time-taken-by-function)
* [Object from key value pairs](#object-from-key-value-pairs)
* [Powerset](#powerset)
* [Random number in range](#random-number-in-range)
* [Randomize order of array](#randomize-order-of-array)
* [Redirect to url](#redirect-to-url)
* [RGB to hexadecimal](#rgb-to-hexadecimal)
* [Scroll to top](#scroll-to-top)
* [Similarity between arrays](#similarity-between-arrays)
* [Sort characters in string (alphabetical)](#sort-characters-in-string-alphabetical)
* [Sum of array of numbers](#sum-of-array-of-numbers)
* [Swap values of two variables](#swap-values-of-two-variables)
* [Tail of list](#tail-of-list)
* [Unique values of array](#unique-values-of-array)
* [URL parameters](#url-parameters)
* [UUID generator](#uuid-generator)
* [Validate number](#validate-number)

### Anagrams of string (with duplicates)

Use recursion.
For each letter in the given string, create all the partial anagrams for the rest of its letters.
Use `map()` to combine the letter with each partial anagram, then `reduce()` to combine all anagrams in one array.
Base cases are for string `length` equal to `2` or `1`.

```js
var anagrams = s => {
  if(s.length <= 2)  return s.length === 2 ? [s, s[1] + s[0]] : [s];
  return s.split('').reduce( (a,l,i) => {
    anagrams(s.slice(0,i) + s.slice(i+1)).map( v => a.push(l+v) );
    return a;
  }, []);
}
```

### Average of array of numbers

Use `reduce()` to add each value to an accumulator, initialized with a value of `0`, divide by the `length` of the array.

```js
var average = arr =>
  arr.reduce( (acc , val) => acc + val, 0) / arr.length;
```

### Capitalize first letter

Use `toUpperCase()` to capitalize first letter, `slice(1)` to get the rest of the string.

```js
var capitalize = str => str[0].toUpperCase() + str.slice(1);
```

### Count occurences of a value in array

Use `filter()` to create an array containing only the items with the specified value, count them using `length`.

```js
var countOccurences = (arr, value) => arr.filter(v => v === value).length;
```

### Current URL

Use `window.location.href` to get current URL.

```js
var currentUrl = _ => window.location.href;
```

### Curry

Use recursion.
If the number of provided arguments (`args`) is sufficient, call the passed function `f`.
Otherwise return a curried function `f` that expects the rest of the arguments.

```js
var curry = f =>
  (...args) =>
    args.length >= f.length ? f(...args) : (...otherArgs) => curry(f)(...args, ...otherArgs)
```

### Difference between arrays

Use `filter()` to remove values that are part of `values`, determined using `indexOf()`.

```js
var difference = (arr, values) =>
  arr.filter(v => values.indexOf(v) === -1);
```

### Distance between two points

Use `Math.pow()` and `Math.sqrt()` to calculate the Euclidean distance between two points.

```js
var distance = x0, y0, x1, y1 =>
  Math.sqrt(Math.pow(x1-x0, 2) + Math.pow(y1 - y0, 2))
```

### Escape regular expression

Use `replace()` to escape special characters.

```js
var escapeRegExp = s =>
  s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
```

### Even or odd number

Use `Math.abs()` to extend logic to negative numbers, check using the modulo (`%`) operator.
Return `true` if the number is even, `false` if the number is odd.

```js
var isEven = num => Math.abs(num) % 2 === 0;
```

### Factorial

Create an array of length `n+1`, use `reduce()` to get the product of every value in the given range, utilizing the index of each element.

```js
var factorial = n =>
  Array.apply(null, [1].concat(Array(n))).reduce( (a, _, i) => a * i || 1 , 1);
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

### Flatten array

Use recursion.
Use `reduce()` to get all elements that are not arrays, flatten each element that is an array.

```js
var flatten = arr =>
  arr.reduce( (a, v) => a.concat( Array.isArray(v) ? flatten(v) : v ), []);
```

### Greatest common divisor (GCD)

Use recursion.
Base case is when `y` equals `0`. In this case, return `x`.
Otherwise, return the GCD of `y` and the remainder of the division `x/y`.

```js
var gcd = (x , y) => !y ? x : gcd(y, x % y);
```

### Head of list

Return `arr[0]`.

```js
var head = arr => arr[0];
```

### Initial of list

Return `arr.slice(0,-1)`.

```js
var initial = arr => arr.slice(0,-1);
```

### Initialize array with range

Use `Array(end-start)` to create an array of the desired length, `map()` to fill with the desired values in a range.
You can omit `start` to use a default value of `0`.

```js
var initializeArrayRange = (end, start = 0) =>
  Array.apply(null, Array(end-start)).map( (v,i) => i + start );
```

### Initialize array with values

Use `Array(n)` to create an array of the desired length, `fill(v)` to fill it with the desired values.
You can omit `v` to use a default value of `0`.

```js
var initializeArray = (n, v = 0) =>
  Array(n).fill(v);
```

### Last of list

Return `arr.slice(-1)[0]`.

```js
var initial = arr => arr.slice(-1)[0];
```

### Measure time taken by function

Use `performance.now()` to get start and end time for the function, `console.log()` the time taken.
First argument is the function name, subsequent arguments are passed to the function.

```js
var timeTaken = (f,...args) => {
  var t0 = performance.now(), r = f(...args);
  console.log({performance.now() - t0);
  return r;
}
```

### Object from key-value pairs

Use `map()` to create objects for each key-value pair, combine with `Object.assign()`.

```js
var objectFromPairs = arr =>
  Object.assign(...arr.map( v => {return {[v[0]] : v[1]};} ));
```

### Powerset

Use `reduce()` combined with `map()` to iterate over elements and combine into an array containing all combinations. 

```js
var powerset = arr =>
  arr.reduce( (a,v) => a.concat(a.map( r => [v].concat(r) )), [[]]);
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

### Redirect to URL

Use `window.location.href` or `window.location.replace()` to redirect to `url`.
Pass a second argument to simulate a link click (`true` - default) or an HTTP redirect (`false`).

```js
var redirect = (url, asLink = true) =>
  asLink ? window.location.href = url : window.location.replace(url);
```

### RGB to hexadecimal

Convert each value to a hexadecimal string, using `toString(16)`, then `padStart(2,'0')` to get a 2-digit hexadecimal value.
Combine values using `join('')`.

```js
var rgbToHex = (r, g, b) =>
  [r,g,b].map( v => v.toString(16).padStart(2,'0')).join('');
```

### Scroll to top

Get distance from top using `document.documentElement.scrollTop` or `document.body.scrollTop`.
Scroll by a fraction of the distance from top. Use `window.requestFrame()` to animate the scrolling.

```js
var scrollToTop = _ => {
  var c = document.documentElement.scrollTop || document.body.scrollTop;
  if(c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c/8);
  }
}
```

### Similarity between arrays

Use `filter()` to remove values that are not part of `values`, determined using `indexOf()`.

```js
var difference = (arr, values) =>
  arr.filter(v => values.indexOf(v) !== -1);
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

### Swap values of two variables

Use array destructuring to swap values between two variables.

```js
[varA, varB] = [varB, varA];
```

### Tail of list

Return `arr.slice(1)`.

```js
var tail = arr => arr.slice(1);
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

### URL parameters

Use `match()` with an appropriate regular expression to get all key-value pairs, `map()` them appropriately.
Combine all key-value pairs into a single object using `Object.assign()` and the spread operator (`...`).
Pass `location.search` as the argument to apply to the current `url`.

```js
var getUrlParameters = url =>
  Object.assign(...url.match(/([^?=&]+)(=([^&]*))?/g).map(m => {[f,v] = m.split('='); return {[f]:v}}));
```

### UUID generator

Use `crypto` API to generate a UUID, compliant with [RFC4122](https://www.ietf.org/rfc/rfc4122.txt) version 4.

```js
var uuid = _ =>
  ( [1e7]+-1e3+-4e3+-8e3+-1e11 ).replace( /[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  )
```

### Validate number

Use `!isNaN` in combination with `parseFloat()` to check if the argument is a number.
Use `isFinite()` to check if the number is finite.

```js
var validateNumber = n => !isNaN(parseFloat(n)) && isFinite(n);
```

## Credits

*Icons made by [Smashicons](https://www.flaticon.com/authors/smashicons) from [www.flaticon.com](https://www.flaticon.com/) is licensed by [CC 3.0 BY](http://creativecommons.org/licenses/by/3.0/).*


![Logo](/logo.png)

# 30 seconds of code [![Gitter chat](https://badges.gitter.im/gitterHQ/gitter.png)](https://gitter.im/30-seconds-of-code/Lobby)
> Curated collection of useful Javascript snippets that you can understand in 30 seconds or less.

- Use <kbd>Ctrl</kbd> + <kbd>F</kbd> or <kbd>command</kbd> + <kbd>F</kbd> to search for a snippet.
- Contributions welcome, please read the [contribution guide](CONTRIBUTING.md).
- Snippets are written in ES6, use the [Babel transpiler](https://babeljs.io/) to ensure backwards-compatibility.

## Contents

* [Anagrams of string (with duplicates)](#anagrams-of-string-with-duplicates)
* [Array difference](#array-difference)
* [Array intersection](#array-intersection)
* [Array union](#array-union)
* [Average of array of numbers](#average-of-array-of-numbers)
* [Bottom visible](#bottom-visible)
* [Capitalize first letter of every word](#capitalize-first-letter-of-every-word)
* [Capitalize first letter](#capitalize-first-letter)
* [Chain asynchronous functions](#chain-asynchronous-functions)
* [Check for palindrome](#check-for-palindrome)
* [Chunk array](#chunk-array)
* [Compact](#compact)
* [Count occurrences of a value in array](#count-occurrences-of-a-value-in-array)
* [Current URL](#current-url)
* [Curry](#curry)
* [Deep flatten array](#deep-flatten-array)
* [Distance between two points](#distance-between-two-points)
* [Divisible by number](#divisible-by-number)
* [Escape regular expression](#escape-regular-expression)
* [Even or odd number](#even-or-odd-number)
* [Factorial](#factorial)
* [Fibonacci array generator](#fibonacci-array-generator)
* [Filter out non unique values in an array](#filter-out-non-unique-values-in-an-array)
* [Flatten array](#flatten-array)
* [Get max value from array](#get-max-value-from-array)
* [Get min value from array](#get-min-value-from-array)
* [Get native type of value](#get-native-type-of-value)
* [Get scroll position](#get-scroll-position)
* [Greatest common divisor (GCD)](#greatest-common-divisor-gcd)
* [Hamming distance](#hamming-distance)
* [Head of list](#head-of-list)
* [Initial of list](#initial-of-list)
* [Initialize array with range](#initialize-array-with-range)
* [Initialize array with values](#initialize-array-with-values)
* [Last of list](#last-of-list)
* [Measure time taken by function](#measure-time-taken-by-function)
* [Median of array of numbers](#median-of-array-of-numbers)
* [Object from key value pairs](#object-from-key-value-pairs)
* [Object to key value pairs](#object-to-key-value-pairs)
* [Ordinal suffix of number](#ordinal-suffix-of-number)
* [Percentile](#percentile)
* [Pick](#pick)
* [Pipe](#pipe)
* [Powerset](#powerset)
* [Promisify](#promisify)
* [Random integer in range](#random-integer-in-range)
* [Random number in range](#random-number-in-range)
* [Randomize order of array](#randomize-order-of-array)
* [Redirect to URL](#redirect-to-url)
* [Reverse a string](#reverse-a-string)
* [RGB to hexadecimal](#rgb-to-hexadecimal)
* [Run promises in series](#run-promises-in-series)
* [Scroll to top](#scroll-to-top)
* [Shuffle array values](#shuffle-array-values)
* [Similarity between arrays](#similarity-between-arrays)
* [Sort characters in string (alphabetical)](#sort-characters-in-string-alphabetical)
* [Sum of array of numbers](#sum-of-array-of-numbers)
* [Swap values of two variables](#swap-values-of-two-variables)
* [Tail of list](#tail-of-list)
* [Truncate a string](#truncate-a-string)
* [Unique values of array](#unique-values-of-array)
* [URL parameters](#url-parameters)
* [UUID generator](#uuid-generator)
* [Validate number](#validate-number)
* [Value or default](#value-or-default)

### Anagrams of string (with duplicates)

Use recursion.
For each letter in the given string, create all the partial anagrams for the rest of its letters.
Use `Array.map()` to combine the letter with each partial anagram, then `Array.reduce()` to combine all anagrams in one array.
Base cases are for string `length` equal to `2` or `1`.

```js
const anagrams = str => {
  if (str.length <= 2) return str.length === 2 ? [str, str[1] + str[0]] : [str];
  return str.split('').reduce((acc, letter, i) =>
    acc.concat(anagrams(str.slice(0, i) + str.slice(i + 1)).map(val => letter + val)), []);
};
// anagrams('abc') -> ['abc','acb','bac','bca','cab','cba']
```

### Array difference (complement)

Create a `Set` from `b`, then use `Array.filter()` on `a` to only keep values not contained in `b`.

```js
const difference = (a, b) => { const s = new Set(b); return a.filter(x => !s.has(x)); }
// difference([1,2,3], [1,2]) -> [3]
```

### Array intersection (Common values between two arrays)

Create a `Set` from `b`, then use `Array.filter()` on `a` to only keep values contained in `b`.

```js
const intersection = (a, b) => { const s = new Set(b); return a.filter(x => s.has(x)); }
// intersection([1,2,3], [4,3,2]) -> [2,3]
```

### Array union

Create a `Set` with all values of `a` and `b` and convert to an array.

```js
const union = (a, b) => Array.from(new Set([...a, ...b]))
// union([1,2,3], [4,3,2]) -> [1,2,3,4]
```

### Average of array of numbers

Use `Array.reduce()` to add each value to an accumulator, initialized with a value of `0`, divide by the `length` of the array.

```js
const average = arr => arr.reduce((acc, val) => acc + val, 0) / arr.length;
// average([1,2,3]) -> 2
```

### Bottom visible

Use `scrollY`, `scrollHeight` and `clientHeight` to determine if the bottom of the page is visible.

```js
const bottomVisible = _ =>
  document.documentElement.clientHeight + window.scrollY >= document.documentElement.scrollHeight || document.documentElement.clientHeight;
// bottomVisible() -> true
```

### Capitalize first letter of every word

Use `replace()` to match the first character of each word and `toUpperCase()` to capitalize it.

```js
const capitalizeEveryWord = str => str.replace(/\b[a-z]/g, char => char.toUpperCase());
// capitalizeEveryWord('hello world!') -> 'Hello World!'
```

### Capitalize first letter

Use `slice(0,1)` and `toUpperCase()` to capitalize first letter, `slice(1)` to get the rest of the string.
Omit the `lowerRest` parameter to keep the rest of the string intact, or set it to `true` to convert to lower case.

```js
const capitalize = (str, lowerRest = false) =>
  str.slice(0, 1).toUpperCase() + (lowerRest ? str.slice(1).toLowerCase() : str.slice(1));
// capitalize('myName', true) -> 'Myname'
```

### Chain asynchronous functions

Loop through an array of functions containing asynchronous events, calling `next` when each asynchronous event has completed.

```js
const chainAsync = fns => { let curr = 0; const next = () => fns[curr++](next); next(); };
/*
chainAsync([
  next => { console.log('0 seconds'); setTimeout(next, 1000); },
  next => { console.log('1 second');  setTimeout(next, 1000); },
  next => { console.log('2 seconds'); }
])
*/
```

### Check for palindrome

Convert string `toLowerCase()` and use `replace()` to remove non-alphanumeric characters from it.
Then, `split('')` into individual characters, `reverse()`, `join('')` and compare to the original, unreversed string, after converting it `tolowerCase()`.

```js
const palindrome = str => {
  const s = str.toLowerCase().replace(/[\W_]/g,'');
  return s === s.split('').reverse().join('');
}
// palindrome('taco cat') -> true
 ```

### Chunk array

Use `Array.apply()` to create a new array, that fits the number of chunks that will be produced.
Use `Array.map()` to map each element of the new array to a chunk the length of `size`.
If the original array can't be split evenly, the final chunk will contain the remaining elements.

```js
const chunk = (arr, size) =>
  Array.apply(null, {length: Math.ceil(arr.length / size)}).map((v, i) => arr.slice(i * size, i * size + size));
// chunk([1,2,3,4,5], 2) -> [[1,2],[3,4],5]
```

### Compact

Use `Array.filter()` to filter out falsey values (`false`, `null`, `0`, `""`, `undefined`, and `NaN`).

```js
const compact = (arr) => arr.filter(v => v);
// compact([0, 1, false, 2, '', 3, 'a', 'e'*23, NaN, 's', 34]) -> [ 1, 2, 3, 'a', 's', 34 ]
```

### Count occurrences of a value in array

Use `Array.reduce()` to increment a counter each time you encounter the specific value inside the array.

```js
const countOccurrences = (arr, value) => arr.reduce((a, v) => v === value ? a + 1 : a + 0, 0);
// countOccurrences([1,1,2,1,2,3], 1) -> 3
```

### Current URL

Use `window.location.href` to get current URL.

```js
const currentUrl = _ => window.location.href;
// currentUrl() -> 'https://google.com'
```

### Curry

Use recursion.
If the number of provided arguments (`args`) is sufficient, call the passed function `f`.
Otherwise return a curried function `f` that expects the rest of the arguments.
If you want to curry a function that accepts a variable number of arguments (a variadic function, e.g. `Math.min()`), you can optionally pass the number of arguments to the second parameter `arity`.

```js
const curry = (f, arity = f.length, next) =>
  (next = prevArgs =>
    nextArg => {
      const args = [ ...prevArgs, nextArg ];
      return args.length >= arity ? f(...args) : next(args);
    }
  )([]);
// curry(Math.pow)(2)(10) -> 1024
// curry(Math.min, 3)(10)(50)(2) -> 2
```

### Deep flatten array

Use recursion.
Use `Array.reduce()` to get all elements that are not arrays, flatten each element that is an array.

```js
const deepFlatten = arr =>
  arr.reduce((a, v) => a.concat(Array.isArray(v) ? deepFlatten(v) : v), []);
// deepFlatten([1,[2],[[3],4],5]) -> [1,2,3,4,5]
```

### Distance between two points

Use `Math.hypot()` to calculate the Euclidean distance between two points.

```js
const distance = (x0, y0, x1, y1) => Math.hypot(x1 - x0, y1 - y0);
// distance(1,1, 2,3) -> 2.23606797749979
```

### Divisible by number

Use the modulo operator (`%`) to check if the remainder is equal to `0`.

```js
const isDivisible = (dividend, divisor) => dividend % divisor === 0;
// isDivisible(6,3) -> true
```

### Escape regular expression

Use `replace()` to escape special characters.

```js
const escapeRegExp = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
// escapeRegExp('(test)') -> \\(test\\)
```

### Even or odd number

Use `Math.abs()` to extend logic to negative numbers, check using the modulo (`%`) operator.
Return `true` if the number is even, `false` if the number is odd.

```js
const isEven = num => Math.abs(num) % 2 === 0;
// isEven(3) -> false
```

### Factorial

Use recursion.
If `n` is less than or equal to `1`, return `1`.
Otherwise, return the product of `n` and the factorial of `n - 1`.

```js
const factorial = n => n <= 1 ? 1 : n * factorial(n - 1);
// factorial(6) -> 720
```

### Fibonacci array generator

Create an empty array of the specific length, initializing the first two values (`0` and `1`).
Use `Array.reduce()` to add values into the array, using the sum of the last two values, except for the first two.

```js
const fibonacci = n =>
  Array(n).fill(0).reduce((acc, val, i) => acc.concat(i > 1 ? acc[i - 1] + acc[i - 2] : i), []);
// fibonacci(5) -> [0,1,1,2,3]
```

### Filter out non-unique values in an array

Use `Array.filter()` for an array containing only the unique values.

```js
const filterNonUnique = arr => arr.filter(i => arr.indexOf(i) === arr.lastIndexOf(i));
// filterNonUnique([1,2,2,3,4,4,5]) -> [1,3,5]
```

### Flatten array

Use `Array.reduce()` to get all elements inside the array and `concat()` to flatten them.

```js
const flatten = arr => arr.reduce((a, v) => a.concat(v), []);
// flatten([1,[2],3,4]) -> [1,2,3,4]
```

### Get max value from array

Use `Math.max()` combined with the spread operator (`...`) to get the maximum value in the array.

```js
const arrayMax = arr => Math.max(...arr);
// arrayMax([10, 1, 5]) -> 10
```

### Get min value from array

Use `Math.min()` combined with the spread operator (`...`) to get the minimum value in the array.

```js
const arrayMin = arr => Math.min(...arr);
// arrayMin([10, 1, 5]) -> 1
```

### Get native type of value

Returns lower-cased constructor name of value, "undefined" or "null" if value is undefined or null

```js
const getType = v =>
  v === undefined ? 'undefined' : v === null ? 'null' : v.constructor.name.toLowerCase();
// getType(new Set([1,2,3])) -> "set"
```

### Get scroll position

Use `pageXOffset` and `pageYOffset` if they are defined, otherwise `scrollLeft` and `scrollTop`.
You can omit `el` to use a default value of `window`.

```js
const getScrollPos = (el = window) =>
  ({x: (el.pageXOffset !== undefined) ? el.pageXOffset : el.scrollLeft,
    y: (el.pageYOffset !== undefined) ? el.pageYOffset : el.scrollTop});
// getScrollPos() -> {x: 0, y: 200}
```

### Greatest common divisor (GCD)

Use recursion.
Base case is when `y` equals `0`. In this case, return `x`.
Otherwise, return the GCD of `y` and the remainder of the division `x/y`.

```js
const gcd = (x, y) => !y ? x : gcd(y, x % y);
// gcd (8, 36) -> 4
```

### Hamming distance

Use XOR operator (`^`) to find the bit difference between the two numbers, convert to binary string using `toString(2)`.
Count and return the number of `1`s in the string, using `match(/1/g)`.

```js
const hammingDistance = (num1, num2) =>
  ((num1 ^ num2).toString(2).match(/1/g) || '').length;
// hammingDistance(2,3) -> 1
```

### Head of list

Return `arr[0]`.

```js
const head = arr => arr[0];
// head([1,2,3]) -> 1
```

### Initial of list

Return `arr.slice(0,-1)`.

```js
const initial = arr => arr.slice(0, -1);
// initial([1,2,3]) -> [1,2]
```

### Initialize array with range

Use `Array(end-start)` to create an array of the desired length, `Array.map()` to fill with the desired values in a range.
You can omit `start` to use a default value of `0`.

```js
const initializeArrayRange = (end, start = 0) =>
  Array.apply(null, Array(end - start)).map((v, i) => i + start);
// initializeArrayRange(5) -> [0,1,2,3,4]
```

### Initialize array with values

Use `Array(n)` to create an array of the desired length, `fill(v)` to fill it with the desired values.
You can omit `value` to use a default value of `0`.

```js
const initializeArray = (n, value = 0) => Array(n).fill(value);
// initializeArray(5, 2) -> [2,2,2,2,2]
```

### Last of list

Return `arr.slice(-1)[0]`.

```js
const last = arr => arr.slice(-1)[0];
// last([1,2,3]) -> 3
```

### Measure time taken by function

Use `performance.now()` to get start and end time for the function, `console.log()` the time taken.
Pass a callback function as the argument.

```js
const timeTaken = callback => {
  const t0 = performance.now(), r = callback();
  console.log(performance.now() - t0);
  return r;
};
// timeTaken(() => Math.pow(2, 10)) -> 1024 (0.010000000009313226 logged in console)
```

### Median of array of numbers

Find the middle of the array, use `Array.sort()` to sort the values.
Return the number at the midpoint if `length` is odd, otherwise the average of the two middle numbers.

```js
const median = arr => {
  const mid = Math.floor(arr.length / 2), nums = arr.sort((a, b) => a - b);
  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};
// median([5,6,50,1,-5]) -> 5
// median([0,10,-2,7]) -> 3.5
```

### Object from key-value pairs

Use `Array.reduce()` to create and combine key-value pairs.

```js
const objectFromPairs = arr => arr.reduce((a, v) => (a[v[0]] = v[1], a), {});
// objectFromPairs([['a',1],['b',2]]) -> {a: 1, b: 2}
```

### Object to key-value pairs

Use `Object.keys()` and `Array.map()` to iterate over the object's keys and produce an array with key-value pairs.

```js
const objectToPairs = obj => Object.keys(obj).map(k => [k, obj[k]]);
// objectToPairs({a: 1, b: 2}) -> [['a',1],['b',2]])
```

### Ordinal suffix of number

Use the modulo operator (`%`) to find values of single and tens digits.
Find which ordinal pattern digits match.
If digit is found in teens pattern, use teens ordinal.

```js
const toOrdinalSuffix = num => {
  const int = parseInt(num), digits = [(int % 10), (int % 100)],
    ordinals = ["st", "nd", "rd", "th"], oPattern = [1,2,3,4],
    tPattern = [11, 12, 13, 14, 15, 16, 17, 18, 19]
  return oPattern.includes(digits[0]) && !tPattern.includes(digits[1]) ? int + ordinals[digits[0]-1] : int + ordinals[3];
}
// toOrdinalSuffix("123") -> "123rd"
```

### Percentile

Use `Array.reduce()` to calculate how many numbers are below the value and how many are the same value and
apply the percentile formula.

```js
const percentile = (arr, val) => 
  100 * arr.reduce((acc,v) => acc + (v < val ? 1 : 0) + (v === val ? 0.5 : 0), 0) / arr.length;
// percentile([1,2,3,4,5,6,7,8,9,10], 6) -> 55
 ```

### Pick

Use `Array.reduce()` to convert the filtered/picked keys back to a object with the corresponding key:value pair if the key exist in the obj.

```js
const pick = (obj, arr) =>
  arr.reduce((acc, curr) => (curr in obj && (acc[curr] = obj[curr]), acc), {});
// pick({ 'a': 1, 'b': '2', 'c': 3 }, ['a', 'c']) -> { 'a': 1, 'c': 3 }
// pick(object, ['a', 'c'])['a'] -> 1
```

### Pipe

Use `Array.reduce()` to pass value through functions.

```js
const pipe = (...funcs) => arg => funcs.reduce((acc, func) => func(acc), arg);
// pipe(btoa, x => x.toUpperCase())("Test") -> "VGVZDA=="
```

### Powerset

Use `Array.reduce()` combined with `Array.map()` to iterate over elements and combine into an array containing all combinations.

```js
const powerset = arr =>
  arr.reduce((a, v) => a.concat(a.map(r => [v].concat(r))), [[]]);
// powerset([1,2]) -> [[], [1], [2], [2,1]]
```

### Promisify

Use currying to return a function returning a `Promise` that calls the original function. 
Use the `...rest` operator to pass in all the parameters. 

*In Node 8+, you can use [`util.promisify`](https://nodejs.org/api/util.html#util_util_promisify_original)*

```js
const promisify = func =>
  (...args) =>
    new Promise((resolve, reject) =>
      func(...args, (err, result) =>
        err ? reject(err) : resolve(result))
    );
// const delay = promisify((d, cb) => setTimeout(cb, d))
// delay(2000).then(() => console.log('Hi!')) -> Promise resolves after 2s
```

### Random integer in range

Use `Math.random()` to generate a random number and map it to the desired range, using `Math.floor()` to make it an integer.

```js
const randomIntegerInRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
// randomIntegerInRange(0, 5) -> 2
```

### Random number in range

Use `Math.random()` to generate a random value, map it to the desired range using multiplication.

```js
const randomInRange = (min, max) => Math.random() * (max - min) + min;
// randomInRange(2,10) -> 6.0211363285087005
```

### Randomize order of array

Use `Array.sort()` to reorder elements, utilizing `Math.random()` to randomize the sorting.

```js
const randomizeOrder = arr => arr.sort((a, b) => Math.random() >= 0.5 ? -1 : 1);
// randomizeOrder([1,2,3]) -> [1,3,2]
```

### Redirect to URL

Use `window.location.href` or `window.location.replace()` to redirect to `url`.
Pass a second argument to simulate a link click (`true` - default) or an HTTP redirect (`false`).

```js
const redirect = (url, asLink = true) =>
  asLink ? window.location.href = url : window.location.replace(url);
// redirect('https://google.com')
```

### Reverse a string

Use array destructuring and `Array.reverse()` to reverse the order of the characters in the string.
Combine characters to get a string using `join('')`.

```js
const reverseString = str => [...str].reverse().join('');
// reverseString('foobar') -> 'raboof'
```

### RGB to hexadecimal

Convert given RGB parameters to hexadecimal string using bitwise left-shift operator (`<<`) and `toString(16)`, then `padStart(6,'0')` to get a 6-digit hexadecimal value.

```js
const rgbToHex = (r, g, b) => ((r << 16) + (g << 8) + b).toString(16).padStart(6, '0');
// rgbToHex(255, 165, 1) -> 'ffa501'
```

### Run promises in series

Run an array of promises in series using `Array.reduce()` by creating a promise chain, where each promise returns the next promise when resolved.

```js
const series = ps => ps.reduce((p, next) => p.then(next), Promise.resolve());
// const delay = (d) => new Promise(r => setTimeout(r, d))
// series([() => delay(1000), () => delay(2000)]) -> executes each promise sequentially, taking a total of 3 seconds to complete
```

### Scroll to top

Get distance from top using `document.documentElement.scrollTop` or `document.body.scrollTop`.
Scroll by a fraction of the distance from top. Use `window.requestAnimationFrame()` to animate the scrolling.

```js
const scrollToTop = _ => {
  const c = document.documentElement.scrollTop || document.body.scrollTop;
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c / 8);
  }
};
// scrollToTop()
```

### Shuffle array values

Create an array of random values by using `Array.map()` and `Math.random()`.
Use `Array.sort()` to sort the elements of the original array based on the random values.

```js
const shuffle = arr => {
  let r = arr.map(Math.random);
  return arr.sort((a, b) => r[a] - r[b]);
};
// shuffle([1,2,3]) -> [2, 1, 3]
```

### Similarity between arrays

Use `filter()` to remove values that are not part of `values`, determined using `includes()`.

```js
const similarity = (arr, values) => arr.filter(v => values.includes(v));
// similarity([1,2,3], [1,2,4]) -> [1,2]
```

### Sort characters in string (alphabetical)

Split the string using `split('')`, `Array.sort()` utilizing `localeCompare()`, recombine using `join('')`.

```js
const sortCharactersInString = str =>
  str.split('').sort((a, b) => a.localeCompare(b)).join('');
// sortCharactersInString('cabbage') -> 'aabbceg'
```

### Sum of array of numbers

Use `Array.reduce()` to add each value to an accumulator, initialized with a value of `0`.

```js
const sum = arr => arr.reduce((acc, val) => acc + val, 0);
// sum([1,2,3,4]) -> 10
```

### Swap values of two variables

Use array destructuring to swap values between two variables.

```js
[varA, varB] = [varB, varA];
// [x, y] = [y, x]
```

### Tail of list

Return `arr.slice(1)` if the array's `length` is more than `1`, otherwise return the whole array.

```js
const tail = arr => arr.length > 1 ? arr.slice(1) : arr;
// tail([1,2,3]) -> [2,3]
// tail([1]) -> [1]
```

### Truncate a String

Determine if the string's `length` is greater than `num`.
Return the string truncated to the desired length, with `...` appended to the end or the original string.

```js
const truncate = (str, num) =>
  str.length > num ? str.slice(0, num > 3 ? num - 3 : num) + '...' : str;
// truncate('boomerang', 7) -> 'boom...'
```

### Unique values of array

Use ES6 `Set` and the `...rest` operator to discard all duplicated values.

```js
const unique = arr => [...new Set(arr)];
// unique([1,2,2,3,4,4,5]) -> [1,2,3,4,5]
```

### URL parameters

Use `match()` with an appropriate regular expression to get all key-value pairs, `Array.reduce()` to map and combine them into a single object.
Pass `location.search` as the argument to apply to the current `url`.

```js
const getUrlParameters = url =>
  url.match(/([^?=&]+)(=([^&]*))?/g).reduce(
    (a, v) => (a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1), a), {}
  );
// getUrlParameters('http://url.com/page?name=Adam&surname=Smith') -> {name: 'Adam', surname: 'Smith'}
```

### UUID generator

Use `crypto` API to generate a UUID, compliant with [RFC4122](https://www.ietf.org/rfc/rfc4122.txt) version 4.

```js
const uuid = _ =>
  ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
// uuid() -> '7982fcfe-5721-4632-bede-6000885be57d'
```

### Validate number

Use `!isNaN` in combination with `parseFloat()` to check if the argument is a number.
Use `isFinite()` to check if the number is finite.
Use `Number()` to check if the coercion holds.

```js
const validateNumber = n => !isNaN(parseFloat(n)) && isFinite(n) && Number(n) == n;
// validateNumber('10') -> true
```

### Value or default

Returns value, or default value if passed value is `falsy`.

```js
const valueOrDefault = (value, d) => value || d;
// valueOrDefault(NaN, 30) -> 30
```

## Credits

*Icons made by [Smashicons](https://www.flaticon.com/authors/smashicons) from [www.flaticon.com](https://www.flaticon.com/) is licensed by [CC 3.0 BY](http://creativecommons.org/licenses/by/3.0/).*


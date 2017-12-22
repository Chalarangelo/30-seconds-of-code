![Logo](/logo.png)

# 30 seconds of code 
[![Gitter chat](https://badges.gitter.im/gitterHQ/gitter.png)](https://gitter.im/30-seconds-of-code/Lobby) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com) [![Travis Build](https://travis-ci.org/Chalarangelo/30-seconds-of-code.svg?branch=master)](https://travis-ci.org/Chalarangelo/30-seconds-of-code) [![Insight.io](https://img.shields.io/badge/insight.io-Ready-brightgreen.svg)](https://insight.io/github.com/Chalarangelo/30-seconds-of-code/tree/master/?source=0) [![js-semistandard-style](https://img.shields.io/badge/code%20style-semistandard-brightgreen.svg?style=flat-square)](https://github.com/Flet/semistandard)

> Curated collection of useful Javascript snippets that you can understand in 30 seconds or less.


- Use <kbd>Ctrl</kbd> + <kbd>F</kbd> or <kbd>command</kbd> + <kbd>F</kbd> to search for a snippet.
- Contributions welcome, please read the [contribution guide](CONTRIBUTING.md).
- Snippets are written in ES6, use the [Babel transpiler](https://babeljs.io/) to ensure backwards-compatibility.
- You can import these snippets into Alfred 3, using [this file](https://github.com/lslvxy/30-seconds-of-code-alfredsnippets).

## Table of Contents

### Adapter
* [`promisify`](#promisify)
* [`spreadOver`](#spreadover)

### Array
* [`arrayGcd`](#arraygcd)
* [`arrayLcm`](#arraylcm)
* [`arrayMax`](#arraymax)
* [`arrayMin`](#arraymin)
* [`chunk`](#chunk)
* [`compact`](#compact)
* [`countOccurrences`](#countoccurrences)
* [`deepFlatten`](#deepflatten)
* [`difference`](#difference)
* [`differenceWith`](#differencewith)
* [`distinctValuesOfArray`](#distinctvaluesofarray)
* [`dropElements`](#dropelements)
* [`dropRight`](#dropright)
* [`everyNth`](#everynth)
* [`filterNonUnique`](#filternonunique)
* [`flatten`](#flatten)
* [`flattenDepth`](#flattendepth)
* [`groupBy`](#groupby)
* [`head`](#head)
* [`initial`](#initial)
* [`initialize2DArray`](#initialize2darray)
* [`initializeArrayWithRange`](#initializearraywithrange)
* [`initializeArrayWithValues`](#initializearraywithvalues)
* [`intersection`](#intersection)
* [`last`](#last)
* [`mapObject`](#mapobject)
* [`nthElement`](#nthelement)
* [`pick`](#pick)
* [`pull`](#pull)
* [`pullAtIndex`](#pullatindex)
* [`pullAtValue`](#pullatvalue)
* [`remove`](#remove)
* [`sample`](#sample)
* [`shuffle`](#shuffle)
* [`similarity`](#similarity)
* [`symmetricDifference`](#symmetricdifference)
* [`tail`](#tail)
* [`take`](#take)
* [`takeRight`](#takeright)
* [`union`](#union)
* [`without`](#without)
* [`zip`](#zip)
* [`zipObject`](#zipobject)

### Browser
* [`arrayToHtmlList`](#arraytohtmllist)
* [`bottomVisible`](#bottomvisible)
* [`currentURL`](#currenturl)
* [`elementIsVisibleInViewport`](#elementisvisibleinviewport)
* [`getScrollPosition`](#getscrollposition)
* [`getURLParameters`](#geturlparameters)
* [`httpsRedirect`](#httpsredirect)
* [`redirect`](#redirect)
* [`scrollToTop`](#scrolltotop)

### Date
* [`getDaysDiffBetweenDates`](#getdaysdiffbetweendates)
* [`JSONToDate`](#jsontodate)
* [`toEnglishDate`](#toenglishdate)

### Function
* [`chainAsync`](#chainasync)
* [`compose`](#compose)
* [`curry`](#curry)
* [`functionName`](#functionname)
* [`pipe`](#pipe)
* [`runPromisesInSeries`](#runpromisesinseries)
* [`sleep`](#sleep)

### Math
* [`arrayAverage`](#arrayaverage)
* [`arraySum`](#arraysum)
* [`clampNumber`](#clampnumber)
* [`collatz`](#collatz)
* [`digitize`](#digitize)
* [`distance`](#distance)
* [`factorial`](#factorial)
* [`fibonacci`](#fibonacci)
* [`gcd`](#gcd)
* [`hammingDistance`](#hammingdistance)
* [`inRange`](#inrange)
* [`isArmstrongNumber`](#isarmstrongnumber)
* [`isDivisible`](#isdivisible)
* [`isEven`](#iseven)
* [`isPrime`](#isprime)
* [`lcm`](#lcm)
* [`median`](#median)
* [`palindrome`](#palindrome)
* [`percentile`](#percentile)
* [`powerset`](#powerset)
* [`primes`](#primes)
* [`randomIntegerInRange`](#randomintegerinrange)
* [`randomNumberInRange`](#randomnumberinrange)
* [`round`](#round)
* [`standardDeviation`](#standarddeviation)

### Media
* [`speechSynthesis`](#speechsynthesis)

### Node
* [`JSONToFile`](#jsontofile)
* [`readFileLines`](#readfilelines)

### Object
* [`cleanObj`](#cleanobj)
* [`objectFromPairs`](#objectfrompairs)
* [`objectToPairs`](#objecttopairs)
* [`orderBy`](#orderby)
* [`select`](#select)
* [`shallowClone`](#shallowclone)
* [`truthCheckCollection`](#truthcheckcollection)

### String
* [`anagrams`](#anagrams)
* [`capitalize`](#capitalize)
* [`capitalizeEveryWord`](#capitalizeeveryword)
* [`countVowels`](#countvowels)
* [`escapeRegExp`](#escaperegexp)
* [`fromCamelCase`](#fromcamelcase)
* [`reverseString`](#reversestring)
* [`sortCharactersInString`](#sortcharactersinstring)
* [`toCamelCase`](#tocamelcase)
* [`truncateString`](#truncatestring)
* [`words`](#words)

### Utility
* [`coalesce`](#coalesce)
* [`coalesceFactory`](#coalescefactory)
* [`extendHex`](#extendhex)
* [`getType`](#gettype)
* [`hexToRGB`](#hextorgb)
* [`isArray`](#isarray)
* [`isBoolean`](#isboolean)
* [`isFunction`](#isfunction)
* [`isNumber`](#isnumber)
* [`isString`](#isstring)
* [`isSymbol`](#issymbol)
* [`RGBToHex`](#rgbtohex)
* [`timeTaken`](#timetaken)
* [`toDecimalMark`](#todecimalmark)
* [`toOrdinalSuffix`](#toordinalsuffix)
* [`UUIDGenerator`](#uuidgenerator)
* [`validateNumber`](#validatenumber)

### _Uncategorized_
* [`flip`](#flip)

## Adapter

### promisify

Converts an asynchronous function to return a promise.

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

[⬆ back to top](#table-of-contents)

### spreadOver

Takes a veriadic function and returns a closure that accepts an array of arguments to map to the inputs of the function.

Use closures and the spread operator (`...`) to map the array of arguments to the inputs of the function.

```js
const spreadOver = fn => argsArr => fn(...argsArr);
/*
const arrayMax = spreadOver(Math.max)
arrayMax([1,2,3]) // -> 3
arrayMax([1,2,4]) // -> 4
*/
```

[⬆ back to top](#table-of-contents)
## Array

### arrayGcd

Calculates the greatest common denominator (gcd) of an array of numbers.

Use `Array.reduce()` and the `gcd` formula (uses recursion) to calculate the greatest common denominator of an array of numbers.

```js
const arrayGcd = arr =>{
  const gcd = (x, y) => !y ? x : gcd(y, x % y);
  return arr.reduce((a,b) => gcd(a,b));
}
// arrayGcd([1,2,3,4,5]) -> 1
// arrayGcd([4,8,12]) -> 4
```

[⬆ back to top](#table-of-contents)

### arrayLcm

Calculates the lowest  common multiple  (lcm) of an array of numbers.

Use `Array.reduce()` and the `lcm` formula (uses recursion) to calculate the lowest  common multiple  of an array of numbers.

```js
const arrayLcm = arr =>{
  const gcd = (x, y) => !y ? x : gcd(y, x % y);
  const lcm = (x, y) => (x*y)/gcd(x, y) 
  return arr.reduce((a,b) => lcm(a,b));
}
// arrayLcm([1,2,3,4,5]) -> 60
// arrayLcm([4,8,12]) -> 24
```

[⬆ back to top](#table-of-contents)

### arrayMax

Returns the maximum value in an array.

Use `Math.max()` combined with the spread operator (`...`) to get the maximum value in the array.

```js
const arrayMax = arr => Math.max(...arr);
// arrayMax([10, 1, 5]) -> 10
```

[⬆ back to top](#table-of-contents)

### arrayMin

Returns the minimum value in an array.

Use `Math.min()` combined with the spread operator (`...`) to get the minimum value in the array.

```js
const arrayMin = arr => Math.min(...arr);
// arrayMin([10, 1, 5]) -> 1
```

[⬆ back to top](#table-of-contents)

### chunk

Chunks an array into smaller arrays of a specified size.

Use `Array.from()` to create a new array, that fits the number of chunks that will be produced.
Use `Array.slice()` to map each element of the new array to a chunk the length of `size`.
If the original array can't be split evenly, the final chunk will contain the remaining elements.

```js
const chunk = (arr, size) =>
  Array.from({length: Math.ceil(arr.length / size)}, (v, i) => arr.slice(i * size, i * size + size));
// chunk([1,2,3,4,5], 2) -> [[1,2],[3,4],[5]]
```

[⬆ back to top](#table-of-contents)

### compact

Removes falsey values from an array.

Use `Array.filter()` to filter out falsey values (`false`, `null`, `0`, `""`, `undefined`, and `NaN`).

```js
const compact = arr => arr.filter(Boolean);
// compact([0, 1, false, 2, '', 3, 'a', 'e'*23, NaN, 's', 34]) -> [ 1, 2, 3, 'a', 's', 34 ]
```

[⬆ back to top](#table-of-contents)

### countOccurrences

Counts the occurrences of a value in an array.

Use `Array.reduce()` to increment a counter each time you encounter the specific value inside the array.

```js
const countOccurrences = (arr, value) => arr.reduce((a, v) => v === value ? a + 1 : a + 0, 0);
// countOccurrences([1,1,2,1,2,3], 1) -> 3
```

[⬆ back to top](#table-of-contents)

### deepFlatten

Deep flattens an array.

Use recursion.
Use `Array.concat()` with an empty array (`[]`) and the spread operator (`...`) to flatten an array.
Recursively flatten each element that is an array.

```js
const deepFlatten = arr => [].concat(...arr.map(v => Array.isArray(v) ? deepFlatten(v) : v));
// deepFlatten([1,[2],[[3],4],5]) -> [1,2,3,4,5]
```

[⬆ back to top](#table-of-contents)

### difference

Returns the difference between two arrays.

Create a `Set` from `b`, then use `Array.filter()` on `a` to only keep values not contained in `b`.

```js
const difference = (a, b) => { const s = new Set(b); return a.filter(x => !s.has(x)); };
// difference([1,2,3], [1,2,4]) -> [3]
```

[⬆ back to top](#table-of-contents)

### differenceWith

Filters out all values from an array for which the comparator function does not return `true`.

Use `Array.filter()` and `Array.find()` to find the appropriate values.

```js
const differenceWith = (arr, val, comp) => arr.filter(a => !val.find(b => comp(a, b)))
// differenceWith([1, 1.2, 1.5, 3], [1.9, 3], (a,b) => Math.round(a) == Math.round(b)) -> [1, 1.2]
```

[⬆ back to top](#table-of-contents)

### distinctValuesOfArray

Returns all the distinct values of an array.

Use ES6 `Set` and the `...rest` operator to discard all duplicated values.

```js
const distinctValuesOfArray = arr => [...new Set(arr)];
// distinctValuesOfArray([1,2,2,3,4,4,5]) -> [1,2,3,4,5]
```

[⬆ back to top](#table-of-contents)

### dropElements

Removes elements in an array until the passed function returns `true`. Returns the remaining elements in the array.

Loop through the array, using `Array.slice()` to drop the first element of the array until the returned value from the function is `true`.
Returns the remaining elements.

```js
const dropElements = (arr, func) => {
  while (arr.length > 0 && !func(arr[0])) arr = arr.slice(1);
  return arr;
};
// dropElements([1, 2, 3, 4], n => n >= 3) -> [3,4]
```

[⬆ back to top](#table-of-contents)

### dropRight

Returns a new array with `n` elements removed from the right

Check if `n` is shorter than the given array and use `Array.slice()` to slice it accordingly or return an empty array.

```js
const dropRight = (arr, n = 1) => n < arr.length ? arr.slice(0, arr.length - n) : []
//dropRight([1,2,3]) -> [1,2]
//dropRight([1,2,3], 2) -> [1]
//dropRight([1,2,3], 42) -> []
```

[⬆ back to top](#table-of-contents)

### everyNth

Returns every nth element in an array.

Use `Array.filter()` to create a new array that contains every nth element of a given array.

```js
const everyNth = (arr, nth) => arr.filter((e, i) => i % nth === nth - 1);
// everyNth([1,2,3,4,5,6], 2) -> [ 2, 4, 6 ]
```

[⬆ back to top](#table-of-contents)

### filterNonUnique

Filters out the non-unique values in an array.

Use `Array.filter()` for an array containing only the unique values.

```js
const filterNonUnique = arr => arr.filter(i => arr.indexOf(i) === arr.lastIndexOf(i));
// filterNonUnique([1,2,2,3,4,4,5]) -> [1,3,5]
```

[⬆ back to top](#table-of-contents)

### flatten

Flattens an array.

Use `Array.reduce()` to get all elements inside the array and `concat()` to flatten them.

```js
const flatten = arr => arr.reduce((a, v) => a.concat(v), []);
// flatten([1,[2],3,4]) -> [1,2,3,4]
```

[⬆ back to top](#table-of-contents)

### flattenDepth

Flattens an array up to the specified depth.

Use recursion, decrementing `depth` by 1 for each level of depth.
Use `Array.reduce()` and `Array.concat()` to merge elements or arrays.
Base case, for `depth` equal to `1` stops recursion.
Omit the second element, `depth` to flatten only to a depth of `1` (single flatten).

```js
const flattenDepth = (arr, depth = 1) =>
  depth != 1 ? arr.reduce((a, v) => a.concat(Array.isArray(v) ? flattenDepth(v, depth - 1) : v), [])
  : arr.reduce((a, v) => a.concat(v), []);
// flattenDepth([1,[2],[[[3],4],5]], 2) -> [1,2,[3],4,5]
```

[⬆ back to top](#table-of-contents)

### groupBy

Groups the element of an array based on the given function.

Use `Array.map()` to map the values of an array to a function or property name.
Use `Array.reduce()` to create an object, where the keys are produced from the mapped results.

```js
const groupBy = (arr, func) =>
  arr.map(typeof func === 'function' ? func : val => val[func])
    .reduce((acc, val, i) => { acc[val] = (acc[val] || []).concat(arr[i]); return acc; }, {});
// groupBy([6.1, 4.2, 6.3], Math.floor) -> {4: [4.2], 6: [6.1, 6.3]}
// groupBy(['one', 'two', 'three'], 'length') -> {3: ['one', 'two'], 5: ['three']}
```

[⬆ back to top](#table-of-contents)

### head

Returns the head of a list.

Use `arr[0]` to return the first element of the passed array.

```js
const head = arr => arr[0];
// head([1,2,3]) -> 1
```

[⬆ back to top](#table-of-contents)

### initial

Returns all the elements of an array except the last one.

Use `arr.slice(0,-1)`to return all but the last element of the array.

```js
const initial = arr => arr.slice(0, -1);
// initial([1,2,3]) -> [1,2]
```

[⬆ back to top](#table-of-contents)

### initialize2DArray

Initializes an 2D array of given width and height and value.

Use `Array.map()` to generate h rows where each is a new array of size w initialize with value. If value is not provided, default to `null`.

```js
const initialize2DArray = (w, h, val = null) => Array(h).fill().map(() => Array(w).fill(val));
// initializeArrayWithRange(2, 2, 0) -> [[0,0], [0,0]]
```

[⬆ back to top](#table-of-contents)

### initializeArrayWithRange

Initializes an array containing the numbers in the specified range where `start` and `end` are inclusive.

Use `Array((end + 1) - start)` to create an array of the desired length, `Array.map()` to fill with the desired values in a range.
You can omit `start` to use a default value of `0`.

```js
const initializeArrayWithRange = (end, start = 0) => 
  Array.from({ length: (end + 1) - start }).map((v, i) => i + start);
// initializeArrayWithRange(5) -> [0,1,2,3,4,5]
// initializeArrayWithRange(7, 3) -> [3,4,5,6,7]
```

[⬆ back to top](#table-of-contents)

### initializeArrayWithValues

Initializes and fills an array with the specified values.

Use `Array(n)` to create an array of the desired length, `fill(v)` to fill it with the desired values.
You can omit `value` to use a default value of `0`.

```js
const initializeArrayWithValues = (n, value = 0) => Array(n).fill(value);
// initializeArrayWithValues(5, 2) -> [2,2,2,2,2]
```

[⬆ back to top](#table-of-contents)

### intersection

Returns a list of elements that exist in both arrays.

Create a `Set` from `b`, then use `Array.filter()` on `a` to only keep values contained in `b`.

```js
const intersection = (a, b) => { const s = new Set(b); return a.filter(x => s.has(x)); };
// intersection([1,2,3], [4,3,2]) -> [2,3]
```

[⬆ back to top](#table-of-contents)

### last

Returns the last element in an array.

Use `arr.length - 1` to compute index of the last element of the given array and returning it.

```js
const last = arr => arr[arr.length - 1];
// last([1,2,3]) -> 3
```

[⬆ back to top](#table-of-contents)

### mapObject

Maps the values of an array to an object using a function, where the key-value pairs consist of the original value as the key and the mapped value.

Use an anonymous inner function scope to declare an undefined memory space, using closures to store a return value. Use a new `Array` to stor the array with a map of the function over its data set and a comma operator to return a second step, without needing to move from one context to another (due to closures and order of operations).

```js
const mapObject = (arr, fn) => 
  (a => (a = [arr, arr.map(fn)], a[0].reduce( (acc,val,ind) => (acc[val] = a[1][ind], acc), {}) )) ( );
/*
const squareIt = arr => mapObject(arr, a => a*a)
squareIt([1,2,3]) // { 1: 1, 2: 4, 3: 9 }
*/
```

[⬆ back to top](#table-of-contents)

### nthElement

Returns the nth element of an array.

Use `Array.slice()` to get an array containing the nth element at the first place.
If the index is out of bounds, return `[]`.
Omit the second argument, `n`, to get the first element of the array.

```js
const nthElement = (arr, n=0) => (n>0? arr.slice(n,n+1) : arr.slice(n))[0];
// nthElement(['a','b','c'],1) -> 'b'
// nthElement(['a','b','b'],-3) -> 'a'
```

[⬆ back to top](#table-of-contents)

### pick

Picks the key-value pairs corresponding to the given keys from an object.

Use `Array.reduce()` to convert the filtered/picked keys back to a object with the corresponding key-value pair if the key exist in the obj.

```js
const pick = (obj, arr) =>
  arr.reduce((acc, curr) => (curr in obj && (acc[curr] = obj[curr]), acc), {});
// pick({ 'a': 1, 'b': '2', 'c': 3 }, ['a', 'c']) -> { 'a': 1, 'c': 3 }
```

[⬆ back to top](#table-of-contents)

### pull

Mutates the original array to filter out the values specified.

Use `Array.filter()` and `Array.includes()` to pull out the values that are not needed.
Use `Array.length = 0` to mutate the passed in array by resetting it's length to zero and `Array.push()` to re-populate it with only the pulled values.

_(For a snippet that does not mutate the original array see [`without`](#without))_

```js
const pull = (arr, ...args) => {
  let argState = Array.isArray(args[0]) ? args[0] : args;
  let pulled = arr.filter((v, i) => !argState.includes(v));
  arr.length = 0; 
  pulled.forEach(v => arr.push(v));
};

// let myArray1 = ['a', 'b', 'c', 'a', 'b', 'c'];
// pull(myArray1, 'a', 'c');
// console.log(myArray1) -> [ 'b', 'b' ]

// let myArray2 = ['a', 'b', 'c', 'a', 'b', 'c'];
// pull(myArray2, ['a', 'c']);
// console.log(myArray2) -> [ 'b', 'b' ]
```

[⬆ back to top](#table-of-contents)

### pullAtIndex

Mutates the original array to filter out the values at the specified indexes.

Use `Array.filter()` and `Array.includes()` to pull out the values that are not needed.
Use `Array.length = 0` to mutate the passed in array by resetting it's length to zero and `Array.push()` to re-populate it with only the pulled values.
Use `Array.push()` to keep track of pulled values 

```js
const pullAtIndex = (arr, pullArr) => {
  let removed = [];
  let pulled = arr.map((v, i) => pullArr.includes(i) ? removed.push(v) : v)
                  .filter((v, i) => !pullArr.includes(i))
  arr.length = 0; 
  pulled.forEach(v => arr.push(v));
  return removed;
}

// let myArray = ['a', 'b', 'c', 'd'];
// let pulled = pullAtIndex(myArray, [1, 3]);

// console.log(myArray); -> [ 'a', 'c' ]
// console.log(pulled); -> [ 'b', 'd' ]
```

[⬆ back to top](#table-of-contents)

### pullAtValue

Mutates the original array to filter out the values specified. Returns the removed elements.

Use `Array.filter()` and `Array.includes()` to pull out the values that are not needed.
Use `Array.length = 0` to mutate the passed in array by resetting it's length to zero and `Array.push()` to re-populate it with only the pulled values.
Use `Array.push()` to keep track of pulled values 

```js
const pullAtValue = (arr, pullArr) => {
  let removed = [], 
    pushToRemove = arr.forEach((v, i) => pullArr.includes(v) ? removed.push(v) : v),
    mutateTo = arr.filter((v, i) => !pullArr.includes(v));
  arr.length = 0;
  mutateTo.forEach(v => arr.push(v));
  return removed;
}
/*
let myArray = ['a', 'b', 'c', 'd'];
let pulled = pullAtValue(myArray, ['b', 'd']);
console.log(myArray); -> [ 'a', 'c' ]
console.log(pulled); -> [ 'b', 'd' ]
*/
```

[⬆ back to top](#table-of-contents)

### remove

Removes elements from an array for which the given function returns `false`.

Use `Array.filter()` to find array elements that return truthy values and `Array.reduce()` to remove elements using `Array.splice()`.
The `func` is invoked with three arguments (`value, index, array`).

```js
const remove = (arr, func) =>
  Array.isArray(arr) ? arr.filter(func).reduce((acc, val) => {
    arr.splice(arr.indexOf(val), 1); return acc.concat(val);
    }, [])
  : [];
// remove([1, 2, 3, 4], n => n % 2 == 0) -> [2, 4]
```

[⬆ back to top](#table-of-contents)

### sample

Returns a random element from an array.

Use `Math.random()` to generate a random number, multiply it with `length` and round it of to the nearest whole number using `Math.floor()`.
This method also works with strings.

```js
const sample = arr => arr[Math.floor(Math.random() * arr.length)];
// sample([3, 7, 9, 11]) -> 9
```

[⬆ back to top](#table-of-contents)

### shuffle

Randomizes the order of the values of an array.

Use `Array.sort()` to reorder elements, using `Math.random()` in the comparator.

```js
const shuffle = arr => arr.sort(() => Math.random() - 0.5);
// shuffle([1,2,3]) -> [2,3,1]
```

[⬆ back to top](#table-of-contents)

### similarity

Returns an array of elements that appear in both arrays.

Use `filter()` to remove values that are not part of `values`, determined using `includes()`.

```js
const similarity = (arr, values) => arr.filter(v => values.includes(v));
// similarity([1,2,3], [1,2,4]) -> [1,2]
```

[⬆ back to top](#table-of-contents)

### symmetricDifference

Returns the symmetric difference between two arrays.

Create a `Set` from each array, then use `Array.filter()` on each of them to only keep values not contained in the other.

```js
const symmetricDifference = (a, b) => {
  const sA = new Set(a), sB = new Set(b);
  return [...a.filter(x => !sB.has(x)), ...b.filter(x => !sA.has(x))];
}
// symmetricDifference([1,2,3], [1,2,4]) -> [3,4]
```

[⬆ back to top](#table-of-contents)

### tail

Returns all elements in an array except for the first one.

Return `arr.slice(1)` if the array's `length` is more than `1`, otherwise return the whole array.

```js
const tail = arr => arr.length > 1 ? arr.slice(1) : arr;
// tail([1,2,3]) -> [2,3]
// tail([1]) -> [1]
```

[⬆ back to top](#table-of-contents)

### take

Returns an array with n elements removed from the beginning.

Use `Array.slice()` to create a slice of the array with `n` elements taken from the beginning.

```js
const take = (arr, n = 1) => arr.slice(0, n);
// take([1, 2, 3], 5) -> [1, 2, 3]
// take([1, 2, 3], 0) -> []
```

[⬆ back to top](#table-of-contents)

### takeRight

Returns an array with n elements removed from the end.

Use `Array.slice()` to create a slice of the array with `n` elements taken from the end.

```js
const takeRight = (arr, n = 1) => arr.slice(arr.length - n, arr.length);
// takeRight([1, 2, 3], 2) -> [ 2, 3 ]
// takeRight([1, 2, 3]) -> [3]
```

[⬆ back to top](#table-of-contents)

### union

Returns every element that exists in any of the two arrays once.

Create a `Set` with all values of `a` and `b` and convert to an array.

```js
const union = (a, b) => Array.from(new Set([...a, ...b]));
// union([1,2,3], [4,3,2]) -> [1,2,3,4]
```

[⬆ back to top](#table-of-contents)

### without

Filters out the elements of an array, that have one of the specified values.

Use `Array.filter()` to create an array excluding(using `!Array.includes()`) all given values.

_(For a snippet that mutates the original array see [`pull`](#pull))_

```js
const without = (arr, ...args) => arr.filter(v => !args.includes(v));
// without([2, 1, 2, 3], 1, 2) -> [3]
```

[⬆ back to top](#table-of-contents)

### zip

Creates an array of elements, grouped based on the position in the original arrays.

Use `Math.max.apply()` to get the longest array in the arguments.
Creates an array with that length as return value and use `Array.from()` with a map-function to create an array of grouped elements.
If lengths of the argument-arrays vary, `undefined` is used where no value could be found.

```js
const zip = (...arrays) => {
  const maxLength = Math.max(...arrays.map(x => x.length));
  return Array.from({length: maxLength}).map((_, i) => {
   return Array.from({length: arrays.length}, (_, k) => arrays[k][i]);
  })
}
//zip(['a', 'b'], [1, 2], [true, false]); -> [['a', 1, true], ['b', 2, false]]
//zip(['a'], [1, 2], [true, false]); -> [['a', 1, true], [undefined, 2, false]]
```

[⬆ back to top](#table-of-contents)

### zipObject

Given an array of valid property identifiers and an array of values, return an object associating the properties to the values.

Since an object can have undefined values but not undefined property pointers, the array of properties is used to decide the structure of the resulting object using `Array.reduce()`.

```js
const zipObject = ( props, values ) => props.reduce( ( obj, prop, index ) => ( obj[prop] = values[index], obj ), {} )
// zipObject(['a','b','c'], [1,2]) -> {a: 1, b: 2, c: undefined}
// zipObject(['a','b'], [1,2,3]) -> {a: 1, b: 2}
```

[⬆ back to top](#table-of-contents)
## Browser

### arrayToHtmlList

Converts the given array elements into `<li>` tags and appends them to the list of the given id.

Use `Array.map()` and `document.querySelector()` to create a list of html tags.

```js
const arrayToHtmlList = (arr, listID) => arr.map(item => document.querySelector("#"+listID).innerHTML+=`<li>${item}</li>`);
// arrayToHtmlList(['item 1', 'item 2'],'myListID')
```

[⬆ back to top](#table-of-contents)

### bottomVisible

Returns `true` if the bottom of the page is visible, `false` otherwise.

Use `scrollY`, `scrollHeight` and `clientHeight` to determine if the bottom of the page is visible.

```js
const bottomVisible = () =>
  document.documentElement.clientHeight + window.scrollY >= (document.documentElement.scrollHeight || document.documentElement.clientHeight);
// bottomVisible() -> true
```

[⬆ back to top](#table-of-contents)

### currentURL

Returns the current URL.

Use `window.location.href` to get current URL.

```js
const currentURL = () => window.location.href;
// currentUrl() -> 'https://google.com'
```

[⬆ back to top](#table-of-contents)

### elementIsVisibleInViewport

Returns `true` if the element specified is visible in the viewport, `false` otherwise.

Use `Element.getBoundingClientRect()` and the `window.inner(Width|Height)` values
to determine if a given element is visible in the viewport.
Omit the second argument to determine if the element is entirely visible, or specify `true` to determine if
it is partially visible.

```js
const elementIsVisibleInViewport = (el, partiallyVisible = false) => {
  const { top, left, bottom, right } = el.getBoundingClientRect();
  const { innerHeight, innerWidth } = window;
  return partiallyVisible
    ? ((top > 0 && top < innerHeight) || (bottom > 0 && bottom < innerHeight)) &&
      ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth))
    : top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth;
};
// e.g. 100x100 viewport and a 10x10px element at position {top: -1, left: 0, bottom: 9, right: 10}
// elementIsVisibleInViewport(el) -> false (not fully visible)
// elementIsVisibleInViewport(el, true) -> true (partially visible)
```

[⬆ back to top](#table-of-contents)

### getScrollPosition

Returns the scroll position of the current page.

Use `pageXOffset` and `pageYOffset` if they are defined, otherwise `scrollLeft` and `scrollTop`.
You can omit `el` to use a default value of `window`.

```js
const getScrollPosition = (el = window) =>
  ({x: (el.pageXOffset !== undefined) ? el.pageXOffset : el.scrollLeft,
    y: (el.pageYOffset !== undefined) ? el.pageYOffset : el.scrollTop});
// getScrollPosition() -> {x: 0, y: 200}
```

[⬆ back to top](#table-of-contents)

### getURLParameters

Returns an object containing the parameters of the current URL.

Use `match()` with an appropriate regular expression to get all key-value pairs, `Array.reduce()` to map and combine them into a single object.
Pass `location.search` as the argument to apply to the current `url`.

```js
const getURLParameters = url =>
  url.match(/([^?=&]+)(=([^&]*))/g).reduce(
    (a, v) => (a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1), a), {}
  );
// getURLParameters('http://url.com/page?name=Adam&surname=Smith') -> {name: 'Adam', surname: 'Smith'}
```

[⬆ back to top](#table-of-contents)

### httpsRedirect

Redirects the page to HTTPS if its currently in HTTP. Also, pressing the back button doesn't take it back to the HTTP page as its replaced in the history.

Use `location.protocol` to get the protocol currently being used. If it's not HTTPS, use `location.replace()` to replace the existing page with the HTTPS version of the page. Use `location.href` to get the full address, split it with `String.split()` and remove the protocol part of the URL.  

```js
const httpsRedirect = () => {
  if(location.protocol !== "https:") location.replace("https://" + location.href.split("//")[1]);
}
```

[⬆ back to top](#table-of-contents)

### redirect

Redirects to a specified URL.

Use `window.location.href` or `window.location.replace()` to redirect to `url`.
Pass a second argument to simulate a link click (`true` - default) or an HTTP redirect (`false`).

```js
const redirect = (url, asLink = true) =>
  asLink ? window.location.href = url : window.location.replace(url);
// redirect('https://google.com')
```

[⬆ back to top](#table-of-contents)

### scrollToTop

Smooth-scrolls to the top of the page.

Get distance from top using `document.documentElement.scrollTop` or `document.body.scrollTop`.
Scroll by a fraction of the distance from top. Use `window.requestAnimationFrame()` to animate the scrolling.

```js
const scrollToTop = () => {
  const c = document.documentElement.scrollTop || document.body.scrollTop;
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c / 8);
  }
};
// scrollToTop()
```

[⬆ back to top](#table-of-contents)
## Date

### getDaysDiffBetweenDates

Returns the difference (in days) between two dates.

Calculate the difference (in days) between to `Date` objects.

```js
const getDaysDiffBetweenDates = (dateInitial, dateFinal) => (dateFinal - dateInitial) / (1000 * 3600 * 24);
// getDaysDiffBetweenDates(new Date("2017-12-13"), new Date("2017-12-22")) -> 9
```

[⬆ back to top](#table-of-contents)

### JSONToDate

Converts a JSON object to a date.

Use `Date()`, to convert dates in JSON format to readable format (`dd/mm/yyyy`).

```js
const JSONToDate = arr => {
  const dt = new Date(parseInt(arr.toString().substr(6)));
  return `${ dt.getDate() }/${ dt.getMonth() + 1 }/${ dt.getFullYear() }`
};
// JSONToDate(/Date(1489525200000)/) -> "14/3/2017"
```

[⬆ back to top](#table-of-contents)

### toEnglishDate

Converts a date from American format to English format.

Use `Date.toISOString()`, `split('T')` and `replace()` to convert a date from American format to English format.
Throws an error if the passed time cannot be converted to a date.

```js
const toEnglishDate  = (time) =>
  {try{return new Date(time).toISOString().split('T')[0].replace(/-/g, '/')}catch(e){return}};
// toEnglishDate('09/21/2010') -> '21/09/2010'
```

[⬆ back to top](#table-of-contents)
## Function

### chainAsync

Chains asynchronous functions.

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

[⬆ back to top](#table-of-contents)

### compose

Performs right-to-left function composition.

Use `Array.reduce()` to perform right-to-left function composition.
The last (rightmost) function can accept one or more arguments; the remaining functions must be unary.

```js
const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)));
/*
const add5 = x => x + 5
const multiply = (x, y) => x * y
const multiplyAndAdd5 = compose(add5, multiply)
multiplyAndAdd5(5, 2) -> 15
*/
```

[⬆ back to top](#table-of-contents)

### curry

Curries a function.

Use recursion.
If the number of provided arguments (`args`) is sufficient, call the passed function `f`.
Otherwise return a curried function `f` that expects the rest of the arguments.
If you want to curry a function that accepts a variable number of arguments (a variadic function, e.g. `Math.min()`), you can optionally pass the number of arguments to the second parameter `arity`.

```js
const curry = (fn, arity = fn.length, ...args) =>
  arity <= args.length
    ? fn(...args)
    : curry.bind(null, fn, arity, ...args);
// curry(Math.pow)(2)(10) -> 1024
// curry(Math.min, 3)(10)(50)(2) -> 2
```

[⬆ back to top](#table-of-contents)

### functionName

Logs the name of a function.

Use `console.debug()` and the `name` property of the passed method to log the method's name to the `debug` channel of the console.

```js
const functionName = fn => (console.debug(fn.name), fn);
// functionName(Math.max) -> max (logged in debug channel of console)
```

[⬆ back to top](#table-of-contents)

### pipe

Performs left-to-right function composition.

Use `Array.reduce()` with the spread operator (`...`) to perform left-to-right function composition.
The first (leftmost) function can accept one or more arguments; the remaining functions must be unary.

```js
const pipeFunctions = (...fns) => fns.reduce((f, g) => (...args) => g(f(...args)));
/*
const add5 = x => x + 5
const multiply = (x, y) => x * y
const multiplyAndAdd5 = pipeFunctions(multiply, add5)
multiplyAndAdd5(5, 2) -> 15
*/
```

[⬆ back to top](#table-of-contents)

### runPromisesInSeries

Runs an array of promises in series.

Use `Array.reduce()` to create a promise chain, where each promise returns the next promise when resolved.

```js
const runPromisesInSeries = ps => ps.reduce((p, next) => p.then(next), Promise.resolve());
// const delay = (d) => new Promise(r => setTimeout(r, d))
// runPromisesInSeries([() => delay(1000), () => delay(2000)]) -> executes each promise sequentially, taking a total of 3 seconds to complete
```

[⬆ back to top](#table-of-contents)

### sleep

Delays the execution of an asynchronous function.

Delay executing part of an `async` function, by putting it to sleep, returning a `Promise`.

```js
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
/*
async function sleepyWork() {
  console.log('I\'m going to sleep for 1 second.');
  await sleep(1000);
  console.log('I woke up after 1 second.');
}
*/
```

[⬆ back to top](#table-of-contents)
## Math

### arrayAverage

Returns the average of an array of numbers.

Use `Array.reduce()` to add each value to an accumulator, initialized with a value of `0`, divide by the `length` of the array.

```js
const arrayAverage = arr => arr.reduce((acc, val) => acc + val, 0) / arr.length;
// arrayAverage([1,2,3]) -> 2
```

[⬆ back to top](#table-of-contents)

### arraySum

Returns the sum of an array of numbers.

Use `Array.reduce()` to add each value to an accumulator, initialized with a value of `0`.

```js
const arraySum = arr => arr.reduce((acc, val) => acc + val, 0);
// arraySum([1,2,3,4]) -> 10
```

[⬆ back to top](#table-of-contents)

### clampNumber

Clamps `num` within the inclusive `lower` and `upper` bounds.

If `lower` is greater than `upper`, swap them. 
If `num` falls within the range, return `num`. 
Otherwise return the nearest number in the range.

```js
const clampNumber = (num, lower, upper) => {
  if(lower > upper) upper = [lower, lower = upper][0];
  return (num>=lower && num<=upper) ? num : ((num < lower) ? lower : upper) 
}
// clampNumber(2, 3, 5) -> 3
// clampNumber(1, -1, -5) -> -1
// clampNumber(3, 2, 4) -> 3
```

[⬆ back to top](#table-of-contents)

### collatz

Applies the Collatz algorithm.

If `n` is even, return `n/2`. Otherwise  return `3n+1`.

```js
const collatz = n => (n % 2 == 0) ? (n / 2) : (3 * n + 1);
// collatz(8) --> 4
// collatz(5) --> 16
```

[⬆ back to top](#table-of-contents)

### digitize

Converts a number to an array of digits.

Convert the number to a string, using spread operators in ES6(`[...string]`) build an array.
Use `Array.map()` and `parseInt()` to transform each value to an integer.

```js
const digitize = n => [...''+n].map(i => parseInt(i));
// digitize(2334) -> [2, 3, 3, 4]
```

[⬆ back to top](#table-of-contents)

### distance

Returns the distance between two points.

Use `Math.hypot()` to calculate the Euclidean distance between two points.

```js
const distance = (x0, y0, x1, y1) => Math.hypot(x1 - x0, y1 - y0);
// distance(1,1, 2,3) -> 2.23606797749979
```

[⬆ back to top](#table-of-contents)

### factorial

Calculates the factorial of a number.

Use recursion.
If `n` is less than or equal to `1`, return `1`.
Otherwise, return the product of `n` and the factorial of `n - 1`.
Throws an exception if `n` is a negative number.

```js
const factorial = n =>
  n < 0 ? (() => { throw new TypeError('Negative numbers are not allowed!') })()
  : n <= 1 ? 1 : n * factorial(n - 1);
// factorial(6) -> 720
```

[⬆ back to top](#table-of-contents)

### fibonacci

Generates an array, containing the Fibonacci sequence, up until the nth term.

Create an empty array of the specific length, initializing the first two values (`0` and `1`).
Use `Array.reduce()` to add values into the array, using the sum of the last two values, except for the first two.

```js
const fibonacci = n =>
  Array.from({ length: n}).reduce((acc, val, i) => acc.concat(i > 1 ? acc[i - 1] + acc[i - 2] : i), []);
// fibonacci(5) -> [0,1,1,2,3]
```

[⬆ back to top](#table-of-contents)

### gcd

Calculates the greatest common divisor between two numbers.

Use recursion.
Base case is when `y` equals `0`. In this case, return `x`.
Otherwise, return the GCD of `y` and the remainder of the division `x/y`.

```js
const gcd = (x, y) => !y ? x : gcd(y, x % y);
// gcd (8, 36) -> 4
```

[⬆ back to top](#table-of-contents)

### hammingDistance

Calculates the Hamming distance between two values.

Use XOR operator (`^`) to find the bit difference between the two numbers, convert to binary string using `toString(2)`.
Count and return the number of `1`s in the string, using `match(/1/g)`.

```js
const hammingDistance = (num1, num2) =>
  ((num1 ^ num2).toString(2).match(/1/g) || '').length;
// hammingDistance(2,3) -> 1
```

[⬆ back to top](#table-of-contents)

### inRange

Checks if the given number falls in the given range. 

Use arithmetic comparison to check if the given number is in the specified range.
If the second parameter, `end`, is not specified, the reange is considered to be from `0` to `start`.

```js
const inRange = (n, start, end=null) => {
  if(end && start > end) end = [start, start=end][0];
  return (end == null) ? (n>=0 && n<start) : (n>=start && n<end);
}
// inRange(3, 2, 5) -> true
// inRange(3, 4) -> true
// inRange(2, 3, 5) -> false
// inrange(3, 2) -> false
```

[⬆ back to top](#table-of-contents)

### isArmstrongNumber

Checks if the given number is an armstrong number or not.

Convert the given number into array of digits. Use `Math.pow()` to get the appropriate power for each digit and sum them up. If the sum is equal to the number itself, return `true` otherwise `false`.

```js
const isArmstrongNumber = digits => 
  ( arr => arr.reduce( ( a, d ) => a + Math.pow( parseInt( d ), arr.length ), 0 ) == digits ? true : false )( ( digits+'' ).split( '' ) );
// isArmstrongNumber(1634) -> true
// isArmstrongNumber(371) -> true
// isArmstrongNumber(56) -> false
```

[⬆ back to top](#table-of-contents)

### isDivisible

Checks if the first numeric argument is divisible by the second one.

Use the modulo operator (`%`) to check if the remainder is equal to `0`.

```js
const isDivisible = (dividend, divisor) => dividend % divisor === 0;
// isDivisible(6,3) -> true
```

[⬆ back to top](#table-of-contents)

### isEven

Returns `true` if the given number is even, `false` otherwise.

Checks whether a number is odd or even using the modulo (`%`) operator.
Returns `true` if the number is even, `false` if the number is odd.

```js
const isEven = num => num % 2 === 0;
// isEven(3) -> false
```

[⬆ back to top](#table-of-contents)

### isPrime

Checks if the provided integer is a prime number.

Check numbers from `2` to the square root of the given number. 
Return `false` if any of them divides the given number, else return `true`, unless the number is less than `2`.

```js
const isPrime = num => {
  const boundary = Math.floor(Math.sqrt(num));
  for (var i = 2; i * i <= boundary; i++) if (num % i == 0) return false;
  return num >= 2;
};
// isPrime(11) -> true
// isPrime(12) -> false
```

[⬆ back to top](#table-of-contents)

### lcm

Returns the least common multiple of two numbers.

Use the greatest common divisor (GCD) formula and `Math.abs()` to determine the least common multiple.
The GCD formula uses recursion.

```js
const lcm = (x,y) => {
  const gcd = (x, y) => !y ? x : gcd(y, x % y);
  return Math.abs(x*y)/(gcd(x,y));
};
// lcm(12,7) -> 84
```

[⬆ back to top](#table-of-contents)

### median

Returns the median of an array of numbers.

Find the middle of the array, use `Array.sort()` to sort the values.
Return the number at the midpoint if `length` is odd, otherwise the average of the two middle numbers.

```js
const median = arr => {
  const mid = Math.floor(arr.length / 2), nums = [...arr].sort((a, b) => a - b);
  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};
// median([5,6,50,1,-5]) -> 5
// median([0,10,-2,7]) -> 3.5
```

[⬆ back to top](#table-of-contents)

### palindrome

Returns `true` if the given string is a palindrome, `false` otherwise.

Convert string `toLowerCase()` and use `replace()` to remove non-alphanumeric characters from it.
Then, `split('')` into individual characters, `reverse()`, `join('')` and compare to the original, unreversed string, after converting it `tolowerCase()`.

```js
const palindrome = str => {
  const s = str.toLowerCase().replace(/[\W_]/g,'');
  return s === s.split('').reverse().join('');
}
// palindrome('taco cat') -> true
 ```

[⬆ back to top](#table-of-contents)

### percentile

Uses the percentile formula to calculate how many numbers in the given array are less or equal to the given value.

Use `Array.reduce()` to calculate how many numbers are below the value and how many are the same value and apply the percentile formula.

```js
const percentile = (arr, val) =>
  100 * arr.reduce((acc,v) => acc + (v < val ? 1 : 0) + (v === val ? 0.5 : 0), 0) / arr.length;
// percentile([1,2,3,4,5,6,7,8,9,10], 6) -> 55
 ```

[⬆ back to top](#table-of-contents)

### powerset

Returns the powerset of a given array of numbers.

Use `Array.reduce()` combined with `Array.map()` to iterate over elements and combine into an array containing all combinations.

```js
const powerset = arr =>
  arr.reduce((a, v) => a.concat(a.map(r => [v].concat(r))), [[]]);
// powerset([1,2]) -> [[], [1], [2], [2,1]]
```

[⬆ back to top](#table-of-contents)

### primes 

Generates primes up to a given number, using the Sieve of Eratosthenes.

Generate an array from `2` to the given number. Use `Array.filter()` to filter out the values divisible by any number from `2` to the square root of the provided number.

```js
const primes = num => {
  let arr =  Array.from({length:num-1}).map((x,i)=> i+2), 
    sqroot  = Math.floor(Math.sqrt(num)),
    numsTillSqroot  = Array.from({length:sqroot-1}).map((x,i)=> i+2);
  numsTillSqroot.forEach(x => arr = arr.filter(y => ((y%x)!==0)||(y==x)));
  return arr; 
}
// primes(10) -> [2,3,5,7] 
```

[⬆ back to top](#table-of-contents)

### randomIntegerInRange

Returns a random integer in the specified range.

Use `Math.random()` to generate a random number and map it to the desired range, using `Math.floor()` to make it an integer.

```js
const randomIntegerInRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
// randomIntegerInRange(0, 5) -> 2
```

[⬆ back to top](#table-of-contents)

### randomNumberInRange

Returns a random number in the specified range.

Use `Math.random()` to generate a random value, map it to the desired range using multiplication.

```js
const randomNumberInRange = (min, max) => Math.random() * (max - min) + min;
// randomNumberInRange(2,10) -> 6.0211363285087005
```

[⬆ back to top](#table-of-contents)

### round

Rounds a number to a specified amount of digits.

Use `Math.round()` and template literals to round the number to the specified number of digits.
Omit the second argument, `decimals` to round to an integer.

```js
const round = (n, decimals=0) => Number(`${Math.round(`${n}e${decimals}`)}e-${decimals}`);
// round(1.005, 2) -> 1.01
```

[⬆ back to top](#table-of-contents)

### standardDeviation

Returns the standard deviation of an array of numbers.

Use `Array.reduce()` to calculate the mean, variance and the sum of the variance of the values, the variance of the values, then
determine the standard deviation.
You can omit the second argument to get the sample standard deviation or set it to `true` to get the population standard deviation.

```js
const standardDeviation = (arr, usePopulation = false) => {
  const mean = arr.reduce((acc, val) => acc + val, 0) / arr.length;
  return Math.sqrt(
    arr.reduce((acc, val) => acc.concat(Math.pow(val - mean, 2)), [])
       .reduce((acc, val) => acc + val, 0) / (arr.length - (usePopulation ? 0 : 1))
  );
};
// standardDeviation([10,2,38,23,38,23,21]) -> 13.284434142114991 (sample)
// standardDeviation([10,2,38,23,38,23,21], true) -> 12.29899614287479 (population)
```

[⬆ back to top](#table-of-contents)
## Media

### speechSynthesis

Performs speech synthesis (experimental).

Use `SpeechSynthesisUtterance.voice` and `window.speechSynthesis.getVoices()` to convert a message to speech.
Use `window.speechSynthesis.speak()` to play the message.

Learn more about the [SpeechSynthesisUtterance interface of the Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance).

```js
const speechSynthesis = message => {
  const msg = new SpeechSynthesisUtterance(message);
  msg.voice = window.speechSynthesis.getVoices()[0];
  window.speechSynthesis.speak(msg);
};
// speechSynthesis('Hello, World') -> plays the message
```

[⬆ back to top](#table-of-contents)
## Node

### JSONToFile

Writes a JSON object to a file.

Use `fs.writeFile()`, template literals and `JSON.stringify()` to write a `json` object to a `.json` file.

```js
const fs = require('fs');
const JSONToFile = (obj, filename) => fs.writeFile(`${filename}.json`, JSON.stringify(obj, null, 2))
// JSONToFile({test: "is passed"}, 'testJsonFile') -> writes the object to 'testJsonFile.json'
```

[⬆ back to top](#table-of-contents)

### readFileLines

Returns an array of lines from the specified file.

Use `readFileSync` function in `fs` node package to create a `Buffer` from a file.
convert buffer to string using `toString(encoding)` function.
creating an array from contents of file by `split`ing file content line by line (each `\n`).

  ```js
const fs = require('fs');
const readFileLines = filename => fs.readFileSync(filename).toString('UTF8').split('\n');
/*
  contents of test.txt :
    line1
    line2
    line3
    ___________________________
  let arr = readFileLines('test.txt')
  console.log(arr) // -> ['line1', 'line2', 'line3']
 */
```

[⬆ back to top](#table-of-contents)
## Object

### cleanObj

Removes any properties except the ones specified from a JSON object.

Use `Object.keys()` method to loop over given json object and deleting keys that are not `include`d in given array.
Also if you give it a special key (`childIndicator`) it will search deeply inside it to apply function to inner objects too.

```js
const cleanObj = (obj, keysToKeep = [], childIndicator) => {
  Object.keys(obj).forEach(key => {
    if (key === childIndicator) {
      cleanObj(obj[key], keysToKeep, childIndicator);
    } else if (!keysToKeep.includes(key)) {
      delete obj[key];
    }
  })
}
/*
  const testObj = {a: 1, b: 2, children: {a: 1, b: 2}}
  cleanObj(testObj, ["a"],"children")
  console.log(testObj)// { a: 1, children : { a: 1}}
*/
```

[⬆ back to top](#table-of-contents)

### objectFromPairs

Creates an object from the given key-value pairs.

Use `Array.reduce()` to create and combine key-value pairs.

```js
const objectFromPairs = arr => arr.reduce((a, v) => (a[v[0]] = v[1], a), {});
// objectFromPairs([['a',1],['b',2]]) -> {a: 1, b: 2}
```

[⬆ back to top](#table-of-contents)

### objectToPairs

Creates an array of key-value pair arrays from an object.

Use `Object.keys()` and `Array.map()` to iterate over the object's keys and produce an array with key-value pairs.

```js
const objectToPairs = obj => Object.keys(obj).map(k => [k, obj[k]]);
// objectToPairs({a: 1, b: 2}) -> [['a',1],['b',2]])
```

[⬆ back to top](#table-of-contents)

### orderBy

Returns a sorted array of objects ordered by properties and orders.

Uses a custom implementation of sort, that reduces the props array argument with a default value of 0, it uses destructuring to swap the properties position depending on the order passed.
If no orders array is passed it sort by 'asc' by default.

```js
const orderBy = (arr, props, orders) =>
  arr.sort((a, b) =>
    props.reduce((acc, prop, i) => {
      if (acc === 0) {
        const [p1, p2] = orders && orders[i] === 'desc' ? [b[prop], a[prop]] : [a[prop], b[prop]];
        acc = p1 > p2 ? 1 : p1 < p2 ? -1 : 0;
      }
      return acc;
    }, 0)
  );
/*
const users = [{ 'name': 'fred',   'age': 48 },{ 'name': 'barney', 'age': 36 },
  { 'name': 'fred',   'age': 40 },{ 'name': 'barney', 'age': 34 }];
orderby(users, ['name', 'age'], ['asc', 'desc']) -> [{name: 'barney', age: 36}, {name: 'barney', age: 34}, {name: 'fred', age: 48}, {name: 'fred', age: 40}]
orderby(users, ['name', 'age']) -> [{name: 'barney', age: 34}, {name: 'barney', age: 36}, {name: 'fred', age: 40}, {name: 'fred', age: 48}]
*/
```

[⬆ back to top](#table-of-contents)

### select

Retrieve a property that indicated by the selector from object.

If property not exists returns `undefined`.

```js
const select = (from, selector) =>
  selector.split('.').reduce((prev, cur) => prev && prev[cur], from);

// const obj = {selector: {to: {val: 'val to select'}}};
// select(obj, 'selector.to.val'); -> 'val to select'
```

[⬆ back to top](#table-of-contents)

### shallowClone

Creates a shallow clone of an object.

Use `Object.assign()` and an empty object (`{}`) to create a shallow clone of the original.

```js
const shallowClone = obj => Object.assign({}, obj);
/*
const a = { x: true, y: 1 };
const b = shallowClone(a);
a === b -> false
*/
```

[⬆ back to top](#table-of-contents)

### truthCheckCollection

Checks if the predicate (second argument) is truthy on all elements of a collection (first argument).

Use `Array.every()` to check if each passed object has the specified property and if it returns a truthy value.
 
 ```js
const truthCheckCollection = (collection, pre) => (collection.every(obj => obj[pre]));
// truthCheckCollection([{"user": "Tinky-Winky", "sex": "male"}, {"user": "Dipsy", "sex": "male"}], "sex") -> true
```

[⬆ back to top](#table-of-contents)
## String

### anagrams

Generates all anagrams of a string (contains duplicates).

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

[⬆ back to top](#table-of-contents)

### Capitalize

Capitalizes the first letter of a string.

Use destructuring and `toUpperCase()` to capitalize first letter, `...rest` to get array of characters after first letter and then `Array.join('')` to make it a string again.
Omit the `lowerRest` parameter to keep the rest of the string intact, or set it to `true` to convert to lowercase.

```js
const capitalize = ([first,...rest], lowerRest = false) =>
  first.toUpperCase() + (lowerRest ? rest.join('').toLowerCase() : rest.join(''));
// capitalize('myName') -> 'MyName'
// capitalize('myName', true) -> 'Myname'
```

[⬆ back to top](#table-of-contents)

### capitalizeEveryWord

Capitalizes the first letter of every word in a string.

Use `replace()` to match the first character of each word and `toUpperCase()` to capitalize it.

```js
const capitalizeEveryWord = str => str.replace(/\b[a-z]/g, char => char.toUpperCase());
// capitalizeEveryWord('hello world!') -> 'Hello World!'
```

[⬆ back to top](#table-of-contents)

### countVowels

Retuns `number` of vowels in provided string.

Use a regular expression to count number of vowels `(A, E, I, O, U)` in a `string`.

```js
const countVowels = str => (str.match(/[aeiou]/ig) || []).length;
// countVowels('foobar') -> 3
// countVowels('gym') -> 0
```

[⬆ back to top](#table-of-contents)

### escapeRegExp

Escapes a string to use in a regular expression.

Use `replace()` to escape special characters.

```js
const escapeRegExp = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
// escapeRegExp('(test)') -> \\(test\\)
```

[⬆ back to top](#table-of-contents)

### fromCamelCase

Converts a string from camelcase.

Use `replace()` to remove underscores, hyphens and spaces and convert words to camelcase.
Omit the second argument to use a default separator of `_`.

```js
const fromCamelCase = (str, separator = '_') =>
  str.replace(/([a-z\d])([A-Z])/g, '$1' + separator + '$2')
    .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1' + separator + '$2').toLowerCase();
// fromCamelCase('someDatabaseFieldName', ' ') -> 'some database field name'
// fromCamelCase('someLabelThatNeedsToBeCamelized', '-') -> 'some-label-that-needs-to-be-camelized'
// fromCamelCase('someJavascriptProperty', '_') -> 'some_javascript_property'
```

[⬆ back to top](#table-of-contents)

### reverseString

Reverses a string.

Use `split('')` and `Array.reverse()` to reverse the order of the characters in the string.
Combine characters to get a string using `join('')`.

```js
const reverseString = str => str.split('').reverse().join('');
// reverseString('foobar') -> 'raboof'
```

[⬆ back to top](#table-of-contents)

### sortCharactersInString

Alphabetically sorts the characters in a string.

Split the string using `split('')`, `Array.sort()` utilizing `localeCompare()`, recombine using `join('')`.

```js
const sortCharactersInString = str =>
  str.split('').sort((a, b) => a.localeCompare(b)).join('');
// sortCharactersInString('cabbage') -> 'aabbceg'
```

[⬆ back to top](#table-of-contents)

### toCamelCase

Converts a string to camelcase.

Use `replace()` to remove underscores, hyphens and spaces and convert words to camelcase.

```js
const toCamelCase = str =>
  str.replace(/^([A-Z])|[\s-_]+(\w)/g, (match, p1, p2, offset) =>  p2 ? p2.toUpperCase() : p1.toLowerCase());
// toCamelCase("some_database_field_name") -> 'someDatabaseFieldName'
// toCamelCase("Some label that needs to be camelized") -> 'someLabelThatNeedsToBeCamelized'
// toCamelCase("some-javascript-property") -> 'someJavascriptProperty'
// toCamelCase("some-mixed_string with spaces_underscores-and-hyphens") -> 'someMixedStringWithSpacesUnderscoresAndHyphens'
```

[⬆ back to top](#table-of-contents)

### truncateString

Truncates a string up to a specified length.

Determine if the string's `length` is greater than `num`.
Return the string truncated to the desired length, with `...` appended to the end or the original string.

```js
const truncateString = (str, num) =>
  str.length > num ? str.slice(0, num > 3 ? num - 3 : num) + '...' : str;
// truncateString('boomerang', 7) -> 'boom...'
```

[⬆ back to top](#table-of-contents)

### words

Converts a given string into an array of words.

Use `String.split()` with a supplied pattern (defaults to non alpha as a regex) to convert to an array of strings. Use `Array.filter()` to remove any empty strings.
Omit the second argument to use the default regex.

```js
const words = (str, pattern = /[^a-zA-Z-]+/) => str.split(pattern).filter(Boolean);
// words("I love javaScript!!") -> ["I", "love", "javaScript"]
// words("python, javaScript & coffee") -> ["python", "javaScript", "coffee"]
```

[⬆ back to top](#table-of-contents)
## Utility

### coalesce

Returns the first non-null/undefined argument.

Use `Array.find()` to return the first non `null`/`undefined` argument.

```js
const coalesce = (...args) => args.find(_ => ![undefined, null].includes(_))
// coalesce(null,undefined,"",NaN, "Waldo") -> ""
```

[⬆ back to top](#table-of-contents)

### coalesceFactory

Returns a customized coalesce function that returns the first argument that returns `true` from the provided argument validation function.

Use `Array.find()` to return the first argument that returns `true` from the provided argument validation function.

```js
const coalesceFactory = valid => (...args) => args.find(valid);
// const customCoalesce = coalesceFactory(_ => ![null, undefined, "", NaN].includes(_))
// customCoalesce(undefined, null, NaN, "", "Waldo") //-> "Waldo"
```

[⬆ back to top](#table-of-contents)

### extendHex

Extends a 3-digit color code to a 6-digit color code.

Use `Array.map()`, `split()` and `Array.join()` to join the mapped array for converting a 3-digit RGB notated hexadecimal color-code to the 6-digit form.
`Array.slice()` is used to remove `#` from string start since it's added once.
```js
const extendHex = shortHex =>
  '#' + shortHex.slice(shortHex.startsWith('#') ? 1 : 0).split('').map(x => x+x).join('')
// extendHex('#03f') -> '#0033ff'
// extendHex('05a') -> '#0055aa'
```

[⬆ back to top](#table-of-contents)

### getType

Returns the native type of a value.

Returns lowercased constructor name of value, "undefined" or "null" if value is undefined or null

```js
const getType = v =>
  v === undefined ? 'undefined' : v === null ? 'null' : v.constructor.name.toLowerCase();
// getType(new Set([1,2,3])) -> "set"
```

[⬆ back to top](#table-of-contents)

### hexToRGB

Converts a color code to a `rgb()` or `rgba()` string if alpha value is provided.

Use bitwise right-shift operator and mask bits with `&` (and) operator to convert a hexadecimal color code (with or without prefixed with `#`) to a string with the RGB values. If it's 3-digit color code, first convert to 6-digit version. If any alpha value is provided alongside 6-digit hex, give `rgba()` string in return.

```js
const hexToRGB = hex => {
  let alpha = false, h = hex.slice(hex.startsWith('#') ? 1 : 0);
  if (h.length === 3) h = [...h].map(x => x + x).join('');
  else if (h.length === 8) alpha = true;
  h = parseInt(h, 16);
  return 'rgb' + (alpha ? 'a' : '') + '('
    + (h >>> (alpha ? 24 : 16)) + ', '
    + ((h & (alpha ? 0x00ff0000 : 0x00ff00)) >>> (alpha ? 16 : 8)) + ', '
    + ((h & (alpha ? 0x0000ff00 : 0x0000ff)) >>> (alpha ? 8 : 0))
    + (alpha ? `, ${(h & 0x000000ff)}` : '') + ')';
};
// hexToRGB('#27ae60ff') -> 'rgba(39, 174, 96, 255)'
// hexToRGB('27ae60') -> 'rgb(39, 174, 96)'
// hexToRGB('#fff') -> 'rgb(255, 255, 255)'

```

[⬆ back to top](#table-of-contents)

### isArray

Checks if the given argument is an array.

Use `Array.isArray()` to check if a value is classified as an array.

```js
const isArray = val => !!val && Array.isArray(val);
// isArray(null) -> false
// isArray([1]) -> true
```

[⬆ back to top](#table-of-contents)

### isBoolean

Checks if the given argument is a native boolean element.

Use `typeof` to check if a value is classified as a boolean primitive.

```js
const isBoolean = val => typeof val === 'boolean';
// isBoolean(null) -> false
// isBoolean(false) -> true
```

[⬆ back to top](#table-of-contents)

### isFunction

Checks if the given argument is a function.

Use `typeof` to check if a value is classified as a function primitive.

```js
const isFunction = val => val && typeof val === 'function';
// isFunction('x') -> false
// isFunction(x => x) -> true
```

[⬆ back to top](#table-of-contents)

### isNumber

Checks if the given argument is a number.

Use `typeof` to check if a value is classified as a number primitive.

```js
const isNumber = val => typeof val === 'number';
// isNumber('1') -> false
// isNumber(1) -> true
```

[⬆ back to top](#table-of-contents)

### isString

Checks if the given argument is a string.

Use `typeof` to check if a value is classified as a string primitive.

```js
const isString = val => typeof val === 'string';
// isString(10) -> false
// isString('10') -> true
```

[⬆ back to top](#table-of-contents)

### isSymbol

Checks if the given argument is a symbol.

Use `typeof` to check if a value is classified as a symbol primitive.

```js
const isSymbol = val => typeof val === 'symbol';
// isSymbol('x') -> false
// isSymbol(Symbol('x')) -> true
```

[⬆ back to top](#table-of-contents)

### RGBToHex

Converts the values of RGB components to a colorcode.

Convert given RGB parameters to hexadecimal string using bitwise left-shift operator (`<<`) and `toString(16)`, then `padStart(6,'0')` to get a 6-digit hexadecimal value.

```js
const RGBToHex = (r, g, b) => ((r << 16) + (g << 8) + b).toString(16).padStart(6, '0');
// RGBToHex(255, 165, 1) -> 'ffa501'
```

[⬆ back to top](#table-of-contents)

### timeTaken

Measures the time taken by a function to execute.

Use `console.time()` and `console.timeEnd()` to measure the difference between the start and end times to determine how long the callback took to execute.

```js
const timeTaken = callback => {
  console.time('timeTaken');  const r = callback();
  console.timeEnd('timeTaken');  return r;
};
// timeTaken(() => Math.pow(2, 10)) -> 1024
// (logged): timeTaken: 0.02099609375ms
```

[⬆ back to top](#table-of-contents)

### toDecimalMark

Use `toLocaleString()` to convert a float-point arithmetic to the [Decimal mark](https://en.wikipedia.org/wiki/Decimal_mark) form. It makes a comma separated string from a number.

 ```js
const toDecimalMark = num => num.toLocaleString("en-US");
// toDecimalMark(12305030388.9087) -> "12,305,030,388.9087"
```

[⬆ back to top](#table-of-contents)

### toOrdinalSuffix

Adds an ordinal suffix to a number.

Use the modulo operator (`%`) to find values of single and tens digits.
Find which ordinal pattern digits match.
If digit is found in teens pattern, use teens ordinal.

```js
const toOrdinalSuffix = num => {
  const int = parseInt(num), digits = [(int % 10), (int % 100)],
    ordinals = ['st', 'nd', 'rd', 'th'], oPattern = [1, 2, 3, 4],
    tPattern = [11, 12, 13, 14, 15, 16, 17, 18, 19];
  return oPattern.includes(digits[0]) && !tPattern.includes(digits[1]) ? int + ordinals[digits[0] - 1] : int + ordinals[3];
};
// toOrdinalSuffix("123") -> "123rd"
```

[⬆ back to top](#table-of-contents)

### UUIDGenerator

Generates a UUID.

Use `crypto` API to generate a UUID, compliant with [RFC4122](https://www.ietf.org/rfc/rfc4122.txt) version 4.

```js
const UUIDGenerator = () =>
  ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
// UUIDGenerator() -> '7982fcfe-5721-4632-bede-6000885be57d'
```

[⬆ back to top](#table-of-contents)

### validateNumber

Returns `true` if the given value is a number, `false` otherwise.

Use `!isNaN` in combination with `parseFloat()` to check if the argument is a number.
Use `isFinite()` to check if the number is finite.
Use `Number()` to check if the coercion holds.

```js
const validateNumber = n => !isNaN(parseFloat(n)) && isFinite(n) && Number(n) == n;
// validateNumber('10') -> true
```

[⬆ back to top](#table-of-contents)
## _Uncategorized_

### flip

Flip takes a function as an argument, then makes the first argument the last

Return a closure that takes variadic inputs, and splices the last argument to make it the first argument before applying the rest.

```js
const flip = fn => (...args) => fn(args.pop(), ...args)
/*
let a = {name: 'John Smith'}
let b = {}
const mergeFrom = flip(Object.assign)
let mergePerson = mergeFrom.bind(a)
mergePerson(b) // == b
b = {}
Object.assign(b, a) // == b
*/
```

[⬆ back to top](#table-of-contents)

## Credits

*Icons made by [Smashicons](https://www.flaticon.com/authors/smashicons) from [www.flaticon.com](https://www.flaticon.com/) is licensed by [CC 3.0 BY](http://creativecommons.org/licenses/by/3.0/).*


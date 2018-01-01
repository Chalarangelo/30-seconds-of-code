![Logo](/logo.png)

# 30 seconds of code
[![License](https://img.shields.io/badge/license-CC0--1.0-blue.svg)](https://github.com/Chalarangelo/30-seconds-of-code/blob/master/LICENSE) [![Gitter chat](https://img.shields.io/badge/chat-on%20gitter-4FB999.svg)](https://gitter.im/30-seconds-of-code/Lobby) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com) [![Travis Build](https://travis-ci.org/Chalarangelo/30-seconds-of-code.svg?branch=master)](https://travis-ci.org/Chalarangelo/30-seconds-of-code) [![Insight.io](https://img.shields.io/badge/insight.io-Ready-brightgreen.svg)](https://insight.io/github.com/Chalarangelo/30-seconds-of-code/tree/master/?source=0) [![js-semistandard-style](https://img.shields.io/badge/code%20style-semistandard-brightgreen.svg)](https://github.com/Flet/semistandard)

> Curated collection of useful Javascript snippets that you can understand in 30 seconds or less.


- Use <kbd>Ctrl</kbd> + <kbd>F</kbd> or <kbd>command</kbd> + <kbd>F</kbd> to search for a snippet.
- Contributions welcome, please read the [contribution guide](CONTRIBUTING.md).
- Snippets are written in ES6, use the [Babel transpiler](https://babeljs.io/) to ensure backwards-compatibility.
- You can import these snippets into your text editor of choice (VSCode, Atom, Sublime) using the files found in [this repo](https://github.com/Rob-Rychs/30-seconds-of-code-texteditorsnippets).
- You can import these snippets into Alfred 3, using [this file](https://github.com/lslvxy/30-seconds-of-code-alfredsnippets).
- You can find a package with all the snippets on [npm](https://www.npmjs.com/package/tsoc). Bear in mind that most of these snippets are not production-ready.

## Table of Contents

### 🔌 Adapter

<details>
<summary>View contents</summary>

* [`call`](#call)
* [`collectInto`](#collectinto)
* [`flip`](#flip)
* [`pipeFunctions`](#pipefunctions)
* [`promisify`](#promisify)
* [`spreadOver`](#spreadover)

</details>

### 📚 Array

<details>
<summary>View contents</summary>

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
* [`join`](#join)
* [`last`](#last)
* [`mapObject`](#mapobject)
* [`nthElement`](#nthelement)
* [`pick`](#pick)
* [`pull`](#pull)
* [`pullAtIndex`](#pullatindex)
* [`pullAtValue`](#pullatvalue)
* [`quickSort`](#quicksort)
* [`reducedFilter`](#reducedfilter)
* [`remove`](#remove)
* [`sample`](#sample)
* [`sampleSize`](#samplesize)
* [`shuffle`](#shuffle)
* [`similarity`](#similarity)
* [`sortedIndex`](#sortedindex)
* [`symmetricDifference`](#symmetricdifference)
* [`tail`](#tail)
* [`take`](#take)
* [`takeRight`](#takeright)
* [`union`](#union)
* [`without`](#without)
* [`zip`](#zip)
* [`zipObject`](#zipobject)

</details>

### 🌐 Browser

<details>
<summary>View contents</summary>

* [`arrayToHtmlList`](#arraytohtmllist)
* [`bottomVisible`](#bottomvisible)
* [`copyToClipboard`](#copytoclipboard)
* [`currentURL`](#currenturl)
* [`detectDeviceType`](#detectdevicetype)
* [`elementIsVisibleInViewport`](#elementisvisibleinviewport)
* [`getScrollPosition`](#getscrollposition)
* [`getStyle`](#getstyle)
* [`hasClass`](#hasclass)
* [`hide`](#hide)
* [`httpsRedirect`](#httpsredirect)
* [`onUserInputChange`](#onuserinputchange)
* [`redirect`](#redirect)
* [`scrollToTop`](#scrolltotop)
* [`setStyle`](#setstyle)
* [`show`](#show)
* [`speechSynthesis`](#speechsynthesis)
* [`toggleClass`](#toggleclass)
* [`UUIDGeneratorBrowser`](#uuidgeneratorbrowser)

</details>

### ⏱️ Date

<details>
<summary>View contents</summary>

* [`getDaysDiffBetweenDates`](#getdaysdiffbetweendates)
* [`JSONToDate`](#jsontodate)
* [`toEnglishDate`](#toenglishdate)
* [`tomorrow`](#tomorrow)

</details>

### 🎛️ Function

<details>
<summary>View contents</summary>

* [`chainAsync`](#chainasync)
* [`compose`](#compose)
* [`curry`](#curry)
* [`functionName`](#functionname)
* [`memoize`](#memoize)
* [`runPromisesInSeries`](#runpromisesinseries)
* [`sleep`](#sleep)

</details>

### 🔮 Logic

<details>
<summary>View contents</summary>

* [`negate`](#negate)

</details>

### ➗ Math

<details>
<summary>View contents</summary>

* [`average`](#average)
* [`clampNumber`](#clampnumber)
* [`collatz`](#collatz)
* [`digitize`](#digitize)
* [`distance`](#distance)
* [`elo`](#elo)
* [`factorial`](#factorial)
* [`fibonacci`](#fibonacci)
* [`fibonacciCountUntilNum`](#fibonaccicountuntilnum)
* [`fibonacciUntilNum`](#fibonacciuntilnum)
* [`gcd`](#gcd)
* [`hammingDistance`](#hammingdistance)
* [`inRange`](#inrange)
* [`isArmstrongNumber`](#isarmstrongnumber)
* [`isDivisible`](#isdivisible)
* [`isEven`](#iseven)
* [`isPrime`](#isprime)
* [`lcm`](#lcm)
* [`max`](#max)
* [`median`](#median)
* [`min`](#min)
* [`percentile`](#percentile)
* [`powerset`](#powerset)
* [`primes`](#primes)
* [`randomIntegerInRange`](#randomintegerinrange)
* [`randomNumberInRange`](#randomnumberinrange)
* [`round`](#round)
* [`standardDeviation`](#standarddeviation)
* [`sum`](#sum)
* [`sumPower`](#sumpower)

</details>

### 📦 Node

<details>
<summary>View contents</summary>

* [`hasFlags`](#hasflags)
* [`isTravisCI`](#istravisci)
* [`JSONToFile`](#jsontofile)
* [`readFileLines`](#readfilelines)
* [`untildify`](#untildify)
* [`UUIDGeneratorNode`](#uuidgeneratornode)

</details>

### 🗃️ Object

<details>
<summary>View contents</summary>

* [`cleanObj`](#cleanobj)
* [`invertKeyValues`](#invertkeyvalues)
* [`lowercaseKeys`](#lowercasekeys)
* [`objectFromPairs`](#objectfrompairs)
* [`objectToPairs`](#objecttopairs)
* [`orderBy`](#orderby)
* [`select`](#select)
* [`shallowClone`](#shallowclone)
* [`size`](#size)
* [`truthCheckCollection`](#truthcheckcollection)

</details>

### 📜 String

<details>
<summary>View contents</summary>

* [`anagrams`](#anagrams)
* [`byteSize`](#bytesize)
* [`capitalize`](#capitalize)
* [`capitalizeEveryWord`](#capitalizeeveryword)
* [`countVowels`](#countvowels)
* [`escapeHTML`](#escapehtml)
* [`escapeRegExp`](#escaperegexp)
* [`fromCamelCase`](#fromcamelcase)
* [`isAbsoluteURL`](#isabsoluteurl)
* [`mask`](#mask)
* [`palindrome`](#palindrome)
* [`repeatString`](#repeatstring)
* [`reverseString`](#reversestring)
* [`sortCharactersInString`](#sortcharactersinstring)
* [`splitLines`](#splitlines)
* [`toCamelCase`](#tocamelcase)
* [`toKebabCase`](#tokebabcase)
* [`toSnakeCase`](#tosnakecase)
* [`truncateString`](#truncatestring)
* [`unescapeHTML`](#unescapehtml)
* [`words`](#words)

</details>

### 🔧 Utility

<details>
<summary>View contents</summary>

* [`coalesce`](#coalesce)
* [`coalesceFactory`](#coalescefactory)
* [`extendHex`](#extendhex)
* [`getType`](#gettype)
* [`getURLParameters`](#geturlparameters)
* [`hexToRGB`](#hextorgb)
* [`isArray`](#isarray)
* [`isArrayLike`](#isarraylike)
* [`isBoolean`](#isboolean)
* [`isFunction`](#isfunction)
* [`isNull`](#isnull)
* [`isNumber`](#isnumber)
* [`isPrimitive`](#isprimitive)
* [`isPromiseLike`](#ispromiselike)
* [`isString`](#isstring)
* [`isSymbol`](#issymbol)
* [`isValidJSON`](#isvalidjson)
* [`randomHexColorCode`](#randomhexcolorcode)
* [`RGBToHex`](#rgbtohex)
* [`sdbm`](#sdbm)
* [`timeTaken`](#timetaken)
* [`toDecimalMark`](#todecimalmark)
* [`toOrdinalSuffix`](#toordinalsuffix)
* [`validateNumber`](#validatenumber)
* [`yesNo`](#yesno)

</details>

### _Uncategorized_

<details>
<summary>View contents</summary>

* [`solveRPN`](#solverpn)

</details>

---
 ## 🔌 Adapter

### call

Given a key and a set of arguments, call them when given a context. Primarily useful in composition.

Use a closure to call a stored key with stored arguments.

```js
const call = (key, ...args) => context => context[key](...args);
```

<details>
<summary>Examples</summary>

```js
Promise.resolve([1, 2, 3])
  .then(call('map', x => 2 * x))
  .then(console.log); //[ 2, 4, 6 ]
const map = call.bind(null, 'map');
Promise.resolve([1, 2, 3])
  .then(map(x => 2 * x))
  .then(console.log); //[ 2, 4, 6 ]
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### collectInto

Changes a function that accepts an array into a variadic function.

Given a function, return a closure that collects all inputs into an array-accepting function.

```js
const collectInto = fn => (...args) => fn(args);
```

<details>
<summary>Examples</summary>

```js
const Pall = collectInto(Promise.all.bind(Promise));
let p1 = Promise.resolve(1);
let p2 = Promise.resolve(2);
let p3 = new Promise(resolve => setTimeout(resolve, 2000, 3));
Pall(p1, p2, p3).then(console.log);
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### flip

Flip takes a function as an argument, then makes the first argument the last

Return a closure that takes variadic inputs, and splices the last argument to make it the first argument before applying the rest.

```js
const flip = fn => (...args) => fn(args.pop(), ...args);
```

<details>
<summary>Examples</summary>

```js
let a = { name: 'John Smith' };
let b = {};
const mergeFrom = flip(Object.assign);
let mergePerson = mergeFrom.bind(null, a);
mergePerson(b); // == b
b = {};
Object.assign(b, a); // == b
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### pipeFunctions

Performs left-to-right function composition.

Use `Array.reduce()` with the spread operator (`...`) to perform left-to-right function composition.
The first (leftmost) function can accept one or more arguments; the remaining functions must be unary.

```js
const pipeFunctions = (...fns) => fns.reduce((f, g) => (...args) => g(f(...args)));
```

<details>
<summary>Examples</summary>

```js
const add5 = x => x + 5;
const multiply = (x, y) => x * y;
const multiplyAndAdd5 = pipeFunctions(multiply, add5);
multiplyAndAdd5(5, 2); // 15
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### promisify

Converts an asynchronous function to return a promise.

Use currying to return a function returning a `Promise` that calls the original function.
Use the `...rest` operator to pass in all the parameters.

*In Node 8+, you can use [`util.promisify`](https://nodejs.org/api/util.html#util_util_promisify_original)*

```js
const promisify = func => (...args) =>
  new Promise((resolve, reject) =>
    func(...args, (err, result) => (err ? reject(err) : resolve(result)))
  );
```

<details>
<summary>Examples</summary>

```js
const delay = promisify((d, cb) => setTimeout(cb, d));
delay(2000).then(() => console.log('Hi!')); // // Promise resolves after 2s
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### spreadOver

Takes a variadic function and returns a closure that accepts an array of arguments to map to the inputs of the function.

Use closures and the spread operator (`...`) to map the array of arguments to the inputs of the function.

```js
const spreadOver = fn => argsArr => fn(...argsArr);
```

<details>
<summary>Examples</summary>

```js
const arrayMax = spreadOver(Math.max);
arrayMax([1, 2, 3]); // 3
arrayMax([1, 2, 4]); // 4
```

</details>

<br>[⬆ Back to top](#table-of-contents)

---
 ## 📚 Array

### chunk

Chunks an array into smaller arrays of a specified size.

Use `Array.from()` to create a new array, that fits the number of chunks that will be produced.
Use `Array.slice()` to map each element of the new array to a chunk the length of `size`.
If the original array can't be split evenly, the final chunk will contain the remaining elements.

```js
const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );
```

<details>
<summary>Examples</summary>

```js
chunk([1, 2, 3, 4, 5], 2); // [[1,2],[3,4],[5]]
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### compact

Removes falsey values from an array.

Use `Array.filter()` to filter out falsey values (`false`, `null`, `0`, `""`, `undefined`, and `NaN`).

```js
const compact = arr => arr.filter(Boolean);
```

<details>
<summary>Examples</summary>

```js
compact([0, 1, false, 2, '', 3, 'a', 'e' * 23, NaN, 's', 34]); // [ 1, 2, 3, 'a', 's', 34 ]
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### countOccurrences

Counts the occurrences of a value in an array.

Use `Array.reduce()` to increment a counter each time you encounter the specific value inside the array.

```js
const countOccurrences = (arr, value) => arr.reduce((a, v) => (v === value ? a + 1 : a + 0), 0);
```

<details>
<summary>Examples</summary>

```js
countOccurrences([1, 1, 2, 1, 2, 3], 1); // 3
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### deepFlatten

Deep flattens an array.

Use recursion.
Use `Array.concat()` with an empty array (`[]`) and the spread operator (`...`) to flatten an array.
Recursively flatten each element that is an array.

```js
const deepFlatten = arr => [].concat(...arr.map(v => (Array.isArray(v) ? deepFlatten(v) : v)));
```

<details>
<summary>Examples</summary>

```js
deepFlatten([1, [2], [[3], 4], 5]); // [1,2,3,4,5]
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### difference

Returns the difference between two arrays.

Create a `Set` from `b`, then use `Array.filter()` on `a` to only keep values not contained in `b`.

```js
const difference = (a, b) => {
  const s = new Set(b);
  return a.filter(x => !s.has(x));
};
```

<details>
<summary>Examples</summary>

```js
difference([1, 2, 3], [1, 2, 4]); // [3]
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### differenceWith

Filters out all values from an array for which the comparator function does not return `true`.

Use `Array.filter()` and `Array.find()` to find the appropriate values.

```js
const differenceWith = (arr, val, comp) => arr.filter(a => !val.find(b => comp(a, b)));
```

<details>
<summary>Examples</summary>

```js
differenceWith([1, 1.2, 1.5, 3], [1.9, 3], (a, b) => Math.round(a) == Math.round(b)); // [1, 1.2]
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### distinctValuesOfArray

Returns all the distinct values of an array.

Use ES6 `Set` and the `...rest` operator to discard all duplicated values.

```js
const distinctValuesOfArray = arr => [...new Set(arr)];
```

<details>
<summary>Examples</summary>

```js
distinctValuesOfArray([1, 2, 2, 3, 4, 4, 5]); // [1,2,3,4,5]
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### dropElements

Removes elements in an array until the passed function returns `true`. Returns the remaining elements in the array.

Loop through the array, using `Array.slice()` to drop the first element of the array until the returned value from the function is `true`.
Returns the remaining elements.

```js
const dropElements = (arr, func) => {
  while (arr.length > 0 && !func(arr[0])) arr = arr.slice(1);
  return arr;
};
```

<details>
<summary>Examples</summary>

```js
dropElements([1, 2, 3, 4], n => n >= 3); // [3,4]
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### dropRight

Returns a new array with `n` elements removed from the right.

Use `Array.slice()` to slice the remove the specified number of elements from the right.

```js
const dropRight = (arr, n = 1) => arr.slice(0, -n);
```

<details>
<summary>Examples</summary>

```js
dropRight([1, 2, 3]); // [1,2]
dropRight([1, 2, 3], 2); // [1]
dropRight([1, 2, 3], 42); // []
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### everyNth

Returns every nth element in an array.

Use `Array.filter()` to create a new array that contains every nth element of a given array.

```js
const everyNth = (arr, nth) => arr.filter((e, i) => i % nth === nth - 1);
```

<details>
<summary>Examples</summary>

```js
everyNth([1, 2, 3, 4, 5, 6], 2); // [ 2, 4, 6 ]
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### filterNonUnique

Filters out the non-unique values in an array.

Use `Array.filter()` for an array containing only the unique values.

```js
const filterNonUnique = arr => arr.filter(i => arr.indexOf(i) === arr.lastIndexOf(i));
```

<details>
<summary>Examples</summary>

```js
filterNonUnique([1, 2, 2, 3, 4, 4, 5]); // [1,3,5]
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### flatten

Flattens an array.

Use a new array and concatenate it with the spread input array causing a shallow denesting of any contained arrays.

```js
const flatten = arr => [].concat(...arr);
```

<details>
<summary>Examples</summary>

```js
flatten([1, [2], 3, 4]); // [1,2,3,4]
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### flattenDepth

Flattens an array up to the specified depth.

Use recursion, decrementing `depth` by 1 for each level of depth.
Use `Array.reduce()` and `Array.concat()` to merge elements or arrays.
Base case, for `depth` equal to `1` stops recursion.
Omit the second element, `depth` to flatten only to a depth of `1` (single flatten).

```js
const flattenDepth = (arr, depth = 1) =>
  depth != 1
    ? arr.reduce((a, v) => a.concat(Array.isArray(v) ? flattenDepth(v, depth - 1) : v), [])
    : arr.reduce((a, v) => a.concat(v), []);
```

<details>
<summary>Examples</summary>

```js
flattenDepth([1, [2], 3, 4]); // [1,2,3,4]
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### groupBy

Groups the elements of an array based on the given function.

Use `Array.map()` to map the values of an array to a function or property name.
Use `Array.reduce()` to create an object, where the keys are produced from the mapped results.

```js
const groupBy = (arr, func) =>
  arr.map(typeof func === 'function' ? func : val => val[func]).reduce((acc, val, i) => {
    acc[val] = (acc[val] || []).concat(arr[i]);
    return acc;
  }, {});
```

<details>
<summary>Examples</summary>

```js
groupBy([6.1, 4.2, 6.3], Math.floor); // {4: [4.2], 6: [6.1, 6.3]}
groupBy(['one', 'two', 'three'], 'length'); // {3: ['one', 'two'], 5: ['three']}
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### head

Returns the head of a list.

Use `arr[0]` to return the first element of the passed array.

```js
const head = arr => arr[0];
```

<details>
<summary>Examples</summary>

```js
head([1, 2, 3]); // 1
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### initial

Returns all the elements of an array except the last one.

Use `arr.slice(0,-1)` to return all but the last element of the array.

```js
const initial = arr => arr.slice(0, -1);
```

<details>
<summary>Examples</summary>

```js
initial([1, 2, 3]); // [1,2]
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### initialize2DArray

Initializes a 2D array of given width and height and value.

Use `Array.map()` to generate h rows where each is a new array of size w initialize with value. If the value is not provided, default to `null`.

```js
const initialize2DArray = (w, h, val = null) =>
  Array(h)
    .fill()
    .map(() => Array(w).fill(val));
```

<details>
<summary>Examples</summary>

```js
initialize2DArray(2, 2, 0); // [[0,0], [0,0]]
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### initializeArrayWithRange

Initializes an array containing the numbers in the specified range where `start` and `end` are inclusive.

Use `Array((end + 1) - start)` to create an array of the desired length, `Array.map()` to fill with the desired values in a range.
You can omit `start` to use a default value of `0`.

```js
const initializeArrayWithRange = (end, start = 0) =>
  Array.from({ length: end + 1 - start }).map((v, i) => i + start);
```

<details>
<summary>Examples</summary>

```js
initializeArrayWithRange(5); // [0,1,2,3,4,5]
initializeArrayWithRange(7, 3); // [3,4,5,6,7]
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### initializeArrayWithValues

Initializes and fills an array with the specified values.

Use `Array(n)` to create an array of the desired length, `fill(v)` to fill it with the desired values.
You can omit `value` to use a default value of `0`.

```js
const initializeArrayWithValues = (n, value = 0) => Array(n).fill(value);
```

<details>
<summary>Examples</summary>

```js
initializeArrayWithValues(5, 2); // [2,2,2,2,2]
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### intersection

Returns a list of elements that exist in both arrays.

Create a `Set` from `b`, then use `Array.filter()` on `a` to only keep values contained in `b`.

```js
const intersection = (a, b) => {
  const s = new Set(b);
  return a.filter(x => s.has(x));
};
```

<details>
<summary>Examples</summary>

```js
intersection([1, 2, 3], [4, 3, 2]); // [2,3]
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### join

Joins all elements of an array into a string and returns this string. Uses a separator and an end separator.

Use `Array.reduce()` to combine elements into a string.
Omit the second argument, `separator`, to use a default separator of `','`.
Omit the third argument, `end`, to use the same value as `separator` by default.

```js
const join = (arr, separator = ',', end = separator) =>
  arr.reduce(
    (acc, val, i) =>
      i == arr.length - 2
        ? acc + val + end
        : i == arr.length - 1 ? acc + val : acc + val + separator,
    ''
  );
```

<details>
<summary>Examples</summary>

```js
join(); // ''
join(['pen', 'pineapple', 'apple', 'pen'], ',', '&'); //"pen,pineapple,apple&pen"
join(['pen', 'pineapple', 'apple', 'pen'], ','); //"pen,pineapple,apple,pen"
join(['pen', 'pineapple', 'apple', 'pen']); //"pen,pineapple,apple,pen"
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### last

Returns the last element in an array.

Use `arr.length - 1` to compute the index of the last element of the given array and returning it.

```js
const last = arr => arr[arr.length - 1];
```

<details>
<summary>Examples</summary>

```js
last([1, 2, 3]); // 3
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### mapObject

Maps the values of an array to an object using a function, where the key-value pairs consist of the original value as the key and the mapped value.

Use an anonymous inner function scope to declare an undefined memory space, using closures to store a return value. Use a new `Array` to store the array with a map of the function over its data set and a comma operator to return a second step, without needing to move from one context to another (due to closures and order of operations).

```js
const mapObject = (arr, fn) =>
  (a => (
    (a = [arr, arr.map(fn)]), a[0].reduce((acc, val, ind) => ((acc[val] = a[1][ind]), acc), {})
  ))();
```

<details>
<summary>Examples</summary>

```js
const squareIt = arr => mapObject(arr, a => a * a);
squareIt([1, 2, 3]); // { 1: 1, 2: 4, 3: 9 }
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### nthElement

Returns the nth element of an array.

Use `Array.slice()` to get an array containing the nth element at the first place.
If the index is out of bounds, return `[]`.
Omit the second argument, `n`, to get the first element of the array.

```js
const nthElement = (arr, n = 0) => (n > 0 ? arr.slice(n, n + 1) : arr.slice(n))[0];
```

<details>
<summary>Examples</summary>

```js
nthElement(['a', 'b', 'c'], 1); // 'b'
nthElement(['a', 'b', 'b'], -3); // 'a'
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### pick

Picks the key-value pairs corresponding to the given keys from an object.

Use `Array.reduce()` to convert the filtered/picked keys back to an object with the corresponding key-value pair if the key exists in the obj.

```js
const pick = (obj, arr) =>
  arr.reduce((acc, curr) => (curr in obj && (acc[curr] = obj[curr]), acc), {});
```

<details>
<summary>Examples</summary>

```js
pick({ a: 1, b: '2', c: 3 }, ['a', 'c']); // { 'a': 1, 'c': 3 }
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### pull

Mutates the original array to filter out the values specified.

Use `Array.filter()` and `Array.includes()` to pull out the values that are not needed.
Use `Array.length = 0` to mutate the passed in an array by resetting it's length to zero and `Array.push()` to re-populate it with only the pulled values.

_(For a snippet that does not mutate the original array see [`without`](#without))_

```js
const pull = (arr, ...args) => {
  let argState = Array.isArray(args[0]) ? args[0] : args;
  let pulled = arr.filter((v, i) => !argState.includes(v));
  arr.length = 0;
  pulled.forEach(v => arr.push(v));
};
```

<details>
<summary>Examples</summary>

```js
let myArray1 = ['a', 'b', 'c', 'a', 'b', 'c'];
pull(myArray1, 'a', 'c');
console.log(myArray1); // [ 'b', 'b' ]

let myArray2 = ['a', 'b', 'c', 'a', 'b', 'c'];
pull(myArray2, ['a', 'c']);
console.log(myArray2); // [ 'b', 'b' ]
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### pullAtIndex

Mutates the original array to filter out the values at the specified indexes.

Use `Array.filter()` and `Array.includes()` to pull out the values that are not needed.
Use `Array.length = 0` to mutate the passed in an array by resetting it's length to zero and `Array.push()` to re-populate it with only the pulled values.
Use `Array.push()` to keep track of pulled values

```js
const pullAtIndex = (arr, pullArr) => {
  let removed = [];
  let pulled = arr
    .map((v, i) => (pullArr.includes(i) ? removed.push(v) : v))
    .filter((v, i) => !pullArr.includes(i));
  arr.length = 0;
  pulled.forEach(v => arr.push(v));
  return removed;
};
```

<details>
<summary>Examples</summary>

```js
let myArray = ['a', 'b', 'c', 'd'];
let pulled = pullAtIndex(myArray, [1, 3]);

console.log(myArray); // [ 'a', 'c' ]
console.log(pulled); // [ 'b', 'd' ]
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### pullAtValue

Mutates the original array to filter out the values specified. Returns the removed elements.

Use `Array.filter()` and `Array.includes()` to pull out the values that are not needed.
Use `Array.length = 0` to mutate the passed in an array by resetting it's length to zero and `Array.push()` to re-populate it with only the pulled values.
Use `Array.push()` to keep track of pulled values

```js
const pullAtValue = (arr, pullArr) => {
  let removed = [],
    pushToRemove = arr.forEach((v, i) => (pullArr.includes(v) ? removed.push(v) : v)),
    mutateTo = arr.filter((v, i) => !pullArr.includes(v));
  arr.length = 0;
  mutateTo.forEach(v => arr.push(v));
  return removed;
};
```

<details>
<summary>Examples</summary>

```js
let myArray = ['a', 'b', 'c', 'd'];
let pulled = pullAtValue(myArray, ['b', 'd']);
console.log(myArray); // [ 'a', 'c' ]
console.log(pulled); // [ 'b', 'd' ]
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### quickSort

QuickSort an Array (ascending sort by default).

Use recursion. 
Use `Array.filter` and spread operator (`...`) to create an array that all elements with values less than the pivot come before the pivot, and all elements with values greater than the pivot come after it. 
If the parameter `desc` is truthy, return array sorts in descending order.

```js
const quickSort = ([n, ...nums], desc) =>
  isNaN(n)
    ? []
    : [
        ...quickSort(nums.filter(v => (desc ? v > n : v <= n)), desc),
        n,
        ...quickSort(nums.filter(v => (!desc ? v > n : v <= n)), desc)
      ];
```

<details>
<summary>Examples</summary>

```js
quickSort([4, 1, 3, 2]); // [1,2,3,4]
quickSort([4, 1, 3, 2], true); // [4,3,2,1]
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### reducedFilter

Filter an array of objects based on a condition while also filtering out unspecified keys.

Use `Array.filter()` to filter the array based on the predicate `fn` so that it returns the objects for which the condition returned a truthy value. 
On the filtered array, use `Array.map()` to return the new object using `Array.reduce()` to filter out the keys which were not supplied as the `keys` argument.

```js
const reducedFilter = (data, keys, fn) =>
  data.filter(fn).map(el =>
    keys.reduce((acc, key) => {
      acc[key] = el[key];
      return acc;
    }, {})
  );
```

<details>
<summary>Examples</summary>

```js
const data = [
  {
    id: 1,
    name: 'john',
    age: 24
  },
  {
    id: 2,
    name: 'mike',
    age: 50
  }
];

reducedFilter(data, ['id', 'name'], item => item.age > 24); // [{ id: 2, name: 'mike'}]
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### remove

Removes elements from an array for which the given function returns `false`.

Use `Array.filter()` to find array elements that return truthy values and `Array.reduce()` to remove elements using `Array.splice()`.
The `func` is invoked with three arguments (`value, index, array`).

```js
const remove = (arr, func) =>
  Array.isArray(arr)
    ? arr.filter(func).reduce((acc, val) => {
        arr.splice(arr.indexOf(val), 1);
        return acc.concat(val);
      }, [])
    : [];
```

<details>
<summary>Examples</summary>

```js
remove([1, 2, 3, 4], n => n % 2 == 0); // [2, 4]
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### sample

Returns a random element from an array.

Use `Math.random()` to generate a random number, multiply it by `length` and round it of to the nearest whole number using `Math.floor()`.
This method also works with strings.

```js
const sample = arr => arr[Math.floor(Math.random() * arr.length)];
```

<details>
<summary>Examples</summary>

```js
sample([3, 7, 9, 11]); // 9
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### sampleSize

Gets `n` random elements at unique keys from `array` up to the size of `array`.

Shuffle the array using the [Fisher-Yates algorithm](https://github.com/chalarangelo/30-seconds-of-code#shuffle).
Use `Array.slice()` to get the first `n` elements.
Omit the second argument, `n` to get only one element at random from the array.

```js
const sampleSize = ([...arr], n = 1) => {
  let m = arr.length;
  while (m) {
    const i = Math.floor(Math.random() * m--);
    [arr[m], arr[i]] = [arr[i], arr[m]];
  }
  return arr.slice(0, n);
};
```

<details>
<summary>Examples</summary>

```js
sampleSize([1, 2, 3], 2); // [3,1]
sampleSize([1, 2, 3], 4); // [2,3,1]
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### shuffle

Randomizes the order of the values of an array, returning a new array.

Uses the Fisher-Yates algoritm to reorder the elements of the array, based on the [Lodash implementation](https://github.com/lodash/lodash/blob/b2ea6b1cd251796dcb5f9700c4911a7b6223920b/shuffle.js), but as a pure function.

```js
const shuffle = ([...arr]) => {
  let m = arr.length;
  while (m) {
    const i = Math.floor(Math.random() * m--);
    [arr[m], arr[i]] = [arr[i], arr[m]];
  }
  return arr;
};
```

<details>
<summary>Examples</summary>

```js
const foo = [1, 2, 3];
shuffle(foo); // [2,3,1]
console.log(foo); // [1,2,3]
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### similarity

Returns an array of elements that appear in both arrays.

Use `filter()` to remove values that are not part of `values`, determined using `includes()`.

```js
const similarity = (arr, values) => arr.filter(v => values.includes(v));
```

<details>
<summary>Examples</summary>

```js
similarity([1, 2, 3], [1, 2, 4]); // [1,2]
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### sortedIndex

Returns the lowest index at which value should be inserted into array in order to maintain its sort order.

Check if the array is sorted in descending order (loosely).
Use `Array.findIndex()` to find the appropriate index where the element should be inserted.

```js
const sortedIndex = (arr, n) => {
  const isDescending = arr[0] > arr[arr.length - 1];
  const index = arr.findIndex(el => (isDescending ? n >= el : n <= el));
  return index === -1 ? arr.length : index;
};
```

<details>
<summary>Examples</summary>

```js
sortedIndex([5, 3, 2, 1], 4); // 1
sortedIndex([30, 50], 40); // 1
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### symmetricDifference

Returns the symmetric difference between two arrays.

Create a `Set` from each array, then use `Array.filter()` on each of them to only keep values not contained in the other.

```js
const symmetricDifference = (a, b) => {
  const sA = new Set(a),
    sB = new Set(b);
  return [...a.filter(x => !sB.has(x)), ...b.filter(x => !sA.has(x))];
};
```

<details>
<summary>Examples</summary>

```js
symmetricDifference([1, 2, 3], [1, 2, 4]); // [3,4]
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### tail

Returns all elements in an array except for the first one.

Return `arr.slice(1)` if the array's `length` is more than `1`, otherwise, return the whole array.

```js
const tail = arr => (arr.length > 1 ? arr.slice(1) : arr);
```

<details>
<summary>Examples</summary>

```js
tail([1, 2, 3]); // [2,3]
tail([1]); // [1]
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### take

Returns an array with n elements removed from the beginning.

Use `Array.slice()` to create a slice of the array with `n` elements taken from the beginning.

```js
const take = (arr, n = 1) => arr.slice(0, n);
```

<details>
<summary>Examples</summary>

```js
take([1, 2, 3], 5); // [1, 2, 3]
take([1, 2, 3], 0); // []
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### takeRight

Returns an array with n elements removed from the end.

Use `Array.slice()` to create a slice of the array with `n` elements taken from the end.

```js
const takeRight = (arr, n = 1) => arr.slice(arr.length - n, arr.length);
```

<details>
<summary>Examples</summary>

```js
takeRight([1, 2, 3], 2); // [ 2, 3 ]
takeRight([1, 2, 3]); // [3]
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### union

Returns every element that exists in any of the two arrays once.

Create a `Set` with all values of `a` and `b` and convert to an array.

```js
const union = (a, b) => Array.from(new Set([...a, ...b]));
```

<details>
<summary>Examples</summary>

```js
union([1, 2, 3], [4, 3, 2]); // [1,2,3,4]
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### without

Filters out the elements of an array, that have one of the specified values.

Use `Array.filter()` to create an array excluding(using `!Array.includes()`) all given values.

_(For a snippet that mutates the original array see [`pull`](#pull))_

```js
const without = (arr, ...args) => arr.filter(v => !args.includes(v));
```

<details>
<summary>Examples</summary>

```js
without([2, 1, 2, 3], 1, 2); // [3]
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### zip

Creates an array of elements, grouped based on the position in the original arrays.

Use `Math.max.apply()` to get the longest array in the arguments.
Creates an array with that length as return value and use `Array.from()` with a map-function to create an array of grouped elements.
If lengths of the argument-arrays vary, `undefined` is used where no value could be found.

```js
const zip = (...arrays) => {
  const maxLength = Math.max(...arrays.map(x => x.length));
  return Array.from({ length: maxLength }).map((_, i) => {
    return Array.from({ length: arrays.length }, (_, k) => arrays[k][i]);
  });
};
```

<details>
<summary>Examples</summary>

```js
zip(['a', 'b'], [1, 2], [true, false]); // [['a', 1, true], ['b', 2, false]]
zip(['a'], [1, 2], [true, false]); // [['a', 1, true], [undefined, 2, false]]
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### zipObject

Given an array of valid property identifiers and an array of values, return an object associating the properties to the values.

Since an object can have undefined values but not undefined property pointers, the array of properties is used to decide the structure of the resulting object using `Array.reduce()`.

```js
const zipObject = (props, values) =>
  props.reduce((obj, prop, index) => ((obj[prop] = values[index]), obj), {});
```

<details>
<summary>Examples</summary>

```js
zipObject(['a', 'b', 'c'], [1, 2]); // {a: 1, b: 2, c: undefined}
zipObject(['a', 'b'], [1, 2, 3]); // {a: 1, b: 2}
```

</details>

<br>[⬆ Back to top](#table-of-contents)

---
 ## 🌐 Browser

### arrayToHtmlList

Converts the given array elements into `<li>` tags and appends them to the list of the given id.

Use `Array.map()` and `document.querySelector()` to create a list of html tags.

```js
const arrayToHtmlList = (arr, listID) =>
  arr.map(item => (document.querySelector('#' + listID).innerHTML += `<li>${item}</li>`));
```

<details>
<summary>Examples</summary>

```js
arrayToHtmlList(['item 1', 'item 2'], 'myListID');
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### bottomVisible

Returns `true` if the bottom of the page is visible, `false` otherwise.

Use `scrollY`, `scrollHeight` and `clientHeight` to determine if the bottom of the page is visible.

```js
const bottomVisible = () =>
  document.documentElement.clientHeight + window.scrollY >=
  (document.documentElement.scrollHeight || document.documentElement.clientHeight);
```

<details>
<summary>Examples</summary>

```js
bottomVisible(); // true
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### copyToClipboard

Copy a string to the clipboard. Only works as a result of user action (i.e. inside a `click` event listener).

Create a new `<textarea>` element, fill it with the supplied data and add it to the HTML document.
Use `Selection.getRangeAt()`to store the selected range (if any).
Use `document.execCommand('copy')` to copy to the clipboard.
Remove the `<textarea>` element from the HTML document.
Finally, use `Selection().addRange()` to recover the original selected range (if any).

```js
const copyToClipboard = str => {
  const el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  const selected =
    document.getSelection().rangeCount > 0 ? document.getSelection().getRangeAt(0) : false;
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
  if (selected) {
    document.getSelection().removeAllRanges();
    document.getSelection().addRange(selected);
  }
};
```

<details>
<summary>Examples</summary>

```js
copyToClipboard('Lorem ipsum'); // 'Lorem ipsum' copied to clipboard.
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### currentURL

Returns the current URL.

Use `window.location.href` to get current URL.

```js
const currentURL = () => window.location.href;
```

<details>
<summary>Examples</summary>

```js
currentURL(); // 'https://google.com'
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### detectDeviceType

Detects wether the website is being opened in a mobile device or a desktop/laptop.

Use a regular expression to test the `navigator.userAgent` property to figure out if the device is a mobile device or a desktop/laptop.

```js
const detectDeviceType = () =>
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    ? 'Mobile'
    : 'Desktop';
```

<details>
<summary>Examples</summary>

```js
detectDeviceType(); // "Mobile"
detectDeviceType(); // "Desktop"
```

</details>

<br>[⬆ Back to top](#table-of-contents)


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
```

<details>
<summary>Examples</summary>

```js
// e.g. 100x100 viewport and a 10x10px element at position {top: -1, left: 0, bottom: 9, right: 10}
elementIsVisibleInViewport(el); // false // (not fully visible)
elementIsVisibleInViewport(el, true); // true // (partially visible)
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### getScrollPosition

Returns the scroll position of the current page.

Use `pageXOffset` and `pageYOffset` if they are defined, otherwise `scrollLeft` and `scrollTop`.
You can omit `el` to use a default value of `window`.

```js
const getScrollPosition = (el = window) => ({
  x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft,
  y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop
});
```

<details>
<summary>Examples</summary>

```js
getScrollPosition(); // {x: 0, y: 200}
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### getStyle

Returns the value of a CSS rule for the specified element.

Use `Window.getComputedStyle()` to get the value of the CSS rule for the specified element.

```js
const getStyle = (el, ruleName) => getComputedStyle(el)[ruleName];
```

<details>
<summary>Examples</summary>

```js
getStyle(document.querySelector('p'), 'font-size'); // '16px'
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### hasClass

Returns `true` if the element has the specified class, `false` otherwise.

Use `element.classList.contains()` to check if the element has the specified class.

```js
const hasClass = (el, className) => el.classList.contains(className);
```

<details>
<summary>Examples</summary>

```js
hasClass(document.querySelector('p.special'), 'special'); // true
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### hide

Hides all the elements specified.

Use the spread operator (`...`) and `Array.forEach()` to apply `display: none` to each element specified.

```js
const hide = (...el) => [...el].forEach(e => (e.style.display = 'none'));
```

<details>
<summary>Examples</summary>

```js
hide(document.querySelectorAll('img')); // Hides all <img> elements on the page
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### httpsRedirect

Redirects the page to HTTPS if its currently in HTTP. Also, pressing the back button doesn't take it back to the HTTP page as its replaced in the history.

Use `location.protocol` to get the protocol currently being used. If it's not HTTPS, use `location.replace()` to replace the existing page with the HTTPS version of the page. Use `location.href` to get the full address, split it with `String.split()` and remove the protocol part of the URL.  

<details>
<summary>Examples</summary>

```js
const httpsRedirect = () => {
  if (location.protocol !== 'https:') location.replace('https://' + location.href.split('//')[1]);
};
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### onUserInputChange

Run the callback whenever the user input type changes (`mouse` or `touch`). Useful for enabling/disabling code depending on the input device. This process is dynamic and works with hybrid devices (e.g. touchscreen laptops).

Use two event listeners. Assume `mouse` input initially and bind a `touchstart` event listener to the document. 
On `touchstart`, add a `mousemove` event listener to listen for two consecutive `mousemove` events firing within 20ms, using `performance.now()`.
Run the callback with the input type as an argument in either of these situations.

```js
const onUserInputChange = callback => {
  let type = 'mouse',
    lastTime = 0;
  const mousemoveHandler = () => {
    const now = performance.now();
    if (now - lastTime < 20)
      (type = 'mouse'), callback(type), document.removeEventListener('mousemove', mousemoveHandler);
    lastTime = now;
  };
  document.addEventListener('touchstart', () => {
    if (type === 'touch') return;
    (type = 'touch'), callback(type), document.addEventListener('mousemove', mousemoveHandler);
  });
};
```

<details>
<summary>Examples</summary>

```js
onUserInputChange(type => {
  console.log('The user is now using', type, 'as an input method.');
});
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### redirect

Redirects to a specified URL.

Use `window.location.href` or `window.location.replace()` to redirect to `url`.
Pass a second argument to simulate a link click (`true` - default) or an HTTP redirect (`false`).

```js
const redirect = (url, asLink = true) =>
  asLink ? (window.location.href = url) : window.location.replace(url);
```

<details>
<summary>Examples</summary>

```js
redirect('https://google.com');
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### scrollToTop

Smooth-scrolls to the top of the page.

Get distance from top using `document.documentElement.scrollTop` or `document.body.scrollTop`.
Scroll by a fraction of the distance from the top. Use `window.requestAnimationFrame()` to animate the scrolling.

```js
const scrollToTop = () => {
  const c = document.documentElement.scrollTop || document.body.scrollTop;
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c / 8);
  }
};
```

<details>
<summary>Examples</summary>

```js
scrollToTop();
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### setStyle

Sets the value of a CSS rule for the specified element.

Use `element.style` to set the value of the CSS rule for the specified element to `value`.

```js
const setStyle = (el, ruleName, value) => (el.style[ruleName] = value);
```

<details>
<summary>Examples</summary>

```js
setStyle(document.querySelector('p'), 'font-size', '20px'); // The first <p> element on the page will have a font-size of 20px
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### show

Shows all the elements specified.

Use the spread operator (`...`) and `Array.forEach()` to clear the `display` property for each element specified.

```js
const show = (...el) => [...el].forEach(e => (e.style.display = ''));
```

<details>
<summary>Examples</summary>

```js
show(document.querySelectorAll('img')); // Shows all <img> elements on the page
```

</details>

<br>[⬆ Back to top](#table-of-contents)


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
```

<details>
<summary>Examples</summary>

```js
speechSynthesis('Hello, World'); // // plays the message
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### toggleClass

Toggle a class for an element.

Use `element.classList.toggle()` to toggle the specified class for the element.

```js
const toggleClass = (el, className) => el.classList.toggle(className);
```

<details>
<summary>Examples</summary>

```js
toggleClass(document.querySelector('p.special'), 'special'); // The paragraph will not have the 'special' class anymore
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### UUIDGeneratorBrowser

Generates a UUID in a browser.

Use `crypto` API to generate a UUID, compliant with [RFC4122](https://www.ietf.org/rfc/rfc4122.txt) version 4.

```js
const UUIDGeneratorBrowser = () =>
  ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
  );
```

<details>
<summary>Examples</summary>

```js
UUIDGeneratorBrowser(); // '7982fcfe-5721-4632-bede-6000885be57d'
```

</details>

<br>[⬆ Back to top](#table-of-contents)

---
 ## ⏱️ Date

### getDaysDiffBetweenDates

Returns the difference (in days) between two dates.

Calculate the difference (in days) between two `Date` objects.

```js
const getDaysDiffBetweenDates = (dateInitial, dateFinal) =>
  (dateFinal - dateInitial) / (1000 * 3600 * 24);
```

<details>
<summary>Examples</summary>

```js
getDaysDiffBetweenDates(new Date('2017-12-13'), new Date('2017-12-22')); // 9
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### JSONToDate

Converts a JSON object to a date.

Use `Date()`, to convert dates in JSON format to readable format (`dd/mm/yyyy`).

```js
const JSONToDate = arr => {
  const dt = new Date(parseInt(arr.toString().substr(6)));
  return `${dt.getDate()}/${dt.getMonth() + 1}/${dt.getFullYear()}`;
};
```

<details>
<summary>Examples</summary>

```js
JSONToDate(/Date(1489525200000)/); // "14/3/2017"
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### toEnglishDate

Converts a date from American format to English format.

Use `Date.toISOString()`, `split('T')` and `replace()` to convert a date from American format to the English format.
Throws an error if the passed time cannot be converted to a date.

```js
const toEnglishDate = time => {
  try {
    return new Date(time)
      .toISOString()
      .split('T')[0]
      .replace(/-/g, '/');
  } catch (e) {}
};
```

<details>
<summary>Examples</summary>

```js
toEnglishDate('09/21/2010'); // '21/09/2010'
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### tomorrow

Results in a string representation of tomorrow's date.
Use `new Date()` to get today's date, adding `86400000` of seconds to it(24 hours), using `toISOString` to convert Date object to string.

```js
const tomorrow = () => new Date(new Date().getTime() + 86400000).toISOString().split('T')[0];
```

<details>
<summary>Examples</summary>

```js
tomorrow(); // 2017-12-27 (if current date is 2017-12-26)
```

</details>

<br>[⬆ Back to top](#table-of-contents)

---
 ## 🎛️ Function

### chainAsync

Chains asynchronous functions.

Loop through an array of functions containing asynchronous events, calling `next` when each asynchronous event has completed.

```js
const chainAsync = fns => {
  let curr = 0;
  const next = () => fns[curr++](next);
  next();
};
```

<details>
<summary>Examples</summary>

```js
chainAsync([
  next => {
    console.log('0 seconds');
    setTimeout(next, 1000);
  },
  next => {
    console.log('1 second');
    setTimeout(next, 1000);
  },
  next => {
    console.log('2 seconds');
  }
]);
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### compose

Performs right-to-left function composition.

Use `Array.reduce()` to perform right-to-left function composition.
The last (rightmost) function can accept one or more arguments; the remaining functions must be unary.

```js
const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)));
```

<details>
<summary>Examples</summary>

```js
const add5 = x => x + 5;
const multiply = (x, y) => x * y;
const multiplyAndAdd5 = compose(add5, multiply);
multiplyAndAdd5(5, 2); // 15
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### curry

Curries a function.

Use recursion.
If the number of provided arguments (`args`) is sufficient, call the passed function `fn`.
Otherwise, return a curried function `fn` that expects the rest of the arguments.
If you want to curry a function that accepts a variable number of arguments (a variadic function, e.g. `Math.min()`), you can optionally pass the number of arguments to the second parameter `arity`.

```js
const curry = (fn, arity = fn.length, ...args) =>
  arity <= args.length ? fn(...args) : curry.bind(null, fn, arity, ...args);
```

<details>
<summary>Examples</summary>

```js
curry(Math.pow)(2)(10); // 1024
curry(Math.min, 3)(10)(50)(2); // 2
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### functionName

Logs the name of a function.

Use `console.debug()` and the `name` property of the passed method to log the method's name to the `debug` channel of the console.

```js
const functionName = fn => (console.debug(fn.name), fn);
```

<details>
<summary>Examples</summary>

```js
functionName(Math.max); // max (logged in debug channel of console)
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### memoize

Returns the memoized (cached) function.

Use `Object.create(null)` to create an empty object without `Object.prototype` (so that those properties are not resolved if the input value is something like `'hasOwnProperty'`).
Return a function which takes a single argument to be supplied to the memoized function by first checking if the function's output for that specific input value is already cached, or store and return it if not.

```js
const memoize = fn => {
  const cache = Object.create(null);
  return value => cache[value] || (cache[value] = fn(value));
};
```

<details>
<summary>Examples</summary>

```js
// See the `anagrams` snippet.
const anagramsCached = memoize(anagrams);
anagramsCached('javascript'); // takes a long time
anagramsCached('javascript'); // returns virtually instantly since it's now cached
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### runPromisesInSeries

Runs an array of promises in series.

Use `Array.reduce()` to create a promise chain, where each promise returns the next promise when resolved.

```js
const runPromisesInSeries = ps => ps.reduce((p, next) => p.then(next), Promise.resolve());
```

<details>
<summary>Examples</summary>

```js
const delay = d => new Promise(r => setTimeout(r, d));
runPromisesInSeries([() => delay(1000), () => delay(2000)]); // //executes each promise sequentially, taking a total of 3 seconds to complete
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### sleep

Delays the execution of an asynchronous function.

Delay executing part of an `async` function, by putting it to sleep, returning a `Promise`.

```js
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
```

<details>
<summary>Examples</summary>

```js
async function sleepyWork() {
  console.log("I'm going to sleep for 1 second.");
  await sleep(1000);
  console.log('I woke up after 1 second.');
}
```

</details>

<br>[⬆ Back to top](#table-of-contents)

---
 ## 🔮 Logic

### negate

Negates a predicate function.

Take a predicate function and apply `not` to it with its arguments.

```js
const negate = func => (...args) => !func(...args);
```

<details>
<summary>Examples</summary>

```js
filter([1, 2, 3, 4, 5, 6], negate(isEven)); // [1, 3, 5]
negate(isOdd)(1); // false
```

</details>

<br>[⬆ Back to top](#table-of-contents)

---
 ## ➗ Math

### average

Returns the average of an of two or more numbers/arrays.

Use `Array.reduce()` to add each value to an accumulator, initialized with a value of `0`, divide by the `length` of the array.

```js
const average = (...arr) => {
  const nums = [].concat(...arr);
  return nums.reduce((acc, val) => acc + val, 0) / nums.length;
};
```

<details>
<summary>Examples</summary>

```js
average([1, 2, 3]); // 2
average(1, 2, 3); // 2
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### clampNumber

Clamps `num` within the inclusive range specified by the boundary values `a` and `b`.

If `num` falls within the range, return `num`.
Otherwise, return the nearest number in the range.

```js
const clampNumber = (num, a, b) => Math.max(Math.min(num, Math.max(a, b)), Math.min(a, b));
```

<details>
<summary>Examples</summary>

```js
clampNumber(2, 3, 5); // 3
clampNumber(1, -1, -5); // -1
clampNumber(3, 2, 4); // 3
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### collatz

Applies the Collatz algorithm.

If `n` is even, return `n/2`. Otherwise, return `3n+1`.

```js
const collatz = n => (n % 2 == 0 ? n / 2 : 3 * n + 1);
```

<details>
<summary>Examples</summary>

```js
collatz(8); // 4
collatz(5); // 16
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### digitize

Converts a number to an array of digits.

Convert the number to a string, using spread operators in ES6(`[...string]`) build an array.
Use `Array.map()` and `parseInt()` to transform each value to an integer.

```js
const digitize = n => [...('' + n)].map(i => parseInt(i));
```

<details>
<summary>Examples</summary>

```js
digitize(123); // [1, 2, 3]
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### distance

Returns the distance between two points.

Use `Math.hypot()` to calculate the Euclidean distance between two points.

```js
const distance = (x0, y0, x1, y1) => Math.hypot(x1 - x0, y1 - y0);
```

<details>
<summary>Examples</summary>

```js
distance(1, 1, 2, 3); // 2.23606797749979
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### elo

Computes the new ratings between two opponents using the [Elo rating system](https://en.wikipedia.org/wiki/Elo_rating_system). It takes an array
of two pre-ratings and returns an array containing two post-ratings.
The winner's rating is the first element of the array.

Use the exponent `**` operator and math operators to compute the expected score (chance of winning)
of each opponent and compute the new rating for each. Omit the second argument to use the default
K-factor of 32, or supply a custom K-factor value.

```js
const elo = ([a, b], kFactor = 32) => {
  const expectedScore = (self, opponent) => 1 / (1 + 10 ** ((opponent - self) / 400));
  const newRating = (rating, i) => rating + kFactor * (i - expectedScore(i ? a : b, i ? b : a));
  return [newRating(a, 1), newRating(b, 0)];
};
```

<details>
<summary>Examples</summary>

```js
elo([1200, 1200]); // [1216, 1184]
elo([1000, 2000]); // [1031.8991261061358, 1968.1008738938642]
elo([1500, 1000]); // [1501.7036868864648, 998.2963131135352]
elo([1200, 1200], 64); // [1232, 1168]
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### factorial

Calculates the factorial of a number.

Use recursion.
If `n` is less than or equal to `1`, return `1`.
Otherwise, return the product of `n` and the factorial of `n - 1`.
Throws an exception if `n` is a negative number.

```js
const factorial = n =>
  n < 0
    ? (() => {
        throw new TypeError('Negative numbers are not allowed!');
      })()
    : n <= 1 ? 1 : n * factorial(n - 1);
```

<details>
<summary>Examples</summary>

```js
factorial(6); // 720
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### fibonacci

Generates an array, containing the Fibonacci sequence, up until the nth term.

Create an empty array of the specific length, initializing the first two values (`0` and `1`).
Use `Array.reduce()` to add values into the array, using the sum of the last two values, except for the first two.

```js
const fibonacci = n =>
  Array.from({ length: n }).reduce(
    (acc, val, i) => acc.concat(i > 1 ? acc[i - 1] + acc[i - 2] : i),
    []
  );
```

<details>
<summary>Examples</summary>

```js
fibonacci(6); // [0, 1, 1, 2, 3, 5]
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### fibonacciCountUntilNum

Returns the number of fibonnacci numbers up to `num`(`0` and `num` inclusive).

Use a mathematical formula to calculate the number of fibonacci numbers until `num`.

```js
const fibonacciCountUntilNum = num =>
  Math.ceil(Math.log(num * Math.sqrt(5) + 1 / 2) / Math.log((Math.sqrt(5) + 1) / 2));
```

<details>
<summary>Examples</summary>

```js
fibonacciCountUntilNum(10); // 7
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### fibonacciUntilNum

Generates an array, containing the Fibonacci sequence, up until the nth term.

Create an empty array of the specific length, initializing the first two values (`0` and `1`).
Use `Array.reduce()` to add values into the array, using the sum of the last two values, except for the first two.
Uses a mathematical formula to calculate the length of the array required.

```js
const fibonacciUntilNum = num => {
  let n = Math.ceil(Math.log(num * Math.sqrt(5) + 1 / 2) / Math.log((Math.sqrt(5) + 1) / 2));
  return Array.from({ length: n }).reduce(
    (acc, val, i) => acc.concat(i > 1 ? acc[i - 1] + acc[i - 2] : i),
    []
  );
};
```

<details>
<summary>Examples</summary>

```js
fibonacciUntilNum(10); // [ 0, 1, 1, 2, 3, 5, 8 ]
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### gcd

Calculates the greatest common divisor between two or more numbers/arrays.

The `helperGcd `function uses recursion.
Base case is when `y` equals `0`. In this case, return `x`.
Otherwise, return the GCD of `y` and the remainder of the division `x/y`.

```js
const gcd = (...arr) => {
  let data = [].concat(...arr);
  const helperGcd = (x, y) => (!y ? x : gcd(y, x % y));
  return data.reduce((a, b) => helperGcd(a, b));
};
```

<details>
<summary>Examples</summary>

```js
gcd(8, 36); // 4
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### hammingDistance

Calculates the Hamming distance between two values.

Use XOR operator (`^`) to find the bit difference between the two numbers, convert to a binary string using `toString(2)`.
Count and return the number of `1`s in the string, using `match(/1/g)`.

```js
const hammingDistance = (num1, num2) => ((num1 ^ num2).toString(2).match(/1/g) || '').length;
```

<details>
<summary>Examples</summary>

```js
hammingDistance(2, 3); // 1
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### inRange

Checks if the given number falls within the given range.

Use arithmetic comparison to check if the given number is in the specified range.
If the second parameter, `end`, is not specified, the range is considered to be from `0` to `start`.

```js
const inRange = (n, start, end = null) => {
  if (end && start > end) end = [start, (start = end)][0];
  return end == null ? n >= 0 && n < start : n >= start && n < end;
};
```

<details>
<summary>Examples</summary>

```js
inRange(3, 2, 5); // true
inRange(3, 4); // true
inRange(2, 3, 5); // false
inrange(3, 2); // false
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### isArmstrongNumber

Checks if the given number is an Armstrong number or not.

Convert the given number into an array of digits. Use the exponent operator (`**`) to get the appropriate power for each digit and sum them up. If the sum is equal to the number itself, return `true` otherwise `false`.

```js
const isArmstrongNumber = digits =>
  (arr => arr.reduce((a, d) => a + parseInt(d) ** arr.length, 0) == digits)(
    (digits + '').split('')
  );
```

<details>
<summary>Examples</summary>

```js
isArmstrongNumber(1634); // true
isArmstrongNumber(371); // true
isArmstrongNumber(56); // false
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### isDivisible

Checks if the first numeric argument is divisible by the second one.

Use the modulo operator (`%`) to check if the remainder is equal to `0`.

```js
const isDivisible = (dividend, divisor) => dividend % divisor === 0;
```

<details>
<summary>Examples</summary>

```js
isDivisible(6, 3); // true
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### isEven

Returns `true` if the given number is even, `false` otherwise.

Checks whether a number is odd or even using the modulo (`%`) operator.
Returns `true` if the number is even, `false` if the number is odd.

```js
const isEven = num => num % 2 === 0;
```

<details>
<summary>Examples</summary>

```js
isEven(3); // false
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### isPrime

Checks if the provided integer is a prime number.

Check numbers from `2` to the square root of the given number.
Return `false` if any of them divides the given number, else return `true`, unless the number is less than `2`.

```js
const isPrime = num => {
  const boundary = Math.floor(Math.sqrt(num));
  for (var i = 2; i <= boundary; i++) if (num % i == 0) return false;
  return num >= 2;
};
```

<details>
<summary>Examples</summary>

```js
isPrime(11); // true
isPrime(12); // false
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### lcm

Returns the least common multiple of two or more numbers/arrays.

Use the greatest common divisor (GCD) formula and `Math.abs()` to determine the least common multiple.
The GCD formula uses recursion.

```js
const lcm = (...arr) => {
  const gcd = (x, y) => (!y ? x : gcd(y, x % y));
  const _lcm = (x, y) => x * y / gcd(x, y);
  return [].concat(...arr).reduce((a, b) => _lcm(a, b));
};
```

<details>
<summary>Examples</summary>

```js
lcm(12, 7); // 84
lcm([1, 3, 4], 5); // 60
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### max

Returns the maximum value out of two or more numbers/arrays.

Use `Math.max()` combined with the spread operator (`...`) to get the maximum value in the array.

```js
const max = (...arr) => Math.max(...[].concat(...arr));
```

<details>
<summary>Examples</summary>

```js
max([10, 1, 5]); // 10
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### median

Returns the median of an array of numbers.

Find the middle of the array, use `Array.sort()` to sort the values.
Return the number at the midpoint if `length` is odd, otherwise the average of the two middle numbers.

```js
const median = arr => {
  const mid = Math.floor(arr.length / 2),
    nums = [...arr].sort((a, b) => a - b);
  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};
```

<details>
<summary>Examples</summary>

```js
median([5, 6, 50, 1, -5]); // 5
median([0, 10, -2, 7]); // 3.5
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### min

Returns the minimum value in an array.

Use `Math.min()` combined with the spread operator (`...`) to get the minimum value in the array.

```js
const min = arr => Math.min(...[].concat(...arr));
```

<details>
<summary>Examples</summary>

```js
min([10, 1, 5]); // 1
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### percentile

Uses the percentile formula to calculate how many numbers in the given array are less or equal to the given value.

Use `Array.reduce()` to calculate how many numbers are below the value and how many are the same value and apply the percentile formula.

```js
const percentile = (arr, val) =>
  100 * arr.reduce((acc, v) => acc + (v < val ? 1 : 0) + (v === val ? 0.5 : 0), 0) / arr.length;
```

<details>
<summary>Examples</summary>

```js
percentile([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 6); // 55
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### powerset

Returns the powerset of a given array of numbers.

Use `Array.reduce()` combined with `Array.map()` to iterate over elements and combine into an array containing all combinations.

```js
const powerset = arr => arr.reduce((a, v) => a.concat(a.map(r => [v].concat(r))), [[]]);
```

<details>
<summary>Examples</summary>

```js
powerset([1, 2]); // [[], [1], [2], [2,1]]
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### primes

Generates primes up to a given number, using the Sieve of Eratosthenes.

Generate an array from `2` to the given number. Use `Array.filter()` to filter out the values divisible by any number from `2` to the square root of the provided number.

```js
const primes = num => {
  let arr = Array.from({ length: num - 1 }).map((x, i) => i + 2),
    sqroot = Math.floor(Math.sqrt(num)),
    numsTillSqroot = Array.from({ length: sqroot - 1 }).map((x, i) => i + 2);
  numsTillSqroot.forEach(x => (arr = arr.filter(y => y % x !== 0 || y == x)));
  return arr;
};
```

<details>
<summary>Examples</summary>

```js
primes(10); // [2,3,5,7]
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### randomIntegerInRange

Returns a random integer in the specified range.

Use `Math.random()` to generate a random number and map it to the desired range, using `Math.floor()` to make it an integer.

```js
const randomIntegerInRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
```

<details>
<summary>Examples</summary>

```js
randomIntegerInRange(0, 5); // 2
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### randomNumberInRange

Returns a random number in the specified range.

Use `Math.random()` to generate a random value, map it to the desired range using multiplication.

```js
const randomNumberInRange = (min, max) => Math.random() * (max - min) + min;
```

<details>
<summary>Examples</summary>

```js
randomNumberInRange(2, 10); // 6.0211363285087005
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### round

Rounds a number to a specified amount of digits.

Use `Math.round()` and template literals to round the number to the specified number of digits.
Omit the second argument, `decimals` to round to an integer.

```js
const round = (n, decimals = 0) => Number(`${Math.round(`${n}e${decimals}`)}e-${decimals}`);
```

<details>
<summary>Examples</summary>

```js
round(1.005, 2); // 1.01
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### standardDeviation

Returns the standard deviation of an array of numbers.

Use `Array.reduce()` to calculate the mean, variance and the sum of the variance of the values, the variance of the values, then
determine the standard deviation.
You can omit the second argument to get the sample standard deviation or set it to `true` to get the population standard deviation.

```js
const standardDeviation = (arr, usePopulation = false) => {
  const mean = arr.reduce((acc, val) => acc + val, 0) / arr.length;
  return Math.sqrt(
    arr.reduce((acc, val) => acc.concat((val - mean) ** 2), []).reduce((acc, val) => acc + val, 0) /
      (arr.length - (usePopulation ? 0 : 1))
  );
};
```

<details>
<summary>Examples</summary>

```js
standardDeviation([10, 2, 38, 23, 38, 23, 21]); // 13.284434142114991 (sample)
standardDeviation([10, 2, 38, 23, 38, 23, 21], true); // 12.29899614287479 (population)
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### sum

Returns the sum of an of two or more numbers/arrays.

Use `Array.reduce()` to add each value to an accumulator, initialized with a value of `0`.

```js
const sum = (...arr) => [].concat(...arr).reduce((acc, val) => acc + val, 0);
```

<details>
<summary>Examples</summary>

```js
sum([1, 2, 3, 4]); // 10
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### sumPower

Returns the sum of the powers of all the numbers from `start` to `end` (both inclusive).

Use `Array.fill()` to create an array of all the numbers in the target range, `Array.map()` and the exponent operator (`**`) to raise them to `power` and `Array.reduce()` to add them together.
Omit the second argument, `power`, to use a default power of `2`.
Omit the third argument, `start`, to use a default starting value of `1`.

```js
const sumPower = (end, power = 2, start = 1) =>
  Array(end + 1 - start)
    .fill(0)
    .map((x, i) => (i + start) ** power)
    .reduce((a, b) => a + b, 0);
```

<details>
<summary>Examples</summary>

```js
sumPower(10); // 385
sumPower(10, 3); //3025
sumPower(10, 3, 5); //2925
```

</details>

<br>[⬆ Back to top](#table-of-contents)

---
 ## 📦 Node

### hasFlags

Check if the current process's arguments contain the specified flags.

Use `Array.every()` and `Array.includes()` to check if `process.argv` contains all the specified flags.
Use a regular expression to test if the specified flags are prefixed with `-` or `--` and prefix them accordingly.

```js
const hasFlags = (...flags) =>
  flags.every(flag => process.argv.includes(/^-{1,2}/.test(flag) ? flag : '--' + flag));
```

<details>
<summary>Examples</summary>

```js
// node myScript.js -s --test --cool=true
hasFlags('-s'); // true
hasFlags('test', 'cool=true'); // true
hasFlags('--test', 'cool=true', '-s'); // true
hasFlags('special'); // false
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### isTravisCI

Checks if the current environment is [Travis CI](https://travis-ci.org/).

Checks if the current environment has the `TRAVIS` and `CI` environment variables ([reference](https://docs.travis-ci.com/user/environment-variables/#Default-Environment-Variables)).

```js
const isTravisCI = () => 'TRAVIS' in process.env && 'CI' in process.env;
```

<details>
<summary>Examples</summary>

```js
isTravisCI(); // true (if code is running on Travis CI)
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### JSONToFile

Writes a JSON object to a file.

Use `fs.writeFile()`, template literals and `JSON.stringify()` to write a `json` object to a `.json` file.

```js
const fs = require('fs');
const JSONToFile = (obj, filename) =>
  fs.writeFile(`${filename}.json`, JSON.stringify(obj, null, 2));
```

<details>
<summary>Examples</summary>

```js
JSONToFile({ test: 'is passed' }, 'testJsonFile'); // writes the object to 'testJsonFile.json'
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### readFileLines

Returns an array of lines from the specified file.

Use `readFileSync` function in `fs` node package to create a `Buffer` from a file.
convert buffer to string using `toString(encoding)` function.
creating an array from contents of file by `split`ing file content line by line (each `\n`).

```js
const fs = require('fs');
const readFileLines = filename =>
  fs
    .readFileSync(filename)
    .toString('UTF8')
    .split('\n');
```

<details>
<summary>Examples</summary>

```js
/*
contents of test.txt :
  line1
  line2
  line3
  ___________________________
*/
let arr = readFileLines('test.txt');
console.log(arr); // ['line1', 'line2', 'line3']
```


</details>

<br>[⬆ Back to top](#table-of-contents)


### untildify

Converts a tilde path to an absolute path.

Use `String.replace()` with a regular expression and `OS.homedir()` to replace the `~` in the start of the path with the home directory.

```js
const untildify = str => str.replace(/^~($|\/|\\)/, `${require('os').homedir()}$1`);
```

<details>
<summary>Examples</summary>

```js
untildify('~/node'); // '/Users/aUser/node'
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### UUIDGeneratorNode

Generates a UUID in Node.JS.

Use `crypto` API to generate a UUID, compliant with [RFC4122](https://www.ietf.org/rfc/rfc4122.txt) version 4.

```js
const crypto = require('crypto');
const UUIDGeneratorNode = () =>
  ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^ (crypto.randomBytes(1)[0] & (15 >> (c / 4)))).toString(16)
  );
```

<details>
<summary>Examples</summary>

```js
UUIDGeneratorNode(); // '79c7c136-60ee-40a2-beb2-856f1feabefc'
```

</details>

<br>[⬆ Back to top](#table-of-contents)

---
 ## 🗃️ Object

### cleanObj

Removes any properties except the ones specified from a JSON object.

Use `Object.keys()` method to loop over given JSON object and deleting keys that are not `include`d in given array.
Also if you give it a special key (`childIndicator`) it will search deeply inside it to apply function to inner objects too.

```js
const cleanObj = (obj, keysToKeep = [], childIndicator) => {
  Object.keys(obj).forEach(key => {
    if (key === childIndicator) {
      cleanObj(obj[key], keysToKeep, childIndicator);
    } else if (!keysToKeep.includes(key)) {
      delete obj[key];
    }
  });
  return obj;
};
```

<details>
<summary>Examples</summary>

```js
const testObj = { a: 1, b: 2, children: { a: 1, b: 2 } };
cleanObj(testObj, ['a'], 'children'); // { a: 1, children : { a: 1}}
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### invertKeyValues

Inverts the key-value pairs of an object, without mutating it.

Use `Object.keys()` and `Array.reduce()` to invert the key-value pairs of an object.

```js
const invertKeyValues = obj =>
  Object.keys(obj).reduce((acc, key) => {
    acc[obj[key]] = key;
    return acc;
  }, {});
```

<details>
<summary>Examples</summary>

```js
invertKeyValues({ name: 'John', age: 20 }); // { 20: 'age', John: 'name' }
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### lowercaseKeys

Creates a new object from the specified object, where all the keys are in lowercase.

Use `Object.keys()` and `Array.reduce()` to create a new object from the specified object.
Convert each key in the original object to lowercase, using `String.toLowerCase()`.

```js
const lowercaseKeys = obj =>
  Object.keys(obj).reduce((acc, key) => {
    acc[key.toLowerCase()] = obj[key];
    return acc;
  }, {});
```

<details>
<summary>Examples</summary>

```js
const myObj = { Name: 'Adam', sUrnAME: 'Smith' };
const myObjLower = lowercaseKeys(myObj); // {name: 'Adam', surname: 'Smith'};
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### objectFromPairs

Creates an object from the given key-value pairs.

Use `Array.reduce()` to create and combine key-value pairs.

```js
const objectFromPairs = arr => arr.reduce((a, v) => ((a[v[0]] = v[1]), a), {});
```

<details>
<summary>Examples</summary>

```js
objectFromPairs([['a', 1], ['b', 2]]); // {a: 1, b: 2}
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### objectToPairs

Creates an array of key-value pair arrays from an object.

Use `Object.keys()` and `Array.map()` to iterate over the object's keys and produce an array with key-value pairs.

```js
const objectToPairs = obj => Object.keys(obj).map(k => [k, obj[k]]);
```

<details>
<summary>Examples</summary>

```js
objectToPairs({ a: 1, b: 2 }); // [['a',1],['b',2]])
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### orderBy

Returns a sorted array of objects ordered by properties and orders.

Uses a custom implementation of sort, that reduces the props array argument with a default value of 0, it uses destructuring to swap the properties position depending on the order passed.
If no orders array is passed it sort by 'asc' by default.

```js
const orderBy = (arr, props, orders) =>
  [...arr].sort((a, b) =>
    props.reduce((acc, prop, i) => {
      if (acc === 0) {
        const [p1, p2] = orders && orders[i] === 'desc' ? [b[prop], a[prop]] : [a[prop], b[prop]];
        acc = p1 > p2 ? 1 : p1 < p2 ? -1 : 0;
      }
      return acc;
    }, 0)
  );
```

<details>
<summary>Examples</summary>

```js
const users = [
  { name: 'fred', age: 48 },
  { name: 'barney', age: 36 },
  { name: 'fred', age: 40 },
  { name: 'barney', age: 34 }
];
orderBy(users, ['name', 'age'], ['asc', 'desc']); // [{name: 'barney', age: 36}, {name: 'barney', age: 34}, {name: 'fred', age: 48}, {name: 'fred', age: 40}]
orderBy(users, ['name', 'age']); // [{name: 'barney', age: 34}, {name: 'barney', age: 36}, {name: 'fred', age: 40}, {name: 'fred', age: 48}]
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### select

Retrieve a property that indicated by the selector from an object.

If the property does not exists returns `undefined`.

```js
const select = (from, selector) =>
  selector.split('.').reduce((prev, cur) => prev && prev[cur], from);
```

<details>
<summary>Examples</summary>

```js
const obj = { selector: { to: { val: 'val to select' } } };
select(obj, 'selector.to.val'); // 'val to select'
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### shallowClone

Creates a shallow clone of an object.

Use `Object.assign()` and an empty object (`{}`) to create a shallow clone of the original.

```js
const shallowClone = obj => Object.assign({}, obj);
```

<details>
<summary>Examples</summary>

```js
const a = { x: true, y: 1 };
const b = shallowClone(a);
a === b; // false
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### size

Get size of arrays, objects or strings.

Get type of `value` (`array`, `object` or `string`). 
Use `length` property for arrays. 
Use `length` or `size` value if available or number of keys for objects. 
Use `size` of a [`Blob` object](https://developer.mozilla.org/en-US/docs/Web/API/Blob) created from `value` for strings.

Split strings into array of characters with `split('')` and return its length.

```js
const size = value =>
  Array.isArray(value)
    ? value.length
    : value && typeof value === 'object'
      ? value.size || value.length || Object.keys(value).length
      : typeof value === 'string' ? new Blob([value]).size : 0;
```

<details>
<summary>Examples</summary>

```js
size([1, 2, 3, 4, 5]); // 5
size('size'); // 4
size({ one: 1, two: 2, three: 3 }); // 3
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### truthCheckCollection

Checks if the predicate (second argument) is truthy on all elements of a collection (first argument).

Use `Array.every()` to check if each passed object has the specified property and if it returns a truthy value.

 ```js
const truthCheckCollection = (collection, pre) => collection.every(obj => obj[pre]);
```

<details>
<summary>Examples</summary>

```js
truthCheckCollection([{ user: 'Tinky-Winky', sex: 'male' }, { user: 'Dipsy', sex: 'male' }], 'sex'); // true
```

</details>

<br>[⬆ Back to top](#table-of-contents)

---
 ## 📜 String

### anagrams

Generates all anagrams of a string (contains duplicates).

Use recursion.
For each letter in the given string, create all the partial anagrams for the rest of its letters.
Use `Array.map()` to combine the letter with each partial anagram, then `Array.reduce()` to combine all anagrams in one array.
Base cases are for string `length` equal to `2` or `1`.

```js
const anagrams = str => {
  if (str.length <= 2) return str.length === 2 ? [str, str[1] + str[0]] : [str];
  return str
    .split('')
    .reduce(
      (acc, letter, i) =>
        acc.concat(anagrams(str.slice(0, i) + str.slice(i + 1)).map(val => letter + val)),
      []
    );
};
```

<details>
<summary>Examples</summary>

```js
anagrams('abc'); // ['abc','acb','bac','bca','cab','cba']
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### byteSize

Returns the length of string.

Convert a given string to a [`Blob` Object](https://developer.mozilla.org/en-US/docs/Web/API/Blob) and find its `size`.

```js
const byteSize = str => new Blob([str]).size;
```

<details>
<summary>Examples</summary>

```js
byteSize('😀'); // 4
byteSize('Hello World'); // 11
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### capitalize

Capitalizes the first letter of a string.

Use destructuring and `toUpperCase()` to capitalize first letter, `...rest` to get array of characters after first letter and then `Array.join('')` to make it a string again.
Omit the `lowerRest` parameter to keep the rest of the string intact, or set it to `true` to convert to lowercase.

```js
const capitalize = ([first, ...rest], lowerRest = false) =>
  first.toUpperCase() + (lowerRest ? rest.join('').toLowerCase() : rest.join(''));
```

<details>
<summary>Examples</summary>

```js
capitalize('fooBar'); // 'FooBar'
capitalize('fooBar', true); // 'Foobar'
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### capitalizeEveryWord

Capitalizes the first letter of every word in a string.

Use `replace()` to match the first character of each word and `toUpperCase()` to capitalize it.

```js
const capitalizeEveryWord = str => str.replace(/\b[a-z]/g, char => char.toUpperCase());
```

<details>
<summary>Examples</summary>

```js
capitalizeEveryWord('hello world!'); // 'Hello World!'
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### countVowels

Retuns `number` of vowels in provided string.

Use a regular expression to count the number of vowels `(A, E, I, O, U)` in a `string`.

```js
const countVowels = str => (str.match(/[aeiou]/gi) || []).length;
```

<details>
<summary>Examples</summary>

```js
countVowels('foobar'); // 3
countVowels('gym'); // 0
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### escapeHTML

Escapes a string for use in HTML.

Use `String.replace()` with a regex that matches the characters that need to be escaped, using a callback function to replace each character instance with its associated escaped character using a dictionary (object).

```js
const escapeHTML = str =>
  str.replace(
    /[&<>'"]/g,
    tag =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
  );
```

<details>
<summary>Examples</summary>

```js
escapeHTML('<a href="#">Me & you</a>'); // '&lt;a href=&quot;#&quot;&gt;Me &amp; you&lt;/a&gt;'
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### escapeRegExp

Escapes a string to use in a regular expression.

Use `replace()` to escape special characters.

```js
const escapeRegExp = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
```

<details>
<summary>Examples</summary>

```js
escapeRegExp('(test)'); // \\(test\\)
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### fromCamelCase

Converts a string from camelcase.

Use `replace()` to remove underscores, hyphens, and spaces and convert words to camelcase.
Omit the second argument to use a default separator of `_`.

```js
const fromCamelCase = (str, separator = '_') =>
  str
    .replace(/([a-z\d])([A-Z])/g, '$1' + separator + '$2')
    .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1' + separator + '$2')
    .toLowerCase();
```

<details>
<summary>Examples</summary>

```js
fromCamelCase('someDatabaseFieldName', ' '); // 'some database field name'
fromCamelCase('someLabelThatNeedsToBeCamelized', '-'); // 'some-label-that-needs-to-be-camelized'
fromCamelCase('someJavascriptProperty', '_'); // 'some_javascript_property'
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### isAbsoluteURL

Returns `true` if the given string is an absolute URL, `false` otherwise.

Use a regular expression to test if the string is an absolute URL.

```js
const isAbsoluteURL = str => /^[a-z][a-z0-9+.-]*:/.test(str);
```

<details>
<summary>Examples</summary>

```js
isAbsoluteURL('https://google.com'); // true
isAbsoluteURL('ftp://www.myserver.net'); // true
isAbsoluteURL('/foo/bar'); // false
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### mask

Replaces all but the last `num` of characters with the specified mask character.

Use `String.slice()` to grab the portion of the characters that need to be masked and use `String.replace()` with a regex to replace every character with the mask character. 
Concatenate the masked characters with the remaining unmasked portion of the string.
Omit the second argument, `num`, to keep a default of `4` characters unmasked. If `num` is negative, the unmasked characters will be at the start of the string.
Omit the third argument, `mask`, to use a default character of `'*'` for the mask.

```js
const mask = (cc, num = 4, mask = '*') =>
  ('' + cc).slice(0, -num).replace(/./g, mask) + ('' + cc).slice(-num);
```

<details>
<summary>Examples</summary>

```js
mask(1234567890); // '******7890'
mask(1234567890, 3); // '*******890'
mask(1234567890, 4, '$'); // '$$$$$$7890'
mask(1234567890, -4, '$'); // '1234$$$$$$'
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### palindrome

Returns `true` if the given string is a palindrome, `false` otherwise.

Convert string `toLowerCase()` and use `replace()` to remove non-alphanumeric characters from it.
Then, `split('')` into individual characters, `reverse()`, `join('')` and compare to the original, unreversed string, after converting it `tolowerCase()`.

```js
const palindrome = str => {
  const s = str.toLowerCase().replace(/[\W_]/g, '');
  return (
    s ===
    s
      .split('')
      .reverse()
      .join('')
  );
};
```

<details>
<summary>Examples</summary>

```js
palindrome('taco cat'); // true
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### repeatString

Repeats a string n times using `String.repeat()`

If no string is provided the default is `""` and the default number of times is 2.

```js
const repeatString = (str = '', num = 2) => {
  return num >= 0 ? str.repeat(num) : str;
};
```

<details>
<summary>Examples</summary>

```js
repeatString('abc', 3); // 'abcabcabc'
repeatString('abc'); // 'abcabc'
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### reverseString

Reverses a string.

Use `split('')` and `Array.reverse()` to reverse the order of the characters in the string.
Combine characters to get a string using `join('')`.

```js
const reverseString = str =>
  str
    .split('')
    .reverse()
    .join('');
```

<details>
<summary>Examples</summary>

```js
reverseString('foobar'); // 'raboof'
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### sortCharactersInString

Alphabetically sorts the characters in a string.

Split the string using `split('')`, `Array.sort()` utilizing `localeCompare()`, recombine using `join('')`.

```js
const sortCharactersInString = str =>
  str
    .split('')
    .sort((a, b) => a.localeCompare(b))
    .join('');
```

<details>
<summary>Examples</summary>

```js
sortCharactersInString('cabbage'); // 'aabbceg'
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### splitLines

Splits a multiline string into an array of lines.

Use `String.split()` and a regular expression to match line breaks and create an array.

```js
const splitLines = str => str.split(/\r?\n/);
```

<details>
<summary>Examples</summary>

```js
splitLines('This\nis a\nmultiline\nstring.\n'); // ['This', 'is a', 'multiline', 'string' , '']
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### toCamelCase

Converts a string to camelcase.

Break the string into words and combine them capitalizing the first letter of each word.
For more detailed explanation of this Regex, [visit this Site](https://regex101.com/r/bMCgAB/1).

```js
const toCamelCase = str => {
  let s =
    str &&
    str
      .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
      .map(x => x.slice(0, 1).toUpperCase() + x.slice(1).toLowerCase())
      .join('');
  return s.slice(0, 1).toLowerCase() + s.slice(1);
};
```

<details>
<summary>Examples</summary>

```js
toCamelCase('some_database_field_name'); // 'someDatabaseFieldName'
toCamelCase('Some label that needs to be camelized'); // 'someLabelThatNeedsToBeCamelized'
toCamelCase('some-javascript-property'); // 'someJavascriptProperty'
toCamelCase('some-mixed_string with spaces_underscores-and-hyphens'); // 'someMixedStringWithSpacesUnderscoresAndHyphens'
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### toKebabCase

Converts a string to kebab case.

Break the string into words and combine them using `-` as a separator.
For more detailed explanation of this Regex, [visit this Site](https://regex101.com/r/bMCgAB/1).

```js
const toKebabCase = str =>
  str &&
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map(x => x.toLowerCase())
    .join('-');
```

<details>
<summary>Examples</summary>

```js
toKebabCase('camelCase'); // 'camel-case'
toKebabCase('some text'); // 'some-text'
toKebabCase('some-mixed_string With spaces_underscores-and-hyphens'); // 'some-mixed-string-with-spaces-underscores-and-hyphens'
toKebabCase('AllThe-small Things'); // "all-the-small-things"
toKebabCase('IAmListeningToFMWhileLoadingDifferentURLOnMyBrowserAndAlsoEditingSomeXMLAndHTML'); // "i-am-listening-to-fm-while-loading-different-url-on-my-browser-and-also-editing-xml-and-html"
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### toSnakeCase

Converts a string to snake case.

Break the string into words and combine them using `_` as a separator.
For more detailed explanation of this Regex, [visit this Site](https://regex101.com/r/bMCgAB/1).

```js
const toSnakeCase = str =>
  str &&
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map(x => x.toLowerCase())
    .join('_');
```

<details>
<summary>Examples</summary>

```js
toSnakeCase('camelCase'); // 'camel_case'
toSnakeCase('some text'); // 'some_text'
toSnakeCase('some-javascript-property'); // 'some_javascript_property'
toSnakeCase('some-mixed_string With spaces_underscores-and-hyphens'); // 'some_mixed_string_with_spaces_underscores_and_hyphens'
toSnakeCase('AllThe-small Things'); // "all_the_smal_things"
toSnakeCase('IAmListeningToFMWhileLoadingDifferentURLOnMyBrowserAndAlsoEditingSomeXMLAndHTML'); // "i_am_listening_to_fm_while_loading_different_url_on_my_browser_and_also_editing_some_xml_and_html"
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### truncateString

Truncates a string up to a specified length.

Determine if the string's `length` is greater than `num`.
Return the string truncated to the desired length, with `...` appended to the end or the original string.

```js
const truncateString = (str, num) =>
  str.length > num ? str.slice(0, num > 3 ? num - 3 : num) + '...' : str;
```

<details>
<summary>Examples</summary>

```js
truncateString('boomerang', 7); // 'boom...'
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### unescapeHTML

Unescapes escaped HTML characters.

Use `String.replace()` with a regex that matches the characters that need to be unescaped, using a callback function to replace each escaped character instance with its associated unescaped character using a dictionary (object).

```js
const unescapeHTML = str =>
  str.replace(
    /&amp;|&lt;|&gt;|&#39;|&quot;/g,
    tag =>
      ({
        '&amp;': '&',
        '&lt;': '<',
        '&gt;': '>',
        '&#39;': "'",
        '&quot;': '"'
      }[tag] || tag)
  );
```
<details>
<summary>Examples</summary>

```js
unescapeHTML('&lt;a href=&quot;#&quot;&gt;Me &amp; you&lt;/a&gt;'); // '<a href="#">Me & you</a>'
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### words

Converts a given string into an array of words.

Use `String.split()` with a supplied pattern (defaults to non-alpha as a regex) to convert to an array of strings. Use `Array.filter()` to remove any empty strings.
Omit the second argument to use the default regex.

```js
const words = (str, pattern = /[^a-zA-Z-]+/) => str.split(pattern).filter(Boolean);
```

<details>
<summary>Examples</summary>

```js
words('I love javaScript!!'); // ["I", "love", "javaScript"]
words('python, javaScript & coffee'); // ["python", "javaScript", "coffee"]
```

</details>

<br>[⬆ Back to top](#table-of-contents)

---
 ## 🔧 Utility

### coalesce

Returns the first non-null/undefined argument.

Use `Array.find()` to return the first non `null`/`undefined` argument.

```js
const coalesce = (...args) => args.find(_ => ![undefined, null].includes(_));
```

<details>
<summary>Examples</summary>

```js
coalesce(null, undefined, '', NaN, 'Waldo'); // ""
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### coalesceFactory

Returns a customized coalesce function that returns the first argument that returns `true` from the provided argument validation function.

Use `Array.find()` to return the first argument that returns `true` from the provided argument validation function.

```js
const coalesceFactory = valid => (...args) => args.find(valid);
```

<details>
<summary>Examples</summary>

```js
const customCoalesce = coalesceFactory(_ => ![null, undefined, '', NaN].includes(_));
customCoalesce(undefined, null, NaN, '', 'Waldo'); // "Waldo"
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### extendHex

Extends a 3-digit color code to a 6-digit color code.

Use `Array.map()`, `split()` and `Array.join()` to join the mapped array for converting a 3-digit RGB notated hexadecimal color-code to the 6-digit form.
`String.slice()` is used to remove `#` from string start since it's added once.
```js
const extendHex = shortHex =>
  '#' +
  shortHex
    .slice(shortHex.startsWith('#') ? 1 : 0)
    .split('')
    .map(x => x + x)
    .join('');
```

<details>
<summary>Examples</summary>

```js
extendHex('#03f'); // '#0033ff'
extendHex('05a'); // '#0055aa'
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### getType

Returns the native type of a value.

Returns lowercased constructor name of value, "undefined" or "null" if value is undefined or null

```js
const getType = v =>
  v === undefined ? 'undefined' : v === null ? 'null' : v.constructor.name.toLowerCase();
```

<details>
<summary>Examples</summary>

```js
getType(new Set([1, 2, 3])); // "set"
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### getURLParameters

Returns an object containing the parameters of the current URL.

Use `match()` with an appropriate regular expression to get all key-value pairs, `Array.reduce()` to map and combine them into a single object.
Pass `location.search` as the argument to apply to the current `url`.

```js
const getURLParameters = url =>
  url
    .match(/([^?=&]+)(=([^&]*))/g)
    .reduce((a, v) => ((a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1)), a), {});
```

<details>
<summary>Examples</summary>

```js
getURLParameters('http://url.com/page?name=Adam&surname=Smith'); // {name: 'Adam', surname: 'Smith'}
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### hexToRGB

Converts a color code to a `rgb()` or `rgba()` string if alpha value is provided.

Use bitwise right-shift operator and mask bits with `&` (and) operator to convert a hexadecimal color code (with or without prefixed with `#`) to a string with the RGB values. If it's 3-digit color code, first convert to 6-digit version. If an alpha value is provided alongside 6-digit hex, give `rgba()` string in return.

```js
const hexToRGB = hex => {
  let alpha = false,
    h = hex.slice(hex.startsWith('#') ? 1 : 0);
  if (h.length === 3) h = [...h].map(x => x + x).join('');
  else if (h.length === 8) alpha = true;
  h = parseInt(h, 16);
  return (
    'rgb' +
    (alpha ? 'a' : '') +
    '(' +
    (h >>> (alpha ? 24 : 16)) +
    ', ' +
    ((h & (alpha ? 0x00ff0000 : 0x00ff00)) >>> (alpha ? 16 : 8)) +
    ', ' +
    ((h & (alpha ? 0x0000ff00 : 0x0000ff)) >>> (alpha ? 8 : 0)) +
    (alpha ? `, ${h & 0x000000ff}` : '') +
    ')'
  );
};
```

<details>
<summary>Examples</summary>

```js
hexToRGB('#27ae60ff'); // 'rgba(39, 174, 96, 255)'
hexToRGB('27ae60'); // 'rgb(39, 174, 96)'
hexToRGB('#fff'); // 'rgb(255, 255, 255)'
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### isArray

Checks if the given argument is an array.

Use `Array.isArray()` to check if a value is classified as an array.

```js
const isArray = val => !!val && Array.isArray(val);
```

<details>
<summary>Examples</summary>

```js
isArray(null); // false
isArray([1]); // true
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### isArrayLike

Checks if the provided argument is array-like (i.e. is iterable).

Use the spread operator (`...`) to check if the provided argument is iterable inside a `try... catch` block and the comma operator (`,`) to return the appropriate value.

```js
const isArrayLike = val => {
  try {
    return [...val], true;
  } catch (e) {
    return false;
  }
};
```

<details>
<summary>Examples</summary>

```js
isArrayLike(document.querySelectorAll('.className')); // true
isArrayLike('abc'); // true
isArrayLike(null); // false
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### isBoolean

Checks if the given argument is a native boolean element.

Use `typeof` to check if a value is classified as a boolean primitive.

```js
const isBoolean = val => typeof val === 'boolean';
```

<details>
<summary>Examples</summary>

```js
isBoolean(null); // false
isBoolean(false); // true
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### isFunction

Checks if the given argument is a function.

Use `typeof` to check if a value is classified as a function primitive.

```js
const isFunction = val => val && typeof val === 'function';
```

<details>
<summary>Examples</summary>

```js
isFunction('x'); // false
isFunction(x => x); // true
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### isNull

Returns `true` if the specified value is `null`, `false` otherwise.

Use the strict equality operator to check if the value and of `val` are equal to `null`. 

```js
const isNull = val => val === null;
```

<details>
<summary>Examples</summary>

```js
isNull(null); // true
isNull('null'); // false
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### isNumber

Checks if the given argument is a number.

Use `typeof` to check if a value is classified as a number primitive.

```js
const isNumber = val => typeof val === 'number';
```

<details>
<summary>Examples</summary>

```js
isNumber('1'); // false
isNumber(1); // true
```
</details>

<br>[⬆ Back to top](#table-of-contents)


### isPrimitive

Returns a boolean determining if the supplied value is primitive or not.

Use `Array.includes()` on an array of type strings which are not primitive,
supplying the type using `typeof`.
Since `typeof null` evaluates to `'object'`, it needs to be directly compared.

```js
const isPrimitive = val => !['object', 'function'].includes(typeof val) || val === null;
```

<details>
<summary>Examples</summary>

```js
isPrimitive(window.someNonExistentProperty); // true
isPrimitive(null); // true
isPrimitive(50); // true
isPrimitive('Hello!'); // true
isPrimitive(false); // true
isPrimitive(Symbol()); // true
isPrimitive([]); // false
isPrimitive(new String('Hello!')); // false
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### isPromiseLike

Returns `true` if an object looks like a [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise), `false` otherwise.

Check if the object is not `null`, its `typeof` matches either `object` or `function` and if it has a `.then` property, which is also a `function`.

```js
const isPromiseLike = obj =>
  obj !== null &&
  (typeof obj === 'object' || typeof obj === 'function') &&
  typeof obj.then === 'function';
```

<details>
<summary>Examples</summary>

```js
isPromiseLike({
  then: function() {
    return '';
  }
}); // true
isPromiseLike(null); // false
isPromiseLike({}); // false
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### isString

Checks if the given argument is a string.

Use `typeof` to check if a value is classified as a string primitive.

```js
const isString = val => typeof val === 'string';
```

<details>
<summary>Examples</summary>

```js
isString(10); // false
isString('10'); // true
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### isSymbol

Checks if the given argument is a symbol.

Use `typeof` to check if a value is classified as a symbol primitive.

```js
const isSymbol = val => typeof val === 'symbol';
```

<details>
<summary>Examples</summary>

```js
isSymbol('x'); // false
isSymbol(Symbol('x')); // true
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### isValidJSON

Checks if the provided argument is a valid JSON.

Use `JSON.parse()` and a `try... catch` block to check if the provided argument is a valid JSON.

```js
const isValidJSON = obj => {
  try {
    JSON.parse(obj);
    return true;
  } catch (e) {
    return false;
  }
};
```

<details>
<summary>Examples</summary>

```js
isValidJSON('{"name":"Adam","age":20}'); // true
isValidJSON('{"name":"Adam",age:"20"}'); // false
isValidJSON(null); // true
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### randomHexColorCode

Generates a random hexadecimal color code.

Use `Math.random` to generate a random 24-bit(6x4bits) hexadecimal number. Use bit shifting and then convert it to an hexadecimal String using `toString(16)`.

```js
const randomHexColorCode = () => {
  let n = ((Math.random() * 0xfffff) | 0).toString(16);
  return '#' + (n.length !== 6 ? ((Math.random() * 0xf) | 0).toString(16) + n : n);
};
```

<details>
<summary>Examples</summary>

```js
randomHexColorCode(); // "#e34155"
randomHexColorCode(); // "#fd73a6"
randomHexColorCode(); // "#4144c6"
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### RGBToHex

Converts the values of RGB components to a color code.

Convert given RGB parameters to hexadecimal string using bitwise left-shift operator (`<<`) and `toString(16)`, then `padStart(6,'0')` to get a 6-digit hexadecimal value.

```js
const RGBToHex = (r, g, b) => ((r << 16) + (g << 8) + b).toString(16).padStart(6, '0');
```

<details>
<summary>Examples</summary>

```js
RGBToHex(255, 165, 1); // 'ffa501'
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### sbdm

This algorithm is a simple hash-algorithm that hashes it input string `s` into a whole number.

Use `split('')` and `Array.reduce()` to create a hash of the input string, utilizing bit shifting.

```js
const sdbm = str => {
  let arr = str.split('');
  return arr.reduce(
    (hashCode, currentVal) =>
      (hashCode = currentVal.charCodeAt(0) + (hashCode << 6) + (hashCode << 16) - hashCode),
    0
  );
};
```

<details>
<summary>Examples</summary>

```js
console.log(sdbm('name')); // -3521204949
console.log(sdbm('age')); // 808122783
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### timeTaken

Measures the time taken by a function to execute.

Use `console.time()` and `console.timeEnd()` to measure the difference between the start and end times to determine how long the callback took to execute.

```js
const timeTaken = callback => {
  console.time('timeTaken');
  const r = callback();
  console.timeEnd('timeTaken');
  return r;
};
```

<details>
<summary>Examples</summary>

```js
timeTaken(() => Math.pow(2, 10)); // 1024
// (logged): timeTaken: 0.02099609375ms
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### toDecimalMark

Use `toLocaleString()` to convert a float-point arithmetic to the [Decimal mark](https://en.wikipedia.org/wiki/Decimal_mark) form. It makes a comma separated string from a number.

 ```js
const toDecimalMark = num => num.toLocaleString('en-US');
```

<details>
<summary>Examples</summary>

```js
toDecimalMark(12305030388.9087); // "12,305,030,388.9087"
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### toOrdinalSuffix

Adds an ordinal suffix to a number.

Use the modulo operator (`%`) to find values of single and tens digits.
Find which ordinal pattern digits match.
If digit is found in teens pattern, use teens ordinal.

```js
const toOrdinalSuffix = num => {
  const int = parseInt(num),
    digits = [int % 10, int % 100],
    ordinals = ['st', 'nd', 'rd', 'th'],
    oPattern = [1, 2, 3, 4],
    tPattern = [11, 12, 13, 14, 15, 16, 17, 18, 19];
  return oPattern.includes(digits[0]) && !tPattern.includes(digits[1])
    ? int + ordinals[digits[0] - 1]
    : int + ordinals[3];
};
```

<details>
<summary>Examples</summary>

```js
toOrdinalSuffix('123'); // "123rd"
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### validateNumber

Returns `true` if the given value is a number, `false` otherwise.

Use `!isNaN` in combination with `parseFloat()` to check if the argument is a number.
Use `isFinite()` to check if the number is finite.
Use `Number()` to check if the coercion holds.

```js
const validateNumber = n => !isNaN(parseFloat(n)) && isFinite(n) && Number(n) == n;
```

<details>
<summary>Examples</summary>

```js
validateNumber('10'); // true
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### yesNo

Returns `true` if the string is `y`/`yes` or `false` if the string is `n`/`no`.

Use `RegExp.test()` to check if the string evaluates to `y/yes` or `n/no`.
Omit the second argument, `def` to set the default answer as `no`.

```js
const yesNo = (val, def = false) =>
  /^(y|yes)$/i.test(val) ? true : /^(n|no)$/i.test(val) ? false : def;
```

<details>
<summary>Examples</summary>

```js
yesNo('Y'); // true
yesNo('yes'); // true
yesNo('No'); // false
yesNo('Foo', true); // true
```

</details>

<br>[⬆ Back to top](#table-of-contents)

---
 ## _Uncategorized_

### solveRPN

Solves the given mathematical expression in [reverse polish notation](https://en.wikipedia.org/wiki/Reverse_Polish_notation).
Throws appropriate errors if there are unrecognized symbols or the expression is wrong.

Use a dictionary, `OPERATORS` to specify each operator's matching mathematical operation.
Use `String.replace()` with a regular expression to replace `^` with `**`, `String.split()` to tokenize the string and `Array.filter()` to remove empty tokens.
Use `Array.forEach()` to parse each `symbol`, evaluate it as a numeric value or operator and solve the mathematical expression.
Numeric values are converted to floating point numbers and pushed to a `stack`, while operators are evaluated using the `OPERATORS` dictionary and pop elements from the `stack` to apply operations.

```js
const solveRPN = rpn => {
  const OPERATORS = {
    '*': (a, b) => a * b,
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '/': (a, b) => a / b,
    '**': (a, b) => a ** b
  };
  const [stack, solve] = [
    [],
    rpn
      .replace(/\^/g, '**')
      .split(/\s+/g)
      .filter(el => !/\s+/.test(el) && el !== '')
  ];
  solve.forEach(symbol => {
    if (!isNaN(parseFloat(symbol)) && isFinite(symbol)) {
      stack.push(symbol);
    } else if (Object.keys(OPERATORS).includes(symbol)) {
      const [a, b] = [stack.pop(), stack.pop()];
      stack.push(OPERATORS[symbol](parseFloat(b), parseFloat(a)));
    } else {
      throw `${symbol} is not a recognized symbol`;
    }
  });
  if (stack.length === 1) return stack.pop();
  else throw `${rpn} is not a proper RPN. Please check it and try again`;
};
```

```js
solveRPN('15 7 1 1 + - / 3 * 2 1 1 + + -'); // 5
solveRPN('3 5 6 + *'); //33
solveRPN('2 4 / 5 6 - *'); //-0.5
solveRPN('2 3 ^'); //8
solveRPN('2 3 ^'); //8
```

<br>[⬆ back to top](#table-of-contents)


## Collaborators

| [<img src="https://github.com/Chalarangelo.png" width="100px;"/>](https://github.com/Chalarangelo)<br/> [<sub>Angelos Chalaris</sub>](https://github.com/Chalarangelo) | [<img src="https://github.com/Pl4gue.png" width="100px;"/>](https://github.com/Pl4gue)<br/> [<sub>David Wu</sub>](https://github.com/Pl4gue) | [<img src="https://github.com/fejes713.png" width="100px;"/>](https://github.com/fejes713)<br/> [<sub>Stefan Feješ</sub>](https://github.com/fejes713)  | [<img src="https://github.com/kingdavidmartins.png" width="100px;"/>](https://github.com/kingdavidmartins)<br/> [<sub>King David Martins</sub>](https://github.com/iamsoorena) | [<img src="https://github.com/iamsoorena.png" width="100px;"/>](https://github.com/iamsoorena)<br/> [<sub>Soorena Soleimani</sub>](https://github.com/iamsoorena) |
| --- | --- | --- | --- | --- |
| [<img src="https://github.com/elderhsouza.png" width="100px;"/>](https://github.com/elderhsouza)<br/> [<sub>Elder Henrique Souza</sub>](https://github.com/elderhsouza) | [<img src="https://github.com/skatcat31.png" width="100px;"/>](https://github.com/skatcat31)<br/> [<sub>Robert Mennell</sub>](https://github.com/skatcat31) | [<img src="https://github.com/atomiks.png" width="100px;"/>](https://github.com/atomiks)<br/> [<sub>atomiks</sub>](https://github.com/atomiks)  |


## Credits

*Icons made by [Smashicons](https://www.flaticon.com/authors/smashicons) from [www.flaticon.com](https://www.flaticon.com/) is licensed by [CC 3.0 BY](http://creativecommons.org/licenses/by/3.0/).*


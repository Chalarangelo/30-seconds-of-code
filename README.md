![Logo](/logo.png)

# 30 seconds of code

[![License](https://img.shields.io/badge/license-CC0--1.0-blue.svg)](https://github.com/Chalarangelo/30-seconds-of-code/blob/master/LICENSE) [![npm Downloads](https://img.shields.io/npm/dt/30-seconds-of-code.svg)](https://www.npmjs.com/package/30-seconds-of-code) [![npm Version](https://img.shields.io/npm/v/30-seconds-of-code.svg)](https://www.npmjs.com/package/30-seconds-of-code) [![Gitter chat](https://img.shields.io/badge/chat-on%20gitter-4FB999.svg)](https://gitter.im/30-seconds-of-code/Lobby) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com) [![Travis Build](https://travis-ci.org/Chalarangelo/30-seconds-of-code.svg?branch=master)](https://travis-ci.org/Chalarangelo/30-seconds-of-code) [![Codacy Badge](https://api.codacy.com/project/badge/Grade/207ea6fa2c204ccda61dc3047986e144)](https://www.codacy.com/app/Chalarangelo/30-seconds-of-code?utm_source=github.com&utm_medium=referral&utm_content=Chalarangelo/30-seconds-of-code&utm_campaign=badger) [![Maintainability](https://api.codeclimate.com/v1/badges/e9020d1c963a91c0c8a2/maintainability)](https://codeclimate.com/github/Chalarangelo/30-seconds-of-code/maintainability)  [![Insight.io](https://img.shields.io/badge/insight.io-Ready-brightgreen.svg)](https://insight.io/github.com/Chalarangelo/30-seconds-of-code/tree/master/?source=0) [![js-semistandard-style](https://img.shields.io/badge/code%20style-semistandard-brightgreen.svg)](https://github.com/Flet/semistandard) [![ProductHunt](https://img.shields.io/badge/producthunt-vote-orange.svg)](https://www.producthunt.com/posts/30-seconds-of-code)


> Curated collection of useful JavaScript snippets that you can understand in 30 seconds or less.

- Use <kbd>Ctrl</kbd> + <kbd>F</kbd> or <kbd>command</kbd> + <kbd>F</kbd> to search for a snippet.
- Contributions welcome, please read the [contribution guide](CONTRIBUTING.md).
- Snippets are written in ES6, use the [Babel transpiler](https://babeljs.io/) to ensure backwards-compatibility.
- You can import these snippets into your text editor of choice (VSCode, Atom, Sublime) using the files found in [this repo](https://github.com/Rob-Rychs/30-seconds-of-code-texteditorsnippets).
- You can import these snippets into Alfred 3, using [this file](https://github.com/lslvxy/30-seconds-of-code-alfredsnippets).

#### Related

- [30 Seconds of CSS](https://atomiks.github.io/30-seconds-of-css/)
- [30 Seconds of Python](https://github.com/kriadmin/30-seconds-of-python-code)

#### Package

⚠️ **WARNING:** Snippets are not production ready.

You can find a package with all the snippets on [npm](https://www.npmjs.com/package/30-seconds-of-code).

```bash
# With npm
npm install 30-seconds-of-code

# With yarn
yarn add 30-seconds-of-code
```

CDN links
- [ES2017 Full (UMD)](https://unpkg.com/30-seconds-of-code)
- [ES5 Minified (UMD)](https://unpkg.com/30-seconds-of-code/dist/_30s.es5.min.js)

<details>
<summary>Details</summary>

**Browser**

> IMPORTANT: replace the `src` with the full version link and desired target spec (such as ES5 minified)):

```html
<script src="https://unpkg.com/30-seconds-of-code"></script>
<script>
  _30s.average(1, 2, 3);
</script>
```

**Node**

```js
// CommonJS
const _30s = require('30-seconds-of-code');
_30s.average(1, 2, 3);

// ES Modules
import _30s from '30-seconds-of-code';
_30s.average(1, 2, 3);
```

To import snippets directly:

```js
// CommonJS
const { average } = require('30-seconds-of-code');
average(1, 2, 3);

// ES Modules
import { average } from '30-seconds-of-code';
average(1, 2, 3);
```
</details>

## Table of Contents

### 🔌 Adapter

<details>
<summary>View contents</summary>

* [`ary`](#ary)
* [`call`](#call)
* [`collectInto`](#collectinto)
* [`flip`](#flip)
* [`over`](#over)
* [`overArgs`](#overargs)
* [`pipeAsyncFunctions`](#pipeasyncfunctions)
* [`pipeFunctions`](#pipefunctions)
* [`promisify`](#promisify)
* [`rearg`](#rearg)
* [`spreadOver`](#spreadover)
* [`unary`](#unary)

</details>

### 📚 Array

<details>
<summary>View contents</summary>

* [`all`](#all)
* [`any`](#any)
* [`bifurcate`](#bifurcate)
* [`bifurcateBy`](#bifurcateby)
* [`chunk`](#chunk)
* [`compact`](#compact)
* [`countBy`](#countby)
* [`countOccurrences`](#countoccurrences)
* [`deepFlatten`](#deepflatten)
* [`difference`](#difference)
* [`differenceBy`](#differenceby)
* [`differenceWith`](#differencewith)
* [`drop`](#drop)
* [`dropRight`](#dropright)
* [`dropRightWhile`](#droprightwhile)
* [`dropWhile`](#dropwhile)
* [`everyNth`](#everynth)
* [`filterNonUnique`](#filternonunique)
* [`findLast`](#findlast)
* [`findLastIndex`](#findlastindex)
* [`flatten`](#flatten)
* [`forEachRight`](#foreachright)
* [`groupBy`](#groupby)
* [`head`](#head)
* [`indexOfAll`](#indexofall)
* [`initial`](#initial)
* [`initialize2DArray`](#initialize2darray)
* [`initializeArrayWithRange`](#initializearraywithrange)
* [`initializeArrayWithRangeRight`](#initializearraywithrangeright)
* [`initializeArrayWithValues`](#initializearraywithvalues)
* [`intersection`](#intersection)
* [`intersectionBy`](#intersectionby)
* [`intersectionWith`](#intersectionwith)
* [`isSorted`](#issorted)
* [`join`](#join)
* [`last`](#last)
* [`longestItem`](#longestitem)
* [`mapObject`](#mapobject-)
* [`maxN`](#maxn)
* [`minN`](#minn)
* [`none`](#none)
* [`nthElement`](#nthelement)
* [`partition`](#partition)
* [`permutations`](#permutations)
* [`pull`](#pull)
* [`pullAtIndex`](#pullatindex)
* [`pullAtValue`](#pullatvalue)
* [`pullBy`](#pullby-)
* [`reducedFilter`](#reducedfilter)
* [`reduceSuccessive`](#reducesuccessive)
* [`reduceWhich`](#reducewhich)
* [`remove`](#remove)
* [`sample`](#sample)
* [`sampleSize`](#samplesize)
* [`shuffle`](#shuffle)
* [`similarity`](#similarity)
* [`sortedIndex`](#sortedindex)
* [`sortedIndexBy`](#sortedindexby)
* [`sortedLastIndex`](#sortedlastindex)
* [`sortedLastIndexBy`](#sortedlastindexby)
* [`stableSort`](#stablesort-)
* [`symmetricDifference`](#symmetricdifference)
* [`symmetricDifferenceBy`](#symmetricdifferenceby)
* [`symmetricDifferenceWith`](#symmetricdifferencewith)
* [`tail`](#tail)
* [`take`](#take)
* [`takeRight`](#takeright)
* [`takeRightWhile`](#takerightwhile)
* [`takeWhile`](#takewhile)
* [`union`](#union)
* [`unionBy`](#unionby)
* [`unionWith`](#unionwith)
* [`uniqueElements`](#uniqueelements)
* [`unzip`](#unzip)
* [`unzipWith`](#unzipwith-)
* [`without`](#without)
* [`xProd`](#xprod)
* [`zip`](#zip)
* [`zipObject`](#zipobject)
* [`zipWith`](#zipwith-)

</details>

### 🌐 Browser

<details>
<summary>View contents</summary>

* [`arrayToHtmlList`](#arraytohtmllist)
* [`bottomVisible`](#bottomvisible)
* [`copyToClipboard`](#copytoclipboard-)
* [`createElement`](#createelement)
* [`createEventHub`](#createeventhub-)
* [`currentURL`](#currenturl)
* [`detectDeviceType`](#detectdevicetype)
* [`elementIsVisibleInViewport`](#elementisvisibleinviewport)
* [`getScrollPosition`](#getscrollposition)
* [`getStyle`](#getstyle)
* [`hasClass`](#hasclass)
* [`hashBrowser`](#hashbrowser-)
* [`hide`](#hide)
* [`httpsRedirect`](#httpsredirect)
* [`observeMutations`](#observemutations-)
* [`off`](#off)
* [`on`](#on)
* [`onUserInputChange`](#onuserinputchange-)
* [`prefix`](#prefix)
* [`recordAnimationFrames`](#recordanimationframes)
* [`redirect`](#redirect)
* [`runAsync`](#runasync-)
* [`scrollToTop`](#scrolltotop)
* [`setStyle`](#setstyle)
* [`show`](#show)
* [`smoothScroll`](#smoothscroll)
* [`toggleClass`](#toggleclass)
* [`UUIDGeneratorBrowser`](#uuidgeneratorbrowser)

</details>

### ⏱️ Date

<details>
<summary>View contents</summary>

* [`formatDuration`](#formatduration)
* [`getColonTimeFromDate`](#getcolontimefromdate)
* [`getDaysDiffBetweenDates`](#getdaysdiffbetweendates)
* [`getMeridiemSuffixOfInteger`](#getmeridiemsuffixofinteger)
* [`tomorrow`](#tomorrow)

</details>

### 🎛️ Function

<details>
<summary>View contents</summary>

* [`attempt`](#attempt)
* [`bind`](#bind)
* [`bindKey`](#bindkey)
* [`chainAsync`](#chainasync)
* [`compose`](#compose)
* [`composeRight`](#composeright)
* [`converge`](#converge)
* [`curry`](#curry)
* [`debounce`](#debounce)
* [`defer`](#defer)
* [`delay`](#delay)
* [`functionName`](#functionname)
* [`memoize`](#memoize)
* [`negate`](#negate)
* [`once`](#once)
* [`partial`](#partial)
* [`partialRight`](#partialright)
* [`runPromisesInSeries`](#runpromisesinseries)
* [`sleep`](#sleep)
* [`throttle`](#throttle)
* [`times`](#times)
* [`uncurry`](#uncurry)
* [`unfold`](#unfold)

</details>

### ➗ Math

<details>
<summary>View contents</summary>

* [`approximatelyEqual`](#approximatelyequal)
* [`average`](#average)
* [`averageBy`](#averageby)
* [`binomialCoefficient`](#binomialcoefficient)
* [`clampNumber`](#clampnumber)
* [`degreesToRads`](#degreestorads)
* [`digitize`](#digitize)
* [`distance`](#distance)
* [`elo`](#elo-)
* [`factorial`](#factorial)
* [`fibonacci`](#fibonacci)
* [`gcd`](#gcd)
* [`geometricProgression`](#geometricprogression)
* [`hammingDistance`](#hammingdistance)
* [`inRange`](#inrange)
* [`isDivisible`](#isdivisible)
* [`isEven`](#iseven)
* [`isPrime`](#isprime)
* [`lcm`](#lcm)
* [`luhnCheck`](#luhncheck)
* [`maxBy`](#maxby)
* [`median`](#median)
* [`minBy`](#minby)
* [`percentile`](#percentile)
* [`powerset`](#powerset)
* [`primes`](#primes)
* [`radsToDegrees`](#radstodegrees)
* [`randomIntArrayInRange`](#randomintarrayinrange)
* [`randomIntegerInRange`](#randomintegerinrange)
* [`randomNumberInRange`](#randomnumberinrange)
* [`round`](#round)
* [`sdbm`](#sdbm)
* [`standardDeviation`](#standarddeviation)
* [`sum`](#sum)
* [`sumBy`](#sumby)
* [`sumPower`](#sumpower)
* [`toSafeInteger`](#tosafeinteger)

</details>

### 📦 Node

<details>
<summary>View contents</summary>

* [`atob`](#atob)
* [`btoa`](#btoa)
* [`colorize`](#colorize)
* [`hasFlags`](#hasflags)
* [`hashNode`](#hashnode)
* [`isTravisCI`](#istravisci)
* [`JSONToFile`](#jsontofile)
* [`readFileLines`](#readfilelines)
* [`untildify`](#untildify)
* [`UUIDGeneratorNode`](#uuidgeneratornode)

</details>

### 🗃️ Object

<details>
<summary>View contents</summary>

* [`bindAll`](#bindall)
* [`deepClone`](#deepclone)
* [`defaults`](#defaults)
* [`equals`](#equals-)
* [`findKey`](#findkey)
* [`findLastKey`](#findlastkey)
* [`flattenObject`](#flattenobject)
* [`forOwn`](#forown)
* [`forOwnRight`](#forownright)
* [`functions`](#functions)
* [`get`](#get)
* [`invertKeyValues`](#invertkeyvalues)
* [`lowercaseKeys`](#lowercasekeys)
* [`mapKeys`](#mapkeys)
* [`mapValues`](#mapvalues)
* [`matches`](#matches)
* [`matchesWith`](#matcheswith)
* [`merge`](#merge)
* [`nest`](#nest)
* [`objectFromPairs`](#objectfrompairs)
* [`objectToPairs`](#objecttopairs)
* [`omit`](#omit)
* [`omitBy`](#omitby)
* [`orderBy`](#orderby)
* [`pick`](#pick)
* [`pickBy`](#pickby)
* [`shallowClone`](#shallowclone)
* [`size`](#size)
* [`transform`](#transform)
* [`truthCheckCollection`](#truthcheckcollection)
* [`unflattenObject`](#unflattenobject-)

</details>

### 📜 String

<details>
<summary>View contents</summary>

* [`byteSize`](#bytesize)
* [`capitalize`](#capitalize)
* [`capitalizeEveryWord`](#capitalizeeveryword)
* [`decapitalize`](#decapitalize)
* [`escapeHTML`](#escapehtml)
* [`escapeRegExp`](#escaperegexp)
* [`fromCamelCase`](#fromcamelcase)
* [`isAbsoluteURL`](#isabsoluteurl)
* [`isAnagram`](#isanagram)
* [`isLowerCase`](#islowercase)
* [`isUpperCase`](#isuppercase)
* [`mask`](#mask)
* [`pad`](#pad)
* [`palindrome`](#palindrome)
* [`pluralize`](#pluralize)
* [`removeNonASCII`](#removenonascii)
* [`reverseString`](#reversestring)
* [`sortCharactersInString`](#sortcharactersinstring)
* [`splitLines`](#splitlines)
* [`stringPermutations`](#stringpermutations)
* [`stripHTMLTags`](#striphtmltags)
* [`toCamelCase`](#tocamelcase)
* [`toKebabCase`](#tokebabcase)
* [`toSnakeCase`](#tosnakecase)
* [`truncateString`](#truncatestring)
* [`unescapeHTML`](#unescapehtml)
* [`URLJoin`](#urljoin)
* [`words`](#words)

</details>

### 📃 Type

<details>
<summary>View contents</summary>

* [`getType`](#gettype)
* [`is`](#is)
* [`isArrayLike`](#isarraylike)
* [`isBoolean`](#isboolean)
* [`isEmpty`](#isempty)
* [`isFunction`](#isfunction)
* [`isNil`](#isnil)
* [`isNull`](#isnull)
* [`isNumber`](#isnumber)
* [`isObject`](#isobject)
* [`isObjectLike`](#isobjectlike)
* [`isPlainObject`](#isplainobject)
* [`isPrimitive`](#isprimitive)
* [`isPromiseLike`](#ispromiselike)
* [`isString`](#isstring)
* [`isSymbol`](#issymbol)
* [`isUndefined`](#isundefined)
* [`isValidJSON`](#isvalidjson)

</details>

### 🔧 Utility

<details>
<summary>View contents</summary>

* [`castArray`](#castarray)
* [`cloneRegExp`](#cloneregexp)
* [`coalesce`](#coalesce)
* [`coalesceFactory`](#coalescefactory)
* [`extendHex`](#extendhex)
* [`getURLParameters`](#geturlparameters)
* [`hexToRGB`](#hextorgb-)
* [`httpGet`](#httpget)
* [`httpPost`](#httppost)
* [`isBrowser`](#isbrowser)
* [`mostPerformant`](#mostperformant)
* [`nthArg`](#ntharg)
* [`parseCookie`](#parsecookie)
* [`prettyBytes`](#prettybytes)
* [`randomHexColorCode`](#randomhexcolorcode)
* [`RGBToHex`](#rgbtohex)
* [`serializeCookie`](#serializecookie)
* [`timeTaken`](#timetaken)
* [`toCurrency`](#tocurrency)
* [`toDecimalMark`](#todecimalmark)
* [`toOrdinalSuffix`](#toordinalsuffix)
* [`validateNumber`](#validatenumber)
* [`yesNo`](#yesno)

</details>

---
 ## 🔌 Adapter

### ary

Creates a function that accepts up to `n` arguments, ignoring any additional arguments.

Call the provided function, `fn`, with up to `n` arguments, using `Array.slice(0,n)` and the spread operator (`...`).

```js
const ary = (fn, n) => (...args) => fn(...args.slice(0, n));
```

<details>
<summary>Examples</summary>

```js
const firstTwoMax = ary(Math.max, 2);
[[2, 6, 'a'], [8, 4, 6], [10]].map(x => firstTwoMax(...x)); // [6, 8, 10]
```

</details>

<br>[⬆ Back to top](#table-of-contents)


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
Pall(p1, p2, p3).then(console.log); // [1, 2, 3] (after about 2 seconds)
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### flip

Flip takes a function as an argument, then makes the first argument the last.

Return a closure that takes variadic inputs, and splices the last argument to make it the first argument before applying the rest.

```js
const flip = fn => (first, ...rest) => fn(...rest, first);
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


### over

Creates a function that invokes each provided function with the arguments it receives and returns the results.

Use `Array.map()` and `Function.apply()` to apply each function to the given arguments.

```js
const over = (...fns) => (...args) => fns.map(fn => fn.apply(null, args));
```

<details>
<summary>Examples</summary>

```js
const minMax = over(Math.min, Math.max);
minMax(1, 2, 3, 4, 5); // [1,5]
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### overArgs

Creates a function that invokes the provided function with its arguments transformed.

Use `Array.map()` to apply `transforms` to `args` in combination with the spread operator (`...`) to pass the transformed arguments to `fn`.

```js
const overArgs = (fn, transforms) => (...args) => fn(...args.map((val, i) => transforms[i](val)));
```

<details>
<summary>Examples</summary>

```js
const square = n => n * n;
const double = n => n * 2;
const fn = overArgs((x, y) => [x, y], [square, double]);
fn(9, 3); // [81, 6]
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### pipeAsyncFunctions

Performs left-to-right function composition for asynchronous functions.

Use `Array.reduce()` with the spread operator (`...`) to perform left-to-right function composition using `Promise.then()`.
The functions can return a combination of: simple values, `Promise`'s, or they can be defined as `async` ones returning through `await`.
All functions must be unary.

```js
const pipeAsyncFunctions = (...fns) => arg => fns.reduce((p, f) => p.then(f), Promise.resolve(arg));
```

<details>
<summary>Examples</summary>

```js
const sum = pipeAsyncFunctions(
  x => x + 1,
  x => new Promise(resolve => setTimeout(() => resolve(x + 2), 1000)),
  x => x + 3,
  async x => (await x) + 4
);
(async () => {
  console.log(await sum(5)); // 15 (after one second)
})();
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


### rearg

Creates a function that invokes the provided function with its arguments arranged according to the specified indexes.

Use `Array.reduce()` and `Array.indexOf()` to reorder arguments based on `indexes` in combination with the spread operator (`...`) to pass the transformed arguments to `fn`.

```js
const rearg = (fn, indexes) => (...args) =>
  fn(
    ...args.reduce(
      (acc, val, i) => ((acc[indexes.indexOf(i)] = val), acc),
      Array.from({ length: indexes.length })
    )
  );
```

<details>
<summary>Examples</summary>

```js
var rearged = rearg(
  function(a, b, c) {
    return [a, b, c];
  },
  [2, 0, 1]
);
rearged('b', 'c', 'a'); // ['a', 'b', 'c']
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
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### unary

Creates a function that accepts up to one argument, ignoring any additional arguments.

Call the provided function, `fn`, with just the first argument given.

```js
const unary = fn => val => fn(val);
```

<details>
<summary>Examples</summary>

```js
['6', '8', '10'].map(unary(parseInt)); // [6, 8, 10]
```

</details>

<br>[⬆ Back to top](#table-of-contents)

---
 ## 📚 Array

### all

Returns `true` if the provided predicate function returns `true` for all elements in a collection, `false` otherwise.

Use `Array.every()` to test if all elements in the collection return `true` based on `fn`.
Omit the second argument, `fn`, to use `Boolean` as a default.

```js
const all = (arr, fn = Boolean) => arr.every(fn);
```

<details>
<summary>Examples</summary>

```js
all([4, 2, 3], x => x > 1); // true
all([1, 2, 3]); // true
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### any

Returns `true` if the provided predicate function returns `true` for at least one element in a collection, `false` otherwise.

Use `Array.some()` to test if any elements in the collection return `true` based on `fn`.
Omit the second argument, `fn`, to use `Boolean` as a default.

```js
const any = (arr, fn = Boolean) => arr.some(fn);
```

<details>
<summary>Examples</summary>

```js
any([0, 1, 2, 0], x => x >= 2); // true
any([0, 0, 1, 0]); // true
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### bifurcate

Splits values into two groups. If an element in `filter` is truthy, the corresponding element in the collection belongs to the first group; otherwise, it belongs to the second group.

Use `Array.reduce()` and `Array.push()` to add elements to groups, based on `filter`.

```js
const bifurcate = (arr, filter) =>
  arr.reduce((acc, val, i) => (acc[filter[i] ? 0 : 1].push(val), acc), [[], []]);
```

<details>
<summary>Examples</summary>

```js
bifurcate(['beep', 'boop', 'foo', 'bar'], [true, true, false, true]); // [ ['beep', 'boop', 'bar'], ['foo'] ]
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### bifurcateBy

Splits values into two groups according to a predicate function, which specifies which group an element in the input collection belongs to. If the predicate function returns a truthy value, the collection element belongs to the first group; otherwise, it belongs to the second group.

Use `Array.reduce()` and `Array.push()` to add elements to groups, based on the value returned by `fn` for each element.

```js
const bifurcateBy = (arr, fn) =>
  arr.reduce((acc, val, i) => (acc[fn(val, i) ? 0 : 1].push(val), acc), [[], []]);
```

<details>
<summary>Examples</summary>

```js
bifurcateBy(['beep', 'boop', 'foo', 'bar'], x => x[0] === 'b'); // [ ['beep', 'boop', 'bar'], ['foo'] ]
```

</details>

<br>[⬆ Back to top](#table-of-contents)


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


### countBy

Groups the elements of an array based on the given function and returns the count of elements in each group.

Use `Array.map()` to map the values of an array to a function or property name.
Use `Array.reduce()` to create an object, where the keys are produced from the mapped results.

```js
const countBy = (arr, fn) =>
  arr.map(typeof fn === 'function' ? fn : val => val[fn]).reduce((acc, val, i) => {
    acc[val] = (acc[val] || 0) + 1;
    return acc;
  }, {});
```

<details>
<summary>Examples</summary>

```js
countBy([6.1, 4.2, 6.3], Math.floor); // {4: 1, 6: 2}
countBy(['one', 'two', 'three'], 'length'); // {3: 2, 5: 1}
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### countOccurrences

Counts the occurrences of a value in an array.

Use `Array.reduce()` to increment a counter each time you encounter the specific value inside the array.

```js
const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a + 0), 0);
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


### differenceBy

Returns the difference between two arrays, after applying the provided function to each array element of both.

Create a `Set` by applying `fn` to each element in `b`, then use `Array.filter()` in combination with `fn` on `a` to only keep values not contained in the previously created set.

```js
const differenceBy = (a, b, fn) => {
  const s = new Set(b.map(v => fn(v)));
  return a.filter(x => !s.has(fn(x)));
};
```

<details>
<summary>Examples</summary>

```js
differenceBy([2.1, 1.2], [2.3, 3.4], Math.floor); // [1.2]
differenceBy([{ x: 2 }, { x: 1 }], [{ x: 1 }], v => v.x); // [ { x: 2 } ]
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### differenceWith

Filters out all values from an array for which the comparator function does not return `true`.

Use `Array.filter()` and `Array.findIndex()` to find the appropriate values.

```js
const differenceWith = (arr, val, comp) => arr.filter(a => val.findIndex(b => comp(a, b)) === -1);
```

<details>
<summary>Examples</summary>

```js
differenceWith([1, 1.2, 1.5, 3, 0], [1.9, 3, 0], (a, b) => Math.round(a) === Math.round(b)); // [1, 1.2]
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### drop

Returns a new array with `n` elements removed from the left.

Use `Array.slice()` to slice the remove the specified number of elements from the left.

```js
const drop = (arr, n = 1) => arr.slice(n);
```

<details>
<summary>Examples</summary>

```js
drop([1, 2, 3]); // [2,3]
drop([1, 2, 3], 2); // [3]
drop([1, 2, 3], 42); // []
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


### dropRightWhile

Removes elements from the end of an array until the passed function returns `true`. Returns the remaining elements in the array.

Loop through the array, using `Array.slice()` to drop the last element of the array until the returned value from the function is `true`.
Returns the remaining elements.

```js
const dropRightWhile = (arr, func) => {
  while (arr.length > 0 && !func(arr[arr.length - 1])) arr = arr.slice(0, -1);
  return arr;
};
```

<details>
<summary>Examples</summary>

```js
dropRightWhile([1, 2, 3, 4], n => n < 3); // [1, 2]
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### dropWhile

Removes elements in an array until the passed function returns `true`. Returns the remaining elements in the array.

Loop through the array, using `Array.slice()` to drop the first element of the array until the returned value from the function is `true`.
Returns the remaining elements.

```js
const dropWhile = (arr, func) => {
  while (arr.length > 0 && !func(arr[0])) arr = arr.slice(1);
  return arr;
};
```

<details>
<summary>Examples</summary>

```js
dropWhile([1, 2, 3, 4], n => n >= 3); // [3,4]
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


### findLast

Returns the last element for which the provided function returns a truthy value.

Use `Array.filter()` to remove elements for which `fn` returns falsey values, `Array.slice(-1)` to get the last one.

```js
const findLast = (arr, fn) => arr.filter(fn).slice(-1)[0];
```

<details>
<summary>Examples</summary>

```js
findLast([1, 2, 3, 4], n => n % 2 === 1); // 3
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### findLastIndex

Returns the index of the last element for which the provided function returns a truthy value.

Use `Array.map()` to map each element to an array with its index and value.
Use `Array.filter()` to remove elements for which `fn` returns falsey values, `Array.slice(-1)` to get the last one.

```js
const findLastIndex = (arr, fn) =>
  arr
    .map((val, i) => [i, val])
    .filter(val => fn(val[1], val[0], arr))
    .slice(-1)[0][0];
```

<details>
<summary>Examples</summary>

```js
findLastIndex([1, 2, 3, 4], n => n % 2 === 1); // 2 (index of the value 3)
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### flatten

Flattens an array up to the specified depth.

Use recursion, decrementing `depth` by 1 for each level of depth.
Use `Array.reduce()` and `Array.concat()` to merge elements or arrays.
Base case, for `depth` equal to `1` stops recursion.
Omit the second argument, `depth` to flatten only to a depth of `1` (single flatten).

```js
const flatten = (arr, depth = 1) =>
  arr.reduce((a, v) => a.concat(depth > 1 && Array.isArray(v) ? flatten(v, depth - 1) : v), []);
```

<details>
<summary>Examples</summary>

```js
flatten([1, [2], 3, 4]); // [1, 2, 3, 4]
flatten([1, [2, [3, [4, 5], 6], 7], 8], 2); // [1, 2, 3, [4, 5], 6, 7, 8]
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### forEachRight

Executes a provided function once for each array element, starting from the array's last element.

Use `Array.slice(0)` to clone the given array, `Array.reverse()` to reverse it and `Array.forEach()` to iterate over the reversed array.

```js
const forEachRight = (arr, callback) =>
  arr
    .slice(0)
    .reverse()
    .forEach(callback);
```

<details>
<summary>Examples</summary>

```js
forEachRight([1, 2, 3, 4], val => console.log(val)); // '4', '3', '2', '1'
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### groupBy

Groups the elements of an array based on the given function.

Use `Array.map()` to map the values of an array to a function or property name.
Use `Array.reduce()` to create an object, where the keys are produced from the mapped results.

```js
const groupBy = (arr, fn) =>
  arr.map(typeof fn === 'function' ? fn : val => val[fn]).reduce((acc, val, i) => {
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


### indexOfAll

Returns all indices of `val` in an array. If `val` never occurs, returns `[]`.

Use `Array.forEach()` to loop over elements and `Array.push()` to store indices for matching elements.
Return the array of indices.

```js
const indexOfAll = (arr, val) => {
  const indices = [];
  arr.forEach((el, i) => el === val && indices.push(i));
  return indices;
};
```

<details>
<summary>Examples</summary>

```js
indexOfAll([1, 2, 3, 1, 2, 3], 1); // [0,3]
indexOfAll([1, 2, 3], 4); // []
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
  Array.from({ length: h }).map(() => Array.from({ length: w }).fill(val));
```

<details>
<summary>Examples</summary>

```js
initialize2DArray(2, 2, 0); // [[0,0], [0,0]]
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### initializeArrayWithRange

Initializes an array containing the numbers in the specified range where `start` and `end` are inclusive with their common difference `step`.

Use `Array.from(Math.ceil((end+1-start)/step))` to create an array of the desired length(the amounts of elements is equal to `(end-start)/step` or `(end+1-start)/step` for inclusive end), `Array.map()` to fill with the desired values in a range.
You can omit `start` to use a default value of `0`.
You can omit `step` to use a default value of `1`.

```js
const initializeArrayWithRange = (end, start = 0, step = 1) =>
  Array.from({ length: Math.ceil((end + 1 - start) / step) }).map((v, i) => i * step + start);
```

<details>
<summary>Examples</summary>

```js
initializeArrayWithRange(5); // [0,1,2,3,4,5]
initializeArrayWithRange(7, 3); // [3,4,5,6,7]
initializeArrayWithRange(9, 0, 2); // [0,2,4,6,8]
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### initializeArrayWithRangeRight

Initializes an array containing the numbers in the specified range (in reverse) where `start` and `end` are inclusive with their common difference `step`.

Use `Array.from(Math.ceil((end+1-start)/step))` to create an array of the desired length(the amounts of elements is equal to `(end-start)/step` or `(end+1-start)/step` for inclusive end), `Array.map()` to fill with the desired values in a range.
You can omit `start` to use a default value of `0`.
You can omit `step` to use a default value of `1`.

```js
const initializeArrayWithRangeRight = (end, start = 0, step = 1) =>
  Array.from({ length: Math.ceil((end + 1 - start) / step) }).map(
    (v, i, arr) => (arr.length - i - 1) * step + start
  );
```

<details>
<summary>Examples</summary>

```js
initializeArrayWithRangeRight(5); // [5,4,3,2,1,0]
initializeArrayWithRangeRight(7, 3); // [7,6,5,4,3]
initializeArrayWithRangeRight(9, 0, 2); // [8,6,4,2,0]
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### initializeArrayWithValues

Initializes and fills an array with the specified values.

Use `Array(n)` to create an array of the desired length, `fill(v)` to fill it with the desired values.
You can omit `val` to use a default value of `0`.

```js
const initializeArrayWithValues = (n, val = 0) => Array(n).fill(val);
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


### intersectionBy

Returns a list of elements that exist in both arrays, after applying the provided function to each array element of both.

Create a `Set` by applying `fn` to all elements in `b`, then use `Array.filter()` on `a` to only keep elements, which produce values contained in `b` when `fn` is applied to them.

```js
const intersectionBy = (a, b, fn) => {
  const s = new Set(b.map(x => fn(x)));
  return a.filter(x => s.has(fn(x)));
};
```

<details>
<summary>Examples</summary>

```js
intersectionBy([2.1, 1.2], [2.3, 3.4], Math.floor); // [2.1]
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### intersectionWith

Returns a list of elements that exist in both arrays, using a provided comparator function.

Use `Array.filter()` and `Array.findIndex()` in combination with the provided comparator to determine intersecting values.

```js
const intersectionWith = (a, b, comp) => a.filter(x => b.findIndex(y => comp(x, y)) !== -1);
```

<details>
<summary>Examples</summary>

```js
intersectionWith([1, 1.2, 1.5, 3, 0], [1.9, 3, 0, 3.9], (a, b) => Math.round(a) === Math.round(b)); // [1.5, 3, 0]
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### isSorted

Returns `1` if the array is sorted in ascending order, `-1` if it is sorted in descending order or `0` if it is not sorted.

Calculate the ordering `direction` for the first two elements.
Use `Object.entries()` to loop over array objects and compare them in pairs.
Return `0` if the `direction` changes or the `direction` if the last element is reached.

```js
const isSorted = arr => {
  let direction = -(arr[0] - arr[1]);
  for (let [i, val] of arr.entries()) {
    direction = !direction ? -(arr[i - 1] - arr[i]) : direction;
    if (i === arr.length - 1) return !direction ? 0 : direction;
    else if ((val - arr[i + 1]) * direction > 0) return 0;
  }
};
```

<details>
<summary>Examples</summary>

```js
isSorted([0, 1, 2, 2]); // 1
isSorted([4, 3, 2]); // -1
isSorted([4, 3, 5]); // 0
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
      i === arr.length - 2
        ? acc + val + end
        : i === arr.length - 1 ? acc + val : acc + val + separator,
    ''
  );
```

<details>
<summary>Examples</summary>

```js
join(['pen', 'pineapple', 'apple', 'pen'], ',', '&'); // "pen,pineapple,apple&pen"
join(['pen', 'pineapple', 'apple', 'pen'], ','); // "pen,pineapple,apple,pen"
join(['pen', 'pineapple', 'apple', 'pen']); // "pen,pineapple,apple,pen"
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


### longestItem

Takes any number of iterable objects or objects with a `length` property and returns the longest one.

Use `Array.sort()` to sort all arguments by `length`, return the first (longest) one.

```js
const longestItem = (...vals) => [...vals].sort((a, b) => b.length - a.length)[0];
```

<details>
<summary>Examples</summary>

```js
longestItem('this', 'is', 'a', 'testcase'); // 'testcase'
longestItem(...['a', 'ab', 'abc']); // 'abc'
longestItem(...['a', 'ab', 'abc'], 'abcd'); // 'abcd'
longestItem([1, 2, 3], [1, 2], [1, 2, 3, 4, 5]); // [1, 2, 3, 4, 5]
longestItem([1, 2, 3], 'foobar'); // 'foobar'
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### mapObject ![advanced](/advanced.svg)

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


### maxN

Returns the `n` maximum elements from the provided array. If `n` is greater than or equal to the provided array's length, then return the original array(sorted in descending order).

Use `Array.sort()` combined with the spread operator (`...`) to create a shallow clone of the array and sort it in descending order.
Use `Array.slice()` to get the specified number of elements.
Omit the second argument, `n`, to get a one-element array.

```js
const maxN = (arr, n = 1) => [...arr].sort((a, b) => b - a).slice(0, n);
```

<details>
<summary>Examples</summary>

```js
maxN([1, 2, 3]); // [3]
maxN([1, 2, 3], 2); // [3,2]
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### minN

Returns the `n` minimum elements from the provided array. If `n` is greater than or equal to the provided array's length, then return the original array(sorted in ascending order).

Use `Array.sort()` combined with the spread operator (`...`) to create a shallow clone of the array and sort it in ascending order.
Use `Array.slice()` to get the specified number of elements.
Omit the second argument, `n`, to get a one-element array.

```js
const minN = (arr, n = 1) => [...arr].sort((a, b) => a - b).slice(0, n);
```
<details>
<summary>Examples</summary>

```js
minN([1, 2, 3]); // [1]
minN([1, 2, 3], 2); // [1,2]
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### none

Returns `true` if the provided predicate function returns `false` for all elements in a collection, `false` otherwise.

Use `Array.some()` to test if any elements in the collection return `true` based on `fn`.
Omit the second argument, `fn`, to use `Boolean` as a default.

```js
const none = (arr, fn = Boolean) => !arr.some(fn);
```

<details>
<summary>Examples</summary>

```js
none([0, 1, 3, 0], x => x == 2); // true
none([0, 0, 0]); // true
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


### partition

Groups the elements into two arrays, depending on the provided function's truthiness for each element.

Use `Array.reduce()` to create an array of two arrays.
Use `Array.push()` to add elements for which `fn` returns `true` to the first array and elements for which `fn` returns `false` to the second one.

```js
const partition = (arr, fn) =>
  arr.reduce(
    (acc, val, i, arr) => {
      acc[fn(val, i, arr) ? 0 : 1].push(val);
      return acc;
    },
    [[], []]
  );
```

<details>
<summary>Examples</summary>

```js
const users = [{ user: 'barney', age: 36, active: false }, { user: 'fred', age: 40, active: true }];
partition(users, o => o.active); // [[{ 'user': 'fred',    'age': 40, 'active': true }],[{ 'user': 'barney',  'age': 36, 'active': false }]]
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### permutations

⚠️ **WARNING**: This function's execution time increases exponentially with each array element. Anything more than 8 to 10 entries will cause your browser to hang as it tries to solve all the different combinations.

Generates all permutations of an array's elements (contains duplicates).

Use recursion.
For each element in the given array, create all the partial permutations for the rest of its elements.
Use `Array.map()` to combine the element with each partial permutation, then `Array.reduce()` to combine all permutations in one array.
Base cases are for array `length` equal to `2` or `1`.

```js
const permutations = arr => {
  if (arr.length <= 2) return arr.length === 2 ? [arr, [arr[1], arr[0]]] : arr;
  return arr.reduce(
    (acc, item, i) =>
      acc.concat(
        permutations([...arr.slice(0, i), ...arr.slice(i + 1)]).map(val => [item, ...val])
      ),
    []
  );
};
```

<details>
<summary>Examples</summary>

```js
permutations([1, 33, 5]); // [ [ 1, 33, 5 ], [ 1, 5, 33 ], [ 33, 1, 5 ], [ 33, 5, 1 ], [ 5, 1, 33 ], [ 5, 33, 1 ] ]
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
let myArray = ['a', 'b', 'c', 'a', 'b', 'c'];
pull(myArray, 'a', 'c'); // myArray = [ 'b', 'b' ]
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
let pulled = pullAtIndex(myArray, [1, 3]); // myArray = [ 'a', 'c' ] , pulled = [ 'b', 'd' ]
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
let pulled = pullAtValue(myArray, ['b', 'd']); // myArray = [ 'a', 'c' ] , pulled = [ 'b', 'd' ]
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### pullBy ![advanced](/advanced.svg)

Mutates the original array to filter out the values specified, based on a given iterator function.

Check if the last argument provided in a function.
Use `Array.map()` to apply the iterator function `fn` to all array elements.
Use `Array.filter()` and `Array.includes()` to pull out the values that are not needed.
Use `Array.length = 0` to mutate the passed in an array by resetting it's length to zero and `Array.push()` to re-populate it with only the pulled values.

```js
const pullBy = (arr, ...args) => {
  const length = args.length;
  let fn = length > 1 ? args[length - 1] : undefined;
  fn = typeof fn == 'function' ? (args.pop(), fn) : undefined;
  let argState = (Array.isArray(args[0]) ? args[0] : args).map(val => fn(val));
  let pulled = arr.filter((v, i) => !argState.includes(fn(v)));
  arr.length = 0;
  pulled.forEach(v => arr.push(v));
};
```

<details>
<summary>Examples</summary>

```js
var myArray = [{ x: 1 }, { x: 2 }, { x: 3 }, { x: 1 }];
pullBy(myArray, [{ x: 1 }, { x: 3 }], o => o.x); // myArray = [{ x: 2 }]
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


### reduceSuccessive

Applies a function against an accumulator and each element in the array (from left to right), returning an array of successively reduced values.

Use `Array.reduce()` to apply the given function to the given array, storing each new result.

```js
const reduceSuccessive = (arr, fn, acc) =>
  arr.reduce((res, val, i, arr) => (res.push(fn(res.slice(-1)[0], val, i, arr)), res), [acc]);
```

<details>
<summary>Examples</summary>

```js
reduceSuccessive([1, 2, 3, 4, 5, 6], (acc, val) => acc + val, 0); // [0, 1, 3, 6, 10, 15, 21]
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### reduceWhich

Returns the minimum/maximum value of an array, after applying the provided function to set comparing rule.

Use `Array.reduce()` in combination with the `comparator` function to get the appropriate element in the array.
You can omit the second parameter, `comparator`, to use the default one that returns the minimum element in the array.

```js
const reduceWhich = (arr, comparator = (a, b) => a - b) =>
  arr.reduce((a, b) => (comparator(a, b) >= 0 ? b : a));
```

<details>
<summary>Examples</summary>

```js
reduceWhich([1, 3, 2]); // 1
reduceWhich([1, 3, 2], (a, b) => b - a); // 3
reduceWhich(
  [{ name: 'Tom', age: 12 }, { name: 'Jack', age: 18 }, { name: 'Lucy', age: 9 }],
  (a, b) => a.age - b.age
); // {name: "Lucy", age: 9}
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
remove([1, 2, 3, 4], n => n % 2 === 0); // [2, 4]
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

Uses the [Fisher-Yates algorithm](https://github.com/chalarangelo/30-seconds-of-code#shuffle) to reorder the elements of the array.

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
shuffle(foo); // [2,3,1], foo = [1,2,3]
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### similarity

Returns an array of elements that appear in both arrays.

Use `Array.filter()` to remove values that are not part of `values`, determined using `Array.includes()`.

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


### sortedIndexBy

Returns the lowest index at which value should be inserted into array in order to maintain its sort order, based on a provided iterator function.

Check if the array is sorted in descending order (loosely).
Use `Array.findIndex()` to find the appropriate index where the element should be inserted, based on the iterator function `fn`.

```js
const sortedIndexBy = (arr, n, fn) => {
  const isDescending = fn(arr[0]) > fn(arr[arr.length - 1]);
  const val = fn(n);
  const index = arr.findIndex(el => (isDescending ? val >= fn(el) : val <= fn(el)));
  return index === -1 ? arr.length : index;
};
```

<details>
<summary>Examples</summary>

```js
sortedIndexBy([{ x: 4 }, { x: 5 }], { x: 4 }, o => o.x); // 0
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### sortedLastIndex

Returns the highest index at which value should be inserted into array in order to maintain its sort order.

Check if the array is sorted in descending order (loosely).
Use `Array.reverse()` and `Array.findIndex()` to find the appropriate last index where the element should be inserted.

```js
const sortedLastIndex = (arr, n) => {
  const isDescending = arr[0] > arr[arr.length - 1];
  const index = arr.reverse().findIndex(el => (isDescending ? n <= el : n >= el));
  return index === -1 ? 0 : arr.length - index;
};
```

<details>
<summary>Examples</summary>

```js
sortedLastIndex([10, 20, 30, 30, 40], 30); // 4
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### sortedLastIndexBy

Returns the highest index at which value should be inserted into array in order to maintain its sort order, based on a provided iterator function.

Check if the array is sorted in descending order (loosely).
Use `Array.map()` to apply the iterator function to all elements of the array.
Use `Array.reverse()` and `Array.findIndex()` to find the appropriate last index where the element should be inserted, based on the provided iterator function.

```js
const sortedLastIndexBy = (arr, n, fn) => {
  const isDescending = fn(arr[0]) > fn(arr[arr.length - 1]);
  const val = fn(n);
  const index = arr
    .map(fn)
    .reverse()
    .findIndex(el => (isDescending ? val <= el : val >= el));
  return index === -1 ? 0 : arr.length - index;
};
```

<details>
<summary>Examples</summary>

```js
sortedLastIndexBy([{ x: 4 }, { x: 5 }], { x: 4 }, o => o.x); // 1
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### stableSort ![advanced](/advanced.svg)

Performs stable sorting of an array, preserving the initial indexes of items when their values are the same. 
Does not mutate the original array, but returns a new array instead.

Use `Array.map()` to pair each element of the input array with its corresponding index. 
Use `Array.sort()` and a `compare` function to sort the list, preserving their initial order if the items compared are equal.
Use `Array.map()` to convert back to the initial array items.

```js
const stableSort = (arr, compare) =>
  arr
    .map((item, index) => ({ item, index }))
    .sort((a, b) => compare(a.item, b.item) || a.index - b.index)
    .map(({ item }) => item);
```

<details>
<summary>Examples</summary>

```js
const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const stable = stableSort(arr, () => 0); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
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


### symmetricDifferenceBy

Returns the symmetric difference between two arrays, after applying the provided function to each array element of both.

Create a `Set` by applying `fn` to each array's elements, then use `Array.filter()` on each of them to only keep values not contained in the other.

```js
const symmetricDifferenceBy = (a, b, fn) => {
  const sA = new Set(a.map(v => fn(v))),
    sB = new Set(b.map(v => fn(v)));
  return [...a.filter(x => !sB.has(fn(x))), ...b.filter(x => !sA.has(fn(x)))];
};
```

<details>
<summary>Examples</summary>

```js
symmetricDifferenceBy([2.1, 1.2], [2.3, 3.4], Math.floor); // [ 1.2, 3.4 ]
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### symmetricDifferenceWith

Returns the symmetric difference between two arrays, using a provided function as a comparator.

Use `Array.filter()` and `Array.findIndex()` to find the appropriate values.

```js
const symmetricDifferenceWith = (arr, val, comp) => [
  ...arr.filter(a => val.findIndex(b => comp(a, b)) === -1),
  ...val.filter(a => arr.findIndex(b => comp(a, b)) === -1)
];
```

<details>
<summary>Examples</summary>

```js
symmetricDifferenceWith(
  [1, 1.2, 1.5, 3, 0],
  [1.9, 3, 0, 3.9],
  (a, b) => Math.round(a) === Math.round(b)
); // [1, 1.2, 3.9]
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### tail

Returns all elements in an array except for the first one.

Return `Array.slice(1)` if the array's `length` is more than `1`, otherwise, return the whole array.

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


### takeRightWhile

Removes elements from the end of an array until the passed function returns `true`. Returns the removed elements.

Loop through the array, using a `for...of` loop over `Array.keys()` until the returned value from the function is `true`.
Return the removed elements, using `Array.reverse()` and `Array.slice()`.

```js
const takeRightWhile = (arr, func) => {
  for (let i of arr.reverse().keys())
    if (func(arr[i])) return arr.reverse().slice(arr.length - i, arr.length);
  return arr;
};
```

<details>
<summary>Examples</summary>

```js
takeRightWhile([1, 2, 3, 4], n => n < 3); // [3, 4]
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### takeWhile

Removes elements in an array until the passed function returns `true`. Returns the removed elements.

Loop through the array, using a `for...of` loop over `Array.keys()` until the returned value from the function is `true`.
Return the removed elements, using `Array.slice()`.

```js
const takeWhile = (arr, func) => {
  for (let i of arr.keys()) if (func(arr[i])) return arr.slice(0, i);
  return arr;
};
```

<details>
<summary>Examples</summary>

```js
takeWhile([1, 2, 3, 4], n => n >= 3); // [1, 2]
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


### unionBy

Returns every element that exists in any of the two arrays once, after applying the provided function to each array element of both.

Create a `Set` by applying all `fn` to all values of `a`.
Create a `Set` from `a` and all elements in `b` whose value, after applying `fn` does not match a value in the previously created set.
Return the last set converted to an array.

```js
const unionBy = (a, b, fn) => {
  const s = new Set(a.map(v => fn(v)));
  return Array.from(new Set([...a, ...b.filter(x => !s.has(fn(x)))]));
};
```

<details>
<summary>Examples</summary>

```js
unionBy([2.1], [1.2, 2.3], Math.floor); // [2.1, 1.2]
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### unionWith

Returns every element that exists in any of the two arrays once, using a provided comparator function.

Create a `Set` with all values of `a` and values in `b` for which the comparator finds no matches in `a`, using `Array.findIndex()`.

```js
const unionWith = (a, b, comp) =>
  Array.from(new Set([...a, ...b.filter(x => a.findIndex(y => comp(x, y)) === -1)]));
```

<details>
<summary>Examples</summary>

```js
unionWith([1, 1.2, 1.5, 3, 0], [1.9, 3, 0, 3.9], (a, b) => Math.round(a) === Math.round(b)); // [1, 1.2, 1.5, 3, 0, 3.9]
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### uniqueElements

Returns all unique values of an array.

Use ES6 `Set` and the `...rest` operator to discard all duplicated values.

```js
const uniqueElements = arr => [...new Set(arr)];
```

<details>
<summary>Examples</summary>

```js
uniqueElements([1, 2, 2, 3, 4, 4, 5]); // [1,2,3,4,5]
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### unzip

Creates an array of arrays, ungrouping the elements in an array produced by [zip](#zip).

Use `Math.max.apply()` to get the longest subarray in the array, `Array.map()` to make each element an array.
Use `Array.reduce()` and `Array.forEach()` to map grouped values to individual arrays.

```js
const unzip = arr =>
  arr.reduce(
    (acc, val) => (val.forEach((v, i) => acc[i].push(v)), acc),
    Array.from({
      length: Math.max(...arr.map(x => x.length))
    }).map(x => [])
  );
```

<details>
<summary>Examples</summary>

```js
unzip([['a', 1, true], ['b', 2, false]]); //[['a', 'b'], [1, 2], [true, false]]
unzip([['a', 1, true], ['b', 2]]); //[['a', 'b'], [1, 2], [true]]
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### unzipWith ![advanced](/advanced.svg)

Creates an array of elements, ungrouping the elements in an array produced by [zip](#zip) and applying the provided function.

Use `Math.max.apply()` to get the longest subarray in the array, `Array.map()` to make each element an array.
Use `Array.reduce()` and `Array.forEach()` to map grouped values to individual arrays.
Use `Array.map()` and the spread operator (`...`) to apply `fn` to each individual group of elements.

```js
const unzipWith = (arr, fn) =>
  arr
    .reduce(
      (acc, val) => (val.forEach((v, i) => acc[i].push(v)), acc),
      Array.from({
        length: Math.max(...arr.map(x => x.length))
      }).map(x => [])
    )
    .map(val => fn(...val));
```

<details>
<summary>Examples</summary>

```js
unzipWith([[1, 10, 100], [2, 20, 200]], (...args) => args.reduce((acc, v) => acc + v, 0)); // [3, 30, 300]
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


### xProd

Creates a new array out of the two supplied by creating each possible pair from the arrays.

Use `Array.reduce()`, `Array.map()` and `Array.concat()` to produce every possible pair from the elements of the two arrays and save them in an array.

```js
const xProd = (a, b) => a.reduce((acc, x) => acc.concat(b.map(y => [x, y])), []);
```

<details>
<summary>Examples</summary>

```js
xProd([1, 2], ['a', 'b']); // [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]
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


### zipWith ![advanced](/advanced.svg)

Creates an array of elements, grouped based on the position in the original arrays and using function as the last value to specify how grouped values should be combined.

Check if the last argument provided is a function.
Use `Math.max()` to get the longest array in the arguments.
Creates an array with that length as return value and use `Array.from()` with a map-function to create an array of grouped elements.
If lengths of the argument-arrays vary, `undefined` is used where no value could be found.
The function is invoked with the elements of each group `(...group)`.

```js
const zipWith = (...array) => {
  const fn = typeof array[array.length - 1] === 'function' ? array.pop() : undefined;
  return Array.from(
    { length: Math.max(...array.map(a => a.length)) },
    (_, i) => (fn ? fn(...array.map(a => a[i])) : array.map(a => a[i]))
  );
};
```

<details>
<summary>Examples</summary>

```js
zipWith([1, 2], [10, 20], [100, 200], (a, b, c) => a + b + c); // [111,222]
zipWith(
  [1, 2, 3],
  [10, 20],
  [100, 200],
  (a, b, c) => (a != null ? a : 'a') + (b != null ? b : 'b') + (c != null ? c : 'c')
); // [111, 222, '3bc']
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


### copyToClipboard ![advanced](/advanced.svg)

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


### createElement

Creates an element from a string (without appending it to the document).
If the given string contains multiple elements, only the first one will be returned.

Use `document.createElement()` to create a new element.
Set its `innerHTML` to the string supplied as the argument.
Use `ParentNode.firstElementChild` to return the element version of the string.

```js
const createElement = str => {
  const el = document.createElement('div');
  el.innerHTML = str;
  return el.firstElementChild;
};
```

<details>
<summary>Examples</summary>

```js
const el = createElement(
  `<div class="container">
    <p>Hello!</p>
  </div>`
);
console.log(el.className); // 'container'
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### createEventHub ![advanced](/advanced.svg)

Creates a pub/sub ([publish–subscribe](https://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern)) event hub with `emit`, `on`, and `off` methods.

Use `Object.create(null)` to create an empty `hub` object that does not inherit properties from `Object.prototype`.
For `emit`, resolve the array of handlers based on the `event` argument and then run each one with `Array.forEach()` by passing in the data as an argument.
For `on`, create an array for the event if it does not yet exist, then use `Array.push()` to add the handler
to the array.
For `off`, use `Array.findIndex()` to find the index of the handler in the event array and remove it using `Array.splice()`.

```js
const createEventHub = () => ({
  hub: Object.create(null),
  emit(event, data) {
    (this.hub[event] || []).forEach(handler => handler(data));
  },
  on(event, handler) {
    if (!this.hub[event]) this.hub[event] = [];
    this.hub[event].push(handler);
  },
  off(event, handler) {
    const i = (this.hub[event] || []).findIndex(h => h === handler);
    if (i > -1) this.hub[event].splice(i, 1);
  }
});
```

<details>
<summary>Examples</summary>

```js
const handler = data => console.log(data);
const hub = createEventHub();
let increment = 0;

// Subscribe: listen for different types of events
hub.on('message', handler);
hub.on('message', () => console.log('Message event fired'));
hub.on('increment', () => increment++);

// Publish: emit events to invoke all handlers subscribed to them, passing the data to them as an argument
hub.emit('message', 'hello world'); // logs 'hello world' and 'Message event fired'
hub.emit('message', { hello: 'world' }); // logs the object and 'Message event fired'
hub.emit('increment'); // `increment` variable is now 1

// Unsubscribe: stop a specific handler from listening to the 'message' event
hub.off('message', handler);
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
detectDeviceType(); // "Mobile" or "Desktop"
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
elementIsVisibleInViewport(el); // false - (not fully visible)
elementIsVisibleInViewport(el, true); // true - (partially visible)
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


### hashBrowser ![advanced](/advanced.svg)

Creates a hash for a value using the [SHA-256](https://en.wikipedia.org/wiki/SHA-2) algorithm. Returns a promise.

Use the [SubtleCrypto](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto) API to create a hash for the given value.

```js
const hashBrowser = val =>
  crypto.subtle.digest('SHA-256', new TextEncoder('utf-8').encode(val)).then(h => {
    let hexes = [],
      view = new DataView(h);
    for (let i = 0; i < view.byteLength; i += 4)
      hexes.push(('00000000' + view.getUint32(i).toString(16)).slice(-8));
    return hexes.join('');
  });
```

<details>
<summary>Examples</summary>

```js
hashBrowser(JSON.stringify({ a: 'a', b: [1, 2, 3, 4], foo: { c: 'bar' } })).then(console.log); // '04aa106279f5977f59f9067fa9712afc4aedc6f5862a8defc34552d8c7206393'
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
hide(...document.querySelectorAll('img')); // Hides all <img> elements on the page
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### httpsRedirect

Redirects the page to HTTPS if its currently in HTTP. Also, pressing the back button doesn't take it back to the HTTP page as its replaced in the history.

Use `location.protocol` to get the protocol currently being used. If it's not HTTPS, use `location.replace()` to replace the existing page with the HTTPS version of the page. Use `location.href` to get the full address, split it with `String.split()` and remove the protocol part of the URL.

```js
const httpsRedirect = () => {
  if (location.protocol !== 'https:') location.replace('https://' + location.href.split('//')[1]);
};
```

<details>
<summary>Examples</summary>

```js
httpsRedirect(); // If you are on http://mydomain.com, you are redirected to https://mydomain.com
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### observeMutations ![advanced](/advanced.svg)

Returns a new MutationObserver and runs the provided callback for each mutation on the specified element.

Use a [`MutationObserver`](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) to observe mutations on the given element.
Use `Array.forEach()` to run the callback for each mutation that is observed.
Omit the third argument, `options`, to use the default [options](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver#MutationObserverInit) (all `true`).

```js
const observeMutations = (element, callback, options) => {
  const observer = new MutationObserver(mutations => mutations.forEach(m => callback(m)));
  observer.observe(
    element,
    Object.assign(
      {
        childList: true,
        attributes: true,
        attributeOldValue: true,
        characterData: true,
        characterDataOldValue: true,
        subtree: true
      },
      options
    )
  );
  return observer;
};
```

<details>
<summary>Examples</summary>

```js
const obs = observeMutations(document, console.log); // Logs all mutations that happen on the page
obs.disconnect(); // Disconnects the observer and stops logging mutations on the page
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### off

Removes an event listener from an element.

Use `EventTarget.removeEventListener()` to remove an event listener from an element.
Omit the fourth argument `opts` to use `false` or specify it based on the options used when the event listener was added.

```js
const off = (el, evt, fn, opts = false) => el.removeEventListener(evt, fn, opts);
```

<details>
<summary>Examples</summary>

```js
const fn = () => console.log('!');
document.body.addEventListener('click', fn);
off(document.body, 'click', fn); // no longer logs '!' upon clicking on the page
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### on

Adds an event listener to an element with the ability to use event delegation.

Use `EventTarget.addEventListener()` to add an event listener to an element. If there is a `target` property supplied to the options object, ensure the event target matches the target specified and then invoke the callback by supplying the correct `this` context.
Returns a reference to the custom delegator function, in order to be possible to use with [`off`](#off).
Omit `opts` to default to non-delegation behavior and event bubbling.

```js
const on = (el, evt, fn, opts = {}) => {
  const delegatorFn = e => e.target.matches(opts.target) && fn.call(e.target, e);
  el.addEventListener(evt, opts.target ? delegatorFn : fn, opts.options || false);
  if (opts.target) return delegatorFn;
};
```

<details>
<summary>Examples</summary>

```js
const fn = () => console.log('!');
on(document.body, 'click', fn); // logs '!' upon clicking the body
on(document.body, 'click', fn, { target: 'p' }); // logs '!' upon clicking a `p` element child of the body
on(document.body, 'click', fn, { options: true }); // use capturing instead of bubbling
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### onUserInputChange ![advanced](/advanced.svg)

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


### prefix

Returns the prefixed version (if necessary) of a CSS property that the browser supports.

Use `Array.findIndex()` on an array of vendor prefix strings to test if `document.body` has one of them defined in its `CSSStyleDeclaration` object, otherwise return `null`. 
Use `String.charAt()` and `String.toUpperCase()` to capitalize the property, which will be appended to the vendor prefix string.

```js
const prefix = prop => {
  const capitalizedProp = prop.charAt(0).toUpperCase() + prop.slice(1);
  const prefixes = ['', 'webkit', 'moz', 'ms', 'o'];
  const i = prefixes.findIndex(
    prefix => typeof document.body.style[prefix ? prefix + capitalizedProp : prop] !== 'undefined'
  );
  return i !== -1 ? (i === 0 ? prop : prefixes[i] + capitalizedProp) : null;
};
```

<details>
<summary>Examples</summary>

```js
prefix('appearance'); // 'appearance' on a supported browser, otherwise 'webkitAppearance', 'mozAppearance', 'msAppearance' or 'oAppearance'
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### recordAnimationFrames

Invokes the provided callback on each animation frame.

Use recursion. 
Provided that `running` is `true`, continue invoking `window.requestAnimationFrame()` which invokes the provided callback. 
Return an object with two methods `start` and `stop` to allow manual control of the recording. 
Omit the second argument, `autoStart`, to implicitly call `start` when the function is invoked.

```js
const recordAnimationFrames = (callback, autoStart = true) => {
  let running = true,
    raf;
  const stop = () => {
    running = false;
    cancelAnimationFrame(raf);
  };
  const start = () => {
    running = true;
    run();
  };
  const run = () => {
    raf = requestAnimationFrame(() => {
      callback();
      if (running) run();
    });
  };
  if (autoStart) start();
  return { start, stop };
};
```

<details>
<summary>Examples</summary>

```js
const cb = () => console.log('Animation frame fired');
const recorder = recordAnimationFrames(cb); // logs 'Animation frame fired' on each animation frame
recorder.stop(); // stops logging
recorder.start(); // starts again
const recorder2 = recordAnimationFrames(cb, false); // `start` needs to be explicitly called to begin recording frames
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


### runAsync ![advanced](/advanced.svg)

Runs a function in a separate thread by using a [Web Worker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers), allowing long running functions to not block the UI.

Create a new `Worker` using a `Blob` object URL, the contents of which should be the stringified version of the supplied function.
Immediately post the return value of calling the function back.
Return a promise, listening for `onmessage` and `onerror` events and resolving the data posted back from the worker, or throwing an error.

```js
const runAsync = fn => {
  const worker = new Worker(
    URL.createObjectURL(new Blob([`postMessage((${fn})());`]), {
      type: 'application/javascript; charset=utf-8'
    })
  );
  return new Promise((res, rej) => {
    worker.onmessage = ({ data }) => {
      res(data), worker.terminate();
    };
    worker.onerror = err => {
      rej(err), worker.terminate();
    };
  });
};
```

<details>
<summary>Examples</summary>

```js
const longRunningFunction = () => {
  let result = 0;
  for (let i = 0; i < 1000; i++) {
    for (let j = 0; j < 700; j++) {
      for (let k = 0; k < 300; k++) {
        result = result + i + j + k;
      }
    }
  }
  return result;
};
/*
  NOTE: Since the function is running in a different context, closures are not supported.
  The function supplied to `runAsync` gets stringified, so everything becomes literal.
  All variables and functions must be defined inside.
*/
runAsync(longRunningFunction).then(console.log); // 209685000000
runAsync(() => 10 ** 3).then(console.log); // 1000
let outsideVariable = 50;
runAsync(() => typeof outsideVariable).then(console.log); // 'undefined'
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

Use `element.style` to set the value of the CSS rule for the specified element to `val`.

```js
const setStyle = (el, ruleName, val) => (el.style[ruleName] = val);
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
show(...document.querySelectorAll('img')); // Shows all <img> elements on the page
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### smoothScroll

Smoothly scrolls the element on which it's called into the visible area of the browser window.

Use `.scrollIntoView` method to scroll the element. 
Pass `{ behavior: 'smooth' }` to `.scrollIntoView` so it scrolls smoothly.

```js
const smoothScroll = element =>
  document.querySelector(element).scrollIntoView({
    behavior: 'smooth'
  });
```

<details>
<summary>Examples</summary>

```js
smoothScroll('#fooBar'); // scrolls smoothly to the element with the id fooBar
smoothScroll('.fooBar'); // scrolls smoothly to the first element with a class of fooBar
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

### formatDuration

Returns the human readable format of the given number of milliseconds.

Divide `ms` with the appropriate values to obtain the appropriate values for `day`, `hour`, `minute`, `second` and `millisecond`.
Use `Object.entries()` with `Array.filter()` to keep only non-zero values.
Use `Array.map()` to create the string for each value, pluralizing appropriately.
Use `String.join(', ')` to combine the values into a string.

```js
const formatDuration = ms => {
  if (ms < 0) ms = -ms;
  const time = {
    day: Math.floor(ms / 86400000),
    hour: Math.floor(ms / 3600000) % 24,
    minute: Math.floor(ms / 60000) % 60,
    second: Math.floor(ms / 1000) % 60,
    millisecond: Math.floor(ms) % 1000
  };
  return Object.entries(time)
    .filter(val => val[1] !== 0)
    .map(val => val[1] + ' ' + (val[1] !== 1 ? val[0] + 's' : val[0]))
    .join(', ');
};
```

<details>
<summary>Examples</summary>

```js
formatDuration(1001); // '1 second, 1 millisecond'
formatDuration(34325055574); // '397 days, 6 hours, 44 minutes, 15 seconds, 574 milliseconds'
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### getColonTimeFromDate

Returns a string of the form `HH:MM:SS` from a `Date` object.

Use `Date.toString()` and `String.slice()` to get the `HH:MM:SS` part of a given `Date` object.

```js
const getColonTimeFromDate = date => date.toTimeString().slice(0, 8);
```

<details>
<summary>Examples</summary>

```js
getColonTimeFromDate(new Date()); // "08:38:00"
```

</details>

<br>[⬆ Back to top](#table-of-contents)


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


### getMeridiemSuffixOfInteger

Converts an integer to a suffixed string, adding `am` or `pm` based on its value.

Use the modulo operator (`%`) and conditional checks to transform an integer to a stringified 12-hour format with meridiem suffix.

```js
const getMeridiemSuffixOfInteger = num =>
  num === 0 || num === 24
    ? 12 + 'am'
    : num === 12 ? 12 + 'pm' : num < 12 ? num % 12 + 'am' : num % 12 + 'pm';
```

<details>
<summary>Examples</summary>

```js
getMeridiemSuffixOfInteger(0); // "12am"
getMeridiemSuffixOfInteger(11); // "11am"
getMeridiemSuffixOfInteger(13); // "1pm"
getMeridiemSuffixOfInteger(25); // "1pm"
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### tomorrow

Results in a string representation of tomorrow's date.
Use `new Date()` to get today's date, adding one day using `Date.getDate()` and `Date.setDate()`, and converting the Date object to a string.

```js
const tomorrow = (long = false) => {
  let t = new Date();
  t.setDate(t.getDate() + 1);
  const ret = `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, '0')}-${String(
    t.getDate()
  ).padStart(2, '0')}`;
  return !long ? ret : `${ret}T00:00:00`;
};
```

<details>
<summary>Examples</summary>

```js
tomorrow(); // 2017-12-27 (if current date is 2017-12-26)
tomorrow(true); // 2017-12-27T00:00:00 (if current date is 2017-12-26)
```

</details>

<br>[⬆ Back to top](#table-of-contents)

---
 ## 🎛️ Function

### attempt

Attempts to invoke a function with the provided arguments, returning either the result or the caught error object.

Use a `try... catch` block to return either the result of the function or an appropriate error.

```js
const attempt = (fn, ...args) => {
  try {
    return fn(...args);
  } catch (e) {
    return e instanceof Error ? e : new Error(e);
  }
};
```

<details>
<summary>Examples</summary>

```js
var elements = attempt(function(selector) {
  return document.querySelectorAll(selector);
}, '>_>');
if (elements instanceof Error) elements = []; // elements = []
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### bind

Creates a function that invokes `fn` with a given context, optionally adding any additional supplied parameters to the beginning of the arguments.

Return a `function` that uses `Function.apply()` to apply the given `context` to `fn`.
Use `Array.concat()` to prepend any additional supplied parameters to the arguments.

```js
const bind = (fn, context, ...args) =>
  function() {
    return fn.apply(context, args.concat(...arguments));
  };
```

<details>
<summary>Examples</summary>

```js
function greet(greeting, punctuation) {
  return greeting + ' ' + this.user + punctuation;
}
const freddy = { user: 'fred' };
const freddyBound = bind(greet, freddy);
console.log(freddyBound('hi', '!')); // 'hi fred!'
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### bindKey

Creates a function that invokes the method at a given key of an object, optionally adding any additional supplied parameters to the beginning of the arguments.

Return a `function` that uses `Function.apply()` to bind `context[fn]` to `context`.
Use `Array.concat()` to prepend any additional supplied parameters to the arguments.

```js
const bindKey = (context, fn, ...args) =>
  function() {
    return context[fn].apply(context, args.concat(...arguments));
  };
```

<details>
<summary>Examples</summary>

```js
const freddy = {
  user: 'fred',
  greet: function(greeting, punctuation) {
    return greeting + ' ' + this.user + punctuation;
  }
};
const freddyBound = bindKey(freddy, 'greet');
console.log(freddyBound('hi', '!')); // 'hi fred!'
```

</details>

<br>[⬆ Back to top](#table-of-contents)


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


### composeRight

Performs left-to-right function composition.

Use `Array.reduce()` to perform left-to-right function composition.
The first (leftmost) function can accept one or more arguments; the remaining functions must be unary.

```js
const composeRight = (...fns) => fns.reduce((f, g) => (...args) => g(f(...args)));
```

<details>
<summary>Examples</summary>

```js
const add = (x, y) => x + y;
const square = x => x * x;
const addAndSquare = composeRight(add, square);
addAndSquare(1, 2); // 9
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### converge

Accepts a converging function and a list of branching functions and returns a function that applies each branching function to the arguments and the results of the branching functions are passed as arguments to the converging function.

Use `Array.map()` and `Function.apply()` to apply each function to the given arguments.
Use the spread operator (`...`) to call `coverger` with the results of all other functions.

```js
const converge = (converger, fns) => (...args) => converger(...fns.map(fn => fn.apply(null, args)));
```

<details>
<summary>Examples</summary>

```js
const average = converge((a, b) => a / b, [
  arr => arr.reduce((a, v) => a + v, 0),
  arr => arr.length
]);
average([1, 2, 3, 4, 5, 6, 7]); // 4
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


### debounce

Creates a debounced function that delays invoking the provided function until at least `ms` milliseconds have elapsed since the last time it was invoked.

Each time the debounced function is invoked, clear the current pending timeout with `clearTimeout()` and use `setTimeout()` to create a new timeout that delays invoking the function until at least `ms` milliseconds has elapsed. Use `Function.apply()` to apply the `this` context to the function and provide the necessary arguments.
Omit the second argument, `ms`, to set the timeout at a default of 0 ms.

```js
const debounce = (fn, ms = 0) => {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};
```

<details>
<summary>Examples</summary>

```js
window.addEventListener(
  'resize',
  debounce(() => {
    console.log(window.innerWidth);
    console.log(window.innerHeight);
  }, 250)
); // Will log the window dimensions at most every 250ms
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### defer

Defers invoking a function until the current call stack has cleared.

Use `setTimeout()` with a timeout of 1ms to add a new event to the browser event queue and allow the rendering engine to complete its work. Use the spread (`...`) operator to supply the function with an arbitrary number of arguments.

```js
const defer = (fn, ...args) => setTimeout(fn, 1, ...args);
```

<details>
<summary>Examples</summary>

```js
// Example A:
defer(console.log, 'a'), console.log('b'); // logs 'b' then 'a'

// Example B:
document.querySelector('#someElement').innerHTML = 'Hello';
longRunningFunction(); //Browser will not update the HTML until this has finished
defer(longRunningFunction); // Browser will update the HTML then run the function
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### delay

Invokes the provided function after `wait` milliseconds.

Use `setTimeout()` to delay execution of `fn`.
Use the spread (`...`) operator to supply the function with an arbitrary number of arguments.

```js
const delay = (fn, wait, ...args) => setTimeout(fn, wait, ...args);
```

<details>
<summary>Examples</summary>

```js
delay(
  function(text) {
    console.log(text);
  },
  1000,
  'later'
); // Logs 'later' after one second.
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

Create an empty cache by instantiating a new `Map` object.
Return a function which takes a single argument to be supplied to the memoized function by first checking if the function's output for that specific input value is already cached, or store and return it if not. The `function` keyword must be used in order to allow the memoized function to have its `this` context changed if necessary.
Allow access to the `cache` by setting it as a property on the returned function.

```js
const memoize = fn => {
  const cache = new Map();
  const cached = function(val) {
    return cache.has(val) ? cache.get(val) : cache.set(val, fn.call(this, val)) && cache.get(val);
  };
  cached.cache = cache;
  return cached;
};
```

<details>
<summary>Examples</summary>

```js
// See the `anagrams` snippet.
const anagramsCached = memoize(anagrams);
anagramsCached('javascript'); // takes a long time
anagramsCached('javascript'); // returns virtually instantly since it's now cached
console.log(anagramsCached.cache); // The cached anagrams map
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### negate

Negates a predicate function.

Take a predicate function and apply the not operator (`!`) to it with its arguments.

```js
const negate = func => (...args) => !func(...args);
```

<details>
<summary>Examples</summary>

```js
[1, 2, 3, 4, 5, 6].filter(negate(n => n % 2 === 0)); // [ 1, 3, 5 ]
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### once

Ensures a function is called only once.

Utilizing a closure, use a flag, `called`, and set it to `true` once the function is called for the first time, preventing it from being called again. In order to allow the function to have its `this` context changed (such as in an event listener), the `function` keyword must be used, and the supplied function must have the context applied.
Allow the function to be supplied with an arbitrary number of arguments using the rest/spread (`...`) operator.

```js
const once = fn => {
  let called = false;
  return function(...args) {
    if (called) return;
    called = true;
    return fn.apply(this, args);
  };
};
```

<details>
<summary>Examples</summary>

```js
const startApp = function(event) {
  console.log(this, event); // document.body, MouseEvent
};
document.body.addEventListener('click', once(startApp)); // only runs `startApp` once upon click
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### partial

Creates a function that invokes `fn` with `partials` prepended to the arguments it receives.

Use the spread operator (`...`) to prepend `partials` to the list of arguments of `fn`.

```js
const partial = (fn, ...partials) => (...args) => fn(...partials, ...args);
```

<details>
<summary>Examples</summary>

```js
const greet = (greeting, name) => greeting + ' ' + name + '!';
const greetHello = partial(greet, 'Hello');
greetHello('John'); // 'Hello John!'
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### partialRight

Creates a function that invokes `fn` with `partials` appended to the arguments it receives.

Use the spread operator (`...`) to append `partials` to the list of arguments of `fn`.

```js
const partialRight = (fn, ...partials) => (...args) => fn(...args, ...partials);
```

<details>
<summary>Examples</summary>

```js
const greet = (greeting, name) => greeting + ' ' + name + '!';
const greetJohn = partialRight(greet, 'John');
greetJohn('Hello'); // 'Hello John!'
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
runPromisesInSeries([() => delay(1000), () => delay(2000)]); // Executes each promise sequentially, taking a total of 3 seconds to complete
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


### throttle

Creates a throttled function that only invokes the provided function at most once per every `wait` milliseconds

Use `setTimeout()` and `clearTimeout()` to throttle the given method, `fn`.
Use `Function.apply()` to apply the `this` context to the function and provide the necessary `arguments`.
Use `Date.now()` to keep track of the last time the throttled function was invoked.
Omit the second argument, `wait`, to set the timeout at a default of 0 ms.

```js
const throttle = (fn, wait) => {
  let inThrottle, lastFn, lastTime;
  return function() {
    const context = this,
      args = arguments;
    if (!inThrottle) {
      fn.apply(context, args);
      lastTime = Date.now();
      inThrottle = true;
    } else {
      clearTimeout(lastFn);
      lastFn = setTimeout(function() {
        if (Date.now() - lastTime >= wait) {
          fn.apply(context, args);
          lastTime = Date.now();
        }
      }, wait - (Date.now() - lastTime));
    }
  };
};
```

<details>
<summary>Examples</summary>

```js
window.addEventListener(
  'resize',
  throttle(function(evt) {
    console.log(window.innerWidth);
    console.log(window.innerHeight);
  }, 250)
); // Will log the window dimensions at most every 250ms
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### times

Iterates over a callback `n` times

Use `Function.call()` to call `fn` `n` times or until it returns `false`.
Omit the last argument, `context`, to use an `undefined` object (or the global object in non-strict mode).

```js
const times = (n, fn, context = undefined) => {
  let i = 0;
  while (fn.call(context, i) !== false && ++i < n) {}
};
```

<details>
<summary>Examples</summary>

```js
var output = '';
times(5, i => (output += i));
console.log(output); // 01234
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### uncurry

Uncurries a function up to depth `n`.

Return a variadic function.
Use `Array.reduce()` on the provided arguments to call each subsequent curry level of the function.
If the `length` of the provided arguments is less than `n` throw an error.
Otherwise, call `fn` with the proper amount of arguments, using `Array.slice(0, n)`.
Omit the second argument, `n`, to uncurry up to depth `1`.

```js
const uncurry = (fn, n = 1) => (...args) => {
  const next = acc => args => args.reduce((x, y) => x(y), acc);
  if (n > args.length) throw new RangeError('Arguments too few!');
  return next(fn)(args.slice(0, n));
};
```

<details>
<summary>Examples</summary>

```js
const add = x => y => z => x + y + z;
const uncurriedAdd = uncurry(add, 3);
uncurriedAdd(1, 2, 3); // 6
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### unfold

Builds an array, using an iterator function and an initial seed value.

Use a `while` loop and `Array.push()` to call the function repeatedly until it returns `false`.
The iterator function accepts one argument (`seed`) and must always return an array with two elements ([`value`, `nextSeed`]) or `false` to terminate.

```js
const unfold = (fn, seed) => {
  let result = [],
    val = [null, seed];
  while ((val = fn(val[1]))) result.push(val[0]);
  return result;
};
```

<details>
<summary>Examples</summary>

```js
var f = n => (n > 50 ? false : [-n, n + 10]);
unfold(f, 10); // [-10, -20, -30, -40, -50]
```

</details>

<br>[⬆ Back to top](#table-of-contents)

---
 ## ➗ Math

### approximatelyEqual

Checks if two numbers are approximately equal to each other.

Use `Math.abs()` to compare the absolute difference of the two values to `epsilon`.
Omit the third parameter, `epsilon`, to use a default value of `0.001`.

```js
const approximatelyEqual = (v1, v2, epsilon = 0.001) => Math.abs(v1 - v2) < epsilon;
```

<details>
<summary>Examples</summary>

```js
approximatelyEqual(Math.PI / 2.0, 1.5708); // true
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### average

Returns the average of two or more numbers.

Use `Array.reduce()` to add each value to an accumulator, initialized with a value of `0`, divide by the `length` of the array.

```js
const average = (...nums) => [...nums].reduce((acc, val) => acc + val, 0) / nums.length;
```

<details>
<summary>Examples</summary>

```js
average(...[1, 2, 3]); // 2
average(1, 2, 3); // 2
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### averageBy

Returns the average of an array, after mapping each element to a value using the provided function.

Use `Array.map()` to map each element to the value returned by `fn`, `Array.reduce()` to add each value to an accumulator, initialized with a value of `0`, divide by the `length` of the array.

```js
const averageBy = (arr, fn) =>
  arr.map(typeof fn === 'function' ? fn : val => val[fn]).reduce((acc, val) => acc + val, 0) /
  arr.length;
```

<details>
<summary>Examples</summary>

```js
averageBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], o => o.n); // 5
averageBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], 'n'); // 5
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### binomialCoefficient

Evaluates the binomial coefficient of two integers `n` and `k`.

Use `Number.isNaN()` to check if any of the two values is `NaN`.
Check if `k` is less than `0`, greater than or equal to `n`, equal to `1` or `n - 1` and return the appropriate result.
Check if `n - k` is less than `k` and switch their values accordingly.
Loop from `2` through `k` and calculate the binomial coefficient.
Use `Math.round()` to account for rounding errors in the calculation.

```js
const binomialCoefficient = (n, k) => {
  if (Number.isNaN(n) || Number.isNaN(k)) return NaN;
  if (k < 0 || k > n) return 0;
  if (k === 0 || k === n) return 1;
  if (k === 1 || k === n - 1) return n;
  if (n - k < k) k = n - k;
  let res = n;
  for (let j = 2; j <= k; j++) res *= (n - j + 1) / j;
  return Math.round(res);
};
```

<details>
<summary>Examples</summary>

```js
binomialCoefficient(8, 2); // 28
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
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### degreesToRads

Converts an angle from degrees to radians.

Use `Math.PI` and the degree to radian formula to convert the angle from degrees to radians.

```js
const degreesToRads = deg => deg * Math.PI / 180.0;
```

<details>
<summary>Examples</summary>

```js
degreesToRads(90.0); // ~1.5708
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### digitize

Converts a number to an array of digits.

Convert the number to a string, using the spread operator (`...`) to build an array.
Use `Array.map()` and `parseInt()` to transform each value to an integer.

```js
const digitize = n => [...`${n}`].map(i => parseInt(i));
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


### elo ![advanced](/advanced.svg)

Computes the new ratings between two or more opponents using the [Elo rating system](https://en.wikipedia.org/wiki/Elo_rating_system). It takes an array
of pre-ratings and returns an array containing post-ratings.
The array should be ordered from best performer to worst performer (winner -> loser).

Use the exponent `**` operator and math operators to compute the expected score (chance of winning).
of each opponent and compute the new rating for each.
Loop through the ratings, using each permutation to compute the post-Elo rating for each player in a pairwise fashion.
Omit the second argument to use the default `kFactor` of 32.

```js
const elo = ([...ratings], kFactor = 32, selfRating) => {
  const [a, b] = ratings;
  const expectedScore = (self, opponent) => 1 / (1 + 10 ** ((opponent - self) / 400));
  const newRating = (rating, i) =>
    (selfRating || rating) + kFactor * (i - expectedScore(i ? a : b, i ? b : a));
  if (ratings.length === 2) {
    return [newRating(a, 1), newRating(b, 0)];
  } else {
    for (let i = 0; i < ratings.length; i++) {
      let j = i;
      while (j < ratings.length - 1) {
        [ratings[i], ratings[j + 1]] = elo([ratings[i], ratings[j + 1]], kFactor);
        j++;
      }
    }
  }
  return ratings;
};
```

<details>
<summary>Examples</summary>

```js
// Standard 1v1s
elo([1200, 1200]); // [1216, 1184]
elo([1200, 1200], 64); // [1232, 1168]
// 4 player FFA, all same rank
elo([1200, 1200, 1200, 1200]).map(Math.round); // [1246, 1215, 1185, 1154]
/*
For teams, each rating can adjusted based on own team's average rating vs.
average rating of opposing team, with the score being added to their
own individual rating by supplying it as the third argument.
*/
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


### gcd

Calculates the greatest common divisor between two or more numbers/arrays.

The inner `_gcd` function uses recursion.
Base case is when `y` equals `0`. In this case, return `x`.
Otherwise, return the GCD of `y` and the remainder of the division `x/y`.

```js
const gcd = (...arr) => {
  const _gcd = (x, y) => (!y ? x : gcd(y, x % y));
  return [...arr].reduce((a, b) => _gcd(a, b));
};
```

<details>
<summary>Examples</summary>

```js
gcd(8, 36); // 4
gcd(...[12, 8, 32]); // 4
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### geometricProgression

Initializes an array containing the numbers in the specified range where `start` and `end` are inclusive and the ratio between two terms is `step`.
Returns an error if `step` equals `1`.

Use `Array.from()`, `Math.log()` and `Math.floor()` to create an array of the desired length, `Array.map()` to fill with the desired values in a range.
Omit the second argument, `start`, to use a default value of `1`.
Omit the third argument, `step`, to use a default value of `2`.

```js
const geometricProgression = (end, start = 1, step = 2) =>
  Array.from({ length: Math.floor(Math.log(end / start) / Math.log(step)) + 1 }).map(
    (v, i) => start * step ** i
  );
```

<details>
<summary>Examples</summary>

```js
geometricProgression(256); // [1, 2, 4, 8, 16, 32, 64, 128, 256]
geometricProgression(256, 3); // [3, 6, 12, 24, 48, 96, 192]
geometricProgression(256, 1, 4); // [1, 4, 16, 64, 256]
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
  for (var i = 2; i <= boundary; i++) if (num % i === 0) return false;
  return num >= 2;
};
```

<details>
<summary>Examples</summary>

```js
isPrime(11); // true
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### lcm

Returns the least common multiple of two or more numbers.

Use the greatest common divisor (GCD) formula and the fact that `lcm(x,y) = x * y / gcd(x,y)` to determine the least common multiple.
The GCD formula uses recursion.

```js
const lcm = (...arr) => {
  const gcd = (x, y) => (!y ? x : gcd(y, x % y));
  const _lcm = (x, y) => x * y / gcd(x, y);
  return [...arr].reduce((a, b) => _lcm(a, b));
};
```

<details>
<summary>Examples</summary>

```js
lcm(12, 7); // 84
lcm(...[1, 3, 4, 5]); // 60
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### luhnCheck

Implementation of the [Luhn Algorithm](https://en.wikipedia.org/wiki/Luhn_algorithm) used to validate a variety of identification numbers, such as credit card numbers, IMEI numbers, National Provider Identifier numbers etc.

Use `String.split('')`, `Array.reverse()` and `Array.map()` in combination with `parseInt()` to obtain an array of digits.
Use `Array.splice(0,1)` to obtain the last digit.
Use `Array.reduce()` to implement the Luhn Algorithm.
Return `true` if `sum` is divisible by `10`, `false` otherwise.


```js
const luhnCheck = num => {
  let arr = (num + '')
    .split('')
    .reverse()
    .map(x => parseInt(x));
  let lastDigit = arr.splice(0, 1)[0];
  let sum = arr.reduce((acc, val, i) => (i % 2 !== 0 ? acc + val : acc + (val * 2) % 9 || 9), 0);
  sum += lastDigit;
  return sum % 10 === 0;
};
```

<details>
<summary>Examples</summary>

```js
luhnCheck('4485275742308327'); // true
luhnCheck(6011329933655299); //  false
luhnCheck(123456789); // false
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### maxBy

Returns the maximum value of an array, after mapping each element to a value using the provided function.

Use `Array.map()` to map each element to the value returned by `fn`, `Math.max()` to get the maximum value.

```js
const maxBy = (arr, fn) => Math.max(...arr.map(typeof fn === 'function' ? fn : val => val[fn]));
```

<details>
<summary>Examples</summary>

```js
maxBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], o => o.n); // 8
maxBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], 'n'); // 8
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
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### minBy

Returns the minimum value of an array, after mapping each element to a value using the provided function.

Use `Array.map()` to map each element to the value returned by `fn`, `Math.min()` to get the maximum value.

```js
const minBy = (arr, fn) => Math.min(...arr.map(typeof fn === 'function' ? fn : val => val[fn]));
```

<details>
<summary>Examples</summary>

```js
minBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], o => o.n); // 2
minBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], 'n'); // 2
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
  numsTillSqroot.forEach(x => (arr = arr.filter(y => y % x !== 0 || y === x)));
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


### radsToDegrees

Converts an angle from radians to degrees.

Use `Math.PI` and the radian to degree formula to convert the angle from radians to degrees.

```js
const radsToDegrees = rad => rad * 180.0 / Math.PI;
```

<details>
<summary>Examples</summary>

```js
radsToDegrees(Math.PI / 2); // 90
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### randomIntArrayInRange

Returns an array of n random integers in the specified range.

Use `Array.from()` to create an empty array of the specific length, `Math.random()` to generate a random number and map it to the desired range, using `Math.floor()` to make it an integer.

```js
const randomIntArrayInRange = (min, max, n = 1) =>
  Array.from({ length: n }, () => Math.floor(Math.random() * (max - min + 1)) + min);
```

<details>
<summary>Examples</summary>

```js
randomIntArrayInRange(12, 35, 10); // [ 34, 14, 27, 17, 30, 27, 20, 26, 21, 14 ]
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


### sdbm

Hashes the input string into a whole number.

Use `String.split('')` and `Array.reduce()` to create a hash of the input string, utilizing bit shifting.

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
sdbm('name'); // -3521204949
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

Returns the sum of two or more numbers/arrays.

Use `Array.reduce()` to add each value to an accumulator, initialized with a value of `0`.

```js
const sum = (...arr) => [...arr].reduce((acc, val) => acc + val, 0);
```

<details>
<summary>Examples</summary>

```js
sum(...[1, 2, 3, 4]); // 10
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### sumBy

Returns the sum of an array, after mapping each element to a value using the provided function.

Use `Array.map()` to map each element to the value returned by `fn`, `Array.reduce()` to add each value to an accumulator, initialized with a value of `0`.

```js
const sumBy = (arr, fn) =>
  arr.map(typeof fn === 'function' ? fn : val => val[fn]).reduce((acc, val) => acc + val, 0);
```

<details>
<summary>Examples</summary>

```js
sumBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], o => o.n); // 20
sumBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], 'n'); // 20
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


### toSafeInteger

Converts a value to a safe integer.

Use `Math.max()` and `Math.min()` to find the closest safe value.
Use `Math.round()` to convert to an integer.

```js
const toSafeInteger = num =>
  Math.round(Math.max(Math.min(num, Number.MAX_SAFE_INTEGER), Number.MIN_SAFE_INTEGER));
```

<details>
<summary>Examples</summary>

```js
toSafeInteger('3.2'); // 3
toSafeInteger(Infinity); // 9007199254740991
```

</details>

<br>[⬆ Back to top](#table-of-contents)

---
 ## 📦 Node

### atob

Decodes a string of data which has been encoded using base-64 encoding.

Create a `Buffer` for the given string with base-64 encoding and use `Buffer.toString('binary')` to return the decoded string.

```js
const atob = str => new Buffer(str, 'base64').toString('binary');
```

<details>
<summary>Examples</summary>

```js
atob('Zm9vYmFy'); // 'foobar'
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### btoa

Creates a base-64 encoded ASCII string from a String object in which each character in the string is treated as a byte of binary data.

Create a `Buffer` for the given string with binary encoding and use `Buffer.toString('base64')` to return the encoded string.

```js
const btoa = str => new Buffer(str, 'binary').toString('base64');
```

<details>
<summary>Examples</summary>

```js
btoa('foobar'); // 'Zm9vYmFy'
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### colorize

Add special characters to text to print in color in the console (combined with `console.log()`).

Use template literals and special characters to add the appropriate color code to the string output.
For background colors, add a special character that resets the background color at the end of the string.

```js
const colorize = (...args) => ({
  black: `\x1b[30m${args.join(' ')}`,
  red: `\x1b[31m${args.join(' ')}`,
  green: `\x1b[32m${args.join(' ')}`,
  yellow: `\x1b[33m${args.join(' ')}`,
  blue: `\x1b[34m${args.join(' ')}`,
  magenta: `\x1b[35m${args.join(' ')}`,
  cyan: `\x1b[36m${args.join(' ')}`,
  white: `\x1b[37m${args.join(' ')}`,
  bgBlack: `\x1b[40m${args.join(' ')}\x1b[0m`,
  bgRed: `\x1b[41m${args.join(' ')}\x1b[0m`,
  bgGreen: `\x1b[42m${args.join(' ')}\x1b[0m`,
  bgYellow: `\x1b[43m${args.join(' ')}\x1b[0m`,
  bgBlue: `\x1b[44m${args.join(' ')}\x1b[0m`,
  bgMagenta: `\x1b[45m${args.join(' ')}\x1b[0m`,
  bgCyan: `\x1b[46m${args.join(' ')}\x1b[0m`,
  bgWhite: `\x1b[47m${args.join(' ')}\x1b[0m`
});
```

<details>
<summary>Examples</summary>

```js
console.log(colorize('foo').red); // 'foo' (red letters)
console.log(colorize('foo', 'bar').bgBlue); // 'foo bar' (blue background)
console.log(colorize(colorize('foo').yellow, colorize('foo').green).bgWhite); // 'foo bar' (first word in yellow letters, second word in green letters, white background for both)
```

</details>

<br>[⬆ Back to top](#table-of-contents)


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
hasFlags('--test', 'cool=true', '-s'); // true
hasFlags('special'); // false
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### hashNode

Creates a hash for a value using the [SHA-256](https://en.wikipedia.org/wiki/SHA-2) algorithm. Returns a promise.

Use `crypto` API to create a hash for the given value.

```js
const crypto = require('crypto');
const hashNode = val =>
  new Promise(resolve =>
    setTimeout(
      () =>
        resolve(
          crypto
            .createHash('sha256')
            .update(val)
            .digest('hex')
        ),
      0
    )
  );
```

<details>
<summary>Examples</summary>

```js
hashNode(JSON.stringify({ a: 'a', b: [1, 2, 3, 4], foo: { c: 'bar' } })).then(console.log); // '04aa106279f5977f59f9067fa9712afc4aedc6f5862a8defc34552d8c7206393'
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

### bindAll

Binds methods of an object to the object itself, overwriting the existing method.

Use `Array.forEach()` to return a `function` that uses `Function.apply()` to apply the given context (`obj`) to `fn` for each function specified.

```js
const bindAll = (obj, ...fns) =>
  fns.forEach(
    fn => (
      (f = obj[fn]),
      (obj[fn] = function() {
        return f.apply(obj);
      })
    )
  );
```

<details>
<summary>Examples</summary>

```js
var view = {
  label: 'docs',
  click: function() {
    console.log('clicked ' + this.label);
  }
};
bindAll(view, 'click');
jQuery(element).on('click', view.click); // Logs 'clicked docs' when clicked.
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### deepClone

Creates a deep clone of an object.

Use recursion.
Use `Object.assign()` and an empty object (`{}`) to create a shallow clone of the original.
Use `Object.keys()` and `Array.forEach()` to determine which key-value pairs need to be deep cloned.

```js
const deepClone = obj => {
  let clone = Object.assign({}, obj);
  Object.keys(clone).forEach(
    key => (clone[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key])
  );
  return clone;
};
```

<details>
<summary>Examples</summary>

```js
const a = { foo: 'bar', obj: { a: 1, b: 2 } };
const b = deepClone(a); // a !== b, a.obj !== b.obj
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### defaults

Assigns default values for all properties in an object that are `undefined`.

Use `Object.assign()` to create a new empty object and copy the original one to maintain key order, use `Array.reverse()` and the spread operator `...` to combine the default values from left to right, finally use `obj` again to overwrite properties that originally had a value.

```js
const defaults = (obj, ...defs) => Object.assign({}, obj, ...defs.reverse(), obj);
```

<details>
<summary>Examples</summary>

```js
defaults({ a: 1 }, { b: 2 }, { b: 6 }, { a: 3 }); // { a: 1, b: 2 }
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### equals ![advanced](/advanced.svg)

Performs a deep comparison between two values to determine if they are equivalent.

Check if the two values are identical, if they are both `Date` objects with the same time, using `Date.getTime()` or if they are both non-object values with an equivalent value (strict comparison).
Check if only one value is `null` or `undefined` or if their prototypes differ.
If none of the above conditions are met, use `Object.keys()` to check if both values have the same number of keys, then use `Array.every()` to check if every key in the first value exists in the second one and if they are equivalent by calling this method recursively.

```js
const equals = (a, b) => {
  if (a === b) return true;
  if (a instanceof Date && b instanceof Date) return a.getTime() === b.getTime();
  if (!a || !b || (typeof a != 'object' && typeof b !== 'object')) return a === b;
  if (a === null || a === undefined || b === null || b === undefined) return false;
  if (a.prototype !== b.prototype) return false;
  let keys = Object.keys(a);
  if (keys.length !== Object.keys(b).length) return false;
  return keys.every(k => equals(a[k], b[k]));
};
```

<details>
<summary>Examples</summary>

```js
equals({ a: [2, { e: 3 }], b: [4], c: 'foo' }, { a: [2, { e: 3 }], b: [4], c: 'foo' }); // true
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### findKey

Returns the first key that satisfies the provided testing function. Otherwise `undefined` is returned.

Use `Object.keys(obj)` to get all the properties of the object, `Array.find()` to test the provided function for each key-value pair. The callback receives three arguments - the value, the key and the object.

```js
const findKey = (obj, fn) => Object.keys(obj).find(key => fn(obj[key], key, obj));
```

<details>
<summary>Examples</summary>

```js
findKey(
  {
    barney: { age: 36, active: true },
    fred: { age: 40, active: false },
    pebbles: { age: 1, active: true }
  },
  o => o['active']
); // 'barney'
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### findLastKey

Returns the last key that satisfies the provided testing function. Otherwise `undefined` is returned.

Use `Object.keys(obj)` to get all the properties of the object, `Array.reverse()` to reverse their order and `Array.find()` to test the provided function for each key-value pair. The callback receives three arguments - the value, the key and the object.

```js
const findLastKey = (obj, fn) =>
  Object.keys(obj)
    .reverse()
    .find(key => fn(obj[key], key, obj));
```

<details>
<summary>Examples</summary>

```js
findLastKey(
  {
    barney: { age: 36, active: true },
    fred: { age: 40, active: false },
    pebbles: { age: 1, active: true }
  },
  o => o['active']
); // 'pebbles'
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### flattenObject

Flatten an object with the paths for keys.

Use recursion.
Use `Object.keys(obj)` combined with `Array.reduce()` to convert every leaf node to a flattened path node.
If the value of a key is an object, the function calls itself with the appropriate `prefix` to create the path using `Object.assign()`.
Otherwise, it adds the appropriate prefixed key-value pair to the accumulator object.
You should always omit the second argument, `prefix`, unless you want every key to have a prefix.

```js
const flattenObject = (obj, prefix = '') =>
  Object.keys(obj).reduce((acc, k) => {
    const pre = prefix.length ? prefix + '.' : '';
    if (typeof obj[k] === 'object') Object.assign(acc, flattenObject(obj[k], pre + k));
    else acc[pre + k] = obj[k];
    return acc;
  }, {});
```

<details>
<summary>Examples</summary>

```js
flattenObject({ a: { b: { c: 1 } }, d: 1 }); // { 'a.b.c': 1, d: 1 }
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### forOwn

Iterates over all own properties of an object, running a callback for each one.

Use `Object.keys(obj)` to get all the properties of the object, `Array.forEach()` to run the provided function for each key-value pair. The callback receives three arguments - the value, the key and the object.

```js
const forOwn = (obj, fn) => Object.keys(obj).forEach(key => fn(obj[key], key, obj));
```

<details>
<summary>Examples</summary>

```js
forOwn({ foo: 'bar', a: 1 }, v => console.log(v)); // 'bar', 1
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### forOwnRight

Iterates over all own properties of an object in reverse, running a callback for each one.

Use `Object.keys(obj)` to get all the properties of the object, `Array.reverse()` to reverse their order and `Array.forEach()` to run the provided function for each key-value pair. The callback receives three arguments - the value, the key and the object.

```js
const forOwnRight = (obj, fn) =>
  Object.keys(obj)
    .reverse()
    .forEach(key => fn(obj[key], key, obj));
```

<details>
<summary>Examples</summary>

```js
forOwnRight({ foo: 'bar', a: 1 }, v => console.log(v)); // 1, 'bar'
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### functions

Returns an array of function property names from own (and optionally inherited) enumerable properties of an object.

Use `Object.keys(obj)` to iterate over the object's own properties.
If `inherited` is `true`, use `Object.get.PrototypeOf(obj)` to also get the object's inherited properties.
Use `Array.filter()` to keep only those properties that are functions.
Omit the second argument, `inherited`, to not include inherited properties by default.

```js
const functions = (obj, inherited = false) =>
  (inherited
    ? [...Object.keys(obj), ...Object.keys(Object.getPrototypeOf(obj))]
    : Object.keys(obj)
  ).filter(key => typeof obj[key] === 'function');
```

<details>
<summary>Examples</summary>

```js
function Foo() {
  this.a = () => 1;
  this.b = () => 2;
}
Foo.prototype.c = () => 3;
functions(new Foo()); // ['a', 'b']
functions(new Foo(), true); // ['a', 'b', 'c']
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### get

Retrieve a set of properties indicated by the given selectors from an object.

Use `Array.map()` for each selector, `String.replace()` to replace square brackets with dots, `String.split('.')` to split each selector, `Array.filter()` to remove empty values and `Array.reduce()` to get the value indicated by it.

```js
const get = (from, ...selectors) =>
  [...selectors].map(s =>
    s
      .replace(/\[([^\[\]]*)\]/g, '.$1.')
      .split('.')
      .filter(t => t !== '')
      .reduce((prev, cur) => prev && prev[cur], from)
  );
```

<details>
<summary>Examples</summary>

```js
const obj = { selector: { to: { val: 'val to select' } }, target: [1, 2, { a: 'test' }] };
get(obj, 'selector.to.val', 'target[0]', 'target[2].a'); // ['val to select', 1, 'test']
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### invertKeyValues

Inverts the key-value pairs of an object, without mutating it. The corresponding inverted value of each inverted key is an array of keys responsible for generating the inverted value. If a function is supplied, it is applied to each inverted key.

Use `Object.keys()` and `Array.reduce()` to invert the key-value pairs of an object and apply the function provided (if any).
Omit the second argument, `fn`, to get the inverted keys without applying a function to them.

```js
const invertKeyValues = (obj, fn) =>
  Object.keys(obj).reduce((acc, key) => {
    const val = fn ? fn(obj[key]) : obj[key];
    acc[val] = acc[val] || [];
    acc[val].push(key);
    return acc;
  }, {});
```

<details>
<summary>Examples</summary>

```js
invertKeyValues({ a: 1, b: 2, c: 1 }); // { 1: [ 'a', 'c' ], 2: [ 'b' ] }
invertKeyValues({ a: 1, b: 2, c: 1 }, value => 'group' + value); // { group1: [ 'a', 'c' ], group2: [ 'b' ] }
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


### mapKeys

Creates an object with keys generated by running the provided function for each key and the same values as the provided object.

Use `Object.keys(obj)` to iterate over the object's keys.
Use `Array.reduce()` to create a new object with the same values and mapped keys using `fn`.

```js
const mapKeys = (obj, fn) =>
  Object.keys(obj).reduce((acc, k) => {
    acc[fn(obj[k], k, obj)] = obj[k];
    return acc;
  }, {});
```

<details>
<summary>Examples</summary>

```js
mapKeys({ a: 1, b: 2 }, (val, key) => key + val); // { a1: 1, b2: 2 }
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### mapValues

Creates an object with the same keys as the provided object and values generated by running the provided function for each value.

Use `Object.keys(obj)` to iterate over the object's keys.
Use `Array.reduce()` to create a new object with the same keys and mapped values using `fn`.

```js
const mapValues = (obj, fn) =>
  Object.keys(obj).reduce((acc, k) => {
    acc[k] = fn(obj[k], k, obj);
    return acc;
  }, {});
```

<details>
<summary>Examples</summary>

```js
const users = {
  fred: { user: 'fred', age: 40 },
  pebbles: { user: 'pebbles', age: 1 }
};
mapValues(users, u => u.age); // { fred: 40, pebbles: 1 }
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### matches

Compares two objects to determine if the first one contains equivalent property values to the second one.

Use `Object.keys(source)` to get all the keys of the second object, then `Array.every()`, `Object.hasOwnProperty()` and strict comparison to determine if all keys exist in the first object and have the same values.

```js
const matches = (obj, source) =>
  Object.keys(source).every(key => obj.hasOwnProperty(key) && obj[key] === source[key]);
```

<details>
<summary>Examples</summary>

```js
matches({ age: 25, hair: 'long', beard: true }, { hair: 'long', beard: true }); // true
matches({ hair: 'long', beard: true }, { age: 25, hair: 'long', beard: true }); // false
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### matchesWith

Compares two objects to determine if the first one contains equivalent property values to the second one, based on a provided function.

Use `Object.keys(source)` to get all the keys of the second object, then `Array.every()`, `Object.hasOwnProperty()` and the provided function to determine if all keys exist in the first object and have equivalent values.
If no function is provided, the values will be compared using the equality operator.

```js
const matchesWith = (obj, source, fn) =>
  Object.keys(source).every(
    key =>
      obj.hasOwnProperty(key) && fn
        ? fn(obj[key], source[key], key, obj, source)
        : obj[key] == source[key]
  );
```

<details>
<summary>Examples</summary>

```js
const isGreeting = val => /^h(?:i|ello)$/.test(val);
matchesWith(
  { greeting: 'hello' },
  { greeting: 'hi' },
  (oV, sV) => isGreeting(oV) && isGreeting(sV)
); // true
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### merge

Creates a new object from the combination of two or more objects.

Use `Array.reduce()` combined with `Object.keys(obj)` to iterate over all objects and keys.
Use `hasOwnProperty()` and `Array.concat()` to append values for keys existing in multiple objects.

```js
const merge = (...objs) =>
  [...objs].reduce(
    (acc, obj) =>
      Object.keys(obj).reduce((a, k) => {
        acc[k] = acc.hasOwnProperty(k) ? [].concat(acc[k]).concat(obj[k]) : obj[k];
        return acc;
      }, {}),
    {}
  );
```

<details>
<summary>Examples</summary>

```js
const object = {
  a: [{ x: 2 }, { y: 4 }],
  b: 1
};
const other = {
  a: { z: 3 },
  b: [2, 3],
  c: 'foo'
};
merge(object, other); // { a: [ { x: 2 }, { y: 4 }, { z: 3 } ], b: [ 1, 2, 3 ], c: 'foo' }
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### nest

Given a flat array of objects linked to one another, it will nest them recursively.
Useful for nesting comments, such as the ones on reddit.com.

Use recursion. 
Use `Array.filter()` to filter the items where the `id` matches the `link`, then `Array.map()` to map each one to a new object that has a `children` property which recursively nests the items based on which ones are children of the current item. 
Omit the second argument, `id`, to default to `null` which indicates the object is not linked to another one (i.e. it is a top level object). 
Omit the third argument, `link`, to use `'parent_id'` as the default property which links the object to another one by its `id`.

```js
const nest = (items, id = null, link = 'parent_id') =>
  items
    .filter(item => item[link] === id)
    .map(item => ({ ...item, children: nest(items, item.id) }));
```

<details>
<summary>Examples</summary>

```js
// One top level comment
const comments = [
  { id: 1, parent_id: null },
  { id: 2, parent_id: 1 },
  { id: 3, parent_id: 1 },
  { id: 4, parent_id: 2 },
  { id: 5, parent_id: 4 }
];
const nestedComments = nest(comments); // [{ id: 1, parent_id: null, children: [...] }]
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
objectToPairs({ a: 1, b: 2 }); // [['a',1],['b',2]]
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### omit

Omits the key-value pairs corresponding to the given keys from an object.

Use `Object.keys(obj)`, `Array.filter()` and `Array.includes()` to remove the provided keys.
Use `Array.reduce()` to convert the filtered keys back to an object with the corresponding key-value pairs.

```js
const omit = (obj, arr) =>
  Object.keys(obj)
    .filter(k => !arr.includes(k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});
```

<details>
<summary>Examples</summary>

```js
omit({ a: 1, b: '2', c: 3 }, ['b']); // { 'a': 1, 'c': 3 }
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### omitBy

Creates an object composed of the properties the given function returns falsey for. The function is invoked with two arguments: (value, key).

Use `Object.keys(obj)` and `Array.filter()`to remove the keys for which `fn` returns a truthy value.
Use `Array.reduce()` to convert the filtered keys back to an object with the corresponding key-value pairs.

```js
const omitBy = (obj, fn) =>
  Object.keys(obj)
    .filter(k => !fn(obj[k], k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});
```

<details>
<summary>Examples</summary>

```js
omitBy({ a: 1, b: '2', c: 3 }, x => typeof x === 'number'); // { b: '2' }
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### orderBy

Returns a sorted array of objects ordered by properties and orders.

Uses `Array.sort()`, `Array.reduce()` on the `props` array with a default value of `0`, use array destructuring to swap the properties position depending on the order passed.
If no `orders` array is passed it sort by `'asc'` by default.

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
const users = [{ name: 'fred', age: 48 }, { name: 'barney', age: 36 }, { name: 'fred', age: 40 }];
orderBy(users, ['name', 'age'], ['asc', 'desc']); // [{name: 'barney', age: 36}, {name: 'fred', age: 48}, {name: 'fred', age: 40}]
orderBy(users, ['name', 'age']); // [{name: 'barney', age: 36}, {name: 'fred', age: 40}, {name: 'fred', age: 48}]
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### pick

Picks the key-value pairs corresponding to the given keys from an object.

Use `Array.reduce()` to convert the filtered/picked keys back to an object with the corresponding key-value pairs if the key exists in the object.

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


### pickBy

Creates an object composed of the properties the given function returns truthy for. The function is invoked with two arguments: (value, key).

Use `Object.keys(obj)` and `Array.filter()`to remove the keys for which `fn` returns a falsey value.
Use `Array.reduce()` to convert the filtered keys back to an object with the corresponding key-value pairs.

```js
const pickBy = (obj, fn) =>
  Object.keys(obj)
    .filter(k => fn(obj[k], k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});
```

<details>
<summary>Examples</summary>

```js
pickBy({ a: 1, b: '2', c: 3 }, x => typeof x === 'number'); // { 'a': 1, 'c': 3 }
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
const b = shallowClone(a); // a !== b
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### size

Get size of arrays, objects or strings.

Get type of `val` (`array`, `object` or `string`).
Use `length` property for arrays.
Use `length` or `size` value if available or number of keys for objects.
Use `size` of a [`Blob` object](https://developer.mozilla.org/en-US/docs/Web/API/Blob) created from `val` for strings.

Split strings into array of characters with `split('')` and return its length.

```js
const size = val =>
  Array.isArray(val)
    ? val.length
    : val && typeof val === 'object'
      ? val.size || val.length || Object.keys(val).length
      : typeof val === 'string' ? new Blob([val]).size : 0;
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


### transform

Applies a function against an accumulator and each key in the object (from left to right).

Use `Object.keys(obj)` to iterate over each key in the object, `Array.reduce()` to call the apply the specified function against the given accumulator.

```js
const transform = (obj, fn, acc) => Object.keys(obj).reduce((a, k) => fn(a, obj[k], k, obj), acc);
```

<details>
<summary>Examples</summary>

```js
transform(
  { a: 1, b: 2, c: 1 },
  (r, v, k) => {
    (r[v] || (r[v] = [])).push(k);
    return r;
  },
  {}
); // { '1': ['a', 'c'], '2': ['b'] }
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


### unflattenObject ![advanced](/advanced.svg)

Unlatten an object with the paths for keys.

Use `Object.keys(obj)` combined with `Array.reduce()` to convert flattened path node to a leaf node.
If the value of a key contains a dot delimiter (`.`), use `Array.split('.')`, string transformations and `JSON.parse()` to create an object, then `Object.assign()` to create the leaf node.
Otherwise, add the appropriate key-value pair to the accumulator object.

```js
const unflattenObject = obj =>
  Object.keys(obj).reduce((acc, k) => {
    if (k.indexOf('.') !== -1) {
      const keys = k.split('.');
      Object.assign(
        acc,
        JSON.parse(
          '{' +
            keys.map((v, i) => (i !== keys.length - 1 ? `"${v}":{` : `"${v}":`)).join('') +
            obj[k] +
            '}'.repeat(keys.length)
        )
      );
    } else acc[k] = obj[k];
    return acc;
  }, {});
```

<details>
<summary>Examples</summary>

```js
unflattenObject({ 'a.b.c': 1, d: 1 }); // { a: { b: { c: 1 } }, d: 1 }
```

</details>

<br>[⬆ Back to top](#table-of-contents)

---
 ## 📜 String

### byteSize

Returns the length of a string in bytes.

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

Use array destructuring and `String.toUpperCase()` to capitalize first letter, `...rest` to get array of characters after first letter and then `Array.join('')` to make it a string again.
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

Use `String.replace()` to match the first character of each word and `String.toUpperCase()` to capitalize it.

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


### decapitalize

Decapitalizes the first letter of a string.

Use array destructuring and `String.toLowerCase()` to decapitalize first letter, `...rest` to get array of characters after first letter and then `Array.join('')` to make it a string again.
Omit the `upperRest` parameter to keep the rest of the string intact, or set it to `true` to convert to uppercase.

```js
const decapitalize = ([first, ...rest], upperRest = false) =>
  first.toLowerCase() + (upperRest ? rest.join('').toUpperCase() : rest.join(''));
```

<details>
<summary>Examples</summary>

```js
decapitalize('FooBar'); // 'fooBar'
decapitalize('FooBar', true); // 'fOOBAR'
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### escapeHTML

Escapes a string for use in HTML.

Use `String.replace()` with a regexp that matches the characters that need to be escaped, using a callback function to replace each character instance with its associated escaped character using a dictionary (object).

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

Use `String.replace()` to escape special characters.

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

Use `String.replace()` to remove underscores, hyphens, and spaces and convert words to camelcase.
Omit the second argument to use a default `separator` of `_`.

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


### isAnagram

Checks if a string is an anagram of another string (case-insensitive, ignores spaces, punctuation and special characters).

Use `String.toLowerCase()`, `String.replace()` with an appropriate regular expression to remove unnecessary characters, `String.split('')`, `Array.sort()` and `Array.join('')` on both strings to normalize them, then check if their normalized forms are equal.

```js
const isAnagram = (str1, str2) => {
  const normalize = str =>
    str
      .toLowerCase()
      .replace(/[^a-z0-9]/gi, '')
      .split('')
      .sort()
      .join('');
  return normalize(str1) === normalize(str2);
};
```

<details>
<summary>Examples</summary>

```js
isAnagram('iceman', 'cinema'); // true
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### isLowerCase

Checks if a string is lower case.

Convert the given string to lower case, using `String.toLowerCase()` and compare it to the original.

```js
const isLowerCase = str => str === str.toLowerCase();
```

<details>
<summary>Examples</summary>

```js
isLowerCase('abc'); // true
isLowerCase('a3@$'); // true
isLowerCase('Ab4'); // false
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### isUpperCase

Checks if a string is upper case.

Convert the given string to upper case, using `String.toUpperCase()` and compare it to the original.


```js
const isUpperCase = str => str === str.toUpperCase();
```

<details>
<summary>Examples</summary>

```js
isUpperCase('ABC'); // true
isLowerCase('A3@$'); // true
isLowerCase('aB4'); // false
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### mask

Replaces all but the last `num` of characters with the specified mask character.

Use `String.slice()` to grab the portion of the characters that need to be masked and use `String.replace()` with a regexp to replace every character with the mask character.
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
mask(1234567890, -4, '$'); // '$$$$567890'
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### pad

Pads a string on both sides with the specified character, if it's shorter than the specified length.

Use `String.padStart()` and `String.padEnd()` to pad both sides of the given string.
Omit the third argument, `char`, to use the whitespace character as the default padding character.

```js
const pad = (str, length, char = ' ') =>
  str.padStart((str.length + length) / 2, char).padEnd(length, char);
```

<details>
<summary>Examples</summary>

```js
pad('cat', 8); // '  cat   '
pad(String(42), 6, '0'); // '004200'
pad('foobar', 3); // 'foobar'
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### palindrome

Returns `true` if the given string is a palindrome, `false` otherwise.

Convert string `String.toLowerCase()` and use `String.replace()` to remove non-alphanumeric characters from it.
Then, `String.split('')` into individual characters, `Array.reverse()`, `String.join('')` and compare to the original, unreversed string, after converting it `String.tolowerCase()`.

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


### pluralize

Returns the singular or plural form of the word based on the input number. If the first argument is an `object`, it will use a closure by returning a function that can auto-pluralize words that don't simply end in `s` if the supplied dictionary contains the word.

If `num` is either `-1` or `1`, return the singular form of the word. If `num` is any other number, return the plural form. Omit the third argument to use the default of the singular word + `s`, or supply a custom pluralized word when necessary. If the first argument is an `object`, utilize a closure by returning a function which can use the supplied dictionary to resolve the correct plural form of the word.

```js
const pluralize = (val, word, plural = word + 's') => {
  const _pluralize = (num, word, plural = word + 's') =>
    [1, -1].includes(Number(num)) ? word : plural;
  if (typeof val === 'object') return (num, word) => _pluralize(num, word, val[word]);
  return _pluralize(val, word, plural);
};
```

<details>
<summary>Examples</summary>

```js
pluralize(0, 'apple'); // 'apples'
pluralize(1, 'apple'); // 'apple'
pluralize(2, 'apple'); // 'apples'
pluralize(2, 'person', 'people'); // 'people'

const PLURALS = {
  person: 'people',
  radius: 'radii'
};
const autoPluralize = pluralize(PLURALS);
autoPluralize(2, 'person'); // 'people'
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### removeNonASCII

Removes non-printable ASCII characters.

Use a regular expression to remove non-printable ASCII characters.

```js
const removeNonASCII = str => str.replace(/[^\x20-\x7E]/g, '');
```

<details>
<summary>Examples</summary>

```js
removeNonASCII('äÄçÇéÉêlorem-ipsumöÖÐþúÚ'); // 'lorem-ipsum'
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### reverseString

Reverses a string.

Use the spread operator (`...`) and `Array.reverse()` to reverse the order of the characters in the string.
Combine characters to get a string using `String.join('')`.

```js
const reverseString = str => [...str].reverse().join('');
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

Use the spread operator (`...`), `Array.sort()` and  `String.localeCompare()` to sort the characters in `str`, recombine using `String.join('')`.

```js
const sortCharactersInString = str => [...str].sort((a, b) => a.localeCompare(b)).join('');
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
splitLines('This\nis a\nmultiline\nstring.\n'); // ['This', 'is a', 'multiline', 'string.' , '']
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### stringPermutations

⚠️ **WARNING**: This function's execution time increases exponentially with each character. Anything more than 8 to 10 characters will cause your browser to hang as it tries to solve all the different combinations.

Generates all permutations of a string (contains duplicates).

Use recursion.
For each letter in the given string, create all the partial permutations for the rest of its letters.
Use `Array.map()` to combine the letter with each partial permutation, then `Array.reduce()` to combine all permutations in one array.
Base cases are for string `length` equal to `2` or `1`.

```js
const stringPermutations = str => {
  if (str.length <= 2) return str.length === 2 ? [str, str[1] + str[0]] : [str];
  return str
    .split('')
    .reduce(
      (acc, letter, i) =>
        acc.concat(stringPermutations(str.slice(0, i) + str.slice(i + 1)).map(val => letter + val)),
      []
    );
};
```

<details>
<summary>Examples</summary>

```js
stringPermutations('abc'); // ['abc','acb','bac','bca','cab','cba']
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### stripHTMLTags

Removes HTML/XML tags from string.

Use a regular expression to remove HTML/XML tags from a string.

```js
const stripHTMLTags = str => str.replace(/<[^>]*>/g, '');
```

<details>
<summary>Examples</summary>

```js
stripHTMLTags('<p><em>lorem</em> <strong>ipsum</strong></p>'); // 'lorem ipsum'
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### toCamelCase

Converts a string to camelcase.

Break the string into words and combine them capitalizing the first letter of each word, using a regexp.

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

Break the string into words and combine them adding `-` as a separator, using a regexp.

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

Break the string into words and combine them adding `_` as a separator, using a regexp.

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
toSnakeCase('some-mixed_string With spaces_underscores-and-hyphens'); // 'some_mixed_string_with_spaces_underscores_and_hyphens'
toSnakeCase('AllThe-small Things'); // "all_the_smal_things"
toSnakeCase('IAmListeningToFMWhileLoadingDifferentURLOnMyBrowserAndAlsoEditingSomeXMLAndHTML'); // "i_am_listening_to_fm_while_loading_different_url_on_my_browser_and_also_editing_some_xml_and_html"
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### truncateString

Truncates a string up to a specified length.

Determine if the string's `length` is greater than `num`.
Return the string truncated to the desired length, with `'...'` appended to the end or the original string.

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


### URLJoin

Joins all given URL segments together, then normalizes the resulting URL.

Use `String.join('/')` to combine URL segments, then a series of `String.replace()` calls with various regexps to normalize the resulting URL (remove double slashes, add proper slashes for protocol, remove slashes before parameters, combine parameters with `'&'` and normalize first parameter delimiter).

```js
const URLJoin = (...args) =>
  args
    .join('/')
    .replace(/[\/]+/g, '/')
    .replace(/^(.+):\//, '$1://')
    .replace(/^file:/, 'file:/')
    .replace(/\/(\?|&|#[^!])/g, '$1')
    .replace(/\?/g, '&')
    .replace('&', '?');
```

<details>
<summary>Examples</summary>

```js
URLJoin('http://www.google.com', 'a', '/b/cd', '?foo=123', '?bar=foo'); // 'http://www.google.com/a/b/cd?foo=123&bar=foo'
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### words

Converts a given string into an array of words.

Use `String.split()` with a supplied pattern (defaults to non-alpha as a regexp) to convert to an array of strings. Use `Array.filter()` to remove any empty strings.
Omit the second argument to use the default regexp.

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
 ## 📃 Type

### getType

Returns the native type of a value.

Returns lowercased constructor name of value, `"undefined"` or `"null"` if value is `undefined` or `null`.

```js
const getType = v =>
  v === undefined ? 'undefined' : v === null ? 'null' : v.constructor.name.toLowerCase();
```

<details>
<summary>Examples</summary>

```js
getType(new Set([1, 2, 3])); // 'set'
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### is

Checks if the provided value is of the specified type (doesn't work with literals).

Use the `instanceof` operator to check if the provided value is of the specified `type`.

```js
const is = (type, val) => val instanceof type;
```

<details>
<summary>Examples</summary>

```js
is(Array, [1]); // true
is(ArrayBuffer, new ArrayBuffer()); // true
is(Map, new Map()); // true
is(RegExp, /./g); // true
is(Set, new Set()); // true
is(WeakMap, new WeakMap()); // true
is(WeakSet, new WeakSet()); // true
is(String, ''); // false
is(String, new String('')); // true
is(Number, 1); // false
is(Number, new Number(1)); // true
is(Boolean, true); // false
is(Boolean, new Boolean(true)); // true
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


### isEmpty

Returns true if the a value is an empty object, collection, map or set, has no enumerable properties or is any type that is not considered a collection.

Check if the provided value is `null` or if its `length` is equal to `0`.

```js
const isEmpty = val => val == null || !(Object.keys(val) || val).length;
```

<details>
<summary>Examples</summary>

```js
isEmpty(new Map()); // true
isEmpty(new Set()); // true
isEmpty([]); // true
isEmpty({}); // true
isEmpty(''); // true
isEmpty([1, 2]); // false
isEmpty({ a: 1, b: 2 }); // false
isEmpty('text'); // false
isEmpty(123); // true - type is not considered a collection
isEmpty(true); // true - type is not considered a collection
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### isFunction

Checks if the given argument is a function.

Use `typeof` to check if a value is classified as a function primitive.

```js
const isFunction = val => typeof val === 'function';
```

<details>
<summary>Examples</summary>

```js
isFunction('x'); // false
isFunction(x => x); // true
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### isNil

Returns `true` if the specified value is `null` or `undefined`, `false` otherwise.

Use the strict equality operator to check if the value and of `val` are equal to `null` or `undefined`.

```js
const isNil = val => val === undefined || val === null;
```

<details>
<summary>Examples</summary>

```js
isNil(null); // true
isNil(undefined); // true
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


### isObject

Returns a boolean determining if the passed value is an object or not.

Uses the  `Object` constructor to create an object wrapper for the given value.
If the value is `null` or `undefined`, create and return an empty object. Οtherwise, return an object of a type that corresponds to the given value.

```js
const isObject = obj => obj === Object(obj);
```

<details>
<summary>Examples</summary>

```js
isObject([1, 2, 3, 4]); // true
isObject([]); // true
isObject(['Hello!']); // true
isObject({ a: 1 }); // true
isObject({}); // true
isObject(true); // false
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### isObjectLike

Checks if a value is object-like.

Check if the provided value is not `null` and its `typeof` is equal to `'object'`.

```js
const isObjectLike = val => val !== null && typeof val === 'object';
```

<details>
<summary>Examples</summary>

```js
isObjectLike({}); // true
isObjectLike([1, 2, 3]); // true
isObjectLike(x => x); // false
isObjectLike(null); // false
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### isPlainObject

Checks if the provided value is an object created by the Object constructor.

Check if the provided value is truthy, use `typeof` to check if it is an object and `Object.constructor` to make sure the constructor is equal to `Object`.

```js
const isPlainObject = val => !!val && typeof val === 'object' && val.constructor === Object;
```

<details>
<summary>Examples</summary>

```js
isPlainObject({ a: 1 }); // true
isPlainObject(new Map()); // false
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### isPrimitive

Returns a boolean determining if the passed value is primitive or not.

Use `Array.includes()` on an array of type strings which are not primitive,
supplying the type using `typeof`.
Since `typeof null` evaluates to `'object'`, it needs to be directly compared.

```js
const isPrimitive = val => !['object', 'function'].includes(typeof val) || val === null;
```

<details>
<summary>Examples</summary>

```js
isPrimitive(null); // true
isPrimitive(50); // true
isPrimitive('Hello!'); // true
isPrimitive(false); // true
isPrimitive(Symbol()); // true
isPrimitive([]); // false
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
isSymbol(Symbol('x')); // true
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### isUndefined

Returns `true` if the specified value is `undefined`, `false` otherwise.

Use the strict equality operator to check if the value and of `val` are equal to `undefined`.

```js
const isUndefined = val => val === undefined;
```

<details>
<summary>Examples</summary>

```js
isUndefined(undefined); // true
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

---
 ## 🔧 Utility

### castArray

Casts the provided value as an array if it's not one.

Use `Array.isArray()` to determine if `val` is an array and return it as-is or encapsulated in an array accordingly.

```js
const castArray = val => (Array.isArray(val) ? val : [val]);
```

<details>
<summary>Examples</summary>

```js
castArray('foo'); // ['foo']
castArray([1]); // [1]
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### cloneRegExp

Clones a regular expression.

Use `new RegExp()`, `RegExp.source` and `RegExp.flags` to clone the given regular expression.

```js
const cloneRegExp = regExp => new RegExp(regExp.source, regExp.flags);
```

<details>
<summary>Examples</summary>

```js
const regExp = /lorem ipsum/gi;
const regExp2 = cloneRegExp(regExp); // /lorem ipsum/gi
```

</details>

<br>[⬆ Back to top](#table-of-contents)


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

Use `Array.map()`, `String.split()` and `Array.join()` to join the mapped array for converting a 3-digit RGB notated hexadecimal color-code to the 6-digit form.
`Array.slice()` is used to remove `#` from string start since it's added once.

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


### getURLParameters

Returns an object containing the parameters of the current URL.

Use `String.match()` with an appropriate regular expression to get all key-value pairs, `Array.reduce()` to map and combine them into a single object.
Pass `location.search` as the argument to apply to the current `url`.

```js
const getURLParameters = url =>
  (url.match(/([^?=&]+)(=([^&]*))/g) || []).reduce(
    (a, v) => ((a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1)), a),
    {}
  );
```

<details>
<summary>Examples</summary>

```js
getURLParameters('http://url.com/page?name=Adam&surname=Smith'); // {name: 'Adam', surname: 'Smith'}
getURLParameters('google.com'); // {}
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### hexToRGB ![advanced](/advanced.svg)

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


### httpGet

Makes a `GET` request to the passed URL.

Use [`XMLHttpRequest`](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest) web api to make a `get` request to the given `url`.
Handle the `onload` event, by calling the given `callback` the `responseText`.
Handle the `onerror` event, by running the provided `err` function.
Omit the third argument, `err`, to log errors to the console's `error` stream by default.

```js
const httpGet = (url, callback, err = console.error) => {
  const request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.onload = () => callback(request.responseText);
  request.onerror = () => err(request);
  request.send();
};
```

<details>
<summary>Examples</summary>

```js
httpGet(
  'https://jsonplaceholder.typicode.com/posts/1',
  console.log
); /*
Logs: {
  "userId": 1,
  "id": 1,
  "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
  "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
}
*/
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### httpPost

Makes a `POST` request to the passed URL.

Use [`XMLHttpRequest`](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest) web api to make a `post` request to the given `url`.
Set the value of an `HTTP` request header with `setRequestHeader` method.
Handle the `onload` event, by calling the given `callback` the `responseText`.
Handle the `onerror` event, by running the provided `err` function.
Omit the third argument, `data`, to send no data to the provided `url`.
Omit the fourth argument, `err`, to log errors to the console's `error` stream by default.

```js
const httpPost = (url, data, callback, err = console.error) => {
  const request = new XMLHttpRequest();
  request.open('POST', url, true);
  request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  request.onload = () => callback(request.responseText);
  request.onerror = () => err(request);
  request.send(data);
};
```

<details>
<summary>Examples</summary>

```js
const newPost = {
  userId: 1,
  id: 1337,
  title: 'Foo',
  body: 'bar bar bar'
};
const data = JSON.stringify(newPost);
httpPost(
  'https://jsonplaceholder.typicode.com/posts',
  data,
  console.log
); /*
Logs: {
  "userId": 1,
  "id": 1337,
  "title": "Foo",
  "body": "bar bar bar"
}
*/
httpPost(
  'https://jsonplaceholder.typicode.com/posts',
  null, //does not send a body
  console.log
); /*
Logs: {
  "id": 101
}
*/
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### isBrowser

Determines if the current runtime environment is a browser so that front-end modules can run on the server (Node) without throwing errors.

Use `Array.includes()` on the `typeof` values of both `window` and `document` (globals usually only available in a browser environment unless they were explicitly defined), which will return `true` if one of them is `undefined`. 
`typeof` allows globals to be checked for existence without throwing a `ReferenceError`. 
If both of them are not `undefined`, then the current environment is assumed to be a browser.

```js
const isBrowser = () => ![typeof window, typeof document].includes('undefined');
```

<details>
<summary>Examples</summary>

```js
isBrowser(); // true (browser)
isBrowser(); // false (Node)
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### mostPerformant

Returns the index of the function in an array of functions which executed the fastest.

Use `Array.map()` to generate an array where each value is the total time taken to execute the function after `iterations` times. Use the difference in `performance.now()` values before and after to get the total time in milliseconds to a high degree of accuracy.
Use `Math.min()` to find the minimum execution time, and return the index of that shortest time which corresponds to the index of the most performant function. 
Omit the second argument, `iterations`, to use a default of 10,000 iterations. The more iterations, the more reliable the result but the longer it will take.

```js
const mostPerformant = (fns, iterations = 10000) => {
  const times = fns.map(fn => {
    const before = performance.now();
    for (let i = 0; i < iterations; i++) fn();
    return performance.now() - before;
  });
  return times.indexOf(Math.min(...times));
};
```

<details>
<summary>Examples</summary>

```js
mostPerformant([
  () => {
    // Loops through the entire array before returning `false`
    [1, 2, 3, 4, 5, 6, 7, 8, 9, '10'].every(el => typeof el === 'number');
  },
  () => {
    // Only needs to reach index `1` before returning false
    [1, '2', 3, 4, 5, 6, 7, 8, 9, 10].every(el => typeof el === 'number');
  }
]); // 1
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### nthArg

Creates a function that gets the argument at index `n`. If `n` is negative, the nth argument from the end is returned.

Use `Array.slice()` to get the desired argument at index `n`.

```js
const nthArg = n => (...args) => args.slice(n)[0];
```

<details>
<summary>Examples</summary>

```js
const third = nthArg(2);
third(1, 2, 3); // 3
third(1, 2); // undefined
const last = nthArg(-1);
last(1, 2, 3, 4, 5); // 5
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### parseCookie

Parse an HTTP Cookie header string and return an object of all cookie name-value pairs.

Use `String.split(';')` to separate key-value pairs from each other.
Use `Array.map()` and `String.split('=')` to separate keys from values in each pair.
Use `Array.reduce()` and `decodeURIComponent()` to create an object with all key-value pairs.

```js
const parseCookie = str =>
  str
    .split(';')
    .map(v => v.split('='))
    .reduce((acc, v) => {
      acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
      return acc;
    }, {});
```

<details>
<summary>Examples</summary>

```js
parseCookie('foo=bar; equation=E%3Dmc%5E2'); // { foo: 'bar', equation: 'E=mc^2' }
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### prettyBytes

Converts a number in bytes to a human-readable string.

Use an array dictionary of units to be accessed based on the exponent.
Use `Number.toPrecision()` to truncate the number to a certain number of digits.
Return the prettified string by building it up, taking into account the supplied options and whether it is negative or not.
Omit the second argument, `precision`, to use a default precision of `3` digits.
Omit the third argument, `addSpace`, to add space between the number and unit by default.

```js
const prettyBytes = (num, precision = 3, addSpace = true) => {
  const UNITS = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  if (Math.abs(num) < 1) return num + (addSpace ? ' ' : '') + UNITS[0];
  const exponent = Math.min(Math.floor(Math.log10(num < 0 ? -num : num) / 3), UNITS.length - 1);
  const n = Number(((num < 0 ? -num : num) / 1000 ** exponent).toPrecision(precision));
  return (num < 0 ? '-' : '') + n + (addSpace ? ' ' : '') + UNITS[exponent];
};
```

<details>
<summary>Examples</summary>

```js
prettyBytes(1000); // "1 KB"
prettyBytes(-27145424323.5821, 5); // "-27.145 GB"
prettyBytes(123456789, 3, false); // "123MB"
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### randomHexColorCode

Generates a random hexadecimal color code.

Use `Math.random` to generate a random 24-bit(6x4bits) hexadecimal number. Use bit shifting and then convert it to an hexadecimal String using `toString(16)`.

```js
const randomHexColorCode = () => {
  let n = (Math.random() * 0xfffff * 1000000).toString(16);
  return '#' + n.slice(0, 6);
};
```

<details>
<summary>Examples</summary>

```js
randomHexColorCode(); // "#e34155"
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### RGBToHex

Converts the values of RGB components to a color code.

Convert given RGB parameters to hexadecimal string using bitwise left-shift operator (`<<`) and `toString(16)`, then `String.padStart(6,'0')` to get a 6-digit hexadecimal value.

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


### serializeCookie

Serialize a cookie name-value pair into a Set-Cookie header string.

Use template literals and `encodeURIComponent()` to create the appropriate string.

```js
const serializeCookie = (name, val) => `${encodeURIComponent(name)}=${encodeURIComponent(val)}`;
```

<details>
<summary>Examples</summary>

```js
serializeCookie('foo', 'bar'); // 'foo=bar'
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
timeTaken(() => Math.pow(2, 10)); // 1024, (logged): timeTaken: 0.02099609375ms
```

</details>

<br>[⬆ Back to top](#table-of-contents)


### toCurrency

Take a number and return specified currency formatting.

Use `Intl.NumberFormat` to enable country / currency sensitive formatting.

```js
const toCurrency = (n, curr, LanguageFormat = undefined) =>
  Intl.NumberFormat(LanguageFormat, { style: 'currency', currency: curr }).format(n);
```

<details>
<summary>Examples</summary>

```js
toCurrency(123456.789, 'EUR'); // €123,456.79  | currency: Euro | currencyLangFormat: Local
toCurrency(123456.789, 'USD', 'en-us'); // $123,456.79  | currency: US Dollar | currencyLangFormat: English (United States)
toCurrency(123456.789, 'USD', 'fa'); // ۱۲۳٬۴۵۶٫۷۹ ؜$ | currency: US Dollar | currencyLangFormat: Farsi
toCurrency(322342436423.2435, 'JPY'); // ¥322,342,436,423 | currency: Japanese Yen | currencyLangFormat: Local
toCurrency(322342436423.2435, 'JPY', 'fi'); // 322 342 436 423 ¥ | currency: Japanese Yen | currencyLangFormat: Finnish
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
toDecimalMark(12305030388.9087); // "12,305,030,388.909"
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

Use `!isNaN()` in combination with `parseFloat()` to check if the argument is a number.
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


## Collaborators

| [<img src="https://github.com/Chalarangelo.png" width="100px;"/>](https://github.com/Chalarangelo)<br/> [<sub>Angelos Chalaris</sub>](https://github.com/Chalarangelo) | [<img src="https://github.com/flxwu.png" width="100px;"/>](https://github.com/flxwu)<br/> [<sub>Felix Wu</sub>](https://github.com/Pl4gue) | [<img src="https://github.com/fejes713.png" width="100px;"/>](https://github.com/fejes713)<br/> [<sub>Stefan Feješ</sub>](https://github.com/fejes713)  | [<img src="https://github.com/kingdavidmartins.png" width="100px;"/>](https://github.com/kingdavidmartins)<br/> [<sub>King David Martins</sub>](https://github.com/iamsoorena) | [<img src="https://github.com/iamsoorena.png" width="100px;"/>](https://github.com/iamsoorena)<br/> [<sub>Soorena Soleimani</sub>](https://github.com/iamsoorena) |
| --- | --- | --- | --- | --- |
| [<img src="https://github.com/elderhsouza.png" width="100px;"/>](https://github.com/elderhsouza)<br/> [<sub>Elder Henrique Souza</sub>](https://github.com/elderhsouza) | [<img src="https://github.com/skatcat31.png" width="100px;"/>](https://github.com/skatcat31)<br/> [<sub>Robert Mennell</sub>](https://github.com/skatcat31) | [<img src="https://github.com/atomiks.png" width="100px;"/>](https://github.com/atomiks)<br/> [<sub>atomiks</sub>](https://github.com/atomiks)  |


## Credits

*Icons made by [Smashicons](https://www.flaticon.com/authors/smashicons) from [www.flaticon.com](https://www.flaticon.com/) is licensed by [CC 3.0 BY](http://creativecommons.org/licenses/by/3.0/).*


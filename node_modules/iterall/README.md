# JavaScript [Iterators][] and [AsyncIterators][] for all!

[![Build Status](https://travis-ci.org/leebyron/iterall.svg?branch=master)](https://travis-ci.org/leebyron/iterall) [![Coverage Status](https://coveralls.io/repos/github/leebyron/iterall/badge.svg?branch=master)](https://coveralls.io/github/leebyron/iterall?branch=master) ![710 bytes minified and gzipped](https://img.shields.io/badge/min%20gzip%20size-757%20B-blue.svg)

`iterall` provides a few crucial utilities for implementing and working with
[Iterables][iterators], [Async Iterables][asynciterators] and
[Array-likes][array-like] in all JavaScript environments, even old versions of
Internet Explorer, in a tiny library weighing well under 1KB when minified
and gzipped.

This is a library for libraries. If your library takes Arrays as input, accept
Iterables instead. If your library implements a new data-structure, make
it Iterable.

When installed via `npm`, `iterall` comes complete with [Flow][] and
[TypeScript][] definition files. Don't want to take the dependency? Feel free to
copy code directly from this repository.

```js
// Limited to only Arrays 😥
if (Array.isArray(thing)) {
  thing.forEach(function (item, i) {
    console.log('Index: ' + i, item)
  })
}

// Accepts all Iterables and Array-likes, in any JavaScript environment! 🎉
var isCollection = require('iterall').isCollection
var forEach = require('iterall').forEach

if (isCollection(thing)) {
  forEach(thing, function (item, i) {
    console.log('Index: ' + i, item)
  })
}

// Accepts all AsyncIterators, in any JavaScript environment! ⏳
var forAwaitEach = require('iterall').forAwaitEach

forAwaitEach(thing, function (item, i) {
  console.log('Index: ' + i, item)
}).then(function () {
  console.log('Done')
})
```

## Why use Iterators?

For most of JavaScript's history it has provided two collection data-structures:
the `Object` and the `Array`. These collections can conceptually describe nearly
all data and so it's no suprise that libraries expecting lists of
things standardized on expecting and checking for an Array. This pattern even
resulted in the addition of a new method in ES5: [`Array.isArray()`][isarray].

As JavaScript applications grew in complexity, moved to the [server][nodejs]
where CPU is a constrained resource, faced new problems and implemented new
algorithms, new data-structures are often required. With options from
[linked lists][linked list] to [HAMTs][hamt] developers can use what is most
efficient and provides the right properties for their program.

However none of these new data-structures can be used in libraries where an
`Array` is expected, which means developers are often stuck between abandoning
their favorite libraries or limiting their data-structure choices at the cost of
efficiency or usefulness.

To enable many related data-structures to be used interchangably we need a
_[protocol][]_, and luckily for us ES2015 introduced the
[Iteration Protocols][iterators] to describe all list-like data-structures which
can be iterated. That includes not just the new-to-ES2015 [Map][] and [Set][]
collections but also existing ones like [arguments][], [NodeList][] and the
various [TypedArray][], all of which return `false` for [`Array.isArray()`][isarray]
and in ES2015 implement the [Iterator protocol][iterators].

While Iterators are defined in ES2015, they _do not require_ ES2015 to work
correctly. In fact, Iterators were first introduced in 2012 in [Firefox v17](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#Iterator_property_and_iterator_symbol). Rather than using [`Symbol.iterator`][symbol.iterator], they used the property name `"@@iterator"` (in fact, the ECMAScript
spec still refers to well-known `Symbols` using this `@@` shorthand). By falling
back to use `"@@iterator"` when `Symbol.iterator` is not defined, Iterators can
be both safely defined and used by _any version of JavaScript_.

Not only were Iterables defined in ES2015, they were also implemented by the
built-in data-structures including [Array][array#@@iterator]. Older JavaScript
environments do not implement `Array.prototype[@@iterator]()`, however this is
only a minor problem. JavaScript has another related and much older protocol:
[Array-like]. A value is "Array-like" if it has a numeric `length` property and
indexed access, but does not necessarily have methods like `.push()` or `.forEach()`.
Much like [`Array.from`][array.from], `iterall`'s `forEach()` and
`createIterator()` methods also accept collections which are not Iterable but
are Array-like. This means that `iterall` can be used with [Array][],
[arguments][], [NodeList][], [TypedArray][] and other Array-like collections
regardless of the JavaScript environment.

When libraries only accept Arrays as input, they stick developers with a tough
choice: limit which data-structures can be used or limit the ability to use that
library. Accepting Iterables removes this false dichotomy, and allows libraries
to be more generally useful. There's no need to limit to ES2015 environments and
bleeding-edge browsers to accept `Iterable`.

Only using Arrays can limit the efficiency and usefulness of your application
code, but custom data-structures can often feel like a fish out of water in
JavaScript programs, only working with code written specifically for it.
Protocols like `Iterable` helps these new data-structures work with more
libraries and built-in JavaScript behavior. There's no need to limit to ES2015
environments and bleeding-edge browsers to implement `Iterable`.

## Why use AsyncIterators?

In the same way that `Iterator` provides a common interface for accessing many
different kinds of data-structures, `AsyncIterator` provides a common interface
over an asynchronous sequence of values (similar to Stream or Observable).

Async Iterators are not yet an official part of JavaScript, however they're
a "Stage 3" proposal to be added, and browser vendors are
[working on adding support](https://bugs.chromium.org/p/v8/issues/detail?id=5855).
However, Async Iterators can be both safely defined and used today by
_any version of JavaScript_, by using the utilities in `iterall`.

## FAQ

> Aren't Iterables slower than Arrays? I want the highest performance possible.

Arrays _are_ Iterables. Iterable is a protocol that Arrays adhere to in ES2015.
It's true that creating an Iterator and stepping through it can present some
overhead compared to a simple for-loop or `array.forEach`. However `iterall`'s
`forEach` will delegate directly to `array.forEach` and will use a for-loop for
Array-like objects, ensuring the best performance for Arrays while still
maintaining support for all Iterables.

> Should my library functions also return Iterables instead of Arrays? Won't
> that be limiting?

That could definitely be limiting if you return some generic Iterable where you
could have returned an Array, and (depending on context) I wouldn't recommend
you stop returning Arrays from functions if that's what you're doing today.
However if your functions are returning some collection data-structure that is
_not_ an Array, you should certainly consider having them implement the
Iterable protocol so they can be more widely useful.

Here are a few examples:

In [React][], render functions are expected to return view trees, where any
node (e.g. a `<ul>`) can have many children (e.g. many `<li>`). While it could
expect those children to always be represented as an Array, that would limit
React's usefulness - other data-structures couldn't be used. Instead, React
expects those children to be represented as an _Iterable_. That allows it to
continue to accept Arrays, but also accept many other data-structures.

[Immutable.js][] implements many new kinds of data-structures (including [HAMT])
all of which implement _Iterable_, which allows them to be used in many of
JavaScript's built-in functions, but also allows them to be used by many
libraries which accept Iterables, including React. Also, similar to
[`Array.from`][array.from], Immutable.js's constructors accept not only Arrays,
but any _Iterable_, allowing you to build any of these new data-structures from
any other data-structure.

> Where are all the other functions like `map`, `filter`, and `reduce`?

Those "higher order" collection functions are awesome, but they don't belong in
this library. Instead this library should be used as a basis for building such
a library (as it should be used for many other libraries). The `forEach`
function provided by `iterall` can be used as the underpinning for these.

As an example:

```js
function reduce (collection, reducer, initial) {
  var reduced = initial
  forEach(collection, function (item) {
    reduced = reducer(reduced, item)
  })
  return reduced
}
```

> How do I break out of a `forEach` or `forAwaitEach` loop early?

While `for of` and `for await of` loops allow breaking out of a loop early with
a `break` statement, the `forEach()` and `forAwaitEach()` functions (much like
Array's `forEach`)  do not support early breaking.

Similar to the "higher order" functions described above, this library can be the
basis for this extended behavior. To support early break outs, you can use a
wrapping function supporting early breaking by throwing a `BREAK` sentinel value
from the callback and using a try/catch block to early break:

```js
const BREAK = {}

function forEachBreakable (collection, callback) {
  try {
    forEach(collection, callback)
  } catch (error) {
    if (error !== BREAK) {
      throw error
    }
  }
}

async function forAwaitEachBreakable (collection, callback) {
  try {
    await forAwaitEach(collection, callback)
  } catch (error) {
    if (error !== BREAK) {
      throw error
    }
  }
}

// Example usages:
forEachBreakable(obj, function (value) {
  if (shouldBreakOn(value)) {
    throw BREAK
  }
  console.log(value)
})

forAwaitEachBreakable(obj, async function (value) {
  if (await shouldBreakOn(value)) {
    throw BREAK
  }
  console.log(value)
})
```

Note: This technique also works with the native Array `forEach` method!

<!--

NOTE TO CONTRIBUTORS

The API section below is AUTOMATICALLY GENERATED via `npm run docs`. Any direct
edits to this section will cause Travis CI to report a failure. The source of
this documentation is index.js. Edit that file then run `npm run docs` to
automatically update README.md

-->

## API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

#### Table of Contents

-   [Iterable](#iterable)
-   [Iterator](#iterator)
-   [$$iterator](#iterator-1)
-   [isIterable](#isiterable)
-   [isArrayLike](#isarraylike)
-   [isCollection](#iscollection)
-   [getIterator](#getiterator)
-   [getIteratorMethod](#getiteratormethod)
-   [createIterator](#createiterator)
-   [forEach](#foreach)
-   [AsyncIterable](#asynciterable)
-   [AsyncIterator](#asynciterator)
-   [$$asyncIterator](#asynciterator-1)
-   [isAsyncIterable](#isasynciterable)
-   [getAsyncIterator](#getasynciterator)
-   [getAsyncIteratorMethod](#getasynciteratormethod)
-   [createAsyncIterator](#createasynciterator)
-   [forAwaitEach](#forawaiteach)

### Iterable

-   **See: [MDN Iteration protocols](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#iterable)**

[Iterable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#iterable)
is a _protocol_ which when implemented allows a JavaScript object to define
their iteration behavior, such as what values are looped over in a
[`for...of`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of)
loop or `iterall`'s `forEach` function. Many [built-in types](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#Builtin_iterables)
implement the Iterable protocol, including `Array` and `Map`.

While described by the [ES2015 version of JavaScript](http://www.ecma-international.org/ecma-262/6.0/#sec-iterable-interface)
it can be utilized by any version of JavaScript.

### Iterator

-   **See: [MDN Iteration protocols](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#iterator)**

[Iterator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#iterator)
is a _protocol_ which describes a standard way to produce a sequence of
values, typically the values of the Iterable represented by this Iterator.

While described by the [ES2015 version of JavaScript](http://www.ecma-international.org/ecma-262/6.0/#sec-iterator-interface)
it can be utilized by any version of JavaScript.

### $$iterator

A property name to be used as the name of an Iterable's method responsible
for producing an Iterator, referred to as `@@iterator`. Typically represents
the value `Symbol.iterator` but falls back to the string `"@@iterator"` when
`Symbol.iterator` is not defined.

Use `$$iterator` for defining new Iterables instead of `Symbol.iterator`,
but do not use it for accessing existing Iterables, instead use
[getIterator](#getiterator) or [isIterable](#isiterable).

**Examples**

```javascript
var $$iterator = require('iterall').$$iterator

function Counter (to) {
  this.to = to
}

Counter.prototype[$$iterator] = function () {
  return {
    to: this.to,
    num: 0,
    next () {
      if (this.num >= this.to) {
        return { value: undefined, done: true }
      }
      return { value: this.num++, done: false }
    }
  }
}

var counter = new Counter(3)
for (var number of counter) {
  console.log(number) // 0 ... 1 ... 2
}
```

### isIterable

Returns true if the provided object implements the Iterator protocol via
either implementing a `Symbol.iterator` or `"@@iterator"` method.

**Parameters**

-   `obj`  A value which might implement the Iterable protocol.

**Examples**

```javascript
var isIterable = require('iterall').isIterable
isIterable([ 1, 2, 3 ]) // true
isIterable('ABC') // true
isIterable({ length: 1, 0: 'Alpha' }) // false
isIterable({ key: 'value' }) // false
isIterable(new Map()) // true
```

Returns **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** true if Iterable.

### isArrayLike

Returns true if the provided object implements the Array-like protocol via
defining a positive-integer `length` property.

**Parameters**

-   `obj`  A value which might implement the Array-like protocol.

**Examples**

```javascript
var isArrayLike = require('iterall').isArrayLike
isArrayLike([ 1, 2, 3 ]) // true
isArrayLike('ABC') // true
isArrayLike({ length: 1, 0: 'Alpha' }) // true
isArrayLike({ key: 'value' }) // false
isArrayLike(new Map()) // false
```

Returns **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** true if Array-like.

### isCollection

Returns true if the provided object is an Object (i.e. not a string literal)
and is either Iterable or Array-like.

This may be used in place of [Array.isArray()][isarray] to determine if an
object should be iterated-over. It always excludes string literals and
includes Arrays (regardless of if it is Iterable). It also includes other
Array-like objects such as NodeList, TypedArray, and Buffer.

**Parameters**

-   `obj`  An Object value which might implement the Iterable or Array-like protocols.

**Examples**

```javascript
var isCollection = require('iterall').isCollection
isCollection([ 1, 2, 3 ]) // true
isCollection('ABC') // false
isCollection({ length: 1, 0: 'Alpha' }) // true
isCollection({ key: 'value' }) // false
isCollection(new Map()) // true
```

```javascript
var forEach = require('iterall').forEach
if (isCollection(obj)) {
  forEach(obj, function (value) {
    console.log(value)
  })
}
```

Returns **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** true if Iterable or Array-like Object.

### getIterator

If the provided object implements the Iterator protocol, its Iterator object
is returned. Otherwise returns undefined.

**Parameters**

-   `iterable` **[Iterable](#iterable)&lt;T>** An Iterable object which is the source of an Iterator.

**Examples**

```javascript
var getIterator = require('iterall').getIterator
var iterator = getIterator([ 1, 2, 3 ])
iterator.next() // { value: 1, done: false }
iterator.next() // { value: 2, done: false }
iterator.next() // { value: 3, done: false }
iterator.next() // { value: undefined, done: true }
```

Returns **[Iterator](#iterator)&lt;T>** new Iterator instance.

### getIteratorMethod

If the provided object implements the Iterator protocol, the method
responsible for producing its Iterator object is returned.

This is used in rare cases for performance tuning. This method must be called
with obj as the contextual this-argument.

**Parameters**

-   `iterable` **[Iterable](#iterable)&lt;T>** An Iterable object which defines an `@@iterator` method.

**Examples**

```javascript
var getIteratorMethod = require('iterall').getIteratorMethod
var myArray = [ 1, 2, 3 ]
var method = getIteratorMethod(myArray)
if (method) {
  var iterator = method.call(myArray)
}
```

Returns **function (): [Iterator](#iterator)&lt;T>** `@@iterator` method.

### createIterator

Similar to [getIterator](#getiterator), this method returns a new Iterator given an
Iterable. However it will also create an Iterator for a non-Iterable
Array-like collection, such as Array in a non-ES2015 environment.

`createIterator` is complimentary to `forEach`, but allows a "pull"-based
iteration as opposed to `forEach`'s "push"-based iteration.

`createIterator` produces an Iterator for Array-likes with the same behavior
as ArrayIteratorPrototype described in the ECMAScript specification, and
does _not_ skip over "holes".

**Parameters**

-   `collection` **([Iterable](#iterable)&lt;T> | {length: [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)})** An Iterable or Array-like object to produce an Iterator.

**Examples**

```javascript
var createIterator = require('iterall').createIterator

var myArraylike = { length: 3, 0: 'Alpha', 1: 'Bravo', 2: 'Charlie' }
var iterator = createIterator(myArraylike)
iterator.next() // { value: 'Alpha', done: false }
iterator.next() // { value: 'Bravo', done: false }
iterator.next() // { value: 'Charlie', done: false }
iterator.next() // { value: undefined, done: true }
```

Returns **[Iterator](#iterator)&lt;T>** new Iterator instance.

### forEach

Given an object which either implements the Iterable protocol or is
Array-like, iterate over it, calling the `callback` at each iteration.

Use `forEach` where you would expect to use a `for ... of` loop in ES6.
However `forEach` adheres to the behavior of [Array#forEach][] described in
the ECMAScript specification, skipping over "holes" in Array-likes. It will
also delegate to a `forEach` method on `collection` if one is defined,
ensuring native performance for `Arrays`.

Similar to [Array#forEach][], the `callback` function accepts three
arguments, and is provided with `thisArg` as the calling context.

Note: providing an infinite Iterator to forEach will produce an error.

[array#foreach]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach

**Parameters**

-   `collection` **([Iterable](#iterable)&lt;T> | {length: [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)})** The Iterable or array to iterate over.
-   `callback` **function (T, [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number), [object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object))** Function to execute for each iteration, taking up to three arguments
-   `thisArg`  Optional. Value to use as `this` when executing `callback`.

**Examples**

```javascript
var forEach = require('iterall').forEach

forEach(myIterable, function (value, index, iterable) {
  console.log(value, index, iterable === myIterable)
})
```

```javascript
// ES6:
for (let value of myIterable) {
  console.log(value)
}

// Any JavaScript environment:
forEach(myIterable, function (value) {
  console.log(value)
})
```

### AsyncIterable

-   **See: [Async Iteration Proposal](https://tc39.github.io/proposal-async-iteration/#sec-asynciterable-interface)**

[AsyncIterable](https://tc39.github.io/proposal-async-iteration/#sec-asynciterable-interface)
is a _protocol_ which when implemented allows a JavaScript object to define
an asynchronous iteration behavior, such as what values are looped over in
a [`for-await-of`](https://tc39.github.io/proposal-async-iteration/#sec-for-in-and-for-of-statements)
loop or `iterall`'s [forAwaitEach](#forawaiteach) function.

While described as a proposed addition to the [ES2017 version of JavaScript](https://tc39.github.io/proposal-async-iteration/)
it can be utilized by any version of JavaScript.

### AsyncIterator

-   **See: [Async Iteration Proposal](https://tc39.github.io/proposal-async-iteration/#sec-asynciterator-interface)**

[AsyncIterator](https://tc39.github.io/proposal-async-iteration/#sec-asynciterator-interface)
is a _protocol_ which describes a standard way to produce and consume an
asynchronous sequence of values, typically the values of the
[AsyncIterable](#asynciterable) represented by this [AsyncIterator](#asynciterator).

AsyncIterator is similar to Observable or Stream. Like an [Iterator](#iterator) it
also as a `next()` method, however instead of an IteratorResult,
calling this method returns a [Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise) for a IteratorResult.

While described as a proposed addition to the [ES2017 version of JavaScript](https://tc39.github.io/proposal-async-iteration/)
it can be utilized by any version of JavaScript.

### $$asyncIterator

A property name to be used as the name of an AsyncIterable's method
responsible for producing an Iterator, referred to as `@@asyncIterator`.
Typically represents the value `Symbol.asyncIterator` but falls back to the
string `"@@asyncIterator"` when `Symbol.asyncIterator` is not defined.

Use `$$asyncIterator` for defining new AsyncIterables instead of
`Symbol.asyncIterator`, but do not use it for accessing existing Iterables,
instead use [getAsyncIterator](#getasynciterator) or [isAsyncIterable](#isasynciterable).

**Examples**

```javascript
var $$asyncIterator = require('iterall').$$asyncIterator

function Chirper (to) {
  this.to = to
}

Chirper.prototype[$$asyncIterator] = function () {
  return {
    to: this.to,
    num: 0,
    next () {
      return new Promise(resolve => {
        if (this.num >= this.to) {
          resolve({ value: undefined, done: true })
        } else {
          setTimeout(() => {
            resolve({ value: this.num++, done: false })
          }, 1000)
        }
      })
    }
  }
}

var chirper = new Chirper(3)
for await (var number of chirper) {
  console.log(number) // 0 ...wait... 1 ...wait... 2
}
```

### isAsyncIterable

Returns true if the provided object implements the AsyncIterator protocol via
either implementing a `Symbol.asyncIterator` or `"@@asyncIterator"` method.

**Parameters**

-   `obj`  A value which might implement the AsyncIterable protocol.

**Examples**

```javascript
var isAsyncIterable = require('iterall').isAsyncIterable
isAsyncIterable(myStream) // true
isAsyncIterable('ABC') // false
```

Returns **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** true if AsyncIterable.

### getAsyncIterator

If the provided object implements the AsyncIterator protocol, its
AsyncIterator object is returned. Otherwise returns undefined.

**Parameters**

-   `asyncIterable` **[AsyncIterable](#asynciterable)&lt;T>** An AsyncIterable object which is the source of an AsyncIterator.

**Examples**

```javascript
var getAsyncIterator = require('iterall').getAsyncIterator
var asyncIterator = getAsyncIterator(myStream)
asyncIterator.next().then(console.log) // { value: 1, done: false }
asyncIterator.next().then(console.log) // { value: 2, done: false }
asyncIterator.next().then(console.log) // { value: 3, done: false }
asyncIterator.next().then(console.log) // { value: undefined, done: true }
```

Returns **[AsyncIterator](#asynciterator)&lt;T>** new AsyncIterator instance.

### getAsyncIteratorMethod

If the provided object implements the AsyncIterator protocol, the method
responsible for producing its AsyncIterator object is returned.

This is used in rare cases for performance tuning. This method must be called
with obj as the contextual this-argument.

**Parameters**

-   `asyncIterable` **[AsyncIterable](#asynciterable)&lt;T>** An AsyncIterable object which defines an `@@asyncIterator` method.

**Examples**

```javascript
var getAsyncIteratorMethod = require('iterall').getAsyncIteratorMethod
var method = getAsyncIteratorMethod(myStream)
if (method) {
  var asyncIterator = method.call(myStream)
}
```

Returns **function (): [AsyncIterator](#asynciterator)&lt;T>** `@@asyncIterator` method.

### createAsyncIterator

Similar to [getAsyncIterator](#getasynciterator), this method returns a new AsyncIterator
given an AsyncIterable. However it will also create an AsyncIterator for a
non-async Iterable as well as non-Iterable Array-like collection, such as
Array in a pre-ES2015 environment.

`createAsyncIterator` is complimentary to `forAwaitEach`, but allows a
buffering "pull"-based iteration as opposed to `forAwaitEach`'s
"push"-based iteration.

`createAsyncIterator` produces an AsyncIterator for non-async Iterables as
described in the ECMAScript proposal [Async-from-Sync Iterator Objects](https://tc39.github.io/proposal-async-iteration/#sec-async-from-sync-iterator-objects).

> Note: Creating `AsyncIterator`s requires the existence of `Promise`.
> While `Promise` has been available in modern browsers for a number of
> years, legacy browsers (like IE 11) may require a polyfill.

**Parameters**

-   `source` **([AsyncIterable](#asynciterable)&lt;T> | [Iterable](#iterable)&lt;T> | {length: [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)})** An AsyncIterable, Iterable, or Array-like object to produce an Iterator.

**Examples**

```javascript
var createAsyncIterator = require('iterall').createAsyncIterator

var myArraylike = { length: 3, 0: 'Alpha', 1: 'Bravo', 2: 'Charlie' }
var iterator = createAsyncIterator(myArraylike)
iterator.next().then(console.log) // { value: 'Alpha', done: false }
iterator.next().then(console.log) // { value: 'Bravo', done: false }
iterator.next().then(console.log) // { value: 'Charlie', done: false }
iterator.next().then(console.log) // { value: undefined, done: true }
```

Returns **[AsyncIterator](#asynciterator)&lt;T>** new AsyncIterator instance.

### forAwaitEach

Given an object which either implements the AsyncIterable protocol or is
Array-like, iterate over it, calling the `callback` at each iteration.

Use `forAwaitEach` where you would expect to use a [for-await-of](https://tc39.github.io/proposal-async-iteration/#sec-for-in-and-for-of-statements) loop.

Similar to [Array#forEach][], the `callback` function accepts three
arguments, and is provided with `thisArg` as the calling context.

> Note: Using `forAwaitEach` requires the existence of `Promise`.
> While `Promise` has been available in modern browsers for a number of
> years, legacy browsers (like IE 11) may require a polyfill.

**Parameters**

-   `source` **([AsyncIterable](#asynciterable)&lt;T> | [Iterable](#iterable)&lt;([Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;T> | T)> | {length: [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)})** The AsyncIterable or array to iterate over.
-   `callback` **function (T, [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number), [object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object))** Function to execute for each iteration, taking up to three arguments
-   `thisArg`  Optional. Value to use as `this` when executing `callback`.

**Examples**

```javascript
var forAwaitEach = require('iterall').forAwaitEach

forAwaitEach(myIterable, function (value, index, iterable) {
  console.log(value, index, iterable === myIterable)
})
```

```javascript
// ES2017:
for await (let value of myAsyncIterable) {
  console.log(await doSomethingAsync(value))
}
console.log('done')

// Any JavaScript environment:
forAwaitEach(myAsyncIterable, function (value) {
  return doSomethingAsync(value).then(console.log)
}).then(function () {
  console.log('done')
})
```

## Contributing

Contributions are welcome and encouraged!

Remember that this library is designed to be small, straight-forward, and
well-tested. The value of new additional features will be weighed against their
size. This library also seeks to leverage and mirror the
[ECMAScript specification][] in its behavior as much as possible and reasonable.

This repository has far more documentation and explanation than code, and it is
expected that the majority of contributions will come in the form of improving
these.

<!-- Appendix -->

[arguments]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments

[array#@@iterator]: (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/@@iterator)

[array-like]: http://www.2ality.com/2013/05/quirk-array-like-objects.html

[array.from]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from

[array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array

[ecmascript specification]: http://www.ecma-international.org/ecma-262/6.0/

[flow]: https://flowtype.org/

[hamt]: https://en.wikipedia.org/wiki/Hash_array_mapped_trie

[isarray]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray

[iterators]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols

[asynciterators]: https://tc39.github.io/proposal-async-iteration/

[linked list]: https://en.wikipedia.org/wiki/Linked_list

[map]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map

[nodejs]: https://nodejs.org/

[nodelist]: https://developer.mozilla.org/en-US/docs/Web/API/NodeList

[protocol]: https://en.wikipedia.org/wiki/Protocol_(object-oriented_programming)

[react]: https://facebook.github.io/react/

[set]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set

[symbol.iterator]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/iterator

[typedarray]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray

[typescript]: http://www.typescriptlang.org/

[immutable.js]: http://facebook.github.io/immutable-js/

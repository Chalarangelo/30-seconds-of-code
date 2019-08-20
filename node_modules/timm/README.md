# timm [![Build Status](https://travis-ci.org/guigrpa/timm.svg)](https://travis-ci.org/guigrpa/timm) [![Coverage Status](https://coveralls.io/repos/github/guigrpa/timm/badge.svg?branch=master)](https://coveralls.io/github/guigrpa/timm?branch=master) [![npm version](https://img.shields.io/npm/v/timm.svg)](https://www.npmjs.com/package/timm)

Immutability helpers with fast reads and acceptable writes ([blog post](http://guigrpa.github.io/2016/06/16/painless-immutability/))


## Installation

```
$ npm install --save timm
```


## Motivation

I know, I know... the world doesn't need yet another immutability library, especially with the likes of [ImmutableJS](http://facebook.github.io/immutable-js/) and [seamless-immutable](https://github.com/rtfeldman/seamless-immutable) around.

And yet... I felt the urge, at least just to cover my limited needs. ImmutableJS is a solid, comprehensive and highly-performant solution, but this power comes at a price: mixing up ImmutableJS's Maps and Lists with your plain objects can cause some friction, and reading those objects (in my case, more often than writing them) isn't that convenient.

On the other side, *seamless-immutable* solves the "friction" problem by using plain objects and arrays, but seems to have some performance issues (at least in my benchmarks, see below).

*timm*'s approach: use plain objects and arrays and provide simple mutation functions to handle most common operations (suggestions are welcome!). As a bonus, *timm* creates new objects *lazily*, when it confirms that the operation will mutate the input object; in other words, **operations that don't modify an object always return the object itself**. This alleviates pressure on the garbage collector and lets you easily check whether an object changed after an operation: `merge(obj, { a: 3 }) === obj`.

**Important notice:** *timm* does *not* freeze the objects it provides. In other words, it doesn't protect you against inadvertently modifying them in your code. I considered deeply freezing all objects with `Object.freeze()`, but it is really slow. Then I considered doing this only in development (like [*seamless-immutable*](https://github.com/rtfeldman/seamless-immutable#performance)), but then modifying frozen objects will silently fail in development (unless you `use strict` in your code), and –worse still– succeed in production. Not good. In conclusion, **be careful** (or send me a suggestion to work around this!).

...Oh, I almost forgot! It's **tiny: just ~200 LOC and ~1.5 kB minified & compressed!**

## Benchmarks

I prepared an initial benchmarking tool comparing read/write speeds in four cases:

* In-place editing (mutable)
* [ImmutableJS](http://facebook.github.io/immutable-js/)
* [timm](https://github.com/guigrpa/timm)
* [seamless-immutable](https://github.com/rtfeldman/seamless-immutable)
* [immutability-helper](https://github.com/kolodny/immutability-helper)

All five solutions are first verified for consistency (the mutable solution obviously does not pass all tests) and then benchmarked. Benchmarks cover reading and writing object attributes at different nesting levels (root level, 2 levels and 5 levels deep), merging two small objects, and replacing an object in a 1000-long array.

Feel free to run them yourself (download the repo and then `npm install && npm run benchmarks`). These are my results on OS X for 200k iterations (Node v8.6.0):

![Benchmarks](https://github.com/guigrpa/timm/blob/master/docs/bechmarks-osx-20180822-node9.11.png?raw=true)

Some conclusions from these benchmarks:

* Reads are on par with native objects/arrays, *seamless-immutable* and *immutability-helper*, and faster than *ImmutableJS* (the deeper, the faster, even though *ImmutableJS* has improved read performance substantially in recent versions). In fact, you cannot go faster than native objects for reading!

* Writes are much slower than in-place edits, as expected, but are much faster than *seamless-immutable* (even in production mode) and *immutability-helper*, both for objects and arrays. Compared to *ImmutableJS*, object writes and merges are faster (the deeper, the faster), whereas array writes are way slower (not as slow as *seamless-immutable* and *immutability-helper*, though). For *timm* and *seamless-immutable*, write times degrade linearly with array length (and probably object size), but much more slowly for *ImmutableJS* (logarithmically?). This is where *ImmutableJS* really shines.

* Hence, what I recommend (from top to bottom):

    - If you don't need immutability, well... just **mutate in peace!** I mean, *in place*
    - If you need a complete, well-tested, rock-solid library and don't mind using a non-native API for reads: use **ImmutableJS**
    - If you value using plain arrays/objects above other considerations, use **timm**
    - If your typical use cases involve much more reading than writing, use **timm** as well
    - If you do a lot of writes, updating items in long arrays or attributes in fat objects, use **ImmutableJS**


## Usage

```js
import { merge, set as timmSet } from 'timm';
const obj = merge({ a: 2 }, { b: 3 });
const obj2 = timmSet({ foo: 1}, 'bar', 2);
```

### Arrays

#### addLast()
Returns a new array with an appended item or items.

Usage: `addLast<T>(array: Array<T>, val: Array<T>|T): Array<T>`

```js
arr = ['a', 'b']
arr2 = addLast(arr, 'c')
// ['a', 'b', 'c']
arr2 === arr
// false
arr3 = addLast(arr, ['c', 'd'])
// ['a', 'b', 'c', 'd']
```

#### addFirst()
Returns a new array with a prepended item or items.

Usage: `addFirst<T>(array: Array<T>, val: Array<T>|T): Array<T>`

```js
arr = ['a', 'b']
arr2 = addFirst(arr, 'c')
// ['c', 'a', 'b']
arr2 === arr
// false
arr3 = addFirst(arr, ['c', 'd'])
// ['c', 'd', 'a', 'b']
```

#### removeLast()
Returns a new array removing the last item.

Usage: `removeLast<T>(array: Array<T>): Array<T>`

```js
arr = ['a', 'b']
arr2 = removeLast(arr)
// ['a']
arr2 === arr
// false

// The same array is returned if there are no changes:
arr3 = []
removeLast(arr3) === arr3
// true
```

#### removeFirst()
Returns a new array removing the first item.

Usage: `removeFirst<T>(array: Array<T>): Array<T>`

```js
arr = ['a', 'b']
arr2 = removeFirst(arr)
// ['b']
arr2 === arr
// false

// The same array is returned if there are no changes:
arr3 = []
removeFirst(arr3) === arr3
// true
```

#### insert()
Returns a new array obtained by inserting an item or items
at a specified index.

Usage: `insert<T>(array: Array<T>, idx: number, val: Array<T>|T): Array<T>`

```js
arr = ['a', 'b', 'c']
arr2 = insert(arr, 1, 'd')
// ['a', 'd', 'b', 'c']
arr2 === arr
// false
insert(arr, 1, ['d', 'e'])
// ['a', 'd', 'e', 'b', 'c']
```

#### removeAt()
Returns a new array obtained by removing an item at
a specified index.

Usage: `removeAt<T>(array: Array<T>, idx: number): Array<T>`

```js
arr = ['a', 'b', 'c']
arr2 = removeAt(arr, 1)
// ['a', 'c']
arr2 === arr
// false

// The same array is returned if there are no changes:
removeAt(arr, 4) === arr
// true
```

#### replaceAt()
Returns a new array obtained by replacing an item at
a specified index. If the provided item is the same as
(*referentially equal to*) the previous item at that position,
the original array is returned.

Usage: `replaceAt<T>(array: Array<T>, idx: number, newItem: T): Array<T>`

```js
arr = ['a', 'b', 'c']
arr2 = replaceAt(arr, 1, 'd')
// ['a', 'd', 'c']
arr2 === arr
// false

// The same object is returned if there are no changes:
replaceAt(arr, 1, 'b') === arr
// true
```

### Collections (objects and arrays)

The following types are used throughout this section
```js
type ArrayOrObject = Array<any>|Object;
type Key = number|string;
```

#### getIn()
Returns a value from an object at a given path. Works with
nested arrays and objects. If the path does not exist, it returns
`undefined`.

Usage: `getIn(obj: ?ArrayOrObject, path: Array<Key>): any`

```js
obj = { a: 1, b: 2, d: { d1: 3, d2: 4 }, e: ['a', 'b', 'c'] }
getIn(obj, ['d', 'd1'])
// 3
getIn(obj, ['e', 1])
// 'b'
```

#### set()
Returns a new object with a modified attribute.
If the provided value is the same as (*referentially equal to*)
the previous value, the original object is returned.

Usage: `set<T>(obj: ?T, key: Key, val: any): T`

```js
obj = { a: 1, b: 2, c: 3 }
obj2 = set(obj, 'b', 5)
// { a: 1, b: 5, c: 3 }
obj2 === obj
// false

// The same object is returned if there are no changes:
set(obj, 'b', 2) === obj
// true
```

#### setIn()
Returns a new object with a modified **nested** attribute.

Notes:

* If the provided value is the same as (*referentially equal to*)
the previous value, the original object is returned.
* If the path does not exist, it will be created before setting
the new value.

Usage: `setIn<T: ArrayOrObject>(obj: T, path: Array<Key>, val: any): T`

```js
obj = { a: 1, b: 2, d: { d1: 3, d2: 4 }, e: { e1: 'foo', e2: 'bar' } }
obj2 = setIn(obj, ['d', 'd1'], 4)
// { a: 1, b: 2, d: { d1: 4, d2: 4 }, e: { e1: 'foo', e2: 'bar' } }
obj2 === obj
// false
obj2.d === obj.d
// false
obj2.e === obj.e
// true

// The same object is returned if there are no changes:
obj3 = setIn(obj, ['d', 'd1'], 3)
// { a: 1, b: 2, d: { d1: 3, d2: 4 }, e: { e1: 'foo', e2: 'bar' } }
obj3 === obj
// true
obj3.d === obj.d
// true
obj3.e === obj.e
// true

// ... unknown paths create intermediate keys. Numeric segments are treated as array indices:
setIn({ a: 3 }, ['unknown', 0, 'path'], 4)
// { a: 3, unknown: [{ path: 4 }] }
```

#### update()
Returns a new object with a modified attribute,
calculated via a user-provided callback based on the current value.
If the calculated value is the same as (*referentially equal to*)
the previous value, the original object is returned.

Usage: `update<T: ArrayOrObject>(obj: T, key: Key,
fnUpdate: (prevValue: any) => any): T`

```js
obj = { a: 1, b: 2, c: 3 }
obj2 = update(obj, 'b', (val) => val + 1)
// { a: 1, b: 3, c: 3 }
obj2 === obj
// false

// The same object is returned if there are no changes:
update(obj, 'b', (val) => val) === obj
// true
```

#### updateIn()
Returns a new object with a modified **nested** attribute,
calculated via a user-provided callback based on the current value.
If the calculated value is the same as (*referentially equal to*)
the previous value, the original object is returned.

Usage: `updateIn<T: ArrayOrObject>(obj: T, path: Array<Key>,
fnUpdate: (prevValue: any) => any): T`

```js
obj = { a: 1, d: { d1: 3, d2: 4 } }
obj2 = updateIn(obj, ['d', 'd1'], (val) => val + 1)
// { a: 1, d: { d1: 4, d2: 4 } }
obj2 === obj
// false

// The same object is returned if there are no changes:
obj3 = updateIn(obj, ['d', 'd1'], (val) => val)
// { a: 1, d: { d1: 3, d2: 4 } }
obj3 === obj
// true
```

#### merge()
Returns a new object built as follows: the overlapping keys from the
second one overwrite the corresponding entries from the first one.
Similar to `Object.assign()`, but immutable.

Usage:

* `merge(obj1: Object, obj2: ?Object): Object`
* `merge(obj1: Object, ...objects: Array<?Object>): Object`

The unmodified `obj1` is returned if `obj2` does not *provide something
new to* `obj1`, i.e. if either of the following
conditions are true:

* `obj2` is `null` or `undefined`
* `obj2` is an object, but it is empty
* All attributes of `obj2` are `undefined`
* All attributes of `obj2` are referentially equal to the
  corresponding attributes of `obj1`

Note that `undefined` attributes in `obj2` do not modify the
corresponding attributes in `obj1`.

```js
obj1 = { a: 1, b: 2, c: 3 }
obj2 = { c: 4, d: 5 }
obj3 = merge(obj1, obj2)
// { a: 1, b: 2, c: 4, d: 5 }
obj3 === obj1
// false

// The same object is returned if there are no changes:
merge(obj1, { c: 3 }) === obj1
// true
```

#### mergeDeep()
Returns a new object built as follows: the overlapping keys from the
second one overwrite the corresponding entries from the first one.
If both the first and second entries are objects they are merged recursively.
Similar to `Object.assign()`, but immutable, and deeply merging.

Usage:

* `mergeDeep(obj1: Object, obj2: ?Object): Object`
* `mergeDeep(obj1: Object, ...objects: Array<?Object>): Object`

The unmodified `obj1` is returned if `obj2` does not *provide something
new to* `obj1`, i.e. if either of the following
conditions are true:

* `obj2` is `null` or `undefined`
* `obj2` is an object, but it is empty
* All attributes of `obj2` are `undefined`
* All attributes of `obj2` are referentially equal to the
  corresponding attributes of `obj1`

Note that `undefined` attributes in `obj2` do not modify the
corresponding attributes in `obj1`.

```js
obj1 = { a: 1, b: 2, c: { a: 1 } }
obj2 = { b: 3, c: { b: 2 } }
obj3 = mergeDeep(obj1, obj2)
// { a: 1, b: 3, c: { a: 1, b: 2 }  }
obj3 === obj1
// false

// The same object is returned if there are no changes:
mergeDeep(obj1, { c: { a: 1 } }) === obj1
// true
```

#### mergeIn()
Similar to `merge()`, but merging the value at a given nested path.
Note that the returned type is the same as that of the first argument.

Usage:

* `mergeIn<T: ArrayOrObject>(obj1: T, path: Array<Key>, obj2: ?Object): T`
* `mergeIn<T: ArrayOrObject>(obj1: T, path: Array<Key>,
...objects: Array<?Object>): T`

```js
obj1 = { a: 1, d: { b: { d1: 3, d2: 4 } } }
obj2 = { d3: 5 }
obj3 = mergeIn(obj1, ['d', 'b'], obj2)
// { a: 1, d: { b: { d1: 3, d2: 4, d3: 5 } } }
obj3 === obj1
// false

// The same object is returned if there are no changes:
mergeIn(obj1, ['d', 'b'], { d2: 4 }) === obj1
// true
```

#### omit()
Returns an object excluding one or several attributes.

Usage: `omit(obj: Object, attrs: Array<string>|string): Object`

```js
obj = { a: 1, b: 2, c: 3, d: 4 }
omit(obj, 'a')
// { b: 2, c: 3, d: 4 }
omit(obj, ['b', 'c'])
// { a: 1, d: 4 }

// The same object is returned if there are no changes:
omit(obj, 'z') === obj1
// true
```

#### addDefaults()
Returns a new object built as follows: `undefined` keys in the first one
are filled in with the corresponding values from the second one
(even if they are `null`).

Usage:

* `addDefaults(obj: Object, defaults: Object): Object`
* `addDefaults(obj: Object, ...defaultObjects: Array<?Object>): Object`

```js
obj1 = { a: 1, b: 2, c: 3 }
obj2 = { c: 4, d: 5, e: null }
obj3 = addDefaults(obj1, obj2)
// { a: 1, b: 2, c: 3, d: 5, e: null }
obj3 === obj1
// false

// The same object is returned if there are no changes:
addDefaults(obj1, { c: 4 }) === obj1
// true
```


## MIT license

Copyright (c) [Guillermo Grau Panea](https://github.com/guigrpa) 2016-present

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

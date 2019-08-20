# css-select [![NPM version](http://img.shields.io/npm/v/css-select.svg)](https://npmjs.org/package/css-select) [![Build Status](https://travis-ci.org/fb55/css-select.svg?branch=master)](http://travis-ci.org/fb55/css-select) [![Downloads](https://img.shields.io/npm/dm/css-select.svg)](https://npmjs.org/package/css-select) [![Coverage](https://coveralls.io/repos/fb55/css-select/badge.svg?branch=master)](https://coveralls.io/r/fb55/css-select)

a CSS selector compiler/engine

## What?

css-select turns CSS selectors into functions that tests if elements match them. When searching for elements, testing is executed "from the top", similar to how browsers execute CSS selectors.

In its default configuration, css-select queries the DOM structure of the [`domhandler`](https://github.com/fb55/domhandler) module (also known as htmlparser2 DOM).
It uses [`domutils`](https://github.com/fb55/domutils) as its default adapter over the DOM structure. See Options below for details on querying alternative DOM structures.

__Features:__

- Full implementation of CSS3 selectors
- Partial implementation of jQuery/Sizzle extensions
- Very high test coverage
- Pretty good performance

## Why?

The traditional approach of executing CSS selectors, named left-to-right execution, is to execute every component of the selector in order, from left to right _(duh)_. The execution of the selector `a b` for example will first query for `a` elements, then search these for `b` elements. (That's the approach of eg. [`Sizzle`](https://github.com/jquery/sizzle), [`nwmatcher`](https://github.com/dperini/nwmatcher/) and [`qwery`](https://github.com/ded/qwery).)

While this works, it has some downsides: Children of `a`s will be checked multiple times; first, to check if they are also `a`s, then, for every superior `a` once, if they are `b`s. Using [Big O notation](http://en.wikipedia.org/wiki/Big_O_notation), that would be `O(n^(k+1))`, where `k` is the number of descendant selectors (that's the space in the example above).

The far more efficient approach is to first look for `b` elements, then check if they have superior `a` elements: Using big O notation again, that would be `O(n)`. That's called right-to-left execution.

And that's what css-select does – and why it's quite performant.

## How does it work?

By building a stack of functions.

_Wait, what?_

Okay, so let's suppose we want to compile the selector `a b` again, for right-to-left execution. We start by _parsing_ the selector, which means we turn the selector into an array of the building-blocks of the selector, so we can distinguish them easily. That's what the [`css-what`](https://github.com/fb55/css-what) module is for, if you want to have a look.

Anyway, after parsing, we end up with an array like this one:

```js
[
  { type: 'tag', name: 'a' },
  { type: 'descendant' },
  { type: 'tag', name: 'b' }
]
```

Actually, this array is wrapped in another array, but that's another story (involving commas in selectors).

Now that we know the meaning of every part of the selector, we can compile it. That's where it becomes interesting.

The basic idea is to turn every part of the selector into a function, which takes an element as its only argument. The function checks whether a passed element matches its part of the selector: If it does, the element is passed to the next turned-into-a-function part of the selector, which does the same. If an element is accepted by all parts of the selector, it _matches_ the selector and double rainbow ALL THE WAY.

As said before, we want to do right-to-left execution with all the big O improvements nonsense, so elements are passed from the rightmost part of the selector (`b` in our example) to the leftmost (~~which would be `c`~~ of course `a`).

_//TODO: More in-depth description. Implementation details. Build a spaceship._

## API

```js
const CSSselect = require("css-select");
```

__Note:__ css-select throws errors when invalid selectors are passed to it, contrary to the behavior in browsers, which swallow them. This is done to aid with writing css selectors, but can be unexpected when processing arbitrary strings.

#### `CSSselect(query, elems, options)`

Queries `elems`, returns an array containing all matches.

- `query` can be either a CSS selector or a function.
- `elems` can be either an array of elements, or a single element. If it is an element, its children will be queried.
- `options` is described below.

Aliases: `CSSselect.selectAll(query, elems)`, `CSSselect.iterate(query, elems)`.

#### `CSSselect.compile(query)`

Compiles the query, returns a function.

#### `CSSselect.is(elem, query, options)`

Tests whether or not an element is matched by `query`. `query` can be either a CSS selector or a function.

#### `CSSselect.selectOne(query, elems, options)`

Arguments are the same as for `CSSselect(query, elems)`. Only returns the first match, or `null` if there was no match.

### Options

- `xmlMode`: When enabled, tag names will be case-sensitive. Default: `false`.
- `strict`: Limits the module to only use CSS3 selectors. Default: `false`.
- `rootFunc`: The last function in the stack, will be called with the last element that's looked at. Should return `true`.
- `adapter`: The adapter to use when interacting with the backing DOM structure. By default it uses [`domutils`](https://github.com/fb55/domutils).

#### Custom Adapters

A custom adapter must implement the following functions:

```
isTag, existsOne, getAttributeValue, getChildren, getName, getParent,
getSiblings, getText, hasAttrib, removeSubsets, findAll, findOne
```

The method signature notation used below should be fairly intuitive - if not,
see the [`rtype`](https://github.com/ericelliott/rtype) or
[`TypeScript`](https://www.typescriptlang.org/) docs, as it is very similar to
both of those. You may also want to look at
-[`domutils`](https://github.com/fb55/domutils) to see the default 
-implementation, or at 
-[`css-select-browser-adapter`](https://github.com/nrkn/css-select-browser-adapter/blob/master/index.js) 
-for an implementation backed by the DOM.

```ts
{
  // is the node a tag?
  isTag: ( node:Node ) => isTag:Boolean,

  // does at least one of passed element nodes pass the test predicate?
  existsOne: ( test:Predicate, elems:[ElementNode] ) => existsOne:Boolean,

  // get the attribute value
  getAttributeValue: ( elem:ElementNode, name:String ) => value:String,

  // get the node's children
  getChildren: ( node:Node ) => children:[Node],

  // get the name of the tag
  getName: ( elem:ElementNode ) => tagName:String,

  // get the parent of the node
  getParent: ( node:Node ) => parentNode:Node,

  /*
    get the siblings of the node. Note that unlike jQuery's `siblings` method,
    this is expected to include the current node as well
  */
  getSiblings: ( node:Node ) => siblings:[Node],

  // get the text content of the node, and its children if it has any
  getText: ( node:Node ) => text:String,

  // does the element have the named attribute?
  hasAttrib: ( elem:ElementNode, name:String ) => hasAttrib:Boolean,

  // takes an array of nodes, and removes any duplicates, as well as any nodes
  // whose ancestors are also in the array
  removeSubsets: ( nodes:[Node] ) => unique:[Node],

  // finds all of the element nodes in the array that match the test predicate,
  // as well as any of their children that match it
  findAll: ( test:Predicate, nodes:[Node] ) => elems:[ElementNode],

  // finds the first node in the array that matches the test predicate, or one
  // of its children 
  findOne: ( test:Predicate, elems:[ElementNode] ) => findOne:ElementNode,

  /*
    The adapter can also optionally include an equals method, if your DOM
    structure needs a custom equality test to compare two objects which refer
    to the same underlying node. If not provided, `css-select` will fall back to
    `a === b`.
  */
  equals: ( a:Node, b:Node ) => Boolean
}
```

## Supported selectors

_As defined by CSS 4 and / or jQuery._

* Universal (`*`)
* Tag (`<tagname>`)
* Descendant (` `)
* Child (`>`)
* Parent (`<`) *
* Sibling (`+`)
* Adjacent (`~`)
* Attribute (`[attr=foo]`), with supported comparisons:
  * `[attr]` (existential)
  * `=`
  * `~=`
  * `|=`
  * `*=`
  * `^=`
  * `$=`
  * `!=` *
  * Also, `i` can be added after the comparison to make the comparison case-insensitive (eg. `[attr=foo i]`) *
* Pseudos:
  * `:not`
  * `:contains` *
  * `:icontains` * (case-insensitive version of `:contains`)
  * `:has` *
  * `:root`
  * `:empty`
  * `:parent` *
  * `:[first|last]-child[-of-type]`
  * `:only-of-type`, `:only-child`
  * `:nth-[last-]child[-of-type]`
  * `:link`, `:visited` (the latter doesn't match any elements)
  * `:selected` *, `:checked`
  * `:enabled`, `:disabled`
  * `:required`, `:optional`
  * `:header`, `:button`, `:input`, `:text`, `:checkbox`, `:file`, `:password`, `:reset`, `:radio` etc. *
  * `:matches` *

__*__: Not part of CSS3

---

License: BSD-2-Clause

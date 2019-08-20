# figgy-pudding [![npm version](https://img.shields.io/npm/v/figgy-pudding.svg)](https://npm.im/figgy-pudding) [![license](https://img.shields.io/npm/l/figgy-pudding.svg)](https://npm.im/figgy-pudding) [![Travis](https://img.shields.io/travis/zkat/figgy-pudding.svg)](https://travis-ci.org/zkat/figgy-pudding) [![AppVeyor](https://ci.appveyor.com/api/projects/status/github/zkat/figgy-pudding?svg=true)](https://ci.appveyor.com/project/zkat/figgy-pudding) [![Coverage Status](https://coveralls.io/repos/github/zkat/figgy-pudding/badge.svg?branch=latest)](https://coveralls.io/github/zkat/figgy-pudding?branch=latest)

[`figgy-pudding`](https://github.com/zkat/figgy-pudding) is a small JavaScript
library for managing and composing cascading options objects -- hiding what
needs to be hidden from each layer, without having to do a lot of manual munging
and passing of options.

### The God Object is Dead!
### Now Bring Us Some Figgy Pudding!

## Install

`$ npm install figgy-pudding`

## Table of Contents

* [Example](#example)
* [Features](#features)
* [API](#api)
  * [`figgyPudding(spec)`](#figgy-pudding)
  * [`PuddingFactory(values)`](#pudding-factory)
    * [`opts.get()`](#opts-get)
    * [`opts.concat()`](#opts-concat)
    * [`opts.toJSON()`](#opts-to-json)
    * [`opts.forEach()`](#opts-for-each)
    * [`opts[Symbol.iterator]()`](#opts-symbol-iterator)
    * [`opts.entries()`](#opts-entries)
    * [`opts.keys()`](#opts-keys)
    * [`opts.value()`](#opts-values)

### Example

```javascript
// print-package.js
const fetch = require('./fetch.js')
const puddin = require('figgy-pudding')

const PrintOpts = puddin({
  json: { default: false }
})

async function printPkg (name, opts) {
  // Expected pattern is to call this in every interface function. If `opts` is
  // not passed in, it will automatically create an (empty) object for it.
  opts = PrintOpts(opts)
  const uri = `https://registry.npmjs.com/${name}`
  const res = await fetch(uri, opts.concat({
    // Add or override any passed-in configs and pass them down.
    log: customLogger
  }))
  // The following would throw an error, because it's not in PrintOpts:
  // console.log(opts.log)
  if (opts.json) {
    return res.json()
  } else {
    return res.text()
  }
}

console.log(await printPkg('figgy', {
  // Pass in *all* configs at the toplevel, as a regular object.
  json: true,
  cache: './tmp-cache'
}))
```

```javascript
// fetch.js
const puddin = require('figgy-pudding')

const FetchOpts = puddin({
  log: { default: require('npmlog') },
  cache: {}
})

module.exports = async function (..., opts) {
  opts = FetchOpts(opts)
}
```

### Features

* hide options from layer that didn't ask for it
* shared multi-layer options
* make sure `opts` argument is available
* transparent key access like normal keys, through a Proxy. No need for`.get()`!
* default values
* key aliases
* arbitrary key filter functions
* key/value iteration
* serialization
* 100% test coverage using `tap --100`

### API

#### <a name="figgy-pudding"></a> `> figgyPudding({ key: { default: val } | String }, [opts]) -> PuddingFactory`

Defines an Options constructor that can be used to collect only the needed
options.

An optional `default` property for specs can be used to specify default values
if nothing was passed in.

If the value for a spec is a string, it will be treated as an alias to that
other key.

##### Example

```javascript
const MyAppOpts = figgyPudding({
  lg: 'log',
  log: {
    default: () => require('npmlog')
  },
  cache: {}
})
```

#### <a name="pudding-factory"></a> `> PuddingFactory(...providers) -> FiggyPudding{}`

Instantiates an options object defined by `figgyPudding()`, which uses
`providers`, in order, to find requested properties.

Each provider can be either a plain object, a `Map`-like object (that is, one
with a `.get()` method) or another figgyPudding `Opts` object.

When nesting `Opts` objects, their properties will not become available to the
new object, but any further nested `Opts` that reference that property _will_ be
able to read from their grandparent, as long as they define that key. Default
values for nested `Opts` parents will be used, if found.

##### Example

```javascript
const ReqOpts = figgyPudding({
  follow: {}
})

const opts = ReqOpts({
  follow: true,
  log: require('npmlog')
})

opts.follow // => true
opts.log // => Error: ReqOpts does not define `log`

const MoreOpts = figgyPudding({
  log: {}
})
MoreOpts(opts).log // => npmlog object (passed in from original plain obj)
MoreOpts(opts).follow // => Error: MoreOpts does not define `follow`
```

#### <a name="opts-get"></a> `> opts.get(key) -> Value`

Gets a value from the options object.

##### Example

```js
const opts = MyOpts(config)
opts.get('foo') // value of `foo`
opts.foo // Proxy-based access through `.get()`
```

#### <a name="opts-concat"></a> `> opts.concat(...moreProviders) -> FiggyPudding{}`

Creates a new opts object of the same type as `opts` with additional providers.
Providers further to the right shadow providers to the left, with properties in
the original `opts` being shadows by the new providers.

##### Example

```js
const opts = MyOpts({x: 1})
opts.get('x') // 1
opts.concat({x: 2}).get('x') // 2
opts.get('x') // 1 (original opts object left intact)
```

#### <a name="opts-to-json"></a> `> opts.toJSON() -> Value`

Converts `opts` to a plain, JSON-stringifiable JavaScript value. Used internally
by JavaScript to get `JSON.stringify()` working.

Only keys that are readable by the current pudding type will be serialized.

##### Example

```js
const opts = MyOpts({x: 1})
opts.toJSON() // {x: 1}
JSON.stringify(opts) // '{"x":1}'
```

#### <a name="opts-for-each"></a> `> opts.forEach((value, key, opts) => {}, thisArg) -> undefined`

Iterates over the values of `opts`, limited to the keys readable by the current
pudding type. `thisArg` will be used to set the `this` argument when calling the
`fn`.

##### Example

```js
const opts = MyOpts({x: 1, y: 2})
opts.forEach((value, key) => console.log(key, '=', value))
```

#### <a name="opts-entries"></a> `> opts.entries() -> Iterator<[[key, value], ...]>`

Returns an iterator that iterates over the keys and values in `opts`, limited to
the keys readable by the current pudding type. Each iteration returns an array
of `[key, value]`.

##### Example

```js
const opts = MyOpts({x: 1, y: 2})
[...opts({x: 1, y: 2}).entries()] // [['x', 1], ['y', 2]]
```

#### <a name="opts-symbol-iterator"></a> `> opts[Symbol.iterator]() -> Iterator<[[key, value], ...]>`

Returns an iterator that iterates over the keys and values in `opts`, limited to
the keys readable by the current pudding type. Each iteration returns an array
of `[key, value]`. Makes puddings work natively with JS iteration mechanisms.

##### Example

```js
const opts = MyOpts({x: 1, y: 2})
[...opts({x: 1, y: 2})] // [['x', 1], ['y', 2]]
for (let [key, value] of opts({x: 1, y: 2})) {
  console.log(key, '=', value)
}
```

#### <a name="opts-keys"></a> `> opts.keys() -> Iterator<[key, ...]>`

Returns an iterator that iterates over the keys in `opts`, limited to the keys
readable by the current pudding type.

##### Example

```js
const opts = MyOpts({x: 1, y: 2})
[...opts({x: 1, y: 2}).keys()] // ['x', 'y']
```

#### <a name="opts-values"></a> `> opts.values() -> Iterator<[value, ...]>`

Returns an iterator that iterates over the values in `opts`, limited to the keys
readable by the current pudding type.

##### Example
'
```js
const opts = MyOpts({x: 1, y: 2})
[...opts({x: 1, y: 2}).values()] // [1, 2]
```

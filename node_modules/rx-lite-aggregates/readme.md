# RxJS Aggregates Module #

The Reactive Extensions for JavaScript has a number of aggregation operators including those you might already know from the Array#extras and the upcoming ES6 standard such as `reduce`, `find` and `findIndex`.  This module is used exclusively for aggregation operations used on finite observable sequences.  In addition to the aforementioned operators, there are many useful operators such as `count`, `sum`, `average` and determining whether two sequences are equal via the `sequenceEqual` method.  This requires `rx.lite.js` from the [`rx-lite`](https://www.npmjs.com/package/rx-lite) NPM module.

## Getting Started

There are a number of ways to get started with RxJS.

### Installing with [NPM](https://npmjs.org/)

```bash`
$ npm install rx-lite-aggregates
$ npm install -g rx-lite-aggregates
```

### Using with Node.js and Ringo.js

```js
var Rx = require('rx-lite-aggregates');
```

### In a Browser:

```html
<!-- Just the core RxJS -->
<script src="path/to/rx.lite.js"></script>
<script src="path/to/rx.lite.aggregates.js"></script>
```

## Included Observable Operators ##

### `Observable Instance Methods`
- [`aggregate`](../../doc/api/core/operators/reduce.md)
- [`all`](../../doc/api/core/operators/every.md)
- [`any`](../../doc/api/core/operators/some.md)
- [`average`](../../doc/api/core/operators/average.md)
- [`includes`](../../doc/api/core/operators/includes.md)
- [`count`](../../doc/api/core/operators/count.md)
- [`elementAt`](../../doc/api/core/operators/elementat.md)
- [`elementAtOrDefault`](../../doc/api/core/operators/elementatordefault.md)
- [`every`](../../doc/api/core/operators/every.md)
- [`find`](../../doc/api/core/operators/find.md)
- [`findIndex`](../../doc/api/core/operators/findindex.md)
- [`first`](../../doc/api/core/operators/first.md)
- [`firstOrDefault`](../../doc/api/core/operators/firstordefault.md)
- [`indexOf`](../../doc/api/core/operators/indexof.md)
- [`isEmpty`](../../doc/api/core/operators/isempty.md)
- [`last`](../../doc/api/core/operators/last.md)
- [`lastOrDefault`](../../doc/api/core/operators/lastordefault.md)
- [`max`](../../doc/api/core/operators/max.md)
- [`maxBy`](../../doc/api/core/operators/maxby.md)
- [`min`](../../doc/api/core/operators/min.md)
- [`minBy`](../../doc/api/core/operators/minby.md)
- [`reduce`](../../doc/api/core/operators/reduce.md)
- [`sequenceEqual`](../../doc/api/core/operators/sequenceequal.md)
- [`single`](../../doc/api/core/operators/single.md)
- [`singleOrDefault`](../../doc/api/core/operators/singleordefault.md)
- [`some`](../../doc/api/core/operators/some.md)
- [`sum`](../../doc/api/core/operators/sum.md)
- [`toMap`](../../doc/api/core/operators/tomap.md)
- [`toSet`](../../doc/api/core/operators/toset.md)

## Contributing ##

There are lots of ways to contribute to the project, and we appreciate our [contributors](https://github.com/Reactive-Extensions/RxJS/wiki/Contributors).  If you wish to contribute, check out our [style guide]((https://github.com/Reactive-Extensions/RxJS/tree/master/doc/contributing)).

You can contribute by reviewing and sending feedback on code checkins, suggesting and trying out new features as they are implemented, submit bugs and help us verify fixes as they are checked in, as well as submit code fixes or code contributions of your own. Note that all code submissions will be rigorously reviewed and tested by the Rx Team, and only those that meet an extremely high bar for both quality and design/roadmap appropriateness will be merged into the source.

## License ##

Copyright (c) Microsoft Open Technologies, Inc.  All rights reserved.
Microsoft Open Technologies would like to thank its contributors, a list
of whom are at https://github.com/Reactive-Extensions/RxJS/wiki/Contributors.

Licensed under the Apache License, Version 2.0 (the "License"); you
may not use this file except in compliance with the License. You may
obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
implied. See the License for the specific language governing permissions
and limitations under the License.

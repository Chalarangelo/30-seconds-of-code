# front-matter
[![build][build-img]][build-url]
[![coverage][coverage-img]][coverage-url]
[![npm][npm-img]][npm-url]
[![github][github-img]][github-url]

[![Sauce Test Status](https://saucelabs.com/browser-matrix/front-matter.svg)](https://saucelabs.com/u/front-matter)

> Extract meta data (front-matter) from documents.

This modules does not do any IO (file loading or reading), only extracting and
parsing front matter from strings.

This concept that was originally introduced to me through the [jekyll][jekyll] blogging system and is pretty useful where you want to be able to easily add meta-data to content without the need for a database. YAML is extracted from the the top of a file between matching separators of "---" or "= yaml =". It will also extract YAML between a separator and "...".

<!-- This is part of a long running project I have been working on where I am splitting out internals of [haiku][haiku] into to separate, more useful and shareable modules. If your in need of a static site generator [check it out][haiku]. -->

# Install

With [npm][npm] do:

    npm install front-matter

# Example

So you have a file `example.md`:

```yaml
---
title: Just hack'n
description: Nothing to see here
---

This is some text about some stuff that happened sometime ago
```

**NOTE:** As of `front-matter@2.0.0` valid front matter is considered to have
the starting separator on the first line.

Then you can do this:

```javascript
var fs = require('fs')
  , fm = require('front-matter')

fs.readFile('./example.md', 'utf8', function(err, data){
  if (err) throw err

  var content = fm(data)

  console.log(content)
})
```

And end up with an object like this:

```javascript
{
    attributes: {
        title: 'Just hack\'n',
        description: 'Nothing to see here'
    },
    body: '\nThis is some text about some stuff that happened sometime ago',
    frontmatter: 'title: Just hack\'n\ndescription: Nothing to see here'
}
```

# Methods

```javascript
var fm = require('front-matter')
```

## fm(string)

Return a `content` object with two properties:

* `content.attributes` contains the extracted yaml attributes in json form
* `content.body` contains the string contents below the yaml separators
* `content.frontmatter` contains the original yaml string contents

# fm.test(string)

Check if a string contains a front matter header of "---" or "= yaml =". Primarily used internally but is useful outside of the module.

Returns `true` or `false`

```javascript
    fm.test(string) #=> true || false
```

# Contributing

front-matter is an OPEN Source Project so please help out by [reporting bugs](http://github.com/jxson/front-matter/issues) or [forking and opening pull](https://github.com/jxson/front-matter) requests when possible.

![standard][standard-img]

All code is linted/formatted using [standard][standard-url] style, any non-conforming code can be automatically formatted using the the fmt make task: `make fmt`.

## Maintainers

- [Adrian Gimenez](https://github.com/axdg)
- [Jason Campbell](https://github.com/jxson) - [@jxson](https://twitter.com/jxson)

## Contributors

This module is awesome because of all the folks who submitted pull requests:

- [Jordan Santell](https://github.com/jsantell) - [@jsantell](https://twitter.com/jsantell)
- [Jean-Philippe Monette](https://github.com/jpmonette) - [@jpmonette](https://twitter.com/jpmonette)
- [Kai Davenport](https://github.com/binocarlos)
- [Marc-André Arseneault](https://github.com/arsnl) - [@im_arsnl](https://twitter.com/im_arsnl)
- [Bret Comnes](https://github.com/bcomnes) - http://bret.io
- [Shinnosuke Watanabe](https://github.com/shinnn)
- [Matt Dickens](https://github.com/mpd106)
- [Rod Knowlton](https://github.com/codelahoma)
- [Rich DeLauder](https://github.com/FMJaguar)
- [Sean Lang](https://github.com/slang800) - http://slang.cx
- [Benjamin Tan](https://github.com/d10) - https://d10.github.io/
- [Kenneth Lim](https://github.com/kenlimmj) - https://kenlimmj.com
- [Cameron Moy](https://github.com/camoy)
- [Fernando Montoya](https://github.com/montogeek) - https://montogeek.com
- [Martin Heidegger](https://github.com/martinheidegger)
- [Leo Liang](https://github.com/aleung)
- [Kasper Pedersen](https://github.com/kasperpedersen)

# CHANGELOG

## 3.0.0
* CI only tests Node versions >= v6 (drops v4, and v5)
*

# LICENSE (MIT)

Copyright (c) Jason Campbell ("Author")

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


[yaml]: http://en.wikipedia.org/wiki/YAML
[haiku]: http://haiku.io
[npm]: http://npmjs.org
[jekyll]: https://github.com/mojombo/jekyll
[coverage-img]: https://img.shields.io/coveralls/jxson/front-matter.svg
[coverage-url]: https://coveralls.io/r/jxson/front-matter?branch=master
[build-img]: https://img.shields.io/travis/jxson/front-matter/master.svg
[build-url]: http://travis-ci.org/jxson/front-matter
[npm-img]: https://img.shields.io/npm/dm/front-matter.svg
[npm-url]: https://npmjs.org/package/standard
[github-img]: https://img.shields.io/github/stars/jxson/front-matter.svg?style=social&label=Star
[github-url]: https://github.com/jxson/front-matter/
[standard-img]: https://cdn.rawgit.com/feross/standard/master/badge.svg
[standard-url]: http://npmjs.com/package/standard

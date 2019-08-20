# parse-headers[![build status](https://secure.travis-ci.org/kesla/parse-headers.svg)](http://travis-ci.org/kesla/parse-headers)

Parse http headers, works with browserify/xhr

[![NPM](https://nodei.co/npm/parse-headers.png?downloads&stars)](https://nodei.co/npm/parse-headers/)

[![NPM](https://nodei.co/npm-dl/parse-headers.png)](https://nodei.co/npm/parse-headers/)

[![Sauce Test Status](https://saucelabs.com/browser-matrix/kesla-xhr-headers.svg)](https://saucelabs.com/u/kesla-xhr-headers)

## Installation

```
npm install parse-headers
```

## Example

### Input

```javascript
var parse = require('./parse-headers')

  , headers = [
        'Date: Sun, 17 Aug 2014 16:24:52 GMT'
      , 'Content-Type: text/html; charset=utf-8'
      , 'Transfer-Encoding: chunked'
      , 'X-Custom-Header: beep'
      , 'X-Custom-Header: boop'
    ].join('\n')

console.log(parse(headers))
```

### Output

```
{ date: 'Sun, 17 Aug 2014 16:24:52 GMT',
  'content-type': 'text/html; charset=utf-8',
  'transfer-encoding': 'chunked',
  'x-custom-header': [ 'beep', 'boop' ] }
```

## Kudos

Looked at https://github.com/watson/http-headers before creating this.

## Licence

Copyright (c) 2014 David Björklund

This software is released under the MIT license:

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

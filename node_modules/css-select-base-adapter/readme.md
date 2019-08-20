# css-select-base-adapter

Provides some base functions needed by a 
[`css-select`](https://github.com/fb55/css-select) adapter so that you don't
have to implement the whole thing.

## usage

`npm install css-select-base-adapter --save`

```javascript
var baseAdapter = require('css-select-base-adapter');

var myAdapter = {
  // your partial implementation here
};

// get an adapter with everything needed by css-select
var adapter = baseAdapter(myAdapter);

// use adapter with css-select...
```

## how it works

An adapter for `css-select` requires the following functions to be implemented:

```
isTag, existsOne, getAttributeValue, getChildren, getName, getParent,
getSiblings, getText, hasAttrib, removeSubsets, findAll, findOne
```

You can pass this module a more minimal implementation and it will return a full 
adapter that fills in any missing functions, provided that you implement at 
least:  

```
isTag, getAttributeValue, getChildren, getName, getParent, getText
```

If you provide any of the other methods required of an adapter, the base adapter 
will use your implementation instead of its own.

See the 
[`css-select` readme](https://github.com/fb55/css-select/blob/master/README.md)
for more information on the required function signatures.

## license

MIT License

Copyright (c) 2018 Nik Coughlin

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
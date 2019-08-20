
# trim

  Trims string whitespace.

## Installation

```
$ npm install trim
$ component install component/trim
```

## API

   - [trim(str)](#trimstr)
   - [.left(str)](#leftstr)
   - [.right(str)](#rightstr)
<a name="" />
 
<a name="trimstr" />
### trim(str)
should trim leading / trailing whitespace.

```js
trim('  foo bar  ').should.equal('foo bar');
trim('\n\n\nfoo bar\n\r\n\n').should.equal('foo bar');
```

<a name="leftstr" />
### .left(str)
should trim leading whitespace.

```js
trim.left('  foo bar  ').should.equal('foo bar  ');
```

<a name="rightstr" />
### .right(str)
should trim trailing whitespace.

```js
trim.right('  foo bar  ').should.equal('  foo bar');
```


## License 

(The MIT License)

Copyright (c) 2012 TJ Holowaychuk &lt;tj@vision-media.ca&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
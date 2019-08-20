# seek-bzip

[![Build Status][1]][2] [![dependency status][3]][4] [![dev dependency status][5]][6]

`seek-bzip` is a pure-javascript Node.JS module adapted from [node-bzip](https://github.com/skeggse/node-bzip) and before that [antimatter15's pure-javascript bzip2 decoder](https://github.com/antimatter15/bzip2.js).  Like these projects, `seek-bzip` only does decompression (see [compressjs](https://github.com/cscott/compressjs) if you need compression code).  Unlike those other projects, `seek-bzip` can seek to and decode single blocks from the bzip2 file.

`seek-bzip` primarily decodes buffers into other buffers, synchronously.
With the help of the [fibers](https://github.com/laverdet/node-fibers)
package, it can operate on node streams; see `test/stream.js` for an
example.

## How to Install

```
npm install seek-bzip
```

This package uses
[Typed Arrays](https://developer.mozilla.org/en-US/docs/JavaScript/Typed_arrays), which are present in node.js >= 0.5.5.

## Usage

After compressing some example data into `example.bz2`, the following will recreate that original data and save it to `example`:

```
var Bunzip = require('seek-bzip');
var fs = require('fs');

var compressedData = fs.readFileSync('example.bz2');
var data = Bunzip.decode(compressedData);

fs.writeFileSync('example', data);
```

See the tests in the `tests/` directory for further usage examples.

For uncompressing single blocks of bzip2-compressed data, you will need
an out-of-band index listing the start of each bzip2 block.  (Presumably
you generate this at the same time as you index the start of the information
you wish to seek to inside the compressed file.)  The `seek-bzip` module
has been designed to be compatible with the C implementation `seek-bzip2`
available from https://bitbucket.org/james_taylor/seek-bzip2.  That codebase
contains a `bzip-table` tool which will generate bzip2 block start indices.
There is also a pure-JavaScript `seek-bzip-table` tool in this package's
`bin` directory.

## Documentation

`require('seek-bzip')` returns a `Bunzip` object.  It contains three static
methods.  The first is a function accepting one or two parameters:

`Bunzip.decode = function(input, [Number expectedSize] or [output], [boolean multistream])`

The `input` argument can be a "stream" object (which must implement the
`readByte` method), or a `Buffer`.

If `expectedSize` is not present, `decodeBzip` simply decodes `input` and
returns the resulting `Buffer`.

If `expectedSize` is present (and numeric), `decodeBzip` will store
the results in a `Buffer` of length `expectedSize`, and throw an error
in the case that the size of the decoded data does not match
`expectedSize`.

If you pass a non-numeric second parameter, it can either be a `Buffer`
object (which must be of the correct length; an error will be thrown if
the size of the decoded data does not match the buffer length) or
a "stream" object (which must implement a `writeByte` method).

The optional third `multistream` parameter, if true, attempts to continue
reading past the end of the bzip2 file.  This supports "multistream"
bzip2 files, which are simply multiple bzip2 files concatenated together.
If this argument is true, the input stream must have an `eof` method
which returns true when the end of the input has been reached.

The second exported method is a function accepting two or three parameters:

`Bunzip.decodeBlock = function(input, Number blockStartBits, [Number expectedSize] or [output])`

The `input` and `expectedSize`/`output` parameters are as above.
The `blockStartBits` parameter gives the start of the desired block, in bits.

If passing a stream as the `input` parameter, it must implement the
`seek` method.

The final exported method is a function accepting two or three parameters:

`Bunzip.table = function(input, Function callback, [boolean multistream])`

The `input` and `multistream` parameters are identical to those for the
`decode` method.

This function will invoke `callback(position, size)` once per bzip2 block,
where `position` gives the starting position of the block (in *bits*), and
`size` gives the uncompressed size of the block (in bytes).

This can be used to construct an index allowing direct access to a particular
block inside a bzip2 file, using the `decodeBlock` method.

## Command-line
There are binaries available in bin.  The first generates an index of all
the blocks in a bzip2-compressed file:
```
$ bin/seek-bzip-table test/sample4.bz2
32	99981
320555	99981
606348	99981
847568	99981
1089094	99981
1343625	99981
1596228	99981
1843336	99981
2090919	99981
2342106	39019
$
```
The first field is the starting position of the block, in bits, and the
second field is the length of the block, in bytes.

The second binary decodes an arbitrary block of a bzip2 file:
```
$ bin/seek-bunzip -d -b 2342106 test/sample4.bz2 | tail
élan's
émigré
émigré's
émigrés
épée
épée's
épées
étude
étude's
études
$
```

Use `--help` to see other options.

## Help wanted

Improvements to this module would be generally useful.
Feel free to fork on github and submit pull requests!

## Related projects

* https://github.com/skeggse/node-bzip node-bzip (original upstream source)
* https://github.com/cscott/compressjs
  Lots of compression/decompression algorithms from the same author as this
  module, including bzip2 compression code.
* https://github.com/cscott/lzjb fast LZJB compression/decompression

## License

#### MIT License

> Copyright &copy; 2013-2015 C. Scott Ananian
>
> Copyright &copy; 2012-2015 Eli Skeggs
>
> Copyright &copy; 2011 Kevin Kwok
>
> Permission is hereby granted, free of charge, to any person obtaining
> a copy of this software and associated documentation files (the
> "Software"), to deal in the Software without restriction, including
> without limitation the rights to use, copy, modify, merge, publish,
> distribute, sublicense, and/or sell copies of the Software, and to
> permit persons to whom the Software is furnished to do so, subject to
> the following conditions:
>
> The above copyright notice and this permission notice shall be
> included in all copies or substantial portions of the Software.
>
> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
> EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
> MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
> NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
> LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
> OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
> WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

[1]: https://travis-ci.org/cscott/seek-bzip.png
[2]: https://travis-ci.org/cscott/seek-bzip
[3]: https://david-dm.org/cscott/seek-bzip.png
[4]: https://david-dm.org/cscott/seek-bzip
[5]: https://david-dm.org/cscott/seek-bzip/dev-status.png
[6]: https://david-dm.org/cscott/seek-bzip#info=devDependencies

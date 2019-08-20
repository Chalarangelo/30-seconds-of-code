# block-stream

A stream of blocks.

Write data into it, and it'll output data in buffer blocks the size you
specify, padding with zeroes if necessary.

```javascript
var block = new BlockStream(512)
fs.createReadStream("some-file").pipe(block)
block.pipe(fs.createWriteStream("block-file"))
```

When `.end()` or `.flush()` is called, it'll pad the block with zeroes.

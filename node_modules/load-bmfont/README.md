# load-bmfont

[![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

Loads an [AngelCode BMFont](http://www.angelcode.com/products/bmfont/) file in browser (with XHR) and node (with fs and [phin](https://github.com/ethanent/phin)), returning a [JSON representation](json-spec.md).

```js
var load = require('load-bmfont')

load('fonts/Arial-32.fnt', function(err, font) {
  if (err)
    throw err
  
  //The BMFont spec in JSON form
  console.log(font.common.lineHeight)
  console.log(font.info)
  console.log(font.chars)
  console.log(font.kernings)
})
```

Currently supported BMFont formats:

- ASCII (text)
- JSON
- XML
- binary

## See Also

See [text-modules](https://github.com/mattdesl/text-modules) for related modules.

## Usage

[![NPM](https://nodei.co/npm/load-bmfont.png)](https://www.npmjs.com/package/load-bmfont)

#### `load(opt, cb)`

Loads a BMFont file with the `opt` settings and fires the callback with `(err, font)` params once finished. If `opt` is a string, it is used as the URI. Otherwise the options can be:

- `uri` or `url` the path (in Node) or URI
- `binary` boolean, whether the data should be read as binary, default false
- (in node) options for `fs.readFile` or `phin`
- (in browser) options for [xhr](https://github.com/Raynos/xhr)

To support binary files in the browser and Node, you should use `binary: true`. Otherwise the XHR request might come in the form of a UTF8 string, which will not work with binary files. This also sets up the XHR object to override mime type in older browsers.

```js
load({ 
  uri: 'fonts/Arial.bin', 
  binary: true
}, function(err, font) {
  console.log(font)
})
```

## License

MIT, see [LICENSE.md](http://github.com/Jam3/load-bmfont/blob/master/LICENSE.md) for details.

# raw loader for webpack

## Usage

``` javascript
var fileContent = require("raw!./file.txt");
// => returns file.txt content as string
```

Don't forget to polyfill `require` if you want to use it in node.
See `webpack` documentation.

## License

MIT (http://www.opensource.org/licenses/mit-license.php)
# cssesc [![Build status](https://travis-ci.org/mathiasbynens/cssesc.png?branch=master)](https://travis-ci.org/mathiasbynens/cssesc) [![Dependency status](https://gemnasium.com/mathiasbynens/cssesc.png)](https://gemnasium.com/mathiasbynens/cssesc)

A JavaScript library for escaping CSS strings and identifiers while generating the shortest possible ASCII-only output.

This is a JavaScript library for [escaping text for use in CSS strings or identifiers](http://mathiasbynens.be/notes/css-escapes) while generating the shortest possible valid ASCII-only output. [Here’s an online demo.](http://mothereff.in/css-escapes)

Feel free to fork if you see possible improvements!

## Installation

Via [Bower](http://bower.io/):

```bash
bower install cssesc
```

Via [Component](https://github.com/component/component):

```bash
component install mathiasbynens/cssesc
```

Via [npm](http://npmjs.org/):

```bash
npm install cssesc
```

In a browser:

```html
<script src="cssesc.js"></script>
```

In [Node.js](http://nodejs.org/) and [RingoJS](http://ringojs.org/):

```js
var cssesc = require('cssesc');
```

In [Narwhal](http://narwhaljs.org/):

```js
var cssesc = require('cssesc').cssesc;
```

In [Rhino](http://www.mozilla.org/rhino/):

```js
load('cssesc.js');
```

Using an AMD loader like [RequireJS](http://requirejs.org/):

```js
require(
  {
    'paths': {
      'cssesc': 'path/to/cssesc'
    }
  },
  ['cssesc'],
  function(cssesc) {
    console.log(cssesc);
  }
);
```

## API

### `cssesc(value, options)`

This function takes a value and returns an escaped version of the value where any characters that are not printable ASCII symbols are escaped using the shortest possible (but valid) [escape sequences for use in CSS strings or identifiers](http://mathiasbynens.be/notes/css-escapes).

```js
cssesc('Ich ♥ Bücher');
// → 'Ich \\2665  B\\FC cher'

cssesc('foo 𝌆 bar');
// → 'foo \\1D306  bar'
```

By default, `cssesc` returns a string that can be used as part of a CSS string. If the target is a CSS identifier rather than a CSS string, use the `isIdentifier: true` setting (see below).

The optional `options` argument accepts an object with the following options:

#### `isIdentifier`

The default value for the `isIdentifier` option is `false`. This means that the input text will be escaped for use in a CSS string literal. If you want to use the result as a CSS identifier instead (in a selector, for example), set this option to `true`.

```js
cssesc('123a2b');
// → '123a2b'

cssesc('123a2b', {
  'isIdentifier': true
});
// → '\\31 23a2b'
```

#### `quotes`

The default value for the `quotes` option is `'single'`. This means that any occurences of `'` in the input text will be escaped as `\'`, so that the output can be used in a CSS string literal wrapped in single quotes.

```js
cssesc('Lorem ipsum "dolor" sit \'amet\' etc.');
// → 'Lorem ipsum "dolor" sit \\\'amet\\\' etc.'
// → "Lorem ipsum \"dolor\" sit \\'amet\\' etc."

cssesc('Lorem ipsum "dolor" sit \'amet\' etc.', {
  'quotes': 'single'
});
// → 'Lorem ipsum "dolor" sit \\\'amet\\\' etc.'
// → "Lorem ipsum \"dolor\" sit \\'amet\\' etc."
```

If you want to use the output as part of a CSS string literal wrapped in double quotes, set the `quotes` option to `'double'`.

```js
cssesc('Lorem ipsum "dolor" sit \'amet\' etc.', {
  'quotes': 'double'
});
// → 'Lorem ipsum \\"dolor\\" sit \'amet\' etc.'
// → "Lorem ipsum \\\"dolor\\\" sit 'amet' etc."
```

#### `wrap`

The `wrap` option takes a boolean value (`true` or `false`), and defaults to `false` (disabled). When enabled, the output will be a valid CSS string literal wrapped in quotes. The type of quotes can be specified through the `quotes` setting.

```js
cssesc('Lorem ipsum "dolor" sit \'amet\' etc.', {
  'quotes': 'single',
  'wrap': true
});
// → '\'Lorem ipsum "dolor" sit \\\'amet\\\' etc.\''
// → "\'Lorem ipsum \"dolor\" sit \\\'amet\\\' etc.\'"

cssesc('Lorem ipsum "dolor" sit \'amet\' etc.', {
  'quotes': 'double',
  'wrap': true
});
// → '"Lorem ipsum \\"dolor\\" sit \'amet\' etc."'
// → "\"Lorem ipsum \\\"dolor\\\" sit \'amet\' etc.\""
```

#### `escapeEverything`

The `escapeEverything` option takes a boolean value (`true` or `false`), and defaults to `false` (disabled). When enabled, all the symbols in the output will be escaped, even printable ASCII symbols.

```js
cssesc('lolwat"foo\'bar', {
  'escapeEverything': true
});
// → '\\6C\\6F\\6C\\77\\61\\74\\"\\66\\6F\\6F\\\'\\62\\61\\72'
// → "\\6C\\6F\\6C\\77\\61\\74\\\"\\66\\6F\\6F\\'\\62\\61\\72"
```

### `cssesc.version`

A string representing the semantic version number.

### Using the `cssesc` binary

To use the `cssesc` binary in your shell, simply install cssesc globally using npm:

```bash
npm install -g cssesc
```

After that you will be able to escape text for use in CSS strings or identifiers from the command line:

```bash
$ cssesc 'föo ♥ bår 𝌆 baz'
f\F6o \2665  b\E5r \1D306  baz
```

If the output needs to be a CSS identifier rather than part of a string literal, use the `-i`/`--identifier` option:

```bash
$ cssesc --identifier 'föo ♥ bår 𝌆 baz'
f\F6o\ \2665\ b\E5r\ \1D306\ baz
```

See `cssesc --help` for the full list of options.

## Support

This library has been tested in at least Chrome 28-30, Firefox 3-23, Safari 4-6, Opera 10-15, IE 6-10, Node.js v0.10.0, Narwhal 0.3.2, RingoJS 0.8-0.9, PhantomJS 1.9.0, and Rhino 1.7RC4.

## Unit tests & code coverage

After cloning this repository, run `npm install` to install the dependencies needed for development and testing. You may want to install Istanbul _globally_ using `npm install istanbul -g`.

Once that’s done, you can run the unit tests in Node using `npm test` or `node tests/tests.js`. To run the tests in Rhino, Ringo, Narwhal, and web browsers as well, use `grunt test`.

To generate [the code coverage report](http://rawgithub.com/mathiasbynens/cssesc/master/coverage/cssesc/cssesc.js.html), use `grunt cover`.

## Author

| [![twitter/mathias](http://gravatar.com/avatar/24e08a9ea84deb17ae121074d0f17125?s=70)](http://twitter.com/mathias "Follow @mathias on Twitter") |
|---|
| [Mathias Bynens](http://mathiasbynens.be/) |

## License

This library is available under the [MIT](http://mths.be/mit) license.

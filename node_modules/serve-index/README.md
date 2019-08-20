# serve-index

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![Linux Build][travis-image]][travis-url]
[![Windows Build][appveyor-image]][appveyor-url]
[![Test Coverage][coveralls-image]][coveralls-url]
[![Gratipay][gratipay-image]][gratipay-url]

  Serves pages that contain directory listings for a given path.

## Install

This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/). Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```sh
$ npm install serve-index
```

## API

```js
var serveIndex = require('serve-index')
```

### serveIndex(path, options)

Returns middlware that serves an index of the directory in the given `path`.

The `path` is based off the `req.url` value, so a `req.url` of `'/some/dir`
with a `path` of `'public'` will look at `'public/some/dir'`. If you are using
something like `express`, you can change the URL "base" with `app.use` (see
the express example).

#### Options

Serve index accepts these properties in the options object.

##### filter

Apply this filter function to files. Defaults to `false`. The `filter` function
is called for each file, with the signature `filter(filename, index, files, dir)`
where `filename` is the name of the file, `index` is the array index, `files` is
the array of files and `dir` is the absolute path the file is located (and thus,
the directory the listing is for).

##### hidden

Display hidden (dot) files. Defaults to `false`.

##### icons

Display icons. Defaults to `false`.

##### stylesheet

Optional path to a CSS stylesheet. Defaults to a built-in stylesheet.

##### template

Optional path to an HTML template or a function that will render a HTML
string. Defaults to a built-in template.

When given a string, the string is used as a file path to load and then the
following tokens are replaced in templates:

  * `{directory}` with the name of the directory.
  * `{files}` with the HTML of an unordered list of file links.
  * `{linked-path}` with the HTML of a link to the directory.
  * `{style}` with the specified stylesheet and embedded images.

When given as a function, the function is called as `template(locals, callback)`
and it needs to invoke `callback(error, htmlString)`. The following are the
provided locals:

  * `directory` is the directory being displayed (where `/` is the root).
  * `displayIcons` is a Boolean for if icons should be rendered or not.
  * `fileList` is a sorted array of files in the directory. The array contains
    objects with the following properties:
    - `name` is the relative name for the file.
    - `stat` is a `fs.Stats` object for the file.
  * `path` is the full filesystem path to `directory`.
  * `style` is the default stylesheet or the contents of the `stylesheet` option.
  * `viewName` is the view name provided by the `view` option.

##### view

Display mode. `tiles` and `details` are available. Defaults to `tiles`.

## Examples

### Serve directory indexes with vanilla node.js http server

```js
var finalhandler = require('finalhandler')
var http = require('http')
var serveIndex = require('serve-index')
var serveStatic = require('serve-static')

// Serve directory indexes for public/ftp folder (with icons)
var index = serveIndex('public/ftp', {'icons': true})

// Serve up public/ftp folder files
var serve = serveStatic('public/ftp')

// Create server
var server = http.createServer(function onRequest(req, res){
  var done = finalhandler(req, res)
  serve(req, res, function onNext(err) {
    if (err) return done(err)
    index(req, res, done)
  })
})

// Listen
server.listen(3000)
```

### Serve directory indexes with express

```js
var express    = require('express')
var serveIndex = require('serve-index')

var app = express()

// Serve URLs like /ftp/thing as public/ftp/thing
// The express.static serves the file contents
// The serveIndex is this module serving the directory
app.use('/ftp', express.static('public/ftp'), serveIndex('public/ftp', {'icons': true}))

// Listen
app.listen(3000)
```

## License

[MIT](LICENSE). The [Silk](http://www.famfamfam.com/lab/icons/silk/) icons
are created by/copyright of [FAMFAMFAM](http://www.famfamfam.com/).

[npm-image]: https://img.shields.io/npm/v/serve-index.svg
[npm-url]: https://npmjs.org/package/serve-index
[travis-image]: https://img.shields.io/travis/expressjs/serve-index/master.svg?label=linux
[travis-url]: https://travis-ci.org/expressjs/serve-index
[appveyor-image]: https://img.shields.io/appveyor/ci/dougwilson/serve-index/master.svg?label=windows
[appveyor-url]: https://ci.appveyor.com/project/dougwilson/serve-index
[coveralls-image]: https://img.shields.io/coveralls/expressjs/serve-index/master.svg
[coveralls-url]: https://coveralls.io/r/expressjs/serve-index?branch=master
[downloads-image]: https://img.shields.io/npm/dm/serve-index.svg
[downloads-url]: https://npmjs.org/package/serve-index
[gratipay-image]: https://img.shields.io/gratipay/dougwilson.svg
[gratipay-url]: https://www.gratipay.com/dougwilson/

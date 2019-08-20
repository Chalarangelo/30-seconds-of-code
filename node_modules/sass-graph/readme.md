# Sass Graph

Parses Sass files in a directory and exposes a graph of dependencies

[![Build Status](https://travis-ci.org/xzyfer/sass-graph.svg?branch=master)](https://travis-ci.org/xzyfer/sass-graph)
[![Coverage Status](https://coveralls.io/repos/github/xzyfer/sass-graph/badge.svg?branch=master)](https://coveralls.io/github/xzyfer/sass-graph?branch=master)
[![npm version](https://badge.fury.io/js/sass-graph.svg)](http://badge.fury.io/js/sass-graph)
[![Dependency Status](https://david-dm.org/xzyfer/sass-graph.svg?theme=shields.io)](https://david-dm.org/xzyfer/sass-graph)
[![devDependency Status](https://david-dm.org/xzyfer/sass-graph/dev-status.svg?theme=shields.io)](https://david-dm.org/xzyfer/sass-graph#info=devDependencies)

## Install

Install with [npm](https://npmjs.org/package/sass-graph)

```
npm install --save-dev sass-graph
```

## Usage

Usage as a Node library:

```js
var sassGraph = require('./sass-graph');
```

Usage as a command line tool:

The command line tool will parse a graph and then either display ancestors, descendents or both.

```
$ ./bin/sassgraph --help
Usage: bin/sassgraph <command> [options] <dir> [file]

Commands:
  ancestors    Output the ancestors
  descendents  Output the descendents

Options:
  -I, --load-path   Add directories to the sass load path
  -e, --extensions  File extensions to include in the graph
  -j, --json        Output the index in json
  -h, --help        Show help
  -v, --version     Show version number

Examples:
  ./bin/sassgraph descendents test/fixtures test/fixtures/a.scss
  /path/to/test/fixtures/b.scss
  /path/to/test/fixtures/_c.scss
```

## API

#### parseDir

Parses a directory and builds a dependency graph of all requested file extensions.

#### parseFile

Parses a file and builds its dependency graph.

## Options

#### loadPaths

Type: `Array`
Default: `[process.cwd]`

Directories to use when resolved `@import` directives.

#### extensions

Type: `Array`
Default: `['scss', 'css', 'sass']`

File types to be parsed.

#### follow

Type: `Boolean`
Default: `false`

Follow symbolic links.

## Example

```js
var sassGraph = require('./sass-graph');
console.log(sassGraph.parseDir('test/fixtures'));

//{ index: {,
//    '/path/to/test/fixtures/a.scss': {
//        imports: ['b.scss'],
//        importedBy: [],
//    },
//    '/path/to/test/fixtures/b.scss': {
//        imports: ['_c.scss'],
//        importedBy: ['a.scss'],
//    },
//    '/path/to/test/fixtures/_c.scss': {
//        imports: [],
//        importedBy: ['b/scss'],
//    },
//}}
```

## Running Mocha tests

You can run the tests by executing the following commands:

```
npm install
npm test
```

## Authors

Sass graph was originally written by [Lachlan Donald](http://lachlan.me).
It is now maintained by [Michael Mifsud](http://twitter.com/xzyfer).

## License

MIT

Enhanced `fs.readdir()`
=======================

> :warning: This is «fork» for original `readdir-enhanced` package but with some monkey fixes.

[![Build Status](https://api.travis-ci.org/BigstickCarpet/readdir-enhanced.svg?branch=master)](https://travis-ci.org/BigstickCarpet/readdir-enhanced)
[![Windows Build Status](https://ci.appveyor.com/api/projects/status/github/bigstickcarpet/readdir-enhanced?svg=true&branch=master&failingText=Windows%20build%20failing&passingText=Windows%20build%20passing)](https://ci.appveyor.com/project/BigstickCarpet/readdir-enhanced/branch/master)

[![Coverage Status](https://coveralls.io/repos/github/BigstickCarpet/readdir-enhanced/badge.svg?branch=master)](https://coveralls.io/github/BigstickCarpet/readdir-enhanced?branch=master)
[![Codacy Score](https://api.codacy.com/project/badge/Grade/178a817b6c864de7813fef457c0ed5ae)](https://www.codacy.com/public/jamesmessinger/readdir-enhanced)
[![Inline docs](http://inch-ci.org/github/BigstickCarpet/readdir-enhanced.svg?branch=master&style=shields)](http://inch-ci.org/github/BigstickCarpet/readdir-enhanced)
[![Dependencies](https://david-dm.org/BigstickCarpet/readdir-enhanced.svg)](https://david-dm.org/BigstickCarpet/readdir-enhanced)

[![npm](https://img.shields.io/npm/v/readdir-enhanced.svg?maxAge=43200)](https://www.npmjs.com/package/readdir-enhanced)
[![License](https://img.shields.io/npm/l/readdir-enhanced.svg?maxAge=2592000)](LICENSE)

`readdir-enhanced` is a [backward-compatible](#backward-compatible) drop-in replacement for [`fs.readdir()`](https://nodejs.org/api/fs.html#fs_fs_readdir_path_options_callback) and [`fs.readdirSync()`](https://nodejs.org/api/fs.html#fs_fs_readdirsync_path_options) with tons of extra features ([filtering](#filter), [recursion](#deep), [absolute paths](#basepath), [stats](#stats), and more) as well as additional APIs for Promises, Streams, and EventEmitters.


Pick Your API
-----------------
`readdir-enhanced` has multiple APIs, so you can pick whichever one you prefer.  There are three main APIs:

- **Synchronous API**<br>
aliases: `readdir.sync`, `readdir.readdirSync`<br>
Blocks the thread until all directory contents are read, and then returns all the results.

- **Async API**<br>
aliases: `readdir`, `readdir.async`, `readdir.readdirAsync`<br>
Reads the starting directory contents asynchronously and buffers all the results until all contents have been read. Supports callback or Promise syntax (see example below).

- **Streaming API**<br>
aliases: `readdir.stream`, `readdir.readdirStream`<br>
The streaming API reads the starting directory asynchronously and returns the results in real-time as they are read. The results can be [piped](https://nodejs.org/api/stream.html#stream_readable_pipe_destination_options) to other Node.js streams, or you can listen for specific events via the [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter) interface. (see example below)

```javascript
var readdir = require('readdir-enhanced');
var through2 = require('through2');

// Synchronous API
var files = readdir.sync('my/directory');

// Callback API
readdir.async('my/directory', function(err, files) { ... });

// Promises API
readdir.async('my/directory')
  .then(function(files) { ... })
  .catch(function(err) { ... });

// EventEmitter API
readdir.stream('my/directory')
  .on('data', function(path) { ... })
  .on('file', function(path) { ... })
  .on('directory', function(path) { ... })
  .on('symlink', function(path) { ... })
  .on('error', function(err) { ... });

// Streaming API
var stream = readdir.stream('my/directory')
  .pipe(through2.obj(function(data, enc, next) {
    console.log(data);
    this.push(data);
    next();
  });
```


<a id="options"></a>
Enhanced Features
-----------------
`readdir-enhanced` adds several features to the built-in `fs.readdir()` function.  All of the enhanced features are opt-in, which makes `readdir-enhanced` [fully backward compatible by default](#backward-compatible).  You can enable any of the features by passing-in an `options` argument as the second parameter.


<a id="deep"></a>
### Recursion
By default, `readdir-enhanced` will only return the top-level contents of the starting directory. But you can set the `deep` option to recursively traverse the subdirectories and return their contents as well.

#### Crawl ALL subdirectories

The `deep` option can be set to `true` to traverse the entire directory structure.

```javascript
var readdir = require('readdir-enhanced');

readdir('my/directory', {deep: true}, function(err, files) {
  console.log(files);
  // => subdir1
  // => subdir1/file.txt
  // => subdir1/subdir2
  // => subdir1/subdir2/file.txt
  // => subdir1/subdir2/subdir3
  // => subdir1/subdir2/subdir3/file.txt
});
```

#### Crawl to a specific depth
The `deep` option can be set to a number to only traverse that many levels deep.  For example, calling `readdir('my/directory', {deep: 2})` will return `subdir1/file.txt` and `subdir1/subdir2/file.txt`, but it _won't_ return `subdir1/subdir2/subdir3/file.txt`.

```javascript
var readdir = require('readdir-enhanced');

readdir('my/directory', {deep: 2}, function(err, files) {
  console.log(files);
  // => subdir1
  // => subdir1/file.txt
  // => subdir1/subdir2
  // => subdir1/subdir2/file.txt
  // => subdir1/subdir2/subdir3
});
```

#### Crawl subdirectories by name
For simple use-cases, you can use a [regular expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp) or a [glob pattern](https://github.com/isaacs/node-glob#glob-primer) to crawl only the directories whose path matches the pattern.  The path is relative to the starting directory by default, but you can customize this via [`options.basePath`](#basepath).

> **NOTE:** Glob patterns [_always_ use forward-slashes](https://github.com/isaacs/node-glob#windows), even on Windows. This _does not_ apply to regular expressions though. Regular expressions should use the appropraite path separator for the environment. Or, you can match both types of separators using `[\\/]`.

```javascript
var readdir = require('readdir-enhanced');

// Only crawl the "lib" and "bin" subdirectories
// (notice that the "node_modules" subdirectory does NOT get crawled)
readdir('my/directory', {deep: /lib|bin/}, function(err, files) {
  console.log(files);
  // => bin
  // => bin/cli.js
  // => lib
  // => lib/index.js
  // => node_modules
  // => package.json
});
```

#### Custom recursion logic
For more advanced recursion, you can set the `deep` option to a function that accepts an [`fs.Stats`](https://nodejs.org/api/fs.html#fs_class_fs_stats) object and returns a truthy value if the starting directory should be crawled.

> **NOTE:** The [`fs.Stats`](https://nodejs.org/api/fs.html#fs_class_fs_stats) object that's passed to the function has additional `path` and `depth` properties. The `path` is relative to the starting directory by default, but you can customize this via [`options.basePath`](#basepath). The `depth` is the number of subdirectories beneath the base path (see [`options.deep`](#deep)).

```javascript
var readdir = require('readdir-enhanced');

// Crawl all subdirectories, except "node_modules"
function ignoreNodeModules (stats) {
  return stats.path.indexOf('node_modules') === -1;
}

readdir('my/directory', {deep: ignoreNodeModules}, function(err, files) {
  console.log(files);
  // => bin
  // => bin/cli.js
  // => lib
  // => lib/index.js
  // => node_modules
  // => package.json
});
```


<a id="filter"></a>
### Filtering
The `filter` option lets you limit the results based on any criteria you want.

#### Filter by name
For simple use-cases, you can use a [regular expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp) or a [glob pattern](https://github.com/isaacs/node-glob#glob-primer) to filter items by their path.  The path is relative to the starting directory by default, but you can customize this via [`options.basePath`](#basepath).

> **NOTE:** Glob patterns [_always_ use forward-slashes](https://github.com/isaacs/node-glob#windows), even on Windows. This _does not_ apply to regular expressions though. Regular expressions should use the appropraite path separator for the environment. Or, you can match both types of separators using `[\\/]`.

```javascript
var readdir = require('readdir-enhanced');

// Find all .txt files
readdir('my/directory', {filter: '*.txt'});

// Find all package.json files
readdir('my/directory', {filter: '**/package.json', deep: true});

// Find everything with at least one number in the name
readdir('my/directory', {filter: /\d+/});
```

#### Custom filtering logic
For more advanced filtering, you can specify a filter function that accepts an [`fs.Stats`](https://nodejs.org/api/fs.html#fs_class_fs_stats) object and returns a truthy value if the item should be included in the results.

> **NOTE:** The [`fs.Stats`](https://nodejs.org/api/fs.html#fs_class_fs_stats) object that's passed to the filter function has additional `path` and `depth` properties. The `path` is relative to the starting directory by default, but you can customize this via [`options.basePath`](#basepath). The `depth` is the number of subdirectories beneath the base path (see [`options.deep`](#deep)).

```javascript
var readdir = require('readdir-enhanced');

// Only return file names containing an underscore
function myFilter(stats) {
  return stats.isFile() && stats.path.indexOf('_') >= 0;
}

readdir('my/directory', {filter: myFilter}, function(err, files) {
  console.log(files);
  // => __myFile.txt
  // => my_other_file.txt
  // => img_1.jpg
  // => node_modules
});
```


<a id="basepath"></a>
### Base Path
By default all `readdir-enhanced` functions return paths that are relative to the starting directory. But you can use the `basePath` option to customize this.  The `basePath` will be prepended to all of the returned paths.  One common use-case for this is to set `basePath` to the absolute path of the starting directory, so that all of the returned paths will be absolute.

```javascript
var readdir = require('readdir-enhanced');
var path = require('path');

// Get absolute paths
var absPath = path.resolve('my/dir');
readdir('my/directory', {basePath: absPath}, function(err, files) {
  console.log(files);
  // => /absolute/path/to/my/directory/file1.txt
  // => /absolute/path/to/my/directory/file2.txt
  // => /absolute/path/to/my/directory/subdir
});

// Get paths relative to the working directory
readdir('my/directory', {basePath: 'my/directory'}, function(err, files) {
  console.log(files);
  // => my/directory/file1.txt
  // => my/directory/file2.txt
  // => my/directory/subdir
});
```


<a id="sep"></a>
### Path Separator
By default, `readdir-enhanced` uses the correct path separator for your OS (`\` on Windows, `/` on Linux & MacOS). But you can set the `sep` option to any separator character(s) that you want to use instead.  This is usually used to ensure consistent path separators across different OSes.

```javascript
var readdir = require('readdir-enhanced');

// Always use Windows path separators
readdir('my/directory', {sep: '\\', deep: true}, function(err, files) {
  console.log(files);
  // => subdir1
  // => subdir1\file.txt
  // => subdir1\subdir2
  // => subdir1\subdir2\file.txt
  // => subdir1\subdir2\subdir3
  // => subdir1\subdir2\subdir3\file.txt
});
```

<a id="fs"></a>
### Custom FS methods
By default, `readdir-enhanced` uses the default [Node.js FileSystem module](https://nodejs.org/api/fs.html) for methods like `fs.stat`, `fs.readdir` and `fs.lstat`. But in some situations, you can want to use your own FS methods (FTP, SSH, remote drive and etc). So you can provide your own implementation of FS methods by setting `options.fs` or specific methods, such as `options.fs.stat`.

```javascript
var readdir = require('readdir-enhanced');

function myCustomReaddirMethod(dir, callback) {
  callback(null, ['__myFile.txt']);
}

var options = {
  fs: {
    readdir: myCustomReaddirMethod
  }
};

readdir('my/directory', options, function(err, files) {
  console.log(files);
  // => __myFile.txt
});
```

<a id="stats"></a>
Get `fs.Stats` objects instead of strings
------------------------
All of the `readdir-enhanced` functions listed above return an array of strings (paths). But in some situations, the path isn't enough information.  So, `readdir-enhanced` provides alternative versions of each function, which return an array of [`fs.Stats`](https://nodejs.org/api/fs.html#fs_class_fs_stats) objects instead of strings.  The `fs.Stats` object contains all sorts of useful information, such as the size, the creation date/time, and helper methods such as `isFile()`, `isDirectory()`, `isSymbolicLink()`, etc.

> **NOTE:** The [`fs.Stats`](https://nodejs.org/api/fs.html#fs_class_fs_stats) objects that are returned also have additional `path` and `depth` properties. The `path` is relative to the starting directory by default, but you can customize this via [`options.basePath`](#basepath). The `depth` is the number of subdirectories beneath the base path (see [`options.deep`](#deep)).

To get `fs.Stats` objects instead of strings, just add the word "Stat" to the function name.  As with the normal functions, each one is aliased (e.g. `readdir.async.stat` is the same as `readdir.readdirAsyncStat`), so you can use whichever naming style you prefer.

```javascript
var readdir = require('readdir-enhanced');

// Synchronous API
var stats = readdir.sync.stat('my/directory');
var stats = readdir.readdirSyncStat('my/directory');

// Async API
readdir.async.stat('my/directory', function(err, stats) { ... });
readdir.readdirAsyncStat('my/directory', function(err, stats) { ... });

// Streaming API
readdir.stream.stat('my/directory')
  .on('data', function(stat) { ... })
  .on('file', function(stat) { ... })
  .on('directory', function(stat) { ... })
  .on('symlink', function(stat) { ... });

readdir.readdirStreamStat('my/directory')
  .on('data', function(stat) { ... })
  .on('file', function(stat) { ... })
  .on('directory', function(stat) { ... })
  .on('symlink', function(stat) { ... });

```

<a id="backward-compatible"></a>
Backward Compatible
--------------------
`readdir-enhanced` is fully backward-compatible with Node.js' built-in `fs.readdir()` and `fs.readdirSync()` functions, so you can use it as a drop-in replacement in existing projects without affecting existing functionality, while still being able to use the enhanced features as needed.

```javascript
var readdir = require('readdir-enhanced');
var readdirSync = readdir.sync;

// Use it just like Node's built-in fs.readdir function
readdir('my/directory', function(err, files) { ... });

// Use it just like Node's built-in fs.readdirSync function
var files = readdirSync('my/directory');
```



Contributing
--------------------------
I welcome any contributions, enhancements, and bug-fixes.  [File an issue](https://github.com/BigstickCarpet/readdir-enhanced/issues) on GitHub and [submit a pull request](https://github.com/BigstickCarpet/readdir-enhanced/pulls).

#### Building
To build the project locally on your computer:

1. __Clone this repo__<br>
`git clone https://github.com/bigstickcarpet/readdir-enhanced.git`

2. __Install dependencies__<br>
`npm install`

3. __Run the tests__<br>
`npm test`



License
--------------------------
`readdir-enhanced` is 100% free and open-source, under the [MIT license](LICENSE). Use it however you want.


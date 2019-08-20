# globby [![Build Status](https://travis-ci.org/sindresorhus/globby.svg?branch=master)](https://travis-ci.org/sindresorhus/globby)

> User-friendly glob matching

Based on [`fast-glob`](https://github.com/mrmlnc/fast-glob), but adds a bunch of useful features and a nicer API.


## Features

- Promise API
- Multiple patterns
- Negated patterns: `['foo*', '!foobar']`
- Expands directories: `dir` → `dir/**/*`
- Supports `.gitignore`


## Install

```
$ npm install globby
```


## Usage

```
├── unicorn
├── cake
└── rainbow
```

```js
const globby = require('globby');

(async () => {
	const paths = await globby(['*', '!cake']);

	console.log(paths);
	//=> ['unicorn', 'rainbow']
})();
```


## API

### globby(patterns, [options])

Returns a `Promise<Array>` of matching paths.

#### patterns

Type: `string` `Array`

See supported `minimatch` [patterns](https://github.com/isaacs/minimatch#usage).

#### options

Type: `Object`

See the [`fast-glob` options](https://github.com/mrmlnc/fast-glob#options) in addition to the ones below.

##### expandDirectories

Type: `boolean` `Array` `Object`<br>
Default: `true`

If set to `true`, `globby` will automatically glob directories for you. If you define an `Array` it will only glob files that matches the patterns inside the `Array`. You can also define an `Object` with `files` and `extensions` like below:

```js
(async () => {
	const paths = await globby('images', {
		expandDirectories: {
			files: ['cat', 'unicorn', '*.jpg'],
			extensions: ['png']
		}
	});

	console.log(paths);
	//=> ['cat.png', 'unicorn.png', 'cow.jpg', 'rainbow.jpg']
})();
```

Note that if you set this option to `false`, you won't get back matched directories unless you set `nodir: false`.

##### gitignore

Type: `boolean`<br>
Default: `false`

Respect ignore patterns in `.gitignore` files that apply to the globbed files.

### globby.sync(patterns, [options])

Returns an `Array` of matching paths.

### globby.generateGlobTasks(patterns, [options])

Returns an `Array<Object>` in the format `{pattern: string, opts: Object}`, which can be passed as arguments to [`fast-glob`](https://github.com/mrmlnc/fast-glob). This is useful for other globbing-related packages.

Note that you should avoid running the same tasks multiple times as they contain a file system cache. Instead, run this method each time to ensure file system changes are taken into consideration.

### globby.hasMagic(patterns, [options])

Returns a `boolean` of whether there are any special glob characters in the `patterns`.

Note that the options affect the results. If `noext: true` is set, then `+(a|b)` will not be considered a magic pattern. If the pattern has a brace expansion, like `a/{b/c,x/y}`, then that is considered magical, unless `nobrace: true` is set.

This function is backed by [`node-glob`](https://github.com/isaacs/node-glob#globhasmagicpattern-options)

### globby.gitignore([options])

Returns a `Promise<(path: string) => boolean>` indicating whether a given path is ignored via a `.gitignore` file.

Takes `cwd?: string` and `ignore?: string[]` as options. `.gitignore` files matched by the ignore config are not
used for the resulting filter function.

```js
const {gitignore} = require('globby');

(async () => {
	const isIgnored = await gitignore();
	console.log(isIgnored('some/file'));
})();
```

### globby.gitignore.sync([options])

Returns a `(path: string) => boolean` indicating whether a given path is ignored via a `.gitignore` file.

Takes the same options as `globby.gitignore`.


## Globbing patterns

Just a quick overview.

- `*` matches any number of characters, but not `/`
- `?` matches a single character, but not `/`
- `**` matches any number of characters, including `/`, as long as it's the only thing in a path part
- `{}` allows for a comma-separated list of "or" expressions
- `!` at the beginning of a pattern will negate the match

[Various patterns and expected matches.](https://github.com/sindresorhus/multimatch/blob/master/test/test.js)


## Related

- [multimatch](https://github.com/sindresorhus/multimatch) - Match against a list instead of the filesystem
- [matcher](https://github.com/sindresorhus/matcher) - Simple wildcard matching
- [del](https://github.com/sindresorhus/del) - Delete files and directories
- [make-dir](https://github.com/sindresorhus/make-dir) - Make a directory and its parents if needed


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)

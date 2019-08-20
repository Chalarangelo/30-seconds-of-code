# del [![Build Status](https://travis-ci.org/sindresorhus/del.svg?branch=master)](https://travis-ci.org/sindresorhus/del) [![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/xojs/xo)

> Delete files and folders using [globs](https://github.com/isaacs/minimatch#usage)

Similar to [rimraf](https://github.com/isaacs/rimraf), but with a Promise API and support for multiple files and globbing. It also protects you against deleting the current working directory and above.

---

<p align="center">🐶</p>
<p align="center"><b>Support this project and improve your JavaScript skills with this great <a href="https://ES6.io/friend/AWESOME">ES6 course</a> by Wes Bos.</b><br>Try his free <a href="https://javascript30.com/friend/AWESOME">JavaScript 30 course</a> for a taste of what to expect. You might also like his <a href="https://ReactForBeginners.com/friend/AWESOME">React</a> and <a href="https://SublimeTextBook.com/friend/AWESOME">Sublime</a> course.</p>

---


## Install

```
$ npm install del
```


## Usage

```js
const del = require('del');

(async () => {
	const deletedPaths = await del(['tmp/*.js', '!tmp/unicorn.js']);

	console.log('Deleted files and folders:\n', deletedPaths.join('\n'));
})();
```


## Beware

The glob pattern `**` matches all children and *the parent*.

So this won't work:

```js
del.sync(['public/assets/**', '!public/assets/goat.png']);
```

You have to explicitly ignore the parent directories too:

```js
del.sync(['public/assets/**', '!public/assets', '!public/assets/goat.png']);
```

Suggestions on how to improve this welcome!


## API

### del(patterns, [options])

Returns a promise for an array of deleted paths.

### del.sync(patterns, [options])

Returns an array of deleted paths.

#### patterns

Type: `string` `string[]`

See supported minimatch [patterns](https://github.com/isaacs/minimatch#usage).

- [Pattern examples with expected matches](https://github.com/sindresorhus/multimatch/blob/master/test/test.js)
- [Quick globbing pattern overview](https://github.com/sindresorhus/multimatch#globbing-patterns)

#### options

Type: `Object`

See the [`glob` options](https://github.com/isaacs/node-glob#options).

##### force

Type: `boolean`<br>
Default: `false`

Allow deleting the current working directory and outside.

##### dryRun

Type: `boolean`<br>
Default: `false`

See what would be deleted.

```js
const del = require('del');

(async () => {
	const deletedPaths = await del(['tmp/*.js'], {dryRun: true});

	console.log('Files and folders that would be deleted:\n', deletedPaths.join('\n'));
})();
```

##### concurrency

Type: `number`<br>
Default: `Infinity`<br>
Minimum: `1`

Concurrency limit.


## CLI

See [del-cli](https://github.com/sindresorhus/del-cli) for a CLI for this module and [trash-cli](https://github.com/sindresorhus/trash-cli) for a safe version that is suitable for running by hand.


## Related

- [make-dir](https://github.com/sindresorhus/make-dir) - Make a directory and its parents if needed
- [globby](https://github.com/sindresorhus/globby) - User-friendly glob matching


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)

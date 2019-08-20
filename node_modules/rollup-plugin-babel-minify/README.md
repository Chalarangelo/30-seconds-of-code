# rollup-plugin-babel-minify

[![Build Status](https://travis-ci.org/Comandeer/rollup-plugin-babel-minify.svg?branch=master)](https://travis-ci.org/Comandeer/rollup-plugin-babel-minify) [![codecov](https://codecov.io/gh/Comandeer/rollup-plugin-babel-minify/branch/master/graph/badge.svg)](https://codecov.io/gh/Comandeer/rollup-plugin-babel-minify) [![Dependency Status](https://david-dm.org/Comandeer/rollup-plugin-babel-minify.svg)](https://david-dm.org/Comandeer/rollup-plugin-babel-minify) [![devDependencies Status](https://david-dm.org/Comandeer/rollup-plugin-babel-minify/dev-status.svg)](https://david-dm.org/Comandeer/rollup-plugin-babel-minify?type=dev) [![npm](https://img.shields.io/npm/v/rollup-plugin-babel-minify.svg)](https://www.npmjs.com/package/rollup-plugin-babel-minify)

Allows using [babel-minify](https://github.com/babel/minify) with [Rollup](https://rollupjs.org/guide/en).

## Installation

```bash
npm install rollup-plugin-babel-minify [--save-dev]
```

## Usage

```javascript
import { rollup } from 'rollup';
import minify from 'rollup-plugin-babel-minify';

rollup( {
	input: './src/index.js',
	plugins: [
		minify( {
			// Options for babel-minify.
		} )
	]
} );
```

For the list of options, check [babel-minify preset's docs](https://github.com/babel/minify/blob/master/packages/babel-preset-minify/README.md#options).

There are additional options:

* `comments` (default: `true`): indicates if comments should be preserved in source;
* `banner` (default: `undefined`): the comment which should be prepended to the transformed bundle;
* `bannerNewLine` (since 4.0.0, default: `false`): indicates if the banner comment should be followed by a new line;
* `sourceMap` (default: `true`): indicates if sourcemap should be generated.

## License

See [LICENSE](./LICENSE) file for details.

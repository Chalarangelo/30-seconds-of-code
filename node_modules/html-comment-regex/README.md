#  [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url]

> Regular expression for matching HTML comments


## Install

```sh
$ npm install --save html-comment-regex
```


## Usage

```js
var htmlCommentRegex = require('html-comment-regex');

htmlCommentRegex.test('<!DOCTYPE html><!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]--><html lang="en"><head><meta charset="UTF-8"><title>Document</title></head><body></body></html>');
//=> true

htmlCommentRegex.test('<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Document</title></head><body></body></html>');
//=> false
```


## License

MIT © [Steve Mao](https://github.com/stevemao)


[npm-image]: https://badge.fury.io/js/html-comment-regex.svg
[npm-url]: https://npmjs.org/package/html-comment-regex
[travis-image]: https://travis-ci.org/stevemao/html-comment-regex.svg?branch=master
[travis-url]: https://travis-ci.org/stevemao/html-comment-regex

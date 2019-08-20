# ext-list [![Build Status](http://img.shields.io/travis/kevva/ext-list.svg?style=flat)](https://travis-ci.org/kevva/ext-list)

> Return a list of known [file extensions](http://svn.apache.org/repos/asf/httpd/httpd/trunk/docs/conf/mime.types) and their MIME types


## Install

```
$ npm install --save ext-list
```


## Usage

```js
const extList = require('ext-list');

extList();
//=> {'123': 'application/vnd.lotus-1-2-3', ez: 'application/andrew-inset', aw: 'application/applixware', ...}
```


## License

MIT © [Kevin Mårtensson](https://github.com/kevva)

[![logo][logo-image]][logo-url]

---

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![npm download][download-image]][download-url]

[logo-image]: ./logo.png
[logo-url]: https://npmjs.org/package/detect-port
[npm-image]: https://img.shields.io/npm/v/detect-port.svg?style=flat-square
[npm-url]: https://npmjs.org/package/detect-port
[travis-image]: https://img.shields.io/travis/node-modules/detect-port.svg?style=flat-square
[travis-url]: https://travis-ci.org/node-modules/detect-port
[codecov-image]: https://img.shields.io/coveralls/node-modules/detect-port.svg?style=flat-square
[codecov-url]: https://codecov.io/gh/node-modules/detect-port
[download-image]: https://img.shields.io/npm/dm/detect-port.svg?style=flat-square
[download-url]: https://npmjs.org/package/detect-port

> Node.js implementation of port detector

## Usage

```bash
$ npm i detect-port --save
```

```javascript
const detect = require('detect-port');

/**
 * callback usage
 */

detect(port, (err, _port) => {
  if (err) {
    console.log(err);
  }

  if (port == _port) {
    console.log(`port: ${port} was not occupied`);
  } else {
    console.log(`port: ${port} was occupied, try port: ${_port}`);
  }
});

/**
 * for a yield syntax instead of callback function implement
 */

const co = require('co');

co(function *() {
  const _port = yield detect(port);

  if (port == _port) {
    console.log(`port: ${port} was not occupied`);
  } else {
    console.log(`port: ${port} was occupied, try port: ${_port}`);
  }
});

/**
 * use as a promise
 */

detect(port)
  .then(_port => {
    if (port == _port) {
      console.log(`port: ${port} was not occupied`);
    } else {
      console.log(`port: ${port} was occupied, try port: ${_port}`);
    }
  })
  .catch(err => {
    console.log(err);
  });

```

## Command Line Tool

```bash
$ npm i detect-port -g
```

### Quick Start

```bash
# get an available port randomly
$ detect

# detect pointed port
$ detect 80

# output verbose log
$ detect --verbose

# more help
$ detect --help
```

## FAQ

Most likely network error, check that your `/etc/hosts` and make sure the content below:

```
127.0.0.1       localhost
255.255.255.255 broadcasthost
::1             localhost
```

<!-- GITCONTRIBUTOR_START -->

## Contributors

|[<img src="https://avatars1.githubusercontent.com/u/1011681?v=4" width="100px;"/><br/><sub><b>xudafeng</b></sub>](https://github.com/xudafeng)<br/>|[<img src="https://avatars0.githubusercontent.com/u/156269?v=4" width="100px;"/><br/><sub><b>fengmk2</b></sub>](https://github.com/fengmk2)<br/>|[<img src="https://avatars1.githubusercontent.com/u/1044425?v=4" width="100px;"/><br/><sub><b>ziczhu</b></sub>](https://github.com/ziczhu)<br/>|[<img src="https://avatars0.githubusercontent.com/u/810438?v=4" width="100px;"/><br/><sub><b>gaearon</b></sub>](https://github.com/gaearon)<br/>|[<img src="https://avatars1.githubusercontent.com/u/360661?v=4" width="100px;"/><br/><sub><b>popomore</b></sub>](https://github.com/popomore)<br/>|[<img src="https://avatars2.githubusercontent.com/u/197375?v=4" width="100px;"/><br/><sub><b>jsw0528</b></sub>](https://github.com/jsw0528)<br/>
| :---: | :---: | :---: | :---: | :---: | :---: |


This project follows the git-contributor [spec](https://github.com/xudafeng/git-contributor), auto upated at `Tue Aug 14 2018 12:43:52 GMT+0800`.

<!-- GITCONTRIBUTOR_END -->

## License

[MIT](LICENSE)

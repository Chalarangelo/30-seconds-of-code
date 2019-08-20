# HAR Validator

[![License][license-image]][license-url] [![version][npm-image]][npm-url] [![Build Status][circle-image]][circle-url]

> Extremely fast HTTP Archive ([HAR](https://github.com/ahmadnassri/har-spec/blob/master/versions/1.2.md)) validator using JSON Schema.

## Install

```bash
npm install har-validator
```

## CLI Usage

Please refer to [`har-cli`](https://github.com/ahmadnassri/har-cli) for more info.

## API

**Note**: as of [`v2.0.0`](https://github.com/ahmadnassri/node-har-validator/releases/tag/v2.0.0) this module defaults to Promise based API. _For backward compatibility with `v1.x` an [async/callback API](docs/async.md) is also provided_

- [async API](docs/async.md)
- [callback API](docs/async.md)
- [Promise API](docs/promise.md) _(default)_

---
> Author: [Ahmad Nassri](https://www.ahmadnassri.com/) &bull; 
> Github: [@ahmadnassri](https://github.com/ahmadnassri) &bull; 
> Twitter: [@ahmadnassri](https://twitter.com/ahmadnassri)

[license-url]: LICENSE
[license-image]: https://img.shields.io/github/license/ahmadnassri/node-har-validator.svg?style=for-the-badge&logo=circleci

[circle-url]: https://circleci.com/gh/ahmadnassri/workflows/node-har-validator
[circle-image]: https://img.shields.io/circleci/project/github/ahmadnassri/node-har-validator/master.svg?style=for-the-badge&logo=circleci

[npm-url]: https://www.npmjs.com/package/har-validator
[npm-image]: https://img.shields.io/npm/v/har-validator.svg?style=for-the-badge&logo=npm

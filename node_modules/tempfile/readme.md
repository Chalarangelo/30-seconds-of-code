# tempfile [![Build Status](https://travis-ci.org/sindresorhus/tempfile.svg?branch=master)](https://travis-ci.org/sindresorhus/tempfile)

> Get a random temporary file path

**Checkout out [`tempy`](https://github.com/sindresorhus/tempy) which is better take on this module.**


## Install

```
$ npm install --save tempfile
```


## Usage

```js
const tempfile = require('tempfile');

tempfile('.png');
//=> '/var/folders/3x/jf5977fn79jbglr7rk0tq4d00000gn/T/4049f192-43e7-43b2-98d9-094e6760861b.png'

tempfile();
//=> '/var/folders/3x/jf5977fn79jbglr7rk0tq4d00000gn/T/6271e235-13b9-4138-8b9b-ee2f26c09ce3'
```


## API

### tempfile([extension])

#### extension

Type: `string`

Extension to append to the path.


## Related

- [tempy](https://github.com/sindresorhus/tempy) - Get a random temporary file or directory path
- [temp-write](https://github.com/sindresorhus/temp-write) - Write string/buffer/stream to a random temp file


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)

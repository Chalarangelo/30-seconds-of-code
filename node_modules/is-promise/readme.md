<a href="http://promises-aplus.github.com/promises-spec"><img src="http://promises-aplus.github.com/promises-spec/assets/logo-small.png" align="right" /></a>
# is-promise

  Test whether an object looks like a promises-a+ promise

 [![Build Status](https://img.shields.io/travis/then/is-promise/master.svg)](https://travis-ci.org/then/is-promise)
 [![Dependency Status](https://img.shields.io/gemnasium/then/is-promise.svg)](https://gemnasium.com/then/is-promise)
 [![NPM version](https://img.shields.io/npm/v/is-promise.svg)](https://www.npmjs.org/package/is-promise)

## Installation

    $ npm install is-promise

You can also use it client side via npm.

## API

```javascript
var isPromise = require('is-promise');

isPromise({then:function () {...}});//=>true
isPromise(null);//=>false
isPromise({});//=>false
isPromise({then: true})//=>false
```

## License

  MIT

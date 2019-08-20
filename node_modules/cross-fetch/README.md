cross-fetch<br>
[![Build Status](https://travis-ci.org/lquixada/cross-fetch.svg?branch=master)](https://travis-ci.org/lquixada/cross-fetch)
[![Build Status](https://saucelabs.com/buildstatus/cross-fetch)](https://saucelabs.com/u/cross-fetch)
[![codecov](https://codecov.io/gh/lquixada/cross-fetch/branch/master/graph/badge.svg)](https://codecov.io/gh/lquixada/cross-fetch)
[![dependencies Status](https://david-dm.org/lquixada/cross-fetch/status.svg)](https://david-dm.org/lquixada/cross-fetch)
[![NPM Version](https://img.shields.io/npm/v/cross-fetch.svg?branch=master)](https://www.npmjs.com/package/cross-fetch)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
================

Universal WHATWG Fetch API for Node, Browsers and React Native. The scenario that cross-fetch really shines is when the same javascript codebase needs to run on different platforms.

- **Platform agnostic**: browsers, node or react native
- **Optional polyfill**: it's up to you if something is going to be added to the global object or not
- **Simple interface**: no instantiation, no configuration and no extra dependency
- **WHATWG compliant**: it works the same way wherever your code runs
- **Updated**: lastest version of whatwg-fetch and node-fetch used


* * *

## Table of Contents

-   [Install](#install)
-   [Usage](#usage)
-   [Demo & API](#demo--api)
-   [FAQ](#faq)
-   [Supported environments](#supported-environments)
-   [Thanks](#thanks)
-   [License](#license)
-   [Author](#author)
-   [Sponsors](#sponsors)

* * *

## Install

```sh
npm install --save cross-fetch
```

As a [ponyfill](https://github.com/sindresorhus/ponyfill):

```javascript
// Using ES6 modules with Babel or TypeScript
import fetch from 'cross-fetch';

// Using CommonJS modules
const fetch = require('cross-fetch');
```

As a polyfill:

```javascript
// Using ES6 modules
import 'cross-fetch/polyfill';

// Using CommonJS modules
require('cross-fetch/polyfill');
```


The CDN build is also available on unpkg:

```html
<script src="//unpkg.com/cross-fetch/dist/cross-fetch.js"></script>
```

This adds the fetch function to the window object. Note that this is not UMD compatible.


* * *

## Usage

With [promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise):

```javascript
import fetch from 'cross-fetch';
// Or just: import 'cross-fetch/polyfill';

fetch('//api.github.com/users/lquixada')
  .then(res => {
    if (res.status >= 400) {
      throw new Error("Bad response from server");
    }
    return res.json();
  })
  .then(user => {
    console.log(user);
  })
  .catch(err => {
    console.error(err);
  });
```

With [async/await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function):

```javascript
import fetch from 'cross-fetch';
// Or just: import 'cross-fetch/polyfill';

(async () => {
  try {
    const res = await fetch('//api.github.com/users/lquixada');
    
    if (res.status >= 400) {
      throw new Error("Bad response from server");
    }
    
    const user = await res.json();
  
    console.log(user);
  } catch (err) {
    console.error(err);
  }
})();
```

> ⚠️ **Warning**: If you're in an environment that doesn't support Promises such as Internet Explorer, you must install an ES6 Promise compatible polyfill. [es6-promise](https://github.com/jakearchibald/es6-promise) is suggested.


## Demo & API

You can find a comprehensive doc at [Github's fetch](https://github.github.io/fetch/) page. If you want to play with cross-fetch, these resources can be useful:

* [**JSFiddle playground**](https://jsfiddle.net/lquixada/3ypqgacp/) ➡️
* [**Public test suite**](https://lquixada.github.io/cross-fetch/test/saucelabs/) ➡️

> **Tip**: Run theses resources on various browsers and with different settings (for instance: cross-domain requests, wrong urls or text requests). Don't forget to open the console in the test suite page and play around.


## FAQ

#### Yet another fetch library?

I did a lot of research in order to find a fetch library that could be simple, cross-platorm and provide polyfill as an option. There's a plethora of libs out there but none could match those requirements.


#### Why not isomorphic-fetch?

My preferred library used to be [isomorphic-fetch](https://github.com/matthew-andrews/isomorphic-fetch) but it has this [bug](https://github.com/matthew-andrews/isomorphic-fetch/issues/125) that prevents it from running in a react native environment. It seems it will never be fixed since the author hasn't been commiting for more than a year. That means dependencies are outdated as well. 


#### Why polyfill might not be a good idea?

In a word? Risk. If the spec changes in the future, it might be problematic to debug. Read more about it on [sindresorhus's ponyfill](https://github.com/sindresorhus/ponyfill#how-are-ponyfills-better-than-polyfills) page. It's up to you if you're fine with it or not.


#### How does cross-fetch work?

Just like isomorphic-fetch, it is just a proxy. If you're in node, it delivers you the [node-fetch](https://www.npmjs.com/package/node-fetch) library, if you're in a browser or React Native, it delivers you the github's [whatwg-fetch](https://github.com/github/fetch/). The same strategy applies whether you're using polyfill or ponyfill.


## Who's Using It?

* [VulcanJS](http://vulcanjs.org)
* [graphql-request](https://github.com/graphcool/graphql-request)
* [Swagger](https://swagger.io/)


## Supported environments

* Node 6+
* React-Native

[![Build Status](https://saucelabs.com/browser-matrix/cross-fetch.svg)](https://saucelabs.com/u/cross-fetch)


## Thanks

Heavily inspired by the works of [matthew-andrews](https://github.com/matthew-andrews). Kudos to him!


## License

cross-fetch is licensed under the [MIT license](https://github.com/lquixada/cross-fetch/blob/master/LICENSE) © [Leonardo Quixadá](https://twitter.com/lquixada/)


## Author

|[![@lquixada](https://avatars0.githubusercontent.com/u/195494?v=4&s=96)](https://github.com/lquixada)|
|:---:|
|[@lquixada](http://www.github.com/lquixada)|


## Sponsors

Manual cross-browser testing is provided by the following sponsor:

[![BrowserStack](./assets/browserstack-logo.png)](https://www.browserstack.com/)

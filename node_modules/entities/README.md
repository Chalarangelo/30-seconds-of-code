# entities [![NPM version](http://img.shields.io/npm/v/entities.svg)](https://npmjs.org/package/entities) [![Downloads](https://img.shields.io/npm/dm/entities.svg)](https://npmjs.org/package/entities) [![Build Status](http://img.shields.io/travis/fb55/entities.svg)](http://travis-ci.org/fb55/entities) [![Coverage](http://img.shields.io/coveralls/fb55/entities.svg)](https://coveralls.io/r/fb55/entities)

En- & decoder for XML/HTML entities.

## How to…

### …install `entities`

    npm i entities

### …use `entities`

```javascript
const entities = require("entities");
//encoding
entities.escape("&#38;"); // "&#x26;#38;"
entities.encodeXML("&#38;"); // "&amp;#38;"
entities.encodeHTML("&#38;"); // "&amp;&num;38&semi;"
//decoding
entities.decodeXML("asdf &amp; &#xFF; &#xFC; &apos;"); // "asdf & ÿ ü '"
entities.decodeHTML("asdf &amp; &yuml; &uuml; &apos;"); // "asdf & ÿ ü '"
```

---

License: BSD-2-Clause

[Get supported entities with the Tidelift Subscription](https://tidelift.com/subscription/pkg/npm-entities?utm_source=npm-entities&utm_medium=referral&utm_campaign=readme)

## Security contact information

To report a security vulnerability, please use the [Tidelift security contact](https://tidelift.com/security).
Tidelift will coordinate the fix and disclosure.

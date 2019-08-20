node-html-entities
==================

[![Build Status](https://travis-ci.org/mdevils/node-html-entities.svg?branch=master)](https://travis-ci.org/mdevils/node-html-entities)
[![Coverage Status](https://coveralls.io/repos/mdevils/node-html-entities/badge.svg?branch=master&service=github)](https://coveralls.io/github/mdevils/node-html-entities?branch=master)

Fast html entities library.


Installation
------------

```bash
$ npm install html-entities
```

Usage
-----

**XML entities**

HTML validity and XSS attack prevention you can achieve from XmlEntities class.

```javascript
const Entities = require('html-entities').XmlEntities;

const entities = new Entities();

console.log(entities.encode('<>"\'&©®')); // &lt;&gt;&quot;&apos;&amp;©®
console.log(entities.encodeNonUTF('<>"\'&©®')); // &lt;&gt;&quot;&apos;&amp;&#169;&#174;
console.log(entities.encodeNonASCII('<>"\'&©®')); // <>"\'&©®
console.log(entities.decode('&lt;&gt;&quot;&apos;&amp;&copy;&reg;&#8710;')); // <>"'&&copy;&reg;∆
```

**All HTML entities encoding/decoding**


```javascript
const Entities = require('html-entities').AllHtmlEntities;

const entities = new Entities();

console.log(entities.encode('<>"&©®∆')); // &lt;&gt;&quot;&amp;&copy;&reg;∆
console.log(entities.encodeNonUTF('<>"&©®∆')); // &lt;&gt;&quot;&amp;&copy;&reg;&#8710;
console.log(entities.encodeNonASCII('<>"&©®∆')); // <>"&©®&#8710;
console.log(entities.decode('&lt;&gt;&quot;&amp;&copy;&reg;')); // <>"&©®
```

**Available classes**

```javascript
const XmlEntities = require('html-entities').XmlEntities, // <>"'& + &#...; decoding
      Html4Entities = require('html-entities').Html4Entities, // HTML4 entities.
      Html5Entities = require('html-entities').Html5Entities, // HTML5 entities.
      AllHtmlEntities = require('html-entities').AllHtmlEntities; // Synonym for HTML5 entities.
```

Supports four methods for every class:

* encode — encodes, replacing characters to its entity representations. Ignores UTF characters with no entity representation.
* encodeNonUTF — encodes, replacing characters to its entity representations. Inserts numeric entities for UTF characters.
* encodeNonASCII — encodes, replacing only non-ASCII characters to its numeric entity representations.
* decode — decodes, replacing entities to characters. Unknown entities are left as is.

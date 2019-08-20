![hoek Logo](https://raw.github.com/hapijs/hoek/master/images/hoek.png)

Utility methods for the hapi ecosystem. This module is not intended to solve every problem for everyone, but rather as a central place to store hapi-specific methods. If you're looking for a general purpose utility module, check out [lodash](https://github.com/lodash/lodash) or [underscore](https://github.com/jashkenas/underscore).

[![Build Status](https://secure.travis-ci.org/hapijs/hoek.svg)](http://travis-ci.org/hapijs/hoek)

<a href="https://andyet.com"><img src="https://s3.amazonaws.com/static.andyet.com/images/%26yet-logo.svg" align="right" /></a>

Lead Maintainer: [Nathan LaFreniere](https://github.com/nlf)

**hoek** is sponsored by [&yet](https://andyet.com)

## Usage

The *Hoek* library contains some common functions used within the hapi ecosystem. It comes with useful methods for Arrays (clone, merge, applyToDefaults), Objects (removeKeys, copy), Asserting and more.

For example, to use Hoek to set configuration with default options:
```javascript
const Hoek = require('hoek');

const default = {url : "www.github.com", port : "8000", debug : true};

const config = Hoek.applyToDefaults(default, {port : "3000", admin : true});

// In this case, config would be { url: 'www.github.com', port: '3000', debug: true, admin: true }
```

## Documentation

[**API Reference**](API.md)

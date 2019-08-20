```javascript
var correct = require('spdx-correct')
var assert = require('assert')

assert.equal(correct('mit'), 'MIT')

assert.equal(correct('Apache 2'), 'Apache-2.0')

assert(correct('No idea what license') === null)

// disable upgrade option
assert(correct('GPL-3.0'), 'GPL-3.0-or-later')
assert(correct('GPL-3.0', { upgrade: false }), 'GPL-3.0')
```

# backo

  Simple exponential backoff because the others seem to have weird abstractions.

## Installation

```
$ npm install backo
```

## Options

 - `min` initial timeout in milliseconds [100]
 - `max` max timeout [10000]
 - `jitter` [0]
 - `factor` [2]

## Example

```js
var Backoff = require('backo');
var backoff = new Backoff({ min: 100, max: 20000 });

setTimeout(function(){
  something.reconnect();
}, backoff.duration());

// later when something works
backoff.reset()
```

# License

  MIT

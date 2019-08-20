# ETA

Estimated time to arrival.

## API

### ctor(count[, autoStartOrOptions])

Constructs ETA object for `count` of iterations. 
Optionally accepts additional parameter specifying whether time measurement should start immediately (autoStart), or, if it is an object, then it will be treated as options.

Options are:

- autoStart - already described
- numberFormatter - function, which accepts number and returns string

```js
var Eta = require('node-eta');
var eta = new Eta(10);
```

### start()

Starts time measurement.

### iterate([anything1, anything2, ...])

Notifies estimator that one more iteration has finished.
Optionally supports any number of arguments that will be passed to `util.format` to produce message, associated with last iteration.

### format([anything1, anything2, ...])

Passes arguments to `util.format` and treats its invocation result as layout where following placeholders can participate:

- `{{elapsed}}` - elapsed time in seconds
- `{{rate}}` - current rate (iterations per second)
- `{{estimated}}` - estimated time (total) in seconds
- `{{progress}}` - progress (fraction of 1)
- `{{eta}}` - estimated time to arrival in seconds
- `{{etah}}` - formatted (for human-readability) eta
- `{{last}}` - message from last iteration, if any

Returns layout filled with placeholder values.

## License

MIT

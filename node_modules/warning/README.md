# Warning [![npm version](https://badge.fury.io/js/warning.svg)](https://badge.fury.io/js/warning)
A mirror of Facebook's Warning


## Usage
```
npm install warning
```

```
// some script
var warning = require('warning');

var ShouldBeTrue = false;

warning(
  ShouldBeTrue,
  'This thing should be true but you set to false. No soup for you!'
);
//  'This thing should be true but you set to false. No soup for you!'
```

Similar to Facebook's invariant but only logs a warning if the condition is not met.
This can be used to log issues in development environments in critical
paths. Removing the logging code for production environments will keep the
same logic and follow the same code paths.

## Browserify

When using [browserify](http://browserify.org/), the `browser.js` file will be imported instead of `invariant.js` and browserify will be told to transform the file with [envify](https://github.com/hughsk/envify). The only difference between `browser.js` and `invariant.js` is the `process.env.NODE_ENV` variable isn't cached. This, in combination with envify and (optionally) [uglifyjs](https://github.com/mishoo/UglifyJS), will result in a noop in production environments. Otherwise behavior is as expected. 

## Use in Production

It is recommended to add [babel-plugin-dev-expression](https://github.com/4Catalyzer/babel-plugin-dev-expression) with this module to remove warning messages in production.
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<small>Don't Forget To Be Awesome</small>

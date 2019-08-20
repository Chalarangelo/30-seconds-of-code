
# loglevel [![NPM version][npm-image]][npm-url] [![NPM downloads](https://img.shields.io/npm/dw/loglevel.svg)](https://www.npmjs.com/package/loglevel) [![Build status](https://travis-ci.org/pimterry/loglevel.png)](https://travis-ci.org/pimterry/loglevel) [![Coveralls percentage](https://img.shields.io/coveralls/pimterry/loglevel.svg)](https://coveralls.io/r/pimterry/loglevel?branch=master)

[npm-image]: https://img.shields.io/npm/v/loglevel.svg?style=flat
[npm-url]: https://npmjs.org/package/loglevel

Minimal lightweight simple logging for JavaScript. loglevel replaces console.log() and friends with level-based logging and filtering, with none of console's downsides.

This is a barebones reliable everyday logging library. It does not do fancy things, it does not let you reconfigure appenders or add complex log filtering rules or boil tea (more's the pity), but it does have the all core functionality that you actually use:

## Features

### Simple

* Log things at a given level (trace/debug/info/warn/error) to the console object (as seen in all modern browsers & node.js)
* Filter logging by level (all the above or 'silent'), so you can disable all but error logging in production, and then run log.setLevel("trace") in your console to turn it all back on for a furious debugging session
* Single file, no dependencies, weighs in at 1.1KB minified and gzipped

### Effective

* Log methods gracefully fall back to simpler console logging methods if more specific ones aren't available: so calls to log.debug() go to console.debug() if possible, or console.log() if not
* Logging calls still succeed even if there's no console object at all, so your site doesn't break when people visit with old browsers that don't support the console object (here's looking at you IE) and similar
* This then comes together giving a consistent reliable API that works in every JavaScript environment with a console available, and never breaks anything anywhere else

### Convenient

* Log output keeps line numbers: most JS logging frameworks call console.log methods through wrapper functions, clobbering your stacktrace and making the extra info many browsers provide useless. We'll have none of that thanks.
* It works with all the standard JavaScript loading systems out of the box (CommonJS, AMD, or just as a global)
* Logging is filtered to "warn" level by default, to keep your live site clean in normal usage (or you can trivially re-enable everything with an initial log.enableAll() call)
* Magically handles situations where console logging is not initially available (IE8/9), and automatically enables logging as soon as it does become available (when developer console is opened)
* TypeScript type definitions included, so no need for extra `@types` packages
* Extensible, to add other log redirection, filtering, or formatting functionality, while keeping all the above (except you will clobber your stacktrace, see Plugins below)

## Downloading loglevel

If you're using NPM, you can just run `npm install loglevel`.

Alternatively, loglevel is also available via [Bower](https://github.com/bower/bower) (`bower install loglevel`), as a [Webjar](http://www.webjars.org/), or an [Atmosphere package](https://atmospherejs.com/spacejamio/loglevel) (for Meteor)

Alternatively if you just want to grab the file yourself, you can download either the current stable [production version][min] or the [development version][max] directly, or reference it remotely on unpkg at [`https://unpkg.com/loglevel/dist/loglevel.min.js`][cdn] (this will redirect to a latest version, use the resulting redirected URL if you want to pin that version).

Finally, if you want to tweak loglevel to your own needs or you immediately need the cutting-edge version, clone this repo and see [Developing & Contributing](#developing--contributing) below for build instructions.

[min]: https://raw.github.com/pimterry/loglevel/master/dist/loglevel.min.js
[max]: https://raw.github.com/pimterry/loglevel/master/dist/loglevel.js
[cdn]: https://unpkg.com/loglevel/dist/loglevel.min.js

## Setting it up

loglevel supports AMD (e.g. RequireJS), CommonJS (e.g. Node.js) and direct usage (e.g. loading globally with a &lt;script&gt; tag) loading methods. You should be able to do nearly anything, and then skip to the next section anyway and have it work. Just in case though, here's some specific examples that definitely do the right thing:

### CommonsJS (e.g. Node)

```javascript
var log = require('loglevel');
log.warn("unreasonably simple");
```

### AMD (e.g. RequireJS)

```javascript
define(['loglevel'], function(log) {
   log.warn("dangerously convenient");
});
```

### Directly in your web page:

```html
<script src="loglevel.min.js"></script>
<script>
log.warn("too easy");
</script>
```

### As an ES6 module (assuming some transpilation step):

```javascript
import * as log from 'loglevel';
log.warn("ultra-compatible");
```

### With noConflict():

If you're using another JavaScript library that exposes a 'log' global, you can run into conflicts with loglevel.  Similarly to jQuery, you can solve this by putting loglevel into no-conflict mode immediately after it is loaded onto the page. This resets to 'log' global to its value before loglevel was loaded (typically `undefined`), and returns the loglevel object, which you can then bind to another name yourself.

For example:

```html
<script src="loglevel.min.js"></script>
<script>
var logging = log.noConflict();

logging.warn("still pretty easy");
</script>
```

### TypeScript:

loglevel includes its own type definitions, assuming you're using a modern module environment (e.g. Node.JS, webpack, etc), you should be able to use the ES6 syntax above, and everything will work immediately. If not, file a bug!

If you really want to use LogLevel as a global however, but from TypeScript, you'll need to declare it as such first. To do that:

* Create a `loglevel.d.ts` file
* Ensure that file is included in your build (e.g. add it to `include` in your tsconfig, pass it on the command line, or use `///<reference path="./loglevel.d.ts" />`)
* In that file, add:
  ```typescript
  import * as log from 'loglevel';
  export as namespace log;
  export = log;
  ```

## Documentation

The loglevel API is extremely minimal. All methods are available on the root loglevel object, which it's suggested you name 'log' (this is the default if you import it in globally, and is what's set up in the above examples). The API consists of:

* 5 actual logging methods, ordered and available as:
  * `log.trace(msg)`
  * `log.debug(msg)`
  * `log.info(msg)`
  * `log.warn(msg)`
  * `log.error(msg)`

  `log.log(msg)` is also available, as an alias for `log.debug(msg)`, to improve compatibility with `console`, and make migration easier.

  Exact output formatting of these will depend on the console available in the current context of your application. For example, many environments will include a full stack trace with all trace() calls, and icons or similar to highlight other calls.

  These methods should never fail in any environment, even if no console object is currently available, and should always fall back to an available log method even if the specific method called (e.g. warn) isn't available.

  Be aware that all this means that these method won't necessarily always produce exactly the output you expect in every environment; loglevel only guarantees that these methods will never explode on you, and that it will call the most relevant method it can find, with your argument. Firefox is a notable example here: due to a [current Firefox bug](https://bugzilla.mozilla.org/show_bug.cgi?id=1172314) `log.trace(msg)` calls in Firefox will print only the stacktrace, and won't include any passed message arguments.

* A `log.setLevel(level, [persist])` method.

  This disables all logging below the given level, so that after a log.setLevel("warn") call log.warn("something") or log.error("something") will output messages, but log.info("something") will not.

  This can take either a log level name or 'silent' (which disables everything) in one of a few forms:
  * As a log level from the internal levels list, e.g. log.levels.SILENT ← _for type safety_
  * As a string, like 'error' (case-insensitive) ← _for a reasonable practical balance_
  * As a numeric index from 0 (trace) to 5 (silent) ← _deliciously terse, and more easily programmable (...although, why?)_

  Where possible the log level will be persisted. LocalStorage will be used if available, falling back to cookies if not. If neither is available in the current environment (i.e. in Node), or if you pass `false` as the optional 'persist' second argument, persistence will be skipped.

  If log.setLevel() is called when a console object is not available (in IE 8 or 9 before the developer tools have been opened, for example) logging will remain silent until the console becomes available, and then begin logging at the requested level.

* A `log.setDefaultLevel(level)` method.

  This sets the current log level only if one has not been persisted and can’t be loaded. This is useful when initializing scripts; if a developer or user has previously called `setLevel()`, this won’t alter their settings. For example, your application might set the log level to `error` in a production environment, but when debugging an issue, you might call `setLevel("trace")` on the console to see all the logs. If that `error` setting was set using `setDefaultLevel()`, it will still say as `trace` on subsequent page loads and refreshes instead of resetting to `error`.

  The `level` argument takes is the same values that you might pass to `setLevel()`. Levels set using `setDefaultLevel()` never persist to subsequent page loads.

* `log.enableAll()` and `log.disableAll()` methods.

  These enable or disable all log messages, and are equivalent to log.setLevel("trace") and log.setLevel("silent") respectively.

* A `log.getLevel()` method.

  Returns the current logging level, as a number from 0 (trace) to 5 (silent)

  It's very unlikely you'll need to use this for normal application logging; it's provided partly to help plugin development, and partly to let you optimize logging code as below, where debug data is only generated if the level is set such that it'll actually be logged. This probably doesn't affect you, unless you've run profiling on your code and you have hard numbers telling you that your log data generation is a real performance problem.

  ```javascript
  if (log.getLevel() <= log.levels.DEBUG) {
    var logData = runExpensiveDataGeneration();
    log.debug(logData);
  }
  ```

  This notably isn't the right solution to avoid the cost of string concatenation in your logging. Firstly, it's very unlikely that string concatenation in your logging is really an important performance problem. Even if you do genuinely have hard metrics showing that it is though, the better solution that wrapping your log statements in this is to use multiple arguments, as below. The underlying console API will automatically concatenate these for you if logging is enabled, and if it isn't then all log methods are no-ops, and no concatenation will be done at all.

  ```javascript
  // Prints 'My concatenated log message'
  log.debug("My ", "concatenated ", "log message");
  ```

* A `log.getLogger(loggerName)` method.

  This gets you a new logger object that works exactly like the root `log` object, but can have its level and logging methods set independently. All loggers must have a name (which is a non-empty string). Calling `getLogger()` multiple times with the same name will return an identical logger object.

  In large applications, it can be incredibly useful to turn logging on and off for particular modules as you are working with them. Using the `getLogger()` method lets you create a separate logger for each part of your application with its own logging level.

  Likewise, for small, independent modules, using a named logger instead of the default root logger allows developers using your module to selectively turn on deep, trace-level logging when trying to debug problems, while logging only errors or silencing logging altogether under normal circumstances.

  Example usage *(using CommonJS modules, but you could do the same with any module system):*

  ```javascript
  // In module-one.js:
  var log = require("loglevel").getLogger("module-one");
  function doSomethingAmazing() {
    log.debug("Amazing message from module one.");
  }

  // In module-two.js:
  var log = require("loglevel").getLogger("module-two");
  function doSomethingSpecial() {
    log.debug("Special message from module two.");
  }

  // In your main application module:
  var log = require("loglevel");
  var moduleOne = require("module-one");
  var moduleTwo = require("module-two");
  log.getLogger("module-two").setLevel("TRACE");

  moduleOne.doSomethingAmazing();
  moduleTwo.doSomethingSpecial();
  // logs "Special message from module two."
  // (but nothing from module one.)
  ```

  Loggers returned by `getLogger()` support all the same properties and methods as the default root logger, excepting `noConflict()` and the `getLogger()` method itself.

  Like the root logger, other loggers can have their logging level saved. If a logger’s level has not been saved, it will inherit the root logger’s level when it is first created. If the root logger’s level changes later, the new level will not affect other loggers that have already been created.

  Likewise, loggers will inherit the root logger’s `methodFactory`. After creation, each logger can have its `methodFactory` independently set. See the *plugins* section below for more about `methodFactory`.

* A `log.getLoggers()` method.

  This will return you the dictionary of all loggers created with `getLogger`, keyed off of their names.

## Plugins

### Existing plugins:

[loglevel-plugin-prefix](https://github.com/kutuluk/loglevel-plugin-prefix) - plugin for loglevel message prefixing.

[loglevel-plugin-remote](https://github.com/kutuluk/loglevel-plugin-remote) - plugin for sending loglevel messages to a remote log server.

ServerSend - https://github.com/artemyarulin/loglevel-serverSend - Forward your log messages to a remote server.

Standard Streams - https://github.com/NatLibFi/loglevel-std-streams - Route logging through STDERR in Node for easier log management.

Message Prefix - https://github.com/NatLibFi/loglevel-message-prefix - Dynamic (timestamp/level) and static ('foo') message prefixing.

Message Buffer - https://github.com/NatLibFi/loglevel-message-buffer - Buffer messages, and flush them on-demand later.

DEBUG - https://github.com/vectrlabs/loglevel-debug - Control logging from a DEBUG environmental variable (similar to the classic [Debug](https://github.com/visionmedia/debug) module)

### Writing plugins:

Loglevel provides a simple reliable minimal base for console logging that works everywhere. This means it doesn't include lots of fancy functionality that might be useful in some cases, such as log formatting and redirection (e.g. also sending log messages to a server over AJAX)

Including that would increase the size and complexity of the library, but more importantly would remove stacktrace information. Currently log methods are either disabled, or enabled with directly bound versions of the console.log methods (where possible). This means your browser shows the log message as coming from your code at the call to `log.info("message!")` not from within loglevel, since it really calls the bound console method directly, without indirection. The indirection required to dynamically format, further filter, or redirect log messages would stop this.

There's clearly enough enthusiasm for this even at that cost though that loglevel now includes a plugin API. To use it, redefine log.methodFactory(methodName, logLevel, loggerName) with a function of your own. This will be called for each enabled method each time the level is set (including initially), and should return a function to be used for the given log method, at the given level, for a logger with the given name. If you'd like to retain all the reliability and features of loglevel, it's recommended that this wraps the initially provided value of `log.methodFactory`

For example, a plugin to prefix all log messages with "Newsflash: " would look like:

```javascript
var originalFactory = log.methodFactory;
log.methodFactory = function (methodName, logLevel, loggerName) {
    var rawMethod = originalFactory(methodName, logLevel, loggerName);

    return function (message) {
        rawMethod("Newsflash: " + message);
    };
};
log.setLevel(log.getLevel()); // Be sure to call setLevel method in order to apply plugin
```

*(The above supports only a single log.warn("") argument for clarity, but it's easy to extend to a [fuller variadic version](http://jsbin.com/xehoye/edit?html,console))*

If you develop and release a plugin, please get in contact! I'd be happy to reference it here for future users. Some consistency is helpful; naming your plugin 'loglevel-PLUGINNAME' (e.g. loglevel-newsflash) is preferred, as is giving it the 'loglevel-plugin' keyword in your package.json

## Developing & Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality.

Builds can be run with npm: run `npm run dist` to build a distributable version of the project (in /dist), or `npm test` to just run the tests and linting. During development you can run `npm run watch` and it will monitor source files, and rerun the tests and linting as appropriate when they're changed.

_Also, please don't manually edit files in the "dist" subdirectory as they are generated via Grunt. You'll find source code in the "lib" subdirectory!_

#### Release process

To do a release of loglevel:

* Update the version number in package.json and bower.json
* Run `npm run dist` to build a distributable version in dist/
* Update the release history in this file (below)
* Commit the built code, tagging it with the version number and a brief message about the release
* Push to Github
* Run `npm publish .` to publish to NPM

## Release History
v0.1.0 - First working release with apparent compatibility with everything tested

v0.2.0 - Updated release with various tweaks and polish and real proper documentation attached

v0.3.0 - Some bugfixes (#12, #14), cookie-based log level persistence, doc tweaks, support for Bower and JamJS

v0.3.1 - Fixed incorrect text in release build banner, various other minor tweaks

v0.4.0 - Use LocalStorage for level persistence if available, compatibility improvements for IE, improved error messages, multi-environment tests

v0.5.0 - Fix for Modernizr+IE8 issues, improved setLevel error handling, support for auto-activation of desired logging when console eventually turns up in IE8

v0.6.0 - Handle logging in Safari private browsing mode (#33), fix TRACE level persistence bug (#35), plus various minor tweaks

v1.0.0 - Official stable release! Fixed a bug with localStorage in Android webviews, improved CommonJS detection, and added noConflict().

v1.1.0 - Added support for including loglevel with preprocessing and .apply() (#50), and fixed QUnit dep version which made tests potentially unstable.

v1.2.0 - New plugin API! Plus various bits of refactoring and tidy up, nicely simplifying things and trimming the size down.

v1.3.0 - Make persistence optional in setLevel, plus lots of documentation updates and other small tweaks

v1.3.1 - With the new optional persistence, stop unnecessarily persisting the initially set default level (warn)

v1.4.0 - Add getLevel(), setDefaultLevel() and getLogger() functionality for more fine-grained log level control

v1.4.1 - Reorder UMD (#92) to improve bundling tool compatibility

v1.5.0 - Fix log.debug (#111) after V8 changes deprecating console.debug, check for `window` upfront (#104), and add `.log` alias for `.debug` (#64)

v1.5.1 - Fix bug (#112) in level-persistence cookie fallback, which failed if it wasn't the first cookie present

v1.6.0 - Add a name property to loggers and add log.getLoggers() (#114), and recommend unpkg as CDN instead of CDNJS.

v1.6.1 - Various small documentation & test updates

v1.6.2 - Include TypeScript type definitions in the package itself

v1.6.3 - Avoid TypeScript type conflicts with other global `log` types (e.g. `core-js`)

## License
Copyright (c) 2013 Tim Perry
Licensed under the MIT license.

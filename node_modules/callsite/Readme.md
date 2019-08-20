# callstack

  Access to v8's "raw" `CallSite`s.

## Installation

    $ npm install callsite

## Example

```js
var stack = require('callsite');

foo();

function foo() {
  bar();
}

function bar() {
  baz();
}

function baz() {
  console.log();
  stack().forEach(function(site){
    console.log('  \033[36m%s\033[90m in %s:%d\033[0m'
      , site.getFunctionName() || 'anonymous'
      , site.getFileName()
      , site.getLineNumber());
  });
  console.log();
}
```

## Why?

  Because you can do weird, stupid, clever, wacky things such as:

  - [better-assert](https://github.com/visionmedia/better-assert)

## License

  MIT

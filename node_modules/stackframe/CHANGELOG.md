## v1.0.x
StackFrame v1.0 is out! Major features:

* `eval`, native, and global code can now be represented.
* `evalOrigin` represents location of code within an eval'd String or Function
* BREAKING CHANGE: `new StackFrame(obj)` is now constructed with an Object parameter. For example:

```js
var stackFrame = new StackFrame({
    functionName: 'funName',
    args: ['args'],
    fileName: 'http://localhost:3000/file.js',
    lineNumber: 1,
    columnNumber: 3288,
    isEval: true,
    isNative: false,
    source: 'ORIGINAL_STACK_LINE'
});
```

## v0.3.x
* Add source (original stack line) to StackFrame definition

## v0.2.2
* Add name to AMD definition
* Better docs

## v0.2.1
* Add minified/source-mapped distribution

## v0.2.0
* Add .toString() method compatible with stacktrace.js 

## v0.1.1
* Clean up npm package

## v0.1.0
* Draft implementation


# exenv

React's ExecutionEnvironment module extracted for use in other packages &amp; components.

## Usage

```
npm install exenv --save
```

```js
var ExecutionEnvironment = require('exenv');

// You now have...
ExecutionEnvironment.canUseDOM             // is the DOM available? i.e window document etc. 
ExecutionEnvironment.canUseWorkers         // are Web Workers available?
ExecutionEnvironment.canUseEventListeners  // are Events available? i.e addEventListener etc.
ExecutionEnvironment.canUseViewport        // is there a viewport? i.e window.screen
```

### Differences from React's ExecutionEnvironment

The `ExecutionEnvironment` lib in React 0.13 includes an `isInWorker` property, which is `!canUseDOM`. This is highly specific to React internals and probably (a) hacky and (b) not useful to other packages, so it has been left out. Please open an issue with your thoughts if you disagree or have a better idea.

## Why?

A number of packages and components use React's private ExecutionEnvironment lib to detect available features, particularly to detect server-side rendering, e.g

```
canUseDOM = require('react/lib/ExecutionEnvironment').canUseDOM; // BAD
```

**It is bad practice to use React internals** and this is likely to be broken / disabled in the future.

Use this package instead!

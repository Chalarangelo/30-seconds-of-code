# capture-exit

[![Build status](https://ci.appveyor.com/api/projects/status/8044m918rwic8b9n/branch/master?svg=true)](https://ci.appveyor.com/project/embercli/capture-exit/branch/master)
[![Build Status](https://travis-ci.org/ember-cli/capture-exit.svg?branch=master)](https://travis-ci.org/ember-cli/capture-exit)

Allow cooprative async exit handlers, we unfortunately must hijack
process.exit.

It allows a handler to ensure exit, without that exit handler impeding other
similar handlers

for example, see: [sindresorhus/ora#27](https://github.com/sindresorhus/ora/issues/27)

Differences between `process.on('exit')` and `captureExit.onExit(...)` => https://github.com/ember-cli/capture-exit/issues/12


### Installation

```sh
yarn add capture-exit
// or
npm install --save capture-exit
```

### Usage

```js
// as early in startup as possible
require('capture-exit').captureExit();

// when you want to schedule some work on exit:
function onExit() {
  return something.processWillExit(); // you can return promises, which will pause exit until fulfilled
}

require('capture-exit').onExit(onExit); // add an exit handler
require('capture-exit').offExit(onExit); // allows one to remove an exit handle if it is not longer required
```

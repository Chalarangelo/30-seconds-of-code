# which-pm-runs

> Detects what package manager executes the process

[![npm version](https://img.shields.io/npm/v/which-pm-runs.svg)](https://www.npmjs.com/package/which-pm-runs) [![Build Status](https://img.shields.io/travis/zkochan/which-pm-runs/master.svg)](https://travis-ci.org/zkochan/which-pm-runs)

## Installation

```
npm i which-pm-runs
```

## Usage

```js
'use strict'
const whichPMRuns = require('which-pm-runs')

whichPMRuns()
//> {name: "pnpm", version: "0.64.2"}
```

## Related

* [which-pm](https://github.com/zkochan/which-pm) - Detects what package manager was used for installation

## License

[MIT](LICENSE) © [Zoltan Kochan](http://kochan.io)

# cli-cursor [![Build Status](https://travis-ci.org/sindresorhus/cli-cursor.svg?branch=master)](https://travis-ci.org/sindresorhus/cli-cursor)

> Toggle the CLI cursor

The cursor is [gracefully restored](https://github.com/sindresorhus/restore-cursor) if the process exits.


## Install

```
$ npm install --save cli-cursor
```


## Usage

```js
const cliCursor = require('cli-cursor');

cliCursor.hide();

const unicornsAreAwesome = true;
cliCursor.toggle(unicornsAreAwesome);
```


## API

### .show([stream])

### .hide([stream])

### .toggle(force, [stream])

`force` is useful to show or hide the cursor based on a boolean.

#### stream

Type: `Stream`<br>
Default: `process.stderr`


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
